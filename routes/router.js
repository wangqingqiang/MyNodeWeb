/**
 * Created by Administrator on 2016/8/5 0005.
 */
var commonRoute=require('./commonRoute.js');

function router(app){
    app.get('/',commonRoute.showIndexPage);
    app.get('/index',commonRoute.showIndexPage);

}

module.exports=router;