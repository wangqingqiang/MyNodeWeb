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

module .exports={
    getAllAlbums
}