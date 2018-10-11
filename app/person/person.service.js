(function() {
  'use strict';

  angular
    .module('myApp')
    .service('personService', ['$http', 'apiService', function($http, apiService) {

      this.create = function(person) {
        return $http.post(apiService.getUrl('person', 'create'), person)
          .then(function(response) {
            return response.data;
          });
      }

      this.get = function(id) {
        return $http.get(apiService.getUrl('person', 'get', {id: id}))
          .then(function(response) {
            return response.data;
          });
      }

      this.update = function(id, person) {
        return $http.post(apiService.getUrl('person', 'update', {id: id}), person)
          .then(function(response) {
            return response.data;
          });
      }

      this.delete = function(id) {
        return $http.get(apiService.getUrl('person', 'delete', {id: id}))
          .then(function(response) {
            return response.data;
          });
      }

      this.removeAssociatedFacility = function(id, facility_id) {
        return $http.get(apiService.getUrl('person', 'removeAssociatedFacility', {id: id, facility: facility_id}))
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();