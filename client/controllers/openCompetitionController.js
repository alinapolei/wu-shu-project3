app.controller("openCompetitionController", function ($scope, $location, competitionService) {
    $scope.currentDate = new Date();
    $scope.currentTime = $scope.currentDate.getTime();

    $scope.submit = function (isValid) {
        if(isValid){
            let data = {
                
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
