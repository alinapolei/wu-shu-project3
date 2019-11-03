app.service('excelExportService', function () {
    let mystyle = {
        headers: true,
        column: {style: {Font: {Bold: "1"}}}
    };

    /**** when starting to use it you need to import this file in the index.html, good luck ********/
    this.excelExport = function (fileName, dataToExport, selectStatement, objectBuilder) {
        let resultJson = [];
        dataToExport.forEach((line) => {
            resultJson.push(objectBuilder(line));
        });

        alasql(selectStatement + ' INTO XLSX("' + fileName + '.xlsx",?) FROM ?', [mystyle, resultJson]);
    }
});