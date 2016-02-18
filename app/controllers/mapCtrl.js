var app = angular.module('app');

app.controller('mapCtrl', function($scope, $timeout, $mdSidenav, $log){

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });

  $("#right-nav-btn").click(function(){
    $("#right-nav").removeClass("return-nav-right");
    $("#right-nav").addClass("move-nav-right");
  })

  $("#return-nav-right-btn").click(function(){
    $("#right-nav").removeClass("move-nav-right");
    $("#right-nav").addClass("return-nav-right");
  })

});
