 angular.module('starter')

.controller('purchaseHistoryCtrl', purchaseHistoryCtrl);

purchaseHistoryCtrl.$inject = ['cartService','moment','lodash'];

function purchaseHistoryCtrl(cartService,moment,_) {
	var vm = this;
	vm.test = moment("20111031", "YYYYMMDD").fromNow();
	vm.init = function () {
	 cartService.getOrderHistory().then(function (response){
	 	_.forEach(response.data.success.content, function(value, key) {
	 		// value.
		   value.tmpMoment = moment(value.createdDateTime).fromNow();
		});
	 	vm.orderList = response.data.success.content;

	 });
	}
}