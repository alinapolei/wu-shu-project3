app.service('sportsmanService', function($window, $http, constants) {
    this.getSportsmanProfile = function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/sportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };

    this.updateProfile =function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/updateSportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data : data
        };
        return $http(req);
    }

    this.getSportsmen = function(conditions){
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/getSportsmen' + conditions,
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
        };
        return $http(req);
    };

    this.buildConditionds = function buildConditions(searchText, sportStyle, club, sex, isToDesc, compId, compOperator){
        var conditions = [];

        if(searchText !== null && searchText !== undefined && searchText !== '') {
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
    
    this.formatSportsmanCategoriesList = function (sportsmanList, categoriesList) {
        let sportsmanCategoriesList = [];
        if(sportsmanList !== undefined && categoriesList !== undefined && sportsmanList.length > 0) {
            let i = 0, currId = sportsmanList[0].id;
            while(i < sportsmanList.length) {
                let user = {
                    id: sportsmanList[i].id,
                    firstname: sportsmanList[i].firstname,
                    lastname: sportsmanList[i].lastname,
                    sex: sportsmanList[i].sex,
                    age: sportsmanList[i].age,
                    selectedCategories: []
                };
                while (i < sportsmanList.length && sportsmanList[i].id === currId){
                    let category = categoriesList.find(c => c.id === sportsmanList[i].category);
                    user.selectedCategories.push(category);
                    i++;
                }
                sportsmanCategoriesList.push(user);
                if(i < sportsmanList.length)
                    currId = sportsmanList[i].id;
            }
        }
        return sportsmanCategoriesList;
    }
});