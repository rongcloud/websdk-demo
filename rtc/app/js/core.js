(function (dependencies) {

  var RongRTCEngine = dependencies.RongRTCEngine;
  var RongRTCEngineEventHandle = dependencies.RongRTCEngineEventHandle;
  var config = dependencies.RTCConfig;

  var utils = {
    ObserverList: function () {
      var checkIndexOutBound = function (index, bound) {
        return index > -1 && index < bound;
      };
      this.observerList = [];
      this.add = function (observer, force) {
        force && (this.observerList.length = 0);
        this.observerList.push(observer);
      };
      this.get = function (index) {
        if (checkIndexOutBound(index, this.observerList.length)) {
          return this.observerList[index];
        }
      };
      this.count = function () {
        return this.observerList.length;
      };
      this.removeAt = function (index) {
        checkIndexOutBound(index, this.observerList.length) && this.observerList.splice(index, 1);
      };
      this.remove = function (observer) {
        if (!observer) {
          this.observerList.length = 0;
          return;
        }
        observer = Object.prototype.toString.call(observer) == '[object Function]' ? [observer] : observer;
        for (var i = 0, len = this.observerList.length; i < len; i++) {
          if (this.observerList[i] === observer[i]) {
            this.removeAt(i);
            break;
          }
        }
      };
      this.notify = function (val) {
        for (var i = 0, len = this.observerList.length; i < len; i++) {
          this.observerList[i](val);
        }
      };
      this.indexOf = function (observer, startIndex) {
        var i = startIndex || 0,
          len = this.observerList.length;
        while (i < len) {
          if (this.observerList[i] === observer) {
            return i;
          }
          i++;
        }
        return -1;
      };
    },
    Cache: function (config) {
      config = config || {};
      var prefix = config.prefix || 'rongrtc';
      var genKey = function(key){
        return utils.tplEngine('{prefix}_{key}', {
          prefix: prefix,
          key: key
        });
      };
      var set = function (key, value) {
        localStorage.setItem(genKey(key), value);
      };
      var get = function (key) {
        return localStorage.getItem(genKey(key));
      };
      var remove = function (key) {
        localStorage.removeItem(genKey(key));
      };
      var update = function (key, value) {
        localStorage.setItem(genKey(key), value);
      };
      return {
        set: set,
        get: get,
        update: update,
        remove: remove
      };
    },
    tplEngine: function (temp, data, regexp) {
      if (!(Object.prototype.toString.call(data) === '[object Array]')) data = [data];
      var ret = [];
      for (var i = 0, j = data.length; i < j; i++) {
        ret.push(replaceAction(data[i]));
      }
      return ret.join('');

      function replaceAction(object) {
        return temp.replace(regexp || (/{([^}]+)}/g), function (match, name) {
          if (match.charAt(0) == '\\') return match.slice(1);
          return (object[name] != undefined) ? object[name] : '{' + name + '}';
        });
      }
    },
    copy: function (target, source) {
      for (var key in source) {
        target[key] = source[key];
      }
    },
    noop: function () { },
    getRandom: function (range) {
      return Math.floor(Math.random() * range);
    },
    getTimestamp: function (timestamp) {
      var date = new Date();
      if (timestamp > 0) {
        date = new Date(timestamp);
      }
      return date.getTime();
    },
    forEach: function (obj, callback) {
      callback = callback || utils.noop;
      var loopObj = function () {
        for (var key in obj) {
          callback(obj[key], key, obj);
        }
      };
      var loopArr = function () {
        for (var i = 0, len = obj.length; i < len; i++) {
          callback(obj[i], i);
        }
      };
      if (utils.isObject(obj)) {
        loopObj();
      }
      if (utils.isArray(obj)) {
        loopArr();
      }
    },
    rename: function (origin, newNames) {
      var isObject = utils.isObject(origin);
      if (isObject) {
        origin = [origin];
      }
      origin = JSON.parse(JSON.stringify(origin));
      var updateProperty = function (val, key, obj) {
        delete obj[key];
        key = newNames[key];
        obj[key] = val;
      };
      utils.forEach(origin, function (item) {
        utils.forEach(item, function (val, key, obj) {
          var isRename = (key in newNames);
          (isRename ? updateProperty : utils.noop)(val, key, obj);
        });
      });
      return isObject ? origin[0] : origin;
    },
    isObject: function (obj) {
      return (Object.prototype.toString.call(obj) == '[object Object]');
    },
    isArray: function (arr) {
      return (Object.prototype.toString.call(arr) == '[object Array]');
    },
    isNumber: function (num) {
      return (Object.prototype.toString.call(num) == '[object Number]');
    },
    isString: function (str) {
      return (Object.prototype.toString.call(str) == '[object String]');
    },
    isFunction: function (arr) {
      return (Object.prototype.toString.call(arr) == '[object Function]');
    },
    //暂时支持 Object
    isEmpty: function (obj) {
      var result = true;
      if (utils.isObject(obj)) {
        utils.forEach(obj, function () {
          result = false;
        });
      }
      if (utils.isString(obj)) {
        result = (obj.length == 0);
      }
      return result;
    },
    filter: function (arrs, callback) {
      if (utils.isObject(arrs)) {
        arrs = [arrs];
      }
      var result = [];
      utils.forEach(arrs, function (item) {
        callback(item) && result.push(item);
      });
      return result;
    },
    /* 
      var option = {
        url: '',
        method: '',
        headers: {},
        success: function(){},
        fail: function(){}
      };
    */
    ajax: function (option) {
      var getXHR = function () {
        var xhr = null;
        var hasXDomain = function () {
          return (typeof XDomainRequest != 'undefined');
        };
        var hasXMLRequest = function () {
          return (typeof XMLHttpRequest != 'undefined');
        };
        if (hasXDomain()) {
          xhr = new XDomainRequest();
        } else if (hasXMLRequest()) {
          xhr = new XMLHttpRequest();
        } else {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
      };

      var xhr = getXHR();
      var method = option.method || 'GET';
      var url = option.url;
      var queryStrings = option.queryStrings || {};
      var tpl = '{key}={value}', strings = [];
      utils.forEach(queryStrings, function (value, key) {
        var str = utils.tplEngine(tpl, {
          key: key,
          value: value
        });
        strings.push(str);
      });
      var queryString = strings.join('&');
      var urlTpl = '{url}?{queryString}';
      url = utils.tplEngine(urlTpl, {
        url: url,
        queryString: queryString
      });

      xhr.open(method, url, true);

      var headers = option.headers || {};
      utils.forEach(headers, function (header, name) {
        xhr.setRequestHeader(name, header);
      });

      var success = option.success || utils.noop;
      var fail = option.fail || utils.noop;
      var isSuccess = function (xhr) {
        return /^(200|202|10000)$/.test(xhr.status);
      };

      var onLoad = function () {
        var result = xhr.responseText;
        if (isSuccess(xhr)) {
          success(result);
        } else {
          fail(result);
        }
      };
      if ('onload' in xhr) {
        xhr.onload = onLoad;
      }
      else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            onLoad();
          }
        };
      }
      xhr.send(option.body);
    }
  };

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

  var rtcCache = new utils.Cache();

  var loginNode = getDom('.rong-login');
  var mainNode = getDom('.rong-main');
  var videoNode = getDom('.rong-video-remote');
  var roomNode = getDom('.rong-button-room');
  var joinNode = getDom('.rong-button-join');
  var whiteboardNode = getDom('.rong-whiteboard');
  var footerNode = getDom('.rong-footer');
  var jumpNode = getDom('.rong-button-jump');
  var stepNode = getDom('.rong-install-plugins');

  // 隐藏引导
  // var isInstallPlugin = rtcCache.get('isInstallPlugin');
  // if(!isInstallPlugin){
    // El.show(stepNode);
  // }

  jumpNode.onclick = function(){
    El.hide(stepNode);
    // rtcCache.set('isInstallPlugin', true);
  };

  var startGuide = function(){
    var roomId = roomNode.value;
    if (utils.isEmpty(roomId)) {
      return LogHandler.error(Error.ROOMID_IS_EMPTY);
    }
    El.show(mainNode);
    El.hide(loginNode);
    El.hide(footerNode);
    launchFullscreen(document.body);
    joinRoom(roomId);
  };
  roomNode.onkeydown = function(event){
    var isEnter = (event.keyCode == 13);
    if(isEnter){
      startGuide();
    }
  };

  joinNode.onclick = function () {
    startGuide();
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
          El.show(footerNode);
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
})({
  RTCConfig: RTCConfig,
  RongRTCEngine: RongRTCEngine,
  RongRTCEngineEventHandle: RongRTCEngineEventHandle
});