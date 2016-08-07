/**
 * Created by Administrator on 2016/8/8 0008.
 */
var formidable=require('formidable');
var jobModel=require('../models/job.js');

function jobSearch(req,res,next){
    var form=formidable.IncomingForm();
    form.parse(req,function(error,fields,files){
        if(error){
            res.status(500);
            res.send('500');
        }else{
            jobModel.jobSearch(fields.yx,fields.city,fields.positionName,fields.pageIndex,(error,data)=>{
                if(error){
                    res.render('500');
                }else{
                    res.json(data);
                }
            })
        }
    })
}

module.exports={
    jobSearch
}