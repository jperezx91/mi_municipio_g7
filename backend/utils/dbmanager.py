import sqlite3
import os

class DbManager:
    @staticmethod
    def obtener_conexion():
        directorio_utils = os.path.dirname(os.path.abspath(__file__))
        directorio_db = os.path.join(directorio_utils, '../../instance/mi_municipio.db')
        return sqlite3.connect(directorio_db)
    
    @staticmethod
    def actualizar_bd(solicitud, parametros = None):
        conexion = DbManager.obtener_conexion()
        with conexion:
            cursor = conexion.cursor()
            cursor.execute(solicitud) if parametros is None else cursor.execute(solicitud, parametros)
            ultimo_id = cursor.lastrowid
            conexion.commit()
        return ultimo_id

    @staticmethod
    def obtener_registro(solicitud, parametros = None):
        conexion = DbManager.obtener_conexion()
        with conexion:
            cursor = conexion.cursor()
            cursor.execute(solicitud) if parametros is None else cursor.execute(solicitud, parametros)
            registro = cursor.fetchone()
        return registro
    
    @staticmethod
    def obtener_registros(solicitud, parametros = None):
        conexion = DbManager.obtener_conexion()
        with conexion:
            cursor = conexion.cursor()
            cursor.execute(solicitud) if parametros is None else cursor.execute(solicitud, parametros)
            registros = cursor.fetchall()
        return registros