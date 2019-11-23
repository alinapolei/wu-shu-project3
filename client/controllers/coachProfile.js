app.controller("coachProfileController", function ($scope, $http, $filter, $window, $location, $rootScope, $routeParams, constants, coachService, userService, confirmDialogService, toastNotificationService) {
    $scope.whoAmI = "מאמן";
    coachService.getCoachProfile({id: $routeParams.id})
        .then(function (result) {
            $scope.user = result.data;
            console.log($routeParams.id)
            console.log($scope.user)
        }, function (error) {
            console.log(error)
        })
});
