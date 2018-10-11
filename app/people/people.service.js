(function() {
  'use strict';

  angular
    .module('myApp')
    .service('peopleService', ['$http', 'apiService', function($http, apiService) {
      
      this.getList = function() {
        return $http.post(apiService.getUrl('peopleList', 'getAll'))
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();