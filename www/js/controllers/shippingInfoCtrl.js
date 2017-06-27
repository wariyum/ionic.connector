angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = ['cartService', '$ionicPopup', '$scope', '$rootScope', '$state', '$cordovaGeolocation', 'appState', 'ctrlUtilityService'];

function shippingInfoCtrl(cartService, $ionicPopup, $scope, $rootScope, $state, $cordovaGeolocation, appState, ctrlUtilityService) {
    var vm = this;

    vm.shipping = {};

    vm.init = function() {
        cartService.getLastUsedAddress().then(
            function(response) {
                if (response.data.error) {
                    ctrlUtilityService.showAlert(response.data.error.errorCode);
                } else {
                    vm.shipping = response.data.success.billingAddress;
                }
            },
            function(response) {
                alert('error');
            }
        );
    }

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

    function placOrder(lat, long) {
        var order = {};
        order.same = true;
        order.billingAddress = {};
        order.billingAddress.address1 = vm.shipping.address1;
        order.billingAddress.address2 = vm.shipping.address2;
        order.billingAddress.city = vm.shipping.city;
        order.billingAddress.firstName = vm.shipping.firstName;
        order.billingAddress.lastName = vm.shipping.lastName;
        order.billingAddress.contactNo = vm.shipping.contactNo;
        order.billingAddress.geoLocation = {};
        order.billingAddress.geoLocation.lat = lat;
        order.billingAddress.geoLocation.lon = long;

        // cartService.saveorder(order);
        cartService.sendOrderToProcess(order);
        appState.clearCheckedOutProducts();
        //broadcast event refresh Purchase Hisotry

        $state.go('app.purchaseHistory');

    }

    vm.showConfirm = function() {

        // cartService.saveorder();
        var confirmPopup = $ionicPopup.confirm({
            title: 'Order placement confirmation',
            template: 'Shall we place your Order?'
        });

        confirmPopup.then(function(res) {
            if (res) {

                var posOptions = { timeout: 10000, enableHighAccuracy: false };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) {
                        var lat = position.coords.latitude
                        var long = position.coords.longitude
                        placOrder(lat, long);
                    }, function(err) {
                        // error
                        placOrder();
                    });


                // var watchOptions = {
                //     timeout: 3000,
                //     enableHighAccuracy: false // may cause errors if true
                // };

                // var watch = $cordovaGeolocation.watchPosition(watchOptions);
                // watch.then(
                //     null,
                //     function(err) {
                //         console.log('error');
                //         alert('error');
                //         // error
                //     },
                //     function(position) {
                //         var lat = position.coords.latitude;
                //         var long = position.coords.longitude;
                //         alert(lat);
                //     });


                // watch.clearWatch();



            } else {
                //console.log('You are not sure');
            }
        });
    };
}