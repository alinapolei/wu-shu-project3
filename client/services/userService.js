app.service('userService', function($window, $http,$uibModal) {
    serverUrl = "http://localhost:3000";
    this.deleteProfile =function (data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/deleteSportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    }
});





