from flask import Blueprint, request, jsonify
from utils.dbmanager import DbManager
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

publicaciones_app = Blueprint('publicaciones', __name__)

@publicaciones_app.route('/publicaciones', methods=['GET'])
def obtener_publicaciones():

    solicitud = """
        SELECT idPublicacion as id, titulo, thumbnail, descripcion
        FROM publicaciones
        ORDER BY creada DESC
        """
    publicaciones = DbManager.obtener_registros(solicitud)

    if publicaciones:
        respuesta = jsonify([
            {
                'id': str(publicacion[0]),
                'titulo': publicacion[1],
                'descripcion': publicacion[3],
                'imgBase64': publicacion[2] if publicacion[2] else None # Me aseguro de incluir None si no hay thumbnail para que se active el placeholder
            }
            for publicacion in publicaciones
        ])
    
    else:
        respuesta = jsonify({'error': 'No existen publicaciones'}), 404
    
    return respuesta

@publicaciones_app.route('/publicaciones/<int:id>', methods=['GET'])
def obtener_publicacion(id):
    solicitud_publicacion = """
        SELECT comercio, rubro, direccion, horario, telefono, titulo, descripcion, thumbnail
        FROM publicaciones
        WHERE idPublicacion = ?
    """
    parametros = (id,)
    publicacion = DbManager.obtener_registro(solicitud_publicacion, parametros)

    solicitud_imagenes = """
        SELECT imagen
        FROM publicacionesImagenes
        WHERE idPublicacion = ?
    """
    imagenes = DbManager.obtener_registros(solicitud_imagenes, parametros)

    if publicacion:
        respuesta = jsonify(
            {
                'comercio': publicacion[0],
                'rubro': publicacion[1],
                'direccion': publicacion[2],
                'horario': publicacion[3],
                'telefono': publicacion[4],
                'titulo': publicacion[5],
                'descripcion': publicacion[6],
                'thumbnail': publicacion[7] if publicacion[7] else None,
                'imagenes': [img[0] for img in imagenes] if imagenes else []
            }
        )
    
    else:
        respuesta = jsonify({'error': 'Publicación no encontrada'}), 404

    return respuesta

@publicaciones_app.route('/publicaciones', methods=['POST'])
@jwt_required()
def crear_solicitud_nueva_publicacion():
    id_usuario = get_jwt_identity() # Esto es el ID del usuario en la base de datos
    datos = request.json
    solicitud = """
        INSERT INTO solicitudesPublicacion (
            idUsuario, comercio, rubro, direccion, horario, telefono, titulo, descripcion, thumbnail
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    parametros = (
        id_usuario,
        datos.get('comercio'),
        datos.get('rubro'),
        datos.get('direccion'),
        datos.get('horario'),
        datos.get('telefono'),
        datos.get('titulo'),
        datos.get('descripcion'),
        datos.get('thumbnail')
    )

    DbManager.actualizar_bd(solicitud, parametros)
    
    imagenes = datos.get('imagenes')
    if(imagenes):
        id_solicitud = DbManager.obtener_registro("SELECT MAX(idSolicitudPublicacion) FROM solicitudesPublicacion",)[0] # Esto devuelve una tupla (id, )
        for imagen in imagenes:
            solicitud = "INSERT INTO solicitudesPublicacionImagenes (idSolicitudPublicacion, imagen) VALUES (?, ?)"
            parametros = (id_solicitud, imagen)
            with open("output.txt", 'a') as f:
                print(parametros, file=f)
            DbManager.actualizar_bd(solicitud, parametros)

    return jsonify({'status': 'Solicitud creada correctamente'}), 200