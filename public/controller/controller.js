/**
 * Created by wqq on 2016/8/9.
 */
;angular.module('app.Controller', ['ngCookies'])
    .controller('indexController', ['$scope', '$cookieStore','$cookies', function ($scope, $cookieStore,$cookies) {
        console.log('akga')
        $scope.username =$cookies.get('connect.sid');
        console.log($cookies);
        console.log($cookieStore);

        console.log($scope.username)
    }]);