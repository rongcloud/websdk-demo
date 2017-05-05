function renderHistoryMessages(list, hasMsg, instance) {
    return new Vue({
        el: '#chatPage',
        data: {
            stat: {
                currentView: 'chat',
                currentUserInfo: {
                    "id": "user1",
                    "nickname": "产品",
                    "region": "86",
                    "phone": "13269772701",
                    "portraitUri": "http://img.duoziwang.com/2016/12/08/18594927932.jpg"
                },
                targetUserInfo: {
                    "id": "user2",
                    "nickname": "开发",
                    "region": "86",
                    "phone": "13269772702",
                    "portraitUri": "http://www.tshseo.com/uploads/allimg/141012/21130U347-12.jpg"
                },
                messageList: list,
                sendMsgVal: ''
            }
        },
        components: {
            chat: {
                props: ['stat'],
                template: '#chat',
                methods: {
                    sendMsg: function () {
                        var text = this.stat.sendMsgVal;
                        if (!text) {
                            return false;
                        }
                        var msg = new RongIMLib.TextMessage({content: text, extra: "附加信息"});
                        var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
                        var targetId = "user2"; // 目标 Id
                        var that = this;
                        instance.sendMessage(conversationType, targetId, msg, {
                                // 发送消息成功
                                onSuccess: function (message) {
                                    that.stat.sendMsgVal = '';
                                    that.stat.messageList.push(message);
                                    that.$nextTick(that.scrollEnd);
                                }
                            }
                        );
                    },
                    scrollEnd: function () {
                        //添加完消息 跳转到最后一条
                        var list = document.querySelectorAll('.message-item');
                        if (list.length > 1) {
                            var last = list[list.length - 1];
                            last.scrollIntoView();
                        }
                    }
                },
                mounted: function () {
                    this.scrollEnd();
                }
            }
        }
    });
}

