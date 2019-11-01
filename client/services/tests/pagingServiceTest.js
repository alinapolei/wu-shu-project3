describe('paging service test', function () {
    var pagingService, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function (_pagingService_, _constants_) {
        pagingService = _pagingService_;
        constants = _constants_;
    }));

    var userList = [
        {
            id: '1',
            name: 'Jane',
            role: 'Designer',
            location: 'New York',
            twitter: 'gijane'
        },
        {
            id: '2',
            name: 'Bob',
            role: 'Developer',
            location: 'New York',
            twitter: 'billybob'
        },
        {
            id: '3',
            name: 'Jim',
            role: 'Developer',
            location: 'Chicago',
            twitter: 'jimbo'
        },
        {
            id: '4',
            name: 'Bill',
            role: 'Designer',
            location: 'LA',
            twitter: 'dabill'
        }
    ];

    it('get the first two items', function () {
        let pager = pagingService.GetPager(userList.length, 1, 2);
        expect(pager.currentPage).toEqual(1);
        expect(pager.pageSize).toEqual(2);
        expect(pager.totalPages).toEqual(2);
        expect(pager.startPage).toEqual(1);
        expect(pager.endPage).toEqual(2);
        expect(pager.startIndex).toEqual(0);
        expect(pager.endIndex).toEqual(1);
        expect(pager.pages).toEqual([ 1, 2 ]);
    });
    it('get the last two items', function () {
        let pager = pagingService.GetPager(userList.length, 2, 2);
        expect(pager.currentPage).toEqual(2);
        expect(pager.pageSize).toEqual(2);
        expect(pager.totalPages).toEqual(2);
        expect(pager.startPage).toEqual(1);
        expect(pager.endPage).toEqual(2);
        expect(pager.startIndex).toEqual(2);
        expect(pager.endIndex).toEqual(3);
        expect(pager.pages).toEqual([ 1, 2 ]);
    });
    it('get one item from the middle', function () {
        let pager = pagingService.GetPager(userList.length, 3, 1);
        expect(pager.currentPage).toEqual(3);
        expect(pager.pageSize).toEqual(1);
        expect(pager.totalPages).toEqual(4);
        expect(pager.startPage).toEqual(1);
        expect(pager.endPage).toEqual(4);
        expect(pager.startIndex).toEqual(2);
        expect(pager.endIndex).toEqual(2);
        expect(pager.pages).toEqual([ 1, 2, 3, 4 ]);
    });
});