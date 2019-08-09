app.controller("registerController", function ($scope, $http, $window, $location, $rootScope,validateSportsmanData) {
    serverUrl = "http://localhost:3000"
    rowObj=new Object()
    $scope.errorExcel;


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
            //registerExcelUser(data);
        }
    }

    function registerExcelUser(data) {
            for (let i=0;i<data.length;i++){
                var req = {
                    method: 'POST',
                    url: serverUrl + '/private/registerSportman',
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


