app.controller("openCompetitionController", function ($scope,$filter,$location, competitionService) {
    $scope.currentDate = new Date();
    $scope.currentTime = $scope.currentDate.getTime();

    $scope.submit = function (isValid) {
        if(isValid){
            let data = {
                location : $scope.location,
                eventDate : $filter('date')($scope.date,"MM/dd/yyyy"),
                startHour : $filter('date')($scope.time,"hh:mm"),
                sportStyle : $scope.sportStyle,
                description : $scope.description,
                closeDate: $filter('date')($scope.regCloseDate,"MM/dd/yyyy"),
                closeTime :$filter('date')($scope.regCloseTime,"hh:mm"),
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
