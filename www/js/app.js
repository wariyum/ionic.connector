// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','wrConnector','ngCordova','ngLodash','ionic-cache-src'])

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
    .state('app.products', {
      url: '/products/:categoryId',
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
  $urlRouterProvider.otherwise('/app/products/0');
});
