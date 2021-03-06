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
        .service('appService', appService);

    appService.$inject = ['appConstants'];

    function appService(appConstants) {
        return {
            getUrl: getUrl,
            getUrlImg:getUrlImg,
            getProgId:getProgId,
            setProgId:setProgId
        };

        function setProgId(progId) {
            appConstants.prog_id = progId;
        }

        function getUrl() {
            if(appConstants.mode === 'dev')
            {
                return appConstants.url_dev;
            } 
            else if(appConstants.mode === 'stg')
            {
                return appConstants.url_stg;
            }
            else if(appConstants.mode === 'prd')
            {
                return appConstants.url_prd;
            }
        }

        function getUrlImg() {
         if(appConstants.mode === 'dev')
            {
                return appConstants.url_dev_img;
            } 
            else if(appConstants.mode === 'stg')
            {
                return appConstants.url_stg_img;
            }
            else if(appConstants.mode === 'prd')
            {
                return appConstants.url_prd_img;
            }   
        }

        function getProgId() {
            return appConstants.prog_id;
        }
    }

})();