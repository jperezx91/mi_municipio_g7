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
                                                              "nombre": resultado["usuario"].nombre}, expires_delta=False)
        return {"logged": True, "token": access_token, "ftime": resultado["usuario"].ftime}, 200
    elif resultado["status"] is StatusCode.NO_ENCONTRADO:
        return {"logged": False, "msg": "No existe el usuario en nuestro registro."}, 404
    elif resultado["status"] is StatusCode.DATOS_INVALIDOS:
        return {"logged": False, "msg": "Los datos ingresados son inválidos. Por favor revisa los mismos."}, 403

@login_app.route("/signin", methods=['POST'])
def signin():
    datos = request.json
    ucontroller = UserController()
    print(datos)
    resultado = ucontroller.signin(datos)
    if resultado[0]:
        return {"status" : "ok"}
    elif resultado[1] == 404:
        return {"error": True, "msg": "No existe el DNI"}, 404
    else:
        return {"error": True, "msg": "Ya hay un usuario registrado con ese DNI"}, 409

# Mover luego a perfil.py
@login_app.route("/perfil", methods=['POST'])
def pedir_cambio_pass():
    if request.query_string == b"solicitud_pass":
        ucontroller = UserController()
        datos = request.json
        email = datos.get("email")
        dni = datos.get("documento")
        valido = ucontroller.solicitar_cambio_pass(email, dni)
        print(valido, email, dni)
        if valido:
            ucontroller.agregar_recupero(dni)
            return {"status": "ok"}, 200
        else:
            return {"error": True, "msg": "No existe el E-Mail o DNI correspondientes."}, 404
    elif request.query_string == b"verificar_codigo":
        ucontroller = UserController()
        datos = request.json
        codigo = datos.get("codigo")
        usuario = ucontroller.get_usuario_by_codigo(codigo)
        if usuario:
            access_token = create_access_token(identity=usuario.idUsuario,
                                               additional_claims={'rol': "vecino",
                                                                  "nombre": usuario.nombre}, expires_delta=False)
            return {"token": access_token}, 200
        else:
            return {"error": True, "msg": "No existe el código correspondientes."}, 404



