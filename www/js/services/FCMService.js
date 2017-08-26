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
            setAndroidToken: setAndroidToken,
            registerNewDevice: registerNewDevice,
            mapUserToDevice: mapUserToDevice,
        };

        function setAndroidToken(token) {
            if (appConstants.mode === 'dev')
                return $http.get(appService.getUrl() + 'categories-list.json');
            else {
                alert('setAndroidToken ?');
                var url = appService.getUrl() + 'connector/' + appConstants.prog_id + '/registerDeviceToken';
                var config = '';
                var data = {};
                data.token = token;
                return $http.post(url, data, config);
            }
        }


    function registerNewDevice(data) {
        if (appConstants.mode === 'dev')
            return $http.get(appService.getUrl() + 'categories-list.json');
        else {
            var url = appService.getUrl() + 'ecom/fcmNotification/registerNewDevice';
            var config = '';
            return $http.post(url, data, config);
        }
    }

    function mapUserToDevice(data) {
         if (appConstants.mode === 'dev')
            return $http.get(appService.getUrl() + 'categories-list.json');
        else {
            var url = appService.getUrl() + 'ecom/fcmNotification/mapUser';
            var config = '';
            return $http.post(url, data, config);
        }
        //post
        //http://t-admin.wariyum.com/service/ecom/fcmNotification/mapUser

    }

    function renewFCMRegKey() {
        //post
        //http://t-admin.wariyum.com/service/ecom/fcmNotification/changeRegistration
        //         {
        // 	"userId":"1",
        // 	"oldFcmKey":"fcmRegKceys",
        // 	"newFcmKey":"newfcmRegKceys"
        // }
    }

    function changeRegistration() {
        // http://t-admin.wariyum.com/service/ecom/fcmNotification/changeRegistration
        //         {
        // 	"userId":"1",
        // 	"oldFcmKey":"fcmRegKceys",
        // 	"newFcmKey":"newfcmRegKceys"
        // }
    }


    }


})();