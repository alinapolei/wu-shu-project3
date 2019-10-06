app.service('excelDataValidate',function ($window, $http) {

this.sportsmanValidateData =function (data) {
    var errorText = document.getElementById("errorText");
    var isOk=true;
    for (var i = 0; i < data.length; i++) {
        var res = ""
        if (!checkId(data[i]["ת.ז ספורטאי"]))
            res = res + "ת.ז ספורטאי צריכה להכיל 9 מספרים"+"\n"
        if (!checkString(data[i]["שם פרטי"]))
            res = res + "שם פרטי חייב להיות כתוב בעברית ולהכיל לפחות 2 תווים"+"\n"
        if (!checkString(data[i]["שם משפחה"]))
            res = res + "שם משפחה חייב להיות כתוב בעברית ולהכיל לפחות 2 תווים"+"\n"
        if (!cheackPhone(data[i]["פאלפון"]))
            res = res + "פאלפון חייב להיות 10 תווים ולהכיל רק מספרים"+"\n"
        if (!checkEmail(data[i]["אימייל"]))
            res = res  + "איימיל לא תקין אנא כתוב מייל תקין בפורמט example@example.com"+"\n"
        if (!checkSex(data[i]["מין"]))
            res = res + "מין חייב להיות זכר/נקבה"+"\n"
        if (!checksportStyle(data[i]["ענף"]))
            res = res  + "ענף ספורט חייב להיות טאולוֿ/סאנדא"+"\n"
        if (!checkId(data[i]["ת.ז מאמן"]))
            res = res + "ת.ז מאמן צריכה להכיל 9 מספרים"+"\n"
        if (!cheackSportclub(data[i]["מועדון ספורט"]))
            res = res + "מועדון ספורט חייב להיות מספר"+"\n"
        if (!cheackAddress(data[i]["כתובת"]))
            res = res + "כתובת חייבת להיות בעברית והכיל לפחות 2 תווים"+"\n"


        if(res!="") {
            isOk=false
            errorText.innerText = errorText.innerText + "\n" +
                "שורה: " + (i + 1) + "\n" + res
        }/*else
            errorText.innerText =errorText.innerText+"\n"+
                "שורה: " + (i + 1) + "\n" +"הכול תקין"
        */

    }
    return isOk;

}

    function cheackAddress(add) {
        if(add.toString().length<2)
            return false;
        return true;

    }
    function cheackSportclub(sportclub) {
        if(isNaN(parseInt(sportclub)))
            return false;
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
        if(sex=="זכר"||sex=="נקבה")
            return true;
        return false;
    }
});

