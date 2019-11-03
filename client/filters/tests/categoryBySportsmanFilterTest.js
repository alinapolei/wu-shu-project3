describe('category by sportsman filter test', function () {
    var $filter, collection;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
        collection = [
            {
                "id": 10,
                "name": "בוגרות",
                "minAge": 18,
                "maxAge": null,
                "sex": "נקבה",
                "count": 0
            },
            {
                "id": 9,
                "name": "בוגרים",
                "minAge": 18,
                "maxAge": null,
                "sex": "זכר",
                "count": 0
            },
            {
                "id": 11,
                "name": "בוגרים2",
                "minAge": 21,
                "maxAge": null,
                "sex": "זכר",
                "count": 0
            },
            {
                "id": 4,
                "name": "ילדות",
                "minAge": 0,
                "maxAge": 12,
                "sex": "נקבה",
                "count": 1
            },
            {
                "id": 3,
                "name": "ילדים",
                "minAge": 0,
                "maxAge": 12,
                "sex": "זכר",
                "count": 1
            },
            {
                "id": 7,
                "name": "נוער",
                "minAge": 16,
                "maxAge": 18,
                "sex": "זכר",
                "count": 0
            },
            {
                "id": 8,
                "name": "נערות",
                "minAge": 16,
                "maxAge": 18,
                "sex": "נקבה",
                "count": 0
            }
        ]
    }));

    it('one filtered result', function () {
        let filtered = $filter('categoryBySportsmanFilter')(collection, {
            "id": 305568,
            "firstname": "לינור",
            "lastname": "שחר",
            "category": 3,
            "categoryName": "ילדים",
            "sex": "זכר",
            "age": 8,
            "sportclub": 1,
            "selectedCategory": {
                "id": 3,
                "name": "ילדים",
                "minAge": 0,
                "maxAge": 12,
                "sex": "זכר",
                "count": 1
            }
        });
        expect(filtered.length).toEqual(1);
        expect(filtered[0].id).toEqual(3);
    });
    it('one filtered result with null max age', function () {
        let filtered = $filter('categoryBySportsmanFilter')(collection, {
            "id": 305568,
            "firstname": "לינור",
            "lastname": "שחר",
            "category": 3,
            "categoryName": "ילדים",
            "sex": "זכר",
            "age": 20,
            "sportclub": 1,
            "selectedCategory": {
                "id": 3,
                "name": "ילדים",
                "minAge": 0,
                "maxAge": 12,
                "sex": "זכר",
                "count": 1
            }
        });
        expect(filtered.length).toEqual(1);
        expect(filtered[0].id).toEqual(9);
    });
    it('two filtered result', function () {
        let filtered = $filter('categoryBySportsmanFilter')(collection, {
            "id": 305568,
            "firstname": "לינור",
            "lastname": "שחר",
            "category": 3,
            "categoryName": "ילדים",
            "sex": "זכר",
            "age": 23,
            "sportclub": 1,
            "selectedCategory": {
                "id": 3,
                "name": "ילדים",
                "minAge": 0,
                "maxAge": 12,
                "sex": "זכר",
                "count": 1
            }
        });
        expect(filtered.length).toEqual(2);
        let categoryIds = filtered.map(c => c.id);
        expect(categoryIds.includes(9)).toBeTrue();
        expect(categoryIds.includes(11)).toBeTrue();
    });
    it('zero filtered result', function () {
        let filtered = $filter('categoryBySportsmanFilter')(collection, {
            "id": 305568,
            "firstname": "לינור",
            "lastname": "שחר",
            "category": 3,
            "categoryName": "ילדים",
            "sex": "זכר",
            "age": 14,
            "sportclub": 1,
            "selectedCategory": {
                "id": 3,
                "name": "ילדים",
                "minAge": 0,
                "maxAge": 12,
                "sex": "זכר",
                "count": 1
            }
        });
        expect(filtered.length).toEqual(0);
    });
});