app.controller("registerController", function ($scope, $http, $window, $location, $rootScope, $filter, clubService, coachService, registerService, constants) {
    serverUrl = "http://localhost:3000"
    $scope.sexEnum = constants.sexEnum;
    $scope.currentDate = new Date();
    $scope.coachReggister = false;
    rowObj = new Object()
    $scope.coaches = new Array()
    $scope.clubs = new Array();
    var changeExcel = document.getElementById("changeExcel");

    getCoachesAndClub();
    fillDataTmpFunction();
    changeExcel.onclick = function (e) {
        e.preventDefault()
        dropzone.className = "dropzone"
        changeExcel.style.display = "none"
        document.getElementById("dropText").innerHTML = "גרור קובץ או לחץ על העלאת קובץ";
        document.getElementById("fileSportsman").value = "";
        ansExcel.style.display = "none"
    }


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

    var dropzone = document.getElementById("dropzone")


    function workbook_to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }


    dropzone.ondrop = function (e) {
        let res= registerService.dropZoneDropFile(e)//, $scope.coachReggister)
        console.log(res)


        //registerUsers(dataExcel, $scope.coachReggister)
    };
    dropzone.ondragover = function () {
        this.className = 'dropzone dragover';
        return false;
    };
    dropzone.ondragleave = function () {
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
                    console.log(err)
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

    function displayErr(collectionErr) {
        ansExcel.style.color = "red";
        ansExcel.style.display = "block"
        ansExcel.innerHTML = err
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

    $scope.ExcelExport = function (event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var fileData = reader.result;
            var wb = XLSX.read(fileData, {type: 'binary'});
            wb.SheetNames.forEach(async function (sheetName) {
                rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            })
            changeDropzone(document.getElementById('fileSportsman').files[0].name)
            //work with RowOBJ
            Excelcheck(rowObj);
        };
        reader.readAsBinaryString(input.files[0]);
    };



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


