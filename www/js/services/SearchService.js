(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.service:homeService
     * @description
     * # homeService
     * Service of the app
     */

    angular.module('wrConnector')
        .service('searchService', searchService);

    searchService.$inject = ['$http','appService','appConstants'];

    function searchService($http,appService,appConstants) {
        return {
           searchProducts:searchProducts
        };

        function searchProducts(query) {
            if(appConstants.mode === 'dev')
                return $http.get(appService.getUrl()+'categories-list.json');
            else{
                return $http.get(appService.getUrl() +'connector/'+ appConstants.prog_id+'/productSearch?query='+query);
            }
        }
    }

})();