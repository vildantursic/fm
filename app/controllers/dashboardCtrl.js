var app = angular.module('app');

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

  // Charts
  ////////////////////////////////

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.colours = ["red"];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  ///////////////////

  $scope.labelsA = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.dataA = [300, 500, 100];

  ///////////////////

  $scope.labelsB = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];
  $scope.seriesB = ['Series A', 'Series B', 'Series C'];

  $scope.dataB = [
    [65, 59, 80, 81, 56, 55, 40, 80, 81, 56,],
    [28, 48, 40, 19, 86, 27, 90, 40, 80, 81],
    [4, 48, 11, 42, 86, 13, 23, 28, 48, 3]
  ];

});
