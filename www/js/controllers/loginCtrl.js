
 angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$state','appState','$scope','$rootScope','credentialService'];

function loginCtrl($state,appState,$scope,$rootScope,credentialService) {
	var vm = this;

	vm.credentials = $rootScope.credentials;

	vm.loggedIn = credentialService.isUserLoggedIn();;

	 $rootScope.$on('rootScope:credentials', function (event, data) {
	 	vm.credentials = data;
	 	vm.loggedIn = credentialService.isUserLoggedIn();
	  });
	

	vm.doLogin = function() {
		var data = {};
		data.emailId = vm.loginData.username;
		data.password = vm.loginData.password;
		credentialService.loginUser(data);
	}

	vm.registration = function() {
		$state.go('app.userRegister');
	}

	vm.logout = function function_name(argument) {
		var credentials = appState.getLocalStorageAll();
		appState.removeFromLocalStorage(credentials);
		vm.credentials = undefined;
		vm.loggedIn = credentialService.isUserLoggedIn();
	}

	
}