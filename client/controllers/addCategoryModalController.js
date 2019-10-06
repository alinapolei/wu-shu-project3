app.controller("addCategoryModalController", function($scope, $window, $uibModalInstance, $http,competitionService, constants) {
    $scope.sexEnum = constants.sexEnum;
    console.log($scope.sexEnum[0].name);
    $scope.submit =function (isValid) {
        console.log($scope.selectedSex);
        if(isValid){
            let data ={
                categoryName: $scope.categoryName,
                minAge: $scope.minAge,
                maxAge: $scope.maxAge,
                sex: $scope.selectedSex
            }
        competitionService.addCategroyDB(data)
            .then(function (result) {
                alert("קטגוריה נוספה בהצלחה")
                parent.location.reload();
                $uibModalInstance.close()
            },function (error) {console.log(error)})
        }
    }

    $scope.closeModal =function () {
        $uibModalInstance.close()
    }
});
