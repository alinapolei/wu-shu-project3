app.controller("registerController", function ($scope, $http, $window, $location, $rootScope,validateSportsmanData) {
    serverUrl = "http://localhost:3000"
    rowObj=new Object()





    var dropzone=document.getElementById("dropzone")
    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
        o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
        return o;
    }
    function workbook_to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(roa.length > 0){
                result[sheetName] = roa;
            }
        });
        return result;
    }

    dropzone.ondrop=function(e){
            e.stopPropagation();
            e.preventDefault();
            console.log("DROPPED");
            var files = e.dataTransfer.files, i, f;
            for (i = 0, f = files[i]; i != files.length; ++i) {
                var reader = new FileReader(),
                    name = f.name;
                    reader.onload = function(e) {
                    var results,
                        data = e.target.result,
                        fixedData = fixdata(data),
                        workbook=XLSX.read(btoa(fixedData), {type: 'base64'}),
                        firstSheetName = workbook.SheetNames[0],
                        worksheet = workbook.Sheets[firstSheetName];
                    results=XLSX.utils.sheet_to_json(worksheet);
                    console.log(results);
                };
                reader.readAsArrayBuffer(f);
            }
        }
    dropzone.ondragover=function(){
        this.className='dropzone dragover'
        return false;
    }
    dropzone.ondragleave =function(){
        this.className='dropzone'
        return false;
    }
    var uploadFiles= function(file){
            var formData= new formData(),
                xhr=new XMLHttpRequest(),
                x;
            for(x=0;x<file.length;x++){

            }
    }




    $scope.submit=function(){
        data={
            id: $scope.id,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            phone: $scope.phone,
            address: $scope.address,
            sportclub: $scope.sportclub,
            birthdate: $scope.birthdate,
            idCoach: $scope.idCoach
        }



        if(validateSportsmanData(data)) {
            console.log("register user")
            //registerUser(data);
        }

    }


    function registerUser(data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/registerSportman',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
            },
            data:{
                Id: data.id ,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                email: data.email,
                address : data.address,
                sportclub: data.sportclub,
                coachId :data.coachId,
                birthdate: data.birthdate
            }
        }
        $http(req).then(function(){
        }, function(error){console.log(error)});

    }


    $scope.ExcelExport=  function (event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
            var fileData = reader.result;
            var wb = XLSX.read(fileData, {type : 'binary'});
            wb.SheetNames.forEach(async function(sheetName){
                rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            })
            //work with RowOBJ
            Excelcheck(rowObj);
        };
        reader.readAsBinaryString(input.files[0]);
    };

    function Excelcheck(data) {
        var eroorLine =new String();
        var ExcelOk=true;
        for (let i=0; i<data.length;i++)
            if(!validateSportsmanData.validData(data[i]))
            {
                ExcelOk=false;
                eroorLine =eroorLine+ (i+1)+" ";
            }
        if(!ExcelOk)
            console.log(eroorLine);
        else {
           console.log("register")
           document.getElementById("fileSportsman").value = "";
            //registerExcelUser(data);
        }
    }

    function registerExcelUser(data) {
        if($scope.reigisterCoach)
            regUrl=serverUrl + '/private/registerCoach'
        else
            regUrl=serverUrl + '/private/registerSportman'
            for (let i=0;i<data.length;i++){
                var req = {
                    method: 'POST',
                    url: regUrl,
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem('token') //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWNjZXNzIjoxLCJpYXQiOjE1NjUzNjY0MTUsImV4cCI6MTU2NTQ1MjgxNX0.R3hXyBVbiXfgKy9wOi7Y1V0YjZXMQ4jGIxWbHeQkuqI'
                    },
                    data:{
                        Id: data[0].id ,
                        firstname: data[0].firstname,
                        lastname: data[0].lastname,
                        phone: data[0].phone,
                        email: data[0].email,
                        address : data[0].address,
                        sportclub: data[0].sportclub,
                        coachId :data[0].coachId,
                        birthdate: data[0].birthdate
                    }
                }
                $http(req).then(function(){
                }, function(error){console.log(error)});
            }

    }
})


