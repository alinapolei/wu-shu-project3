let app = angular.module('myApp', ["ngRoute"]);
app.controller("mainController", function ($scope, $location, $window, $rootScope) {
    if($window.sessionStorage.getItem('name') != null && $window.sessionStorage.getItem('name')!=='')
        $rootScope.name = $window.sessionStorage.getItem('name');

    $scope.getClass = function (path) {
        return ("/" + $location.path().split("/")[1] === path) ? 'active' : '';
    };

    $scope.logout = function () {
        //need to delete $rootScope
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
        .when('/users/register',{
            templateUrl :'views/register.html',
            controller: 'registerController as chRegCtrl'
        })
        .when('/calendar', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/sportClubs/addSportClub', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/sportClubs/sportClubs', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/users/couches', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/users/admins', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/users/sportsman', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/users/referees', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/competitions/addCompetition', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/competitions/registerToCompetition', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/competitions/addResults', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/competitions/results', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/events/addEvent', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/events/addMessage', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/events/events', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/events/messages', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .otherwise({redirectTo: '/login'});
});
