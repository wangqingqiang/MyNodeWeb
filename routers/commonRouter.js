/**
 * Created by Administrator on 2016/8/5 0005.
 */
function showIco(req,res,next){
    res.render('');
}
function showIndexPage(req, res, next) {
    res.render('index');
}

function show404Page(req,res,next){
    res.status(404);
    res.render('404Page');
}


module.exports = {
    showIco,
    showIndexPage,
    show404Page
};