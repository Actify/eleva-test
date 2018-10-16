(function() {
  'use strict';

  angular
    .module('myApp')
    .service('geolocatorService', ['$q', function($q) {

      this.getPosition = function() {
        return $q(function(resolve, reject) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            }, function() {
              reject();
            });
          } else {
            reject();
          }
        });
      }

    }]);
})();