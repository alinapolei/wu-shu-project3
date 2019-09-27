app.service('sportsmanService', function($window, $http) {
    serverUrl = "http://localhost:3000";
    this.getSportsmanProfile = function (data) {
        var req = {
            method: 'POST',
            url: serverUrl + '/private/sportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };
    this.getSportsmen = function(conditions){
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getSportsmen' + conditions,
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
        };
        return $http(req);
    };
    this.getCategories = function(){
        var req = {
            method: 'POST',
            url: serverUrl + '/private/getCategories',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        return $http(req);
    };


    this.buildConditionds = function buildConditions(searchText, sportStyle, club, sex, isToDesc, compId, compOperator){
        var conditions = [];

        if(searchText !== null && searchText !== undefined) {
            conditions.push('value=' + searchText);
        }
        if(sportStyle !== null && sportStyle !== undefined){
            conditions.push('sportStyle=' + sportStyle.name);
        }
        if(club != null && club !== undefined){
            conditions.push('club=' + club.id);
        }
        if(sex !== null && sex !== undefined){
            conditions.push('sex=' + sex.name);
        }
        if(isToDesc === false){
            conditions.push('sort=desc')
        }
        if(compId !== null && compId !== undefined){
            conditions.push('competition=' + compId);
        }
        if(compOperator !== null && compOperator !== undefined){
            conditions.push('competitionOperator=' + compOperator);
        }

        return conditions.length ? '?' + conditions.join('&') : '';
    }
});