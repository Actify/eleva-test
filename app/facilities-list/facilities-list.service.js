(function() {
  'use strict';

  angular
    .module('myApp')
    .service('facilitiesListService', ['$http', function($http) {

      this.list = [
        {
          name: 'Palazzina',
          address: 'Via qualcosa, n3, Milano',
          lat: 0,
          lng: 0,
        }
      ];

      this.getAll = function() {
        return $http.get("http://192.168.32.124/rd/eleva/api/index.php?api=facilitiesList&method=getAll")
          .then(function(response) {
            return response.data;
          });
      }

      this.create = function(facility) {
        return $http.post("http://192.168.32.124/rd/eleva/api/index.php?api=facility&method=create", facility)
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
        return $http.post("http://192.168.32.124/rd/eleva/api/index.php?api=facility&method=addStaffMembers&id=" + id, list)
          .then(function(response) {
            return response.data;
          });
      }
    }]);
})();