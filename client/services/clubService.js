app.service('clubService', function($window, $http) {

    this.getClubs = function () {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getClubs',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
        };
        return $http(req);
    }

});