app.service('confirmDialogService', function ($ngConfirm, $location, $route) {
    this.notSavedItems = function (event, next, saveFunction) {
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
                            saveFunction();
                            $location.path(next);
                        }
                    },
                    continueWithoutSaving: {
                        text: 'המשך ללא שמירה',
                        action: function () {
                            $location.path(next);
                        }
                    },
                    cancel: {
                        text: 'בטל',
                        action: function () {
                        }
                    }
                }
            });
        //}
    }
});