describe('register service test', function () {
    var registerService, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_registerService_, _constants_) {
        registerService = _registerService_;
        constants = _constants_;
    }));

    describe('get register user url', function () {
        it('url for sportsman registration', function () {
            expect(getRegisterUserUrl(false)).toEqual(constants.serverUrl + '/private/registerSportsman');
        })
        it('url for sportsman coach', function () {
            expect(getRegisterUserUrl(true)).toEqual(constants.serverUrl + '/private/registerCoach');
        })
    });
});