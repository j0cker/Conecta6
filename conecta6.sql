-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-08-2019 a las 06:41:30
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
  `id_administradores` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono_fijo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `celular` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `pass` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id_administradores`, `nombre`, `apellido`, `correo`, `cargo`, `telefono_fijo`, `celular`, `created_at`, `updated_at`, `pass`) VALUES
(1, 'Manlio', 'Teran', 'manlioelnum1@hotmail.com', 'Administrador', '56713835', '5510800291', '2019-07-19 19:23:07', '0000-00-00 00:00:00', '8e96bd02fbcb054cca11cf8deb031562b9aaedd83f83ff7abf7c3fa787ad9bbd'),
(2, 'jose', 'Perez', 'jose@gmail.com', 'Administrador', '56736465', '3345454545', '2019-07-26 21:16:02', '0000-00-00 00:00:00', 'b8b9b90248616b9e6e3db1c619da7a6a83ae9001b74ecfb5d3041fbbdffa8958');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colores`
--

CREATE TABLE `colores` (
  `id` int(11) NOT NULL,
  `hex` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `colores`
--

INSERT INTO `colores` (`id`, `hex`) VALUES
(0, '#433191'),
(1, '#754467'),
(2, '#617a28'),
(3, '#2b4c81'),
(4, '#0f619f'),
(5, '#447574'),
(6, '#ad0a38'),
(7, '#5b5b5b'),
(8, '#3955bc'),
(9, '#bf662c'),
(10, '#4d504f'),
(11, '#6a734e'),
(12, '#4e4c77'),
(13, '#318c38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id_empresas` int(11) NOT NULL,
  `nombre_empresa` varchar(200) COLLATE utf8_spanish2_ci NOT NULL DEFAULT '',
  `nombre_solicitante` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono_fijo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `celular` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `vigencia` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `empleados_permitidos` int(11) NOT NULL,
  `created_at` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `updated_at` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `activo` int(11) NOT NULL DEFAULT '1',
  `subdominio` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id_empresas`, `nombre_empresa`, `nombre_solicitante`, `correo`, `telefono_fijo`, `celular`, `vigencia`, `empleados_permitidos`, `created_at`, `updated_at`, `activo`, `subdominio`, `pass`, `color`) VALUES
(1, 'Coca Cola', 'Manlio Emiliano Terán Ramos', 'info@cocacola.com', '56713835', '5510800291', '08/30/2019', 50, '2019-08-05 01:32:29', '2019-08-05 01:32:29', 1, 'cocacola', '08161eb1abefbe9e37e506f20168d0728610fd6f4296b16244324d8a6f377295', 13);

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
(1, 'panel de administración empresas'),
(2, 'menu empresas'),
(3, 'menu trabajadores');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_inter`
--

CREATE TABLE `permisos_inter` (
  `id` int(11) NOT NULL,
  `id_trabajadores` int(11) NOT NULL DEFAULT '0',
  `id_empresas` int(11) NOT NULL DEFAULT '0',
  `id_administradores` int(11) NOT NULL DEFAULT '0',
  `id_permisos` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `permisos_inter`
--

INSERT INTO `permisos_inter` (`id`, `id_trabajadores`, `id_empresas`, `id_administradores`, `id_permisos`, `created_at`) VALUES
(1, 0, 0, 1, 1, '2019-07-21 02:19:47'),
(2, 1, 0, 0, 3, '2019-07-21 07:36:52'),
(3, 2, 0, 0, 3, '2019-07-21 07:36:55'),
(4, 0, 0, 2, 1, '2019-07-26 21:16:21'),
(5, 3, 0, 0, 3, '2019-07-26 21:19:47'),
(6, 0, 1, 0, 2, '2019-08-05 02:42:07');

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
(1, 1, 'Manlio', 'Teran', 'manlioelnum1@hotmail.com', '', '', '', '2019-08-05 02:28:47', '0000-00-00 00:00:00', '', '', '8e96bd02fbcb054cca11cf8deb031562b9aaedd83f83ff7abf7c3fa787ad9bbd'),
(2, 0, '', '', 'jocker.clown690@gmail.com', '', '', '', '2019-07-05 17:12:01', '0000-00-00 00:00:00', '', '', '002bdfc07cf583330b0d9e8002d9dddf9669e6df4b543c2d0d6c21d18544a928'),
(3, 0, 'Jose', 'Perez', 'jose@gmail.com', '', '', '', '2019-07-11 04:06:36', '0000-00-00 00:00:00', '', '', '1ec4ed037766aa181d8840ad04b9fc6e195fd37dedc04c98a5767a67d3758ece'),
(4, 1, 'Jose', 'Perez', 'jose@cocacola.com', 'Gerente', '564838', '876873030', '2019-08-05 04:41:19', '0000-00-00 00:00:00', '', '', 'b8b9b90248616b9e6e3db1c619da7a6a83ae9001b74ecfb5d3041fbbdffa8958');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id_administradores`);

--
-- Indices de la tabla `colores`
--
ALTER TABLE `colores`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id_administradores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id_empresas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id_permisos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `permisos_inter`
--
ALTER TABLE `permisos_inter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id_trabajadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
