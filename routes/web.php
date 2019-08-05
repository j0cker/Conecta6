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
Route::get('/historial', 'APITrabajadores@Historial');

/*
*********Empresas***********
*/

//Sistema Welcome
Route::get('/inicioEmpresa', 'APIEmpresas@Inicio');

//sign in personalizado (URL a evaluación)
Route::get('/{any}/pAdmin', 'APIEmpresas@SignInPersonalizado');

/*
*********Admin***********
*/

//welcome login
Route::get('/pAdmin', 'APIAdmin@SignIn');

//Sistema Welcome
Route::get('/inicioAdmin', 'APIAdmin@Inicio');

//Perfil
Route::get('/perfilAdministradores', 'APIAdmin@Perfil');

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
Route::get('/{any}', 'APITrabajadores@SignIn');


