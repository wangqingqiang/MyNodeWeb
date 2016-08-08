/**
 * Created by wqq on 2016/8/8.
 */
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var db=require('../dao/db.js');

var userSchema=new Schema({
  username:{
      type:String
  },
    password:{
        type:String
    },
    sex:{
        type:String
    }
});

var userModel=db.model('User',userSchema);

module.exports=userModel;
