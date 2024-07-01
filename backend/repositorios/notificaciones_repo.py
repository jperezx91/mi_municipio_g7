from repositorios.usuario_repo import UsuarioRepo
from utils.dbmanager import DbManager
class NotificacionesRepo:
    @staticmethod
    def obtener_numero_notificaciones(id_user, rol):
        documento = UsuarioRepo.get_documento_by_id(id_user, rol)
        if rol == "vecino":
            solicitud = """
                SELECT count(*) FROM notificaciones WHERE documento = ? AND status = 1
            """
        else:
            solicitud = """
                SELECT count(*) FROM notificaciones WHERE legajo = ? AND status = 1
            """
        parametros = (documento, )

        info = DbManager.obtener_registro(solicitud, parametros)
        return info[0]

    @staticmethod
    def obtener_notificaciones(id_user, rol):
        documento = UsuarioRepo.get_documento_by_id(id_user, rol)
        if rol == "vecino":
            solicitud = """
                SELECT idNotificacion, tipo, titulo, mensaje FROM notificaciones WHERE documento = ? AND status = 1;
            """
            actualizacion = """
            UPDATE notificaciones SET status = 0 WHERE documento = ?;
            """
        else:
            solicitud = """
                           SELECT idNotificacion, tipo, titulo, mensaje FROM notificaciones WHERE legajo = ? AND status = 1;
                       """
            actualizacion = """
                       UPDATE notificaciones SET status = 0 WHERE legajo = ?;
                       """
        parametros = (documento, )
        datos = DbManager.obtener_registros(solicitud, parametros)
        DbManager.actualizar_bd(actualizacion, parametros) # Ya se leyeron las notificaciones, no se muestran más.
        return datos

    @staticmethod
    def crear_notificacion(id_user, rol, tipo, titulo, mensaje):
        documento = UsuarioRepo.get_documento_by_id(id_user, rol)
        if rol == "vecino":
            solicitud = """
                INSERT INTO notificaciones (documento, tipo, titulo, mensaje, status) VALUES (?, ?, ?, ?, 1);
            """
        else:
            solicitud = """
                            INSERT INTO notificaciones (legajo, tipo, titulo, mensaje, status) VALUES (?, ?, ?, ?, 1);
                        """
        parametros = (documento, tipo, titulo, mensaje,)
        DbManager.actualizar_bd(solicitud, parametros)
