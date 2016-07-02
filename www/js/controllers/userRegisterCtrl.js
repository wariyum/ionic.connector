
 angular.module('starter')

.controller('userRegisterCtrl', userRegisterCtrl);

userRegisterCtrl.$inject = ['appState'];

function userRegisterCtrl(appState) {
	var vm = this;
	vm.userReg = {};

	vm.registerUser = function() {
		appState.registerUser(vm.userReg);
		
	}
}