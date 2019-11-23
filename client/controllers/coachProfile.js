app.controller("coachProfileController", function ($scope, $http, $filter, $window, $location, $rootScope, $routeParams, constants, coachService, userService, confirmDialogService, toastNotificationService) {
    $scope.whoAmI = "מאמן";
    coachService.getCoachProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
            $scope.user.birthdate = new Date($scope.user.birthdate);
        }, function (error) {
            console.log(error)
        })
});
