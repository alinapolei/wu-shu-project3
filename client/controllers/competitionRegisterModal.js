app.controller("competitionRegisterModal", function($scope, $uibModalInstance, $window, $http,competitionService) {

    $scope.close=function () {
        $uibModalInstance.close()
    }
    competitionService.getSportsman()
        .then((result)=>{
                $scope.users=result.data;
        })
        .catch((err)=>{console.log(err);})

});
