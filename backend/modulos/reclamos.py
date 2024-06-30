from flask import Blueprint, request, jsonify
import json
from repositorios.reclamos_repo import ReclamosRepo
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

reclamos_app = Blueprint('reclamos', __name__)

@reclamos_app.route('/reclamos', methods=['GET'])
@jwt_required()
def obtener_reclamos():
    todos_los_reclamos = request.args.get('all', 'false').lower() == 'true'

    if all_reclamos:
        reclamos = ReclamosRepo.obtener_todos_los_reclamos()
    else:
        user_id = get_jwt_identity()
        reclamos = ReclamosRepo.obtener_reclamos_usuario(user_id)
    
    respuesta = jsonify(reclamos), 200 if reclamos else jsonify({'error': 'No existen publicaciones'}), 204
    
    return respuesta