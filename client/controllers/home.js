app.controller("homeController", function ($scope, $uibModal) {
    $scope.changePassword = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "views/changePasswordModal.html",
                controller: "changePasswordController as changePassCtrl"
            });

            modalInstance.result.then(function (response) {
                if (response) {
                    alert("what to do? save the pass");
                    /*var req = {
                        method: 'POST',
                        url: serverUrl + '/private/review',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem('token')
                        },
                        data: {
                            poi_id: $scope.point.poi_id,
                            rating: response.rating,
                            review: response.review
                        }
                    }
                    $http(req).then(function () {
                        getReviews(true);
                    }, function (error) {
                        alert(error.data);
                    });*/
                }
            }, function(error){});
    };

    $scope.changePassword();
});