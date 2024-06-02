from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'municipio.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app)

    class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(100), unique=True, nullable=False)
        password = db.Column(db.String(200), nullable=False)  
    
    
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data['username']
        password = data['password']
        
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            if check_password_hash(user.password, password):
                return jsonify({'message': 'Login successful!'})
            else:
                return jsonify({'error': 'Invalid password'}), 401
        else:
            return jsonify({'error': 'User not found'}), 404

    return app