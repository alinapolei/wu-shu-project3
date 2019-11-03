app.controller("competitionRegisterModal", function($scope, $rootScope, $window, $http,$routeParams, $filter, $location, sportsmanService, clubService, pagingService,competitionService,excelService) {//$uibModalInstance, getId
    $scope.selectedNotRegisteredUsers = [];
    $scope.selectedRegisteredUsers = [];
    $scope.toRegisterUsers = [];
    $scope.toUnRegisterUsers = [];
    $scope.pager = {};
    let dropZoneRegCompetition = document.getElementById("dropZoneRegCompetition")


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

        sportsmanService.getSportsmen(sportsmanService.buildConditionds($scope.searchText, null, null, null, null, null, null))
            .then(function (result) {
                let totalCount = result.data.totalCount;

                $scope.pager = pagingService.GetPager(totalCount, page, 14);
                $scope.notRegisteredUsers = result.data.sportsmen.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                console.log($scope.notRegisteredUsers)

            }, function (error) {
                console.log(error)
            });
    }
    function getData(){
        competitionService.getRegistrationState($routeParams.idComp)
            .then(function (result) {
                $scope.registeredUsers = result.data;
            }, function (error) {
                console.log(error)
            });

        clubService.getClubs()
            .then(function (result) {
                $scope.clubs = result.data;
            }, function (error) {
                console.log(error)
            });

        sportsmanService.getCategories()
            .then(function (result) {
                $scope.categories = result.data;
            },function (error) {
                console.log(error);
            })
    }

    $scope.selectNotRegistered = function (user) {
        if($scope.selectedNotRegisteredUsers.includes(user))
            $scope.selectedNotRegisteredUsers = $rootScope.arrayRemove($scope.selectedNotRegisteredUsers, user);
        else
            $scope.selectedNotRegisteredUsers.push(user);
    };
    $scope.selectRegistered = function (user){
        if($scope.selectedRegisteredUsers.includes(user))
            $scope.selectedRegisteredUsers = $rootScope.arrayRemove($scope.selectedRegisteredUsers, user);
        else
            $scope.selectedRegisteredUsers.push(user);
    };
    $scope.filterSelectedLists = function(){
        // $filter('sportsmenByCategoryFilter')($scope.selectedRegisteredUsers, $scope.selectedCategory);
        // $filter('sportsmenByCategoryFilter')($scope.selectedNotRegisteredUsers, $scope.selectedCategory);
        $scope.selectedRegisteredUsers = [];
        $scope.selectedNotRegisteredUsers = [];
    };
    $scope.registerSelected = function () {
        if($scope.selectedCategory) {
            $scope.toRegisterUsers = $scope.toRegisterUsers.concat($scope.selectedNotRegisteredUsers.map(selected => selected.id).map(id => {
                return {id: id, category: $scope.selectedCategory.id}
            }));
            let categoryUsers = $scope.registeredUsers.find(usersCategory => usersCategory.category.id == $scope.selectedCategory.id);
            if(categoryUsers)
                $scope.registeredUsers.find(usersCategory => usersCategory.category.id == $scope.selectedCategory.id).users = categoryUsers.users.concat($scope.selectedNotRegisteredUsers);
            else
                $scope.registeredUsers = $scope.registeredUsers.concat({category: $scope.selectedCategory, users: $scope.selectedNotRegisteredUsers});
            $scope.selectedNotRegisteredUsers.forEach(selected => {
                let registration = $scope.toUnRegisterUsers.find(item => item.id === selected.id);
                if (registration)
                    $scope.toUnRegisterUsers = $rootScope.arrayRemove($scope.toUnRegisterUsers, registration);
                $scope.notRegisteredUsers = $rootScope.arrayRemove($scope.notRegisteredUsers, selected);
            });
            $scope.selectedNotRegisteredUsers = [];
        }
    };
    $scope.unRegisterSelected = function () {
        $scope.notRegisteredUsers = $scope.notRegisteredUsers.concat($scope.selectedRegisteredUsers);
        $scope.selectedRegisteredUsers.forEach(selected =>{
            let registration = $scope.toRegisterUsers.find(item => item.id === selected.id);
            if(registration)
                $scope.toRegisterUsers = $rootScope.arrayRemove($scope.toRegisterUsers, registration);
            else
                $scope.toUnRegisterUsers.push({id: selected.id, category: $scope.selectedCategory.id});
            let users = $scope.registeredUsers.find(usersCategory => usersCategory.category.id == $scope.selectedCategory.id).users;
            $scope.registeredUsers.find(usersCategory => usersCategory.category.id == $scope.selectedCategory.id).users = $rootScope.arrayRemove(users, selected);
        });
        $scope.selectedRegisteredUsers = [];
    };

    function makeJsonToReg(rowObj) {
        for (let  i =0 ;i<rowObj.length;i++)
            regObj.sportsmenIds.push(parseInt(rowObj[i]["ת.ז ספורטאי"]))
    }



    $scope.register = function () {
        competitionService.registerSportsmenToCompetition($routeParams.idComp, $scope.toRegisterUsers, $scope.toUnRegisterUsers)
            .then(function (result) {
                alert("הרישום בוצע בהצלחה");
                $location.path("/competitions/registerToCompetition");
            }, function (error) {
                console.log(error)
            });
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



//////// filters //////////
app.filter('sportsmenByCategoryFilter', function(constants) {
    return function(items, category, registered) {
        if(category) {
            var filtered = [];
            angular.forEach(items, function (item) {
                let categorySportsman = registered.find(cs => cs.category.id == category.id);
                let isAlreadyRegistered = categorySportsman? categorySportsman.users.map(s => s.id).includes(item.id) : false;
                if (!isAlreadyRegistered && category.minAge <= item.age && (category.maxAge == null || category.maxAge >= item.age) && (!constants.sexEnum.map(s => s.name).includes(category.sex) || category.sex == item.sex)) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
        return [];
    };
});
app.filter('sportsmenCategoriesByCategoryFilter', function(constants) {
    return function(items, category) {
        if(category) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.category.id == category.id) {
                    filtered = item.users;
                }
            });
            return filtered;
        }
    };
});
app.filter('sportsmenByClubFilter', function(constants) {
    return function(items, club) {
        if(club) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.sportclub === club.id) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
        else
            return items;
    };
});
