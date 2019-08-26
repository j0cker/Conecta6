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
*******Generales******
*/

//Zonas Horarias
Route::get('/zonasHorarias', 'APIGeneral@ZonasHorarias');

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

//get empresa
Route::get('/empresas/obtener', 'APIEmpresas@GetEmpresa');

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

//Update Image
Route::post('/empresas/profile/image', 'APIEmpresas@UpdateProfilePicture');

//Actualizar contraseña del perfil de empresas
Route::post('/empresas/perfil/pass', 'APIEmpresas@ChangePerfilPass');

//Alta Nuevo Trabajador
Route::post('/empresas/altaNuevoTrabajador', 'APIEmpresas@AltaTrabajador');

//Get Trabajadores by id empresas
Route::get('/empresas/trabajadores/obtener', 'APIEmpresas@GetTrabajadores');

//Get Trabajadores by id trabajadores
Route::get('/empresas/trabajadores/obtener/id_trabajadadores', 'APIEmpresas@GetTrabajadoresIdTrabajadores');

//Eliminar Trabajador
Route::post('/empresas/trabajadores/eliminar', 'APIEmpresas@EliminarTrabajadores');

//Eliminar Trabajador
Route::post('/empresas/modTrabajador', 'APIEmpresas@ModTrabajador');

//Actualizar Zonas Horaria de Empresa
Route::post('/empresas/zonasHorarias', 'APIEmpresas@ZonasHorarias');

//obtener todas las salidas por id empresas
Route::get('/empresas/salidas', 'APIEmpresas@GetSalidas');

//obtener una salida en específico en un id empresa
Route::get('/empresas/salidas/id', 'APIEmpresas@GetSalidaId');

//agregar salidas por id empresas
Route::post('/empresas/salidas', 'APIEmpresas@AltaSalidas');

//modificar salidas por id empresas y id salidas
Route::post('/empresas/salidas/modificar', 'APIEmpresas@ModSalidas');

//borrar salidas por id empresas y id salidas
Route::post('/empresas/salidas/borrar', 'APIEmpresas@DelSalidas');

/*
*******Admin******
*/

//Ingresar Administradores
Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');

//Logout
Route::get('/pAdmin/logout', 'APIAdmin@Logout');

