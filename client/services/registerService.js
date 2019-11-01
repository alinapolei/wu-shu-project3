app.service('registerService', function ($window, $http) {
    serverUrl = "http://localhost:3000";

    this.registerUsers = function (data, isRegisterCoach) {
        let url = getRegisterUserUrl(isRegisterCoach);
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

function getRegisterUserUrl(isRegisterCoach) {
    if (!isRegisterCoach)
        return  serverUrl + '/private/registerSportsman';
    else
        return serverUrl + '/private/registerCoach';
}