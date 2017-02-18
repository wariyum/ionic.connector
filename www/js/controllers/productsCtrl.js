
 angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService','appService','appState','$stateParams','$scope','lodash'];


 function productsCtrl(productService,appService,appState,$stateParams,$scope,_) {

	var vm = this;
	vm.imageUrl = appService.getUrlImg() + appService.getProgId() + '/';

	vm.categoryId = $stateParams.categoryId;
	vm.programId = $stateParams.programId;

	vm.isProductListEmpty = false;

	vm.products = [];
	vm.page = 0;

  vm.init = function () {

  	if(vm.programId > 0){
  		appService.setProgId(vm.programId);
  	}

  // 	if(vm.categoryId <= 0){
	 //     productService.getProductsPublished(0).then(function (response) {
	 //        vm.products = response.data.success.content;
	 //        appState.setListProducts(vm.products);

	 //      });
 	// 	}
 	// else{
 	// 	 productService.getProductsByCategoryId(vm.categoryId).then(function (response) {
	 //        vm.products = response.data.success;
	 //        appState.setListProducts(vm.products);
	 //        if(vm.products.length <= 0){
	 //        	vm.isProductListEmpty = true;
	 //        }
	 //      });
 	// }
    
  	}
  	vm.loadMore = function(){
  		  productService.getProductsPublished(vm.page).then(function (response) {
  		  	vm.page = vm.page + 1;
	        _.forEach(response.data.success.content, function(itm) {
			  vm.products.push(itm);
			});
	        
 			$scope.$broadcast('scroll.infiniteScrollComplete');
	      });
  		
  	}
}
