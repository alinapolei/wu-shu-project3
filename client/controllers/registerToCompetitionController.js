app.controller("registerToCompetitionController", function($scope, $window, $http,competitionService,pagingService) {
    serverUrl = "http://localhost:3000";
    $scope.headerTable = "תחרויות פתוחות להרשמה";
    $scope.isShowStatus = false;
    $scope.pager = {};
    setPage(1);

    $scope.watchCompDetails = competitionService.watchCompDetails;
    $scope.regSportsman = competitionService.regSportsman;

    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        competitionService.getOpenCompetitons()
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page);
                $scope.competitions = result.data.competitions.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
            }, function (error) {
                console.log(error)
            });
    }
});