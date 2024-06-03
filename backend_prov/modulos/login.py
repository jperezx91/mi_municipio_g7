from flask import Blueprint, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

from controllers.user_controller import UserController
from utils.errorcode import StatusCode
login_app = Blueprint('login', __name__)
import time
@login_app.route('/login', methods=['POST'])
def login():
    datos = request.json
    ucontroller = UserController()
    resultado = ucontroller.login(datos)
    print("resultado es", resultado)
    if resultado["status"] == StatusCode.CORRECTO:
        access_token = create_access_token(identity=resultado["usuario"].idUsuario,
                                           additional_claims={'rol': resultado["usuario"].rol,
                                                              "nombre": resultado["usuario"].nombre})
        return {"logged": True, "token": access_token, "ftime": resultado["usuario"].ftime}, 200
    elif resultado["status"] is StatusCode.NO_ENCONTRADO:
        return {"logged": False, "msg": "No existe el usuario en nuestro registro."}, 404
    elif resultado["status"] is StatusCode.DATOS_INVALIDOS:
        return {"logged": False, "msg": "Los datos ingresados son inválidos. Por favor revisa los mismos."}, 403
@login_app.route("/signin", methods=['POST'])
def signin():
    datos = request.json
    ucontroller = UserController()
    resultado = ucontroller.signin(datos)
    if resultado[0]:
        return {"status" : "ok"}
    elif resultado[1] == 404:
        return {"error": True, "msg": "No existe el DNI"}, 404
    else:
        return {"error": True, "msg": "Ya hay un usuario registrado con ese DNI"}, 409



