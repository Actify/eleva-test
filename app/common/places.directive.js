(function() {
  'use strict';

  angular.module('myApp')
    .directive('placeAutocomplete', function() {
      return {
        require: 'ngModel',
        scope: {
          placeDetail: '=?'
        },
        link: function(scope, element, attrs, model) {
          var options = {
            types: ['establishment'],
            componentRestrictions: {}
          };

          var autocomplete = new google.maps.places.Autocomplete(element[0]);

          google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var result = autocomplete.getPlace();
            var location = {
              id: result.place_id,
              name: result.name,
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              address: result.formatted_address,
              photo: result.photos[0].getUrl({maxHeight:300})
            };

            scope.$apply(function() {
              scope.placeDetail = location;
              model.$setViewValue(location.name);
            });

            scope.$on('$destroy', function () {
              google.maps.event.clearInstanceListeners(element[0]);
            });
          });
        }
      };
    })
    .directive('gmapView', function() {
      return {
        scope: {
          markers: '=?',
          openMarker: '&openMarker'
        },
        link: function(scope, element, attrs, model) {

          //init google maps object on element
          var map = new google.maps.Map(element[0], {
            zoom: 8,
            mapTypeId: 'roadmap',
            disableDefaultUI: true
          });

          var setDefaultCenter = function() {
            map.setCenter({lat:41.2036302, lng:8.2242391});
            map.setZoom(5);
          }

          var moveToMarker = function(id, pos) {
            map.setCenter(pos);
            map.setZoom(12);
          }

          //set center position from geolocation;
          //if it isn't available, center the map from first marker position
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map.setCenter(pos);
            }, function() {
              setDefaultCenter();
            });
          } else {
            setDefaultCenter();
          }

          //watch markers array: when update, add new marker
          scope.$watch("markers", function(newValue, oldValue) {
            if (newValue != oldValue) {

              newValue.forEach(function(item, index) {
                var position = {lat: parseFloat(item.lat), lng: parseFloat(item.lng)};
                var marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  title: 'Click to zoom'
                });

                (function(id, pos) {
                  marker.addListener('click', function() {
                    moveToMarker(id, pos);
                    scope.openMarker({id:id});
                  });
                })(item.id, position);

                if(index == 0) {
                  moveToMarker(item.id, position);
                }              
              });            
            }
          });
        }
      };
    })
    .directive('gmapPick', function() {
      return {
        scope: {
          placeDetail: '=?',
        },
        link: function(scope, element, attrs, model) {

          //init google maps object on element
          var map = new google.maps.Map(element[0], {
            zoom: 15,
            mapTypeId: 'roadmap',
            disableDefaultUI: true
          });

          var setDefaultCenter = function() {
            map.setCenter({lat:41.2036302, lng:8.2242391});
            map.setZoom(5);
          }

          var geocoder = new google.maps.Geocoder;
          var service = new google.maps.places.PlacesService(map);

          map.addListener('click', function(e) {
            var latlng = {lat: e.latLng.lat(), lng: e.latLng.lng()};
            geocoder.geocode({'location': latlng}, function(results, status) {
              if (status === 'OK') {
                if (results[0]) {
                  map.setZoom(15);
                  map.setCenter(latlng);
                  service.getDetails({placeId: results[0].place_id}, function(place, status) {
                    if (status === 'OK') {
                      var location = {
                        id: results[0].place_id,
                        name: place.name,
                        lat: latlng.lat,
                        lng: latlng.lng,
                        address: place.formatted_address,
                        photo: '',
                      };
                      scope.$apply(function() {
                        scope.placeDetail = location;
                      });
                    }
                  });
                } else {
                  window.alert('No results found');
                }
              } else {
                window.alert('Geocoder failed due to: ' + status);
              }
            });
          });

          //set center position from geolocation;
          //if it isn't available, center the map from first marker position
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map.setCenter(pos);
            }, function() {
              setDefaultCenter();
            });
          } else {
            setDefaultCenter();
          }
        }
      };
    });
})();