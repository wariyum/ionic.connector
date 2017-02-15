angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = ['cartService'];

function shippingInfoCtrl(cartService) {
	var vm = this;

	vm.sendOrderToProcess = function() {
		cartService.sendOrderToProcess();
	}
}