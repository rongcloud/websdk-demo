"use strict";;
(function(dependencies) {

    var global = dependencies.global;
    var util = global._;

    var callUtil = dependencies.RongCallUtil;
    var MsgObserverList = callUtil.ObserverList;

    var RongIMLib = dependencies.RongIMLib;
    var RongIMClient = RongIMLib.RongIMClient;

    var messageTypes = {
        AcceptMessage: RongIMLib.AcceptMessage,
        RingingMessage: RongIMLib.RingingMessage,
        SummaryMessage: RongIMLib.SummaryMessage,
        HungupMessage: RongIMLib.HungupMessage,
        InviteMessage: RongIMLib.InviteMessage,
        MediaModifyMessage: RongIMLib.MediaModifyMessage,
        MemberModifyMessage: RongIMLib.MemberModifyMessage
    };

    /*
        根据 MessageType 返回 message 对象
        var params = {
            messageType:'TextMessage',
            content: { content: 'hello'}    // 消息体
        };
        var textMsg = messageFactory(params);
    */
    var messageFactory = function(params) {
        var content = params.content;
        var message = messageTypes[params.messageType] || util.noop;
        return new message(content);
    };

    var sendMessage = function(params, callback) {
        callback = callback || util.noop;

        var msg = messageFactory(params);

        var conversationType = params.conversationType;
        var targetId = params.targetId;

        var im = RongIMClient.getInstance();

        var isMentioned = false;
        var pushText = params.pushText || '';
        var appData = params.appData || '';

        im.sendMessage(conversationType, targetId, msg, {
            onSuccess: function(message) {
                var error = null;
                callback(error, message);
            },
            onError: function(code) {
                callback(code);
            }
        }, isMentioned, pushText, appData);
    };

    var commandItem = {
        /*
            params.conversationType
            params.targetId
            params.content
         */
        invite: function(params, callback) {
            params.messageType = 'InviteMessage';
            
            var content = params.content;
            
            var mediaType = content.mediaType;
            var inviteUserIds = content.inviteUserIds;
            var callId = content.callId;

            var appData = {
                mediaType: mediaType,
                userIdList: inviteUserIds,
                callId: callId
            };

            var pushItem = {
                1: '您有一条音频通话',
                2: '您有一条视频通话'
            };
            params.pushText = pushItem[mediaType];
            params.appData = JSON.stringify(appData);
            sendMessage(params, callback);
        },
        ringing: function(params, callback) {
            params.messageType = 'RingingMessage';
            sendMessage(params, callback);
        },
        /*
            params.conversationType
            params.targetId
            params.content
         */
        accept: function(params, callback) {
            params.messageType = 'AcceptMessage';
            sendMessage(params, callback);
        },

        /*
           params.conversationType
           params.targetId
           params.content
        */
        hungup: function(params, callback) {
            params.messageType = 'HungupMessage';
            sendMessage(params, callback);
        },
        /*
            params.conversationType
            params.targetId
            params.content
         */
        mediaModify: function(params, callback) {
            params.messageType = 'MediaModifyMessage';
            sendMessage(params, callback);
        },
        memberModify: function(params, callback) {
            params.messageType = 'MediaModifyMessage';
            sendMessage(params, callback);
        },
        getToken: function(params, callback) {
            var im = RongIMClient.getInstance();
            var engineType = 3;
            var channelId = params.channelId;
            im.getAgoraDynamicKey(engineType, channelId, {
                onSuccess: function(data) {
                    var error = null;
                    callback(error, data.dynamicKey);
                },
                onError: function(error) {
                    callback(error);
                }
            });

            // var uid = params.userId & 0x7fffffff;
            // var url = 'https://api.blinktalk.site:8800/token';
            // $.ajax({
            //     url : url,
            //     type : "POST",
            //     data : 'uid=' + uid + '&appid=1234567890abcdefg',
            //     async : true,
            //     success : function(data) {
            //         var error = null;
            //         callback(error, data);
            //     },
            //     error : function(error) {
            //         callback(error);
            //     }
            // });
        }
    };
    /*
        var params = {
            command: 'invite' | 'ringing' | 'accept' | 'hungup' | 'mediaModify' | 'memberModify' | 'getToken',
            data: {
                conversationType: 1,
                targetId: '',
                content: {}
            }
        };
     */
    var sendCommand = function(params, callback) {
        var command = params.command;
        var data = params.data;
        commandItem[command] && commandItem[command](data, callback);
    };

    var watcher = new MsgObserverList();

    var watch = function(listener) {
        watcher.add(listener);
    };

    // WebSDK VoIP message adapter.
    RongIMClient._voipProvider = {
        onReceived: function(message) {
            if (message.offLineMessage) {
                return;
            }
            watcher.notify(message);
        }
    };

    global.MessageCtrl = {
        sendCommand: sendCommand,
        watch: watch
    };

})({
    global: window,
    RongIMLib: RongIMLib,
    RongCallUtil: RongCallUtil
});