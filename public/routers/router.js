var routerModule = angular.module('app.Router', ['ui.router','app.photos.router']);
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

}])