var lat;
var lon;
app.controller("competitionDetailsModal", function($scope, $uibModalInstance, $window, $http,getId,competitionService) {
    $scope.close=function () {
        $uibModalInstance.close()
    }
    $('#myModal').on('shown.bs.modal', function() {
        map.invalidateSize();
    });
    competitionService.getCompetitionDetails(getId)
        .then(function (result) {
            $scope.competitionNumber= "תחרות מספר "+result.data.idCompetition;
            $scope.competitionType="ענף: " +result.data.sportStyle;
            $scope.location="מיקום: " + result.data.location +","+result.data.city;
            $scope.compDate = result.data.date;
            $scope.compHour = result.data.startHour.substring(0, result.data.startHour.length-1);

            var mymap = L.map('mapid')
            mymap.setView(new L.LatLng(-85,50), 15 );

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoid3VzaHVzeXMiLCJhIjoiY2swZHRodDdmMGF3ODNibzJycHJnaGNtciJ9._Y5lebHWlgL3dphKLHcz3Q'
            }).addTo(mymap);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.locationiq.com/v1/autocomplete.php?key=afa72e2030cce6&q="+result.data.location +","+result.data.city,
                "method": "GET"
            }

            $.ajax(settings).done(function (response) {
                lat= response[0].lat;
                lon= response[0].lon;
                mymap.setView(new L.LatLng(lat,lon), 15 );
                L.marker([lat,lon]).addTo(mymap)
                    .bindPopup( result.data.location)
                    .openPopup();
            });
        }, function (error) {
            console.log(error)
        });



});