app.controller("competitionTableController", function($scope, $window, $http,competitionService,pagingService,constants) {
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
    $scope.editCompetitionDetails= competitionService.editCompetitionDetails;

    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        competitionService.getCompetitons(competitionService.buildConditions($scope.searchText, $scope.selectedsportStyle, $scope.selectedStatus ? [$scope.selectedStatus] : $scope.selectedStatus))
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page);
                $scope.competitions = pagingService.sliceData(result.data.competitions, $scope.pager.startIndex, $scope.pager.endIndex);
            }, function (error) {
                console.log(error)
            });
    }
});