
 angular.module('starter')

.controller('demoCtrl', demoCtrl);

demoCtrl.$inject = [];

function demoCtrl() {

	var vm = this;
	vm.showFurniture = showFurniture;
	vm.showSuperMarket = showSuperMarket;
	vm.showJewellery = showJewellery;

	function showFurniture() {
		alert('furniture displayed');
	}

	function showSuperMarket() {
		alert('showSuperMarket displayed');
	}

	function showJewellery() {
		alert('show-jewellery displayed');
	}
}
