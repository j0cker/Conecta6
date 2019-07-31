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

//Request API
Route::get('/trabajadores/ingresar', 'APITrabajadores@Ingresar');

//Logout
Route::get('/trabajadores/logout', 'APITrabajadores@Logout');

/*
*******Empresas******
*/

//validar que no exista ese subdominio solicitado
Route::get('/empresas/subdominioValidar', 'APIEmpresas@SubdominioValidar');

/*
*******Admin******
*/

//Request API
Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');

//Logout
Route::get('/pAdmin/logout', 'APIAdmin@Logout');

