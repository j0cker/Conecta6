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
********Trabajadores*******
*/

//Welcome Login
Route::get('/', 'APITrabajadores@SignIn');

//Sistema Welcome
Route::get('/inicio', 'APITrabajadores@Inicio');
Route::get('/marketing', 'APITrabajadores@Marketing');
Route::get('/introduction', 'APITrabajadores@Introduction');
Route::get('/registros', 'APITrabajadores@Registros');
Route::get('/perfil', 'APITrabajadores@Perfil');
Route::get('/historial', 'APITrabajadores@Historial');

/*
*********Empresas***********
*/

/*
*********Admin***********
*/

//welcome login
Route::get('/pAdmin', 'APIAdmin@SignIn');

//Sistema Welcome
Route::get('/inicioAdmin', 'APIAdmin@Inicio');

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
*********Empresas***********
*/

//sign in personalizado (URL a evaluación)
Route::get('/{any}', 'APIEmpresas@SignInPersonalizado');


