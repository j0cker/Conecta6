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


//Request API
Route::get('/trabajadores/ingresar', 'APITrabajadores@Ingresar');

//Logout
Route::get('/trabajadores/logout', 'APITrabajadores@Logout');
