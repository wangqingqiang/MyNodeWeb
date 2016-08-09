/**
 * Created by wqq on 2016/8/9.
 */
;angular.module('app.Service', [])
    .service('signService', ['$http', function ($http) {
        this.checkIsSignin = function () {
            return $http({
                method: 'GET',
                url: '/checkIsSignin'
            })
        };

    }]);