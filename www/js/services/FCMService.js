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
            registerNewDevice: registerNewDevice
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
        //post
        // http://t-admin.wariyum.com/service/ecom/fcmNotification/registerNewDevice
        // {
        // "deviceType": "CORDOVA",
        // "deviceVersion": "2.1",
        // "deviceModel": "Model",
        // "platform": "Android 6.0",
        // "userId": 0,
        // "programId": 0,
        // "uuid": "uuid",
        // "fcmRegKey":"fcmRegKceys"
        // }
    }

    function mapUserToDevice() {
        //post
        //http://t-admin.wariyum.com/service/ecom/fcmNotification/mapUser
        //     {
        // 	"userId":"1",
        // 	"fcmKey":"fcmRegKceys56757"
        // }

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