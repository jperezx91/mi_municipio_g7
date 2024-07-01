from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from repositorios.notificaciones_repo import NotificacionesRepo
notificaciones_app = Blueprint('notificaciones', __name__)

@notificaciones_app.route('/notificaciones/cantidad', methods=['GET'])
@jwt_required()
def notificaciones_cantidad():
    id_user = get_jwt_identity()  # Esto es el ID del usuario en la base de datos
    datos = get_jwt()
    rol = datos["rol"]
    cantidad = NotificacionesRepo.obtener_numero_notificaciones(id_user, rol)
    return {"cantidadNotificaciones": cantidad}, 200

@notificaciones_app.route("/notificaciones/", methods=['GET'])
@jwt_required()
def notificaciones():
    id_user = get_jwt_identity()
    datos = get_jwt()
    rol = datos["rol"]
    notificaciones = NotificacionesRepo.obtener_notificaciones(id_user, rol)
    respuesta = {
        "notificaciones": [
            {
                "idNotificacion": notificacion[0],
                "tipo": notificacion[1],
                "titulo": notificacion[2],
                "mensaje": notificacion[3],
            } for notificacion in notificaciones
        ]
    }
    return respuesta
