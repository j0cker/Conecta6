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

        console.log("[statDiarioHrsTrabajadas] pdia busca: " + pdia);

        var registrosHoy = Array();
        //obtener registros solos de hoy
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

          if(pdia==rdia){
            registrosHoy.push(registros[i]);
          }

        }//fin for

        console.log(registrosHoy);

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
      getHistorialEntradas: function(id_trabajadores, start, end) {

        console.log("[factory][getHistorialEntradas]");

        var url = '/api/trabajadores/historial/todas';
        
        return $http.get(url,{
          params: { cache: false, id_trabajadores:id_trabajadores, start:start, end:end },
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
      postRegistrarEntrada: function(id_trabajadores, comentarios, date){

        console.log("[factory][postRegistrarEntrada]");

        var url = '/api/trabajadores/registros/entradas';
        return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, comentarios:comentarios, date:date });

      },
      postRegistrarSalida: function(id_trabajadores, comentarios, date, id_salidas){

        console.log("[factory][postRegistrarEntrada]");

        var url = '/api/trabajadores/registros/salidas';
        return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, comentarios:comentarios, date:date, id_salidas:id_salidas });

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
