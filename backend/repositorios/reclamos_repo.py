from utils.dbmanager import DbManager
import os
import base64

class ReclamosRepo:

    @staticmethod
    def obtener_todos_los_reclamos(categoria, id_usuario):
        solicitud = """
            SELECT
                COALESCE(idReclamoUnificado, idReclamo) AS numero_reclamo,
                rub.descripcion AS categoria,
                estado
            FROM
	            reclamos rec
                LEFT JOIN desperfectos des ON rec.idDesperfecto = des.idDesperfecto
	            LEFT JOIN rubros rub ON des.idRubro = rub.idRubro
            """
        if id_usuario: solicitud += " LEFT JOIN usuariosVecinos uv ON rec.documento = uv.documento"

        solicitud += " WHERE rec.estado IS NOT 'Unificado'"

        if categoria:
            solicitud += f" AND categoria = '{categoria}'"
        if id_usuario:
            solicitud += f" AND uv.idUsuario = {id_usuario}"

        return DbManager.obtener_registros(solicitud)

    @staticmethod
    def obtener_reclamo(id_reclamo):
        solicitud = """
            SELECT
                idReclamo AS numero_reclamo,
                rub.descripcion AS categoria,
                estado
            FROM
                reclamos rec
                LEFT JOIN desperfectos des ON rec.idDesperfecto = des.idDesperfecto
	            LEFT JOIN rubros rub ON des.idRubro = rub.idRubro
            WHERE
                numero_reclamo = ?
            """
        parametros = (id_reclamo,)
        return DbManager.obtener_registro(solicitud, parametros)

    @staticmethod
    def crear_solicitud_reclamo():
        pass
