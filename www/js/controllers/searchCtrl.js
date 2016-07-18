 angular.module('starter')

.controller('searchCtrl', searchCtrl);

searchCtrl.$inject =['searchService'];

function searchCtrl(searchService) {
	var vm = this;
	vm.search = search;

	function search() {
		//call search service
		searchService.searchProducts(vm.searchText).then(function (response){
			vm.products = response.data.success;
			alert(vm.products);
		});
	}
}
