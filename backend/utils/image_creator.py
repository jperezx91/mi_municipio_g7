import base64
import os
class ImageCreator:
    @staticmethod
    def jpg_a_base64(ruta_al_archivo):
        # Lee el archivo de imagen y lo convierte a base64
        with open(ruta_al_archivo, 'rb') as archivo_imagen:
            imagen_base64 = base64.b64encode(archivo_imagen.read()).decode('utf-8')
        return imagen_base64

    @staticmethod
    def base64_a_jpeg(imagen_base64, ruta_al_archivo):
        # Crea un archivo en base a un string base64
        if imagen_base64.startswith('data:image'):
            imagen_base64 = imagen_base64.split(',')[1]

        datos_imagen = base64.b64decode(imagen_base64)
        os.makedirs(os.path.dirname(ruta_al_archivo), exist_ok=True)  # Asegurarse que existe el directorio

        with open(ruta_al_archivo, 'wb') as archivo_salida:
            archivo_salida.write(datos_imagen)