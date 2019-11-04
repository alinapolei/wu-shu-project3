app.filter('categoryBySportsmanFilter', function(constants) {
    return function( items, user, toExclude, isIncludeMinAge) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if( (!isIncludeMinAge || user.age >= item.minAge) &&
                (item.maxAge == null ||  user.age <= item.maxAge) &&
                (! constants.sexEnum.map(s => s.name).includes(item.sex) || user.sex == item.sex) &&
                (!toExclude || !toExclude.includes(item))) {
                filtered.push(item);
            }
        });
        return filtered.sort(function (obj1, obj2) {
            return obj1.minAge !== obj2.minAge ? (obj1.minAge - obj2.minAge) : (obj1.maxAge !== null && obj2.maxAge !== null ? obj1.maxAge - obj2.maxAge : 0)
        });
    };
});