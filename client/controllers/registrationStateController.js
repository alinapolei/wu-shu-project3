app.controller("registrationStateController", function($scope, $window, $http, sportsmanService, $routeParams) {
    getDisplayData();

    function getDisplayData(){
        sportsmanService.getSportsmen(sportsmanService.buildConditionds("", null, null, null, null, $routeParams.idComp, '%3D%3D'))
            .then(function (result) {
                $scope.users = result.data.sportsmen;
            }, function (error) {
                console.log(error)
            });

        sportsmanService.getCategories()
            .then(function (result) {
                $scope.categories = result.data;
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