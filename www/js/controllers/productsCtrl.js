
 angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService','appService','appState','$stateParams'];


 function productsCtrl(productService,appService,appState,$stateParams) {

	var vm = this;
	vm.imageUrl = appService.getUrlImg();

	vm.categoryId = $stateParams.categoryId;

	vm.isProductListEmpty = false;

  vm.init = function () {

  	if(vm.categoryId <= 0){
	     productService.getProductsPublished().then(function (response) {
	        vm.products = response.data.success;
	        appState.setListProducts(vm.products);

	      });
 		}
 	else{
 		 productService.getProductsByCategoryId(vm.categoryId).then(function (response) {
	        vm.products = response.data.success;
	        appState.setListProducts(vm.products);
	        if(vm.products.length <= 0){
	        	vm.isProductListEmpty = true;
	        }
	      });
 	}
    
  	}
}
