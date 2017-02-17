 angular.module('starter')

.controller('purchaseHistoryCtrl', purchaseHistoryCtrl);

purchaseHistoryCtrl.$inject = ['cartService','moment'];

function purchaseHistoryCtrl(cartService,moment) {
	var vm = this;
	vm.test = moment("20111031", "YYYYMMDD").fromNow();
	vm.init = function () {
	 cartService.getOrderHistory().then(function (response){
	 	vm.orderList = response.data.success.content;
	 });
	}
}