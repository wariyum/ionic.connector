
 angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService','appService'];


 function productsCtrl(productService,appService) {

	var vm = this;
	vm.imageUrl = appService.getUrlImg();

  vm.init = function () {

     productService.getProductsPublished().then(function (response) {
        vm.products = response.data.success;
      });
    
  }
	}
