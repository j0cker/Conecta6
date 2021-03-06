<html>

    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    </head>

    <body>

        <pre>

        Landing Page

        /*Instrucciones*/

        Por favor verifica siempre accesar con el protocolo de seguridad https://
        La zona horaria soporta también cambio de estaciones del año.
        Las estadísticas tiene un algoritmo especial de cálculo de horas trabajadas y de horas extras (las horas extras pueden ser negativas). Soporta cálculos computarizables de salidas personalizables.
        Una entrada no puede seguir de otra entrada y viceversa (salidas) Ojo. (solo válido durante el mismo día corriendo).
        Las entradads y salidas incluyen restricciones por Geolocalización, IP y por dispositivo.

        Las estadísticas tienen los siguientes cálculos:

        1) total horas trabajadas
        2) total horas extras
        3) numeros de faltas
        4) descanzos totales
        5) salidas
        6) asistencias totales
        7) asistencias fuera de plantilla
        8) asistencias dentro de plantilla
        9) puntualidades
        10) impuntualidades
        11) dias no laborales
        12) total de entradas y salidas
        13) trabajadores activos y no activos
        14) salidas computarizables
        15) total de trabajadores
        
        Para recuperar contraseñas el sistema está capacitado para mandar correos electrónicos.
        Empresas desactivadas/deshabilitadas no podrán accesar
        
        
        /**Landing Page**/

        https://boogapp.info



        /*
        *******Generales******
        */

        
        //Zonas Horarias
        Route::get('/zonasHorarias', 'APIGeneral@ZonasHorarias');

        //Lanzador de Correos Electrónicos
        Route::get('/mailsLauncher', 'MailsLauncher@mailsLauncher');


        /***Trabajadores***/

        Cocacola:

        https://cocacola.boogapp.info ó https://boogapp.info/cocacola

        User: jose@cocacola.com
        pass: jose2

        Danonino

        https://danone.boogapp.info ó https://boogapp.info/danone

        User: no se han creado trabajadores, imposible accesar
        pass: no se han creado trabajadores, imposible accesar

        Url's

        https://boogapp.info/inicio
        https://boogapp.info/perfilTrabajadores
        https://boogapp.info/perfilTrabajadores/pass
        https://boogapp.info/registros
        https://boogapp.info/historial

        
        API's con Prejijo api/
 
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

        //post registro entrada
        Route::post('/trabajadores/registros/entradas', 'APITrabajadores@PostEntradas');

        //post registro salidas
        Route::post('/trabajadores/registros/salidas', 'APITrabajadores@PostSalidas');

        //Get Historial Entradas by id_trabajadores fecha ini y fecha fin
        Route::get('/trabajadores/historial/todas', 'APITrabajadores@GetAllHistorial');

        //Get Historial Entradas by id_empresas fecha ini y fecha fin
        Route::get('/trabajadores/historial/todasByIdEmpresas', 'APITrabajadores@GetAllHistorialByIdEmpresas');

        //Get All Entradas All Salidas by id_trabajadores
        Route::get('/trabajadores/registros/todos', 'APITrabajadores@GetAllEntradasSalidas');

        //Get All Entradas All Salidas by id_empresas
        Route::get('/trabajadores/registros/todosByEmpresas', 'APITrabajadores@GetAllEntradasSalidasByEmpresas');

        //Recuperar Contraseña
        Route::post('/trabajadores/recuperarPass', 'APITrabajadores@RecuperarPass');




        /*******Empresas*******/

        Cocacola:

        https://boogapp.info/cocacola/pAdmin

        User: info@cocacola.com
        pass: cocacola1

        Danonino

        https://boogapp.info/danone/pAdmin

        User: info@danone.com
        pass: danone1

        Url's

        https://boogapp.info/inicioEmpresa
        https://boogapp.info/perfilEmpresas
        https://boogapp.info/perfilEmpresas/pass
        https://boogapp.info/trabajadores
        https://boogapp.info/trabajadores/nuevo
        https://boogapp.info/trabajadores/editar
        https://boogapp.info/informes
        https://boogapp.info/plantilla/nueva
        https://boogapp.info/plantilla/mod?id_plantilla=2
        https://boogapp.info/configuraciones
        https://boogapp.info/salidas/modificar?id=1 (ejemplo de editar salidas)

        API's con Prejijo api/

        //Ingresar Empresas
        Route::get('/empresas/ingresar', 'APIEmpresas@Ingresar');

        //get empresa by id empresas
        Route::get('/empresas/obtener', 'APIEmpresas@GetEmpresa');

        //get all empresas
        Route::get('/empresas/obtener/all', 'APIEmpresas@GetAllEmpresas');

        //Alta de nueva Empresa
        Route::post('/empresas/altaEmpresa', 'APIEmpresas@AltaEmpresa');

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





        /*****Panel de Administración (Dueños)*****/

        https://boogapp.info/pAdmin

        User: jose@gmail.com
        pass: jose2

        Url's:

        https://boogapp.info/pAdmin
        https://boogapp.info/inicioAdmin
        https://boogapp.info/perfilAdministradores
        https://boogapp.info/perfilAdministradores/pass
        https://boogapp.info/empresas
        https://boogapp.info/empresas/nueva (ya funciona, puedes dar de alta nuevas empresas con subdominio)
        https://boogapp.info/idiomas
        https://boogapp.info/administradores
        https://boogapp.info/administradores/nuevo
        https://boogapp.info/administradores/modificar?id=1 (ejemplo de editar administrador)

        API's con Prejijo api/


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

        //Borrar Empresa por id_empresas
        Route::post('/pAdmin/empresas/eliminar', 'APIAdmin@deleteEmpresas');

        //Recuperar Contraseñas de administradores
        Route::post('/pAdmin/recuperarPass', 'APIAdmin@RecuperarPass');

        //Actualizar Zonas Horaria de Administrador
        Route::post('/pAdmin/zonasHorarias', 'APIAdmin@ZonasHorarias');

        //Get Zona Horaria de Administrador
        Route::get('/pAdmin/zonasHorarias', 'APIAdmin@GetZonasHorarias');


        /****IOS en proceso de construcción****/


        /****Android en proceso de construcción****/

        


        </pre>

    </body>
</html>