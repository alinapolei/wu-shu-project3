app.controller("registrationStateController", function($scope, $window, $http, sportsmanService, competitionService, $routeParams) {
    getDisplayData();

    function getDisplayData(){
        sportsmanService.getCategories()
            .then(function (result) {
                $scope.categories = result.data;
                $scope.categories.map((obj) => {
                    obj.count = 0;
                    return obj;
                })
            }, function (error) {
                console.log(error)
            });

        //sportsmanService.getSportsmen(sportsmanService.buildConditionds("", null, null, null, null, $routeParams.idComp, '%3D%3D'))
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