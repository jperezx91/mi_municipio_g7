from flask import Blueprint, request, jsonify
from utils.dbmanager import DbManager

publicaciones_app = Blueprint('publicaciones', __name__)

@publicaciones_app.route('/publicaciones', methods=['GET'])
def obtener_publicaciones():
    solicitud = "SELECT idPublicacion as id, titulo, thumbnail, descripcion FROM publicaciones"
    registros = DbManager.obtener_registros(solicitud)
    respuesta = [
        {
            'id': str(registro[0]),
            'titulo': registro[1],
            'descripcion': registro[3],
            'imgBase64': registro[2] if registro[2] else None
        }
        for registro in registros
    ]
    return jsonify(respuesta)