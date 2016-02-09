var app = angular.module('app', ['ngMaterial', 'ui.router', 'md.data.table']);

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

app.controller('mainCtrl', function($scope, $timeout, $mdSidenav, $log, $state){
  $scope.name = "fm";
  $scope.$state = $state;

  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };

  /**
  * Supplies a function that will continue to operate until the
  * time is up.
  */
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
      args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  /**
  * Build handler to open/close a SideNav; when animation finishes
  * report completion in console
  */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
    }, 200);
  }
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
    }
  }

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

})

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
app.controller('vehicleFormCtrl', function($scope, $timeout, $cookies){

  var inputElement = document.getElementById("fileinput");

  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    $scope.fileList = this.files; /* now you can work with the file list */
    console.log($scope.fileList)
  }

});

app.controller('taskManagementCtrl', function($scope){

  $scope.number=50;
  $scope.number2=10;
  $scope.number3=10;

  try{
    $cookies.put("name", 12);
  }catch(e){
    window.location.href = "http://stackoverflow.com/search?q=" + e.message;
  }

});

app.controller('dashboardCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  var tile;

  tile = tile || {};

  // elements and cached DOM elements
  tile.elements = {
    $containerTiles: $('.wrapper--tiles'),
    $containerSelTiles: $('.wrapper--assigned-tiles'),
    $containerunassignedTiles: $('.wrapper--unassigned-tiles'),
    dragSrcElement: null
  };

  tile.classes = {
    assigned : 'assigned-tile',
    unassigned : 'unassigned-tile',
    dragging : 'dragging',
    draggingOver: 'over'
  };

  tile.helpers = {

    handleDragStart: function(e) {
      var $draggedElement = $(this),
      dataTransfer = e.originalEvent.dataTransfer;

      // element being dragged is an unassigned tile or an assigned tile, allow transfer
      if ($draggedElement.hasClass(tile.classes.assigned) || $draggedElement.hasClass(tile.classes.unassigned)) {
        tile.elements.dragSrcElement = $draggedElement;
        $draggedElement.addClass(tile.classes.dragging);
        dataTransfer.setData('text', $draggedElement.attr('data-index'));
      } else {
        return false;
      }
    },

    handleDragEnter: function() {
      var $dropZoneElement = $(this);

      $dropZoneElement.addClass(tile.classes.draggingOver);
      return false;
    },

    handleDragOver: function(e) {
      var $dropZoneElement,
      dataTransfer = e.originalEvent.dataTransfer;

      if (e.preventDefault) {
        e.preventDefault();
      }

      if (e.currentTarget) {
        $dropZoneElement = $(e.currentTarget);

        if ($dropZoneElement.hasClass(tile.classes.unassigned)) {
          dataTransfer.dropEffect = 'none';
          $dropZoneElement.removeClass(tile.classes.draggingOver);
        } else {
          dataTransfer.dropEffect = 'move';
        }
      }

      return false;
    },

    handleDragLeave: function() {
      $(this).removeClass(tile.classes.draggingOver);
    },

    handleDrop: function(e) {
      var $droppedOnElement = $(this),
      index,
      $temp;

      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (tile.elements.dragSrcElement && tile.elements.dragSrcElement !== $droppedOnElement) {
        index = e.originalEvent.dataTransfer.getData('text');
        $temp = $('.tile[data-index="' + index + '"]').clone(true, true);

        if (!tile.elements.dragSrcElement.hasClass(tile.classes.unassigned)) {
          tile.elements.dragSrcElement[0].outerHTML = $droppedOnElement[0].outerHTML;
        }

        if (!$droppedOnElement.hasClass(tile.classes.assigned)) {
          tile.elements.dragSrcElement.remove();
        }

        tile.elements.dragSrcElement[0].innerHTML = $droppedOnElement[0].innerHTML;

        if ($temp.hasClass(tile.classes.unassigned)) {
          $temp.removeClass(tile.classes.unassigned).addClass(tile.classes.assigned);
          $temp.attr('data-index', $droppedOnElement.attr('data-index'));
        }

        $temp.insertAfter($droppedOnElement);
        $droppedOnElement.remove();

        $('.' + tile.classes.draggingOver).removeClass(tile.classes.draggingOver);
        $('.' + tile.classes.dragging).removeClass(tile.classes.dragging);

      }

      if (tile.elements.dragSrcElement === null) {
        tile.helpers.handleDragLeave($droppedOnElement);
      }

      return false;
    },

    handleDragEnd: function(elements, classesToRemove) {
      elements.removeClass(classesToRemove);
    }

  };

  $(function() {
    // Attaches drag events
    tile.elements.$containerTiles.on( 'dragstart', '.tile', tile.helpers.handleDragStart )
    .on( 'dragenter', '.tile', tile.helpers.handleDragEnter )
    .on( 'dragover' , '.tile', tile.helpers.handleDragOver  )
    .on( 'dragleave', '.tile', tile.helpers.handleDragLeave )
    .on( 'drop'     , '.tile', tile.helpers.handleDrop      )
    .on( 'dragend'  , '.tile', function(e) {
      var tiles = tile.elements.$containerTiles.find('.tile'),
      classesToRemove = tile.classes.dragging + ' ' + tile.classes.draggingOver;

      tile.helpers.handleDragEnd(tiles, classesToRemove);
    });
  });
});
