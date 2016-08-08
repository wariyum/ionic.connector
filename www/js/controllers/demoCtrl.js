
 angular.module('starter')

.controller('demoCtrl', demoCtrl);

demoCtrl.$inject = ['$state','appConstants','appService','$location','$scope','$window','categoryService','$rootScope'];

function demoCtrl($state,appConstants,appService,$location,$scope,$window,categoryService,$rootScope) {

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
		// var url = "http://" + $window.location.host + '#/app/products/'+progId+'/0';
        // $window.location.href = url;
        $state.go('app.products', {'categoryId':0,'programId':progId}, {reload: true});
		//set categories
		categoryService.getCategories(appService.getProgId()).then(function(response) {
            $rootScope.categories = response.data.success;
        });
	}
}
