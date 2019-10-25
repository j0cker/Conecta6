(function() {
  app.factory('functions', function($http, $window) {
    return {
      loading: function() {
        console.log("[factory.js] loading");

        $('#loader-wrapper').css('display',''); 
        $window.onload = function(e) {
          //your magic here
          $('#loader-wrapper').css('display','none');
        }

        setTimeout(function() {
          $('#loader-wrapper').css('display','none');
        }, 4000);
      },
      loadingWait: function() {
        console.log("[factory.js] loading");

        $('#loader-wrapper').css('display','');
      },
      loadingEndWait: function() {
        console.log("[factory.js] loading");

        $('#loader-wrapper').css('display','none');
      },
      loadingWaitTime: function(x) {
        console.log("[factory.js] loading");

        $('#loader-wrapper').css('display','');
        setTimeout(function() {
          $('#loader-wrapper').css('display','none');
        }, x);
      },
      porcentajeActividadTrabajadores: function(trabajadoresTotales, entradasYSalidas, fecha){

        console.log("[porcentajeActividadTrabajadores]");
        console.log(fecha);

        console.log(trabajadoresTotales);
        console.log(entradasYSalidas);

        var trabajadores = Array();
        trabajadores["totales"] = trabajadoresTotales;
        trabajadores["activos"] = 0;

        
        var phora = fecha.getHours(),
            pminutos = fecha.getMinutes(),
            psegundos = fecha.getSeconds(),
            pdiaSemana = fecha.getDay(),
            pdia = fecha.getDate(),
            pmes = fecha.getMonth(),
            panio = fecha.getFullYear(),
            pampm;

        for (var key in entradasYSalidas){

          if (entradasYSalidas[key][0] !== undefined) {
              
            console.log(entradasYSalidas[key][0]);

            fechaRegistro =  new Date(entradasYSalidas[key][0].fecha);

            var rhora = fechaRegistro.getHours(),
                rminutos = fechaRegistro.getMinutes(),
                rsegundos = fechaRegistro.getSeconds(),
                rdiaSemana = fechaRegistro.getDay(),
                rdia = fechaRegistro.getDate(),
                rmes = fechaRegistro.getMonth(),
                ranio = fechaRegistro.getFullYear(),
                rampm;

            var fechaRestar = panio + "-" + pmes + "-" + pdia; 
            var fechaRestar2 = ranio + "-" + rmes + "-" + rdia; 

            console.log(fechaRestar);
            console.log(fechaRestar2);

            console.log(restaFechas3(fechaRestar, fechaRestar2))

            if(Math.abs(restaFechas3(fechaRestar, fechaRestar2)) <7){
              trabajadores["activos"] = parseInt(trabajadores["activos"]) + 1;
            }

          }//fin if undefined

        }//fin for

        trabajadores["conActividad"] = (trabajadores["activos"]*100)/(trabajadores["totales"]);
        trabajadores["noActivos"] = trabajadores["totales"] - trabajadores["activos"];
        trabajadores["sinActividad"] = (trabajadores["noActivos"]*100)/(trabajadores["totales"]);

        return trabajadores;

      },
      ordernarPorFechaArrayKey: function(arrayKeys){
        var arrayDivididoOrdered = Array();

        for (var key in arrayKeys){
          if(arrayDivididoOrdered[""+key+""] == undefined){
            arrayDivididoOrdered[""+key+""] = Array();
          }
          arrayDivididoOrdered[""+key+""] = orderFechaDesc(arrayKeys[key]);
        }
        return arrayDivididoOrdered;
      },
      dividirArrayPorCampoDinamico: function(entradasySalidas, campo){

        console.log("[factory][dividirArrayPorCampoDinamico]");

        console.log("Entrada:");

        console.log(entradasySalidas);

        var arrayDividido = Array();

        for(var i=0; i<entradasySalidas.length; i++){
          if(arrayDividido[""+entradasySalidas[i][campo]] == undefined){
            arrayDividido[""+entradasySalidas[i][campo]] = Array();
          }
          
          if(arrayDividido[""+entradasySalidas[i][campo]].length<1){
            arrayDividido[""+entradasySalidas[i][campo]].push(entradasySalidas[i]);
          }
          
        }

        return arrayDividido;

      },
      dividirArrayPorIdTrabajadores: function(entradasySalidas){

        var arrayDividido = Array();

        for(var i=0; i<entradasySalidas.length; i++){
          if(arrayDividido[""+entradasySalidas[i].id_trabajadores+""] == undefined){
            arrayDividido[""+entradasySalidas[i].id_trabajadores+""] = Array();
          }
          
          arrayDividido[""+entradasySalidas[i].id_trabajadores+""].push(entradasySalidas[i]);
          
        }


        return arrayDividido;
      },
      vigencias: function(fecha, hoy){
        console.log("[factory.js][vigencias]");

        for (var x = 0; x < data.length; x++) {

          $("#gra-"+(x+1)+"").prop("checked", data[x].computable);

        }

      },
      salidasSwitches: function(data) {
        console.log("[factory.js][salidasSwitches]");

        
        for (var x = 0; x < data.length; x++) {

          $("#gra-"+(data[x].id_salidas)+"").prop("checked", data[x].computable);

        }

      },
      empresasSwitches: function(data) {
        console.log("[factory.js][empresasSwitches]");

        for (var x = 0; x < data.length; x++) {

          $("#gra-"+(data[x].id_empresas)+"").prop("checked", data[x].activo);

        }

      },
      empresasActividad: function(historialCampoDinamico, totalEmpresas, fecha){

        console.log("[factory][empresasActividad]");

        var empresas = Array();
        empresas["empresasConActividad"] = 0;
        empresas["empresasSinActividad"] = 0;

        var hora = fecha.getHours(),
        minutos = fecha.getMinutes(),
        segundos = fecha.getSeconds(),
        diaSemana = fecha.getDay(),
        dia = fecha.getDate(),
        mes = fecha.getMonth(),
        anio = fecha.getFullYear(),
        ampm;

        var inactivos = 0;
        var activos = 0;

        for (var key in historialCampoDinamico){

          if(historialCampoDinamico[""+key+""] != undefined){
            console.log("Key: " + key + " Fecha: " + historialCampoDinamico[""+key+""][0].fecha);

            var fecha2 = historialCampoDinamico[""+key+""][0].fecha;

            fecha2 = new Date(moment(fecha2).format('YYYY-MM-DD HH:mm:ss'));

            var ahora = fecha2.getHours(),
                aminutos = fecha2.getMinutes(),
                asegundos = fecha2.getSeconds(),
                adiaSemana = fecha2.getDay(),
                adia = fecha2.getDate(),
                ames = fecha2.getMonth(),
                aanio = fecha2.getFullYear(),
                aampm;

              
            var fechaRestarHoy = anio + "-" + mes + "-" + dia; 
            var fechaRestarRegistro = aanio + "-" + ames + "-" + adia; 

            console.log(fechaRestarHoy);
            console.log(fechaRestarRegistro);

            //fechaRestarRegistro = "2019-9-10"

            console.log("Fechas resta en días:" + (restaFechas3(fechaRestarHoy, fechaRestarRegistro)+1));

            if(restaFechas3(fechaRestarHoy, fechaRestarRegistro)+1<-6){
              inactivos++;
            } else {
              activos++;
            }

          }

        }

        if((inactivos+activos)!=totalEmpresas){
          inactivos = Math.abs(inactivos + (activos-totalEmpresas));
        }

        console.log("Inactivos: " + inactivos + " Activos: " + activos);

        empresas["empresasConActividad"] = activos;
        empresas["empresasSinActividad"] = inactivos;

        empresas["empresasConActividadPorcentaje"] = (empresas["empresasConActividad"]*100)/totalEmpresas;
        empresas["empresasSinActividadPorcentaje"] = (empresas["empresasSinActividad"]*100)/totalEmpresas;

        return empresas;

      },
      PlanesVencidosVigenciasCalc: function(data) {
        console.log("[factory.js][PlanesVencidosVigenciasCalc]");

        console.log(data);  
        
        var dataArray = Array();
        dataArray["vigentes"] = 0;
        dataArray["noVigentes"] = 0;
        dataArray["proxVencer"] = 0;

        for (var x = 0; x < data.length; x++) {

          var today = replaceAll(generarFechaHoy2(), "/", "-");
          var fecha = replaceAll(data[x].vigencia, "/", "-");

          console.log("[factory.js][PlanesVencidosVigenciasCalc] " + generarFechaHoy2() + " restar " + data[x].vigencia);

          console.log(restaFechas2(today, fecha));

          if(restaFechas2(today, fecha)>30){

            dataArray["vigentes"] = parseInt(dataArray["vigentes"]) + 1;

          } else if(restaFechas2(today, fecha)>0) {

            dataArray["proxVencer"] = parseInt(dataArray["proxVencer"]) + 1;

          } else {

            dataArray["noVigentes"] = parseInt(dataArray["noVigentes"]) + 1;
          }

        }
        
        return dataArray;

      },
      fechasRestarArray: function(data) {
        console.log("[factory.js][fechasRestarArray]");

        console.log(data);

        for (var x = 0; x < data.length; x++) {

          var today = replaceAll(generarFechaHoy(), "/", "-");
          var fecha = replaceAll(data[x][4], "/", "-");

          data[x][4] = restaFechas2(today, fecha);

        }
        
        return data;

      },
      completarTiposDeSalidasArray: function(data) {
        console.log("[factory.js][completarTiposDeSalidasArray]");

        console.log(data);

        for (var x = 0; x < data.length; x++) {

          //data[x][10] = data[x][10] + data[x][9];


          if(data[x]['nombre'] != null){
            data[x]['tipo'] = data[x]['nombre'].toLowerCase();
          }

        }
        
        return data;

      },
      plantillas: function(data, array) {
        /*
        display datatable
        */
        console.log("[factory.js][plantillas]");

        console.log("array: " + array.length);
        console.log("data: " + data.length);

        for (var x = 0; x < array.length; x++) {

          console.log("x: " + x);

          var lunes = "";
          if(array[x]["a1Lunes"]!=""){
            lunes = "de " + array[x]["de1Lunes"] + " a " +  array[x]["a1Lunes"] + " y de " +  array[x]["de2Lunes"] + " a " +  array[x]["a2Lunes"];
          } else {
            lunes = "-";
          }
          data[x].push(lunes);

          var martes = "";
          if(array[x]["a1Martes"]!=""){
            martes = "de " + array[x]["de1Martes"] + " a " +  array[x]["a1Martes"] + " y de " +  array[x]["de2Martes"] + " a " +  array[x]["a2Martes"];
          } else {
            martes = "-";
          }
          data[x].push(martes);

          var miercoles = "";
          if(array[x]["a1Miercoles"]!=""){
            miercoles = "de " + array[x]["de1Miercoles"] + " a " +  array[x]["a1Miercoles"] + " y de " +  array[x]["de2Miercoles"] + " a " +  array[x]["a2Miercoles"];
          } else {
            miercoles = "-";
          }
          data[x].push(miercoles);

          var jueves = "";
          if(array[x]["a1Jueves"]!=""){
            jueves = "de " + array[x]["de1Jueves"] + " a " +  array[x]["a1Jueves"] + " y de " +  array[x]["de2Jueves"] + " a " +  array[x]["a2Jueves"];
          } else {
            jueves = "-";
          }
          data[x].push(jueves);

          var viernes = "";
          if(array[x]["a1Viernes"]!=""){
            viernes = "de " + array[x]["de1Viernes"] + " a " +  array[x]["a1Viernes"] + " y de " +  array[x]["de2Viernes"] + " a " +  array[x]["a2Viernes"];
          } else {
            viernes = "-";
          }
          data[x].push(viernes);

          var sabado = "";
          if(array[x]["a1Sabado"]!=""){
            sabado = "de " + array[x]["de1Sabado"] + " a " +  array[x]["a1Sabado"] + " y de " +  array[x]["de2Sabado"] + " a " +  array[x]["a2Sabado"];
          } else {
            sabado = "-";
          }
          data[x].push(sabado);

          var domingo = "";
          if(array[x]["a1Domingo"]!=""){
            domingo = "de " + array[x]["de1Domingo"] + " a " +  array[x]["a1Domingo"] + " y de " +  array[x]["de2Domingo"] + " a " +  array[x]["a2Domingo"];
          } else {
            domingo = "-";
          }
          data[x].push(domingo);


        }

        return data;

      },
      getIdiomaById: function(id){

        console.log("[factory][postIngresar]");

        console.log("id: " + id);

        var url = '/api/pAdmin/idiomas/obtenerById';
        return $http.get(url,{
          params: { cache: false, id:id },
          cache: false
        });

      },
      agregarIdioma: function(nombre, codigo){

        console.log("[factory][agregarIdioma]");

        var url = '/api/pAdmin/idiomas/agregar';

        return $http.post(url, {cache: false, nombre:nombre, codigo:codigo });

      },
      eliminarIdioma: function(id){

        console.log("[factory][eliminarIdioma]");

        var url = '/api/pAdmin/idiomas/eliminar';

        return $http.post(url, {cache: false, id:id });

      },
      delPlantilla: function(id_plantillas) {

        console.log("[factory][delPlantilla]");

        var url = '/api/empresas/plantilla/borrar';
        return $http.post(url, {cache: false, id_plantillas:id_plantillas });

      },
      postIngresar: function(correo, contPass, color, colorHex, subdominio) {

        console.log("[factory][postIngresar]");

        console.log("correo: " + correo + " contPass: " + contPass + " color: " + color + " colorHex: " + colorHex + " subdominio: " + subdominio);

        var url = '/api/trabajadores/ingresar';
        return $http.get(url,{
          params: { cache: false, correo:correo, contPass:contPass, color:color,  colorHex:colorHex, subdominio:subdominio },
          cache: false
        });

      },
      postLogout: function() {

        console.log("[factory][postLogout]");

        var url = '/api/trabajadores/logout';
		  	return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      generarGraficaEmpresas: function(empresas, fecha){
        /*
        Últimos 30 días
        */

        console.log("[factory][generarGraficaEmpresas]");

        console.log(fecha);

        var dataArray = Array();
        var mes = Array();
                
        var hhora = fecha.getHours(),
            hminutos = fecha.getMinutes(),
            hsegundos = fecha.getSeconds(),
            hdiaSemana = fecha.getDay(),
            hdia = fecha.getDate(),
            hmes = fecha.getMonth(),
            hanio = fecha.getFullYear(),
            hampm;

        console.log("hmes: " + hmes + "  hanio: " + hanio);

        console.log(diasEnUnMes(hmes+1, hanio));

        console.log(empresas);

        //inicializa arreglo con ceros
        for(var i=1; i<=diasEnUnMes(hmes+1, hanio); i++){
            mes[i-1] = 0;
        }

        //calcular cuales empresas entraron en el mes actual
        for(var x=0; x<empresas.length; x++){

          var fecha2 = empresas[x].created_at;

          var fecha2 = new Date(moment(fecha2).format('YYYY-MM-DD HH:mm:ss'));

          console.log("Created_at: " + fecha2);
                
          var rhora = fecha2.getHours(),
              rminutos = fecha2.getMinutes(),
              rsegundos = fecha2.getSeconds(),
              rdiaSemana = fecha2.getDay(),
              rdia = fecha2.getDate(),
              rmes = fecha2.getMonth(),
              ranio = fecha2.getFullYear(),
              rampm;

          console.log("rdia: " + rdia + " rmes:  " + rmes + " ranio: " + ranio);

          for(var i=1; i<=diasEnUnMes(hmes+1, hanio); i++){

            if(parseInt(i)==parseInt(rdia) && 
                parseInt(hmes)==parseInt(rmes) && 
                parseInt(hanio)==parseInt(ranio)){
              
              mes[i-1] = parseInt(mes[i-1]) + 1;

            } else {

              mes[i-1] = parseInt(mes[i-1]);

            }

          }

          console.log(mes);
          
          var ticksFechas = Array();
          var dataValores = Array();

          for(var i=1; i<=diasEnUnMes(hmes+1, hanio); i++){

            dataValores[i-1] = Array();
            dataValores[i-1][0] = i;
            dataValores[i-1][1] = mes[i-1];

            if(i%2==0){

              ticksFechas[i-1] = Array();
              ticksFechas[i-1][0] = i;
              ticksFechas[i-1][1] = i + "-" + hmes + "-" + hanio + "";

            }

          }

        }

        console.log(dataValores);
        console.log(ticksFechas);
        
       var flotVisit = $.plot('#flotVisit', [
        /*
        {   
            data: [
                [3, 0],
                [4, 1],
                [5, 3],
                [6, 3],
                [7, 10],
                [8, 11],
                [9, 12],
                [10, 9],
                [11, 12],
                [12, 8],
                [13, 5]
            ],
            color: myapp_get_color.success_200
        },*/
        {
            data: dataValores,
            color: myapp_get_color.info_200
        }],
        {
            series:
            {
                shadowSize: 0,
                lines:
                {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor:
                    {
                        colors: [
                        {
                            opacity: 0
                        },
                        {
                            opacity: 0.12
                        }]
                    }
                }
            },
            grid:
            {
                borderWidth: 0
            },
            yaxis:
            {
                min: 0,
                max: 15,
                tickColor: '#ddd',
                ticks: [
                    [0, '0'],
                    [5, '5'],
                    [10, '10'],
                    [15, '15']
                ],
                font:
                {
                    color: '#444',
                    size: 10
                }
            },
            xaxis:
            {

                tickColor: '#eee',
                ticks: ticksFechas,
                font:
                {
                    color: '#999',
                    size: 9
                }
            }
        });

      },
      statGraphic: function(statMesEntradasYSalidas){
        
                      

                      /* TAB 1: UPDATING CHART (Gráfica Grande) */
                      
                      //set data
                      var res = [];
                      var x = 0;

                      
                      for(var i=0; i<statMesEntradasYSalidas.length; i++){
                        console.log("[factory][statGraphic] i: " + i + " Entradas y Salidas: " + statMesEntradasYSalidas[i]);
                        res.push([i,statMesEntradasYSalidas[i]]);
                        if(statMesEntradasYSalidas[i]>x){
                          x=statMesEntradasYSalidas[i];
                        }
                      }

                      // setup plot
                      var options = {
                          colors: [myapp_get_color.primary_700],
                          series:
                          {
                              lines:
                              {
                                  show: true,
                                  lineWidth: 0.5,
                                  fill: 0.9,
                                  fillColor:
                                  {
                                      colors: [
                                      {
                                          opacity: 0.6
                                      },
                                      {
                                          opacity: 0
                                      }]
                                  },
                              },

                              shadowSize: 0 // Drawing is faster without shadows
                          },
                          grid:
                          {
                              borderColor: '#F0F0F0',
                              borderWidth: 1,
                              labelMargin: 5
                          },
                          xaxis:
                          {
                              color: '#F0F0F0',
                              font:
                              {
                                  size: 10,
                                  color: '#999'
                              }
                          },
                          yaxis:
                          {
                              min: 0,
                              max: 10,
                              color: '#F0F0F0',
                              font:
                              {
                                  size: 10,
                                  color: '#999'
                              }
                          }
                      };
                      var plot = $.plot($("#updating-chart"), [res], options);
                      /* FIN TAB 1: UPDATING CHART (Gráfica Grande) */
      },
      faltasNoFaltasConSusAsistenciasIntervalos: function(plantillas, registros, fechaini, fechafin){
        
        /*
          Éste código es mejor que el de mes
          Este es Ciclado sin condiciones raras
        */

        console.log("[factory][faltasNoFaltasConSusAsistenciasIntervalos]");

        console.log(plantillas);

        console.log(registros);

        var array = Array();
        array["faltas"] = Array();
        array["noFaltas"] = Array();
        array["asistencias"] = Array();
        array["noLaborales"] = Array();

        fechaini = new Date(moment(fechaini).format('YYYY-MM-DD HH:mm:ss'));

        var inihora = fechaini.getHours(),
            iniminutos = fechaini.getMinutes(),
            inisegundos = fechaini.getSeconds(),
            inidiaSemana = fechaini.getDay(),
            inidia = fechaini.getDate(),
            inimes = fechaini.getMonth(),
            inianio = fechaini.getFullYear(),
            iniampm;

        console.log(fechaini);

        fechafin = new Date(moment(fechafin).format('YYYY-MM-DD HH:mm:ss'));

        var finhora = fechafin.getHours(),
            finminutos = fechafin.getMinutes(),
            finsegundos = fechafin.getSeconds(),
            findiaSemana = fechafin.getDay(),
            findia = fechafin.getDate(),
            finmes = fechafin.getMonth(),
            finanio = fechafin.getFullYear(),
            finampm;

        console.log(fechafin);

        var faltasCont = 0;
        var noFaltasCont = 0;
        var asistenciasCont = 0;
        var noLaboralesCont = 0;
            
        var faltas=0;
        var noFaltas=0;
        var asistencias=0;
        var noLaborales = 0;

        //recorrer llaves
        for (var key in registros){

          array["faltas"][faltasCont] = Array();
          array["faltas"][faltasCont].nombre = registros[key][0].nombre; 
          array["faltas"][faltasCont].apellido = registros[key][0].apellido; 
          array["faltas"][faltasCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["faltas"][faltasCont].faltas = 0;

          array["noFaltas"][noFaltasCont] = Array();
          array["noFaltas"][noFaltasCont].nombre = registros[key][0].nombre; 
          array["noFaltas"][noFaltasCont].apellido = registros[key][0].apellido; 
          array["noFaltas"][noFaltasCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["noFaltas"][noFaltasCont].noFaltas = 0;
  
          array["noLaborales"][noLaboralesCont] = Array();
          array["noLaborales"][noLaboralesCont].nombre = registros[key][0].nombre; 
          array["noLaborales"][noLaboralesCont].apellido = registros[key][0].apellido; 
          array["noLaborales"][noLaboralesCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["noLaborales"][noLaboralesCont].noLaborales = 0;
          
          array["asistencias"][asistenciasCont] = Array();
          array["asistencias"][asistenciasCont].nombre = registros[key][0].nombre; 
          array["asistencias"][asistenciasCont].apellido = registros[key][0].apellido; 
          array["asistencias"][asistenciasCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["asistencias"][asistenciasCont].asistencias = 0; 
        
          //recorrer plantillas buscando la plantilla del usuario ej.(gerentes, directivos, etc.)
          for(var y=0; y<plantillas.length; y++){
            if(registros[key][0].id_plantillas!=undefined && plantillas[y].id_plantillas==registros[key][0].id_plantillas){
              console.log("Plantilla posición: " +y + " plantilla_id: " + registros[key][0].id_plantillas + " llave: " + key);
              break;
            }
          }

          var fechaRestar = inianio + "-" + inimes + "-" + inidia; 
          var fechaRestar2 = finanio + "-" + finmes + "-" + findia; 

          console.log(fechaRestar);
          console.log(fechaRestar2);

          console.log("Iteraciones:" + (restaFechas3(fechaRestar, fechaRestar2)+1));

          var fecha = new Date(moment(fechaini).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          for(var i=1; i<=(restaFechas3(fechaRestar, fechaRestar2)+1); i++){

            console.log("[factory][faltasNoFaltasConSusAsistencias] i: " + i);

            var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
            var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

            var fechaDiaIncremental= new Date(moment(fecha).add(i, 'day').format('YYYY-MM-DD HH:mm:ss'));

            var ihora = fechaDiaIncremental.getHours(),
                iminutos = fechaDiaIncremental.getMinutes(),
                isegundos = fechaDiaIncremental.getSeconds(),
                idiaSemana = fechaDiaIncremental.getDay(),
                idia = fechaDiaIncremental.getDate(),
                imes = fechaDiaIncremental.getMonth(),
                ianio = fechaDiaIncremental.getFullYear(),
                iampm;

            var dias = semana[idiaSemana];
                
            //recorrer arreglos dentro de las llaves
            for(var x=0; x<registros[key].length; x++){

              fechareg = new Date(moment(registros[key][x].fecha).format('YYYY-MM-DD HH:mm:ss'));

              var reghora = fechareg.getHours(),
                  regminutos = fechareg.getMinutes(),
                  regsegundos = fechareg.getSeconds(),
                  regdiaSemana = fechareg.getDay(),
                  regdia = fechareg.getDate(),
                  regmes = fechareg.getMonth(),
                  reganio = fechareg.getFullYear(),
                  regampm;

              console.log("[faltasNoFaltasConSusAsistencias] busca dia registro:" + regdia + " VS idia:" + idia + " Nombre: " + registros[key][x].nombre + " dia: " + dias);
      
              if(plantillas[y]!=undefined && plantillas[y][""+dias+"Activated"]==1 
                && idia==parseInt(regdia) && imes==regmes && ianio==reganio){
                //no es falta (dentro de plantilla)

                console.log("No Falta");

                array["noFaltas"][noFaltasCont].noFaltas = 1 + parseInt(array["noFaltas"][noFaltasCont].noFaltas);
                noFaltas = 1;
                break;

              } else if(idia==parseInt(regdia) && imes==regmes && ianio==reganio){
                //días extras de asistencia (fuera de plantilla)

                console.log("Asistencia Fuera de Plantilla");

                array["asistencias"][asistenciasCont].asistencias = 1 + parseInt(array["asistencias"][asistenciasCont].asistencias);
                asistencias = 1;
                break;

              }
              
            }//fin recorrer arreglo dentro de los registros

            console.log("NoFaltas: " + noFaltas + " Asistencias: " + asistencias + " Día: " + dias);
            if(plantillas[y]!=undefined)
              console.log("Plantilla Activada?: " + plantillas[y][""+dias+"Activated"]);

            if(plantillas[y]!=undefined && plantillas[y][""+dias+"Activated"]==1 &&
              noFaltas!=1 && asistencias!=1) {
              //falta (dentro de plantilla)

              console.log("Falta");
              
              array["faltas"][faltasCont].faltas = 1 + parseInt(array["faltas"][faltasCont].faltas);
              
            } else if(noFaltas!=1 && asistencias!=1) {
              array["noLaborales"][noLaboralesCont].noLaborales = 1 + parseInt(array["noLaborales"][noLaboralesCont].noLaborales);
              console.log("Días no Laborales");

            }

            faltas=0;
            noFaltas=0;
            asistencias=0;
            noLaborales = 0;

          }//fin iteraciones
            
          faltasCont++;
          noFaltasCont++;
          asistenciasCont++;
          noLaboralesCont++;
          
        }//fin recorrer llaves

        
        for(var x=0; x<array["faltas"].length; x++){

          for(var y=0; y<array["asistencias"].length; y++){

            if(array["faltas"][x].id_trabajadores==array["asistencias"][y].id_trabajadores){

              array["faltas"][x].asistencias = array["asistencias"][y].asistencias;

            }

          }

        }

        for(var x=0; x<array["noFaltas"].length; x++){

          for(var y=0; y<array["asistencias"].length; y++){

            if(array["noFaltas"][x].id_trabajadores==array["asistencias"][y].id_trabajadores){

              array["noFaltas"][x].asistencias = array["asistencias"][y].asistencias;

            }

          }

        }
        
      
        return array;
      },
      faltasNoFaltasConSusAsistenciasMes: function(plantillas, registros, fecha){
        
        console.log("[factory][faltasNoFaltasConSusAsistencias]");

        console.log(plantillas);

        console.log(registros);

        var array = Array();
        array["faltas"] = Array();
        array["noFaltas"] = Array();
        array["asistencias"] = Array();
        array["noLaborales"] = Array();

        fecha = new Date(moment(fecha).format('YYYY-MM-DD HH:mm:ss'));

        var phora = fecha.getHours(),
            pminutos = fecha.getMinutes(),
            psegundos = fecha.getSeconds(),
            pdiaSemana = fecha.getDay(),
            pdia = fecha.getDate(),
            pmes = fecha.getMonth(),
            panio = fecha.getFullYear(),
            pampm;

        console.log(fecha);

        var faltasCont = 0;
        var noFaltasCont = 0;
        var asistenciasCont = 0;
        var noLaboralesCont = 0;
            
        var faltas=0;
        var noFaltas=0;
        var asistencias=0;
        var noLaborales = 0;

        //recorrer llaves
        for (var key in registros){

          array["faltas"][faltasCont] = Array();
          array["faltas"][faltasCont].nombre = registros[key][0].nombre; 
          array["faltas"][faltasCont].apellido = registros[key][0].apellido; 
          array["faltas"][faltasCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["faltas"][faltasCont].faltas = 0;

          array["noFaltas"][noFaltasCont] = Array();
          array["noFaltas"][noFaltasCont].nombre = registros[key][0].nombre; 
          array["noFaltas"][noFaltasCont].apellido = registros[key][0].apellido; 
          array["noFaltas"][noFaltasCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["noFaltas"][noFaltasCont].noFaltas = 0;
  
          array["noLaborales"][noLaboralesCont] = Array();
          array["noLaborales"][noLaboralesCont].nombre = registros[key][0].nombre; 
          array["noLaborales"][noLaboralesCont].apellido = registros[key][0].apellido; 
          array["noLaborales"][noLaboralesCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["noLaborales"][noLaboralesCont].noLaborales = 0;
          
          array["asistencias"][asistenciasCont] = Array();
          array["asistencias"][asistenciasCont].nombre = registros[key][0].nombre; 
          array["asistencias"][asistenciasCont].apellido = registros[key][0].apellido; 
          array["asistencias"][asistenciasCont].id_trabajadores = registros[key][0].id_trabajadores; 
          array["asistencias"][asistenciasCont].asistencias = 0; 
        
          //recorrer plantillas buscando la plantilla del usuario ej.(gerentes, directivos, etc.)
          for(var y=0; y<plantillas.length; y++){
            if(registros[key][0].id_plantillas!=undefined && plantillas[y].id_plantillas==registros[key][0].id_plantillas){
              console.log("Plantilla posición: " +y + " plantilla_id: " + registros[key][0].id_plantillas + " llave: " + key);
              break;
            }
          }

          var recordarDia = 1;

          //recorrer arreglos dentro de las llaves
          for(var x=0; x<registros[key].length; x++){

            for(var i=recordarDia; i<=parseInt(pdia); i++){

              console.log("[factory][faltasNoFaltasConSusAsistencias] i: " + i);

              fecha2 = new Date(moment(registros[key][x].fecha).format('YYYY-MM-DD HH:mm:ss'));

              var rhora = fecha2.getHours(),
                  rminutos = fecha2.getMinutes(),
                  rsegundos = fecha2.getSeconds(),
                  rdiaSemana = fecha2.getDay(),
                  rdia = fecha2.getDate(),
                  rmes = fecha2.getMonth(),
                  ranio = fecha2.getFullYear(),
                  rampm;

              var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
          
              var fechaDiaIncremental = new Date(panio,pmes,i);

              var ahora = fechaDiaIncremental.getHours(),
                  aminutos = fechaDiaIncremental.getMinutes(),
                  asegundos = fechaDiaIncremental.getSeconds(),
                  adiaSemana = fechaDiaIncremental.getDay(),
                  adia = fechaDiaIncremental.getDate(),
                  ames = fechaDiaIncremental.getMonth(),
                  aanio = fechaDiaIncremental.getFullYear(),
                  aampm;

              var dias = semana[adiaSemana];

              console.log("[faltasNoFaltasConSusAsistencias] busca dia registro:" + rdia + " VS i:" + i + " Nombre: " + registros[key][x].nombre + " dia: " + dias);

              
              if(i>parseInt(rdia)){
                recordarDia = i;
                if(x==(registros[key].length-1)){
                  
                  if(plantillas[y]!=undefined && plantillas[y][""+dias+"Activated"]==1) {
                    //falta (dentro de plantilla)
    
                    console.log("Falta");
    
                    if(faltas==0){
    
                      array["faltas"][faltasCont] = Array();
                      array["faltas"][faltasCont].nombre = registros[key][x].nombre; 
                      array["faltas"][faltasCont].apellido = registros[key][x].apellido; 
                      array["faltas"][faltasCont].id_trabajadores = registros[key][x].id_trabajadores; 
                      array["faltas"][faltasCont].faltas = 1;
                    
                      faltas++;  
    
                    } else {
    
                      array["faltas"][faltasCont].faltas = 1 + parseInt(array["faltas"][faltasCont].faltas);
    
                    }
                    
    
                  } else {
                    console.log("Días no Laborales");
    
                    if(noLaborales==0){
    
                      array["noLaborales"][noLaboralesCont] = Array();
                      array["noLaborales"][noLaboralesCont].nombre = registros[key][x].nombre; 
                      array["noLaborales"][noLaboralesCont].apellido = registros[key][x].apellido; 
                      array["noLaborales"][noLaboralesCont].id_trabajadores = registros[key][x].id_trabajadores; 
                      array["noLaborales"][noLaboralesCont].noLaborales = 1;
                    
                      noLaborales++;  
    
                    } else {
    
                      array["noLaborales"][noLaboralesCont].noLaborales = 1 + parseInt(array["noLaborales"][noLaboralesCont].noLaborales);
    
                    }
                  }
                } else {
                  console.log("Rompe");
                  
                  //rompe días para no almacenar de más.
                  break;
                }
                
              } else {

                if(plantillas[y]!=undefined && plantillas[y][""+dias+"Activated"]==1 && i==parseInt(rdia) && pmes==rmes && panio==ranio){
                  //no es falta (dentro de plantilla)

                  console.log("No Falta");

                  if(noFaltas==0){

                    array["noFaltas"][noFaltasCont] = Array();
                    array["noFaltas"][noFaltasCont].nombre = registros[key][x].nombre; 
                    array["noFaltas"][noFaltasCont].apellido = registros[key][x].apellido; 
                    array["noFaltas"][noFaltasCont].id_trabajadores = registros[key][x].id_trabajadores; 
                    array["noFaltas"][noFaltasCont].noFaltas = 1; 

                    noFaltas++;

                  } else {

                    array["noFaltas"][noFaltasCont].noFaltas = 1 + parseInt(array["noFaltas"][noFaltasCont].noFaltas);

                  }

                } else if(plantillas[y]!=undefined && plantillas[y][""+dias+"Activated"]==1 && pmes==rmes && panio==ranio) {
                  //falta (dentro de plantilla)

                  console.log("Falta");

                  if(faltas==0){

                    array["faltas"][faltasCont] = Array();
                    array["faltas"][faltasCont].nombre = registros[key][x].nombre; 
                    array["faltas"][faltasCont].apellido = registros[key][x].apellido; 
                    array["faltas"][faltasCont].id_trabajadores = registros[key][x].id_trabajadores; 
                    array["faltas"][faltasCont].faltas = 1;
                  
                    faltas++;  

                  } else {

                    array["faltas"][faltasCont].faltas = 1 + parseInt(array["faltas"][faltasCont].faltas);

                  }
                  

                } else if(i==parseInt(rdia) && pmes==rmes && panio==ranio){
                  //días extras de asistencia (fuera de plantilla)

                  console.log("Asistencia Fuera de Plantilla");

                  if(asistencias==0){

                    array["asistencias"][asistenciasCont] = Array();
                    array["asistencias"][asistenciasCont].nombre = registros[key][x].nombre; 
                    array["asistencias"][asistenciasCont].apellido = registros[key][x].apellido; 
                    array["asistencias"][asistenciasCont].id_trabajadores = registros[key][x].id_trabajadores; 
                    array["asistencias"][asistenciasCont].asistencias = 1; 

                    asistencias++;

                  } else {

                    array["asistencias"][asistenciasCont].asistencias = 1 + parseInt(array["asistencias"][asistenciasCont].asistencias);

                  }

                } else {
                  console.log("Días no Laborales");
    
                  if(noLaborales==0){
  
                    array["noLaborales"][noLaboralesCont] = Array();
                    array["noLaborales"][noLaboralesCont].nombre = registros[key][x].nombre; 
                    array["noLaborales"][noLaboralesCont].apellido = registros[key][x].apellido; 
                    array["noLaborales"][noLaboralesCont].id_trabajadores = registros[key][x].id_trabajadores; 
                    array["noLaborales"][noLaboralesCont].noLaborales = 1;
                  
                    noLaborales++;  
  
                  } else {
  
                    array["noLaborales"][noLaboralesCont].noLaborales = 1 + parseInt(array["noLaborales"][noLaboralesCont].noLaborales);
  
                  }
                }
              
              }//fin if dia mayor que otro dia

            } //fin for días

            
          }//fin recorrer arreglo dentro de los registros

          faltasCont++;
          noFaltasCont++;
          asistenciasCont++;
          noLaboralesCont++;
          
        }//fin recorrer llaves
        
        for(var x=0; x<array["faltas"].length; x++){

          for(var y=0; y<array["asistencias"].length; y++){

            if(array["faltas"][x].id_trabajadores==array["asistencias"][y].id_trabajadores){

              array["faltas"][x].asistencias = array["asistencias"][y].asistencias;

            }

          }

        }

        for(var x=0; x<array["noFaltas"].length; x++){

          for(var y=0; y<array["asistencias"].length; y++){

            if(array["noFaltas"][x].id_trabajadores==array["asistencias"][y].id_trabajadores){

              array["noFaltas"][x].asistencias = array["asistencias"][y].asistencias;

            }

          }

        }
      
        return array;
      },
      impuntualesPuntualesConSusAsistencias: function(plantillas, registros){
        
        console.log("[factory][impuntualesPuntualesConSusAsistencias]");

        console.log(plantillas);
        console.log("registros: ");
        console.log(registros);

        var array = Array();
        array["impuntuales"] = Array();
        array["puntuales"] = Array();
        array["asistencias"] = Array();

        var x=0;
        var z=0;
        var asistencias = 0;
        //recorrer llaves
        for (var key in registros){

          var impuntualCont = 0;
          var puntualCont = 0;

          array["asistencias"][asistencias] = Array();
          array["asistencias"][asistencias].asistencias = 0;
          
          //recorrer arreglos dentro de las llaves
          for(var i=0; i<registros[key].length; i++){

            array["asistencias"][asistencias].asistencias = 1 + parseInt(array["asistencias"][asistencias].asistencias);
            array["asistencias"][asistencias].nombre = registros[key][i].nombre; 
            array["asistencias"][asistencias].apellido = registros[key][i].apellido;
            array["asistencias"][asistencias].id_trabajadores = registros[key][i].id_trabajadores;

            //console.log(registros[key][i].fecha);

            var fecha= new Date(moment(registros[key][i].fecha).format('YYYY-MM-DD HH:mm:ss'));

            //console.log(fecha);
            
            var phora = fecha.getHours(),
                        pminutos = fecha.getMinutes(),
                        psegundos = fecha.getSeconds(),
                        pdiaSemana = fecha.getDay(),
                        pdia = fecha.getDate(),
                        pmes = fecha.getMonth(),
                        panio = fecha.getFullYear(),
                        pampm;

            var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
            var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        
            var dias = semana[pdiaSemana];

            console.log("[impuntualesPuntualesConSusAsistencias] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio + " días: " + dias + " Hora: " + phora + " Minuto: " + pminutos + " Nombre: " + registros[key][i].nombre);

            //recorrer plantillas buscando la plantilla del usuario ej.(gerentes, directivos, etc.)
            for(var y=0; y<plantillas.length; y++){
              if(plantillas[y].id_plantillas==registros[key][i].id_plantillas){
                console.log("Plantilla posición: " +y + " plantilla_id: " + registros[key][i].id_plantillas);
                break;
              }
            }

            if(plantillas[y]!=undefined && plantillas[y][""+dias+"Activated"]==1){
              

              console.log("[Válido Con Horario en plantilla] Dia: " + dias + " Nombre: " + registros[key][i].nombre);


              console.log("[impuntualesPuntualesConSusAsistencias] hora: " + phora + " minutos: " +pminutos + " segundos: " + psegundos);
              

              var horaPlantilla = horasAMPMTo24(plantillas[y]["de1"+dias.charAt(0).toUpperCase()+""+ dias.slice(1)]).split(":");


              console.log("[impuntualesPuntualesConSusAsistencias] ");
              console.log(horaPlantilla);

              var t1 = new Date(),
              t2 = new Date();
  
              t1.setHours(phora,pminutos,psegundos);
              t2.setHours(horaPlantilla[0],horaPlantilla[1],0);

              //array["asistencias"][x].nombre = registros[key][i].nombre; 
              //array["asistencias"][x].apellido = registros[key][i].apellido; 
              //array["asistencias"][x].impuntualidad = 0; 
              
              if(t1>t2){

                //impuntual
                console.log("Impuntual");

                if(impuntualCont==0){

                  array["impuntuales"][x] = Array();
                  array["impuntuales"][x].nombre = registros[key][i].nombre; 
                  array["impuntuales"][x].apellido = registros[key][i].apellido; 
                  array["impuntuales"][x].id_trabajadores = registros[key][i].id_trabajadores; 
                  array["impuntuales"][x].impuntualidad = 1; 

                  impuntualCont++;

                } else {
 
                  array["impuntuales"][x].impuntualidad = 1 + parseInt(array["impuntuales"][x].impuntualidad);

                }

              } else {
                
                //puntual
                console.log("puntual");

                if(puntualCont==0){

                  array["puntuales"][z] = Array();
                  array["puntuales"][z].nombre = registros[key][i].nombre; 
                  array["puntuales"][z].apellido = registros[key][i].apellido; 
                  array["puntuales"][z].id_trabajadores = registros[key][i].id_trabajadores; 
                  array["puntuales"][z].puntualidad = 1; 

                  puntualCont++;

                } else {
 
                  array["puntuales"][z].puntualidad = 1 + parseInt(array["puntuales"][z].puntualidad);
                  
                }
                
              }


            } else {

              console.log("[No Válido Sin Horario en plantilla] Dia: " + dias);

              //marcar asistencias y cero impuntualidades, cero puntualidades
              

              if(impuntualCont==0){

                array["impuntuales"][x] = Array();
                array["impuntuales"][x].nombre = registros[key][i].nombre; 
                array["impuntuales"][x].apellido = registros[key][i].apellido; 
                array["impuntuales"][x].id_trabajadores = registros[key][i].id_trabajadores; 
                array["impuntuales"][x].impuntualidad = 0; 

                impuntualCont++;

              } 

              if(puntualCont==0){

                array["puntuales"][z] = Array();
                array["puntuales"][z].nombre = registros[key][i].nombre; 
                array["puntuales"][z].apellido = registros[key][i].apellido; 
                array["puntuales"][z].id_trabajadores = registros[key][i].id_trabajadores; 
                array["puntuales"][z].puntualidad = 0; 

                puntualCont++;

              } 

            }

          }//fin for recorrer dentro de los registros
          if(impuntualCont!=0){
            x++;
          }
          if(puntualCont!=0){
            z++;
          }
          
          asistencias++;

        }//fin for recorrer llaves


        for(var x=0; x<array["impuntuales"].length; x++){

          for(var y=0; y<array["asistencias"].length; y++){

            if(array["impuntuales"][x].id_trabajadores==array["asistencias"][y].id_trabajadores){

              array["impuntuales"][x].asistencias = array["asistencias"][y].asistencias;

            }

          }

        }

        for(var x=0; x<array["puntuales"].length; x++){

          for(var y=0; y<array["asistencias"].length; y++){

            if(array["puntuales"][x].id_trabajadores==array["asistencias"][y].id_trabajadores){

              array["puntuales"][x].asistencias = array["asistencias"][y].asistencias;

            }

          }

        }

        return array;
      },
      filtrarSoloEntradasPorIntervalo: function(fechaInicio, fechaFin, registros){
        console.log("[factory][filtrarSoloEntradasPorIntervalo]");

        console.log("Registros:");
        console.log(registros);

        console.log("Fecha Fin");
        console.log(fechaFin);

        var finhora = fechaFin.getHours(),
                    finminutos = fechaFin.getMinutes(),
                    finsegundos = fechaFin.getSeconds(),
                    findiaSemana = fechaFin.getDay(),
                    findia = fechaFin.getDate(),
                    finmes = fechaFin.getMonth(),
                    finanio = fechaFin.getFullYear(),
                    finampm;

        console.log("Fecha Inicio");
        console.log(fechaInicio);

        //var fechaInicio= new Date(moment(fechaInicio).format('YYYY-MM-DD HH:mm:ss'));
        
        var phora = fechaInicio.getHours(),
                    pminutos = fechaInicio.getMinutes(),
                    psegundos = fechaInicio.getSeconds(),
                    pdiaSemana = fechaInicio.getDay(),
                    pdia = fechaInicio.getDate(),
                    pmes = fechaInicio.getMonth(),
                    panio = fechaInicio.getFullYear(),
                    pampm;

        console.log("[filtrarSoloEntradasPorIntervalo] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio);

        var registrosIntervalo = Array();

        //obtener registros solo del último mes
        for(var i=0; i<registros.length; i++){

          console.log("[filtrarSoloEntradasPorIntervalo] Iteraciones: " + i);

          
          fechaRegistro =  new Date(registros[i].fecha);

          var rhora = fechaRegistro.getHours(),
              rminutos = fechaRegistro.getMinutes(),
              rsegundos = fechaRegistro.getSeconds(),
              rdiaSemana = fechaRegistro.getDay(),
              rdia = fechaRegistro.getDate(),
              rmes = fechaRegistro.getMonth(),
              ranio = fechaRegistro.getFullYear(),
              rampm;

          var fechaRestar = panio + "-" + pmes + "-" + pdia; 
          var fechaRestar2 = ranio + "-" + rmes + "-" + rdia; 
          var fechaRestar3 = finanio + "-" + finmes + "-" + findia; 

          console.log(fechaRestar + " " + phora + ":" + pminutos + ":" + psegundos);
          console.log(fechaRestar2 + " " + rhora + ":" + rminutos + ":" + rsegundos);
          console.log(fechaRestar3 + " " + finhora + ":" + finminutos + ":" + finsegundos);

          console.log(restaFechas3(fechaRestar, fechaRestar2) + " VS " + restaFechas3(fechaRestar, fechaRestar3))

          console.log("size registrosMes: " + registrosIntervalo.length);

          var validacion = 1;
          x=0;
          while(x<registrosIntervalo.length){

            //console.log("[while] Días registrosMes: " + registrosMes[x].fecha.substring(0,10) + " Registro: " + registros[i].fecha.substring(0,10));

            if(registrosIntervalo[x].fecha.substring(0,10)==registros[i].fecha.substring(0,10) && registrosIntervalo[x].id_trabajadores==registros[i].id_trabajadores){
              validacion=-1;
              console.log("Duplicado");
              break;
            }

            x++;
          }

          if(restaFechas3(fechaRestar, fechaRestar2) <= restaFechas3(fechaRestar, fechaRestar3) && restaFechas3(fechaRestar, fechaRestar2) >= 0 &&
          registros[i].tipo=="entrada" && 
          ((i!=0 && validacion==1) || i==0)){
            console.log("Se agrega");
            registrosIntervalo.push(registros[i]);
          } else {
            
            console.log("No Se agrega");
          }

        }//fin for

        console.log("Entrada en intervalo:");

        console.log(registrosIntervalo);

        return registrosIntervalo;

      },
      filtrarSoloEntradasAlMes: function(fecha, registros){
        
        console.log("[factory][filtrarSoloEntradasAlMes]");

        console.log(fecha);

        var hoyhora = fecha.getHours(),
                    hoyminutos = fecha.getMinutes(),
                    hoysegundos = fecha.getSeconds(),
                    hoydiaSemana = fecha.getDay(),
                    hoydia = fecha.getDate(),
                    hoymes = fecha.getMonth(),
                    hoyanio = fecha.getFullYear(),
                    hoyampm;

        var fecha= new Date(moment(fecha).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'));

        console.log(fecha);
        
        var phora = fecha.getHours(),
                    pminutos = fecha.getMinutes(),
                    psegundos = fecha.getSeconds(),
                    pdiaSemana = fecha.getDay(),
                    pdia = fecha.getDate(),
                    pmes = fecha.getMonth(),
                    panio = fecha.getFullYear(),
                    pampm;

        console.log("[filtrarSoloEntradasAlMes] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio);

        var registrosMes = Array();

        //obtener registros solo del último mes
        for(var i=0; i<registros.length; i++){

          
          fechaRegistro =  new Date(registros[i].fecha);

          var rhora = fechaRegistro.getHours(),
              rminutos = fechaRegistro.getMinutes(),
              rsegundos = fechaRegistro.getSeconds(),
              rdiaSemana = fechaRegistro.getDay(),
              rdia = fechaRegistro.getDate(),
              rmes = fechaRegistro.getMonth(),
              ranio = fechaRegistro.getFullYear(),
              rampm;

          var fechaRestar = panio + "-" + pmes + "-" + pdia; 
          var fechaRestar2 = ranio + "-" + rmes + "-" + rdia; 

          console.log(fechaRestar);
          console.log(fechaRestar2);

          console.log(restaFechas3(fechaRestar, fechaRestar2))

          console.log("size registrosMes: " + registrosMes.length);
          var validacion = 1;
          x=0;
          while(x<registrosMes.length){

            //console.log("[while] Días registrosMes: " + registrosMes[x].fecha.substring(0,10) + " Registro: " + registros[i].fecha.substring(0,10));

            if(registrosMes[x].fecha.substring(0,10)==registros[i].fecha.substring(0,10) && registrosMes[x].id_trabajadores==registros[i].id_trabajadores){
              validacion=-1;
              console.log("Duplicado");
              break;
            }

            x++;
          }

          //substring dias
          //filtramos solo entradas en la mañana por día
          if(restaFechas3(fechaRestar, fechaRestar2) <= 31 && restaFechas3(fechaRestar, fechaRestar2) >= 0 &&
            hoymes==rmes && registros[i].tipo=="entrada" && 
            ((i!=0 && validacion==1) || i==0)
            ){
            console.log("Se agrega");
            registrosMes.push(registros[i]);
          } else {
            
            console.log("No Se agrega");
          }

        }//fin for

        console.log("Entrada el Última Mes:");

        console.log(registrosMes);

        return registrosMes;
        
      },
      statMesEntradasYSalidasEfectivas: function (statMesEntradasYSalidas){
        var x = 0;
        for(var i=0; i<statMesEntradasYSalidas.length; i++){
          x = x + parseInt(statMesEntradasYSalidas[i]);
        }

        return x;
      },
      statMesEntradasYSalidas: function (statSemanalHrsTrabajadas, fecha){

        console.log("[factory][statMesEntradasYSalidas]");

        console.log(statSemanalHrsTrabajadas);

        var stats = Array();
        stats["semana"] = Array();
        stats["semana"]["hora"] = Array();
        stats["semana"]["hora"]["horas"] = Array();
        stats["semana"]["hora"]["minutos"] = Array();
        stats["semana"]["hora"]["segundos"] = Array();
        stats["semana"]["dias"] = Array();
        stats["semana"]["fechas"] = Array();

        console.log("[factory][statMesEntradasYSalidas] " + fecha);
        
        var ahora = fecha.getHours(),
                aminutos = fecha.getMinutes(),
                asegundos = fecha.getSeconds(),
                adiaSemana = fecha.getDay(),
                adia = fecha.getDate(),
                ames = fecha.getMonth(),
                aanio = fecha.getFullYear(),
                aampm;

        fecha = new Date(moment(fecha).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'));

        console.log("[factory][statMesEntradasYSalidas] " + fecha);

        console.log(statSemanalHrsTrabajadas["semana"]["dias"].length);


        var entradas = Array();
        var e = 0;

        console.log("[factory][statMesEntradasYSalidas] " + fecha);

        console.log("----------------------Calcular horas----------------------");

        //calcular horas extras
        for(var i=0; i<diasEnUnMes(ames, aanio); i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          console.log("[factory][statMesEntradasYSalidas] " + fecha);
          
          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
  
          var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
          var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      
          var dias = semana[pdiaSemana];

          console.log("[factory][statMesEntradasYSalidas] busca pdia: " + pdia + " pmes: " + pmes + " panio: " + panio + " added days" + i);

          var coincidencia = 0;

          for(var i2=0; i2<statSemanalHrsTrabajadas["semana"]["dias"].length; i2++){

            var fecha2 = statSemanalHrsTrabajadas["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){

              console.log("--------------Coincidencias-------------------");
              
              coincidencia++;

              console.log("Días mes y año coinciden: " + statSemanalHrsTrabajadas["semana"]["dias"][i2]);

              entradas[e] = coincidencia;

            }// fin if (año, mes y día)

          }//fin for2
  
          console.log("Coincidencias: " + coincidencia);

          if(coincidencia==0){

            console.log("--------------No Coincidencias-------------------");

            console.log("No coinciden dia: " + pdia + " mes: " + pmes + " anio: " + panio + " días: " + dias);

            entradas[e] = 0;

          }

          e++;
          

        }//fin for

        console.log(entradas);

        
        console.log("----------------------Fin Calcular horas----------------------");
        

        return entradas;

      },
      statIntervalosHorsExtra: function (statHrsPlantilla, statIntervalosHrsTrabajadas, fechaini, fechafin){

        console.log("[factory][statIntervalosHorsExtra]");

        console.log(statIntervalosHrsTrabajadas);

        console.log(statHrsPlantilla);

        var stats = Array();
        stats["semana"] = Array();
        stats["semana"]["hora"] = Array();
        stats["semana"]["hora"]["horas"] = Array();
        stats["semana"]["hora"]["minutos"] = Array();
        stats["semana"]["hora"]["segundos"] = Array();
        stats["semana"]["dias"] = Array();
        stats["semana"]["fechas"] = Array();

        console.log("[factory][statIntervalosHorsExtra] FechaIni: " + fechaini);
        console.log("[factory][statIntervalosHorsExtra] FechaFin: " + fechafin);
        
        var ahora = fechaini.getHours(),
                aminutos = fechaini.getMinutes(),
                asegundos = fechaini.getSeconds(),
                adiaSemana = fechaini.getDay(),
                adia = fechaini.getDate(),
                ames = fechaini.getMonth(),
                aanio = fechaini.getFullYear(),
                aampm;
        
                
        var bhora = fechafin.getHours(),
          bminutos = fechafin.getMinutes(),
          bsegundos = fechafin.getSeconds(),
          bdiaSemana = fechafin.getDay(),
          bdia = fechafin.getDate(),
          bmes = fechafin.getMonth(),
          banio = fechafin.getFullYear(),
          bampm;

        var fechaRestar = aanio + "-" + ames + "-" + adia; 
        var fechaRestar2 = banio + "-" + bmes + "-" + bdia; 

        console.log(fechaRestar);
        console.log(fechaRestar2);

        console.log("[factory][statIntervalosHorsExtra] " + (restaFechas3(fechaRestar, fechaRestar2) + 1));

        console.log(statIntervalosHrsTrabajadas["semana"]["dias"].length);

        console.log("----------------------Limpiar Arreglo----------------------");
   
        fecha = new Date(moment(fechaini).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

        //limpiar arreglo
        var y=0;
        for(var i=0; i<(restaFechas3(fechaRestar, fechaRestar2) + 1); i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          console.log("[factory][statIntervalosHorsExtra] fechaini en ciclo add 1: " + fecha);

          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
          
          stats["semana"]["hora"]["horas"][y] = 0;
          stats["semana"]["hora"]["minutos"][y] = 0;
          stats["semana"]["hora"]["segundos"][y] = 0;

          var coincidencia = 0;

          for(var i2=0; i2<statIntervalosHrsTrabajadas["semana"]["dias"].length; i2++){

            var fecha2 = statIntervalosHrsTrabajadas["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){

              console.log("--------------Coinciden-------------------");

              console.log("coinciden dia: " + dia + " mes: " + mes + " anio: " + anio);

              var t1 = new Date();

              console.log("Horas a sumar: " + statIntervalosHrsTrabajadas["semana"]["hora"]["horas"][i2] + " - " + stats["semana"]["hora"]["horas"][y]);

              var horas = parseInt(statIntervalosHrsTrabajadas["semana"]["hora"]["horas"][i2]) + parseInt(stats["semana"]["hora"]["horas"][y]);
              var minutos = parseInt(statIntervalosHrsTrabajadas["semana"]["hora"]["minutos"][i2]) + parseInt(stats["semana"]["hora"]["minutos"][y]);
              var segundos = parseInt(statIntervalosHrsTrabajadas["semana"]["hora"]["segundos"][i2]) + parseInt(stats["semana"]["hora"]["segundos"][y]);

              var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

              console.log(arregloHoras);

              stats["semana"]["dias"][y] = statIntervalosHrsTrabajadas["semana"]["dias"][i2];
              stats["semana"]["fechas"][y] = statIntervalosHrsTrabajadas["semana"]["fechas"][i2];
              stats["semana"]["hora"]["horas"][y] = arregloHoras["horas"];
              stats["semana"]["hora"]["minutos"][y] = arregloHoras["minutos"];
              stats["semana"]["hora"]["segundos"][y] = arregloHoras["segundos"];
              coincidencia++;
              console.log("--------------Fin Coinciden-------------------");

            } 

          } // fin for
          
          if(coincidencia!=0){
            y++;
          }
          
        }//fin for limpiar arreglo
        
        console.log("Limpiar arreglo con sus horas y fechas, suma todo, pueden haber fechas repetidas que simplificará, variable=stats");
        console.log(stats);

        console.log("----------------------FIn Limpiar Arreglo----------------------");

        var horas_ = Array();
        horas_["horas"] =  0;
        horas_["minutos"] = 0;
        horas_["segundos"] = 0;

        console.log("[factory][statIntervalosHorsExtra] " + fecha);
   
        fecha = new Date(moment(fechaini).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

        console.log("[factory][statIntervalosHorsExtra] " + fecha);

        console.log("----------------------Calcular horas----------------------");

        //calcular horas extras
        for(var i=0; i<(restaFechas3(fechaRestar, fechaRestar2) + 1); i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          console.log("[factory][statIntervalosHorsExtra] " + fecha);
          
          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
  
          var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
          var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      
          var dias = semana[pdiaSemana];

          console.log("[factory][statIntervalosHorsExtra] busca pdia: " + pdia + " pmes: " + pmes + " panio: " + panio + " added days" + i);

          var coincidencia = 0;

          for(var i2=0; i2<stats["semana"]["dias"].length; i2++){

            var fecha2 = stats["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){
              
              coincidencia++;

              console.log("Días mes y año coinciden: " + stats["semana"]["dias"][i2]);

              if(statHrsPlantilla[stats["semana"]["dias"][i2]]["activated"]!="-"){

                
                console.log("---------día activado--------");

                console.log("Horas Actual: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                console.log("[factory][statIntervalosHorsExtra] día: " + stats["semana"]["dias"][i2]);
                
                var t1 = new Date(),
                t2 = new Date();
    
                console.log("[factory][statIntervalosHorsExtra] horas Plantilla: " + statHrsPlantilla[stats["semana"]["dias"][i2]]["horas"]);
                console.log("[factory][statIntervalosHorsExtra] horas trabajadas: " + stats["semana"]["hora"]["horas"][i2]);
    
                t1.setHours(statHrsPlantilla[stats["semana"]["dias"][i2]]["horas"], statHrsPlantilla[stats["semana"]["dias"][i2]]["minutos"], statHrsPlantilla[stats["semana"]["dias"][i2]]["segundos"]);
                t2.setHours(stats["semana"]["hora"]["horas"][i2], stats["semana"]["hora"]["minutos"][i2], stats["semana"]["hora"]["segundos"][i2]);
                
                //Aquí hago la resta
                //t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
                //t1.setHours(t1.getHours() - t2.getHours(),  t1.getMinutes() - t2.getMinutes(),  t1.getSeconds() - t2.getSeconds());
    
                
                if(t2>t1){ 

                  //horas extras
                  console.log("---------Horas Extras Con Plantilla--------");

                  var horas = parseInt(t2.getHours()) - parseInt(t1.getHours());
                  var minutos = parseInt(t2.getMinutes()) - parseInt(t1.getMinutes());
                  var segundos = parseInt(t2.getSeconds()) - parseInt(t1.getSeconds());

                  var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  console.log(arregloHoras);
                
                  console.log("horas extras: " + t2 + " > " + t1);
    
                  console.log("Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
    
                
                  horas = parseInt(horas_["horas"]) + parseInt(arregloHoras["horas"]);
                  minutos = parseInt(horas_["minutos"]) + parseInt(arregloHoras["minutos"]);
                  segundos = parseInt(horas_["segundos"]) + parseInt(arregloHoras["segundos"]);

                  arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  horas_["horas"] = arregloHoras["horas"];
                  horas_["minutos"] = arregloHoras["minutos"]
                  horas_["segundos"] = arregloHoras["segundos"]
                  
                  console.log("total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                  console.log("----------Fin Horas Extras Con Plantilla----------");
    
                } else {
                  
                  console.log("----------Horas No Extras Con Plantilla----------");

                  var horas = parseInt(t1.getHours()) - parseInt(t2.getHours());
                  var minutos = parseInt(t1.getMinutes()) - parseInt(t2.getMinutes());
                  var segundos = parseInt(t1.getSeconds()) - parseInt(t2.getSeconds());

                  var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  console.log(arregloHoras);
    
                  console.log("no horas extras: " + t2 + " > " + t1);

                  console.log("Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
                  
                  horas = parseInt(horas_["horas"]) - parseInt(arregloHoras["horas"]);
                  minutos = parseInt(horas_["minutos"]) - parseInt(arregloHoras["minutos"]);
                  segundos = parseInt(horas_["segundos"]) - parseInt(arregloHoras["segundos"]);

                  arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  horas_["horas"] = arregloHoras["horas"];
                  horas_["minutos"] = arregloHoras["minutos"]
                  horas_["segundos"] = arregloHoras["segundos"]
                  
                  console.log("total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                  console.log("----------Fin Horas No Extras con Plantilla----------");

                }
    
    
              } else {

                console.log("----------Horas Sin Plantilla (extras)----------");
                

                console.log("Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
                console.log("Horas a Sumar: " + stats["semana"]["hora"]["horas"][i2] + " Minutos: " + stats["semana"]["hora"]["minutos"][i2] + " Segundos: " + stats["semana"]["hora"]["segundos"][i2]);
                     
                var horas = parseInt(horas_["horas"]) + parseInt(stats["semana"]["hora"]["horas"][i2]);
                var minutos = parseInt(horas_["minutos"]) + parseInt(stats["semana"]["hora"]["minutos"][i2]);
                var segundos = parseInt(horas_["segundos"]) + parseInt(stats["semana"]["hora"]["segundos"][i2]);

                arregloHoras = secondsToHHMMSS(horas, minutos, segundos);
                
                horas_["horas"] = arregloHoras["horas"];
                horas_["minutos"] = arregloHoras["minutos"]
                horas_["segundos"] = arregloHoras["segundos"]
                

                console.log("total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);
    
                console.log("----------Fin Horas SIn Plantilla (extras)----------");

              }


            }// fin if (año, mes y día)

          }//fin for2

          
            
          console.log("Coincidencias: " + coincidencia);

          if(pmes==mes && panio==anio && coincidencia==0){

            console.log("--------------No Coincidencias-------------------");

            console.log("No coinciden dia: " + pdia + " mes: " + pmes + " anio: " + panio + " días: " + dias + " Plantilla activada?: " + statHrsPlantilla[dias]["activated"]);

            
            if(statHrsPlantilla[dias]["activated"]==1){
              
              console.log("--------------No Coincidencias Con plantilla No Horas Extra -------------------");
              
              console.log("Horas: " + parseInt(statHrsPlantilla[dias]["horas"]));

              var horas = parseInt(horas_["horas"]) - parseInt(statHrsPlantilla[dias]["horas"]);
              var minutos = parseInt(horas_["minutos"]) - parseInt(statHrsPlantilla[dias]["minutos"]);
              var segundos = parseInt(horas_["segundos"]) - parseInt(statHrsPlantilla[dias]["segundos"]);

              arregloHoras = secondsToHHMMSS(horas, minutos, segundos);
              
              horas_["horas"] = arregloHoras["horas"];
              horas_["minutos"] = arregloHoras["minutos"];
              horas_["segundos"] = arregloHoras["segundos"];

            }

            console.log("--------------Fin No Coincidencias -------------------");
            

          }
          

        }//fin for

        console.log(horas_);

        
        console.log("----------------------Fin Calcular horas----------------------");
        

        return horas_;

      }, 
      statMesHorsExtra: function (statHrsPlantilla, statSemanalHrsTrabajadas, fecha){

        console.log("[factory][statSemanaHorsExtra]");

        console.log(statSemanalHrsTrabajadas);

        console.log(statHrsPlantilla);

        var stats = Array();
        stats["semana"] = Array();
        stats["semana"]["hora"] = Array();
        stats["semana"]["hora"]["horas"] = Array();
        stats["semana"]["hora"]["minutos"] = Array();
        stats["semana"]["hora"]["segundos"] = Array();
        stats["semana"]["dias"] = Array();
        stats["semana"]["fechas"] = Array();

        console.log("[factory][statMesHorsExtra] " + fecha);
        
        var ahora = fecha.getHours(),
                aminutos = fecha.getMinutes(),
                asegundos = fecha.getSeconds(),
                adiaSemana = fecha.getDay(),
                adia = fecha.getDate(),
                ames = fecha.getMonth(),
                aanio = fecha.getFullYear(),
                aampm;

        fecha = new Date(moment(fecha).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'));

        console.log("[factory][statMesHorsExtra] " + fecha);

        console.log(statSemanalHrsTrabajadas["semana"]["dias"].length);

        console.log("----------------------Limpiar Arreglo----------------------");
        
        console.log("[factory][statMesHorsExtra] días totales: " + diasEnUnMes(ames, aanio));

        //limpiar arreglo
        var y=0;
        for(var i=0; i<diasEnUnMes(ames, aanio); i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
          
          stats["semana"]["hora"]["horas"][y] = 0;
          stats["semana"]["hora"]["minutos"][y] = 0;
          stats["semana"]["hora"]["segundos"][y] = 0;

          var coincidencia = 0;

          for(var i2=0; i2<statSemanalHrsTrabajadas["semana"]["dias"].length; i2++){

            var fecha2 = statSemanalHrsTrabajadas["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){

              console.log("--------------Coinciden-------------------");

              console.log("coinciden dia: " + dia + " mes: " + mes + " anio: " + anio);

              var t1 = new Date();

              console.log("Horas a sumar: " + statSemanalHrsTrabajadas["semana"]["hora"]["horas"][i2] + " - " + stats["semana"]["hora"]["horas"][y]);

              var horas = parseInt(statSemanalHrsTrabajadas["semana"]["hora"]["horas"][i2]) + parseInt(stats["semana"]["hora"]["horas"][y]);
              var minutos = parseInt(statSemanalHrsTrabajadas["semana"]["hora"]["minutos"][i2]) + parseInt(stats["semana"]["hora"]["minutos"][y]);
              var segundos = parseInt(statSemanalHrsTrabajadas["semana"]["hora"]["segundos"][i2]) + parseInt(stats["semana"]["hora"]["segundos"][y]);

              var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

              console.log(arregloHoras);

              stats["semana"]["dias"][y] = statSemanalHrsTrabajadas["semana"]["dias"][i2];
              stats["semana"]["fechas"][y] = statSemanalHrsTrabajadas["semana"]["fechas"][i2];
              stats["semana"]["hora"]["horas"][y] = arregloHoras["horas"];
              stats["semana"]["hora"]["minutos"][y] = arregloHoras["minutos"];
              stats["semana"]["hora"]["segundos"][y] = arregloHoras["segundos"];
              coincidencia++;
              console.log("--------------Fin Coinciden-------------------");

            } 

          } // fin for
          
          if(coincidencia!=0){
            y++;
          }
          
        }//fin for limpiar arreglo
        
        console.log("Limpiar arreglo con sus horas y fechas, suma todo, pueden haber fechas repetidas que simplificará, variable=stats");
        console.log(stats);

        console.log("----------------------FIn Limpiar Arreglo----------------------");

        var horas_ = Array();
        horas_["horas"] =  0;
        horas_["minutos"] = 0;
        horas_["segundos"] = 0;

        console.log("[factory][statMesHorsExtra] " + fecha);

        fecha = new Date(moment(fecha).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'));

        console.log("[factory][statMesHorsExtra] " + fecha);


        console.log("----------------------Calcular horas----------------------");

        //calcular horas extras
        for(var i=0; i<diasEnUnMes(ames, aanio); i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          console.log("[factory][statMesHorsExtra] " + fecha);
          
          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
  
          var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
          var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      
          var dias = semana[pdiaSemana];

          console.log("[factory][statMesHorsExtra] busca pdia: " + pdia + " pmes: " + pmes + " panio: " + panio + " added days" + i);

          var coincidencia = 0;

          for(var i2=0; i2<stats["semana"]["dias"].length; i2++){

            var fecha2 = stats["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){
              
              coincidencia++;

              console.log("Días mes y año coinciden: " + stats["semana"]["dias"][i2]);

              if(statHrsPlantilla[stats["semana"]["dias"][i2]]["activated"]!="-"){

                
                console.log("---------día activado--------");

                console.log("Horas Actual: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                console.log("[factory][statMesHorsExtra] día: " + stats["semana"]["dias"][i2]);
                
                var t1 = new Date(),
                t2 = new Date();
    
                console.log("[factory][statMesHorsExtra] horas Plantilla: " + statHrsPlantilla[stats["semana"]["dias"][i2]]["horas"]);
                console.log("[factory][statMesHorsExtra] horas trabajadas: " + stats["semana"]["hora"]["horas"][i2]);
    
                t1.setHours(statHrsPlantilla[stats["semana"]["dias"][i2]]["horas"], statHrsPlantilla[stats["semana"]["dias"][i2]]["minutos"], statHrsPlantilla[stats["semana"]["dias"][i2]]["segundos"]);
                t2.setHours(stats["semana"]["hora"]["horas"][i2], stats["semana"]["hora"]["minutos"][i2], stats["semana"]["hora"]["segundos"][i2]);
                
                //Aquí hago la resta
                //t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
                //t1.setHours(t1.getHours() - t2.getHours(),  t1.getMinutes() - t2.getMinutes(),  t1.getSeconds() - t2.getSeconds());
    
                
                if(t2>t1){ 

                  //horas extras
                  console.log("---------Horas Extras Con Plantilla--------");

                  var horas = parseInt(t2.getHours()) - parseInt(t1.getHours());
                  var minutos = parseInt(t2.getMinutes()) - parseInt(t1.getMinutes());
                  var segundos = parseInt(t2.getSeconds()) - parseInt(t1.getSeconds());

                  var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  console.log(arregloHoras);
                
                  console.log("horas extras: " + t2 + " > " + t1);
    
                  console.log("Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
    
                
                  horas = parseInt(horas_["horas"]) + parseInt(arregloHoras["horas"]);
                  minutos = parseInt(horas_["minutos"]) + parseInt(arregloHoras["minutos"]);
                  segundos = parseInt(horas_["segundos"]) + parseInt(arregloHoras["segundos"]);

                  arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  horas_["horas"] = arregloHoras["horas"];
                  horas_["minutos"] = arregloHoras["minutos"]
                  horas_["segundos"] = arregloHoras["segundos"]
                  
                  console.log("total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                  console.log("----------Fin Horas Extras Con Plantilla----------");
    
                } else {
                  
                  console.log("----------Horas No Extras Con Plantilla----------");

                  var horas = parseInt(t1.getHours()) - parseInt(t2.getHours());
                  var minutos = parseInt(t1.getMinutes()) - parseInt(t2.getMinutes());
                  var segundos = parseInt(t1.getSeconds()) - parseInt(t2.getSeconds());

                  var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  console.log(arregloHoras);
    
                  console.log("no horas extras: " + t2 + " > " + t1);

                  console.log("Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
                  
                  horas = parseInt(horas_["horas"]) - parseInt(arregloHoras["horas"]);
                  minutos = parseInt(horas_["minutos"]) - parseInt(arregloHoras["minutos"]);
                  segundos = parseInt(horas_["segundos"]) - parseInt(arregloHoras["segundos"]);

                  arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  horas_["horas"] = arregloHoras["horas"];
                  horas_["minutos"] = arregloHoras["minutos"]
                  horas_["segundos"] = arregloHoras["segundos"]
                  
                  console.log("total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                  console.log("----------Fin Horas No Extras con Plantilla----------");

                }
    
    
              } else {

                console.log("----------Horas Sin Plantilla (extras)----------");
                

                console.log("Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
                console.log("Horas a Sumar: " + stats["semana"]["hora"]["horas"][i2] + " Minutos: " + stats["semana"]["hora"]["minutos"][i2] + " Segundos: " + stats["semana"]["hora"]["segundos"][i2]);
                     
                var horas = parseInt(horas_["horas"]) + parseInt(stats["semana"]["hora"]["horas"][i2]);
                var minutos = parseInt(horas_["minutos"]) + parseInt(stats["semana"]["hora"]["minutos"][i2]);
                var segundos = parseInt(horas_["segundos"]) + parseInt(stats["semana"]["hora"]["segundos"][i2]);

                arregloHoras = secondsToHHMMSS(horas, minutos, segundos);
                
                horas_["horas"] = arregloHoras["horas"];
                horas_["minutos"] = arregloHoras["minutos"]
                horas_["segundos"] = arregloHoras["segundos"]
                

                console.log("total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);
    
                console.log("----------Fin Horas SIn Plantilla (extras)----------");

              }


            }// fin if (año, mes y día)

          }//fin for2

          
            
          console.log("Coincidencias: " + coincidencia);

          if(pmes==mes && panio==anio && coincidencia==0){

            console.log("--------------No Coincidencias-------------------");

            console.log("No coinciden dia: " + pdia + " mes: " + pmes + " anio: " + panio + " días: " + dias + " Plantilla activada?: " + statHrsPlantilla[dias]["activated"]);

            
            if(statHrsPlantilla[dias]["activated"]==1){
              
              console.log("--------------No Coincidencias Con plantilla No Horas Extra -------------------");
              
              console.log("Horas: " + parseInt(statHrsPlantilla[dias]["horas"]));

              var horas = parseInt(horas_["horas"]) - parseInt(statHrsPlantilla[dias]["horas"]);
              var minutos = parseInt(horas_["minutos"]) - parseInt(statHrsPlantilla[dias]["minutos"]);
              var segundos = parseInt(horas_["segundos"]) - parseInt(statHrsPlantilla[dias]["segundos"]);

              arregloHoras = secondsToHHMMSS(horas, minutos, segundos);
              
              horas_["horas"] = arregloHoras["horas"];
              horas_["minutos"] = arregloHoras["minutos"];
              horas_["segundos"] = arregloHoras["segundos"];

            }

            console.log("--------------Fin No Coincidencias -------------------");
            

          }
          

        }//fin for

        console.log(horas_);

        
        console.log("----------------------Fin Calcular horas----------------------");
        

        return horas_;

      },
      statSemanaHorsExtra: function (statHrsPlantilla, statSemanalHrsTrabajadas, fecha){

        console.log("[factory][statSemanaHorsExtra]");

        console.log(statSemanalHrsTrabajadas);

        console.log(statHrsPlantilla);

        var stats = Array();
        stats["semana"] = Array();
        stats["semana"]["hora"] = Array();
        stats["semana"]["hora"]["horas"] = Array();
        stats["semana"]["hora"]["minutos"] = Array();
        stats["semana"]["hora"]["segundos"] = Array();
        stats["semana"]["dias"] = Array();
        stats["semana"]["fechas"] = Array();

        console.log("[factory][statSemanaHorsExtra] " + fecha);

        fecha = new Date(moment(fecha).subtract(168, 'hour').format('YYYY-MM-DD HH:mm:ss'));

        console.log("[factory][statSemanaHorsExtra] " + fecha);

        console.log(statSemanalHrsTrabajadas["semana"]["dias"].length);

        console.log("----------------------Limpiar Arreglo----------------------");
        
        //limpiar arreglo
        var y=0;
        for(var i=0; i<7; i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
          
          stats["semana"]["hora"]["horas"][y] = 0;
          stats["semana"]["hora"]["minutos"][y] = 0;
          stats["semana"]["hora"]["segundos"][y] = 0;

          var coincidencia = 0;

          for(var i2=0; i2<statSemanalHrsTrabajadas["semana"]["dias"].length; i2++){

            var fecha2 = statSemanalHrsTrabajadas["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){

              coincidencia++;

              console.log("--------------Coinciden-------------------");

              console.log("coinciden dia: " + dia + " mes: " + mes + " anio: " + anio);

              var t1 = new Date();

              console.log("Horas a sumar: " + statSemanalHrsTrabajadas["semana"]["hora"]["horas"][i2] + " - " + stats["semana"]["hora"]["horas"][y]);

              var horas = parseInt(statSemanalHrsTrabajadas["semana"]["hora"]["horas"][i2]) + parseInt(stats["semana"]["hora"]["horas"][y]);
              var minutos = parseInt(statSemanalHrsTrabajadas["semana"]["hora"]["minutos"][i2]) + parseInt(stats["semana"]["hora"]["minutos"][y]);
              var segundos = parseInt(statSemanalHrsTrabajadas["semana"]["hora"]["segundos"][i2]) + parseInt(stats["semana"]["hora"]["segundos"][y]);

              var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

              console.log(arregloHoras);

              stats["semana"]["dias"][y] = statSemanalHrsTrabajadas["semana"]["dias"][i2];
              stats["semana"]["fechas"][y] = statSemanalHrsTrabajadas["semana"]["fechas"][i2];
              stats["semana"]["hora"]["horas"][y] = arregloHoras["horas"];
              stats["semana"]["hora"]["minutos"][y] = arregloHoras["minutos"];
              stats["semana"]["hora"]["segundos"][y] = arregloHoras["segundos"];
              coincidencia++;
              console.log("--------------Fin Coinciden-------------------");

            }

          } // fin for
          
          if(coincidencia!=0){
            y++;
          }

        }//fin for limpiar arreglo
        
        console.log("Limpiar arreglo con sus horas y fechas, suma todo, pueden haber fechas repetidas que simplificará, variable=stats");
        console.log(stats);

        console.log("----------------------FIn Limpiar Arreglo----------------------");

        var horas_ = Array();
        horas_["horas"] =  0;
        horas_["minutos"] = 0;
        horas_["segundos"] = 0;

        console.log("[factory][statSemanaHorsExtra] " + fecha);

        fecha = new Date(moment(fecha).subtract(168, 'hour').format('YYYY-MM-DD HH:mm:ss'));

        console.log("[factory][statSemanaHorsExtra] " + fecha);


        console.log("----------------------Calcular horas----------------------");

        //calcular horas extras
        for(var i=0; i<7; i++){
   
          fecha = new Date(moment(fecha).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'));

          console.log("[factory][statSemanaHorsExtra] " + fecha);
          
          var phora = fecha.getHours(),
                      pminutos = fecha.getMinutes(),
                      psegundos = fecha.getSeconds(),
                      pdiaSemana = fecha.getDay(),
                      pdia = fecha.getDate(),
                      pmes = fecha.getMonth(),
                      panio = fecha.getFullYear(),
                      pampm;
          
          var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
          var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      
          var dias = semana[pdiaSemana];

          console.log("[factory][statSemanaHorsExtra] busca pdia: " + pdia + " pmes: " + pmes + " panio: " + panio + " added days" + i);

          var coincidencias = 0;

          for(var i2=0; i2<stats["semana"]["dias"].length; i2++){

            var fecha2 = stats["semana"]["fechas"][i2];

            var hora = fecha2.getHours(),
                      minutos = fecha2.getMinutes(),
                      segundos = fecha2.getSeconds(),
                      diaSemana = fecha2.getDay(),
                      dia = fecha2.getDate(),
                      mes = fecha2.getMonth(),
                      anio = fecha2.getFullYear(),
                      ampm;

            if(pdia==dia && pmes==mes && panio==anio){

              coincidencias++;

              if(statHrsPlantilla[stats["semana"]["dias"][i2]]["activated"]!="-"){

                

                console.log("Horas Actual: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                console.log("[factory][statSemanaHorsExtra] día: " + stats["semana"]["dias"][i2]);
                
                var t1 = new Date(),
                t2 = new Date();
    
                console.log("[factory][statSemanaHorsExtra] horas Plantilla: " + statHrsPlantilla[stats["semana"]["dias"][i2]]["horas"]);
                console.log("[factory][statSemanaHorsExtra] horas trabajadas: " + stats["semana"]["hora"]["horas"][i2]);
    
                t1.setHours(statHrsPlantilla[stats["semana"]["dias"][i2]]["horas"], statHrsPlantilla[stats["semana"]["dias"][i2]]["minutos"], statHrsPlantilla[stats["semana"]["dias"][i2]]["segundos"]);
                t2.setHours(stats["semana"]["hora"]["horas"][i2], stats["semana"]["hora"]["minutos"][i2], stats["semana"]["hora"]["segundos"][i2]);
                
                //Aquí hago la resta
                //t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
                //t1.setHours(t1.getHours() - t2.getHours(),  t1.getMinutes() - t2.getMinutes(),  t1.getSeconds() - t2.getSeconds());
    
                
                if(t2>t1){ 

                  //horas extras
                  console.log("---------Horas Extras con Plantilla--------");

                  var horas = parseInt(t2.getHours()) - parseInt(t1.getHours());
                  var minutos = parseInt(t2.getMinutes()) - parseInt(t1.getMinutes());
                  var segundos = parseInt(t2.getSeconds()) - parseInt(t1.getSeconds());

                  var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  console.log(arregloHoras);
                
                  console.log("[factory][statSemanaHorsExtra] horas extras: " + t2 + " > " + t1);
    
                  console.log("[factory][statSemanaHorsExtra] Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
    
                
                  horas = parseInt(horas_["horas"]) + parseInt(arregloHoras["horas"]);
                  minutos = parseInt(horas_["minutos"]) + parseInt(arregloHoras["minutos"]);
                  segundos = parseInt(horas_["segundos"]) + parseInt(arregloHoras["segundos"]);

                  arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  horas_["horas"] = arregloHoras["horas"];
                  horas_["minutos"] = arregloHoras["minutos"]
                  horas_["segundos"] = arregloHoras["segundos"]
                  
                  console.log("[factory][statSemanaHorsExtra] total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                  console.log("----------Fin Horas Extras con Plantilla----------");
    
                } else {
                  
                  console.log("----------Horas No Extras con Plantilla----------");

                  var horas = parseInt(t1.getHours()) - parseInt(t2.getHours());
                  var minutos = parseInt(t1.getMinutes()) - parseInt(t2.getMinutes());
                  var segundos = parseInt(t1.getSeconds()) - parseInt(t2.getSeconds());

                  var arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  console.log(arregloHoras);
    
                  console.log("[factory][statSemanaHorsExtra] no horas extras: " + t2 + " > " + t1);

                  console.log("[factory][statSemanaHorsExtra] Horas Actual: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);
                  
                  horas = parseInt(horas_["horas"]) - parseInt(arregloHoras["horas"]);
                  minutos = parseInt(horas_["minutos"]) - parseInt(arregloHoras["minutos"]);
                  segundos = parseInt(horas_["segundos"]) - parseInt(arregloHoras["segundos"]);

                  arregloHoras = secondsToHHMMSS(horas, minutos, segundos);

                  horas_["horas"] = arregloHoras["horas"];
                  horas_["minutos"] = arregloHoras["minutos"]
                  horas_["segundos"] = arregloHoras["segundos"]
                  
                  console.log("[factory][statSemanaHorsExtra] total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);

                  console.log("----------Fin Horas No Extras con Plantilla----------");

                }
    
    
              } else {

                console.log("----------Horas Sin Plantilla (extras)----------");
                
                console.log("[factory][statSemanaHorsExtra] Horas Actual: " + stats["semana"]["hora"]["horas"][i2] + " Minutos: " + stats["semana"]["hora"]["minutos"][i2] + " Segundos: " + stats["semana"]["hora"]["segundos"][i2]);
                
                
                var horas = parseInt(horas_["horas"]) + parseInt(stats["semana"]["hora"]["horas"][i2]);
                var minutos = parseInt(horas_["minutos"]) + parseInt(stats["semana"]["hora"]["minutos"][i2]);
                var segundos = parseInt(horas_["segundos"]) + parseInt(stats["semana"]["hora"]["segundos"][i2]);

                arregloHoras = secondsToHHMMSS(horas, minutos, segundos);
                
                horas_["horas"] = arregloHoras["horas"];
                horas_["minutos"] = arregloHoras["minutos"];
                horas_["segundos"] = arregloHoras["segundos"];

                console.log("[factory][statSemanaHorsExtra] total: " + horas_["horas"]+":"+horas_["minutos"]+":"+horas_["segundos"]);
    
                console.log("----------Fin Horas SIn Plantilla (extras)----------");

              }


            }//fin

          }//fin for2
            
          console.log("[factory][statSemanaHorsExtra] Coincidencias: " + coincidencia);

          if(pmes==mes && panio==anio && coincidencias==0){

            console.log("--------------No Coincidencias -------------------");

            console.log("[factory][statSemanaHorsExtra] No coinciden dia: " + pdia + " mes: " + pmes + " anio: " + panio + " días: " + dias + " Plantilla activada?: " + statHrsPlantilla[dias]["activated"]);

            if(statHrsPlantilla[dias]["activated"]==1){
              
              console.log("--------------No Coincidencias Con plantilla No Horas Extra -------------------");

              var horas = parseInt(horas_["horas"]) - parseInt(statHrsPlantilla[dias]["horas"]);
              var minutos = parseInt(horas_["minutos"]) - parseInt(statHrsPlantilla[dias]["minutos"]);
              var segundos = parseInt(horas_["segundos"]) - parseInt(statHrsPlantilla[dias]["segundos"]);

              arregloHoras = secondsToHHMMSS(horas, minutos, segundos);
              
              horas_["horas"] = arregloHoras["horas"];
              horas_["minutos"] = arregloHoras["minutos"];
              horas_["segundos"] = arregloHoras["segundos"];

            }

            console.log("--------------Fin No Coincidencias -------------------");

          }
  
        }//fin for

        console.log(horas_);

        
        console.log("----------------------Fin Calcular horas----------------------");
        

        return horas_;

      },
      statDiarioHorsExtra: function (statHrsPlantilla, statDiarioHrsTrabajadas, fecha){

        console.log("[factory][statDiarioHorsExtra]");

        console.log("----------statDiarioHorsExtra-------------");

        
        var hora = fecha.getHours(),
          minutos = fecha.getMinutes(),
          segundos = fecha.getSeconds(),
          diaSemana = fecha.getDay(),
          dia = fecha.getDate(),
          mes = fecha.getMonth(),
          anio = fecha.getFullYear(),
          ampm;

        var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
        var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    
        var dias = semana[diaSemana];

        var horas_ = Array();

        if(statHrsPlantilla[dias]["activated"]!="-"){

          console.log("[factory][statDiarioHorsExtra] día: " + dias);
          
          var t1 = new Date(),
          t2 = new Date();

          console.log("[factory][statDiarioHorsExtra] horas Plantilla: " + statHrsPlantilla[dias]["horas"] + " minutos: " + statHrsPlantilla[dias]["minutos"] + " Segundos: " + statHrsPlantilla[dias]["segundos"]);
          console.log("[factory][statDiarioHorsExtra] horas diario: " + statDiarioHrsTrabajadas["horas"] + " minutos " + statDiarioHrsTrabajadas["horas"] + " Segundos: " + statDiarioHrsTrabajadas["segundos"]);

          t1.setHours(statHrsPlantilla[dias]["horas"], statHrsPlantilla[dias]["minutos"], statHrsPlantilla[dias]["segundos"]);
          t2.setHours(statDiarioHrsTrabajadas["horas"], statDiarioHrsTrabajadas["minutos"], statDiarioHrsTrabajadas["segundos"]);
          
          
          if(t2>t1){ 
            
            t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
          
            console.log("horas extras: " + t2 + " > " + t1);

            console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

            horas_["horas"] = t1.getHours();
            horas_["minutos"] = t1.getMinutes();
            horas_["segundos"] = t1.getSeconds();
          } else {
            
            t1.setHours(t1.getHours() - t2.getHours(),  t1.getMinutes() - t2.getMinutes(),  t1.getSeconds() - t2.getSeconds());

            console.log("no horas extras: " + t2 + " > " + t1);
            
            console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

            horas_["horas"] = -t1.getHours();
            horas_["minutos"] = t1.getMinutes();
            horas_["segundos"] = t1.getSeconds();
          }


        } else {
          
          console.log("Horas: " + statDiarioHrsTrabajadas["horas"] + " Minutos: " + statDiarioHrsTrabajadas["minutos"] + " Segundos: " + statDiarioHrsTrabajadas["segundos"]);

          horas_["horas"] =  statDiarioHrsTrabajadas["horas"];
          horas_["minutos"] = statDiarioHrsTrabajadas["minutos"];
          horas_["segundos"] = statDiarioHrsTrabajadas["segundos"];

        }
        


        console.log("----------FIn statDiarioHorsExtra-------------");

        return horas_;

      },
      statHorasPlantilla: function (plantilla){

        /*
          calcular horas de la plantilla
        */

        var horas_ = Array();

        horas_["lunes"] = Array();
        horas_["lunes"]["activated"] = "-";
        horas_["martes"] = Array();
        horas_["martes"]["activated"] = "-";
        horas_["miercoles"] = Array();
        horas_["miercoles"]["activated"] = "-";
        horas_["jueves"] = Array();
        horas_["jueves"]["activated"] = "-";
        horas_["viernes"] = Array();
        horas_["viernes"]["activated"] = "-";
        horas_["sabado"] = Array();
        horas_["sabado"]["activated"] = "-";
        horas_["domingo"] = Array();
        horas_["domingo"]["activated"] = "-";

        if(plantilla.lunesActivated==1){

          horas_["lunes"] = Array();
          horas_["lunes"]["activated"] = 1;

          var de1Lunes = horasAMPMTo24(plantilla.de1Lunes);
          de1Lunes = de1Lunes.split(":");
          console.log(de1Lunes);

          var a1Lunes = horasAMPMTo24(plantilla.a1Lunes);
          a1Lunes = a1Lunes.split(":");
          console.log(a1Lunes);

          var de2Lunes = horasAMPMTo24(plantilla.de2Lunes);
          de2Lunes = de2Lunes.split(":");
          console.log(de2Lunes);

          var a2Lunes = horasAMPMTo24(plantilla.a2Lunes);
          a2Lunes = a2Lunes.split(":");
          console.log(a2Lunes);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Lunes[0], de1Lunes[1], "00");
          t2.setHours(a1Lunes[0], a1Lunes[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Lunes[0], de2Lunes[1], "00");
          t2.setHours(a2Lunes[0], a2Lunes[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["lunes"]["horas"] = t1.getHours();
          horas_["lunes"]["minutos"] = t1.getMinutes();
          horas_["lunes"]["segundos"] = t1.getSeconds();

        }
        if(plantilla.martesActivated==1){

          horas_["martes"] = Array();
          horas_["martes"]["activated"] = 1;

          var de1Martes = horasAMPMTo24(plantilla.de1Martes);
          de1Martes = de1Martes.split(":");
          console.log(de1Martes);

          var a1Martes = horasAMPMTo24(plantilla.a1Martes);
          a1Martes = a1Martes.split(":");
          console.log(a1Martes);

          var de2Martes = horasAMPMTo24(plantilla.de2Martes);
          de2Martes = de2Martes.split(":");
          console.log(de2Martes);

          var a2Martes = horasAMPMTo24(plantilla.a2Martes);
          a2Martes = a2Martes.split(":");
          console.log(a2Martes);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Martes[0], de1Martes[1], "00");
          t2.setHours(a1Martes[0], a1Martes[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Martes[0], de2Martes[1], "00");
          t2.setHours(a2Martes[0], a2Martes[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["martes"]["horas"] = t1.getHours();
          horas_["martes"]["minutos"] = t1.getMinutes();
          horas_["martes"]["segundos"] = t1.getSeconds();

        }
        if(plantilla.miercolesActivated==1){

          horas_["miercoles"] = Array();
          horas_["miercoles"]["activated"] = 1;

          var de1Miercoles = horasAMPMTo24(plantilla.de1Miercoles);
          de1Miercoles = de1Miercoles.split(":");
          console.log(de1Miercoles);

          var a1Miercoles = horasAMPMTo24(plantilla.a1Miercoles);
          a1Miercoles = a1Miercoles.split(":");
          console.log(a1Miercoles);

          var de2Miercoles = horasAMPMTo24(plantilla.de2Miercoles);
          de2Miercoles = de2Miercoles.split(":");
          console.log(de2Miercoles);

          var a2Miercoles = horasAMPMTo24(plantilla.a2Miercoles);
          a2Miercoles = a2Miercoles.split(":");
          console.log(a2Miercoles);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Miercoles[0], de1Miercoles[1], "00");
          t2.setHours(a1Miercoles[0], a1Miercoles[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Miercoles[0], de2Miercoles[1], "00");
          t2.setHours(a2Miercoles[0], a2Miercoles[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["miercoles"]["horas"] = t1.getHours();
          horas_["miercoles"]["minutos"] = t1.getMinutes();
          horas_["miercoles"]["segundos"] = t1.getSeconds();

        }
        if(plantilla.juevesActivated==1){

          horas_["jueves"] = Array();
          horas_["jueves"]["activated"] = 1;

          var de1Jueves = horasAMPMTo24(plantilla.de1Jueves);
          de1Jueves = de1Jueves.split(":");
          console.log(de1Jueves);

          var a1Jueves = horasAMPMTo24(plantilla.a1Jueves);
          a1Jueves = a1Jueves.split(":");
          console.log(a1Jueves);

          var de2Jueves = horasAMPMTo24(plantilla.de2Jueves);
          de2Jueves = de2Jueves.split(":");
          console.log(de2Jueves);

          var a2Jueves = horasAMPMTo24(plantilla.a2Jueves);
          a2Jueves = a2Jueves.split(":");
          console.log(a2Jueves);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Jueves[0], de1Jueves[1], "00");
          t2.setHours(a1Jueves[0], a1Jueves[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Jueves[0], de2Jueves[1], "00");
          t2.setHours(a2Jueves[0], a2Jueves[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["jueves"]["horas"] = t1.getHours();
          horas_["jueves"]["minutos"] = t1.getMinutes();
          horas_["jueves"]["segundos"] = t1.getSeconds();

        }
        if(plantilla.viernesActivated==1){

          horas_["viernes"] = Array();
          horas_["viernes"]["activated"] = 1;

          var de1Viernes = horasAMPMTo24(plantilla.de1Viernes);
          de1Viernes = de1Viernes.split(":");
          console.log(de1Viernes);

          var a1Viernes = horasAMPMTo24(plantilla.a1Viernes);
          a1Viernes = a1Viernes.split(":");
          console.log(a1Viernes);

          var de2Viernes = horasAMPMTo24(plantilla.de2Viernes);
          de2Viernes = de2Viernes.split(":");
          console.log(de2Viernes);

          var a2Viernes = horasAMPMTo24(plantilla.a2Viernes);
          a2Viernes = a2Viernes.split(":");
          console.log(a2Viernes);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Viernes[0], de1Viernes[1], "00");
          t2.setHours(a1Viernes[0], a1Viernes[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Viernes[0], de2Viernes[1], "00");
          t2.setHours(a2Viernes[0], a2Viernes[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["viernes"]["horas"] = t1.getHours();
          horas_["viernes"]["minutos"] = t1.getMinutes();
          horas_["viernes"]["segundos"] = t1.getSeconds();

        }
        if(plantilla.sabadoActivated==1){

          horas_["sabado"] = Array();
          horas_["sabado"]["activated"] = 1;

          var de1Sabado = horasAMPMTo24(plantilla.de1Sabado);
          de1Sabado = de1Sabado.split(":");
          console.log(de1Sabado);

          var a1Sabado = horasAMPMTo24(plantilla.a1Sabado);
          a1Sabado = a1Sabado.split(":");
          console.log(a1Sabado);

          var de2Sabado = horasAMPMTo24(plantilla.de2Sabado);
          de2Sabado = de2Sabado.split(":");
          console.log(de2Sabado);

          var a2Sabado = horasAMPMTo24(plantilla.a2Sabado);
          a2Sabado = a2Sabado.split(":");
          console.log(a2Sabado);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Sabado[0], de1Sabado[1], "00");
          t2.setHours(a1Sabado[0], a1Sabado[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Sabado[0], de2Sabado[1], "00");
          t2.setHours(a2Sabado[0], a2Sabado[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["sabado"]["horas"] = t1.getHours();
          horas_["sabado"]["minutos"] = t1.getMinutes();
          horas_["sabado"]["segundos"] = t1.getSeconds();

        }
        if(plantilla.domingoActivated==1){

          console.log("Domingo Activado");
          
          horas_["domingo"] = Array();
          horas_["domingo"]["activated"] = 1;

          var de1Domingo = horasAMPMTo24(plantilla.de1Domingo);
          de1Domingo = de1Domingo.split(":");
          console.log(de1Domingo);

          var a1Domingo = horasAMPMTo24(plantilla.a1Domingo);
          a1Domingo = a1Domingo.split(":");
          console.log(a1Domingo);

          var de2Domingo = horasAMPMTo24(plantilla.de2Domingo);
          de2Domingo = de2Domingo.split(":");
          console.log(de2Domingo);

          var a2Domingo = horasAMPMTo24(plantilla.a2Domingo);
          a2Domingo = a2Domingo.split(":");
          console.log(a2Domingo);

          var t1 = new Date(),
              t2 = new Date(),
              de1a1 = new Date(),
              de2a2 = new Date();
          

          //de1 a a1

          t1.setHours(de1Domingo[0], de1Domingo[1], "00");
          t2.setHours(a1Domingo[0], a1Domingo[1], "00");

          //Aquí hago la resta
          de1a1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de1a1.getHours() + " Minutos: " + de1a1.getMinutes() + " Segundos: " + de1a1.getSeconds());


          //de2 a a2

          t1.setHours(de2Domingo[0], de2Domingo[1], "00");
          t2.setHours(a2Domingo[0], a2Domingo[1], "00");
          
          //Aquí hago la resta
          de2a2.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());

          console.log("Horas: " + de2a2.getHours() + " Minutos: " + de2a2.getMinutes() + " Segundos: " + de2a2.getSeconds());

          //de1 a a1 y de de2 a a2
          //aquí hago la suma
          t1.setHours(de1a1.getHours() + de2a2.getHours(),  de1a1.getMinutes() + de2a2.getMinutes(), de1a1.getSeconds() + de2a2.getSeconds());

          console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

          horas_["domingo"]["horas"] = t1.getHours();
          horas_["domingo"]["minutos"] = t1.getMinutes();
          horas_["domingo"]["segundos"] = t1.getSeconds();

        }

        return horas_;

        
      },
      limpiarEntradasSeguidasDeSalidas: function(data){

        var registrosEntSal = Array();

        

        //Limpiar y guardar arreglo por entrada seguido de salida para facilitar el cálculo y toma en cuenta que sea computarizable
        var x=0;
        for(var i=0; i<data.length; i++){

          i = x;

          console.log("Vueltas i: " + i + " Vueltas x: " + x);

          console.log(data[i]);
          if(data[i].tipo=="entrada"){

            registrosEntSal.push(data[i]);

            var encontroPareja = 0;

            for(var y=x; y<data.length; y++){

              var fecha = data[y].fecha.toString().split(" ");
              var fecha2 = registrosEntSal[registrosEntSal.length-1].fecha.toString().split(" ");
    
              if(data[y].tipo!=registrosEntSal[registrosEntSal.length-1].tipo  && fecha[0]==fecha2[0] && (data[y].tipo=="salida" && data[y].computable==1)){
                console.log("encontró Vueltas i: " + i + " Vueltas y: " + y);

                registrosEntSal.push(data[y]);
                encontroPareja = 1;
                x=y+1;
                i = x;
                break;
              } else if(fecha[0]!=fecha2[0]) {
                x=y;
                i = x;
                break;
              }

            }//fin for

            if(encontroPareja==0){
              console.log("no encontró pareja");
              registrosEntSal.pop();
              x=y;
              i = x;
            }
          } else {
            console.log("no es entrada");
            x++;
            i = x;
          }

        }//fin for

        return registrosEntSal;
      },
      statIntervalosHrsTrabajadas: function(fechaInicio, fechaFin, registros){
        console.log("[factory][statIntervalosHrsTrabajadas]");

        console.log("Fecha Fin");
        console.log(fechaFin);

        var finhora = fechaFin.getHours(),
                    finminutos = fechaFin.getMinutes(),
                    finsegundos = fechaFin.getSeconds(),
                    findiaSemana = fechaFin.getDay(),
                    findia = fechaFin.getDate(),
                    finmes = fechaFin.getMonth(),
                    finanio = fechaFin.getFullYear(),
                    finampm;

        console.log("Fecha Inicio");
        console.log(fechaInicio);

        //var fechaInicio= new Date(moment(fechaInicio).format('YYYY-MM-DD HH:mm:ss'));
        
        var phora = fechaInicio.getHours(),
                    pminutos = fechaInicio.getMinutes(),
                    psegundos = fechaInicio.getSeconds(),
                    pdiaSemana = fechaInicio.getDay(),
                    pdia = fechaInicio.getDate(),
                    pmes = fechaInicio.getMonth(),
                    panio = fechaInicio.getFullYear(),
                    pampm;

        console.log("[statIntervalosHrsTrabajadas] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio);

        var registrosIntervalo = Array();

        //obtener registros solo del último mes
        for(var i=0; i<registros.length; i++){

          
          fechaRegistro =  new Date(registros[i].fecha);

          var rhora = fechaRegistro.getHours(),
              rminutos = fechaRegistro.getMinutes(),
              rsegundos = fechaRegistro.getSeconds(),
              rdiaSemana = fechaRegistro.getDay(),
              rdia = fechaRegistro.getDate(),
              rmes = fechaRegistro.getMonth(),
              ranio = fechaRegistro.getFullYear(),
              rampm;

          var fechaRestar = panio + "-" + pmes + "-" + pdia; 
          var fechaRestar2 = ranio + "-" + rmes + "-" + rdia; 
          var fechaRestar3 = finanio + "-" + finmes + "-" + findia; 

          console.log(fechaRestar + " " + phora + ":" + pminutos + ":" + psegundos);
          console.log(fechaRestar2 + " " + rhora + ":" + rminutos + ":" + rsegundos);
          console.log(fechaRestar3 + " " + finhora + ":" + finminutos + ":" + finsegundos);

          console.log(restaFechas3(fechaRestar, fechaRestar2) + " VS " + restaFechas3(fechaRestar, fechaRestar3))

          if(restaFechas3(fechaRestar, fechaRestar2) <= restaFechas3(fechaRestar, fechaRestar3) && restaFechas3(fechaRestar, fechaRestar2) >= 0){
            registrosIntervalo.push(registros[i]);
          }

        }//fin for

        console.log("Entrada en intervalo:");

        console.log(registrosIntervalo);

        //limpiar entradas seguidas de salidas
        var registrosEntSal = this.limpiarEntradasSeguidasDeSalidas(registrosIntervalo);

        console.log("Entradas seguidas de Salidas (limpiadas):");

        console.log(registrosEntSal);

        //calculo de horas trabajadas de la semana
        var horas = 0;
        var minutos = 0;
        var segundos = 0;

        var horas_ = Array();

        horas_["horas"] = horas;
        horas_["minutos"] = minutos;
        horas_["segundos"] = segundos;
        horas_["semana"] = Array();
        horas_["semana"]["hora"] = Array();
        horas_["semana"]["hora"]["horas"] = Array();
        horas_["semana"]["hora"]["minutos"] = Array();
        horas_["semana"]["hora"]["segundos"] = Array();
        horas_["semana"]["dias"] = Array();
        horas_["semana"]["fechas"] = Array();

        for(var i=0; i<registrosEntSal.length; i=i+2){

          //se sale del arreglo al llegar al final
          if(registrosEntSal[i+1]!=undefined){

            if(registrosEntSal[i].tipo=="entrada" && registrosEntSal[i+1].tipo=="salida"){

              console.log("Calcular: " + i + "  " + (i+1));

              fecha1 = registrosEntSal[i].fecha.toString().split(" ");
              fecha2 = registrosEntSal[i+1].fecha.toString().split(" ");

              var hora1 = (fecha1[1]).toString().split(":"),
              hora2 = (fecha2[1]).toString().split(":"),
              t1 = new Date(),
              t2 = new Date();

              t1.setHours(hora1[0], hora1[1], hora1[2]);
              t2.setHours(hora2[0], hora2[1], hora2[2]);
              
              //Aquí hago la resta
              t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
              
              console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

              horas = horas + t1.getHours();
              minutos = minutos + t1.getMinutes();
              segundos = segundos + t1.getSeconds();

              fechaRegistro =  new Date(registrosEntSal[i].fecha);

              var rhora = fechaRegistro.getHours(),
                  rminutos = fechaRegistro.getMinutes(),
                  rsegundos = fechaRegistro.getSeconds(),
                  rdiaSemana = fechaRegistro.getDay(),
                  rdia = fechaRegistro.getDate(),
                  rmes = fechaRegistro.getMonth(),
                  ranio = fechaRegistro.getFullYear(),
                  rampm;

              var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
          
              var dias = semana[rdiaSemana];

              horas_["semana"]["hora"]["horas"].push(t1.getHours());
              horas_["semana"]["hora"]["minutos"].push(t1.getMinutes());
              horas_["semana"]["hora"]["segundos"].push(t1.getSeconds());
              horas_["semana"]["dias"].push(dias);
              horas_["semana"]["fechas"].push(fechaRegistro);

              console.log("No Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

              if(segundos>59){
                var segundosEntero = (segundos/60);
                segundosEntero = segundosEntero.toString().split(".");
                minutos = minutos + parseInt(segundosEntero[0]);
                segundos = segundos%60;
              }

              if(minutos>59){
                var minutosEntero = (minutos/60);
                minutosEntero = minutosEntero.toString().split(".");
                horas = horas + parseInt(minutosEntero[0]);
                minutos = minutos%60;
              }

              horas_["horas"] = horas;
              horas_["minutos"] = minutos;
              horas_["segundos"] = segundos;

              console.log("Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

            }

          }

        }//fin for

        console.log("Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

        //número de salidas
        horas_["salidas"] = Array();
        horas_["salidas"]["nombres"] = Array();
        horas_["salidas"]["descanzosTotales"] = 0;

        console.log("Calculo Salidas");

        aux = Array();

        for(var i=0; i<registrosEntSal.length; i++){

          if(registrosEntSal[i].tipo=="salida"){

            console.log(registrosEntSal[i].fecha.substring(0,10));

            if(horas_["salidas"]["nombres"][registrosEntSal[i].nombreSalida]!=undefined){
              horas_["salidas"]["nombres"][registrosEntSal[i].nombreSalida] = 1 + horas_["salidas"]["nombres"][registrosEntSal[i].nombreSalida];
            } else {
              horas_["salidas"]["nombres"][registrosEntSal[i].nombreSalida] = 1;
            }

            if(aux[registrosEntSal[i].fecha.substring(0,10)]!=undefined && aux[registrosEntSal[i].fecha.substring(0,10)]==1){
              horas_["salidas"]["descanzosTotales"] = horas_["salidas"]["descanzosTotales"] + 1;
            }

            aux[registrosEntSal[i].fecha.substring(0,10)] = 1;

          }

        }

        console.log(horas_);

        return horas_;

      },
      statMesHrsTrabajadas: function(fecha, registros){
        console.log("[factory][statMesHrsTrabajadas]");

        console.log(fecha);

        var hoyhora = fecha.getHours(),
                    hoyminutos = fecha.getMinutes(),
                    hoysegundos = fecha.getSeconds(),
                    hoydiaSemana = fecha.getDay(),
                    hoydia = fecha.getDate(),
                    hoymes = fecha.getMonth(),
                    hoyanio = fecha.getFullYear(),
                    hoyampm;

        var fecha= new Date(moment(fecha).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'));

        console.log(fecha);
        
        var phora = fecha.getHours(),
                    pminutos = fecha.getMinutes(),
                    psegundos = fecha.getSeconds(),
                    pdiaSemana = fecha.getDay(),
                    pdia = fecha.getDate(),
                    pmes = fecha.getMonth(),
                    panio = fecha.getFullYear(),
                    pampm;

        console.log("[statMesHrsTrabajadas] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio);

        var registrosMes = Array();

        //obtener registros solo del último mes
        for(var i=0; i<registros.length; i++){

          
          fechaRegistro =  new Date(registros[i].fecha);

          var rhora = fechaRegistro.getHours(),
              rminutos = fechaRegistro.getMinutes(),
              rsegundos = fechaRegistro.getSeconds(),
              rdiaSemana = fechaRegistro.getDay(),
              rdia = fechaRegistro.getDate(),
              rmes = fechaRegistro.getMonth(),
              ranio = fechaRegistro.getFullYear(),
              rampm;

          var fechaRestar = panio + "-" + pmes + "-" + pdia; 
          var fechaRestar2 = ranio + "-" + rmes + "-" + rdia; 

          console.log(fechaRestar);
          console.log(fechaRestar2);

          console.log(restaFechas3(fechaRestar, fechaRestar2))

          if(restaFechas3(fechaRestar, fechaRestar2) <= 31 && restaFechas3(fechaRestar, fechaRestar2) >= 0 &&
            (hoymes==rmes)){
            registrosMes.push(registros[i]);
          }

        }//fin for

        console.log("Entrada el Última Mes:");

        console.log(registrosMes);

        //limpiar entradas seguidas de salidas
        var registrosEntSal = this.limpiarEntradasSeguidasDeSalidas(registrosMes);

        console.log("Entradas seguidas de Salidas (limpiadas):");

        console.log(registrosEntSal);

        //calculo de horas trabajadas de la semana
        var horas = 0;
        var minutos = 0;
        var segundos = 0;

        var horas_ = Array();

        horas_["horas"] = horas;
        horas_["minutos"] = minutos;
        horas_["segundos"] = segundos;
        horas_["semana"] = Array();
        horas_["semana"]["hora"] = Array();
        horas_["semana"]["hora"]["horas"] = Array();
        horas_["semana"]["hora"]["minutos"] = Array();
        horas_["semana"]["hora"]["segundos"] = Array();
        horas_["semana"]["dias"] = Array();
        horas_["semana"]["fechas"] = Array();

        for(var i=0; i<registrosEntSal.length; i=i+2){

          //se sale del arreglo al llegar al final
          if(registrosEntSal[i+1]!=undefined){

            if(registrosEntSal[i].tipo=="entrada" && registrosEntSal[i+1].tipo=="salida"){

              console.log("Calcular: " + i + "  " + (i+1));

              fecha1 = registrosEntSal[i].fecha.toString().split(" ");
              fecha2 = registrosEntSal[i+1].fecha.toString().split(" ");

              var hora1 = (fecha1[1]).toString().split(":"),
              hora2 = (fecha2[1]).toString().split(":"),
              t1 = new Date(),
              t2 = new Date();

              t1.setHours(hora1[0], hora1[1], hora1[2]);
              t2.setHours(hora2[0], hora2[1], hora2[2]);
              
              //Aquí hago la resta
              t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
              
              console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

              horas = horas + t1.getHours();
              minutos = minutos + t1.getMinutes();
              segundos = segundos + t1.getSeconds();

              fechaRegistro =  new Date(registrosEntSal[i].fecha);

              var rhora = fechaRegistro.getHours(),
                  rminutos = fechaRegistro.getMinutes(),
                  rsegundos = fechaRegistro.getSeconds(),
                  rdiaSemana = fechaRegistro.getDay(),
                  rdia = fechaRegistro.getDate(),
                  rmes = fechaRegistro.getMonth(),
                  ranio = fechaRegistro.getFullYear(),
                  rampm;

              var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
          
              var dias = semana[rdiaSemana];

              horas_["semana"]["hora"]["horas"].push(t1.getHours());
              horas_["semana"]["hora"]["minutos"].push(t1.getMinutes());
              horas_["semana"]["hora"]["segundos"].push(t1.getSeconds());
              horas_["semana"]["dias"].push(dias);
              horas_["semana"]["fechas"].push(fechaRegistro);

              console.log("No Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

              if(segundos>59){
                var segundosEntero = (segundos/60);
                segundosEntero = segundosEntero.toString().split(".");
                minutos = minutos + parseInt(segundosEntero[0]);
                segundos = segundos%60;
              }

              if(minutos>59){
                var minutosEntero = (minutos/60);
                minutosEntero = minutosEntero.toString().split(".");
                horas = horas + parseInt(minutosEntero[0]);
                minutos = minutos%60;
              }

              horas_["horas"] = horas;
              horas_["minutos"] = minutos;
              horas_["segundos"] = segundos;

              console.log("Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

            }

          }

        }//fin for

        console.log("Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

        return horas_;

        

      },
      statSemanalHrsTrabajadas: function(fecha, registros){
        console.log("[factory][statSemanalHrsTrabajadas]");

        console.log(fecha);

        var fecha= new Date(moment(fecha).subtract(168, 'hour').format('YYYY-MM-DD HH:mm:ss'));

        console.log(fecha);
        
        var phora = fecha.getHours(),
                    pminutos = fecha.getMinutes(),
                    psegundos = fecha.getSeconds(),
                    pdiaSemana = fecha.getDay(),
                    pdia = fecha.getDate(),
                    pmes = fecha.getMonth(),
                    panio = fecha.getFullYear(),
                    pampm;

        console.log("[statDiarioHrsTrabajadas] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio);

        var registrosSemana = Array();

        //obtener registros solo de la última semana
        for(var i=0; i<registros.length; i++){

          
          fechaRegistro =  new Date(registros[i].fecha);

          var rhora = fechaRegistro.getHours(),
              rminutos = fechaRegistro.getMinutes(),
              rsegundos = fechaRegistro.getSeconds(),
              rdiaSemana = fechaRegistro.getDay(),
              rdia = fechaRegistro.getDate(),
              rmes = fechaRegistro.getMonth(),
              ranio = fechaRegistro.getFullYear(),
              rampm;

          var fechaRestar = panio + "-" + pmes + "-" + pdia; 
          var fechaRestar2 = ranio + "-" + rmes + "-" + rdia; 

          console.log(fechaRestar);
          console.log(fechaRestar2);

          console.log(restaFechas3(fechaRestar, fechaRestar2))

          if(restaFechas3(fechaRestar, fechaRestar2) <= 7 && restaFechas3(fechaRestar, fechaRestar2) > 0){
            registrosSemana.push(registros[i]);
          }

        }//fin for

        console.log("Entradas de la Última Semana:");

        console.log(registrosSemana);

        //limpiar entradas seguidas de salidas
        var registrosEntSal = this.limpiarEntradasSeguidasDeSalidas(registrosSemana);

        console.log("Entradas seguidas de Salidas (limpiadas):");

        console.log(registrosEntSal);

        //calculo de horas trabajadas de la semana
        var horas = 0;
        var minutos = 0;
        var segundos = 0;

        var horas_ = Array();

        horas_["horas"] = horas;
        horas_["minutos"] = minutos;
        horas_["segundos"] = segundos;
        horas_["semana"] = Array();
        horas_["semana"]["hora"] = Array();
        horas_["semana"]["hora"]["horas"] = Array();
        horas_["semana"]["hora"]["minutos"] = Array();
        horas_["semana"]["hora"]["segundos"] = Array();
        horas_["semana"]["dias"] = Array();
        horas_["semana"]["fechas"] = Array();

        for(var i=0; i<registrosEntSal.length; i=i+2){

          //se sale del arreglo al llegar al final
          if(registrosEntSal[i+1]!=undefined){

            if(registrosEntSal[i].tipo=="entrada" && registrosEntSal[i+1].tipo=="salida"){

              console.log("Calcular: " + i + "  " + (i+1));

              fecha1 = registrosEntSal[i].fecha.toString().split(" ");
              fecha2 = registrosEntSal[i+1].fecha.toString().split(" ");

              var hora1 = (fecha1[1]).toString().split(":"),
              hora2 = (fecha2[1]).toString().split(":"),
              t1 = new Date(),
              t2 = new Date();

              t1.setHours(hora1[0], hora1[1], hora1[2]);
              t2.setHours(hora2[0], hora2[1], hora2[2]);
              
              //Aquí hago la resta de entrada y salida
              t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
              
              console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

              horas = parseInt(horas) + parseInt(t1.getHours());
              minutos = parseInt(minutos) + parseInt(t1.getMinutes());
              segundos = parseInt(segundos) + parseInt(t1.getSeconds());

              fechaRegistro =  new Date(registrosEntSal[i].fecha);

              var rhora = fechaRegistro.getHours(),
                  rminutos = fechaRegistro.getMinutes(),
                  rsegundos = fechaRegistro.getSeconds(),
                  rdiaSemana = fechaRegistro.getDay(),
                  rdia = fechaRegistro.getDate(),
                  rmes = fechaRegistro.getMonth(),
                  ranio = fechaRegistro.getFullYear(),
                  rampm;

              var semana = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
              var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
          
              var dias = semana[rdiaSemana];

              horas_["semana"]["hora"]["horas"].push(t1.getHours());
              horas_["semana"]["hora"]["minutos"].push(t1.getMinutes());
              horas_["semana"]["hora"]["segundos"].push(t1.getSeconds());
              horas_["semana"]["dias"].push(dias);
              horas_["semana"]["fechas"].push(fechaRegistro);

              console.log("No Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

              if(segundos>59){
                var segundosEntero = (segundos/60);
                segundosEntero = segundosEntero.toString().split(".");
                minutos = minutos + parseInt(segundosEntero[0]);
                segundos = segundos%60;
              }

              if(minutos>59){
                var minutosEntero = (minutos/60);
                minutosEntero = minutosEntero.toString().split(".");
                horas = horas + parseInt(minutosEntero[0]);
                minutos = minutos%60;
              }

              horas_["horas"] = horas;
              horas_["minutos"] = minutos;
              horas_["segundos"] = segundos;

              console.log("Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

            }

          }

        }//fin for

        console.log("Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

        return horas_;

      },
      statDiarioHrsTrabajadas: function(fecha, registros){
        console.log("[factory][statDiarioHrsTrabajadas]");

        console.log(fecha);

        var phora = fecha.getHours(),
                    pminutos = fecha.getMinutes(),
                    psegundos = fecha.getSeconds(),
                    pdiaSemana = fecha.getDay(),
                    pdia = fecha.getDate(),
                    pmes = fecha.getMonth(),
                    panio = fecha.getFullYear(),
                    pampm;

        console.log("[statDiarioHrsTrabajadas] pdia busca: " + pdia + " pmes: " + pmes + " panio: " + panio);

        var registrosHoy = Array();

        //obtener registros solo de hoy
        for(var i=0; i<registros.length; i++){

          fechaRegistro =  new Date(registros[i].fecha);

          var rhora = fechaRegistro.getHours(),
              rminutos = fechaRegistro.getMinutes(),
              rsegundos = fechaRegistro.getSeconds(),
              rdiaSemana = fechaRegistro.getDay(),
              rdia = fechaRegistro.getDate(),
              rmes = fechaRegistro.getMonth(),
              ranio = fechaRegistro.getFullYear(),
              rampm;

          //por el día, mes y año, por que solo se jalo el mes actual de 01 a 31
          if(pdia==rdia && pmes==rmes && panio==ranio){
            registrosHoy.push(registros[i]);
          }

        }//fin for

        console.log("Entradas Hoy:");

        console.log(registrosHoy);

        //limpiar entradas seguidas de salidas
        var registrosEntSal = this.limpiarEntradasSeguidasDeSalidas(registrosHoy);

        console.log("Entradas seguidas de Salidas (limpiadas):");

        console.log(registrosEntSal);

        //calculo de horas trabajadas de hoy
        var horas = 0;
        var minutos = 0;
        var segundos = 0;

        var horas_ = Array();
        
        horas_["horas"] = horas;
        horas_["minutos"] = minutos;
        horas_["segundos"] = segundos;

        for(var i=0; i<registrosEntSal.length; i=i+2){

          //se sale del arreglo al llegar al final
          if(registrosEntSal[i+1]!=undefined){

            if(registrosEntSal[i].tipo=="entrada" && registrosEntSal[i+1].tipo=="salida"){

              console.log("Calcular: " + i + "  " + (i+1));

              fecha1 = registrosEntSal[i].fecha.toString().split(" ");
              fecha2 = registrosEntSal[i+1].fecha.toString().split(" ");

              var hora1 = (fecha1[1]).toString().split(":"),
              hora2 = (fecha2[1]).toString().split(":"),
              t1 = new Date(),
              t2 = new Date();

              t1.setHours(hora1[0], hora1[1], hora1[2]);
              t2.setHours(hora2[0], hora2[1], hora2[2]);
              
              //Aquí hago la resta
              t1.setHours(t2.getHours() - t1.getHours(),  t2.getMinutes() - t1.getMinutes(), t2.getSeconds() - t1.getSeconds());
              
              console.log("Horas: " + t1.getHours() + " Minutos: " + t1.getMinutes() + " Segundos: " + t1.getSeconds());

              horas = parseInt(horas) + parseInt(t1.getHours());
              minutos = parseInt(minutos) + parseInt(t1.getMinutes());
              segundos = parseInt(segundos) + parseInt(t1.getSeconds());

              console.log("No Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

              if(segundos>59){
                var segundosEntero = (segundos/60);
                segundosEntero = segundosEntero.toString().split(".");
                minutos = minutos + parseInt(segundosEntero[0]);
                segundos = segundos%60;
              }

              if(minutos>59){
                var minutosEntero = (minutos/60);
                minutosEntero = minutosEntero.toString().split(".");
                horas = horas + parseInt(minutosEntero[0]);
                minutos = minutos%60;
              }

              horas_["horas"] = horas;
              horas_["minutos"] = minutos;
              horas_["segundos"] = segundos;

              console.log("Compensar Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

            }

          }

        }//fin for

        console.log("Horas: " + horas + " Minutos: " + minutos + " Segundos: " + segundos);

        return horas_;

      },
      postPlantilla: function(nombrePlantilla, 
        lunesActivated, turnoLunes, de1Lunes, a1Lunes, de2Lunes, a2Lunes,
        martesActivated, turnoMartes, de1Martes, a1Martes, de2Martes, a2Martes,
        miercolesActivated, turnoMiercoles, de1Miercoles, a1Miercoles, de2Miercoles, a2Miercoles,
        juevesActivated, turnoJueves, de1Jueves, a1Jueves, de2Jueves, a2Jueves,
        viernesActivated, turnoViernes, de1Viernes, a1Viernes, de2Viernes, a2Viernes,
        sabadoActivated, turnoSabado, de1Sabado, a1Sabado, de2Sabado, a2Sabado,
        domingoActivated, turnoDomingo, de1Domingo, a1Domingo, de2Domingo, a2Domingo) {

        console.log("[factory][postPlantilla]");

        console.log("[nuevaplantilla][send] nombrePlantilla: " + nombrePlantilla);
        
        console.log("[nuevaplantilla][send] lunesActivated: " + lunesActivated);
        console.log("[nuevaplantilla][send] de1Lunes: " + de1Lunes);
        console.log("[nuevaplantilla][send] a1Lunes: " + a1Lunes);
        console.log("[nuevaplantilla][send] de2Lunes: " + de2Lunes);
        console.log("[nuevaplantilla][send] a2Lunes: " + a2Lunes);
        console.log("[nuevaplantilla][send] turnoLunes: " + turnoLunes);
        
        console.log("[nuevaplantilla][send] martesActivated: " + martesActivated);
        console.log("[nuevaplantilla][send] de1Martes: " + de1Martes);
        console.log("[nuevaplantilla][send] a1Martes: " + a1Martes);
        console.log("[nuevaplantilla][send] de2Martes: " + de2Martes);
        console.log("[nuevaplantilla][send] a2Martes: " + a2Martes);
        console.log("[nuevaplantilla][send] turnoMartes: " + turnoMartes);
        
        console.log("[nuevaplantilla][send] miercolesActivated: " + miercolesActivated);
        console.log("[nuevaplantilla][send] de1Miercoles: " + de1Miercoles);
        console.log("[nuevaplantilla][send] a1Miercoles: " + a1Miercoles);
        console.log("[nuevaplantilla][send] de2Miercoles: " + de2Miercoles);
        console.log("[nuevaplantilla][send] a2Miercoles: " + a2Miercoles);
        console.log("[nuevaplantilla][send] turnoMiercoles: " + turnoMiercoles);
        
        console.log("[nuevaplantilla][send] juevesActivated: " + juevesActivated);
        console.log("[nuevaplantilla][send] de1Jueves: " + de1Jueves);
        console.log("[nuevaplantilla][send] a1Jueves: " + a1Jueves);
        console.log("[nuevaplantilla][send] de2Jueves: " + de2Jueves);
        console.log("[nuevaplantilla][send] a2Jueves: " + a2Jueves);
        console.log("[nuevaplantilla][send] turnoJueves: " + turnoJueves);
        
        console.log("[nuevaplantilla][send] viernesActivated: " + viernesActivated);
        console.log("[nuevaplantilla][send] de1Viernes: " + de1Viernes);
        console.log("[nuevaplantilla][send] a1Viernes: " + a1Viernes);
        console.log("[nuevaplantilla][send] de2Viernes: " + de2Viernes);
        console.log("[nuevaplantilla][send] a2Viernes: " + a2Viernes);
        console.log("[nuevaplantilla][send] turnoViernes: " + turnoViernes);
        
        console.log("[nuevaplantilla][send] sabadoActivated: " + sabadoActivated);
        console.log("[nuevaplantilla][send] de1Sabado: " + de1Sabado);
        console.log("[nuevaplantilla][send] a1Sabado: " + a1Sabado);
        console.log("[nuevaplantilla][send] de2Sabado: " + de2Sabado);
        console.log("[nuevaplantilla][send] a2Sabado: " + a2Sabado);
        console.log("[nuevaplantilla][send] turnoSabado: " + turnoSabado);
        
        console.log("[nuevaplantilla][send] domingoActivated: " + domingoActivated);
        console.log("[nuevaplantilla][send] de1Domingo: " + de1Domingo);
        console.log("[nuevaplantilla][send] a1Domingo: " + a1Domingo);
        console.log("[nuevaplantilla][send] de2Domingo: " + de2Domingo);
        console.log("[nuevaplantilla][send] a2Domingo: " + a2Domingo);
        console.log("[nuevaplantilla][send] turnoDomingo: " + turnoDomingo);

        var url = '/api/empresas/plantilla/nueva';
        return $http.post(url, {cache: false, nombrePlantilla:nombrePlantilla, 
            lunesActivated:lunesActivated, turnoLunes:turnoLunes, de1Lunes:de1Lunes, a1Lunes:a1Lunes, de2Lunes:de2Lunes, a2Lunes:a2Lunes,
            martesActivated:martesActivated, turnoMartes:turnoMartes, de1Martes:de1Martes, a1Martes:a1Martes, de2Martes:de2Martes, a2Martes:a2Martes,
            miercolesActivated:miercolesActivated, turnoMiercoles:turnoMiercoles, de1Miercoles:de1Miercoles, a1Miercoles:a1Miercoles, de2Miercoles:de2Miercoles, a2Miercoles:a2Miercoles,
            juevesActivated:juevesActivated, turnoJueves:turnoJueves, de1Jueves:de1Jueves, a1Jueves:a1Jueves, de2Jueves:de2Jueves, a2Jueves:a2Jueves,
            viernesActivated:viernesActivated, turnoViernes:turnoViernes, de1Viernes:de1Viernes, a1Viernes:a1Viernes, de2Viernes:de2Viernes, a2Viernes:a2Viernes,
            sabadoActivated:sabadoActivated, turnoSabado:turnoSabado, de1Sabado:de1Sabado, a1Sabado:a1Sabado, de2Sabado:de2Sabado, a2Sabado:a2Sabado,
            domingoActivated:domingoActivated, turnoDomingo:turnoDomingo, de1Domingo:de1Domingo, a1Domingo:a1Domingo, de2Domingo:de2Domingo, a2Domingo:a2Domingo
        });

      },
      modPlantilla: function(id_plantilla, nombrePlantilla, 
        lunesActivated, turnoLunes, de1Lunes, a1Lunes, de2Lunes, a2Lunes,
        martesActivated, turnoMartes, de1Martes, a1Martes, de2Martes, a2Martes,
        miercolesActivated, turnoMiercoles, de1Miercoles, a1Miercoles, de2Miercoles, a2Miercoles,
        juevesActivated, turnoJueves, de1Jueves, a1Jueves, de2Jueves, a2Jueves,
        viernesActivated, turnoViernes, de1Viernes, a1Viernes, de2Viernes, a2Viernes,
        sabadoActivated, turnoSabado, de1Sabado, a1Sabado, de2Sabado, a2Sabado,
        domingoActivated, turnoDomingo, de1Domingo, a1Domingo, de2Domingo, a2Domingo) {

        console.log("[factory][modPlantilla]");

        console.log("[modPlantilla][send] id_plantilla: " + id_plantilla);

        console.log("[modPlantilla][send] nombrePlantilla: " + nombrePlantilla);
        
        console.log("[modPlantilla][send] lunesActivated: " + lunesActivated);
        console.log("[modPlantilla][send] de1Lunes: " + de1Lunes);
        console.log("[modPlantilla][send] a1Lunes: " + a1Lunes);
        console.log("[modPlantilla][send] de2Lunes: " + de2Lunes);
        console.log("[modPlantilla][send] a2Lunes: " + a2Lunes);
        console.log("[modPlantilla][send] turnoLunes: " + turnoLunes);
        
        console.log("[modPlantilla][send] martesActivated: " + martesActivated);
        console.log("[modPlantilla][send] de1Martes: " + de1Martes);
        console.log("[modPlantilla][send] a1Martes: " + a1Martes);
        console.log("[modPlantilla][send] de2Martes: " + de2Martes);
        console.log("[modPlantilla][send] a2Martes: " + a2Martes);
        console.log("[modPlantilla][send] turnoMartes: " + turnoMartes);
        
        console.log("[modPlantilla][send] miercolesActivated: " + miercolesActivated);
        console.log("[modPlantilla][send] de1Miercoles: " + de1Miercoles);
        console.log("[modPlantilla][send] a1Miercoles: " + a1Miercoles);
        console.log("[modPlantilla][send] de2Miercoles: " + de2Miercoles);
        console.log("[modPlantilla][send] a2Miercoles: " + a2Miercoles);
        console.log("[modPlantilla][send] turnoMiercoles: " + turnoMiercoles);
        
        console.log("[modPlantilla][send] juevesActivated: " + juevesActivated);
        console.log("[modPlantilla][send] de1Jueves: " + de1Jueves);
        console.log("[modPlantilla][send] a1Jueves: " + a1Jueves);
        console.log("[modPlantilla][send] de2Jueves: " + de2Jueves);
        console.log("[modPlantilla][send] a2Jueves: " + a2Jueves);
        console.log("[modPlantilla][send] turnoJueves: " + turnoJueves);
        
        console.log("[modPlantilla][send] viernesActivated: " + viernesActivated);
        console.log("[modPlantilla][send] de1Viernes: " + de1Viernes);
        console.log("[modPlantilla][send] a1Viernes: " + a1Viernes);
        console.log("[modPlantilla][send] de2Viernes: " + de2Viernes);
        console.log("[modPlantilla][send] a2Viernes: " + a2Viernes);
        console.log("[modPlantilla][send] turnoViernes: " + turnoViernes);
        
        console.log("[modPlantilla][send] sabadoActivated: " + sabadoActivated);
        console.log("[modPlantilla][send] de1Sabado: " + de1Sabado);
        console.log("[modPlantilla][send] a1Sabado: " + a1Sabado);
        console.log("[modPlantilla][send] de2Sabado: " + de2Sabado);
        console.log("[modPlantilla][send] a2Sabado: " + a2Sabado);
        console.log("[modPlantilla][send] turnoSabado: " + turnoSabado);
        
        console.log("[modPlantilla][send] domingoActivated: " + domingoActivated);
        console.log("[modPlantilla][send] de1Domingo: " + de1Domingo);
        console.log("[modPlantilla][send] a1Domingo: " + a1Domingo);
        console.log("[modPlantilla][send] de2Domingo: " + de2Domingo);
        console.log("[modPlantilla][send] a2Domingo: " + a2Domingo);
        console.log("[modPlantilla][send] turnoDomingo: " + turnoDomingo);

        var url = '/api/empresas/plantilla/mod';
        return $http.post(url, {cache: false, id_plantilla:id_plantilla, nombrePlantilla:nombrePlantilla, 
            lunesActivated:lunesActivated, turnoLunes:turnoLunes, de1Lunes:de1Lunes, a1Lunes:a1Lunes, de2Lunes:de2Lunes, a2Lunes:a2Lunes,
            martesActivated:martesActivated, turnoMartes:turnoMartes, de1Martes:de1Martes, a1Martes:a1Martes, de2Martes:de2Martes, a2Martes:a2Martes,
            miercolesActivated:miercolesActivated, turnoMiercoles:turnoMiercoles, de1Miercoles:de1Miercoles, a1Miercoles:a1Miercoles, de2Miercoles:de2Miercoles, a2Miercoles:a2Miercoles,
            juevesActivated:juevesActivated, turnoJueves:turnoJueves, de1Jueves:de1Jueves, a1Jueves:a1Jueves, de2Jueves:de2Jueves, a2Jueves:a2Jueves,
            viernesActivated:viernesActivated, turnoViernes:turnoViernes, de1Viernes:de1Viernes, a1Viernes:a1Viernes, de2Viernes:de2Viernes, a2Viernes:a2Viernes,
            sabadoActivated:sabadoActivated, turnoSabado:turnoSabado, de1Sabado:de1Sabado, a1Sabado:a1Sabado, de2Sabado:de2Sabado, a2Sabado:a2Sabado,
            domingoActivated:domingoActivated, turnoDomingo:turnoDomingo, de1Domingo:de1Domingo, a1Domingo:a1Domingo, de2Domingo:de2Domingo, a2Domingo:a2Domingo
        });

      },
      getPlantillas: function() {

        console.log("[factory][getPlantillas]");

        var url = '/api/empresas/plantilla/obtener';
        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      postRecuperar: function(tipo, correo){

        console.log("[factory][postRecuperar]");

        if(tipo == "trabajadores"){
          var url = '/api/trabajadores/recuperarPass';
        }

        if(tipo == "empresas"){
          var url = '/api/empresas/recuperarPass';
        }

        if(tipo == "administradores"){
          var url = '/api/pAdmin/recuperarPass';
        }

        return $http.post(url, {cache: false, correo:correo });

      },
      getIdPlantillas: function(id_plantillas) {

        console.log("[factory][getIdPlantillas]");

        var url = '/api/empresas/plantilla/obtenerByIdPlantillas';
        return $http.get(url,{
          params: { cache: false, id_plantillas:id_plantillas },
          cache: false
        });

      },
      getEmpresa: function(id_empresas) {

        console.log("[factory][getEmpresa]");

        console.log("[factory][getEmpresa] id_empresas: " + id_empresas);

        var url = '/api/empresas/obtener';
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      getImageEmpresa: function(id_empresas) {

        console.log("[factory][getImageEmpresa]");

        console.log("[factory][getImageEmpresa] id_empresas: " + id_empresas);

        var url = '/api/empresas/profile/image';
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      postIngresarAdmin: function(correo, contPass) {

        console.log("[factory][postIngresarAdmin]");

        console.log("correo: " + correo + " contPass: " + contPass);

        var url = '/api/pAdmin/ingresar';
        return $http.get(url,{
          params: { cache: false, correo:correo, contPass:contPass },
          cache: false
        });

      },
      postLogoutAdmin: function() {

        console.log("[factory][postLogoutAdmin]");

        var url = '/api/pAdmin/logout';
		  	return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      postIngresarEmpresas: function(correo, contPass, color, colorHex, subdominio) {

        console.log("[factory][postIngresarEmpresas]");

        console.log("correo: " + correo + " contPass: " + contPass + " color: " + color + " colorHex: " + colorHex + " subdominio: " + subdominio);

        var url = '/api/empresas/ingresar';
        return $http.get(url,{
          params: { cache: false, correo:correo, contPass:contPass, color:color,  colorHex:colorHex, subdominio:subdominio },
          cache: false
        });

      },
      altaEmpresa: function(nombreEmpresa, nombreSolicitante, correoElectronico, telefonoFijo, celular, datepicker, empleadosPermitidos, activa, subdominio, contrasena, color) {

        console.log("[factory][altaEmpresa]");

        var url = '/api/empresas/altaEmpresa';
		  	return $http.post(url, {cache: false, nombreEmpresa:nombreEmpresa, nombreSolicitante:nombreSolicitante, correoElectronico:correoElectronico, telefonoFijo:telefonoFijo, celular:celular, datepicker:datepicker, empleadosPermitidos:empleadosPermitidos, activa:activa, subdominio:subdominio, contrasena:contrasena, color:color });

      },
      validarSubdominio: function(subdominio) {

        console.log("[factory][postIngresarAdmin]");

        console.log("[factory][postIngresarAdmin] subdominio: " + subdominio);

        var url = '/api/empresas/subdominioValidar';

		  	return $http.get(url,{
          params: { cache: false, subdominio:subdominio },
          cache: false
        });

      },
      getAllEntradasSalidas: function(id_trabajadores) {

        console.log("[factory][getAllEntradasSalidas]");

        var url = '/api/trabajadores/registros/todos';
        
        return $http.get(url,{
          params: { cache: false, id_trabajadores:id_trabajadores },
          cache: false
        });

      },
      getAllEntradasSalidasByEmpresas: function(id_empresas) {

        console.log("[factory][getAllEntradasSalidasByEmpresas]");

        var url = '/api/trabajadores/registros/todosByEmpresas';
        
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      getHistorialEntradas: function(id_trabajadores, start, end) {

        console.log("[factory][getHistorialEntradas]");

        var url = '/api/trabajadores/historial/todas';
        
        return $http.get(url,{
          params: { cache: false, id_trabajadores:id_trabajadores, start:start, end:end },
          cache: false
        });

      },
      getAllHistorialEntradas: function() {

        console.log("[factory][getAllHistorialEntradas]");

        var url = '/api/trabajadores/historial/getAll';

        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      getHistorialEntradasByIdEmpresas: function(id_empresas, start, end) {

        console.log("[factory][getHistorialEntradasByIdEmpresas]");

        var url = '/api/trabajadores/historial/todasByIdEmpresas';
        
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas, start:start, end:end },
          cache: false
        });

      },
      modSalidas: function(id_empresas, id_salidas, nombre, computable) {

        console.log("[factory][modSalidas]");

        var url = '/api/empresas/salidas/modificar';
        return $http.post(url, {cache: false, id_empresas:id_empresas, id_salidas:id_salidas, nombre:nombre, computable:computable });


      },
      postSalidas: function(id_empresas, nombre, computable) {

        console.log("[factory][postSalidas]");

        var url = '/api/empresas/salidas';
        return $http.post(url, {cache: false, id_empresas:id_empresas, nombre:nombre, computable:computable });


      },
      delSalidas: function(id_empresas, id_salidas) {

        console.log("[factory][delSalidas]");

        var url = '/api/empresas/salidas/borrar';
        return $http.post(url, {cache: false, id_empresas:id_empresas, id_salidas:id_salidas });


      },
      getSalidaById: function(id_salidas) {

        console.log("[factory][getSalidaById]");

        var url = '/api/empresas/salidas/id';
        return $http.get(url,{
          params: { cache: false, id_salidas:id_salidas },
          cache: false
        });

      },
      getSalidas: function(id_empresas) {

        console.log("[factory][getSalidas]");

        var url = '/api/empresas/salidas';
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      getAllZonasHorarias: function() {

        console.log("[factory][getAllZonasHorarias]");

        var url = '/api/zonasHorarias';
        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      postRegistrarEntrada: function(id_trabajadores, comentarios, date, geoLocation){

        console.log("[factory][postRegistrarEntrada]");

        var url = '/api/trabajadores/registros/entradas';
        return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, comentarios:comentarios, date:date, geoLocation:geoLocation });

      },
      postRegistrarSalida: function(id_trabajadores, comentarios, date, id_salidas, geoLocation){

        console.log("[factory][postRegistrarEntrada]");

        var url = '/api/trabajadores/registros/salidas';
        return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, comentarios:comentarios, date:date, id_salidas:id_salidas, geoLocation:geoLocation });

      },
      getAllIdiomas: function(){

        console.log("[factory][getAllIdiomas]");

        var url = '/api/pAdmin/idiomas/obtenerAll';
        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      getZonaHoraria: function(id_empresas) {

        console.log("[factory][getZonasHoraria]");

        var url = '/api/empresas/zonasHorarias';
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      getZonaHorariaAdministrador: function() {

        console.log("[factory][getZonaHorariaAdministrador]");

        var url = '/api/pAdmin/zonasHorarias';
        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      postZonasHorarias: function(id_zona_horaria) {

        console.log("[factory][postZonasHorarias]");

        var url = '/api/empresas/zonasHorarias';
        return $http.post(url, {cache: false, id_zona_horaria:id_zona_horaria});

      },
      postZonasHorariasAdministradores: function(id_zona_horaria) {

        console.log("[factory][postZonasHorariasAdministradores]");

        var url = '/api/pAdmin/zonasHorarias';
        return $http.post(url, {cache: false, id_zona_horaria:id_zona_horaria});

      },
      postModTrabajador: function(id_trabajadores, id_empresas, nombre, apellido, correo, tel, cel, cargo, numDNI, numSS, 
        plantilla, geoActivated, address, latitud, longitud, metros, registroApp, 
        ipActivated, ipAddress, pcActivated, tabletasActivated, 
        movilesActivated, pass, tmpPass) {

        console.log("[factory][postModTrabajador]");

        var url = '/api/empresas/modTrabajador';
		  	return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, id_empresas:id_empresas, nombre:nombre, apellido:apellido, correo:correo, tel:tel, cel:cel, cargo:cargo, numDNI:numDNI, numSS:numSS, 
          plantilla:plantilla, geoActivated:geoActivated, address:address, latitud:latitud, longitud:longitud, metros:metros, registroApp:registroApp, 
          ipActivated:ipActivated, ipAddress:ipAddress, pcActivated:pcActivated, tabletasActivated:tabletasActivated, 
          movilesActivated:movilesActivated, pass:pass, tmpPass:tmpPass});

      },
      postNuevoTrabajador: function(id_empresas, nombre, apellido, correo, tel, cel, cargo, numDNI, numSS, 
        plantilla, geoActivated, address, latitud, longitud, metros, registroApp, 
        ipActivated, ipAddress, pcActivated, tabletasActivated, 
        movilesActivated, pass) {

        console.log("[factory][postNuevoTrabajador]");

        var url = '/api/empresas/altaNuevoTrabajador';
		  	return $http.post(url, {cache: false, id_empresas:id_empresas, nombre:nombre, apellido:apellido, correo:correo, tel:tel, cel:cel, cargo:cargo, numDNI:numDNI, numSS:numSS, 
          plantilla:plantilla, geoActivated:geoActivated, address:address, latitud:latitud, longitud:longitud, metros:metros, registroApp:registroApp, 
          ipActivated:ipActivated, ipAddress:ipAddress, pcActivated:pcActivated, tabletasActivated:tabletasActivated, 
          movilesActivated:movilesActivated, pass:pass });

      },
      postActiveEmpresa: function(id_empresas, active) {

        console.log("[factory][postActiveEmpresa]");

        var url = '/api/pAdmin/empresas/modificar/activo';

        return $http.post(url, {cache: false, id_empresas:id_empresas, active:active });

      },
      getTrabajadoresAll: function(id_empresas) {

        console.log("[factory][getTrabajadoresAll]");

        var url = '/api/trabajadores/obtenerAll';
		  	return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      getTrabajadoresByIdEmpresa: function(id_empresas) {

        console.log("[factory][getTrabajadoresByIdEmpresa]");

        var url = '/api/trabajadores/obtener';
		  	return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      getTrabajadoresByIdTrabajadores: function(id_trabajadores) {

        console.log("[factory][getTrabajadoresByIdTrabajadores]");

        var url = '/api/trabajadores/obtener/id_trabajadadores';
		  	return $http.get(url,{
          params: { cache: false, id_trabajadores:id_trabajadores },
          cache: false
        });

      },
      eliminarAdministrador: function(id_administradores) {

        console.log("[factory][eliminarAdministrador]");

        var url = '/api/pAdmin/administradores/eliminar';

        return $http.post(url, {cache: false, id_administradores:id_administradores });

      },
      delTrabajadoresByIdEmpresa: function(id_trabajadores, id_empresas) {

        console.log("[factory][delTrabajadoresByIdEmpresa]");

        var url = '/api/empresas/trabajadores/eliminar';

        return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, id_empresas:id_empresas });

      },
      getAdministradores: function(id_administradores) {

        console.log("[factory][getAdministradores]");

        var url = '/api/pAdmin/obtener';
		  	return $http.get(url,{
          params: { cache: false, id_administradores:id_administradores },
          cache: false
        });

      },
      getAllEmpresas: function() {

        console.log("[factory][getAllEmpresas]");

        var url = '/api/empresas/obtener/all';

        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      getAllAdministradores: function() {

        console.log("[factory][getAllAdministradores]");

        var url = '/api/pAdmin/administradores/obtenerAll';

        return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      },
      getAdministradores: function(id_administradores) {

        console.log("[factory][getAdministradores]");

        var url = '/api/pAdmin/administradores/obtener';

        return $http.get(url,{
          params: { cache: false, id_administradores:id_administradores },
          cache: false
        });

      },
      postAltaAdministradores: function(nombre, apellido, correoElectronico, telefonoFijo, celular, contrasena) {

        console.log("[factory][postAltaAdministradores]");


        var url = '/api/pAdmin/administradores/nuevo';

        return $http.post(url, {cache: false, nombre:nombre, apellido:apellido, correoElectronico:correoElectronico, telefonoFijo:telefonoFijo, celular:celular, contrasena:contrasena });

      },
      postModificarAdministradores: function(id_administradores, nombre, apellido, correoElectronico, telefonoFijo, celular, contrasena, tmpPass) {

        console.log("[factory][postModificarAdministradores]");


        var url = '/api/pAdmin/administradores/modificar';

        return $http.post(url, {cache: false, id_administradores:id_administradores, nombre:nombre, apellido:apellido, correoElectronico:correoElectronico, telefonoFijo:telefonoFijo, celular:celular, contrasena:contrasena, tmpPass:tmpPass });

      },
      postContChange: function(id, cont, tipo) {

        console.log("[factory][postContChange]");

        if(tipo=="administradores")
          tipo = "pAdmin";

        var url = '/api/'+tipo+'/perfil/pass';

        if(tipo == "empresas")
          return $http.post(url, {cache: false, id_empresas:id, cont:cont });
          
        if(tipo == "trabajadores")
          return $http.post(url, {cache: false, id_trabajadores:id, cont:cont });
        
        if(tipo == "pAdmin")
          return $http.post(url, {cache: false, id_administradores:id, cont:cont });

      },
      postEditProfile: function(nombre_empresa, correo, telefono_fijo, celular, tipo){
        console.log("[factory][postEditProfile]");

        var url = '/api/'+tipo+'/profile/edit';

        return $http.post(url, {cache: false, nombre_empresa:nombre_empresa, correo:correo, telefono_fijo:telefono_fijo, celular:celular });

      },
      modActiveEmpresas: function(id_empresas, active) {

        console.log("[factory][modActiveEmpresas]");

        var url = '/api/empresas/modificar/activo';
        return $http.post(url, {cache: false, id_empresas:id_empresas, active:active });


      },
    };
  });

}).call(this);
