"use strict";
(function(dependencies) {
    var BlinkEngine = dependencies.BlinkEngine;
    var BlinkEngineEventHandle = dependencies.BlinkEngineEventHandle;

    var global = dependencies.win;
    var util = global._;

    var config = {
        width: 640,
        height: 480,
        maxRate: 600,
        minRate: 450,
        frameRate: 15
    };
 
    var createVideo = function(src, id) {
        var video = document.createElement('video');

        video.id = id;
        video.autoplay = true;
        video.controls = false;
        video.srcObject = src;

        return video;
    };

    var getId = function(id) {
        id = id || 'local';
        var prefix = 'native-';
        return prefix + id;
    };
    var videoRoom;

    /*
        var callback = function(error, result){
            // result => {type: 'added', data: stream, isLocal: true}
            // do something
        };
    */
    var joinRoom = function(params, callback) {
        callback = callback || util.noop;

        var url = params.url || '';
        videoRoom = new BlinkEngine(url);
        var roomHandler = new BlinkEngineEventHandle();

        var errorInfo = null;

        var participant = {
            add: function(data) {

                var stream = data.data;
                
                var userId = data.userId;
                var videoId = getId(data.userId);

                var video = createVideo(stream, videoId);

                video.setAttribute('userid', userId);
                
                var result = {
                    type: 'added',
                    data: video,
                    isLocal: data.isLocal
                };
                callback(errorInfo, result);
            },
            remove: function(data) {
                var result = {
                    type: 'removed',
                    data: data.data,
                    isLocal: data.isLocal
                };
                callback(errorInfo, result);
            },
            leave: function() {
                var result = {
                    type: 'leave'
                };
                callback(errorInfo, result);
            }
        };
        var eventFactory = {
            onJoinComplete: function(data) {
                var joinedItem = {
                    success: function() {
                        var localStream = videoRoom.getLocalVideoView();
                        var userId = data.userId;

                        participant.add({
                            userId: userId,
                            data: localStream,
                            isLocal: true
                        });
                    },
                    error: function() {
                        callback('join error.');
                    }
                };

                var method = data.isJoined ? 'success' : 'error';

                joinedItem[method]();
            },
            onLeaveComplete: function(data) {
                var leftItem = {
                    success: function() {
                        participant.leave();
                        videoRoom.closeLocalStream();
                    },
                    error: function() {
                        callback('leave error.');
                    }
                };

                var method = data.isLeft ? 'success' : 'error';
                leftItem[method]();
            },
            onUserJoined: function(data) {
                var userId = data.userId;
                var stream = videoRoom.getRemoteVideoView(userId);
                participant.add({
                    userId: userId,
                    data: stream,
                    isLocal: false
                });
            },
            onUserLeft: function(data) {
                var userId = getId(data.userId);

                participant.remove({
                    data: userId,
                    isLocal: false
                });
            },
            onUserUpdatedTalkType: function(data) {

            }
        };

        util.forEach(eventFactory, function(event, eventName) {
            roomHandler.on(eventName, event);
        });

        videoRoom.setBlinkEngineEventHandle(roomHandler);

        var roomId = params.channelId;
        var userId = params.userId;

        var constraints = {
            width: config.width,
            height: config.height,
            frameRate: config.frameRate
        };

        var closeVideoItem = {
            1: function(){
                return true;
            },
            2: function(){
                return false;
            }
        };

        var mediaType = params.mediaType;
        videoRoom.setVideoParameters({
            VIDEO_PROFILE : constraints,
            VIDEO_MAX_RATE : config.maxRate,
            VIDEO_MIN_RATE : config.minRate,
            USER_TYPE : 1,
            IS_CLOSE_VIDEO : closeVideoItem[mediaType]()
        });

        var token = params.token;
        videoRoom.joinChannel(roomId, userId, token);
    };

    var quitRoom = function(params) {
        var roomId = params.roomId;
        videoRoom && videoRoom.leaveChannel(roomId);
    };

    var getRtcPeer = function(params) {

        if (!videoRoom) {
            throw new Error('Not call yet, please call first.');
        }

        return videoRoom;
    };

    var enableAudio = function(params) {
        var isMute = !params.isEnabled;
        getRtcPeer().muteMicrophone(isMute);
    };

    var enableVideo = function(params) {
        var isClosed = !params.isEnabled;
        getRtcPeer().closeLocalVideo(isClosed);
    };

    var setConfig = function(cfg) {
        util.extend(config, cfg);
    };

    global.RongVoIP = {
        setConfig: setConfig,
        joinRoom: joinRoom,
        quitRoom: quitRoom,
        enableAudio: enableAudio,
        enableVideo: enableVideo
    };

})({
    BlinkEngine: BlinkEngine,
    BlinkEngineEventHandle: BlinkEngineEventHandle,
    win: window
});