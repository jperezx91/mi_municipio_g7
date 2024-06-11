import os
import sqlite3

# Ubicar la carpeta 'instance' que usa Flask para la base de datos
directorio_actual = os.path.dirname(__file__)
directorio_superior = os.path.abspath(os.path.join(directorio_actual, '..'))
directorio_instance = os.path.join(directorio_superior, 'instance')
os.makedirs(directorio_instance, exist_ok=True)
directorio_db = os.path.join(directorio_instance, 'mi_municipio.db')

# Conectar a la base de datos o crearla si no existe
conexion = sqlite3.connect(directorio_db)
cursor = conexion.cursor()

# Ejecutar los distintos scripts SQL provistos por el profesor y los adicionales
scripts = [archivo for archivo in os.listdir(directorio_actual) if archivo.endswith('.sql')]
for script in scripts:
    print("*** Procesando '" + script + "'... ***")
    with open(os.path.join(directorio_actual, script), 'r', encoding='UTF-8') as archivo:
        solicitud = archivo.read()
    cursor.executescript(solicitud)
    print("*** '" + script + "' procesado. ***")

# Commitear cambios y cerrar conexión
conexion.commit()
conexion.close()

print("Base de datos creada e inicializada satisfactoriamente.")
