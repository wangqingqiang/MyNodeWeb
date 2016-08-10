/**
 * Created by Administrator on 2016/8/8 0008.
 */
;angular.module('app.job.service', [])
    .service('jobService', ['$http', function ($http) {
        var citys = ['北京', '上海', '广州', '深圳', '杭州', '天津', '成都', '西安', '南京', '苏州'];
        var salary = ['2k以下', '2k-5k', '5k-10k', '10k-15k', '15k-25k', '25k-50k', '50k以上'];
        this.getCitys = function () {

            return citys;
        }
        this.getSalary = function () {
            return salary;
        }
    }]);