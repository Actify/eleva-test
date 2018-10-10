(function() {
  'use strict';

  angular
    .module('myApp')
    .service('facilityService', ['$http', function($http) {

      var apiUrl = "http://192.168.32.124/rd/eleva/api/index.php?api=facility&method=";

      this.create = function(facility) {
        return $http.post(apiUrl + "create", facility)
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

      this.update = function(id, facility) {
        return $http.post(apiUrl + "update&id=" + id, facility)
          .then(function(response) {
            return response.data;
          });
      }

      this.getUnlistedPeople = function(id) {
        return $http.get(apiUrl + "getUnlistedPeople&id=" + id)
          .then(function(response) {
            return response.data;
          });
      }      

      this.addStaffMembers = function(id, list) {
        return $http.post(apiUrl + "addStaffMembers&id=" + id, list)
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();