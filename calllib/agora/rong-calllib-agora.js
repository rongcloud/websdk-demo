"use strict";
(function(dependencies) {
  var config = null;

  var _global = dependencies.win;
  var AgoraRTC = dependencies.AgoraRTC;
  var util = _global._;

  var createDiv = function(attrs, isLocal) {
    var div = document.createElement('div');
    for (var attr in attrs) {
      var val = attrs[attr];
      div.setAttribute(attr, val);
    }
    if (isLocal) {
      div.setAttribute('style', 'height: 100%');
    }
    return div;
  };

  var getId = function(id) {
    id = id || 'local';
    var prefix = 'native-';
    return prefix + id;
  };

  var getUserId = function(sentTime) {
    return sentTime & 0x7fffffff;
  };

  var client = null,
    localStream = null;
  /*
  channelId: channelId,
  userId: userId,
  sentTime: sentTime,
  mediaType: mediaType
  */
  var joinRoom = function(params, callback) {
    var mediaType = params.mediaType;
    mediaType = params.isSharing ? 3 : mediaType;
    var confMap = {
      1: {
        audio: true,
        video: false,
        screen: false
      },
      2: {
        audio: true,
        video: true,
        screen: false
      },
      3: {
        audio: true,
        video: false,
        screen: true
      }
    };
    config = confMap[mediaType];

    var userMap = params.userMap;
    var convertUserId = function(userId) {
      for (var sentTime in userMap) {
        var _userId = getUserId(sentTime);
        if (_userId == userId) {
          userId = userMap[sentTime];
          break;
        }
      }
      return userId;
    };
    var getRemoteId = function(stream) {
      return 'rong-remote-peer-' + convertUserId(stream.getId());
    };

    var sentTime = params.sentTime;
    var userId = getUserId(sentTime);

    var remotePeerBox = null;

    client = AgoraRTC.createClient({ mode: 'h264_interop' });

    var errorInfo = null;
    var participant = {
      add: function(data) {

        var userId = data.userId;
        var videoId = getId(userId);

        var attrs = {
          id: videoId
        };
        if (userId) {
          attrs.userid = convertUserId(userId);
        }
        var videoBox = createDiv(attrs, data.isLocal);
        var result = {
          type: 'added',
          data: videoBox,
          isLocal: data.isLocal
        };
        callback(errorInfo, result);
        return videoBox;
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
      },
      join: function(user) {
        var result = {
          type: 'joined',
          userId: user.id
        };
        callback(errorInfo, result);
      }
    };
    var onSuccess = function() {
      var channelKey = null;
      var channelId = params.channelId;
      client.join(channelKey, channelId, userId, function(uid) {
          var streamConf = util.extend(config, {
            streamID: uid
          });
          localStream = AgoraRTC.createStream(streamConf);

          var profile = params.profile || '480P';
          localStream.setVideoProfile(profile);

          localStream.on("accessAllowed", function() {
            console.log("accessAllowed");
          });

          localStream.on("accessDenied", function() {
            console.log("accessDenied");
          });

          participant.add({
            userId: userId,
            isLocal: true
          });

          remotePeerBox = participant.add({
            isLocal: false
          });

          localStream.init(function() {

            localStream.play(getId(userId));

            client.publish(localStream, function(err) {
              console.log("Publish local stream error: " + err);
            });

            client.on('stream-published', util.noop);
          }, function(err) {
            console.log("getUserMedia failed", err);
          });
        },
        function(err) {
          console.log("Join channel failed", err);
        });
    };
    var onError = function(err) {
      console.log("AgoraRTC client init failed", err);
    };
    client.init(params.token, onSuccess, onError);
    var eventFactory = {
      'error': function(err) {
        console.log(err);
      },
      'stream-added': function(evt) {
        var stream = evt.stream;
        client.subscribe(stream, function(err) {
          console.log(err);
        });
      },
      'stream-subscribed': function(evt) {
        var stream = evt.stream;
        var userId = stream.getId();
        userId = convertUserId(userId);

        var id = getRemoteId(stream);
        var children = remotePeerBox.children;
        for(var i = 0, len = children.length; i < len; i++){
          var child = children[i];
          var isExists = (child.id == id);
          if (isExists) {
            return;
          }
        }
        remotePeerBox.appendChild(createDiv({
          id: id,
          userid: userId
        }));
        stream.play(id);

        participant.join({
          id: userId,
          isLocal: false
        });
      },
      'stream-removed': function(evt) {
        var stream = evt.stream;
        var id = getRemoteId(stream);
        participant.remove({
          data: id,
          isLocal: false
        });
      },
      'peer-leave': function(evt) {
        var stream = evt.stream;
        var id = getRemoteId(stream);
        participant.remove({
          data: id,
          isLocal: false
        });
      }
    };

    util.each(eventFactory, function(event, name) {
      client.on(name, event);
    });
  };

  var quitRoom = function() {
    var onSuccess = util.noop;
    var onError = util.noop;
      
    if (localStream) {
      localStream.close();
    }
    
    if (client) {
      client.leave(onSuccess, onError);
    }
  };

  var streamhandler = function(params) {
    var type = params.type;

    var isEnabled = params.isEnabled;
    var handler = 'disable';
    if (params.isEnabled) {
      handler = 'enable';
    }
    var handlerItem = {
      'disable': function(type) {
        localStream['disable' + type]();
      },
      'enable': function(type) {
        localStream['enable' + type]();
      }
    };

    if (localStream) {
      handlerItem[handler](type);
    }

  };

  var enableAudio = function(params) {
    streamhandler({
      type: 'Audio',
      isEnabled: params.isEnabled
    });
  };

  var enableVideo = function(params) {
    streamhandler({
      type: 'Video',
      isEnabled: params.isEnabled
    });
  };

  _global.RongVoIP = {
    joinRoom: joinRoom,
    quitRoom: quitRoom,
    enableAudio: enableAudio,
    enableVideo: enableVideo
  };

})({
  AgoraRTC: AgoraRTC,
  win: window
});