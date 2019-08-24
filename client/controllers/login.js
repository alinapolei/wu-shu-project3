app.controller("loginController", function ($scope, $http, $window, $location, $rootScope) {
    serverUrl = "http://localhost:3000";

    $scope.submit = function(isValid){
        if(isValid){
            var user ={
                userID : $scope.username,
                password : $scope.password};
            $http.post(serverUrl+ '/login', user)
                .then(function (response) {
                        $window.sessionStorage.setItem('name', response.data.firstname);
                        $rootScope.name = $window.sessionStorage.getItem('name');

                        $window.sessionStorage.setItem('access', response.data.access);
                        $window.sessionStorage.setItem('isFirstLogin', response.data.isFirstTime);
                        $window.sessionStorage.setItem('token', response.data.token);
                        $location.path('/home');
                    },
                    function (error) {
                        $scope.isError = true;
                        console.log(error.data);
                    });
        }
    };
});