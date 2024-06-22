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

CREATE TABLE publicaciones(
	idPublicacion INTEGER,
	idUsuario INTEGER NOT NULL,
	comercio TEXT NOT NULL,
	rubro TEXT NOT NULL,
	direccion TEXT,
	horario TEXT NOT NULL,
	telefono TEXT NOT NULL,
	titulo TEXT NOT NULL,
	descripcion TEXT,
	thumbnail TEXT,
	creada TEXT DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT pk_publicaciones PRIMARY KEY (idPublicacion AUTOINCREMENT),
	CONSTRAINT fk_publicaciones_usuariosVecinos FOREIGN KEY (idUsuario) REFERENCES usuariosVecinos(idUsuario)
);

CREATE TABLE publicacionesImagenes(
	idImagen INTEGER,
	idPublicacion INTEGER,
	imagen TEXT NOT NULL,
	CONSTRAINT pk_publicacionesImagenes PRIMARY KEY (idImagen AUTOINCREMENT),
	CONSTRAINT fk_publicacionesImagenes_publicaciones FOREIGN KEY (idPublicacion) REFERENCES publicaciones(idPublicacion) 
);

CREATE TABLE solicitudesPublicacion(
	idSolicitudPublicacion INTEGER,
	idUsuario INTEGER NOT NULL,
	comercio TEXT NOT NULL,
	rubro TEXT NOT NULL,
	direccion TEXT,
	horario TEXT NOT NULL,
	telefono TEXT NOT NULL,
	titulo TEXT NOT NULL,
	descripcion TEXT,
	thumbnail TEXT,
	CONSTRAINT pk_solicitudesPublicaciones PRIMARY KEY (idSolicitudPublicacion AUTOINCREMENT),
	CONSTRAINT fk_publicaciones_usuariosVecinos FOREIGN KEY (idUsuario) REFERENCES usuariosVecinos(idUsuario)
);

CREATE TABLE solicitudesPublicacionImagenes(
	idImagen INTEGER,
	idSolicitudPublicacion INTEGER,
	imagen TEXT NOT NULL,
	CONSTRAINT pk_solicitudesPublicacionImagenes PRIMARY KEY (idImagen AUTOINCREMENT),
	CONSTRAINT fk_soliitudesPublicacionesImagenes_solicitudesPublicacion FOREIGN KEY (idSolicitudPublicacion) REFERENCES solicitudesPublicacion(idSolicitudPublicacion) 
);

INSERT INTO usuariosPersonal (legajo, password, documento, fechaIngreso)
SELECT p.legajo, p.password, p.documento, p.fechaIngreso
FROM personal as p
WHERE p.categoria = 8;