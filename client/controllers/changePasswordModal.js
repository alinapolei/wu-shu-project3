app.controller("changePasswordController", function($scope, $uibModalInstance, $window, $http) {
    $scope.changePass = function(){
        $scope.isClicked = true;
        if($scope.password1 === $scope.password2){
            $uibModalInstance.close({
                rating: $scope.selectedRank,
                review: $scope.textReview}
            );
        }
    }
});