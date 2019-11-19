app.controller("coachController", function ($scope, $http, $filter, $window, $location, constants, clubService, coachService) {
    $scope.headerTable = "מאמנים";
    $scope.isToDesc = true;
    getDataForDisplay();

    function getDataForDisplay() {
        coachService.getCoaches()
            .then(function (result) {
                $scope.coaches = result.data;
                $scope.setPage();
            }, function (error) {
                console.log(error)
            });

        clubService.getClubs()
            .then(function (result) {
                $scope.clubs = result.data;
            }, function (error) {
                console.log(error)
            });
    }
    $scope.setPage = function(){
        let filtered = $scope.coaches;
        if ($scope.selectedClub)
            filtered = $filter('coachByClubFilter')(filtered, $scope.selectedClub);
        if($scope.searchText)
            filtered = $filter('filter')(filtered, function (obj) {
                return obj.firstname.includes($scope.searchText) || obj.lastname.includes($scope.searchText);
            });
        if($scope.isToDesc)
            filtered = $filter('orderBy')(filtered, 'firstname');
        else
            filtered = $filter('orderBy')(filtered, '-firstname');
        $scope.users = filtered;
    };

    $scope.watchProfile = function (selectedId) {
        $location.path("/coachProfile/" + selectedId);
    }
});
