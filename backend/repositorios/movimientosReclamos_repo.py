from utils.dbmanager import DbManager
from repositorios.usuario_repo import UsuarioRepo


class MovimientosReclamoRepo:
    @staticmethod
    def obtener_movimientos_reclamo(id_usuario):
        usuario = UsuarioRepo.get_usuario_by_id(id_usuario)
        # Obtiene todas las publicaciones, ordenadas de la más nueva a la más antigua
        solicitud = """
            SELECT idMovimiento, idReclamo, responsable, causa, fecha
            FROM movimientosReclamo
            WHERE documento = ?
            ORDER BY creada DESC
            """
        parametros = (usuario.documento, )
        return DbManager.obtener_registros(solicitud, parametros)