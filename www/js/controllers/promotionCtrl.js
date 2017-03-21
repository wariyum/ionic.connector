angular.module('starter')

.controller('promotionCtrl', promotionCtrl);

promotionCtrl.$inject = ['$stateParams'];

function promotionCtrl($stateParams) {
	var vm = this;
	getParamsAndLoadPage();

	function getParamsAndLoadPage() {
		vm.promoId = $stateParams.promoId;
	}
}