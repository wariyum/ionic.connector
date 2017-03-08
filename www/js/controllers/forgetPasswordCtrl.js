
angular.module('starter')

.controller('forgetPasswordCtrl', forgetPasswordCtrl);

forgetPasswordCtrl.$inject = ['credentialService'];
function forgetPasswordCtrl(credentialService){
	var vm = this;

	vm.resetPassword = function() {
		 var data = {};
        if (!vm.username) {
            alert('Please fill email id ');
        } else {
            data.email = vm.username;
            credentialService.forgetPassword(data);
        }
	}
	
}