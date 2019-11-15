app.controller("addCategoryModalController", function($scope, $window, $uibModalInstance, $http,competitionService, toastNotificationService, constants) {
    $scope.sexEnum = constants.sexEnum;
    $scope.regex = constants.regex;

    $scope.submit =function (isValid) {
        if(isValid){
            let data ={
                categoryName: $scope.categoryName,
                minAge: $scope.minAge,
                maxAge: $scope.maxAge,
                sex: $scope.selectedSex
            }
        competitionService.addCategroyDB(data)
            .then(function (result) {
                toastNotificationService.successNotification("קטגוריה נוספה בהצלחה");
                // parent.location.reload();
                $uibModalInstance.close()
            },function (error) {console.log(error)})
        }
    }

    $scope.closeModal =function () {
        $uibModalInstance.close()
    }
});
