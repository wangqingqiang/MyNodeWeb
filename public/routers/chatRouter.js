/**
 * Created by wqq on 2016/8/10.
 */
;angular.module('app.chatRoom.router', ['ui.router', 'app.chatRoom.controller'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('chatRoom',{
            url:'/chatRoom',
            views:{
                'main':{
                    templateUrl:'/static/template/chat/chat.html',
                    controller:'chatController'
                }
            }
        })
    }])