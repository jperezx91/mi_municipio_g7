from entities.usuario import  Usuario
from repositorios.usuario_repo import UsuarioRepo
from utils.errorcode import StatusCode

class UserController:

    def change_password(self, password, id_usuario):
        UsuarioRepo.change_password(password, id_usuario)

    def login(self, datos_usuario):
        user_entity = Usuario.JSONToUsuario(datos_usuario)
        # Comparar los datos enviados con la base de datos.
        # Vecino
        if user_entity.email != "":
            v = UsuarioRepo.validar_vecino(user_entity)
            return v
        # Municipal
        elif user_entity.legajo != "":
            if UsuarioRepo.validar_municipal(user_entity):
                user_entity.rol = "municipal"
                return user_entity
            else:
                return None

        return None
    def signin(self, datos_usuario):
        user_entity = Usuario.JSONToUsuario(datos_usuario)
        existe_usuario = UsuarioRepo.existe_usuario(user_entity.documento)
        if existe_usuario:
            return [False, 409]
        v = UsuarioRepo.existe_vecino(user_entity)
        if v:
            UsuarioRepo.registrar_solicitud(user_entity)
            return [True, 200]
        else:
            return [False, 404]
