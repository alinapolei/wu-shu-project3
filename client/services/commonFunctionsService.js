app.service('commonFunctionsService', function() {
    this.arrayRemove = function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }
});