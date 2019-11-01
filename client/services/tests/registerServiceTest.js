describe('register service test', function () {
    var registerService, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_registerService_, _constants_) {
        registerService = _registerService_;
        constants = _constants_;
    }));
    
    it('url for sportsman registration', function () {
        expect(getRegisterUserUrl(false)).toEqual(serverUrl + '/private/registerSportsman');
    })
    it('url for sportsman coach', function () {
        expect(getRegisterUserUrl(true)).toEqual(serverUrl + '/private/registerCoach');
    })
});