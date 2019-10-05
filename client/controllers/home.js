app.controller("homeController", function ($scope, $uibModal, $window, constants) {
    $scope.changePassword = function () {
            $uibModal.open({
                templateUrl: "views/changePasswordModal.html",
                controller: "changePasswordController as changePassCtrl",
                backdrop  : 'static',
                keyboard  : false
            });
    };

    if($window.sessionStorage.getItem('isFirstLogin') == 1)
        $scope.changePassword();
});