var app = angular.module('app');

app.controller('taskManagementCtrl', function($scope, $mdDialog, $timeout, $state){

  $scope.number=50;
  $scope.number2=10;
  $scope.number3=10;

  $scope.resolveIssue = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './views/directives/dialogs/resolveIssue.html',
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

    $timeout(function(){
      var map = new google.maps.Map(document.getElementById('map-review'), {
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
