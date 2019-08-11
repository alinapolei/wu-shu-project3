app.controller("changePasswordController", function($scope, $uibModalInstance, $window, $http) {
    serverUrl = "http://localhost:3000";

    $scope.changePass = function(){
        $scope.isClicked = true;
        if($scope.password1 === $scope.password2){
            var req = {
                method: 'POST',
                url: serverUrl + '/private/changePassword',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem('token')
                },
                data: {
                    password: $scope.password
                }
            };
            $http(req).then(function () {
                $uibModalInstance.close();
            }, function (error) {
                console.log(error.data);
                alert("ארעה שגיאה בעת שינוי הסיסמא. נסה שנית.")
            });
        }
        else
            $scope.isError = true;
    }
});