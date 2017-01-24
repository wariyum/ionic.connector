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

    ctrlUtilityService.$inject =['ionicToast'];

    function ctrlUtilityService(ionicToast) {
    	return{
    		showAlert:showAlert
    	};

    function showAlert(infoMessage) {
        ionicToast.show(infoMessage, 'top', false, 2500);
    }
    }

})();