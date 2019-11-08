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
    });
});