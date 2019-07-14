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
        }, 6000);
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

        var url = 'api/trabajadores/ingresar';
        return $http.get(url,{
          params: { cache: false, correo:correo, contPass:contPass },
          cache: false
        });

      },
      postLogout: function() {

        console.log("[factory][postLogout]");

        var url = 'api/trabajadores/logout';
		  	return $http.get(url,{
          params: { cache: false },
          cache: false
        });

      }
    };
  });

}).call(this);
