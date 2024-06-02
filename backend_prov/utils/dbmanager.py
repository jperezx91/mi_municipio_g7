import pymysql
class DbManager:
    @staticmethod
    def obtener_conexion():
        return pymysql.connect(host="localhost", user="root", password="", db="mi_municipio")