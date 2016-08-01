
 angular.module('starter')

.controller('demoCtrl', demoCtrl);

demoCtrl.$inject = ['$state','appConstants','appService','$location','$scope','$window'];

function demoCtrl($state,appConstants,appService,$location,$scope,$window) {

	var vm = this;
	vm.showFurniture = showFurniture;
	vm.showSuperMarket = showSuperMarket;
	vm.showJewellery = showJewellery;

	function showFurniture() {
		setProgramAndShowHomePage(appConstants.prog_id_furniture);
	}

	function showSuperMarket() {
		setProgramAndShowHomePage(appConstants.prog_id_supermarket);
	}

	function showJewellery() {
		setProgramAndShowHomePage(appConstants.prog_id_jewellery);
	}

	function setProgramAndShowHomePage(progId) {
		//set prog_id
		appService.setProgId(progId);
		//go to Home page
		$state.go('app.products',{'categoryId':0});
	}
}
