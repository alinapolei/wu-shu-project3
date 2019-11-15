app.controller("registrationStateController",function($scope, $rootScope, $window, $http, $location, $filter, commonFunctionsService, sportsmanService, competitionService, $routeParams, categoryService, confirmDialogService, toastNotificationService,constants) {
    $scope.categoryForSportsman = [];
    $scope.selectedSportsmenToMerge = [];
    $scope.currentCompetition = JSON.parse($routeParams.competition);
    getDisplayData();
    let downloadExcelLink = document.getElementById("downRegistrationCompState")

    async function getDisplayData(){
        await getCategories();

        competitionService.getRegistrationState($scope.currentCompetition.idCompetition)
            .then(function (result) {
                $scope.usersCategories = result.data;
                setSelectedCategories();
            }, function (error) {
                console.log(error)
            });
    }
    function setSelectedCategories(){
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
    }
    async function getCategories(){
        let result = await categoryService.getCategories();
        $scope.categories = result.data;
        $scope.categories.map((obj) => {
            obj.count = 0;
            return obj;
        });
    }
    $scope.getAgeRange = categoryService.getAgeRange;

    $scope.submit = function () {
        competitionService.setCategoryRegistration($scope.currentCompetition.idCompetition, $scope.categoryForSportsman)
            .then(function(result){
                $scope.isSaved = true;
                toastNotificationService.successNotification("השינויים נשמרו בהצלחה");
            }, function (error) {
                console.log(error);
            })
    };
    $rootScope.isChangingLocationFirstTime = true;
    $scope.$on('$routeChangeStart', function(event, newRoute, oldRoute) {
        if(changesNotSaved())
            confirmDialogService.notSavedItems(event, $location.path(), $scope.submit);
    });
    function changesNotSaved(){
        return $scope.categoryForSportsman.length > 0 && !$scope.isSaved && $rootScope.isChangingLocationFirstTime;
    }

    $scope.changeCategory = function (user, oldCategoryId) {
        if(updateUserCategories(user, oldCategoryId))
            toastNotificationService.successNotification("הספורטאי הועבר קטגוריה");
        else
            toastNotificationService.warningNotification("הספורטאי רשום כבר בקטגוריה שנבחרה");
    };
    function updateUserCategories(user, oldCategoryId) {
        let newUserCategory = $scope.usersCategories.find(usersCategory => usersCategory.category.id === user.selectedCategory.id);
        if(!newUserCategory || !newUserCategory.users.map(u=>u.id).includes(user.id)){
            removeSportsmanFromoldCategory(oldCategoryId, user);
            console.log(oldCategoryId)
            setNewCategoryToUser(user, oldCategoryId);
            addSportsmanToNewCategory(newUserCategory, user);
            user.selectedCategory.count++;
            return true;
        }
        else{
            user.selectedCategory = $scope.categories.find(function (category) {
                return category.id == oldCategoryId;
            });
            return false;
        }
    }
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
    function setNewCategoryToUser(user, oldCategoryId) {
        let categorySportsman = $scope.categoryForSportsman.find(item => {
            return item.sportsmanId == user.id && item.oldCategoryId == oldCategoryId;
        });
        if (categorySportsman) {
            categorySportsman.categoryId = user.selectedCategory.id;
        } else {
            $scope.categoryForSportsman.push(
                {
                    sportsmanId: user.id,
                    categoryId: user.selectedCategory.id,
                    oldCategoryId: parseInt(oldCategoryId)
                }
            );
        }
    }

    $scope.selectSportsman = function(user, categoryId){
        let selectedUser = $scope.selectedSportsmenToMerge.find(u => u.id == user.id);
        if(selectedUser !== undefined) {
            if(selectedUser.category !== categoryId)
                toastNotificationService.warningNotification("הספורטאי מסומן כבר בקטגוריה אחרת");
            else
                $scope.selectedSportsmenToMerge = commonFunctionsService.arrayRemove($scope.selectedSportsmenToMerge, selectedUser);
            user.isChecked = false;
        }
        else
            $scope.selectedSportsmenToMerge.push(user);
    };
    $scope.mergeSelected = function(){
        let maxCategory = $scope.selectedSportsmenToMerge.map(u => u.selectedCategory).reduce(function(obj1, obj2) {
            if (obj1.maxAge === null && obj2.maxAge === null)
                return (obj1.minAge < obj2.minAge) ? obj2 : obj1;
            if (obj1.maxAge === null)
                return obj1;
            if (obj2.maxAge === null)
                return obj2;
            return (obj1.maxAge < obj2.maxAge) ? obj2 : obj1
        });
        let isDuplicate = false;
        $scope.selectedSportsmenToMerge.forEach(user => {
           user.selectedCategory = maxCategory;
           user.isChecked = false;
           isDuplicate = isDuplicate || !updateUserCategories(user, user.category);
        });
        $scope.selectedSportsmenToMerge = [];
        toastNotificationService.successNotification("הספורטאיים מוזגו לקטגוריה " + maxCategory.name + " " + categoryService.getAgeRange(maxCategory));
    };
    $scope.removeSportsmanFromCategory = function(fromCategory, user){
        confirmDialogService.askQuestion("האם אתה בטוח שאתה רוצה לבטל את הרישום של הספורטאי לקטגוריה" + fromCategory.name + "?", function () {
            removeSportsmanFromoldCategory(fromCategory.id, user);
            $scope.$apply();
        });
    };

    $scope.closeRegistration = function() {
        confirmDialogService.askQuestion("האם אתה בטוח שברצונך לסגור את הרישום לתחרות?", function () {
            competitionService.closeRegistration($scope.currentCompetition.idCompetition)
                .then(function (result) {
                    toastNotificationService.successNotification("הרישום נסגר בהצלחה");
                    $location.path('/competitions/registerToCompetition');
                }, function (error) {
                    console.log(error);
                })
        });
    }
    $scope.exportRegistrationState = function () {
        if($scope.categoryForSportsman.length > 0) {
            var res = confirm("שים לב השינויים לא נשמרו.\nהאם להמשיך את הייצוא?")
            if (res == false)
                return;
        }
        exportExcel();
    };
    $scope.addCategoeyModal =function (event) {
        competitionService.addNewCategory(finishAddingCategory);
    };
    async function finishAddingCategory() {
        await getCategories();
        setSelectedCategories();
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

    $scope.downloadExcelRegistrationState = function () {
        //let date =($filter('date')($scope.currentCompetition.date, "dd/MM/yyyy"));
        let date =($scope.currentCompetition.date)
        console.log(date)
        let token =$window.sessionStorage.getItem('token')
        let url = constants.serverUrl + '/downloadExcelCompetitionState/'+token+'/'+$scope.currentCompetition.idCompetition+'/'+date;
        downloadExcelLink.setAttribute('href', url);
        downloadExcelLink.click();
    }
});
