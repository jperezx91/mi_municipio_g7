CREATE TABLE recuperoPassword (
    idRecupero INTEGER NOT NULL,
    codigo TEXT NOT NULL,
    documento TEXT NOT NULL,
    status INTEGER NOT NULL,
    CONSTRAINT pk_recuperoPassword PRIMARY KEY (idRecupero AUTOINCREMENT),
    CONSTRAINT fk_usuariosVecinos FOREIGN KEY (documento) REFERENCES usuarios_vecinos (documento)
);

CREATE TABLE usuariosVecinos (
    idUsuario INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    documento TEXT NOT NULL,
    fechaIngreso TEXT NOT NULL DEFAULT CURRENT_DATE,
    ftime INTEGER NOT NULL,
    CONSTRAINT pk_usuariosVecinos PRIMARY KEY (idUsuario AUTOINCREMENT),
    CONSTRAINT fk_vecinos FOREIGN KEY (documento) REFERENCES vecinos (documento)
);

CREATE TABLE usuariosPersonal (
    idUsuario INTEGER NOT NULL,
    legajo INTEGER,
    password TEXT NOT NULL,
    documento TEXT NOT NULL,
    fechaIngreso TEXT NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT pk_usuariosPersonal PRIMARY KEY (idUsuario AUTOINCREMENT),
    CONSTRAINT fk_personal FOREIGN KEY (legajo) REFERENCES personal (legajo)
);

CREATE TABLE solicitudesRegistro (
    idSolicitud INTEGER NOT NULL,
    documento TEXT NOT NULL,
    codigo TEXT NOT NULL,
    email TEXT NOT NULL,
    status INTEGER NOT NULL,
    CONSTRAINT pk_solicitudesRegistro PRIMARY KEY (idSolicitud AUTOINCREMENT),
    CONSTRAINT fk_vecinos FOREIGN KEY (documento) REFERENCES vecinos (documento)
);

INSERT INTO usuariosPersonal (legajo, password, documento, fechaIngreso)
SELECT p.legajo, p.password, p.documento, p.fechaIngreso
FROM personal as p
WHERE p.categoria = 8;