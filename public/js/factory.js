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
      salidas: function(data) {
        console.log("[factory.js][salidas]");

        
        for (var x = 0; x < data.length; x++) {

          $("#gra-"+(x+1)+"").prop("checked", data[x].computable);

        }

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
      getSalidas: function() {

        console.log("[factory][getSalidas]");

        var url = '/api/empresas/salidas';
        return $http.get(url,{
          params: { cache: false },
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
      postZonasHorarias: function(id_zona_horaria) {

        console.log("[factory][postZonasHorarias]");

        var url = '/api/empresas/zonasHorarias';
        return $http.post(url, {cache: false, id_zona_horaria:id_zona_horaria});

      },
      postModTrabajador: function(id_trabajadores, id_empresas, nombre, apellido, correo, tel, cel, cargo, numDNI, numSS, 
        plantilla, geoActivated, address, latitud, longitud, metros, registroApp, 
        ipActivated, ipAddress, pcActivated, tabletasActivated, 
        movilesActivated) {

        console.log("[factory][postModTrabajador]");

        var url = '/api/empresas/modTrabajador';
		  	return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, id_empresas:id_empresas, nombre:nombre, apellido:apellido, correo:correo, tel:tel, cel:cel, cargo:cargo, numDNI:numDNI, numSS:numSS, 
          plantilla:plantilla, geoActivated:geoActivated, address:address, latitud:latitud, longitud:longitud, metros:metros, registroApp:registroApp, 
          ipActivated:ipActivated, ipAddress:ipAddress, pcActivated:pcActivated, tabletasActivated:tabletasActivated, 
          movilesActivated:movilesActivated});

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
      getTrabajadoresByIdEmpresa: function(id_empresas) {

        console.log("[factory][getTrabajadoresByIdEmpresa]");

        var url = '/api/empresas/trabajadores/obtener';
		  	return $http.get(url,{
          params: { cache: false, id_empresas:id_empresas },
          cache: false
        });

      },
      delTrabajadoresByIdEmpresa: function(id_trabajadores, id_empresas) {

        console.log("[factory][delTrabajadoresByIdEmpresa]");

        var url = '/api/empresas/trabajadores/eliminar';

        return $http.post(url, {cache: false, id_trabajadores:id_trabajadores, id_empresas:id_empresas });

      },
      getTrabajadoresByIdTrabajadores: function(id_trabajadores) {

        console.log("[factory][delTrabajadoresByIdEmpresa]");

        var url = '/api/empresas/trabajadores/obtener/id_trabajadadores';

        return $http.get(url,{
          params: { cache: false, id_trabajadores:id_trabajadores },
          cache: false
        });


      },
      postContChange: function(id_empresas, cont) {

        console.log("[factory][postContChange]");

        var url = '/api/empresas/perfil/pass';

        return $http.post(url, {cache: false, id_empresas:id_empresas, cont:cont });

      },
    };
  });

}).call(this);
