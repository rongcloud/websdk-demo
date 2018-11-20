(function (dependencies) {

  var RongRTCEngine = dependencies.RongRTCEngine;
  var RongRTCEngineEventHandle = dependencies.RongRTCEngineEventHandle;
  var config = dependencies.RTCConfig;
  // 是否支持插件
  var isSupportRTCPlugin = false;
  // 是否支持插件这个步骤是否已经加载完
  var isSupportRTCLoaded = false;
  var promptTime = 5000;
  var utils = RongRTC.utils;

  var Error = {
    ROOMID_IS_EMPTY: '房间号不能为空',
    REQUEST_WHITEBORAD: '请求白板失败',
    GET_TOKEN: '获取 Token 失败'
  };
  var LogHandler = {
    error: function (error) {
      alert(error);
    }
  };

  var getDom = function (name) {
    return document.querySelector(name);
  };
  var getToken = function (userId, callback) {
    var body = 'uid={userId}&appid={appId}';
    body = utils.tplEngine(body, {
      userId: userId,
      appId: config.appId
    });
    utils.ajax({
      url: config.api,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body,
      success: function (result) {
        var error = null;
        callback(error, result);
      },
      fail: function (error) {
        callback(error);
      }
    });
  }

  var launchFullscreen = function (node) {
    if(node.webkitRequestFullscreen) {
      node.webkitRequestFullScreen();
    }
    if(node.requestFullscreen) {
      node.requestFullscreen();
    }
    if(node.mozRequestFullScreen) {
      node.mozRequestFullScreen();
    }
  };

  var exitFullScreen = function(node){
    if(node.webkitExitFullscreen) {
      node.webkitExitFullscreen();
    }
    if(node.exitFullscreen) {
      node.exitFullscreen();
    }
    if(node.mozExitFullScreen) {
      node.mozExitFullScreen();
    }
  }

  var El = {
    show: function (node) {
      utils.copy(node.style, {
        display: 'block'
      });
    },
    hide: function (node) {
      utils.copy(node.style, {
        display: 'none'
      });
    }
  };

  var gotoInstallStep = function () {
    var promptDom = getDom('.rong-plugin-prompt');
    El.show(promptDom);
    setTimeout(() => {
      El.show(stepNode);
    }, promptTime);
  };

  var setRTCPluginSupport = function (successCallback, faildCallback) {
    window.addEventListener('message', function (msg) {
      var type = msg.data.type;
      if (type === 'testMessage') {
        isSupportRTCPlugin = true;
        isSupportRTCLoaded = true;
        successCallback && successCallback();
      }
    });
    setTimeout(() => {
      isSupportRTCLoaded = true;
      if (!isSupportRTCPlugin) {
        gotoInstallStep();
      }
    }, 2000);
    window.postMessage('test', '*');
  };

  var loginNode = getDom('.rong-login');
  var mainNode = getDom('.rong-main');
  var videoNode = getDom('.rong-video-remote');
  var roomNode = getDom('.rong-button-room');
  var joinNode = getDom('.rong-button-join');
  var whiteboardNode = getDom('.rong-whiteboard');
  var stepNode = getDom('.rong-install-plugins');
  var jumpNode = getDom('.rong-step-jump');
  
  setRTCPluginSupport();

  var startGuide = function(){
    var roomId = roomNode.value;
    if (utils.isEmpty(roomId)) {
      return LogHandler.error(Error.ROOMID_IS_EMPTY);
    }
    El.show(mainNode);
    El.hide(loginNode);
    // El.hide(footerNode);
    launchFullscreen(document.body);
    joinRoom(roomId);
  };

  var joinChannel = function () {
    if (isSupportRTCLoaded) {
      if (isSupportRTCPlugin) {
        startGuide();
      } else {
        gotoInstallStep();
      }
    } else {
      setTimeout(joinChannel, 200);
    }
  };
  roomNode.onkeydown = function(event){
    var isEnter = (event.keyCode == 13);
    if(isEnter){
      joinChannel();
    }
  };

  joinNode.onclick = function () {
    joinChannel();
  };

  jumpNode.onclick = function () {
    window.location.reload();
  };

  var RTC = new RongRTCEngine(config.nav);
  var Status = {
    onchanged: function (error, result) {
      var resultMap = {
        added: function () {
          var isLocal = result.isLocal;
          if (isLocal) {
            RTC.requestWhiteBoardURL();
          }else{
            if(!videoNode.srcObject){
              window.otherVideoNode = videoNode;
              videoNode.srcObject = result.data;
              videoNode.play();
              videoNode.userId = result.userId;
            }
          }
        },
        removed: function () {
          if(videoNode.userId == result.userId){
            videoNode.srcObject = null;
          }
        },
        disconnect: function () {

        },
        whiteboard: function(){
          var url = result.url;
          url = url.replace('https://rtc.ronghub.com/ewbweb/blink-wb.html', '../whiteboard/src/blink-wb.html');
          whiteboardNode.src = url;
          RTC.startScreenShare();
        },
        onsharecomplete: function(){
          console.log(result);
        },
        onsharestoped: function(){
          RTC.leaveChannel();
          RTC.closeLocalStream();
          El.show(loginNode);
          // El.show(footerNode);
          El.hide(mainNode);
          exitFullScreen(document);
        }
      };
      var type = result.type;
      resultMap[type]();
    }
  };

  function joinRoom(roomId) {
    var config = {
      width: 640,
      height: 480,
      maxRate: 600,
      minRate: 450,
      frameRate: 15,
    };

    RTC.userType = 1;
    var roomHandler = new RongRTCEngineEventHandle();
    var errorInfo = null;
    var participant = {
      add: function (data) {

        var stream = data.data;

        var result = {
          type: 'added',
          data: stream,
          talkType: data.talkType,
          isLocal: data.isLocal
        };
        Status.onchanged(errorInfo, result);
      },
      remove: function (data) {
        var result = {
          type: 'removed',
          data: data.data,
          userId: data.userId,
          isLocal: data.isLocal
        };
        Status.onchanged(errorInfo, result);
      },
      disconnect: function () {
        var result = {
          type: 'disconnect'
        };
        Status.onchanged(errorInfo, result);
      },
      onWhiteBoardURL: function(data){
        data.type = 'whiteboard';
        Status.onchanged(errorInfo, data);
      },
      onShareComplete: function(data){
        data.type = 'onsharecomplete';
        Status.onchanged(errorInfo, data);
      },
      onShareStoped: function(data){
        data.type = 'onsharestoped';
        Status.onchanged(errorInfo, data);
      }
    };
    var eventFactory = {
      onJoinComplete: function (data) {
        var isViewer = (RTC.userType == 2);
        if (isViewer) {
          return;
        }

        var joinedItem = {
          success: function (data) {
            var localStream = RTC.getLocalVideoView();
            userId = data.userId
            participant.add({
              userId: userId,
              data: localStream,
              isLocal: true,
              talkType: data.talkType
            });
          },
          error: function () {
            callback('join error.');
          }
        };
        var method = data.isJoined ? 'success' : 'error';
        joinedItem[method](data);
      },
      onaddstream: function (data) {
        setTimeout(function () {
          var userId = data.userId;
          var stream = data.stream;
          stream.srcObject = stream.srcObject;
          participant.add({
            userId: userId,
            data: stream,
            talkType: data.talkType,
            isLocal: data.isLocal
          });
        }, 1000);
      },
      onUserLeft: function (data) {
        participant.remove({
          data: data.userId,
          isLocal: false,
        });
      },
      onStartScreenShareComplete: function (data) {
        participant.onShareComplete(data);
      },
      onStopScreenShareComplete: function(data){
        participant.onShareStoped(data);
      },
      onWhiteBoardURL: function (data) {
        var isSuccess = data.isSuccess;
        if (isSuccess) {
          return participant.onWhiteBoardURL(data);
        }
        El.error(Error.REQUEST_WHITEBORAD);
      }
    };
    utils.forEach(eventFactory, function (event, eventName) {
      roomHandler.on(eventName, event);
    });

    RTC.setRongRTCEngineEventHandle(roomHandler);

    var constraints = {
      width: config.width,
      height: config.height,
      frameRate: config.frameRate
    };

    RTC.setVideoParameters({
      VIDEO_PROFILE: constraints,
      VIDEO_MAX_RATE: config.maxRate,
      VIDEO_MIN_RATE: config.minRate,
      USER_TYPE: 1,
      IS_CLOSE_VIDEO: false
    });
    var userId = +new Date;
    getToken(userId, function(error, token){
      if(error){
        console.log(error);
        return LogHandler.error(Error.GET_TOKEN);
      }
      RTC.joinChannel(roomId, userId, token);
    });
  }
  window.RongWhiteboard = window.RongWhiteboard || {};
  window.RongWhiteboard.zoom = function (percent) {
    var videoEl = getDom('.rong-main-item');
    utils.scaleEl(videoEl, percent);
  };
})({
  RTCConfig: RTCConfig,
  RongRTCEngine: RongRTCEngine,
  RongRTCEngineEventHandle: RongRTCEngineEventHandle
});