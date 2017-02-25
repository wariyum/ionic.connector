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

    function loadToList(response) {
    	debugger;
        if (!response.data) {
        	vm.noDataBanner = true;
        } else {
            vm.totalPages = response.data.success.totalPages;
            vm.page = vm.page + 1;
            _.forEach(response.data.success.content, function(itm) {
                vm.products.push(itm);
            });

            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }

    vm.loadMore = function() {
    	vm.noDataBanner = false;
        if (vm.categoryId <= 0) {
            productService.getProductsPublished(vm.page).then(function(response) {
                loadToList(response);
            });
        } else {
            productService.getProductsByCategoryId(vm.categoryId, vm.page).then(function(response) {
                loadToList(response);
            });
        }

    }
}
