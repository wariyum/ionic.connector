angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = ['cartService', '$ionicPopup', '$scope'];

function shippingInfoCtrl(cartService, $ionicPopup, $scope) {
    var vm = this;

    vm.sendOrderToProcess = function() {
       
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
            } else {
                //console.log('You are not sure');
            }
        });
    };
}
