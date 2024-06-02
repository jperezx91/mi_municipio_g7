from entities.usuario import  Usuario
from repositorios.usuario_repo import UsuarioRepo
from utils.errorcode import StatusCode

class UserController:
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
        v = UsuarioRepo.existe_vecino(user_entity)
        if v:
            UsuarioRepo.registrar_solicitud(user_entity)
            return True
        else:
            return False
