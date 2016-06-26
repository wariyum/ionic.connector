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

    appState.$inject = ['lodash'];

    var shownProductId = 0;
    var loggedUser;
    var lists = {};

    function appState(lodash) {
        return {
            getShownProductId: getShownProductId,
            setShownProductId: setShownProductId,
            isLoggedIn: isLoggedIn
        };

        function getShownProductId() {
           alert(shownProductId++);
        }

        function setShownProductId(value) {
           shownProductId = value;
        }

        function isLoggedIn(){
            return loggedUser;
        }
    }

})();