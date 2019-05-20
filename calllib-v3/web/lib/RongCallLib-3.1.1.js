/*
* RongCallLib.js v3.1.0
* Copyright 2019 RongCloud
* Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RongCallLib = factory());
}(this, (function () { 'use strict';

  var noop = function noop() {};
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  var isArray = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  var ObserverList = function ObserverList() {
    var checkIndexOutBound = function checkIndexOutBound(index, bound) {
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
  };

  var cache = function cache() {
    var session = {};

    var set = function set(key, value) {
      session[key] = value;
    };

    var get = function get(key) {
      return session[key];
    };

    var remove = function remove(key) {
      delete session[key];
    };

    var update = function update(key, value) {
      set(key, value);
    };
    return {
      set: set,
      get: get,
      update: update,
      remove: remove
    };
  };

  var forEach = function forEach(arrs, callback) {
    callback = callback || noop;
    var forObj = function forObj() {
      for (var key in arrs) {
        callback(arrs[key], key, arrs);
      }
    };
    var forArrs = function forArrs() {
      for (var i = 0; i < arrs.length; i++) {
        callback(arrs[i], i, arrs);
      }
    };
    var isArr = isArray(arrs);
    var exec = isArr ? forArrs : forObj;
    exec();
  };

  var extend = function extend(target, source) {
    for (var key in source) {
      target[key] = source[key];
    }
  };

  var isNumber = function isNumber(num) {
    return Object.prototype.toString.call(num) == '[object Number]';
  };

  var array2Obj = function array2Obj(arrs) {
    var obj = {};
    forEach(arrs, function (item) {
      obj[item] = item;
    });
    return obj;
  };

  var util = {
    noop: noop,
    ObserverList: ObserverList,
    cache: cache,
    forEach: forEach,
    extend: extend,
    array2Obj: array2Obj,
    isNumber: isNumber,
    isArray: isArray,
    isObject: isObject
  };

  var RongIMLib = void 0;
  var RongRTC = void 0;

  var getRongIMLib = function getRongIMLib() {
    return RongIMLib;
  };

  var setRongIMLib = function setRongIMLib(lib) {
    RongIMLib = lib;
  };

  var getRongRTC = function getRongRTC() {
    return RongRTC;
  };

  var setRongRTC = function setRongRTC(lib) {
    RongRTC = lib;
  };

  var modules = {
    getRongIMLib: getRongIMLib,
    setRongIMLib: setRongIMLib,
    getRongRTC: getRongRTC,
    setRongRTC: setRongRTC
  };

  var TalkType = {
    OnlyAudio: 0,
    All: 1,
    OnlyVideo: 2,
    None: 3
  };

  var Tag = 'normal';

  var selfUserId = void 0;
  var rongRTC = void 0,
      rongRTCRoom = void 0,
      rongRTCStream = void 0;
  var joinRoomCallback = util.noop;

  var VIDEO_PROFILE = {
    VIDEO_PROFILE_240P: {
      width: 320,
      height: 240
    },
    VIDEO_PROFILE_480P: {
      width: 640,
      height: 480
    },
    VIDEO_PROFILE_720: {
      width: 1280,
      height: 720
    }
  };

  var config = {
    width: '',
    height: ''
  };

  var getRTCPeer = function getRTCPeer() {
    if (!rongRTC) {
      throw new Error('Not call yet, please call first.');
    }
    return rongRTC;
  };

  var getTalkType = function getTalkType(streamType) {
    var StreamType = rongRTC.StreamType;
    var type = void 0;
    switch (streamType) {
      case StreamType.AUDIO:
        type = TalkType.OnlyAudio;
        break;
      case StreamType.VIDEO:
        type = TalkType.OnlyVideo;
        break;
      case StreamType.AUDIO_AND_VIDEO:
        type = TalkType.All;
        break;
      case StreamType.NONE:
        type = TalkType.None;
        break;
      default:
        type = TalkType.All;
        break;
    }
    return type;
  };

  var setVideoProfile = function setVideoProfile(profile) {
    var videoProfile = VIDEO_PROFILE[profile] || VIDEO_PROFILE[VIDEO_PROFILE.VIDEO_PROFILE_480P];
    util.extend(config, videoProfile);
  };

  var createVideo = function createVideo(src, id) {
    var video = document.createElement('video');
    video.id = id;
    video.autoplay = true;
    video.controls = false;
    video.srcObject = src;
    return video;
  };

  var getId = function getId(id) {
    /*  id = id || 'local';
    let prefix = 'native-';*/
    return (/*prefix + */id
    );
  };

  /**
   * @param  {object} data
   * @param  {object} data.id 用户 id
   * @param  {object} data.stream
   * @param  {object} data.stream.type 媒体流状态
   * @param  {object} data.stream.mediaStream 媒体流
   */
  var addStream = function addStream(data) {
    var userId = data.id;
    var stream = data.stream;
    var type = stream.type,
        mediaStream = stream.mediaStream;

    var videoId = getId(userId);
    var video = createVideo(mediaStream, videoId);
    var talkType = getTalkType(type);
    var isLocal = userId === selfUserId;
    video.muted = userId === selfUserId; // ???
    video.setAttribute('userid', userId);
    var result = {
      type: 'added',
      data: video,
      talkType: talkType,
      isLocal: isLocal
    };
    joinRoomCallback(null, result);
  };

  var streamPublished = function streamPublished(user) {
    rongRTCStream.subscribe(user).then(function (user) {
      addStream(user);
    }, function (error) {
      console.error(error);
      joinRoomCallback('stream subscribe error');
    });
  };

  var removeUser = function removeUser(user) {
    user = user || {};
    var result = {
      type: 'removed',
      data: user.id,
      userId: user.id,
      isLocal: false
    };
    joinRoomCallback(null, result);
  };

  var getSelfStream = function getSelfStream(mediaType, callback) {
    var RongIMLib = modules.getRongIMLib();
    var VoIPMediaType = RongIMLib.VoIPMediaType;
    var StreamType = rongRTC.StreamType;

    var type = mediaType === VoIPMediaType.MEDIA_AUDIO ? StreamType.AUDIO : StreamType.AUDIO_AND_VIDEO;
    var user = {
      id: selfUserId
    };
    var videoEnable = mediaType === VoIPMediaType.MEDIA_VEDIO;
    rongRTCStream.get({ video: videoEnable, audio: true }).then(function (stream) {
      user.stream = {
        mediaStream: stream.mediaStream,
        type: type,
        tag: Tag
      };
      callback(null, user);
    }, function (error) {
      callback(error);
    });
  };

  var joined = function joined(params) {
    var RongIMLib = modules.getRongIMLib();
    var VoIPMediaType = RongIMLib.VoIPMediaType;
    var StreamType = rongRTC.StreamType;
    var video = rongRTCStream.video;
    if (params.mediaType === VoIPMediaType.MEDIA_AUDIO) {
      video.disable({
        id: selfUserId,
        stream: {
          tag: Tag
        }
      });
    }
    var type = params.mediaType === VoIPMediaType.MEDIA_AUDIO ? StreamType.AUDIO : StreamType.AUDIO_AND_VIDEO;
    getSelfStream(type, function (err, result) {
      if (err) {
        return joinRoomCallback('get localVideo error.');
      }
      result.isLocal = true;
      rongRTCStream.publish(result).then(function () {}, function (error) {
        console.error('publish self stream error', error);
      });
      addStream(result);
    });
  };

  var observeRoom = function observeRoom(roomId) {
    rongRTCRoom = new rongRTC.Room({
      id: roomId,
      // joined: , // 其他人加入不处理, 已通过消息处理
      left: removeUser
    });
  };

  var observeStream = function observeStream() {
    rongRTCStream = new rongRTC.Stream({
      published: streamPublished
      // unpublished: '', 对方取消推流, 不处理, calllib 只有退出, 没有取消
      // disabled: '',  资源改变, 不处理, 已通过消息处理
      // enabled: '',
      // muted: '',
      // unmuted: ''
    });
  };

  // const observeScreenShare = () => {
  //   let { ScreenShare } = rongRTC;
  //   let observer = new Observer((mutation) => {
  //     let { type } = mutation;
  //     if (type === 'finished') {
  //       // TODO onShareComplete
  //     }
  //   });
  //   observer.observe(ScreenShare, {
  //     finished: true
  //   });
  // };

  var initRTC = function initRTC(params) {
    var RongRTC = modules.getRongRTC();
    var RongIMLib = modules.getRongIMLib();
    rongRTC = new RongRTC({
      RongIMLib: RongIMLib,
      mode: RongRTC.RTC,
      mounted: function mounted() {}
    });
    observeRoom(params.channelId);
    observeStream();
  };

  var setConfig = function setConfig(cfg) {
    util.extend(config, cfg);
  };

  var joinRoom = function joinRoom(params, callback) {
    joinRoomCallback = callback || util.noop;
    selfUserId = params.userId;
    initRTC(params);
    var room = {
      id: selfUserId,
      token: selfUserId
    };
    rongRTCRoom.join(room).then(function () {
      joined(params);
    }, function (err) {
      console.log('join room error', err);
      joinRoomCallback('join error.');
    });
  };

  var quitRoom = function quitRoom() {
    if (!rongRTC) {
      return;
    }
    rongRTCRoom.leave().then(function () {
      joinRoomCallback(null, {
        type: 'leave'
      });
    }, function () {
      joinRoomCallback('leave error.');
    });
  };

  var enableAudio = function enableAudio(params) {
    var isMute = !params.isEnabled;
    var Audio = rongRTCStream.audio;
    var audioFuc = isMute ? Audio.mute : Audio.unmute;
    audioFuc({
      id: selfUserId,
      stream: {
        tag: Tag
      }
    });
  };

  var enableVideo = function enableVideo(params) {
    var isClosed = !params.isEnabled;
    var Video = rongRTCStream.video;
    var videoFuc = isClosed ? Video.disable : Video.enable;
    videoFuc({
      id: selfUserId,
      stream: {
        tag: Tag
      }
    });
  };

  var startScreenShare = function startScreenShare() {
    var ScreenShare = rongRTC.ScreenShare;
    ScreenShare.start().then(function () {}, function () {
      joinRoomCallback('screenshare error.');
    });
  };

  var stopScreenShare = function stopScreenShare() {
    var ScreenShare = rongRTC.ScreenShare;
    ScreenShare.stop();
  };

  var getMediaID = function getMediaID(params) {
    var sentTime = params.sentTime;
    return String(sentTime & 0x7fffffff); //ios o只支持string 类型
  };

  var requestWhiteBoardURL = function requestWhiteBoardURL() {
    var WhiteBoard = rongRTC.WhiteBoard;
    WhiteBoard.create().then(function (whiteboard) {
      if (whiteboard.url) {
        var result = {
          index: 'meet',
          type: 'whiteBoardURL',
          url: whiteboard.url
        };
        joinRoomCallback(result);
      } else {
        joinRoomCallback('request whiteboard error.');
      }
    });
  };

  var RongVoIP = {
    setConfig: setConfig,
    joinRoom: joinRoom,
    quitRoom: quitRoom,
    enableAudio: enableAudio,
    enableVideo: enableVideo,
    getMediaID: getMediaID,
    startScreenShare: startScreenShare,
    stopScreenShare: stopScreenShare,
    requestWhiteBoardURL: requestWhiteBoardURL,
    setVideoProfile: setVideoProfile,
    getRTCPeer: getRTCPeer
  };

  var MsgObserverList = util.ObserverList;

  // patch c++ SDK 多端时发送一条消息，会再收到一条同样 messageUId 的消息这里记录一下做排除
  var cacheMessageUIdList = [];
  var MAXCACHE = 500;

  var getIMPeer = function getIMPeer() {
    return modules.getRongIMLib();
  };

  /*
    根据 MessageType 返回 message 对象
    let params = {
        messageType:'TextMessage',
        content: { content: 'hello'}    // 消息体
    };
  let textMsg = messageFactory(params);
  */
  var messageFactory = function messageFactory(params) {
    var RongIMLib = getIMPeer();
    var messageTypes = {
      AcceptMessage: RongIMLib.AcceptMessage,
      RingingMessage: RongIMLib.RingingMessage,
      SummaryMessage: RongIMLib.SummaryMessage,
      HungupMessage: RongIMLib.HungupMessage,
      InviteMessage: RongIMLib.InviteMessage,
      MediaModifyMessage: RongIMLib.MediaModifyMessage,
      MemberModifyMessage: RongIMLib.MemberModifyMessage
    };
    var content = params.content;
    var message = messageTypes[params.messageType] || util.noop;
    return new message(content);
  };

  var sendMessage = function sendMessage(params, callback) {
    var RongIMLib = getIMPeer();
    callback = callback || util.noop;

    var msg = messageFactory(params);

    var conversationType = params.conversationType;
    var targetId = params.targetId;

    var im = RongIMLib.RongIMClient.getInstance();

    var isMentioned = false;
    var pushText = params.pushText || '';
    var appData = params.appData || '';
    var methodType = null;
    // console.log('im.sendMessage', msg);
    im.sendMessage(conversationType, targetId, msg, {
      onSuccess: function onSuccess(message) {
        cacheMessageUIdList.unshift(message.messageUId);
        if (cacheMessageUIdList.length > MAXCACHE) {
          cacheMessageUIdList.pop();
        }
        var error = null;
        callback(error, message);
      },
      onError: function onError(code) {
        callback(code);
      }
    }, isMentioned, pushText, appData, methodType, params);
  };

  var commandItem = {
    /*
        params.conversationType
        params.targetId
        params.content
        */
    invite: function invite(params, callback) {
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
      params.userIds = inviteUserIds;
      sendMessage(params, callback);
    },
    ringing: function ringing(params, callback) {
      params.messageType = 'RingingMessage';
      sendMessage(params, callback);
    },
    /*
        params.conversationType
        params.targetId
        params.content
        */
    accept: function accept(params, callback) {
      params.messageType = 'AcceptMessage';
      sendMessage(params, callback);
    },

    /*
       params.conversationType
       params.targetId
       params.content
       */
    hungup: function hungup(params, callback) {
      params.messageType = 'HungupMessage';
      sendMessage(params, callback);
    },
    /*
        params.conversationType
        params.targetId
        params.content
        */
    mediaModify: function mediaModify(params, callback) {
      params.messageType = 'MediaModifyMessage';
      sendMessage(params, callback);
    },
    memberModify: function memberModify(params, callback) {
      params.messageType = 'MemberModifyMessage';
      var content = params.content;
      var userIds = [];
      var inviteUserIds = content.inviteUserIds;
      var existList = content.existedMemberStatusList;

      util.forEach(inviteUserIds, function (userId) {
        userIds.push(userId);
      });
      util.forEach(existList, function (user) {
        var userId = user.userId;
        userIds.push(userId);
      });
      params.userIds = userIds;
      sendMessage(params, callback);
    },
    getToken: function getToken(params, callback) {
      // const RongIMLib = getIMPeer();
      // let im = RongIMLib.RongIMClient.getInstance();
      // let engineType = 3;
      // let channelId = params.channelId;
      callback(null, '');
      // im.getAgoraDynamicKey(engineType, channelId, {
      //   onSuccess: function (data) {
      //     let error = null;
      //     callback(error, data.dynamicKey);
      //   },
      //   onError: function (error) {
      //     callback(error);
      //   }
      // });

      // let uid = params.userId & 0x7fffffff;
      // let url = 'https://api.blinktalk.site:8800/token';
      // $.ajax({
      //     url : url,
      //     type : 'POST',
      //     data : 'uid=' + uid + '&appid=1234567890abcdefg',
      //     async : true,
      //     success : function(data) {
      //         let error = null;
      //         callback(error, data);
      //     },
      //     error : function(error) {
      //         callback(error);
      //     }
      // });
    }
  };
  /*
  let params = {
      command: 'invite' | 'ringing' | 'accept' | 'hungup' | 'mediaModify' | 'memberModify' | 'getToken',
      data: {
          conversationType: 1,
          targetId: '',
          content: {}
      }
  };
  */
  var sendCommand = function sendCommand(params, callback) {
    var command = params.command;
    var data = params.data;
    commandItem[command] && commandItem[command](data, callback);
  };

  var watcher = new MsgObserverList();

  var watch = function watch(listener) {
    watcher.add(listener);
  };

  var setVoipProvider = function setVoipProvider() {
    var RongIMLib = getIMPeer();
    // WebSDK VoIP message adapter.
    RongIMLib.RongIMClient._voipProvider = {
      onReceived: function onReceived(message) {
        // console.log('onRecrived msd', message)
        // patch 排除自己发的消息
        var isSelfClientSendMessage = cacheMessageUIdList.indexOf(message.messageUId) > -1;
        if (message.offLineMessage || isSelfClientSendMessage) {
          return;
        }
        watcher.notify(message);
      }
    };
  };

  var MessageCtrl = {
    sendCommand: sendCommand,
    watch: watch,
    setVoipProvider: setVoipProvider
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var joinRoom$1 = RongVoIP.joinRoom;
  var quitRoom$1 = RongVoIP.quitRoom;
  var enableAudio$1 = RongVoIP.enableAudio;
  var enableVideo$1 = RongVoIP.enableVideo;
  var getMediaID$1 = RongVoIP.getMediaID;

  var sendCommand$1 = MessageCtrl.sendCommand;

  var cache$1 = util.cache();

  var ObserverList$1 = util.ObserverList;

  var videoWatcher = new ObserverList$1();
  var meetCommandWatcher = new ObserverList$1();
  var commandWatcher = new ObserverList$1();
  var msgWatcher = new ObserverList$1();

  var config$1 = {
    url: 'https://rtcapi.ronghub.com/nav/websocketlist',
    timeout: 10000 * 3,
    ices: [{
      urls: 'turn:119.254.101.80:3478',
      credential: 'test',
      username: 'test'
    }]
  };

  cache$1.set('videoQueue', {});

  var callTimer = {};

  var MessgeDirection = {
    SENT: 1,
    RECEIVED: 2
  };

  var stopItem = {
    single: function single(message) {
      var senderUserId = message.senderUserId;
      var timer = callTimer[senderUserId];
      timer && timer.stop();
    },
    multi: function multi() {
      util.forEach(callTimer, function (timer) {
        timer.stop();
      });
      cache$1.remove('inviteUsers');
    }
  };

  var CallStatus = {
    //初始状态
    CallIdle: 0,

    //正在呼出
    Dialing: 1,

    //正在呼入
    Incoming: 2,

    //收到一个通话呼入后，正在振铃
    Ringing: 3,

    //正在通话
    Active: 4,

    //已经挂断
    Hangup: 5
  };

  var Reason = function () {
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
      OTHER_CLIENT_HANDLED8: {
        code: 8,
        info: '其他设备已处理'
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

    var getKey = function getKey(key) {
      if (util.isNumber(key)) {
        util.forEach(result, function (reason, reasonKey) {
          reasonKey.indexOf(key) > -1 && (key = reasonKey);
        });
      }
      return key;
    };

    var get$$1 = function get$$1(key) {
      key = getKey(key);
      return result[key];
    };

    return {
      get: get$$1
    };
  }();

  var reasonItem = {
    1: function _() {
      return Reason.get('REMOTE_CANCEL11');
    },
    2: function _() {
      return Reason.get('REMOTE_REJECT12');
    },
    3: function _() {
      return Reason.get('REMOTE_HANGUP13');
    },
    4: function _() {
      return Reason.get('REMOTE_BUSYLINE14');
    },
    5: function _() {
      return Reason.get('REMOTE_NO_RESPONSE15');
    },
    15: function _() {
      return Reason.get('NO_RESPONSE5');
    }
  };

  var watch$1 = function watch(listener) {
    msgWatcher.add(listener);
  };

  var Timer = function Timer() {
    this.timeout = 0;
    this.startTime = 0;
    this.start = function (callback, second) {
      second = second || 0;

      if (callback) {
        this.timeout = setTimeout(function () {
          callback();
        }, second);
      }

      this.startTime = +new Date();
    };

    this.stop = function () {

      clearTimeout(this.timeout);

      var endTime = +new Date();
      var startTime = this.startTime;
      var duration = endTime - startTime;
      if (startTime === 0) {
        duration = 0;
      }
      return {
        start: startTime,
        end: endTime,
        duration: duration
      };
    };
    this.clear = function () {
      this.startTime = 0;
    };
  };

  var summayTimer = new Timer();

  var getToken = function getToken(params, callback) {
    var channelId = params.channelId;
    var engineType = 3;
    params = {
      command: 'getToken',
      engineType: engineType,
      data: {
        channelId: channelId
      }
    };
    sendCommand$1(params, callback);
  };

  // params.info
  // params.position
  var errorHandler = function errorHandler(params) {
    var info = params.info;
    throw new Error(info);
  };

  var checkSession = function checkSession(params) {
    if (!params.session) {
      errorHandler(params);
    }
  };

  var stopTimer = function stopTimer(message) {
    var method = message ? 'single' : 'multi';
    stopItem[method](message);
  };

  var room = {
    isActive: false,
    init: function init(params, callback) {
      if (this.isActive) {
        return;
      }
      params.url = config$1.url;
      params.ices = config$1.ices;
      joinRoom$1(params, callback);
      this.isActive = true;
    },
    reset: function reset() {
      this.isActive = false;
      cache$1.remove('session');
      cache$1.remove('initRoom');
    }
  };

  var getSummary = function getSummary(params) {

    var session = cache$1.get('session');
    var reason = Reason.get(params.reasonKey);

    var conversationType = session.conversationType;
    var targetId = session.targetId;

    var timer = summayTimer.stop();
    summayTimer.clear();

    var caller = session.senderUserId;

    var inviter = session.senderUserId;

    var content = session.content;
    var mediaType = content.mediaType;

    var inviteUserIds = content.inviteUserIds;

    var userOnLine = session.userOnLine || {};

    if (conversationType === 1 && userOnLine[caller]) {
      var method = reasonItem[reason.code];
      method && (reason = method());
    }

    var summary = {
      conversationType: conversationType,
      targetId: targetId,
      messageDirection: session.messageDirection,
      content: {
        caller: caller,
        inviter: inviter,
        mediaType: mediaType,
        startTime: timer.start,
        duration: timer.duration,
        status: reason.code,
        memberIdList: inviteUserIds
      },
      senderUserId: inviter,
      messageType: 'SummaryMessage'
    };
    commandWatcher.notify(summary);

    room.reset();
    cache$1.remove('hungupReason');
    return summary;
  };

  var sendHungup = function sendHungup(params, callback) {
    callback = callback || util.noop;

    var session = cache$1.get('session');

    var from = params.from;
    var info = from + ': Not call yet';
    checkSession({
      session: session,
      info: info
    });
    var callId = session.content.callId;
    var conversationType = session.conversationType;
    var targetId = session.targetId;
    var key = params.reasonKey;
    var reason = Reason.get(key);

    var requireSendCommand = !params.passive;

    // 点击挂断按钮触发时发送消息，接受到 HungupMessage 时不发送消息
    if (requireSendCommand) {
      var arg = {
        command: 'hungup',
        data: {
          conversationType: conversationType,
          targetId: targetId,
          content: {
            callId: callId,
            reason: reason.code
          }
        }
      };
      sendCommand$1(arg, function () /* error, result */{
        var summary = getSummary(params);
        callback(null, summary);
      });
    } else {
      var summary = getSummary(params);
      callback(null, summary);
    }

    quitRoom$1({
      roomId: callId
    });
    if (cache$1.get('joinRoom')) {
      cache$1.remove('joinRoom');
    }
    stopTimer();
  };

  var calcTimeout = function calcTimeout(params) {
    var userIds = params.userIds;
    var conversationType = params.conversationType;
    var targetId = params.targetId;

    var currentUserId = config$1.currentUserId;

    util.forEach(userIds, function (userId) {
      var timer = callTimer[userId] = new Timer();

      var isPrivate = conversationType === 1;
      var isRemote = userId === currentUserId || isPrivate;
      var status = params.status;
      timer.status = status;
      timer.mediaType = params.mediaType;
      var timeout = config$1.timeout;
      if (!isRemote) {
        timeout += params.timeout || 0;
      }
      var sentItem = {
        sent: function sent(timer) {
          // 一直处于呼叫状态认为对方不在线。
          var isOffLine = timer.status === CallStatus.Dialing;
          var key = isOffLine ? 'REMOTE_NO_RESPONSE15' : 'NO_RESPONSE5';
          var params = {
            conversationType: conversationType,
            targetId: targetId,
            from: 'call-timeout',
            reasonKey: key
          };
          var inviteUsers = cache$1.get('inviteUsers');
          sendHungup(params, function (error, message) {
            var senderUserId = message.senderUserId;
            delete inviteUsers[senderUserId];
          });
        },
        local: function local() /*callback*/{
          var key = 'NO_RESPONSE5';
          var reason = Reason.get(key);
          var session = cache$1.get('session');
          var content = {
            reason: reason.code,
            callId: session.content.channelInfo.Id
          };
          var message = {
            messageType: 'HungupMessage',
            conversationType: conversationType,
            targetId: targetId,
            senderUserId: userId,
            content: content,
            messageDirection: 2
          };

          // let error = null;
          msgWatcher.notify(message);
        }
      };
      timer.start(function () {
        // 接收者为自己时发送 HungupMessage, 其他人则本地创建 HungupMessage，认为此人已忽略、或者不在线。
        var method = isRemote ? 'sent' : 'local';
        sentItem[method](timer);
      }, timeout);
    });
  };

  var initRoom = function initRoom(params) {
    getToken(params, function (error, token) {
      if (error) {
        throw new Error(error);
      }

      params.token = token;

      var videoItem = {
        added: function added(result) {
          var stream = result.data;
          var userId = stream.getAttribute('userid');
          // App Server 的用户 Id
          result.userId = userId;
          stream.setAttribute('userId', userId);
        }
      };
      room.init(params, function (error, result) {
        if (error) {
          throw new Error(error);
        }
        if (result.isLeft) {
          // 离开事件
          //   room.reset();
          return;
        }
        var type = result.type;
        var index = result.index;
        var handler = videoItem[type];
        handler && handler(result);
        if (index === 'meet') {
          // 会控相关
          meetCommandWatcher.notify(result);
        } else {
          var sourceId = result.sourceId;
          var userId = result.userId;
          var hasUser = Number(userId) !== sourceId;
          if (hasUser) {
            videoWatcher.notify(result);
          } else {
            var queue = cache$1.get('videoQueue');
            queue[sourceId] = result;
          }
        }
      });
    });
  };

  var array2Obj$1 = function array2Obj(arrs) {
    var obj = {};
    util.forEach(arrs, function (item) {
      obj[item] = item;
    });
    return obj;
  };

  var isGroup = function isGroup(type) {
    return type === 3;
  };

  var doUserRelation = function doUserRelation(senderUserId, mediaId) {
    var session = cache$1.get('session');

    session[senderUserId] = mediaId;
    session[mediaId] = senderUserId;

    return {
      userId: mediaId,
      sender: senderUserId
    };
  };

  var addUserRelation = function addUserRelation(params) {
    // let sentTime = params.sentTime;
    var senderUserId = params.senderUserId;
    var mediaID = getMediaID$1(params);
    // console.log('addUserRelation:sentTime->userId', sentTime, '->', senderUserId);
    return doUserRelation(senderUserId, mediaID);
  };

  var inviteItem = {
    busy: function busy(message) {
      var reasonKey = 'BUSYLINE4';
      var reason = Reason.get(reasonKey);

      var isSender = message.messageDirection === 1;

      if (isSender) {
        reasonKey = 'HANGUP3';
      }

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

      sendCommand$1(params);
    },
    free: function free(message, isNeedUpUserRel, isInvite) {
      commandWatcher.notify(message);

      cache$1.set('session', message);

      var sentTime = message.sentTime;
      var senderUserId = message.senderUserId;
      if (isNeedUpUserRel) {
        //邀请方一人映射
        addUserRelation({
          sentTime: sentTime,
          senderUserId: senderUserId
        });
      } else {
        // 群聊 映射 正在视频的成员
        message.content.existedUserPofiles.map(function (user) {
          doUserRelation(user.userId, user.mediaId);
        });
      }

      var content = message.content;

      var callId = content.callId;

      var conversationType = message.conversationType;
      var targetId = message.targetId;

      var userIds = content.inviteUserIds;

      cache$1.set('inviteUsers', array2Obj$1(userIds));

      var mediaType = content.mediaType;
      var params = {
        conversationType: conversationType,
        targetId: targetId,
        userIds: userIds,
        mediaType: mediaType,
        status: CallStatus.Incoming
      };
      calcTimeout(params);
      // 移动端第一次向pc端发起单个群聊
      if (isInvite) {
        var _params = {
          conversationType: conversationType,
          targetId: targetId,
          userIds: [message.senderUserId],
          mediaType: mediaType,
          status: CallStatus.Active
        };
        calcTimeout(_params);
        stopTimer(message);
        var data = {
          conversationType: conversationType,
          targetId: targetId,
          content: {
            callId: callId
          }
        };
        var result = {
          command: 'ringing',
          data: data
        };

        sendCommand$1(result);
      }
    }
  };

  var Consumer = function Consumer(result) {
    var queue = cache$1.get('videoQueue');

    var stream = result.data;
    var userId = stream.getAttribute('userid');
    var session = cache$1.get('session');

    if (userId in session) {
      delete queue[userId];
      userId = session[userId] || userId;
      result.sourceId = userId;
      stream.setAttribute('userid', userId);
      videoWatcher.notify(result);
    }
  };

  var otherClientHandler = function otherClientHandler(message) {
    var type = message.conversationType;
    var targetId = message.targetId;
    var direction = 2;

    var session = cache$1.get('session');
    var senderUserId = session.senderUserId;
    var caller = senderUserId;
    var inviter = senderUserId;
    var content = session.content;
    var mediaType = content.mediaType;
    var inviteUserIds = content.inviteUserIds;

    var start = 0;
    var duration = 0;
    var reason = Reason.get('OTHER_CLIENT_HANDLED8');

    var summary = {
      conversationType: type,
      targetId: targetId,
      messageDirection: direction,
      content: {
        caller: caller,
        inviter: inviter,
        mediaType: mediaType,
        startTime: start,
        duration: duration,
        status: reason.code,
        memberIdList: inviteUserIds
      },
      senderUserId: inviter,
      messageType: 'SummaryMessage'
    };

    commandWatcher.notify(summary);
    cache$1.remove('session');
  };

  var messageHandler = {
    InviteMessage: function InviteMessage(message) {
      var session = cache$1.get('session');
      var method = session ? 'busy' : 'free';
      inviteItem[method](message, true, true);
    },
    RingingMessage: function RingingMessage(message) {
      var senderUserId = message.senderUserId;
      var timer = callTimer[senderUserId];
      if (timer) {
        timer.stop();
        timer.status = CallStatus.Ringing;
      }
      var session = cache$1.get('session');
      if (session) {
        var userOnLine = session.userOnLine || {};
        userOnLine[senderUserId] = true;

        session.userOnLine = userOnLine;
        commandWatcher.notify(message);
      }
    },
    AcceptMessage: function AcceptMessage(message) {
      var session = cache$1.get('session');
      if (!session) {
        // 己方已挂断, 再收到对方 accept 消息时
        return;
      }
      var params = session.params;
      var sessionSenderUserId = session.senderUserId;
      var currentUserId = config$1.currentUserId;
      function hasInitRoom() {
        if (cache$1.get('initRoom') && currentUserId === sessionSenderUserId) {
          return true;
        }
      }
      function isSelf() {
        if (currentUserId === sessionSenderUserId) {
          return true;
        }
      }
      if (!hasInitRoom() && isSelf()) {
        cache$1.set('initRoom', true);
        initRoom(params);
      }
      // let already = session.already;

      var senderUserId = message.senderUserId;
      // 存储用户信息标识
      var sentTime = message.sentTime;
      var user = addUserRelation({
        sentTime: sentTime,
        senderUserId: senderUserId
      });

      var queue = cache$1.get('videoQueue');
      var video = queue[user.userId] || queue[user.sender];
      if (video) {
        Consumer(video);
      }

      var isSender = message.messageDirection === 1;

      if (isSender) {
        otherClientHandler(message);
        return;
      }

      // if (already) {
      //     return;
      // }

      var content = message.content;

      message.callInfo = {
        mediaType: content.mediaType,
        status: CallStatus.Active
      };
      stopTimer(message);

      var channel = session.content.channelInfo;
      var channelId = channel.Id;

      // 过滤其他端的发送消息
      var callInfo = session.callInfo || {};
      if (!callInfo[channelId]) {
        return;
      }

      session.already = true;
      summayTimer.start();

      var timer = callTimer[senderUserId] || {};
      timer.status = CallStatus.Active;
      commandWatcher.notify(message);
    },
    HungupMessage: function HungupMessage(message) {

      var inviteUsers = cache$1.get('inviteUsers') || {};

      var senderUserId = message.senderUserId;
      // let conversationType = message.conversationType;

      var session = cache$1.get('session');

      if (!session) {
        return;
      }

      var content = session.content;
      var callId = content.channelInfo.Id;
      var hungupContent = message.content;
      var hungupCallId = hungupContent.callId;

      if (callId !== hungupCallId) {
        return;
      }

      message.callInfo = {
        mediaType: content.mediaType,
        status: CallStatus.Hangup
      };

      stopTimer(message);

      delete inviteUsers[senderUserId];
      delete callTimer[senderUserId]; // 挂断在邀请

      var isReceived = message.messageDirection === MessgeDirection.RECEIVED;

      if (isReceived) {
        var _content = message.content;
        var reasonCode = _content.reason;
        // 兼容移动端拒绝时 reason = 3
        if (reasonCode === 3 && summayTimer.startTime === 0) {
          reasonCode = 2;
        }

        var getReason = reasonItem[reasonCode] || util.noop;
        var reason = getReason() || {};

        reasonCode = reason.code || reasonCode;

        // content.reason = reasonCode;
        // message.content.reason = reasonCode;
        cache$1.set('hungupReason', reasonCode);
      } else {
        otherClientHandler(message);
      }
      commandWatcher.notify(message);
    },
    MediaModifyMessage: function MediaModifyMessage(message) {
      commandWatcher.notify(message);
    },
    MemberModifyMessage: function MemberModifyMessage(message) {
      // fix: 移动端与 PC 端属性名称不一致
      if (message.content.existedUserPofiles) {
        message.content.existedMemberStatusList = message.content.existedUserPofiles;
      } else {
        message.content.existedUserPofiles = message.content.existedMemberStatusList;
      }
      inviteItem['free'](message, false, false);
    },
    otherMessage: function otherMessage(message) {
      commandWatcher.notify(message);
    }
  };

  watch$1(function (message) {
    var messageType = message.messageType;
    messageType = messageType in messageHandler ? messageType : 'otherMessage';

    var handler = messageHandler[messageType];
    handler(message);
  });

  var getRoomId = function getRoomId(params) {
    var random = Math.floor(Math.random() * 1000);
    var info = [params.conversationType, params.targetId, random];
    return info.join('_');
  };

  var sendCall = function sendCall(data, callback) {
    var content = data.content;
    var callId = content.callId;
    var mediaType = content.mediaType;
    var isSharing = data.isSharing;
    var inviteUserIds = content.inviteUserIds;

    var conversationType = data.conversationType;
    var targetId = data.targetId;

    cache$1.set('inviteUsers', array2Obj$1(inviteUserIds));

    var params = {
      command: 'invite',
      data: data
    };

    sendCommand$1(params, function (error, result) {
      if (error) {
        callback({ code: error });
      }

      var callInfo = {};
      callInfo[callId] = true;

      result.callInfo = callInfo;
      result.isSharing = isSharing;

      //主叫方 userId 为 inviterMessage.sentTime
      //被叫方 userId 为 AcceptMessage.sentTime
      var sentTime = result.sentTime;
      var senderUserId = result.senderUserId;

      var userOnLine = result.userOnLine = {};
      util.forEach(inviteUserIds, function (userId) {
        userOnLine[userId] = false;
      });

      cache$1.update('session', result);

      addUserRelation({
        sentTime: sentTime,
        senderUserId: senderUserId
      });

      var errorInfo = {
        code: error
      };

      result.params = {
        channelId: callId,
        userId: senderUserId,
        sentTime: sentTime,
        mediaType: mediaType,
        isSharing: isSharing
      };

      callback(errorInfo, result);

      var params = {
        conversationType: conversationType,
        targetId: targetId,
        userIds: inviteUserIds,
        timer: 10,
        mediaType: mediaType,
        status: CallStatus.Dialing
      };
      calcTimeout(params);
      //self
      var self = {
        conversationType: conversationType,
        targetId: targetId,
        userIds: [senderUserId],
        timer: 10,
        mediaType: mediaType,
        status: CallStatus.Active
      };
      calcTimeout(self);
      stopTimer(result);
    });
  };

  var call = function call(params, callback) {

    var cacheKey = 'session';

    var session = cache$1.get(cacheKey);
    if (session) {
      var key = 'BUSYLINE4';
      callback(Reason.get(key));
      return;
    }

    var engineType = params.engineType || 3;

    cache$1.set(callback, params);

    callback = callback || util.noop;

    var conversationType = params.conversationType;
    var targetId = params.targetId;
    var inviteUserIds = params.inviteUserIds;
    var mediaType = params.mediaType;
    var isSharing = params.isSharing;

    var callId = getRoomId(params);
    var channel = {
      Key: '',
      Id: callId
    };

    var observerUserIds = params.observerUserIds || [];
    var data = {
      isSharing: isSharing,
      conversationType: conversationType,
      targetId: targetId,
      content: {
        sharing: isSharing,
        engineType: engineType,
        inviteUserIds: inviteUserIds,
        observerUserIds: observerUserIds,
        mediaType: mediaType,
        callId: callId,
        channelInfo: channel
      }
    };

    sendCall(data, function (error /*result*/) {
      if (error.code) {
        callback(error);
        return;
      }
      // let params = result.params;
      // params.engineType = engineType;
      // initRoom(params);
    });
  };

  var sendInvite = function sendInvite(data, callback) {
    var content = data.content;
    var inviteUserIds = content.inviteUserIds;

    var inviteUsers = cache$1.get('inviteUsers');
    util.forEach(inviteUserIds, function (userId) {
      inviteUsers[userId] = userId;
    });

    var params = {
      command: 'memberModify',
      data: data
    };
    var conversationType = data.conversationType;
    var targetId = data.targetId;
    var mediaType = data.content.mediaType;
    // console.log('send memberModify', data);
    sendCommand$1(params, function (error, result) {
      // let sentTime = result.sentTime;
      // let senderUserId = result.senderUserId;

      /*  addUserRelation({  //  群聊 A 已经在房间， A 邀请 B ，A的mediaId在第一次accept的时候已经确定！此 sentTime 是A 邀请 B的时间戳 不应该映射为 A 的mediaID。
            sentTime: sentTime,
            senderUserId: senderUserId
          });*/

      error = {
        code: error
      };

      callback(error, result);

      var params = {
        conversationType: conversationType,
        targetId: targetId,
        userIds: inviteUserIds,
        timer: 10,
        mediaType: mediaType,
        status: CallStatus.Dialing
      };
      calcTimeout(params);
    });
  };

  var invite = function invite(params, callback) {
    var cacheKey = 'session';

    var session = cache$1.get(cacheKey);

    var info = 'Invite: Not call yet';
    checkSession({
      session: session,
      info: info
    });

    callback = callback || util.noop;

    session = cache$1.get('session');
    var conversationType = params.conversationType;
    var targetId = params.targetId;

    var content = session.content;
    var callId = content.callId;

    var caller = session.senderUserId;
    var engineType = params.engineType || 3;
    var channel = {
      Key: '',
      Id: callId
    };

    var mediaType = params.mediaType;
    var inviteUserIds = params.inviteUserIds;
    // let isSharing = params.isSharing;

    var modifyMemType = 1;

    var existList = [];

    util.forEach(callTimer, function (timer, userId) {
      var sendTimeFrom = session[userId];
      var member = {
        userId: userId,
        mediaId: getMediaID$1({
          sentTime: sendTimeFrom,
          userId: userId
        }), //ios o只支持string 类型
        mediaType: timer.mediaType,
        callStatus: timer.status
      };
      existList.push(member);
    });

    var currentUserId = config$1.currentUserId;
    var sendTimeSelf = session[currentUserId];
    var currentUser = {
      userId: currentUserId,
      mediaId: getMediaID$1({
        sentTime: sendTimeSelf,
        userId: currentUserId
      }),
      mediaType: mediaType,
      callStatus: CallStatus.Active
    };
    var userIDs = existList.map(function (user) {
      return user.userId;
    });
    if (userIDs.indexOf(currentUser.userId) < 0) existList.push(currentUser);

    var observerUserIds = params.observerUserIds || [];
    var data = {
      conversationType: conversationType,
      targetId: targetId,
      content: {
        modifyMemType: modifyMemType,
        callId: callId,
        caller: caller,
        engineType: engineType,
        channelInfo: channel,
        mediaType: mediaType,
        inviteUserIds: inviteUserIds,
        existedMemberStatusList: existList,
        existedUserPofiles: existList,
        observerUserIds: observerUserIds
      }
    };

    sendInvite(data, callback);
  };

  var sendAccept = function sendAccept(params) {
    var conversationType = params.conversationType;
    var targetId = params.targetId;
    var userType = params.userType;
    var mediaType = params.mediaType;
    var isSharing = params.isSharing;

    var session = cache$1.get('session');

    var from = params.from;
    var info = from + ': Not call yet';
    checkSession({
      session: session,
      info: info
    });

    var engineType = params.engineType;

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

    sendCommand$1(params, function (error, command) {
      var sentTime = command.sentTime;
      var channelId = content.callId;
      var userId = command.senderUserId;

      command.callInfo = {
        mediaType: content.mediaType,
        status: CallStatus.Active
      };

      stopTimer(command);

      addUserRelation({
        sentTime: sentTime,
        senderUserId: userId
      });

      var params = {

        channelId: channelId,
        userId: userId,
        sentTime: sentTime,
        mediaType: mediaType,
        isSharing: isSharing,
        engineType: engineType,
        userType: userType
      };
      callTimer[userId].status = CallStatus.Active;
      if (conversationType === 3) {
        cache$1.set('joinRoom', true);
      }
      initRoom(params);
      summayTimer.start();
    });
  };

  var accept = function accept(params) {
    params.form = 'accept';
    sendAccept(params);
  };

  var join = function join(params) {
    params.form = 'join';
    sendAccept(params);
  };

  var hungup = function hungup(params, callback) {
    params.from = 'hungup';
    var key = 'CANCEL1';
    util.forEach(callTimer, function (timer, userId) {
      if (timer.status === CallStatus.Active && userId !== config$1.currentUserId) {
        key = 'HANGUP3';
      }
    });

    var conversationType = params.conversationType;
    if (params.passive) {
      key = cache$1.get('hungupReason') || key;
      if (isGroup(conversationType)) {
        if (callTimer[config$1.currentUserId].status === CallStatus.Active) {
          key = 'REMOTE_HANGUP13';
        } else {
          key = 'NO_RESPONSE5';
        }
      }
    }
    params.reasonKey = key;
    sendHungup(params, callback);
  };

  var reject = function reject(params, callback) {
    params = params || {};
    params.from = 'reject';
    params.reasonKey = 'REJECT2';
    sendHungup(params, callback);
  };

  // let quit = function (params, callback) {
  //   params.reasonKey = 'HANGUP3';
  //   sendHungup(params, callback);
  // };

  var mute = function mute() {
    var params = {
      isEnabled: false
    };
    enableAudio$1(params);
  };

  var unmute = function unmute() {
    var params = {
      isEnabled: true
    };
    enableAudio$1(params);
  };

  var sendMediaModify = function sendMediaModify(mediaType) {
    var session = cache$1.get('session');
    var content = session.content;
    var callId = content.callId;
    // mediaType = mediaType;
    var conversationType = session.conversationType;
    var targetId = session.targetId;

    var params = {
      command: 'mediaModify',
      data: {
        conversationType: conversationType,
        targetId: targetId,
        content: {
          callId: callId,
          mediaType: mediaType
        }
      }
    };

    sendCommand$1(params);
  };

  var videoToAudio = function videoToAudio() {
    var params = {
      isEnabled: false
    };
    enableVideo$1(params);
    // TODO
    var mediaType = 1;
    sendMediaModify(mediaType);
  };

  var audioToVideo = function audioToVideo() {
    var params = {
      isEnabled: true
    };
    enableVideo$1(params);
    // TODO
    var mediaType = 2;
    sendMediaModify(mediaType);
  };
  var requestWhiteBoardURL$1 = function requestWhiteBoardURL() {
    RongVoIP.requestWhiteBoardURL();
  };

  var videoWatch = function videoWatch(watcher) {
    videoWatcher.add(watcher);
  };
  var meetCommandWatche = function meetCommandWatche(watcher) {
    meetCommandWatcher.add(watcher);
  };
  var commandWatch = function commandWatch(watcher) {
    commandWatcher.add(watcher);
  };
  var CallVIdeoProfile = {
    20: 'VIDEO_PROFILE_240P',
    40: ' VIDEO_PROFILE_480P',
    50: 'VIDEO_PROFILE_720P'
  };
  var setVideoProfile$1 = function setVideoProfile(profile) {
    var enableProfile = CallVIdeoProfile[profile];
    RongVoIP.setVideoProfile(enableProfile);
  };
  var startScreenShare$1 = function startScreenShare(stream) {
    RongVoIP.startScreenShare(stream);
  };
  var stopScreenShare$1 = function stopScreenShare() {
    RongVoIP.stopScreenShare();
  };

  var init = function init() {

    MessageCtrl.watch(function (message) {
      msgWatcher.notify(message);
    });

    return {
      videoWatch: videoWatch,
      commandWatch: commandWatch,

      call: call,
      invite: invite,
      accept: accept,
      hungup: hungup,
      reject: reject,
      join: join,
      mute: mute,
      unmute: unmute,
      videoToAudio: videoToAudio,
      audioToVideo: audioToVideo,
      meetCommandWatche: meetCommandWatche,
      requestWhiteBoardURL: requestWhiteBoardURL$1,
      startScreenShare: startScreenShare$1,
      stopScreenShare: stopScreenShare$1,
      setVideoProfile: setVideoProfile$1
    };
  };

  var CallLib = function CallLib(cfg) {
    classCallCheck(this, CallLib);

    if (!cfg.RongIMLib) {
      throw new Error('请引入请引入 Web SDK : http://www.rongcloud.cn/docs/web.html#sdk');
    }
    util.extend(config$1, cfg);
    modules.setRongIMLib(cfg.RongIMLib);
    modules.setRongRTC(cfg.RongRTC);
    MessageCtrl.setVoipProvider();
    RongVoIP.setConfig(config$1);
    return init();
  };

  var RongCallLib = {
    init: function init(cfg) {
      return new CallLib(cfg);
    }
  };

  return RongCallLib;

})));
