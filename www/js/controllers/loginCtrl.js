
 angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$state'];

function loginCtrl($state) {
	var vm = this;

	vm.registration = function() {
		$state.go('app.userRegister');
	}
}