CREATE TABLE barrios (
    idBarrio INTEGER,
    nombre TEXT NOT NULL,
    CONSTRAINT pk_barrios PRIMARY KEY (idBarrio AUTOINCREMENT)
);

INSERT INTO barrios (nombre) VALUES ('Vicente López');
INSERT INTO barrios (nombre) VALUES ('Florida');
INSERT INTO barrios (nombre) VALUES ('Villa Martelli');
INSERT INTO barrios (nombre) VALUES ('Florida Oeste');
INSERT INTO barrios (nombre) VALUES ('Olivos');
INSERT INTO barrios (nombre) VALUES ('La Lucila');
INSERT INTO barrios (nombre) VALUES ('Munro');
INSERT INTO barrios (nombre) VALUES ('Carapachay');
INSERT INTO barrios (nombre) VALUES ('Villa Adelina');

CREATE TABLE vecinos(
	documento TEXT NOT NULL,
	nombre TEXT NOT NULL,
	apellido TEXT NOT NULL,
	direccion TEXT NULL,
	codigoBarrio INTEGER NULL,
	CONSTRAINT pk_vecinos primary key (documento),
	CONSTRAINT fk_vecinos_barrios FOREIGN KEY (codigoBarrio) references barrios (codigoBarrio)
);

CREATE TABLE personal(
	legajo INTEGER,
	nombre TEXT NOT NULL,
	apellido TEXT NOT NULL,
	documento TEXT NOT NULL,
	password TEXT NOT NULL,
	sector TEXT NOT NULL,
	categoria INTEGER,  --Los inspectores son categoria 8
	fechaIngreso datetime,
	CONSTRAINT pk_personal PRIMARY KEY (legajo AUTOINCREMENT)
);

CREATE TABLE sitios(
	idSitio INTEGER,
	latitud REAL,
	longitud REAL,
	calle TEXT NULL,
	numero INTEGER,
	entreCalleA TEXT NULL,
	entreCalleB TEXT NULL,
	descripcion TEXT,
	aCargoDe TEXT,
	apertura TEXT,
	cierre TEXT,
	comentarios TEXT,
	CONSTRAINT pk_sitios PRIMARY KEY (idSitio AUTOINCREMENT)
);

CREATE TABLE rubros(
	idRubro INTEGER,
	descripcion TEXT NOT NULL,
	CONSTRAINT pk_rubros PRIMARY KEY (idRubro AUTOINCREMENT)
);

CREATE TABLE desperfectos(
	idDesperfecto INTEGER,
	descripcion TEXT NOT NULL,
	idRubro INTEGER NULL,
	CONSTRAINT pk_desperfectos PRIMARY KEY (idDesperfecto AUTOINCREMENT),
	CONSTRAINT fk_desperfectos_rubros FOREIGN KEY (idRubro) references rubros (idRubro)
);

CREATE TABLE reclamos(
	idReclamo INTEGER,
	documento TEXT NULL,
	legajo INTEGER NULL,
	idSitio INTEGER NOT NULL,
	idDesperfecto INTEGER NULL,
	descripcion TEXT NULL,
	estado TEXT,
	IdReclamoUnificado INTEGER NULL,
	CONSTRAINT pk_relamos PRIMARY KEY (idReclamo AUTOINCREMENT),
	CONSTRAINT fk_reclamos_vecinos FOREIGN KEY (documento) REFERENCES vecinos (documento),
	CONSTRAINT fk_reclamos_personal FOREIGN KEY (legajo) REFERENCES personal (legajo),
	CONSTRAINT fk_reclamos_sitios FOREIGN KEY (idSitio) REFERENCES sitios (idSitio),
	CONSTRAINT fk_reclamos_desperfectos FOREIGN KEY (idDesperfecto) REFERENCES desperfectos (idDesperfecto),
	CONSTRAINT fk_reclamos_reclamos FOREIGN KEY (IdReclamoUnificado) REFERENCES reclamos (idReclamo)
);

CREATE TABLE movimientosReclamo(
	idMovimiento INTEGER,
	idReclamo INTEGER NOT NULL,
	responsable TEXT NOT NULL,
	causa TEXT NOT NULL,
	fecha TEXT DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT pk_movimientosReclamo PRIMARY KEY (idMovimiento AUTOINCREMENT),
	CONSTRAINT fk_movimientosReclamo_reclamos FOREIGN KEY (idReclamo) REFERENCES reclamos (idReclamo)
);

CREATE TABLE denuncias(
	idDenuncias INTEGER,
	documento TEXT NOT NULL,
	idSitio INTEGER NULL,
	descripcion TEXT NULL,
	estado TEXT,
	aceptaResponsabilidad INTEGER NOT NULL,
	CONSTRAINT pk_denuncias PRIMARY KEY (idDenuncias AUTOINCREMENT),
	CONSTRAINT fk_denuncias_vecinos FOREIGN KEY (documento) REFERENCES vecinos (documento),
	CONSTRAINT fk_denuncias_sitios FOREIGN KEY (idSitio) REFERENCES sitios (idSitio)
);

CREATE TABLE movimientosDenuncia(
	idMovimiento INTEGER,
	idDenuncia INTEGER NOT NULL,
	responsable TEXT NOT NULL,
	causa TEXT NOT NULL,
	fecha TEXT default CURRENT_TIMESTAMP,
	CONSTRAINT pk_movimientosDenuncia PRIMARY KEY (idMovimiento AUTOINCREMENT),
	CONSTRAINT fk_movimientosDenuncia_Denuncia FOREIGN KEY (idDenuncia) references denuncias (idDenuncia)
);