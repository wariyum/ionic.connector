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
        		
        	}

        	function appendCartItem(data){

	        	if(appConstants.mode === 'dev')
	                {
	                	console.log('appendCartItem --- not defined for Dev mode');
	                }
	            else{
	            	var url = 'http://t-admin.wariyum.com/service/connector/1/cart/addCartItem';
	          
	          		// $http.defaults.headers.common['Authorization'] = 'Bearer f0e7edd4-dfb8-40b0-b678-104e3982698c';
	            	var config = {};
	            	config.headers = {};

      				config.headers.Authorization = 'Bearer f0e7edd4-dfb8-40b0-b678-104e3982698c';
	            	$http.post(url, data,config )
			
				   .then(
				       function(response){
					       	if(response.data.error !== undefined)
					       	{
					       		 ctrlUtilityService.showAlert(response.data.error.errorCode);
					       	}
					       	else
					       	{
						       	ctrlUtilityService.showAlert('Added to cart');
						    }
				   		}, 
				       function(response){
				       	alert('error');
				         // failure callback
				       }
				    );
	            }

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