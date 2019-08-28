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

//Actualizar contraseña del perfil de trabajadores
Route::post('/trabajadores/perfil/pass', 'APITrabajadores@ChangePerfilPass');

//Get Trabajadores by id trabajadores
Route::get('/trabajadores/obtener/id_trabajadadores', 'APITrabajadores@GetTrabajadoresIdTrabajadores');

//Get Trabajadores by id empresas
Route::get('/trabajadores/obtener', 'APITrabajadores@GetTrabajadores');

//Eliminar Trabajador
Route::post('/trabajadores/eliminar', 'APITrabajadores@EliminarTrabajadores');

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

//Edit Profile
Route::post('/empresas/profile/edit', 'APIEmpresas@PerfilEditar');

//Actualizar contraseña del perfil de empresas
Route::post('/empresas/perfil/pass', 'APIEmpresas@ChangePerfilPass');

//Alta Nuevo Trabajador
Route::post('/empresas/altaNuevoTrabajador', 'APIEmpresas@AltaTrabajador');

//Modificar Trabajador
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

//Actualizar contraseña del perfil de administradores
Route::post('/pAdmin/perfil/pass', 'APIAdmin@ChangePerfilPass');

