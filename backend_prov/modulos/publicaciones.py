from flask import Blueprint, request, jsonify
from utils.dbmanager import DbManager

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
    print("Obteniendo publicacion con id",id)
    solicitud_publicacion = """
        SELECT titulo, direccion, horario, telefono, descripcion, thumbnail
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
                'titulo': publicacion[0],
                'direccion': publicacion[1],
                'horario': publicacion[2],
                'telefono': publicacion[3],
                'descripcion': publicacion[4],
                'thumbnail': publicacion[5] if publicacion[5] else None,
                'imagenes': [img[0] for img in imagenes] if imagenes else []  # List of images
            }
        )
    
    else:
        respuesta = jsonify({'error': 'Publicación no encontrada'}), 404

    return respuesta
