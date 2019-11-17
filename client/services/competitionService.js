app.service('competitionService', function ($window, $http, $uibModal, $location, constants) {
    this.checkExcel = function (data) {
        if (isNaN(parseInt(data)) || data.toString().length != 9)
            return false;
        return true;
    }
    this.regSportsmanCompetition = function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/competitionSportsmen',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };
    this.regExcelSportsmanCompetition = function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/regExcelCompetitionSportsmen',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };
    this.addCategroyDB = function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/addNewCategory',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };

    this.insertCompetition = function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/addCompetition',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };
    this.getCompetitons = function (conditions) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/getCompetitions' + conditions,
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    };
    this.getCompetitonsCount = function (conditions) {
        var req = {
            method: 'GET',
            url: constants.serverUrl + '/getCompetitions/count' + conditions
        };
        return $http(req);
    };

    this.addNewCategory = function (finishAddingNewCategory) {
        $uibModal.open({
            templateUrl: "views/addNewCategoryModal.html",
            controller: "addCategoryModalController as aCMCCtrl",
            backdrop: true,
            keyboard: false,
        }).result.then(function () {
            finishAddingNewCategory();
        }).catch(function () {
        });
    }
    this.editCompetitionDetails = function (id) {
        $uibModal.open({
            templateUrl: "views/editCompetitionDetails.html",
            controller: "editCompetitionDetailsModal as cEditDetailsCtrl",
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                getId: function () {
                    return id;
                }
            }
        }).result.then(function(){
            // parent.location.reload();
        }).catch(function () {
        });
    }
    this.getCompetitionDetails = function (id) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/getCompetitionDetail',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                id: id
            }
        };
        return $http(req);
    };
    this.updateCompetitionDetails = function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/updateCompetitionDetails',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    }
    this.registerSportsmenToCompetition = function (compId, insertSportsmenIds, deleteSportsmenIds, updateSportsmanIds) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/competitionSportsmen',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                compId: compId,
                insertSportsman: insertSportsmenIds,
                deleteSportsman: deleteSportsmenIds,
                updateSportsman: updateSportsmanIds
            }
        };
        return $http(req);
    };
    this.getRegistrationState = function (compId) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/getRegistrationState',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                compId: compId
            }
        };
        return $http(req);
    };
    this.setCategoryRegistration = function (compId, categoryForSportsman) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/setCategoryRegistration',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                compId: compId,
                categoryForSportsman: categoryForSportsman
            }
        };
        return $http(req);
    };
    this.closeRegistration = function (idComp) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/closeRegistration',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                idCompetition: idComp
            }
        };
        return $http(req);
    };

    /*****common functions for gui*****/

    this.watchCompDetails = function (idCompetiton) {
        $uibModal.open({
            templateUrl: "views/competitonDetails.html",
            controller: "competitionDetailsModal as cDetailsCtrl",
            backdrop: true,
            keyboard: false,
            resolve: {
                getId: function () {
                    return idCompetiton;
                }
            }
        }).result.catch(function () {
        });
    };
    this.regSportsman = function (idCompetiton) {
        $location.path('/competitionRegistration/' + idCompetiton);
    };
    this.registrationState = function (competition) {
        $location.path('/competitions/RegistrationState/' + JSON.stringify(competition));
    };
    this.buildConditions = function buildConditions(location, sportStyle, statusArr, startIndex, endIndex) {
        var conditions = [];

        if (location !== null && location !== undefined && location !== "") {
            conditions.push('location=' + location);
        }
        if (sportStyle !== null && sportStyle !== undefined) {
            conditions.push('sportStyle=' + sportStyle.name);
        }
        if (statusArr !== null && statusArr !== undefined) {
            let statusCond = [];
            statusArr.forEach(status => {
                statusCond.push(status.name);
            });
            conditions.push('status=' + statusCond.join(','));
        }
        if(startIndex !== null && startIndex !== undefined && endIndex !== null && endIndex !== undefined){
            conditions.push('startIndex=' + startIndex);
            conditions.push('endIndex=' + endIndex);
        }

        return conditions.length ? '?' + conditions.join('&') : '';
    }


});
