/*
使用流程：
    1、引入第三方 SDK
    2、引入 RongIMCallLib

开发流程：
    1、获取 Agora 最新插件、SDK
    2、设计暴露方式、API
    3、伪代码、Demo
    4、实现
约定：
    1、所有依赖通过参数传入
    2、所有 callback 第一个参数是 error， 第二个是返回值
*/

"use strict";
(function(dependencies) {
    var global = dependencies.win;
    var RongCallUtil = dependencies.RongCallUtil;
    var MessageCtrl = dependencies.MessageCtrl;
    var util = global._;

    var RongVoIP = global.RongVoIP;
    var joinRoom = RongVoIP.joinRoom;
    var quitRoom = RongVoIP.quitRoom;
    var enableAudio = RongVoIP.enableAudio;
    var enableVideo = RongVoIP.enableVideo;


    var callUtil = RongCallUtil;

    var sendCommand = MessageCtrl.sendCommand;

    var cache = callUtil.cache();

    var ObserverList = callUtil.ObserverList;

    var videoWatcher = new ObserverList();
    var commandWatcher = new ObserverList();
    var msgWatcher = new ObserverList();

    MessageCtrl.watch(function(message) {
        msgWatcher.notify(message);
        commandWatcher.notify(message);
    });

    var watch = function(listener) {
        msgWatcher.add(listener);
    };

    function Timer() {
        this.timout = 0;
        this.startTime = 0;
        this.start = function(callback, second) {
            second = second || 0;

            if (callback) {
                this.timeout = setTimeout(function() {
                    callback();
                }, second);
            }

            this.startTime = +new Date;
        };

        this.stop = function(callback) {

            clearTimeout(this.timeout);

            var endTime = +new Date;
            var startTime = this.startTime;
            var duration = endTime - startTime;

            return {
                start: startTime,
                end: endTime,
                duration: duration
            };
        };
    }

    var room = {
        isActive: false,
        init: function(params, callback) {
            if (this.isActive) {
                return;
            }
            params.url = config.url;
            joinRoom(params, callback);
            this.isActive = true;
        },
        reset: function() {
            this.isActive = false;
            cache.remove('session');
        }
    };

    var initRoom = function(params) {
        getToken(params, function(error, token) {
            if (error) {
                throw new Error(error);
            }

            params.token = token;

            room.init(params, function(error, result) {
                if (error) {
                    throw new Error(error);
                }
                videoWatcher.notify(result);
            });
        });
    };

    var config = {
        url: '',
        timeout: 30000,
    };

    var Reason = (function() {
        // key ：用描述和错误码组成，方便通过错错误码或者描述获取
        var result = {
            CANCEL1: {
                code: 1,
                info: '己方取消已发出的通话请求'
            },
            REJECT2: {
                code: 2,
                info: '己方拒绝收到的通话请求'
            },
            HANGUP3: {
                code: 3,
                info: '己方挂断'
            },
            BUSYLINE4: {
                code: 4,
                info: '己方忙碌'
            },
            NO_RESPONSE5: {
                code: 5,
                info: '己方未接听'
            },
            ENGINE_UN_SUPPORTED6: {
                code: 6,
                info: '己方不支持当前引擎'
            },
            NETWORK_ERROR7: {
                code: 7,
                info: '己方网络出错'
            },
            REMOTE_CANCEL11: {
                code: 11,
                info: '对方取消已发出的通话请求'
            },
            REMOTE_REJECT12: {
                code: 12,
                info: '对方拒绝收到的通话请求'
            },
            REMOTE_HANGUP13: {
                code: 13,
                info: '通话过程对方挂断'
            },
            REMOTE_BUSYLINE14: {
                code: 14,
                info: '对方忙碌'
            },
            REMOTE_NO_RESPONSE15: {
                code: 15,
                info: '对方未接听'
            },
            REMOTE_ENGINE_UN_SUPPORTED16: {
                code: 16,
                info: '对方不支持当前引擎'
            },
            REMOTE_NETWORK_ERROR17: {
                code: 17,
                info: '对方网络错误'
            },
            VOIP_NOT_AVALIABLE18: {
                code: 18,
                info: 'VoIP 不可以用'
            }
        };

        var getKey = function(key) {
            if (util.isNumber(key)) {
                util.forEach(result, function(reason, reasonKey) {
                    reasonKey.indexOf(key) > -1 && (key = reasonKey);
                });
            }
            return key;
        };

        var get = function(key) {
            key = getKey(key);
            return result[key];
        };

        return {
            get: get
        };
    })();

    var getToken = function(params, callback) {
        var channelId = params.channelId;
        params = {
            command: 'getToken',
            data: {
                channelId: channelId
            }
        };
        sendCommand(params, callback);
    };

    var inviteItem = {
        busy: function(message) {
            var reasonKey = 'REMOTE_BUSYLINE14'
            var reason = Reason.get(reasonKey);
            var callId = message.content.callId;

            var content = {
                callId: callId,
                reason: reason.code
            };

            var conversationType = message.conversationType;
            var targetId = message.targetId;

            var data = {
                conversationType: conversationType,
                targetId: targetId,
                content: content
            };
            var params = {
                command: 'hungup',
                data: data
            };

            sendCommand(params);
        },
        free: function(message) {

            cache.set('session', message);

            var callId = message.content.callId;

            var data = {
                conversationType: conversationType,
                targetId: targetId,
                content: {
                    callId: callId
                }
            };
            var params = {
                command: 'ringing',
                data: data
            };

            sendCommand(params);
        }
    };

    var summayTimer = new Timer();

    var messageHandler = {
        InviteMessage: function(message) {
            var session = cache.get('session');

            var method = session ? 'busy' : 'free';

            inviteItem[method](message);
        },
        AcceptMessage: function(message) {

            callTimer.stop();

            var session = cache.get('session');

            var already = session.already;

            if (already) {
                return;
            }

            var channel = session.content.channelInfo;
            var channelId = channel.Id;

            // 过滤其他端的发送消息
            var callInfo = session.callInfo || {};
            if (!callInfo[channelId]) {
                return;
            }

            session.already = true;

            var mediaType = message.content.mediaType;

            //主叫方 userId 为 inviterMessage.sentTime
            //被叫方 userId 为 AcceptMessage.sentTime
            var sentTime = session.sentTime;
            var userId = session.senderUserId;

            var params = {
                channelId: channelId,
                userId: userId,
                sentTime: sentTime,
                mediaType: mediaType
            };
            initRoom(params);
            summayTimer.start();
        },
        HungupMessage: function(message) {

        },
        MediaModifyMessage: function(message) {
            console.log(message);
        },
        MemberModifyMessage: function(message) {
            console.log(message);
        }
    };

    watch(function(message) {
        var messageType = message.messageType;
        var handler = messageHandler[messageType];
        handler && handler(message);
    });

    var getRoomId = function(params) {
        var random = Math.floor(Math.random()*1000);
        var info = [params.conversationType, params.targetId, random];
        return info.join('_');
    };

    var callTimer = new Timer();

    var call = function(params, callback) {

        var cacheKey = 'session';

        var session = cache.get(cacheKey);
        if (session) {
            var key = 'BUSYLINE4';
            callback(Reason.get(key));
            return;
        }

        cache.set(callback, params);

        callback = callback || util.noop;

        var conversationType = params.conversationType;
        var targetId = params.targetId;
        var inviteUserIds = params.inviteUserIds;
        var mediaType = params.mediaType;

        var callId = getRoomId(params);
        var channel = {
            Key: '',
            Id: callId
        };

        var data = {
            conversationType: conversationType,
            targetId: targetId,
            content: {
                engineType: 3,
                inviteUserIds: inviteUserIds,
                mediaType: mediaType,
                callId: callId,
                channelInfo: channel
            }
        };

        params = {
            command: 'invite',
            data: data
        };

        sendCommand(params, function(error, result) {
            var callInfo = { };
                callInfo[callId] = true;

            result.callInfo = callInfo;

            cache.update(cacheKey, result);

            var errorInfo = {
                code: error
            };
            callback(errorInfo, result);

            var timeout = config.timeout;
            callTimer.start(function(){
                var key = 'REMOTE_NO_RESPONSE15';
                var reason = Reason.get(key);
                callback(reason);
                room.reset();
            }, timeout);

        });
    };

    // params.info
    // params.position
    var errorHandler = function(params){
        var info = params.info;
        throw new Error(info);
    };

    var checkSession = function(params){
        if (!params.session) {
            errorHandler(params);
        }
    };

    var sendAccept = function(params) {
        var conversationType = params.conversationType;
        var targetId = params.targetId;

        var mediaType = params.mediaType;

        var session = cache.get('session');

        var from = params.from;
        var info = from + ': Not call yet';
        checkSession({
            session: session,
            info: info
        });

        var content = session.content;
        var callId = content.callId;

        params = {
            command: 'accept',
            data: {
                conversationType: conversationType,
                targetId: targetId,
                content: {
                    callId: callId,
                    mediaType: mediaType
                }
            }
        };

        sendCommand(params, function(error, command) {
            var sentTime = command.sentTime;
            var channelId = content.callId;
            var userId = command.senderUserId;

            var params = {
                channelId: channelId,
                userId: userId,
                sentTime: sentTime,
                mediaType: mediaType
            };
            initRoom(params);
            summayTimer.start();
        });
    };

    var accept = function(params) {
        params.form = 'accept';
        sendAccept(params);
    };

    var join = function(params) {
        params.form = 'join';
        sendAccept(params);
    };

    var sendHungup = function(params, callback) {
        callback = callback || util.noop;

        var session = cache.get('session');

        var from = params.from;
        var info = from + ': Not call yet';
        checkSession({
            session: session,
            info: info
        });

        var callId = session.content.callId;
        var callId = callId;

        var reasonKey = 'REMOTE_HANGUP13'
        var reason = Reason.get(reasonKey);

        var conversationType = params.conversationType;
        var targetId = params.targetId;

        params = {
            command: 'hungup',
            data: {
                conversationType: params.conversationType,
                targetId: params.targetId,
                content: {
                    callId: callId,
                    reason: reason.code
                }
            }
        };

        sendCommand(params, function() {
            room.reset();

            var timer = summayTimer.stop();

            var caller = session.senderUserId;

            var inviter = session.senderUserId;

            var content = session.content;
            var mediaType = content.mediaType;

            var reason = Reason.get('HANGUP3');

            var inviteUserIds = content.inviteUserIds;

            var summary = {
                caller: caller,
                inviter: inviter,
                mediaType: mediaType,
                startTime: timer.start,
                duration: timer.duration,
                status: reason,
                memberIdList: inviteUserIds
            };
            var error = null;

            callback(error, summary);
        });

        quitRoom({
            roomId: callId
        });

        room.reset();
    };

    var hungup = function(params, callback) {
        params.from = 'hungup';
        sendHungup(params, callback);
    };

    var reject = function(params) {
        params.from = 'reject';
        sendHungup(params);
    };

    var quit = function(params, callback) {
        sendHungup(params, callback);
    };

    var mute = function() {
        var params = {
            isEnabled: false
        };
        enableAudio(params);
    };

    var unmute = function() {
        var params = {
            isEnabled: true
        };
        enableAudio(params);
    };

    var videoToAudio = function() {
        var params = {
            isEnabled: false
        };
        enableVideo(params);
    };

    var audioToVideo = function() {
        var params = {
            isEnabled: true
        };
        enableVideo(params);
    };

    var setConfig = function(cfg) {
        util.extend(config, cfg);
    };

    var videoWatch = function(watcher) {
        videoWatcher.add(watcher);
    };

    var commandWatch = function(watcher) {
        commandWatcher.add(watcher);
    };

    global.RongCallLib = {
        setConfig: setConfig,
        videoWatch: videoWatch,
        commandWatch: commandWatch,

        call: call,
        hungup: hungup,
        reject: reject,
        join: join,
        mute: mute,
        unmute: unmute,
        videoToAudio: videoToAudio,
        audioToVideo: audioToVideo,
        accept: accept
    };
})({
    win: window,
    RongCallUtil: RongCallUtil,
    MessageCtrl: MessageCtrl
});