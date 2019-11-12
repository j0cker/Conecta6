<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//tests laravel php
Route::get('/test', 'APITest@Test');

/*
**********Landing*********
*/

//Welcome Login
Route::get('/', 'APILanding@Landing');

/*
********Trabajadores*******
*/

//ejemplos de hojas
Route::get('/marketing', 'APITrabajadores@Marketing');
Route::get('/introduction', 'APITrabajadores@Introduction');

//Sistema Welcome
Route::get('/inicio', 'APITrabajadores@Inicio');

//reloj gigante para registro
Route::get('/registros', 'APITrabajadores@Registros');

//perfil de trabajadores
Route::get('/perfilTrabajadores', 'APITrabajadores@Perfil');

//Perfil cambio de contraseña
Route::get('/perfilTrabajadores/pass', 'APITrabajadores@PerfilPass');

//historial de entradas y salidas
Route::get('/historial', 'APITrabajadores@Historial');

/*
*********Empresas***********
*/

//Sistema Welcome
Route::get('/inicioEmpresa', 'APIEmpresas@Inicio');

//Perfil Empresa
Route::get('/perfilEmpresas', 'APIEmpresas@Perfil');

//Perfil Cambio de Contraseña
Route::get('/perfilEmpresas/pass', 'APIEmpresas@PerfilPass');

//Trabajadores
Route::get('/trabajadores', 'APIEmpresas@Trabajadores');

//Nuevos Trabajadores
Route::get('/trabajadores/nuevo', 'APIEmpresas@NuevoTrabajadores');

//editar Trabajadores
Route::get('/trabajadores/editar', 'APIEmpresas@ModTrabajadores');

//Nueva Plantilla de Horario de los Trabajadores
Route::get('/plantilla/nueva', 'APIEmpresas@NuevaPlantilla');

//Mod Plantilla de Horario de los Trabajadores
Route::get('/plantilla/mod', 'APIEmpresas@ModificarPlantilla');

//Nueva Salida
Route::get('/salidas/modificar', 'APIEmpresas@SalidasModificar');

//sign in personalizado (URL a evaluación)
Route::get('/{any}/pAdmin', 'APIEmpresas@SignInPersonalizado');

//historial de entrada por empresa
Route::get('/historialEntradasEmpresa', 'APIEmpresas@HistorialEntradasEmpresa');

//configuraciones
Route::get('/configuraciones', 'APIEmpresas@Configuraciones');

//Informes
Route::get('/informes', 'APIEmpresas@Informes');

/*
*********Admin***********
*/

//welcome login
Route::get('/pAdmin', 'APIAdmin@SignIn');

//Sistema Welcome
Route::get('/inicioAdmin', 'APIAdmin@Inicio');

//Perfil
Route::get('/perfilAdministradores', 'APIAdmin@Perfil');

//Perfil cambio de contraseña
Route::get('/perfilAdministradores/pass', 'APIAdmin@PerfilPass');

//Empresas
Route::get('/empresas', 'APIAdmin@Empresas');

//Agregar Nueva Empresa
Route::get('/empresas/nueva', 'APIAdmin@NuevaEmpresa');

//Modificar Empresa
Route::get('/empresas/modificar', 'APIAdmin@ModificarEmpresa');

//Idiomas
Route::get('/idiomas', 'APIAdmin@Idiomas');

//Modificar Idiomas
Route::get('/idiomas/modificar', 'APIAdmin@ModIdiomasFront');

//Agregar idioma
Route::get('/idiomas/agregar', 'APIAdmin@AgregarIdiomaFront');

//Administradores
Route::get('/administradores', 'APIAdmin@Administradores');

//Nuevo Administradores
Route::get('/administradores/nuevo', 'APIAdmin@NuevoAdministrador');

//Nuevo Administradores
Route::get('/administradores/modificar', 'APIAdmin@EditarAdministrador');

/*
*********Trabajadores***********
*/

//sign in personalizado (URL a evaluación)
Route::get('/{any}', 'APITrabajadores@SignIn');

/*
Recuperar Contraseñas
*/


//recuperar contraseña administradores
Route::get('/pAdmin/recuperar', 'APIAdmin@Recuperar');

//recuperar contraseña trabajadores
Route::get('/{any}/recuperar', 'APITrabajadores@Recuperar');

//recuperar contraseña empresas
Route::get('/{any}/pAdmin/recuperar', 'APIEmpresas@Recuperar');

