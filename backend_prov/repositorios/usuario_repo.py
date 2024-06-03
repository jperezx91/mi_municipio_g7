import random

import pymysql

from entities.usuario import Usuario
from utils.dbmanager import DbManager
from utils.errorcode import StatusCode
import bcrypt
class UsuarioRepo:

    @staticmethod
    def change_password(password, id_usuario):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("UPDATE usuarios SET password=%s, ftime=0 WHERE idUsuario=%s", (password, id_usuario))
            conexion.commit()
            cursor.close()
        conexion.close()
    @staticmethod
    def existe_vecino(usuarioInp: Usuario):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT documento FROM vecinos WHERE documento = %s", (usuarioInp.documento, ))
            r = cursor.fetchone()
            print(r, "resultado")
            return r is not None
    @staticmethod
    def existe_usuario(documento):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT idUsuario FROM usuarios WHERE documento = %s", (documento, ))
            r = cursor.fetchone()
            cursor.close()
            conexion.close()
            return r is not None
    @staticmethod
    def existe_usuario_con_mail(email, documento):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT idUsuario FROM usuarios WHERE email=%s AND documento=%s", (email, documento))
            r = cursor.fetchone()
            cursor.close()
            conexion.close()
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
            cursor.execute("SELECT idUsuario, password, vc.nombre as nombre, ftime FROM usuarios us LEFT JOIN vecinos vc ON us.documento = vc.documento WHERE us.email = %s", usuarioInp.email)
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
                u.ftime = usuario[3] == 1
                r = {"status": StatusCode.CORRECTO, "usuario": u}
            else:
                r = {"status": StatusCode.DATOS_INVALIDOS, "usuario": None}
            conexion.close()
            return r
    @staticmethod
    def agregar_recupero(documento):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            codigo = str(random.randint(1000, 9999))
            cursor.execute("INSERT INTO recupero (documento, codigo, status) VALUES (%s, %s, 1)", (documento, codigo))
            conexion.commit()
            cursor.close()
            conexion.close()

    @staticmethod
    def get_usuario_by_codigo(codigo):
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT us.idUsuario, us.email, us.password, us.documento as documento, vc.nombre AS nombre "
                           "FROM recupero rc "
                           "LEFT JOIN vecinos vc ON vc.documento = rc.documento "
                           "LEFT JOIN usuarios us ON rc.documento = us.documento "
                           "WHERE codigo = %s AND status = 1", (codigo, ))
            r = cursor.fetchone()

            if r is None:
                return None
            cursor.execute("UPDATE recupero SET status = 0 WHERE codigo = %s", (codigo, ))
            conexion.commit()
            cursor.close()
            conexion.close()
            usuario = Usuario()
            usuario.idUsuario = r[0]
            usuario.email = r[1]
            usuario.password = r[2]
            usuario.documento = r[3]
            usuario.nombre = r[4]
            return usuario
    def validar_municipal(usuarioInp: Usuario):
        return True
