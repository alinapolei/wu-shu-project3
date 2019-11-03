app.filter('categoryBySportsmanFilter', function(constants) {
    return function( items, user, toExclude) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if( user.age >= item.minAge &&
                (item.maxAge == null ||  user.age <= item.maxAge) &&
                (! constants.sexEnum.map(s => s.name).includes(item.sex) || user.sex == item.sex) &&
                (!toExclude || !toExclude.includes(item))) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});