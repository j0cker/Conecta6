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



        /*Empresas*/

        Cocacola:

        https://boogapp.info/cocacola/pAdmin

        User: info@cocacola.com
        pass: cocacola1

        Danonino

        https://boogapp.info/danone/pAdmin

        User: info@danone.com
        pass: danone1

        API's con Prejijo api/

        //Ingresar Empresas
        Route::get('/empresas/ingresar', 'APIEmpresas@Ingresar');

        //Alta de nueva Empresa
        Route::post('/empresas/altaEmpresa', 'APIEmpresas@AltaEmpresa');

        //validar que no exista ese subdominio solicitado
        Route::get('/empresas/subdominioValidar', 'APIEmpresas@SubdominioValidar');

        /**Panel de Administración (Dueños)**/

        https://boogapp.info/pAdmin

        User: jose@gmail.com
        pass: jose2

        Url's:

        https://boogapp.info/pAdmin
        https://boogapp.info/inicioAdmin
        https://boogapp.info/perfilAdministradores
        https://boogapp.info/empresas
        https://boogapp.info/empresas/nueva (ya funciona, puedes dar de altas nuevas empresas con dubdominio)
        https://boogapp.info/idiomas
        https://boogapp.info/administradores
        https://boogapp.info/administradores/nuevo

        API's con Prejijo api/

        //Request API
        Route::get('/pAdmin/ingresar', 'APIAdmin@Ingresar');
        //Logout
        Route::get('/pAdmin/logout', 'APIAdmin@Logout');

        </pre>

    </body>
</html>