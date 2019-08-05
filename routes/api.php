<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
*******Trabajadores******
*/

//Ingresar Trabajadores
Route::get('/trabajadores/ingresar', 'APITrabajadores@Ingresar');

//Logout
Route::get('/trabajadores/logout', 'APITrabajadores@Logout');

/*
*******Empresas******
*/

//Ingresar Empresas
Route::get('/empresas/ingresar', 'APIEmpresas@Ingresar');

//Alta de nueva Empresa
Route::post('/empresas/altaEmpresa', 'APIEmpresas@AltaEmpresa');

//validar que no exista ese subdominio solicitado
Route::get('/empresas/subdominioValidar', 'APIEmpresas@SubdominioValidar');

/*
*******Admin******
*/

//Ingresar Administradores
Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');

//Logout
Route::get('/pAdmin/logout', 'APIAdmin@Logout');

