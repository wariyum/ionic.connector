angular.module('starter')

.controller('appCtrl', appCtrl);

appCtrl.$inject = ['categoryService', 'appService', '$rootScope', 'cartService', '$state', 'appConstants'];

function appCtrl(categoryService, appService, $rootScope, cartService, $state, appConstants) {
    var vm = this;
    vm.init = init;

    function init() {

        $rootScope.progId = appService.getProgId();

        // cartService.getCartItems();
        categoryService.getCategories(appService.getProgId()).then(function(response) {
            $rootScope.categories = response.data.success;
        });
    }

    $rootScope.$on('http-req-started', function(event, data) {
        $rootScope.showLoader = true;
    });

    $rootScope.$on('http-req-end', function(event, data) {
        $rootScope.showLoader = false;
    });


    // triggered every time notification received
    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {

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
    $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e) {
        alert(error);
        // e.message
    });
}