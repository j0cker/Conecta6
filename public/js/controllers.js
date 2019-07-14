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

  app.controller('marketing', function($scope, functions, $window) {

    console.log("[marketing]");

    functions.loading();


  });//fin controller marketing

  app.controller('introduction', function($scope, functions, $window) {

    console.log("[introduction]");

    functions.loading();


  });//fin controller introduction

  app.controller('registros', function($scope, functions, $window) {

    console.log("[registros]");

    functions.loading();


  });//fin controller introduction

  app.controller('perfil', function($scope, functions, $window) {

    console.log("[perfil]");

    functions.loading();


  });//fin controller introduction

  return;

}).call(this);
