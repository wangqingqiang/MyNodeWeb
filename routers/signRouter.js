/**
 * Created by wqq on 2016/8/8.
 */

var formidable=require('formidable');
var User=require('../models/UserModel.js');

//登录
function signIn (req,res,next){
    var form =formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        if(error){
            console.log(error);
            res.json({result:'fail'});
        }else{
            var username=fields.username;
            var password=fields.password;
            if(!username||!password){
                res.json({result:'fail',error_type:1}); // 1:用户名或者密码错误
                return;
            }
            User.findOne({username:username},function(error,user){
                // 没有查到数据时 user===null
                if(error){
                    console.log(error);
                    res.json({result:'fail',error_type:0}); // 0:查询数据库错误
                }else {
                    if(!user){
                        res.json({result:'fail',error_type:1}); // 1:用户名或者密码错误
                    } else{
                        if(user.password==password){
                            res.json({result:'success'})
                        }else {
                            res.json({result:'fail',error_type:1}); // 1：用户名或者密码错误
                        }
                    }
                }
            })
        }
    })
}
//注册
function signUp (req,res,next){
    var form =formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        if(error){
            console.log(error);
            res.json({result:'fail'});
        }else{
            var username=fields.username;
            var password=fields.password;
            if(!username||!password){
                res.json({result:'fail',error_type:1}); // 1:用户名或者密码不能为空
                return;
            }
            User.findOne({username:username},function(error,user){
                // 没有查到数据时 user===null
                if(error){
                    console.log(error);
                    res.json({result:'fail',error_type:0}); // 0:数据库操作错误
                }else {
                    if(user){
                        res.json({result:'fail',error_type:2}); // 2:用户已存在
                    } else{
                        User.create({username:username,password:password}, function (error,user) {
                            if(error){
                                res.json({result:'fail',error_type:0}); // 0:数据库操作错误
                            }else {
                                console.log(user);
                                res.json({result:'success'});
                            }
                        })
                    }
                }
            })
        }
    })
}

module.exports={
    signIn,
    signUp
}