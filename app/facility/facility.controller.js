(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('facilityController', ['$routeParams', '$scope', '$http', 'facilityService', function($routeParams, $scope, $http, facilityService) {
      var facilityId = $routeParams.id;

      $scope.facility = {};

      $scope.unlistedPeople = [];

      $scope.roleFilter = '';

      facilityService.get(facilityId)
        .then(function(facility) {
          $scope.facility = facility;
        });

      $scope.showStaffModal = function() {
        $('#staffInsertModal').modal('show');

        $scope.unlistedPeople = [];

        return facilityService.getUnlistedPeople(facilityId)
          .then(function(people) {
            if(people) {
              people.forEach(function(item) {
                $scope.unlistedPeople.push({
                  id: item.id,
                  name: item.name,
                  surname: item.surname,
                  role: null,
                  selected: false,
                })
              });
            }                        
          });
      }

      $scope.addSelectedPeople = function() {
        $('#staffInsertModal').modal('hide');

        var list = [];

        $scope.unlistedPeople.forEach(function(item, index) {
          if(item.selected) {
            list.push({
              role_id: item.role,
              person_id: item.id,
              facility_id: facilityId,
              active: 1
            })
          }
        });

        facilityService.addStaffMembers(facilityId, list).then(function(updatedStaff) {
          $scope.facility.staff = updatedStaff;
        });
      }
    }]);
})();