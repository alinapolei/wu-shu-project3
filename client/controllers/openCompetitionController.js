app.controller("openCompetitionController", function ($scope, $rootScope,$filter,$location, competitionService, constants, confirmDialogService) {
    $scope.currentDate = new Date();
    $scope.sportStyleEnum = constants.sportStyleEnum;
    $scope.regex = constants.regex;

    $scope.submit = function (isValid) {
        if(isValid){
            let data = {
                location : $scope.location,
                eventDate : $filter('date')($scope.date,"MM/dd/yyyy"),
                startHour : $filter('date')($scope.time,"HH:mm"),
                sportStyle : $scope.sportStyle,
                description : $scope.description,
                closeDate: $filter('date')($scope.regCloseDate,"MM/dd/yyyy"),
                closeTime :$filter('date')($scope.regCloseTime,"HH:mm"),
                city: $scope.city
            };

            competitionService.insertCompetition(data)
                .then(function (result) {
                    alert("התחרות נוצרה בהצלחה");
                    $scope.isSaved = true;
                    if($rootScope.isChangingLocationFirstTime) $location.path('/home');
                }, function (error) {
                    console.log(error);
                    alert("ארעה שגיאה ביצירת התחרות");
                })

        }
    }
    $rootScope.isChangingLocationFirstTime = true;
    $scope.$on('$routeChangeStart', function(event, newRoute, oldRoute) {
        if($scope.openCompetitionForm.$dirty && !$scope.isSaved && $rootScope.isChangingLocationFirstTime) {
            if (!$scope.openCompetitionForm.$valid) $scope.isClicked = true;
            confirmDialogService.notSavedItems(event, $location.path(), $scope.submit, $scope.openCompetitionForm.$valid);
        }
    });
});
