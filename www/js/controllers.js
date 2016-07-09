angular.module('starter')

.controller('appCtrl', appCtrl);

appCtrl.$inject = ['categoryService','appService'];

function appCtrl(categoryService,appService) {
  var vm = this;
  vm.init = init;

  function init() {

    categoryService.getCategories(appService.getProgId()).then(function(response) {
            vm.categories = response.data.success;
        });
  }
}
