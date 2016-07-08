angular.module('starter')

.controller('appCtrl', appCtrl);

function appCtrl() {
appCtrl.$inject = ['productService'];


function appCtrl(productService) {
  var vm = this;
alert('hia');
  vm.init = init;

  function init() {
    alert('init');
  }
}
}