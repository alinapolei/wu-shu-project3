let app = angular.module('myApp', ["ngRoute"]);
app.controller("mainController", function ($scope, $location, $window, $rootScope) {
    if($window.sessionStorage.getItem('name') != null && $window.sessionStorage.getItem('name')!=='')
        $rootScope.name = $window.sessionStorage.getItem('name');
    else
        $rootScope.name = "guest";

    $scope.logout = function () {
        //need delete $rootScope
        $window.sessionStorage.removeItem('name');
        $window.sessionStorage.removeItem('token');
        $rootScope.name = "guest";
        $location.path('/home');
    }
});

// config routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController as loginCtrl'
        })
        .when('/register',{
            templateUrl :'views/register.html',
            controller: 'registerController as chRegCtrl'
        })

        .otherwise({redirectTo: '/home'});
});

//services

