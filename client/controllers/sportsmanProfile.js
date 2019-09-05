app.controller("sportsmanProfileController", function ($scope, $http, $window, $location, $rootScope, $routeParams, sportsmanService) {

    $scope.isEditModeOn = false;
    $scope.turnOnEditMode = function(){
        console.log("to change");
        $scope.isEditModeOn = true;
    };

    sportsmanService.getSportsmanProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.sportsman = result.data;
        }, function (error) {
            console.log(error)
        });
});