create table barrios(
	idBarrio integer primary key autoincrement,
	nombre varchar(150) not null
);

insert into barrios (nombre) values ('Vicente López');
insert into barrios (nombre) values ('Florida');
insert into barrios (nombre) values ('Villa Martelli');
insert into barrios (nombre) values ('Florida Oeste');
insert into barrios (nombre) values ('Olivos');
insert into barrios (nombre) values ('La Lucila');
insert into barrios (nombre) values ('Munro');
insert into barrios (nombre) values ('Carapachay');
insert into barrios (nombre) values ('Villa Adelina');

create table vecinos(
	documento varchar(20) not null,
	nombre varchar(150) not null,
	apellido varchar(150) not null,
	direccion varchar(250) null,
	codigoBarrio int null,
	constraint pk_vecinos primary key (documento),
	constraint fk_vecinos_barrios foreign key (codigoBarrio) references barrios
);

create table personal(
	legajo integer primary key autoincrement,
	nombre varchar(150) not null,
	apellido varchar(150) not null,
	documento varchar(20) not null,
	password varchar(40) not null,
	sector varchar(200) not null,
	categoria int,  --Los inspectores son categoria 8
	fechaIngreso datetime
);

create table sitios(
	idSitio integer primary key autoincrement,
	latitud decimal(9,5),
	longitud decimal(9,5),
	calle varchar(150) null,
	numero int,
	entreCalleA varchar(150) null,
	entreCalleB varchar(150) null,
	descripcion varchar(300),
	aCargoDe varchar(200),
	apertura time,
	cierre time,
	comentarios text
);

create table rubros(
	idRubro integer primary key autoincrement,
	descripcion varchar(200) not null
);

create table desperfectos(
	idDesperfecto integer primary key autoincrement,
	descripcion varchar(200) not null,
	idRubro int null,
	constraint fk_desperfectos_rubros foreign key (idRubro) references rubros
);

create table reclamos(
	idReclamo integer primary key autoincrement,
	documento varchar(20) null,
	legajo int null,
	idSitio int not null,
	idDesperfecto int null,
	descripcion varchar(1000) null,
	estado varchar(30),
	IdReclamoUnificado int null,
	constraint fk_reclamos_vecinos foreign key (documento) references vecinos,
	constraint fk_reclamos_personal foreign key (legajo) references personal,
	constraint fk_reclamos_sitios foreign key (idSitio) references sitios,
	constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references desperfectos,
	constraint fk_reclamos_reclamos foreign key (IdReclamoUnificado) references reclamos
);

create table movimientosReclamo(
	idMovimiento integer primary key autoincrement,
	idReclamo int not null,
	responsable varchar(150) not null,
	causa varchar(1000) not null,
	fecha datetime default current_timestamp,
	constraint fk_movimientosReclamo_reclamos foreign key (idReclamo) references reclamos
);

create table denuncias(
	idDenuncias integer primary key autoincrement,
	documento varchar(20) not null,
	idSitio int null,
	descripcion varchar(2000) null,
	estado varchar(150),
	aceptaResponsabilidad int not null,
	constraint fk_denuncias_vecinos foreign key (documento) references vecinos,
	constraint fk_denuncias_sitios foreign key (idSitio) references sitios
);

create table movimientosDenuncia(
	idMovimiento integer primary key autoincrement,
	idDenuncia int not null,
	responsable varchar(150) not null,
	causa varchar(4000) not null,
	fecha datetime default current_timestamp,
	constraint fk_movimientosDenuncia_Denuncia foreign key (idDenuncia) references denuncias
);
