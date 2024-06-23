from flask import Blueprint, request, jsonify
import json
from utils.dbmanager import DbManager
from repositorios.publicaciones_repo import PublicacionesRepo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

publicaciones_app = Blueprint('publicaciones', __name__)

@publicaciones_app.route('/publicaciones', methods=['GET'])
def obtener_publicaciones():

    publicaciones = PublicacionesRepo.obtener_publicaciones()

    if publicaciones:
        respuesta = jsonify([
            {
                'id': str(publicacion[0]),
                'titulo': publicacion[1],
                'descripcion': publicacion[2],
                # Me aseguro de incluir None si no hay thumbnail para que se active el placeholder
                'imgBase64': publicacion[3] if publicacion[3] else None
            }
            for publicacion in publicaciones
        ])
        # response_data = json.dumps(respuesta)
        # respuesta.content_length = ""
        # print(respuesta.content_length)
    else:
        respuesta = jsonify({'error': 'No existen publicaciones'}), 204

    return respuesta

@publicaciones_app.route('/publicaciones/propias', methods=['GET'])
@jwt_required()
def obtener_publicaciones_propias():
    id_usuario = get_jwt_identity() # Esto es el ID del usuario en la base de datos
    publicaciones = PublicacionesRepo.obtener_publicaciones_propias(id_usuario)

    if publicaciones:
        respuesta = jsonify([
            {
                'id': str(publicacion[0]),
                'titulo': publicacion[1],
                'descripcion': publicacion[2],
                # Me aseguro de incluir None si no hay thumbnail para que se active el placeholder
                'imgBase64': publicacion[3] if publicacion[3] else None
            }
            for publicacion in publicaciones
        ])
    else:
        respuesta = jsonify({'error': 'No existen publicaciones'}), 204
    
    return respuesta

@publicaciones_app.route('/publicaciones/<int:id_publicacion>', methods=['GET'])
def obtener_publicacion(id_publicacion):
    publicacion = PublicacionesRepo.obtener_publicacion(id_publicacion)
    imagenes = PublicacionesRepo.obtener_imagenes_publicacion(id_publicacion)
    
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
                'imagenes': [img for img in imagenes] if imagenes else []
            }
        )
    
    else:
        respuesta = jsonify({'error': 'Publicación no encontrada'}), 404
    # respuesta.content_length = ""
    return respuesta

@publicaciones_app.route('/publicaciones', methods=['POST'])
@jwt_required()
def crear_solicitud_nueva_publicacion():
    id_usuario = get_jwt_identity() # Esto es el ID del usuario en la base de datos
    datos = request.json
    id_solicitud = PublicacionesRepo.crear_solicitud_nueva_publicacion(id_usuario, datos)
    
    imagenes = datos.get('imagenes')
    if(imagenes):
        PublicacionesRepo.almacenar_imagenes(imagenes, id_solicitud)

    return jsonify({'status': 'Solicitud creada correctamente'}), 200

@publicaciones_app.route('/publicaciones/<int:id_publicacion>', methods=['DELETE'])
@jwt_required()
def eliminar_publicacion(id_publicacion):
    PublicacionesRepo.eliminar_publicacion(id_publicacion)

    return jsonify({'status': 'Publicacion eliminada correctamente'}), 200