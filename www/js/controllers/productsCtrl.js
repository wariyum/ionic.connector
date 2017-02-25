angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService', 'appService', 'appState', '$stateParams', '$scope', 'lodash'];


function productsCtrl(productService, appService, appState, $stateParams, $scope, _) {

    var vm = this;
    vm.imageUrl = appService.getUrlImg() + appService.getProgId() + '/';

    vm.categoryId = $stateParams.categoryId;
    vm.programId = $stateParams.programId;

    vm.isProductListEmpty = false;

    vm.products = [];
    vm.page = 0;
    vm.totalPages = null;

    vm.init = function() {
        if (vm.programId > 0) {
            appService.setProgId(vm.programId);
        }

    }

    vm.moreDataCanBeLoaded = function() {
        return !(vm.totalPages == vm.page);
        // return vm.page === 
    }

    vm.loadMore = function() {
        if (vm.categoryId <= 0) {
            productService.getProductsPublished(vm.page).then(function(response) {
                vm.totalPages = response.data.success.totalPages;
                vm.page = vm.page + 1;
                _.forEach(response.data.success.content, function(itm) {
                    vm.products.push(itm);
                });

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        } else {
            productService.getProductsByCategoryId(vm.categoryId).then(function(response) {
                vm.products = response.data.success;
                appState.setListProducts(vm.products);
                if (vm.products.length <= 0) {
                    vm.isProductListEmpty = true;
                }
            });
        }

    }
}
