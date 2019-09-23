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

          $("#gra-"+(x+1)+"").prop("checked", data[x].computable);

        }

      },
      empresasSwitches: function(data) {
        console.log("[factory.js][empresasSwitches]");

        for (var x = 0; x < data.length; x++) {

          $("#gra-"+(x+1)+"").prop("checked", data[x].activo);

        }

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
            lunes = "de " + array[x]["a1Lunes"] + " a " +  array[x]["de1Lunes"] + " y de " +  array[x]["a2Lunes"] + " a " +  array[x]["de2Lunes"];
          } else {
            lunes = "-";
          }
          data[x].push(lunes);

          var martes = "";
          if(array[x]["a1Martes"]!=""){
            martes = "de " + array[x]["a1Martes"] + " a " +  array[x]["de1Martes"] + " y de " +  array[x]["a2Martes"] + " a " +  array[x]["de2Martes"];
          } else {
            martes = "-";
          }
          data[x].push(martes);

          var miercoles = "";
          if(array[x]["a1Miercoles"]!=""){
            miercoles = "de " + array[x]["a1Miercoles"] + " a " +  array[x]["de1Miercoles"] + " y de " +  array[x]["a2Miercoles"] + " a " +  array[x]["de2Miercoles"];
          } else {
            miercoles = "-";
          }
          data[x].push(miercoles);

          var jueves = "";
          if(array[x]["a1Jueves"]!=""){
            jueves = "de " + array[x]["a1Jueves"] + " a " +  array[x]["de1Jueves"] + " y de " +  array[x]["a2Jueves"] + " a " +  array[x]["de2Jueves"];
          } else {
            jueves = "-";
          }
          data[x].push(jueves);

          var viernes = "";
          if(array[x]["a1Viernes"]!=""){
            viernes = "de " + array[x]["a1Viernes"] + " a " +  array[x]["de1Viernes"] + " y de " +  array[x]["a2Viernes"] + " a " +  array[x]["de2Viernes"];
          } else {
            viernes = "-";
          }
          data[x].push(viernes);

          var sabado = "";
          if(array[x]["a1Sabado"]!=""){
            sabado = "de " + array[x]["a1Sabado"] + " a " +  array[x]["de1Sabado"] + " y de " +  array[x]["a2Sabado"] + " a " +  array[x]["de2Sabado"];
          } else {
            sabado = "-";
          }
          data[x].push(sabado);

          var domingo = "";
          if(array[x]["a1Domingo"]!=""){
            domingo = "de " + array[x]["a1Domingo"] + " a " +  array[x]["de1Domingo"] + " y de " +  array[x]["a2Domingo"] + " a " +  array[x]["de2Domingo"];
          } else {
            domingo = "-";
          }
          data[x].push(domingo);

    
        }

        return data;

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
      impuntuales: function(fecha, registros){
        console.log("[factory][impuntuales]");

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
        
        console.log("Limpiar arreglo con sus horas y fechas variable=stats");
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
        
        console.log("Limpiar arreglo con sus horas y fechas variable=stats");
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
        lunesActivated, de1Lunes, a1Lunes, de2Lunes, a2Lunes,
        martesActivated, de1Martes, a1Martes, de2Martes, a2Martes,
        miercolesActivated, de1Miercoles, a1Miercoles, de2Miercoles, a2Miercoles,
        juevesActivated, de1Jueves, a1Jueves, de2Jueves, a2Jueves,
        viernesActivated, de1Viernes, a1Viernes, de2Viernes, a2Viernes,
        sabadoActivated, de1Sabado, a1Sabado, de2Sabado, a2Sabado,
        domingoActivated, de1Domingo, a1Domingo, de2Domingo, a2Domingo) {

        console.log("[factory][postPlantilla]");

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

        var url = '/api/empresas/plantilla/nueva';
        return $http.post(url, {cache: false, nombrePlantilla:nombrePlantilla, 
            lunesActivated:lunesActivated, de1Lunes:de1Lunes, a1Lunes:a1Lunes, de2Lunes:de2Lunes, a2Lunes:a2Lunes,
            martesActivated:martesActivated, de1Martes:de1Martes, a1Martes:a1Martes, de2Martes:de2Martes, a2Martes:a2Martes,
            miercolesActivated:miercolesActivated, de1Miercoles:de1Miercoles, a1Miercoles:a1Miercoles, de2Miercoles:de2Miercoles, a2Miercoles:a2Miercoles,
            juevesActivated:juevesActivated, de1Jueves:de1Jueves, a1Jueves:a1Jueves, de2Jueves:de2Jueves, a2Jueves:a2Jueves,
            viernesActivated:viernesActivated, de1Viernes:de1Viernes, a1Viernes:a1Viernes, de2Viernes:de2Viernes, a2Viernes:a2Viernes,
            sabadoActivated:sabadoActivated, de1Sabado:de1Sabado, a1Sabado:a1Sabado, de2Sabado:de2Sabado, a2Sabado:a2Sabado,
            domingoActivated:domingoActivated, de1Domingo:de1Domingo, a1Domingo:a1Domingo, de2Domingo:de2Domingo, a2Domingo:a2Domingo
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
      getZonaHoraria: function(id_empresas) {

        console.log("[factory][getZonasHoraria]");

        var url = '/api/empresas/zonasHorarias';
        return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      postZonasHorarias: function(id_zona_horaria) {

        console.log("[factory][postZonasHorarias]");

        var url = '/api/empresas/zonasHorarias';
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
