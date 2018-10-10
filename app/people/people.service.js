(function() {
  'use strict';

  angular
    .module('myApp')
    .service('peopleService', ['$http', function($http) {

      var apiUrl = "http://192.168.32.124/rd/eleva/api/index.php?api=peopleList&method=";

      this.getList = function() {
        return $http.post(apiUrl + "getAll")
          .then(function(response) {
            return response.data;
          });
      }

      this.add = function(member) {
        if(typeof member === 'object') {
          this.list.push(member);
        }
      }
    }]);
})();