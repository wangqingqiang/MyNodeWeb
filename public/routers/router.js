;angular.module('app.Router', ['ui.router', 'app.photos.router', 'app.job.router', 'app.sign.router','app.chatRoom.router','app.Controller'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) { //不需要在这里注入引用的模块的service、controller，否则报错
        $urlRouterProvider.when("", "/");
        $urlRouterProvider.when("/index", "/");
        //$urlRouterProvider.otherwise('404page');
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    'main': {
                        templateUrl: '/static/template/index.html',
                    },
                    '@index': {
                        template: "<ul><li>哈哈</li><li>呵呵</li><li>嘿嘿</li></ul> "
                    }
                }
            })
            .state('404page', {
                views: {
                    'main': {
                        templateUrl: '/static/template/404Page.html',
                    }
                }
            })
            .state('500page',{
                views:{
                    'main':{
                        templateUrl: '/static/template/500Page.html',
                    }
                }
            })
    }]);