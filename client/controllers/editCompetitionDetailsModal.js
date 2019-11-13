app.controller("editCompetitionDetailsModal", function($scope, $rootScope, $location, $uibModalInstance, $window, $http,$filter,getId,competitionService, constants, confirmDialogService, toastNotificationService) {
    $scope.sportStyleEnum = constants.sportStyleEnum;
    $scope.regex = constants.regex;

    $rootScope.isChangingLocationFirstTime = true;
    $scope.closeModal= function () {
        if($scope.editCompetitionForm.$dirty && !$scope.isSaved && $rootScope.isChangingLocationFirstTime) {
            if (!$scope.editCompetitionForm.$valid) $scope.isClicked = true;
            confirmDialogService.notSavedItems(undefined, $location.path(), $scope.submit, $scope.editCompetitionForm.$valid, $uibModalInstance);
        }
        else
            $uibModalInstance.close()
    };
    competitionService.getCompetitionDetails(getId)
        .then(function (result) {
            $scope.description=result.data.description;
            $scope.location = result.data.location
            $scope.city = result.data.city;
            $scope.eventDate = new Date(result.data.date);
            $scope.sportStyle =result.data.sportStyle
            $scope.evetTime =new Date(result.data.startHour.substring(0, result.data.startHour.length-1))
            $scope.closeRegDate =new Date(result.data.closeRegDate)
            $scope.closeRegTime =new Date(result.data.closeRegTime.substring(0, result.data.startHour.length-1))

        }).catch(function (error) {console.log(error)})

    $scope.submit=function (isValid) {
        if (isValid) {
            let data = {
                competitionId :getId,
                description: $scope.description,
                location: $scope.location,
                city: $scope.city,
                eventDate: $filter('date')($scope.eventDate, "MM/dd/yyyy"),
                sportStyle: $scope.sportStyle,
                evetTime: $filter('date')($scope.evetTime,"HH:mm"),
                closeRegDate: $filter('date')($scope.closeRegDate, "MM/dd/yyyy"),
                closeRegTime: $filter('date')($scope.closeRegTime,"HH:mm")
            }
            competitionService.updateCompetitionDetails(data)
                .then(function (result) {
                    $scope.isSaved = true;
                    $uibModalInstance.close();
                    parent.location.reload();
                    //toastNotificationService.successNotification("פרטי התחרות עודכנו בהצלחה");
                },function (error) {console.log(error)})
        }
    }
})
