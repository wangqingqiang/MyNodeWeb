/**
 * Created by wqq on 2016/8/8.
 */

var formidable = require('formidable');
var User = require('../models/UserModel.js');

function checkIsSignin(req, res, next) {
    if (req.session.signin && req.session.username) {
        var hour = 3600000;//+(1*1000*60*60*8);//一周
        var username = req.session.username;
        res.cookie('username', username, {
            expires: new Date(Date.now() + hour),
            maxAge: hour,
            path: '/',
            httpOnly: true
        });
        req.session.signin = true;
        req.session.username = username;
        req.session.cookie.expires = new Date(Date.now() + hour);
        req.session.cookie.maxAge = hour;
        req.session.cookie.path = '/';

        res.json({result: 'success'});
    } else {
        res.json({result: 'fail'});
    }
};
//登录
function signIn(req, res, next) {
    var form = formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        if (error) {
            console.log(error);
            res.json({result: 'fail', error_type: 0, msg: '系统错误！'});
            return;
        } else {
            var username = fields.username.trim();
            var password = fields.password.trim();
            if (!username || !password) {
                res.json({result: 'fail', error_type: 1, msg: '用户名或密码不能为空！'}); // 1:用户名或者密码错误
                return;
            }
            User.findOne({username: username}, function (error, user) {
                if (error) {
                    console.log(error);
                    res.json({result: 'fail', error_type: 0, msg: '系统错误！'}); // 0:查询数据库错误
                } else {
                    if (!user) {
                        // 没有查到数据时 user===null
                        res.json({result: 'fail', error_type: 1, msg: '用户名或密码错误！'}); // 1:用户名或者密码错误
                    } else {
                        if (user.password == password) {
                            var hour = 3600000;//1*1000*60*60*24*7;//一周
                            res.cookie('username', username, {
                                expires: new Date(Date.now() + hour),
                                maxAge: hour,
                                path: '/',
                                httpOnly: true

                            });

                            req.session.signin = true;
                            req.session.username = username;
                            req.session.cookie.expires = new Date(Date.now() + hour);
                            req.session.cookie.maxAge = hour;
                            req.session.cookie.path = '/';

                            res.json({result: 'success'})
                        } else {
                            res.json({result: 'fail', error_type: 1, msg: '用户名或密码错误！'}); // 1：用户名或者密码错误
                        }
                    }
                }
            })
        }
    })
}
//注册
function signUp(req, res, next) {
    var form = formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        if (error) {
            console.log(error);
            res.json({result: 'fail', error_type: 0, msg: '系统错误！'});
        } else {
            var username = fields.username.trim();
            var password = fields.password.trim();
            var repeatPassword = fields.repeatPassword.trim();

            if (!username || !password) {
                res.json({result: 'fail', error_type: 1, msg: '用户名或密码不能为空！'}); // 1:用户名或者密码不能为空
                return;
            }
            if (repeatPassword != password) {
                res.json({result: 'fail', error_type: 1, msg: '两次密码必须一致！'}); // 1:两次密码必须一致
                return;
            }
            User.findOne({username: username}, function (error, user) {
                // 没有查到数据时 user===null
                if (error) {
                    console.log(error);
                    res.json({result: 'fail', error_type: 0, msg: '系统错误！'}); // 0:数据库操作错误
                } else {
                    if (user) {
                        res.json({result: 'fail', error_type: 2, msg: '用户名已存在！'}); // 2:用户已存在
                    } else {
                        User.create({username: username, password: password}, function (error, user) {
                            if (error) {
                                res.json({result: 'fail', error_type: 0, msg: '系统错误！'}); // 0:数据库操作错误
                            } else {
                                var hour = 3600000;//+(1*1000*60*60*8);//一周
                                res.cookie('username', username, {
                                    expires: new Date(Date.now() + hour),
                                    maxAge: hour,
                                    path: '/',
                                    httpOnly: true

                                });

                                req.session.signin = true;
                                req.session.username = username;
                                req.session.cookie.expires = new Date(Date.now() + hour);
                                req.session.cookie.maxAge = hour;
                                req.session.cookie.path = '/';

                                res.json({result: 'success'});
                            }
                        })
                    }
                }
            })
        }
    })
}

module.exports = {
    checkIsSignin,
    signIn,
    signUp
}