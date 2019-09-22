app.controller("sportsmanProfileController", function ($scope, $http, $window, $location, $rootScope, $routeParams, sportsmanService) {

    $scope.whoAmI = "ספורטאי";
    $scope.isEditModeOn = false;
    $scope.turnOnEditMode = function(){
        $scope.isEditModeOn = true;
    };

    sportsmanService.getSportsmanProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
        }, function (error) {
            console.log(error)
        });

    $scope.delProfile = function(id){
        console.log(id)
    };
});