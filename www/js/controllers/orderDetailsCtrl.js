
 angular.module('starter')

.controller('orderDetailsCtrl', orderDetailsCtrl);

orderDetailsCtrl.$inject = ['$stateParams'];

function orderDetailsCtrl($stateParams) {
	var vm = this;

	vm.init = function() {
		vm.programId = $stateParams.programId;
		vm.orderId = $stateParams.orderId;
		alert(vm.orderId);
	}
}