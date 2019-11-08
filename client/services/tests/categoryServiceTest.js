describe('category service test', function () {
    var categoryService, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_categoryService_, _constants_) {
        categoryService = _categoryService_;
        constants = _constants_;
    }));

    describe('get age range', function () {
        it('max and min age', function () {
            let range = categoryService.getAgeRange(
                {
                    minAge: 6,
                    maxAge: 10
                }
            );
            expect(range).toEqual("6-10");
        });
        it('only min age', function () {
            let range = categoryService.getAgeRange(
                {
                    minAge: 10
                }
            );
            expect(range).toEqual("10+");
        });
        it('min age equal to zero and no max age', function () {
            let range = categoryService.getAgeRange(
                {
                    minAge: 0
                }
            );
            expect(range).toEqual("");
        });
        it('max and min age when min age equal to zero', function () {
            let range = categoryService.getAgeRange(
                {
                    minAge: 0,
                    maxAge: 5
                }
            );
            expect(range).toEqual("0-5");
        });
    });
});