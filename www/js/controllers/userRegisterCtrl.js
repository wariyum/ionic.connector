
 angular.module('starter')

.controller('userRegisterCtrl', userRegisterCtrl);

userRegisterCtrl.$inject = ['appState','ctrlUtilityService','credentialService'];

function userRegisterCtrl(appState,ctrlUtilityService,credentialService) {
	var vm = this;
	vm.userReg = {};

	vm.registerUser = function() {
		appState.registerUser(vm.userReg);
	}

	vm.submitUserRegistration = function() {
		var data = {};
		data.emailId = vm.userReg.email;
		data.password = vm.userReg.password;
		credentialService.registerUser(data);		
	}
}