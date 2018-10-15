(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('overviewController', ['$scope', '$window', '$http', 'facilitiesListService', function($scope, $window, $http, facilitiesListService) {

      $scope.facilities = [];

      $scope.facilitiesSearch = '';

      $scope.facility;

      $scope.selectFacility = function(id) {        
        $scope.facilities.forEach(function(item, index) {
          if(item.id == id) {
            $scope.$apply(function() {
              $scope.facilities[index].active = true;
            })
          } else {
            $scope.$apply(function() {
              $scope.facilities[index].active = false;
            })            
          }
        })
      }

      $scope.searchFacilities = function() {
        if($scope.facilitiesSearch.length) {
          facilitiesListService.search($scope.facilitiesSearch).then(function(list) {
            $scope.facilities = list;
          });
        }        
      }

      $scope.resetSearch = function() {
        $scope.facilitiesSearch = '';
        facilitiesListService.getAll().then(function(list) {
          $scope.facilities = list;
        });
      }

      facilitiesListService.getAll().then(function(list) {
        $scope.facilities = list;
      });
    }]);
})();