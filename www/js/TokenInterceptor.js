
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

            /* Set Authentication.isAuthenticated to true if 200 received */
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
                        debugger;
                        inflightAuthRequest = $injector.get("$http").post('http://t-admin.wariyum.com/service/renewAccessToken', {refreshtoken: refreshToken});
                        debugger;
                    
                    }
                    inflightAuthRequest.then(function(r) {
                        debugger;
                        inflightAuthRequest = null;
                        if (r.data.data.accesstoken && r.data.data.refreshtoken && r.data.data.expiresin) {
                            authService.setAccessToken(r.data.data.accesstoken);
                            authService.setRefreshToken(r.data.data.refreshtoken);
                            authService.setExpiresIn(r.data.data.expiresin);
                            $injector.get("$http")(response.config).then(function(resp) {
                                deferred.resolve(resp);
                            },function(resp) {
                                deferred.reject();
                            });
                        } else {
                            deferred.reject();
                        }
                    }, function(response) {
                        inflightAuthRequest = null;
                        deferred.reject();
                        authService.clear();
                        $injector.get("$state").go('guest.login');
                        return;
                    });
                    return deferred.promise;
                    break;
                default:
                    authService.clear();
                    $injector.get("$state").go('guest.login');
                    break;
            }
            return response || $q.when(response);
            }
        };
    });
