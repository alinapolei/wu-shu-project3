app.controller("sportsmenController", function ($scope, $http, $window, clubService) {
    serverUrl = "http://localhost:3000";
    var req = {
        method: 'POST',
        url: serverUrl + '/private/getSportsmen',
        headers: {
            'x-auth-token': $window.sessionStorage.getItem('token')
        },
    };
    $http(req).then(function (result) {
        $scope.users = result.data;
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


});