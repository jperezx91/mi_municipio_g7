from utils.dbmanager import DbManager
import os
import base64

class ReclamosRepo:

    @staticmethod
    def obtener_todos_reclamos(categoria):
        solicitud = """
            SELECT
                idReclamo AS numero_reclamo,
                rub.descripcion AS categoria,
                estado
            FROM
	            reclamos rec
                LEFT JOIN desperfectos des ON rec.idDesperfecto = des.idDesperfecto
	            LEFT JOIN rubros rub ON des.idRubro = rub.idRubro
            WHERE
                rec.estado IS NOT 'Unificado'
            """

        if categoria:
            solicitud += f" AND categoria = '{categoria}'"

        return DbManager.obtener_registros(solicitud)

    @staticmethod
    def obtener_reclamos_propios(categoria, id_usuario):
        solicitud = """
            SELECT
                rec.idReclamo AS numero_reclamo,
                rub.descripcion AS categoria,
                rec.estado
            FROM
	            reclamos rec
                LEFT JOIN desperfectos des ON rec.idDesperfecto = des.idDesperfecto
	            LEFT JOIN rubros rub ON des.idRubro = rub.idRubro
                LEFT JOIN usuariosVecinos uv ON rec.documento = uv.documento
            WHERE
                uv.idUsuario = ?
            """
        if categoria:
            solicitud += f" AND categoria = '{categoria}'"
        parametros = (id_usuario,)
        return DbManager.obtener_registros(solicitud, parametros)

    @staticmethod
    def obtener_reclamo(id_reclamo):
        solicitud = """
            SELECT
                rub.descripcion AS categoria,
                rec.idReclamo AS numero_reclamo,
                rec.descripcion,
                (sit.calle || ' ' || sit.numero) as ubicacion,
                rec.estado
            FROM
                reclamos rec
                LEFT JOIN desperfectos des ON rec.idDesperfecto = des.idDesperfecto
	            LEFT JOIN rubros rub ON des.idRubro = rub.idRubro
                LEFT JOIN sitios sit ON rec.idSitio = sit.idSitio
            WHERE
                rec.idReclamo = ?
            """
        parametros = (id_reclamo,)
        return DbManager.obtener_registro(solicitud, parametros)

    @staticmethod
    def obtener_seguimiento_reclamo(id_reclamo):
        solicitud = """
            SELECT
                mr.estadoNuevo,
                mr.sectorNuevo,
                mr.causa,
                mr.responsable,
                DATE(mr.fecha) AS fecha
            FROM
	            movimientosReclamo mr
            WHERE idReclamo = ?
            ORDER BY mr.fecha DESC
            """
        parametros = (id_reclamo,)
        return DbManager.obtener_registros(solicitud, parametros)

    @staticmethod
    def obtener_directorio_relativo(id_reclamo):
        # Asegura que se levante siempre la misma carpeta aunque se corra la app desde cualquier directorio
        directorio_objetivo = os.path.join('assets', 'reclamos', str(id_reclamo))
        directorio_reclamos_repo = os.path.dirname(__file__)
        directorio_base_backend = os.path.abspath(os.path.join(directorio_reclamos_repo, '..'))
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
    def obtener_imagen(id_reclamo, id_imagen):
        # Obtiene el archivo de imagen indicado asociado a una publicacion en base64
        directorio_imagen = os.path.join(ReclamosRepo.obtener_directorio_relativo(id_reclamo), f"image_{id_imagen}.jpg")
        if os.path.isfile(directorio_imagen):
            imagen_base64 = ReclamosRepo.jpg_a_base64(directorio_imagen)
        else:
            imagen_base64 = None
        return imagen_base64

    @staticmethod
    def obtener_rubros():
        # Obtiene la lista de rubros definidos
        solicitud = "SELECT idRubro, descripcion FROM rubros"
        return DbManager.obtener_registros(solicitud)

    def obtener_desperfectos(id_rubro):
        # Obtiene la lista de desperfectos asociados al rubro
        solicitud = "SELECT idDesperfecto, descripcion FROM desperfectos WHERE idRubro = ?"
        parametros = (id_rubro,)
        return DbManager.obtener_registros(solicitud, parametros)

    @staticmethod
    def obtener_sitios(latitud, longitud):
        # Obtiene la lista de rubros definidos
        # Esta solicitud devuelve sitios que se encuentren aproximadamente a 50 metros de las coordenadas provistas
        solicitud = """
            SELECT idSitio, calle || ' ' || numero as direccion, descripcion
            FROM sitios
            WHERE latitud BETWEEN ? - 0.00045 AND ? + 0.00045
                AND longitud BETWEEN ? - 0.0007 AND ? + 0.0007
                AND (latitud - ?) * (latitud - ?) + (longitud - ?) * (longitud - ?) <= 0.00045 * 0.00045
            """
        parametros = (latitud, latitud, longitud, longitud, latitud, latitud, longitud, longitud)
        return DbManager.obtener_registros(solicitud, parametros)

    @staticmethod
    def obtener_dni_legajo(id_usuario, rol):
        if rol == "vecino":
            tabla = "usuariosVecinos"
            columnas = "documento"
        else:
            tabla = "usuariosPersonal"
            columnas = "documento, legajo"

        solicitud = f"SELECT {columnas} FROM {tabla} WHERE idUsuario = ?"
        parametros = (id_usuario,)

        registro = DbManager.obtener_registro(solicitud, parametros)

        if len(registro) == 1:
            respuesta = {'documento': registro[0], 'legajo': None}
        else:
            respuesta = {'documento': registro[0], 'legajo': registro[1]}
        return respuesta

    @staticmethod
    def crear_sitio(datos_sitio):
        solicitud = """
            INSERT INTO sitios (
                latitud,
                longitud,
                calle,
                numero,
                entreCalleA,
                entreCalleB,
                descripcion,
                aCargoDe,
                apertura,
                cierre,
                comentarios
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            """
        parametros = (
            datos_sitio.get('latitud'),
            datos_sitio.get('longitud'),
            datos_sitio.get('calle'),
            datos_sitio.get('numero'),
            datos_sitio.get('entreCalleA'),
            datos_sitio.get('entreCalleB'),
            datos_sitio.get('descripcion'),
            datos_sitio.get('aCargoDe'),
            datos_sitio.get('apertura'),
            datos_sitio.get('cierre'),
            datos_sitio.get('comentarios')
        )
        return DbManager.actualizar_bd(solicitud, parametros)

    @staticmethod
    def crear_solicitud_nuevo_reclamo(dni_legajo_usuario_solicitante, datos_nuevo_reclamo):
        # Crea una solicitud de nuevo reclamo para su aprobación por parte del municipio
        id_sitio = datos_nuevo_reclamo.get('idSitio')
        if not id_sitio:
            datos_sitio = datos_nuevo_reclamo.get('datosSitio')
            id_sitio = ReclamosRepo.crear_sitio(datos_sitio)

        solicitud = """
            INSERT INTO solicitudesReclamo (
                documento, legajo, idSitio, idDesperfecto, descripcion
            ) VALUES (?, ?, ?, ?, ?)
            """
        parametros = (
            dni_legajo_usuario_solicitante['documento'],
            dni_legajo_usuario_solicitante['legajo'],
            id_sitio,
            datos_nuevo_reclamo.get('idDesperfecto'),
            datos_nuevo_reclamo.get('descripcion'),
        )

        return DbManager.actualizar_bd(solicitud, parametros)

    @staticmethod
    def almacenar_imagenes(imagenes_base64, id_reclamo):
        # Almacena las imagenes en la carpeta correspondiente al reclamo
        directorio_imagenes = ReclamosRepo.obtener_directorio_relativo(id_reclamo)

        for idx, imagen_base64 in enumerate(imagenes_base64):
            directorio_salida = os.path.join(directorio_imagenes, f'image_{idx + 1}.jpg')
            ReclamosRepo.base64_a_jpeg(imagen_base64, directorio_salida)

    @staticmethod
    def eliminar_imagenes(id_reclamo):
        # Elimina la carpeta que contiene las imagenes del reclamo
        directorio_imagenes = ReclamosRepo.obtener_directorio_relativo(id_reclamo)
        if(os.path.exists(directorio_imagenes)):
            for archivo in os.listdir(directorio_imagenes):
                ruta_al_archivo = os.path.join(directorio_imagenes, archivo)
                os.remove(ruta_al_archivo)
            os.rmdir(directorio_imagenes)
