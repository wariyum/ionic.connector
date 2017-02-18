 angular.module('starter')

 .controller('purchaseHistoryCtrl', purchaseHistoryCtrl);

 purchaseHistoryCtrl.$inject = ['cartService', 'moment', 'lodash', '$state','$rootScope','appService'];

 function purchaseHistoryCtrl(cartService, moment, _, $state,$rootScope,appService) {
     var vm = this;
     vm.init = function() {
         cartService.getOrderHistory().then(function(response) {
             _.forEach(response.data.success.content, function(value, key) {
                 value.tmpMoment = moment(value.createdDateTime).fromNow();
             });
             vm.orderList = response.data.success.content;
         });
     }

     vm.showOrderDetails = function(orderId) {
        $rootScope.$broadcast('rootScope:orderDetails', { programId: appService.getProgId() , orderId: orderId }); 
        $state.go('app.orderDetails', { programId: appService.getProgId(), orderId: orderId });
     }
 }
