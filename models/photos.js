/**
 * Created by wqq on 2016/8/5.
 */
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var sd = require('silly-datetime');

//同步方式获取相册列表
function getAllAlbums(callback) {
    var albumsPath = './upload/Album';
    var albums = [];

    fs.readdir(albumsPath, (error, files) => {
        if (error) {
            callback(error, null);
        } else {
            (function isDirectory(index) {
                    if (index === files.length) {
                        callback(null, albums);
                    } else {
                        var file = files[index];
                        fs.stat(`${albumsPath}/${file}`, (error, stats)=> {
                            if (error) {
                                //不能因为一个文件有问题就不展示所有图片
                                console.log(error);
                            }
                            else {
                                if (stats.isDirectory()) {
                                    albums.push(file);
                                }
                            }
                            isDirectory(++index);
                        })
                    }
                })(0)
        }
    })
}

module.exports={
    getAllAlbums
}