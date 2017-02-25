angular.module('starter')

.controller('shippingInfoCtrl', shippingInfoCtrl);

shippingInfoCtrl.$inject = ['cartService', '$ionicPopup', '$scope','$rootScope','$state'];

function shippingInfoCtrl(cartService, $ionicPopup, $scope,$rootScope,$state) {
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
                 //broadcast event refresh Purchase Hisotry

            $rootScope.$broadcast('rootScope:orderPlaced',{});
            $state.go('app.purchaseHistory');
                 //redirect to purchase history
            } else {
                //console.log('You are not sure');
            }
        });
    };
}
