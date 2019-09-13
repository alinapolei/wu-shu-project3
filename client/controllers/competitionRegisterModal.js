app.controller("competitionRegisterModal", function($scope, $uibModalInstance, $window, $http,getId,competitionService) {
    $scope.userReg={
        id :[
        ]
    };
    $scope.close=function () {
        console.log($userReg.id)
        $uibModalInstance.close()
    }
    competitionService.getSportsman()
        .then((result)=>{
                $scope.users=result.data;
        })
        .catch((err)=>{console.log(err);})

});
