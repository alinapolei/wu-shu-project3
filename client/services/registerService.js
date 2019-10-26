app.service('registerService', function ($window, $http) {
    serverUrl = "http://localhost:3000";

    this.registerUsers = function (data) {
        let req = {
            method: 'POST',
            url: serverUrl + '/private/registerSportsman',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    };




    function displayErr(collectionErr) {
        let errArea = document.getElementById('errorText');

        errArea.style.color = "red";
        errArea.style.display = "block"
        errArea.innerHTML = ansExcel.innerHTML + collectionErr

    }
});