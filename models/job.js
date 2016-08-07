/**
 * Created by Administrator on 2016/8/8 0008.
 */
var http = require('http');
var querystring = require('querystring');

function jobSearch(yx,city,positionName,pageIndex,callback){
    var positionResult='';

    var postData = querystring.stringify({
        'first': false,
        'pn': pageIndex,
        'kd': positionName
    })
    var options = {
        protocol: 'http:',
        hostname: 'www.lagou.com',
        port:80,
        path: `/jobs/positionAjax.json?px=default&yx=${yx}&city=${city}&needAddtionalResult=false`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
        }
    }
    var req = http.request(options, (res) => {
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            positionResult += chunk;
        });
        res.on('end', () => {
            callback(null,positionResult);
        })
    });
    req.on('error', (error) => {
        callback(error,null);
    });
    req.write(postData);
    req.end();
}

module.exports  ={
    jobSearch
}