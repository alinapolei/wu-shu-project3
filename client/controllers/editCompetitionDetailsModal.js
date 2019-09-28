app.controller("editCompetitionDetailsModal", function($scope, $uibModalInstance, $window, $http,getId,competitionService) {
    $scope.close=function () {
        $uibModalInstance.close()
    }
    console.log("load controller")
    $scope.closeModal= function () {
        $uibModalInstance.close()

    }
    competitionService.getCompetitionDetails(getId)
        .then(function (result) {

            $scope.description=result.data[0].description;
            $scope.location = result.data[0].location
            $scope.city = result.data[0].city;

            //$scope.competitionNumber = "תחרות מספר " + result.data[0].idCompetition;
            //$scope.competitionType = "ענף: " + result.data[0].sportStyle;
            //$scope.location = "מיקום: " + result.data[0].location + "," + result.data[0].city;
            //$scope.compDate = result.data[0].date;
            //$scope.compHour = result.data[0].startHour;
        }).catch(function (error) {console.log(error)})





});