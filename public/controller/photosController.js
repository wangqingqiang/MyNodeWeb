/**
 * Created by wqq on 2016/8/5.
 */
var photoModule = angular.module('app.photos.controller', ['app.photos.service'])
    .controller('photosController',['$scope', 'photosService', function ($scope, photosService) {
        photosService.getAllAlbums($scope);
    }])