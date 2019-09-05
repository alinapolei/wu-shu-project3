app.service('sportsmanService', function($window, $http) {
    serverUrl = "http://localhost:3000";
    this.getSportsmanProfile = function (data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/sportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    }
});