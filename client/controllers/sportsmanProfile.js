app.controller("sportsmanProfileController", function ($scope, $http, $filter, $window, $location, $rootScope, $routeParams, constants, sportsmanService, userService, confirmDialogService) {
    var oldId;
    $scope.whoAmI = "ספורטאי";
    $scope.isEditModeOn = false;
    $scope.currentDate = new Date();
    $scope.sexEnum = constants.sexEnum;
    $scope.regex = constants.regex;

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
                oldId: oldId
            }
            console.log(data)
            sportsmanService.updateProfile(data)
                .then(function (result) {
                    alert("משתמש עודכן בהצלחה")
                    $scope.isSaved = true;
                    if($rootScope.isChangingLocationFirstTime) $location.path("/users/sportsmen");
                }, function (error) {
                    alert("ארעה שגיאה בעת ביצוע העדכון")
                    console.log(error)
                })
        }
    };
    $rootScope.isChangingLocationFirstTime = true;
    $scope.$on('$routeChangeStart', function(event, newRoute, oldRoute) {
        if($scope.updateProfile.$dirty && !$scope.isSaved && $rootScope.isChangingLocationFirstTime) {
            if (!$scope.updateProfile.$valid) $scope.isClicked = true
            confirmDialogService.notSavedItems(event, $location.path(), $scope.submit, $scope.updateProfile.$valid);
        }
    });

    sportsmanService.getSportsmanProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
            $scope.user.birthdate = new Date($scope.user.birthdate);
            oldId = $scope.user.id;
        }, function (error) {
            console.log(error)
        });

    $scope.delProfile = function (id) {
        confirmDialogService.askQuestion("האם אתה בטוח שברצונך למחוק את פרופיל המשתמש?", function () {
            let data = {
                userID: id
            };
            userService.deleteProfile(data)
                .then(function (reusult) {
                    alert("משתמש נמחק בהצלחה")
                    $location.path("/users/sportsmen");

                }, function (error) {
                    console.log(error)
                })
        });
    }
});