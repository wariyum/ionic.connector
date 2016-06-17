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
        .service('productService', productService);

    productService.$inject = ['$http','appService','appConstants','$state'];

    function productService($http,appService,appConstants,$state) {
        return {
            getProductsPublished: getProductsPublished,
            getProductsByCategoryId: getProductsByCategoryId,
            getProductDetailsPublished: getProductDetailsPublished
        };

        function getProductsByCategoryId(categoryId) {

              if(appConstants.mode === 'dev')
                return $http.get(appService.getUrl()+'products-by-categoryId.json');       
            else
                return $http.get(appService.getUrl()+'connector/'+ appConstants.prog_id +'/categories/'+ categoryId+'/products');     
        }

        function getProductsPublished() {
            if(appConstants.mode === 'dev')
                return $http.get(appService.getUrl()+'published-products.json');
            else
                return $http.get(appService.getUrl() +'connector/'+ appConstants.prog_id + '/published');
        }

        function getProductDetailsPublished(productId) {
            if(appConstants.mode === 'dev')
                return $http.get(appService.getUrl()+'published-products.json');
            else
                return $http.get(appService.getUrl() +'connector/'+ appConstants.prog_id + '/product/' + productId);
        }

    }

})();