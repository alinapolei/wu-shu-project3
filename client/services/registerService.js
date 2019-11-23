app.service('registerService', function ($window, $http, constants) {
    this.registerUsers = function (data, isRegisterCoach) {
        let url = getRegisterUserUrl(isRegisterCoach);
        console.log(isRegisterCoach)
        console.log(url)
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

    function getRegisterUserUrl  (isRegisterCoach) {
        if (!isRegisterCoach)
            return constants.serverUrl + '/private/commonCoachManager/registerSportsman';
        else
            return constants.serverUrl + '/private/manager/registerCoach';
    }
});


