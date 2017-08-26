angular.module('starter')

.controller('appCtrl', appCtrl);

appCtrl.$inject = ['categoryService', 'appService', '$rootScope', 'cartService', '$state', 'appConstants', 'appState','FCMService','$localStorage'];

function appCtrl(categoryService, appService, $rootScope, cartService, $state, appConstants, appState, FCMService,$localStorage) {
    var vm = this;
    vm.init = init;

    function init() {

        $rootScope.progId = appService.getProgId();

        // cartService.getCartItems();
        categoryService.getCategories(appService.getProgId()).then(function(response) {
            $rootScope.categories = response.data.success;
        });


          //look for exisitng registration key in localstorage
        var fcmId = window.localStorage.getItem('fcmId');
        var oldFcmId = $localStorage.fcmId;
        if(!oldFcmId && fcmId)
            {
                //1. save the key to server
                var data = {};
                data.fcmRegKey = fcmId;
                data.programId = $rootScope.progId;
                data.platform = 'Android';
                FCMService.registerNewDevice(data).then(function(response)
                {
                    console.log(data);
                }).catch(function (response) {
                    console.log(response);
                });
                //2. save the key in local storage
                $localStorage.fcmId = fcmId;
            }
            else if(oldFcmId === fcmId){
                // $angular.noop();
            }
            else if(oldFcmId != fcmId){
                //update fcmID
            }


        $rootScope.$broadcast('showCartAlert', {});
    }

    $rootScope.$on('showCartAlert', function() {
        var cartAlertCallBack = function(response) {
            //load to Cart items
            appState.loadCheckedOutProducts(response.data.success);
            vm.productsCheckedOut = appState.getCheckedOutProducts();
            appState.showCartIndicator();
        }
        cartService.getCartItems(cartAlertCallBack);
    })





    $rootScope.$on('http-req-started', function(event, data) {
        $rootScope.showLoader = true;
    });

    $rootScope.$on('http-req-end', function(event, data) {
        $rootScope.showLoader = false;
    });


    // triggered every time notification received
    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {



        var foreground = data.additionalData.foreground || false;
        // var threadID = data.additionalData.payload.threadID || '';
        // var group = data.additionalData.payload.group || false;

        if (foreground) {
            // if you want to do any processing in foreground
        } else {

            // if you want to do any processing on background
        }

        var tmp = JSON.parse(data.message);



        if (tmp.msgType === 'ORDER_STATUS') {
            //show order details page
            var orderId = tmp.orderId;
            $rootScope.$broadcast('rootScope:orderDetails', {});
            $state.go('app.orderDetails', { 'programId': appConstants.prog_id, 'orderId': orderId });

        } else if (tmp.msgType === 'PROMOTION') {
            var promotionId = tmp.promotionId;
            $state.go('app.promotion', { 'promoId': promotionId });
        }

        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
    });

    vm.showSearch = function() {
        $state.go('app.search');
    }

    vm.showCart = function() {
        $state.go('app.checkout');
    }

    // triggered every time error occurs
    $rootScope.$on('$cordovaPushV5:errorOccurred', function(event, error) {
        // handle error
        $log.debug('cordovaPushV5:errorOccurred ERROR: ' + error);
    });
}