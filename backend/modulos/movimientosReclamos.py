from flask import Blueprint, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

from repositorios.movimientosReclamos_repo import MovimientosReclamoRepo
from repositorios.usuario_repo import UsuarioRepo

movimientosReclamo_app = Blueprint('movimientosReclamos', __name__)
"""
@movimientosReclamo_app.route('/movimientosReclamos', methods=['GET'])
@jwt_required()
def movimientosReclamo():
    id_usuario = get_jwt_identity()
    movimientosReclamos = MovimientosReclamoRepo.obtener_movimientos_reclamo(id_usuario)
    if movimientosReclamos:
        respuesta = jsonify([
            {
                'idMovimiento': str(movimientosReclamo[0]),
                'idReclamo': str(movimientosReclamo[1]),
                'responsable': movimientosReclamo[2],
                'causa': movimientosReclamo[3],
                'fecha': movimientosReclamo[4],
            }
            for movimientosReclamo in movimientosReclamos
        ])
    else:
        respuesta = jsonify({'error': 'No existen movimientosReclamos'}), 204
    
    return respuesta
"""

@movimientosReclamo_app.route('/movimientosReclamos', methods=['GET'])
@jwt_required()
def movimientosReclamos():
    id_usuario = get_jwt_identity()
    movimientosReclamos = MovimientosReclamoRepo.obtener_movimientos_reclamo(id_usuario)
    cantidad = len(movimientosReclamos)
    respuesta ={
        "cantidad": cantidad,
        "movimientosReclamos": [
            {
                'idMovimiento': str(movimientosReclamo[0]),
                'idReclamo': str(movimientosReclamo[1]),
                'responsable': movimientosReclamo[2],
                'causa': movimientosReclamo[3],
                'fecha': movimientosReclamo[4],
            }
            for movimientosReclamo in movimientosReclamos]
    }
    return respuesta, 200