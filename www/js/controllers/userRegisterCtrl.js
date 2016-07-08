
 angular.module('starter')

.controller('userRegisterCtrl', userRegisterCtrl);

userRegisterCtrl.$inject = ['appState','ctrlUtilityService'];

function userRegisterCtrl(appState,ctrlUtilityService) {
	var vm = this;
	vm.userReg = {};

	vm.registerUser = function() {
		appState.registerUser(vm.userReg);
		ctrlUtilityService.showAlert('User Registration Successful');
	}
}