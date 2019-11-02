app.service('userService', function($window, $http, constants) {
    this.deleteProfile =function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/deleteSportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    }
});





