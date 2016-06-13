
 angular.module('starter')

.controller('hardwareCtrl', function($cordovaGeolocation) {

	var vm = this;
	vm.btnGpsClick = function () {
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        //these are your your lat long values  
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        alert('latitude: '+lat + ' longitude: ' + long);
                  
        }, function(err) {
        // error      
        alert(err);     
       });
      }
	});
