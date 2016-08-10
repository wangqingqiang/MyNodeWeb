/**
 * Created by wqq on 2016/8/5.
 */
;angular.module('app.photos.router', ['ui.router', 'app.photos.controller', 'app.photos.service'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('photos', {
                url: '/photos',
                resolve: {
                    httpServer: 'photosService',
                    albumsObj: ['httpServer', function (httpServer) {
                        return httpServer.getAllAlbums();
                    }]
                },
                views: {
                    'main': {
                        templateUrl: '/static/template/photos/index.html',
                        controller: 'photosListController'

                    },
                    'main@photos': {
                        templateUrl: '/static/template/photos/albumList.html',
                        controller: 'photosListController'
                    }
                }
            })
            .state('photos.update', {
                url: '/update',
                resolve: {
                    httpServer: 'photosService',
                    albumsObj: ['httpServer', function (httpServer) {
                        return httpServer.getAllAlbums();
                    }]
                },
                views: {
                    'main': {
                        templateUrl: '/static/template/photos/update.html',
                        controller: 'photosUpdateController'
                    }
                }
            })
            .state('photos.detail', {
                url: '/:albumName',
                resolve: {
                    httpServer: 'photosService',
                    photosObj: ['httpServer', '$stateParams', function (httpServer, $stateParams) {
                        return httpServer.getPhotosByAlbumName($stateParams.albumName);
                    }]
                },
                views: {
                    'main': {
                        templateUrl: '/static/template/photos/detail.html',
                        controller: 'photosDetailController'
                    }
                }
            })
        //.state('photos.404NotFound', {
        //    url: '/:albumName',
        //    views: {
        //        'main': {
        //            templateUrl: '/static/template/404Page.html',
        //        }
        //    }
        //})

    }]);