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
        .service('categoryService', categoryService);

    categoryService.$inject = ['$http','appService','appConstants'];

    function categoryService($http,appService,appConstants) {
        return {
           getCategories:getCategories,
           test:test
        };

        function getCategories(categoryId) {
            if(appConstants.mode === 'dev')
                return $http.get(appService.getUrl()+'categories-list.json');
            else{
                return $http.get(appService.getUrl() +'connector/'+ appConstants.prog_id+'/categories');
            }
        }
        function test() {
            alert('test method');
        }
    }

})();