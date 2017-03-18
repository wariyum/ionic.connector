angular.module('starter')

.controller('appCtrl', appCtrl);

appCtrl.$inject = ['categoryService', 'appService', '$rootScope', 'cartService'];

function appCtrl(categoryService, appService, $rootScope, cartService) {
    var vm = this;
    vm.init = init;

    function init() {

        $rootScope.progId = appService.getProgId();

        cartService.getCartItems();


        categoryService.getCategories(appService.getProgId()).then(function(response) {
            $rootScope.categories = response.data.success;
        });
    }

    // triggered every time notification received
    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
    	
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
    });

    // triggered every time error occurs
    $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e) {
    	alert(error);
        // e.message
    });
}
