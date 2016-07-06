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
    var loggedUser = {};
    var listProducts;
    var checkedOutProducts = [];
    var likedProductIds = [];
    var lastUrl;

    function appState(lodash,$state,ctrlUtilityService) {
        return {
            getShownProductId: getShownProductId,
            setShownProductId: setShownProductId,
            getNextProduct: getNextProduct,
            getPreviousProduct: getPreviousProduct,
            setListProducts: setListProducts,
            registerUser: registerUser,
            login: login,
            checkout: checkout,
            getCheckedOutProducts:getCheckedOutProducts,
            isLoggedIn: isLoggedIn,
            addSubProductQty: addSubProductQty,
            getProductFromCheckout: getProductFromCheckout
        };

        function getProductFromCheckout(productId) {
             return lodash.filter(checkedOutProducts, { 'id': productId });
       
        }

        function addSubProductQty(productId,qty) {
            // get checkedOutProduct
            var prodSelected = this.getProductFromCheckout(productId)[0];
            prodSelected.qty = prodSelected.qty + qty;
        }

        function getCheckedOutProducts() {
            return checkedOutProducts;
        }

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

        function checkout(product) {

            var tmpObj = {};
            tmpObj.id = product.id;
            tmpObj.product = product;
            tmpObj.qty = 1;
            checkedOutProducts.push(tmpObj);
            //check logged in status
            if(loggedUser === undefined)
            {
                //set lastUrl
                lastUrl = 'app.checkout'

                //if not logged in take user to login page
                $state.go('app.login');
            }
            else
                $state.go('app.checkout');

        }

        function registerUser(register) {
            //TODO: register user
            //set logged-In user
             loggedUser = register;
             //redirect to checkout page
             $state.go(lastUrl);
        }

        function login(user) {
           
        }

        function isLoggedIn(){
            return loggedUser;
        }
    }

})();