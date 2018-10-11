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

      this.create = function(facility) {
        return $http.post(apiService.getUrl('facilitiesList', 'create'), facility)
          .then(function(response) {
            return response.data;
          });
      }

      this.add = function(structure) {
        if(typeof structure === 'object') {
          this.list.push(structure);
        }
      }

      this.addStaffMembers = function(id, list) {
        return $http.post(apiService.getUrl('facilitiesList', 'addStaffMembers',{id: id}), list)
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();