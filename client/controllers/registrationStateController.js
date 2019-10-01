app.controller("registrationStateController", function($scope, $window, $http, $location, $filter, sportsmanService, competitionService, $routeParams) {
    $scope.categoryForSportsman = [];
    $scope.currentCompetition = JSON.parse($routeParams.competition);
    getDisplayData();

    async function getDisplayData(){
        let result = await sportsmanService.getCategories();
        $scope.categories = result.data;
        $scope.categories.map((obj) => {
            obj.count = 0;
            return obj;
        });

        competitionService.getRegistrationState($scope.currentCompetition.idCompetition)
            .then(function (result) {
                $scope.users = result.data;
                $scope.users.map((obj) => {
                    obj.selectedCategory = $scope.categories.find(function (item) {
                        return item.id == obj.category;
                    });
                    if(obj.selectedCategory)
                        $scope.categories.find(function (item) {
                            return item.id == obj.category;
                        }).count++;
                    return obj;
                })
            }, function (error) {
                console.log(error)
            });
    }

    $scope.submit = function () {
        competitionService.setCategoryRegistration($scope.currentCompetition.idCompetition, $scope.categoryForSportsman)
            .then(function(result){
                var res = confirm("השינויים נשמרו בהצלחה.\nהאם ברצונך לייצא את מצב הרישום?")
                if (res == true) {
                    exportExcel();
                }
                $location.path('/competitions/registerToCompetition');
            }, function (error) {
                console.log(error);
            })
    };

    $scope.addChange = function (user, oldCategoryId) {
        let categorySportsman = $scope.categoryForSportsman.find(item => {return item.sportsmanId == user.id});
        if(oldCategoryId != '')
            $scope.categories.find(item => {return item.id == oldCategoryId}).count--;
        if(categorySportsman){
            categorySportsman.categoryId = user.selectedCategory.id;
        }
        else {
            $scope.categoryForSportsman.push(
                {
                    sportsmanId: user.id,
                    categoryId: user.selectedCategory.id
                }
            );
        }
        user.selectedCategory.count++;
    }

    $scope.closeRegistration = function() {
        var res= confirm("האם אתה בטוח שברצונך לסגור את הרישום לתחרות?")
        if(res==true) {
            competitionService.closeRegistration($scope.currentCompetition.idCompetition)
                .then(function (result) {
                    alert("הרישום נסגר בהצלחה");
                    $location.path('/competitions/registerToCompetition');
                }, function (error) {
                    console.log(error);
                })
        }
    }
    $scope.exportRegistrationState = function () {
        if($scope.categoryForSportsman.length > 0) {
            var res = confirm("שים לב השינויים לא נשמרו.\nהאם להמשיך את הייצוא?")
            if (res == false)
                return;
        }
        exportExcel();
    };
    function exportExcel() {
        let fileName = "רישום לתחרות " + $filter('date')($scope.currentCompetition.date, "dd/MM/yyyy");
        let excelJson = [];
        let sortedUsers = $scope.users.slice();
        sortedUsers.sort(
            function(obj1, obj2){
                let x = obj1.selectedCategory ? obj1.selectedCategory.id : Number.POSITIVE_INFINITY;
                let y = obj2.selectedCategory ? obj2.selectedCategory.id : Number.POSITIVE_INFINITY;
                return x-y;
            });
        let usedCategories = new Set(sortedUsers.map(user => user.selectedCategory ? user.selectedCategory.name : ''));
        let i=0;
        usedCategories.forEach(category => {
            excelJson.push(getExcelObj(category != '' ? category : 'ללא קטגוריה', '', '', ''));
            while(i<sortedUsers.length && category === (sortedUsers[i].selectedCategory ? sortedUsers[i].selectedCategory.name : '')){
                excelJson.push(getExcelObj('', sortedUsers[i].id, sortedUsers[i].firstname, sortedUsers[i].lastname));
                i++;
            }
        });

        var mystyle = {
            headers:true,
            column: {style:{Font:{Bold:"1"}}}
        };
        alasql('SELECT category as [קטגוריה], id as [תעודת זהות], firstname as [שם פרטי], lastname as [שם משפחה] INTO XLSX("' + fileName + '.xlsx",?) FROM ?', [mystyle, excelJson]);
    }
    function getExcelObj(category, id, firstname, lastname) {
        return {
            category: category,
            id: id,
            firstname: firstname,
            lastname: lastname
        }
    }

});

app.filter('categoryFilter', function() {
    return function( items, user) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if( user.age >= item.minAge && (item.maxAge == null ||  user.age <= item.maxAge) && user.sex == item.sex) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});