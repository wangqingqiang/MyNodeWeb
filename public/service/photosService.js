/**
 * Created by wqq on 2016/8/5.
 */
var photosModel=angular.module('app.photos.service',[])
.service('photosService',['$http',function($http){
    this.getAllAlbums=function($scope){
        $http({
            method: 'GET',
            url: '/getAlbums',
        }).success(function (data) {
            $scope.albums=data;
        }).error(
            function (data) {
                console.log(data);
            }
        )
    }
}])