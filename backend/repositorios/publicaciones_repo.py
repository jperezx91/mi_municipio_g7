from utils.dbmanager import DbManager
import os
import base64

class PublicacionesRepo:
    
    @staticmethod
    def obtener_publicaciones():
        # Obtiene todas las publicaciones, ordenadas de la más nueva a la más antigua
        solicitud = """
            SELECT idPublicacion as id, titulo, descripcion
            FROM publicaciones
            ORDER BY creada DESC
            """
        return DbManager.obtener_registros(solicitud)
    
    @staticmethod
    def obtener_thumbnail(id_publicacion):
        # Obtiene el thumbnail de la publicación indicada
        ruta_thumb = os.path.join(PublicacionesRepo.obtener_directorio_relativo(id_publicacion), "thumbnail.jpg")
        if os.path.isfile(ruta_thumb):
            thumbnail_base64 = PublicacionesRepo.jpg_a_base64(ruta_thumb)
        else:
            thumbnail_base64 = None
        return thumbnail_base64
    
    @staticmethod
    def obtener_publicaciones_propias(id_usuario):
        # Obtiene todas las publicaciones, ordenadas de la más nueva a la más antigua
        solicitud = """
            SELECT idPublicacion as id, titulo, descripcion
            FROM publicaciones
            WHERE idUsuario = ?
            ORDER BY creada DESC
            """
        parametros = (id_usuario,)
        return DbManager.obtener_registros(solicitud, parametros)

    @staticmethod
    def obtener_publicacion(id_publicacion):
        # Obtiene la información relativa a una publicación única
        solicitud = """
            SELECT comercio, rubro, direccion, horario, telefono, titulo, descripcion
            FROM publicaciones
            WHERE idPublicacion = ?
            """
        parametros = (id_publicacion,)
        return DbManager.obtener_registro(solicitud, parametros)
    
    @staticmethod
    def obtener_directorio_relativo(id_publicacion):
        # Asegura que se levante siempre la misma carpeta aunque se corra la app desde cualquier directorio
        directorio_objetivo = os.path.join('assets', 'publicaciones', str(id_publicacion))
        directorio_publicaciones_repo = os.path.dirname(__file__)
        directorio_base_backend = os.path.abspath(os.path.join(directorio_publicaciones_repo, '..'))
        return os.path.join(directorio_base_backend, directorio_objetivo)
    
    @staticmethod
    def jpg_a_base64(ruta_al_archivo):
        # Lee el archivo de imagen y lo convierte a base64
        with open(ruta_al_archivo, 'rb') as archivo_imagen:
            imagen_base64 = base64.b64encode(archivo_imagen.read()).decode('utf-8')
        return imagen_base64

    @staticmethod
    def base64_a_jpeg(imagen_base64, ruta_al_archivo):
        # Crea un archivo en base a un string base64
        if imagen_base64.startswith('data:image'):
            imagen_base64 = imagen_base64.split(',')[1]
    
        datos_imagen = base64.b64decode(imagen_base64)
        os.makedirs(os.path.dirname(ruta_al_archivo), exist_ok=True) # Asegurarse que existe el directorio
  
        with open(ruta_al_archivo, 'wb') as archivo_salida:
            archivo_salida.write(datos_imagen)


    @staticmethod
    def obtener_imagen(id_publicacion, id_imagen):
        # Obtiene el archivo de imagen indicado asociado a una publicacion en base64
        directorio_imagen = os.path.join(PublicacionesRepo.obtener_directorio_relativo(id_publicacion), f"image_{id_imagen}.jpg")
        if os.path.isfile(directorio_imagen):
            imagen_base64 = PublicacionesRepo.jpg_a_base64(directorio_imagen)
        else:
            imagen_base64 = None
        return imagen_base64

    @staticmethod
    def crear_solicitud_nueva_publicacion(id_usuario_solicitante, datos_nueva_publicacion):
        # Crea una solicitud de nueva pubicacion para su aprobación por parte del municipio
        solicitud = """
            INSERT INTO solicitudesPublicacion (
                idUsuario, comercio, rubro, direccion, horario, telefono, titulo, descripcion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """
        parametros = (
            id_usuario_solicitante,
            datos_nueva_publicacion.get('comercio'),
            datos_nueva_publicacion.get('rubro'),
            datos_nueva_publicacion.get('direccion'),
            datos_nueva_publicacion.get('horario'),
            datos_nueva_publicacion.get('telefono'),
            datos_nueva_publicacion.get('titulo'),
            datos_nueva_publicacion.get('descripcion'),
        )

        return DbManager.actualizar_bd(solicitud, parametros)
    
    @staticmethod
    def almacenar_imagenes(imagenes_base64, id_publicacion):
        # Almacena las imagenes en la carpeta correspondiente a la publicacion
        directorio_imagenes = PublicacionesRepo.obtener_directorio_relativo(id_publicacion)
        
        for idx, imagen_base64 in enumerate(imagenes_base64):
            directorio_salida = os.path.join(directorio_imagenes, f'image_{idx + 1}.jpg')
            PublicacionesRepo.base64_a_jpeg(imagen_base64, directorio_salida)
    
    @staticmethod
    def almacenar_thumbnail(thumbnail_base64, id_publicacion):
        # Almacena el thumbnail en la carpeta correspondiente a la publicacion
        directorio_imagenes = PublicacionesRepo.obtener_directorio_relativo(id_publicacion)
        directorio_salida = os.path.join(directorio_imagenes, 'thumbnail.jpg')
        PublicacionesRepo.base64_a_jpeg(thumbnail_base64, directorio_salida)
            
    
    @staticmethod
    def eliminar_imagenes(id_publicacion):
        # Elimina la carpeta que contiene las imagenes de la publicacion
        directorio_imagenes = PublicacionesRepo.obtener_directorio_relativo(id_publicacion)
        if(os.path.exists(directorio_imagenes)):
            for archivo in os.listdir(directorio_imagenes):
                ruta_al_archivo = os.path.join(directorio_imagenes, archivo)
                os.remove(ruta_al_archivo)
            os.rmdir(directorio_imagenes)
    
    @staticmethod
    def eliminar_publicacion(id_publicacion):
        solicitud = """
            DELETE FROM publicaciones
            WHERE idpublicacion = ?
            """
        parametros = (id_publicacion,)
        DbManager.actualizar_bd(solicitud, parametros)
        PublicacionesRepo.eliminar_imagenes(id_publicacion)