app.controller("registrationStateController", function($scope, $window, $http, $location, $filter, commonFunctionsService, sportsmanService, competitionService, $routeParams, categoryService) {
    $scope.categoryForSportsman = [];
    $scope.currentCompetition = JSON.parse($routeParams.competition);
    getDisplayData();

    async function getDisplayData(){
        let result = await categoryService.getCategories();
        $scope.categories = result.data;
        $scope.categories.map((obj) => {
            obj.count = 0;
            return obj;
        });

        competitionService.getRegistrationState($scope.currentCompetition.idCompetition)
            .then(function (result) {
                $scope.usersCategories = result.data;
                $scope.usersCategories.forEach((usersCategory) =>{
                   usersCategory.users.map((user) => {
                       user.selectedCategory = $scope.categories.find(function (category) {
                           return category.id == user.category;
                       });
                       if(user.selectedCategory)
                           $scope.categories.find(function (category) {
                               return category.id == user.category;
                           }).count++;
                       return user;
                   });
            });
            }, function (error) {
                console.log(error)
            });
    }
    $scope.getAgeRange = categoryService.getAgeRange;

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

    $scope.changeCategory = function (user, oldCategoryId) {
        let newUserCategory = $scope.usersCategories.find(usersCategory => usersCategory.category.id === user.selectedCategory.id);
        if(!newUserCategory || !newUserCategory.users.map(u=>u.id).includes(user.id)){
            removeSportsmanFromoldCategory(oldCategoryId, user);
            setNewCategoryToUser(user);
            addSportsmanToNewCategory(newUserCategory, user);
            user.selectedCategory.count++;
            alert("הספורטאי הועבר קטגוריה");
        }
        else{
            alert("הספורטאי רשום כבר בקטגוריה שנבחרה");
            user.selectedCategory = $scope.categories.find(function (category) {
                return category.id == oldCategoryId;
            });
        }
    };
    function removeSportsmanFromoldCategory(oldCategoryId, user) {
        if (oldCategoryId != '') {
            $scope.categories.find(category => {
                return category.id == oldCategoryId
            }).count--;
            let oldUsersCategory = $scope.usersCategories.find(usersCategory => usersCategory.category.id == oldCategoryId);
            oldUsersCategory.users = commonFunctionsService.arrayRemove(oldUsersCategory.users, user);
            if (oldUsersCategory.users.length === 0)
                $scope.usersCategories = commonFunctionsService.arrayRemove($scope.usersCategories, oldUsersCategory);
        }
    }
    function addSportsmanToNewCategory(newUserCategory, user) {
        if (newUserCategory)
            newUserCategory.users.push(user);
        else
            $scope.usersCategories.push(
                {
                    category: user.selectedCategory,
                    users: new Array(user)
                }
            );
    }
    function setNewCategoryToUser(user) {
        let categorySportsman = $scope.categoryForSportsman.find(item => {
            return item.sportsmanId == user.id
        });
        if (categorySportsman) {
            categorySportsman.categoryId = user.selectedCategory.id;
        } else {
            $scope.categoryForSportsman.push(
                {
                    sportsmanId: user.id,
                    categoryId: user.selectedCategory.id
                }
            );
        }
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
    $scope.addCategoeyModal =function () {
        competitionService.addNewCategory()
    }

    function exportExcel() {
        let fileName = "רישום לתחרות " + $filter('date')($scope.currentCompetition.date, "dd/MM/yyyy");
        let resultJson = [];
        $scope.usersCategories.forEach((catUsers) =>{
            resultJson.push(getExcelObj(catUsers.category.name , '', '', ''));
            catUsers.users.forEach(user => {
                resultJson.push(getExcelObj('', user.id, user.firstname, user.lastname));
            });
        });

        var mystyle = {
            headers:true,
            column: {style:{Font:{Bold:"1"}}}
        };
        alasql('SELECT category as [קטגוריה], id as [תעודת זהות], firstname as [שם פרטי], lastname as [שם משפחה] INTO XLSX("' + fileName + '.xlsx",?) FROM ?', [mystyle, resultJson]);
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