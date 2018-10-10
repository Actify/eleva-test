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

      $scope.colors = [
        {label: 'Viola', hex: '#9C27B0'},
        {label: 'Blu', hex: '#2196F3'},
        {label: 'Verde', hex: '#4CAF50'},
        {label: 'Arancione', hex: '#FF9800'},
        {label: 'Marrone', hex: '#795548'},
      ];

      $scope.$watch("placeDetail", function(newValue, oldValue) {
        if(newValue != oldValue) {
          facilityMapping(newValue);
        }
      });

      $scope.addRole = function() {
        if($scope.facility.roles) {
          $scope.facility.roles.push({description: '', color: $scope.colors[0].hex});
        } else {
          $scope.facility.roles = [];
          $scope.addRole();
        }
      }

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
        var editableProperties = ['name', 'address', 'lat', 'lng', 'gmaps_id', 'photo_url', 'roles'];

        editableProperties.forEach(function(property) {
          if(typeof enterObj === 'object' && enterObj.hasOwnProperty(property)) {
            $scope.facility[property] = enterObj[property];
          } else if(!$scope.facility.hasOwnProperty(property)) {
            scope.facility[property] = '';
          }
        });
      }

      if(facilityId) {
        facilityService.get(facilityId).then(function(facility) {
          facilityMapping(facility);
          $scope.updateMode = true;
        });
      } else {
        $scope.addRole();
      }
    }]);
})();