app.service('registerService', function ($window, $http) {
    serverUrl = "http://localhost:3000";
    let url;
    this.registerUsers = function (data, isCoach) {
        if (!isCoach)
            url = serverUrl + '/private/registerSportsman';
        else
            url = serverUrl + '/private/registerCoach';
        let req = {
            method: 'POST',
            url: url,
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };


});