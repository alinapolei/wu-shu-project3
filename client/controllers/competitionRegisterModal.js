app.controller("competitionRegisterModal", function($scope, $rootScope, $window, $http,$routeParams, $filter, $location, sportsmanService, clubService, pagingService,competitionService,excelService, commonFunctionsService,constants, categoryService) {
    $scope.selectedNotRegisteredUsers = [];
    $scope.selectedRegisteredUsers = [];
    $scope.toRegisterUsers = [];
    $scope.toUnRegisterUsers = [];
    $scope.pager = {};
    let dropZoneRegCompetition = document.getElementById("dropZoneRegCompetition")
    let downExcelRegCompetition = document.getElementById("downExcelRegCompetition")

    setPage(1);
    getData();
    var regObj={
        compId: $routeParams.idComp,
        sportsmenIds :[]
    }

    $scope.setPage = function(page){
        setPage(page);
    };
    function setPage(page) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.totalPages > 0)) {
            return;
        }

        //$scope.pager = pagingService.GetPager(allUsers.length, page);

        sportsmanService.getSportsmen(sportsmanService.buildConditionds($scope.searchText, null, $scope.selectedClub, null, null, $routeParams.idComp, null))
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page);
                $scope.users = pagingService.sliceData(sportsmanService.formatSportsmanCategoriesList(result.data.sportsmen, $scope.categories), $scope.pager.startIndex, $scope.pager.endIndex)

            }, function (error) {
                console.log(error)
            });
    }
    async function getData(){
        clubService.getClubs()
            .then(function (result) {
                $scope.clubs = result.data;
            }, function (error) {
                console.log(error)
            });

        let result = await categoryService.getCategories();
        $scope.categories = result.data;
        setPage(1);
    }
    $scope.getAgeRange = categoryService.getAgeRange;

    function makeJsonToReg(rowObj) {
        for (let  i =0 ;i<rowObj.length;i++)
            regObj.sportsmenIds.push(parseInt(rowObj[i]["ת.ז ספורטאי"]))
    }

    $scope.addToToRegisterUsers = function(user, newCategory){
        let registration = $scope.toUnRegisterUsers.find(item => item.id === user.id && item.category === newCategory.id);
        if (registration)
            $scope.toUnRegisterUsers = commonFunctionsService.arrayRemove($scope.toUnRegisterUsers, registration);
        else
            $scope.toRegisterUsers.push({id: user.id, category: newCategory.id});
    };
    $scope.addToToUnRegisterUsers = function(user, oldCategory){
        let registration = $scope.toRegisterUsers.find(item => item.id === user.id && item.category === oldCategory.id);
        if(registration)
            $scope.toRegisterUsers = commonFunctionsService.arrayRemove($scope.toRegisterUsers, registration);
        else
            $scope.toUnRegisterUsers.push({id:user.id, category:oldCategory.id});
        user.selectedCategories = commonFunctionsService.arrayRemove(user.selectedCategories, oldCategory);
        if(user.selectedCategories.length === 0)
            user.selectedCategories.push(undefined);
    };

    $scope.register = function () {
        competitionService.registerSportsmenToCompetition($routeParams.idComp, $scope.toRegisterUsers, $scope.toUnRegisterUsers)
            .then(function (result) {
                alert("הרישום בוצע בהצלחה");
                $location.path("/competitions/registerToCompetition");
            }, function (error) {
                console.log(error)
            });
    }

    $scope.downloadExcelRegCompetition = function (){
        let token =$window.sessionStorage.getItem('token')
        let url = constants.serverUrl + '/downloadExcelFormatRegisterToCompetition/'+token;
        downExcelRegCompetition.setAttribute('href', url);
        downExcelRegCompetition.click();
    }

/*Drop zone */
    dropZoneRegCompetition.ondrop = function (e) {
        excelService.dropZoneDropFile(e, function (res) {
            changeDropZone(res.fileName)
            let data = {
                compId: $routeParams.idComp,
                sportsman :res.result
            }
            competitionService.registerExcelUsers(data)
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
            console.log(res.result)
            //competitionService.registerUsers(res.result);
        })
    };

    function changeDropZone(name) {
        var droptext = document.getElementById("dropText");
        droptext.innerHTML = name.toString();
        dropZoneRegCompetition.className = "dropzoneExcel"
    }

    dropZoneRegCompetition.ondragover = function () {
        this.className = 'dropzone dragover';
        return false;
    };
    dropZoneRegCompetition.ondragleave = function () {
        this.className = 'dropzone';
        return false;
    };
});
