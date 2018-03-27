"use strict";;
(function(dependencies) {

    var global = dependencies.global;
    var util = global._;

    var callUtil = dependencies.RongCallUtil;
    var MsgObserverList = callUtil.ObserverList;
    var tplEngine = callUtil.tplEngine;

    var RongIMLib = dependencies.RongIMLib;
    var RongIMClient = RongIMLib.RongIMClient;

    var tools = {
        request: function(options) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var result = xhr.responseText || "{}";
                    result = JSON.parse(result);
                    options.success && options.success(result);
                }
            };

            var method = options.url;
            var url = options.url;
            var method = options.method || 'GET';
            xhr.open(method, url);
            var headers = options.headers;
            for (var key in headers) {
                var value = headers[key];
                xhr.setRequestHeader(key, value);
            }
            var body = JSON.stringify(options.body);
            xhr.send(body);
        }
    };

    var UserCache = { };

    var tpl = 'http://localhost:8585/{path}';
    var sendMessage = function(params, callback) {
        callback = callback || util.noop;

        var callId = params.content.callId;
        var toUserIds = UserCache[callId];

        var im = RongIMClient.getInstance();
        var senderId = im.getCurrentUserId();

        var body = _.omit(_.extend(params, {
            toUserIds: toUserIds,
            senderId: senderId,
        }), 'conversationType', 'targetId');
        
        var url = tplEngine(tpl, {
            path: 'send_msg'
        });
        tools.request({
            url: url,
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(){
                var url = tplEngine(tpl, {
                    path: 'get_media_id'
                });
                // 获取 MediaId
                tools.request({
                    url: url,
                    success: function(result){
                        var msg = _.extend(params, {
                            sentTime: result.mediaId,
                            senderUserId: senderId
                        });
                        var error = null;
                        callback(error, msg);
                    }
                });
            }
        });
    };

    var createCallId = function() {
        var random = Math.floor(Math.random() * 10000);
        var time = Date.now();
        var id = (random + time).toString(16);
        return ['c', id].join('_');
    };
    var commandItem = {
        /*
            params.conversationType
            params.targetId
            params.content
         */
        invite: function(params, callback) {
            params.objectName = 'RC:VCInvite';

            var content = params.content;

            var mediaType = content.mediaType;
            var inviteUserIds = content.inviteUserIds;

            var callId = createCallId();

            UserCache[callId] = inviteUserIds;

            _.extend(content, {
                callId: callId,
                channelInfo: {
                    Id: callId,
                    Key: ''
                }
            });

            var appData = {
                mediaType: mediaType,
                userIdList: inviteUserIds,
                callId: callId
            };

            var pushItem = {
                1: '您有一条音频通话',
                2: '您有一条视频通话'
            };
            var pushText = pushItem[mediaType];
            var appData = JSON.stringify(appData);

            _.extend(params, {
                pushText: pushText,
                appData: appData
            });
            
            sendMessage(params, callback);
        },
        ringing: function(params, callback) {
            params.objectName = 'RC:VCRinging';
            sendMessage(params, callback);
        },
        /*
            params.conversationType
            params.targetId
            params.content
         */
        accept: function(params, callback) {
            params.objectName = 'RC:VCAccept';
            sendMessage(params, callback);
        },

        /*
           params.conversationType
           params.targetId
           params.content
        */
        hungup: function(params, callback) {
            params.objectName = 'RC:VCHangup';
            sendMessage(params, callback);
        },
        /*
            params.conversationType
            params.targetId
            params.content
         */
        mediaModify: function(params, callback) {
            params.objectName = 'RC:VCModifyMedia';
            sendMessage(params, callback);
        },
        memberModify: function(params, callback) {
            params.objectName = 'RC:VCModifyMem';
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
            var isInvite = (message.messageType == 'InviteMessage')
            if (isInvite) {
                var content = message.content;
                var callId = content.callId;
                var toUserIds = content.inviteUserIds;
                toUserIds.push(message.senderUserId);
                UserCache[callId] = toUserIds; 
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