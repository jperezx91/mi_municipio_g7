from utils.dbmanager import DbManager

comando = ""
conexion = DbManager.obtener_conexion()
print("[Mi Municipio]")
while comando != "exit":
    comando = input("Ingrese un comando: ")
    if comando == "solicitudes":
        with conexion.cursor() as cursor:
            conexion = DbManager.obtener_conexion()
            cursor.execute("SELECT email, documento, codigo FROM solicitudes")
            solicitudes = cursor.fetchall()
            for solicitud in solicitudes:
                print(f"Aprobadas: {solicitud[0]} | {solicitud[1]} | {solicitud[2]}")
                cursor.execute("INSERT INTO usuarios (email, documento, password, ftime) VALUES (%s, %s, %s, %s)", (solicitud[0], solicitud[1], solicitud[2], "0"))
                conexion.commit()
            cursor.execute("TRUNCATE solicitudes;")
            conexion.commit()
            conexion.close()



conexion.close()

