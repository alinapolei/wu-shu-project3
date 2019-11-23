app.service('categoryService', function($window, $http, constants) {
    this.getCategories = function(){
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/commonCoachManager/getCategories',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    };

    this.getAgeRange = function(category){
        if(category.maxAge == null)
            return category.minAge != 0 ? category.minAge + "+" : "";
        else
            return category.minAge + "-" + category.maxAge;
    };
});