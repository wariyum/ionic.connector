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

        credentialService.$inject = ['$http','$state','appService','appConstants','appState','ctrlUtilityService','$rootScope','$localStorage'];

        function credentialService($http,$state,appService,appConstants,appState,ctrlUtilityService,$rootScope,$localStorage) {
        return {
           registerUser:registerUser,
           loginUser:loginUser,
           isUserLoggedIn: isUserLoggedIn
        };

        function registerUser(data) {
        	 if(appConstants.mode === 'dev')
                {
                	console.log('registerUser --- not defined for Dev mode');
                }
            else{

                var url = appService.getUrl()+'connector/'+ appConstants.prog_id +'/createCustomer'; 
            	var config = '';
            	$http.post(url, data, config)
			   .then(
			       function(response){
			       	if(response.data.error !== undefined)
			       	{
			       		 ctrlUtilityService.showAlert(response.data.error.errorCode);
			       	}
			       	else
			       	{
				       	appState.addToLocalStorage(response.data);
				       	ctrlUtilityService.showAlert('Thank you for registering with Us.');
				       	$rootScope.credentials = appState.getLocalStorageAll();
                        $rootScope.$broadcast('rootScope:credentials', $rootScope.credentials); 
                        //redirect to Check-out page
				       	$state.go('app.checkout');
				       }
			   		}, 
			       function(response){
			       	alert('error');
			         // failure callback
			       }
			    );
            }
        }

        function loginUser(data){
            if(appConstants.mode === 'dev')
                {
                    console.log('loginUser --- not defined for Dev mode');
                }
            else{
                    var url = appService.getUrl()+'connector/'+ appConstants.prog_id +'/loginCustomer'; 
                    var config = '';
                    $http.post(url,data,config)
                    .then(
                        function(response){
                                if(response.data.error !== undefined){
                                   ctrlUtilityService.showAlert(response.data.error.errorCode); 
                                }
                                else{
                                        appState.addToLocalStorage(response.data);
                                        ctrlUtilityService.showAlert('Welcome back!');
                                        $rootScope.credentials = appState.getLocalStorageAll();
                                        
                                        $rootScope.$broadcast('rootScope:credentials', $rootScope.credentials); 
                                        //redirect to Check-out page
                                        $state.go('app.checkout');
                                }
                            }
                        );
                }
        }

        function isUserLoggedIn(){
            $rootScope.credentials = appState.getLocalStorageAll();
            return !($rootScope.credentials === undefined || $rootScope.credentials === 0);
        }
    }

})();