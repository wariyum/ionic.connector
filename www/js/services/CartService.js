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
                getCartItems: getCartItems,
        		addToCart: addToCart,
        		appendCartItem: appendCartItem,
        		removeCartItem: removeCartItem,
        		fillBillingInfo: fillBillingInfo,
        		fillShippingInfo: fillShippingInfo,
        		confirmOrder: confirmOrder
        	};

            function getCartItems(){
                var data = {};
                if(appConstants.mode === 'dev')
                    {
                        console.log('appendCartItem --- not defined for Dev mode');
                    }
                else{
                        var url = appService.getUrl()+'connector/'+ appConstants.prog_id +'/cart/getCart';

                        var config = {};
                        
                        $http.get(url, data,config )
                       .then(
                           function(response){
                                if(response.data.error)
                                {
                                     ctrlUtilityService.showAlert(response.data.error.errorCode);
                                }
                                else
                                {
                                    //load to Cart items
                                    appState.loadCheckedOutProducts(response.data.success);
                                }
                            }, 
                           function(response){
                            alert('error');
                             // failure callback
                           }
                        );
                    }
            }

        	function addToCart(data) {
        		
        	}


        	function appendCartItem(data){

	        	if(appConstants.mode === 'dev')
	                {
	                	console.log('appendCartItem --- not defined for Dev mode');
	                }
	            else{
	            	var url = appService.getUrl() + 'connector/'+ appConstants.prog_id +'/cart/addCartItem';
	          
	            	var config = {};

	            	$http.post(url, data,config )
				   .then(
				       function(response){
					       	if(response.data.error)
					       	{
					       		 ctrlUtilityService.showAlert(response.data.error.errorCode);
					       	}
					       	else
					       	{
                                //service call
                                var cartItem = {};
                                cartItem.product = response.data.success.product;
                                // cartItem.quantity = 1;
                                // appState.checkout(cartItem);

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

        	function removeCartItem(orderId) {
        		if(appConstants.mode === 'dev')
                    {
                        console.log('appendCartItem --- not defined for Dev mode');
                    }
                else{
                    var url = appService.getUrl() + 'connector/'+ appConstants.prog_id +'/cart/removeCartItem/'+orderId;
              
                    var config = {};

                    $http.delete(url,config )
                   .then(
                       function(response){
                            if(response.data.error)
                            {
                                 ctrlUtilityService.showAlert(response.data.error.errorCode);
                            }
                            else
                            {
                                ctrlUtilityService.showAlert('Deleted Product');
                            }
                        }, 
                       function(response){
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

        	function confirmOrder() {
        		// body...
        	}

        }


})();