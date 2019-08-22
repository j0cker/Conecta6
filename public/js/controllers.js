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
            $window.location.href = "/" + response.data.subdominio;
            
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

    $("body").css("background-image","url('../img/texture.png')");

    
    console.log("[signin]");

    

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signin] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[signin][getImageEmpresa]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick

    $scope.send = function(){
      console.log("[signin][send]");

      functions.loadingWait();

      var correo = "";
      var contPass = "";
      var color = "";
      var colorHex = "";
      var subdominio = "";

      correo = $("#correo").val();
      contPass = $("#contPass").val();
      color = $("#color").val();
      colorHex = $("#colorHex").val();
      subdominio = $("#subdominio").val();

      console.log("[signin][send] correo: " + correo);
      console.log("[signin][send] contPass: " + contPass);
      console.log("[signin][send] color: " + color);
      console.log("[signin][send] colorHex: " + colorHex);
      console.log("[signin][send] subdominio: " + subdominio);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
      } else if(contPass==""){
        toastr["error"]("Llena correctamente<br /> tu contraseña", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
        
      } else {

        functions.postIngresar(correo, contPass, color, colorHex, subdominio).then(function (response) {

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

  app.controller('perfilTrabajadores', function($scope, functions, $window) {

    console.log("[perfilTrabajadores]");

    functions.loading();

    

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signin] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[signin][getImageEmpresa]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick


  });//fin controller perfilTrabajadores

  app.controller('perfilAdministradores', function($scope, functions, $window) {

    console.log("[perfilAdministradores]");

    functions.loading();


  });//fin controller perfilAdministradores

  app.controller('historial', function($scope, functions, $window) {

    console.log("[historial]");

    functions.loading();


  });//fin controller historial

  
  app.controller('signinEmpresas', function($scope, functions, $window) {

    functions.loading();

    $("body").css("background-image","url('../img/texture.png')");

    
    console.log("[signinEmpresas]");

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][perfilEmpresas]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick

    $scope.send = function(){
      console.log("[signinEmpresas][send]");

      functions.loadingWait();

      var correo = "";
      var contPass = "";
      var color = "";
      var colorHex = "";
      var subdominio = "";

      correo = $("#correo").val();
      contPass = $("#contPass").val();
      color = $("#color").val();
      colorHex = $("#colorHex").val();
      subdominio = $("#subdominio").val();

      console.log("[signinEmpresas][send] correo: " + correo);
      console.log("[signinEmpresas][send] contPass: " + contPass);
      console.log("[signinEmpresas][send] color: " + color);
      console.log("[signinEmpresas][send] colorHex: " + colorHex);
      console.log("[signinEmpresas][send] subdominio: " + subdominio);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
      } else if(contPass==""){
        toastr["error"]("Llena correctamente<br /> tu contraseña", "");
        functions.loadingEndWait();
        $("#ingresarButton").effect( "shake" );
        
      } else {

        functions.postIngresarEmpresas(correo, contPass, color, colorHex, subdominio).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[signinEmpresas][postIngresar]");

              toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

              deleteAllCookies();
              setCookie("token", response.data.token, 1);

              $window.location.href = "/inicioEmpresa";

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

        });/*fin postIngresarAdmin*/
      
      }
      
    }

  });//fin controller signInAdmin

  app.controller('inicioEmpresa', function($scope, functions, $window) {

    console.log("[inicioEmpresa]");

    functions.loading();

    

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][perfilEmpresas]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick


  });//fin controller inicioEmpresa

  app.controller('empresas', function($scope, functions, $window) {

    console.log("[empresas]");

    functions.loading();

  });//fin controller empresas

  app.controller('perfilEmpresas', function($scope, functions, $window) {

    console.log("[perfilEmpresas]");

    functions.loading();

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[perfilEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][perfilEmpresas]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    };

  });//fin controller perfilEmpresas

  app.controller('nuevaplantilla', function($scope, functions, $window) {

    functions.loading();
    
    console.log("[nuevaplantilla]");

    $scope.send = function(){
      console.log("[nuevaplantilla][send]");

      functions.loadingWait();

      var nombrePlantilla = "";

      var lunesActivated = "";
      var de1Lunes = "";
      var a1Lunes = "";
      var de2Lunes = "";
      var a2Lunes = "";

      var martesActivated = "";
      var de1Martes = "";
      var a1Martes = "";
      var de2Martes = "";
      var a2Martes = "";

      var miercolesActivated = "";
      var de1Miercoles = "";
      var a1Miercoles = "";
      var de2Miercoles = "";
      var a2Miercoles = "";

      var juevesActivated = "";
      var de1Jueves = "";
      var a1Jueves = "";
      var de2Jueves = "";
      var a2Jueves = "";

      var viernesActivated = "";
      var de1Viernes = "";
      var a1Viernes = "";
      var de2Viernes = "";
      var a2Viernes = "";

      var sabadoActivated = "";
      var de1Sabado = "";
      var a1Sabado = "";
      var de2Sabado = "";
      var a2Sabado = "";

      var domingoActivated = "";
      var de1Domingo = "";
      var a1Domingo = "";
      var de2Domingo = "";
      var a2Domingo = "";

      nombrePlantilla = $("#nombrePlantilla").val();

      lunesActivated = $("#lunesActivated").prop("checked");
      de1Lunes = $("#de1Lunes").val();
      a1Lunes = $("#a1Lunes").val();
      de2Lunes = $("#de2Lunes").val();
      a2Lunes = $("#a2Lunes").val();

      martesActivated = $("#martesActivated").prop("checked");
      de1Martes = $("#de1Martes").val();
      a1Martes = $("#a1Martes").val();
      de2Martes = $("#de2Martes").val();
      a2Martes = $("#a2Martes").val();

      miercolesActivated = $("#miercolesActivated").prop("checked");
      de1Miercoles = $("#de1Miercoles").val();
      a1Miercoles = $("#a1Miercoles").val();
      de2Miercoles = $("#de2Miercoles").val();
      a2Miercoles = $("#a2Miercoles").val();

      juevesActivated = $("#juevesActivated").prop("checked");
      de1Jueves = $("#de1Jueves").val();
      a1Jueves = $("#a1Jueves").val();
      de2Jueves = $("#de2Jueves").val();
      a2Jueves = $("#a2Jueves").val();

      viernesActivated = $("#viernesActivated").prop("checked");
      de1Viernes = $("#de1Viernes").val();
      a1Viernes = $("#a1Viernes").val();
      de2Viernes = $("#de2Viernes").val();
      a2Viernes = $("#a2Viernes").val();

      sabadoActivated = $("#sabadoActivated").prop("checked");
      de1Sabado = $("#de1Sabado").val();
      a1Sabado = $("#a1Sabado").val();
      de2Sabado = $("#de2Sabado").val();
      a2Sabado = $("#a2Sabado").val();

      domingoActivated = $("#domingoActivated").prop("checked");
      de1Domingo = $("#de1Domingo").val();
      a1Domingo = $("#a1Domingo").val();
      de2Domingo = $("#de2Domingo").val();
      a2Domingo = $("#a2Domingo").val();

      console.log("[nuevaplantilla][send] nombrePlantilla: " + nombrePlantilla);
      
      console.log("[nuevaplantilla][send] lunesActivated: " + lunesActivated);
      console.log("[nuevaplantilla][send] de1Lunes: " + de1Lunes);
      console.log("[nuevaplantilla][send] a1Lunes: " + a1Lunes);
      console.log("[nuevaplantilla][send] de2Lunes: " + de2Lunes);
      console.log("[nuevaplantilla][send] a2Lunes: " + a2Lunes);
      
      console.log("[nuevaplantilla][send] martesActivated: " + martesActivated);
      console.log("[nuevaplantilla][send] de1Martes: " + de1Martes);
      console.log("[nuevaplantilla][send] a1Martes: " + a1Martes);
      console.log("[nuevaplantilla][send] de2Martes: " + de2Martes);
      console.log("[nuevaplantilla][send] a2Martes: " + a2Martes);
      
      console.log("[nuevaplantilla][send] miercolesActivated: " + miercolesActivated);
      console.log("[nuevaplantilla][send] de1Miercoles: " + de1Miercoles);
      console.log("[nuevaplantilla][send] a1Miercoles: " + a1Miercoles);
      console.log("[nuevaplantilla][send] de2Miercoles: " + de2Miercoles);
      console.log("[nuevaplantilla][send] a2Miercoles: " + a2Miercoles);
      
      console.log("[nuevaplantilla][send] juevesActivated: " + juevesActivated);
      console.log("[nuevaplantilla][send] de1Jueves: " + de1Jueves);
      console.log("[nuevaplantilla][send] a1Jueves: " + a1Jueves);
      console.log("[nuevaplantilla][send] de2Jueves: " + de2Jueves);
      console.log("[nuevaplantilla][send] a2Jueves: " + a2Jueves);
      
      console.log("[nuevaplantilla][send] viernesActivated: " + viernesActivated);
      console.log("[nuevaplantilla][send] de1Viernes: " + de1Viernes);
      console.log("[nuevaplantilla][send] a1Viernes: " + a1Viernes);
      console.log("[nuevaplantilla][send] de2Viernes: " + de2Viernes);
      console.log("[nuevaplantilla][send] a2Viernes: " + a2Viernes);
      
      console.log("[nuevaplantilla][send] sabadoActivated: " + sabadoActivated);
      console.log("[nuevaplantilla][send] de1Sabado: " + de1Sabado);
      console.log("[nuevaplantilla][send] a1Sabado: " + a1Sabado);
      console.log("[nuevaplantilla][send] de2Sabado: " + de2Sabado);
      console.log("[nuevaplantilla][send] a2Sabado: " + a2Sabado);
      
      console.log("[nuevaplantilla][send] domingoActivated: " + domingoActivated);
      console.log("[nuevaplantilla][send] de1Domingo: " + de1Domingo);
      console.log("[nuevaplantilla][send] a1Domingo: " + a1Domingo);
      console.log("[nuevaplantilla][send] de2Domingo: " + de2Domingo);
      console.log("[nuevaplantilla][send] a2Domingo: " + a2Domingo);

      
      if($('#nombrePlantilla').val()==""){

          toastr["error"]("Llena correctamente el<br />nombre de la plantilla", "");
          functions.loadingEndWait();

      } else if (!$('#lunesActivated').prop("checked") &&
      !$('#martesActivated').prop("checked") &&
      !$('#miercolesActivated').prop("checked") &&
      !$('#juevesActivated').prop("checked") &&
      !$('#viernesActivated').prop("checked") &&
      !$('#sabadoActivated').prop("checked") &&
      !$('#domingoActivated').prop("checked")){

          console.log("No activado nada");

          toastr["error"]("Debes seleccionar por<br />lo menos un día.", "");
          functions.loadingEndWait();

      } else if($('#lunesActivated').prop("checked") && 
          ($('#de1Lunes').val()=="" ||
          $('#a1Lunes').val()=="" ||
          $('#de2Lunes').val()=="" ||
          $('#a2Lunes').val()=="")){

          toastr["error"]("Llena correctamente los<br />horarios del día lunes.", "");
          functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
      ($('#de1Martes').val()=="" ||
      $('#a1Martes').val()=="" ||
      $('#de2Martes').val()=="" ||
      $('#a2Martes').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día martes.", "");
        functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
      ($('#de1Miercoles').val()=="" ||
      $('#a1Miercoles').val()=="" ||
      $('#de2Miercoles').val()=="" ||
      $('#a2Miercoles').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día miercoles.", "");
        functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
      ($('#de1Jueves').val()=="" ||
      $('#a1Jueves').val()=="" ||
      $('#de2Jueves').val()=="" ||
      $('#a2Jueves').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día jueves.", "");
        functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
      ($('#de1Viernes').val()=="" ||
      $('#a1Viernes').val()=="" ||
      $('#de2Viernes').val()=="" ||
      $('#a2Viernes').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día viernes.", "");
        functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
      ($('#de1Sabado').val()=="" ||
      $('#a1Sabado').val()=="" ||
      $('#de2Sabado').val()=="" ||
      $('#a2Sabado').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día sábado.", "");
        functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
      ($('#de1Domingo').val()=="" ||
      $('#a1Domingo').val()=="" ||
      $('#de2Domingo').val()=="" ||
      $('#a2Domingo').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día domingo.", "");
        functions.loadingEndWait();

      } else {
          
          console.log("[agregar]");
      

        functions.postPlantilla(nombrePlantilla, 
        lunesActivated, de1Lunes, a1Lunes, de2Lunes, a2Lunes,
        martesActivated, de1Martes, a1Martes, de2Martes, a2Martes,
        miercolesActivated, de1Miercoles, a1Miercoles, de2Miercoles, a2Miercoles,
        juevesActivated, de1Jueves, a1Jueves, de2Jueves, a2Jueves,
        viernesActivated, de1Viernes, a1Viernes, de2Viernes, a2Viernes,
        sabadoActivated, de1Sabado, a1Sabado, de2Sabado, a2Sabado,
        domingoActivated, de1Domingo, a1Domingo, de2Domingo, a2Domingo
        ).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][postIngresar]");

              toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

              $window.location.href = "/plantilla/nueva";


            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postSubscriber*/
      
      }//fin else

    }//fin send ng


  });//fin controller nuevaplantilla

  app.controller('configuraciones', function($scope, functions, $window) {

    console.log("[configuraciones]");

    functions.loading();

    $scope.zonasHorarias = "";

    $scope.getZonasHorariasClick = function(){

      console.log("[configuraciones] ");

      functions.getAllZonasHorarias().then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][getZonasHorariasClick]");

              console.log(response.data.data);

              $scope.zonasHorarias = response.data.data;

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getZonasHorariasClick

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[configuraciones] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][getImageEmpresa]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick


  });//fin controller trabajadores

  app.controller('trabajadores', function($scope, functions, $window, $filter) {

    console.log("[trabajadores]");

    functions.loading();

    $scope.delTrabajadoresByIdEmpresaClick = function(id_trabajadores, id_empresas){

      functions.delTrabajadoresByIdEmpresa(id_trabajadores, id_empresas).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[delTrabajadoresByIdEmpresaClick][delTrabajadoresByIdEmpresa]");

            console.log(response.data.data);

            var data = Array();

            var choices = Array();
            choices = ["id_trabajadores", "nombre", "apellido", "correo", "telefono_fijo"];
            
            data = addKeyToArray(data, response.data.data, choices);

            console.log(data);

            $('#dt-basic-example').dataTable().fnClearTable();
            $('#dt-basic-example').dataTable().fnAddData(data);

            toastr["success"]("Información enviada Exitosamente", "");

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin delTrabajadoresByIdEmpresa*/

    }; //fin delTrabajadoresByIdEmpresaClick

    $scope.getTrabajadoresByIdEmpresaClick = function(id_empresas){

      functions.getTrabajadoresByIdEmpresa(id_empresas).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[agregarNuevoTrabajadorClick][perfilEmpresas]");

            console.log(response.data.data);

            var data = Array();

            var choices = Array();
            choices = ["id_trabajadores", "nombre", "apellido", "correo", "telefono_fijo"];
            
            data = addKeyToArray(data, response.data.data, choices);

            console.log(data);

            $('#dt-basic-example').dataTable().fnClearTable();
            $('#dt-basic-example').dataTable().fnAddData(data);
            

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getTrabajadoresByIdEmpresa*/

    }; //fin getTrabajadoresByIdEmpresa

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][perfilEmpresas]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick


  });//fin controller trabajadores

  app.controller('nuevotrabajador', function($scope, functions, $window) {

    console.log("[nuevotrabajador]");

    functions.loading();

    $scope.plantillas = "";
    $scope.cars = ["Saab", "Volvo", "BMW"];
    $scope.latitud = "";
    $scope.longitud = "";


    $scope.agregarNuevoTrabajadorClick = function(id_empresas_parameter){

      console.log("[agregarNuevoTrabajadorClick] ");

      var id_empresas = "";
      var nombre = "";
      var apellido = "";
      var correo = "";
      var tel = "";
      var cel = "";
      var cargo = "";
      var numDNI = "";
      var numSS = "";
      var selectPlantillaX = "";
      var selectPlantillaY = "";
      var plantilla = "";
      var geoActivated = "";
      var address = "";
      var latitud = "";
      var longitud = "";
      var metros = "";
      var registroApp = "";
      var ipActivated = "";
      var ipAddress = "";
      var pcActivated = "";
      var tabletasActivated = "";
      var movilesActivated = "";
      var pass = "";
      var confPass = "";

      id_empresas = id_empresas_parameter;
      nombre = $("#nombre").val();
      apellido = $("#apellido").val();
      correo = $("#correo").val();
      tel = $("#tel").val();
      cel = $("#cel").val();
      cargo = $("#cargo").val();
      numDNI = $("#numDNI").val();
      numSS = $("#numSS").val();

      selectPlantillaX = document.getElementById("select-plantilla").selectedIndex;
      selectPlantillaY = document.getElementById("select-plantilla").options;
      plantilla = selectPlantillaY[selectPlantillaX].value ;

      geoActivated = $("#geoActivated").prop("checked");
      address = $("#pac-input2").val();
      latitud = $scope.latitud;
      longitud = $scope.longitud;
      metros = $("#metros").val();
      registroApp = $("#registroApp").prop("checked");
      ipActivated = $("#ipActivated").prop("checked");
      ipAddress = $("#ipAddress").val();
      pcActivated = $("#pcActivated").prop("checked");
      tabletasActivated = $("#tabletasActivated").prop("checked");
      movilesActivated = $("#movilesActivated").prop("checked");
      pass = $("#pass").val();
      confPass = $("#confPass").val();


      console.log("[agregarNuevoTrabajadorClick] id_empresas: " + id_empresas);
      console.log("[agregarNuevoTrabajadorClick] nombre: " + nombre);
      console.log("[agregarNuevoTrabajadorClick] apellido: " + apellido);
      console.log("[agregarNuevoTrabajadorClick] correo: " + correo);
      console.log("[agregarNuevoTrabajadorClick] tel: " + tel);
      console.log("[agregarNuevoTrabajadorClick] cel: " + cel);
      console.log("[agregarNuevoTrabajadorClick] cargo: " + cargo);
      console.log("[agregarNuevoTrabajadorClick] numDNI: " + numDNI);
      console.log("[agregarNuevoTrabajadorClick] numSS: " + numSS);
      console.log("[agregarNuevoTrabajadorClick] selectPlantillaX: " + selectPlantillaX);
      console.log("[agregarNuevoTrabajadorClick] selectPlantillaY: " + selectPlantillaY);
      console.log("[agregarNuevoTrabajadorClick] selectPlantilla: " + "Index: " + selectPlantillaY[selectPlantillaX].index + " is " + selectPlantillaY[selectPlantillaX].text + " value " + selectPlantillaY[selectPlantillaX].value);
      console.log("[agregarNuevoTrabajadorClick] plantilla: " + plantilla);
      console.log("[agregarNuevoTrabajadorClick] geoActivated: " + geoActivated);
      console.log("[agregarNuevoTrabajadorClick] address: " + address);
      console.log("[agregarNuevoTrabajadorClick] latitud: " + latitud);
      console.log("[agregarNuevoTrabajadorClick] longitud: " + longitud);
      console.log("[agregarNuevoTrabajadorClick] metros: " + metros);
      console.log("[agregarNuevoTrabajadorClick] registroApp: " + registroApp);
      console.log("[agregarNuevoTrabajadorClick] ipActivated: " + ipActivated);
      console.log("[agregarNuevoTrabajadorClick] ipAddress: " + ipAddress);
      console.log("[agregarNuevoTrabajadorClick] pcActivated: " + pcActivated);
      console.log("[agregarNuevoTrabajadorClick] tabletasActivated: " + tabletasActivated);
      console.log("[agregarNuevoTrabajadorClick] movilesActivated: " + movilesActivated);
      console.log("[agregarNuevoTrabajadorClick] pass: " + pass);
      console.log("[agregarNuevoTrabajadorClick] confPass: " + confPass);

      if(nombre==""){
        toastr["error"]("Agregar nombre del trabajador", "");
      } else if(apellido==""){
        toastr["error"]("Agregar apellido del trabajador", "");
      } else if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        toastr["error"]("Agregar correo del trabajador", "");
      } else if(tel==""){
        toastr["error"]("Agregar teléfono fijo del trabajador", "");
      } else if(cel==""){
        toastr["error"]("Agregar celular del trabajador", "");
      } else if(cargo==""){
        toastr["error"]("Agregar cargo del trabajador", "");
      } else if(numDNI==""){
        toastr["error"]("Agregar Número DNI del trabajador", "");
      } else if(numSS==""){
        toastr["error"]("Agregar Número de Seguro Social del trabajador", "");
      } else if(selectPlantillaY[selectPlantillaX].text=="Selecciona una Plantilla"){
        toastr["error"]("Seleccione una Plantilla al trabajador", "");
      } else if(pass==""){
        toastr["error"]("Agregue una Contraseña al trabajador", "");
      } else if(confPass==""){
        toastr["error"]("Agregue la confirmación de la<br /> Contraseña del trabajador", "");
      } else if(pass!=confPass){
        toastr["error"]("Las contraseñas No Coinciden", "");
      } else if(geoActivated==1 && address==""){
        toastr["error"]("Agregar la dirección de Geolocalización", "");

      } else if(ipActivated==1 && ipAddress==""){
        toastr["error"]("Agregar la dirección IP correctamente", "");

      } else {

        functions.postNuevoTrabajador(id_empresas, nombre, apellido, correo, tel, cel, cargo, numDNI, numSS, 
          plantilla, geoActivated, address, latitud, longitud, metros, registroApp, 
          ipActivated, ipAddress, pcActivated, tabletasActivated, 
          movilesActivated, pass).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[agregarNuevoTrabajadorClick][perfilEmpresas]");

              console.log(response.data.data);
              toastr["success"]("Información enviada Exitosamente", "");


            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postNuevoTrabajador*/
      }

    }; //agregarNuevoTrabajadorClick
    

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][perfilEmpresas]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick

    functions.getPlantillas().then(function (response) {

      if(response.data.success == "TRUE"){
        
        console.log("[controllers][nuevotrabajador][getPlantillas]");

        console.log(response.data);

        $scope.plantillas = response.data.data;

        console.log($scope.plantillas);

        functions.loadingEndWait();
        
      } else {

          functions.loadingEndWait();
      }
    }, function (response) {
      /*ERROR*/
      toastr["error"]("Inténtelo de nuevo más tarde", "");
      functions.loadingEndWait();

    });/*fin getPlantillas*/
    


  });//fin controller trabajadores

  app.controller('nuevoempresa', function($scope, functions, $window) {

    console.log("[nuevoempresa]");

    functions.loading();

    var theme = $("#mytheme").attr("href").split("cust-theme-");
    theme = theme[1].split(".css");

    var color = theme[0];

    var validarSubdominioBD = 0;


    $scope.color = (colorClicked) => {
      console.log("[nuevoempresa][altaEmpresa] " + colorClicked);

      color = colorClicked;

    }

    $scope.validarSubdominio = function(subdominio){

      console.log("[controllers][nuevoempresa][validarSubdominio]");
      
      console.log("[controllers][nuevoempresa][validarSubdominio] subdominio: " + subdominio);
      
      functions.validarSubdominio(subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][nuevoempresa][validarSubdominio]");

          $(".fal.fa-check-circle").css("display","");

          $(".fal.fa-times-circle").css("display","none");

          functions.loadingEndWait();

          validarSubdominioBD = 1;
          
        } else {

          $(".fal.fa-check-circle").css("display","none");

          $(".fal.fa-times-circle").css("display","");

            functions.loadingEndWait();

            validarSubdominioBD = -1;
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin validarSubdominio*/
      
    };
    
    validarSubdominio = $scope.validarSubdominio;

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
      activa = $("#gra-0").prop('checked');
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
      } else if(valContrasena!=contrasena){
        toastr["error"]("Contraseñas no<br /> coinciden", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
        
      } else if (validarSubdominioBD!=1) {
        toastr["error"]("Subdominio no<br /> Disponible", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );

      } else {

        functions.altaEmpresa(nombreEmpresa, nombreSolicitante, correoElectronico, telefonoFijo, celular, datepicker, empleadosPermitidos, activa, subdominio, contrasena, color).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[nuevoempresa][altaEmpresa]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");
                  functions.loadingEndWait();

                  alert("Tu subdominio estará listo hasta un máximo de 48 horas debido, a la propagación de DNS, mientras puedes entrar a tu nueva empresa agregando /"+subdominio);

                  $window.location.href = "/empresas";

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

  app.controller('consultaDeInformes', function($scope, functions, $window) {

    console.log("[consultaDeInformes]");

    functions.loading();

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][perfilEmpresas]");

              console.log(response.data.data);

              $(".profile-image").attr("src","data:image/png;base64," + response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getImageEmpresa*/

    }; //fin getImageEmpresaClick


  });//fin controller consultaDeInformes

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
