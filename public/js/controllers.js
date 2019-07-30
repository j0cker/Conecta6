(function() {

  //This is global functions for every controler.
  app.run(function ($rootScope, $window, functions) {
      $rootScope.logout = function () {

        functions.loading();

        functions.postLogout().then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[run][postLogout]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

                  deleteAllCookies();
                  $window.location.href = "/inicio";
                  
                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

            });/*fin postLogout*/
      };
  });

  app.controller('signin', function($scope, functions, $window) {

    functions.loading();

    $("body").css("background-image","url('img/texture.png')");

    
    console.log("[signin]");

    $scope.send = function(){
      console.log("[signin][send]");

      functions.loadingWait();

      var correo = "";
      var contPass = "";

      correo = $("#correo").val();
      contPass = $("#contPass").val();

      console.log("[signin][send] correo: " + correo);
      console.log("[signin][send] contPass: " + contPass);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
      } else if(contPass==""){
        toastr["error"]("Llena correctamente<br /> tu contraseña", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
        
      } else {

        functions.postIngresar(correo, contPass).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[signin][postIngresar]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

                  deleteAllCookies();
                  setCookie("token", response.data.token, 1);

                  $window.location.href = "/inicio";

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

            });/*fin postSubscriber*/
      
      }

    }//fin send ng

  });//fin controller signin

  app.controller('inicio', function($scope, functions, $window) {

    console.log("[inicio]");

    functions.loading();


  });//fin controller inicio

  app.controller('inicioAdmin', function($scope, functions, $window) {

    console.log("[inicioAdmin]");

    functions.loading();


  });//fin controller inicioAdmin

  app.controller('introduction', function($scope, functions, $window) {

    console.log("[introduction]");

    functions.loading();


  });//fin controller introduction

  app.controller('registros', function($scope, functions, $window) {

    console.log("[registros]");

    functions.loading();


  });//fin controller registros

  app.controller('perfil', function($scope, functions, $window) {

    console.log("[perfil]");

    functions.loading();


  });//fin controller perfil

  app.controller('historial', function($scope, functions, $window) {

    console.log("[historial]");

    functions.loading();


  });//fin controller historial

  app.controller('signInAdmin', function($scope, functions, $window) {

    console.log("[signInAdmin]");

    functions.loading();

    $("body").css("background-image","url('img/texture.png')");

    
    console.log("[signInAdmin]");

    $scope.send = function(){
      console.log("[signInAdmin][send]");

      functions.loadingWait();

      var correo = "";
      var contPass = "";

      correo = $("#correo").val();
      contPass = $("#contPass").val();

      console.log("[signInAdmin][send] correo: " + correo);
      console.log("[signInAdmin][send] contPass: " + contPass);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
      } else if(contPass==""){
        toastr["error"]("Llena correctamente<br /> tu contraseña", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
        
      } else {

        functions.postIngresarAdmin(correo, contPass).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[signin][postIngresar]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

                  deleteAllCookies();
                  setCookie("token", response.data.token, 1);

                  $window.location.href = "/inicioAdmin";

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

        });/*fin postSubscriber*/
      
      }
      
    }

  });//fin controller signInAdmin

  app.controller('empresas', function($scope, functions, $window) {

    console.log("[empresas]");

    functions.loading();


  });//fin controller empresas

  app.controller('nuevoempresa', function($scope, functions, $window) {

    console.log("[nuevoempresa]");

    functions.loading();

    var theme = $("#mytheme").attr("href").split("cust-theme-");
    theme = theme[1].split(".css");

    var color = theme[0];


    $scope.color = (colorClicked) => {
      console.log("[nuevoempresa][altaEmpresa] " + colorClicked);

      color = colorClicked;

    }

    $scope.altaEmpresa = function(){
      console.log("[nuevoempresa][altaEmpresa]");

      functions.loadingWait();

      var nombreEmpresa = "";
      var nombreSolicitante = "";
      var correoElectronico = "";
      var telefonoFijo = "";
      var celular = "";
      var datepicker = ""; //vigencia
      var empleadosPermitidos = "";
      var activa = ""; //gra-0 cuenta activa/desactiva
      var subdominio = "";
      var contrasena = "";
      var valContrasena = "";
      color = color;

      nombreEmpresa = $("#nombreEmpresa").val();
      nombreSolicitante = $("#nombreSolicitante").val();
      correoElectronico = $("#correoElectronico").val();
      telefonoFijo = $("#telefonoFijo").val();
      celular = $("#celular").val();
      datepicker = $("#datepicker").val();
      empleadosPermitidos = $("#empleadosPermitidos").val();
      activa = $("#gra-0").val();
      subdominio = $("#subdominio").val();
      contrasena = $("#contrasena").val();
      valContrasena = $("#valContrasena").val();
      color = color;

      console.log("[nuevoempresa][altaEmpresa] nombreEmpresa: " + nombreEmpresa);
      console.log("[nuevoempresa][altaEmpresa] nombreSolicitante: " + nombreSolicitante);
      console.log("[nuevoempresa][altaEmpresa] correoElectronico: " + correoElectronico);
      console.log("[nuevoempresa][altaEmpresa] telefonoFijo: " + telefonoFijo);
      console.log("[nuevoempresa][altaEmpresa] celular: " + celular);
      console.log("[nuevoempresa][altaEmpresa] datepicker: " + datepicker);
      console.log("[nuevoempresa][altaEmpresa] empleadosPermitidos: " + empleadosPermitidos);
      console.log("[nuevoempresa][altaEmpresa] activa: " + activa);
      console.log("[nuevoempresa][altaEmpresa] subdominio: " + subdominio);
      console.log("[nuevoempresa][altaEmpresa] contrasena: " + contrasena);
      console.log("[nuevoempresa][altaEmpresa] valContrasena: " + valContrasena);
      console.log("[nuevoempresa][altaEmpresa] color: " + color);

      if(nombreEmpresa==""){
        toastr["error"]("Llena correctamente<br /> el nombre de la Empresa", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(nombreSolicitante==""){
        toastr["error"]("Llena correctamente<br /> el nombre del Solicitante", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(correoElectronico.indexOf("@")=="-1" || correoElectronico.indexOf(".")=="-1" || correoElectronico.indexOf(" ")!="-1" || correoElectronico.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
        $("#agregar").effect( "shake" );
      } else if(telefonoFijo=="" || celular=="" || datepicker=="" || empleadosPermitidos=="" || activa=="" || subdominio=="" || contrasena=="" || valContrasena=="" || color==""){
        toastr["error"]("Llena correctamente<br /> todos los campos", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(contPass==""){
        toastr["error"]("Contraseñas no<br /> coinciden", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
        
      } else {

        functions.postAltaEmpresa(correo, contPass).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[nuevoempresa][postIngresar]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

        });/*fin postSubscriber*/
      
      }
      
    }


  });//fin controller nuevoempresa

  app.controller('idiomas', function($scope, functions, $window) {

    console.log("[idiomas]");

    functions.loading();


  });//fin controller idiomas

  app.controller('administradores', function($scope, functions, $window) {

    console.log("[administradores]");

    functions.loading();


  });//fin controller administradores

  app.controller('nuevoadministrador', function($scope, functions, $window) {

    console.log("[nuevoadministrador]");

    functions.loading();


  });//fin controller administradores

  return;

}).call(this);
