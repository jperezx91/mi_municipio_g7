import random
from entities.usuario import Usuario
from utils.dbmanager import DbManager
from utils.errorcode import StatusCode


class UsuarioRepo:

    @staticmethod
    def change_password(password, id_usuario):
    # Cambia la contraseña de un usuario
        solicitud = "UPDATE usuarios SET password=%s, ftime=0 WHERE idUsuario=%s"
        parametros = (password, id_usuario)
        DbManager.actualizar_bd(solicitud, parametros)

    @staticmethod
    def existe_vecino(usuarioInp: Usuario):
    # Informa si el DNI corresponde a una persona que vive en el municipio
        solicitud = "SELECT documento FROM vecinos WHERE documento = %s"
        parametros = (usuarioInp.documento, )
        vecino = DbManager.obtener_registro(solicitud, parametros)
        print(vecino, "resultado")
        return vecino is not None

    @staticmethod
    def existe_solicitud(usuarioInp: Usuario):
    # Verifica si hay una solicitud existente de creación de usuario para una combinación de mail y DNI
        solicitud = "SELECT documento, email FROM solicitudes WHERE documento = %s and email = %s"
        parametros = (usuarioInp.documento, usuarioInp.email)
        solicitud_existente = DbManager.obtener_registro(solicitud, parametros)
        return solicitud_existente is not None
    
    @staticmethod
    def existe_usuario(documento):
    # Informa si el DNI ingresado corresponde a un usuario ya registrado en la app
        solicitud = "SELECT idUsuario FROM usuarios WHERE documento = %s"
        parametros = (documento, )
        return DbManager.obtener_registro(solicitud, parametros) is not None
    
    @staticmethod
    def validar_usuario(id_usuario, password):
    # Devuelve el usuario si existe y si se ingresó la contraseña correcta
        solicitud = "SELECT idUsuario, password FROM usuarios WHERE idUsuario = %s"
        parametros = (id_usuario, )
        usuario = DbManager.obtener_registro(solicitud, parametros)
        if usuario is not None and usuario[1] != password:
            usuario = None
        return usuario
        
    @staticmethod
    def existe_usuario_con_mail(email, documento):
    # Informa si existe el usuario en base a la combinación de mail y DNI
        solicitud = "SELECT idUsuario FROM usuarios WHERE email=%s AND documento=%s"
        parametros = (email, documento)
        return DbManager.obtener_registro(solicitud, parametros) is not None

    @staticmethod
    def registrar_solicitud(usuarioInp: Usuario):
    # Crea una solicitud de creación de usuario para un vecino válido
        codigo = str(random.randint(1000, 9999))
        solicitud = "INSERT INTO solicitudes (documento, codigo, email, status) VALUES (%s, %s, %s, 1)"
        parametros = (str(usuarioInp.documento), codigo, usuarioInp.email)
        DbManager.actualizar_bd(solicitud, parametros)

    @staticmethod
    def crear_usuario(registro, rol):
    # Convierte el registro SQL ya validado en un objeto Usuario
        usuario = Usuario()
        usuario.idUsuario = registro[0]
        usuario.nombre = registro[2]
        usuario.rol = rol
        usuario.ftime = registro[3] == 1
        return usuario
    
    @staticmethod
    def obtener_resultado_login(registro, password, rol):
    # Procesa el registro SQL obtenido de un intento de login y devuelve el usuario si corresponde
        if registro is None:
            resultado = {"status" : StatusCode.NO_ENCONTRADO, "usuario": None}
        elif registro[1] == password:
            usuario = UsuarioRepo.crear_usuario(registro, rol)
            resultado = {"status": StatusCode.CORRECTO, "usuario": usuario}
        else:
            resultado = {"status": StatusCode.DATOS_INVALIDOS, "usuario": None}
        return resultado

    @staticmethod
    def validar_vecino(usuarioInp: Usuario):
    # Valida la existencia del usuario y el ingreso de la contraseña correcta para hacer el login, variante vecino
        # Triple comilla para poder partir el string en varias lineas porque es larguísimo
        solicitud = """SELECT idUsuario, password, vc.nombre as nombre, ftime 
                       FROM usuarios us LEFT JOIN vecinos vc ON us.documento = vc.documento 
                       WHERE us.email = %s"""
        parametros = usuarioInp.email
        registro = DbManager.obtener_registro(solicitud, parametros)
        return UsuarioRepo.obtener_resultado_login(registro, usuarioInp.password, 'vecino')

    @staticmethod
    def validar_municipal(usuarioInp: Usuario):
    # Valida la existencia del usuario y el ingreso de la contraseña correcta para hacer el login, variante municipal
        # Triple comilla para poder partir el string en varias lineas porque es larguísimo
        solicitud = """SELECT idUsuario, us.password as password, ps.nombre as nombre 
                       FROM usuarios us LEFT JOIN personal ps ON ps.legajo = us.legajo 
                       WHERE us.legajo = %s"""
        parametros = usuarioInp.legajo
        registro = DbManager.obtener_registro(solicitud, parametros)
        return UsuarioRepo.obtener_resultado_login(registro, usuarioInp.password, "municipal")

    @staticmethod
    def agregar_recupero(documento):
    # Crea una solicitud de recupero de contraseña
        solicitud = "INSERT INTO recupero (documento, codigo, status) VALUES (%s, %s, 1)"
        codigo = str(random.randint(1000, 9999))
        parametros = (documento, codigo)
        DbManager.actualizar_bd(solicitud, parametros)

    @staticmethod
    def get_usuario_by_codigo(codigo, rol=""):
    # Devuelve un usuario obtenido por código de recupero de contraseña
        solicitud = """SELECT us.idUsuario, us.email, us.password, us.documento as documento, vc.nombre AS nombre 
                              FROM recupero rc 
                              LEFT JOIN vecinos vc ON vc.documento = rc.documento 
                              LEFT JOIN usuarios us ON rc.documento = us.documento 
                              WHERE codigo = %s AND status = 1"""
        parametros = (codigo, )
        resultado = DbManager.obtener_registro(solicitud, parametros)
        if resultado is not None:
            solicitud = "UPDATE recupero SET status = 0 WHERE codigo = %s"
            parametros = (codigo, )
            DbManager.actualizar_bd(solicitud, parametros)
            
            usuario = Usuario()
            usuario.idUsuario = resultado[0]
            usuario.email = resultado[1]
            usuario.password = resultado[2]
            usuario.documento = resultado[3]
            usuario.nombre = resultado[4]
            resultado = usuario
        return resultado
    
    @staticmethod
    def get_usuario_by_id(id_user, rol="vecino"):
    # Devuelve un usuario obtenido por ID
        if rol == "vecino":
            solicitud = """SELECT dd.nombre, dd.apellido, us.email, dd.documento, dd.direccion, br.nombre 
                           FROM usuarios us 
                           LEFT JOIN vecinos as dd 
                           ON dd.documento = us.documento 
                           LEFT JOIN barrios as br 
                           ON br.idBarrio = dd.codigoBarrio 
                           WHERE idUsuario = %s"""
        else:
            solicitud = """SELECT dd.nombre, dd.apellido, us.legajo, dd.documento, '' as direccion, '' as barrio 
                           FROM usuarios us 
                           LEFT JOIN personal as dd 
                           ON dd.legajo = us.legajo 
                           WHERE idUsuario = %s"""
        parametros = (id_user,)
        resultado = DbManager.obtener_registro(solicitud, parametros)
        if resultado is not None:
            usuario = Usuario()
            usuario.nombre = resultado[0]
            usuario.apellido = resultado[1]
            usuario.email = resultado[2]
            usuario.documento = resultado[3]
            usuario.direccion = resultado[4]
            usuario.barrio = resultado[5]
            resultado = usuario     
        return resultado