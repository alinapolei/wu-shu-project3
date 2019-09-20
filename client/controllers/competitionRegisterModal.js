app.controller("competitionRegisterModal", function($scope, $window, $uibModalInstance, $http, sportsmanService, pagingService,getId,competitionService) {
    $scope.selectedUsers = [];
    $scope.pager = {};
    setPage(1);

    $scope.close=function () {
        $uibModalInstance.close()
    };

    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        sportsmanService.getSportsmen(sportsmanService.buildConditionds($scope.searchText, null, null, null, null, getId))
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page, 14);
                $scope.users = result.data.sportsmen.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
            }, function (error) {
                console.log(error)
            });
    }

    $scope.select = function (id) {
        if($scope.selectedUsers.includes(id))
            $scope.selectedUsers = arrayRemove($scope.selectedUsers, id);
        else
            $scope.selectedUsers.push(id);
    };

    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }
});
