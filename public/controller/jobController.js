/**
 * Created by Administrator on 2016/8/8 0008.
 */
;angular.module('app.job.controller', ['app.job.service'])
    .controller('jobController', ['$scope', 'jobService', '$http', function ($scope, jobService, $http) {
        $scope.citys = jobService.getCitys();
        $scope.salarys = jobService.getSalary();

        $scope.jobs = [];
        $scope.pageOption = {
            totalCounts: 100,
            pageSize: 10,
            showPages: 5,
            currentPage: 1
        }
        $scope.keyword='';
        $scope.city='';
        $scope.yx='';

        $scope.jobSearch = function (pageIndex) {
            var yx =$scope.yx;
            var city = $scope.city;
            var positionName =$scope.keyword;
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
                $scope.pageOption.currentPage=pageIndex;
                $scope.pageOption.totalCounts=data.content.positionResult.totalCount;
                //$scope.pageOption = {
                //    totalCounts: data.content.positionResult.totalCount,
                //    pageSize: data.content.pageSize,
                //    showPages: 5,
                //    currentPage: pageIndex
                //}
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