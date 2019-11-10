app.controller("sportsmenController", function ($scope, $http, $window, $location, constants, clubService, pagingService, sportsmanService) {
    $scope.sexEnum = constants.sexEnum;
    $scope.sportStyles = constants.sportStyleEnum;
    var allUsers;
    $scope.pager = {};
    $scope.isToDesc = true;
    $scope.headerTable = "ספורטאיים";
    setPage(1);
    getDataForDisplay();

    function getDataForDisplay() {
        clubService.getClubs()
            .then(function (result) {
                $scope.clubs = result.data;
            }, function (error) {
                console.log(error)
            });
    }

    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        sportsmanService.getSportsmenCount(sportsmanService.buildConditionds($scope.searchText, $scope.selectedsportStyle, $scope.selectedClub, $scope.selectedSex, $scope.isToDesc))
            .then(function (result) {
                let totalCount = result.data.count;
                $scope.pager = pagingService.GetPager(totalCount, page);

                sportsmanService.getSportsmen(sportsmanService.buildConditionds($scope.searchText, $scope.selectedsportStyle, $scope.selectedClub, $scope.selectedSex, $scope.isToDesc, null, null, $scope.pager.startIndex + 1, $scope.pager.endIndex + 1))
                    .then(function (result) {
                        $scope.users = result.data.sportsmen;
                    }, function (error) {
                        console.log(error)
                    });
            }, function (error) {
                console.log(error)
            });
        window.scroll(0,0);
    }

    $scope.sortStyleChanged = function (){
        $scope.isToDesc = !$scope.isToDesc;
        setPage(1);
    }
    
    $scope.watchProfile = function (selectedId) {
        $location.path("/sportsmanProfile/" + selectedId);
    }

});