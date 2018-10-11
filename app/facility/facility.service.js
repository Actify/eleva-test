(function() {
  'use strict';

  angular
    .module('myApp')
    .service('facilityService', ['$http', 'apiService', function($http, apiService) {

      this.create = function(facility) {
        return $http.post(apiService.getUrl('facility', 'create'), facility)
          .then(function(response) {
            return response.data;
          });
      }

      this.get = function(id) {
        return $http.get(apiService.getUrl('facility', 'get', {id: id}))
          .then(function(response) {
            return response.data;
          });
      }

      this.update = function(id, facility) {
        return $http.post(apiService.getUrl('facility', 'update', {id: id}), facility)
          .then(function(response) {
            return response.data;
          });
      }

      this.getUnlistedPeople = function(id) {
        return $http.get(apiService.getUrl('facility', 'getUnlistedPeople', {id: id}))
          .then(function(response) {
            return response.data;
          });
      }      

      this.addStaffMembers = function(id, list) {
        return $http.post(apiService.getUrl('facility', 'addStaffMembers', {id: id}), list)
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();