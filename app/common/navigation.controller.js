(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('navigationController', ['$scope', '$location', 'navigationService', function($scope, $location, navigationService) {

      $scope.navItems = navigationService.items;

      $scope.navTo = function(e, path) {
        $location.path(path);
        e.preventDefault();
      }

    }]);
})();