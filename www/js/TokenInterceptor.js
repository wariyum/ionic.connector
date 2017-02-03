angular.module('starter')
    .factory('TokenInterceptor', function($q, $window, $location, $rootScope) {
        return {
            request: function(config) {
                var i = 0;
                alert(i++);
                config.headers = config.headers || {};
                 config.headers.Authorization = 'Bearer 6328a121-c782-442f-966f-ceacc00cdb5d';
                // if ($window.localStorage.token) {
                //     config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                // }
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function(response) {
                // if (response !== null && response.status === 200 && $window.localStorage.token && !Authentication.isAuthenticated) {
                //     Authentication.isAuthenticated = true;
                // }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                $rootScope.$broadcast('alertError', "Some of the services are blocked for you!");
                if (rejection !== null && rejection.status === 401 && ($window.localStorage.token || Authentication.isAuthenticated)) {
                    delete $window.localStorage.token;
                    Authentication.isAuthenticated = false;
                    $location.path('/login');
                }

                return $q.reject(rejection);
            }
        };
    });
