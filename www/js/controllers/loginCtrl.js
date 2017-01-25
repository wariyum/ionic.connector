
 angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$state','appState','$scope'];

function loginCtrl($state,appState,$scope) {
	var vm = this;

	vm.credentials = appState.getLocalStorageAll();

	vm.loggedIn = _isLoggedIn();
	

	vm.doLogin = function() {
		alert('doLogin success');
	}

	vm.registration = function() {
		$state.go('app.userRegister');
	}

	vm.logout = function function_name(argument) {
		var credentials = appState.getLocalStorageAll();
		appState.removeFromLocalStorage(credentials);
		vm.loggedIn = _isLoggedIn();
	}

	function _isLoggedIn() {
		return !(vm.credentials === undefined || vm.credentials.length === 0);
	}
}