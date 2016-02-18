var app = angular.module('app', ['ngMaterial', 'ui.router', 'md.data.table', 'chart.js']);

app.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('orange');

  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //s
  // Now set up the states
  $stateProvider
  .state('map', {
    url: "/",
    templateUrl: "views/main/map/main.html",
    controller: 'mapCtrl'
  })
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: "views/main/dashboard/main.html",
    controller: 'dashboardCtrl'
  })
  .state('taskManagement', {
    url: "/taskManagement",
    templateUrl: "views/main/taskManagement/main.html",
    controller: 'taskManagementCtrl'
  })
  .state('vehicle', {
    url: "/vehicle",
    templateUrl: "views/main/vehicle/main.html",
    controller: 'vehicleCtrl'
  })
  .state('vehicleFrom', {
    url: "/vehicle/add",
    templateUrl: "views/main/vehicle/form.html",
    controller: 'vehicleFormCtrl'
  });

});

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
    .then(function () {
      $log.debug("close LEFT is done");
    });
  };
})

app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
    .then(function () {
      $log.debug("close RIGHT is done");
    });
  };
});










  
