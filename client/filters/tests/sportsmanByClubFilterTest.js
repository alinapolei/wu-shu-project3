describe('sportsman by club filter test', function () {
    var $filter, collection;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
        collection = [
            {
                "id": 305078,
                "firstname": "אביב",
                "lastname": "גואטה",
                "photo": "../../wu-shu-project/server/resources/profilePics/pic305078.jpeg",
                "sex": "זכר",
                "age": 11,
                "sportclub": 1
            },
            {
                "id": 305568,
                "firstname": "לינור",
                "lastname": "שחר",
                "photo": "",
                "sex": "זכר",
                "age": 8,
                "sportclub": 2,
                "$$hashKey": "object:85"
            }
        ]
    }));

    it('filter with results', function () {
        let filtered = $filter('sportsmenByClubFilter')(collection, {
            "id": 1,
            "name": "הפנתרים"
        });
        expect(filtered.length).toEqual(1);
    });
    it('filter without results', function () {
        let filtered = $filter('sportsmenByClubFilter')(collection, {
            "id": 5,
            "name": "חדש"
        });
        expect(filtered.length).toEqual(0);
    });
});