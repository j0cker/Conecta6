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

/*
**********Landing*********
*/

//Welcome Login
Route::get('/', 'APILanding@Landing');

/*
********Trabajadores*******
*/

//Sistema Welcome
Route::get('/inicio', 'APITrabajadores@Inicio');
Route::get('/marketing', 'APITrabajadores@Marketing');
Route::get('/introduction', 'APITrabajadores@Introduction');
Route::get('/registros', 'APITrabajadores@Registros');
Route::get('/perfilTrabajadores', 'APITrabajadores@Perfil');

//Perfil cambio de contraseña
Route::get('/perfilTrabajadores/pass', 'APITrabajadores@PerfilPass');
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

//Perfil Editar
Route::post('/perfilEmpresas/profile/edit', 'APIEmpresas@PerfilEditar');

//Trabajadores
Route::get('/trabajadores', 'APIEmpresas@Trabajadores');

//Nuevos Trabajadores
Route::get('/trabajadores/nuevo', 'APIEmpresas@NuevoTrabajadores');

//editar Trabajadores
Route::get('/trabajadores/editar', 'APIEmpresas@ModTrabajadores');

//Nueva Plantilla de Horario de los Trabajadores
Route::get('/plantilla/nueva', 'APIEmpresas@NuevaPlantilla');

//Nueva Salida
Route::get('/salidas/modificar', 'APIEmpresas@SalidasModificar');

//sign in personalizado (URL a evaluación)
Route::get('/{any}/pAdmin', 'APIEmpresas@SignInPersonalizado');

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

//Idiomas
Route::get('/idiomas', 'APIAdmin@Idiomas');

//Administradores
Route::get('/administradores', 'APIAdmin@Administradores');

//Nuevo Administradores
Route::get('/administradores/nuevo', 'APIAdmin@NuevoAdministrador');

/*
*********Trabajadores***********
*/
//sign in personalizado (URL a evaluación)
Route::get('/test', 'APITest@Test');

//sign in personalizado (URL a evaluación)
Route::get('/{any}', 'APITrabajadores@SignIn');


