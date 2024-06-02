import random

import pymysql

from entities.usuario import Usuario
from utils.dbmanager import DbManager
from utils.errorcode import StatusCode
import bcrypt
class UsuarioRepo:
    @staticmethod
    def existe_vecino(usuarioInp: Usuario):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            print(usuarioInp.documento, "!!!!!!!!!!!!!")
            cursor.execute("SELECT documento FROM vecinos WHERE documento = %s", (usuarioInp.documento, ))
            r = cursor.fetchone()
            print(r, "resultado")
            return r is not None
    @staticmethod
    def registrar_solicitud(usuarioInp: Usuario):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            codigo = str(random.randint(1000, 9999))
            cursor.execute("INSERT INTO solicitudes (documento, codigo, email, status) VALUES (%s, %s, %s, 1)"
                           , (str(usuarioInp.documento), codigo, usuarioInp.email))
            cursor.connection.commit()
            cursor.close()

    @staticmethod
    def validar_vecino(usuarioInp: Usuario):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT idUsuario, password, vc.nombre as nombre FROM usuarios us LEFT JOIN vecinos vc ON us.documento = vc.documento WHERE us.email = %s", usuarioInp.email)
            usuario = cursor.fetchone()
            if usuario is None:
                conexion.close()
                return {"status" : StatusCode.NO_ENCONTRADO, "usuario": None}
            # valido = bcrypt.checkpw(usuario['password'], usuarioInp.password)
            valido = usuario[1] == usuarioInp.password
            if valido:
                u = Usuario()
                u.idUsuario = usuario[0]
                u.nombre = usuario[2]
                u.rol = 'vecino'
                r = {"status": StatusCode.CORRECTO, "usuario": u}
            else:
                r = {"status": StatusCode.DATOS_INVALIDOS, "usuario": None}
            conexion.close()
            return r

    def validar_municipal(usuarioInp: Usuario):
        return True
