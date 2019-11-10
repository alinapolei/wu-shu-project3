app.controller("registerController", function ($scope,$rootScope, $http, $window, $location, $filter, clubService, excelService, coachService, registerService, constants, confirmDialogService) {
    $scope.sexEnum = constants.sexEnum;
    $scope.sportStyleEnum = constants.sportStyleEnum;
    $scope.regex = constants.regex;

    $scope.currentDate = new Date();
    $scope.isRegisterCoach = false;
    $scope.coaches = new Array()
    $scope.clubs = new Array();
    let dropZoneRegisterUsers = document.getElementById("dropZoneRegisterUsers")
    let downloadExcelLink = document.getElementById("downExcelSportsman")

    getCoachesAndClub();

    function getCoachesAndClub() {
        coachService.getCoaches()
            .then(function (result) {
                $scope.coaches = result.data;
            }, function (error) {
                console.log(error)
            });

        clubService.getClubs()
            .then(function (result) {
                $scope.clubs = result.data;
            }, function (error) {
                console.log(error)
            });

    }

    $scope.filterClub = function () {
        $scope.sportclub = $filter('filter')($scope.clubs, function (obj) {
            return obj.id === $scope.coach.sportclub;
        })[0];
    };

    fillDataTmpFunction();


    $scope.uploadNewFile = function(){
        $scope.excelErrors = [];
        $scope.isDropped = false;
        dropZoneRegisterUsers.className = "dropzone"
        document.getElementById("dropText").innerHTML = "גרור קובץ או לחץ על העלאת קובץ";
        document.getElementById("fileSportsman").value = "";
    }
    $scope.ExcelExport = function (event) {
        excelService.uploadExcel(event, function (res) {
            //console.log(res)
            registerUsers(res, $scope.isRegisterCoach)
        })
    };


    dropZoneRegisterUsers.ondrop = function (e) {
        excelService.dropZoneDropFile(e, function (res) {
            changeDropZone(res.fileName)
            registerUsers(res.result, $scope.isRegisterCoach)
        })
    };

    function changeDropZone(name) {
        var droptext = document.getElementById("dropText");
        droptext.innerHTML = name.toString();
        $scope.isDropped = true;
        dropZoneRegisterUsers.className = "dropzoneExcel"
    }

    dropZoneRegisterUsers.ondragover = function () {
        this.className = 'dropzone dragover';
        return false;
    };
    dropZoneRegisterUsers.ondragleave = function () {
        this.className = 'dropzone';
        return false;
    };

    /*** manual registration ***/
    $scope.submit = async function (isValid) {
        let data = [];
        if (isValid) {
            if (!$scope.isRegisterCoach) {
                data.push({
                    id: $scope.id,
                    firstName: $scope.firstname,
                    lastName: $scope.lastname,
                    phone: $scope.phone,
                    address: $scope.address,
                    birthDate: $filter('date')($scope.birthdate, "dd/MM/yyyy"),
                    email: $scope.email,
                    sportClub: $scope.sportclub.id,
                    sex: $scope.selectedSex,
                    sportStyle: $scope.sportStyle,
                    idCoach: $scope.coach.id
                });
            } else {
                data.push({
                    id: $scope.id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    phone: $scope.phone,
                    email: $scope.email,
                    birthdate: $filter('date')($scope.birthdate, "dd/MM/yyyy"),
                    address: $scope.address,
                    sportclub: $scope.sportclub.id,
                    sportStyle: $scope.sportStyle,
                    teamname: $scope.teamname
                });
            }
            registerUsers(data, $scope.isRegisterCoach)
        }
    };
    $rootScope.isChangingLocationFirstTime = true;
    $scope.$on('$routeChangeStart', function(event, newRoute, oldRoute) {
        if($scope.registerForm.$dirty && !$scope.isSaved && $rootScope.isChangingLocationFirstTime) {
            if (!$scope.registerForm.$valid) $scope.isClicked = true;
            confirmDialogService.notSavedItems(event, $location.path(), $scope.submit, $scope.registerForm.$valid);
        }
    });

    function registerUsers(data, isRegisterCoach) {
        if (!isRegisterCoach)
            registerService.registerUsers(data)
                .then((results) => {
                    $scope.isSaved = true;
                    alert("ok")
                    $location.path("/home");
                })
                .catch((err) => {
                    console.log(err);
                    $scope.excelErrors = err.data;
                })
    }

    $scope.downloadExcelRegisterSportsMan = function () {
        let token =$window.sessionStorage.getItem('token')
        let url = constants.serverUrl + '/downloadExcelFormatSportsman/'+token;
        downloadExcelLink.setAttribute('href', url);
        downloadExcelLink.click();
    }

    function fillDataTmpFunction() {
        $scope.id = 222222222;
        $scope.firstname = "ניסיון";
        $scope.lastname = "ניסיון";
        $scope.phone = "2222222222";
        $scope.email = "tmp@gmail.com";
        $scope.address = 'כגדכ'
        $scope.selectedSex = 'זכר'
        $scope.sportStyle = 'טאולו'
        $scope.birthdate = new Date(1990, 3, 3);
    }
});


