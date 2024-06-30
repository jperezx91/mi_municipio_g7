from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity

from modulos import publicaciones
from modulos.login import login_app
from modulos.perfil import  perfil_app
from modulos.publicaciones import publicaciones_app
from modulos.reclamos import reclamos_app
from modulos.denuncias import denuncias_app

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'clavesecretaparalaapi'
jwt = JWTManager(app)

app.register_blueprint(login_app, url_prefix='/api')
app.register_blueprint(perfil_app, url_prefix='/api')
app.register_blueprint(publicaciones_app, url_prefix='/api')
app.register_blueprint(reclamos_app, url_prefix='/api')
app.register_blueprint(denuncias_app, url_prefix='/api')

@app.route("/api/logout")
@jwt_required()
def test_jwt():
    protegido = get_jwt_identity()
    data =  get_jwt()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)