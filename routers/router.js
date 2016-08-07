/**
 * Created by Administrator on 2016/8/5 0005.
 */
var commonRouter=require('./commonRouter.js');
var photosRouter=require('./photosRouter.js');
var jobRouter=require('./jobRouter.js');

function router(app){
    app.get('/',commonRouter.showIndexPage);
    app.get('/index',commonRouter.showIndexPage);
    app.get('/index.html',commonRouter.showIndexPage);
    app.get('/favicon.ico',commonRouter.showIco);

    app.get('/getAlbums',photosRouter.getAllAlbums);
    app.get('/getPhotosByAlbumName',photosRouter.getPhotosByAlbumName);
    app.get('/photos/:albumName/:id',photosRouter.getPhotoByPath);
    app.post('/photos/update',photosRouter.updatePhoto)

    app.post('/jobSearch',jobRouter.jobSearch);

    app.use(commonRouter.show404Page);

}

module.exports=router;