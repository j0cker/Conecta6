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

//alta nueva plantilla
Route::post('/empresas/plantilla/nueva', 'APIEmpresas@AltaPlantilla');

//get plantillas by empresas
Route::get('/empresas/plantilla/obtener', 'APIEmpresas@GetPlantillas');

//Get Image
Route::get('/empresas/profile/image', 'APIEmpresas@GetProfileImage');

//Update Image
Route::post('/empresas/profile/image', 'APIEmpresas@UpdateProfilePicture');

/*
*******Admin******
*/

//Ingresar Administradores
Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');

//Logout
Route::get('/pAdmin/logout', 'APIAdmin@Logout');

