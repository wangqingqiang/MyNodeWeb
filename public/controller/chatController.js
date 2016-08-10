/**
 * Created by wqq on 2016/8/10.
 */
;angular.module('app.chatRoom.controller',[])
.controller('chatController',['$scope','$state',function($scope,$state){
    $scope.setNickName= function () {
        var nickName=prompt('请输入一个昵称：');
        if(nickName===null){
            $state.go('index');
        }else if(nickName===''){
            $scope.setNickName();
        }else {
            $scope.nickName=nickName;
        }
    };
    $scope.setNickName();
    //$scope.messages=[];
    //var socket=io();
    //socket.on('message',function(msg){
    //   // $scope.$apply(function(){
    //        $scope.messages.push(msg);
    //    //});
    //});
    //$scope.sendMsg=function(){
    //    socket.emit('message',$('#message').val());
    //}
}])