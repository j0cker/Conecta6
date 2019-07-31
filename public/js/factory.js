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
      postIngresar: function(correo, contPass) {

        console.log("[factory][postIngresar]");

        console.log("correo: " + correo + " contPass: " + contPass);

        var url = '/api/trabajadores/ingresar';
        return $http.get(url,{
          params: { cache: false, correo:correo, contPass:contPass },
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
      altaEmpresa: function() {

        console.log("[factory][altaEmpresa]");

        var url = '/api/pAdmin/altaEmpresa';
		  	return $http.get(url,{
          params: { cache: false },
          cache: false
        });

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
