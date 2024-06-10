# Mi Municipio - Trabajo Práctico Obligatorio

Grupo 7 - Desarrollo de Aplicaciones I


## Integrantes

- Dualde, Lucía Belén. LU: 1129523
- Nanzer, Brian. LU: 1164806
- Pérez, Juan Manuel. LU: 1017180
- Sanchez Irala, Gustavo Andrés. LU: 1106250


## Frontend: React Native Expo

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar la aplicación

   ```bash
    npx expo start
   ```

## Backend: Flask

Crear entorno virtual:

```bash
python3 -m venv venv
```

Acivar entorno virtual:

```bash
source venv/bin/activate
```

Instalar dependencias:

```bash
pip install flask_jwt_extended pymysql bcrypt cryptography
```

Ejecutar el backend

```bash
flask --app backend_prov/app.py run --debug
```


