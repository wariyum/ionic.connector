angular.module('starter')

.controller('productDetailCtrl', productDetailCtrl);

productDetailCtrl.$inject = ['productService', '$stateParams', 'appService', 'appState','$ionicSlideBoxDelegate'];


function productDetailCtrl(productService, $stateParams, appService, appState,$ionicSlideBoxDelegate  ) {

    var vm = this;

    vm.init = function() {

        vm.productId = $stateParams.productId;
        vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';


        productService.getProductDetailsPublished(vm.productId).then(function(response) {
            vm.productDetail = response.data.success;
            $ionicSlideBoxDelegate.update();
        });

    }

    vm.previous = function() {
        appState.getPreviousProduct(vm.productId);
    }

    vm.next = function() {
        appState.getNextProduct(vm.productId);
    }

    vm.checkout = function() {
      appState.checkout(vm.productDetail);
    }
}