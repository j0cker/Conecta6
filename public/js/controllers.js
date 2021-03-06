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
    
    $scope.getAllEntradasSalidasClick = function(id_trabajadores){

      console.log("[inicio] ");

      functions.getAllEntradasSalidas(id_trabajadores).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[inicio]");

              console.log(response.data.data);

              console.log("Entradas: " + response.data.entradas);
              console.log("Salidas: " + response.data.salidas);

              $scope.entradas = response.data.entradas;
              $scope.salidas = response.data.salidas;
              $scope.entradasPorcentaje = Math.round((parseInt(response.data.entradas)*100)/(parseInt(response.data.entradas) + parseInt(response.data.salidas)));
              $scope.salidasPorcentaje = Math.round((parseInt(response.data.salidas)*100)/(parseInt(response.data.entradas) + parseInt(response.data.salidas)));
              $scope.totalEntradasSalidas = Math.round(parseInt(response.data.entradas) + parseInt(response.data.salidas));

            
              $('#entradasPie.js-easy-pie-chart').data('easyPieChart').update($scope.entradasPorcentaje);

              $('#salidasPie.js-easy-pie-chart').data('easyPieChart').update($scope.salidasPorcentaje);


            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getAllEntradasSalidas*/

    }; //fin getAllEntradasSalidasClick

    getAllEntradasSalidasClick = $scope.getAllEntradasSalidasClick;

    $scope.getZonaHorariaFrontClick = function(id_empresas, id_trabajadores, id_plantillas){

      console.log("[inicio] ");

      console.log("id_plantillas: " + id_plantillas);

      functions.getZonaHoraria(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[inicio][getZonaHoraria]");

              console.log(response.data.data);

              var fecha = new Date( moment().tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
              
              var hora = fecha.getHours(),
                          minutos = fecha.getMinutes(),
                          segundos = fecha.getSeconds(),
                          diaSemana = fecha.getDay(),
                          dia = fecha.getDate(),
                          mes = fecha.getMonth(),
                          anio = fecha.getFullYear(),
                          ampm;
              
              console.log(fecha);

              var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
          
              $("#mesActual").html(`"` + meses[mes] + `"`);

              console.log(mes);
              
              //por si en las estadísticas hay que jalar días antes, de todas formas se filtran bien dentro de cada función lo necesario
              var start = moment().year(anio).month(mes).date(1).subtract(1, 'month').startOf("day").format('YYYY-MM-DD HH:mm:ss');
              
              var end = moment().year(anio).month(mes).date(31).startOf("day").format('YYYY-MM-DD HH:mm:ss');

              functions.getHistorialEntradas(id_trabajadores, start, end).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[inicio][getHistorialEntradas]");

                  //no es requerido llenar el tipo con el tipo de salida ya que en nombre ya lo puedes
                  //response.data.data = functions.completarTiposDeSalidasArray(response.data.data);

                  registros = response.data.data;

                  functions.getIdPlantillas(id_plantillas).then(function (response) {

                    if(response.data.success == "TRUE"){
                      
                      console.log("[controllers][modTrabajadorClick][getPlantillas]");

                      plantilla = response.data.data[0];

                      console.log(plantilla);

                      console.log(registros);

                      registros = orderFechaAsc(registros);

                      var statDiarioHrsTrabajadas = functions.statDiarioHrsTrabajadas(fecha, registros);

                      var statSemanalHrsTrabajadas = functions.statSemanalHrsTrabajadas(fecha, registros);

                      var statMesHrsTrabajadas = functions.statMesHrsTrabajadas(fecha, registros);

                      var statHrsPlantilla = functions.statHorasPlantilla(plantilla);

                      var statDiarioHorsExtra = functions.statDiarioHorsExtra(statHrsPlantilla, statDiarioHrsTrabajadas, fecha);
                      
                      var statSemanaHorsExtra = functions.statSemanaHorsExtra(statHrsPlantilla, statSemanalHrsTrabajadas, fecha);
                      
                      var statMesHorsExtra = functions.statMesHorsExtra(statHrsPlantilla, statMesHrsTrabajadas, fecha);

                      var statMesEntradasYSalidas = functions.statMesEntradasYSalidas(statMesHrsTrabajadas, fecha);

                      var statEntradasYSalidasEfectivas = functions.statMesEntradasYSalidasEfectivas(statMesEntradasYSalidas);

                      functions.statGraphic(statMesEntradasYSalidas);

                      var myvalues = statMesEntradasYSalidas;
                      $('.entradas').sparkline(myvalues, { enableTagOptions: true , colorMap: ["#886ab5"],barSpacing: 1,chartRangeMin:0,barWidth: 5});

                      var myvalues = statMesEntradasYSalidas;
                      $('.salidas').sparkline(myvalues, { enableTagOptions: true , colorMap: ["#fe6bb0"],barSpacing: 1,chartRangeMin:0,barWidth: 5});
                      
                      $('.totalEntradaYSalidas').sparkline(myvalues, { enableTagOptions: true , colorMap: ["#fe6bb0"],barSpacing: 1,chartRangeMin:0,barWidth: 5});
              
                      $scope.entradasYSalidasEfectivas = statEntradasYSalidasEfectivas;

                      var tabla = Array();
                      tabla[0] = Array();
                      tabla[0][0] = "Diario (Hoy)";
                      tabla[0][1] = statDiarioHrsTrabajadas["horas"] + " hrs con " + statDiarioHrsTrabajadas["minutos"] + " Min y " + statDiarioHrsTrabajadas["segundos"] + " Segundos.";
                      tabla[0][2] = statDiarioHorsExtra["horas"] + " hrs con " + statDiarioHorsExtra["minutos"] + " Min y " + statDiarioHorsExtra["segundos"] + " Segundos.";

                      tabla[1] = Array();
                      tabla[1][0] = "Semanal (Últimos 7 días)";
                      tabla[1][1] = statSemanalHrsTrabajadas["horas"] + " hrs con " + statSemanalHrsTrabajadas["minutos"] + " Min y " + statSemanalHrsTrabajadas["segundos"] + " Segundos.";
                      tabla[1][2] = statSemanaHorsExtra["horas"] + " hrs con " + statSemanaHorsExtra["minutos"] + " Min y " + statSemanaHorsExtra["segundos"] + " Segundos.";

                      tabla[2] = Array();
                      tabla[2][0] = "Mensual ("+meses[mes]+")";
                      tabla[2][1] = statMesHrsTrabajadas["horas"] + " hrs con " + statMesHrsTrabajadas["minutos"] + " Min y " + statMesHrsTrabajadas["segundos"] + " Segundos.";
                      tabla[2][2] = statMesHorsExtra["horas"] + " hrs con " + statMesHorsExtra["minutos"] + " Min y " + statMesHorsExtra["segundos"] + " Segundos.";

                      $('#dt-basic-example').dataTable().fnClearTable();
                      $('#dt-basic-example').dataTable().fnAddData(tabla);

                      functions.loadingEndWait();
                      
                    } else {

                        functions.loadingEndWait();
                    }
                  }, function (response) {
                    /*ERROR*/
                    toastr["error"]("Inténtelo de nuevo más tarde", "");
                    functions.loadingEndWait();

                  });/*fin getPlantillas*/
                  
                  functions.loadingEndWait();
                  
                } else {
                  
                    $("#updating-chart").css("display","none");
                    toastr["success"]("No hay Registros en esos Intervalos", "");
                    
                    $('#dt-basic-example').dataTable().fnClearTable();
                    functions.loadingEndWait();
                }
              }, function (response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

              });/*fin getHistorialEntradas*/


            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getZonaHoraria*/

    }; //fin getZonaHorariaFrontClick

    getZonaHorariaFront = $scope.getZonaHorariaFrontClick;

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[consultaDeInformes][perfilEmpresas]");

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

    getImageEmpresaClick = $scope.getImageEmpresaClick;

  });//fin controller inicio

  app.controller('inicioAdmin', function($scope, functions, $window) {

    console.log("[inicioAdmin]");

    functions.loading();

    $(".profile-image").attr("src","img/conecta6_blanco.png");
    
    functions.getAllEmpresas().then(function (response) {

      if(response.data.success == "TRUE"){
        
        console.log("[controllers][getAllEmpresas]");

        console.log(response.data.data.length);

        $scope.totalEmpresas = response.data.data.length;

        $scope.empresasArray = response.data.data;

        console.log(response.data.data);

        dataArray = functions.PlanesVencidosVigenciasCalc(response.data.data);

        console.log(dataArray);

        $scope.vigentes = dataArray["vigentes"];
        $scope.noVigentes = dataArray["noVigentes"];
        $scope.proxVencer = dataArray["proxVencer"];

        $scope.totalPlanes = parseInt(dataArray["vigentes"]) + parseInt(dataArray["noVigentes"]) + parseInt(dataArray["proxVencer"]);
 
        $scope.vigentesPorcentaje = (dataArray["vigentes"]*100)/$scope.totalPlanes;
        $scope.noVigentesPorcentaje = (dataArray["noVigentes"]*100)/$scope.totalPlanes;
        $scope.proxVencerPorcentaje = (dataArray["proxVencer"]*100)/$scope.totalPlanes;

        $('#vigentes.js-easy-pie-chart').data('easyPieChart').update($scope.vigentesPorcentaje);
        $('#noVigentes.js-easy-pie-chart').data('easyPieChart').update($scope.noVigentesPorcentaje);
            

        functions.getAllHistorialEntradas().then(function (response) {

          if(response.data.success == "TRUE"){
            
            console.log("[controllers][getAllHistorialEntradas]");

            console.log(response.data);

            $scope.entradas = response.data.entradas.length;
            $scope.salidas = response.data.salidas.length;
            $scope.entradasTotales = response.data.combinadas.length;
            $scope.entradasPorcentaje = Math.round((($scope.entradas*100) / $scope.entradasTotales));
            $scope.salidasPorcentaje = Math.round((($scope.salidas*100) /$scope.entradasTotales));
            $scope.combinadas = response.data.combinadas.length;

            $scope.combinadasArray = response.data.combinadas;
            
            $('#totalEntradas.js-easy-pie-chart').data('easyPieChart').update($scope.entradas);
            $('#totalSalidas.js-easy-pie-chart').data('easyPieChart').update($scope.salidas);

            functions.getZonaHorariaAdministrador().then(function (response) {

                  if(response.data.success == "TRUE"){
                    console.log("[controllers][getZonaHorariaAdministrador]");

                    console.log(response.data.data);

                    var fecha = new Date( moment().tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));

                    console.log(fecha);

                    var historialCampoDinamico = functions.dividirArrayPorCampoDinamico($scope.combinadasArray, "id_empresas");
                    
                    console.log(historialCampoDinamico);

                    var empresasActividad = functions.empresasActividad(historialCampoDinamico, $scope.totalEmpresas, fecha);
        
                    console.log(empresasActividad);    

                    functions.generarGraficaEmpresas($scope.empresasArray, fecha);
                    
                    empresasActividad["empresasConActividadPorcentaje"] = (empresasActividad["empresasConActividad"]*100)/$scope.totalEmpresas;
                    empresasActividad["empresasSinActividadPorcentaje"] = (empresasActividad["empresasSinActividad"]*100)/$scope.totalEmpresas;

                    $scope.activos = empresasActividad["empresasConActividad"];
                    $scope.activosPorcentaje = empresasActividad["empresasConActividadPorcentaje"];
                    $scope.noActivos = empresasActividad["empresasSinActividad"];
                    $scope.inactivosPorcentaje = empresasActividad["empresasSinActividadPorcentaje"];

                    $('#empresasConActividad.js-easy-pie-chart').data('easyPieChart').update(empresasActividad["empresasConActividadPorcentaje"]);
                    $('#empresasSinActividad.js-easy-pie-chart').data('easyPieChart').update(empresasActividad["empresasSinActividadPorcentaje"]);

                  } else {
                      toastr["warning"](response.data.description, "");
                      functions.loadingEndWait();
                  }
              }, function (response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

              });/*fin getImageEmpresa*/

            functions.loadingEndWait();
            
          } else {

            functions.loadingEndWait();

          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getAllHistorialEntradas*/

        functions.loadingEndWait();
        
      } else {

        functions.loadingEndWait();
      }
    }, function (response) {
      /*ERROR*/
      toastr["error"]("Inténtelo de nuevo más tarde", "");
      functions.loadingEndWait();

    });/*fin getAllEmpresas*/
    
    functions.getTrabajadoresAll().then(function (response) {

      if(response.data.success == "TRUE"){
        
        console.log("[controllers][getTrabajadoresAll]");

        console.log(response.data.data.length);

        $scope.totalTrabajadores = response.data.data.length;

        functions.loadingEndWait();
        
      } else {

        functions.loadingEndWait();
      }
    }, function (response) {
      /*ERROR*/
      toastr["error"]("Inténtelo de nuevo más tarde", "");
      functions.loadingEndWait();

    });/*fin getTrabajadoresAll*/

  });//fin controller inicioAdmin

  app.controller('introduction', function($scope, functions, $window) {

    console.log("[introduction]");

    functions.loading();


  });//fin controller introduction

  app.controller('registros', function($scope, functions, $window) {

    console.log("[registros]");

    functions.loading();

    $scope.getSalidasClick = function(id_empresas){

      console.log("[getSalidasClick]");
    
      functions.getSalidas(id_empresas).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][getSalidas]");

          console.log(response.data.data);

          $scope.salidas = response.data.data;

          functions.loadingEndWait();
          
        } else {

          functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getSalidas*/

    };/*fin getSalidasClick*/

    getSalidas = $scope.getSalidasClick;
    
    $scope.getZonaHorariaFrontClick = function(id_empresas){

      console.log("[signin] ");

      functions.getZonaHoraria(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[signin][getImageEmpresa]");

              console.log(response.data.data);

              var fecha = new Date( moment().tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
              
              var hora = fecha.getHours(),
                          minutos = fecha.getMinutes(),
                          segundos = fecha.getSeconds(),
                          diaSemana = fecha.getDay(),
                          dia = fecha.getDate(),
                          mes = fecha.getMonth(),
                          anio = fecha.getFullYear(),
                          ampm;

              var $pHoras = $("#horas"),
                  $pSegundos = $("#segundos"),
                  $pMinutos = $("#minutos"),
                  $pAMPM = $("#ampm"),
                  $pDiaSemana = $("#diaSemana"),
                  $pDia = $("#dia"),
                  $pMes = $("#mes"),
                  $pAnio = $("#anio");
              var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
          
              $pDiaSemana.text(semana[diaSemana]);
              $pDia.text(dia);
              $pMes.text(meses[mes]);
              $pAnio.text(anio);

              $scope.clock = $('.clock').FlipClock(fecha, {
                clockFace: 'TwentyFourHourClock'
              });

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

    getZonaHorariaFront = $scope.getZonaHorariaFrontClick;

    
    $scope.postRegistrarEntradaClick = function(id_trabajadores, geo_activated){

      console.log("[postRegistrarSalidaClick]");
 
      functions.loading();

      var comentarios = "";
      var date = "";
      var id_salidas = "";
      var selectPlantillaX = "";
      var selectPlantillaY = "";
      var plantilla = "";

      comentarios = $("#comentariosEntrada").val();
      date = moment($scope.clock.original).format('YYYY-MM-DD HH:mm:ss');
      
      selectPlantillaX = document.getElementById("single-default").selectedIndex;
      selectPlantillaY = document.getElementById("single-default").options;
      plantilla = selectPlantillaY[selectPlantillaX].value ;

      console.log("[postRegistrarEntradaClick] id_trabajadores: " + id_trabajadores);
      console.log("[postRegistrarEntradaClick] comentarios: " + comentarios);
      console.log("[postRegistrarEntradaClick] date: " + date);
      console.log("[postRegistrarEntradaClick] selectPlantillaX: " + selectPlantillaX);
      console.log("[postRegistrarEntradaClick] selectPlantillaY: " + selectPlantillaY);
      console.log("[postRegistrarEntradaClick] selectPlantilla: " + "Index: " + selectPlantillaY[selectPlantillaX].index + " is " + selectPlantillaY[selectPlantillaX].text + " value " + selectPlantillaY[selectPlantillaX].value);
      console.log("[postRegistrarEntradaClick] plantilla: " + plantilla);

      if(geo_activated==0){

        console.log("[postRegistrarEntradaClick][Sin GeoLocalización]");

        functions.postRegistrarEntrada(id_trabajadores, comentarios, date, "-1").then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[postRegistrarEntradaClick][postRegistrarEntrada]");

              console.log(response.data.data);

              toastr["success"]("Tu Entrada ha sido Registrada Correctamante!.", "");

              window.location = "/registros";

              functions.loadingEndWait();

            } else {
                toastr["error"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postRegistrarEntrada*/

      } else {

        console.log("[postRegistrarEntradaClick][GeoLocalización]");

        getLocation()
          .then((position) => {
            console.log(position);
            var geoLocation = position.coords;
            console.log(geoLocation);

            functions.postRegistrarEntrada(id_trabajadores, comentarios, date, geoLocation.latitude+","+geoLocation.longitude).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[postRegistrarEntradaClick][postRegistrarEntrada] success");

                  console.log(response.data.data);

                  toastr["success"]("Tu Entrada ha sido Registrada Correctamante!.", "");

                  window.location = "/registros";

                  functions.loadingEndWait();

                } else {
                  console.log("[postRegistrarEntradaClick][postRegistrarEntrada] no success");
                    toastr["error"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              console.log("[postRegistrarEntradaClick][postRegistrarEntrada] Error");
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

            });/*fin postRegistrarEntrada*/

          })
          .catch((err) => {
            console.error(err.message);
            toastr["error"](err.message, "");
          });

      }


    }; //fin postRegistrarEntradaClick

    postRegistrarEntradaClick = $scope.postRegistrarEntradaClick;
    
    $scope.postRegistrarSalidaClick = function(id_trabajadores, geo_activated){

      console.log("[postRegistrarSalidaClick]");
 
      functions.loading();

      var comentarios = "";
      var date = "";
      
      var comentarios = "";
      var date = "";
      var id_salidas = "";
      var selectPlantillaX = "";
      var selectPlantillaY = "";
      var plantilla = "";

      comentarios = $("#comentariosSalida").val();
      date = moment($scope.clock.original).format('YYYY-MM-DD HH:mm:ss');
      
      selectPlantillaX = document.getElementById("single-default").selectedIndex;
      selectPlantillaY = document.getElementById("single-default").options;
      plantilla = selectPlantillaY[selectPlantillaX].value ;

      console.log("[agregarNuevoTrabajadorClick] id_trabajadores: " + id_trabajadores);
      console.log("[agregarNuevoTrabajadorClick] comentarios: " + comentarios);
      console.log("[agregarNuevoTrabajadorClick] date: " + date);
      console.log("[agregarNuevoTrabajadorClick] selectPlantillaX: " + selectPlantillaX);
      console.log("[agregarNuevoTrabajadorClick] selectPlantillaY: " + selectPlantillaY);
      console.log("[agregarNuevoTrabajadorClick] selectPlantilla: " + "Index: " + selectPlantillaY[selectPlantillaX].index + " is " + selectPlantillaY[selectPlantillaX].text + " value " + selectPlantillaY[selectPlantillaX].value);
      console.log("[agregarNuevoTrabajadorClick] plantilla: " + plantilla);
      
      if(selectPlantillaX==0){

        console.log("[agregarNuevoTrabajadorClick] default selected");

        toastr["error"]("Selecciona un Tipo de Salida!.", "");

      } else {

        if(geo_activated==0){

          functions.postRegistrarSalida(id_trabajadores, comentarios, date, selectPlantillaY[selectPlantillaX].value, "-1").then(function (response) {
  
            if(response.data.success == "TRUE"){
              console.log("[postRegistrarSalidaClick][postRegistrarSalida] success");

              console.log(response.data.data);

              toastr["success"]("Tu Salida ha sido Registrada Correctamante!.", "");
    
              window.location = "/registros";

              functions.loadingEndWait();

            } else {
                console.log("[postRegistrarSalidaClick][postRegistrarSalida] no success");
                toastr["error"](response.data.description, "");
                functions.loadingEndWait();
            }
          }, function (response) {
            /*ERROR*/
            console.log("[postRegistrarSalidaClick][postRegistrarSalida] Error");
            toastr["error"]("Inténtelo de nuevo más tarde", "");
            functions.loadingEndWait();

          });/*fin postRegistrarSalida*/

        } else {
          
          getLocation()
          .then((position) => {
            console.log(position);
            geoLocation = position.coords;

            functions.postRegistrarSalida(id_trabajadores, comentarios, date, selectPlantillaY[selectPlantillaX].value, geoLocation.latitude+","+geoLocation.longitude).then(function (response) {
  
                if(response.data.success == "TRUE"){
                  console.log("[postRegistrarSalidaClick][postRegistrarSalida] success");
  
                  console.log(response.data.data);
  
                  toastr["success"]("Tu Salida ha sido Registrada Correctamante!.", "");
        
                  window.location = "/registros";
  
                  functions.loadingEndWait();
  
                } else {
                    console.log("[postRegistrarSalidaClick][postRegistrarSalida] no success");
                    toastr["error"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              console.log("[postRegistrarSalidaClick][postRegistrarSalida] Error");
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();
  
            });/*fin postRegistrarSalida*/

          })
          .catch((err) => {
              console.error(err.message);
              toastr["error"](err.message, "");
          });
        }


      }; //fin postRegistrarSalidaClick
    }

    postRegistrarSalidaClick = $scope.postRegistrarSalidaClick;
    
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

    getImageEmpresa = $scope.getImageEmpresaClick;


  });//fin controller registros

  app.controller('perfilTrabajadores', function($scope, functions, $window) {

    console.log("[perfilTrabajadores]");

    functions.loading();

    
    $scope.postEditProfileClick = function(){

      console.log("[postEditProfileClick] ");

      var correo = "";
      var telefono_fijo = "";
      var celular = "";

      correo = $("#correo").val();
      telefono_fijo = $("#telefono_fijo").val();
      celular = $("#celular").val();

      console.log("correo: " + correo);
      console.log("telefono_fijo: " + telefono_fijo);
      console.log("celular: " + celular);

      if(telefono_fijo==""){

        toastr["error"]("Llenar Correctamente Teléfono Fijo.", "");

      } else if(celular==""){

        toastr["error"]("Llenar Correctamente Celular.", "");

      } else if(correo==""){

        toastr["error"]("Llenar Correctamente Correo.", "");

      } else {

        functions.postEditProfile("", correo, telefono_fijo, celular, "trabajadores").then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[perfilEmpresas][getEditProfileClick]");


            toastr["success"]("Su información se cambió exitosamente", "");

            window.location = "/perfilTrabajadores";

            console.log(response.data.data);

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postEditProfile*/

      }

    }; //fin postEditProfileClick

    postEditProfile = $scope.postEditProfileClick;

    $scope.getTrabajadoresByIdTrabajadoresClick = function(id_trabajadores){

      console.log("[perfilTrabajadores][getTrabajadoresByIdTrabajadoresClick]");

      functions.getTrabajadoresByIdTrabajadores(id_trabajadores).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modtrabajador][perfilEmpresas]");

              console.log(response.data.data);

              $scope.getTrabajadores = response.data.data[0];

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getTrabajadoresByIdTrabajadores*/

    }; //fin getTrabajadoresByIdTrabajadoresClick

    getTrabajadoresByIdTrabajadoresClick = $scope.getTrabajadoresByIdTrabajadoresClick;
    
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

    $(".profile-image").attr("src","img/conecta6_blanco.png");
    
    $scope.postZonaHorariaClick  = function(id_zona_horaria){

      console.log("[postZonasHorariasClick] ");

      functions.postZonasHorariasAdministradores(id_zona_horaria).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][postZonasHorarias]");

              console.log(response.data.data);

              toastr["success"]("Información Actualizada Correctamente", "");

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postZonasHorarias*/

    }; //fin postZonasHorariasClick
    
    $scope.getZonasHorariasClick = function(id_zona_horaria){

      console.log("[getZonasHorariasClick] ");

      functions.getAllZonasHorarias().then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][getZonasHorariasClick]");

              console.log(response.data.data);

              $scope.zonasHorarias = response.data.data;

              $scope.$watch('zonasHorarias', function() {
                //cuando cargue en front las plantillas

                console.log("Cargar zonasHorarias Seleccionada");
                
                for(var i=0; i<$scope.zonasHorarias.length; i++){
                  if($scope.zonasHorarias[i].id_zonas_horarias==id_zona_horaria){
                    console.log("encontramos");
                    document.getElementById("single-default").selectedIndex = i+1;
                    
                  }
                }

              });//fin watch

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getAllZonasHorarias*/

    }; //fin getZonasHorariasClick

    getZonasHorariasClick = $scope.getZonasHorariasClick;
    
    $scope.getAdministradoresClick = function(id_administradores){

      functions.getAdministradores(id_administradores).then(function (response) {

        if(response.data.success == "TRUE"){
          console.log("[perfilAdministradores][getAdministradoresClick]");

          console.log(response.data.data);

          $scope.administradorPerfil = response.data.data[0];

        } else {
            toastr["warning"](response.data.description, "");
            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getAdministradores*/

    }; //fin getAdministradoresClick

    getAdministradoresClick = $scope.getAdministradoresClick;
    
    $scope.postEditProfileClick = function(id_administradores){

      var correo = "";
      var telefono_fijo = "";
      var celular = "";

      correo = $("#correo").val();
      telefono_fijo = $("#telefono_fijo").val();
      celular = $("#celular").val();

      console.log("correo: " + correo);
      console.log("telefono_fijo: " + telefono_fijo);
      console.log("celular: " + celular);

      functions.postEditProfile("", correo, telefono_fijo, celular, "pAdmin").then(function (response) {

        if(response.data.success == "TRUE"){
          console.log("[perfilAdministradores][postEditProfileClick]");

          console.log(response.data.data);


          toastr["success"]("Su información se cambió exitosamente", "");

          window.location = "/perfilAdministradores";

        } else {
            toastr["warning"](response.data.description, "");
            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin postEditProfile*/

    }; //fin postEditProfileClick

    postEditProfile = $scope.postEditProfileClick;


  });//fin controller perfilAdministradores

  app.controller('historial', function($scope, functions, $window) {

    console.log("[historial]");

    functions.loading();

        
    $scope.getZonaHorariaFrontClick = function(id_empresas, id_trabajadores){

      functions.loading();

      console.log("[historial] ");

      console.log("id_empresas: " + id_empresas);
      console.log("id_trabajadores: " + id_trabajadores);

      functions.getZonaHoraria(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[historial][getZonaHoraria]");

              console.log(response.data.data);

              var start = new Date( moment().subtract(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
              var end = new Date( moment().add(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));

              $('#datepicker-2').daterangepicker({
                  timePicker: false,
                  startDate: start,
                  endDate: end,
                  locale:
                  {
                      format: 'YYYY-MM-DD'
                  }
              });

              
            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getZonaHoraria*/

    }; //fin getZonaHorariaFrontClick

    getZonaHorariaFront = $scope.getZonaHorariaFrontClick;

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[historial] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[historial][getImageEmpresa]");

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

    getImageEmpresa = $scope.getImageEmpresaClick;

    
    
    $scope.getHistorialEntradasClick = function(id_trabajadores, start, end){

      functions.loading();

      functions.getHistorialEntradas(id_trabajadores, start + " 00:00:00", end + " 23:59:59").then(function (response) {

        if(response.data.success == "TRUE"){
          console.log("[historial][getHistorialEntradas]");

          response.data.data = functions.completarTiposDeSalidasArray(response.data.data);

          console.log(response.data.data);

          var data = Array();

          var choices = Array();
          choices = ["id_registros", "fecha", "tipo", "comentarios"];
          
          data = addKeyToArray(data, response.data.data, choices);

          console.log(data);

          $('#dt-basic-example').dataTable().fnClearTable();
          $('#dt-basic-example').dataTable().fnAddData(data);
          
          functions.loadingEndWait();
          
        } else {
            toastr["success"]("No hay Registros en esos Intervalos", "");
            
            $('#dt-basic-example').dataTable().fnClearTable();
            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getHistorialEntradas*/

    }; //fin getHistorialEntradasClick

    getHistorialEntradas = $scope.getHistorialEntradasClick;


  });//fin controller historial

  app.controller('historialEntradasYSalidasPorEmpresa', function($scope, functions, $window) {

    console.log("[historialEntradasYSalidasPorEmpresa]");

    functions.loading();
        
    $scope.getZonaHorariaFrontClick = function(id_empresas){

      functions.loading();

      console.log("[historialEntradasYSalidasPorEmpresa] ");

      console.log("id_empresas: " + id_empresas);

      functions.getZonaHoraria(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[historialEntradasYSalidasPorEmpresa][getZonaHoraria]");

              console.log(response.data.data);

              var start = new Date( moment().subtract(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
              var end = new Date( moment().add(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));

              $('#datepicker-2').daterangepicker({
                  timePicker: false,
                  startDate: start,
                  endDate: end,
                  locale:
                  {
                      format: 'YYYY-MM-DD'
                  }
              });

              
            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getZonaHoraria*/

    }; //fin getZonaHorariaFrontClick

    getZonaHorariaFront = $scope.getZonaHorariaFrontClick;

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[historialEntradasYSalidasPorEmpresa] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[historialEntradasYSalidasPorEmpresa][getImageEmpresa]");

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

    getImageEmpresa = $scope.getImageEmpresaClick;

    
    
    $scope.getHistorialEntradasByIdEmpresasClick = function(id_empresas, start, end){

      functions.loading();

      functions.getHistorialEntradasByIdEmpresas(id_empresas, start + " 00:00:00", end + " 23:59:59").then(function (response) {

        if(response.data.success == "TRUE"){
          console.log("[historialEntradasYSalidasPorEmpresa][getHistorialEntradas]");

          console.log(response.data.data);

          console.log("Logitud: " + response.data.data.length);

          if(response.data.data.length>0){

            var data = Array();

            var choices = Array();
            choices = ["id_registros", "nombre", "apellido", "fecha", "tipo", "comentarios"];

            var data_registros = response.data.data;
            
            data = addKeyToArray(data, data_registros, choices);

            console.log(data);

            $('#dt-basic-example').dataTable().fnClearTable();
            $('#dt-basic-example').dataTable().fnAddData(data);

          } else {

            toastr["success"]("No hay Registros en esos Intervalos", "");

            $('#dt-basic-example').dataTable().fnClearTable();

          }
          
          functions.loadingEndWait();
          
        } else {
            toastr["success"]("No hay Registros en esos Intervalos", "");
            
            $('#dt-basic-example').dataTable().fnClearTable();
            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getHistorialEntradas*/

    }; //fin getHistorialEntradasClick

    getHistorialEntradasByIdEmpresas = $scope.getHistorialEntradasByIdEmpresasClick;


  });//fin controller historialEntradasYSalidasPorEmpresa

  
  app.controller('signinEmpresas', function($scope, functions, $window) {

    functions.loading();

    $("body").css("background-image","url('../img/texture.png')");

    
    console.log("[signinEmpresas]");

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[signinEmpresas][perfilEmpresas]");

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

    $scope.getZonaHorariaFrontClick = function(id_empresas){

      console.log("[inicioEmpresa] ");

      functions.getZonaHoraria(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){

              console.log("[inicioEmpresa][getZonaHoraria]");

              console.log(response.data.data);

              var fecha = new Date( moment().tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
              
              var hora = fecha.getHours(),
                          minutos = fecha.getMinutes(),
                          segundos = fecha.getSeconds(),
                          diaSemana = fecha.getDay(),
                          dia = fecha.getDate(),
                          mes = fecha.getMonth(),
                          anio = fecha.getFullYear(),
                          ampm;
              
              console.log(fecha);

              var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
              
              $("#mesActual").html(`"` + meses[mes] + `"`);
              
              //por si en las estadísticas hay que jalar días antes, de todas formas se filtran bien dentro de cada función lo necesario.
              var start = moment().year(anio).month(mes).date(1).subtract(1, 'month').startOf("day").format('YYYY-MM-DD HH:mm:ss');
              
              var end = moment().year(anio).month(mes).date(31).startOf("day").format('YYYY-MM-DD HH:mm:ss');

              functions.getHistorialEntradasByIdEmpresas(id_empresas, start, end).then(function (registros) {

                  if(registros.data.success == "TRUE"){

                    //improvements
                    //cuando es un día 3 de diciembre por ejemplo, y está vacío el arreglo la información debería de mostrar
                    //todos los trabajadores en 0 puesto que no hay información.

                    console.log("[inicioEmpresa][getHistorialEntradasByIdEmpresas]");

                    console.log(registros.data.data);
                    
                    var imputuales = functions.filtrarSoloEntradasAlMes(fecha, registros.data.data);

                    console.log("Registro de mes:");
                    console.log(imputuales);

                    var imputuales_divididos = functions.dividirArrayPorIdTrabajadores(imputuales);

                    console.log("Arreglo Divididos");

                    console.log(imputuales_divididos);

                    functions.getPlantillas().then(function (response) {

                      if(response.data.success == "TRUE"){
                        
                        console.log("[controllers][modTrabajadorClick][getPlantillas]");

                        console.log(response.data.data);

                        var plantillas = response.data.data;

                        var array = functions.impuntualesPuntualesConSusAsistencias(plantillas, imputuales_divididos);

                        var impuntuales = array["impuntuales"].sort(function(a, b) {
                          return (b.impuntualidad - a.impuntualidad);
                        });
                        
                        var puntuales = array["puntuales"].sort(function(a, b) {
                          return (b.puntuales - a.puntuales);
                        });

                        console.log("impuntuales: ");

                        console.log(impuntuales);

                        $scope.imputuales = array["impuntuales"];

                        console.log("puntuales: ");

                        console.log(puntuales);

                        $scope.puntuales = puntuales;

                        console.log("asistencias: ");

                        console.log(array["asistencias"]);

                        var array = functions.faltasNoFaltasConSusAsistenciasMes(plantillas, imputuales_divididos, fecha);

                        var faltas = array["faltas"].sort(function(a, b) {
                          return (b.faltas - a.faltas);
                        });
                        
                        var nofaltas = array["noFaltas"].sort(function(a, b) {
                          return (b.noFaltas - a.noFaltas);
                        });

                        console.log(array);

                        console.log("faltas: ");

                        console.log(faltas);

                        console.log("No faltas: ");

                        console.log(nofaltas);

                        $scope.faltantes = faltas;

                        $scope.Nofaltas = nofaltas;

                        functions.loadingEndWait();
                        
                      } else {

                          functions.loadingEndWait();
                      }
                    }, function (response) {
                      /*ERROR*/
                      toastr["error"]("Inténtelo de nuevo más tarde", "");
                      functions.loadingEndWait();

                    });/*fin getPlantillas*/

                  } else {
                      toastr["warning"](registros.data.description, "");
                      functions.loadingEndWait();
                  }
              }, function (registros) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

              });/*fin getHistorialEntradasByIdEmpresas*/
                      
              functions.getAllEntradasSalidasByEmpresas(id_empresas).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[inicio][getAllEntradasSalidasByEmpresas]");

                  console.log(response.data.data);

                  console.log("Entradas: " + response.data.entradas.length);
                  console.log("Salidas: " + response.data.salidas.length);

                  var entradasySalidas = concatArray(response.data.entradas, response.data.salidas);

                  console.log("Concat: ");
                  console.log(entradasySalidas);

                  var arrayDividido = functions.dividirArrayPorIdTrabajadores(entradasySalidas);

                  console.log("Array Dividido:");
                  console.log(arrayDividido);
                  
                  var arrayDivididoOrdered = functions.ordernarPorFechaArrayKey(arrayDividido);

                  console.log("Arreglo ordenado por fecha:");
                  console.log(arrayDivididoOrdered);

                  $scope.entradasTotales = response.data.entradas.length;
                  $scope.salidasTotales = response.data.salidas.length;

                  functions.getTrabajadoresByIdEmpresa(id_empresas).then(function (response) {

                      if(response.data.success == "TRUE"){
                        console.log("[trabajadores][agregarNuevoTrabajadorClick][perfilEmpresas]");

                        console.log(response.data.data);

                        var data = Array();

                        //var choices = Array();
                        //choices = ["id_trabajadores", "nombre", "apellido", "correo", "telefono_fijo"];
                        
                        //data = addKeyToArray(data, response.data.data, choices);

                        $scope.totalTrabajadores = response.data.data.length;

                        console.log(data);

                              
                        var porcentaje = functions.porcentajeActividadTrabajadores($scope.totalTrabajadores, arrayDivididoOrdered, fecha);

                        console.log("Porcentajes:");
                        console.log(porcentaje);

                        $scope.conActividad = porcentaje["conActividad"];
                        $scope.sinActividad = porcentaje["sinActividad"];
                        $scope.activos = porcentaje["activos"];
                        $scope.noActivos = porcentaje["noActivos"];
                        $scope.totales = porcentaje["totales"];

                        //$('#dt-basic-example').dataTable().fnClearTable();
                        //$('#dt-basic-example').dataTable().fnAddData(data);
                                  
                        $('#tSinActividad.js-easy-pie-chart').data('easyPieChart').update($scope.sinActividad);

                        $('#tConActividad.js-easy-pie-chart').data('easyPieChart').update($scope.conActividad);

                        

                      } else {
                          toastr["warning"](response.data.description, "");
                          functions.loadingEndWait();
                      }
                  }, function (response) {
                    /*ERROR*/
                    toastr["error"]("Inténtelo de nuevo más tarde", "");
                    functions.loadingEndWait();

                  });/*fin getTrabajadoresByIdEmpresa*/


                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

            });/*fin getAllEntradasSalidasByEmpresas*/

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getZonaHoraria*/

    }; //fin getZonaHorariaFrontClick

    getZonaHorariaFront = $scope.getZonaHorariaFrontClick;
    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[inicioEmpresa][perfilEmpresas]");

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

    $(".profile-image").attr("src","img/conecta6_blanco.png");


    
    
    $scope.eliminarEmpresaClick = function(id_empresa){

      functions.loading();

      console.log("[controllers][empresas][eliminarEmpresaClick]");
      
      console.log("[controllers][empresas][eliminarEmpresaClick] id_empresa: " + id_empresa);
      
      functions.eliminarEmpresa(id_empresa).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][empresas][eliminarEmpresaClick]");
          
                
          functions.getAllEmpresas().then(function (response) {

            if(response.data.success == "TRUE"){
              
              console.log("[controllers][nuevoempresa][getAllEmpresas]");

              functions.loadingEndWait();

              console.log(response.data.data);

              var data = Array();

              var choices = Array();
              choices = ["id_empresas", "nombre_empresa", "empleados_permitidos", "activo", "vigencia"];
              
              data = addKeyToArray(data, response.data.data, choices);
              data = functions.fechasRestarArray(data);

              console.log(data);

              $('#dt-basic-example').dataTable().fnClearTable();
              $('#dt-basic-example').dataTable().fnAddData(data);

              functions.empresasSwitches(response.data.data);
              
            } else {

                functions.loadingEndWait();
            }
          }, function (response) {
            /*ERROR*/
            toastr["error"]("Inténtelo de nuevo más tarde", "");
            functions.loadingEndWait();

          });/*fin getAllEmpresas*/
          
        } else {

          console.log("id_empresa: " + id_empresa);

          functions.loadingEndWait();

        }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin eliminarEmpresa*/

    };/*fin eliminarEmpresaClick*/

    postEliminarEmpresa = $scope.eliminarEmpresaClick;


    $scope.postActiveEmpresaClick = function(id_empresas, active){

      console.log("[empresas] ");


      functions.postActiveEmpresa(id_empresas, active).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[empresas]");

              console.log(response.data.data);
              toastr["success"]("La información fue cambiada con<br /> éxito.", "");

              
              functions.getAllEmpresas().then(function (response) {

                if(response.data.success == "TRUE"){
                  
                  console.log("[controllers][nuevoempresa][getAllEmpresas]");

                  functions.loadingEndWait();

                  console.log(response.data.data);

                  var data = Array();

                  var choices = Array();
                  choices = ["id_empresas", "nombre_empresa", "empleados_permitidos", "activo", "vigencia"];
                  
                  data = addKeyToArray(data, response.data.data, choices);
                  data = functions.fechasRestarArray(data);

                  console.log(data);

                  $('#dt-basic-example').dataTable().fnClearTable();
                  $('#dt-basic-example').dataTable().fnAddData(data);

                  functions.empresasSwitches(response.data.data);
                  
                } else {

                    functions.loadingEndWait();
                }
              }, function (response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

              });/*fin getAllEmpresas*/

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postActiveEmpresa*/

    }; //fin postActiveEmpresaClick

    postActiveEmpresa = $scope.postActiveEmpresaClick;

    functions.getAllEmpresas().then(function (response) {

      if(response.data.success == "TRUE"){
        
        console.log("[controllers][nuevoempresa][getAllEmpresas]");

        functions.loadingEndWait();

        console.log(response.data.data);

        var data = Array();

        var choices = Array();
        choices = ["id_empresas", "nombre_empresa", "empleados_permitidos", "activo", "vigencia"];
        
        data = addKeyToArray(data, response.data.data, choices);
        data = functions.fechasRestarArray(data);

        console.log(data);

        $('#dt-basic-example').dataTable().fnClearTable();
        $('#dt-basic-example').dataTable().fnAddData(data);

        functions.empresasSwitches(response.data.data);
        
      } else {

          functions.loadingEndWait();
      }
    }, function (response) {
      /*ERROR*/
      toastr["error"]("Inténtelo de nuevo más tarde", "");
      functions.loadingEndWait();

    });/*fin getAllEmpresas*/

  });//fin controller empresas

  app.controller('perfilEmpresas', function($scope, functions, $window) {

    console.log("[perfilEmpresas]");

    functions.loading();

    $scope.getEmpresaClick = function(id_empresas){

      console.log("[perfilEmpresas] ");

      functions.getEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[perfilEmpresas]");

              console.log(response.data.data);

              $scope.empresaPerfil = response.data.data[0];

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

    getEmpresa = $scope.getEmpresaClick;

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[perfilEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[perfilEmpresas]");

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

    $scope.postEditProfileClick = function(){

      console.log("[getEditProfileClick] ");

      var nombre_empresa = "";
      var correo = "";
      var telefono_fijo = "";
      var celular = "";

      nombre_empresa = $("#nombre_empresa").val();
      correo = $("#correo").val();
      telefono_fijo = $("#telefono_fijo").val();
      celular = $("#celular").val();

      console.log("nombre_empresa: " + $("#nombre_empresa").val());
      console.log("correo: " + $("#correo").val());
      console.log("telefono_fijo: " + $("#telefono_fijo").val());
      console.log("celular: " + $("#celular").val());

      if(telefono_fijo==""){

        toastr["error"]("Llenar Correctamente Teléfono Fijo.", "");

      } else if(celular==""){

        toastr["error"]("Llenar Correctamente Celular.", "");

      } else if(correo==""){

        toastr["error"]("Llenar Correctamente Correo.", "");

      } else if(nombre_empresa==""){

        toastr["error"]("Llenar Correctamente Nombre de la Empresa.", "");

      } else {

        functions.postEditProfile(nombre_empresa, correo, telefono_fijo, celular, "empresas").then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[perfilEmpresas][getEditProfileClick]");


            toastr["success"]("Su información se cambió exitosamente", "");

            window.location = "/perfilEmpresas";

            console.log(response.data.data);

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postEditProfile*/

      }

    }; //fin postEditProfileClick

    postEditProfile = $scope.postEditProfileClick;


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
      var lunesTurnoX = document.getElementById("lunesTurno").selectedIndex;
      var lunesTurnoY = document.getElementById("lunesTurno").options;

      martesActivated = $("#martesActivated").prop("checked");
      de1Martes = $("#de1Martes").val();
      a1Martes = $("#a1Martes").val();
      de2Martes = $("#de2Martes").val();
      a2Martes = $("#a2Martes").val();
      var martesTurnoX = document.getElementById("martesTurno").selectedIndex;
      var martesTurnoY = document.getElementById("martesTurno").options;

      miercolesActivated = $("#miercolesActivated").prop("checked");
      de1Miercoles = $("#de1Miercoles").val();
      a1Miercoles = $("#a1Miercoles").val();
      de2Miercoles = $("#de2Miercoles").val();
      a2Miercoles = $("#a2Miercoles").val();
      var miercolesTurnoX = document.getElementById("miercolesTurno").selectedIndex;
      var miercolesTurnoY = document.getElementById("miercolesTurno").options;

      juevesActivated = $("#juevesActivated").prop("checked");
      de1Jueves = $("#de1Jueves").val();
      a1Jueves = $("#a1Jueves").val();
      de2Jueves = $("#de2Jueves").val();
      a2Jueves = $("#a2Jueves").val();
      var juevesTurnoX = document.getElementById("juevesTurno").selectedIndex;
      var juevesTurnoY = document.getElementById("juevesTurno").options;

      viernesActivated = $("#viernesActivated").prop("checked");
      de1Viernes = $("#de1Viernes").val();
      a1Viernes = $("#a1Viernes").val();
      de2Viernes = $("#de2Viernes").val();
      a2Viernes = $("#a2Viernes").val();
      var viernesTurnoX = document.getElementById("viernesTurno").selectedIndex;
      var viernesTurnoY = document.getElementById("viernesTurno").options;

      sabadoActivated = $("#sabadoActivated").prop("checked");
      de1Sabado = $("#de1Sabado").val();
      a1Sabado = $("#a1Sabado").val();
      de2Sabado = $("#de2Sabado").val();
      a2Sabado = $("#a2Sabado").val();
      var sabadoTurnoX = document.getElementById("sabadoTurno").selectedIndex;
      var sabadoTurnoY = document.getElementById("sabadoTurno").options;

      domingoActivated = $("#domingoActivated").prop("checked");
      de1Domingo = $("#de1Domingo").val();
      a1Domingo = $("#a1Domingo").val();
      de2Domingo = $("#de2Domingo").val();
      a2Domingo = $("#a2Domingo").val();
      var domingoTurnoX = document.getElementById("domingoTurno").selectedIndex;
      var domingoTurnoY = document.getElementById("domingoTurno").options;

      console.log("[nuevaplantilla][send] nombrePlantilla: " + nombrePlantilla);
      
      console.log("[nuevaplantilla][send] lunesActivated: " + lunesActivated);
      console.log("[nuevaplantilla][send] de1Lunes: " + de1Lunes);
      console.log("[nuevaplantilla][send] a1Lunes: " + a1Lunes);
      console.log("[nuevaplantilla][send] de2Lunes: " + de2Lunes);
      console.log("[nuevaplantilla][send] a2Lunes: " + a2Lunes);
      console.log("Index: " + lunesTurnoY[lunesTurnoX].index + " is " + lunesTurnoY[lunesTurnoX].text + " value " + lunesTurnoY[lunesTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + lunesTurnoY[lunesTurnoX].value + ", " + lunesTurnoY[lunesTurnoX].text);
      
      console.log("[nuevaplantilla][send] martesActivated: " + martesActivated);
      console.log("[nuevaplantilla][send] de1Martes: " + de1Martes);
      console.log("[nuevaplantilla][send] a1Martes: " + a1Martes);
      console.log("[nuevaplantilla][send] de2Martes: " + de2Martes);
      console.log("[nuevaplantilla][send] a2Martes: " + a2Martes);
      console.log("Index: " + martesTurnoY[martesTurnoX].index + " is " + martesTurnoY[martesTurnoX].text + " value " + martesTurnoY[martesTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + martesTurnoY[martesTurnoX].value + ", " + martesTurnoY[martesTurnoX].text);
      
      console.log("[nuevaplantilla][send] miercolesActivated: " + miercolesActivated);
      console.log("[nuevaplantilla][send] de1Miercoles: " + de1Miercoles);
      console.log("[nuevaplantilla][send] a1Miercoles: " + a1Miercoles);
      console.log("[nuevaplantilla][send] de2Miercoles: " + de2Miercoles);
      console.log("[nuevaplantilla][send] a2Miercoles: " + a2Miercoles);
      console.log("Index: " + miercolesTurnoY[miercolesTurnoX].index + " is " + miercolesTurnoY[miercolesTurnoX].text + " value " + miercolesTurnoY[miercolesTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + miercolesTurnoY[miercolesTurnoX].value + ", " + miercolesTurnoY[miercolesTurnoX].text);
      
      console.log("[nuevaplantilla][send] juevesActivated: " + juevesActivated);
      console.log("[nuevaplantilla][send] de1Jueves: " + de1Jueves);
      console.log("[nuevaplantilla][send] a1Jueves: " + a1Jueves);
      console.log("[nuevaplantilla][send] de2Jueves: " + de2Jueves);
      console.log("[nuevaplantilla][send] a2Jueves: " + a2Jueves);
      console.log("Index: " + juevesTurnoY[juevesTurnoX].index + " is " + juevesTurnoY[juevesTurnoX].text + " value " + juevesTurnoY[juevesTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + juevesTurnoY[juevesTurnoX].value + ", " + juevesTurnoY[juevesTurnoX].text);
      
      console.log("[nuevaplantilla][send] viernesActivated: " + viernesActivated);
      console.log("[nuevaplantilla][send] de1Viernes: " + de1Viernes);
      console.log("[nuevaplantilla][send] a1Viernes: " + a1Viernes);
      console.log("[nuevaplantilla][send] de2Viernes: " + de2Viernes);
      console.log("[nuevaplantilla][send] a2Viernes: " + a2Viernes);
      console.log("Index: " + viernesTurnoY[viernesTurnoX].index + " is " + viernesTurnoY[viernesTurnoX].text + " value " + viernesTurnoY[viernesTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + viernesTurnoY[viernesTurnoX].value + ", " + viernesTurnoY[viernesTurnoX].text);
      
      console.log("[nuevaplantilla][send] sabadoActivated: " + sabadoActivated);
      console.log("[nuevaplantilla][send] de1Sabado: " + de1Sabado);
      console.log("[nuevaplantilla][send] a1Sabado: " + a1Sabado);
      console.log("[nuevaplantilla][send] de2Sabado: " + de2Sabado);
      console.log("[nuevaplantilla][send] a2Sabado: " + a2Sabado);
      console.log("Index: " + sabadoTurnoY[sabadoTurnoX].index + " is " + sabadoTurnoY[sabadoTurnoX].text + " value " + sabadoTurnoY[sabadoTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + sabadoTurnoY[sabadoTurnoX].value + ", " + sabadoTurnoY[sabadoTurnoX].text);
      
      console.log("[nuevaplantilla][send] domingoActivated: " + domingoActivated);
      console.log("[nuevaplantilla][send] de1Domingo: " + de1Domingo);
      console.log("[nuevaplantilla][send] a1Domingo: " + a1Domingo);
      console.log("[nuevaplantilla][send] de2Domingo: " + de2Domingo);
      console.log("[nuevaplantilla][send] a2Domingo: " + a2Domingo); 
      console.log("Index: " + domingoTurnoY[domingoTurnoX].index + " is " + domingoTurnoY[domingoTurnoX].text + " value " + domingoTurnoY[domingoTurnoX].value);
      console.log("[nuevaplantilla][send] select turno: " + domingoTurnoY[domingoTurnoX].value + ", " + domingoTurnoY[domingoTurnoX].text); 

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

      } else if(
        $('#lunesActivated').prop("checked") &&
        (($('#de1Lunes').val()==$('#a1Lunes').val()) ||
        ($('#de2Lunes').val()==$('#a2Lunes').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día lunes.", "");
          functions.loadingEndWait();

      } else if($('#lunesActivated').prop("checked") && 
        lunesTurnoY[lunesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#lunesActivated').prop("checked") && 
        lunesTurnoY[lunesTurnoX].value==0 &&
        (
        compararFechas24(de1Lunes, a1Lunes)==1 ||
        compararFechas24(a1Lunes, de2Lunes)==1 ||
        compararFechas24(de2Lunes, a2Lunes)==1)
              ){
        console.log("Horario Nocturno");
        toastr["error"]("Llena correctamente los<br />horarios del día lunes.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
      ($('#de1Martes').val()=="" ||
      $('#a1Martes').val()=="" ||
      $('#de2Martes').val()=="" ||
      $('#a2Martes').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día martes.", "");
        functions.loadingEndWait();

      } else if(
        $('#martesActivated').prop("checked") &&
        (($('#de1Martes').val()==$('#a1Martes').val()) ||
        ($('#de2Martes').val()==$('#a2Martes').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día martes.", "");
          functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
          martesTurnoY[martesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
        martesTurnoY[martesTurnoX].value==0 &&
        (
        compararFechas24(de1Martes, a1Martes)==1 ||
        compararFechas24(a1Martes, de2Martes)==1 ||
        compararFechas24(de2Martes, a2Martes)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día martes.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
      ($('#de1Miercoles').val()=="" ||
      $('#a1Miercoles').val()=="" ||
      $('#de2Miercoles').val()=="" ||
      $('#a2Miercoles').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día miercoles.", "");
        functions.loadingEndWait();

      } else if(
        $('#miercolesActivated').prop("checked") &&
        (($('#de1Miercoles').val()==$('#a1Miercoles').val()) ||
        ($('#de2Miercoles').val()==$('#a2Miercoles').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día miercoles.", "");
          functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
          miercolesTurnoY[miercolesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
        miercolesTurnoY[miercolesTurnoX].value==0 &&
        (
        compararFechas24(de1Miercoles, a1Miercoles)==1 ||
        compararFechas24(a1Miercoles, de2Miercoles)==1 ||
        compararFechas24(de2Miercoles, a2Miercoles)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día miercoles.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
      ($('#de1Jueves').val()=="" ||
      $('#a1Jueves').val()=="" ||
      $('#de2Jueves').val()=="" ||
      $('#a2Jueves').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día jueves.", "");
        functions.loadingEndWait();

      } else if(
        $('#juevesActivated').prop("checked") &&
        (($('#de1Jueves').val()==$('#a1Jueves').val()) ||
        ($('#de2Jueves').val()==$('#a2Jueves').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día jueves.", "");
          functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
          juevesTurnoY[juevesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
        juevesTurnoY[juevesTurnoX].value==0 &&
        (
        compararFechas24(de1Jueves, a1Jueves)==1 ||
        compararFechas24(a1Jueves, de2Jueves)==1 ||
        compararFechas24(de2Jueves, a2Jueves)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día jueves.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
      ($('#de1Viernes').val()=="" ||
      $('#a1Viernes').val()=="" ||
      $('#de2Viernes').val()=="" ||
      $('#a2Viernes').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día viernes.", "");
        functions.loadingEndWait();

      } else if(
        $('#viernesActivated').prop("checked") &&
        (($('#de1Viernes').val()==$('#a1Viernes').val()) ||
        ($('#de2Viernes').val()==$('#a2Viernes').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día viernes.", "");
          functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
          viernesTurnoY[viernesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
        viernesTurnoY[viernesTurnoX].value==0 &&
        (
        compararFechas24(de1Viernes, a1Viernes)==1 ||
        compararFechas24(a1Viernes, de2Viernes)==1 ||
        compararFechas24(de2Viernes, a2Viernes)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día viernes.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
      ($('#de1Sabado').val()=="" ||
      $('#a1Sabado').val()=="" ||
      $('#de2Sabado').val()=="" ||
      $('#a2Sabado').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día sábado.", "");
        functions.loadingEndWait();

      } else if(
        $('#sabadoActivated').prop("checked") &&
        (($('#de1Sabado').val()==$('#a1Sabado').val()) ||
        ($('#de2Sabado').val()==$('#a2Sabado').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día sábado.", "");
          functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
          sabadoTurnoY[sabadoTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
        sabadoTurnoY[sabadoTurnoX].value==0 &&
        (
        compararFechas24(de1Sabado, a1Sabado)==1 ||
        compararFechas24(a1Sabado, de2Sabado)==1 ||
        compararFechas24(de2Sabado, a2Sabado)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día sábado.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
      ($('#de1Domingo').val()=="" ||
      $('#a1Domingo').val()=="" ||
      $('#de2Domingo').val()=="" ||
      $('#a2Domingo').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día domingo.", "");
        functions.loadingEndWait();

      } else if(
        $('#domingoActivated').prop("checked") &&
        (($('#de1Domingo').val()==$('#a1Domingo').val()) ||
        ($('#de2Domingo').val()==$('#a2Domingo').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día domingo.", "");
          functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
          domingoTurnoY[domingoTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
        domingoTurnoY[domingoTurnoX].value==0 &&
        (
        compararFechas24(de1Domingo, a1Domingo)==1 ||
        compararFechas24(a1Domingo, de2Domingo)==1 ||
        compararFechas24(de2Domingo, a2Domingo)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día domingo.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else {
          
        console.log("[agregar]");
      
        functions.postPlantilla(nombrePlantilla, 
        lunesActivated, lunesTurnoY[lunesTurnoX].text, de1Lunes, a1Lunes, de2Lunes, a2Lunes,
        martesActivated, martesTurnoY[martesTurnoX].text, de1Martes, a1Martes, de2Martes, a2Martes,
        miercolesActivated, miercolesTurnoY[miercolesTurnoX].text, de1Miercoles, a1Miercoles, de2Miercoles, a2Miercoles,
        juevesActivated, juevesTurnoY[juevesTurnoX].text, de1Jueves, a1Jueves, de2Jueves, a2Jueves,
        viernesActivated, viernesTurnoY[viernesTurnoX].text, de1Viernes, a1Viernes, de2Viernes, a2Viernes,
        sabadoActivated, sabadoTurnoY[sabadoTurnoX].text, de1Sabado, a1Sabado, de2Sabado, a2Sabado,
        domingoActivated, domingoTurnoY[domingoTurnoX].text, de1Domingo, a1Domingo, de2Domingo, a2Domingo
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
          //ERROR
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postPlantilla*/
      
      }//fin else

    }//fin send ng

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[nuevaplantilla] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[nuevaplantilla][getImageEmpresa]");

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


  });//fin controller nuevaplantilla

  app.controller('modplantilla', function($scope, functions, $window) {

    functions.loading();
    
    console.log("[modplantilla]");

    $scope.send = function(id_plantilla){
      console.log("[modplantilla][send]");

      console.log("[modplantilla][send] id_plantilla: " + id_plantilla);

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
      var lunesTurnoX = document.getElementById("lunesTurno").selectedIndex;
      var lunesTurnoY = document.getElementById("lunesTurno").options;

      martesActivated = $("#martesActivated").prop("checked");
      de1Martes = $("#de1Martes").val();
      a1Martes = $("#a1Martes").val();
      de2Martes = $("#de2Martes").val();
      a2Martes = $("#a2Martes").val();
      var martesTurnoX = document.getElementById("martesTurno").selectedIndex;
      var martesTurnoY = document.getElementById("martesTurno").options;

      miercolesActivated = $("#miercolesActivated").prop("checked");
      de1Miercoles = $("#de1Miercoles").val();
      a1Miercoles = $("#a1Miercoles").val();
      de2Miercoles = $("#de2Miercoles").val();
      a2Miercoles = $("#a2Miercoles").val();
      var miercolesTurnoX = document.getElementById("miercolesTurno").selectedIndex;
      var miercolesTurnoY = document.getElementById("miercolesTurno").options;

      juevesActivated = $("#juevesActivated").prop("checked");
      de1Jueves = $("#de1Jueves").val();
      a1Jueves = $("#a1Jueves").val();
      de2Jueves = $("#de2Jueves").val();
      a2Jueves = $("#a2Jueves").val();
      var juevesTurnoX = document.getElementById("juevesTurno").selectedIndex;
      var juevesTurnoY = document.getElementById("juevesTurno").options;

      viernesActivated = $("#viernesActivated").prop("checked");
      de1Viernes = $("#de1Viernes").val();
      a1Viernes = $("#a1Viernes").val();
      de2Viernes = $("#de2Viernes").val();
      a2Viernes = $("#a2Viernes").val();
      var viernesTurnoX = document.getElementById("viernesTurno").selectedIndex;
      var viernesTurnoY = document.getElementById("viernesTurno").options;

      sabadoActivated = $("#sabadoActivated").prop("checked");
      de1Sabado = $("#de1Sabado").val();
      a1Sabado = $("#a1Sabado").val();
      de2Sabado = $("#de2Sabado").val();
      a2Sabado = $("#a2Sabado").val();
      var sabadoTurnoX = document.getElementById("sabadoTurno").selectedIndex;
      var sabadoTurnoY = document.getElementById("sabadoTurno").options;

      domingoActivated = $("#domingoActivated").prop("checked");
      de1Domingo = $("#de1Domingo").val();
      a1Domingo = $("#a1Domingo").val();
      de2Domingo = $("#de2Domingo").val();
      a2Domingo = $("#a2Domingo").val();
      var domingoTurnoX = document.getElementById("domingoTurno").selectedIndex;
      var domingoTurnoY = document.getElementById("domingoTurno").options;

      console.log("[modplantilla][send] id_plantilla: " + id_plantilla);

      console.log("[modplantilla][send] nombrePlantilla: " + nombrePlantilla);
      
      console.log("[modplantilla][send] lunesActivated: " + lunesActivated);
      console.log("[modplantilla][send] de1Lunes: " + de1Lunes);
      console.log("[modplantilla][send] a1Lunes: " + a1Lunes);
      console.log("[modplantilla][send] de2Lunes: " + de2Lunes);
      console.log("[modplantilla][send] a2Lunes: " + a2Lunes);
      console.log("Index: " + lunesTurnoY[lunesTurnoX].index + " is " + lunesTurnoY[lunesTurnoX].text + " value " + lunesTurnoY[lunesTurnoX].value);
      console.log("[modplantilla][send] select turno: " + lunesTurnoY[lunesTurnoX].value + ", " + lunesTurnoY[lunesTurnoX].text);
      
      console.log("[modplantilla][send] martesActivated: " + martesActivated);
      console.log("[modplantilla][send] de1Martes: " + de1Martes);
      console.log("[modplantilla][send] a1Martes: " + a1Martes);
      console.log("[modplantilla][send] de2Martes: " + de2Martes);
      console.log("[modplantilla][send] a2Martes: " + a2Martes);
      console.log("Index: " + martesTurnoY[martesTurnoX].index + " is " + martesTurnoY[martesTurnoX].text + " value " + martesTurnoY[martesTurnoX].value);
      console.log("[modplantilla][send] select turno: " + martesTurnoY[martesTurnoX].value + ", " + martesTurnoY[martesTurnoX].text);
      
      console.log("[modplantilla][send] miercolesActivated: " + miercolesActivated);
      console.log("[modplantilla][send] de1Miercoles: " + de1Miercoles);
      console.log("[modplantilla][send] a1Miercoles: " + a1Miercoles);
      console.log("[modplantilla][send] de2Miercoles: " + de2Miercoles);
      console.log("[modplantilla][send] a2Miercoles: " + a2Miercoles);
      console.log("Index: " + miercolesTurnoY[miercolesTurnoX].index + " is " + miercolesTurnoY[miercolesTurnoX].text + " value " + miercolesTurnoY[miercolesTurnoX].value);
      console.log("[modplantilla][send] select turno: " + miercolesTurnoY[miercolesTurnoX].value + ", " + miercolesTurnoY[miercolesTurnoX].text);
      
      console.log("[modplantilla][send] juevesActivated: " + juevesActivated);
      console.log("[modplantilla][send] de1Jueves: " + de1Jueves);
      console.log("[modplantilla][send] a1Jueves: " + a1Jueves);
      console.log("[modplantilla][send] de2Jueves: " + de2Jueves);
      console.log("[modplantilla][send] a2Jueves: " + a2Jueves);
      console.log("Index: " + juevesTurnoY[juevesTurnoX].index + " is " + juevesTurnoY[juevesTurnoX].text + " value " + juevesTurnoY[juevesTurnoX].value);
      console.log("[modplantilla][send] select turno: " + juevesTurnoY[juevesTurnoX].value + ", " + juevesTurnoY[juevesTurnoX].text);
      
      console.log("[modplantilla][send] viernesActivated: " + viernesActivated);
      console.log("[modplantilla][send] de1Viernes: " + de1Viernes);
      console.log("[modplantilla][send] a1Viernes: " + a1Viernes);
      console.log("[modplantilla][send] de2Viernes: " + de2Viernes);
      console.log("[modplantilla][send] a2Viernes: " + a2Viernes);
      console.log("Index: " + viernesTurnoY[viernesTurnoX].index + " is " + viernesTurnoY[viernesTurnoX].text + " value " + viernesTurnoY[viernesTurnoX].value);
      console.log("[modplantilla][send] select turno: " + viernesTurnoY[viernesTurnoX].value + ", " + viernesTurnoY[viernesTurnoX].text);
      
      console.log("[modplantilla][send] sabadoActivated: " + sabadoActivated);
      console.log("[modplantilla][send] de1Sabado: " + de1Sabado);
      console.log("[modplantilla][send] a1Sabado: " + a1Sabado);
      console.log("[modplantilla][send] de2Sabado: " + de2Sabado);
      console.log("[modplantilla][send] a2Sabado: " + a2Sabado);
      console.log("Index: " + sabadoTurnoY[sabadoTurnoX].index + " is " + sabadoTurnoY[sabadoTurnoX].text + " value " + sabadoTurnoY[sabadoTurnoX].value);
      console.log("[modplantilla][send] select turno: " + sabadoTurnoY[sabadoTurnoX].value + ", " + sabadoTurnoY[sabadoTurnoX].text);
      
      console.log("[modplantilla][send] domingoActivated: " + domingoActivated);
      console.log("[modplantilla][send] de1Domingo: " + de1Domingo);
      console.log("[modplantilla][send] a1Domingo: " + a1Domingo);
      console.log("[modplantilla][send] de2Domingo: " + de2Domingo);
      console.log("[modplantilla][send] a2Domingo: " + a2Domingo); 
      console.log("Index: " + domingoTurnoY[domingoTurnoX].index + " is " + domingoTurnoY[domingoTurnoX].text + " value " + domingoTurnoY[domingoTurnoX].value);
      console.log("[modplantilla][send] select turno: " + domingoTurnoY[domingoTurnoX].value + ", " + domingoTurnoY[domingoTurnoX].text); 

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

      } else if(
        $('#lunesActivated').prop("checked") &&
        (($('#de1Lunes').val()==$('#a1Lunes').val()) ||
        ($('#de2Lunes').val()==$('#a2Lunes').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día lunes.", "");
          functions.loadingEndWait();

      } else if($('#lunesActivated').prop("checked") && 
        lunesTurnoY[lunesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#lunesActivated').prop("checked") && 
        lunesTurnoY[lunesTurnoX].value==0 &&
        (
        compararFechas24(de1Lunes, a1Lunes)==1 ||
        compararFechas24(a1Lunes, de2Lunes)==1 ||
        compararFechas24(de2Lunes, a2Lunes)==1)
              ){
        console.log("Horario Nocturno");
        toastr["error"]("Llena correctamente los<br />horarios del día lunes.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
      ($('#de1Martes').val()=="" ||
      $('#a1Martes').val()=="" ||
      $('#de2Martes').val()=="" ||
      $('#a2Martes').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día martes.", "");
        functions.loadingEndWait();

      } else if(
        $('#martesActivated').prop("checked") &&
        (($('#de1Martes').val()==$('#a1Martes').val()) ||
        ($('#de2Martes').val()==$('#a2Martes').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día martes.", "");
          functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
          martesTurnoY[martesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#martesActivated').prop("checked") && 
        martesTurnoY[martesTurnoX].value==0 &&
        (
        compararFechas24(de1Martes, a1Martes)==1 ||
        compararFechas24(a1Martes, de2Martes)==1 ||
        compararFechas24(de2Martes, a2Martes)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día martes.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
      ($('#de1Miercoles').val()=="" ||
      $('#a1Miercoles').val()=="" ||
      $('#de2Miercoles').val()=="" ||
      $('#a2Miercoles').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día miercoles.", "");
        functions.loadingEndWait();

      } else if(
        $('#miercolesActivated').prop("checked") &&
        (($('#de1Miercoles').val()==$('#a1Miercoles').val()) ||
        ($('#de2Miercoles').val()==$('#a2Miercoles').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día miercoles.", "");
          functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
          miercolesTurnoY[miercolesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#miercolesActivated').prop("checked") && 
        miercolesTurnoY[miercolesTurnoX].value==0 &&
        (
        compararFechas24(de1Miercoles, a1Miercoles)==1 ||
        compararFechas24(a1Miercoles, de2Miercoles)==1 ||
        compararFechas24(de2Miercoles, a2Miercoles)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día miercoles.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
      ($('#de1Jueves').val()=="" ||
      $('#a1Jueves').val()=="" ||
      $('#de2Jueves').val()=="" ||
      $('#a2Jueves').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día jueves.", "");
        functions.loadingEndWait();

      } else if(
        $('#juevesActivated').prop("checked") &&
        (($('#de1Jueves').val()==$('#a1Jueves').val()) ||
        ($('#de2Jueves').val()==$('#a2Jueves').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día jueves.", "");
          functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
          juevesTurnoY[juevesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#juevesActivated').prop("checked") && 
        juevesTurnoY[juevesTurnoX].value==0 &&
        (
        compararFechas24(de1Jueves, a1Jueves)==1 ||
        compararFechas24(a1Jueves, de2Jueves)==1 ||
        compararFechas24(de2Jueves, a2Jueves)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día jueves.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
      ($('#de1Viernes').val()=="" ||
      $('#a1Viernes').val()=="" ||
      $('#de2Viernes').val()=="" ||
      $('#a2Viernes').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día viernes.", "");
        functions.loadingEndWait();

      } else if(
        $('#viernesActivated').prop("checked") &&
        (($('#de1Viernes').val()==$('#a1Viernes').val()) ||
        ($('#de2Viernes').val()==$('#a2Viernes').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día viernes.", "");
          functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
          viernesTurnoY[viernesTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#viernesActivated').prop("checked") && 
        viernesTurnoY[viernesTurnoX].value==0 &&
        (
        compararFechas24(de1Viernes, a1Viernes)==1 ||
        compararFechas24(a1Viernes, de2Viernes)==1 ||
        compararFechas24(de2Viernes, a2Viernes)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día viernes.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
      ($('#de1Sabado').val()=="" ||
      $('#a1Sabado').val()=="" ||
      $('#de2Sabado').val()=="" ||
      $('#a2Sabado').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día sábado.", "");
        functions.loadingEndWait();

      } else if(
        $('#sabadoActivated').prop("checked") &&
        (($('#de1Sabado').val()==$('#a1Sabado').val()) ||
        ($('#de2Sabado').val()==$('#a2Sabado').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día sábado.", "");
          functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
          sabadoTurnoY[sabadoTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#sabadoActivated').prop("checked") && 
        sabadoTurnoY[sabadoTurnoX].value==0 &&
        (
        compararFechas24(de1Sabado, a1Sabado)==1 ||
        compararFechas24(a1Sabado, de2Sabado)==1 ||
        compararFechas24(de2Sabado, a2Sabado)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día sábado.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
      ($('#de1Domingo').val()=="" ||
      $('#a1Domingo').val()=="" ||
      $('#de2Domingo').val()=="" ||
      $('#a2Domingo').val()=="")){

        toastr["error"]("Llena correctamente los<br />horarios del día domingo.", "");
        functions.loadingEndWait();

      } else if(
        $('#domingoActivated').prop("checked") &&
        (($('#de1Domingo').val()==$('#a1Domingo').val()) ||
        ($('#de2Domingo').val()==$('#a2Domingo').val()))){

          toastr["error"]("Llena correctamente los<br />horarios del día domingo.", "");
          functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
          domingoTurnoY[domingoTurnoX].value=="default"){

        toastr["error"]("Llena correctamente el<br />turno", "");
        functions.loadingEndWait();

      } else if($('#domingoActivated').prop("checked") && 
        domingoTurnoY[domingoTurnoX].value==0 &&
        (
        compararFechas24(de1Domingo, a1Domingo)==1 ||
        compararFechas24(a1Domingo, de2Domingo)==1 ||
        compararFechas24(de2Domingo, a2Domingo)==1)
              ){

        toastr["error"]("Llena correctamente los<br />horarios del día domingo.<br />Los horarios deben llevar<br /> lógica en sus horarios.", "");
        functions.loadingEndWait();

      } else {
          
        console.log("[agregar]");
      
        functions.modPlantilla(id_plantilla, nombrePlantilla, 
        lunesActivated, lunesTurnoY[lunesTurnoX].text, de1Lunes, a1Lunes, de2Lunes, a2Lunes,
        martesActivated, martesTurnoY[martesTurnoX].text, de1Martes, a1Martes, de2Martes, a2Martes,
        miercolesActivated, miercolesTurnoY[miercolesTurnoX].text, de1Miercoles, a1Miercoles, de2Miercoles, a2Miercoles,
        juevesActivated, juevesTurnoY[juevesTurnoX].text, de1Jueves, a1Jueves, de2Jueves, a2Jueves,
        viernesActivated, viernesTurnoY[viernesTurnoX].text, de1Viernes, a1Viernes, de2Viernes, a2Viernes,
        sabadoActivated, sabadoTurnoY[sabadoTurnoX].text, de1Sabado, a1Sabado, de2Sabado, a2Sabado,
        domingoActivated, domingoTurnoY[domingoTurnoX].text, de1Domingo, a1Domingo, de2Domingo, a2Domingo
        ).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modplantilla][postIngresar]");

              toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

              $window.location.href = "/configuraciones";


            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
            
        }, function (response) {
          //ERROR
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postPlantilla*/
      
      }//fin else

    }//fin send ng

    

    $scope.getIdPlantillasClick = function(id_plantillas){

      console.log("[getIdPlantillasClick] id_plantillas: " + id_plantillas);

      functions.getIdPlantillas(id_plantillas).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][modplantilla][getIdPlantillas]");

          console.log(response.data.data[0]);

          var data = response.data.data[0];

          $("#nombrePlantilla").val(data.nombrePlantilla);

          $("#lunesActivated").prop("checked", data.lunesActivated);
          if(data.lunesActivated==1){
            $('.lunesActivated').css("display","");
          }
          if(data.turnoLunes.toString().toLowerCase().indexOf("vespertino")!=-1){
            $("#lunesTurno").val(0);
            $('#lunesTurno').trigger('change');
          } else if(data.turnoLunes.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#lunesTurno").val(1);
            $('#lunesTurno').trigger('change');
          }
          $("#de1Lunes").val(data.de1Lunes);
          $("#a1Lunes").val(data.a1Lunes);
          $("#de2Lunes").val(data.de2Lunes);
          $("#a2Lunes").val(data.a2Lunes);

          $("#martesActivated").prop("checked", data.martesActivated);
          if(data.martesActivated==1){
            $('.martesActivated').css("display","");
          }
          if(data.turnoMartes.toString().toLowerCase().indexOf("vespertino")!=-1){
            console.log("entró");
            $("#martesTurno").val(0);
            $('#martesTurno').trigger('change');
          } else if(data.turnoMartes.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#martesTurno").val(1);
            $('#martesTurno').trigger('change');
          }
          $("#de1Martes").val(data.de1Martes);
          $("#a1Martes").val(data.a1Martes);
          $("#de2Martes").val(data.de2Martes);
          $("#a2Martes").val(data.a2Martes);

          $("#miercolesActivated").prop("checked", data.miercolesActivated);
          if(data.miercolesActivated==1){
            $('.miercolesActivated').css("display","");
          }
          if(data.turnoMiercoles.toString().toLowerCase().indexOf("vespertino")!=-1){
            console.log("entró");
            $("#miercolesTurno").val(0);
            $('#miercolesTurno').trigger('change');
          } else if(data.turnoMiercoles.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#miercolesTurno").val(1);
            $('#miercolesTurno').trigger('change');
          }
          $("#de1Miercoles").val(data.de1Miercoles);
          $("#a1Miercoles").val(data.a1Miercoles);
          $("#de2Miercoles").val(data.de2Miercoles);
          $("#a2Miercoles").val(data.a2Miercoles);

          $("#juevesActivated").prop("checked", data.juevesActivated);
          if(data.juevesActivated==1){
            $('.juevesActivated').css("display","");
          }
          if(data.turnoJueves.toString().toLowerCase().indexOf("vespertino")!=-1){
            console.log("entró");
            $("#juevesTurno").val(0);
            $('#juevesTurno').trigger('change');
          } else if(data.turnoJueves.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#juevesTurno").val(1);
            $('#juevesTurno').trigger('change');
          }
          $("#de1Jueves").val(data.de1Jueves);
          $("#a1Jueves").val(data.a1Jueves);
          $("#de2Jueves").val(data.de2Jueves);
          $("#a2Jueves").val(data.a2Jueves);

          $("#viernesActivated").prop("checked", data.viernesActivated);
          if(data.viernesActivated==1){
            $('.viernesActivated').css("display","");
          }
          console.log(data.turnoViernes.toString().toLowerCase().indexOf("vespertino"));
          if(data.turnoViernes.toString().toLowerCase().indexOf("vespertino")!=-1){
            console.log("entró");
            $("#viernesTurno").val(0);
            $('#viernesTurno').trigger('change');
          } else if(data.turnoViernes.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#viernesTurno").val(1);
            $('#viernesTurno').trigger('change');
          }
          $("#de1Viernes").val(data.de1Viernes);
          $("#a1Viernes").val(data.a1Viernes);
          $("#de2Viernes").val(data.de2Viernes);
          $("#a2Viernes").val(data.a2Viernes);

          $("#sabadoActivated").prop("checked", data.sabadoActivated);
          if(data.sabadoActivated==1){
            $('.sabadoActivated').css("display","");
          }
          if(data.turnoSabado.toString().toLowerCase().indexOf("vespertino")!=-1){
            console.log("entró");
            $("#sabadoTurno").val(0);
            $('#sabadoTurno').trigger('change');
          } else if(data.turnoSabado.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#sabadoTurno").val(1);
            $('#sabadoTurno').trigger('change');
          }
          $("#de1Sabado").val(data.de1Sabado);
          $("#a1Sabado").val(data.a1Sabado);
          $("#de2Sabado").val(data.de2Sabado);
          $("#a2Sabado").val(data.a2Sabado);

          $("#domingoActivated").prop("checked", data.domingoActivated);
          if(data.domingoActivated==1){
            $('.domingoActivated').css("display","");
          }
          if(data.turnoDomingo.toString().toLowerCase().indexOf("vespertino")!=-1){
            console.log("entró");
            $("#domingoTurno").val(0);
            $('#domingoTurno').trigger('change');
          } else if(data.turnoDomingo.toString().toLowerCase().indexOf("nocturno")!=-1){
            $("#domingoTurno").val(1);
            $('#domingoTurno').trigger('change');
          }
          $("#de1Domingo").val(data.de1Domingo);
          $("#a1Domingo").val(data.a1Domingo);
          $("#de2Domingo").val(data.de2Domingo);
          $("#a2Domingo").val(data.a2Domingo);

          

          functions.loadingEndWait();
          
        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getPlantillas*/

    }; //fin getIdPlantillasClick

    getIdPlantillasClick = $scope.getIdPlantillasClick

      
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[modplantilla] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modplantilla][getImageEmpresa]");

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


  });//fin controller modplantilla

  app.controller('configuraciones', function($scope, functions, $window) {

    console.log("[configuraciones]");

    functions.loading();

    $scope.postModIdiomaEmpresaClick = function(id_empresas, id_idiomas){

      console.log("[getZonasHorariasClick] ");
      console.log("[getZonasHorariasClick] id_empresas: " + id_empresas);
      console.log("[getZonasHorariasClick] id_idiomas: " + id_idiomas);

      functions.postModIdiomaEmpresa(id_empresas, id_idiomas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][postModIdiomaEmpresa]");

              console.log(response.data.data);

              toastr["success"]("Idioma Modificado Correctamente!.", "");

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postModIdiomaEmpresa*/

    }; //fin postModIdiomaEmpresaClick

    postModIdiomaEmpresaClick = $scope.postModIdiomaEmpresaClick;

    $scope.getAllIdiomasClick = function(id_empresas, id_idiomas){

      functions.getAllIdiomas(id_empresas).then(function (response) {

          if(response.data.success == "TRUE"){

            console.log("[configuraciones][getAllIdiomas]");

            console.log(response.data.data);

            $scope.idiomas2 = response.data.data;

            functions.getObtenerIdiomasByIdEmpresa(id_empresas).then(function (response) {

              if(response.data.success == "TRUE"){

                $scope.idiomas = $scope.idiomas2;
                
                $scope.$watch('idiomas', function() {
                  //cuando cargue en front los idiomas

                  console.log("Cargar idiomas Seleccionada");
                  
                  for(var i=0; i<$scope.idiomas.length; i++){
                    
                    if($scope.idiomas[i].id_idiomas==id_idiomas){
                      
                      console.log("Se encontró");
                      
                      //mejora
                      //hay que cambiar el id_idiomas desde el front php blade (configuraciones) con el id_idiomas actual modificado.
                      document.getElementById("single-label").selectedIndex = i+1;
                          
                    }
                  }

                });//fin watch

                functions.loadingEndWait();
                
              } else {

                  functions.loadingEndWait();
              }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

            });/*fin getObtenerIdiomasByIdEmpresa*/


          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getAllIdiomas*/

    };/*fin validarSubdominio*/

    getAllIdiomasClick = $scope.getAllIdiomasClick;

    var validarSubdominioBD = 0;
    
    $scope.validarSubdominio = function(subdominio){

      console.log("[controllers][configuraciones][validarSubdominio]");
      
      console.log("[controllers][configuraciones][validarSubdominio] subdominio: " + subdominio);
      
      functions.validarSubdominio(subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][configuraciones][validarSubdominio]");

          $(".fal.fa-check-circle.subdominio").css("display","");

          $(".fal.fa-times-circle.subdominio").css("display","none");

          functions.loadingEndWait();

          validarSubdominioBD = 1;
          
        } else {

          $(".fal.fa-check-circle.subdominio").css("display","none");

          $(".fal.fa-times-circle.subdominio").css("display","");

            functions.loadingEndWait();

            validarSubdominioBD = -1;
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin validarSubdominio*/

    };/*fin validarSubdominio*/

    validarSubdominio = $scope.validarSubdominio;


    $scope.delPlantillaClick = function(id_empresas, id_plantillas){

      console.log("[delPlantillaClick]");

      if(id_plantillas==""){

        toastr["error"]("Contactar al Administrador", "");

      } else {

        functions.delPlantilla(id_empresas, id_plantillas).then(function (response) {

          if(response.data.success == "TRUE"){
            
            console.log("[controllers][delPlantilla]");

            console.log(response.data.data);

            toastr["success"]("Salida Modificada Correctamente!.", "");

            functions.getPlantillas().then(function (response) {

              if(response.data.success == "TRUE"){
                
                console.log("[controllers][modTrabajadorClick][getPlantillas]");
        
                console.log(response.data.data);
        
                $scope.plantillas = response.data.data;
        
                console.log($scope.plantillas);
        
                var data = Array();
        
                var choices = Array();
                choices = ["id_plantillas", "nombrePlantilla"];
                
                data = addKeyToArray(data, response.data.data, choices);
        
                data = functions.plantillas(data, response.data.data);
        
                console.log(data);
        
                $('#plantillas').dataTable().fnClearTable();
                $('#plantillas').dataTable().fnAddData(data);
                
        
                functions.loadingEndWait();
                
              } else {
        
                  functions.loadingEndWait();
              }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();
        
            });/*fin getPlantillas*/
            
          } else {

              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin delSalidas*/
      }

    }; // fin delPlantillaClick

    delPlantillaClick = $scope.delPlantillaClick;


    $scope.delSalidaClick = function(id_empresas, id_salidas){

      console.log("[delSalidaClick]");

      if(id_salidas==""){

        toastr["error"]("Contactar al Administrador", "");

      } else {

        
        functions.delSalidas(id_empresas, id_salidas).then(function (response) {

          if(response.data.success == "TRUE"){
            
            console.log("[controllers][delSalidas]");

            console.log(response.data.data);

            toastr["success"]("Salida Modificada Correctamente!.", "");

            functions.getSalidas(id_empresas).then(function (response) {

              if(response.data.success == "TRUE"){
                
                console.log("[controllers][getSalidas]");

                console.log(response.data.data);

                var data = Array();

                var choices = Array();
                choices = ["id_salidas", "nombre"];
                
                data = addKeyToArray(data, response.data.data, choices);
        
                console.log(data);
        
                $('#dt-basic-example').dataTable().fnClearTable();
                $('#dt-basic-example').dataTable().fnAddData(data);

                functions.salidasSwitches(response.data.data);

                functions.loadingEndWait();
                
              } else {

                  functions.loadingEndWait();
              }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

            });/*fin getSalidas*/
            
          } else {

              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin delSalidas*/
      }

    }; // fin delSalidaClick

    delSalidaClick = $scope.delSalidaClick;

    $scope.changeComputableSalidaClick = function(id_empresas, id_salidas, nombre, computable){

      console.log("[changeComputableSalidaClick]");

      if(id_salidas==""){

        toastr["error"]("Contactar al Administrador", "");

      } else if(nombre==""){

        toastr["error"]("Agrega el Nombre de la Salida", "");

      } else if(computable===""){

        toastr["error"]("Agrega si el Valor es Computable", "");

      } else {

        
        functions.modSalidas(id_empresas, id_salidas, nombre, computable).then(function (response) {

          if(response.data.success == "TRUE"){
            
            console.log("[controllers][getSalidas]");

            console.log(response.data.data);

            toastr["success"]("Salida Modificada Correctamente!.", "");
            
          } else {

              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getSalidas*/
      
      }

    }; // fin changeComputableSalidaClick

    changeComputableSalidaClick = $scope.changeComputableSalidaClick;

    $scope.agregarSalidaClick = function(id_empresas){

      console.log("[agregarSalidaClick]");

      var nombre = "";
      var computable = 0;

      nombre = $("#nombreSalida").val();

      if(nombre==""){

        toastr["error"]("Agrega el Nombre de la Salida", "");

      } else {

        
        functions.postSalidas(id_empresas, nombre, computable).then(function (response) {

          if(response.data.success == "TRUE"){
            
            console.log("[controllers][getSalidas]");

            console.log(response.data.data);

            functions.getSalidas(id_empresas).then(function (response) {

              if(response.data.success == "TRUE"){
                
                console.log("[controllers][getSalidas]");
      
                console.log(response.data.data);

                toastr["success"]("Se Agregó Correctamente la Salida", "");
      
                var data = Array();
      
                var choices = Array();
                choices = ["id_salidas", "nombre"];
                
                data = addKeyToArray(data, response.data.data, choices);
        
                console.log(data);
        
                $('#dt-basic-example').dataTable().fnClearTable();
                $('#dt-basic-example').dataTable().fnAddData(data);
      
                functions.salidasSwitches(response.data.data);
      
                functions.loadingEndWait();
                
              } else {
      
                  functions.loadingEndWait();
              }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();
      
            });/*fin getSalidas*/
            
          } else {

              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getSalidas*/
      
      }

    }; // fin agregarSalidaClick

    $scope.getSalidasClick = function(id_empresas){
    
      functions.getSalidas(id_empresas).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][getSalidas]");

          console.log(response.data.data);

          var data = Array();

          var choices = Array();
          choices = ["id_salidas", "nombre"];
          
          data = addKeyToArray(data, response.data.data, choices);
  
          console.log(data);
  
          $('#dt-basic-example').dataTable().fnClearTable();
          $('#dt-basic-example').dataTable().fnAddData(data);

          functions.salidasSwitches(response.data.data);

          functions.loadingEndWait();
          
        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getSalidas*/

    };/*fin getSalidasClick*/

    getSalidasClick = $scope.getSalidasClick;

    $scope.dominioModEmpresa = function(id_empresas){
    
      console.log("[dominioModEmpresa]");
      console.log("[dominioModEmpresa] id_empresas: " + id_empresas);

      var dominio = $("#dominio").val();

      console.log("[dominioModEmpresa] dominio: " + dominio);
    
      functions.modEmpresaDominio(id_empresas, dominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][dominioModEmpresa][modEmpresaDominio]");
          toastr["success"]("Tu dominio estará listo hasta un máximo de 48 horas debido, a la propagación de DNS, mientras puedes entrar a tu nueva empresa agregando /"+subdominio, "");

          functions.loadingEndWait();
          
        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin modEmpresaDominio*/

    }

    $scope.subdominioModEmpresa = function(id_empresas){
    
      console.log("[subdominioModEmpresa]");
      console.log("[subdominioModEmpresa] id_empresas: " + id_empresas);

      var subdominio = $("#subdominio").val();

      console.log("[subdominioModEmpresa] subdominio: " + subdominio);
    
      functions.modEmpresaSubdominio(id_empresas, subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][subdominioModEmpresa][subdominioModEmpresa]");
          toastr["success"]("Tu subdominio estará listo hasta un máximo de 48 horas debido, a la propagación de DNS, mientras puedes entrar a tu nueva empresa agregando /"+subdominio, "");

          functions.loadingEndWait();
          
        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin modEmpresaSubdominio*/
      
    }
    
    $scope.getEmpresaClick = function(id_empresas){
    
      functions.getEmpresa(id_empresas).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][getEmpresa]");

          console.log(response.data.data);

          $("#dominio").val(response.data.data[0].dominio);

          $("#subdominio").val(response.data.data[0].subdominio);

          functions.loadingEndWait();
          
        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getEmpresa*/

    };/*fin getEmpresaClick*/
    
    functions.getPlantillas().then(function (response) {

      if(response.data.success == "TRUE"){
        
        console.log("[controllers][modTrabajadorClick][getPlantillas]");

        console.log(response.data.data);

        $scope.plantillas = response.data.data;

        console.log($scope.plantillas);

        var data = Array();

        var choices = Array();
        choices = ["id_plantillas", "nombrePlantilla"];
        
        data = addKeyToArray(data, response.data.data, choices);

        data = functions.plantillas(data, response.data.data);

        console.log(data);

        $('#plantillas').dataTable().fnClearTable();
        $('#plantillas').dataTable().fnAddData(data);
        

        functions.loadingEndWait();
        
      } else {

          functions.loadingEndWait();
      }
    }, function (response) {
      /*ERROR*/
      toastr["error"]("Inténtelo de nuevo más tarde", "");
      functions.loadingEndWait();

    });/*fin getPlantillas*/

    $scope.postZonaHorariaClick  = function(id_zona_horaria){

      console.log("[postZonasHorariasClick] ");

      functions.postZonasHorarias(id_zona_horaria).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][postZonasHorarias]");

              console.log(response.data.data);

              toastr["success"]("Información Actualizada Correctamente", "");

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postZonasHorarias*/

    }; //fin postZonasHorariasClick

    $scope.zonasHorarias = "";

    $scope.getZonasHorariasClick = function(id_zona_horaria){

      console.log("[getZonasHorariasClick] ");

      functions.getAllZonasHorarias().then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[configuraciones][getZonasHorariasClick]");

              console.log(response.data.data);

              $scope.zonasHorarias = response.data.data;

              $scope.$watch('zonasHorarias', function() {
                //cuando cargue en front las plantillas

                console.log("Cargar zonasHorarias Seleccionada");
                
                for(var i=0; i<$scope.zonasHorarias.length; i++){
                  if($scope.zonasHorarias[i].id_zonas_horarias==id_zona_horaria){
                    console.log("encontramos");
                    
                    //mejora
                    //hay que cambiar el id_zonashorarias desde el front php blade (configuraciones) con el id_zonashorarias actual modificado.
                    document.getElementById("single-default").selectedIndex = i+1;
                    
                  }
                }

              });//fin watch

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getAllZonasHorarias*/

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

  app.controller('modtrabajador', function($scope, functions, $window, $filter) {

    console.log("[modtrabajador]");

    functions.loading();

    $scope.modTrabajadorClick = function(id_trabajadores, id_empresas_parameter){

      console.log("[modTrabajadorClick]");

      
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
      var tmpPass = "";

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
      pass = $("#confPass").val();
      tmpPass = $("#tmpPass").val();

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
      console.log("[agregarNuevoTrabajadorClick] tmpPass: " + tmpPass);

        
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
      } else if(geoActivated==1 && address==""){
        toastr["error"]("Agregar la dirección de Geolocalización", "");

      } else if(ipActivated==1 && ipAddress==""){
        toastr["error"]("Agregar la dirección IP correctamente", "");

      } else {

        functions.postModTrabajador(id_trabajadores, id_empresas, nombre, apellido, correo, tel, cel, cargo, numDNI, numSS, 
          plantilla, geoActivated, address, latitud, longitud, metros, registroApp, 
          ipActivated, ipAddress, pcActivated, tabletasActivated, 
          movilesActivated, pass, tmpPass).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modTrabajadorClick][perfilEmpresas]");

              console.log(response.data.data);
              toastr["success"]("Información enviada Exitosamente", "");
              window.location = "/trabajadores";


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

    }; //fin modTrabajadorClick

    $scope.getTrabajadoresByIdTrabajadoresClick = function(id_trabajadores){

      functions.getTrabajadoresByIdTrabajadores(id_trabajadores).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[getTrabajadoresByIdTrabajadoresClick][getTrabajadoresByIdTrabajadores]");

            console.log(response.data.data);

            var data = response.data.data;

            functions.getPlantillas().then(function (response) {

              if(response.data.success == "TRUE"){
                
                console.log("[controllers][modTrabajadorClick][getPlantillas]");
        
                console.log(response.data);
        
                $scope.plantillas = response.data.data;

                console.log($scope.plantillas);

                

                $scope.$watch('plantillas', function() {
                  //cuando cargue en front las plantillas

                  console.log("Cargar Plantilla Seleccionada");
                  
                  for(var i=0; i<$scope.plantillas.length; i++){
                    if($scope.plantillas[i].id_plantillas==data[0].id_plantillas){
                      console.log("entcontramos");
                      document.getElementById("select-plantilla").selectedIndex = i+1;
                    }
                  }

                });
    
                $("#nombre").val(data[0].nombre);
                $("#apellido").val(data[0].apellido);
                $("#correo").val(data[0].correo);
                $("#tel").val(data[0].telefono_fijo);
                $("#cel").val(data[0].celular);
                $("#cargo").val(data[0].cargo);
                $("#numDNI").val(data[0].dni_num);
                $("#numSS").val(data[0].seguro_social);

                $("#geoActivated").prop("checked", data[0].geo_activated);

                if(data[0].geo_activated==1){
                  $("#showGeo").css("display","");
                }

                $("#pac-input").val(data[0].direccion);
                $("#pac-input2").val(data[0].direccion);
                $("#deAddressCalle").val(data[0].direccion);
                $scope.latitud = data[0].latitud;
                $scope.longitud = data[0].longitud;

                $("#metros").data("ionRangeSlider").update({
                  from: data[0].metros //your new value
                });

                $("#registroApp").prop("checked", data[0].app_geo_activated);
                $("#ipActivated").prop("checked", data[0].ip_activated);
                $("#ipAddress").val(data[0].ip);

                if(data[0].ip_activated==1){
                  $("#showIp").css("display","");
                }
                
                $("#pcActivated").prop("checked", data[0].pc_activated);
                $("#tabletasActivated").prop("checked", data[0].tablet_activated);
                $("#movilesActivated").prop("checked", data[0].mobile_activated);
                
                $("#pass").val(data[0].pass);
                $("#confPass").val(data[0].pass);
                $("#tmpPass").val(data[0].pass);
                

                functions.loadingEndWait();
                
              } else {
        
                  functions.loadingEndWait();
              }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();
        
            });/*fin getPlantillas*/

            
          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getTrabajadoresByIdTrabajadores*/

    }; //fin getTrabajadoresByIdTrabajadoresClick


    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[signinEmpresas] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modtrabajador][perfilEmpresas]");

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

  });//fin controller modtrabajador

  app.controller('trabajadores', function($scope, functions, $window, $filter) {

    console.log("[trabajadores]");

    functions.loading();

    $scope.delTrabajadoresByIdEmpresaClick = function(id_trabajadores, id_empresas){

      functions.delTrabajadoresByIdEmpresa(id_trabajadores, id_empresas).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[trabajadores][delTrabajadoresByIdEmpresaClick][delTrabajadoresByIdEmpresa]");

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
            console.log("[trabajadores][agregarNuevoTrabajadorClick][perfilEmpresas]");

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
              console.log("[trabajadores][perfilEmpresas]");

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
      plantilla = selectPlantillaY[selectPlantillaX].value;

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
              console.log("[nuevotrabajador][agregarNuevoTrabajadorClick][perfilEmpresas]");

              console.log(response.data.data);
              toastr["success"]("Información enviada Exitosamente", "");
              window.location = "/trabajadores";


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
              console.log("[nuevotrabajador][perfilEmpresas]");

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

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    var theme = $("#mytheme").attr("href").split("cust-theme-");
    theme = theme[1].split(".css");

    var color = theme[0];

    var validarSubdominioBD = 0;

    $scope.color = (colorClicked) => {
      console.log("[nuevoempresa][altaEmpresa] " + colorClicked);

      color = colorClicked;

    }

    $scope.getPublicIpClick = function(){

      console.log("[controllers][nuevoempresa][getPublicIpClick]");
      
      functions.getPublicIp(subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][nuevoempresa][getPublicIp]");

          $("#ip").html(response.data.ip);
          $("#apuntarIp").css("display","");

          functions.loadingEndWait();

        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin validarSubdominio*/
      
    };
    
    getPublicIp = $scope.getPublicIpClick;

    $scope.validarSubdominio = function(subdominio){

      console.log("[controllers][nuevoempresa][validarSubdominio]");
      
      console.log("[controllers][nuevoempresa][validarSubdominio] subdominio: " + subdominio);
      
      functions.validarSubdominio(subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][nuevoempresa][validarSubdominio]");

          $(".fal.fa-check-circle.subdominio").css("display","");

          $(".fal.fa-times-circle.subdominio").css("display","none");

          functions.loadingEndWait();

          validarSubdominioBD = 1;
          
        } else {

          $(".fal.fa-check-circle.subdominio").css("display","none");

          $(".fal.fa-times-circle.subdominio").css("display","");

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
      var dominio = "";
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
      dominio = $("#dominio").val();
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
      console.log("[nuevoempresa][altaEmpresa] dominio: " + dominio);
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

        functions.altaEmpresa(nombreEmpresa, nombreSolicitante, correoElectronico, telefonoFijo, celular, datepicker, empleadosPermitidos, activa, dominio, subdominio, contrasena, color).then(function (response) {

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
      
      }// fin else
      
    }//altaEmpresa


  });//fin controller nuevoempresa

  

  app.controller('modempresa', function($scope, functions, $window) {

    console.log("[modempresa]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    var theme = $("#mytheme").attr("href").split("cust-theme-");
    theme = theme[1].split(".css");

    var color = theme[0];

    $scope.color = (colorClicked) => {
      console.log("[modempresa][altaEmpresa] " + colorClicked);

      color = colorClicked;

    }

    var validarSubdominioBD = 0;
    
    $scope.validarSubdominio = function(subdominio, id_empresa){

      console.log("[controllers][configuraciones][validarSubdominio]");
      
      console.log("[controllers][configuraciones][validarSubdominio] subdominio: " + subdominio);
      
      functions.validarSubdominio(subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][configuraciones][validarSubdominio]");

          $(".fal.fa-check-circle.subdominio").css("display","");

          $(".fal.fa-times-circle.subdominio").css("display","none");

          functions.loadingEndWait();

          
          validarSubdominioBD = 1;
        
          
        } else {

          console.log("id_empresa: " + id_empresa);

          functions.loadingEndWait();

          
          validarSubdominioBD = -1;

          $(".fal.fa-check-circle.subdominio").css("display","none");

          $(".fal.fa-times-circle.subdominio").css("display","");

          //nunca va a tener dos subdominios con el mismo nombre al mismo tiempo
          if(response.data.data[0].id_empresas!=undefined && response.data.data[0].id_empresas==id_empresa){

            console.log("Id empresas: " + response.data.data[0].id_empresas);

            validarSubdominioBD = 1;
            

            $(".fal.fa-check-circle.subdominio").css("display","");

            $(".fal.fa-times-circle.subdominio").css("display","none");
          
          }

        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin validarSubdominio*/

    };/*fin validarSubdominio*/

    validarSubdominio = $scope.validarSubdominio;

    $scope.getEmpresaClick = function(id_empresas){

      console.log("[getEmpresa] ");

      console.log("id_empresas: " + id_empresas);

      functions.getEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modempresa][getEmpresa]");

              console.log(response.data.data);

              $("#nombreEmpresa").val(response.data.data[0].nombre_empresa);
              $("#nombreSolicitante").val(response.data.data[0].nombre_solicitante);
              $("#correoElectronico").val(response.data.data[0].correo);
              $("#telefonoFijo").val(response.data.data[0].telefono_fijo);
              $("#celular").val(response.data.data[0].celular);
              $("#datepicker").val(response.data.data[0].vigencia);
              $("#empleadosPermitidos").val(response.data.data[0].empleados_permitidos);
              $("#contrasena").val(response.data.data[0].pass);
              $("#valContrasena").val(response.data.data[0].pass);
              $("#tmpPass").val(response.data.data[0].pass);

              if(response.data.data[0].activo == 1){

                console.log("Checked True Activo");
                $("#gra-0").prop('checked', true);

              } else {

                console.log("Checked False Activo");

                $("#gra-0").prop('checked', false);

              }
              $("#dominio").val(response.data.data[0].dominio);
              $("#subdominio").val(response.data.data[0].subdominio);
              $("#contrasena").val(response.data.data[0].pass);
              $("#valContrasena").val(response.data.data[0].pass);

              validarSubdominioBD = 1;


            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getEmpresa*/

    }; //fin getEmpresaClick

    getEmpresa = $scope.getEmpresaClick;

    $scope.getPublicIpClick = function(){

      console.log("[controllers][nuevoempresa][getPublicIpClick]");
      
      functions.getPublicIp(subdominio).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][nuevoempresa][getPublicIp]");

          $("#ip").html(response.data.ip);
          $("#apuntarIp").css("display","");

          functions.loadingEndWait();

        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin validarSubdominio*/
      
    };
    
    getPublicIp = $scope.getPublicIpClick;

    $scope.modEmpresa = function(id_empresas){

      console.log("[nuevoempresa][modEmpresa]");

      functions.loadingWait();

      var nombreEmpresa = "";
      var nombreSolicitante = "";
      var correoElectronico = "";
      var telefonoFijo = "";
      var celular = "";
      var datepicker = ""; //vigencia
      var empleadosPermitidos = "";
      var activa = ""; //gra-0 cuenta activa/desactiva
      var dominio = "";
      var subdominio = "";
      var contrasena = "";
      var valContrasena = "";
      var tmpPass = "";
      color = color;

      nombreEmpresa = $("#nombreEmpresa").val();
      nombreSolicitante = $("#nombreSolicitante").val();
      correoElectronico = $("#correoElectronico").val();
      telefonoFijo = $("#telefonoFijo").val();
      celular = $("#celular").val();
      datepicker = $("#datepicker").val();
      empleadosPermitidos = $("#empleadosPermitidos").val();
      activa = $("#gra-0").prop('checked');
      dominio = $("#dominio").val();
      subdominio = $("#subdominio").val();
      contrasena = $("#contrasena").val();
      valContrasena = $("#valContrasena").val();
      tmpPass = $("#tmpPass").val();
      color = color;

      
      console.log("[nuevoempresa][modEmpresa] id_empresas: " + id_empresas);
      console.log("[nuevoempresa][modEmpresa] nombreEmpresa: " + nombreEmpresa);
      console.log("[nuevoempresa][modEmpresa] nombreSolicitante: " + nombreSolicitante);
      console.log("[nuevoempresa][modEmpresa] correoElectronico: " + correoElectronico);
      console.log("[nuevoempresa][modEmpresa] telefonoFijo: " + telefonoFijo);
      console.log("[nuevoempresa][modEmpresa] celular: " + celular);
      console.log("[nuevoempresa][modEmpresa] datepicker: " + datepicker);
      console.log("[nuevoempresa][modEmpresa] empleadosPermitidos: " + empleadosPermitidos);
      console.log("[nuevoempresa][modEmpresa] activa: " + activa);
      console.log("[nuevoempresa][modEmpresa] dominio: " + dominio);
      console.log("[nuevoempresa][modEmpresa] subdominio: " + subdominio);
      console.log("[nuevoempresa][modEmpresa] contrasena: " + contrasena);
      console.log("[nuevoempresa][modEmpresa] valContrasena: " + valContrasena);
      console.log("[nuevoempresa][modEmpresa] tmpPass: " + tmpPass);
      console.log("[nuevoempresa][modEmpresa] color: " + color);

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

        functions.modEmpresa(id_empresas, nombreEmpresa, nombreSolicitante, correoElectronico, telefonoFijo, celular, datepicker, empleadosPermitidos, activa, dominio, subdominio, tmpPass, contrasena, color).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[nuevoempresa][modEmpresa]");

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
      
      }// fin else
      
    }//modEmpresa


  });//fin controller modempresa

  app.controller('modificarsalida', function($scope, functions, $window) {

    console.log("[modificarsalida]");

    functions.loading();

    $scope.modificarSalida = function(id_empresas, id_salidas, nombre, computable){

      console.log("[modificarSalida] ");

      var nombre = "";
      var computable = "";

      nombre = $("#nombreSalida").val();
      computable = $("#descanzoActivated").prop("checked");

      console.log("nombre: " + nombre);
      console.log("computable: " + computable);

      functions.modSalidas(id_empresas, id_salidas, nombre, computable).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modificarsalida][modSalidas]");

              console.log(response.data.data);

              window.location = "";

              toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin modSalidas*/

    }; //fin modificarSalida

    modificarSalida = $scope.modificarSalida;

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[modificarsalida] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[modificarsalida][getImageEmpresa]");

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

    $scope.getSalidaByIdClick = function(id_salidas){

      console.log("[getSalidaByIdClick]");

      
      console.log("[getSalidaByIdClick] id_salidas: " + id_salidas);

      functions.getSalidaById(id_salidas).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][getSalidas]");

          console.log(response.data.data);

          $("#nombreSalida").val(response.data.data[0].nombre);
          $("#descanzoActivated").prop("checked", response.data.data[0].computable);

          functions.loadingEndWait();
          
        } else {

            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getSalidaById*/

    }; //fin getSalidaByIdClick

    getSalidaByIdClick = $scope.getSalidaByIdClick;



  });//fin controller modificarSalida


  app.controller('modIdioma', function($scope, functions, $window) {

    console.log("[modIdioma]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    $scope.modificarIdiomaClick = function(id){

      console.log("[modificarIdiomaClick]");
      
      var nombreIdioma = $("#nombreIdioma").val();
      //$("#codigo").val();
      var contenido = $("#contenido").val();

      console.log("[modificarIdiomaClick] id: " + id);
      console.log("[modificarIdiomaClick] nombreIdioma: " + nombreIdioma);
      console.log("[modificarIdiomaClick] contenido: " + contenido);

      functions.modificarIdioma(id, nombreIdioma, contenido).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][modificarIdiomaClick]");
          
          console.log(response.data.data);

          window.location = "/idiomas";

          functions.loadingEndWait();
          
        } else {

            toastr["error"](response.data.description, "");
            functions.loadingEndWait();
        }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin postModificarIdioma*/

    }; //fin modificarIdiomaClick

    modificarIdiomaClick = $scope.modificarIdiomaClick;

    $scope.getIdiomaByIdClick = function(id){

      console.log("[getIdiomaByIdClick]");

      console.log("[getIdiomaByIdClick] id: " + id);

      functions.getIdiomaById(id).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][agregarIdioma]");
          
          console.log(response.data.data);

          $("#nombreIdioma").val(response.data.data[0].nombre);
          $("#codigo").val(response.data.data[0].code);
          $("#contenido").val(response.data.data[0].contenido);

          functions.loadingEndWait();
          
        } else {

            toastr["error"](response.data.description, "");
            functions.loadingEndWait();
        }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin agregarIdioma*/

    }; //fin agregarIdiomaClick

    getIdiomaByIdClick = $scope.getIdiomaByIdClick;
    

  });//fin controller modIdioma

  app.controller('nuevoIdioma', function($scope, functions, $window) {

    console.log("[nuevoIdioma]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    $scope.agregarIdiomaClick = function(){

      console.log("[agregarIdiomaClick]");

      var nombre = "";
      var codigo = "";

      nombre = $("#nombreIdioma").val();
      codigo = $("#codigo").val();

      console.log("[idiomas] Nombre: " + nombre);
      console.log("[idiomas] Código: " + codigo);

      functions.agregarIdioma(nombre, codigo).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][agregarIdioma]");
          
          console.log(response.data.data);

          toastr["success"]("Se ha agregado Correctamente.", "");

          window.location = "/idiomas";

          functions.loadingEndWait();
          
        } else {

            toastr["error"](response.data.description, "");
            functions.loadingEndWait();
        }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin agregarIdioma*/

    }; //fin agregarIdiomaClick

    agregarIdiomaClick = $scope.agregarIdiomaClick;

  });//fin controller nuevoIdioma

  app.controller('idiomas', function($scope, functions, $window) {

    console.log("[idiomas]");

    functions.loading();

    $(".profile-image").attr("src","img/conecta6_blanco.png");

    functions.getAllIdiomas().then(function (response) {

        if(response.data.success == "TRUE"){

          console.log("[idiomas][getAllIdiomas]");

          console.log(response.data.data);

          var data = Array();

          var choices = Array();
          choices = ["id_idiomas", "nombre", "code"];
          
          data = addKeyToArray(data, response.data.data, choices);
          
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

    });/*fin getAllIdiomas*/

    $scope.eliminarIdiomaClick = function(id){

      console.log("[agregarIdiomaClick]");

      console.log("[idiomas] id: " + id);

      functions.eliminarIdioma(id).then(function (response) {

        if(response.data.success == "TRUE"){
          
          console.log("[controllers][eliminarIdioma]");
          
          console.log(response.data.data);

          toastr["success"]("Se ha eliminado Correctamente.", "");

          window.location = "/idiomas";

          functions.loadingEndWait();
          
        } else {

            toastr["error"](response.data.data.description, "");
            functions.loadingEndWait();
        }

      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin agregarIdioma*/

    }; //fin agregarIdiomaClick

    eliminarIdiomaClick = $scope.eliminarIdiomaClick;

  });//fin controller idiomas

  app.controller('consultaDeInformes', function($scope, functions, $window) {

    console.log("[consultaDeInformes]");

    functions.loading();

    

    $scope.getZonaHorariaFrontClick = function(id_empresas, start, end){

      functions.loading();

      console.log("[consultaDeInformes] ");

      console.log("id_empresas: " + id_empresas);

      functions.getZonaHoraria(id_empresas).then(function (response) {

        if(response.data.success == "TRUE"){

          console.log("[consultaDeInformes][getZonaHoraria]");

          console.log(response.data.data);

          start = new Date(moment().subtract(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
          end = new Date(moment().add(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));

          $('#datepicker-2').daterangepicker({
            timePicker: false,
            startDate: start,
            endDate: end,
            locale:
            { format: 'YYYY-MM-DD'
            }
          });

            
          functions.getImageEmpresa(id_empresas).then(function (response) {

              if(response.data.success == "TRUE"){
                console.log("[consultaDeInformes][perfilEmpresas]");

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
          
        } else {
            toastr["warning"](response.data.description, "");
            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getZonaHoraria*/

    }; //fin getZonaHorariaFrontClick

    getZonaHorariaFront = $scope.getZonaHorariaFrontClick;

    $scope.getTrabajadoresAndStatsClick = function(id_empresas, start, end){

      functions.loading();

      console.log("[consultaDeInformes] ");

      console.log("id_empresas: " + id_empresas);

      functions.getZonaHoraria(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){

              console.log("[consultaDeInformes][getZonaHoraria]");

              console.log(response.data.data);
              
              console.log("Start: " + start);
              console.log("End: " + end);

              var fecha = new Date( moment().tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));

              start2 = start;
              end2 = end;

              start = new Date(moment(start).format('YYYY-MM-DD HH:mm:ss'));
              //start.setHours(0,0,0);
              end = new Date(moment(end).format('YYYY-MM-DD HH:mm:ss'));
              //end.setHours(23,59,59);

              console.log("Start: " + start);
              console.log("End: " + end);

              functions.getTrabajadoresByIdEmpresa(id_empresas).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[consultaDeInformes][getTrabajadoresByIdEmpresa]");

                  console.log(response.data.data);

                  var trabajadores = response.data.data;

                  functions.getHistorialEntradasByIdEmpresas(id_empresas, start2 + " 00:00:00", end2 + " 23:59:59").then(function (response) {

                    if(response.data.success == "TRUE"){
                      console.log("[consultaDeInformes][getHistorialEntradas]");

                      //no es requerido llenar el tipo con el tipo de salida ya que en nombre ya lo puedes
                      //response.data.data = functions.completarTiposDeSalidasArray(response.data.data);

                      registros = response.data.data;

                      console.log("Registros");
                      console.log(registros);

                      var registros_divididos = functions.dividirArrayPorIdTrabajadores(registros);

                      console.log("Registros Divididos");
                      console.log(registros_divididos);

                      functions.getPlantillas().then(function (response) {

                        if(response.data.success == "TRUE"){
                          
                          console.log("[controllers][modTrabajadorClick][getPlantillas]");

                          plantillas = response.data.data;

                          /* Faltas y No Faltas */

                          console.log("faltas y no faltas");

                          var imputuales = functions.filtrarSoloEntradasPorIntervalo(start, end, registros);

                          var imputuales_divididos = functions.dividirArrayPorIdTrabajadores(imputuales);

                          var array = functions.impuntualesPuntualesConSusAsistencias(plantillas, imputuales_divididos);

                          var impuntuales = array["impuntuales"].sort(function(a, b) {
                            return (b.impuntualidad - a.impuntualidad);
                          });
                          
                          var puntuales = array["puntuales"].sort(function(a, b) {
                            return (b.puntuales - a.puntuales);
                          });

                          console.log("impuntuales: ");

                          console.log(impuntuales);

                          console.log("puntuales: ");

                          console.log(puntuales);

                          console.log("asistencias: ");

                          var asistencias = array["asistencias"];

                          console.log(array["asistencias"]);

                          console.log("faltasNoFaltasConSusAsistenciasIntervalos: ");

                          var array = functions.faltasNoFaltasConSusAsistenciasIntervalos(plantillas, imputuales_divididos, start, end);

                          var faltas = array["faltas"].sort(function(a, b) {
                            return (b.faltas - a.faltas);
                          });
                          
                          var nofaltas = array["noFaltas"].sort(function(a, b) {
                            return (b.noFaltas - a.noFaltas);
                          });

                          console.log(array);

                          console.log("faltas: ");

                          console.log(faltas);

                          console.log("No faltas: ");

                          console.log(nofaltas);

                          var noLaborales = array["noLaborales"];

                          for(var i=0; i<trabajadores.length; i++){

                            for(var x=0; x<plantillas.length; x++){
                              if(trabajadores[i].id_plantillas==plantillas[x].id_plantillas){
                                break;
                              }
                            }

                            console.log(plantillas[x]);

                            if(registros_divididos[trabajadores[i].id_trabajadores]!=null){

                              console.log(trabajadores[i].id_trabajadores);

                              console.log(registros_divididos[trabajadores[i].id_trabajadores]);

                              registros = orderFechaAsc(registros_divididos[trabajadores[i].id_trabajadores]);
                            
                            } else {

                              registros = [];

                            }

                              var fecha = end;
                              
                              console.log(fecha);

                              /* Hors Trabajadas y Hors Extras */

                              var statIntervalosHrsTrabajadas = functions.statIntervalosHrsTrabajadas(start, end, registros);

                              var statHrsPlantilla = functions.statHorasPlantilla(plantillas[x]);
                              
                              var statMesHorsExtra = functions.statIntervalosHorsExtra(statHrsPlantilla, statIntervalosHrsTrabajadas, start, end);

                              console.log(statMesHorsExtra);

                              trabajadores[i].faltas = 0;
                              trabajadores[i].noFaltas = 0;
                              trabajadores[i].puntualidades = 0;
                              trabajadores[i].impuntualidades = 0;
                              trabajadores[i].descanzosTotales = statIntervalosHrsTrabajadas["salidas"]["descanzosTotales"];
                              trabajadores[i].asistenciasT = 0;
                              trabajadores[i].asistenciasFuera = 0;
                              trabajadores[i].asistenciasDentro = 0;
                              trabajadores[i].noLaborales = 0;
                              trabajadores[i].totalHorasTrabajadas = statIntervalosHrsTrabajadas["horas"] + " hrs con " + statIntervalosHrsTrabajadas["minutos"] + " Min y " + statIntervalosHrsTrabajadas["segundos"] + " Segundos.";
                              trabajadores[i].horasExtras = statMesHorsExtra["horas"] + " hrs con " + statMesHorsExtra["minutos"] + " Min y " + statMesHorsExtra["segundos"] + " Segundos.";
                              trabajadores[i].salidas = "";
                              var x=0;
                              for (var key in statIntervalosHrsTrabajadas["salidas"]["nombres"]){
                                trabajadores[i].salidas = trabajadores[i].salidas + "" + key + " : " + statIntervalosHrsTrabajadas["salidas"]["nombres"][key] + ", ";
                                x++;
                              }
                              if(x==0){
                                trabajadores[i].salidas = 0;
                              }
                              for (var key in faltas){
                                if(faltas[key].id_trabajadores==trabajadores[i].id_trabajadores){
                                  trabajadores[i].faltas = faltas[key].faltas;
                                  trabajadores[i].asistenciasFuera = faltas[key].asistencias;
                                }
                              }
                              for (var key in nofaltas){
                                if(nofaltas[key].id_trabajadores==trabajadores[i].id_trabajadores){
                                  trabajadores[i].asistenciasDentro = nofaltas[key].noFaltas;
                                  trabajadores[i].asistenciasFuera = nofaltas[key].asistencias;
                                }
                              }
                              for (var key in asistencias){
                                if(asistencias[key].id_trabajadores==trabajadores[i].id_trabajadores){
                                  console.log();
                                  trabajadores[i].asistenciasT = asistencias[key].asistencias;
                                }
                              }
                              for (var key in impuntuales){
                                if(impuntuales[key].id_trabajadores==trabajadores[i].id_trabajadores){
                                  trabajadores[i].impuntualidades = impuntuales[key].impuntualidad;
                                }
                              }
                              for (var key in puntuales){
                                if(puntuales[key].id_trabajadores==trabajadores[i].id_trabajadores){
                                  trabajadores[i].puntualidades = puntuales[key].puntualidad;
                                }
                              }
                              for (var key in noLaborales){
                                if(noLaborales[key].id_trabajadores==trabajadores[i].id_trabajadores){
                                  trabajadores[i].noLaborales = noLaborales[key].noLaborales;
                                }
                              }

                          } //fin for

                          var data = Array();

                          var choices = Array();
                          choices = ["id_trabajadores", "nombre", "apellido", "totalHorasTrabajadas", "faltas", "horasExtras", "descanzosTotales", "salidas", "asistenciasT", "asistenciasFuera", "asistenciasDentro", "puntualidades", "impuntualidades", "noLaborales"];
                          
                          data = addKeyToArray(data, trabajadores, choices);
                
                          console.log(data);
                          
                          $('#dt-basic-example').dataTable().fnClearTable();
                          $('#dt-basic-example').dataTable().fnAddData(data); 

                        

                          functions.loadingEndWait();
                          
                        } else {

                            functions.loadingEndWait();
                        }
                      }, function (response) {
                        /*ERROR*/
                        toastr["error"]("Inténtelo de nuevo más tarde", "");
                        functions.loadingEndWait();

                      });/*fin getPlantillas*/
                      
                      functions.loadingEndWait();
                      
                    } else {

                        //no hay registros, pero igual se debe de colocar en ceros los registros y mostrar la información
                        //de los usuarios, al igual que condicionar cuando terminen los ciclos para mostrar la información aquí.

                        toastr["success"]("No hay Registros en esos Intervalos", "");
                        
                        $('#dt-basic-example').dataTable().fnClearTable();
                        functions.loadingEndWait();
                    }
                  }, function (response) {
                    /*ERROR*/
                    toastr["error"]("Inténtelo de nuevo más tarde", "");
                    functions.loadingEndWait();

                  });/*fin getHistorialEntradas*/
        
                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
              }, function (response) {
                //ERROR
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

              });//fin getTrabajadoresByIdEmpresa

              
                 
              functions.getImageEmpresa(id_empresas).then(function (response) {

                  if(response.data.success == "TRUE"){
                    console.log("[consultaDeInformes][perfilEmpresas]");

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
              
            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin getZonaHoraria*/

    }; //fin getZonaHorariaFrontClick

    getTrabajadoresAndStats = $scope.getTrabajadoresAndStatsClick;

  });//fin controller consultaDeInformes

  app.controller('administradores', function($scope, functions, $window) {

    console.log("[administradores]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");
    
    $scope.getAllAdministradoresClick = function(){

      functions.getAllAdministradores().then(function (response) {

        if(response.data.success == "TRUE"){
          console.log("[administradores][getAdministradoresByIdAdmin]");

          console.log(response.data.data);

          var data = Array();

          var choices = Array();
          choices = ["id_administradores", "nombre", "apellido", "correo", "telefono_fijo"];
          
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

      });/*fin getAllAdministradores*/

    }; //fin getAllAdministradoresClick

    getAllAdministradores = $scope.getAllAdministradoresClick;
    
    $scope.eliminarAdministradorClick = function(id_administradores){
  
        console.log(id_administradores);
  
        functions.eliminarAdministrador(id_administradores).then(function (response) {
  
          if(response.data.success == "TRUE"){
            console.log("[administradores][getAdministradoresByIdAdmin]");
  
            console.log(response.data.data);

            
            toastr["success"]("Se borro el registro satisfactoriamente.", "");
            
            functions.getAllAdministradores().then(function (response) {

              if(response.data.success == "TRUE"){
                console.log("[administradores][getAdministradoresByIdAdmin]");

                console.log(response.data.data);

                var data = Array();

                var choices = Array();
                choices = ["id_administradores", "nombre", "apellido", "correo", "telefono_fijo"];
                
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

            });/*fin getAllAdministradores*/
  
  
          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();
  
        });/*fin eliminarAdministrador*/

    }; //fin eliminarAdministradorClick

    eliminarAdministrador = $scope.eliminarAdministradorClick;

  });//fin controller administradores

  app.controller('nuevoadministrador', function($scope, functions, $window) {

    console.log("[nuevoadministrador]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    
    $scope.altaAdministradoresClick = function(){
      console.log("[nuevoempresa][altaAdministradoresClick]");

      functions.loadingWait();

      var nombre = "";
      var apellido = "";
      var correoElectronico = "";
      var telefonoFijo = "";
      var celular = "";
      var contrasena = "";
      var valContrasena = "";

      nombre = $("#nombre").val();
      apellido = $("#apellido").val();
      correoElectronico = $("#correo").val();
      telefonoFijo = $("#telefono_fijo").val();
      celular = $("#celular").val();
      contrasena = $("#contrasena").val();
      valContrasena = $("#valContrasena").val();

      console.log("[nuevoadministrador][altaAdministradoresClick] nombre: " + nombre);
      console.log("[nuevoadministrador][altaAdministradoresClick] apellido: " + apellido);
      console.log("[nuevoadministrador][altaAdministradoresClick] correoElectronico: " + correoElectronico);
      console.log("[nuevoadministrador][altaAdministradoresClick] telefonoFijo: " + telefonoFijo);
      console.log("[nuevoadministrador][altaAdministradoresClick] celular: " + celular);
      console.log("[nuevoadministrador][altaAdministradoresClick] contrasena: " + contrasena);
      console.log("[nuevoadministrador][altaAdministradoresClick] valContrasena: " + valContrasena);

      if(nombre==""){
        toastr["error"]("Llena correctamente<br /> el nombre.", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(apellido==""){
        toastr["error"]("Llena correctamente<br /> el apellido", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(correoElectronico.indexOf("@")=="-1" || correoElectronico.indexOf(".")=="-1" || correoElectronico.indexOf(" ")!="-1" || correoElectronico.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(telefonoFijo=="" || celular=="" || contrasena=="" || valContrasena==""){
        toastr["error"]("Llena correctamente<br /> todos los campos", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(valContrasena!=contrasena){
        toastr["error"]("Contraseñas no<br /> coinciden", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
        
      } else {

        functions.postAltaAdministradores(nombre, apellido, correoElectronico, telefonoFijo, celular, contrasena).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[nuevoempresa][altaEmpresa]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");
                  functions.loadingEndWait();
                  
                  $window.location.href = "/administradores";

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

        });/*fin postSubscriber*/
      
      }// fin else
      
    }//altaEmpresa

    altaAdministradores = $scope.altaAdministradoresClick;


  });//fin controller administradores

  app.controller('modAdministrador', function($scope, functions, $window) {

    console.log("[modAdministrador]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    
    
    $scope.getAdministradoresClick = function(id_administradores){

      functions.getAdministradores(id_administradores).then(function (response) {

        if(response.data.success == "TRUE"){
          console.log("[administradores][getAdministradores]");

          console.log(response.data.data);

          $scope.administrador = response.data.data[0];


        } else {
            toastr["warning"](response.data.description, "");
            functions.loadingEndWait();
        }
      }, function (response) {
        /*ERROR*/
        toastr["error"]("Inténtelo de nuevo más tarde", "");
        functions.loadingEndWait();

      });/*fin getAdministradores*/

    }; //fin getAdministradoresClick

    getAdministradores = $scope.getAdministradoresClick;

    
    $scope.modificarAdministradoresClick = function(id_administradores){
      console.log("[nuevoempresa][modificarAdministradoresClick]");

      console.log("id_administradores: "+ id_administradores);

      functions.loadingWait();

      var nombre = "";
      var apellido = "";
      var correoElectronico = "";
      var telefonoFijo = "";
      var celular = "";
      var contrasena = "";
      var valContrasena = "";
      var tmpPass = "";

      nombre = $("#nombre").val();
      apellido = $("#apellido").val();
      correoElectronico = $("#correo").val();
      telefonoFijo = $("#telefono_fijo").val();
      celular = $("#celular").val();
      contrasena = $("#contrasena").val();
      valContrasena = $("#valContrasena").val();
      tmpPass = $("#tmpPass").val();

      console.log("[nuevoadministrador][modificarAdministradoresClick] nombre: " + nombre);
      console.log("[nuevoadministrador][modificarAdministradoresClick] apellido: " + apellido);
      console.log("[nuevoadministrador][modificarAdministradoresClick] correoElectronico: " + correoElectronico);
      console.log("[nuevoadministrador][modificarAdministradoresClick] telefonoFijo: " + telefonoFijo);
      console.log("[nuevoadministrador][modificarAdministradoresClick] celular: " + celular);
      console.log("[nuevoadministrador][modificarAdministradoresClick] contrasena: " + contrasena);
      console.log("[nuevoadministrador][modificarAdministradoresClick] valContrasena: " + valContrasena);
      console.log("[nuevoadministrador][modificarAdministradoresClick] tmp_pass: " + $("#tmpPass").val());

      if(nombre==""){
        toastr["error"]("Llena correctamente<br /> el nombre.", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(apellido==""){
        toastr["error"]("Llena correctamente<br /> el apellido", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(correoElectronico.indexOf("@")=="-1" || correoElectronico.indexOf(".")=="-1" || correoElectronico.indexOf(" ")!="-1" || correoElectronico.indexOf(",")!="-1"){
        toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(telefonoFijo=="" || celular=="" || contrasena=="" || valContrasena==""){
        toastr["error"]("Llena correctamente<br /> todos los campos", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
      } else if(valContrasena!=contrasena){
        toastr["error"]("Contraseñas no<br /> coinciden", "");
        functions.loadingEndWait();
        $("#agregar").effect( "shake" );
        
      } else {

        functions.postModificarAdministradores(id_administradores, nombre, apellido, correoElectronico, telefonoFijo, celular, contrasena, tmpPass).then(function (response) {

                if(response.data.success == "TRUE"){
                  console.log("[nuevoempresa][altaEmpresa]");

                  toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");
                  functions.loadingEndWait();
                  
                  $window.location.href = "/administradores";

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function (response) {
              /*ERROR*/
              toastr["error"]("Inténtelo de nuevo más tarde", "");
              functions.loadingEndWait();

        });/*fin postSubscriber*/
      
      }// fin else
      
    }//modificarAdministradoresClick

    modificarAdministradores = $scope.modificarAdministradoresClick;


  });//fin controller modAdministrador

  app.controller('perfilTrabajadoresPass', function($scope, functions, $window) {

    console.log("[perfilTrabajadoresPass]");

    functions.loading();

    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[getImageEmpresaClick] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[perfilTrabajadoresPass][getImageEmpresaClick]");

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

    
    $scope.postContChangeClick = function(pass, id_trabajadores){

      var contActual = "";
      var contNueva = "";
      var contConf = "";

      contActual = $("#contActual").val();
      contNueva = $("#contNueva").val();
      contConf = $("#contConf").val();

      console.log("Pass: " + pass);
      console.log("id_trabajadores: " + id_trabajadores);

      console.log("contActual: " + contActual);
      console.log("contActual SHA256: " + SHA256(contActual));
      console.log("contNueva: " + contNueva);
      console.log("contConf: " + contConf);

      if(SHA256(contActual)!=pass){
        
        toastr["error"]("Error: la contraseña actual<br />no coincide", "");

      } else if(contNueva=="" || contConf==""){
        
        toastr["error"]("Los campos de contraseña están<br />vacíos", "");

      } else if(contNueva!=contConf){
        
        toastr["error"]("Error: las contraseñas no<br />coinciden", "");

      } else {

        functions.postContChange(id_trabajadores, contNueva, "trabajadores").then(function (response) {

              if(response.data.success == "TRUE"){
                console.log("[postContChange][perfilEmpresas]");

                console.log(response.data.data);

                toastr["success"]("Se ha cambiado la contraseña con<br /> éxito.", "");

                window.location = "/perfilTrabajadores";

              } else {
                  toastr["warning"](response.data.description, "");
                  functions.loadingEndWait();
              }
          }, function (response) {
            /*ERROR*/
            toastr["error"]("Inténtelo de nuevo más tarde", "");
            functions.loadingEndWait();

        });/*fin postContChange*/

      }

    }; //fin postContChangeClick


  });//fin controller perfilTrabajadoresPass

  app.controller('perfilEmpresasPass', function($scope, functions, $window) {

    console.log("[perfilEmpresasPass]");

    functions.loading();

    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[getImageEmpresaClick] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[perfilEmpresasPass][getImageEmpresaClick]");

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

    
    $scope.postContChangeClick = function(pass, id_empresas){

      var contActual = "";
      var contNueva = "";
      var contConf = "";

      contActual = $("#contActual").val();
      contNueva = $("#contNueva").val();
      contConf = $("#contConf").val();

      console.log("Pass: " + pass);
      console.log("id_empresas: " + id_empresas);

      console.log("contActual: " + contActual);
      console.log("contActual SHA256: " + SHA256(contActual));
      console.log("contNueva: " + contNueva);
      console.log("contConf: " + contConf);

      if(SHA256(contActual)!=pass){
        
        toastr["error"]("Error: la contraseña actual<br />no coincide", "");

      } else if(contNueva=="" || contConf==""){
        
        toastr["error"]("Los campos de contraseña están<br />vacíos", "");

      } else if(contNueva!=contConf){
        
        toastr["error"]("Error: las contraseñas no<br />coinciden", "");

      } else {

        functions.postContChange(id_empresas, contNueva, "empresas").then(function (response) {

              if(response.data.success == "TRUE"){
                console.log("[postContChange][perfilEmpresas]");

                console.log(response.data.data);

                toastr["success"]("Se ha cambiado la contraseña con<br /> éxito.", "");

                window.location = "/perfilEmpresas";

              } else {
                  toastr["warning"](response.data.description, "");
                  functions.loadingEndWait();
              }
          }, function (response) {
            /*ERROR*/
            toastr["error"]("Inténtelo de nuevo más tarde", "");
            functions.loadingEndWait();

        });/*fin postContChange*/

      }

    }; //fin postContChangeClick


  });//fin controller perfilEmpresasPass

  app.controller('perfilAdministradoresPass', function($scope, functions, $window) {

    console.log("[perfilAdministradoresPass]");

    functions.loading();

    $(".profile-image").attr("src","../img/conecta6_blanco.png");

    $scope.postContChangeClick = function(pass, id_administradores){

      var contActual = "";
      var contNueva = "";
      var contConf = "";

      contActual = $("#contActual").val();
      contNueva = $("#contNueva").val();
      contConf = $("#contConf").val();

      console.log("Pass: " + pass);
      console.log("id_administradores: " + id_administradores);

      console.log("contActual: " + contActual);
      console.log("contActual SHA256: " + SHA256(contActual));
      console.log("contNueva: " + contNueva);
      console.log("contConf: " + contConf);

      if(SHA256(contActual)!=pass){
        
        toastr["error"]("Error: la contraseña actual<br />no coincide", "");

      } else if(contNueva=="" || contConf==""){
        
        toastr["error"]("Los campos de contraseña están<br />vacíos", "");

      } else if(contNueva!=contConf){
        
        toastr["error"]("Error: las contraseñas no<br />coinciden", "");

      } else {

        functions.postContChange(id_administradores, contNueva, "administradores").then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[postContChange][perfilAdministradoresPass]");

            console.log(response.data.data);

            toastr["success"]("Se ha cambiado la contraseña con<br /> éxito.", "");

            window.location = "/perfilAdministradores";

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postContChange*/


      }

    }; //fin postContChangeClick


  });//fin controller perfilAdministradoresPass
  
  app.controller('recuperarTrabajadores', function($scope, functions, $window) {

    console.log("[recuperarTrabajadores]");

    functions.loading();

    $("body").css("background-image","url('../img/texture.png')");

    $scope.postRecuperarClick = function(){

      var correo = "";

      correo = $("#correo").val();

      console.log("correo: " + correo);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        
        toastr["error"]("Error: la contraseña actual<br />no coincide", "");

      } else {

        functions.postRecuperar("trabajadores", correo).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[postRecuperar][recuperarTrabajadores]");

            console.log(response.data.data);

            toastr["success"](response.data.description, "");

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postContChange*/


      }

    }; //fin postContChangeClick

    postRecuperarClick = $scope.postRecuperarClick;

    
    
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


  });//fin controller recuperarTrabajadores
  
  app.controller('recuperarEmpresas', function($scope, functions, $window) {

    console.log("[recuperarEmpresas]");

    functions.loading();

    $("body").css("background-image","url('../../img/texture.png')");

    $scope.postRecuperarClick = function(){

      var correo = "";

      correo = $("#correo").val();

      console.log("correo: " + correo);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        
        toastr["error"]("Error: la contraseña actual<br />no coincide", "");

      } else {

        functions.postRecuperar("empresas", correo).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[postRecuperar][recuperarEmpresas]");

            console.log(response.data.data);

            toastr["success"](response.data.description, "");

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postContChange*/


      }

    }; //fin postContChangeClick

    postRecuperarClick = $scope.postRecuperarClick;
    
    $scope.getImageEmpresaClick = function(id_empresas){

      console.log("[getImageEmpresaClick] ");

      functions.getImageEmpresa(id_empresas).then(function (response) {

            if(response.data.success == "TRUE"){
              console.log("[getImageEmpresaClick][getImageEmpresa]");

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


  });//fin controller recuperarEmpresas

  app.controller('recuperarAdministradores', function($scope, functions, $window) {

    console.log("[recuperarAdministradores]");

    functions.loading();

    $("body").css("background-image","url('../../img/texture.png')");

    $scope.postRecuperarClick = function(){

      var correo = "";

      correo = $("#correo").val();

      console.log("correo: " + correo);

      if(correo.indexOf("@")=="-1" || correo.indexOf(".")=="-1" || correo.indexOf(" ")!="-1" || correo.indexOf(",")!="-1"){
        
        toastr["error"]("Error: la contraseña actual<br />no coincide", "");

      } else {

        functions.postRecuperar("administradores", correo).then(function (response) {

          if(response.data.success == "TRUE"){
            console.log("[postRecuperar][recuperarAdministradores]");

            console.log(response.data.data);

            toastr["success"](response.data.description, "");

          } else {
              toastr["warning"](response.data.description, "");
              functions.loadingEndWait();
          }
        }, function (response) {
          /*ERROR*/
          toastr["error"]("Inténtelo de nuevo más tarde", "");
          functions.loadingEndWait();

        });/*fin postContChange*/


      }

    }; //fin postContChangeClick

    postRecuperarClick = $scope.postRecuperarClick;
    
  });//fin controller recuperarAdministradores

  return;

}).call(this);
