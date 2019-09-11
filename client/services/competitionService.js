app.service('competitionService', function($window, $http) {
    serverUrl = "http://localhost:3000";
    this.insertCompetition = function (data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/addCompetition',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data : data
        };
        return $http(req);
    }
    this.getCompetitons = function () {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCompetitions',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    }
    this.getCompetitionDetails = function (id) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCompetitionDetail',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data : {
                id: id
            }
        };
        return $http(req);
    }

});