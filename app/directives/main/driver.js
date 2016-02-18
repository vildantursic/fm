'use strict';
var app = angular.module('app');

app.directive('driver', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'driverBoxCtrl',
    templateUrl: './views/directives/main/driver.html'
  };
});

app.controller('driverBoxCtrl', function($scope, $timeout){



});
