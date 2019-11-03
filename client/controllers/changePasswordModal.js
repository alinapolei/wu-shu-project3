app.controller("changePasswordController", function($scope, $uibModalInstance, $window, $http, constants) {
    $scope.changePass = function(isValid){
        $scope.isClicked = true;
        if(isValid) {
            if ($scope.password1 === $scope.password2) {
                var req = {
                    method: 'POST',
                    url: constants.serverUrl + '/private/changePassword',
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem('token')
                    },
                    data: {
                        password: $scope.password1
                    }
                };
                $http(req).then(function () {
                    $window.sessionStorage.setItem('isFirstLogin', "0");
                    $uibModalInstance.close();
                    alert("הסיסמא הוחלפה בהצלחה")
                }, function (error) {
                    if (error.status === 409)
                        $scope.error = error.data;
                    else {
                        console.log(error.data);
                        alert("ארעה שגיאה בעת שינוי הסיסמא. נסה שנית.")
                    }
                });
            } else
                $scope.error = "הסיסמאות שהוזנו אינן שוות";
        }
    }
});