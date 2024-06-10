import pymysql

class DbManager:
    @staticmethod
    def obtener_conexion():
        return pymysql.connect(host="localhost",
                               user="root",
                               password="MySQL-DA1",
                               db="mi_municipio")
    
    @staticmethod
    def actualizar_bd(solicitud, parametros):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute(solicitud, parametros)
            conexion.commit()
        conexion.close()

    @staticmethod
    def obtener_registro(solicitud, parametros):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute(solicitud, parametros)
            conexion.commit()
            registro = cursor.fetchone()
        conexion.close()
        return registro