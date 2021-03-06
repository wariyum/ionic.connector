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
        .service('productService', productService);

    productService.$inject = ['$http', 'appService', 'appConstants', '$state'];

    function productService($http, appService, appConstants, $state) {
        return {
            getProductsPublished: getProductsPublished,
            getProductsByCategoryId: getProductsByCategoryId,
            getProductDetailsPublished: getProductDetailsPublished
        };

        function getProductsByCategoryId(categoryId, page) {
            if (appConstants.mode === 'dev')
                return $http.get(appService.getUrl() + 'products-by-categoryId.json');
            else
                return $http.get(appService.getUrl() + 'connector/' + appConstants.prog_id + '/categories/' + categoryId + '/products/page?page=' + page);
        }

        function getProductsPublished(page) {
            if (appConstants.mode === 'dev')
                return $http.get(appService.getUrl() + 'published-products.json');
            else
                return $http.get(appService.getUrl() + 'connector/' + appConstants.prog_id + '/published/page?page=' + page);
        }

        function getProductDetailsPublished(productId) {
            if (appConstants.mode === 'dev')
                return $http.get(appService.getUrl() + 'published-products.json');
            else
                return $http.get(appService.getUrl() + 'connector/' + appConstants.prog_id + '/product/' + productId);
        }

    }

})();