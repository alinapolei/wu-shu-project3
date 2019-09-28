app.controller("registrationStateController", function($scope, $window, $http, $location, sportsmanService, competitionService, $routeParams) {
    $scope.categoryForSportsman = [];
    $scope.status = $routeParams.statusComp;
    getDisplayData();

    async function getDisplayData(){
        let result = await sportsmanService.getCategories();
        $scope.categories = result.data;
        $scope.categories.map((obj) => {
            obj.count = 0;
            return obj;
        });

        competitionService.getRegistrationState($routeParams.idComp)
            .then(function (result) {
                $scope.users = result.data;
                $scope.users.map((obj) => {
                    obj.selectedCategory = $scope.categories.find(function (item) {
                        return item.id == obj.category;
                    });
                    if(obj.selectedCategory)
                        $scope.categories.find(function (item) {
                            return item.id == obj.category;
                        }).count++;
                    return obj;
                })
            }, function (error) {
                console.log(error)
            });
    }

    $scope.submit = function () {
        competitionService.setCategoryRegistration($routeParams.idComp, $scope.categoryForSportsman)
            .then(function(result){
                alert("השינויים נשמרו בהצלחה");
                $location.path('/competitions/registerToCompetition');
            }, function (error) {
                console.log(error);
            })
    };

    $scope.addChange = function (user, oldCategoryId) {
        let categorySportsman = $scope.categoryForSportsman.find(item => {return item.sportsmanId == user.id});
        if(oldCategoryId != '')
            $scope.categories.find(item => {return item.id == oldCategoryId}).count--;
        if(categorySportsman){
            categorySportsman.categoryId = user.selectedCategory.id;
        }
        else {
            $scope.categoryForSportsman.push(
                {
                    sportsmanId: user.id,
                    categoryId: user.selectedCategory.id
                }
            );
        }
        user.selectedCategory.count++;
    }

    $scope.closeRegistration = function() {
        competitionService.closeRegistration($routeParams.idComp)
            .then(function (result) {
                alert("הרישום נסגר בהצלחה");
                $location.path('/competitions/registerToCompetition');
            }, function (error) {
                console.log(error);
            })
    }

});

app.filter('categoryFilter', function() {
    return function( items, user) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if( user.age >= item.minAge && (item.maxAge == null ||  user.age <= item.maxAge) && user.sex == item.sex) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});