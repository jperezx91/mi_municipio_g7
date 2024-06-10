from utils.dbmanager import DbManager

def menu_consola():
    print("[Mi Municipio consola]")
    print("Comandos disponibles: ")
    comandos = ["Salir", "Solicitudes", "Recuperos"]
    numero_de_opcion = 0
    for comando in comandos:
        print(str(numero_de_opcion) + ". " + comando)
        numero_de_opcion += 1
    print("")

    comando = None
    while comando != 0:
        comando = int(input("Ingrese un comando: "))
        match comando:
            case 1:
                procesar_solicitudes()
            case 2:
                procesar_recuperos()

def procesar_solicitudes():
    # Esta query obtiene sólo la última solicitud de registro hecha por el usuario
    solicitud = """
                SELECT solicitudes.email, solicitudes.documento, solicitudes.codigo
                FROM solicitudes
                JOIN(
                    SELECT MAX(idSolicitud) AS idUltimaSolicitud, email, documento
                    FROM solicitudes
                    GROUP BY documento, email
                ) ultimaSolicitud ON
                    solicitudes.documento  = ultimaSolicitud.documento AND
                    solicitudes.email = ultimaSolicitud.email AND
                    solicitudes.idSolicitud  = ultimaSolicitud.idUltimaSolicitud
                """
    solicitudes = DbManager.obtener_registros(solicitud)
    if len(solicitudes) == 0:
        print("No hay solicitudes disponibles.")
    else:
        for solicitud in solicitudes:
            query = "INSERT INTO usuarios (email, documento, password, ftime) VALUES (%s, %s, %s, %s)"
            parametros = (solicitud[0], solicitud[1], solicitud[2], "1")
            DbManager.actualizar_bd(query, parametros)
            print(f"Solicitud aprobada: {solicitud[0]} | DNI: {solicitud[1]} | Codigo: {solicitud[2]}")
    DbManager.actualizar_bd("Truncate solicitudes")
    
def procesar_recuperos():
    solicitud = "SELECT documento, codigo FROM recupero WHERE status = 1"
    recuperos = DbManager.obtener_registros(solicitud)
    if len(recuperos) == 0:
        print("No hay recuperos disponibles.")
    else:
        for recupero in recuperos:
            print(f"Codigo: {recupero[1]} | Documento: {recupero[0]}")

menu_consola()