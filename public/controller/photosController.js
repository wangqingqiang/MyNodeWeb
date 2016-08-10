/**
 * Created by wqq on 2016/8/5.
 */
;angular.module('app.photos.controller', ['app.photos.service'])
    .controller('photosListController', ['$scope', 'albumsObj', function ($scope, albumsObj) {
        $scope.albums = albumsObj.data;
    }])
    .controller('photosDetailController', ['$scope', '$stateParams', '$state', 'photosObj', function ($scope, $stateParams, $state, photosObj) {
        $scope.photos = photosObj.data;
        $scope.albumName = $stateParams.albumName;
        if ($scope.photos.length <= 0) {
            //$state.go('photos.404NotFound', {albumName: $scope.albumName})
            $state.go('404page');
        }
    }])
    .controller('photosUpdateController', ['$scope', 'albumsObj', function ($scope, albumsObj) {
        $scope.albums = albumsObj.data;
        $scope.submit = function () {

        }
    }]);