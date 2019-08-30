app.controller("sportsmenController", function ($scope, $http, $window, clubService, pagingService) {
    serverUrl = "http://localhost:3000";
    var allUsers;
    var req = {
        method: 'POST',
        url: serverUrl + '/private/getSportsmen',
        headers: {
            'x-auth-token': $window.sessionStorage.getItem('token')
        },
    };
    $http(req).then(function (result) {
        allUsers = result.data;
        setPage(1);
    }, function (error) {
        console.log(error)
    });


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
        if (page < 1 || page > $scope) {
            return;
        }

        $scope.pager = pagingService.GetPager(allUsers.length, page, pageSize);

        $scope.users = allUsers.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

});