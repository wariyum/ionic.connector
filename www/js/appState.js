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
        .service('appState', appState);

    appState.$inject = [];

    var shownProductId = 0;

    function appState() {
        return {
            getShownProductId: getShownProductId
        };

        function getShownProductId() {
           alert(shownProductId++);
        }
    }

})();