from flask import Blueprint, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

from controllers.user_controller import UserController
from utils.errorcode import StatusCode
perfil_app = Blueprint('perfil', __name__)

@perfil_app.route("/perfil", methods=["PUT"])
@jwt_required()
def change_password():
    if request.query_string == b"password":
        id_user = get_jwt_identity()
        datos = request.json
        ucontroller = UserController()
        ucontroller.change_password(datos["password"], id_usuario=id_user)
        return '', 200
    elif request.query_string == b"password_profile":
        id_user = get_jwt_identity()
        ucontroller = UserController()
        datos = request.json
        u = ucontroller.validar_usuario(id_user, datos["oldpassword"])
        print(u)
        if u is not None:
            ucontroller.change_password(datos["password"], id_usuario=id_user)
            return '', 200
        else:
            return '', 404

    return '', 200

@perfil_app.route("/perfil",methods=["GET"])
@jwt_required()
def ver_perfil():
    id_user = get_jwt_identity() # Esto es el ID del usuario en la base de datos
    datos = get_jwt()
    rol = datos["rol"]
    ucontroller = UserController()
    u = ucontroller.get_usuario_by_id(id_user, rol)
    if u is None:
        return '', 404
    else:
        return {
            'nombre': u.nombre + " " + u.apellido,
            "email": u.email,
            "documento": u.documento,
            "direccion": u.direccion,
            "barrio": u.barrio
        }
