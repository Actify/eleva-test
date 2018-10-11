(function() {
  'use strict';

  angular
    .module('myApp')
    .service('apiService', [function() {
      
      var baseUrl = window.location.origin + '/' + window.location.pathname + '/api/index.php';

      this.getUrl = function(apiName, apiMethod, params) {
        var url = baseUrl + '?api=' + apiName + '&method=' + apiMethod;

        if(typeof params === 'object') {
          for(var name in params) {
            var value = params[name];
            url += '&' + name + '=' + value;
          }
        }

        return url;
      }
      
    }]);
})();