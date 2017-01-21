(function() {
    'use strict';
	/**
     * @ngdoc function
     * @name app.service:credentialService
     * @description
     * # credentialService
     * Service of Credential Service
     */
       angular.module('wrConnector')
        .service('credentialService', credentialService);

        credentialService.$inject = ['$http','appService','appConstants'];

        function credentialService($http,appService,appConstants) {
        return {
           registerUser:registerUser
        };

        function registerUser(data) {
        	 if(appConstants.mode === 'dev')
                {
                	console.log('registerUser --- not defined for Dev mode');
                }
            else{
            	var url = 'http://t-admin.wariyum.com/service/connector/1/createCustomer';
          
            	var config = '';
            	$http.post(url, data, config)
			   .then(
			       function(response){
			       	alert('success');
			         // success callback
			       }, 
			       function(response){
			       	alert('error');
			         // failure callback
			       }
			    );
            }
        }
    }

})();