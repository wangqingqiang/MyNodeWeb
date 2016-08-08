/**
 * Created by wqq on 2016/8/8.
 */
;angular.module('app.sign.router', ['ui.router','app.sign.controller'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('sign', {
                url: '/sign',
                views: {
                    'main': {
                        templateUrl: '/static/template/sign.html',
                        controller: 'signController'
                    }
                }
            })
    }])