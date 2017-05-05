function getMockData(url, params, callback) {
    //url 处理 '/user/get_user'

    $.getJSON('conversation-list.json', function (data) {


        var userInfos = {};

        params.forEach(function (item) {
            if (item.conversationType === 1) {
                userInfos[item.id] = data['userInfos'][item.id];
            } else if (item.conversationType === 3) {
                userInfos[item.id] = data['groupInfos'][item.id];
            }
        });

        callback(userInfos)
    });
}


function transConversations(conversations, callback) {

    if (conversations.length) {

        //获取需要查询用户列表
        var conversationUsers = [], userInfos;
        conversations.forEach(function (item) {
            conversationUsers.push({conversationType: item.conversationType, id: item.targetId});
        });

        //获取用户信息
        getMockData("/user/get_user", conversationUsers, function (data) {
            userInfos = data;

            conversations.forEach(function (item) {

                item["userInfo"] = userInfos[item.targetId];

            });

            callback(conversations);
        });


    } else {
        callback(conversations);
    }

}

function renderConversationView(translatedConversations, instance) {

    return new Vue({
        el: '#conversationListPage',
        data: {
            stat: {
                currentView: 'conversationList',
                currentUserInfo: {
                    "id": "user1",
                    "nickname": "产品",
                    "region": "86",
                    "phone": "13269772701",
                    "portraitUri": "http://img.duoziwang.com/2016/12/08/18594927932.jpg"
                },
                conversationList: translatedConversations
            }
        },
        components: {
            conversationList: {
                props: ['stat'],
                template: '#conversationList',
                methods: {
                    removeConversation: function (conversationType, targetId, index) {
                        var that = this;
                        instance.removeConversation(conversationType, targetId, {
                            onSuccess: function (bool) {
                                //删除会话成功。
                                console.log(bool);
                                //删除本地数据
                                that.stat.conversationList.splice(index, 1);
                            },
                            onError: function (error) {
                                // error => 删除会话的错误码
                                console.log(error);
                            }
                        });
                    },

                    clearConversation: function () {
                        var conversationTypes = [RongIMLib.ConversationType.PRIVATE, RongIMLib.ConversationType.GROUP];
                        instance.clearConversations(conversationTypes, {
                            onSuccess: function (bool) {
                                // 清除会话成功
                                console.log(bool);
                            },
                            onError: function (error) {
                                // error => 清除会话错误码。
                            }
                        });
                    }
                }
            }
        }
    });
}