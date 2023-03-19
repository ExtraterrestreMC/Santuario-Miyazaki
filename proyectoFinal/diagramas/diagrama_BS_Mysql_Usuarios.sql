CREATE TABLE `perfiles` (
  `id` int(9) PRIMARY KEY NOT NULL,
  `nombre` text NOT NULL,
  `canRead` bit(1) NOT NULL,
  `canWrite` bit(1) NOT NULL,
  `canEdit` bit(1) NOT NULL,
  `canDelete` bit(1) NOT NULL,
  `special` bit(1) NOT NULL
);

CREATE TABLE `usuarios` (
  `id_usuario` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `DNI` varchar(9) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Correo` text NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `id_perfiles` int(9) DEFAULT NULL
);

CREATE UNIQUE INDEX `DNI` ON `usuarios` (`DNI`);

CREATE UNIQUE INDEX `Correo` ON `usuarios` (`Correo`) USING HASH;

CREATE INDEX `id_perfiles` ON `usuarios` (`id_perfiles`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`id_perfiles`) REFERENCES `perfiles` (`id`);
