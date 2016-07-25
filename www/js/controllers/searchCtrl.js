 angular.module('starter')

.controller('searchCtrl', searchCtrl);

searchCtrl.$inject =['searchService','appService'];

function searchCtrl(searchService,appService) {
	var vm = this;
	vm.search = search;
	vm.imageUrl = appService.getUrlImg() + appService.getProgId() + '/';


	function search() {
		//call search service
		searchService.searchProducts(vm.searchText).then(function (response){
			vm.products = response.data.success;
			console.log(vm.products);
		});
	}
}
