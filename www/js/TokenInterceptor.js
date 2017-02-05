
//refer: http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/ (Not implemented using this. but this doc looks good)

angular.module('starter')
    .factory('TokenInterceptor', function($q, $window, $location, $rootScope,$injector,$localStorage) {
        var inFlightAuthRequest = null;
        return {
            request: function(config) {
                config.headers = config.headers || {};
                 config.headers.Authorization = 'Bearer ' +  $localStorage.credentials[0][0].access_token;;
                return config;
            },

            requestError: function(rejection) {
                alert('requestError');
                return $q.reject(rejection);
            },

            response: function(response) {
                // if (response !== null && response.status === 200 && $window.localStorage.token && !Authentication.isAuthenticated) {
                //     Authentication.isAuthenticated = true;
                // }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            //ref: http://stackoverflow.com/questions/26552892/angularjs-http-interceptor-resend-all-request-after-token-refresh
            responseError: function(response) {
               switch (response.status) {
                case 401:
                    var deferred = $q.defer();
                    if(!inFlightAuthRequest) {
                        inFlightAuthRequest = {};
                        var refreshToken = $localStorage.credentials[0][0].refresh_token;
                        inflightAuthRequest = $injector.get("$http").post('http://t-admin.wariyum.com/service/renewAccessToken', {refreshToken: refreshToken});
                    
                    }
                    inflightAuthRequest.then(function(r) {
                        debugger;
                        $localStorage.credentials[0][0] = r.data[0];
                    }, function(response) {
                       
                    });
                    return deferred.promise;
                    break;
                default:
                    // authService.clear();
                    // $injector.get("$state").go('guest.login');
                    break;
            }
            return response || $q.when(response);
            }
        };
    });
