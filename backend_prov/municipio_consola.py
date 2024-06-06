from utils.dbmanager import DbManager

comando = ""
conexion = DbManager.obtener_conexion()
print("[Mi Municipio consola]")
print("Comandos disponibles: ")
comandos = ["solicitudes", "recuperos", "exit"]
for c in comandos:
    print(c, end=" ")
print("")
while comando != "exit":
    comando = input("Ingrese un comando: ")
    if comando == "solicitudes":
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT email, documento, codigo FROM solicitudes")
            solicitudes = cursor.fetchall()
            if len(solicitudes) == 0:
                print("No hay solicitudes disponibles.")

            for solicitud in solicitudes:
                print(f"Aprobadas: {solicitud[0]} | DNI: {solicitud[1]} | Codigo: {solicitud[2]}")
                cursor.execute("INSERT INTO usuarios (email, documento, password, ftime) VALUES (%s, %s, %s, %s)", (solicitud[0], solicitud[1], solicitud[2], "1"))
                conexion.commit()
            cursor.execute("TRUNCATE solicitudes;")
            conexion.commit()
            conexion.close()
    elif comando == "recuperos":
        conexion = DbManager.obtener_conexion()
        with conexion.cursor() as cursor:
            cursor.execute("SELECT documento, codigo FROM recupero WHERE status = 1")
            recuperos = cursor.fetchall()
            if len(recuperos) == 0:
                print("No hay recuperos disponibles.")
            for r in recuperos:
                print(f"Codigo: {r[1]} | Documento: {r[0]}")
            cursor.close()
            conexion.close()


if conexion.open:
    conexion.close()

