 angular.module('starter')

.controller('searchCtrl', searchCtrl);

searchCtrl.$inject =[];

function searchCtrl() {
	var vm = this;
	vm.search = search;

	function search() {
		alert(vm.searchText);
	}
}
