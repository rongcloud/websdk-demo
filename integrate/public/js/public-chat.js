/**
 * Created by wangchengkuo on 17/4/12.
 */
function getPublicChat(instance,_options) {
    var options = {
        props: ['stat'],
        template: 'template/public-chat.html',
        methods: {
            goPublicList: function () {
                this.stat.currentView = 'publicList';
            },
            goPublicInfo: function () {
                this.stat.currentView = 'publicInfo';
            },
            goPublicArticle: function (url) {
                this.stat.currentView = 'publicArticle';
                this.stat.articleUrl = url;
            },
            sendMsg: function () {
                var that = this;
                var text = this.stat.sendMsgVal || 'hello';
                var msg = new RongIMLib.TextMessage({content: text, extra: "公众号"});
                var conversationtype = RongIMLib.ConversationType.PUBLIC_SERVICE;
                var targetId = this.stat.currentPublic.publicServiceId;
                instance.sendMessage(conversationtype, targetId, msg, {
                        // 发送消息成功
                        onSuccess: function (message) {
                            //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                            console.log("Send successfully");
                            that.stat.msgList.push(message);
                            that.stat.sendMsgVal = '';
                            that.$nextTick(that.scrollEnd);
                        },
                        onError: function (errorCode, message) {
                            var info = '';
                            switch (errorCode) {
                                case RongIMLib.ErrorCode.TIMEOUT:
                                    info = '超时';
                                    break;
                                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                    info = '未知错误';
                                    break;
                                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                    info = '在黑名单中，无法向对方发送消息';
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                    info = '不在讨论组中';
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                    info = '不在群组中';
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                    info = '不在聊天室中';
                                    break;
                                default :
                                    info = '未知';
                                    break;
                            }
                            console.log('发送失败:' + info);
                        }
                    }
                );
            },
            renderHistoryMessages: function (targetId, callback) {
                //获取历史消息
                instance.getHistoryMessages(RongIMLib.ConversationType.PUBLIC_SERVICE, targetId, 0, 20, {
                    onSuccess: function (list, hasMsg) {
                        //console.log(arguments);
                        callback(list, hasMsg);
                        // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
                        // list 为拉取到的历史消息列表
                    },
                    onError: function (error) {
                        console.log('获取历史消息error' + error);
                        // APP未开启消息漫游或处理异常
                        // throw new ERROR ......
                    }
                });
            },
            scrollEnd: function () {
                //添加完消息 跳转到最后一条
                var list = document.querySelectorAll('.message-item');
                if (list.length && list.length - 1) {
                    var last = list[list.length - 1];
                    last.scrollIntoView();
                }


            }
        },
        mounted: function () {
            //console.log(this.stat.currentPublic.menu);
            var that = this;
            var targetId = this.stat.currentPublic.publicServiceId;


            //渲染历史消息
            /*this.renderHistoryMessages(targetId,function (list,hasMsg) {
             if (list.length) {
             that.stat.msgList=list;
             console.log(list)
             }
             that.$nextTick(that.scrollEnd);
             });*/


            //模拟获取历史消息
            //获取用户info
            $.getJSON('public-mock-data.json?11', function (data) {
                console.log(data);
                var userInfo = data.userInfo;
                that.stat.userInfo = userInfo;
                var msgList = data.msgList;
                that.stat.msgList = msgList;
            });

            $('title').text(this.stat.currentView);

        }
    };
    return common.getComponent(options);
}