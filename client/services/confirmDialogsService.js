app.service('confirmDialogService', function ($ngConfirm, $location, $route, $rootScope) {
    this.notSavedItems = function (event, next, saveFunction, isValidForm, modalOpen) {
        if (event)
            event.preventDefault();
        $ngConfirm({
            title: 'השינויים לא נשמרו',
            content: 'האם לשמור את השינויים שבוצעו?',
            type: 'red',
            typeAnimated: true,
            buttons: {
                save: {
                    text: 'שמור',
                    btnClass: 'btn-red',
                    action: function () {
                        if (isValidForm === false)
                            $rootScope.isChangingLocationFirstTime = true;
                        else {
                            isValidForm ? saveFunction(isValidForm) : saveFunction();
                            $rootScope.isChangingLocationFirstTime = false;
                            $route.reload();
                            $location.path(next);
                        }
                    }
                },
                continueWithoutSaving: {
                    text: 'המשך ללא שמירה',
                    action: function () {
                        $rootScope.isChangingLocationFirstTime = false;
                        if(modalOpen) modalOpen.close();
                        $route.reload();
                        $location.path(next);
                    }
                },
                cancel: {
                    text: 'בטל',
                    action: function () {
                        $rootScope.isChangingLocationFirstTime = true;
                    }
                }
            }
        });
        //}
    }
});