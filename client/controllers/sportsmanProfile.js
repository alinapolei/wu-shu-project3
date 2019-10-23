app.controller("sportsmanProfileController", function ($scope, $http, $filter, $window, $location, $rootScope, $routeParams, constants, sportsmanService, userService) {

    $scope.whoAmI = "ספורטאי";
    $scope.isEditModeOn = false;
    $scope.currentDate = new Date();
    $scope.sexEnum = constants.sexEnum;
    $scope.turnOnEditMode = function () {
        $scope.isEditModeOn = true;
    };
    $scope.turnOffEditMode = function () {
        $scope.isEditModeOn = false;
    };

    $scope.submit = function (isValid) {
        if (isValid) {
            let data = {
                id: $scope.user.id,
                firstname: $scope.user.sfirstname,
                lastname: $scope.user.slastname,
                phone: $scope.user.phone,
                email: $scope.user.email,
                birthdate: $filter('date')($scope.user.birthdate, "dd/MM/yyyy"),
                address: $scope.user.address,
                sex: $scope.user.sex,
            }
            sportsmanService.updateProfile(data)
                .then(function (result) {
                    alert("משתמש עודכן בהצלחה")
                    $location.path("/users/sportsmen");
                }, function (error) {
                    console.log(error)
                })
        }
    }

    sportsmanService.getSportsmanProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
            $scope.user.birthdate = new Date($scope.user.birthdate);
        }, function (error) {
            console.log(error)
        });

    $scope.delProfile = function (id) {
        //userService.deleteProfile(id)
        var res = confirm("האם אתה בטוח שברצונך למחוק את פרופיל המשתמש?")
        if (res == true) {
            let data = {
                userID: id
            }
            userService.deleteProfile(data)
                .then(function (reusult) {
                    alert("משתמש נמחק בהצלחה")
                    $location.path("/users/sportsmen");

                }, function (error) {
                    console.log(error)
                })
        }
    }
});