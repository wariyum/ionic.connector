
 angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$state'];

function loginCtrl($state) {
	var vm = this;

	vm.doLogin = function() {
		alert('doLogin success');
	}

	vm.registration = function() {
		$state.go('app.userRegister');
	}
}