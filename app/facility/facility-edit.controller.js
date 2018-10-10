(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('facilityEditController', ['$routeParams', '$scope', '$location', 'facilityService', function($routeParams, $scope, $location, facilityService) {
      var facilityId = $routeParams.id;

      $scope.facility = {};
      $scope.chosenPlace = '';
      $scope.placeDetail = {};
      $scope.updateMode = false;

      $scope.$watch("placeDetail", function(newValue, oldValue) {
        if(newValue != oldValue) {
          $scope.facility = facilityMapping(newValue);
        }
      });

      $scope.saveFacility = function() {
        //update
        if(facilityId && $scope.updateMode) {
          facilityService.update(facilityId, $scope.facility).then(function(facility) {
            $location.path('/facility/' + facility.id);
          });
        } 
        //save
        else {
          facilityService.create($scope.facility).then(function(facility) {
            $location.path('/facility/' + facility.id);
          });
        }      
      }

      function facilityMapping(enterObj) {
        var editableProperties = ['name', 'address', 'lat', 'lng', 'gmaps_id', 'photo_url'];
        var output = {};

        editableProperties.forEach(function(property) {
          var value = '';

          if(typeof enterObj === 'object' && enterObj.hasOwnProperty(property)) {
            value = enterObj[property];
          }

          output[property] = value;
        });

        return output;
      }

      if(facilityId) {
        facilityService.get(facilityId).then(function(facility) {
          $scope.facility = facilityMapping(facility);
          $scope.updateMode = true;
        });
      }
    }]);
})();