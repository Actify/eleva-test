(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('facilitiesController', ['$scope', '$location', 'facilitiesListService', function($scope, $location, facilitiesListService) {
      $scope.facilitiesList = [];      

      facilitiesListService.getAll().then(function(list) {
        $scope.facilitiesList = list;
      });
    }])
    .controller('editFacilityController', ['$scope', 'facilityService', function($scope, facilityService) {
      $scope.chosenPlace = '';
      $scope.placeDetail = {};
      $scope.facility = {};

      $scope.$watch("placeDetail", function(newValue, oldValue) {
        if(newValue != oldValue) {
          $scope.facility.name = newValue.name;
          $scope.facility.address = newValue.address;
          $scope.facility.lat = newValue.lat;
          $scope.facility.lng = newValue.lng;
          $scope.facility.gmaps_id = newValue.id;
          $scope.facility.photo_url = newValue.photo;
        }
      });

      $scope.saveFacility = function() {
        facilityService.create($scope.facility).then(function(response) {
          $scope.chosenPlace = '';
          $scope.placeDetail = {};
          $scope.facility = {};
        });        
      }      
    }])
})();