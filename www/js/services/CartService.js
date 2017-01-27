(function () {
	'use strict';
	/**
     * @ngdoc function
     * @name app.service:cartService
     * @description
     * # cartService
     * Service for all operations related to Cart, like add to cart to Order taking
     */

        angular.module('wrConnector')
        	.service('cartService', cartService);

        cartService.$inject = ['$http','$state','appService','appConstants','appState','ctrlUtilityService','$rootScope'];


        function cartService($http,$state,appService,appConstants,appState,ctrlUtilityService,$rootScope) {

        	return {
        		addToCart: addToCart,
        		appendCartItem: appendCartItem,
        		removeCartItem: removeCartItem,
        		fillBillingInfo: fillBillingInfo,
        		fillShippingInfo: fillShippingInfo,
        		confirmOrder: confirmOrder
        	};

        	function addToCart(data) {
        		// body...
        	}

        	function appendCartItem(){

        	}

        	function removeCartItem() {
        		// body...
        	}

        	function fillBillingInfo() {
        		// body...
        	}

        	function fillShippingInfo() {
        		// body...
        	}

        	function confirmOrder() {
        		// body...
        	}

        }


})();