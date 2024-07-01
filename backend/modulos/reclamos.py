from flask import Blueprint, request, jsonify
import json
from repositorios.reclamos_repo import ReclamosRepo
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, get_jwt

reclamos_app = Blueprint('reclamos', __name__)

@reclamos_app.route('/reclamos', methods=['GET'])
@jwt_required()
def obtener_reclamos():

    todos_los_reclamos = request.args.get('all', 'false').lower() == 'true'
    categoria = request.args.get('categoria', None)
    id_usuario = get_jwt_identity() if request.args.get('from', None) else None


    if todos_los_reclamos:
        reclamos = ReclamosRepo.obtener_todos_reclamos(categoria)
    elif id_usuario:
        reclamos = ReclamosRepo.obtener_reclamos_propios(categoria, id_usuario)

    if reclamos:
        respuesta = jsonify([
            {
                'numero_reclamo': str(reclamo[0]),
                'categoria': reclamo[1],
                'estado': reclamo[2]
            }
            for reclamo in reclamos
        ]), 200
    else:
        respuesta = jsonify({'error': 'No existen reclamos'}), 204

    return respuesta

@reclamos_app.route('/reclamos/<int:id_reclamo>', methods=['GET'])
@jwt_required()
def obtener_reclamo(id_reclamo):

    reclamo = ReclamosRepo.obtener_reclamo(id_reclamo)

    if reclamo:
        respuesta = jsonify(
            {
                'categoria': reclamo[0],
                'numero_reclamo': str(reclamo[1]),
                'desc': reclamo[2],
                'ubicacion': reclamo[3],
                'estado': reclamo[4]
            }
        ), 200
    else:
        respuesta = jsonify({'error': 'No existe el reclamo'}), 404

    return respuesta

@reclamos_app.route('/reclamos/<int:id_reclamo>/seguimiento', methods=['GET'])
@jwt_required()
def obtener_seguimiento_reclamo(id_reclamo):

    info_seguimiento = ReclamosRepo.obtener_seguimiento_reclamo(id_reclamo)

    if info_seguimiento:
        respuesta = jsonify([
            {
                'estado': seguimiento[0],
                'sector': seguimiento[1],
                'causa': seguimiento[2],
                'responsable': seguimiento[3],
                'fecha': seguimiento[4]
            }
            for seguimiento in info_seguimiento
        ]), 200
    else:
        respuesta = jsonify({'error': 'No existe el reclamo'}), 404

    return respuesta

@reclamos_app.route('/reclamos/<int:id_reclamo>/imagen/<id_imagen>', methods=['GET'])
@jwt_required()
def obtener_imagen_reclamo(id_reclamo, id_imagen):

    imagen = ReclamosRepo.obtener_imagen(id_reclamo, id_imagen)

    if not imagen:
        imagen = jsonify({'error': 'Imagen no encontrada'}), 404

    return imagen

@reclamos_app.route('/reclamos/rubros', methods=['GET'])
@jwt_required()
def obtener_rubros():
    rubros = ReclamosRepo.obtener_rubros()
    if rubros:
        respuesta = jsonify([
            {
                'id': rubro[0],
                'descripcion': rubro[1]
            }
            for rubro in rubros
        ])
    else:
        respuesta = jsonify({'error': 'No existen rubros'}), 204

    return respuesta

@reclamos_app.route('/reclamos/sitios', methods=['GET'])
@jwt_required()
def obtener_sitios():
    longitud = request.args.get('lon', None)
    latitud = request.args.get('lat', None)

    if longitud is None or latitud is None:
        respuesta = jsonify({'error': 'Latitud o longitud no provistas'}), 204

    else:
        sitios = ReclamosRepo.obtener_sitios(longitud, latitud)
        if sitios:
            respuesta = jsonify([
                {
                    'id': sitio[0],
                    'direccion': sitio[1],
                    'descripcion': sitio[2]
                }
                for sitio in sitios
            ])
        else:
            respuesta = jsonify({'error': 'No existen sitios'}), 204

    return respuesta

@reclamos_app.route('/reclamos', methods=['POST'])
@jwt_required()
def crear_solicitud_nuevo_reclamo():
    id_usuario = get_jwt_identity()
    rol = get_jwt().get('rol')
    dni_legajo = ReclamosRepo.obtener_dni_legajo(id_usuario, rol) # Reclamos identifica por DNI o legajo, no por id

    datos = request.json
    id_solicitud = ReclamosRepo.crear_solicitud_nuevo_reclamo(dni_legajo, datos)

    imagenes = datos.get('imagenes')
    if(imagenes):
        ReclamosRepo.almacenar_imagenes(imagenes, id_solicitud)

    return jsonify({'status': 'Solicitud creada correctamente'}), 200

@reclamos_app.route('/reclamos/<int:id_reclamo>/imagen', methods=['POST'])
@jwt_required()
def cargar_imagen_reclamo(id_reclamo):
    imagenes = datos.get('imagenes')
    if(imagenes):
        ReclamosRepo.almacenar_imagenes(imagenes, id_solicitud)

    return jsonify({'status': 'Solicitud creada correctamente'}), 200
