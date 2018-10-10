(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('peopleController', ['$scope', 'peopleService', function($scope, peopleService) {
      $scope.peopleList = [];

      peopleService.getList().then(function(peopleService) {
        $scope.peopleList = peopleService;
      });
    }]);
})();