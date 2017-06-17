angular.module('starter')

.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['productService', 'appService', 'appState', '$stateParams', '$scope', 'lodash', 'cartService', 'credentialService', 'ctrlUtilityService', '$state'];


function productsCtrl(productService, appService, appState, $stateParams, $scope, _, cartService, credentialService, ctrlUtilityService, $state) {

    var vm = this;
    vm.imageUrl = appService.getUrlImg() + appService.getProgId() + '/';

    vm.categoryId = $stateParams.categoryId;
    vm.programId = $stateParams.programId;

    vm.isProductListEmpty = false;

    vm.products = [];
    vm.page = 0;
    vm.totalPages = null;
    vm.header = "Products";

    vm.init = function() {
        if (vm.programId > 0) {
            appService.setProgId(vm.programId);
        }

    }

    vm.addToCart = function(productId) {
        if (!credentialService.isUserLoggedIn()) {
            ctrlUtilityService.showAlert('Please login before Checkout');
            $state.go('app.login');
        } else {
            //only if user logged in
            // $state.go('app.shippingInfo');
            cartService.addToCart(productId);

        }
    }

    vm.moreDataCanBeLoaded = function() {
        return !(vm.totalPages == vm.page);
        // return vm.page === 
    }

    function loadToList(response) {
        if (!response.data || response.data.error) {
            vm.noDataBanner = true;
        } else {
            vm.totalPages = response.data.success.totalPages;
            vm.page = vm.page + 1;
            _.forEach(response.data.success.content, function(itm) {
                vm.products.push(itm);
            });

            //splitting to columnr view

            vm.productCols = [];
            var lenProds = vm.products.length;


            for (var i = 0; i < lenProds; i = i + 2) {
                var tmpProdItm = [];
                vm.productCols.push(tmpProdItm);
                tmpProdItm.push(vm.products[i]);
                tmpProdItm.push(vm.products[i + 1]);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }



    vm.loadMore = function() {
        vm.noDataBanner = false;
        if (vm.categoryId <= 0) {
            vm.header = "Best Deals";
            productService.getProductsPublished(vm.page).then(function(response) {
                loadToList(response);
                appState.setListProducts(response.data.success.content);
            });
        } else {
            vm.header = $stateParams.header;
            productService.getProductsByCategoryId(vm.categoryId, vm.page).then(function(response) {
                loadToList(response);
                appState.setListProducts(response.data.success.content);

            });
        }

    }
}