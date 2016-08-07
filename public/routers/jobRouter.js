/**
 * Created by Administrator on 2016/8/8 0008.
 */
var photoModule = angular.module('app.job.router', ['ui.router', 'app.job.controller']);
photoModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('job', {
            url: '/job',
            views: {
                'main': {
                    templateUrl: '/static/template/job/index.html',
                    controller: 'jobController'
                }
            }
        })
}])