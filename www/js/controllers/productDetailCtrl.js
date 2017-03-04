angular.module('starter')

.controller('productDetailCtrl', productDetailCtrl);

productDetailCtrl.$inject = ['productService', '$stateParams', 'appService', 'appState','$ionicSlideBoxDelegate','cartService','$cordovaSocialSharing'];


function productDetailCtrl(productService, $stateParams, appService, appState,$ionicSlideBoxDelegate, cartService,$cordovaSocialSharing) {

    var vm = this;

    vm.init = function() {

        vm.productId = $stateParams.productId;
        vm.liked = false;
        vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';


        productService.getProductDetailsPublished(vm.productId).then(function(response) {
            vm.productDetail = response.data.success;
            $ionicSlideBoxDelegate.update();
        });


        var tmp = appState.getIndexOfLikedProduct(vm.productId);
        if(tmp > 0)
        {
            vm.liked = true;
        }

    }

    vm.previous = function() {
        appState.getPreviousProduct(vm.productId);
    }

    vm.next = function() {
        appState.getNextProduct(vm.productId);
    }

    vm.checkout = function() {
        //call service
        var cartItm = {};
        cartItm.product = {};
        cartItm.product.id = vm.productDetail.id;
        cartItm.quantity = 1;
        cartService.appendCartItem(cartItm);
        appState.checkout(vm.productDetail);
    }

    vm.share = function() {
        var image = null;
        var link = 'http://wariyum.com';
        $cordovaSocialSharing
            .shareViaWhatsApp("Check Out this product from wariyum", image, link)
            .then(function(result) {
                alert('success');
              // Success!
            }, function(err) {
                alert('failure');
              // An error occurred. Show a message to the user
            });
    }

    vm.addToLike = function(argument) {
        appState.addLikedProduct(vm.productId);
        vm.liked = true;
    }
}