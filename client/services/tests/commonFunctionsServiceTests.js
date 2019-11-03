describe('common functions service test', function () {
    var commonFunctionsService, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_commonFunctionsService_, _constants_) {
        commonFunctionsService = _commonFunctionsService_;
        constants = _constants_;
    }));

    describe('array remove', function () {
        let collection;
        beforeEach(inject(function () {
            collection = [...Array(5).keys()];
        }));

        it('remove existed item from array', function () {
            collection = commonFunctionsService.arrayRemove(collection, 2);
            expect(collection.length).toEqual(4);
            expect(collection.includes(2)).toEqual(false);
        });
        it('remove not existed item from array', function () {
            collection = commonFunctionsService.arrayRemove(collection, 8);
            expect(collection.length).toEqual(5);
            expect(collection.includes(8)).toEqual(false);
        })
    });
});