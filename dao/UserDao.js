/**
 * Created by wqq on 2016/8/8.
 */
var mongoose=require('mongoose');
var user=require('../models/UserModel.js');
user.find({username:'1018893786'},function(error,result){
    console.log(result);
})