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

      }
    };
  });

}).call(this);
