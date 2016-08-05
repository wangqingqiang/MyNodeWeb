/**
 * Created by wqq on 2016/8/5.
 */
var photoModule = angular.module('app.photos.router', ['ui.router', 'app.photos.controller']);
photoModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('photos', {
            url: '/photos',
            views: {
                'main': {
                    templateUrl: '/static/template/photos/index.html'
                },
                'main@photos': {
                    templateUrl: '/static/template/photos/albumList.html',
                    controller: 'photosController'
                }
            }
        })
        .state('photos.detail',{
            url:'/:albumName',
            templateUrl:'/static/template/photos/detail.html'
        })

}])