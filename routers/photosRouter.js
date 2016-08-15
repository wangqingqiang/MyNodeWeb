/**
 * Created by wqq on 2016/8/5.
 */
var photosModel=require('../models/photos.js');

function getAllAlbums(req,res,next){
    photosModel.getAllAlbums(function(error,albums){
        if(error){
            res.send('505');
        }
        else{
            res.send(albums);
        }
    })
}
function getPhotosByAlbumName(req,res,next){
    var albumName=req.query.albumName;
    photosModel.getPhotosByAlbumName(albumName,(error,photos)=>{
        if(error){
            res.send([]);
        }else{
            res.send(photos);
        }
    })
}

function getPhotoByPath(req,res,next){
    var pathname='/upload/Album/'+req.params.albumName+'/'+req.params.id;

    var options = {
        root: './',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = pathname;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            // console.log('Sent:', fileName);
        }
    });
}

function updatePhoto (req,res,next){

    var option={
        uploadDir:'./upload/.temp',
        keepExtensions : true,
        maxFieldsSize : 2 * 1024 * 1024 //文件最大值，单位B，即使上传的文件大于此值，下面form.parse方法也不会报错，只是不会上传文件
    };
    photosModel.updatePhoto(req,option,function(error,album){
        if(error){
            console.log(error);
            if(error.__type===0){
                res.render('500');
                //res.redirect('/500error')
            }
            else{
                res.json({result:'fail',msg:'图片尺寸超过限制！'})
            }
        }else {
            // res.redirect(`/${album}`);
            res.json({result:'success',msg:'图片上传成功，请去相应的相册查看！'})
        }
    });
}

module .exports={
    getAllAlbums,
    getPhotosByAlbumName,
    getPhotoByPath,
    updatePhoto
}