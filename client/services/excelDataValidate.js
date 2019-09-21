app.service('validateSportsmanData', function() {
    this.validData = function (data) {
        if(checkId(data.id))
            if (checkString(data.firstname))
                if (checkString(data.lastname))
                    if(checksportStyle(data.sportStyle))
                        if (checkId(data.idCoach))
                            if(checkSex(data.sex))
                                if(checkEmail(data.email))
                                    if(cheackPhone(data.phone))
                                        if (cheackSportclub(data.sportclub))
                                            if(cheackAddress(data.address))
                                                return true;


         return false;
    }

});

app.service('validateCoachData',function () {
    this.validData=function (data) {
        if(checkId(data.id))
            if (checkString(data.firstname))
                if (checkString(data.lastname))
                    if (checkString(data.teamname))
                        if(checksportStyle(data.sportStyle))
                                    if(checkEmail(data.email))
                                        if(cheackPhone(data.phone))
                                            if (cheackSportclub(data.sportclub))
                                                if (cheackAddress(data.address))
                                                     return true;
                                    return false;

    }
});

function cheackAddress(add) {
    if(add.toString().length<2)
        return false;
    return true;

}
function cheackSportclub(sportclub) {
    if(isNaN(parseInt(sportclub)))
        return false;
    if (parseInt(sportclub)>10)
        return false
    return true

}
function cheackPhone(phone) {
    if(isNaN(parseInt(phone)))
        return false
    return true;
}
function checkEmail(email) {
    var regex= new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
        return regex.test(email);

}
function checkId(id) {
    if (isNaN(parseInt(id))||id.toString().length!=9)
        return false;
    return true;
}
function checkString(string) {
    var regex = new RegExp("^[\u0590-\u05fe]+$");
     if(!regex.test(string))
        return false;
    if(string.toString()<1)
        return false;
    return true;
}
function checksportStyle(sportStyle) {
    if(sportStyle.toString()=="סנדא"||sportStyle.toString()=="טאולו")
            return true;
    return false;
}
function checkSex(sex) {
    if(sex.toString()=="זכר"||sex.toString()=="נקבה")
        return true;
    return false;
}