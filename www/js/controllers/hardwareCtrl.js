
 angular.module('starter')

.controller('hardwareCtrl', function($cordovaGeolocation) {

	var vm = this;
	vm.btnGpsClick = function () {
		alert('btn clicked');
	}
});
