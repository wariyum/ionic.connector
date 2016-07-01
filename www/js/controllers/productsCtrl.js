
 angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService','appService','appState'];


 function productsCtrl(productService,appService,appState) {

	var vm = this;
	vm.imageUrl = appService.getUrlImg();

  vm.init = function () {

     productService.getProductsPublished().then(function (response) {
        vm.products = response.data.success;
        appState.setListProducts(vm.products);
      });
    
  }
	}
