class Usuario:
    idUsuario = 0
    nombre = ""
    email = ""
    legajo = ""
    password = ""
    rol = ""
    ftime = True
    documento = 1
    def getEmail(self):
        return self.email
    def getLegajo(self):
        return self.legajo
    def getPassword(self):
        return self.password
    @staticmethod
    def JSONToUsuario(jdata):
        u = Usuario()
        if "email" in jdata:
            u.email = jdata["email"]
        if "legajo" in jdata:
            u.legajo = jdata['legajo']

        if "documento" in jdata:
            u.documento = jdata['documento']
        if "password" in jdata:
            u.password = jdata['password']
        return u
