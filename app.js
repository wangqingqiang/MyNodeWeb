/**
 * Created by wqq on 2016/7/14.
 */
var express=require('express');
var ejs=require('ejs');
var router=require('./routers/router.js');
var session=require('express-session');

var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('views','./views');
app.engine('.html', ejs.__express);
app.set('view engine','html');
//设置静态服务路由
//注意此处是 /static路由 ，但是目录是 ./Public，一个带 '.'，一个不带
app.use('/static',express.static('./public'));

router(app);
// 路由前面都是没有'.'的，否则匹配不上，
//注意此处不是app.use，app.use不是精确匹配，它可以匹配到书写的路由后面的子路由，
// 例如app.use(/admin,callback)可以匹配到 /admin/adminlist/adminid等
var customs=[];
var sockets=[];
io.on('connection',function(socket){
    sockets.push(socket);
    socket.on('addUser',(user)=>{
        customs.push(user);
        io.emit('addUser',customs);

    });
    socket.on('message',(msg)=>{
        io.emit('message',msg);
    });
    socket.on('disconnect',()=>{
        var index=sockets.indexOf(socket);
        sockets.splice(index,1);
       var user= customs.splice(index,1);
        io.emit('delUser',{customs:customs,user:user[0]});

    })
})

http.listen(process.env.PORT || 5050)