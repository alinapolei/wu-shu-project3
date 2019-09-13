app.controller("sportsmenController", function ($scope, $http, $window, $location, clubService, pagingService) {
    serverUrl = "http://localhost:3000";
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

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        var req = {
            method: 'POST',
            url: serverUrl + '/private/getSportsmen' + buildConditions(),
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
        };
        $http(req).then(function (result) {
            let totalCount = result.data.totalCount;

            $scope.pager = pagingService.GetPager(totalCount, page);
            $scope.users = result.data.sportsmen.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }, function (error) {
            console.log(error)
        });
    }
    function buildConditions(){
        var conditions = [];

        if($scope.searchText !== null && $scope.searchText !== undefined) {
            conditions.push('value=' + $scope.searchText);
        }
        if($scope.selectedsportStyle !== null && $scope.selectedsportStyle !== undefined){
            conditions.push('sportStyle=' + $scope.selectedsportStyle.name);
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
    
    $scope.watchProfile = function (selectedId) {
        $location.path("/sportsmanProfile/" + selectedId);
    }

});