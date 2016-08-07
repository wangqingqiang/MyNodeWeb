/**
 * Created by Administrator on 2016/8/7 0007.
 */
var sd = require('silly-datetime');

function createTimeStamp() {
    //生成由 年月日时分秒+“0——f”内任意6位构成的随机数，前面14位，后面6位，共20位随机数
    var date = new Date();
    var timestamp = sd.format(date, 'YYYYMMDDHHmmss');
    var random = '0123456789abcdef';
    var length = random.length;
    for (var i = 0; i < 6; i++) {
        timestamp += random[Math.floor(Math.random() * length)];
    }
    return timestamp;
}

module.exports={
    createTimeStamp
}