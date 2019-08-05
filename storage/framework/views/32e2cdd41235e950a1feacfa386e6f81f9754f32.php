<html>

    <head>
    </head>

    <body>

        <pre>

        Landing Page

        /*Instrucciones*/

        Por favor verifica siempre accesar con el protocolo de seguridad https://

        /**Landing Page**/

        https://boogapp.info

        /***Trabajadores***/

        user: jose@gmail.com
        pass: jose

        Url's

        https://boogapp.info/inicio
        https://boogapp.info/perfil
        https://boogapp.info/registros
        https://boogapp.info/historial

        API's con Prejijo api/

        //Request API
        Route::get('/trabajadores/ingresar', 'APITrabajadores@Ingresar');
        //Logout
        Route::get('/trabajadores/logout', 'APITrabajadores@Logout');

        /**Panel de Administración (Dueños)**/

        User: jose@gmail.com
        pass: jose2

        Url's:

        https://boogapp.info/pAdmin
        https://boogapp.info/inicioAdmin
        https://boogapp.info/perfil
        https://boogapp.info/empresas
        https://boogapp.info/empresas/nueva
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