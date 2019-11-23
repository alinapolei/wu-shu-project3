app.controller("coachProfileController", function ($scope, $http, $filter, $window, $location, $rootScope, $routeParams, constants, coachService, userService, confirmDialogService, toastNotificationService) {
    $scope.whoAmI = "מאמן";
    coachService.getCoachProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
            $scope.user.birthdate = new Date($scope.user.birthdate);
        }, function (error) {
            console.log(error)
        })

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
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                phone: $scope.user.phone,
                email: $scope.user.email,
                birthdate: $filter('date')($scope.user.birthdate, "dd/MM/yyyy"),
                address: $scope.user.address,
            }
            coachService.updateProfile(data)
                .then(function (result) {
                    toastNotificationService.successNotification("המשתמש עודכן בהצלחה");
                    $scope.isSaved = true;
                    if($rootScope.isChangingLocationFirstTime) $location.path("/users/couches");
                }, function (error) {
                    toastNotificationService.errorNotification("ארעה שגיאה בעת ביצוע העדכון");
                    console.log(error)
                })
        }
    };

    $scope.delProfile = function (id) {}



});
