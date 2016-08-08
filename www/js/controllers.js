angular.module('starter')

.controller('appCtrl', appCtrl);

appCtrl.$inject = ['categoryService','appService','$rootScope'];

function appCtrl(categoryService,appService,$rootScope) {
  var vm = this;
  vm.init = init;

  function init() {

    categoryService.getCategories(appService.getProgId()).then(function(response) {
            $rootScope.categories = response.data.success;
        });
  }
}
