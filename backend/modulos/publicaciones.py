from flask import Blueprint, request, jsonify
import json
from repositorios.publicaciones_repo import PublicacionesRepo
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

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
            }
            for publicacion in publicaciones
        ])
    else:
        respuesta = jsonify({'error': 'No existen publicaciones'}), 204

    return respuesta

@publicaciones_app.route('/publicaciones/<id_publicacion>/thumb', methods=['GET'])
def obtener_thumbnail(id_publicacion):

    thumbnail = PublicacionesRepo.obtener_thumbnail(id_publicacion)

    if not thumbnail: 
        thumbnail = jsonify({'error': 'Thumbnail no encontrado'}), 404

    return thumbnail

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
            }
            for publicacion in publicaciones
        ])
    else:
        respuesta = jsonify({'error': 'No existen publicaciones'}), 204
    
    return respuesta

@publicaciones_app.route('/publicaciones/<int:id_publicacion>', methods=['GET'])
def obtener_publicacion(id_publicacion):
    publicacion = PublicacionesRepo.obtener_publicacion(id_publicacion)
    # imagenes = PublicacionesRepo.obtener_imagenes_publicacion(id_publicacion)
    
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
                #'thumbnail': publicacion[7] if publicacion[7] else None,
                #'imagenes': [img for img in imagenes] if imagenes else []
            }
        )
    
    else:
        respuesta = jsonify({'error': 'Publicación no encontrada'}), 404
    return respuesta

@publicaciones_app.route('/publicaciones/<int:id_publicacion>/image/<int:id_imagen>', methods=['GET'])
def obtener_imagen(id_publicacion, id_imagen):
    imagen = PublicacionesRepo.obtener_imagen(id_publicacion, id_imagen)
    
    if not imagen: 
        imagen = jsonify({'error': 'Imagen no encontrada'}), 404

    return imagen

@publicaciones_app.route('/publicaciones', methods=['POST'])
@jwt_required()
def crear_solicitud_nueva_publicacion():
    id_usuario = get_jwt_identity() # Esto es el ID del usuario en la base de datos
    datos = request.json
    id_solicitud = PublicacionesRepo.crear_solicitud_nueva_publicacion(id_usuario, datos)

    thumbnail = datos.get('thumbnail')
    if(thumbnail):
        PublicacionesRepo.almacenar_thumbnail(thumbnail, id_solicitud)
    
    imagenes = datos.get('imagenes')
    if(imagenes):
        PublicacionesRepo.almacenar_imagenes(imagenes, id_solicitud)

    return jsonify({'status': 'Solicitud creada correctamente'}), 200

@publicaciones_app.route('/publicaciones/<int:id_publicacion>', methods=['DELETE'])
@jwt_required()
def eliminar_publicacion(id_publicacion):
    PublicacionesRepo.eliminar_publicacion(id_publicacion)

    return jsonify({'status': 'Publicacion eliminada correctamente'}), 200