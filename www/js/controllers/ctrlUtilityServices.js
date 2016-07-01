(function(){
'use strict';

    /**
     * @ngdoc function
     * @name app.service:homeService
     * @description
     * # homeService
     * Service of the app
     */

    angular.module('starter')
        .service('ctrlUtilityService', ctrlUtilityService);

    ctrlUtilityService.$inject =[];

    function ctrlUtilityService() {
    	return{
    		showAlert:showAlert
    	};

    function showAlert(infoMessage) {
    	alert(infoMessage);
    }
    }

})();