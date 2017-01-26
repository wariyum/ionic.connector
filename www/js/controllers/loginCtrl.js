
 angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$state','appState','$scope','$rootScope'];

function loginCtrl($state,appState,$scope,$rootScope) {
	var vm = this;

	vm.credentials = $rootScope.credentials;

	vm.loggedIn = _isLoggedIn();

	 $rootScope.$on('rootScope:credentials', function (event, data) {
	 	vm.credentials = data;
	 	vm.loggedIn = _isLoggedIn();
	  });
	

	vm.doLogin = function() {
		alert('doLogin success');
	}

	vm.registration = function() {
		$state.go('app.userRegister');
	}

	vm.logout = function function_name(argument) {
		var credentials = appState.getLocalStorageAll();
		appState.removeFromLocalStorage(credentials);
		vm.credentials = undefined;
		vm.loggedIn = _isLoggedIn();
	}

	function _isLoggedIn() {
		return !(vm.credentials === undefined || vm.credentials.length === 0);
	}
}