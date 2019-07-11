-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2019 a las 04:39:38
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `conecta6`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id_empresas` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono_fijo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `celular` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `created_at` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `updated_at` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `dni_num` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `seguro_social` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id_empresas` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono_fijo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `celular` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `created_at` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `updated_at` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `dni_num` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `seguro_social` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id_permisos` int(11) NOT NULL,
  `permiso` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id_permisos`, `permiso`) VALUES
(1, 'panel de administración empresas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_inter`
--

CREATE TABLE `permisos_inter` (
  `id` int(11) NOT NULL,
  `id_usuarios` int(11) NOT NULL DEFAULT '0',
  `id_empresas` int(11) NOT NULL DEFAULT '0',
  `id_administradores` int(11) NOT NULL DEFAULT '0',
  `id_permisos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `id_trabajadores` int(11) NOT NULL,
  `id_empresas` int(11) NOT NULL DEFAULT '0',
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono_fijo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `celular` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `dni_num` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `seguro_social` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`id_trabajadores`, `id_empresas`, `nombre`, `apellido`, `correo`, `cargo`, `telefono_fijo`, `celular`, `created_at`, `updated_at`, `dni_num`, `seguro_social`, `pass`) VALUES
(1, 0, '', '', 'manlioelnum1@hotmail.com', '', '', '', '2019-07-05 17:09:51', '0000-00-00 00:00:00', '', '', '8e96bd02fbcb054cca11cf8deb031562b9aaedd83f83ff7abf7c3fa787ad9bbd'),
(2, 0, '', '', 'jocker.clown690@gmail.com', '', '', '', '2019-07-05 17:12:01', '0000-00-00 00:00:00', '', '', '002bdfc07cf583330b0d9e8002d9dddf9669e6df4b543c2d0d6c21d18544a928');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id_empresas`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id_empresas`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permisos`);

--
-- Indices de la tabla `permisos_inter`
--
ALTER TABLE `permisos_inter`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`id_trabajadores`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id_empresas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id_empresas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id_permisos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `permisos_inter`
--
ALTER TABLE `permisos_inter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id_trabajadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
