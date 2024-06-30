from flask import Blueprint, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

from repositorios.denuncias_repo import DenunciasRepo
from repositorios.usuario_repo import UsuarioRepo

denuncias_app = Blueprint('denuncias', __name__)

@denuncias_app.route('/denuncias', methods=['GET'])
@jwt_required()
def denuncias():
    id_usuario = get_jwt_identity()
    denuncias = DenunciasRepo.obtener_denuncias(id_usuario)
    cantidad = len(denuncias)
    respuesta ={
        "cantidad": cantidad,
        "denuncias": [
            {
                "idDenuncia": denuncia[0],
             "estado": denuncia[1]} for denuncia in denuncias]
    }
    return respuesta, 200
@denuncias_app.route('/denuncias/recibidas', methods=['GET'])
@jwt_required()
def denuncias_recibidas():
    id_usuario = get_jwt_identity()
    denuncias = DenunciasRepo.obtener_denuncias_recibidas(id_usuario)
    cantidad = len(denuncias)
    respuesta ={
        "cantidad": cantidad,
        "denuncias": [
            {
                "idDenuncia": denuncia[0],
             "estado": denuncia[1]} for denuncia in denuncias]
    }
    return respuesta, 200

@denuncias_app.route("/denuncias", methods=['POST'])
@jwt_required()
def crear_denuncia():
    id_usuario = get_jwt_identity()
    datos = request.json
    imagenes = datos.get("imagenes")
    id_denuncia = DenunciasRepo.crear_denuncia(id_usuario, datos)
    if imagenes:
        DenunciasRepo.almacenar_imagenes(imagenes, id_denuncia)

    return {"status": "ok"}, 200

@denuncias_app.route("/denuncias/<id_denuncia>", methods=['GET'])
def denuncia(id_denuncia):
    denuncia = DenunciasRepo.obtener_denuncia(id_denuncia)
    respuesta = {
        "descripcion": denuncia[0],
        "direccion": f"{denuncia[1]} {denuncia[2]}",
        "estado": denuncia[3]
    }
    return respuesta, 200

@denuncias_app.route("/denuncias/<id_denuncia>/image/<id_imagen>", methods=['GET'])
def obtener_imagen(id_denuncia, id_imagen):
    imagen = DenunciasRepo.obtener_imagen(id_denuncia, id_imagen)
    if not imagen:
        return {"error": "Imagen no encontrada"}, 404

    return imagen, 200