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

ALTER TABLE movimientosReclamo ADD COLUMN sectorAnterior TEXT;
ALTER TABLE movimientosReclamo ADD COLUMN sectorNuevo TEXT;
ALTER TABLE reclamos ADD COLUMN sectorAsignado TEXT;

INSERT INTO usuariosPersonal (legajo, password, documento, fechaIngreso)
SELECT p.legajo, p.password, p.documento, p.fechaIngreso
FROM personal as p
WHERE p.categoria = 8;

INSERT INTO rubros (descripcion) VALUES ("Bacheo y Demarcacion");
INSERT INTO rubros (descripcion) VALUES ("Plazas y Parques");
INSERT INTO rubros (descripcion) VALUES ("Areas Verdes");
INSERT INTO rubros (descripcion) VALUES ("Museos");
INSERT INTO rubros (descripcion) VALUES ("Seguridad");
INSERT INTO rubros (descripcion) VALUES ("Escuelas");
INSERT INTO rubros (descripcion) VALUES ("Edificios Publicos y Oficinas");
INSERT INTO rubros (descripcion) VALUES ("Semaforos y Señaletica");

INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Bache en calle", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Bache en vereda", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Vereda desnivelada", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Calle sin cartel de nombre", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Calle bloqueada", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Árbol caído", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Cables colgantes", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Señal vial en mal estado", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Señalización poco clara", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Árbol caído", 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Cesped en mal estado", 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Juego en mal estado", 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Vallado en mal estado", 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Suciedad, basura o mal mantenimento", 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Árbol caído", 3);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Césped en mal estado", 3);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Vallado en mal estado", 3);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Suciedad, basura o mal mantenimento", 3);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Desperfectos edilicios", 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Exhibición en mal estado", 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problema con el personal", 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Venta de entradas", 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Errores fácticos en exhibición", 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Zona peligrosa", 5);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Robo o hurto", 5);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Ausencia de presencia policial", 5);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problema con personal policial", 5);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Desperfectos edilicios", 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con el personal docente", 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con el personal no docente", 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con vacantes", 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con contenido académico", 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Desperfectos edilicios", 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con personal", 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con turnos", 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con trámites en curso", 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Problemas con pagos o cobros", 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Semáforo no funciona", 8);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Semáforo caído", 8);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Solicitud de nuevo semárofo", 8);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Solicitud de señalética", 8);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Solicitud de modificación de tiempos de luz verde", 8);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 3);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 5);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ("Otro", 8);