
 angular.module('starter')

.controller('checkoutCtrl', checkoutCtrl);

checkoutCtrl.$inject = ['appState','appService'];

function checkoutCtrl(appState,appService) {
	var vm = this;
	vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';

	vm.productsCheckedOut = appState.getCheckedOutProducts();

	vm.incrementQty = function(productId){
		appState.addSubProductQty(productId,1);
	};

	vm.decrementQty = function(productId){
		appState.addSubProductQty(productId,-1);
	};

	vm.checkout = function() {
		alert('checkout');
	};
}