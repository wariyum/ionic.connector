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
        .service('FCMService', FCMService);

    FCMService.$inject = ['$http', 'appService', 'appConstants'];

    function FCMService($http, appService, appConstants) {
        return {
            setAndroidToken: setAndroidToken
        };

        function setAndroidToken(token) {
            if (appConstants.mode === 'dev')
                return $http.get(appService.getUrl() + 'categories-list.json');
            else {
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/registerDeviceToken';
                var config = '';
                var data = {};
                data.token = token;
                return $http.post(url, data, config);
            }
        }
    }


})();