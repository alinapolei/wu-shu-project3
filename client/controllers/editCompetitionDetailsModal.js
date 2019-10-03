app.controller("editCompetitionDetailsModal", function($scope, $uibModalInstance, $window, $http,$filter,getId,competitionService) {
    $scope.close=function () {
        $uibModalInstance.close()
    }
    $scope.closeModal= function () {
        $uibModalInstance.close()
    }
    competitionService.getCompetitionDetails(getId)
        .then(function (result) {
            $scope.description=result.data[0].description;
            $scope.location = result.data[0].location
            $scope.city = result.data[0].city;
            $scope.eventDate = new Date(result.data[0].date);
            $scope.sportStyle =result.data[0].sportStyle
            $scope.evetTime =new Date(result.data[0].startHour)
            $scope.closeRegDate =new Date(result.data[0].closeRegDate)
            $scope.closeRegTime =new Date(result.data[0].closeRegTime)

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
                evetTime: $filter('date')($scope.evetTime, "hh:mm"),
                closeRegDate: $filter('date')($scope.closeRegDate, "MM/dd/yyyy"),
                closeRegTime: $filter('date')($scope.closeRegTime, "hh:mm")
            }
            competitionService.updateCompetitionDetails(data)
                .then(function (result) {
                    alert("פרטי התחרות עודכנו בהצלחה")
                    $uibModalInstance.close()
                },function (error) {console.log(error)})
        }
    }
})