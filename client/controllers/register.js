app.controller("registerController", function ($scope, $http, $window, $location, $rootScope, $filter, validateSportsmanData,validateCoachData, clubService) {
    serverUrl = "http://localhost:3000"
    $scope.currentDate = new Date();
    $scope.coachReggister=false;
    rowObj = new Object()
    $scope.coaches = new Array()
    $scope.clubs = new Array();
    var changeExcel = document.getElementById("changeExcel")
    var ansExcel =document.getElementById('ansExcel');

    changeExcel.onclick = function (e) {
        e.preventDefault()
        dropzone.className = "dropzone"
        changeExcel.style.display = "none"
        document.getElementById("dropText").innerHTML = "גרור קובץ או לחץ על העלאת קובץ";
        document.getElementById("fileSportsman").value = "";
        ansExcel.style.display="none"
    }

    getCoachesAndClub();
    function getCoachesAndClub() {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCoaches',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
        }
        $http(req).then(function (result) {
            $scope.coaches=result.data;
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

    var dropzone = document.getElementById("dropzone")

    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }

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

    function changeDropzone(name) {
        var droptext = document.getElementById("dropText");
        droptext.innerHTML = name.toString();
        var dropzone = document.getElementById("dropzone");
        dropzone.className = "dropzoneExcel"
        changeExcel.style.display = "block"
    }

    dropzone.ondrop = function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log("DROPPED");
        var files = e.dataTransfer.files, i, f;
        for (i = 0, f = files[i]; i !== files.length; ++i) {
            var reader = new FileReader(),
                name = f.name;
            changeDropzone(f.name);
            reader.onload = function (e) {
                var results,
                    data = e.target.result,
                    fixedData = fixdata(data),
                    workbook = XLSX.read(btoa(fixedData), {type: 'base64'}),
                    firstSheetName = workbook.SheetNames[0],
                    worksheet = workbook.Sheets[firstSheetName];
                results = XLSX.utils.sheet_to_json(worksheet);
                Excelcheck(results);
            };

            reader.readAsArrayBuffer(f);
        }
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
    $scope.submit = function (isValid) {
        if (isValid) {
            if (!$scope.coachReggister) {
                data = {
                    id: $scope.id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    phone: $scope.phone,
                    email: $scope.email,
                    birthdate: $filter('date')($scope.birthdate, "dd/MM/yyyy"),
                    address: $scope.address,
                    sportclub: $scope.sportclub.id,
                    sex: $scope.sex,
                    branch: $scope.branch,
                    idCoach: $scope.coach.id
                };
                console.log(data);
                registerUser(data);
            } else {
                data = {
                    id: $scope.id,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    phone: $scope.phone,
                    email: $scope.email,
                    birthdate: $filter('date')($scope.birthdate, "dd/MM/yyyy"),
                    address: $scope.address,
                    sportclub: $scope.sportclub.id,
                    branch: $scope.branch,
                    teamname: $scope.teamname
                };
                console.log(data);
                registerCoach(data);
            }
            $location.path("/home");
        }
    };
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
            if(error.status === 403)
                alert("משתמש עם הת.ז. שהוזנה קיים במערכת כבר");
            else
                alert("ארעה שגיאה");
            console.log(error);
        });


    }
    function registerUser(data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/registerSportman',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
            data: data
        };
        $http(req).then(function () {
            alert("הרישום בוצע בהצלחה");
        }, function (error) {
            if(error.status === 403)
                alert("משתמש עם הת.ז. שהוזנה קיים במערכת כבר");
            else
                alert("ארעה שגיאה");
            console.log(error)
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

    function Excelcheck(data) {
        var errorLines = new String();
        var ExcelOk = true;
        if (!$scope.coachReggister){
            for (let i=0; i<data.length;i++) {
                if (!validateSportsmanData.validData(data[i])) {
                    ExcelOk = false;
                    if(i < data.length-1)
                        errorLines = errorLines + (i + 1) + ", ";
                    else
                        errorLines = errorLines + (i + 1) + " ";
                }
            }
        }
        else {
            for (let i=0; i<data.length;i++)
            {
                if(!validateCoachData.validData(data[i])) {
                    ExcelOk = false;
                    if (i < data.length - 1)
                        errorLines = errorLines + (i + 1) + ", ";
                    else
                        errorLines = errorLines + (i + 1) + " ";
                }
            }
        }
            if (!ExcelOk)
            {
                console.log(errorLines);
                ansExcel.style.color="red";
                ansExcel.style.display = "block"
                ansExcel.innerHTML = "ישנה בעיה בשורות מספר "+errorLines+ "אנא תקן את הקובץ והעלה שוב";
            }

            else {
                console.log("register")
                registerExcelUser(data);
            }
            document.getElementById("fileSportsman").value = "";


    }

    function registerExcelUser(data) {
        if(!$scope.coachReggister)
            regUrl = serverUrl + '/private/registerSportman'
        else
            regUrl =serverUrl +'/private/registerCoach'

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
                if(i==data.length-1)
                    ansExcel.style.color="green";
                    ansExcel.style.display = "block"
                    ansExcel.innerHTML = "רישום בוצע בהצלחה";
            }, function (error) {
                console.log(error)
            });


        }

    }

    function clearFields(){
        /*$scope.id = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.phone
            email: $scope.email,
            birthdate: $filter('date')($scope.birthdate, "dd-MM-yyyy"),
            address: $scope.address,
            sportclub: $scope.sportclub.id,
            sex: $scope.sex,
            branch: $scope.branch,
            idCoach: $scope.coach.id

         */
    }
});


