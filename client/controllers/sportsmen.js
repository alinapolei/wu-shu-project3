app.controller("sportsmenController", function ($scope, $http, $window, clubService, pagingService) {
    serverUrl = "http://localhost:3000";
    var allUsers;
    $scope.pager = {};
    $scope.isToDesc = true;
    setPage(1);
    getDataForDisplay();

    // async function getDataForDisplay() {
    //     result =await clubService.getClubs();
    //     $scope.clubs = result.data;
    //     console.log($scope.clubs);
    // }
    function getDataForDisplay() {
        clubService.getClubs()
            .then(function (result) {
                $scope.clubs = result.data;
            }, function (error) {
                console.log(error)
            });
    }

    let pageSize = 10;
    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
            console.log("exit");
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page, pageSize);

        var req = {
            method: 'POST',
            url: serverUrl + '/private/getSportsmen' + buildConditions(),
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
        };
        $http(req).then(function (result) {
            console.log(serverUrl + '/private/getSportsmen' + buildConditions());
            allUsers = result.data;

            $scope.pager = pagingService.GetPager(allUsers.length, page, pageSize);
            $scope.users = allUsers.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }, function (error) {
            console.log(error)
        });
    }
    function buildConditions(){
        var conditions = [];

        if($scope.searchText !== null && $scope.searchText !== undefined) {
            conditions.push('value=' + $scope.searchText);
        }
        if($scope.selectedBranch !== null && $scope.selectedBranch !== undefined){
            conditions.push('branch=' + $scope.selectedBranch.name);
        }
        if($scope.selectedClub != null && $scope.selectedClub !== undefined){
            conditions.push('club=' + $scope.selectedClub.id);
        }
        if($scope.selectedSex !== null && $scope.selectedSex !== undefined){
            conditions.push('sex=' + $scope.selectedSex.name);
        }
        if($scope.isToDesc === false){
            conditions.push('sort=desc')
        }

        return conditions.length ? '?' + conditions.join('&') : '';
    }

    $scope.sortStyleChanged = function (){
        $scope.isToDesc = !$scope.isToDesc;
        setPage(1);
    }

});