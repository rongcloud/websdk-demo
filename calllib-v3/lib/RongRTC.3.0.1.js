/*
* RongRTC.js v3.0.1
* Copyright 2019 RongCloud
* Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RongRTC = factory());
}(this, (function () { 'use strict';

  var noop = function noop() {};
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  var isArray = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  var isFunction = function isFunction(arr) {
    return Object.prototype.toString.call(arr) === '[object Function]';
  };
  var isString = function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  };
  var isBoolean = function isBoolean(str) {
    return Object.prototype.toString.call(str) === '[object Boolean]';
  };
  var isUndefined = function isUndefined(str) {
    return Object.prototype.toString.call(str) === '[object Undefined]';
  };
  var isNull = function isNull(str) {
    return Object.prototype.toString.call(str) === '[object Null]';
  };
  var isNumber = function isNumber(str) {
    return Object.prototype.toString.call(str) === '[object Number]';
  };
  var stringify = function stringify(obj) {
    return JSON.stringify(obj);
  };
  var parse = function parse(str) {
    return JSON.parse(str);
  };
  var forEach = function forEach(obj, callback) {
    callback = callback || noop;
    var loopObj = function loopObj() {
      for (var key in obj) {
        callback(obj[key], key, obj);
      }
    };
    var loopArr = function loopArr() {
      for (var i = 0, len = obj.length; i < len; i++) {
        callback(obj[i], i);
      }
    };
    if (isObject(obj)) {
      loopObj();
    }
    if (isArray(obj)) {
      loopArr();
    }
  };
  var isEmpty = function isEmpty(obj) {
    var result = true;
    if (isObject(obj)) {
      forEach(obj, function () {
        result = false;
      });
    }
    if (isString(obj) || isArray(obj)) {
      result = obj.length === 0;
    }
    return result;
  };
  var rename = function rename(origin, newNames) {
    var isObj = isObject(origin);
    if (isObj) {
      origin = [origin];
    }
    origin = parse(stringify(origin));
    var updateProperty = function updateProperty(val, key, obj) {
      delete obj[key];
      key = newNames[key];
      obj[key] = val;
    };
    forEach(origin, function (item) {
      forEach(item, function (val, key, obj) {
        var isRename = key in newNames;
        (isRename ? updateProperty : noop)(val, key, obj);
      });
    });
    return isObject ? origin[0] : origin;
  };
  var extend = function extend(destination, sources) {
    for (var key in sources) {
      var value = sources[key];
      if (!isUndefined(value)) {
        destination[key] = value;
      }
    }
    return destination;
  };
  var Defer = Promise;
  var deferred = function deferred(callback) {
    return new Defer(callback);
  };
  var tplEngine = function tplEngine(tpl, data, regexp) {
    if (!isArray(data)) {
      data = [data];
    }
    var ret = [];
    var replaceAction = function replaceAction(object) {
      return tpl.replace(regexp || /\\?\{([^}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') return match.slice(1);
        return object[name] !== undefined ? object[name] : '{' + name + '}';
      });
    };
    for (var i = 0, j = data.length; i < j; i++) {
      ret.push(replaceAction(data[i]));
    }
    return ret.join('');
  };
  // 暂时支持 String
  var isContain = function isContain(str, keyword) {
    return str.indexOf(keyword) > -1;
  };
  var isEqual = function isEqual(source, target) {
    return source === target;
  };
  var Cache = function Cache(cache) {
    if (!isObject(cache)) {
      cache = {};
    }
    var set = function set(key, value) {
      cache[key] = value;
    };
    var get = function get(key) {
      return cache[key];
    };
    var remove = function remove(key) {
      delete cache[key];
    };
    var getKeys = function getKeys() {
      var keys = [];
      for (var key in cache) {
        keys.push(key);
      }
      return keys;
    };
    var clear = function clear() {
      cache = {};
    };
    return {
      set: set,
      get: get,
      remove: remove,
      getKeys: getKeys,
      clear: clear
    };
  };
  var request = function request(url, option) {
    return deferred(function (resolve, reject) {
      option = option || {};
      var xhr = new XMLHttpRequest();
      var method = option.method || 'GET';
      xhr.open(method, url, true);
      var headers = option.headers || {};
      forEach(headers, function (header, name) {
        xhr.setRequestHeader(name, header);
      });
      var body = option.body || {};
      var isSuccess = function isSuccess() {
        return (/^(200|202)$/.test(xhr.status)
        );
      };
      xhr.onreadystatechange = function () {
        if (isEqual(xhr.readyState, 4)) {
          var responseText = xhr.responseText;

          if (isEmpty(responseText)) {
            return reject({
              status: xhr
            });
          }
          var result = JSON.parse(responseText);
          if (isSuccess()) {
            resolve(result);
          } else {
            var status = xhr.status;

            extend(result, {
              status: status
            });
            reject(result);
          }
        }
      };
      xhr.send(body);
    });
    // return fetch(url, option);
  };
  var map = function map(arrs, callback) {
    return arrs.map(callback);
  };
  var filter = function filter(arrs, callback) {
    return arrs.filter(callback);
  };
  var uniq = function uniq(arrs, callback) {
    var newData = [],
        tempData = {};
    arrs.forEach(function (target) {
      var temp = callback(target);
      tempData[temp.key] = temp.value;
    });
    forEach(tempData, function (val) {
      newData.push(val);
    });
    return newData;
  };
  var some = function some(arrs, callback) {
    return arrs.some(callback);
  };
  var toJSON = function toJSON(value) {
    return JSON.stringify(value);
  };
  var toArray = function toArray(obj) {
    var arrs = [];
    forEach(obj, function (v, k) {
      arrs.push([k, v]);
    });
    return arrs;
  };
  function Timer(_option) {
    _option = _option || {};
    var option = {
      timeout: 0,
      // interval | timeout
      type: 'interval'
    };
    extend(option, _option);
    var timers = [];
    var _timeout = option.timeout,
        type = option.type;

    var timerType = {
      resume: {
        interval: function interval(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setInterval(callback, _timeout);
        },
        timeout: function timeout(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setTimeout(callback, _timeout);
        }
      },
      pause: {
        interval: function interval(timer) {
          return clearInterval(timer);
        },
        timeout: function timeout(timer) {
          return clearTimeout(timer);
        }
      }
    };
    this.resume = function (callback, immediate) {
      callback = callback || noop;
      var resume = timerType.resume;

      var timer = resume[type](callback, immediate);
      timers.push(timer);
    };
    this.pause = function () {
      var pause = timerType.pause;

      forEach(timers, function (timer) {
        pause[type](timer);
      });
    };
  }
  var isInclude = function isInclude(str, match) {
    return str.indexOf(match) > -1;
  };
  var clone = function clone(source) {
    return JSON.parse(JSON.stringify(source));
  };
  function Observer() {
    var observers = [];
    this.add = function (observer, force) {
      if (isFunction(observer)) {
        if (force) {
          return observers = [observer];
        }
        observers.push(observer);
      }
    };
    this.remove = function (observer) {
      observers = filter(observers, function (_observer) {
        return _observer !== observer;
      });
    };
    this.emit = function (data) {
      forEach(observers, function (observer) {
        observer(data);
      });
    };
  }
  function Prosumer() {
    var data = [],
        isConsuming = false;
    this.produce = function (res) {
      data.push(res);
    };
    this.consume = function (callback, finished) {
      if (isConsuming) {
        return;
      }
      isConsuming = true;
      var next = function next() {
        var res = data.shift();
        if (isUndefined(res)) {
          isConsuming = false;
          finished && finished();
          return;
        }
        callback(res, next);
      };
      next();
    };
    this.isExeuting = function () {
      return isConsuming;
    };
  }
  /* 
   prosumer.consume(function(data, next){
    //dosomething
    next();
   });
  */
  var Log = console;
  var utils = {
    Prosumer: Prosumer,
    Log: Log,
    Observer: Observer,
    Timer: Timer,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isString: isString,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    stringify: stringify,
    parse: parse,
    rename: rename,
    extend: extend,
    clone: clone,
    deferred: deferred,
    Defer: Defer,
    forEach: forEach,
    tplEngine: tplEngine,
    isContain: isContain,
    noop: noop,
    Cache: Cache,
    request: request,
    map: map,
    filter: filter,
    uniq: uniq,
    some: some,
    isEqual: isEqual,
    isEmpty: isEmpty,
    toJSON: toJSON,
    isInclude: isInclude,
    isNull: isNull,
    isNumber: isNumber,
    toArray: toArray
  };

  var DownEvent = {
    ROOM_USER_JOINED: 'room_user_joined',
    ROOM_USER_LEFT: 'room_user_left',

    STREAM_PUBLISHED: 'stream_published',
    STREAM_UNPUBLISHED: 'stream_unpublished',
    STREAM_DISABLED: 'stream_disabled',
    STREAM_ENABLED: 'stream_enabled',
    STREAM_MUTED: 'stream_muted',
    STREAM_UNMUTED: 'stream_unmuted',

    RTC_ERROR: 'rtc_error',
    RTC_MOUNTED: 'rtc_mounted',
    RTC_UNMOUNTED: 'rtc_unmounted',

    MESSAGE_RECEIVED: 'message_received',

    REPORT_SPOKE: 'report_spoke'
  };

  var UpEvent = {
    ROOM_JOIN: 'room_join',
    ROOM_LEAVE: 'room_leave',
    ROOM_GET: 'room_get',

    STREAM_PUBLISH: 'stream_publish',
    STREAM_UNPUBLISH: 'stream_UNPUBLISH',
    STREAM_SUBSCRIBE: 'stream_subscribe',
    STREAM_UNSUBSCRIBE: 'stream_unsubscribe',
    STREAM_RESIZE: 'stream_resize',
    STREAM_GET: 'stream_get',

    AUDIO_MUTE: 'audio_mute',
    AUDIO_UNMUTE: 'audio_unmute',

    VIDEO_DISABLE: 'video_disable',
    VIDEO_ENABLE: 'video_enable',

    STORAGE_SET: 'strorage_set',
    STORAGE_GET: 'strorage_get',
    STORAGE_REMOVE: 'strorage_remove',

    MESSAGE_SEND: 'message_send',

    DEVICE_GET: 'device_get',

    REPORT_START: 'report_start',
    REPORT_STOP: 'report_stop'
  };

  var RoomEvents = [{
    name: DownEvent.ROOM_USER_JOINED,
    type: 'joined'
  }, {
    name: DownEvent.ROOM_USER_LEFT,
    type: 'left'
  }];

  var StreamEvents = [{
    name: DownEvent.STREAM_PUBLISHED,
    type: 'published'
  }, {
    name: DownEvent.STREAM_UNPUBLISHED,
    type: 'unpublished'
  }, {
    name: DownEvent.STREAM_DISABLED,
    type: 'disabled'
  }, {
    name: DownEvent.STREAM_ENABLED,
    type: 'enabled'
  }, {
    name: DownEvent.STREAM_MUTED,
    type: 'muted'
  }, {
    name: DownEvent.STREAM_UNMUTED,
    type: 'unmuted'
  }];

  var MessageEvents = [{
    name: DownEvent.MESSAGE_RECEIVED,
    type: 'received'
  }];

  var ReportEvents = [{
    name: DownEvent.REPORT_SPOKE,
    type: 'spoke'
  }];

  var getErrors = function getErrors() {
    var errors = [{
      code: 10000,
      name: 'INSTANCE_IS_DESTROYED',
      msg: 'RongRTC 实例已销毁，请重新创建实例'
    }, {
      code: 50000,
      name: 'IM_NOT_CONNECTED',
      msg: '请在 IM 连接成功后开始音频业务'
    }, {
      code: 50001,
      name: 'ROOM_ID_IS_ILLEGAL',
      msg: '房间号不合法，只能包含大小写字母、阿拉伯数字、+、=、-、_ 且长度不能超过 64 个字符'
    }, {
      code: 50002,
      name: 'ROOM_REPEAT_JOIN',
      msg: '重复加入房间'
    }, {
      code: 50010,
      name: '',
      msg: 'http 请求超时'
    }, {
      code: 50011,
      name: '',
      msg: 'http response 异常（404、500）'
    }, {
      code: 50012,
      name: '',
      msg: '请求未发出去、断网'
    }, {
      code: 50020,
      name: '',
      msg: '资源已发布'
    }, {
      code: 50021,
      name: 'SET_OFFER_ERROR',
      msg: '设置 Offer 错误'
    }, {
      code: 50021,
      name: 'SET_ANSWER_ERROR',
      msg: '设置 Answer 错误'
    }, {
      code: 50023,
      name: 'PUBLISH_STREAM_EXCEED_LIMIT',
      msg: '发布资源个数已经到达上限'
    }, {
      code: 50024,
      name: 'STREAM_NOT_EXIST',
      msg: 'stream 不存在，请检查传入参数, id、stream.type、stream.tag 是否正确'
    }, {
      code: 50030,
      name: 'SUBSCRIBE_STREAM_NOT_EXIST',
      msg: '订阅不存在的资源'
    }, {
      code: 50030,
      name: 'STREAM_TRACK_NOT_EXIST',
      msg: 'Track 不存在，请检查传入参数 stream.type 是否正确'
    }, {
      code: 50031,
      name: 'STREAM_SUBSCRIBED',
      msg: '资源已订阅'
    }, {
      code: 50032,
      name: 'UNSUBSCRIBE_STREAM_NOT_EXIST',
      msg: '取消订阅不存在资源'
    }, {
      code: 50050,
      name: 'RTC_NOT_JOIN_ROOM',
      msg: '未加入房间，加入成功后方可调用业务方法'
    }, {
      code: 50051,
      name: 'SOCKET_UNAVAILABLE',
      msg: 'IM Socket 连接不可用'
    }, {
      code: 50052,
      name: 'NETWORK_UNAVAILABLE',
      msg: '网络不可用'
    }, {
      code: 50053,
      name: 'IM_SDK_VER_NOT_MATCH',
      msg: 'IM SDK 版本过低，最低版本 2.4.0，详细请参考: https://www.rongcloud.cn/docs/web_rtclib.html'
    }, {
      code: 50054,
      name: 'STREAM_DESKTOPID_ILLEGAL',
      msg: '获取屏幕共享流失败，desktopStreamId 非法'
    }, {
      code: 50055,
      name: 'PARAMTER_ILLEGAL',
      msg: '请检查参数，{name} 参数为必传入项'
    }, {
      code: 50056,
      name: 'ENGINE_ERROR',
      msg: '音视频引擎不正确'
    }, {
      code: 40001,
      name: 'NOT_IN_ROOM',
      msg: '当前用户不在房间内'
    }, {
      code: 40002,
      name: 'INTERNAL_ERROR',
      msg: 'IM Server 内部错误'
    }, {
      code: 40003,
      name: 'HAS_NO_ROOM',
      msg: 'IM Server 房间信息不存在'
    }, {
      code: 40004,
      name: 'INVALID_USERID',
      msg: 'userId 不合法'
    }, {
      code: 40005,
      name: 'REPEAT_JOIN_ROOM',
      msg: '重复加入房间'
    }];

    var errorMap = {
      Inner: {},
      Outer: {}
    };
    utils.forEach(errors, function (error) {
      var name = error.name,
          code = error.code,
          msg = error.msg;

      var info = {
        code: code,
        msg: msg
      };
      errorMap.Inner[name] = info;
      errorMap[code] = info;
      errorMap.Outer[name] = code;
    });
    return errorMap;
  };
  var ErrorType = getErrors();

  var StreamType = {
    NODE: -1,
    AUDIO: 0,
    VIDEO: 1,
    AUDIO_AND_VIDEO: 2
  };

  var StreamSize = {
    MAX: 1,
    MIN: 2
  };

  var StreamState = {
    ENABLE: 1,
    DISBALE: 0
  };

  var UserState = {
    JOINED: 0,
    LEFT: 1,
    OFFLINE: 2
  };

  var PingCount = 4;

  var LogTag = {
    ICE: 'ice',
    LIFECYCLE: 'lifecycle',
    ROOM: 'room',
    STREAM: 'stream',
    STREAM_HANDLER: 'stream_handler',
    ROOM_HANDLER: 'room_handler',
    STORAGE_HANDLER: 'storage_handler',
    IM: 'im',
    MESSAGE: 'message',
    DEVICE: 'device'
  };

  var LogLevel = {
    INFO: 'I',
    DEBUG: 'D',
    VERBOSE: 'V',
    WARN: 'W',
    ERROR: 'E'
  };

  var EventType = {
    REQUEST: 1,
    RESPONSE: 2
  };

  var StorageType = {
    ROOM: 1,
    USER: 2
  };

  var REGEXP_ROOM_ID = /[A-Za-z0-9+=-_]+$/;

  var LENGTH_ROOM_ID = 64;

  var DEFAULT_MS_PROFILE = {
    height: 720,
    width: 1280,
    frameRate: 15
  };
  var MIN_STREAM_SUFFIX = 'tiny';

  var AUDIO_LEVEL = [0, 1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];

  var REPORT_FREQUENCY = 1 * 1000;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /* 
    data： 任意对象
    rules: 校验规则，数组
    let user = {
      id: '',
      stream: {
        type: 1,
        tag: 2
      }
    };
    // 校验必传入参数, 暂时支持 2 级
    check(user, ['id', 'stream.type', 'stream.tag', 'stream.mediaStream']);
  */
  var check = function check(data, rules) {
    var isIllegal = false,
        name = '';
    var getBody = function getBody() {
      return {
        isIllegal: isIllegal,
        name: name
      };
    };
    if (!utils.isArray(rules)) {
      rules = [rules];
    }
    if (!utils.isObject(data)) {
      throw new Error('check(data, rules): data must be an object');
    }
    utils.forEach(rules, function (rule) {
      var isTier = rule.indexOf('.') > -1;
      if (!isTier) {
        isIllegal = utils.isUndefined(data[rule]);
        if (isIllegal) {
          return name = rule;
        }
      }
      if (isTier) {
        var props = rule.split('.');

        var _props = slicedToArray(props, 2),
            parent = _props[0],
            child = _props[1];

        var parentData = data[parent];
        isIllegal = utils.isUndefined(parentData);
        if (isIllegal) {
          return name = parent;
        }
        if (!utils.isArray(parentData)) {
          parentData = [parentData];
        }
        utils.forEach(parentData, function (parent) {
          var childData = parent[child];
          isIllegal = utils.isUndefined(childData);
          if (isIllegal) {
            return name = child;
          }
        });
      }
    });
    return getBody();
  };

  var getError = function getError(name) {
    var error = ErrorType.Inner.PARAMTER_ILLEGAL;
    var msg = error.msg;

    msg = utils.tplEngine(msg, {
      name: name
    });
    return utils.extend(error, {
      msg: msg
    });
  };

  var dispatchStreamEvent = function dispatchStreamEvent(user, callback) {
    var id = user.id,
        uris = user.uris;

    if (utils.isString(uris)) {
      uris = utils.parse(uris);
    }
    var streams = [user];
    if (uris) {
      streams = utils.uniq(uris, function (target) {
        var streamId = target.streamId,
            tag = target.tag,
            mediaType = target.mediaType,
            state = target.state;

        return {
          key: [streamId, tag].join('_'),
          value: {
            tag: tag,
            uris: uris,
            mediaType: mediaType,
            state: state
          }
        };
      });
    }
    utils.forEach(streams, function (stream) {
      callback({
        id: id,
        stream: stream
      });
    });
  };

  var dispatchOperationEvent = function dispatchOperationEvent(user, callback) {
    var getModifyEvents = function getModifyEvents() {
      var events = {},
          tpl = '{type}_{state}';
      // 禁用视频
      var name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_DISABLED;
      // 启用视频
      name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_ENABLED;
      // 音频静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_MUTED;
      // 音频取消静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_UNMUTED;
      return events;
    };
    var _user$stream = user.stream,
        type = _user$stream.mediaType,
        state = _user$stream.state;

    var tpl = '{type}_{state}';
    var name = utils.tplEngine(tpl, {
      type: type,
      state: state
    });
    var events = getModifyEvents();
    var event = events[name];
    return callback(event, user);
  };

  var isSafari = function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
  };

  function Logger() {
    var observer = new utils.Observer();
    var write = function write(level, tag, meta) {
      var time = new Date().getTime();
      var log = {
        level: level,
        tag: tag,
        meta: meta,
        time: time,
        platform: 'web'
      };
      observer.emit(log);
    };
    var warn = function warn(tag, meta) {
      return write(LogLevel.WARN, tag, meta);
    };
    var error = function error(tag, meta) {
      return write(LogLevel.ERROR, tag, meta);
    };
    var info = function info(tag, meta) {
      return write(LogLevel.INFO, tag, meta);
    };
    var log = function log(tag, meta) {
      return write(LogLevel.VERBOSE, tag, meta);
    };
    var watch = function watch(watcher, force) {
      observer.add(watcher, force);
    };
    return {
      warn: warn,
      error: error,
      info: info,
      log: log,
      watch: watch
    };
  }
  var Logger$1 = Logger();

  var Room = function () {
    function Room(option) {
      classCallCheck(this, Room);

      var context = this;

      var _ref = option || '',
          id = _ref.id;

      var roomIdLen = id.length;
      var client = context.getClient();
      if (!REGEXP_ROOM_ID.test(id) || roomIdLen > LENGTH_ROOM_ID) {
        var Inner = ErrorType.Inner;

        return client.emit(DownEvent.RTC_ERROR, Inner.ROOM_ID_IS_ILLEGAL);
      }
      utils.forEach(RoomEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.ROOM, {
            event: type,
            user: user
          });
        });
      });
      utils.extend(context, {
        option: option,
        client: client,
        room: {
          id: id
        }
      });
    }

    createClass(Room, [{
      key: 'join',
      value: function join(user) {
        var _check = check(user, ['id']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var room = this.room,
            client = this.client;

        utils.extend(room, {
          user: user
        });
        return client.exec({
          event: UpEvent.ROOM_JOIN,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'leave',
      value: function leave() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_LEAVE,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'get',
      value: function get$$1() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET,
          type: 'room',
          args: [room]
        });
      }
    }]);
    return Room;
  }();

  function Video(client) {
    return {
      disable: function disable(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_DISABLE,
          type: 'stream',
          args: [user]
        });
      },
      enable: function enable(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_ENABLE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  function Audio(client) {
    return {
      mute: function mute(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_MUTE,
          type: 'stream',
          args: [user]
        });
      },
      unmute: function unmute(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_UNMUTE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  var Stream = function () {
    function Stream(option) {
      classCallCheck(this, Stream);

      var context = this;
      var client = context.getClient();
      utils.forEach(StreamEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.STREAM, {
            event: type,
            user: user
          });
        });
      });
      client.extendOption(option);
      utils.extend(context, {
        option: option,
        client: client,
        video: new Video(client),
        audio: new Audio(client)
      });
    }

    createClass(Stream, [{
      key: 'publish',
      value: function publish(user) {
        var _check = check(user, ['id', 'stream.tag', 'stream.mediaStream', 'stream.type']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_PUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unpublish',
      value: function unpublish(user) {
        var _check2 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UNPUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(user) {
        var _check3 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_SUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(user) {
        var _check4 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check4.isIllegal,
            name = _check4.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UNSUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'resize',
      value: function resize(user) {
        var _check5 = check(user, ['id', 'stream.tag']),
            isIllegal = _check5.isIllegal,
            name = _check5.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_RESIZE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(constraints) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_GET,
          type: 'stream',
          args: [constraints]
        });
      }
    }]);
    return Stream;
  }();

  var EventEmitter = function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);

      this.events = {};
      this.onceEvents = {};
    }

    createClass(EventEmitter, [{
      key: 'on',
      value: function on(name, event) {
        var events = this.events[name] || [];
        events.push(event);
        this.events[name] = events;
      }
    }, {
      key: 'off',
      value: function off(name) {
        delete this.events[name];
      }
    }, {
      key: 'emit',
      value: function emit(name, data, error) {
        var events = this.events[name];
        utils.forEach(events, function (event) {
          event(error, data);
        });

        var onceEvent = this.onceEvents[name] || utils.noop;
        onceEvent(error, data);
        delete this.onceEvents[name];
      }
    }, {
      key: 'once',
      value: function once(name, event) {
        this.onceEvents[name] = event;
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        for (var name in this.events) {
          this.off(name);
        }
        for (var _name in this.onceEvents) {
          delete this.onceEvents[_name];
        }
      }
    }]);
    return EventEmitter;
  }();

  var PeerConnectionEvent = {
    ADDED: 'p_stream_added',
    REMOVED: 'p_stream_removed',
    RECEIVED: 'p_stream_received',
    CHANGED: 'p_ice_changed'
  };

  var ICEEvent = {
    FAILED: 'failed',
    DISCONNECTED: 'disconnected'
  };

  var CommonEvent = {
    JOINED: 'common_joined',
    LEFT: 'common_left',
    ERROR: 'common_error',
    CONSUME: 'common_consume',
    REQUEST_CONSUME: 'common_request_consume',
    CONNECTED: 'common_connected',
    PEERCONN_CREATED: 'common_peerconn_created',
    PUBLISHED_STREAM: 'common_published_stream'
  };

  function request$1() {
    var config = {
      url: ''
    };
    var prosumer = new utils.Prosumer();
    var eventEmitter = new EventEmitter();
    var setOption = function setOption(_config) {
      utils.extend(config, _config);
    };
    var postProcess = function postProcess(option) {
      var domain = config.url;
      var path = option.path,
          body = option.body;

      var tpl = '{domain}{path}';
      var url = utils.tplEngine(tpl, {
        domain: domain,
        path: path
      });
      var headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };
      var _headers = option.headers;

      if (utils.isObject(_headers)) {
        utils.extend(headers, _headers);
      }
      return utils.request(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
      });
    };
    eventEmitter.on(CommonEvent.REQUEST_CONSUME, function () {
      prosumer.consume(function (_ref, next) {
        var option = _ref.option,
            resolve = _ref.resolve,
            reject = _ref.reject;

        postProcess(option).then(function (result) {
          resolve(result);
          next();
        }, function (error) {
          reject(error);
          next();
        });
      });
    });
    var post = function post(option) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({ option: option, resolve: resolve, reject: reject });
        eventEmitter.emit(CommonEvent.REQUEST_CONSUME);
      });
    };
    return {
      setOption: setOption,
      post: post
    };
  }
  var request$2 = request$1();

  var PeerConnection = function (_EventEmitter) {
    inherits(PeerConnection, _EventEmitter);

    function PeerConnection(option) {
      classCallCheck(this, PeerConnection);

      var _this = possibleConstructorReturn(this, (PeerConnection.__proto__ || Object.getPrototypeOf(PeerConnection)).call(this));

      var context = _this;
      var pc = new RTCPeerConnection({
        sdpSemantics: 'plan-b',
        // Chrome 49 Test
        iceServers: []
      });
      utils.extend(context, {
        option: option
      });
      var events = {
        onaddstream: function onaddstream(event) {
          var stream = event.stream;

          context.emit(PeerConnectionEvent.ADDED, stream);
        },
        onremovestream: function onremovestream() {
          var _event = event,
              stream = _event.stream;

          context.emit(PeerConnectionEvent.REMOVED, stream);
        },
        ondatachannel: function ondatachannel(event) {
          //TODO: 具体返回参数
          context.emit(PeerConnectionEvent.RECEIVED, event);
        },
        oniceconnectionstatechange: function oniceconnectionstatechange() {
          var state = pc.iceConnectionState;
          utils.extend(context, {
            state: state
          });
          context.emit(PeerConnectionEvent.CHANGED, state);
          Logger$1.log(LogTag.ICE, { state: state });
        }
      };
      utils.forEach(events, function (event, name) {
        pc[name] = event;
      });
      utils.extend(context, {
        pc: pc
      });
      return _this;
    }

    createClass(PeerConnection, [{
      key: 'addStream',
      value: function addStream(user) {
        var context = this;
        var pc = context.pc;
        var stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }
        utils.forEach(stream, function (_ref) {
          var mediaStream = _ref.mediaStream;

          pc.addStream(mediaStream);
        });
        return context.createOffer(user);
      }
    }, {
      key: 'removeStream',
      value: function removeStream(user) {
        var context = this;
        var pc = context.pc;
        var stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }
        utils.forEach(stream, function (_ref2) {
          var mediaStream = _ref2.mediaStream;

          pc.removeStream(mediaStream);
        });
        return context.createOffer(user);
      }
    }, {
      key: 'setOffer',
      value: function setOffer(desc) {
        var context = this;
        var pc = context.pc;

        return pc.setLocalDescription(desc);
      }
    }, {
      key: 'setAnwser',
      value: function setAnwser(answer) {
        var context = this;
        var pc = context.pc;

        answer = context.setBitrate(answer);
        return pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    }, {
      key: 'setBitrate',
      value: function setBitrate(answer) {
        var context = this;
        var bitrate = context.option.bitrate;
        var sdp = answer.sdp;

        var lineFeed = '\n';
        sdp = sdp.replace(/a=mid:video\n/g, ['a=mid:video', 'b=AS:' + bitrate.max + lineFeed].join(lineFeed));
        utils.extend(answer, {
          sdp: sdp
        });
        var sdpDetails = sdp.split(lineFeed);
        var findIndex = function findIndex(keyword) {
          var index = null;
          for (var i = 0; i < sdpDetails.length; i++) {
            var item = sdpDetails[i];
            if (utils.isInclude(item, keyword)) {
              index = i;
              break;
            }
          }
          return index;
        };
        var mVideo = 'm=video';
        var mVideoIndex = findIndex(mVideo);
        if (utils.isNull(mVideoIndex)) {
          return answer;
        }
        var separator = ' ';
        var videoDesc = sdpDetails[mVideoIndex];
        // m=video 10 UDP/TLS/RTP/SAVPF
        var videoDescDetails = videoDesc.split(separator);
        var firstVideoCodec = videoDescDetails[3];
        var codecDesc = 'a=rtpmap:' + firstVideoCodec;
        var codecDescIndex = findIndex(codecDesc);
        if (utils.isNull(codecDescIndex)) {
          return answer;
        }
        var desc = 'a=fmtp:' + firstVideoCodec + ' x-google-min-bitrate=' + bitrate.min + '; x-google-max-bitrate=' + bitrate.max;
        if (utils.isNumber(bitrate.start)) {
          desc += '; x-google-start-bitrate=' + bitrate.start;
        }
        sdpDetails[codecDescIndex] = [sdpDetails[codecDescIndex], desc].join(lineFeed);
        sdp = sdpDetails.join(lineFeed);
        utils.extend(answer, {
          sdp: sdp
        });
        return answer;
      }
    }, {
      key: 'close',
      value: function close() {
        var context = this;
        var pc = context.pc;

        pc.close();
        context.pc = null;
        delete context.pc;
      }
    }, {
      key: 'getOption',
      value: function getOption() {
        return {
          iceRestart: true,
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        };
      }
    }, {
      key: 'isNegotiate',
      value: function isNegotiate() {
        var state = this.state;

        return utils.isEqual(state, ICEEvent.FAILED) || utils.isEqual(state, ICEEvent.DISCONNECTED);
      }
    }, {
      key: 'createOffer',
      value: function createOffer(user) {
        var context = this;
        var pc = context.pc;
        var stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }
        var option = context.getOption();
        return utils.deferred(function (resole, reject) {
          pc.createOffer(function (desc) {
            utils.forEach(stream, function (_ref3) {
              var mediaStream = _ref3.mediaStream,
                  size = _ref3.size;

              var newStreamId = context.getStreamId(user, size);
              var streamId = mediaStream.id;
              var _desc = desc,
                  sdp = _desc.sdp;

              sdp = context.renameStream(sdp, {
                name: streamId,
                newName: newStreamId
              });
              utils.extend(desc, {
                sdp: sdp
              });
            });
            desc = context.renameCodec(desc);
            utils.extend(context, {
              desc: desc
            });
            resole(desc);
          }, function (error) {
            reject(error);
          }, option);
        });
      }
    }, {
      key: 'getOffer',
      value: function getOffer(callback) {
        var context = this;
        var pc = context.pc;

        var option = context.getOption();
        var success = function success(desc) {
          desc = context.renameCodec(desc);
          callback && callback(desc);
          return desc;
        };
        return pc.createOffer(option).then(success);
      }
    }, {
      key: 'renameStream',
      value: function renameStream(sdp, data) {
        var name = data.name,
            newName = data.newName;

        return sdp.replace(new RegExp(name, 'g'), newName);
      }
    }, {
      key: 'renameCodec',
      value: function renameCodec(offer) {
        var sdp = offer.sdp;
        // sdp = sdp.replace(new RegExp('a=group:BUNDLE 0 1', 'g'), 'a=group:BUNDLE audio video')

        var codecs = [{
          name: 'H264/90000',
          code: 98,
          rtx: 99,
          value: 'a=rtpmap:98 H264/90000\r\na=rtcp-fb:98 ccm fir\r\na=rtcp-fb:98 nack\r\na=rtcp-fb:98 nack pli\r\na=rtcp-fb:98 goog-remb\r\na=rtcp-fb:98 transport-cc\r\na=fmtp:98 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\na=rtpmap:99 rtx/90000\r\na=fmtp:99 apt=98'
        }, {
          name: 'VP8/90000',
          code: 96,
          rtx: 97,
          value: 'a=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtpmap:97 rtx/90000\r\na=fmtp:97 apt=96'
        }, {
          name: 'red/90000',
          rtx: '101',
          code: 100,
          value: 'a=rtpmap:100 red/90000\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100'
        }, {
          name: 'ulpfec/90000',
          code: 127,
          value: 'a=rtpmap:127 ulpfec/90000'
        }, {
          name: 'flexfec-03/90000',
          code: 125,
          value: 'a=rtpmap:125 flexfec-03/90000\r\na=rtcp-fb:125 transport-cc\r\na=rtcp-fb:125 goog-remb\r\na=fmtp:125 repair-window=10000000'
        }];
        var separator = '\r\n';
        var getVideoCodecs = function getVideoCodecs(len) {
          var matches = sdp.match(/m=video\s+[\w\s/]+/);
          var videoDesc = matches[0];
          var codecs = videoDesc.split(' ');
          // m=video 55382 UDP/TLS/RTP/SAVPF 98....
          codecs.length = len;
          return codecs;
        };
        // 获取 m=video 编码表的前三位
        var videoCodecs = getVideoCodecs(3);

        // 得到 Video 描述信息列表
        var videoTotalIndex = sdp.indexOf('m=video');
        var ssrcIndex = sdp.indexOf('a=ssrc-group');
        if (utils.isEqual(ssrcIndex, -1)) {
          ssrcIndex = sdp.length;
        }
        var videoBody = sdp.substring(videoTotalIndex, ssrcIndex);
        var videoDescs = videoBody.split(separator);
        var supportCodecs = {};
        utils.forEach(codecs, function (codec) {
          var name = codec.name;

          utils.forEach(videoDescs, function (desc) {
            if (utils.isInclude(desc, name)) {
              supportCodecs[name] = codec;
            }
          });
        });
        var sdpBody = '';
        utils.forEach(supportCodecs, function (codec) {
          var code = codec.code,
              value = codec.value,
              rtx = codec.rtx;

          sdpBody += value + separator;
          videoCodecs.push(code, rtx);
        });
        // 新 SDP = m=video + 所有 a=rtpmap + sdpFooter
        videoBody = videoBody.split(separator);
        videoBody.shift();
        videoBody = videoBody.join(separator);
        var headerIndex = videoBody.indexOf('a=rtpmap');
        var sdpHeader = sdp.substring(0, videoTotalIndex);
        var videoHeader = videoBody.substring(0, headerIndex);
        // 包含 ssrc 信息
        var sdpFooter = sdp.substring(ssrcIndex, sdp.length);
        sdp = sdpHeader + videoCodecs.join(' ') + '\r\n' + videoHeader + sdpBody + sdpFooter;
        utils.extend(offer, {
          sdp: sdp
        });
        return offer;
      }
      /* 
        let ratio = {
          msid: {
            // 1大流    2小流 
            simulcast: 1,
            resolution: "0x0"
          }
        }
      */

    }, {
      key: 'getStreamRatio',
      value: function getStreamRatio(streams) {
        var ratio = {},
            tpl = '{width}x{height}';
        utils.forEach(streams, function (_ref4) {
          var id = _ref4.id,
              mediaStream = _ref4.mediaStream;

          var resolutions = ratio[id] || [];
          var videoTrack = mediaStream.getVideoTracks()[0];
          var simulcast = StreamSize.MAX;
          if (!utils.isUndefined(videoTrack)) {
            var _videoTrack$getConstr = videoTrack.getConstraints(),
                height = _videoTrack$getConstr.height,
                width = _videoTrack$getConstr.width;

            height = height || DEFAULT_MS_PROFILE.height;
            width = width || DEFAULT_MS_PROFILE.width;
            if (utils.isInclude(id, MIN_STREAM_SUFFIX)) {
              simulcast = StreamSize.MIN;
            }
            var resolution = utils.tplEngine(tpl, {
              height: height,
              width: width
            });
            resolutions.push({
              simulcast: simulcast,
              resolution: resolution
            });
            ratio[id] = resolutions;
          }
        });
        return ratio;
      }
    }, {
      key: 'getStreamId',
      value: function getStreamId(user, size) {
        var tpl = '{userId}_{tag}';
        var userId = user.id,
            stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }

        var _stream = stream,
            _stream2 = slicedToArray(_stream, 1),
            tag = _stream2[0].tag;

        if (utils.isEqual(size, StreamSize.MIN)) {
          tpl = '{userId}_{tag}_{suffix}';
        }
        return utils.tplEngine(tpl, {
          userId: userId,
          tag: tag,
          suffix: MIN_STREAM_SUFFIX
        });
      }
    }, {
      key: 'getTagByStreamId',
      value: function getTagByStreamId(id) {
        var details = id.split('_');
        return details[details.length - 1];
      }
    }, {
      key: 'getStreamSymbolById',
      value: function getStreamSymbolById(id) {
        var connector = '_';
        var details = id.split(connector);
        var tag = details.pop();
        var userId = details.join(connector);
        return [userId, tag];
      }
    }, {
      key: 'getStats',
      value: function getStats(callback) {
        var context = this;
        var pc = context.pc;

        return pc.getStats(function (resports) {
          var stats = [];
          resports.result().forEach(function (res) {
            var report = {};
            res.names().forEach(function (name) {
              report[name] = res.stat(name);
            });
            utils.extend(report, res);
            stats.push(report);
          });
          callback(stats);
        });
      }
    }]);
    return PeerConnection;
  }(EventEmitter);

  var Path = {
    PUBLISH: '/exchange',
    UNPUBLISH: '/exchange',
    RESIZE: '/exchange',
    SUBSCRIBE: '/exchange',
    UNSUBSCRIBE: '/exchange',
    EXIT: '/exit'
  };

  var Message = {
    PUBLISH: 'RTCPublishResourceMessage',
    UNPUBLISH: 'RTCUnpublishResourceMessage',
    MODIFY: 'RTCModifyResourceMessage',
    STATE: 'RTCUserChangeMessage',
    ROOM_NOTIFY: 'RTCRoomDataNotifyMessage',
    USER_NOTIFY: 'RTCUserDataNotifyMessage'
  };

  var MessageName = {
    PUBLISH: 'RCRTC:PublishResource',
    UNPUBLISH: 'RCRTC:UnpublishResource',
    MODIFY: 'RCRTC:ModifyResource',
    STATE: 'RCRTC:state',
    ROOM_NOTIFY: 'RCRTC:RoomNtf',
    USER_NOTIFY: 'RCRTC:UserNtf'
  };
  var Timeout = {
    TIME: 10 * 1000
  };
  var errorHandler = function errorHandler(code) {
    var error = ErrorType[code] || {
      code: code
    };
    return error;
  };
  var getMsgName = function getMsgName(type) {
    switch (type) {
      case Message.PUBLISH:
        return MessageName.PUBLISH;
      case Message.UNPUBLISH:
        return MessageName.UNPUBLISH;
      case Message.MODIFY:
        return MessageName.MODIFY;
      case Message.STATE:
        return MessageName.STATE;
      case Message.ROOM_NOTIFY:
        return MessageName.ROOM_NOTIFY;
      case Message.USER_NOTIFY:
        return MessageName.USER_NOTIFY;
    }
  };
  var IM = function (_EventEmitter) {
    inherits(IM, _EventEmitter);

    function IM(option) {
      classCallCheck(this, IM);

      var _this = possibleConstructorReturn(this, (IM.__proto__ || Object.getPrototypeOf(IM)).call(this));

      var timer = new utils.Timer({
        timeout: Timeout.TIME
      });
      var context = _this;
      var isJoinRoom = false;
      utils.extend(context, {
        timer: timer,
        isJoinRoom: isJoinRoom
      });
      var im = option.RongIMLib.RongIMClient,
          RongIMLib = option.RongIMLib;

      var init = function init() {
        if (context.isJoinRoom) {
          context.rePing();
        }
        context.registerMessage();
      };
      var connectState = -1;
      try {
        connectState = im.getInstance().getCurrentConnectionStatus();
      } catch (error) {
        Logger$1.error(LogTag.IM, {
          content: error,
          pos: 'new RongRTC'
        });
      }
      var CONNECTED = RongIMLib.ConnectionStatus.CONNECTED;

      utils.extend(context, {
        connectState: connectState,
        im: im,
        RongIMLib: RongIMLib
      });
      // 如果实例化 RongRTC 时，IM 已连接成功，主动触发内部 init
      if (utils.isEqual(connectState, CONNECTED)) {
        init();
      }
      im.statusWatch = im.statusWatch || utils.noop;
      im.statusWatch(function (status) {
        switch (status) {
          case CONNECTED:
            init();
            context.emit(CommonEvent.CONNECTED);
            break;
        }
        utils.extend(context, {
          connectState: status
        });
      });
      var roomEventHandler = function roomEventHandler(users) {
        utils.forEach(users, function (user) {
          var id = user.userId,
              state = user.state;

          switch (+state) {
            case UserState.JOINED:
              context.emit(DownEvent.ROOM_USER_JOINED, { id: id });
              break;
            case UserState.LEFT:
            case UserState.OFFLINE:
              Logger$1.log(LogTag.ROOM, {
                msg: 'room:member:left',
                user: user
              });
              context.emit(DownEvent.ROOM_USER_LEFT, { id: id });
              break;
            default:
              Logger$1.warn('UserState: unkown state ' + state);
          }
        });
      };
      /**
       * 收到 UnkownMessage 自动转为 ObjectName + "Message" 做为 MessageType
       * 免去注册自定义消息逻辑
       */
      var renameMessage = function renameMessage(message) {
        var messageType = message.messageType;

        var isCustom = utils.isEqual(im.MessageType.UnknownMessage, messageType);
        var clear = function clear(msg, content) {
          delete content.objectName;
          delete content.messageName;
          delete msg.conversationType;
          delete msg.messageId;
          delete msg.offLineMessage;
          delete msg.receivedStatus;
          delete msg.messageType;
          delete msg.targetId;
          delete msg.messageDirection;
        };
        var msg = utils.parse(utils.toJSON(message));
        var content = {};
        if (isCustom) {
          var customMsg = msg.content;
          content = customMsg.message.content;
        } else {
          content = msg.content;
        }
        clear(msg, content);
        utils.extend(msg, {
          content: content
        });
        msg = utils.rename(msg, {
          objectName: 'name',
          messageUId: 'uId',
          senderUserId: 'senderId'
        });
        return msg;
      };
      im.messageWatch = im.messageWatch || utils.noop;
      im.messageWatch(function (message) {
        var type = message.messageType,
            id = message.senderUserId,
            _message$content = message.content,
            uris = _message$content.uris,
            users = _message$content.users;

        var user = { id: id };
        switch (type) {
          case Message.STATE:
            roomEventHandler(users);
            break;
          case Message.PUBLISH:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_PUBLISHED, user);
            });
            break;
          case Message.UNPUBLISH:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_UNPUBLISHED, user);
            });
            break;
          case Message.MODIFY:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              dispatchOperationEvent(user, function (event, user) {
                context.emit(event, user);
              });
            });
            break;
          default:
            context.emit(DownEvent.MESSAGE_RECEIVED, renameMessage(message));
        }
        Logger$1.log(LogTag.IM, {
          msg: 'receive:message',
          message: message
        });
      });
      return _this;
    }

    createClass(IM, [{
      key: 'registerMessage',
      value: function registerMessage() {
        var im = this.im,
            RongIMLib = this.RongIMLib;

        var register = function register(message) {
          var type = message.type,
              name = message.name,
              props = message.props;

          var isCounted = false;
          var isPersited = false;
          var tag = new RongIMLib.MessageTag(isCounted, isPersited);
          im.registerMessageType(type, name, tag, props);
        };
        var messages = [{
          type: Message.PUBLISH,
          name: getMsgName(Message.PUBLISH),
          props: ['uris']
        }, {
          type: Message.UNPUBLISH,
          name: getMsgName(Message.UNPUBLISH),
          props: ['uris']
        }, {
          type: Message.MODIFY,
          name: getMsgName(Message.MODIFY),
          props: ['uris']
        }, {
          type: Message.STATE,
          name: getMsgName(Message.STATE),
          props: ['users']
        }, {
          type: Message.ROOM_NOTIFY,
          name: getMsgName(Message.ROOM_NOTIFY),
          props: ['content']
        }, {
          type: Message.USER_NOTIFY,
          name: getMsgName(Message.USER_NOTIFY),
          props: ['content']
        }];
        utils.forEach(messages, function (message) {
          register(message);
        });
      }
    }, {
      key: 'joinRoom',
      value: function joinRoom(room) {
        var context = this;
        var im = context.im;

        utils.extend(context, {
          room: room,
          isJoinRoom: true
        });
        return utils.deferred(function (resolve, reject) {
          im.getInstance().joinRTCRoom(room, {
            onSuccess: function onSuccess(_ref) {
              var users = _ref.users,
                  token = _ref.token;

              context.rtcPing(room);

              var _context$getUser = context.getUser(),
                  currentUserId = _context$getUser.id;

              utils.forEach(users, function (user, userId) {
                user = user || {};
                // 过滤自己和为空的用户
                if (utils.isEmpty(user) || utils.isEqual(currentUserId, user.id)) {
                  delete users[userId];
                }
                var _user = user,
                    uris = _user.uris;

                if (!utils.isUndefined(uris)) {
                  uris = utils.parse(uris);
                  utils.extend(user, {
                    uris: uris
                  });
                }
              });
              utils.extend(room, {
                rtcToken: token,
                users: users
              });
              context.emit(CommonEvent.JOINED, room);
              resolve(users);
            },
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'leaveRoom',
      value: function leaveRoom() {
        var context = this;
        var im = context.im,
            room = context.room,
            timer = context.timer;

        timer.pause();
        utils.extend(context, {
          isJoinRoom: false
        });
        context.emit(CommonEvent.LEFT, room);
        return utils.deferred(function (resolve, reject) {
          im.getInstance().quitRTCRoom(room, {
            onSuccess: function onSuccess() {
              resolve();
            },
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'getRoom',
      value: function getRoom() {
        var im = this.im,
            room = this.room;

        return utils.deferred(function (resolve, _reject) {
          im.getInstance().getRTCRoomInfo(room, {
            onSuccess: resolve,
            reject: function reject(code) {
              return _reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'getUsers',
      value: function getUsers() {
        var im = this.im,
            room = this.room;

        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCUserInfoList(room, {
            onSuccess: resolve,
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'getRTCToken',
      value: function getRTCToken() {
        var rtcToken = this.room.rtcToken;

        return rtcToken;
      }
    }, {
      key: 'getRoomId',
      value: function getRoomId() {
        var id = this.room.id;

        return id;
      }
    }, {
      key: 'getMSUrl',
      value: function getMSUrl() {
        var im = this.im;

        var navi = im.getInstance().getNavi();
        var rtcInfo = navi.voipCallInfo;

        rtcInfo = rtcInfo || '{"callEngine": [{}]}';
        rtcInfo = utils.parse(rtcInfo);
        var engines = rtcInfo.callEngine;
        var engine = utils.filter(engines, function (e) {
          return e.engineType === 4;
        })[0] || {};
        return engine.mediaServer;
      }
    }, {
      key: 'getUser',
      value: function getUser() {
        var user = this.room.user;

        return user;
      }
    }, {
      key: 'setUserInfo',
      value: function setUserInfo(key, value) {
        var room = this.room,
            im = this.im;

        value = utils.toJSON(value);
        var info = {
          key: key,
          value: value
        };
        return utils.deferred(function (resolve, reject) {
          im.getInstance().setRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      }
    }, {
      key: 'removeUserInfo',
      value: function removeUserInfo(keys) {
        var room = this.room,
            im = this.im;

        var info = {
          keys: keys
        };
        return utils.deferred(function (resolve, reject) {
          im.getInstance().removeRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      }
    }, {
      key: 'setUserData',
      value: function setUserData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        value = utils.toJSON(value);
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'setUserData:before',
          roomId: id,
          value: value,
          message: message
        });
        return utils.deferred(function (resolve, reject) {
          im.getInstance().setRTCUserData(id, key, value, isInner, {
            onSuccess: function onSuccess() {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'setUserData:after',
                roomId: id,
                value: value,
                message: message
              });
              resolve();
            },
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'getUserData',
      value: function getUserData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: function onError(error) {
              reject(error);
            }
          });
        });
      }
    }, {
      key: 'removeUserData',
      value: function removeUserData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().removeRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'setRoomData',
      value: function setRoomData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        return utils.deferred(function (resolve, reject) {
          im.getInstance().setRTCRoomData(id, key, value, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'getRoomData',
      value: function getRoomData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCRoomData(id, keys, isInner, {
            onSuccess: function onSuccess(data) {
              resolve(data);
            },
            onError: reject
          });
        });
      }
    }, {
      key: 'removeRoomData',
      value: function removeRoomData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().removeRTCRoomData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'getExistUsers',
      value: function getExistUsers() {
        var im = this.im,
            room = this.room;

        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCUserList(room, {
            onSuccess: resolve,
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'sendMessage',
      value: function sendMessage(message) {
        var im = this.im,
            room = this.room,
            RongIMLib = this.RongIMLib;

        return utils.deferred(function (resolve, reject) {
          var conversationType = 12,
              targetId = room.id;
          var register = function register(name) {
            var isCounted = false;
            var isPersited = false;
            var tag = new RongIMLib.MessageTag(isCounted, isPersited);
            var content = message.content;

            var props = utils.map(utils.toArray(content), function (columns) {
              return columns[0];
            });
            im.registerMessageType(name, name, tag, props);
          };
          var create = function create() {
            var name = message.name,
                content = message.content;

            if (utils.isUndefined(im.RegisterMessage[name])) {
              register(name);
            }
            return new im.RegisterMessage[name](content);
          };
          var msg = create();
          Logger$1.log(LogTag.IM, {
            msg: 'send:before',
            message: message
          });
          im.getInstance().sendMessage(conversationType, targetId, msg, {
            onSuccess: function onSuccess() {
              Logger$1.log(LogTag.IM, {
                msg: 'send:after',
                message: message
              });
              resolve(room);
            },
            onError: function onError(code) {
              Logger$1.log(LogTag.IM, {
                msg: 'send:after',
                error: code
              });
              reject(code);
            }
          });
        });
      }
    }, {
      key: 'getMessage',
      value: function getMessage(type, content) {
        var name = getMsgName(type);
        content = utils.toJSON(content);
        return {
          name: name,
          content: content
        };
      }
    }, {
      key: 'isIMReady',
      value: function isIMReady() {
        var context = this;
        var CONNECTED = context.RongIMLib.ConnectionStatus.CONNECTED;

        return context.connectState === CONNECTED;
      }
    }, {
      key: 'getAppInfo',
      value: function getAppInfo() {
        var context = this;
        var im = context.im;

        return im.getInstance().getAppInfo();
      }
    }, {
      key: 'isJoined',
      value: function isJoined() {
        var context = this;
        return context.isJoinRoom;
      }
    }, {
      key: 'isSupportRTC',
      value: function isSupportRTC() {
        var context = this;
        var im = context.im;

        var isSupport = false;
        if (utils.isFunction(im.prototype.RTCPing)) {
          isSupport = true;
        }
        return isSupport;
      }
    }, {
      key: 'rePing',
      value: function rePing() {
        var context = this;
        var timer = context.timer;

        var roomId = context.getRoomId();
        if (!utils.isUndefined(roomId)) {
          timer.pause();
          context.rtcPing({
            id: roomId
          });
        }
      }
    }, {
      key: 'rtcPing',
      value: function rtcPing(room) {
        var context = this;
        var im = context.im,
            timer = context.timer;

        var count = 0;
        var isPinging = false;
        var Status = {
          reset: function reset() {
            count = 0;
            isPinging = false;
          },
          sum: function sum() {
            count += 1;
          }
        };
        var Inner = ErrorType.Inner;

        timer.resume(function () {
          if (count > PingCount) {
            timer.pause();
            utils.extend(context, {
              isJoinRoom: false
            });
            context.emit(CommonEvent.LEFT);
            return context.emit(CommonEvent.ERROR, Inner.SOCKET_UNAVAILABLE);
          }
          // 如果上次 Ping 没有结束，累计 Ping 次数
          if (isPinging) {
            Status.sum();
          }
          isPinging = true;
          im.getInstance().RTCPing(room, {
            onSuccess: function onSuccess() {
              Status.reset();
            },
            onError: function onError(code) {
              Logger$1.error(LogTag.IM, {
                msg: 'RTC Ping Error' + code
              });
            }
          });
        }, true);
      }
    }]);
    return IM;
  }(EventEmitter);

  var Network = function () {
    function Network(_option) {
      classCallCheck(this, Network);

      _option = _option || {};
      var option = {
        url: 'https://cdn.ronghub.com/detecting',
        timeout: 1500,
        max: 30
      };
      utils.extend(option, _option);
      utils.extend(this, {
        option: option
      });
    }

    createClass(Network, [{
      key: 'detect',
      value: function detect(callback) {
        var context = this;
        var detecting = context.detecting,
            option = context.option;

        if (detecting) {
          return;
        }
        utils.extend(context, {
          detecting: true
        });
        var url = option.url,
            timeout = option.timeout,
            max = option.max;

        var count = 1;
        var getCount = function getCount() {
          count += 1;
          return count;
        };
        var isOnline = false;
        var ajax = function ajax() {
          count = getCount();
          utils.request(url).then(function () {}, function (_ref) {
            var status = _ref.status;

            if (utils.isEqual(status, 404)) {
              utils.extend(context, {
                detecting: false
              });
              isOnline = true;
              return callback(isOnline);
            }
            if (utils.isEqual(max, count)) {
              return callback(isOnline);
            }
            setTimeout(function () {
              ajax();
            }, timeout);
          });
        };
        ajax();
      }
    }]);
    return Network;
  }();

  function StreamHandler(im, option) {
    var DataCache = utils.Cache();
    var DataCacheName = {
      USERS: 'room_users',
      // 全部通知后一次性交换 SDP
      IS_NOTIFY_READY: 'is_notify_ready'
    };
    var SubPromiseCache = utils.Cache();
    var PubResourceCache = utils.Cache();
    // 缓存自己发布的视频流
    var PublishStreamCache = utils.Cache();
    /* 
      缓存已订阅 MediaStream
      userId_type: mediaStream
      方便视频流操作
    */
    var StreamCache = utils.Cache();
    /* 
      缓存订阅关系，每次修改需同步全量数据
      userId: [{ streamId: '', uri: '', type: 1, tag: ''}]
    */
    var subCache = utils.Cache();
    var prosumer = new utils.Prosumer();
    var pc = null;
    var User = {
      set: function set$$1(key, data, isInner, message) {
        return im.setUserData(key, data, isInner, message);
      },
      SET_USERINFO: 'uris'
    };
    var SubscribeCache = {
      get: function get$$1(userId) {
        return subCache.get(userId);
      },
      set: function set$$1(userId, subs) {
        return subCache.set(userId, subs);
      },
      getKeys: function getKeys() {
        return subCache.getKeys();
      },
      remove: function remove(user) {
        var userId = user.id;

        var subs = subCache.get(userId) || [];
        var streamId = pc.getStreamId(user);
        subs = utils.filter(subs, function (_ref) {
          var msid = _ref.msid;

          return !utils.isEqual(streamId, msid);
        });
        subCache.set(userId, subs);
      },
      clear: function clear() {
        subCache.clear();
      }
    };
    var clear = function clear() {
      DataCache.clear();
      SubPromiseCache.clear();
      PubResourceCache.clear();
      StreamCache.clear();
      SubscribeCache.clear();
      PublishStreamCache.clear();
    };
    var eventEmitter = new EventEmitter();
    var getSubPromiseUId = function getSubPromiseUId(user) {
      var id = user.id,
          _user$stream = user.stream,
          tag = _user$stream.tag,
          type = _user$stream.type;

      var tpl = '{id}_{tag}_{type}';
      return utils.tplEngine(tpl, {
        id: id,
        tag: tag,
        type: type
      });
    };
    var getSubs = function getSubs() {
      var subs = [];
      var userIds = SubscribeCache.getKeys();
      utils.forEach(userIds, function (userId) {
        var streams = SubscribeCache.get(userId);
        utils.forEach(streams, function (stream) {
          subs.push(stream);
        });
      });
      return subs;
    };
    var getHeaders = function getHeaders() {
      var roomId = im.getRoomId();
      var token = im.getRTCToken();

      var _im$getAppInfo = im.getAppInfo(),
          appKey = _im$getAppInfo.appKey;

      return {
        'App-Key': appKey,
        RoomId: roomId,
        Token: token
      };
    };
    var getBody = function getBody(desc) {
      var subs = getSubs();
      var streams = [];
      var streamIds = PublishStreamCache.getKeys();
      streams = utils.map(streamIds, function (id) {
        var mediaStream = PublishStreamCache.get(id);
        return {
          id: id,
          mediaStream: mediaStream
        };
      });
      var resolutionInfo = pc.getStreamRatio(streams);
      var body = {
        subscribeList: subs,
        resolutionInfo: resolutionInfo
      };
      if (desc) {
        utils.extend(body, {
          sdp: desc
        });
        return utils.Defer.resolve(body);
      }
      return pc.getOffer().then(function (offer) {
        utils.extend(body, {
          sdp: offer
        });
        return body;
      });
    };
    var negotiate = function negotiate(response) {
      pc.getOffer().then(function (offer) {
        pc.setOffer(offer);
        var sdp = response.sdp;

        pc.setAnwser(sdp);
      });
    };
    /* 
    人员比较:
      1、clone 本地数据
      2、遍历服务端数据，在本地获取，本地没有认为是新增，本地有认为人员无变化
      3、本地有同时删掉 clone 数据，最终剩下的数据认为已离开房间
    资源比较:
      1、本地数据、远端数据转换为 {msid: [uri1, uri2]}
    最后更新本地数据
    */
    var compare = function compare() {
      var format = function format(users) {
        var streams = {};
        utils.forEach(users, function (_ref2) {
          var uris = _ref2.uris;

          utils.forEach(uris, function (uri) {
            var msid = uri.msid;

            var resources = streams[msid] || [];
            resources.push(uri);
            streams[msid] = resources;
          });
        });
        return streams;
      };
      var dispatch = function dispatch(event, id, uris, callback) {
        dispatchStreamEvent({ id: id, uris: uris }, function (user) {
          if (utils.isFunction(callback)) {
            return callback(user);
          }
          im.emit(event, user);
        });
      };
      // 发布、取消发布、视频操作、音频操作
      var compareStreams = function compareStreams(localUsers, remoteUsers) {
        localUsers = format(localUsers);
        remoteUsers = format(remoteUsers);
        var tempLocalUsers = utils.clone(localUsers);
        utils.forEach(remoteUsers, function (remoteUris, remoteMSId) {
          /** 
           * 包含本地资源说明流没有变化，删除 tempLocalUsers，且需比对 track 变化，state 有差异，以 remoteUsers 为准
           * 未包含说明是新发布资源，触发 published 事件 
           * 遍历后 tempLocalUsers 还有数据认为是取消发布
           */
          var isInclude = remoteMSId in localUsers;

          var _pc$getStreamSymbolBy = pc.getStreamSymbolById(remoteMSId),
              _pc$getStreamSymbolBy2 = slicedToArray(_pc$getStreamSymbolBy, 1),
              userId = _pc$getStreamSymbolBy2[0];

          var _im$getUser = im.getUser(),
              currentUserId = _im$getUser.id;

          var isCurrent = utils.isEqual(currentUserId, userId);
          if (isInclude) {
            delete tempLocalUsers[remoteMSId];
            var tempRemote = utils.toJSON(remoteUris);
            var localUris = localUsers[remoteMSId];
            var tempLocal = utils.toJSON(localUris);
            if (!utils.isEqual(tempRemote, tempLocal)) {
              dispatch('', userId, remoteUris, function (user) {
                dispatchOperationEvent(user, function (event, user) {
                  im.emit(event, user);
                });
              });
            }
          } else {
            if (!isCurrent) {
              dispatch(DownEvent.STREAM_PUBLISHED, userId, remoteUris);
            }
          }
        });
        utils.forEach(tempLocalUsers, function (localUris, localMSId) {
          var _pc$getStreamSymbolBy3 = pc.getStreamSymbolById(localMSId),
              _pc$getStreamSymbolBy4 = slicedToArray(_pc$getStreamSymbolBy3, 1),
              userId = _pc$getStreamSymbolBy4[0];

          dispatch(DownEvent.STREAM_UNPUBLISHED, userId, localUris);
        });
      };
      // 成员加入、退出
      var compareUser = function compareUser(localUsers, remoteUsers) {
        var tempLocalUsers = utils.clone(localUsers);
        var tempRemoteUsers = utils.toArray(remoteUsers);

        var _im$getUser2 = im.getUser(),
            currentUserId = _im$getUser2.id;

        utils.forEach(tempRemoteUsers, function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 1),
              remoteUserId = _ref4[0];

          var isInclude = remoteUserId in localUsers;
          var isCurrent = utils.isEqual(currentUserId, remoteUserId);
          if (isInclude) {
            delete tempLocalUsers[remoteUserId];
          } else {
            if (!isCurrent) {
              im.emit(DownEvent.ROOM_USER_JOINED, { id: remoteUserId });
            }
          }
        });
        tempLocalUsers = utils.toArray(tempLocalUsers);
        utils.forEach(tempLocalUsers, function (_ref5) {
          var _ref6 = slicedToArray(_ref5, 1),
              id = _ref6[0];

          im.emit(DownEvent.ROOM_USER_LEFT, { id: id });
        });
      };
      im.getUsers().then(function (remoteUsers) {
        utils.forEach(remoteUsers, function (user) {
          var uris = user.uris;

          uris = utils.parse(uris);
          utils.extend(user, {
            uris: uris
          });
        });
        var localUsers = DataCache.get(DataCacheName.USERS);
        compareUser(localUsers, remoteUsers);
        compareStreams(localUsers, remoteUsers);
        DataCache.set(DataCacheName.USERS, remoteUsers);
      });
    };
    im.on(CommonEvent.CONNECTED, function () {
      var users = DataCache.get(DataCacheName.USERS);
      if (users) {
        compare();
      }
    });
    var reconnect = function reconnect() {
      var roomId = im.getRoomId();
      getBody().then(function (body) {
        var url = utils.tplEngine(Path.SUBSCRIBE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'publish:reconnect:request',
          roomId: roomId,
          body: body
        });
        var headers = getHeaders();
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publish:reconnect:response',
            roomId: roomId,
            response: response
          });
          negotiate(response);
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publish:reconnect:response',
            roomId: roomId,
            error: error
          });
          return error;
        });
      });
    };
    var getUris = function getUris(publishList) {
      return utils.map(publishList, function (stream) {
        var msid = stream.msid;

        var tag = pc.getTagByStreamId(msid);
        utils.extend(stream, {
          tag: tag,
          state: StreamState.ENABLE
        });
        return stream;
      });
    };
    var detect = option.detect;

    var network = new Network(detect);
    var getTrackState = function getTrackState(streams) {
      if (!utils.isArray(streams)) {
        streams = [streams];
      }
      var result = {};
      utils.forEach(streams, function (_ref7) {
        var mediaStream = _ref7.mediaStream;
        var streamId = mediaStream.streamId;

        var videoTracks = mediaStream.getVideoTracks();
        var audioTracks = mediaStream.getAudioTracks();
        var func = function func(track) {
          return utils.isEqual(track.enabled, false);
        };
        var video = StreamState.ENABLE;
        if (utils.some(videoTracks, func)) {
          video = StreamState.DISBALE;
        }
        var audio = StreamState.ENABLE;
        if (utils.some(audioTracks, func)) {
          audio = StreamState.DISBALE;
        }
        result[streamId] = {
          video: video,
          audio: audio
        };
      });
      return result;
    };
    var updateTrackState = function updateTrackState(user, sendUris, uris) {
      var streams = user.stream;

      var states = getTrackState(streams);
      var update = function update(_uris) {
        utils.forEach(states, function (_ref8, streamId) {
          var audio = _ref8.audio,
              video = _ref8.video;

          utils.map(_uris, function (uri) {
            var isSameStream = utils.isEqual(uri.msid, streamId);
            if (isSameStream && utils.isEqual(uri.mediaType, StreamType.VIDEO)) {
              utils.extend(uri, {
                state: video
              });
            }
            if (isSameStream && utils.isEqual(uri.mediaType, StreamType.AUDIO)) {
              utils.extend(uri, {
                state: audio
              });
            }
            return uri;
          });
        });
      };
      update(sendUris);
      update(uris);
      return {
        sendUris: sendUris,
        uris: uris
      };
    };
    var appendStreamId = function appendStreamId(user) {
      var id = user.id;
      var streams = user.stream;

      if (!utils.isArray(streams)) {
        streams = [streams];
      }
      utils.map(streams, function (stream) {
        var streamId = pc.getStreamId({
          id: id,
          stream: stream
        });
        var mediaStream = stream.mediaStream;

        utils.extend(mediaStream, {
          streamId: streamId
        });
      });
    };
    var exchangeHandler = function exchangeHandler(result, user, type, offer) {
      var publishList = result.publishList,
          sdp = result.sdp;

      pc.setOffer(offer);
      pc.setAnwser(sdp);
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'exchangeHandler set sdp'
      });
      var uris = getUris(publishList);
      appendStreamId(user);
      var getTempUris = function getTempUris(type) {
        var userId = user.id;

        var cacheUris = PubResourceCache.get(userId) || [];
        var isPublish = utils.isEqual(type, Message.PUBLISH);
        if (isPublish) {
          cacheUris = uris;
        }
        var streamId = pc.getStreamId(user);
        var getCondition = function getCondition(stream) {
          var msid = stream.msid;

          return utils.isEqual(msid, streamId);
        };
        var tempUris = utils.filter(cacheUris, function (stream) {
          return getCondition(stream);
        });
        // 第一次 publish 过滤后 tempUris 为空，使用默认值
        return utils.isEmpty(tempUris) ? uris : tempUris;
      };
      var sendUris = getTempUris(type);
      updateTrackState(user, sendUris, uris);
      var content = {
        uris: sendUris
      };
      var message = im.getMessage(type, content);
      var isInner = true;
      User.set(User.SET_USERINFO, uris, isInner, message);
      return PubResourceCache.set(user.id, uris);
    };
    var getUId = function getUId(user, tpl) {
      tpl = tpl || '{userId}_{tag}_{type}';
      var userId = user.id,
          _user$stream2 = user.stream,
          tag = _user$stream2.tag,
          type = _user$stream2.type;

      return utils.tplEngine(tpl, {
        userId: userId,
        tag: tag,
        type: type
      });
    };
    var dispatchStreamEvent$$1 = function dispatchStreamEvent$$1(user, callback) {
      var id = user.id,
          uris = user.stream.uris;

      utils.forEach(uris, function (uri) {
        var tag = uri.tag,
            type = uri.mediaType;

        var key = getUId({ id: id, stream: { tag: tag, type: type } });
        callback(key, uri);
      });
    };
    /* 已在房间，再有新人发布资源触发此事件 */
    im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
      if (error) {
        throw error;
      }
      dispatchStreamEvent$$1(user, function (key, uri) {
        DataCache.set(key, uri);
      });
    });
    // im.on(DownEvent.STREAM_CHANGED, (error, user) => {
    //   if (error) {
    //     throw error;
    //   }
    //   dispatchStreamEvent(user, (key, uri) => {
    //     DataCache.set(key, uri);
    //   });
    // });
    im.on(CommonEvent.LEFT, function () {
      var streamIds = StreamCache.getKeys();
      utils.forEach(streamIds, function (streamId) {
        var stream = StreamCache.get(streamId);
        var tracks = stream.getTracks();
        utils.forEach(tracks, function (track) {
          track.stop();
        });
      });
      clear();
      if (pc) {
        pc.close();
      }
    });
    var unpublish = function unpublish(user) {
      user = utils.clone(user);
      var streamId = pc.getStreamId(user);
      var mediaStream = StreamCache.get(streamId);
      if (!mediaStream) {
        mediaStream = new MediaStream();
      }
      var streams = [];
      var _user = user,
          stream = _user.stream;

      var tinyStream = utils.clone(stream);
      var _user2 = user,
          id = _user2.id;

      stream = utils.extend(stream, {
        mediaStream: mediaStream
      });
      streams.push(stream);

      var tinyStreamId = pc.getStreamId({
        id: id,
        stream: tinyStream
      }, StreamSize.MIN);
      var tinyMeidaStream = StreamCache.get(tinyStreamId);
      if (tinyMeidaStream) {
        tinyStream = utils.extend(tinyStream, {
          mediaStream: tinyMeidaStream
        });
        streams.push(tinyStream);
      }
      utils.extend(user, {
        stream: streams
      });
      var roomId = im.getRoomId();
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'unpublish:start',
        roomId: roomId,
        user: user
      });
      utils.forEach(streams, function (_ref9) {
        var mediaStream = _ref9.mediaStream;

        var tracks = mediaStream.getTracks();
        utils.forEach(tracks, function (track) {
          track.stop();
        });
        var streamId = mediaStream.id;

        PublishStreamCache.remove(streamId);
      });
      return pc.removeStream(user).then(function (desc) {
        return getBody().then(function (body) {
          var url = utils.tplEngine(Path.UNPUBLISH, {
            roomId: roomId
          });
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unpublish:request',
            roomId: roomId,
            user: user,
            body: body
          });
          var headers = getHeaders();
          return request$2.post({
            path: url,
            body: body,
            headers: headers
          }).then(function (response) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'unpublish:response',
              roomId: roomId,
              user: user,
              response: response
            });
            StreamCache.remove(streamId);
            exchangeHandler(response, user, Message.UNPUBLISH, desc);
          }, function (error) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'unpublish:response',
              roomId: roomId,
              user: user,
              error: error
            });
          });
        });
      });
    };
    /* 加入房间成功后，主动获取已发布资源的人员列表，通知应用层 */
    im.on(CommonEvent.JOINED, function (error, room) {
      if (error) {
        throw error;
      }
      pc = new PeerConnection(option);
      im.emit(CommonEvent.PEERCONN_CREATED, pc);
      var getStreamUser = function getStreamUser(stream) {
        var id = stream.id,
            type = StreamType.NODE;
        var _pc$getStreamSymbolBy5 = pc.getStreamSymbolById(id),
            _pc$getStreamSymbolBy6 = slicedToArray(_pc$getStreamSymbolBy5, 2),
            userId = _pc$getStreamSymbolBy6[0],
            tag = _pc$getStreamSymbolBy6[1];

        var videoTracks = stream.getVideoTracks();
        var audioTrakcks = stream.getAudioTracks();
        var isEmtpyVideo = utils.isEmpty(videoTracks);
        var isEmptyAudio = utils.isEmpty(audioTrakcks);
        var tpl = '{id}_{type}';
        var videoTrackId = utils.tplEngine(tpl, {
          id: id,
          type: StreamType.VIDEO
        });
        var audioTrackId = utils.tplEngine(tpl, {
          id: id,
          type: StreamType.AUDIO
        });

        var videoTrack = DataCache.get(videoTrackId);
        var audioTrack = DataCache.get(audioTrackId);

        if (isEmtpyVideo) {
          type = StreamType.AUDIO;
        }
        if (isEmptyAudio) {
          type = StreamType.VIDEO;
        }
        var enableVideo = true;
        var enableAudio = true;

        if (!isEmptyAudio && !isEmtpyVideo) {
          type = StreamType.AUDIO_AND_VIDEO;
          if (utils.isEqual(videoTrack.state, StreamState.DISBALE)) {
            enableVideo = false;
          } else if (utils.isEqual(audioTrack.state, StreamState.DISBALE)) {
            enableAudio = false;
          }
        }
        Logger$1.log(LogTag.ROOM, {
          msg: 'join successfully',
          room: room
        });
        return {
          id: userId,
          stream: {
            tag: tag,
            type: type,
            mediaStream: stream,
            enable: {
              video: enableVideo,
              audio: enableAudio
            }
          }
        };
      };
      pc.on(PeerConnectionEvent.ADDED, function (error, stream) {
        if (error) {
          throw error;
        }
        var id = stream.id;

        StreamCache.set(id, stream);
        var user = getStreamUser(stream);
        im.emit(CommonEvent.PUBLISHED_STREAM, {
          mediaStream: stream,
          user: user
        });
        var uid = getSubPromiseUId(user);
        var promise = SubPromiseCache.get(uid);
        if (utils.isUndefined(promise)) {
          return Logger$1.log(LogTag.STREAM, {
            msg: 'stream added-part',
            user: user,
            tracks: stream.getTracks()
          });
        }
        Logger$1.log(LogTag.STREAM, {
          msg: 'stream added',
          user: user,
          tracks: stream.getTracks()
        });
        promise.resolve(user);
      });
      pc.on(PeerConnectionEvent.REMOVED, function (error, stream) {
        if (error) {
          throw error;
        }
        var id = stream.id;

        StreamCache.remove(id);
      });
      pc.on(PeerConnectionEvent.CHANGED, function () {
        if (error) {
          throw error;
        }
        if (pc.isNegotiate()) {
          network.detect(function (isOnline) {
            if (isOnline) {
              reconnect();
            } else {
              var Inner = ErrorType.Inner;

              im.emit(CommonEvent.ERROR, Inner.NETWORK_UNAVAILABLE);
            }
          });
        }
      });
      var users = room.users;

      var usersHandler = function usersHandler() {
        DataCache.set(DataCacheName.USERS, users);

        var _im$getUser3 = im.getUser(),
            currentUserId = _im$getUser3.id;

        utils.forEach(users, function (data, id) {
          var uris = data.uris;

          if (utils.isUndefined(uris)) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'user exist, uris is empty',
              user: {
                id: id
              }
            });
            return;
          }
          if (utils.isEqual(currentUserId, id)) {
            var _uris2 = slicedToArray(uris, 1),
                stream = _uris2[0];

            if (utils.isUndefined(stream)) {
              return;
            }
            var type = stream.mediaType,
                tag = stream.tag;

            type = utils.isEqual(uris.length, 1) ? type : StreamType.AUDIO_AND_VIDEO;
            return unpublish({
              id: id,
              stream: {
                tag: tag,
                type: type
              }
            });
          }
          utils.forEach(uris, function (uri) {
            var type = uri.mediaType,
                tag = uri.tag;

            var key = getUId({
              id: id,
              stream: {
                type: type,
                tag: tag
              }
            });
            DataCache.set(key, uri);
          });
          var streams = utils.uniq(uris, function (target) {
            var streamId = target.streamId,
                tag = target.tag;

            return {
              key: [streamId, tag].join('_'),
              value: {
                tag: tag
              }
            };
          });
          utils.forEach(streams, function (stream) {
            var tag = stream.tag;

            var msUris = utils.filter(uris, function (_ref10) {
              var msid = _ref10.msid;

              return utils.isInclude(msid, tag);
            });
            setTimeout(function () {
              im.emit(DownEvent.STREAM_PUBLISHED, {
                id: id,
                stream: {
                  tag: tag,
                  uris: msUris
                }
              });
            });
          });
        });
      };
      usersHandler();
    });
    var isCurrentUser = function isCurrentUser(user) {
      var _im$getUser4 = im.getUser(),
          id = _im$getUser4.id;

      return utils.isEqual(user.id, id);
    };
    var publish = function publish(user) {
      var streams = user.stream;

      if (!utils.isArray(streams)) {
        streams = [streams];
      }
      var id = user.id;

      utils.forEach(streams, function (stream) {
        var mediaStream = stream.mediaStream,
            size = stream.size;

        var streamId = pc.getStreamId({
          id: id,
          stream: stream
        }, size);
        StreamCache.set(streamId, mediaStream);
        PublishStreamCache.set(streamId, mediaStream);
        if (!utils.isUndefined(mediaStream)) {
          im.emit(CommonEvent.PUBLISHED_STREAM, {
            mediaStream: mediaStream,
            user: user
          });
        }
      });
      pc.addStream(user);
      var roomId = im.getRoomId();
      return utils.deferred(function (resolve, reject) {
        pc.createOffer(user).then(function (desc) {
          return getBody(desc).then(function (body) {
            var url = utils.tplEngine(Path.PUBLISH, {
              roomId: roomId
            });
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'publish:request',
              roomId: roomId,
              user: user,
              body: body
            });
            var headers = getHeaders();
            return request$2.post({
              path: url,
              body: body,
              headers: headers
            }).then(function (response) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'publish:response',
                roomId: roomId,
                user: user,
                response: response
              });
              exchangeHandler(response, user, Message.PUBLISH, desc);
              resolve();
            }, function (error) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'publish:response:error',
                roomId: roomId,
                user: user,
                error: error
              });
              reject(error);
            });
          });
        });
      });
    };

    var isTrackExist = function isTrackExist(user, types) {
      var userId = user.id,
          tag = user.stream.tag;

      var isError = false;
      utils.forEach(types, function (type) {
        var tUser = {
          id: userId,
          stream: {
            tag: tag,
            type: type
          }
        };
        var key = getUId(tUser);

        var _ref11 = DataCache.get(key) || {},
            uri = _ref11.uri;

        if (utils.isUndefined(uri)) {
          isError = true;
        }
      });
      return isError;
    };
    var subscribe = function subscribe(user) {
      var userId = user.id,
          _user$stream3 = user.stream,
          tag = _user$stream3.tag,
          type = _user$stream3.type;

      var subs = SubscribeCache.get(userId) || [];
      var types = [StreamType.VIDEO, StreamType.AUDIO];
      if (!utils.isEqual(type, StreamType.AUDIO_AND_VIDEO)) {
        types = [type];
      }
      if (isTrackExist(user, types)) {
        var Inner = ErrorType.Inner;

        return utils.Defer.reject(Inner.STREAM_TRACK_NOT_EXIST);
      }
      utils.forEach(types, function (type) {
        var tUser = {
          id: userId,
          stream: {
            tag: tag,
            type: type
          }
        };
        var key = getUId(tUser);

        var _DataCache$get = DataCache.get(key),
            uri = _DataCache$get.uri;

        var isAdd = true;
        utils.forEach(subs, function (sub) {
          var existType = sub.type,
              existTag = sub.tag;

          var isExist = utils.isEqual(type, existType) && utils.isEqual(tag, existTag);
          if (isExist) {
            isAdd = false;
          }
        });
        var msid = pc.getStreamId(user);
        if (isAdd && !utils.isUndefined(uri)) {
          subs.push({
            msid: msid,
            uri: uri,
            type: type,
            tag: tag
          });
        }
      });
      SubscribeCache.set(userId, subs);
      var roomId = im.getRoomId();
      return utils.deferred(function (resolve, reject) {
        var uid = getSubPromiseUId(user);
        SubPromiseCache.set(uid, {
          resolve: resolve,
          reject: reject,
          type: type
        });
        getBody().then(function (body) {
          var offer = body.sdp;

          var url = utils.tplEngine(Path.SUBSCRIBE, {
            roomId: roomId
          });
          var headers = getHeaders();
          var option = {
            path: url,
            body: body,
            headers: headers
          };
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'subscribe:request',
            roomId: roomId,
            option: option
          });
          request$2.post(option).then(function (response) {
            pc.setOffer(offer);
            var answer = response.sdp;

            pc.setAnwser(answer);
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'subscribe:response',
              roomId: roomId,
              user: user,
              response: response
            });
          }, function (error) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'subscribe:response:error',
              roomId: roomId,
              user: user,
              error: error
            });
            var uid = getSubPromiseUId(user);
            var promise = SubPromiseCache.get(uid);
            if (!utils.isUndefined(promise)) {
              promise.reject(error);
            }
          });
        });
      });
    };
    var unsubscribe = function unsubscribe(user) {
      SubscribeCache.remove(user);
      var roomId = im.getRoomId();
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'unsubscribe:start',
        roomId: roomId,
        user: user
      });
      return getBody().then(function (body) {
        var url = utils.tplEngine(Path.UNSUBSCRIBE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unsubscribe:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders();
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response',
            roomId: roomId,
            user: user,
            response: response
          });
          negotiate(response);
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      });
    };
    var resize = function resize(user) {
      var size = user.stream.size,
          id = user.id;

      var streams = SubscribeCache.get(id);
      if (utils.isUndefined(streams)) {
        return utils.Defer.reject(ErrorType.Inner.STREAM_NOT_EXIST);
      }
      var roomId = im.getRoomId();
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'resize:start',
        roomId: roomId,
        user: user
      });
      return getBody().then(function (body) {
        var streamId = pc.getStreamId(user);
        var stream = utils.filter(streams, function (stream) {
          var msid = stream.msid;

          return utils.isEqual(streamId, msid);
        })[0];
        if (!stream) {
          var error = ErrorType.Inner.STREAM_NOT_EXIST;
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            error: error
          });
          return utils.Defer.reject(error);
        }
        var uri = stream.uri;

        utils.forEach(body.subscribeList, function (stream) {
          if (utils.isEqual(stream.uri, uri)) {
            utils.extend(stream, {
              simulcast: size
            });
          }
        });
        var url = utils.tplEngine(Path.RESIZE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'resize:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders();
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            response: response
          });
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      });
    };
    var getUserMedia = function getUserMedia(constraints) {
      return navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        return { mediaStream: mediaStream };
      });
    };
    var getScreen = function getScreen(constraints) {
      var _constraints = constraints,
          desktopStreamId = _constraints.desktopStreamId;

      if (!desktopStreamId) {
        var Inner = ErrorType.Inner;

        return utils.Defer.reject(Inner.STREAM_DESKTOPID_ILLEGAL);
      }
      constraints = {
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: desktopStreamId
          }
        }
      };
      return getUserMedia(constraints);
    };
    var getMS = function getMS(constraints) {
      if (utils.isEmpty(constraints)) {
        constraints = {
          video: true,
          audio: true
        };
      }
      var _constraints2 = constraints,
          video = _constraints2.video;

      if (utils.isObject(video)) {
        video = utils.extend(DEFAULT_MS_PROFILE, video);
      }
      if (utils.isBoolean(video) && video) {
        video = DEFAULT_MS_PROFILE;
      }
      utils.extend(constraints, {
        video: video
      });
      return getUserMedia(constraints);
    };
    var get$$1 = function get$$1(constraints) {
      constraints = constraints || {};
      var _constraints3 = constraints,
          screen = _constraints3.screen;

      return screen ? getScreen(constraints) : getMS(constraints);
    };
    var trackHandler = function trackHandler(user, type, isEnable) {
      var streamId = pc.getStreamId(user);
      var stream = StreamCache.get(streamId);
      if (stream) {
        var isAudio = utils.isEqual(type, StreamType.AUDIO);
        type = isAudio ? 'Audio' : 'Video';
        var tpl = 'get{type}Tracks';
        type = utils.tplEngine(tpl, {
          type: type
        });
        var tracks = stream[type]();
        utils.forEach(tracks, function (track) {
          track.enabled = isEnable;
        });
      }
    };

    var getFitUris = function getFitUris(user, type, state) {
      var id = user.id;

      var uris = PubResourceCache.get(id) || [];
      var targetId = pc.getStreamId(user);
      uris = utils.filter(uris, function (stream) {
        var msid = stream.msid,
            mediaType = stream.mediaType;

        var isSameStream = utils.isEqual(targetId, msid),
            isSameType = utils.isEqual(mediaType, type);
        var isFit = isSameStream && isSameType;
        // state 默认为 StreamState.ENABLE，为 DISABLE 未发布资源
        if (isFit) {
          utils.extend(stream, {
            state: state
          });
        }
        return isFit;
      });
      return uris;
    };
    var saveModify = function saveModify(user, type, state) {
      var uris = getFitUris(user, type, state);
      // uris 为空表示没有发布资源，不需要修改
      if (!utils.isEmpty(uris)) {
        var id = user.id;

        var fullUris = PubResourceCache.get(id);
        var content = {
          uris: uris
        };
        var message = im.getMessage(Message.MODIFY, content);
        var isInner = true;
        User.set(User.SET_USERINFO, fullUris, isInner, message);
      }
      return utils.Defer.resolve();
    };
    var modifyTrack = function modifyTrack(user, type, state, isEnabled) {
      trackHandler(user, type, isEnabled);
      if (isCurrentUser(user)) {
        saveModify(user, type, state);
      }
      return utils.Defer.resolve();
    };
    var mute = function mute(user) {
      var isEnabled = false;
      return modifyTrack(user, StreamType.AUDIO, StreamState.DISBALE, isEnabled);
    };
    var unmute = function unmute(user) {
      var isEnabled = true;
      return modifyTrack(user, StreamType.AUDIO, StreamState.ENABLE, isEnabled);
    };
    var disable = function disable(user) {
      var isEnabled = false;
      return modifyTrack(user, StreamType.VIDEO, StreamState.DISBALE, isEnabled);
    };
    var enable = function enable(user) {
      var isEnabled = true;
      return modifyTrack(user, StreamType.VIDEO, StreamState.ENABLE, isEnabled);
    };
    var getUsersById = function getUsersById(user) {
      var id = user.id;

      var subs = SubscribeCache.get(id);
      var streams = {},
          msTypes = {};
      utils.forEach(subs, function (_ref12) {
        var msid = _ref12.msid,
            tag = _ref12.tag,
            type = _ref12.type;

        streams[msid] = tag;
        var types = msTypes[msid] || [];
        types.push(type);
        msTypes[msid] = types;
      });
      var users = [];
      utils.forEach(streams, function (tag, msid) {
        var types = msTypes[msid] || [];
        var type = msTypes[0];
        type = utils.isEqual(types.length, 2) ? StreamType.AUDIO_AND_VIDEO : type;
        users.push({
          id: id,
          stream: {
            tag: tag,
            type: type
          }
        });
      });
      return users;
    };
    im.on(DownEvent.ROOM_USER_LEFT, function (error, user) {
      if (error) {
        throw error;
      }
      var users = getUsersById(user);
      utils.forEach(users, function (user) {
        unsubscribe(user);
      });
    });
    im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
      if (error) {
        throw error;
      }
      dispatchStreamEvent$$1(user, function (key) {
        DataCache.remove(key);
      });
      unsubscribe(user);
    });
    eventEmitter.on(CommonEvent.CONSUME, function () {
      prosumer.consume(function (_ref13, next) {
        var event = _ref13.event,
            args = _ref13.args,
            resolve = _ref13.resolve,
            reject = _ref13.reject;

        switch (event) {
          case UpEvent.STREAM_PUBLISH:
            return publish.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNPUBLISH:
            return unpublish.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_SUBSCRIBE:
            return subscribe.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNSUBSCRIBE:
            return unsubscribe.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_RESIZE:
            return resize.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_GET:
            return get$$1.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_MUTE:
            return mute.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_UNMUTE:
            return unmute.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_DISABLE:
            return disable.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_ENABLE:
            return enable.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          default:
            Logger$1.warn(LogTag.STREAM_HANDLER, {
              event: event,
              msg: 'unkown event'
            });
        }
      });
    });
    var dispatch = function dispatch(event, args) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({ event: event, args: args, resolve: resolve, reject: reject });
        eventEmitter.emit(CommonEvent.CONSUME);
      });
    };
    return {
      dispatch: dispatch
    };
  }

  function RoomHandler(im) {
    var getHeaders = function getHeaders() {
      var roomId = im.getRoomId();
      var token = im.getRTCToken();

      var _im$getAppInfo = im.getAppInfo(),
          appKey = _im$getAppInfo.appKey;

      return {
        'App-Key': appKey,
        RoomId: roomId,
        Token: token
      };
    };
    var join = function join(room) {
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'join:before',
        room: room
      });
      if (im.isJoined()) {
        var Inner = ErrorType.Inner;

        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'join:after',
          extra: 'repeate join room'
        });
        return utils.Defer.reject(Inner.ROOM_REPEAT_JOIN);
      }
      return utils.deferred(function (resolve, reject) {
        im.joinRoom(room).then(function (users) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after',
            users: users
          });
          users = utils.toArray(users);
          users = utils.map(users, function (user) {
            return {
              id: user[0]
            };
          });
          resolve({
            users: users
          });
        }).catch(function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after:error',
            room: room,
            error: error
          });
          reject(error);
        });
      });
    };
    var leave = function leave() {
      var roomId = im.getRoomId();
      var user = im.getUser();
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'leave:before',
        roomId: roomId,
        user: user
      });
      return im.leaveRoom().then(function () {
        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'leave:after',
          roomId: roomId,
          user: user
        });
        var token = im.getRTCToken();
        var url = utils.tplEngine(Path.EXIT, {
          roomId: roomId
        });
        var headers = getHeaders();
        return request$2.post({
          path: url,
          headers: headers,
          body: {
            token: token
          }
        });
      }, function (error) {
        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'leave:after',
          roomId: roomId,
          error: error,
          user: user
        });
        return error;
      });
    };
    var get$$1 = function get$$1() {
      return im.getRoom();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.ROOM_JOIN:
          return join.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_LEAVE:
          return leave.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.ROOM_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function StorageHandler(im) {
    var isInner = false;
    var getType = function getType(type) {
      return utils.isEqual(type, StorageType.ROOM) ? 'Room' : 'User';
    };
    var getName = function getName(operate, type) {
      var tpl = '{operate}{type}Data';
      type = getType(type);
      return utils.tplEngine(tpl, {
        operate: operate,
        type: type
      });
    };
    var set$$1 = function set$$1(type, key, value, message) {
      var name = getName('set', type);
      return im[name](key, value, isInner, message);
    };
    var get$$1 = function get$$1(type, key) {
      var name = getName('get', type);
      return im[name](key, isInner);
    };
    var remove = function remove(type, key, message) {
      var name = getName('remove', type);
      return im[name](key, isInner, message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.STORAGE_SET:
          return set$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_REMOVE:
          return remove.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.STORAGE_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function MessageHandler(im) {
    var send = function send(message) {
      return im.sendMessage(message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.MESSAGE_SEND:
          return send.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.MESSAGE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function DeviceHandler() {
    var get$$1 = function get$$1() {
      return navigator.mediaDevices.enumerateDevices();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.DEVICE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.DEVICE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  /* 
      版本更新须知: 原版 adapter.js 不支持 es6 引入，将原始文件 factory 定义 Adapter 方法，通过模块引用初始化
  */
  function Adapter() {
  return function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
            }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
              var n = e[i][1][r];return o(n || r);
            }, p, p.exports, r, e, n, t);
          }return n[i].exports;
        }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
          o(t[i]);
        }return o;
      }return r;
    }()({ 1: [function (require, module, exports) {

        var _adapter_factory = require('./adapter_factory.js');

        var adapter = (0, _adapter_factory.adapterFactory)({ window: window });
        module.exports = adapter; // this is the difference from adapter_core.
      }, { "./adapter_factory.js": 2 }], 2: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.adapterFactory = adapterFactory;

        var _utils = require('./utils');

        var utils = _interopRequireWildcard(_utils);

        var _chrome_shim = require('./chrome/chrome_shim');

        var chromeShim = _interopRequireWildcard(_chrome_shim);

        var _edge_shim = require('./edge/edge_shim');

        var edgeShim = _interopRequireWildcard(_edge_shim);

        var _firefox_shim = require('./firefox/firefox_shim');

        var firefoxShim = _interopRequireWildcard(_firefox_shim);

        var _safari_shim = require('./safari/safari_shim');

        var safariShim = _interopRequireWildcard(_safari_shim);

        var _common_shim = require('./common_shim');

        var commonShim = _interopRequireWildcard(_common_shim);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        // Shimming starts here.
        /*
         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
         *
         *  Use of this source code is governed by a BSD-style license
         *  that can be found in the LICENSE file in the root of the source
         *  tree.
         */
        function adapterFactory() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              window = _ref.window;

          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            shimChrome: true,
            shimFirefox: true,
            shimEdge: true,
            shimSafari: true
          };

          // Utils.
          var logging = utils.log;
          var browserDetails = utils.detectBrowser(window);

          var adapter = {
            browserDetails: browserDetails,
            commonShim: commonShim,
            extractVersion: utils.extractVersion,
            disableLog: utils.disableLog,
            disableWarnings: utils.disableWarnings
          };

          // Shim browser if found.
          switch (browserDetails.browser) {
            case 'chrome':
              if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                logging('Chrome shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming chrome.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = chromeShim;

              chromeShim.shimGetUserMedia(window);
              chromeShim.shimMediaStream(window);
              chromeShim.shimPeerConnection(window);
              chromeShim.shimOnTrack(window);
              chromeShim.shimAddTrackRemoveTrack(window);
              chromeShim.shimGetSendersWithDtmf(window);
              chromeShim.shimSenderReceiverGetStats(window);
              chromeShim.fixNegotiationNeeded(window);

              commonShim.shimRTCIceCandidate(window);
              commonShim.shimConnectionState(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            case 'firefox':
              if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                logging('Firefox shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming firefox.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = firefoxShim;

              firefoxShim.shimGetUserMedia(window);
              firefoxShim.shimPeerConnection(window);
              firefoxShim.shimOnTrack(window);
              firefoxShim.shimRemoveStream(window);
              firefoxShim.shimSenderGetStats(window);
              firefoxShim.shimReceiverGetStats(window);
              firefoxShim.shimRTCDataChannel(window);

              commonShim.shimRTCIceCandidate(window);
              commonShim.shimConnectionState(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            case 'edge':
              if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                logging('MS edge shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming edge.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = edgeShim;

              edgeShim.shimGetUserMedia(window);
              edgeShim.shimGetDisplayMedia(window);
              edgeShim.shimPeerConnection(window);
              edgeShim.shimReplaceTrack(window);

              // the edge shim implements the full RTCIceCandidate object.

              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            case 'safari':
              if (!safariShim || !options.shimSafari) {
                logging('Safari shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming safari.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = safariShim;

              safariShim.shimRTCIceServerUrls(window);
              safariShim.shimCreateOfferLegacy(window);
              safariShim.shimCallbacksAPI(window);
              safariShim.shimLocalStreamsAPI(window);
              safariShim.shimRemoteStreamsAPI(window);
              safariShim.shimTrackEventTransceiver(window);
              safariShim.shimGetUserMedia(window);

              commonShim.shimRTCIceCandidate(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            default:
              logging('Unsupported browser!');
              break;
          }

          return adapter;
        }

        // Browser shims.
      }, { "./chrome/chrome_shim": 3, "./common_shim": 6, "./edge/edge_shim": 7, "./firefox/firefox_shim": 11, "./safari/safari_shim": 14, "./utils": 15 }], 3: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimMediaStream = shimMediaStream;
        exports.shimOnTrack = shimOnTrack;
        exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
        exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
        exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
        exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
        exports.shimPeerConnection = shimPeerConnection;
        exports.fixNegotiationNeeded = fixNegotiationNeeded;

        var _utils = require('../utils.js');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        /* iterates the stats graph recursively. */
        function walkStats(stats, base, resultSet) {
          if (!base || resultSet.has(base.id)) {
            return;
          }
          resultSet.set(base.id, base);
          Object.keys(base).forEach(function (name) {
            if (name.endsWith('Id')) {
              walkStats(stats, stats.get(base[name]), resultSet);
            } else if (name.endsWith('Ids')) {
              base[name].forEach(function (id) {
                walkStats(stats, stats.get(id), resultSet);
              });
            }
          });
        }

        /* filter getStats for a sender/receiver track. */
        function filterStats(result, track, outbound) {
          var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
          var filteredResult = new Map();
          if (track === null) {
            return filteredResult;
          }
          var trackStats = [];
          result.forEach(function (value) {
            if (value.type === 'track' && value.trackIdentifier === track.id) {
              trackStats.push(value);
            }
          });
          trackStats.forEach(function (trackStat) {
            result.forEach(function (stats) {
              if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                walkStats(result, stats, filteredResult);
              }
            });
          });
          return filteredResult;
        }

        function shimMediaStream(window) {
          window.MediaStream = window.MediaStream || window.webkitMediaStream;
        }

        function shimOnTrack(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get$$1() {
                return this._ontrack;
              },
              set: function set$$1(f) {
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                }
                this.addEventListener('track', this._ontrack = f);
              },

              enumerable: true,
              configurable: true
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var _this = this;

              if (!this._ontrackpoly) {
                this._ontrackpoly = function (e) {
                  // onaddstream does not fire when a track is added to an existing
                  // stream. But stream.onaddtrack is implemented so we use that.
                  e.stream.addEventListener('addtrack', function (te) {
                    var receiver = void 0;
                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = _this.getReceivers().find(function (r) {
                        return r.track && r.track.id === te.track.id;
                      });
                    } else {
                      receiver = { track: te.track };
                    }

                    var event = new Event('track');
                    event.track = te.track;
                    event.receiver = receiver;
                    event.transceiver = { receiver: receiver };
                    event.streams = [e.stream];
                    _this.dispatchEvent(event);
                  });
                  e.stream.getTracks().forEach(function (track) {
                    var receiver = void 0;
                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = _this.getReceivers().find(function (r) {
                        return r.track && r.track.id === track.id;
                      });
                    } else {
                      receiver = { track: track };
                    }
                    var event = new Event('track');
                    event.track = track;
                    event.receiver = receiver;
                    event.transceiver = { receiver: receiver };
                    event.streams = [e.stream];
                    _this.dispatchEvent(event);
                  });
                };
                this.addEventListener('addstream', this._ontrackpoly);
              }
              return origSetRemoteDescription.apply(this, arguments);
            };
          } else {
            // even if RTCRtpTransceiver is in window, it is only used and
            // emitted in unified-plan. Unfortunately this means we need
            // to unconditionally wrap the event.
            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              if (!e.transceiver) {
                Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } });
              }
              return e;
            });
          }
        }

        function shimGetSendersWithDtmf(window) {
          // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
            var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
              return {
                track: track,
                get dtmf() {
                  if (this._dtmf === undefined) {
                    if (track.kind === 'audio') {
                      this._dtmf = pc.createDTMFSender(track);
                    } else {
                      this._dtmf = null;
                    }
                  }
                  return this._dtmf;
                },
                _pc: pc
              };
            };

            // augment addTrack when getSenders is not available.
            if (!window.RTCPeerConnection.prototype.getSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
              };
              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
              window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
                var sender = origAddTrack.apply(this, arguments);
                if (!sender) {
                  sender = shimSenderWithDtmf(this, track);
                  this._senders.push(sender);
                }
                return sender;
              };

              var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
              window.RTCPeerConnection.prototype.removeTrack = function (sender) {
                origRemoveTrack.apply(this, arguments);
                var idx = this._senders.indexOf(sender);
                if (idx !== -1) {
                  this._senders.splice(idx, 1);
                }
              };
            }
            var origAddStream = window.RTCPeerConnection.prototype.addStream;
            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var _this2 = this;

              this._senders = this._senders || [];
              origAddStream.apply(this, [stream]);
              stream.getTracks().forEach(function (track) {
                _this2._senders.push(shimSenderWithDtmf(_this2, track));
              });
            };

            var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var _this3 = this;

              this._senders = this._senders || [];
              origRemoveStream.apply(this, [stream]);

              stream.getTracks().forEach(function (track) {
                var sender = _this3._senders.find(function (s) {
                  return s.track === track;
                });
                if (sender) {
                  // remove sender
                  _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                }
              });
            };
          } else if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
            window.RTCPeerConnection.prototype.getSenders = function () {
              var _this4 = this;

              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this4;
              });
              return senders;
            };

            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get$$1() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = this._pc.createDTMFSender(this.track);
                  } else {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              }
            });
          }
        }

        function shimSenderReceiverGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
            return;
          }

          // shim sender stats.
          if (!('getStats' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
            if (origGetSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                var _this5 = this;

                var senders = origGetSenders.apply(this, []);
                senders.forEach(function (sender) {
                  return sender._pc = _this5;
                });
                return senders;
              };
            }

            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            if (origAddTrack) {
              window.RTCPeerConnection.prototype.addTrack = function () {
                var sender = origAddTrack.apply(this, arguments);
                sender._pc = this;
                return sender;
              };
            }
            window.RTCRtpSender.prototype.getStats = function () {
              var sender = this;
              return this._pc.getStats().then(function (result) {
                return (
                  /* Note: this will include stats of all senders that
                   *   send a track with the same id as sender.track as
                   *   it is not possible to identify the RTCRtpSender.
                   */
                  filterStats(result, sender.track, true)
                );
              });
            };
          }

          // shim receiver stats.
          if (!('getStats' in window.RTCRtpReceiver.prototype)) {
            var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
            if (origGetReceivers) {
              window.RTCPeerConnection.prototype.getReceivers = function () {
                var _this6 = this;

                var receivers = origGetReceivers.apply(this, []);
                receivers.forEach(function (receiver) {
                  return receiver._pc = _this6;
                });
                return receivers;
              };
            }
            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              e.receiver._pc = e.srcElement;
              return e;
            });
            window.RTCRtpReceiver.prototype.getStats = function () {
              var receiver = this;
              return this._pc.getStats().then(function (result) {
                return filterStats(result, receiver.track, false);
              });
            };
          }

          if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
            return;
          }

          // shim RTCPeerConnection.getStats(track).
          var origGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function () {
            if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
              var track = arguments[0];
              var sender = void 0;
              var receiver = void 0;
              var err = void 0;
              this.getSenders().forEach(function (s) {
                if (s.track === track) {
                  if (sender) {
                    err = true;
                  } else {
                    sender = s;
                  }
                }
              });
              this.getReceivers().forEach(function (r) {
                if (r.track === track) {
                  if (receiver) {
                    err = true;
                  } else {
                    receiver = r;
                  }
                }
                return r.track === track;
              });
              if (err || sender && receiver) {
                return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
              } else if (sender) {
                return sender.getStats();
              } else if (receiver) {
                return receiver.getStats();
              }
              return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
            }
            return origGetStats.apply(this, arguments);
          };
        }

        function shimAddTrackRemoveTrackWithNative(window) {
          // shim addTrack/removeTrack with native variants in order to make
          // the interactions with legacy getLocalStreams behave as in other browsers.
          // Keeps a mapping stream.id => [stream, rtpsenders...]
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var _this7 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
              return _this7._shimmedLocalStreams[streamId][0];
            });
          };

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            if (!stream) {
              return origAddTrack.apply(this, arguments);
            }
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            var sender = origAddTrack.apply(this, arguments);
            if (!this._shimmedLocalStreams[stream.id]) {
              this._shimmedLocalStreams[stream.id] = [stream, sender];
            } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
              this._shimmedLocalStreams[stream.id].push(sender);
            }
            return sender;
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var _this8 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            stream.getTracks().forEach(function (track) {
              var alreadyExists = _this8.getSenders().find(function (s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            var existingSenders = this.getSenders();
            origAddStream.apply(this, arguments);
            var newSenders = this.getSenders().filter(function (newSender) {
              return existingSenders.indexOf(newSender) === -1;
            });
            this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            delete this._shimmedLocalStreams[stream.id];
            return origRemoveStream.apply(this, arguments);
          };

          var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var _this9 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            if (sender) {
              Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
                var idx = _this9._shimmedLocalStreams[streamId].indexOf(sender);
                if (idx !== -1) {
                  _this9._shimmedLocalStreams[streamId].splice(idx, 1);
                }
                if (_this9._shimmedLocalStreams[streamId].length === 1) {
                  delete _this9._shimmedLocalStreams[streamId];
                }
              });
            }
            return origRemoveTrack.apply(this, arguments);
          };
        }

        function shimAddTrackRemoveTrack(window) {
          if (!window.RTCPeerConnection) {
            return;
          }
          var browserDetails = utils.detectBrowser(window);
          // shim addTrack and removeTrack.
          if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
            return this.shimAddTrackRemoveTrackWithNative(window);
          }

          // also shim pc.getLocalStreams when addTrack is shimmed
          // to return the original streams.
          var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var _this10 = this;

            var nativeStreams = origGetLocalStreams.apply(this);
            this._reverseStreams = this._reverseStreams || {};
            return nativeStreams.map(function (stream) {
              return _this10._reverseStreams[stream.id];
            });
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var _this11 = this;

            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};

            stream.getTracks().forEach(function (track) {
              var alreadyExists = _this11.getSenders().find(function (s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            // Add identity mapping for consistency with addTrack.
            // Unless this is being used with a stream from addTrack.
            if (!this._reverseStreams[stream.id]) {
              var newStream = new window.MediaStream(stream.getTracks());
              this._streams[stream.id] = newStream;
              this._reverseStreams[newStream.id] = stream;
              stream = newStream;
            }
            origAddStream.apply(this, [stream]);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};

            origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
            delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
            delete this._streams[stream.id];
          };

          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            var _this12 = this;

            if (this.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }
            var streams = [].slice.call(arguments, 1);
            if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
              return t === track;
            })) {
              // this is not fully correct but all we can manage without
              // [[associated MediaStreams]] internal slot.
              throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
            }

            var alreadyExists = this.getSenders().find(function (s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.', 'InvalidAccessError');
            }

            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};
            var oldStream = this._streams[stream.id];
            if (oldStream) {
              // this is using odd Chrome behaviour, use with caution:
              // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
              // Note: we rely on the high-level addTrack/dtmf shim to
              // create the sender with a dtmf sender.
              oldStream.addTrack(track);

              // Trigger ONN async.
              Promise.resolve().then(function () {
                _this12.dispatchEvent(new Event('negotiationneeded'));
              });
            } else {
              var newStream = new window.MediaStream([track]);
              this._streams[stream.id] = newStream;
              this._reverseStreams[newStream.id] = stream;
              this.addStream(newStream);
            }
            return this.getSenders().find(function (s) {
              return s.track === track;
            });
          };

          // replace the internal stream id with the external one and
          // vice versa.
          function replaceInternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }
          function replaceExternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }
          ['createOffer', 'createAnswer'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              var _this13 = this;

              var args = arguments;
              var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
              if (isLegacyCall) {
                return nativeMethod.apply(this, [function (description) {
                  var desc = replaceInternalStreamId(_this13, description);
                  args[0].apply(null, [desc]);
                }, function (err) {
                  if (args[1]) {
                    args[1].apply(null, err);
                  }
                }, arguments[2]]);
              }
              return nativeMethod.apply(this, arguments).then(function (description) {
                return replaceInternalStreamId(_this13, description);
              });
            };
          });

          var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
          window.RTCPeerConnection.prototype.setLocalDescription = function () {
            if (!arguments.length || !arguments[0].type) {
              return origSetLocalDescription.apply(this, arguments);
            }
            arguments[0] = replaceExternalStreamId(this, arguments[0]);
            return origSetLocalDescription.apply(this, arguments);
          };

          // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

          var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
          Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
            get: function get$$1() {
              var description = origLocalDescription.get.apply(this);
              if (description.type === '') {
                return description;
              }
              return replaceInternalStreamId(this, description);
            }
          });

          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var _this14 = this;

            if (this.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }
            // We can not yet check for sender instanceof RTCRtpSender
            // since we shim RTPSender. So we check if sender._pc is set.
            if (!sender._pc) {
              throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
            }
            var isLocal = sender._pc === this;
            if (!isLocal) {
              throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
            }

            // Search for the native stream the senders track belongs to.
            this._streams = this._streams || {};
            var stream = void 0;
            Object.keys(this._streams).forEach(function (streamid) {
              var hasTrack = _this14._streams[streamid].getTracks().find(function (track) {
                return sender.track === track;
              });
              if (hasTrack) {
                stream = _this14._streams[streamid];
              }
            });

            if (stream) {
              if (stream.getTracks().length === 1) {
                // if this is the last track of the stream, remove the stream. This
                // takes care of any shimmed _senders.
                this.removeStream(this._reverseStreams[stream.id]);
              } else {
                // relying on the same odd chrome behaviour as above.
                stream.removeTrack(sender.track);
              }
              this.dispatchEvent(new Event('negotiationneeded'));
            }
          };
        }

        function shimPeerConnection(window) {
          if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.webkitRTCPeerConnection;
          }
          if (!window.RTCPeerConnection) {
            return;
          }

          var origGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
            var _this15 = this;

            var args = arguments;

            // If selector is a function then we are in the old style stats so just
            // pass back the original getStats format to avoid breaking old users.
            if (arguments.length > 0 && typeof selector === 'function') {
              return origGetStats.apply(this, arguments);
            }

            // When spec-style getStats is supported, return those when called with
            // either no arguments or the selector argument is null.
            if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
              return origGetStats.apply(this, []);
            }

            var fixChromeStats_ = function fixChromeStats_(response) {
              var standardReport = {};
              var reports = response.result();
              reports.forEach(function (report) {
                var standardStats = {
                  id: report.id,
                  timestamp: report.timestamp,
                  type: {
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                  }[report.type] || report.type
                };
                report.names().forEach(function (name) {
                  standardStats[name] = report.stat(name);
                });
                standardReport[standardStats.id] = standardStats;
              });

              return standardReport;
            };

            // shim getStats with maplike support
            var makeMapStats = function makeMapStats(stats) {
              return new Map(Object.keys(stats).map(function (key) {
                return [key, stats[key]];
              }));
            };

            if (arguments.length >= 2) {
              var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                args[1](makeMapStats(fixChromeStats_(response)));
              };

              return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
            }

            // promise-support
            return new Promise(function (resolve, reject) {
              origGetStats.apply(_this15, [function (response) {
                resolve(makeMapStats(fixChromeStats_(response)));
              }, reject]);
            }).then(successCallback, errorCallback);
          };

          // shim implicit creation of RTCSessionDescription/RTCIceCandidate
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });

          // support for addIceCandidate(null or undefined)
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };
        }

        function fixNegotiationNeeded(window) {
          utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
            var pc = e.target;
            if (pc.signalingState !== 'stable') {
              return;
            }
            return e;
          });
        }
      }, { "../utils.js": 15, "./getdisplaymedia": 4, "./getusermedia": 5 }], 4: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;
        function shimGetDisplayMedia(window, getSourceId) {
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }
          if (!window.navigator.mediaDevices) {
            return;
          }
          // getSourceId is a function that returns a promise resolving with
          // the sourceId of the screen/window/tab to be shared.
          if (typeof getSourceId !== 'function') {
            console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
            return;
          }
          window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
            return getSourceId(constraints).then(function (sourceId) {
              var widthSpecified = constraints.video && constraints.video.width;
              var heightSpecified = constraints.video && constraints.video.height;
              var frameRateSpecified = constraints.video && constraints.video.frameRate;
              constraints.video = {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sourceId,
                  maxFrameRate: frameRateSpecified || 3
                }
              };
              if (widthSpecified) {
                constraints.video.mandatory.maxWidth = widthSpecified;
              }
              if (heightSpecified) {
                constraints.video.mandatory.maxHeight = heightSpecified;
              }
              return window.navigator.mediaDevices.getUserMedia(constraints);
            });
          };
        }
      }, {}], 5: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimGetUserMedia = shimGetUserMedia;

        var _utils = require('../utils.js');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        var logging = utils.log;

        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (!navigator.mediaDevices) {
            return;
          }

          var browserDetails = utils.detectBrowser(window);

          var constraintsToChrome_ = function constraintsToChrome_(c) {
            if ((typeof c === 'undefined' ? 'undefined' : _typeof$$1(c)) !== 'object' || c.mandatory || c.optional) {
              return c;
            }
            var cc = {};
            Object.keys(c).forEach(function (key) {
              if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                return;
              }
              var r = _typeof$$1(c[key]) === 'object' ? c[key] : { ideal: c[key] };
              if (r.exact !== undefined && typeof r.exact === 'number') {
                r.min = r.max = r.exact;
              }
              var oldname_ = function oldname_(prefix, name) {
                if (prefix) {
                  return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                }
                return name === 'deviceId' ? 'sourceId' : name;
              };
              if (r.ideal !== undefined) {
                cc.optional = cc.optional || [];
                var oc = {};
                if (typeof r.ideal === 'number') {
                  oc[oldname_('min', key)] = r.ideal;
                  cc.optional.push(oc);
                  oc = {};
                  oc[oldname_('max', key)] = r.ideal;
                  cc.optional.push(oc);
                } else {
                  oc[oldname_('', key)] = r.ideal;
                  cc.optional.push(oc);
                }
              }
              if (r.exact !== undefined && typeof r.exact !== 'number') {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_('', key)] = r.exact;
              } else {
                ['min', 'max'].forEach(function (mix) {
                  if (r[mix] !== undefined) {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_(mix, key)] = r[mix];
                  }
                });
              }
            });
            if (c.advanced) {
              cc.optional = (cc.optional || []).concat(c.advanced);
            }
            return cc;
          };

          var shimConstraints_ = function shimConstraints_(constraints, func) {
            if (browserDetails.version >= 61) {
              return func(constraints);
            }
            constraints = JSON.parse(JSON.stringify(constraints));
            if (constraints && _typeof$$1(constraints.audio) === 'object') {
              var remap = function remap(obj, a, b) {
                if (a in obj && !(b in obj)) {
                  obj[b] = obj[a];
                  delete obj[a];
                }
              };
              constraints = JSON.parse(JSON.stringify(constraints));
              remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
              remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
              constraints.audio = constraintsToChrome_(constraints.audio);
            }
            if (constraints && _typeof$$1(constraints.video) === 'object') {
              // Shim facingMode for mobile & surface pro.
              var face = constraints.video.facingMode;
              face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof$$1(face)) === 'object' ? face : { ideal: face });
              var getSupportedFacingModeLies = browserDetails.version < 66;

              if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                delete constraints.video.facingMode;
                var matches = void 0;
                if (face.exact === 'environment' || face.ideal === 'environment') {
                  matches = ['back', 'rear'];
                } else if (face.exact === 'user' || face.ideal === 'user') {
                  matches = ['front'];
                }
                if (matches) {
                  // Look for matches in label, or use last cam for back (typical).
                  return navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    devices = devices.filter(function (d) {
                      return d.kind === 'videoinput';
                    });
                    var dev = devices.find(function (d) {
                      return matches.some(function (match) {
                        return d.label.toLowerCase().includes(match);
                      });
                    });
                    if (!dev && devices.length && matches.includes('back')) {
                      dev = devices[devices.length - 1]; // more likely the back cam
                    }
                    if (dev) {
                      constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
                    }
                    constraints.video = constraintsToChrome_(constraints.video);
                    logging('chrome: ' + JSON.stringify(constraints));
                    return func(constraints);
                  });
                }
              }
              constraints.video = constraintsToChrome_(constraints.video);
            }
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          };

          var shimError_ = function shimError_(e) {
            if (browserDetails.version >= 64) {
              return e;
            }
            return {
              name: {
                PermissionDeniedError: 'NotAllowedError',
                PermissionDismissedError: 'NotAllowedError',
                InvalidStateError: 'NotAllowedError',
                DevicesNotFoundError: 'NotFoundError',
                ConstraintNotSatisfiedError: 'OverconstrainedError',
                TrackStartError: 'NotReadableError',
                MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                MediaDeviceKillSwitchOn: 'NotAllowedError',
                TabCaptureError: 'AbortError',
                ScreenCaptureError: 'AbortError',
                DeviceCaptureError: 'AbortError'
              }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint || e.constraintName,
              toString: function toString() {
                return this.name + (this.message && ': ') + this.message;
              }
            };
          };

          var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
            shimConstraints_(constraints, function (c) {
              navigator.webkitGetUserMedia(c, onSuccess, function (e) {
                if (onError) {
                  onError(shimError_(e));
                }
              });
            });
          };
          navigator.getUserMedia = getUserMedia_.bind(navigator);

          // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
          // function which returns a Promise, it does not accept spec-style
          // constraints.
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (cs) {
            return shimConstraints_(cs, function (c) {
              return origGetUserMedia(c).then(function (stream) {
                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  throw new DOMException('', 'NotFoundError');
                }
                return stream;
              }, function (e) {
                return Promise.reject(shimError_(e));
              });
            });
          };
        }
      }, { "../utils.js": 15 }], 6: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimRTCIceCandidate = shimRTCIceCandidate;
        exports.shimMaxMessageSize = shimMaxMessageSize;
        exports.shimSendThrowTypeError = shimSendThrowTypeError;
        exports.shimConnectionState = shimConnectionState;

        var _sdp = require('sdp');

        var _sdp2 = _interopRequireDefault(_sdp);

        var _utils = require('./utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function shimRTCIceCandidate(window) {
          // foundation is arbitrarily chosen as an indicator for full support for
          // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
          if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
            return;
          }

          var NativeRTCIceCandidate = window.RTCIceCandidate;
          window.RTCIceCandidate = function (args) {
            // Remove the a= which shouldn't be part of the candidate string.
            if ((typeof args === 'undefined' ? 'undefined' : _typeof$$1(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
              args = JSON.parse(JSON.stringify(args));
              args.candidate = args.candidate.substr(2);
            }

            if (args.candidate && args.candidate.length) {
              // Augment the native candidate with the parsed fields.
              var nativeCandidate = new NativeRTCIceCandidate(args);
              var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
              var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

              // Add a serializer that does not serialize the extra attributes.
              augmentedCandidate.toJSON = function () {
                return {
                  candidate: augmentedCandidate.candidate,
                  sdpMid: augmentedCandidate.sdpMid,
                  sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                  usernameFragment: augmentedCandidate.usernameFragment
                };
              };
              return augmentedCandidate;
            }
            return new NativeRTCIceCandidate(args);
          };
          window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

          // Hook up the augmented candidate in onicecandidate and
          // addEventListener('icecandidate', ...)
          utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
            if (e.candidate) {
              Object.defineProperty(e, 'candidate', {
                value: new window.RTCIceCandidate(e.candidate),
                writable: 'false'
              });
            }
            return e;
          });
        }

        function shimMaxMessageSize(window) {
          if (window.RTCSctpTransport || !window.RTCPeerConnection) {
            return;
          }
          var browserDetails = utils.detectBrowser(window);

          if (!('sctp' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
              get: function get$$1() {
                return typeof this._sctp === 'undefined' ? null : this._sctp;
              }
            });
          }

          var sctpInDescription = function sctpInDescription(description) {
            var sections = _sdp2.default.splitSections(description.sdp);
            sections.shift();
            return sections.some(function (mediaSection) {
              var mLine = _sdp2.default.parseMLine(mediaSection);
              return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
            });
          };

          var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
            // TODO: Is there a better solution for detecting Firefox?
            var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
            if (match === null || match.length < 2) {
              return -1;
            }
            var version = parseInt(match[1], 10);
            // Test for NaN (yes, this is ugly)
            return version !== version ? -1 : version;
          };

          var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
            // Every implementation we know can send at least 64 KiB.
            // Note: Although Chrome is technically able to send up to 256 KiB, the
            //       data does not reach the other peer reliably.
            //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
            var canSendMaxMessageSize = 65536;
            if (browserDetails.browser === 'firefox') {
              if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) {
                  // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                  // fragmentation.
                  canSendMaxMessageSize = 16384;
                } else {
                  // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                  // messages. Thus, supporting ~2 GiB when sending.
                  canSendMaxMessageSize = 2147483637;
                }
              } else if (browserDetails.version < 60) {
                // Currently, all FF >= 57 will reset the remote maximum message size
                // to the default value when a data channel is created at a later
                // stage. :(
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
              } else {
                // FF >= 60 supports sending ~2 GiB
                canSendMaxMessageSize = 2147483637;
              }
            }
            return canSendMaxMessageSize;
          };

          var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
            // Note: 65536 bytes is the default value from the SDP spec. Also,
            //       every implementation we know supports receiving 65536 bytes.
            var maxMessageSize = 65536;

            // FF 57 has a slightly incorrect default remote max message size, so
            // we need to adjust it here to avoid a failure when sending.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
            if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
              maxMessageSize = 65535;
            }

            var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');
            if (match.length > 0) {
              maxMessageSize = parseInt(match[0].substr(19), 10);
            } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
              // If the maximum message size is not present in the remote SDP and
              // both local and remote are Firefox, the remote peer can receive
              // ~2 GiB.
              maxMessageSize = 2147483637;
            }
            return maxMessageSize;
          };

          var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
          window.RTCPeerConnection.prototype.setRemoteDescription = function () {
            this._sctp = null;

            if (sctpInDescription(arguments[0])) {
              // Check if the remote is FF.
              var isFirefox = getRemoteFirefoxVersion(arguments[0]);

              // Get the maximum message size the local peer is capable of sending
              var canSendMMS = getCanSendMaxMessageSize(isFirefox);

              // Get the maximum message size of the remote peer.
              var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

              // Determine final maximum message size
              var maxMessageSize = void 0;
              if (canSendMMS === 0 && remoteMMS === 0) {
                maxMessageSize = Number.POSITIVE_INFINITY;
              } else if (canSendMMS === 0 || remoteMMS === 0) {
                maxMessageSize = Math.max(canSendMMS, remoteMMS);
              } else {
                maxMessageSize = Math.min(canSendMMS, remoteMMS);
              }

              // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
              // attribute.
              var sctp = {};
              Object.defineProperty(sctp, 'maxMessageSize', {
                get: function get$$1() {
                  return maxMessageSize;
                }
              });
              this._sctp = sctp;
            }

            return origSetRemoteDescription.apply(this, arguments);
          };
        }

        function shimSendThrowTypeError(window) {
          if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
            return;
          }

          // Note: Although Firefox >= 57 has a native implementation, the maximum
          //       message size can be reset for all data channels at a later stage.
          //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

          function wrapDcSend(dc, pc) {
            var origDataChannelSend = dc.send;
            dc.send = function () {
              var data = arguments[0];
              var length = data.length || data.size || data.byteLength;
              if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
                throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
              }
              return origDataChannelSend.apply(dc, arguments);
            };
          }
          var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
          window.RTCPeerConnection.prototype.createDataChannel = function () {
            var dataChannel = origCreateDataChannel.apply(this, arguments);
            wrapDcSend(dataChannel, this);
            return dataChannel;
          };
          utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
            wrapDcSend(e.channel, e.target);
            return e;
          });
        }

        /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
         * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
         * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
         * since DTLS failures would be hidden. See
         * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
         * for the Firefox tracking bug.
         */
        function shimConnectionState(window) {
          if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
            return;
          }
          var proto = window.RTCPeerConnection.prototype;
          Object.defineProperty(proto, 'connectionState', {
            get: function get$$1() {
              return {
                completed: 'connected',
                checking: 'connecting'
              }[this.iceConnectionState] || this.iceConnectionState;
            },

            enumerable: true,
            configurable: true
          });
          Object.defineProperty(proto, 'onconnectionstatechange', {
            get: function get$$1() {
              return this._onconnectionstatechange || null;
            },
            set: function set$$1(cb) {
              if (this._onconnectionstatechange) {
                this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
                delete this._onconnectionstatechange;
              }
              if (cb) {
                this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
              }
            },

            enumerable: true,
            configurable: true
          });

          ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
            var origMethod = proto[method];
            proto[method] = function () {
              if (!this._connectionstatechangepoly) {
                this._connectionstatechangepoly = function (e) {
                  var pc = e.target;
                  if (pc._lastConnectionState !== pc.connectionState) {
                    pc._lastConnectionState = pc.connectionState;
                    var newEvent = new Event('connectionstatechange', e);
                    pc.dispatchEvent(newEvent);
                  }
                  return e;
                };
                this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
              }
              return origMethod.apply(this, arguments);
            };
          });
        }
      }, { "./utils": 15, "sdp": 17 }], 7: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimPeerConnection = shimPeerConnection;
        exports.shimReplaceTrack = shimReplaceTrack;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        var _filtericeservers = require('./filtericeservers');

        var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');

        var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if (window.RTCIceGatherer) {
            if (!window.RTCIceCandidate) {
              window.RTCIceCandidate = function (args) {
                return args;
              };
            }
            if (!window.RTCSessionDescription) {
              window.RTCSessionDescription = function (args) {
                return args;
              };
            }
            // this adds an additional event listener to MediaStrackTrack that signals
            // when a tracks enabled property was changed. Workaround for a bug in
            // addStream, see below. No longer required in 15025+
            if (browserDetails.version < 15025) {
              var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
              Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                set: function set$$1(value) {
                  origMSTEnabled.set.call(this, value);
                  var ev = new Event('enabled');
                  ev.enabled = value;
                  this.dispatchEvent(ev);
                }
              });
            }
          }

          // ORTC defines the DTMF sender a bit different.
          // https://github.com/w3c/ortc/issues/714
          if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get$$1() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = new window.RTCDtmfSender(this);
                  } else if (this.track.kind === 'video') {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              }
            });
          }
          // Edge currently only implements the RTCDtmfSender, not the
          // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
          if (window.RTCDtmfSender && !window.RTCDTMFSender) {
            window.RTCDTMFSender = window.RTCDtmfSender;
          }

          var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
          window.RTCPeerConnection = function (config) {
            if (config && config.iceServers) {
              config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
              utils.log('ICE servers after filtering:', config.iceServers);
            }
            return new RTCPeerConnectionShim(config);
          };
          window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
        }

        function shimReplaceTrack(window) {
          // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
          if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
            window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
          }
        }
      }, { "../utils": 15, "./filtericeservers": 8, "./getdisplaymedia": 9, "./getusermedia": 10, "rtcpeerconnection-shim": 16 }], 8: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.filterIceServers = filterIceServers;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        // Edge does not like
        // 1) stun: filtered after 14393 unless ?transport=udp is present
        // 2) turn: that does not have all of turn:host:port?transport=udp
        // 3) turn: with ipv6 addresses
        // 4) turn: occurring muliple times
        function filterIceServers(iceServers, edgeVersion) {
          var hasTurn = false;
          iceServers = JSON.parse(JSON.stringify(iceServers));
          return iceServers.filter(function (server) {
            if (server && (server.urls || server.url)) {
              var urls = server.urls || server.url;
              if (server.url && !server.urls) {
                utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
              }
              var isString = typeof urls === 'string';
              if (isString) {
                urls = [urls];
              }
              urls = urls.filter(function (url) {
                // filter STUN unconditionally.
                if (url.indexOf('stun:') === 0) {
                  return false;
                }

                var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
                if (validTurn && !hasTurn) {
                  hasTurn = true;
                  return true;
                }
                return validTurn && !hasTurn;
              });

              delete server.url;
              server.urls = isString ? urls[0] : urls;
              return !!urls.length;
            }
          });
        }
      }, { "../utils": 15 }], 9: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;
        function shimGetDisplayMedia(window) {
          if (!('getDisplayMedia' in window.navigator)) {
            return;
          }
          if (!window.navigator.mediaDevices) {
            return;
          }
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }
          window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator.mediaDevices);
        }
      }, {}], 10: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetUserMedia = shimGetUserMedia;
        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          var shimError_ = function shimError_(e) {
            return {
              name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint,
              toString: function toString() {
                return this.name;
              }
            };
          };

          // getUserMedia error shim.
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (c) {
            return origGetUserMedia(c).catch(function (e) {
              return Promise.reject(shimError_(e));
            });
          };
        }
      }, {}], 11: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimOnTrack = shimOnTrack;
        exports.shimPeerConnection = shimPeerConnection;
        exports.shimSenderGetStats = shimSenderGetStats;
        exports.shimReceiverGetStats = shimReceiverGetStats;
        exports.shimRemoveStream = shimRemoveStream;
        exports.shimRTCDataChannel = shimRTCDataChannel;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimOnTrack(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get$$1() {
                return { receiver: this.receiver };
              }
            });
          }
        }

        function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
            return; // probably media.peerconnection.enabled=false in about:config
          }
          if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.mozRTCPeerConnection;
          }

          // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });

          // support for addIceCandidate(null or undefined)
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };

          var modernStatsTypes = {
            inboundrtp: 'inbound-rtp',
            outboundrtp: 'outbound-rtp',
            candidatepair: 'candidate-pair',
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          };

          var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
            return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
              if (browserDetails.version < 53 && !onSucc) {
                // Shim only promise getStats with spec-hyphens in type names
                // Leave callback version alone; misc old uses of forEach before Map
                try {
                  stats.forEach(function (stat) {
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                  });
                } catch (e) {
                  if (e.name !== 'TypeError') {
                    throw e;
                  }
                  // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                  stats.forEach(function (stat, i) {
                    stats.set(i, Object.assign({}, stat, {
                      type: modernStatsTypes[stat.type] || stat.type
                    }));
                  });
                }
              }
              return stats;
            }).then(onSucc, onErr);
          };
        }

        function shimSenderGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
            return;
          }
          if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
            return;
          }
          var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
          if (origGetSenders) {
            window.RTCPeerConnection.prototype.getSenders = function () {
              var _this = this;

              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this;
              });
              return senders;
            };
          }

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          if (origAddTrack) {
            window.RTCPeerConnection.prototype.addTrack = function () {
              var sender = origAddTrack.apply(this, arguments);
              sender._pc = this;
              return sender;
            };
          }
          window.RTCRtpSender.prototype.getStats = function () {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
          };
        }

        function shimReceiverGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
            return;
          }
          if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
            return;
          }
          var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
          if (origGetReceivers) {
            window.RTCPeerConnection.prototype.getReceivers = function () {
              var _this2 = this;

              var receivers = origGetReceivers.apply(this, []);
              receivers.forEach(function (receiver) {
                return receiver._pc = _this2;
              });
              return receivers;
            };
          }
          utils.wrapPeerConnectionEvent(window, 'track', function (e) {
            e.receiver._pc = e.srcElement;
            return e;
          });
          window.RTCRtpReceiver.prototype.getStats = function () {
            return this._pc.getStats(this.track);
          };
        }

        function shimRemoveStream(window) {
          if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
            return;
          }
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            var _this3 = this;

            utils.deprecated('removeStream', 'removeTrack');
            this.getSenders().forEach(function (sender) {
              if (sender.track && stream.getTracks().includes(sender.track)) {
                _this3.removeTrack(sender);
              }
            });
          };
        }

        function shimRTCDataChannel(window) {
          // rename DataChannel to RTCDataChannel (native fix in FF60):
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
          if (window.DataChannel && !window.RTCDataChannel) {
            window.RTCDataChannel = window.DataChannel;
          }
        }
      }, { "../utils": 15, "./getdisplaymedia": 12, "./getusermedia": 13 }], 12: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;
        function shimGetDisplayMedia(window, preferredMediaSource) {
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }
          if (!window.navigator.mediaDevices) {
            return;
          }
          window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
            if (!(constraints && constraints.video)) {
              var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
              err.name = 'NotFoundError';
              // from https://heycam.github.io/webidl/#idl-DOMException-error-names
              err.code = 8;
              return Promise.reject(err);
            }
            if (constraints.video === true) {
              constraints.video = { mediaSource: preferredMediaSource };
            } else {
              constraints.video.mediaSource = preferredMediaSource;
            }
            return window.navigator.mediaDevices.getUserMedia(constraints);
          };
        }
      }, {}], 13: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimGetUserMedia = shimGetUserMedia;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimGetUserMedia(window) {
          var browserDetails = utils.detectBrowser(window);
          var navigator = window && window.navigator;
          var MediaStreamTrack = window && window.MediaStreamTrack;

          navigator.getUserMedia = function (constraints, onSuccess, onError) {
            // Replace Firefox 44+'s deprecation warning with unprefixed version.
            utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
            navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
          };

          if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
            var remap = function remap(obj, a, b) {
              if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
              }
            };

            var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
            navigator.mediaDevices.getUserMedia = function (c) {
              if ((typeof c === 'undefined' ? 'undefined' : _typeof$$1(c)) === 'object' && _typeof$$1(c.audio) === 'object') {
                c = JSON.parse(JSON.stringify(c));
                remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
              }
              return nativeGetUserMedia(c);
            };

            if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
              var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
              MediaStreamTrack.prototype.getSettings = function () {
                var obj = nativeGetSettings.apply(this, arguments);
                remap(obj, 'mozAutoGainControl', 'autoGainControl');
                remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                return obj;
              };
            }

            if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
              var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
              MediaStreamTrack.prototype.applyConstraints = function (c) {
                if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof$$1(c)) === 'object') {
                  c = JSON.parse(JSON.stringify(c));
                  remap(c, 'autoGainControl', 'mozAutoGainControl');
                  remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                }
                return nativeApplyConstraints.apply(this, [c]);
              };
            }
          }
        }
      }, { "../utils": 15 }], 14: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
        exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
        exports.shimCallbacksAPI = shimCallbacksAPI;
        exports.shimGetUserMedia = shimGetUserMedia;
        exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
        exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
        exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimLocalStreamsAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getLocalStreams = function () {
              if (!this._localStreams) {
                this._localStreams = [];
              }
              return this._localStreams;
            };
          }
          if (!('addStream' in window.RTCPeerConnection.prototype)) {
            var _addTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var _this = this;

              if (!this._localStreams) {
                this._localStreams = [];
              }
              if (!this._localStreams.includes(stream)) {
                this._localStreams.push(stream);
              }
              stream.getTracks().forEach(function (track) {
                return _addTrack.call(_this, track, stream);
              });
            };

            window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
              if (stream) {
                if (!this._localStreams) {
                  this._localStreams = [stream];
                } else if (!this._localStreams.includes(stream)) {
                  this._localStreams.push(stream);
                }
              }
              return _addTrack.call(this, track, stream);
            };
          }
          if (!('removeStream' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var _this2 = this;

              if (!this._localStreams) {
                this._localStreams = [];
              }
              var index = this._localStreams.indexOf(stream);
              if (index === -1) {
                return;
              }
              this._localStreams.splice(index, 1);
              var tracks = stream.getTracks();
              this.getSenders().forEach(function (sender) {
                if (tracks.includes(sender.track)) {
                  _this2.removeTrack(sender);
                }
              });
            };
          }
        }

        function shimRemoteStreamsAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getRemoteStreams = function () {
              return this._remoteStreams ? this._remoteStreams : [];
            };
          }
          if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
              get: function get$$1() {
                return this._onaddstream;
              },
              set: function set$$1(f) {
                var _this3 = this;

                if (this._onaddstream) {
                  this.removeEventListener('addstream', this._onaddstream);
                  this.removeEventListener('track', this._onaddstreampoly);
                }
                this.addEventListener('addstream', this._onaddstream = f);
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!_this3._remoteStreams) {
                      _this3._remoteStreams = [];
                    }

                    // if (isExist(_this3._remoteStreams, stream)) {
                    //   return;
                    // }
                    _this3._remoteStreams.push(stream);
                    var event = new Event('addstream');
                    event.stream = stream;
                    _this3.dispatchEvent(event);
                  });
                });
              }
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var pc = this;
              if (!this._onaddstreampoly) {
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!pc._remoteStreams) {
                      pc._remoteStreams = [];
                    }
                    if (pc._remoteStreams.indexOf(stream) >= 0) {
                      return;
                    }
                    pc._remoteStreams.push(stream);
                    var event = new Event('addstream');
                    event.stream = stream;
                    pc.dispatchEvent(event);
                  });
                });
              }
              return origSetRemoteDescription.apply(pc, arguments);
            };
          }
        }

        function shimCallbacksAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          var prototype = window.RTCPeerConnection.prototype;
          var createOffer = prototype.createOffer;
          var createAnswer = prototype.createAnswer;
          var setLocalDescription = prototype.setLocalDescription;
          var setRemoteDescription = prototype.setRemoteDescription;
          var addIceCandidate = prototype.addIceCandidate;

          prototype.createOffer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createOffer.apply(this, [options]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.createAnswer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createAnswer.apply(this, [options]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          var withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setLocalDescription.apply(this, [description]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.setLocalDescription = withCallback;

          withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setRemoteDescription.apply(this, [description]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.setRemoteDescription = withCallback;

          withCallback = function withCallback(candidate, successCallback, failureCallback) {
            var promise = addIceCandidate.apply(this, [candidate]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.addIceCandidate = withCallback;
        }

        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.getUserMedia = function (constraints, cb, errcb) {
              navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
            }.bind(navigator);
          }
        }

        function shimRTCIceServerUrls(window) {
          // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
          var OrigPeerConnection = window.RTCPeerConnection;
          window.RTCPeerConnection = function (pcConfig, pcConstraints) {
            if (pcConfig && pcConfig.iceServers) {
              var newIceServers = [];
              for (var i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];
                if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                  utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                  server = JSON.parse(JSON.stringify(server));
                  server.urls = server.url;
                  delete server.url;
                  newIceServers.push(server);
                } else {
                  newIceServers.push(pcConfig.iceServers[i]);
                }
              }
              pcConfig.iceServers = newIceServers;
            }
            return new OrigPeerConnection(pcConfig, pcConstraints);
          };
          window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
          // wrap static methods. Currently just generateCertificate.
          if ('generateCertificate' in window.RTCPeerConnection) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function get$$1() {
                return OrigPeerConnection.generateCertificate;
              }
            });
          }
        }

        function shimTrackEventTransceiver(window) {
          // Add event.transceiver member over deprecated event.receiver
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype &&
          // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
          // defined for some reason even when window.RTCTransceiver is not.
          !window.RTCTransceiver) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get$$1() {
                return { receiver: this.receiver };
              }
            });
          }
        }

        function shimCreateOfferLegacy(window) {
          var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
          window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
            if (offerOptions) {
              if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
              }
              var audioTransceiver = this.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'audio';
              });
              if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === 'sendrecv') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('sendonly');
                  } else {
                    audioTransceiver.direction = 'sendonly';
                  }
                } else if (audioTransceiver.direction === 'recvonly') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('inactive');
                  } else {
                    audioTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                this.addTransceiver('audio');
              }

              if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
              }
              var videoTransceiver = this.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'video';
              });
              if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === 'sendrecv') {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection('sendonly');
                  } else {
                    videoTransceiver.direction = 'sendonly';
                  }
                } else if (videoTransceiver.direction === 'recvonly') {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection('inactive');
                  } else {
                    videoTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                this.addTransceiver('video');
              }
            }
            return origCreateOffer.apply(this, arguments);
          };
        }
      }, { "../utils": 15 }], 15: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.extractVersion = extractVersion;
        exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
        exports.disableLog = disableLog;
        exports.disableWarnings = disableWarnings;
        exports.log = log;
        exports.deprecated = deprecated;
        exports.detectBrowser = detectBrowser;
        var logDisabled_ = true;
        var deprecationWarnings_ = true;

        /**
         * Extract browser version out of the provided user agent string.
         *
         * @param {!string} uastring userAgent string.
         * @param {!string} expr Regular expression used as match criteria.
         * @param {!number} pos position in the version string to be returned.
         * @return {!number} browser version.
         */
        function extractVersion(uastring, expr, pos) {
          var match = uastring.match(expr);
          return match && match.length >= pos && parseInt(match[pos], 10);
        }

        // Wraps the peerconnection event eventNameToWrap in a function
        // which returns the modified event object (or false to prevent
        // the event).
        function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
          if (!window.RTCPeerConnection) {
            return;
          }
          var proto = window.RTCPeerConnection.prototype;
          var nativeAddEventListener = proto.addEventListener;
          proto.addEventListener = function (nativeEventName, cb) {
            if (nativeEventName !== eventNameToWrap) {
              return nativeAddEventListener.apply(this, arguments);
            }
            var wrappedCallback = function wrappedCallback(e) {
              var modifiedEvent = wrapper(e);
              if (modifiedEvent) {
                cb(modifiedEvent);
              }
            };
            this._eventMap = this._eventMap || {};
            this._eventMap[cb] = wrappedCallback;
            return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
          };

          var nativeRemoveEventListener = proto.removeEventListener;
          proto.removeEventListener = function (nativeEventName, cb) {
            if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
              return nativeRemoveEventListener.apply(this, arguments);
            }
            var unwrappedCb = this._eventMap[cb];
            delete this._eventMap[cb];
            return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
          };

          Object.defineProperty(proto, 'on' + eventNameToWrap, {
            get: function get$$1() {
              return this['_on' + eventNameToWrap];
            },
            set: function set$$1(cb) {
              if (this['_on' + eventNameToWrap]) {
                this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
                delete this['_on' + eventNameToWrap];
              }
              if (cb) {
                this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
              }
            },

            enumerable: true,
            configurable: true
          });
        }

        function disableLog(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof$$1(bool)) + '. Please use a boolean.');
          }
          logDisabled_ = bool;
          return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
        }

        /**
         * Disable or enable deprecation warnings
         * @param {!boolean} bool set to true to disable warnings.
         */
        function disableWarnings(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof$$1(bool)) + '. Please use a boolean.');
          }
          deprecationWarnings_ = !bool;
          return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
        }

        function log() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object') {
            if (logDisabled_) {
              return;
            }
            if (typeof console !== 'undefined' && typeof console.log === 'function') {
              console.log.apply(console, arguments);
            }
          }
        }

        /**
         * Shows a deprecation warning suggesting the modern and spec-compatible API.
         */
        function deprecated(oldMethod, newMethod) {
          if (!deprecationWarnings_) {
            return;
          }
          console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
        }

        /**
         * Browser detector.
         *
         * @return {object} result containing browser and version
         *     properties.
         */
        function detectBrowser(window) {
          var navigator = window.navigator;

          // Returned result object.

          var result = { browser: null, version: null };

          // Fail early if it's not a browser
          if (typeof window === 'undefined' || !window.navigator) {
            result.browser = 'Not a browser.';
            return result;
          }

          if (navigator.mozGetUserMedia) {
            // Firefox.
            result.browser = 'firefox';
            result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
          } else if (navigator.webkitGetUserMedia) {
            // Chrome, Chromium, Webview, Opera.
            // Version matches Chrome/WebRTC version.
            result.browser = 'chrome';
            result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
          } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
            // Edge.
            result.browser = 'edge';
            result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
          } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
            // Safari.
            result.browser = 'safari';
            result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
          } else {
            // Default fallthrough: not supported.
            result.browser = 'Not a supported browser.';
            return result;
          }

          return result;
        }
      }, {}], 16: [function (require, module, exports) {

        var SDPUtils = require('sdp');

        function fixStatsType(stat) {
          return {
            inboundrtp: 'inbound-rtp',
            outboundrtp: 'outbound-rtp',
            candidatepair: 'candidate-pair',
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          }[stat.type] || stat.type;
        }

        function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
          var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

          // Map ICE parameters (ufrag, pwd) to SDP.
          sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

          // Map DTLS parameters to SDP.
          sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');

          sdp += 'a=mid:' + transceiver.mid + '\r\n';

          if (transceiver.rtpSender && transceiver.rtpReceiver) {
            sdp += 'a=sendrecv\r\n';
          } else if (transceiver.rtpSender) {
            sdp += 'a=sendonly\r\n';
          } else if (transceiver.rtpReceiver) {
            sdp += 'a=recvonly\r\n';
          } else {
            sdp += 'a=inactive\r\n';
          }

          if (transceiver.rtpSender) {
            var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
            transceiver.rtpSender._initialTrackId = trackId;
            // spec.
            var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
            sdp += 'a=' + msid;
            // for Chrome. Legacy should no longer be required.
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;

            // RTX
            if (transceiver.sendEncodingParameters[0].rtx) {
              sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
              sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
            }
          }
          // FIXME: this should be written by writeRtpDescription.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          }
          return sdp;
        }

        // Edge does not like
        // 1) stun: filtered after 14393 unless ?transport=udp is present
        // 2) turn: that does not have all of turn:host:port?transport=udp
        // 3) turn: with ipv6 addresses
        // 4) turn: occurring muliple times
        function filterIceServers(iceServers, edgeVersion) {
          var hasTurn = false;
          iceServers = JSON.parse(JSON.stringify(iceServers));
          return iceServers.filter(function (server) {
            if (server && (server.urls || server.url)) {
              var urls = server.urls || server.url;
              if (server.url && !server.urls) {
                console.warn('RTCIceServer.url is deprecated! Use urls instead.');
              }
              var isString = typeof urls === 'string';
              if (isString) {
                urls = [urls];
              }
              urls = urls.filter(function (url) {
                var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;

                if (validTurn) {
                  hasTurn = true;
                  return true;
                }
                return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
              });

              delete server.url;
              server.urls = isString ? urls[0] : urls;
              return !!urls.length;
            }
          });
        }

        // Determines the intersection of local and remote capabilities.
        function getCommonCapabilities(localCapabilities, remoteCapabilities) {
          var commonCapabilities = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
          };

          var findCodecByPayloadType = function findCodecByPayloadType(pt, codecs) {
            pt = parseInt(pt, 10);
            for (var i = 0; i < codecs.length; i++) {
              if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
                return codecs[i];
              }
            }
          };

          var rtxCapabilityMatches = function rtxCapabilityMatches(lRtx, rRtx, lCodecs, rCodecs) {
            var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
            var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
            return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
          };

          localCapabilities.codecs.forEach(function (lCodec) {
            for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
              var rCodec = remoteCapabilities.codecs[i];
              if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
                if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
                  // for RTX we need to find the local rtx that has a apt
                  // which points to the same local codec as the remote one.
                  if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
                    continue;
                  }
                }
                rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                // number of channels is the highest common number of channels
                rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
                // push rCodec so we reply with offerer payload type
                commonCapabilities.codecs.push(rCodec);

                // determine common feedback mechanisms
                rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
                  for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                    if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                      return true;
                    }
                  }
                  return false;
                });
                // FIXME: also need to determine .parameters
                //  see https://github.com/openpeer/ortc/issues/569
                break;
              }
            }
          });

          localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
            for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
              var rHeaderExtension = remoteCapabilities.headerExtensions[i];
              if (lHeaderExtension.uri === rHeaderExtension.uri) {
                commonCapabilities.headerExtensions.push(rHeaderExtension);
                break;
              }
            }
          });

          // FIXME: fecMechanisms
          return commonCapabilities;
        }

        // is action=setLocalDescription with type allowed in signalingState
        function isActionAllowedInSignalingState(action, type, signalingState) {
          return {
            offer: {
              setLocalDescription: ['stable', 'have-local-offer'],
              setRemoteDescription: ['stable', 'have-remote-offer']
            },
            answer: {
              setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
              setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
            }
          }[type][action].indexOf(signalingState) !== -1;
        }

        function maybeAddCandidate(iceTransport, candidate) {
          // Edge's internal representation adds some fields therefore
          // not all fieldѕ are taken into account.
          var alreadyAdded = iceTransport.getRemoteCandidates().find(function (remoteCandidate) {
            return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
          });
          if (!alreadyAdded) {
            iceTransport.addRemoteCandidate(candidate);
          }
          return !alreadyAdded;
        }

        function makeError(name, description) {
          var e = new Error(description);
          e.name = name;
          // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
          e.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: undefined,
            OperationError: undefined
          }[name];
          return e;
        }

        module.exports = function (window, edgeVersion) {
          // https://w3c.github.io/mediacapture-main/#mediastream
          // Helper function to add the track to the stream and
          // dispatch the event ourselves.
          function addTrackToStreamAndFireEvent(track, stream) {
            stream.addTrack(track);
            stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', { track: track }));
          }

          function removeTrackFromStreamAndFireEvent(track, stream) {
            stream.removeTrack(track);
            stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', { track: track }));
          }

          function fireAddTrack(pc, track, receiver, streams) {
            var trackEvent = new Event('track');
            trackEvent.track = track;
            trackEvent.receiver = receiver;
            trackEvent.transceiver = { receiver: receiver };
            trackEvent.streams = streams;
            window.setTimeout(function () {
              pc._dispatchEvent('track', trackEvent);
            });
          }

          var RTCPeerConnection = function RTCPeerConnection(config) {
            var pc = this;

            var _eventTarget = document.createDocumentFragment();
            ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
              pc[method] = _eventTarget[method].bind(_eventTarget);
            });

            this.canTrickleIceCandidates = null;

            this.needNegotiation = false;

            this.localStreams = [];
            this.remoteStreams = [];

            this._localDescription = null;
            this._remoteDescription = null;

            this.signalingState = 'stable';
            this.iceConnectionState = 'new';
            this.connectionState = 'new';
            this.iceGatheringState = 'new';

            config = JSON.parse(JSON.stringify(config || {}));

            this.usingBundle = config.bundlePolicy === 'max-bundle';
            if (config.rtcpMuxPolicy === 'negotiate') {
              throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
            } else if (!config.rtcpMuxPolicy) {
              config.rtcpMuxPolicy = 'require';
            }

            switch (config.iceTransportPolicy) {
              case 'all':
              case 'relay':
                break;
              default:
                config.iceTransportPolicy = 'all';
                break;
            }

            switch (config.bundlePolicy) {
              case 'balanced':
              case 'max-compat':
              case 'max-bundle':
                break;
              default:
                config.bundlePolicy = 'balanced';
                break;
            }

            config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

            this._iceGatherers = [];
            if (config.iceCandidatePoolSize) {
              for (var i = config.iceCandidatePoolSize; i > 0; i--) {
                this._iceGatherers.push(new window.RTCIceGatherer({
                  iceServers: config.iceServers,
                  gatherPolicy: config.iceTransportPolicy
                }));
              }
            } else {
              config.iceCandidatePoolSize = 0;
            }

            this._config = config;

            // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
            // everything that is needed to describe a SDP m-line.
            this.transceivers = [];

            this._sdpSessionId = SDPUtils.generateSessionId();
            this._sdpSessionVersion = 0;

            this._dtlsRole = undefined; // role for a=setup to use in answers.

            this._isClosed = false;
          };

          Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
            configurable: true,
            get: function get$$1() {
              return this._localDescription;
            }
          });
          Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
            configurable: true,
            get: function get$$1() {
              return this._remoteDescription;
            }
          });

          // set up event handlers on prototype
          RTCPeerConnection.prototype.onicecandidate = null;
          RTCPeerConnection.prototype.onaddstream = null;
          RTCPeerConnection.prototype.ontrack = null;
          RTCPeerConnection.prototype.onremovestream = null;
          RTCPeerConnection.prototype.onsignalingstatechange = null;
          RTCPeerConnection.prototype.oniceconnectionstatechange = null;
          RTCPeerConnection.prototype.onconnectionstatechange = null;
          RTCPeerConnection.prototype.onicegatheringstatechange = null;
          RTCPeerConnection.prototype.onnegotiationneeded = null;
          RTCPeerConnection.prototype.ondatachannel = null;

          RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
            if (this._isClosed) {
              return;
            }
            this.dispatchEvent(event);
            if (typeof this['on' + name] === 'function') {
              this['on' + name](event);
            }
          };

          RTCPeerConnection.prototype._emitGatheringStateChange = function () {
            var event = new Event('icegatheringstatechange');
            this._dispatchEvent('icegatheringstatechange', event);
          };

          RTCPeerConnection.prototype.getConfiguration = function () {
            return this._config;
          };

          RTCPeerConnection.prototype.getLocalStreams = function () {
            return this.localStreams;
          };

          RTCPeerConnection.prototype.getRemoteStreams = function () {
            return this.remoteStreams;
          };

          // internal helper to create a transceiver object.
          // (which is not yet the same as the WebRTC 1.0 transceiver)
          RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
            var hasBundleTransport = this.transceivers.length > 0;
            var transceiver = {
              track: null,
              iceGatherer: null,
              iceTransport: null,
              dtlsTransport: null,
              localCapabilities: null,
              remoteCapabilities: null,
              rtpSender: null,
              rtpReceiver: null,
              kind: kind,
              mid: null,
              sendEncodingParameters: null,
              recvEncodingParameters: null,
              stream: null,
              associatedRemoteMediaStreams: [],
              wantReceive: true
            };
            if (this.usingBundle && hasBundleTransport) {
              transceiver.iceTransport = this.transceivers[0].iceTransport;
              transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
            } else {
              var transports = this._createIceAndDtlsTransports();
              transceiver.iceTransport = transports.iceTransport;
              transceiver.dtlsTransport = transports.dtlsTransport;
            }
            if (!doNotAdd) {
              this.transceivers.push(transceiver);
            }
            return transceiver;
          };

          RTCPeerConnection.prototype.addTrack = function (track, stream) {
            if (this._isClosed) {
              throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
            }

            var alreadyExists = this.transceivers.find(function (s) {
              return s.track === track;
            });

            if (alreadyExists) {
              throw makeError('InvalidAccessError', 'Track already exists.');
            }

            var transceiver;
            for (var i = 0; i < this.transceivers.length; i++) {
              if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
                transceiver = this.transceivers[i];
              }
            }
            if (!transceiver) {
              transceiver = this._createTransceiver(track.kind);
            }

            this._maybeFireNegotiationNeeded();

            if (this.localStreams.indexOf(stream) === -1) {
              this.localStreams.push(stream);
            }

            transceiver.track = track;
            transceiver.stream = stream;
            transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
            return transceiver.rtpSender;
          };

          RTCPeerConnection.prototype.addStream = function (stream) {
            var pc = this;
            if (edgeVersion >= 15025) {
              stream.getTracks().forEach(function (track) {
                pc.addTrack(track, stream);
              });
            } else {
              // Clone is necessary for local demos mostly, attaching directly
              // to two different senders does not work (build 10547).
              // Fixed in 15025 (or earlier)
              var clonedStream = stream.clone();
              stream.getTracks().forEach(function (track, idx) {
                var clonedTrack = clonedStream.getTracks()[idx];
                track.addEventListener('enabled', function (event) {
                  clonedTrack.enabled = event.enabled;
                });
              });
              clonedStream.getTracks().forEach(function (track) {
                pc.addTrack(track, clonedStream);
              });
            }
          };

          RTCPeerConnection.prototype.removeTrack = function (sender) {
            if (this._isClosed) {
              throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
            }

            if (!(sender instanceof window.RTCRtpSender)) {
              throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.');
            }

            var transceiver = this.transceivers.find(function (t) {
              return t.rtpSender === sender;
            });

            if (!transceiver) {
              throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
            }
            var stream = transceiver.stream;

            transceiver.rtpSender.stop();
            transceiver.rtpSender = null;
            transceiver.track = null;
            transceiver.stream = null;

            // remove the stream from the set of local streams
            var localStreams = this.transceivers.map(function (t) {
              return t.stream;
            });
            if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
              this.localStreams.splice(this.localStreams.indexOf(stream), 1);
            }

            this._maybeFireNegotiationNeeded();
          };

          RTCPeerConnection.prototype.removeStream = function (stream) {
            var pc = this;
            stream.getTracks().forEach(function (track) {
              var sender = pc.getSenders().find(function (s) {
                return s.track === track;
              });
              if (sender) {
                pc.removeTrack(sender);
              }
            });
          };

          RTCPeerConnection.prototype.getSenders = function () {
            return this.transceivers.filter(function (transceiver) {
              return !!transceiver.rtpSender;
            }).map(function (transceiver) {
              return transceiver.rtpSender;
            });
          };

          RTCPeerConnection.prototype.getReceivers = function () {
            return this.transceivers.filter(function (transceiver) {
              return !!transceiver.rtpReceiver;
            }).map(function (transceiver) {
              return transceiver.rtpReceiver;
            });
          };

          RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex, usingBundle) {
            var pc = this;
            if (usingBundle && sdpMLineIndex > 0) {
              return this.transceivers[0].iceGatherer;
            } else if (this._iceGatherers.length) {
              return this._iceGatherers.shift();
            }
            var iceGatherer = new window.RTCIceGatherer({
              iceServers: this._config.iceServers,
              gatherPolicy: this._config.iceTransportPolicy
            });
            Object.defineProperty(iceGatherer, 'state', { value: 'new', writable: true });

            this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
            this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
              var end = !event.candidate || Object.keys(event.candidate).length === 0;
              // polyfill since RTCIceGatherer.state is not implemented in
              // Edge 10547 yet.
              iceGatherer.state = end ? 'completed' : 'gathering';
              if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
                pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
              }
            };
            iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
            return iceGatherer;
          };

          // start gathering from an RTCIceGatherer.
          RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
            var pc = this;
            var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
            if (iceGatherer.onlocalcandidate) {
              return;
            }
            var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
            this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
            iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
            iceGatherer.onlocalcandidate = function (evt) {
              if (pc.usingBundle && sdpMLineIndex > 0) {
                // if we know that we use bundle we can drop candidates with
                // ѕdpMLineIndex > 0. If we don't do this then our state gets
                // confused since we dispose the extra ice gatherer.
                return;
              }
              var event = new Event('icecandidate');
              event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

              var cand = evt.candidate;
              // Edge emits an empty object for RTCIceCandidateComplete‥
              var end = !cand || Object.keys(cand).length === 0;
              if (end) {
                // polyfill since RTCIceGatherer.state is not implemented in
                // Edge 10547 yet.
                if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
                  iceGatherer.state = 'completed';
                }
              } else {
                if (iceGatherer.state === 'new') {
                  iceGatherer.state = 'gathering';
                }
                // RTCIceCandidate doesn't have a component, needs to be added
                cand.component = 1;
                // also the usernameFragment. TODO: update SDP to take both variants.
                cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

                var serializedCandidate = SDPUtils.writeCandidate(cand);
                event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));

                event.candidate.candidate = serializedCandidate;
                event.candidate.toJSON = function () {
                  return {
                    candidate: event.candidate.candidate,
                    sdpMid: event.candidate.sdpMid,
                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                    usernameFragment: event.candidate.usernameFragment
                  };
                };
              }

              // update local description.
              var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
              if (!end) {
                sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
              } else {
                sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
              }
              pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join('');
              var complete = pc.transceivers.every(function (transceiver) {
                return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
              });

              if (pc.iceGatheringState !== 'gathering') {
                pc.iceGatheringState = 'gathering';
                pc._emitGatheringStateChange();
              }

              // Emit candidate. Also emit null candidate when all gatherers are
              // complete.
              if (!end) {
                pc._dispatchEvent('icecandidate', event);
              }
              if (complete) {
                pc._dispatchEvent('icecandidate', new Event('icecandidate'));
                pc.iceGatheringState = 'complete';
                pc._emitGatheringStateChange();
              }
            };

            // emit already gathered candidates.
            window.setTimeout(function () {
              bufferedCandidateEvents.forEach(function (e) {
                iceGatherer.onlocalcandidate(e);
              });
            }, 0);
          };

          // Create ICE transport and DTLS transport.
          RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
            var pc = this;
            var iceTransport = new window.RTCIceTransport(null);
            iceTransport.onicestatechange = function () {
              pc._updateIceConnectionState();
              pc._updateConnectionState();
            };

            var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
            dtlsTransport.ondtlsstatechange = function () {
              pc._updateConnectionState();
            };
            dtlsTransport.onerror = function () {
              // onerror does not set state to failed by itself.
              Object.defineProperty(dtlsTransport, 'state', { value: 'failed', writable: true });
              pc._updateConnectionState();
            };

            return {
              iceTransport: iceTransport,
              dtlsTransport: dtlsTransport
            };
          };

          // Destroy ICE gatherer, ICE transport and DTLS transport.
          // Without triggering the callbacks.
          RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (sdpMLineIndex) {
            var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
            if (iceGatherer) {
              delete iceGatherer.onlocalcandidate;
              delete this.transceivers[sdpMLineIndex].iceGatherer;
            }
            var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
            if (iceTransport) {
              delete iceTransport.onicestatechange;
              delete this.transceivers[sdpMLineIndex].iceTransport;
            }
            var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
            if (dtlsTransport) {
              delete dtlsTransport.ondtlsstatechange;
              delete dtlsTransport.onerror;
              delete this.transceivers[sdpMLineIndex].dtlsTransport;
            }
          };

          // Start the RTP Sender and Receiver for a transceiver.
          RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
            var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
            if (send && transceiver.rtpSender) {
              params.encodings = transceiver.sendEncodingParameters;
              params.rtcp = {
                cname: SDPUtils.localCName,
                compound: transceiver.rtcpParameters.compound
              };
              if (transceiver.recvEncodingParameters.length) {
                params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
              }
              transceiver.rtpSender.send(params);
            }
            if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
              // remove RTX field in Edge 14942
              if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) {
                transceiver.recvEncodingParameters.forEach(function (p) {
                  delete p.rtx;
                });
              }
              if (transceiver.recvEncodingParameters.length) {
                params.encodings = transceiver.recvEncodingParameters;
              } else {
                params.encodings = [{}];
              }
              params.rtcp = {
                compound: transceiver.rtcpParameters.compound
              };
              if (transceiver.rtcpParameters.cname) {
                params.rtcp.cname = transceiver.rtcpParameters.cname;
              }
              if (transceiver.sendEncodingParameters.length) {
                params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
              }
              transceiver.rtpReceiver.receive(params);
            }
          };

          RTCPeerConnection.prototype.setLocalDescription = function (description) {
            var pc = this;

            // Note: pranswer is not supported.
            if (['offer', 'answer'].indexOf(description.type) === -1) {
              return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
            }

            if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
            }

            var sections;
            var sessionpart;
            if (description.type === 'offer') {
              // VERY limited support for SDP munging. Limited to:
              // * changing the order of codecs
              sections = SDPUtils.splitSections(description.sdp);
              sessionpart = sections.shift();
              sections.forEach(function (mediaSection, sdpMLineIndex) {
                var caps = SDPUtils.parseRtpParameters(mediaSection);
                pc.transceivers[sdpMLineIndex].localCapabilities = caps;
              });

              pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
                pc._gather(transceiver.mid, sdpMLineIndex);
              });
            } else if (description.type === 'answer') {
              sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
              sessionpart = sections.shift();
              var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
              sections.forEach(function (mediaSection, sdpMLineIndex) {
                var transceiver = pc.transceivers[sdpMLineIndex];
                var iceGatherer = transceiver.iceGatherer;
                var iceTransport = transceiver.iceTransport;
                var dtlsTransport = transceiver.dtlsTransport;
                var localCapabilities = transceiver.localCapabilities;
                var remoteCapabilities = transceiver.remoteCapabilities;

                // treat bundle-only as not-rejected.
                var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

                if (!rejected && !transceiver.rejected) {
                  var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                  var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                  if (isIceLite) {
                    remoteDtlsParameters.role = 'server';
                  }

                  if (!pc.usingBundle || sdpMLineIndex === 0) {
                    pc._gather(transceiver.mid, sdpMLineIndex);
                    if (iceTransport.state === 'new') {
                      iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
                    }
                    if (dtlsTransport.state === 'new') {
                      dtlsTransport.start(remoteDtlsParameters);
                    }
                  }

                  // Calculate intersection of capabilities.
                  var params = getCommonCapabilities(localCapabilities, remoteCapabilities);

                  // Start the RTCRtpSender. The RTCRtpReceiver for this
                  // transceiver has already been started in setRemoteDescription.
                  pc._transceive(transceiver, params.codecs.length > 0, false);
                }
              });
            }

            pc._localDescription = {
              type: description.type,
              sdp: description.sdp
            };
            if (description.type === 'offer') {
              pc._updateSignalingState('have-local-offer');
            } else {
              pc._updateSignalingState('stable');
            }

            return Promise.resolve();
          };

          RTCPeerConnection.prototype.setRemoteDescription = function (description) {
            var pc = this;

            // Note: pranswer is not supported.
            if (['offer', 'answer'].indexOf(description.type) === -1) {
              return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
            }

            if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
            }

            var streams = {};
            pc.remoteStreams.forEach(function (stream) {
              streams[stream.id] = stream;
            });
            var receiverList = [];
            var sections = SDPUtils.splitSections(description.sdp);
            var sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
            var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
            pc.usingBundle = usingBundle;
            var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
            if (iceOptions) {
              pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
            } else {
              pc.canTrickleIceCandidates = false;
            }

            sections.forEach(function (mediaSection, sdpMLineIndex) {
              var lines = SDPUtils.splitLines(mediaSection);
              var kind = SDPUtils.getKind(mediaSection);
              // treat bundle-only as not-rejected.
              var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
              var protocol = lines[0].substr(2).split(' ')[2];

              var direction = SDPUtils.getDirection(mediaSection, sessionpart);
              var remoteMsid = SDPUtils.parseMsid(mediaSection);

              var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

              // Reject datachannels which are not implemented yet.
              if (rejected || kind === 'application' && (protocol === 'DTLS/SCTP' || protocol === 'UDP/DTLS/SCTP')) {
                // TODO: this is dangerous in the case where a non-rejected m-line
                //     becomes rejected.
                pc.transceivers[sdpMLineIndex] = {
                  mid: mid,
                  kind: kind,
                  protocol: protocol,
                  rejected: true
                };
                return;
              }

              if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
                // recycle a rejected transceiver.
                pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
              }

              var transceiver;
              var iceGatherer;
              var iceTransport;
              var dtlsTransport;
              var rtpReceiver;
              var sendEncodingParameters;
              var recvEncodingParameters;
              var localCapabilities;

              var track;
              // FIXME: ensure the mediaSection has rtcp-mux set.
              var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
              var remoteIceParameters;
              var remoteDtlsParameters;
              if (!rejected) {
                remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                remoteDtlsParameters.role = 'client';
              }
              recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);

              var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

              var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
              var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
                return SDPUtils.parseCandidate(cand);
              }).filter(function (cand) {
                return cand.component === 1;
              });

              // Check if we can use BUNDLE and dispose transports.
              if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
                pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
                pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
                pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
                if (pc.transceivers[sdpMLineIndex].rtpSender) {
                  pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
                }
                if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                  pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
                }
              }
              if (description.type === 'offer' && !rejected) {
                transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
                transceiver.mid = mid;

                if (!transceiver.iceGatherer) {
                  transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
                }

                if (cands.length && transceiver.iceTransport.state === 'new') {
                  if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                    transceiver.iceTransport.setRemoteCandidates(cands);
                  } else {
                    cands.forEach(function (candidate) {
                      maybeAddCandidate(transceiver.iceTransport, candidate);
                    });
                  }
                }

                localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

                // filter RTX until additional stuff needed for RTX is implemented
                // in adapter.js
                if (edgeVersion < 15019) {
                  localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
                    return codec.name !== 'rtx';
                  });
                }

                sendEncodingParameters = transceiver.sendEncodingParameters || [{
                  ssrc: (2 * sdpMLineIndex + 2) * 1001
                }];

                // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                var isNewTrack = false;
                if (direction === 'sendrecv' || direction === 'sendonly') {
                  isNewTrack = !transceiver.rtpReceiver;
                  rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

                  if (isNewTrack) {
                    var stream;
                    track = rtpReceiver.track;
                    // FIXME: does not work with Plan B.
                    if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
                      if (!streams[remoteMsid.stream]) {
                        streams[remoteMsid.stream] = new window.MediaStream();
                        Object.defineProperty(streams[remoteMsid.stream], 'id', {
                          get: function get$$1() {
                            return remoteMsid.stream;
                          }
                        });
                      }
                      Object.defineProperty(track, 'id', {
                        get: function get$$1() {
                          return remoteMsid.track;
                        }
                      });
                      stream = streams[remoteMsid.stream];
                    } else {
                      if (!streams.default) {
                        streams.default = new window.MediaStream();
                      }
                      stream = streams.default;
                    }
                    if (stream) {
                      addTrackToStreamAndFireEvent(track, stream);
                      transceiver.associatedRemoteMediaStreams.push(stream);
                    }
                    receiverList.push([track, rtpReceiver, stream]);
                  }
                } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                  transceiver.associatedRemoteMediaStreams.forEach(function (s) {
                    var nativeTrack = s.getTracks().find(function (t) {
                      return t.id === transceiver.rtpReceiver.track.id;
                    });
                    if (nativeTrack) {
                      removeTrackFromStreamAndFireEvent(nativeTrack, s);
                    }
                  });
                  transceiver.associatedRemoteMediaStreams = [];
                }

                transceiver.localCapabilities = localCapabilities;
                transceiver.remoteCapabilities = remoteCapabilities;
                transceiver.rtpReceiver = rtpReceiver;
                transceiver.rtcpParameters = rtcpParameters;
                transceiver.sendEncodingParameters = sendEncodingParameters;
                transceiver.recvEncodingParameters = recvEncodingParameters;

                // Start the RTCRtpReceiver now. The RTPSender is started in
                // setLocalDescription.
                pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
              } else if (description.type === 'answer' && !rejected) {
                transceiver = pc.transceivers[sdpMLineIndex];
                iceGatherer = transceiver.iceGatherer;
                iceTransport = transceiver.iceTransport;
                dtlsTransport = transceiver.dtlsTransport;
                rtpReceiver = transceiver.rtpReceiver;
                sendEncodingParameters = transceiver.sendEncodingParameters;
                localCapabilities = transceiver.localCapabilities;

                pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
                pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
                pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

                if (cands.length && iceTransport.state === 'new') {
                  if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
                    iceTransport.setRemoteCandidates(cands);
                  } else {
                    cands.forEach(function (candidate) {
                      maybeAddCandidate(transceiver.iceTransport, candidate);
                    });
                  }
                }

                if (!usingBundle || sdpMLineIndex === 0) {
                  if (iceTransport.state === 'new') {
                    iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
                  }
                  if (dtlsTransport.state === 'new') {
                    dtlsTransport.start(remoteDtlsParameters);
                  }
                }

                // If the offer contained RTX but the answer did not,
                // remove RTX from sendEncodingParameters.
                var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

                var hasRtx = commonCapabilities.codecs.filter(function (c) {
                  return c.name.toLowerCase() === 'rtx';
                }).length;
                if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                  delete transceiver.sendEncodingParameters[0].rtx;
                }

                pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');

                // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
                  track = rtpReceiver.track;
                  if (remoteMsid) {
                    if (!streams[remoteMsid.stream]) {
                      streams[remoteMsid.stream] = new window.MediaStream();
                    }
                    addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                    receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                  } else {
                    if (!streams.default) {
                      streams.default = new window.MediaStream();
                    }
                    addTrackToStreamAndFireEvent(track, streams.default);
                    receiverList.push([track, rtpReceiver, streams.default]);
                  }
                } else {
                  // FIXME: actually the receiver should be created later.
                  delete transceiver.rtpReceiver;
                }
              }
            });

            if (pc._dtlsRole === undefined) {
              pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
            }

            pc._remoteDescription = {
              type: description.type,
              sdp: description.sdp
            };
            if (description.type === 'offer') {
              pc._updateSignalingState('have-remote-offer');
            } else {
              pc._updateSignalingState('stable');
            }
            Object.keys(streams).forEach(function (sid) {
              var stream = streams[sid];
              if (stream.getTracks().length) {
                if (pc.remoteStreams.indexOf(stream) === -1) {
                  pc.remoteStreams.push(stream);
                  var event = new Event('addstream');
                  event.stream = stream;
                  window.setTimeout(function () {
                    pc._dispatchEvent('addstream', event);
                  });
                }

                receiverList.forEach(function (item) {
                  var track = item[0];
                  var receiver = item[1];
                  if (stream.id !== item[2].id) {
                    return;
                  }
                  fireAddTrack(pc, track, receiver, [stream]);
                });
              }
            });
            receiverList.forEach(function (item) {
              if (item[2]) {
                return;
              }
              fireAddTrack(pc, item[0], item[1], []);
            });

            // check whether addIceCandidate({}) was called within four seconds after
            // setRemoteDescription.
            window.setTimeout(function () {
              if (!(pc && pc.transceivers)) {
                return;
              }
              pc.transceivers.forEach(function (transceiver) {
                if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
                  console.warn('Timeout for addRemoteCandidate. Consider sending ' + 'an end-of-candidates notification');
                  transceiver.iceTransport.addRemoteCandidate({});
                }
              });
            }, 4000);

            return Promise.resolve();
          };

          RTCPeerConnection.prototype.close = function () {
            this.transceivers.forEach(function (transceiver) {
              /* not yet
              if (transceiver.iceGatherer) {
                transceiver.iceGatherer.close();
              }
              */
              if (transceiver.iceTransport) {
                transceiver.iceTransport.stop();
              }
              if (transceiver.dtlsTransport) {
                transceiver.dtlsTransport.stop();
              }
              if (transceiver.rtpSender) {
                transceiver.rtpSender.stop();
              }
              if (transceiver.rtpReceiver) {
                transceiver.rtpReceiver.stop();
              }
            });
            // FIXME: clean up tracks, local streams, remote streams, etc
            this._isClosed = true;
            this._updateSignalingState('closed');
          };

          // Update the signaling state.
          RTCPeerConnection.prototype._updateSignalingState = function (newState) {
            this.signalingState = newState;
            var event = new Event('signalingstatechange');
            this._dispatchEvent('signalingstatechange', event);
          };

          // Determine whether to fire the negotiationneeded event.
          RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
            var pc = this;
            if (this.signalingState !== 'stable' || this.needNegotiation === true) {
              return;
            }
            this.needNegotiation = true;
            window.setTimeout(function () {
              if (pc.needNegotiation) {
                pc.needNegotiation = false;
                var event = new Event('negotiationneeded');
                pc._dispatchEvent('negotiationneeded', event);
              }
            }, 0);
          };

          // Update the ice connection state.
          RTCPeerConnection.prototype._updateIceConnectionState = function () {
            var newState;
            var states = {
              'new': 0,
              closed: 0,
              checking: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };
            this.transceivers.forEach(function (transceiver) {
              if (transceiver.iceTransport && !transceiver.rejected) {
                states[transceiver.iceTransport.state]++;
              }
            });

            newState = 'new';
            if (states.failed > 0) {
              newState = 'failed';
            } else if (states.checking > 0) {
              newState = 'checking';
            } else if (states.disconnected > 0) {
              newState = 'disconnected';
            } else if (states.new > 0) {
              newState = 'new';
            } else if (states.connected > 0) {
              newState = 'connected';
            } else if (states.completed > 0) {
              newState = 'completed';
            }

            if (newState !== this.iceConnectionState) {
              this.iceConnectionState = newState;
              var event = new Event('iceconnectionstatechange');
              this._dispatchEvent('iceconnectionstatechange', event);
            }
          };

          // Update the connection state.
          RTCPeerConnection.prototype._updateConnectionState = function () {
            var newState;
            var states = {
              'new': 0,
              closed: 0,
              connecting: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };
            this.transceivers.forEach(function (transceiver) {
              if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
                states[transceiver.iceTransport.state]++;
                states[transceiver.dtlsTransport.state]++;
              }
            });
            // ICETransport.completed and connected are the same for this purpose.
            states.connected += states.completed;

            newState = 'new';
            if (states.failed > 0) {
              newState = 'failed';
            } else if (states.connecting > 0) {
              newState = 'connecting';
            } else if (states.disconnected > 0) {
              newState = 'disconnected';
            } else if (states.new > 0) {
              newState = 'new';
            } else if (states.connected > 0) {
              newState = 'connected';
            }

            if (newState !== this.connectionState) {
              this.connectionState = newState;
              var event = new Event('connectionstatechange');
              this._dispatchEvent('connectionstatechange', event);
            }
          };

          RTCPeerConnection.prototype.createOffer = function () {
            var pc = this;

            if (pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
            }

            var numAudioTracks = pc.transceivers.filter(function (t) {
              return t.kind === 'audio';
            }).length;
            var numVideoTracks = pc.transceivers.filter(function (t) {
              return t.kind === 'video';
            }).length;

            // Determine number of audio and video tracks we need to send/recv.
            var offerOptions = arguments[0];
            if (offerOptions) {
              // Reject Chrome legacy constraints.
              if (offerOptions.mandatory || offerOptions.optional) {
                throw new TypeError('Legacy mandatory/optional constraints not supported.');
              }
              if (offerOptions.offerToReceiveAudio !== undefined) {
                if (offerOptions.offerToReceiveAudio === true) {
                  numAudioTracks = 1;
                } else if (offerOptions.offerToReceiveAudio === false) {
                  numAudioTracks = 0;
                } else {
                  numAudioTracks = offerOptions.offerToReceiveAudio;
                }
              }
              if (offerOptions.offerToReceiveVideo !== undefined) {
                if (offerOptions.offerToReceiveVideo === true) {
                  numVideoTracks = 1;
                } else if (offerOptions.offerToReceiveVideo === false) {
                  numVideoTracks = 0;
                } else {
                  numVideoTracks = offerOptions.offerToReceiveVideo;
                }
              }
            }

            pc.transceivers.forEach(function (transceiver) {
              if (transceiver.kind === 'audio') {
                numAudioTracks--;
                if (numAudioTracks < 0) {
                  transceiver.wantReceive = false;
                }
              } else if (transceiver.kind === 'video') {
                numVideoTracks--;
                if (numVideoTracks < 0) {
                  transceiver.wantReceive = false;
                }
              }
            });

            // Create M-lines for recvonly streams.
            while (numAudioTracks > 0 || numVideoTracks > 0) {
              if (numAudioTracks > 0) {
                pc._createTransceiver('audio');
                numAudioTracks--;
              }
              if (numVideoTracks > 0) {
                pc._createTransceiver('video');
                numVideoTracks--;
              }
            }

            var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              // For each track, create an ice gatherer, ice transport,
              // dtls transport, potentially rtpsender and rtpreceiver.
              var track = transceiver.track;
              var kind = transceiver.kind;
              var mid = transceiver.mid || SDPUtils.generateIdentifier();
              transceiver.mid = mid;

              if (!transceiver.iceGatherer) {
                transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
              }

              var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
              // filter RTX until additional stuff needed for RTX is implemented
              // in adapter.js
              if (edgeVersion < 15019) {
                localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
                  return codec.name !== 'rtx';
                });
              }
              localCapabilities.codecs.forEach(function (codec) {
                // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                // by adding level-asymmetry-allowed=1
                if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) {
                  codec.parameters['level-asymmetry-allowed'] = '1';
                }

                // for subsequent offers, we might have to re-use the payload
                // type of the last offer.
                if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
                  transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
                    if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) {
                      codec.preferredPayloadType = remoteCodec.payloadType;
                    }
                  });
                }
              });
              localCapabilities.headerExtensions.forEach(function (hdrExt) {
                var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
                remoteExtensions.forEach(function (rHdrExt) {
                  if (hdrExt.uri === rHdrExt.uri) {
                    hdrExt.id = rHdrExt.id;
                  }
                });
              });

              // generate an ssrc now, to be used later in rtpSender.send
              var sendEncodingParameters = transceiver.sendEncodingParameters || [{
                ssrc: (2 * sdpMLineIndex + 1) * 1001
              }];
              if (track) {
                // add RTX
                if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) {
                  sendEncodingParameters[0].rtx = {
                    ssrc: sendEncodingParameters[0].ssrc + 1
                  };
                }
              }

              if (transceiver.wantReceive) {
                transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
              }

              transceiver.localCapabilities = localCapabilities;
              transceiver.sendEncodingParameters = sendEncodingParameters;
            });

            // always offer BUNDLE and dispose on return if not supported.
            if (pc._config.bundlePolicy !== 'max-compat') {
              sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
                return t.mid;
              }).join(' ') + '\r\n';
            }
            sdp += 'a=ice-options:trickle\r\n';

            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
              sdp += 'a=rtcp-rsize\r\n';

              if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
                transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
                  cand.component = 1;
                  sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
                });

                if (transceiver.iceGatherer.state === 'completed') {
                  sdp += 'a=end-of-candidates\r\n';
                }
              }
            });

            var desc = new window.RTCSessionDescription({
              type: 'offer',
              sdp: sdp
            });
            return Promise.resolve(desc);
          };

          RTCPeerConnection.prototype.createAnswer = function () {
            var pc = this;

            if (pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
            }

            if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) {
              return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
            }

            var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
            if (pc.usingBundle) {
              sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
                return t.mid;
              }).join(' ') + '\r\n';
            }
            sdp += 'a=ice-options:trickle\r\n';

            var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
                return;
              }
              if (transceiver.rejected) {
                if (transceiver.kind === 'application') {
                  if (transceiver.protocol === 'DTLS/SCTP') {
                    // legacy fmt
                    sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                  } else {
                    sdp += 'm=application 0 ' + transceiver.protocol + ' webrtc-datachannel\r\n';
                  }
                } else if (transceiver.kind === 'audio') {
                  sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' + 'a=rtpmap:0 PCMU/8000\r\n';
                } else if (transceiver.kind === 'video') {
                  sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' + 'a=rtpmap:120 VP8/90000\r\n';
                }
                sdp += 'c=IN IP4 0.0.0.0\r\n' + 'a=inactive\r\n' + 'a=mid:' + transceiver.mid + '\r\n';
                return;
              }

              // FIXME: look at direction.
              if (transceiver.stream) {
                var localTrack;
                if (transceiver.kind === 'audio') {
                  localTrack = transceiver.stream.getAudioTracks()[0];
                } else if (transceiver.kind === 'video') {
                  localTrack = transceiver.stream.getVideoTracks()[0];
                }
                if (localTrack) {
                  // add RTX
                  if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) {
                    transceiver.sendEncodingParameters[0].rtx = {
                      ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                    };
                  }
                }
              }

              // Calculate intersection of capabilities.
              var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

              var hasRtx = commonCapabilities.codecs.filter(function (c) {
                return c.name.toLowerCase() === 'rtx';
              }).length;
              if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                delete transceiver.sendEncodingParameters[0].rtx;
              }

              sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);
              if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
                sdp += 'a=rtcp-rsize\r\n';
              }
            });

            var desc = new window.RTCSessionDescription({
              type: 'answer',
              sdp: sdp
            });
            return Promise.resolve(desc);
          };

          RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
            var pc = this;
            var sections;
            if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
              return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
            }

            // TODO: needs to go into ops queue.
            return new Promise(function (resolve, reject) {
              if (!pc._remoteDescription) {
                return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
              } else if (!candidate || candidate.candidate === '') {
                for (var j = 0; j < pc.transceivers.length; j++) {
                  if (pc.transceivers[j].rejected) {
                    continue;
                  }
                  pc.transceivers[j].iceTransport.addRemoteCandidate({});
                  sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                  sections[j] += 'a=end-of-candidates\r\n';
                  pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                  if (pc.usingBundle) {
                    break;
                  }
                }
              } else {
                var sdpMLineIndex = candidate.sdpMLineIndex;
                if (candidate.sdpMid) {
                  for (var i = 0; i < pc.transceivers.length; i++) {
                    if (pc.transceivers[i].mid === candidate.sdpMid) {
                      sdpMLineIndex = i;
                      break;
                    }
                  }
                }
                var transceiver = pc.transceivers[sdpMLineIndex];
                if (transceiver) {
                  if (transceiver.rejected) {
                    return resolve();
                  }
                  var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
                  // Ignore Chrome's invalid candidates since Edge does not like them.
                  if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                    return resolve();
                  }
                  // Ignore RTCP candidates, we assume RTCP-MUX.
                  if (cand.component && cand.component !== 1) {
                    return resolve();
                  }
                  // when using bundle, avoid adding candidates to the wrong
                  // ice transport. And avoid adding candidates added in the SDP.
                  if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
                    if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                      return reject(makeError('OperationError', 'Can not add ICE candidate'));
                    }
                  }

                  // update the remoteDescription.
                  var candidateString = candidate.candidate.trim();
                  if (candidateString.indexOf('a=') === 0) {
                    candidateString = candidateString.substr(2);
                  }
                  sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                  sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
                  pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                } else {
                  return reject(makeError('OperationError', 'Can not add ICE candidate'));
                }
              }
              resolve();
            });
          };

          RTCPeerConnection.prototype.getStats = function (selector) {
            if (selector && selector instanceof window.MediaStreamTrack) {
              var senderOrReceiver = null;
              this.transceivers.forEach(function (transceiver) {
                if (transceiver.rtpSender && transceiver.rtpSender.track === selector) {
                  senderOrReceiver = transceiver.rtpSender;
                } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) {
                  senderOrReceiver = transceiver.rtpReceiver;
                }
              });
              if (!senderOrReceiver) {
                throw makeError('InvalidAccessError', 'Invalid selector.');
              }
              return senderOrReceiver.getStats();
            }

            var promises = [];
            this.transceivers.forEach(function (transceiver) {
              ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
                if (transceiver[method]) {
                  promises.push(transceiver[method].getStats());
                }
              });
            });
            return Promise.all(promises).then(function (allStats) {
              var results = new Map();
              allStats.forEach(function (stats) {
                stats.forEach(function (stat) {
                  results.set(stat.id, stat);
                });
              });
              return results;
            });
          };

          // fix low-level stat names and return Map instead of object.
          var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer', 'RTCIceTransport', 'RTCDtlsTransport'];
          ortcObjects.forEach(function (ortcObjectName) {
            var obj = window[ortcObjectName];
            if (obj && obj.prototype && obj.prototype.getStats) {
              var nativeGetstats = obj.prototype.getStats;
              obj.prototype.getStats = function () {
                return nativeGetstats.apply(this).then(function (nativeStats) {
                  var mapStats = new Map();
                  Object.keys(nativeStats).forEach(function (id) {
                    nativeStats[id].type = fixStatsType(nativeStats[id]);
                    mapStats.set(id, nativeStats[id]);
                  });
                  return mapStats;
                });
              };
            }
          });

          // legacy callback shims. Should be moved to adapter.js some days.
          var methods = ['createOffer', 'createAnswer'];
          methods.forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function () {
              var args = arguments;
              if (typeof args[0] === 'function' || typeof args[1] === 'function') {
                // legacy
                return nativeMethod.apply(this, [arguments[2]]).then(function (description) {
                  if (typeof args[0] === 'function') {
                    args[0].apply(null, [description]);
                  }
                }, function (error) {
                  if (typeof args[1] === 'function') {
                    args[1].apply(null, [error]);
                  }
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });

          methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
          methods.forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function () {
              var args = arguments;
              if (typeof args[1] === 'function' || typeof args[2] === 'function') {
                // legacy
                return nativeMethod.apply(this, arguments).then(function () {
                  if (typeof args[1] === 'function') {
                    args[1].apply(null);
                  }
                }, function (error) {
                  if (typeof args[2] === 'function') {
                    args[2].apply(null, [error]);
                  }
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });

          // getStats is special. It doesn't have a spec legacy method yet we support
          // getStats(something, cb) without error callbacks.
          ['getStats'].forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function () {
              var args = arguments;
              if (typeof args[1] === 'function') {
                return nativeMethod.apply(this, arguments).then(function () {
                  if (typeof args[1] === 'function') {
                    args[1].apply(null);
                  }
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });

          return RTCPeerConnection;
        };
      }, { "sdp": 17 }], 17: [function (require, module, exports) {

        // SDP helpers.

        var SDPUtils = {};

        // Generate an alphanumeric identifier for cname or mids.
        // TODO: use UUIDs instead? https://gist.github.com/jed/982883
        SDPUtils.generateIdentifier = function () {
          return Math.random().toString(36).substr(2, 10);
        };

        // The RTCP CNAME used by all peerconnections from the same JS.
        SDPUtils.localCName = SDPUtils.generateIdentifier();

        // Splits SDP into lines, dealing with both CRLF and LF.
        SDPUtils.splitLines = function (blob) {
          return blob.trim().split('\n').map(function (line) {
            return line.trim();
          });
        };
        // Splits SDP into sessionpart and mediasections. Ensures CRLF.
        SDPUtils.splitSections = function (blob) {
          var parts = blob.split('\nm=');
          return parts.map(function (part, index) {
            return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
          });
        };

        // returns the session description.
        SDPUtils.getDescription = function (blob) {
          var sections = SDPUtils.splitSections(blob);
          return sections && sections[0];
        };

        // returns the individual media sections.
        SDPUtils.getMediaSections = function (blob) {
          var sections = SDPUtils.splitSections(blob);
          sections.shift();
          return sections;
        };

        // Returns lines that start with a certain prefix.
        SDPUtils.matchPrefix = function (blob, prefix) {
          return SDPUtils.splitLines(blob).filter(function (line) {
            return line.indexOf(prefix) === 0;
          });
        };

        // Parses an ICE candidate line. Sample input:
        // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
        // rport 55996"
        SDPUtils.parseCandidate = function (line) {
          var parts;
          // Parse both variants.
          if (line.indexOf('a=candidate:') === 0) {
            parts = line.substring(12).split(' ');
          } else {
            parts = line.substring(10).split(' ');
          }

          var candidate = {
            foundation: parts[0],
            component: parseInt(parts[1], 10),
            protocol: parts[2].toLowerCase(),
            priority: parseInt(parts[3], 10),
            ip: parts[4],
            address: parts[4], // address is an alias for ip.
            port: parseInt(parts[5], 10),
            // skip parts[6] == 'typ'
            type: parts[7]
          };

          for (var i = 8; i < parts.length; i += 2) {
            switch (parts[i]) {
              case 'raddr':
                candidate.relatedAddress = parts[i + 1];
                break;
              case 'rport':
                candidate.relatedPort = parseInt(parts[i + 1], 10);
                break;
              case 'tcptype':
                candidate.tcpType = parts[i + 1];
                break;
              case 'ufrag':
                candidate.ufrag = parts[i + 1]; // for backward compability.
                candidate.usernameFragment = parts[i + 1];
                break;
              default:
                // extension handling, in particular ufrag
                candidate[parts[i]] = parts[i + 1];
                break;
            }
          }
          return candidate;
        };

        // Translates a candidate object into SDP candidate attribute.
        SDPUtils.writeCandidate = function (candidate) {
          var sdp = [];
          sdp.push(candidate.foundation);
          sdp.push(candidate.component);
          sdp.push(candidate.protocol.toUpperCase());
          sdp.push(candidate.priority);
          sdp.push(candidate.address || candidate.ip);
          sdp.push(candidate.port);

          var type = candidate.type;
          sdp.push('typ');
          sdp.push(type);
          if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
            sdp.push('raddr');
            sdp.push(candidate.relatedAddress);
            sdp.push('rport');
            sdp.push(candidate.relatedPort);
          }
          if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
            sdp.push('tcptype');
            sdp.push(candidate.tcpType);
          }
          if (candidate.usernameFragment || candidate.ufrag) {
            sdp.push('ufrag');
            sdp.push(candidate.usernameFragment || candidate.ufrag);
          }
          return 'candidate:' + sdp.join(' ');
        };

        // Parses an ice-options line, returns an array of option tags.
        // a=ice-options:foo bar
        SDPUtils.parseIceOptions = function (line) {
          return line.substr(14).split(' ');
        };

        // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
        // a=rtpmap:111 opus/48000/2
        SDPUtils.parseRtpMap = function (line) {
          var parts = line.substr(9).split(' ');
          var parsed = {
            payloadType: parseInt(parts.shift(), 10) // was: id
          };

          parts = parts[0].split('/');

          parsed.name = parts[0];
          parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
          parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
          // legacy alias, got renamed back to channels in ORTC.
          parsed.numChannels = parsed.channels;
          return parsed;
        };

        // Generate an a=rtpmap line from RTCRtpCodecCapability or
        // RTCRtpCodecParameters.
        SDPUtils.writeRtpMap = function (codec) {
          var pt = codec.payloadType;
          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }
          var channels = codec.channels || codec.numChannels || 1;
          return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
        };

        // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
        // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
        // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
        SDPUtils.parseExtmap = function (line) {
          var parts = line.substr(9).split(' ');
          return {
            id: parseInt(parts[0], 10),
            direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
            uri: parts[1]
          };
        };

        // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
        // RTCRtpHeaderExtension.
        SDPUtils.writeExtmap = function (headerExtension) {
          return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
        };

        // Parses an ftmp line, returns dictionary. Sample input:
        // a=fmtp:96 vbr=on;cng=on
        // Also deals with vbr=on; cng=on
        SDPUtils.parseFmtp = function (line) {
          var parsed = {};
          var kv;
          var parts = line.substr(line.indexOf(' ') + 1).split(';');
          for (var j = 0; j < parts.length; j++) {
            kv = parts[j].trim().split('=');
            parsed[kv[0].trim()] = kv[1];
          }
          return parsed;
        };

        // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
        SDPUtils.writeFmtp = function (codec) {
          var line = '';
          var pt = codec.payloadType;
          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }
          if (codec.parameters && Object.keys(codec.parameters).length) {
            var params = [];
            Object.keys(codec.parameters).forEach(function (param) {
              if (codec.parameters[param]) {
                params.push(param + '=' + codec.parameters[param]);
              } else {
                params.push(param);
              }
            });
            line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
          }
          return line;
        };

        // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
        // a=rtcp-fb:98 nack rpsi
        SDPUtils.parseRtcpFb = function (line) {
          var parts = line.substr(line.indexOf(' ') + 1).split(' ');
          return {
            type: parts.shift(),
            parameter: parts.join(' ')
          };
        };
        // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
        SDPUtils.writeRtcpFb = function (codec) {
          var lines = '';
          var pt = codec.payloadType;
          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }
          if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
            // FIXME: special handling for trr-int?
            codec.rtcpFeedback.forEach(function (fb) {
              lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
            });
          }
          return lines;
        };

        // Parses an RFC 5576 ssrc media attribute. Sample input:
        // a=ssrc:3735928559 cname:something
        SDPUtils.parseSsrcMedia = function (line) {
          var sp = line.indexOf(' ');
          var parts = {
            ssrc: parseInt(line.substr(7, sp - 7), 10)
          };
          var colon = line.indexOf(':', sp);
          if (colon > -1) {
            parts.attribute = line.substr(sp + 1, colon - sp - 1);
            parts.value = line.substr(colon + 1);
          } else {
            parts.attribute = line.substr(sp + 1);
          }
          return parts;
        };

        SDPUtils.parseSsrcGroup = function (line) {
          var parts = line.substr(13).split(' ');
          return {
            semantics: parts.shift(),
            ssrcs: parts.map(function (ssrc) {
              return parseInt(ssrc, 10);
            })
          };
        };

        // Extracts the MID (RFC 5888) from a media section.
        // returns the MID or undefined if no mid line was found.
        SDPUtils.getMid = function (mediaSection) {
          var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
          if (mid) {
            return mid.substr(6);
          }
        };

        SDPUtils.parseFingerprint = function (line) {
          var parts = line.substr(14).split(' ');
          return {
            algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
            value: parts[1]
          };
        };

        // Extracts DTLS parameters from SDP media section or sessionpart.
        // FIXME: for consistency with other functions this should only
        //   get the fingerprint line as input. See also getIceParameters.
        SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
          var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
          // Note: a=setup line is ignored since we use the 'auto' role.
          // Note2: 'algorithm' is not case sensitive except in Edge.
          return {
            role: 'auto',
            fingerprints: lines.map(SDPUtils.parseFingerprint)
          };
        };

        // Serializes DTLS parameters to SDP.
        SDPUtils.writeDtlsParameters = function (params, setupType) {
          var sdp = 'a=setup:' + setupType + '\r\n';
          params.fingerprints.forEach(function (fp) {
            sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
          });
          return sdp;
        };
        // Parses ICE information from SDP media section or sessionpart.
        // FIXME: for consistency with other functions this should only
        //   get the ice-ufrag and ice-pwd lines as input.
        SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
          var lines = SDPUtils.splitLines(mediaSection);
          // Search in session part, too.
          lines = lines.concat(SDPUtils.splitLines(sessionpart));
          var iceParameters = {
            usernameFragment: lines.filter(function (line) {
              return line.indexOf('a=ice-ufrag:') === 0;
            })[0].substr(12),
            password: lines.filter(function (line) {
              return line.indexOf('a=ice-pwd:') === 0;
            })[0].substr(10)
          };
          return iceParameters;
        };

        // Serializes ICE parameters to SDP.
        SDPUtils.writeIceParameters = function (params) {
          return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
        };

        // Parses the SDP media section and returns RTCRtpParameters.
        SDPUtils.parseRtpParameters = function (mediaSection) {
          var description = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
          };
          var lines = SDPUtils.splitLines(mediaSection);
          var mline = lines[0].split(' ');
          for (var i = 3; i < mline.length; i++) {
            // find all codecs from mline[3..]
            var pt = mline[i];
            var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
            if (rtpmapline) {
              var codec = SDPUtils.parseRtpMap(rtpmapline);
              var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
              // Only the first a=fmtp:<pt> is considered.
              codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
              codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
              description.codecs.push(codec);
              // parse FEC mechanisms from rtpmap lines.
              switch (codec.name.toUpperCase()) {
                case 'RED':
                case 'ULPFEC':
                  description.fecMechanisms.push(codec.name.toUpperCase());
                  break;
                default:
                  // only RED and ULPFEC are recognized as FEC mechanisms.
                  break;
              }
            }
          }
          SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
            description.headerExtensions.push(SDPUtils.parseExtmap(line));
          });
          // FIXME: parse rtcp.
          return description;
        };

        // Generates parts of the SDP media section describing the capabilities /
        // parameters.
        SDPUtils.writeRtpDescription = function (kind, caps) {
          var sdp = '';

          // Build the mline.
          sdp += 'm=' + kind + ' ';
          sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
          sdp += ' UDP/TLS/RTP/SAVPF ';
          sdp += caps.codecs.map(function (codec) {
            if (codec.preferredPayloadType !== undefined) {
              return codec.preferredPayloadType;
            }
            return codec.payloadType;
          }).join(' ') + '\r\n';

          sdp += 'c=IN IP4 0.0.0.0\r\n';
          sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

          // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
          caps.codecs.forEach(function (codec) {
            sdp += SDPUtils.writeRtpMap(codec);
            sdp += SDPUtils.writeFmtp(codec);
            sdp += SDPUtils.writeRtcpFb(codec);
          });
          var maxptime = 0;
          caps.codecs.forEach(function (codec) {
            if (codec.maxptime > maxptime) {
              maxptime = codec.maxptime;
            }
          });
          if (maxptime > 0) {
            sdp += 'a=maxptime:' + maxptime + '\r\n';
          }
          sdp += 'a=rtcp-mux\r\n';

          if (caps.headerExtensions) {
            caps.headerExtensions.forEach(function (extension) {
              sdp += SDPUtils.writeExtmap(extension);
            });
          }
          // FIXME: write fecMechanisms.
          return sdp;
        };

        // Parses the SDP media section and returns an array of
        // RTCRtpEncodingParameters.
        SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
          var encodingParameters = [];
          var description = SDPUtils.parseRtpParameters(mediaSection);
          var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
          var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

          // filter a=ssrc:... cname:, ignore PlanB-msid
          var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (parts) {
            return parts.attribute === 'cname';
          });
          var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
          var secondarySsrc;

          var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
            var parts = line.substr(17).split(' ');
            return parts.map(function (part) {
              return parseInt(part, 10);
            });
          });
          if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
            secondarySsrc = flows[0][1];
          }

          description.codecs.forEach(function (codec) {
            if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
              var encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
              };
              if (primarySsrc && secondarySsrc) {
                encParam.rtx = { ssrc: secondarySsrc };
              }
              encodingParameters.push(encParam);
              if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                  ssrc: primarySsrc,
                  mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                };
                encodingParameters.push(encParam);
              }
            }
          });
          if (encodingParameters.length === 0 && primarySsrc) {
            encodingParameters.push({
              ssrc: primarySsrc
            });
          }

          // we support both b=AS and b=TIAS but interpret AS as TIAS.
          var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
          if (bandwidth.length) {
            if (bandwidth[0].indexOf('b=TIAS:') === 0) {
              bandwidth = parseInt(bandwidth[0].substr(7), 10);
            } else if (bandwidth[0].indexOf('b=AS:') === 0) {
              // use formula from JSEP to convert b=AS to TIAS value.
              bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
            } else {
              bandwidth = undefined;
            }
            encodingParameters.forEach(function (params) {
              params.maxBitrate = bandwidth;
            });
          }
          return encodingParameters;
        };

        // parses http://draft.ortc.org/#rtcrtcpparameters*
        SDPUtils.parseRtcpParameters = function (mediaSection) {
          var rtcpParameters = {};

          // Gets the first SSRC. Note tha with RTX there might be multiple
          // SSRCs.
          var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (obj) {
            return obj.attribute === 'cname';
          })[0];
          if (remoteSsrc) {
            rtcpParameters.cname = remoteSsrc.value;
            rtcpParameters.ssrc = remoteSsrc.ssrc;
          }

          // Edge uses the compound attribute instead of reducedSize
          // compound is !reducedSize
          var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
          rtcpParameters.reducedSize = rsize.length > 0;
          rtcpParameters.compound = rsize.length === 0;

          // parses the rtcp-mux attrіbute.
          // Note that Edge does not support unmuxed RTCP.
          var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
          rtcpParameters.mux = mux.length > 0;

          return rtcpParameters;
        };

        // parses either a=msid: or a=ssrc:... msid lines and returns
        // the id of the MediaStream and MediaStreamTrack.
        SDPUtils.parseMsid = function (mediaSection) {
          var parts;
          var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
          if (spec.length === 1) {
            parts = spec[0].substr(7).split(' ');
            return { stream: parts[0], track: parts[1] };
          }
          var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (msidParts) {
            return msidParts.attribute === 'msid';
          });
          if (planB.length > 0) {
            parts = planB[0].value.split(' ');
            return { stream: parts[0], track: parts[1] };
          }
        };

        // Generate a session ID for SDP.
        // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
        // recommends using a cryptographically random +ve 64-bit value
        // but right now this should be acceptable and within the right range
        SDPUtils.generateSessionId = function () {
          return Math.random().toString().substr(2, 21);
        };

        // Write boilder plate for start of SDP
        // sessId argument is optional - if not supplied it will
        // be generated randomly
        // sessVersion is optional and defaults to 2
        // sessUser is optional and defaults to 'thisisadapterortc'
        SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
          var sessionId;
          var version = sessVer !== undefined ? sessVer : 2;
          if (sessId) {
            sessionId = sessId;
          } else {
            sessionId = SDPUtils.generateSessionId();
          }
          var user = sessUser || 'thisisadapterortc';
          // FIXME: sess-id should be an NTP timestamp.
          return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
        };

        SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
          var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

          // Map ICE parameters (ufrag, pwd) to SDP.
          sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

          // Map DTLS parameters to SDP.
          sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');

          sdp += 'a=mid:' + transceiver.mid + '\r\n';

          if (transceiver.direction) {
            sdp += 'a=' + transceiver.direction + '\r\n';
          } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
            sdp += 'a=sendrecv\r\n';
          } else if (transceiver.rtpSender) {
            sdp += 'a=sendonly\r\n';
          } else if (transceiver.rtpReceiver) {
            sdp += 'a=recvonly\r\n';
          } else {
            sdp += 'a=inactive\r\n';
          }

          if (transceiver.rtpSender) {
            // spec.
            var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
            sdp += 'a=' + msid;

            // for Chrome.
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
            if (transceiver.sendEncodingParameters[0].rtx) {
              sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
              sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
            }
          }
          // FIXME: this should be written by writeRtpDescription.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          }
          return sdp;
        };

        // Gets the direction from the mediaSection or the sessionpart.
        SDPUtils.getDirection = function (mediaSection, sessionpart) {
          // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
          var lines = SDPUtils.splitLines(mediaSection);
          for (var i = 0; i < lines.length; i++) {
            switch (lines[i]) {
              case 'a=sendrecv':
              case 'a=sendonly':
              case 'a=recvonly':
              case 'a=inactive':
                return lines[i].substr(2);
              default:
              // FIXME: What should happen here?
            }
          }
          if (sessionpart) {
            return SDPUtils.getDirection(sessionpart);
          }
          return 'sendrecv';
        };

        SDPUtils.getKind = function (mediaSection) {
          var lines = SDPUtils.splitLines(mediaSection);
          var mline = lines[0].split(' ');
          return mline[0].substr(2);
        };

        SDPUtils.isRejected = function (mediaSection) {
          return mediaSection.split(' ', 2)[1] === '0';
        };

        SDPUtils.parseMLine = function (mediaSection) {
          var lines = SDPUtils.splitLines(mediaSection);
          var parts = lines[0].substr(2).split(' ');
          return {
            kind: parts[0],
            port: parseInt(parts[1], 10),
            protocol: parts[2],
            fmt: parts.slice(3).join(' ')
          };
        };

        SDPUtils.parseOLine = function (mediaSection) {
          var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
          var parts = line.substr(2).split(' ');
          return {
            username: parts[0],
            sessionId: parts[1],
            sessionVersion: parseInt(parts[2], 10),
            netType: parts[3],
            addressType: parts[4],
            address: parts[5]
          };
        };

        // a very naive interpretation of a valid SDP.
        SDPUtils.isValidSDP = function (blob) {
          if (typeof blob !== 'string' || blob.length === 0) {
            return false;
          }
          var lines = SDPUtils.splitLines(blob);
          for (var i = 0; i < lines.length; i++) {
            if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
              return false;
            }
            // TODO: check the modifier a bit more.
          }
          return true;
        };

        // Expose public methods.
        if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
          module.exports = SDPUtils;
        }
      }, {}] }, {}, [1])(1);
  }

  var init = function init() {
    window.adapter = Adapter();
  };

  var RTCAdapter = {
    init: init
  };

  function ReportHandler(im) {
    var pc = null,
        reportTimer = 0;

    var TrackCache = utils.Cache();
    var TrackStateCache = utils.Cache();
    var setTrackCache = function setTrackCache(stream, user) {
      var tracks = stream.getTracks();
      var id = user.id,
          tag = user.stream.tag;

      utils.forEach(tracks, function (_ref) {
        var trackId = _ref.id;

        TrackCache.set(trackId, {
          id: id,
          stream: { tag: tag }
        });
      });
    };
    var getAudioLevel = function getAudioLevel(level) {
      level = level || 0;
      var index = Math.floor(level / 1000);
      if (index >= AUDIO_LEVEL.length) {
        index = 0;
      }
      return AUDIO_LEVEL[index];
    };
    var resourceHandler = function resourceHandler(stat) {
      var trackId = stat.googTrackId,
          mediaType = stat.mediaType;

      if (utils.isEqual(mediaType, 'audio')) {
        // 不区分 Input、Output 最终对应用层按 user 暴露
        var audioLevel = stat['audioOutputLevel'] || stat['audioInputLevel'];
        audioLevel = getAudioLevel(audioLevel);
        var latestLevel = TrackStateCache.get(trackId);
        if (!utils.isEqual(latestLevel, audioLevel)) {
          var user = TrackCache.get(trackId);
          utils.extend(user.stream, {
            audioLevel: audioLevel
          });
          TrackStateCache.set(trackId, audioLevel);
          im.emit(DownEvent.REPORT_SPOKE, user);
        }
      }
    };
    var statsHandler = function statsHandler(stats) {
      utils.forEach(stats, function (stat) {
        var type = stat.type;

        if (utils.isInclude(type, 'ssrc')) {
          resourceHandler(stat);
        }
      });
    };
    var clear = function clear() {
      clearInterval(reportTimer);
    };
    im.on(CommonEvent.PEERCONN_CREATED, function (error, _pc) {
      if (error) {
        throw error;
      }
      pc = _pc;
    });
    im.on(CommonEvent.LEFT, function () {
      TrackCache.clear();
      TrackStateCache.clear();
      clear();
    });
    im.on(CommonEvent.PUBLISHED_STREAM, function (error, data) {
      if (error) {
        throw error;
      }
      var mediaStream = data.mediaStream,
          user = data.user;

      setTrackCache(mediaStream, user);
    });

    var start = function start(_option) {
      var option = {
        frequency: REPORT_FREQUENCY
      };
      if (utils.isObject(_option)) {
        utils.extend(option, _option);
      }
      if (isSafari()) {
        return;
      }
      if (reportTimer) {
        clear();
      }
      reportTimer = setInterval(function () {
        if (!pc) {
          return clear();
        }
        pc.getStats(function (stats) {
          statsHandler(stats);
        });
      }, option.frequency);
      return utils.Defer.resolve();
    };
    var stop = function stop() {
      clear();
      return utils.Defer.resolve();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.REPORT_START:
          return start.apply(undefined, toConsumableArray(args));
        case UpEvent.REPORT_STOP:
          return stop.apply(undefined, toConsumableArray(args));
      }
    };
    return {
      dispatch: dispatch
    };
  }

  var Client = function (_EventEmitter) {
    inherits(Client, _EventEmitter);

    /* 
      let option = {
        url: 'mediaServer path',
        RongIMLib
      };
    */
    function Client(option) {
      classCallCheck(this, Client);

      var _this = possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this));

      RTCAdapter.init();
      var im = new IM(option);
      var RequestHandler = {
        room: RoomHandler(im, option),
        stream: StreamHandler(im, option),
        storage: StorageHandler(im),
        message: MessageHandler(im),
        device: DeviceHandler(im),
        report: ReportHandler(im)
      };
      var context = _this;
      var RongIMLib = option.RongIMLib;

      var destroyed = false;
      utils.extend(context, {
        RongIMLib: RongIMLib,
        option: option,
        destroyed: destroyed,
        im: im,
        RequestHandler: RequestHandler
      });
      var bindEvent = function bindEvent(event) {
        var name = event.name;

        im.on(name, function (error, user) {
          context.emit(name, user, error);
        });
      };
      utils.forEach(RoomEvents, bindEvent);
      im.on(CommonEvent.JOINED, function () {
        var url = im.getMSUrl();
        if (utils.isUndefined(url)) {
          var Inner = ErrorType.Inner;

          var error = Inner.ENGINE_ERROR;
          return context.emit(DownEvent.RTC_ERROR, error);
        }
        var customUrl = option.url;

        url = customUrl || url;
        request$2.setOption({
          url: url
        });
        context.emit(DownEvent.RTC_MOUNTED);
      });
      im.on(CommonEvent.LEFT, function () {
        context.emit(DownEvent.RTC_UNMOUNTED);
      });
      im.on(CommonEvent.ERROR, function (error, data) {
        context.emit(DownEvent.RTC_ERROR, data, error);
      });
      im.on(DownEvent.MESSAGE_RECEIVED, function (error, message) {
        context.emit(DownEvent.MESSAGE_RECEIVED, message, error);
      });
      im.on(DownEvent.REPORT_SPOKE, function (error, user) {
        context.emit(DownEvent.REPORT_SPOKE, user, error);
      });
      var getMSType = function getMSType(uris) {
        var check = function check(msType) {
          return utils.some(uris, function (_ref) {
            var mediaType = _ref.mediaType;

            // return utils.isEqual(msType, mediaType) && utils.isEqual(state, StreamState.ENABLE);
            // 只区分 track 不区分
            return utils.isEqual(msType, mediaType);
          });
        };
        var type = StreamType.NODE;
        var hasAudio = check(StreamType.AUDIO);
        var hasVideo = check(StreamType.VIDEO);
        if (hasAudio) {
          type = StreamType.AUDIO;
        }
        if (hasVideo) {
          type = StreamType.VIDEO;
        }
        if (hasVideo && hasAudio) {
          type = StreamType.AUDIO_AND_VIDEO;
        }
        return type;
      };
      var eventHandler = function eventHandler(name, result, error) {
        var id = result.id,
            _result$stream = result.stream,
            tag = _result$stream.tag,
            uris = _result$stream.uris;

        var type = getMSType(uris);
        var user = {
          id: id,
          stream: {
            tag: tag,
            type: type
          }
        };
        context.emit(name, user, error);
      };
      im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_PUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNPUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_DISABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_DISABLED, user, error);
      });
      im.on(DownEvent.STREAM_ENABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_ENABLED, user, error);
      });
      im.on(DownEvent.STREAM_MUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_MUTED, user, error);
      });
      im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNMUTED, user, error);
      });
      return _this;
    }

    createClass(Client, [{
      key: 'exec',
      value: function exec(params) {
        var context = this;
        var im = context.im;

        if (context.isDestroyed()) {
          return utils.Defer.reject(ErrorType.Inner.INSTANCE_IS_DESTROYED);
        }
        if (!im.isSupportRTC()) {
          return utils.Defer.reject(ErrorType.Inner.IM_SDK_VER_NOT_MATCH);
        }
        var type = params.type,
            args = params.args,
            event = params.event;

        var APIWhitelist = [UpEvent.ROOM_JOIN, UpEvent.DEVICE_GET, UpEvent.STREAM_GET];
        var isInclude = utils.isInclude(APIWhitelist, event);

        if (!im.isIMReady() && !isInclude) {
          return utils.Defer.reject(ErrorType.Inner.IM_NOT_CONNECTED);
        }

        if (!isInclude && !im.isJoined()) {
          return utils.Defer.reject(ErrorType.Inner.RTC_NOT_JOIN_ROOM);
        }
        var RequestHandler = this.RequestHandler;

        Logger$1.log(type, {
          func: event,
          type: EventType.REQUEST,
          args: args
        });
        return RequestHandler[type].dispatch(event, args).then(function (result) {
          Logger$1.log(type, {
            func: event,
            type: EventType.RESPONSE,
            result: result
          });
          return result;
        }, function (error) {
          Logger$1.error(type, {
            func: event,
            type: EventType.RESPONSE,
            error: error
          });
          error = utils.rename(error, {
            resultCode: 'code'
          });
          throw error;
        });
      }
    }, {
      key: 'isDestroyed',
      value: function isDestroyed() {
        return this.destroyed;
      }
    }, {
      key: 'extendOption',
      value: function extendOption(_option) {
        var context = this;
        utils.extend(context.option, _option);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var context = this;
        utils.extend(context, {
          destroyed: true
        });
        context.teardown();
        context.im.teardown();
      }
    }]);
    return Client;
  }(EventEmitter);

  var Storage = function () {
    function Storage(_option) {
      classCallCheck(this, Storage);

      _option = _option || {};
      var context = this;
      var client = context.getClient();
      var option = {
        type: StorageType.ROOM
      };
      utils.extend(option, _option);
      utils.extend(context, {
        option: option,
        client: client
      });
    }

    createClass(Storage, [{
      key: 'set',
      value: function set$$1(key, value, message) {
        var _check = check({ key: key, value: value }, ['key', 'value']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_SET,
          type: 'storage',
          args: [type, key, value, message]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(key) {
        var _check2 = check({ key: key }, ['key']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_GET,
          type: 'storage',
          args: [type, key]
        });
      }
    }, {
      key: 'remove',
      value: function remove(key, message) {
        var _check3 = check({ key: key }, ['key']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_REMOVE,
          type: 'storage',
          args: [type, key, message]
        });
      }
    }]);
    return Storage;
  }();

  var Message$1 = function () {
    function Message(_option) {
      classCallCheck(this, Message);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(MessageEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, message) {
          event = option[type] || utils.noop;
          event(message, error);
          Logger$1.log(LogTag.MESSAGE, {
            event: type,
            message: message
          });
        });
      });
    }

    createClass(Message, [{
      key: 'send',
      value: function send(message) {
        var _check = check(message, ['name', 'content']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client;

        return client.exec({
          event: UpEvent.MESSAGE_SEND,
          type: 'message',
          args: [message]
        });
      }
    }]);
    return Message;
  }();

  var Device = function () {
    function Device() {
      classCallCheck(this, Device);

      var context = this;
      var client = context.getClient();
      utils.extend(context, {
        client: client
      });
    }

    createClass(Device, [{
      key: 'get',
      value: function get$$1() {
        var client = this.client;

        return client.exec({
          event: UpEvent.DEVICE_GET,
          type: 'device',
          args: []
        });
      }
    }]);
    return Device;
  }();

  var Report = function () {
    function Report(_option) {
      classCallCheck(this, Report);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(ReportEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, report) {
          event = option[type] || utils.noop;
          event(report, error);
        });
      });
    }

    createClass(Report, [{
      key: 'start',
      value: function start(option) {
        var client = this.client;

        return client.exec({
          event: UpEvent.REPORT_START,
          type: 'report',
          args: [option]
        });
      }
    }, {
      key: 'stop',
      value: function stop() {
        var client = this.client;

        return client.exec({
          event: UpEvent.REPORT_STOP,
          type: 'report',
          args: []
        });
      }
    }]);
    return Report;
  }();

  var RongRTC = function () {
    function RongRTC(_option) {
      classCallCheck(this, RongRTC);

      var context = this;
      var option = {
        url: '',
        debug: false,
        bitrate: {
          max: 1000,
          min: 100,
          start: 300
        },
        created: function created() {},
        mounted: function mounted() {},
        unmounted: function unmounted() {},
        destroyed: function destroyed() {},
        error: function error() {}
      };
      utils.extend(option, _option);
      var logger = option.logger,
          debug = option.debug;
      var Outer = ErrorType.Outer;

      if (utils.isFunction(logger)) {
        Logger$1.watch(logger, true);
      }
      if (debug) {
        Logger$1.watch(function (log) {
          utils.Log.log(log);
        });
      }
      var client = new Client(option);
      utils.forEach([Room, Stream, Storage, Message$1, Device, Report], function (module) {
        module.prototype.getClient = function () {
          return client;
        };
      });
      utils.extend(context, {
        Room: Room,
        Stream: Stream,
        Storage: Storage,
        StreamType: StreamType,
        StreamSize: StreamSize,
        StorageType: StorageType,
        Message: Message$1,
        Device: Device,
        Report: Report,
        ErrorType: Outer,
        option: option,
        client: client
      });
      var created = option.created,
          mounted = option.mounted,
          unmounted = option.unmounted,
          error = option.error;

      created();
      Logger$1.log(LogTag.LIFECYCLE, {
        state: 'created'
      });
      client.on(DownEvent.RTC_MOUNTED, function () {
        mounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'mounted'
        });
      });
      client.on(DownEvent.RTC_UNMOUNTED, function () {
        unmounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'unmounted'
        });
      });
      client.on(DownEvent.RTC_ERROR, function (e, data) {
        if (e) {
          throw new Error(e);
        }
        error(data);
      });
    }

    createClass(RongRTC, [{
      key: 'destroy',
      value: function destroy() {
        var destroyed = this.option.destroyed,
            client = this.client;

        destroyed();
        client.destroy();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'destroyed'
        });
      }
    }]);
    return RongRTC;
  }();

  return RongRTC;

})));
