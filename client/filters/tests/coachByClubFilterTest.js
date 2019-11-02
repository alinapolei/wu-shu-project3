describe('coach by club filter test', function () {
    var $filter, collection;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
        collection = [
            {
                "id": 3232424,
                "firstname": "בר",
                "lastname": "שופר",
                "sportclub": 1
            },
            {
                "id": 305077910,
                "firstname": "אור",
                "lastname": "אפרים",
                "sportclub": 1
            },
            {
                "id": 305077911,
                "firstname": "נתי",
                "lastname": "שחר",
                "sportclub": 2
            },
            {
                "id": 305077912,
                "firstname": "עודד",
                "lastname": "רויטבלט",
                "sportclub": 2
            },
            {
                "id": 305077913,
                "firstname": "גל",
                "lastname": "פאלק",
                "sportclub": 3
            },
            {
                "id": 305077914,
                "firstname": "נטע",
                "lastname": "פאלק",
                "sportclub": 2
            },
            {
                "id": 305077915,
                "firstname": "גלעד",
                "lastname": "פאלק",
                "sportclub": 3
            }
        ]
    }));

    it('filter with results', function () {
        let filtered = $filter('coachByClubFilter')(collection, {
            "id": 1,
            "name": "הפנתרים"
        });
        expect(filtered.length).toEqual(2);
    });
    it('filter without results', function () {
        let filtered = $filter('coachByClubFilter')(collection, {
            "id": 5,
            "name": "חדש"
        });
        expect(filtered.length).toEqual(0);
    });
});