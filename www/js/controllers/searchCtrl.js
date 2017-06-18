 angular.module('starter')

 .controller('searchCtrl', searchCtrl);

 searchCtrl.$inject = ['searchService', 'appService', 'cartService', 'appState', '$state'];

 function searchCtrl(searchService, appService, cartService, appState, $state) {
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
     vm.showDetails = function(productId) {
         $state.go('app.single', { 'productId': productId });
     }
 }