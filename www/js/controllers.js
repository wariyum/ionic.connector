angular.module('starter')

.controller('appCtrl', appCtrl);

appCtrl.$inject = ['categoryService','appService','$rootScope','cartService'];

function appCtrl(categoryService,appService,$rootScope,cartService) {
  var vm = this;
  vm.init = init;

  function init() {

  	$rootScope.progId = appService.getProgId();

    cartService.getCartItems();


    categoryService.getCategories(appService.getProgId()).then(function(response) {
            $rootScope.categories = response.data.success;
        });
  }
}
