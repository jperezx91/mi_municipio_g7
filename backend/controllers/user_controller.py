from entities.usuario import  Usuario
from repositorios.usuario_repo import UsuarioRepo
from utils.errorcode import StatusCode

class UserController:

    def change_password(self, password, id_usuario):
    # Cambia la contraseña del usuario
        UsuarioRepo.change_password(password, id_usuario)

    def login(self, datos_usuario):
    # Inicia sesión
        user_entity = Usuario.JSONToUsuario(datos_usuario)
        # Comparar los datos enviados con la base de datos.
        # Vecino
        if user_entity.email != "":
            usuario = UsuarioRepo.validar_vecino(user_entity)
        # Municipal
        elif user_entity.legajo != "":
            usuario = UsuarioRepo.validar_municipal(user_entity)
            user_entity.rol = "municipal"
        else:
            usuario = None
        return usuario
    
    def signin(self, datos_usuario):
    # Registra un usuario nuevo
        user_entity = Usuario.JSONToUsuario(datos_usuario)
        print(user_entity.documento, "documento?")
        existe_usuario = UsuarioRepo.existe_usuario(user_entity.documento)
        if existe_usuario:
            respuesta = [False, 409]
        else:
            vecino_es_valido = UsuarioRepo.existe_vecino(user_entity)
            if vecino_es_valido:
                UsuarioRepo.registrar_solicitud(user_entity)
                respuesta = [True, 200]
            else:
                respuesta = [False, 404]
        return respuesta

    def validar_usuario(self, id_usuario, password):
    # Devuelve el usuario si existe y si se ingresó la contraseña correcta
        usuario = UsuarioRepo.validar_usuario(id_usuario, password)
        return usuario
    
    def solicitar_cambio_pass(self, email, dni):
        # chequeo que exista el usuario
        existe_usuario = UsuarioRepo.existe_usuario_con_mail(email, dni)
        return existe_usuario

    def agregar_recupero(self, dni):
    # Crea una solicitud de recupero de contraseña
        UsuarioRepo.agregar_recupero(dni)

    def get_usuario_by_codigo(self, codigo):
    # Devuelve un usuario obtenido por código de recupero de contraseña
        usuario = UsuarioRepo.get_usuario_by_codigo(codigo)
        return usuario
    
    def get_usuario_by_id(self, id_usuario, rol="vecino"):
    # Devuelve un usuario obtenido por ID
        usuario = UsuarioRepo.get_usuario_by_id(id_usuario, rol)
        return usuario