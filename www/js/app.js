// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','wrConnector','ngCordova','ngLodash','ionic-cache-src'])

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
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
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
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/productLists.html',
          controller: 'productsCtrl as vm'
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
  $urlRouterProvider.otherwise('/app/products');
});
