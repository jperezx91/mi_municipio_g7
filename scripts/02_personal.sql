CREATE TABLE IF not exists personal (
    legajo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    documento TEXT NOT NULL,
    password TEXT NOT NULL,
    sector TEXT NOT NULL,
    categoria INTEGER,
    fechaIngreso DATETIME
);

INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (1, 'RAMIRO', 'RODRIGUEZ', 'DNI30012288', 'password', 'Areas Verdes
', 3, '2018-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (2, 'JAVIER', 'ESPINOZA', 'DNI30616697', 'password', '
Escuelas', 2, '2016-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (3, 'JOSE', 'OLIVERA', 'DNI30667193', 'password', 'Museos', 7, '2015-02-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (4, 'MARCELO', 'DIAZ', 'DNI30669003', 'password', 'Bacheo y Demarcacion
', 8, '2020-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (5, 'PABLO', 'BLANCO', 'DNI30702760', 'password', 'Bacheo y Demarcacio', 6, '2019-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (6, 'PABLO', 'CRUZ', 'DNI30724804', 'password', 'Plazas y Parques', 4, '2020-12-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (7, 'CRISTIAN', 'MEDINA', 'DNI30732736', 'password', 'Semaforos y Señalectica
', 6, '2019-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (8, 'JORGE GUSTAVO', 'OLAS', 'DNI30745281', 'password', '

Edificios Publicos y Oficinas
', 4, '2019-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (9, 'ADRIAN', 'BEGUET', 'DNI30780521', 'password', '


Seguridad
', 7, '2020-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (10, 'MAURICIO', 'ROMERO', 'DNI30800519', 'password', 'Semaforos y Señalectica
', 5, '2017-10-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (11, 'PABLO', 'BARRIL', 'DNI30816148', 'password', 'Escuelas
', 9, '2018-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (12, 'SERGIO', 'BAIGORRIA', 'DNI30819573', 'password', 'Museos
', 6, '2016-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (13, 'FACUNDO', 'GUTIERREZ', 'DNI30866787', 'password', '


Seguridad
', 1, '2017-12-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (14, 'MATIAS', 'GARCIA', 'DNI30868883', 'password', 'Escuelas
', 9, '2018-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (15, 'DANIEL', 'HERRERA', 'DNI30885642', 'password', 'Semaforos y Señalectica
', 9, '2015-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (16, 'JESUS', 'DIAZ', 'DNI30888538', 'password', 'Plazas y Parques
', 8, '2017-03-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (17, 'GABRIEL', 'PETAGNA', 'DNI30912099', 'password', '

Edificios Publicos y Oficinas
', 2, '2019-04-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (18, 'MARTIN', 'PURCHEL', 'DNI30944156', 'password', 'Escuelas
', 7, '2014-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (19, 'ALFREDO', 'RODRIGUEZ', 'DNI30952992', 'password', 'Semaforos y Señalectica
', 4, '2021-06-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (20, 'ARTURO', 'MUÑOZ', 'DNI30980277', 'password', 'Museos
', 2, '2014-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (21, 'SEBASTIAN', 'FERNANDEZ', 'DNI31032143', 'password', 'Bacheo y Demarcacion
', 4, '2015-02-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (22, 'LEONARDO', 'GONZALEZ', 'DNI31070616', 'password', 'Bacheo y Demarcacion
', 6, '2015-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (23, 'MAXIMILIANO', 'ALBORNOZ', 'DNI31079668', 'password', 'Plazas y Parques
', 1, '2021-10-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (24, 'MARIO', 'CASTRO', 'DNI31079744', 'password', 'Bacheo y Demarcacion
', 9, '2020-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (25, 'MARIANO', 'MOGARTE', 'DNI31156237', 'password', 'Escuelas
', 7, '2019-04-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (26, 'RUBEN', 'IMASAKA', 'DNI31177539', 'password', 'Museos
', 5, '2018-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (27, 'DIEGO', 'BARRIOS', 'DNI31189490', 'password', 'Semaforos y Señalectica
', 5, '2015-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (28, 'JUAN', 'CANALES', 'DNI31239205', 'password', 'Escuelas
', 1, '2019-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (29, 'VICTOR', 'ZARATE', 'DNI31244038', 'password', 'Plazas y Parques
', 9, '2021-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (30, 'LEANDRO', 'SANCHEZ', 'DNI31253023', 'password', 'Seguridad
', 5, '2014-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (31, 'NICOLAS', 'GEREZ', 'DNI31262291', 'password', 'Areas Verdes
', 8, '2014-06-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (32, 'MATIAS', 'DI BELLO', 'DNI31282335', 'password', 'Edificios Publicos y Oficinas
', 9, '2014-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (33, 'NESTOR', 'SUELDO', 'DNI31283679', 'password', 'Escuelas
', 2, '2018-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (34, 'PABLO', 'GIGLIO', 'DNI31293173', 'password', 'Semaforos y Señalectica
', 7, '2017-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (35, 'LUCAS', 'VENERE', 'DNI31293846', 'password', 'Museos
', 8, '2017-01-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (36, 'PABLO', 'MORETTI', 'DNI31297900', 'password', 'Seguridad
', 8, '2021-03-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (37, 'MARIO', 'SANTILLA', 'DNI31325403', 'password', 'Edificios Publicos y Oficinas
', 2, '2019-10-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (38, 'FEDERICO', 'NAVARRO', 'DNI31362192', 'password', 'Plazas y Parques
', 1, '2015-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (39, 'PABLO', 'AGUADA', 'DNI31362419', 'password', 'Semaforos y Señalectica
', 3, '2016-10-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (40, 'NESTOR', 'MAGUNA', 'DNI31374667', 'password', 'Escuelas
', 8, '2015-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (41, 'RUBEN', 'ALBORNOZ', 'DNI31443543', 'password', 'Areas Verdes
', 5, '2019-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (42, 'MATIAS', 'SALINAS', 'DNI31444272', 'password', 'Areas Verdes
', 7, '2019-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (43, 'WALTER', 'LOPEZ', 'DNI31470110', 'password', 'Escuelas
', 7, '2015-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (44, 'CRISTIAN', 'CHAPARRO', 'DNI31531124', 'password', '


Seguridad
', 2, '2015-06-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (45, 'DARIO', 'ROLANDO', 'DNI31617553', 'password', 'Escuelas
', 8, '2015-10-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (46, 'ARIEL', 'PICCHI', 'DNI31617728', 'password', '


Seguridad
', 3, '2021-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (47, 'FEDERICO', 'FARFA', 'DNI31650048', 'password', 'Escuelas
', 7, '2014-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (48, 'CARLOS', 'SEGADE', 'DNI31658901', 'password', 'Edificios Publicos y Oficinas
', 8, '2020-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (49, 'CRISTIAN', 'MOREIRA', 'DNI31681421', 'password', 'Semaforos y Señalectica
', 8, '2019-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (50, 'JUAN', 'RODRIGUEZ', 'DNI31684432', 'password', '


Seguridad
', 4, '2014-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (51, 'JORGE', 'CALIVA', 'DNI31687570', 'password', 'Plazas y Parques
', 6, '2017-01-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (52, 'SEBASTIAN', 'GONZALEZ', 'DNI31727399', 'password', 'Plazas y Parques
', 6, '2022-01-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (53, 'JULIAN', 'PEREYRA', 'DNI31727824', 'password', '


Seguridad
', 3, '2016-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (54, 'IVAN', 'CANO', 'DNI31731313', 'password', 'Edificios Publicos y Oficinas
', 6, '2018-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (55, 'MAURICIO', 'CARUSO', 'DNI31740027', 'password', 'Escuelas
', 1, '2015-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (56, 'ESTEBAN', 'MEDINA', 'DNI31740346', 'password', 'Escuelas
', 2, '2020-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (57, 'FEDERICO', 'POLANCO', 'DNI31750377', 'password', 'Edificios Publicos y Oficinas
', 7, '2020-01-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (58, 'SEBASTIAN', 'GALA', 'DNI31761910', 'password', 'Bacheo y Demarcacion
', 9, '2020-04-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (59, 'CRISTIAN', 'GATTO', 'DNI31763069', 'password', 'Bacheo y Demarcacion
', 2, '2021-12-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (60, 'LEANDRO', 'VAÑOS', 'DNI31764083', 'password', 'Bacheo y Demarcacion
', 8, '2015-06-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (61, 'GABRIEL', 'BENITEZ', 'DNI31772732', 'password', 'Semaforos y Señalectica
', 5, '2019-12-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (62, 'EMANUEL', 'OSTOISCH', 'DNI31774039', 'password', 'Semaforos y Señalectica
', 8, '2017-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (63, 'PABLO', 'BARRIONUEVO', 'DNI31781455', 'password', 'Bacheo y Demarcacion
', 7, '2015-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (64, 'DANIEL', 'PIZARRO', 'DNI31781643', 'password', 'Edificios Publicos y Oficinas
', 4, '2019-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (65, 'DAMIAN', 'RODRIGUEZ', 'DNI31797782', 'password', 'Seguridad
', 6, '2020-12-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (66, 'GABRIEL', 'TORRES', 'DNI31797902', 'password', 'Plazas y Parques
', 1, '2017-10-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (67, 'WALTER', 'MARTINEZ', 'DNI31827019', 'password', 'Semaforos y Señalectica
', 7, '2015-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (68, 'ANTONIO', 'CARDOZO', 'DNI31876635', 'password', '

Edificios Publicos y Oficinas
', 3, '2016-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (69, 'SEBASTIAN', 'OCAMPO', 'DNI31895478', 'password', 'Escuelas', 2, '2019-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (70, 'MATIAS', 'PINCINI', 'DNI31899200', 'password', 'Edificios Publicos y Oficinas
', 4, '2018-05-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (71, 'MIGUEL', 'NOVIELLI', 'DNI31899211', 'password', 'Semaforos y Señalectica
', 2, '2018-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (72, 'ARIEL', 'CARUSO', 'DNI31899301', 'password', 'Bacheo y Demarcacion
', 5, '2015-07-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (73, 'CRISTIAN', 'GONZALEZ', 'DNI31916459', 'password', 'Bacheo y Demarcacion
', 3, '2014-11-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (74, 'LUCAS', 'GENOVESE', 'DNI31953929', 'password', 'Areas Verdes
', 4, '2017-09-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (75, 'MANUEL', 'FLEITAS', 'DNI31978771', 'password', 'Edificios Publicos y Oficinas
', 8, '2014-03-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (76, 'ARIEL', 'FERREIRA', 'DNI32063815', 'password', 'Plazas y Parques
', 5, '2014-02-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (77, 'LUIS MIGUEL', 'ROMERO', 'DNI32427681', 'password', 'Escuelas
', 4, '2018-08-19T00:00:00.000');
INSERT INTO personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (78, 'EDGAR', 'GARCETE', 'DNI92920447', 'password', 'Edificios Publicos y Oficinas
', 5, '2020-05-19T00:00:00.000');