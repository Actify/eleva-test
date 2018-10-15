(function() {
  'use strict';

  angular
    .module('myApp')
    .service('facilitiesListService', ['$http', 'apiService', function($http, apiService) {

      this.getAll = function() {
        return $http.get(apiService.getUrl('facilitiesList', 'getAll'))
          .then(function(response) {
            return response.data;
          });
      }

      this.search = function(str) {
        return $http.get(apiService.getUrl('facilitiesList', 'search', {str: str}))
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();