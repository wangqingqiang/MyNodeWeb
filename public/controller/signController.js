/**
 * Created by wqq on 2016/8/8.
 */
;angular.module('app.sign.controller', ['ngCookies'])
    .controller('signController', ['$rootScope','$scope', '$state','$stateParams', '$http','checkSignin','$cookies', function ($rootScope,$scope, $state,$stateParams, $http,checkSignin,$cookies) {
        $scope.sign_in = true;
        $scope.sign_up = false;

        if($stateParams.sign_up){
            $scope.sign_in = false;
            $scope.sign_up = true;
        }
        if (checkSignin && checkSignin.data && checkSignin.data.result == 'success') {
            $state.go('index');
        }else {
            $rootScope.isSignin=false;
            $rootScope.username =$cookies.get('username');

        }
        $scope.signIn = function () {
            $scope.sign_in = true;
            $scope.sign_up = false;
            $scope.formData = {};
            $scope.formChange();
        }
        $scope.signUp = function () {
            $scope.sign_in = false;
            $scope.sign_up = true;
            $scope.formData = {};
            $scope.formChange();

        }

        $scope.formData = {};
        $scope.doSignIn = function () {
            var username = $scope.formData.sign_in_username,
                password = $scope.formData.sign_in_password;
            if (!username || !password) {
                $scope.sign_in_errorMsg = '用户名或密码不能为空！';
                return;
            }
            $http({
                method: 'POST',
                url: '/SignIn',
                data: {'username': username, 'password': password}
            })
                .success(function (data) {
                    if (data.result == 'success') {
                        $rootScope.isSignin=true;
                        $rootScope.username =$cookies.get('username');

                        $state.go('index');
                    } else {
                        if (data.error_type == 0) {
                            $state.go('500page');
                            return;
                        } else if (data.error_type == 1) {
                            $scope.sign_in_errorMsg = data.msg;
                        }
                    }
                })
                .error(function (error) {
                    console.log(error);
                    $state.go('500page');
                    return;
                })
        };
        $scope.doSignUp = function () {

            var username = $scope.formData.sign_up_username,
                password = $scope.formData.sign_up_password,
                repeatPassword = $scope.formData.sign_up_repeatPassword;
            if (!username || !password) {
                $scope.sign_up_errorMsg = '用户名或密码不能为空！';
                return false;
            }
            if (password !== repeatPassword) {
                $scope.sign_up_errorMsg = '两次密码必须一致！';
                return false;
            }
            $http({
                method: 'POST',
                url: '/SignUp',
                data: {
                    'username': $scope.formData.sign_up_username,
                    'password': $scope.formData.sign_up_password,
                    repeatPassword: repeatPassword
                }
            })
                .success(function (data) {
                    if (data.result == 'success') {
                        $rootScope.isSignin=true;
                        $rootScope.username =$cookies.get('username');

                        $state.go('index');
                    } else {
                        if (data.error_type == 0) {
                            $state.go('500page');
                            return;
                        } else {
                            $scope.sign_up_errorMsg = data.msg;
                            return false;
                        }
                    }
                })
                .error(function (error) {
                    console.log(error);
                    $state.go('500page');
                    return;
                })
        };

        //表单改变时错误消息关闭
        $scope.formChange = function () {
            $scope.sign_up_errorMsg = '';
            $scope.sign_in_errorMsg = '';
        }
    }]);