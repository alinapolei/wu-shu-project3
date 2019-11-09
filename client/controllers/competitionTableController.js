app.controller("competitionTableController", function ($scope, $window, $http, competitionService, pagingService, constants) {
    $scope.sportStyles = constants.sportStyleEnum;
    $scope.compStatus = constants.compStatus;
    $scope.compStatusType = constants.compStatusType;
    $scope.headerTable = "תחרויות";
    $scope.isShowStatus = true;
    $scope.pager = {};
    setPage(1);

    $scope.watchCompDetails = competitionService.watchCompDetails;
    $scope.regSportsman = competitionService.regSportsman;
    $scope.registrationState = competitionService.registrationState;
    $scope.editCompetitionDetails = competitionService.editCompetitionDetails;

    $scope.setPage = function (page) {
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        competitionService.getCompetitonsCount(competitionService.buildConditions($scope.searchText, $scope.selectedsportStyle, $scope.selectedStatus ? [$scope.selectedStatus] : $scope.selectedStatus))
            .then(function (result) {
                let totalCount = result.data.count;
                $scope.pager = pagingService.GetPager(totalCount, page);

                competitionService.getCompetitons(competitionService.buildConditions($scope.searchText, $scope.selectedsportStyle, $scope.selectedStatus ? [$scope.selectedStatus] : $scope.selectedStatus, $scope.pager.startIndex + 1, $scope.pager.endIndex + 1))
                    .then(function (result) {
                        $scope.competitions = result.data;
                    }, function (error) {
                        console.log(error)
                    })
            }, function (error) {
                console.log(error)
            });
        window.scroll(0,0);
    }
});