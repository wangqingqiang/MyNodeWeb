/**
 * Created by wqq on 2016/8/8.
 */
;angular.module('app.sign.controller', [])
    .controller('signController', ['$scope', '$state', '$http', function ($scope, $state, $http) {
        $scope.sign_in = true;
        $scope.sign_up = false;
        $scope.signIn = function () {
            $scope.sign_in = true;
            $scope.sign_up = false;
        }
        $scope.signUp = function () {
            $scope.sign_in = false;
            $scope.sign_up = true;
        }
/*        $scope.doSignIn = function () {
            var username = $('#sign_in_username').val();
            var password = $('#sign_in_password').val()
            if (!username || !password) {
                alert('用户名或密码不能为空！');
                return false;
            }
            $.ajax({
                method: 'POST',
                url: '/SignIn',
                data: {'username': username, 'password': password},
                success: function (data) {
                    if (data.result == 'success') {
                        $state.go('index');
                    } else {
                        if (data.error_type == 0) {
                            alert('500:sorry，系统错误！');
                        } else if (data.error_type == 1) {
                            alert('用户名或密码错误！')
                        }
                    }
                },
                error: function (error) {
                    console.log(error);
                    alert('500:sorry，系统错误！');
                }
            })
        }
        $scope.doSignUp = function () {
            var username = $('#sign_up_username').val();
            var password = $('#sign_up_password').val()
            var repeatPassword = $('#sign_up_repeatPassword').val()
            if (!username || !password) {
                alert('用户名或密码不能为空！');
                return false;
            }
            if (repeatPassword != password) {
                alert('两次密码必须一致！');
                return false;
            }
            $.ajax({
                method: 'POST',
                url: '/SignUp',
                data: {'username': username, 'password': password},
                success: function (data) {
                    if (data.result == 'success') {
                        $state.go('index');
                    } else {
                        if (data.error_type == 0) {
                            alert('500:sorry，系统错误！');
                        } else if (data.error_type == 1) {
                            alert('用户名或密码不能为空！')
                        } else if (data.error_type == 2) {
                            alert('用户名已存在！')
                        }
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }*/

        $scope.formData = {};
        $scope.doSignIn = function () {
            $http({
                method: 'POST',
                url: '/SignIn',
                data: {'username': $scope.formData.sign_in_username, 'password': $scope.formData.sign_in_password}
            })
                .success(function (data) {
                    if (data.result == 'success') {
                        $state.go('index');
                    } else {
                        if (data.error_type == 0) {
                            $state.go('500page');
                            return;
                        } else if (data.error_type == 1) {
                            alert('用户名或密码错误！')
                        }
                    }
                })
                .error(function (error) {
                    console.log(error);
                    $state.go('500page');
                    return;
                })
        }
        $scope.doSignUp = function () {
            $http({
                method: 'POST',
                url: '/SignUp',
                data: {'username': $scope.formData.sign_up_username, 'password': $scope.formData.sign_up_password}
            })
                .success(function (data) {
                    if (data.result == 'success') {
                        $state.go('index');
                    } else {
                        if (data.error_type == 0) {
                            $state.go('500page');
                            return;
                        } else if (data.error_type == 1) {
                            alert('用户名或密码不能为空！')
                        } else if (data.error_type == 2) {
                            alert('用户名已存在！')
                        }
                    }
                })
                .error(function (error) {
                    console.log(error);
                    $state.go('500page');
                    return;
                })
        }
    }])