import os
import sqlite3

# Ubicar la carpeta 'instance' que usa Flask para la base de datos
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
instance_dir = os.path.join(parent_dir, 'instance')
os.makedirs(instance_dir, exist_ok=True)
db_dir = os.path.join(instance_dir, 'municipio.db')

# Conectar a la base de datos o crearla si no existe
connection = sqlite3.connect(db_dir)
cursor = connection.cursor()

# Ejecutar los distintos scripts SQL provistos por el profesor
for script in ['municipio.sql', 'personal.sql', 'vecinos.sql']:
    print("*** Procesando '" + script + "'... ***")
    with open(script, 'r', encoding='UTF-8') as file:
        sql_script = file.read()
    cursor.executescript(sql_script)
    print("*** '" + script + "' procesado. ***")

# Commitear cambios y cerrar conexión
connection.commit()
connection.close()

print("Base de datos creada e inicializada satisfactoriamente.")
