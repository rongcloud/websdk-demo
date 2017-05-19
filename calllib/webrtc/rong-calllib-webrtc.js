"use strict";
;(function(dependencies) {
    var KurentoRoom = dependencies.KurentoRoom;
    var global = dependencies.win;
    var util = global._;

    var config = { };
    
    var videoRoom, localStream;

    /*
        var callback = function(error, result){
            // result => {type: 'added', data: stream, isLocal: true}
            // do something
        };
    */
    var joinRoom = function(params, callback) {
        callback = callback || util.noop;
        params.engineType = 2;

        var errorInfo = null;

        var url = params.url;
        videoRoom = KurentoRoom(url, function(error, kurento) {
            if (error)
                return console.log(error);

            var config = params.config;

            var roomId = params.channelId;
            var userId = params.sentTime;
                userId = userId & 0x7fffffff;
                
            var room = kurento.Room({
                room: roomId,
                user: userId
            });

            localStream = kurento.Stream(room, {
                audio: true,
                video: true,
                data: false
            });

            var participant = {
                add: function(data) {
                    
                    var stream = data.data;

                    var video = stream.getVideoPlayer();

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
                }
            };

            var eventFactory = {
                'room-connected': function(roomEvent) {
                    localStream.publish();

                    var streams = roomEvent.streams;
                    util.each(streams, function(stream) {
                        participant.add({
                            data: stream,
                            isLocal: false
                        });
                    });
                },
                'stream-published': function(streamEvent) {
                    var stream = streamEvent.stream;
                    participant.add({
                        data: stream,
                        isLocal: true
                    });
                },
                'stream-added': function(streamEvent) {
                    var stream = streamEvent.stream;
                    participant.add({
                        data: stream,
                        isLocal: false
                    });
                },
                'stream-removed': function(streamEvent) {
                    var stream = streamEvent.stream;
                    var globalId = 'native-video-' + stream.getGlobalID();
                    participant.remove({
                        data: globalId,
                        isLocal: false
                    });
                },
                'new-message': function(msg) {

                },
                'error-room': function(error) {

                },
                'error-media': function(msg) {

                },
                'room-closed': function(msg) {

                },
                'lost-connection': function(msg) {
                    kurento.close(true);
                },
                'stream-stopped-speaking': function(participantId) {

                },
                'stream-speaking': function(participantId) {

                },
                'update-main-speaker': function(participantId) {

                }
            };

            localStream.addEventListener("access-accepted", function() {

                util.forEach(eventFactory, function(event, eventName) {
                    room.addEventListener(eventName, event);
                });

                room.connect();
            });

            localStream.addEventListener("access-denied", function() {

            });

            var videoItem = {
                1: false,
                2: {
                    width: {
                        ideal: 1280 || config.width
                    },
                    frameRate: {
                        ideal: 15 || config.rate
                    }
                }
            };

            var video = videoItem[params.mediaType];
            var constraints = {
                audio: true,
                video: video
            };
            localStream.init(constraints);
        });
    };

    var quitRoom = function(){
        videoRoom && videoRoom.close();
    };

    var getRtcPeer = function(params){

        if (!localStream) {
            throw new Error('Not call yet, please call first.');
        }
        
        return localStream.getWebRtcPeer();
    };

    var enableAudio = function(params){
        getRtcPeer().audioEnabled = params.isEnabled;
    };

    var enableVideo = function(params){
        getRtcPeer().videoEnabled = params.isEnabled;
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
    KurentoRoom: KurentoRoom,
    win: window
});