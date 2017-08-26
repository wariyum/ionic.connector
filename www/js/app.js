// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngLodash', 'ionic-cache-src', 'ionic-toast', 'ngStorage', 'angularMoment'])
    .run(function($ionicPlatform, $cordovaPushV5, FCMService) {
        $ionicPlatform.ready(function() {

            var options = {
                android: {
                    senderID: "509484359572"
                },
                ios: {
                    alert: "true",
                    badge: "true",
                    sound: "true"
                },
                windows: {}
            };

            if ($cordovaPushV5 != undefined) {
                // initialize
                $cordovaPushV5.initialize(options).then(function() {
                    // start listening for new notifications
                    $cordovaPushV5.onNotification();
                    // start listening for errors
                    $cordovaPushV5.onError();

                    // register to get registrationId
                    $cordovaPushV5.register().then(function(registrationId) {

                        window.localStorage.setItem( 'fcmId', registrationId );
                        //look for exisitng registration key in localstorage
                        // var isRegKeyExist = false;
                        // if(!isRegKeyExist)
                        //     {
                        //         //1. save the key to server
                        //         var data = {};
                        //         data.fcmRegKey = registrationId;
                        //         data.programId = 37;
                        //         FCMService.registerNewDevice(data).then(function(response)
                        //         {
                        //             alert('saved');
                        //         }).catch(function (response) {
                        //             alert('error');
                        //             console.log(response);
                        //         });
                        //         //2. save the key in local storage
                        //     }
                        
                    })
                });
            }


            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }


        });
    })


//***** http Header
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}])

.config(function($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html'
        })

        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html',
                    controller: 'searchCtrl as vm'
                }
            }
        })

        .state('app.aboutUs', {
                url: '/aboutUs',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/aboutUs.html',
                        controller: 'aboutUsCtrl as vm'
                    }
                }
            })
            .state('app.test', {
                url: '/test',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hardware.html',
                        controller: 'hardwareCtrl as vm'
                    }
                }
            })
            .state('app.forgetPassword', {
                url: '/forgetPassword',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/forgetPassword.html',
                        controller: 'forgetPasswordCtrl as vm'
                    }
                }
            })
            .state('app.orderDetails', {
                url: '/orderDetails/:programId/:orderId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/orderDetail.html',
                        controller: 'orderDetailsCtrl as vm'
                    }
                }
            })
            .state('app.purchaseHistory', {
                url: '/purchaseHistory',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/purchaseHistory.html',
                        controller: 'purchaseHistoryCtrl as vm'
                    }
                }
            })
            .state('app.promotion', {
                url: '/promotion/:promoId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotion.html',
                        controller: 'promotionCtrl as vm'
                    }
                }
            })
            .state('app.products', {
                url: '/products/:programId/:categoryId/:header',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/productLists.html',
                        controller: 'productsCtrl as vm'
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl as vm'
                    }
                }
            })
            .state('app.checkout', {
                url: '/checkout',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/checkout.html',
                        controller: 'checkoutCtrl as vm'
                    }
                }
            })
            .state('app.userRegister', {
                url: '/userRegister',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/userRegister.html',
                        controller: 'userRegisterCtrl as vm'
                    }
                }
            })
            .state('app.shippingInfo', {
                url: '/shippingInfo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/shippingInfo.html',
                        controller: 'shippingInfoCtrl as vm'
                    }
                }
            })
            .state('app.demo', {
                url: '/demo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/demo.html',
                        controller: 'demoCtrl as vm'
                    }
                }
            })

        .state('app.single', {
            url: '/productDetails/:productId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/productDetail.html',
                    controller: 'productDetailCtrl as vm'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/demo');
    })
    .run(['$rootScope', function($rootScope) { // put the event handlers here 
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
        });
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // console.log('$stateChangeError - fired when an error occurs during transition.');
            // console.log(arguments);
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            // console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');

        });
        // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
        //   // runs on individual scopes, so putting it in "run" doesn't work.
        //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
        // });
        $rootScope.$on('$viewContentLoaded', function(event) {
            // console.log('$viewContentLoaded - fired after dom rendered',event);
        });
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            // console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
            // console.log(unfoundState, fromState, fromParams);
        });
    }]);