
 angular.module('starter')

.controller('playlistCtrl', playlistCtrl);

playlistCtrl.$inject = ['productService'];


 function playlistCtrl(productService) {

	var vm = this;

  vm.init = function () {

     productService.getProductsPublished().then(function (response) {
        vm.products = response.data.success;
      });
    
  }
	}
