from utils.dbmanager import DbManager
from repositorios.publicaciones_repo import PublicacionesRepo
from repositorios.notificaciones_repo import NotificacionesRepo
from repositorios.usuario_repo import  UsuarioRepo
def menu_consola():
    print("[Mi Municipio consola]")
    print("Comandos disponibles: ")
    comandos = ["Salir", "Solicitudes de Registro", "Recuperos", "Solicitudes de Publicacion", "Ligar denuncia a vecino", "Cambiar estado denuncia"]
    numero_de_opcion = 0
    for comando in comandos:
        print(str(numero_de_opcion) + ". " + comando)
        numero_de_opcion += 1
    numero_de_opcion = 0
    print("")

    seleccion = None
    while seleccion != 0:
        seleccion = int(input("Ingrese un comando: "))
        match seleccion:
            case 1:
                procesar_solicitudes_registro()
            case 2:
                procesar_recuperos()
            case 3:
                procesar_solicitudes_publicacion()
            case 4:
                ligar_denuncia_vecino()
            case 5:
                cambiar_denuncia()

        for comando in comandos:
            print(str(numero_de_opcion) + ". " + comando)
            numero_de_opcion += 1
        numero_de_opcion = 0
        print("")

def ligar_denuncia_vecino():
    denuncia = input("Ingrese el numero de la denuncia: ")
    denuncia = denuncia.strip()
    dni_usuario = input("Ingrese el dni de la usuario: ")
    dni_usuario = dni_usuario.strip()

    solicitud = """
        UPDATE denuncias SET documentoDenunciado = ? WHERE idDenuncias = ?;
    """
    params = (dni_usuario, denuncia)
    id_user = UsuarioRepo.get_vecino_id_by_documento(dni_usuario)
    NotificacionesRepo.crear_notificacion(id_user, "vecino", "denuncia", "Denuncia", "Haz recibido una denuncia")

    DbManager.actualizar_bd(solicitud, params)
    print("Actualizado !")
def cambiar_denuncia():
    denuncia = input("Ingrese el numero de la denuncia: ")
    denuncia = denuncia.strip()
    estado = input("Ingrese el estado actual de la denuncia")
    estado = estado.strip()
    solicitud = """
        UPDATE denuncias SET estado = ? WHERE idDenuncias = ?;
    """
    params = (estado, denuncia)
    DbManager.actualizar_bd(solicitud, params)

    solicitud_2 = """
        SELECT documento FROM denuncias WHERE idDenuncias = ?;
    """
    params2 = (denuncia,)
    dato = DbManager.obtener_registro(solicitud_2, params2)
    id_user = UsuarioRepo.get_vecino_id_by_documento(dato[0]) # con el documento obtengo el id del usuario
    NotificacionesRepo.crear_notificacion(id_user, "vecino", "denuncia", "Denuncia", f"Tu denuncia #{denuncia} ha cambiado de estado a: {estado}")
    print("Denuncia actualizada !")
def procesar_solicitudes_registro():
    # Esta query obtiene sólo la última solicitud de registro hecha por el usuario
    solicitud = """
                SELECT solicitudesRegistro.email, solicitudesRegistro.documento, solicitudesRegistro.codigo
                FROM solicitudesRegistro
                JOIN(
                    SELECT MAX(idSolicitud) AS idUltimaSolicitud, email, documento
                    FROM solicitudesRegistro
                    GROUP BY documento, email
                ) ultimaSolicitud ON
                    solicitudesRegistro.documento  = ultimaSolicitud.documento AND
                    solicitudesRegistro.email = ultimaSolicitud.email AND
                    solicitudesRegistro.idSolicitud  = ultimaSolicitud.idUltimaSolicitud
                """
    solicitudes = DbManager.obtener_registros(solicitud)
    if len(solicitudes) == 0:
        print("No hay solicitudes disponibles.")
    else:
        for solicitud in solicitudes:
            query = "INSERT INTO usuariosVecinos (email, documento, password, ftime) VALUES (?, ?, ?, ?)"
            parametros = (solicitud[0], solicitud[1], solicitud[2], "1")
            DbManager.actualizar_bd(query, parametros)
            print(f"Solicitud aprobada: {solicitud[0]} | DNI: {solicitud[1]} | Codigo: {solicitud[2]}")
    DbManager.actualizar_bd("DELETE FROM solicitudesRegistro")
    
def procesar_recuperos():
    solicitud = """
                SELECT recuperoPassword.documento, recuperoPassword.codigo, recuperoPassword.status
                FROM recuperoPassword
                JOIN(
                    SELECT documento, MAX(idRecupero) as idUltimoRecupero
                    FROM recuperoPassword
                    GROUP BY documento
                ) ultimoRecupero ON
                    recuperoPassword.documento = ultimoRecupero.documento AND
                    recuperoPassword.idRecupero = ultimoRecupero.idUltimoRecupero
                WHERE status = 1
                """
    recuperos = DbManager.obtener_registros(solicitud)
    if len(recuperos) == 0:
        print("No hay recuperos disponibles.")
    else:
        for recupero in recuperos:
            print(f"Codigo: {recupero[1]} | Documento: {recupero[0]}")

def procesar_solicitudes_publicacion():
    solicitud = """
                SELECT idSolicitudPublicacion, titulo, comercio, idUsuario
                FROM solicitudesPublicacion
                """
    solicitudes = DbManager.obtener_registros(solicitud)

    if len(solicitudes) == 0:
        print("\nNo hay solicitudes disponibles.\n")
    else:
        
        for solicitud in solicitudes:
            print(f"\nDatos de la solicitud #{solicitud[0]}:\n- Titulo: {solicitud[1]}\n- Comercio: {solicitud[2]}\n- ID de Usuario creador: {solicitud[3]}")
            
            aprobacion = input("\nAprobar? (y/n) ")
            while aprobacion not in ("yn"):
                aprobacion = input("Error. ingrese 'y' para aprobar, 'n' para rechazar")
            
            if (aprobacion == 'y'):
                NotificacionesRepo.crear_notificacion(solicitud[3], "vecino", "publicacion", "Publicacion", f"Se ha aprobado la solicitud {solicitud[1]}.")
                query = """
                    INSERT INTO publicaciones (
                        idPublicacion,
                        idUsuario,
                        comercio,
                        rubro,
                        direccion,
                        horario,
                        telefono,
                        titulo,
                        descripcion,
                        thumbnail
                    ) SELECT * FROM solicitudesPublicacion WHERE idSolicitudPublicacion = ?;
                    """

                parametros = (solicitud[0],)
                DbManager.actualizar_bd(query, parametros)

                print(f"\nSolicitud aprobada!")
            else:
                PublicacionesRepo.eliminar_imagenes(solicitud[0])
                print(f"\nSolicitud rechazada, archivos asociados eliminados.")

    DbManager.actualizar_bd("DELETE FROM solicitudesPublicacion")

menu_consola()