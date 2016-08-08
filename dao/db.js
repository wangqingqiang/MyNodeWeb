/**
 * Created by wqq on 2016/8/8.
 */
var mongoose=require('mongoose');
var config=require('../config.js');
var dbUrl=config.dburl;

var db=mongoose.createConnection(dbUrl);
db.on('error',(error)=>{
    console.log('数据库连接错误！');
});
db.once('open',function(){
    //一次打开记录
    console.log('数据库成功连接！');
});

module.exports=db;