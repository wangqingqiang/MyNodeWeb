/**
 * Created by wqq on 2016/8/10.
 */
;angular.module('app.chatRoom.controller',[])
.controller('chatController',['$scope','$state',function($scope,$state){
    $scope.nickName=''; //昵称
    $scope.messageContent=''; //输入框
    $scope.users=[];    //当前在线用户
    $scope.messages=[]; // 消息列表
    $scope.uid=new Date().getTime();//当前用户的id

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
    socket.emit('addUser',{uid:$scope.uid,nickName:$scope.nickName});
    socket.on('addUser',function(customs){
        $scope.$apply(function(){
            $scope.users=customs;
            $scope.messages.push({msg:customs[customs.length-1].nickName+' 加入聊天室',type:'server'});
        });
    });
    socket.on('delUser',function(data){
        $scope.$apply(function(){
            $scope.users=data.customs;
            $scope.messages.push({msg:data.user.nickName+' 退出聊天室',type:'server'});
        });
    })

    socket.on('message',function(msg){
        $scope.$apply(function(){
            $scope.messages.push(msg);
        });
        angular.element('.showMsg')[0].scrollTop=angular.element('.showMsg')[0].scrollHeight;
    });
    $scope.sendMsg=function(){
        if(!$scope.messageContent){
            return false;
        }
        socket.emit('message',{nickName:$scope.nickName,msg: $scope.messageContent,uid:$scope.uid});
        $scope.messageContent='';
    };
    $scope.keyUp=function(e){
        var event=e||window.event;
        if(event.keyCode==13){
            $scope.sendMsg();
        }
    }
}])