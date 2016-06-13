
 angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService'];


 function productsCtrl(productService) {

	var vm = this;

  vm.init = function () {

     productService.getProductsPublished().then(function (response) {
        vm.products = response.data.success;
      });
    
  }
	}
