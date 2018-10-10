(function() {
  'use strict';

  angular
    .module('myApp')
    .service('personService', ['$http', function($http) {

      var apiUrl = "http://192.168.32.124/rd/eleva/api/index.php?api=person&method=";

      this.create = function(person) {
        return $http.post(apiUrl + "create", person)
          .then(function(response) {
            return response.data;
          });
      }

      this.get = function(id) {
        return $http.get(apiUrl + "get&id=" + id)
          .then(function(response) {
            return response.data;
          });
      }

      this.update = function(id, person) {
        return $http.post(apiUrl + "update&id=" + id, person)
          .then(function(response) {
            return response.data;
          });
      }

      this.delete = function(id) {
        return $http.get(apiUrl + "delete&id=" + id)
          .then(function(response) {
            return response.data;
          });
      }

      this.removeAssociatedFacility = function(id, facility_id) {
        return $http.get(apiUrl + "removeAssociatedFacility&id=" + id + "&facility=" + facility_id)
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();