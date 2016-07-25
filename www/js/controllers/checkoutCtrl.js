
 angular.module('starter')

.controller('checkoutCtrl', checkoutCtrl);

checkoutCtrl.$inject = ['appState','appService','$state','$scope'];

function checkoutCtrl(appState,appService,$state,$scope) {
	var vm = this;
	vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';

	vm.productsCheckedOut = appState.getCheckedOutProducts();

	vm.showProduct = showProduct;
	vm.removeProduct = removeProduct;

	$scope.$on('$stateChangeSuccess', function () {
  	 	if ($state.current.name === 'app.checkout'){
  	 		updateSummaryCalc();
  	 	  }
	});

	function showProduct(productId) {
		 $state.go('app.single',{'productId':productId});
	}

	function removeProduct(productId) {
		appState.removeProductFromCheckout(productId);
		updateSummaryCalc();
	}

	vm.incrementQty = function(productId){
		appState.addSubProductQty(productId,1);
		updateSummaryCalc();
	};

	vm.decrementQty = function(productId){
		appState.addSubProductQty(productId,-1);
		updateSummaryCalc();
	};

	vm.checkout = function() {
		$state.go('app.shippingInfo');
	};

	function updateSummaryCalc() {
			//calculate total of chekedout products
  	 		vm.checkoutSummary = appState.getCheckedOutProductSummary();
  	 		console.log(vm.checkoutSummary);

	}
}