from flask import Blueprint, request, jsonify
import json
from repositorios.reclamos_repo import ReclamosRepo
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

reclamos_app = Blueprint('reclamos', __name__)

@reclamos_app.route('/reclamos', methods=['GET'])
@jwt_required()
def obtener_reclamos():

    todos_los_reclamos = request.args.get('all', 'false').lower() == 'true'
    categoria = request.args.get('categoria', None)
    id_usuario = get_jwt_identity() if request.args.get('from', None) else None


    if todos_los_reclamos:
        reclamos = ReclamosRepo.obtener_todos_los_reclamos(categoria, id_usuario)

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
                'numero_reclamo': str(reclamo[0]),
                'categoria': reclamo[1],
                'estado': reclamo[2]
            }
        ), 200
    else:
        respuesta = jsonify({'error': 'No existen el reclamo'}), 404

    return respuesta
