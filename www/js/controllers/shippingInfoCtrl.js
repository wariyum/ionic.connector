angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = [];

function shippingInfoCtrl() {
	var vm = this;

	vm.sendOrderToProcess = function() {
		alert('sendOrderToProcess');
	}
}