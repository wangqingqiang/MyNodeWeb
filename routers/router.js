/**
 * Created by Administrator on 2016/8/5 0005.
 */
var commonRouter=require('./commonRouter.js');
var photosRouter=require('./photosRouter.js');
var jobRouter=require('./jobRouter.js');
var signRouter=require('./signRouter.js');

function router(app){
    //默认主页路由
    app.get('/',commonRouter.showIndexPage);
    app.get('/index',commonRouter.showIndexPage);
    app.get('/index.html',commonRouter.showIndexPage);
    app.get('/favicon.ico',commonRouter.showIco);

    //登录注册路由
    app.post('/signIn',signRouter.signIn);
    app.post('/signUp',signRouter.signUp);

    //相册模块路由
    app.get('/getAlbums',photosRouter.getAllAlbums);
    app.get('/getPhotosByAlbumName',photosRouter.getPhotosByAlbumName);
    app.get('/photos/:albumName/:id',photosRouter.getPhotoByPath);
    app.post('/photos/update',photosRouter.updatePhoto)

    //爬取拉钩数据路由
    app.post('/jobSearch',jobRouter.jobSearch);

    app.use(commonRouter.show404Page);

}

module.exports=router;