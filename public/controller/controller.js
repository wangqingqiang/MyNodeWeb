/**
 * Created by wqq on 2016/8/9.
 */
;angular.module('app.Controller', ['ngCookies'])
    .controller('indexController', ['$rootScope','$scope', '$cookies','$http', function ($rootScope,$scope, $cookies,$http) {
        $rootScope.username =$cookies.get('username');
        if($scope.username){
            $rootScope.isSignin=true;
        }
        //退出事件
        $scope.signOut=function(){
            $http({
                method: 'POST',
                url: '/signOut'
            })
            .success(function(){
                $rootScope.isSignin=false;
                //$cookies.remove('username');
            })
            .error(function(){
                $rootScope.isSignin=false;
                //$cookies.remove('username');
            })
        }
    }]);