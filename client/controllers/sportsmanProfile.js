app.controller("sportsmanProfileController", function ($scope, $http, $filter, $window, $location, $rootScope, $routeParams, constants, sportsmanService, userService, confirmDialogService, toastNotificationService) {
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
    $scope.btnPressed =function() {
        console.log("btn pressed")
        let fileinput = document.getElementById("SportsmanProfilePicUpload");
        fileinput.click();
        fileinput.onchange = function (event) {
            let file = event.target.files[0];
            let dataFile =new FormData();
            dataFile.append("profileImage", file);
            let data = {
                profileImage : file
            }
            sportsmanService.uploadProfilePic(data,dataFile)
                .then((res)=>{
                    console.log("ok")
                })
                .catch((err)=>{
                    console.log(err)
                })

        }
    }
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
                sex: $scope.user.sex,
                oldId: oldId
            }
            sportsmanService.updateProfile(data)
                .then(function (result) {
                    toastNotificationService.successNotification("המשתמש עודכן בהצלחה");
                    $scope.isSaved = true;
                    if($rootScope.isChangingLocationFirstTime) $location.path("/users/sportsmen");
                }, function (error) {
                    toastNotificationService.errorNotification("ארעה שגיאה בעת ביצוע העדכון");
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
                    toastNotificationService.successNotification("משתמש נמחק בהצלחה");
                    $location.path("/users/sportsmen");

                }, function (error) {
                    console.log(error)
                })
        });
    }
});
