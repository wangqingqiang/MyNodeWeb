/**
 * Created by wqq on 2016/8/8.
 */
;angular.module('app.sign.router', ['ui.router', 'app.sign.controller','app.Service'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('sign', {
                url: '/sign',
                resolve: {
                    httpService: 'signService',
                    checkSignin: ['httpService', function (httpService) {
                        return httpService.checkIsSignin();
                    }]
                },
                views: {
                    'main': {
                        templateUrl: '/static/template/sign.html',
                        controller: 'signController'
                    }
                }
            })
    }])