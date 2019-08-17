app.controller("registerController", function ($scope, $http, $window, $location, $rootScope, validateSportsmanData) {
    serverUrl = "http://localhost:3000"
    $scope.currentDate = new Date();
    rowObj = new Object()
    $scope.coaches = new Array()
    $scope.clubs = new Array();
    var changeExcel = document.getElementById("changeExcel")

    changeExcel.onclick = function (e) {
        e.preventDefault()
        dropzone.className = "dropzone"
        changeExcel.style.display = "none"
        document.getElementById("dropText").innerHTML = "גרור קובץ או לחץ על העלאת קובץ";
        document.getElementById("fileSportsman").value = "";

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
            for (let i = 0; i < result.data.length; i++)
                $scope.coaches.push(result.data[i].firstname + " " + result.data[i].lastname)

        }, function (error) {
            console.log(error)
        });

        var req = {
            method: 'POST',
            url: serverUrl + '/private/getClubs',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
        }
        $http(req).then(function (result) {
            for (let i = 0; i < result.data.length; i++)
                $scope.clubs.push(result.data[i].name)

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
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader(),
                name = f.name;
            changeDropzone(f.name)
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
    }
    dropzone.ondragover = function () {
        this.className = 'dropzone dragover'
        return false;
    }
    dropzone.ondragleave = function () {
        this.className = 'dropzone'
        return false;
    }


    $scope.submit = function (isValid) {
        if(isValid) {
            console.log("submit is clicked")
            /*if (validateSportsmanData(data)) {
                console.log("register user")
                //registerUser
            }*/
        }
    };

    function registerUser(data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/registerSportman',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
            data: data
        }
        $http(req).then(function () {
        }, function (error) {
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
        var eroorLine = new String();
        var ExcelOk = true;
        //for (let i=0; i<data.length;i++)
        /*if(!validateSportsmanData.validData(data[i]))
        {
            console.log(data[i])
            ExcelOk=false;
            eroorLine =eroorLine+ (i+1)+" ";
        }

         */
        if (!ExcelOk)
            console.log(eroorLine);
        else {
            console.log("register")
            registerExcelUser(data);

            document.getElementById("fileSportsman").value = "";

        }
    }

    function registerExcelUser(data) {
        regUrl = serverUrl + '/private/registerSportman'
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
            }, function (error) {
                console.log(error)
            });
        }

    }
})


