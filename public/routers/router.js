var routerModule = angular.module('app.Router', ['ui.router','app.photos.router','app.job.router']);
routerModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/");
    $urlRouterProvider.when("/index", "/");
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                'main': {
                    templateUrl: '/static/template/index.html'
                },
                '@index': {
                    template: "<ul><li>哈哈</li><li>呵呵</li><li>嘿嘿</li></ul> "
                }
            }
        })
        .state('404',{
            url:'/404NotFound',
            views:{
                'main':{
                    template:'这是404页面'
                }
            }
        })

}])