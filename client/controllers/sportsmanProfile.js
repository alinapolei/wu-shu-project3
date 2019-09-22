app.controller("sportsmanProfileController", function ($scope, $http, $window, $location, $rootScope, $routeParams, sportsmanService,userService) {

    $scope.whoAmI = "ספורטאי";
    $scope.isEditModeOn = false;
    $scope.turnOnEditMode = function () {
        $scope.isEditModeOn = true;
    };

    sportsmanService.getSportsmanProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
        }, function (error) {
            console.log(error)
        });

    $scope.delProfile = function (id) {
        //userService.deleteProfile(id)
       var res= confirm("האם אתה בטוח שברצונך למחוק את פרופיל המשתמש?")
        if(res==true) {
            let data ={
                userID :id
            }
            userService.deleteProfile(data)
                .then(function (reusult) {
                    alert("משתמש נמחק בהצלחה")
                    $location.path("/users/sportsmen");

                },function (error) {console.log(error)})
        }
    }
});