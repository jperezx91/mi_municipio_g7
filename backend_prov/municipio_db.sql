-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2024 a las 21:59:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mi_municipio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrios`
--

CREATE TABLE `barrios` (
  `idBarrio` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncias`
--

CREATE TABLE `denuncias` (
  `idDenuncias` int(11) NOT NULL,
  `documento` int(11) DEFAULT NULL,
  `idSitio` int(11) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `estado` varchar(50) NOT NULL,
  `aceptaResponsabilidad` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desperfectos`
--

CREATE TABLE `desperfectos` (
  `idDesperfecto` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `idRubro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientosreclamo`
--

CREATE TABLE `movimientosreclamo` (
  `idMovimiento` int(11) NOT NULL,
  `idReclamo` int(11) DEFAULT NULL,
  `responsable` varchar(255) DEFAULT NULL,
  `causa` text DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `legajo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `documento` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `fechaIngreso` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos`
--

CREATE TABLE `reclamos` (
  `idReclamo` int(11) NOT NULL,
  `documento` int(11) DEFAULT NULL,
  `idSitio` int(11) DEFAULT NULL,
  `idDesperfecto` int(11) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `estado` varchar(50) NOT NULL,
  `idReclamoUnificado` int(11) DEFAULT NULL,
  `legajo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubros`
--

CREATE TABLE `rubros` (
  `idRubro` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sitios`
--

CREATE TABLE `sitios` (
  `idSitio` int(11) NOT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `calle` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `entreCalleA` varchar(255) DEFAULT NULL,
  `entreCalleB` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `aCargoDe` varchar(255) DEFAULT NULL,
  `apertura` date DEFAULT NULL,
  `cierre` date DEFAULT NULL,
  `comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `idSolicitud` int(11) NOT NULL,
  `documento` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `documento` int(11) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `ftime` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vecinos`
--

CREATE TABLE `vecinos` (
  `documento` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `codigoBarrio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barrios`
--
ALTER TABLE `barrios`
  ADD PRIMARY KEY (`idBarrio`);

--
-- Indices de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD PRIMARY KEY (`idDenuncias`),
  ADD KEY `documento` (`documento`),
  ADD KEY `idSitio` (`idSitio`);

--
-- Indices de la tabla `desperfectos`
--
ALTER TABLE `desperfectos`
  ADD PRIMARY KEY (`idDesperfecto`),
  ADD KEY `idRubro` (`idRubro`);

--
-- Indices de la tabla `movimientosreclamo`
--
ALTER TABLE `movimientosreclamo`
  ADD PRIMARY KEY (`idMovimiento`),
  ADD KEY `idReclamo` (`idReclamo`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`legajo`);

--
-- Indices de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD PRIMARY KEY (`idReclamo`),
  ADD KEY `documento` (`documento`),
  ADD KEY `idSitio` (`idSitio`),
  ADD KEY `idDesperfecto` (`idDesperfecto`),
  ADD KEY `legajo` (`legajo`);

--
-- Indices de la tabla `rubros`
--
ALTER TABLE `rubros`
  ADD PRIMARY KEY (`idRubro`);

--
-- Indices de la tabla `sitios`
--
ALTER TABLE `sitios`
  ADD PRIMARY KEY (`idSitio`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`idSolicitud`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idVecino` (`documento`);

--
-- Indices de la tabla `vecinos`
--
ALTER TABLE `vecinos`
  ADD PRIMARY KEY (`documento`),
  ADD KEY `codigoBarrio` (`codigoBarrio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `barrios`
--
ALTER TABLE `barrios`
  MODIFY `idBarrio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  MODIFY `idDenuncias` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `desperfectos`
--
ALTER TABLE `desperfectos`
  MODIFY `idDesperfecto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimientosreclamo`
--
ALTER TABLE `movimientosreclamo`
  MODIFY `idMovimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `legajo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  MODIFY `idReclamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rubros`
--
ALTER TABLE `rubros`
  MODIFY `idRubro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sitios`
--
ALTER TABLE `sitios`
  MODIFY `idSitio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD CONSTRAINT `denuncias_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `vecinos` (`documento`),
  ADD CONSTRAINT `denuncias_ibfk_2` FOREIGN KEY (`idSitio`) REFERENCES `sitios` (`idSitio`);

--
-- Filtros para la tabla `desperfectos`
--
ALTER TABLE `desperfectos`
  ADD CONSTRAINT `desperfectos_ibfk_1` FOREIGN KEY (`idRubro`) REFERENCES `rubros` (`idRubro`);

--
-- Filtros para la tabla `movimientosreclamo`
--
ALTER TABLE `movimientosreclamo`
  ADD CONSTRAINT `movimientosreclamo_ibfk_1` FOREIGN KEY (`idReclamo`) REFERENCES `reclamos` (`idReclamo`);

--
-- Filtros para la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD CONSTRAINT `reclamos_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `vecinos` (`documento`),
  ADD CONSTRAINT `reclamos_ibfk_2` FOREIGN KEY (`idSitio`) REFERENCES `sitios` (`idSitio`),
  ADD CONSTRAINT `reclamos_ibfk_3` FOREIGN KEY (`idDesperfecto`) REFERENCES `desperfectos` (`idDesperfecto`),
  ADD CONSTRAINT `reclamos_ibfk_4` FOREIGN KEY (`legajo`) REFERENCES `personal` (`legajo`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `vecinos` (`documento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vecinos`
--
ALTER TABLE `vecinos`
  ADD CONSTRAINT `vecinos_ibfk_1` FOREIGN KEY (`codigoBarrio`) REFERENCES `barrios` (`idBarrio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
