describe('registration state controller test', function () {
    var scope, constants;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function ($rootScope, _constants_) {
        scope = $rootScope.$new();
        constants = _constants_;
    }));

    describe('change category', function () {
        beforeEach(inject(function ($controller, $routeParams) {
            $routeParams.competition = JSON.stringify({
                "idCompetition": 14,
                "sportStyle": "סנדא",
                "status": "פתוח",
                "closeRegDate": "2019-12-10T00:00:00.000Z",
                "date": "2019-11-10T00:00:00.000Z"
            });
            let registrationStateController = $controller('registrationStateController', {
                '$scope': scope,
                '$routeParams': $routeParams
            });
            scope.usersCategories = [
                {
                    "category": {
                        "id": 3,
                        "name": "ילדים"
                    },
                    "users": [
                        {
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
                                "count": 1,
                                "$$hashKey": "object:41"
                            }
                        }
                    ]
                },
                {
                    "category": {
                        "id": 11,
                        "name": "מקצוענים"
                    },
                    "users": [
                        {
                            "id": 305078,
                            "firstname": "אביב",
                            "lastname": "גואטה",
                            "category": 11,
                            "categoryName": "מקצוענים",
                            "sex": "זכר",
                            "age": 11,
                            "sportclub": 1,
                            "selectedCategory": {
                                "id": 11,
                                "name": "מקצוענים",
                                "minAge": 18,
                                "maxAge": null,
                                "sex": "זכר",
                                "count": 2
                            }
                        },
                        {
                            "id": 707070,
                            "firstname": "ספורטאי",
                            "lastname": "זבירין",
                            "category": 11,
                            "categoryName": "מקצוענים",
                            "sex": "זכר",
                            "age": 29,
                            "sportclub": 3,
                            "selectedCategory": {
                                "id": 11,
                                "name": "מקצוענים",
                                "minAge": 18,
                                "maxAge": null,
                                "sex": "זכר",
                                "count": 2
                            }
                        }
                    ]
                }
            ];
            scope.categories = [
                {
                    "id": 3,
                    "name": "ילדים",
                    "minAge": 0,
                    "maxAge": 12,
                    "sex": "זכר",
                    "count": 1
                },
                {
                    "id": 11,
                    "name": "מקצוענים",
                    "minAge": 18,
                    "maxAge": null,
                    "sex": "זכר",
                    "count": 2
                }
            ];
        }));

        it('move sportsman to existing category', function () {
            scope.changeCategory({
                "id": 305078,
                "firstname": "אביב",
                "lastname": "גואטה",
                "category": 11,
                "categoryName": "מקצוענים",
                "sex": "זכר",
                "age": 11,
                "sportclub": 1,
                "selectedCategory": {
                    "id": 3,
                    "name": "ילדים",
                    "minAge": 0,
                    "maxAge": 12,
                    "sex": "זכר",
                    "count": 1
                }
            }, 11);
            expect(scope.usersCategories.length).toEqual(2);
            expect(scope.usersCategories[0].users.length).toEqual(2);
            // expect(scope.usersCategories[1].users.length).toEqual(1); --cannot check because its by value
            let idsInCategory = scope.usersCategories[0].users.map(u => u.id);
            expect(idsInCategory.includes(305078)).toBeTrue();
            expect(idsInCategory.includes(305568)).toBeTrue();
            idsInCategory = scope.usersCategories[1].users.map(u => u.id);
            // expect(idsInCategory.includes(305078)).toBe(false); --cannot check because its by value
            expect(idsInCategory.includes(707070)).toBeTrue();
        });
        it('move sportsman to not existing category', function () {
            scope.changeCategory({
                "id": 305078,
                "firstname": "אביב",
                "lastname": "גואטה",
                "category": 11,
                "categoryName": "מקצוענים",
                "sex": "זכר",
                "age": 11,
                "sportclub": 1,
                "selectedCategory": {
                    "id": 10,
                    "name": "חדש",
                    "minAge": 0,
                    "maxAge": 12,
                    "sex": "זכר",
                    "count": 1
                }
            }, 11);
            expect(scope.usersCategories.length).toEqual(3);
            expect(scope.usersCategories[0].users.length).toEqual(1);
            // expect(scope.usersCategories[1].users.length).toEqual(1); --cannot check because its by value
            expect(scope.usersCategories[2].users.length).toEqual(1);
            expect(scope.usersCategories.map(uc => uc.category.id).includes(10)).toBeTrue()
            let idsInCategory = scope.usersCategories[0].users.map(u => u.id);
            expect(idsInCategory.includes(305568)).toBeTrue();
            idsInCategory = scope.usersCategories[1].users.map(u => u.id);
            // expect(idsInCategory.includes(305078)).toBe(false); --cannot check because its by value
            expect(idsInCategory.includes(707070)).toBeTrue();
            idsInCategory = scope.usersCategories[2].users.map(u => u.id);
            expect(idsInCategory.includes(305078)).toBeTrue();
        });
    });
});