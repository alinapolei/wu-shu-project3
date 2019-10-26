app.service('excelService', function () {

    this.dropZoneDropFile = function (e, callback) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files, i, f;
        let ans = new Object();
        f = files[0]
        let reader = new FileReader();
            ans.fileName = f.name;
        reader.onload = function (e) {
            let
                data = e.target.result,
                fixedData = fixData(data),
                workbook = XLSX.read(btoa(fixedData), {type: 'base64'}),
                firstSheetName = workbook.SheetNames[0],
                worksheet = workbook.Sheets[firstSheetName];
            ans.result = XLSX.utils.sheet_to_json(worksheet);
            callback(ans);
        };
        reader.readAsArrayBuffer(f);
    }

    this.uploadExcel=function (e, callback) {
        let  input = e.target;
        let reader = new FileReader();
        let results;
        reader.onload = function () {
            let fileData = reader.result,
                fixedData =fixData(fileData),
                workbook = XLSX.read(btoa(fixedData), {type: 'base64'}),
                firstSheetName = workbook.SheetNames[0],
                worksheet = workbook.Sheets[firstSheetName];
                results = XLSX.utils.sheet_to_json(worksheet);
                callback(results);
        };
        reader.readAsArrayBuffer(input.files[0]);
    };


    function fixData(data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }

});