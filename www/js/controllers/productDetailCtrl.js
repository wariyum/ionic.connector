
 angular.module('starter')

.controller('productDetailCtrl', productDetailCtrl);

productDetailCtrl.$inject = ['productService','$stateParams'];


 function productDetailCtrl(productService,$stateParams) {

	var vm = this;

  vm.init = function () {

	vm.productId = $stateParams.productId;
		 // alert(config.PROG_ID);

	// alert(vm.productId);

     productService.getProductDetailsPublished(vm.productId).then(function (response) {
        vm.productDetail = response.data.success;
      });
    
  }
	}
