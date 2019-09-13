app.controller("competitionTableController", function($scope, $window, $http,competitionService,pagingService,$uibModal) {
    serverUrl = "http://localhost:3000";
    $scope.headerTable = "תחרויות";
    $scope.pager = {};
     competitionService.getCompetitons()
        .then(function (result) {
            $scope.competitions = result.data;
        }, function (error) {
            console.log(error)
        });

    $scope.watchCompDetails = function (idCompetiton) {
        $uibModal.open({
            templateUrl: "views/competitonDetails.html",
            controller: "competitionDetailsModal as cDetailsCtrl",
            backdrop  : 'static',
            keyboard  : false,
            resolve: {
                getId: function () {
                    return idCompetiton;
                }
            }
        });
    };
    $scope.regSportsman = function (idCompetiton) {
        $uibModal.open({
            templateUrl: "views/regSportsmanCompetition.html",
            controller: "competitionRegisterModal as cRegCtrl",
            backdrop  : 'static',
            keyboard  : false,
            resolve: {
                getId: function () {
                    return idCompetiton;
                }
            }
        });
    };

});