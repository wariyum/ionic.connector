// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','wrConnector','ngCordova','ngLodash','ionic-cache-src','ionic-toast','ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  $httpProvider.defaults.headers.common['Authorization'] = 'Bearer 5b90f3f1-79e7-42ee-a1c2-1be77e03ee1e'; 
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; 
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
        controller:'searchCtrl as vm'
      }
    }
  })

  .state('app.aboutUs', {
      url: '/aboutUs',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutUs.html',
          controller:'aboutUsCtrl as vm'
        }
      }
    })
  .state('app.test', {
      url: '/test',
      views: {
        'menuContent': {
          templateUrl: 'templates/hardware.html',
          controller:'hardwareCtrl as vm'
        }
      }
    })
  .state('app.purchaseHistory', {
      url: '/purchaseHistory',
      views: {
        'menuContent': {
          templateUrl: 'templates/purchaseHistory.html',
          controller:'purchaseHistoryCtrl as vm'
        }
      }
    })
    .state('app.products', {
      url: '/products/:programId/:categoryId',
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
.run(['$rootScope',function($rootScope){ // put the event handlers here 
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
  // console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
});
$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
  // console.log('$stateChangeError - fired when an error occurs during transition.');
  // console.log(arguments);
});
$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
  // console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
});
// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//   // runs on individual scopes, so putting it in "run" doesn't work.
//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
// });
$rootScope.$on('$viewContentLoaded',function(event){
  // console.log('$viewContentLoaded - fired after dom rendered',event);
});
$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
  // console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
  // console.log(unfoundState, fromState, fromParams);
});
}]);

