/**
 * Created by wqq on 2016/8/9.
 */
;angular.module('app.Controller', ['ngCookies'])
    .controller('indexController', ['$scope', '$cookieStore','$cookies', function ($scope, $cookieStore,$cookies) {
        $scope.username =$cookies.get('username');
        console.log($scope.username)
    }]);