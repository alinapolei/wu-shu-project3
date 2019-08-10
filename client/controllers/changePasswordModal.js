app.controller("changePasswordController", function($scope, $uibModalInstance, $window, $http) {
    $scope.changePass = function(){
        $scope.isClicked = true;
        if($scope.password1 === $scope.password2){
            //$http change pass and at the end of the promise do the next line
            $uibModalInstance.close();
        }
    }
});