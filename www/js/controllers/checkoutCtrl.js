angular.module('starter')

.controller('checkoutCtrl', checkoutCtrl);

checkoutCtrl.$inject = ['appState', 'appService', '$state', '$scope', 'credentialService', 'ctrlUtilityService', 'cartService', '$rootScope'];

function checkoutCtrl(appState, appService, $state, $scope, credentialService, ctrlUtilityService, cartService, $rootScope) {
    var vm = this;
    vm.imgUrl = appService.getUrlImg() + appService.getProgId() + '/';
    vm.showProduct = showProduct;
    vm.removeProduct = removeProduct;

    $scope.$on('$stateChangeSuccess', function() {
        if ($state.current.name === 'app.checkout') {
            cartService.getCartItems()
                .then(
                    function(response) {
                        if (response.data.error) {
                            ctrlUtilityService.showAlert(response.data.error.errorCode);
                        } else {
                            //load to Cart items
                            appState.loadCheckedOutProducts(response.data.success);
                            vm.productsCheckedOut = appState.getCheckedOutProducts();
                            updateSummaryCalc();
                            $rootScope.haveCartItems = true;
                        }
                    },
                    function(response) {
                        alert('error');
                    }
                );

        }
    });

    vm.init = function() {

    }

    function showProduct(productId) {
        $state.go('app.single', { 'productId': productId });
    }

    function removeProduct(orderId, productId) {
        cartService.removeCartItem(orderId);
        appState.removeProductFromCheckout(productId);
        updateSummaryCalc();
    }

    vm.incrementQty = function(productId) {

        var data = {};
        data.product = {};
        data.product.id = productId;
        data.quantity = 1;

        cartService.appendCartItem(data);
        //UI update
        appState.addSubProductQty(productId, 1);
        updateSummaryCalc();

    };

    vm.decrementQty = function(productId) {

        var data = {};
        data.product = {};
        data.product.id = productId;
        data.quantity = -1;

        cartService.appendCartItem(data);

        appState.addSubProductQty(productId, -1);
        updateSummaryCalc();
    };

    vm.checkout = function() {
        //Scenario - User not logged In - Let them Login & Proceed
        if (!credentialService.isUserLoggedIn()) {
            ctrlUtilityService.showAlert('Please login before Checkout');
            $state.go('app.login');
        } else {
            //only if user logged in
            $state.go('app.shippingInfo');
        }
    };

    function updateSummaryCalc() {
        //calculate total of chekedout products
        vm.checkoutSummary = appState.getCheckedOutProductSummary();

    }
}