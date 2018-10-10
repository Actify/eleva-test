(function() {
  'use strict';

  angular
    .module('myApp')
    .config(function($routeProvider) {
      $routeProvider
        .when("/", {
          redirectTo: "/facilities"
        })
        .when("/facilities", {
          templateUrl : "app/overview/overview.view.html",
          controller: "overviewController"
        })
        .when("/facility/:id", {
          templateUrl : "app/facility/facility.view.html",
          controller: "facilityController"
        })
        .when("/facility-edit/:id?", {
          templateUrl : "app/facility/facility-edit.view.html",
          controller: "facilityEditController"
        })
        .when("/staff", {
          templateUrl : "app/people/people.view.html",
          controller: "peopleController"
        })
        .when("/person-edit/:id?", {
          templateUrl : "app/person/person-edit.view.html",
          controller: "personEditController"
        });
      })
      .run(function($rootScope, $location, navigationService) {
        $rootScope.$on("$routeChangeSuccess", function(event, current) { 
          navigationService.selectItem($location.path());
        });
      });
})();