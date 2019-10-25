app.service('registerService', function($window, $http,excelDataValidate) {
    serverUrl = "http://localhost:3000";


this.dropZoneDropFile =function (e,isCoach) {
    e.stopPropagation();
    e.preventDefault();
    console.log("DROPPED");
    var errorText = document.getElementById("errorText");
    errorText.innerHTML =""
    var files = e.dataTransfer.files, i, f;
    for (i = 0, f = files[i]; i !== files.length; ++i) {
        var reader = new FileReader(),
            name = f.name;
        changeDropzone(f.name);
        reader.onload = function (e) {
            var results,
                data = e.target.result,
                fixedData = fixdata(data),
                workbook = XLSX.read(btoa(fixedData), {type: 'base64'}),
                firstSheetName = workbook.SheetNames[0],
                worksheet = workbook.Sheets[firstSheetName];
            results = XLSX.utils.sheet_to_json(worksheet);
            excelCheck(results,isCoach);
        };

        reader.readAsArrayBuffer(f);
    }

}
    function excelCheck(data,isCoach) {
        var droptext = document.getElementById("dropText");
        var res;
        if (!isCoach)
            res = excelDataValidate.sportsmanValidateData(data)
        else
            res = excelDataValidate.coachValidateData(data)

        if(res==true) {
            droptext.className = "excelOK"
            registerUsers(data)
        }
        else
            droptext.className="excelBad"
    }

   this.registerUsers=function(data) {
    console.log("register function");
        var req = {
            method: 'POST',
            url: serverUrl + '/private/registerSportsman',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };

    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }
    function changeDropzone(name) {
        var droptext = document.getElementById("dropText");
        droptext.innerHTML = name.toString();
        var dropzone = document.getElementById("dropzone");
        dropzone.className = "dropzoneExcel"
        changeExcel.style.display = "block"
    }

});