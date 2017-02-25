
 angular.module('starter')

.controller('orderDetailsCtrl', orderDetailsCtrl);

orderDetailsCtrl.$inject = ['$stateParams','$rootScope','cartService','$scope','$ionicPopup'];

function orderDetailsCtrl($stateParams,$rootScope,cartService,$scope,$ionicPopup) {
	var vm = this;

	vm.init = function() {
		getParamsAndLoadPage();
	}

	 $rootScope.$on('rootScope:orderDetails', function (event, data) {
		getParamsAndLoadPage();
	  });

	 function getParamsAndLoadPage() {
	 	vm.programId = $stateParams.programId;
		vm.orderId = $stateParams.orderId;
		//get Order details
		 cartService.getOrderDetail(vm.orderId).then(function(response) {
             // _.forEach(response.data.success.content, function(value, key) {
             //     value.tmpMoment = moment(value.createdDateTime).fromNow();
             // });
             vm.orderDetails = response.data.success;
             vm.status = vm.orderDetails.status;
         });
	 }

	 // A confirm dialog
 $scope.showCancelConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Cancel your Order',
     template: 'Are you sure you want to Cancel order?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       cartService.cancelOrder(vm.orderId);
     } else {
       
     }
   });
 };

	 vm.cancelOrder = function() {
	 	$scope.showCancelConfirm();
	 }


}