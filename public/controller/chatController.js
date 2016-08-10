/**
 * Created by wqq on 2016/8/10.
 */
;angular.module('app.chatRoom.controller',[])
.controller('chatController',['$scope','$state',function($scope,$state){
    $scope.nickName='';
    $scope.messageContent='';
    $scope.messages=[];
    $scope.uid=new Date().getTime();

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

    var socket=io();
    socket.on('message',function(msg){
        $scope.$apply(function(){
            $scope.messages.push(msg);
        });
    });
    $scope.sendMsg=function(){
        if(!$scope.messageContent){
            return false;
        }
        socket.emit('message',{nickName:$scope.nickName,msg: $scope.messageContent,uid:$scope.uid});
        $scope.messageContent='';
    };
    $scope.keyDown=function(e){
        var event=e||window.event;
        if(event.keyCode==13){
            $scope.sendMsg();
        }
    }
}])