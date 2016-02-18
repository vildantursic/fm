var app = angular.module('app');

app.controller('vehicleFormCtrl', function($scope, $timeout){

  var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

  fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
  }, false);

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><img src="./images/'+ escape(f.name) +'"');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  document.getElementById('fileElem').addEventListener('change', handleFileSelect, false);



});
