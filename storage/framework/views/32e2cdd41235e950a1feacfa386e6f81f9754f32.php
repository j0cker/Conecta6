<html>

    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    </head>

    <body>

        <pre>

        Landing Page

        /*Instrucciones*/

        Por favor verifica siempre accesar con el protocolo de seguridad https://

        
        
        
        
        
        /**Landing Page**/

        https://boogapp.info



        /*
        *******Generales******
        */

        //Zonas Horarias
        Route::get('/zonasHorarias', 'APIGeneral@ZonasHorarias');





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
        https://boogapp.info/registros
        https://boogapp.info/historial

        API's con Prejijo api/

        //Request API
        Route::get('/trabajadores/ingresar', 'APITrabajadores@Ingresar');
        //Logout
        Route::get('/trabajadores/logout', 'APITrabajadores@Logout');






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
        https://boogapp.info/trabajadores
        https://boogapp.info/trabajadores/nuevo
        https://boogapp.info/informes
        https://boogapp.info/plantilla/nueva
        https://boogapp.info/configuraciones

        API's con Prejijo api/
        
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








        /*****Panel de Administración (Dueños)*****/

        https://boogapp.info/pAdmin

        User: jose@gmail.com
        pass: jose2

        Url's:

        https://boogapp.info/pAdmin
        https://boogapp.info/inicioAdmin
        https://boogapp.info/perfilAdministradores
        https://boogapp.info/empresas
        https://boogapp.info/empresas/nueva (ya funciona, puedes dar de alta nuevas empresas con subdominio)
        https://boogapp.info/idiomas
        https://boogapp.info/administradores
        https://boogapp.info/administradores/nuevo

        API's con Prejijo api/

        //Request API
        Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');
        //Logout
        Route::get('/pAdmin/logout', 'APIAdmin@Logout');





        /****IOS en proceso de construcción****/

        


        </pre>

    </body>
</html>