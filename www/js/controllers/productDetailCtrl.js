
 angular.module('starter')

.controller('productDetailCtrl', productDetailCtrl);

productDetailCtrl.$inject = ['productService','$stateParams','appService','appState'];


 function productDetailCtrl(productService,$stateParams,appService,appState) {

	var vm = this;

  vm.init = function () {

	vm.productId = $stateParams.productId;
  vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';


     productService.getProductDetailsPublished(vm.productId).then(function (response) {
        vm.productDetail = response.data.success;
      });
    
  }

  vm.previous = function() {
    appState.getShownProductId();
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
