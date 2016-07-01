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

    function appState(lodash,$state,ctrlUtilityService) {
        return {
            getShownProductId: getShownProductId,
            setShownProductId: setShownProductId,
            getNextProductId: getNextProductId,
            setListProducts: setListProducts,
            isLoggedIn: isLoggedIn
        };

        function getShownProductId() {
            return shownProductId;
        }

        function setShownProductId(value) {
           shownProductId = value;
        }

        function getNextProductId(currentProdId) {
            var idxProduct = lodash.findIndex(listProducts, {'id':parseInt(currentProdId)});
            if(idxProduct > 0)
            {
                //get the productId of the product
                var product = listProducts[--idxProduct];
                $state.go('app.single',{'productId':product.id});
                //display product
            }
            else{
                //todo: make a toast alett would be better
                ctrlUtilityService.showAlert('At the beginning of Product Series');
            }
        }

        function setListProducts(products) {
            listProducts = products;
        }

        function isLoggedIn(){
            return loggedUser;
        }
    }

})();