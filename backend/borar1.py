import requests
latitud = "-34.6154848368447"
longitud = "-58.3816319704056"
p = requests.get(f"https://api.geoapify.com/v1/geocode/reverse?lat={latitud}&lon={longitud}&apiKey=d1880068d44f43eba5b40fea6b08f3b7")
datos = p.json()
try:
    print(datos.get("features")[0].get("properties").get("street"), datos.get("features")[0].get("properties").get("housenumber"))
except:
    print("fallo")