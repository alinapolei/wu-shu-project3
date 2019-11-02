app.filter('sportsmenByClubFilter', function(constants) {
    return function(items, club) {
        if(club) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (item.sportclub === club.id) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
        else
            return items;
    };
});