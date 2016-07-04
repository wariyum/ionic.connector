
 angular.module('starter')

.controller('checkoutCtrl', checkoutCtrl);

checkoutCtrl.$inject = ['appState','appService'];

function checkoutCtrl(appState,appService) {
	var vm = this;
	vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';

	vm.productsCheckedOut = appState.getCheckedOutProducts();

	vm.incrementQty = function(value){
		
		alert(value);
	};

	vm.checkout = function() {
		alert('checkout');
	};
}