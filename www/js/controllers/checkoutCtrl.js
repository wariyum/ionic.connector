
 angular.module('starter')

.controller('checkoutCtrl', checkoutCtrl);

checkoutCtrl.$inject = ['appState','appService','$state'];

function checkoutCtrl(appState,appService,$state) {
	var vm = this;
	vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';

	vm.productsCheckedOut = appState.getCheckedOutProducts();

	vm.showProduct = showProduct;
	vm.removeProduct = removeProduct;

	function showProduct(productId) {
		 $state.go('app.single',{'productId':productId});
	}

	function removeProduct(productId) {
		appState.removeProductFromCheckout(productId);
	}

	vm.incrementQty = function(productId){
		appState.addSubProductQty(productId,1);
	};

	vm.decrementQty = function(productId){
		appState.addSubProductQty(productId,-1);
	};

	vm.checkout = function() {
		$state.go('app.shippingInfo');
	};
}