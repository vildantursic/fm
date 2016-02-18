var app = angular.module('app');

app.controller('vehicleCtrl', function($scope, $mdDialog, $mdMedia){

  $scope.selected = [];

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.vehicles = [
    {
      "type": "one",
      "model": "one-1",
      "fleet": "1",
      "odometer": "1",
      "maintenence": "1",
      "fuel_level": "1",
      "location": "1",
      "status": "1"
    },
    {
      "type": "two",
      "model": "two-2",
      "fleet": "2",
      "odometer": "2",
      "maintenence": "2",
      "fuel_level": "2",
      "location": "2",
      "status": "2"
    }
  ];

  $scope.showVehicleDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './views/directives/dialogs/vehicleDetails.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog, $timeout, $state) {

    $timeout(function(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        scrollwheel: false,
        zoom: 8
      });
    },1000)

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
      $state.go(answer);
    };
  }

});
