app.controller("openCompetitionController", function ($scope,$filter,$location, competitionService, constants) {
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
                    $location.path('/home');
                }, function (error) {
                    console.log(error);
                    alert("ארעה שגיאה ביצירת התחרות");
                })

        }
    }
});
