angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = ['cartService', '$ionicPopup', '$scope', '$rootScope', '$state', '$cordovaGeolocation', 'appState'];

function shippingInfoCtrl(cartService, $ionicPopup, $scope, $rootScope, $state, $cordovaGeolocation, appState) {
    var vm = this;

    vm.shipping = {};

    vm.getGeoLocation = function() {
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                vm.shipping.lat = position.coords.latitude
                vm.shippinglng = position.coords.longitude

            }, function(err) {
                // error
            });
    }

    vm.showConfirm = function() {

        // cartService.saveShippingAddr();
        var confirmPopup = $ionicPopup.confirm({
            title: 'Order placement confirmation',
            template: 'Shall we place your Order?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                var shippingAddr = {};
                shippingAddr.same = true;
                shippingAddr.address = {};
                shippingAddr.address.address1 = vm.shipping.address1;
                shippingAddr.address.address2 = vm.shipping.address2;
                shippingAddr.address.city = vm.shipping.city;
                shippingAddr.address.firstName = vm.shipping.firstName;
                shippingAddr.address.lastName = vm.shipping.lastName;

                cartService.saveShippingAddr(shippingAddr);
                cartService.sendOrderToProcess();
                appState.clearCheckedOutProducts();
                //broadcast event refresh Purchase Hisotry

                $state.go('app.purchaseHistory');
                //redirect to purchase history
            } else {
                //console.log('You are not sure');
            }
        });
    };
}