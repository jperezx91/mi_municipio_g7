from repositorios.usuario_repo import UsuarioRepo
from utils.dbmanager import DbManager
import os
from utils.image_creator import ImageCreator
from flask import request
class DenunciasRepo:

    @staticmethod
    def obtener_directorio_relativo(id_denuncia):
        # Asegura que se levante siempre la misma carpeta aunque se corra la app desde cualquier directorio
        directorio_objetivo = os.path.join('assets', 'denuncias', str(id_denuncia))
        directorio_denuncias_repo = os.path.dirname(__file__)
        directorio_base_backend = os.path.abspath(os.path.join(directorio_denuncias_repo, '..'))
        return os.path.join(directorio_base_backend, directorio_objetivo)

    @staticmethod
    def obtener_denuncias(id_usuario):
        usuario = UsuarioRepo.get_usuario_by_id(id_usuario)
        solicitud = """
            SELECT idDenuncias, estado
            FROM denuncias
            WHERE documento = ?
        """
        parametros = (usuario.documento, )
        return DbManager.obtener_registros(solicitud, parametros)

    @staticmethod
    def obtener_denuncias_recibidas(id_usuario):
        usuario = UsuarioRepo.get_usuario_by_id(id_usuario)
        solicitud = """
               SELECT idDenuncias, estado
               FROM denuncias
               WHERE documentoDenunciado = ?
           """
        parametros = (usuario.documento,)
        return DbManager.obtener_registros(solicitud, parametros)
    @staticmethod
    def almacenar_imagenes(imagenes_base64, id_denuncia):
        directorio_imagenes = DenunciasRepo.obtener_directorio_relativo(id_denuncia)

        for idx, imagen in enumerate(imagenes_base64):
            directorio_salida = os.path.join(directorio_imagenes, f'image_{idx + 1}.jpg')
            ImageCreator.base64_a_jpeg(imagen, directorio_salida)
    @staticmethod
    def crear_sitio(datos):
        latitud = datos["latitud"]
        longitud = datos["longitud"]
        calle = datos.get("calle")
        numero = datos.get("numero")
        try:
            api_geo = requests.get(f"https://api.geoapify.com/v1/geocode/reverse?lat={latitud}&lon={longitud}&apiKey=d1880068d44f43eba5b40fea6b08f3b7").json()
            calle = api_geo.get("features")[0].get("properties").get("street")
            numero = api_geo.get("features")[0].get("properties").get("housenumber")
        except:
            print("fallo api geo")
        solicitud = """
            INSERT INTO sitios (latitud, longitud, calle, numero) VALUES (?, ?, ?, ?);
        """
        parametros = (
            datos.get("latitud"),
            datos.get("longitud"),
            calle,
            numero
        )
        return DbManager.actualizar_bd(solicitud, parametros)
    @staticmethod
    def crear_denuncia(id_usuario, datos):
        usuario = UsuarioRepo.get_usuario_by_id(id_usuario)
        id_sitio = DenunciasRepo.crear_sitio(datos)
        solicitud = """
            INSERT INTO denuncias (documento, descripcion, estado, aceptaResponsabilidad, idSitio) VALUES (?, ?, ?, ?, ?);
        """
        parametros = (
            usuario.documento,
            datos.get('descripcion'),
            "En revisión",
            0,
            id_sitio
        )
        return DbManager.actualizar_bd(solicitud, parametros)

    @staticmethod
    def obtener_imagen(id_denuncia, id_imagen):
        directorio_imagen = os.path.join(DenunciasRepo.obtener_directorio_relativo(id_denuncia), f"image_{id_imagen}.jpg")
        if os.path.isfile(directorio_imagen):
            imagen_base64 = ImageCreator.jpg_a_base64(directorio_imagen)
        else:
            imagen_base64 = None
        return imagen_base64
    @staticmethod
    def obtener_denuncia(id_denuncia):
        solicitud = """
        SELECT dn.descripcion, si.calle, si.numero, dn.estado
        FROM denuncias dn
        LEFT JOIN sitios si
        ON si.idSitio = dn.idSitio
        WHERE idDenuncias = ?
        """
        parametros = (id_denuncia,)
        return DbManager.obtener_registro(solicitud, parametros)