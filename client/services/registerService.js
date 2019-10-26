app.service('registerService', function ($window, $http) {
    serverUrl = "http://localhost:3000";
    var result = ''

    this.dropZoneDropFile = function (e, callback) {//, isCoach) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files, i, f;
        let results;
        f = files[0]
        let reader = new FileReader(),
            name = f.name;
        changeDropzone(f.name);
        reader.onload = function (e) {
            let
                data = e.target.result,
                fixedData = fixdata(data),
                workbook = XLSX.read(btoa(fixedData), {type: 'base64'}),
                firstSheetName = workbook.SheetNames[0],
                worksheet = workbook.Sheets[firstSheetName];
            results = XLSX.utils.sheet_to_json(worksheet);
            reader.sendData = XLSX.utils.sheet_to_json(worksheet);
            callback(results);
        };
        reader.readAsArrayBuffer(f);
        return reader;


    }

    this.registerUsers = function (data) {
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

    function displayErr(collectionErr) {
        let errArea = document.getElementById('errorText');

        errArea.style.color = "red";
        errArea.style.display = "block"
        errArea.innerHTML = ansExcel.innerHTML + collectionErr

    }
});