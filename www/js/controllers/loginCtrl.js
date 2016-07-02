
 angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = [];

function loginCtrl() {
	var vm = this;

	vm.registration = function() {
		alert('TODO registration form');
	}
}