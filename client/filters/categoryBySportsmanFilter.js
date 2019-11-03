app.filter('categoryBySportsmanFilter', function(constants) {
    return function( items, user) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if( user.age >= item.minAge && (item.maxAge == null ||  user.age <= item.maxAge) && (! constants.sexEnum.map(s => s.name).includes(item.sex) || user.sex == item.sex)) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});