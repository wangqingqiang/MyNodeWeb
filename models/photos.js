/**
 * Created by wqq on 2016/8/5.
 */
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var common=require('../common/common.js');

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
function getPhotosByAlbumName(albumName,callback){
    var albumPath = `./upload/Album/${albumName}`;
    var photos = [];

    fs.readdir(albumPath, (error, files)=> {
        if (error) {
            callback(error, null);
        } else {
            (function isFile(i) {
                if (i === files.length) {
                    callback(null, photos);
                    return;
                }
                var file = files[i];
                fs.stat(albumPath + '/' + file, (error, stats)=> {
                    if (error) {
                        //不能因为一个文件有问题就不展示所有图片
                        console.log(error);
                    } else {
                        var extname = path.extname(file).toLowerCase();
                        var extSupport = ['.jpg', '.png', '.jpeg', '.gif', '.bmp', '.ico']
                        //判断是否是图片格式
                        if (stats.isFile() && (extSupport.indexOf(extname) > -1)) {
                            photos.push(file);
                        }
                    }
                    isFile(++i);
                })
            })(0)
        }
    })
}
function updatePhoto(req,option,callback){
    var form = new formidable.IncomingForm();

    form.uploadDir = option.uploadDir;
    form.keepExtensions = option.keepExtensions;
    form.maxFieldsSize = option.maxFieldsSize;//文件最大值，单位B，即使上传的文件大于此值，下面form.parse方法也不会报错，只是不会上传文件

    fs.stat(form.uploadDir, (error, stats)=> {
        if (error) {
            fs.mkdir(form.uploadDir, (error)=> {
                if (error) {
                    error.__type = 0;
                    callback(error, null);
                }
                else {
                    form.parse(req, function (err, fields, files) {
                        if (err) {
                            err.__type = 0;
                            callback(error, null);

                        }
                        else {
                            var album = fields.album;
                            var img = files.img;
                            if (Math.ceil(img.size) > form.maxFieldsSize) {
                                fs.unlink('./' + img.path, (error)=> {
                                    if (error) {
                                        error.__type = 0;
                                    }
                                    else {
                                        error = new Error(`图片尺寸超过${form.maxFieldsSize}B`);
                                        error.__type = 1;
                                    }
                                    callback(error, null);

                                })
                            }
                            else {
                                fs.rename('./' + img.path, `./upload/Album/${album}/${common.createTimeStamp() + img.name}`, (error)=> {
                                    if (error) {
                                        error.__type = 0;
                                        callback(error, null);
                                    }
                                    else {
                                        callback(null, album);
                                    }
                                })
                            }
                        }
                    });
                }
            })
        }
        else {
            form.parse(req, function (err, fields, files) {
                if (err) {
                    err.__type = 0;
                    callback(error, null);

                }
                else {
                    var album = fields.album;
                    var img = files.img;
                    if (parseInt(img.size) > form.maxFieldsSize) {
                        fs.unlink('./' + img.path, (error)=> {
                            if (error) {
                                error.__type = 0;
                            }
                            else {
                                error = new Error(`图片尺寸超过${form.maxFieldsSize}B`);
                                error.__type = 1;
                            }
                            callback(error, null);

                        })
                    }
                    else {
                        fs.rename('./' + img.path, `./upload/Album/${album}/${common.createTimeStamp() + img.name}`, (error)=> {
                            if (error) {
                                error.__type = 0;
                                callback(error, null);
                            }
                            else {
                                callback(null, album);
                            }
                        })
                    }
                }
            });
        }
    })

}

module.exports={
    getAllAlbums,
    getPhotosByAlbumName,
    updatePhoto
}