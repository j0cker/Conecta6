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

//Lanzador de Correos Electrónicos
Route::get('/mailsLauncher', 'MailsLauncher@mailsLauncher');

//Obtener IP Pública del servidor Permisos (Empresas y admin)
Route::get('/ipPublica', 'APIGeneral@IpPublica');

/*
*******Trabajadores******
*/

//Ingresar Trabajadores
Route::get('/trabajadores/ingresar', 'APITrabajadores@Ingresar');

//Logout
Route::get('/trabajadores/logout', 'APITrabajadores@Logout');

//Actualizar contraseña del perfil de trabajadores
Route::post('/trabajadores/perfil/pass', 'APITrabajadores@ChangePerfilPass');

//Edit Profile
Route::post('/trabajadores/profile/edit', 'APITrabajadores@PerfilEditar');

//Get Trabajadores by id trabajadores
Route::get('/trabajadores/obtener/id_trabajadadores', 'APITrabajadores@GetTrabajadoresIdTrabajadores');

//Get Trabajadores by id empresas
Route::get('/trabajadores/obtener', 'APITrabajadores@GetTrabajadores');

//Get All Trabajadores
Route::get('/trabajadores/obtenerAll', 'APITrabajadores@GetAllTrabajadores');

//post registro entrada
Route::post('/trabajadores/registros/entradas', 'APITrabajadores@PostEntradas');

//post registro salidas
Route::post('/trabajadores/registros/salidas', 'APITrabajadores@PostSalidas');

//Get Historial Todas las Entradas y Salidas sin filtros
Route::get('/trabajadores/historial/getAll', 'APITrabajadores@GetAllHistorialEYS');

//Get Historial Entradas by id_trabajadores fecha ini y fecha fin
Route::get('/trabajadores/historial/todas', 'APITrabajadores@GetAllHistorial');

//Get Historial Entradas by id_empresas fecha ini y fecha fin
Route::get('/trabajadores/historial/todasByIdEmpresas', 'APITrabajadores@GetAllHistorialByIdEmpresas');

//Get All Entradas All Salidas by id_trabajadores
Route::get('/trabajadores/registros/todos', 'APITrabajadores@GetAllEntradasSalidas');

//Get All Entradas All Salidas by id_empresas
Route::get('/trabajadores/registros/todosByEmpresas', 'APITrabajadores@GetAllEntradasSalidasByEmpresas');

//Recuperar Contraseñas de trabajadores
Route::post('/trabajadores/recuperarPass', 'APITrabajadores@RecuperarPass');

/*
*******Empresas******
*/

//Ingresar Empresas
Route::get('/empresas/ingresar', 'APIEmpresas@Ingresar');

//get empresa by id empresas
Route::get('/empresas/obtener', 'APIEmpresas@GetEmpresa');

//get all empresas
Route::get('/empresas/obtener/all', 'APIEmpresas@GetAllEmpresas');

//Alta de nueva Empresa
Route::post('/empresas/altaEmpresa', 'APIEmpresas@AltaEmpresa');

//Modificar la Nueva Empresa
Route::post('/empresas/modEmpresa', 'APIEmpresas@ModEmpresa');

//Borrar Empresa por id_empresas
Route::post('/empresas/eliminar', 'APIEmpresas@DeleteEmpresa');

//validar que no exista ese subdominio solicitado
Route::get('/empresas/subdominioValidar', 'APIEmpresas@SubdominioValidar');

//alta nueva plantilla
Route::post('/empresas/plantilla/nueva', 'APIEmpresas@AltaPlantilla');

//mod plantilla by id_plantilla
Route::post('/empresas/plantilla/mod', 'APIEmpresas@ModPlantilla');

//get plantillas by id_empresas
Route::get('/empresas/plantilla/obtener', 'APIEmpresas@GetPlantillas');

//get plantillas by id_plantillas (por trabajador)
Route::get('/empresas/plantilla/obtenerByIdPlantillas', 'APIEmpresas@GetByIdPlantillas');

//post plantillas borrar by id_plantillas (por trabajador)
Route::post('/empresas/plantilla/borrar', 'APIEmpresas@PostPlantillaEliminar');

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

//Eliminar Trabajador
Route::post('/empresas/trabajadores/eliminar', 'APIEmpresas@EliminarTrabajadores');

//Actualizar Zonas Horaria de Empresa
Route::post('/empresas/zonasHorarias', 'APIEmpresas@ZonasHorarias');

//Get Zona Horaria de Empresa
Route::get('/empresas/zonasHorarias', 'APIEmpresas@GetZonasHorarias');

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

//Recuperar Contraseñas de empresas
Route::post('/empresas/recuperarPass', 'APIEmpresas@RecuperarPass');

//Get Idioma by id_empresas
Route::get('/empresas/idiomas/obtenerByIdEmpresa', 'APIEmpresas@GetIdiomaObtener');

//Mod Idioma by id_empresas
Route::post('/empresas/idiomas/modIdiomaEmpresa', 'APIEmpresas@ModIdiomaEmpresa');

//Configuraciones Modificar subdominio
Route::post('/empresas/configuraciones/modEmpresaSubdominio', 'APIEmpresas@ModEmpresaSubdominio');

//Configuraciones Modificar dominio
Route::post('/empresas/configuraciones/modEmpresaDominio', 'APIEmpresas@ModEmpresaDominio');

/*
*******Admin******
*/

//Ingresar Administradores
Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');

//Logout
Route::get('/pAdmin/logout', 'APIAdmin@Logout');

//Actualizar contraseña del perfil de administradores
Route::post('/pAdmin/perfil/pass', 'APIAdmin@ChangePerfilPass');

//Edit Profile
Route::post('/pAdmin/profile/edit', 'APIAdmin@PerfilEditar');

//Get All Administradores
Route::get('/pAdmin/administradores/obtenerAll', 'APIAdmin@GetAllAdmin');

//Get Administradores by id administradores
Route::get('/pAdmin/administradores/obtener', 'APIAdmin@GetAdmin');

//Agregar Administradores by id administradores
Route::post('/pAdmin/administradores/nuevo', 'APIAdmin@AltaAdmin');

//Modificar Administradores by id administradores
Route::post('/pAdmin/administradores/modificar', 'APIAdmin@ModAdmin');

//Eliminar Administrador by id administradores
Route::post('/pAdmin/administradores/eliminar', 'APIAdmin@DeleteAdmin');

//Edit activo/inactivo empresa by id_empresa
Route::post('/pAdmin/empresas/modificar/activo', 'APIAdmin@modActiveEmpresas');

//Recuperar Contraseñas de administradores
Route::post('/pAdmin/recuperarPass', 'APIAdmin@RecuperarPass');

//Actualizar Zonas Horaria de Administrador
Route::post('/pAdmin/zonasHorarias', 'APIAdmin@ZonasHorarias');

//Get Zona Horaria de Administrador
Route::get('/pAdmin/zonasHorarias', 'APIAdmin@GetZonasHorarias');

//Get All Idiomas
Route::get('/pAdmin/idiomas/obtenerAll', 'APIAdmin@GetIdiomasAllObtener');

//Get idioma by id
Route::get('/pAdmin/idiomas/obtenerById', 'APIAdmin@GetIdiomaById');

//Agregar Idioma
Route::post('/pAdmin/idiomas/agregar', 'APIAdmin@AgregarIdioma');

//Modificar Idioma
Route::post('pAdmin/idiomas/modificar', 'APIAdmin@ModificarIdioma');

//Eliminar idioma
Route::post('/pAdmin/idiomas/eliminar', 'APIAdmin@EliminarIdioma');