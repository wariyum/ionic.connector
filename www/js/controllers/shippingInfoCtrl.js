angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = ['cartService', '$ionicPopup', '$scope', '$rootScope', '$state', '$cordovaGeolocation'];

function shippingInfoCtrl(cartService, $ionicPopup, $scope, $rootScope, $state, $cordovaGeolocation) {
    var vm = this;

    vm.sendOrderToProcess = function() {

    }

    vm.getGeoLocation = function() {
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                alert(lat);
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
                cartService.sendOrderToProcess();
                //broadcast event refresh Purchase Hisotry

                $state.go('app.purchaseHistory');
                //redirect to purchase history
            } else {
                //console.log('You are not sure');
            }
        });
    };
}
