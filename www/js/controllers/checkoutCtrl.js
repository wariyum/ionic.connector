
 angular.module('starter')

.controller('checkoutCtrl', checkoutCtrl);

checkoutCtrl.$inject = ['appState','appService','$state','$scope','credentialService','ctrlUtilityService','cartService'];

function checkoutCtrl(appState,appService,$state,$scope,credentialService,ctrlUtilityService,cartService) {
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

	vm.init = function() {
		cartService.getCartItems();
	}

	function showProduct(productId) {
		 $state.go('app.single',{'productId':productId});
	}

	function removeProduct(productId) {
		appState.removeProductFromCheckout(productId);
		updateSummaryCalc();
	}

	vm.incrementQty = function(productId){

		//UI update
		appState.addSubProductQty(productId,1);
		updateSummaryCalc();
	};

	vm.decrementQty = function(productId){
		appState.addSubProductQty(productId,-1);
		updateSummaryCalc();
	};

	vm.checkout = function() {
		//Scenario - User not logged In - Let them Login & Proceed
		if(!credentialService.isUserLoggedIn())
		{
			ctrlUtilityService.showAlert('Please login before Checkout');
			$state.go('app.login');
		}
		else{
			//only if user logged in
			$state.go('app.shippingInfo');
		}
	};

	function updateSummaryCalc() {
			//calculate total of chekedout products
  	 		vm.checkoutSummary = appState.getCheckedOutProductSummary();

	}
}