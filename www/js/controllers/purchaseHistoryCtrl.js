 angular.module('starter')

.controller('purchaseHistoryCtrl', purchaseHistoryCtrl);

purchaseHistoryCtrl.$inject = ['cartService'];

function purchaseHistoryCtrl(cartService) {
	var vm = this;

	vm.init = function () {
	 cartService.getOrderHistory().then(function (response){
	 	vm.orderList = response.data.success.content;
	 });
	}
}