app.controller("loginController", function ($scope, $http, $window, $location, $rootScope) {
    serverUrl = "http://localhost:3000";

    $scope.submit = function(isValid){
        if(isValid){
            var user ={
                userID : $scope.username,
                password : $scope.password};
            $http.post(serverUrl+ '/login', user)
                .then(function (response) {
                        $rootScope.name = $scope.username;
                        $window.sessionStorage.setItem('name', $scope.username);
                        $window.sessionStorage.setItem('token', response.data);
                        $location.path('/home');
                    },
                    function (error) {
                        $scope.isError = true;
                        console.log(error.data);
                    });
        }
    };
});