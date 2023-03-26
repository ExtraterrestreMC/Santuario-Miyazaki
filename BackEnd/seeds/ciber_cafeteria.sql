-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-03-2023 a las 20:32:30
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ciber_cafeteria`
--
CREATE DATABASE IF NOT EXISTS `ciber_cafeteria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ciber_cafeteria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
CREATE TABLE IF NOT EXISTS `perfiles` (
  `id` int(9) NOT NULL,
  `nombre` text NOT NULL,
  `canRead` bit(1) NOT NULL,
  `canWrite` bit(1) NOT NULL,
  `canEdit` bit(1) NOT NULL,
  `canDelete` bit(1) NOT NULL,
  `special` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncar tablas antes de insertar `perfiles`
--

TRUNCATE TABLE `perfiles`;
--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id`, `nombre`, `canRead`, `canWrite`, `canEdit`, `canDelete`, `special`) VALUES(1, 'ADMIN', b'1', b'1', b'1', b'1', b'1');
INSERT INTO `perfiles` (`id`, `nombre`, `canRead`, `canWrite`, `canEdit`, `canDelete`, `special`) VALUES(2, 'USER', b'1', b'1', b'1', b'1', b'0');
INSERT INTO `perfiles` (`id`, `nombre`, `canRead`, `canWrite`, `canEdit`, `canDelete`, `special`) VALUES(3, 'GUESS', b'1', b'0', b'0', b'0', b'0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `DNI` varchar(9) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Correo` text NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `id_perfiles` int(9) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `DNI` (`DNI`),
  UNIQUE KEY `Correo` (`Correo`) USING HASH,
  KEY `id_perfiles` (`id_perfiles`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Truncar tablas antes de insertar `usuarios`
--

TRUNCATE TABLE `usuarios`;
--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `DNI`, `Nombre`, `Apellidos`, `Correo`, `Contraseña`, `id_perfiles`) VALUES(2, '46085985B', 'Alex2', 'Montero5', 'alejandro.montero.cerdan@gmail.com', '$2b$12$rYCRlVI1ISAxrnV33hh7X.woFcyed8Gz7MBvU5LWWebPTQuWFAJWu', 1);
INSERT INTO `usuarios` (`id_usuario`, `DNI`, `Nombre`, `Apellidos`, `Correo`, `Contraseña`, `id_perfiles`) VALUES(4, '46085985v', 'Alex2', 'Montero2', 'alejandro@gmail.com', '$2b$12$lzcE8cG/ONP0INsguwr2keLFbiZR6svjbSiAgL1n.eBqmeKe5PciW', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_perfiles`) REFERENCES `perfiles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
