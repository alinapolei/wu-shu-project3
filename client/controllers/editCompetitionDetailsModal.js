app.controller("editCompetitionDetailsModal", function($scope, $uibModalInstance, $window, $http,$filter,getId,competitionService) {
    $scope.close=function () {
        $uibModalInstance.close()
    }
    $scope.closeModal= function () {
        $uibModalInstance.close()
    }
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
                    alert("פרטי התחרות עודכנו בהצלחה")
                    $uibModalInstance.close()
                },function (error) {console.log(error)})
        }
    }
})