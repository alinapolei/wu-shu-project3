app.controller("competitionRegisterModal", function($scope, $window, $uibModalInstance, $http,getId, sportsmanService, pagingService,competitionService) {
    $scope.selectedUsers = [];
    $scope.pager = {};
    setPage(1);
    var regObj={
        compId: getId,
        sportsmenIds :[]
    }


    $scope.close=function () {
        $uibModalInstance.close()
    };

    $scope.setPage = function(page){
        setPage(page);
    };

    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        sportsmanService.getSportsmen(sportsmanService.buildConditionds($scope.searchText, null, null, null, null, getId))
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page, 14);
                $scope.users = result.data.sportsmen.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
            }, function (error) {
                console.log(error)
            });
    }

    $scope.select = function (id) {
        if($scope.selectedUsers.includes(id))
            $scope.selectedUsers = arrayRemove($scope.selectedUsers, id);
        else
            $scope.selectedUsers.push(id);
    };

    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }

    function makeJsonToReg(rowObj) {
        for (let  i =0 ;i<rowObj.length;i++)
            regObj.sportsmenIds.push(parseInt(rowObj[i].sportmanID))
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
            //work with RowOBJ
            makeJsonToReg(rowObj);
            competitionService.regSportsmanCompetition(regObj)
                .then(function (result) {
                $uibModalInstance.close();
                alert("הרישום בוצע בהצלחה");
                }, function (error) {
                    console.log(error)
                });
        };
        reader.readAsBinaryString(input.files[0]);
    };



    $scope.register = function () {
        competitionService.registerSportsmenToCompetition(getId, $scope.selectedUsers)
            .then(function (result) {
                $uibModalInstance.close();
                alert("הרישום בוצע בהצלחה");
            }, function (error) {
                console.log(error)
            });
    }
});
