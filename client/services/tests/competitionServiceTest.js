describe('competitionService service test', function () {
    var competitionService, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_competitionService_, _constants_) {
        competitionService = _competitionService_;
        constants = _constants_;
    }));

    it('builds empty condition', function () {
        let conditions = competitionService.buildConditions();
        expect(conditions).toEqual('');
    });
    it('builds condition with location and sport style', function () {
        let conditions = competitionService.buildConditions("ראשון", constants.sportStyleEnum[0]);
        expect(conditions).toEqual('?location=ראשון&sportStyle=טאולו');
    });
    it('builds condition with close status', function () {
        let conditions = competitionService.buildConditions("", undefined, [constants.compStatus[constants.compStatusType.CLOSE]]);
        expect(conditions).toEqual('?status=סגור');
    });
    it('builds condition with open and reg close status', function () {
        let conditions = competitionService.buildConditions(undefined, undefined, [constants.compStatus[constants.compStatusType.OPEN], constants.compStatus[constants.compStatusType.REGCLOSE]]);
        expect(conditions).toEqual('?status=פתוח,רישום סגור');
    });
});