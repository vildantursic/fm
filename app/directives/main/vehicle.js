'use strict';
var app = angular.module('app');

app.directive('vehicle', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'vehicleBoxCtrl',
    templateUrl: './views/directives/main/vehicle.html'
  };
});

app.controller('vehicleBoxCtrl', function($scope, $timeout){



});
