 angular.module('starter')

 .controller('searchCtrl', searchCtrl);

 searchCtrl.$inject = ['searchService', 'appService', 'cartService', 'appState'];

 function searchCtrl(searchService, appService, cartService, appState) {
     var vm = this;
     vm.search = search;
     vm.imageUrl = appService.getUrlImg() + appService.getProgId() + '/';


     function search() {
         //call search service
         searchService.searchProducts(vm.searchText).then(function(response) {
             vm.products = response.data.success;
         });
     }
     vm.order = function(productId) {
         cartService.addToCart(productId);
     }
 }