
 angular.module('starter')

.controller('productDetailCtrl', productDetailCtrl);

productDetailCtrl.$inject = ['productService','$stateParams'];


 function productDetailCtrl(productService,$stateParams) {

	var vm = this;

  vm.init = function () {

	vm.productId = $stateParams.productId;
		 // alert(config.PROG_ID);

	alert(vm.productId);

     productService.getProductsPublished().then(function (response) {
        vm.products = response.data.success;
      });
    
  }
	}
