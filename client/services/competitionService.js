app.service('competitionService', function ($window, $http, $uibModal) {
    serverUrl = "http://localhost:3000";
    this.insertCompetition = function (data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/addCompetition',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };
    this.getCompetitons = function () {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCompetitions',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    };
    this.getOpenCompetitons = function () {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCompetitions?isOpen=true',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    };
    this.getCompetitionDetails = function (id) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCompetitionDetail',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                id: id
            }
        };
        return $http(req);
    };
    this.getSportsman = function () {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCoachSportsman',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    };

    this.watchCompDetails = function (idCompetiton) {
        $uibModal.open({
            templateUrl: "views/competitonDetails.html",
            controller: "competitionDetailsModal as cDetailsCtrl",
            backdrop  : true,
            keyboard: false,
            resolve: {
                getId: function () {
                    return idCompetiton;
                }
            }
        }).result.catch(function () { });
    };
    this.regSportsman = function (idCompetiton) {
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
        }).result.catch(function () { });
    };
});