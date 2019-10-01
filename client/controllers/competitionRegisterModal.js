app.controller("competitionRegisterModal", function($scope, $window, $http,$routeParams, sportsmanService, pagingService,competitionService) {//$uibModalInstance, getId
    $scope.selectedNotRegisteredUsers = [];
    $scope.selectedRegisteredUsers = [];
    $scope.toRegisterUsers = [];
    $scope.toUnRegisterUsers = [];
    $scope.pager = {};

    setPage(1);
    getData();
    var regObj={
        compId: $routeParams.idComp,
        sportsmenIds :[]
    }

    // $scope.close=function () {
    //     $uibModalInstance.close()
    // };

    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        sportsmanService.getSportsmen(sportsmanService.buildConditionds($scope.searchText, null, null, null, null, $routeParams.idComp, '!%3D'))
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page, 14);
                $scope.notRegisteredUsers = result.data.sportsmen.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);

            }, function (error) {
                console.log(error)
            });
    }
    function getData(){
        sportsmanService.getSportsmen(sportsmanService.buildConditionds('', null, null, null, null, $routeParams.idComp, '%3D%3D'))
            .then(function (result) {
                $scope.registeredUsers = result.data.sportsmen;
            }, function (error) {
                console.log(error)
            });
    }

    $scope.selectNotRegistered = function (user) {
        if($scope.selectedNotRegisteredUsers.includes(user))
            $scope.selectedNotRegisteredUsers = arrayRemove($scope.selectedNotRegisteredUsers, user);
        else
            $scope.selectedNotRegisteredUsers.push(user);
    };
    $scope.selectRegistered = function (user){
        if($scope.selectedRegisteredUsers.includes(user))
            $scope.selectedRegisteredUsers = arrayRemove($scope.selectedRegisteredUsers, user);
        else
            $scope.selectedRegisteredUsers.push(user);
    };
    $scope.registerSelected = function () {
        $scope.toRegisterUsers = $scope.toRegisterUsers.concat($scope.selectedNotRegisteredUsers.map(selected => selected.id));
        $scope.registeredUsers = $scope.registeredUsers.concat($scope.selectedNotRegisteredUsers);
        $scope.selectedNotRegisteredUsers.forEach(selected => {
            if($scope.toUnRegisterUsers.includes(selected.id))
                $scope.toUnRegisterUsers = arrayRemove($scope.toUnRegisterUsers, selected.id);
            $scope.notRegisteredUsers = arrayRemove($scope.notRegisteredUsers, selected);
        });
        $scope.selectedNotRegisteredUsers = [];
    };
    $scope.unRegisterSelected = function () {
        $scope.notRegisteredUsers = $scope.notRegisteredUsers.concat($scope.selectedRegisteredUsers);
        $scope.selectedRegisteredUsers.forEach(selected =>{
            if($scope.toRegisterUsers.includes(selected.id))
                $scope.toRegisterUsers = arrayRemove($scope.toRegisterUsers, selected.id);
            else
                $scope.toUnRegisterUsers.push(selected.id);
            $scope.registeredUsers = arrayRemove($scope.registeredUsers, selected);
        });
        $scope.selectedRegisteredUsers = [];
    };


    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }

    function makeJsonToReg(rowObj) {
        for (let  i =0 ;i<rowObj.length;i++)
            regObj.sportsmenIds.push(parseInt(rowObj[i]["ת.ז ספורטאי"]))
    }


    function setErrorLable(errorLines) {
        var ansExcel =document.getElementById('ansExcel');
        ansExcel.style.color="red";
        ansExcel.style.display = "block"
        ansExcel.innerHTML = "ישנה בעיה בשורות מספר "+errorLines+ "אנא תקן את הקובץ והעלה שוב";
    }

    function Excelcheck(data) {
        var errorLines = new String();
        var ExcelOk = true;
        for (let i = 0; i < data.length; i++) {
            if (!competitionService.checkExcel(data[i])) {
                ExcelOk = false;
                if (i < data.length - 1)
                    errorLines = errorLines + (i + 1) + ", ";
                else
                    errorLines = errorLines + (i + 1) + " ";
            }
        }
        if (ExcelOk) {
            console.log("ok")
            return true;
        } else {
            setErrorLable(errorLines)
            return false;
        }
    }

    $scope.ExcelExport = function (event) {
        var ansExcel =document.getElementById('ansExcel');
        ansExcel.style.display='none';
        regObj.sportsmenIds=[]
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var fileData = reader.result;
            var wb = XLSX.read(fileData, {type: 'binary'});
            wb.SheetNames.forEach(async function (sheetName) {
                rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            })
            //work with RowOBJ
            makeJsonToReg(rowObj);
            if(Excelcheck(regObj.sportsmenIds)) {
                competitionService.regSportsmanCompetition(regObj)
                    .then(function (result) {
                        //$uibModalInstance.close();
                        alert("הרישום בוצע בהצלחה");
                    }, function (error) {
                        console.log(error)
                    });
            }
            else
                alert("error")
        };


        reader.readAsBinaryString(input.files[0]);
    };



    $scope.register = function () {
        competitionService.registerSportsmenToCompetition($routeParams.idComp, $scope.toRegisterUsers, $scope.toUnRegisterUsers)
            .then(function (result) {
                //$uibModalInstance.close();
                alert("הרישום בוצע בהצלחה");
            }, function (error) {
                console.log(error)
            });
    }
});
