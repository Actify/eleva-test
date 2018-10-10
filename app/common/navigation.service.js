(function() {
  'use strict';

  angular
    .module('myApp')
    .service('navigationService', [function() {
      this.items = [
        {
          label: 'Impianti',
          path: '/facilities',
          selected: false
        },
        {
          label: 'Personale',
          path: '/staff',
          selected: false
        }
      ];

      this.selectItem = function(path) {
        this.items.forEach(function(item) {
          if(item.path === path) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
      }
      
    }]);
})();