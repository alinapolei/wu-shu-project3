app.controller("registerController", function ($scope, $http, $window, $location, $rootScope, $filter, clubService, excelService, coachService, registerService, constants) {
    $scope.sexEnum = constants.sexEnum;
    $scope.currentDate = new Date();
    $scope.isRegisterCoach = false;
    $scope.coaches = new Array()
    $scope.clubs = new Array();
    var changeExcel = document.getElementById("changeExcel");
    let dropZoneRegisterUsers = document.getElementById("dropZoneRegisterUsers")


    getCoachesAndClub();

    function getCoachesAndClub() {
        coachService.getCoaches()
            .then(function (result) {
                $scope.allcoaches = result.data;
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

    $scope.filterCoach = function () {
        $scope.coaches = $filter('filter')($scope.allcoaches, function (obj) {
            return obj.sportclub == $scope.sportclub.id;
        });
    };
    $scope.filterClub = function () {
        $scope.sportclub = $filter('filter')($scope.clubs, function (obj) {
            return obj.id === $scope.coach.sportclub;
        })[0];
    };

    fillDataTmpFunction();


    changeExcel.onclick = function (e) {
        e.preventDefault()
        dropZoneRegisterUsers.className = "dropzone"
        changeExcel.style.display = "none"
        document.getElementById("dropText").innerHTML = "גרור קובץ או לחץ על העלאת קובץ";
        document.getElementById("fileSportsman").value = "";
    }
    $scope.ExcelExport = function (event) {
        excelService.uploadExcel(event, function (res) {
            //console.log(res)
            registerUsers(res, $scope.coachReggister)
        })
    };


    dropZoneRegisterUsers.ondrop = function (e) {
        excelService.dropZoneDropFile(e, function (res) {
            changeDropZone(res.fileName)
            registerUsers(res.result, $scope.coachReggister)
        })
    };

    function changeDropZone(name) {
        var droptext = document.getElementById("dropText");
        droptext.innerHTML = name.toString();
        dropZoneRegisterUsers.className = "dropzoneExcel"
        changeExcel.style.display = "block"
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
            if (!$scope.coachReggister) {
                data.push({
                    id: $scope.id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    phone: $scope.phone,
                    email: $scope.email,
                    birthdate: $filter('date')($scope.birthdate, "dd/MM/yyyy"),
                    address: $scope.address,
                    sportclub: $scope.sportclub.id,
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
            registerUsers(data, $scope.coachReggister)
        }
    };

    function replacer(key, value) {
        return value.split(',').join('\n');
    }


    function registerUsers(data, isCoach) {
        if (!isCoach)
            registerService.registerUsers(data)
                .then((results) => {
                    alert("ok")
                    $location.path("/home");
                })
                .catch((err) => {
                    displayMsgForRegister(err.data)
                })
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

    function displayMsgForRegister(collectionErr) {
        console.log(collectionErr)
        $scope.resErr = true;
        let err = '';
        collectionErr.forEach((e)=>{

            let colErr =''
            e.errors.forEach((ee)=>{
                colErr =colErr +"\n"+ee+"\n"
            })
            err= err +"\n"+e.id +colErr
        })
        $scope.errorText = err;
    }

    function registerCoach(data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/registerCoach',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
            data: data
        }
        $http(req).then(function () {
            alert("הרישום בוצע בהצלחה")
        }, function (error) {
            if (error.status === 403)
                alert("משתמש עם הת.ז. שהוזנה קיים במערכת כבר");
            else
                alert("ארעה שגיאה");
            console.log(error);
        });


    }


    /*
    function registerExcelUser(data) {
        if (!$scope.coachReggister)
            regUrl = serverUrl + '/private/registerSportman'
        else
            regUrl = serverUrl + '/private/registerCoach'

        for (let i = 0; i < data.length; i++) {
            var req = {
                method: 'POST',
                url: regUrl,
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
                },
                data: data[i]
            }
            console.log(data)
            $http(req).then(function () {
                if (i == data.length - 1)
                    ansExcel.style.color = "green";
                ansExcel.style.display = "block"
                ansExcel.innerHTML = "רישום בוצע בהצלחה";
            }, function (error) {
                console.log(error)
            });


        }

    }

     */

    function clearFields() {
        /*$scope.id = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.phone
            email: $scope.email,
            birthdate: $filter('date')($scope.birthdate, "dd-MM-yyyy"),
            address: $scope.address,
            sportclub: $scope.sportclub.id,
            sex: $scope.sex,
            sportStyle: $scope.sportStyle,
            idCoach: $scope.coach.id

         */
    }
});


