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

    appState.$inject = ['lodash', '$state', 'ctrlUtilityService', '$localStorage', '$rootScope'];

    var shownProductId = 0;
    var loggedUser = {};
    var listProducts = [];
    var checkedOutProducts = [];
    var likedProductIds = [];
    var lastUrl;
    var likedProducts = [];



    function appState(lodash, $state, ctrlUtilityService, $localStorage, $rootScope) {
        return {
            getShownProductId: getShownProductId,
            setShownProductId: setShownProductId,
            getNextProduct: getNextProduct,
            getPreviousProduct: getPreviousProduct,
            setListProducts: setListProducts,
            registerUser: registerUser,
            login: login,
            checkout: checkout,
            getCheckedOutProducts: getCheckedOutProducts,
            isLoggedIn: isLoggedIn,
            addSubProductQty: addSubProductQty,
            getProductFromCheckout: getProductFromCheckout,
            getProductIndexFromCheckout: getProductIndexFromCheckout,
            getProductIndexFromProduct: getProductIndexFromProduct,
            removeProductFromCheckout: removeProductFromCheckout,
            addLikedProduct: addLikedProduct,
            getIndexOfLikedProduct: getIndexOfLikedProduct,
            getCheckedOutProductSummary: getCheckedOutProductSummary,
            //LocalStorage
            getLocalStorageAll: _getLocalStorageAll,
            addToLocalStorage: _addToLocalStorage,
            removeFromLocalStorage: _removeFromLocalStorage,
            loadCheckedOutProducts: loadCheckedOutProducts,
            clearCheckedOutProducts: clearCheckedOutProducts,
            showCartIndicator: showCartIndicator

        };

        function clearCheckedOutProducts() {
            checkedOutProducts = [];
        }

        function getCheckedOutProductSummary() {
            var summary = {}
            summary.price = lodash.sumBy(checkedOutProducts, function(o) {
                return (o.product.unitPrice * o.qty);
            });
            summary.count = checkedOutProducts.length;
            return summary;
        }

        function getIndexOfLikedProduct(productId) {
            // return lodash.findIndex(likedProducts,productId);
            return likedProducts.findIndex(function(o) {
                return o == productId
            })
        }

        function addLikedProduct(productId) {
            var idxLikedProd = getIndexOfLikedProduct(productId);
            if (idxLikedProd === -1) {
                likedProducts.push(productId);
            }
        }

        function getProductIndexFromProduct(productId) {
            return lodash.findIndex(listProducts, { 'id': parseInt(productId) });
        }

        function getProductIndexFromCheckout(productId) {

            return lodash.findIndex(checkedOutProducts, { 'id': parseInt(productId) });
        }

        function removeProductFromCheckout(productId) {
            var idxProduct = getProductIndexFromCheckout(productId);
            checkedOutProducts.splice(idxProduct, 1);
        }

        function getProductFromCheckout(productId) {
            return lodash.filter(checkedOutProducts, { 'id': productId });
        }

        function addSubProductQty(productId, qty) {
            var prodSelected = this.getProductFromCheckout(productId)[0];

            // get checkedOutProduct
            if ((prodSelected.qty + qty) >= 0) {
                prodSelected.qty = prodSelected.qty + qty;
            }
        }

        function getCheckedOutProducts() {
            return checkedOutProducts;
        }

        function showCartIndicator() {
            if (checkedOutProducts.length > 0)
                $rootScope.haveCartItems = true;
            else
                $rootScope.haveCartItems = false;
        }

        function getShownProductId() {
            return shownProductId;
        }

        function setShownProductId(value) {
            shownProductId = value;
        }

        function getPreviousProduct(currentProdId) {
            var idxProduct = getProductIndexFromProduct(currentProdId);
            if (idxProduct > 0) {
                //get the productId of the product
                var product = listProducts[--idxProduct];
                //display product
                $state.go('app.single', { 'productId': product.id });
            } else {
                ctrlUtilityService.showAlert('At the beginning of Product Series');
            }
        }

        function getNextProduct(currentProdId) {
            var idxProduct = getProductIndexFromProduct(currentProdId);
            if (idxProduct < listProducts.length - 1) {
                //get the productId of the product
                var product = listProducts[++idxProduct];
                //display product
                $state.go('app.single', { 'productId': product.id });
            } else {
                ctrlUtilityService.showAlert('At the end of Product Series');
            }
        }

        function setListProducts(products) {
            for (var i = 0; i < products.length; i++) {
                listProducts.push(products[i]);
                //TODO: add more products in the list
            }
        }

        function loadCheckedOutProducts(data) {
            if (data != undefined) {
                checkedOutProducts = [];
                _.forEach(data.items, function(itm) {
                    var tmp = {};
                    tmp.product = {};
                    tmp.product = itm.product;
                    tmp.id = itm.product.id;
                    tmp.orderId = itm.id;
                    tmp.qty = itm.quantity;
                    checkedOutProducts.push(tmp);
                });
            }


        }

        function checkout(product) {

            //check product exist in the checkout array
            //-get index of product
            var idxProduct = this.getProductIndexFromCheckout(product.id);
            var replaceIndex = 1;
            //manage -1 scenario
            if (idxProduct < 0) {
                idxProduct = 0;
                replaceIndex = 0;
                var tmpObj = {};
                tmpObj.id = product.id;
                tmpObj.product = product;
                tmpObj.qty = 1;
                checkedOutProducts.splice(idxProduct, replaceIndex, tmpObj);
            } else if (idxProduct > 0) {
                //for exisitng product move that to first
                //-first remove it
                var tmpCheckOutProduct = checkedOutProducts[idxProduct];
                checkedOutProducts[idxProduct] = checkedOutProducts[0];
                tmpCheckOutProduct.qty = tmpCheckOutProduct.qty + 1;
                checkedOutProducts[0] = tmpCheckOutProduct;
            }


            //check logged in status
            if (loggedUser === undefined) {
                //set lastUrl
                lastUrl = 'app.checkout'
                    //if not logged in take user to login page
                $state.go('app.login');
            } else
                $state.go('app.checkout');

        }

        function registerUser(register) {
            //TODO: register user
            //set logged-In user
            loggedUser = register;

            //redirect to checkout page
            if (this.lastUrl != undefined) {
                $state.go(lastUrl);
            }
        }

        function login(user) {

        }

        function isLoggedIn() {
            return loggedUser;
        }

        function _getLocalStorageAll() {
            if ($localStorage.credentials != undefined && $localStorage.credentials.length > 0) {
                $rootScope.token = $localStorage.credentials[0][0].access_token;
                return $localStorage.credentials;
            }
        };

        function _addToLocalStorage(thing) {
            if ($localStorage.credentials === undefined) {
                $localStorage = $localStorage.$default({
                    credentials: []
                });
            }
            $localStorage.credentials.push(thing);
        }

        function _removeFromLocalStorage(thing) {
            $localStorage.credentials = undefined;
            // $localStorage.credentials.splice($localStorage.credentials.indexOf(thing), 1);
        }
    }

})();