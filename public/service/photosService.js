/**
 * Created by wqq on 2016/8/5.
 */
angular.module('app.photos.service', [])
    .service('photosService', ['$http', function ($http) {
        this.getAllAlbums = function () {
            return $http({
                method: 'GET',
                url: '/getAlbums'
            })
        };
        this.getPhotosByAlbumName = function (albumName) {
            return $http({
                method: 'GET',
                url: '/getPhotosByAlbumName?albumName=' + albumName,
            })
        }
    }]);