app.service('toastNotificationService', function (toast) {
    /* className -> accepted values are alert-(success|danger|primary|info)
    documentation -> https://sibiraj.dev/angularjs-toast/
     */
    this.successNotification = function (message) {
        toast({
            duration  : 3000,
            position  : 'center',
            maxToast  : 2,
            message   : message,
            className : "alert-success"
        });
    };
    this.errorNotification = function (message) {
        toast({
            duration  : 3000,
            position  : 'center',
            maxToast  : 2,
            message   : message,
            className : "alert-danger"
        });
    };
    this.warningNotification = function (message) {
        toast({
            duration  : 3000,
            position  : 'center',
            maxToast  : 2,
            message   : message,
            className : "alert-primary"
        });
    };
});
