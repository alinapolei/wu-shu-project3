app.constant('constants', {
    serverUrl: "http://localhost:3000",
    sexEnum: [
        {id : 1, name : 'זכר' },
        {id : 2, name : 'נקבה' }
    ],
    sportStyleEnum: [
        {id : 1, name : 'טאולו' },
        {id : 2, name : 'סנדא' }
    ],
    compStatus: [
        {id : 1, name : 'פתוח'},
        {id : 2, name : 'סגור'},
        {id : 3, name : 'רישום סגור'}
    ],
    compStatusType: {
        OPEN: 0,
        CLOSE: 1,
        REGCLOSE: 2
    }
    //'someElseSetting': 'settingValue'
});