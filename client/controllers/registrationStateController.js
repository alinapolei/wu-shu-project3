app.controller("registrationStateController", function($scope, $window, $http, sportsmanService, $routeParams) {
    getUser();

    function getUser(){
        sportsmanService.getSportsmen(sportsmanService.buildConditionds("", null, null, null, null, $routeParams.idComp, '%3D%3D'))
            .then(function (result) {
                $scope.users = result.data.sportsmen;
                console.log($scope.users);
            }, function (error) {
                console.log(error)
            });
    }
});