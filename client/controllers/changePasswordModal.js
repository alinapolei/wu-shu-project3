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
                    password: $scope.password1
                }
            };
            $http(req).then(function () {
                $uibModalInstance.close();
            }, function (error) {
                if(error.status == 401)
                    $scope.error = "הסיסמא שהוזנה זהה לסיסמא הנוכחית";
                else {
                    console.log(error.data);
                    alert("ארעה שגיאה בעת שינוי הסיסמא. נסה שנית.")
                }
            });
        }
        else
            $scope.error = "הסיסמאות שהוזנו אינן שוות";
    }
});