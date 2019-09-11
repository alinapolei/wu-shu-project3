app.controller("competitionRegisterModal", function($scope, $uibModalInstance, $window, $http,getId,competitionService) {
    $scope.close=function () {
        $uibModalInstance.close()
    }
});