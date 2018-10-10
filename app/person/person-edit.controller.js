(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('personEditController', ['$routeParams', '$scope', '$location', 'personService', function($routeParams, $scope, $location, personService) {

      var personId = $routeParams.id;

      $scope.person = {};

      $scope.updateMode = false;

      $scope.save = function() {
        var dataToSend = {
          name: $scope.person.name,
          surname: $scope.person.surname,
          email: $scope.person.email,
        }

        if(personId && $scope.updateMode) {
          personService.update(personId, dataToSend).then(function(person) {
            $location.path('/staff')
          });
        } else {
          personService.create(dataToSend).then(function(person) {
            $location.path('/staff')
          });
        }
      }

      $scope.delete = function() {
        if(personId && $scope.updateMode) {
          personService.delete(personId).then(function(person) {
            $location.path('/staff')
          });
        }
      }

      $scope.removeAssociation = function(id) {
        if(personId && $scope.updateMode) {
          personService.removeAssociatedFacility(personId, id).then(function(facilities) {
            $scope.person.facilities = facilities;
          });
        }
      }

      //load person data;
      if(personId) {
        personService.get(personId).then(function(person) {
          $scope.person = person;
          $scope.updateMode = true;
        });
      }

    }]);
})();