(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.service:homeService
     * @description
     * # homeService
     * Service of the app
     */

    angular.module('starter')
        .service('appState', appState);

    appState.$inject = ['lodash','$state','ctrlUtilityService'];

    var shownProductId = 0;
    var loggedUser;
    var listProducts;
    var checkedOutProductIds = [];

    function appState(lodash,$state,ctrlUtilityService) {
        return {
            getShownProductId: getShownProductId,
            setShownProductId: setShownProductId,
            getNextProduct: getNextProduct,
            getPreviousProduct: getPreviousProduct,
            setListProducts: setListProducts,
            checkout: checkout,
            isLoggedIn: isLoggedIn
        };

        function getShownProductId() {
            return shownProductId;
        }

        function setShownProductId(value) {
           shownProductId = value;
        }

        function getPreviousProduct(currentProdId) {
            var idxProduct = lodash.findIndex(listProducts, {'id':parseInt(currentProdId)});
            if(idxProduct > 0)
            {
                //get the productId of the product
                var product = listProducts[--idxProduct];
                //display product
                $state.go('app.single',{'productId':product.id});
            }
            else{
                ctrlUtilityService.showAlert('At the beginning of Product Series');
            }
        }

        function getNextProduct(currentProdId) {
            var idxProduct = lodash.findIndex(listProducts, {'id':parseInt(currentProdId)});
            if(idxProduct < listProducts.length - 1)
            {
                //get the productId of the product
                var product = listProducts[++idxProduct];
                //display product
                $state.go('app.single',{'productId':product.id});
            }
            else{
                ctrlUtilityService.showAlert('At the end of Product Series');
            }
        }

        function setListProducts(products) {
            listProducts = products;
        }

        function checkout(productId) {
            //check logged in status
            if(loggedUser === undefined)
            {
            //if not logged in take user to login page
                $state.go('app.login');
            }

        }

        function isLoggedIn(){
            return loggedUser;
        }
    }

})();