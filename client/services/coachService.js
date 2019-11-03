app.service('coachService', function($window, $http, constants) {

    this.getCoaches = function(){
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/getCoaches',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
        }
        return $http(req);
    }

});