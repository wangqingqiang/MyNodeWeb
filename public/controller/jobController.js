/**
 * Created by Administrator on 2016/8/8 0008.
 */
;angular.module('app.job.controller', ['app.job.service'])
    .controller('jobController', ['$scope', 'jobService', '$http', function ($scope, jobService, $http) {
        $scope.citys = jobService.getCitys();
        $scope.salarys = jobService.getSalary();

        $scope.jobs = [];

        $scope.jobSearch = function (pageIndex) {
            var yx = angular.element(document.querySelector("#yx")).val();
            var city = angular.element(document.querySelector("#city")).val();
            var positionName = angular.element(document.querySelector("#keyword")).val();
            $http({
                method: 'POST',
                url: '/jobSearch',
                data: {
                    'yx': yx,
                    'city': city,
                    'pageIndex': pageIndex,
                    'positionName': positionName
                }
            }).success(function (data) {

                data = JSON.parse(data);
                //$scope.$apply(function(){
                $scope.jobs = data.content.positionResult.result;
                // })
            }).error(
                function (data) {
                    alert('获取值为失败:' + data);
                }
            )
        }
        $scope.keyup = function (event) {
            event = event || window.event;
            var keycode = event.keyCode;
            console.log(keycode);
            if (keycode === 13) {
                $scope.jobSearch(1);
            }
        }
    }]);