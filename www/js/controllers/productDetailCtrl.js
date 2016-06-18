
 angular.module('starter')

.controller('productDetailCtrl', productDetailCtrl);

productDetailCtrl.$inject = ['productService','$stateParams','appService'];


 function productDetailCtrl(productService,$stateParams,appService) {

	var vm = this;

  vm.init = function () {

	vm.productId = $stateParams.productId;
  vm.imgUrl = appService.getUrlImg();


     productService.getProductDetailsPublished(vm.productId).then(function (response) {
        vm.productDetail = response.data.success;
        alert(vm.productDetail.name);
      });
    
  }
	}

angular.module('starter')
   .controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});
