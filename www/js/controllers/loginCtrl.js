angular.module('starter')

.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$state', 'appState', '$scope', '$rootScope', 'credentialService', '$ionicPopup','ctrlUtilityService','FCMService','$localStorage'];

function loginCtrl($state, appState, $scope, $rootScope, credentialService, $ionicPopup,ctrlUtilityService, FCMService, $localStorage) {
    var vm = this;

    vm.credentials = $rootScope.credentials;

    vm.loggedIn = credentialService.isUserLoggedIn();;

    $rootScope.$on('rootScope:credentials', function(event, data) {
        vm.credentials = data;
        vm.loggedIn = credentialService.isUserLoggedIn();
    });

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Login Issue!',
            template: 'Username and Password does not match'
        });

        alertPopup.then(function(res) {
            // alert('Thank you for not eating my delicious ice cream cone');
        });
    };


    vm.doLogin = function() {
        var data = {};
        data.emailId = vm.loginData.username;
        data.password = vm.loginData.password;
        var promise = credentialService.loginUser(data, $scope);
        promise.then(
            function(response) {
                if (response.data.error !== undefined) {
                    // An alert dialog
                    $scope.showAlert();
                } else {
                    appState.addToLocalStorage(response.data);
                    ctrlUtilityService.showAlert('Welcome back!');
                    $rootScope.credentials = appState.getLocalStorageAll();

                    $rootScope.$broadcast('rootScope:credentials', $rootScope.credentials);

                    //FCM - Messaging map the user with FCMID
                    if($localStorage.fcmId){
                    var dataMapUser = {};
                    dataMapUser.fcmKey = $localStorage.fcmId;
                    FCMService.mapUserToDevice(dataMapUser).then(function (response) {
                        alert('mapped user fcm');
                    });
                    }

                    //redirect to Check-out page
                    // $state.go('app.checkout');
                    $state.reload();
                }
            },
            function(response) {
                return response;

            });
    }

    vm.registration = function() {
        $state.go('app.userRegister');
    }

    vm.logout = function function_name(argument) {
        var credentials = appState.getLocalStorageAll();
        appState.removeFromLocalStorage(credentials);
        vm.credentials = undefined;
        vm.loggedIn = credentialService.isUserLoggedIn();
    }

    vm.forgetPassword = function() {
        $state.go('app.forgetPassword');
       
    }

}
