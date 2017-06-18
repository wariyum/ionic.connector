(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name app.service:cartService
     * @description
     * # cartService
     * Service for all operations related to Cart, like add to cart to Order taking
     */

    angular.module('starter')
        .service('cartService', cartService);

    cartService.$inject = ['$http', '$state', 'appService', 'appConstants', 'appState', 'ctrlUtilityService', '$rootScope'];


    function cartService($http, $state, appService, appConstants, appState, ctrlUtilityService, $rootScope) {

        return {
            getCartItems: getCartItems,
            // getCartItems2: getCartItems2,
            addToCart: addToCart,
            appendCartItem: appendCartItem,
            removeCartItem: removeCartItem,
            fillBillingInfo: fillBillingInfo,
            fillShippingInfo: fillShippingInfo,
            sendOrderToProcess: sendOrderToProcess,
            getOrderHistory: getOrderHistory,
            getOrderDetail: getOrderDetail,
            cancelOrder: cancelOrder,
            saveShippingAddr: saveShippingAddr
        };


        function getCartItems(callMe) {
            var data = {};
            if (appConstants.mode === 'dev') {
                console.log('appendCartItem --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/cart/getCart';
                var config = {};
                $http.get(url, data, config)
                    .then(
                        function(response) {
                            if (response.data.error) {
                                ctrlUtilityService.showAlert(response.data.error.errorCode);
                            } else {
                                callMe(response);
                            }
                        },
                        function(response) {
                            alert('error');
                        }
                    );
            }
        }

        function addToCart(productId, callMe) {
            //call service
            var cartItm = {};
            cartItm.product = {};
            cartItm.product.id = productId;
            cartItm.quantity = 1;
            appendCartItem(cartItm, callMe);
        }


        function appendCartItem(data, callMe) {
            if (appConstants.mode === 'dev') {
                console.log('appendCartItem --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/cart/addCartItem';

                var config = {};

                $http.post(url, data, config)
                    .then(
                        function(response) {
                            if (response.data.error) {
                                ctrlUtilityService.showAlert(response.data.error.errorCode);
                            } else {
                                //service call
                                var cartItem = {};
                                cartItem.product = response.data.success.product;
                                // cartItem.quantity = 1;
                                // appState.checkout(cartItem);

                                ctrlUtilityService.showAlert('Added to cart');
                                if (callMe)
                                    callMe();
                            }
                        },
                        function(response) {
                            alert('error');
                            // failure callback
                        }
                    );
            }

        }

        function removeCartItem(orderId) {
            if (appConstants.mode === 'dev') {
                console.log('appendCartItem --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/cart/removeCartItem/' + orderId;

                var config = {};

                $http.delete(url, config)
                    .then(
                        function(response) {
                            if (response.data.error) {
                                ctrlUtilityService.showAlert(response.data.error.errorCode);
                            } else {
                                ctrlUtilityService.showAlert('Deleted Product');
                            }
                        },
                        function(response) {
                            alert('error');
                            // failure callback
                        }
                    );
            }
        }

        function fillBillingInfo() {
            // body...
        }

        function fillShippingInfo() {
            // body...
        }

        function sendOrderToProcess() {
            // t-admin.wariyum.com/service/connector/37/order/cartToOrder

            //todo: check any items are there in cart
            var data = {};
            if (appConstants.mode === 'dev') {
                console.log('sendOrderToProcess --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/order/cartToOrder';

                var config = {};

                $http.post(url, data, config)
                    .then(
                        function(response) {
                            if (response.data.error) {
                                ctrlUtilityService.showAlert(response.data.error.errorCode);
                            } else {
                                $rootScope.$broadcast('rootScope:orderPlaced', {});

                                ctrlUtilityService.showAlert('Thank you, Your Order is placed Successfully');

                            }
                        },
                        function(response) {
                            alert('error');
                            // failure callback
                        }
                    );
            }

        }

        function getOrderHistory() {
            var data = {};
            if (appConstants.mode === 'dev') {
                console.log('getOrderHistory --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/order/getOrderList?sort=createdDateTime,desc';

                var config = {};

                return $http.get(url, data, config);
            }
        }

        function getOrderDetail(orderId) {
            //t-admin.wariyum.com/service/connector/1/order/getOrder/8
            var data = {};
            if (appConstants.mode === 'dev') {
                console.log('getOrderDetail --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/order/getOrder/' + orderId;

                var config = {};

                return $http.get(url, data, config);
            }
        }

        function cancelOrder(orderId) {
            var data = {};
            //t-admin.wariyum.com/service/connector/1/order/cancelOrder/8
            if (appConstants.mode === 'dev') {
                console.log('getOrderHistory --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/order/cancelOrder/' + orderId;
                debugger;
                var config = {};

                return $http.post(url, data, config);
            }
        }

        function saveShippingAddr(shippAddr) {
            // t-admin.wariyum.com/service/connector/1/order/addShippingAddress/14
            if (appConstants.mode === 'dev') {
                console.log('saveShippingAddr --- not defined for Dev mode');
            } else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/order/addShippingAddress/';
                var config = {};

                return $http.post(url, shippAddr, config);
            }
        }

    }


})();