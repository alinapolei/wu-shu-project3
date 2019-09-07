app.service('clubService', function($window, $http) {
    serverUrl = "http://localhost:3000";
    this.insertCompetition = function (data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data : data
        };
        return $http(req);
    }
});