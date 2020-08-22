/*
* RongIMLib.js v3.0.5-dev
* CodeVersion: 03caf1eb0aea5d9db625b9b939e52338de427ba1
* Release Date: Wed Aug 12 2020 19:04:27 GMT+0800 (China Standard Time)
* Copyright 2020 RongCloud
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RongIMLib = factory());
}(this, (function () { 'use strict';

  var versionToServer = "3.0.5";

  var SDK_VERSION = versionToServer;

  var ERROR_INFO = {
    TIMEOUT: {
      code: -1,
      msg: 'Network timeout'
    },
    SDK_INTERNAL_ERROR: {
      code: -2,
      msg: 'SDK internal error'
    },
    PARAMETER_ERROR: {
      code: -3,
      msg: 'Please check the parameters, the {param} expected a value of {expect} but received {current}'
    },
    REJECTED_BY_BLACKLIST: {
      code: 405,
      msg: 'Blacklisted by the other party'
    },
    SEND_TOO_FAST: {
      code: 20604,
      msg: 'Sending messages too quickly'
    },
    NOT_IN_GROUP: {
      code: 22406,
      msg: 'Not in group'
    },
    FORBIDDEN_IN_GROUP: {
      code: 22408,
      msg: 'Forbbiden from speaking in the group'
    },
    NOT_IN_CHATROOM: {
      code: 23406,
      msg: 'Not in chatRoom'
    },
    FORBIDDEN_IN_CHATROOM: {
      code: 23408,
      msg: 'Forbbiden from speaking in the chatRoom'
    },
    KICKED_FROM_CHATROOM: {
      code: 23409,
      msg: 'Kicked out and forbbiden from joining the chatRoom'
    },
    CHATROOM_NOT_EXIST: {
      code: 23410,
      msg: 'ChatRoom does not exist'
    },
    CHATROOM_IS_FULL: {
      code: 23411,
      msg: 'ChatRoom members exceeded'
    },
    PARAMETER_INVALID_CHATROOM: {
      code: 23412,
      msg: 'Invalid chatRoom parameters'
    },
    ROAMING_SERVICE_UNAVAILABLE_CHATROOM: {
      code: 23414,
      msg: 'ChatRoom message roaming service is not open, Please go to the developer to open this service'
    },
    RECALLMESSAGE_PARAMETER_INVALID: {
      code: 25101,
      msg: 'Invalid recall message parameter'
    },
    PUSHSETTING_PARAMETER_INVALID: {
      code: 26001,
      msg: 'Invalid push parameter'
    },
    OPERATION_BLOCKED: {
      code: 20605,
      msg: 'Operation is blocked'
    },
    OPERATION_NOT_SUPPORT: {
      code: 20606,
      msg: 'Operation is not supported'
    },
    MSG_BLOCKED_SENSITIVE_WORD: {
      code: 21501,
      msg: 'The sent message contains sensitive words'
    },
    REPLACED_SENSITIVE_WORD: {
      code: 21502,
      msg: 'Sensitive words in the message have been replaced'
    },
    NOT_CONNECTED: {
      code: 30001,
      msg: 'Please connect successfully first'
    },
    NAVI_REQUEST_ERROR: {
      code: 30007,
      msg: 'Navigation http request failed'
    },
    CMP_REQUEST_ERROR: {
      code: 30010,
      msg: 'CMP sniff http request failed'
    },
    CONN_APPKEY_FAKE: {
      code: 31002,
      msg: 'Your appkey is fake'
    },
    CONN_MINI_SERVICE_NOT_OPEN: {
      code: 31003,
      msg: 'Mini program service is not open, Please go to the developer to open this service'
    },
    CONN_TOKEN_INCORRECT: {
      code: 31004,
      msg: 'Your token is not valid or expired'
    },
    CONN_NOT_AUTHRORIZED: {
      code: 31005,
      msg: 'AppKey and Token do not match'
    },
    CONN_REDIRECTED: {
      code: 31006,
      msg: 'Connection redirection'
    },
    CONN_APP_BLOCKED_OR_DELETED: {
      code: 31008,
      msg: 'AppKey is banned or deleted'
    },
    CONN_USER_BLOCKED: {
      code: 31009,
      msg: 'User blocked'
    },
    CONN_DOMAIN_INCORRECT: {
      code: 31012,
      msg: 'Connect domain error, Please check the set security domain'
    },
    ROAMING_SERVICE_UNAVAILABLE: {
      code: 33007,
      msg: 'Roaming service cloud is not open, Please go to the developer to open this service'
    },
    RC_CONNECTION_EXIST: {
      code: 34001,
      msg: 'Connection already exists'
    },
    CHATROOM_KV_EXCEED: {
      code: 23423,
      msg: 'ChatRoom KV setting exceeds maximum'
    },
    CHATROOM_KV_OVERWRITE_INVALID: {
      code: 23424,
      msg: 'ChatRoom KV already exists'
    },
    CHATROOM_KV_STORE_NOT_OPEN: {
      code: 23426,
      msg: 'ChatRoom KV storage service is not open, Please go to the developer to open this service'
    },
    CHATROOM_KEY_NOT_EXIST: {
      code: 23427,
      msg: 'ChatRoom key does not exist'
    }
  };
  var ERROR_CODE = {};
  var ERROR_CODE_TO_INFO = {};

  for (var name$1 in ERROR_INFO) {
    var info = ERROR_INFO[name$1];
    var code = info.code;
    ERROR_CODE[name$1] = code;
    ERROR_CODE[code] = name$1;
    ERROR_CODE_TO_INFO[code] = info;
  }

  var SERVER_ERROR_TO_CODE = {
    '1': ERROR_INFO.ROAMING_SERVICE_UNAVAILABLE.code
  };

  var _CONNECT_SERVER_STATU, _SERVER_DISCONNECT_ST, _TRANSPORTER_STATUS_T;
  var NAVI_ERROR_INFO = {
    '401': ERROR_INFO.CONN_TOKEN_INCORRECT,
    '403': ERROR_INFO.CONN_APPKEY_FAKE
  };
  var CONNECTION_STATUS = {
    CONNECTED: 0,
    CONNECTING: 1,
    DISCONNECTED: 2,
    NETWORK_UNAVAILABLE: 3,
    SOCKET_ERROR: 4,
    KICKED_OFFLINE_BY_OTHER_CLIENT: 6,
    BLOCKED: 12
  };
  var SERVER_DISCONNECT_STATUS = {
    KICKED_OFFLINE_BY_OTHER_CLIENT: 1,
    BLOCKED: 2
  };
  var CONNECT_SERVER_STATUS = {
    IDENTIFIER_REJECTED: 2,
    CONN_MINI_SERVICE_NOT_OPEN: 3,
    TOKEN_INCORRECT: 4,
    NOT_AUTHORIZED: 5,
    REDIRECT: 6,
    PACKAGE_ERROR: 7,
    APP_BLOCK_OR_DELETE: 8,
    BLOCK: 9,
    TOKEN_EXPIRE: 10,
    DEVICE_ERROR: 11,
    DOMAIN_INCORRECT: 12
  };
  var CONNECT_SERVER_STATUS_MAP_ERROR_INFO = (_CONNECT_SERVER_STATU = {}, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.IDENTIFIER_REJECTED] = ERROR_INFO.CONN_APPKEY_FAKE, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.CONN_MINI_SERVICE_NOT_OPEN] = ERROR_INFO.CONN_MINI_SERVICE_NOT_OPEN, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.TOKEN_INCORRECT] = ERROR_INFO.CONN_TOKEN_INCORRECT, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.NOT_AUTHORIZED] = ERROR_INFO.CONN_NOT_AUTHRORIZED, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.REDIRECT] = ERROR_INFO.CONN_REDIRECTED, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.APP_BLOCK_OR_DELETE] = ERROR_INFO.CONN_APP_BLOCKED_OR_DELETED, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.BLOCK] = ERROR_INFO.CONN_USER_BLOCKED, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.TOKEN_EXPIRE] = ERROR_INFO.CONN_TOKEN_INCORRECT, _CONNECT_SERVER_STATU[CONNECT_SERVER_STATUS.DOMAIN_INCORRECT] = ERROR_INFO.CONN_DOMAIN_INCORRECT, _CONNECT_SERVER_STATU);
  var TRANSPORTER_STATUS = {
    CONNECTED: CONNECTION_STATUS.CONNECTED,
    KICKED_OFFLINE_BY_OTHER_CLIENT: CONNECTION_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT,
    BLOCKED: CONNECTION_STATUS.BLOCKED,
    CLOSE_NORMAL: 1000,
    CLOSE_GOING_AWAY: 1001,
    CLOSE_PROTOCOL_ERROR: 1002,
    CLOSE_UNSUPPORTED: 1003,
    CLOSE_NO_STATUS: 1005,
    CLOSE_ABNORMAL: 1006,
    UNSUPPORTED_DATA: 1007,
    POLICY_VIOLATION: 1008,
    CLOSE_TOO_LARGE: 1009,
    MISSING_EXTENSION: 1010,
    INTERNAL_ERROR: 1011,
    SERVICE_RESTART: 1012,
    TRY_AGAIN_LATER: 1013,
    TSL_HANDSHAKE: 1015,
    PING_FIRST_TIMEOUT: 2001,
    PING_TIMEOUT: 2002,
    DISCONNECT_TOO_FAST: 2003,
    EXCEED_MESSAGE_ID_LIMIT: 2004,
    COMET_REQUEST_ERROR: 2005,
    MINI_URL_NOT_IN_DOMAIN_LIST: 2006
  };
  var MINI_ERROR_MSG_TO_STATUS = {
    'url not in domain list': TRANSPORTER_STATUS.MINI_URL_NOT_IN_DOMAIN_LIST
  };
  var SERVER_DISCONNECT_STATUS_TO_TRANSPORTER_STATUS = (_SERVER_DISCONNECT_ST = {}, _SERVER_DISCONNECT_ST[SERVER_DISCONNECT_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT] = TRANSPORTER_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT, _SERVER_DISCONNECT_ST[SERVER_DISCONNECT_STATUS.BLOCKED] = TRANSPORTER_STATUS.BLOCKED, _SERVER_DISCONNECT_ST);
  var TRANSPORTER_STATUS_NEED_UPDATE_CMP = [TRANSPORTER_STATUS.CLOSE_NORMAL, TRANSPORTER_STATUS.CLOSE_GOING_AWAY, TRANSPORTER_STATUS.CLOSE_PROTOCOL_ERROR, TRANSPORTER_STATUS.CLOSE_UNSUPPORTED, TRANSPORTER_STATUS.UNSUPPORTED_DATA, TRANSPORTER_STATUS.POLICY_VIOLATION, TRANSPORTER_STATUS.MISSING_EXTENSION, TRANSPORTER_STATUS.INTERNAL_ERROR, TRANSPORTER_STATUS.SERVICE_RESTART, TRANSPORTER_STATUS.TRY_AGAIN_LATER, TRANSPORTER_STATUS.TSL_HANDSHAKE, TRANSPORTER_STATUS.PING_FIRST_TIMEOUT, TRANSPORTER_STATUS.DISCONNECT_TOO_FAST, TRANSPORTER_STATUS.COMET_REQUEST_ERROR];
  var TRANSPORTER_STATUS_NEED_RECONNECT = TRANSPORTER_STATUS_NEED_UPDATE_CMP.concat([TRANSPORTER_STATUS.PING_TIMEOUT, TRANSPORTER_STATUS.CLOSE_ABNORMAL, TRANSPORTER_STATUS.EXCEED_MESSAGE_ID_LIMIT, TRANSPORTER_STATUS.COMET_REQUEST_ERROR]);
  var TRANSPORTER_STATUS_TO_CONNECTION_STATUS = (_TRANSPORTER_STATUS_T = {}, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.CLOSE_GOING_AWAY] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.CLOSE_PROTOCOL_ERROR] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.CLOSE_UNSUPPORTED] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.CLOSE_NO_STATUS] = CONNECTION_STATUS.DISCONNECTED, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.CLOSE_ABNORMAL] = CONNECTION_STATUS.NETWORK_UNAVAILABLE, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.DISCONNECT_TOO_FAST] = CONNECTION_STATUS.NETWORK_UNAVAILABLE, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.UNSUPPORTED_DATA] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.POLICY_VIOLATION] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.CLOSE_TOO_LARGE] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.MISSING_EXTENSION] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.INTERNAL_ERROR] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.SERVICE_RESTART] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.TRY_AGAIN_LATER] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.TSL_HANDSHAKE] = CONNECTION_STATUS.SOCKET_ERROR, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.PING_FIRST_TIMEOUT] = CONNECTION_STATUS.NETWORK_UNAVAILABLE, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.PING_TIMEOUT] = CONNECTION_STATUS.NETWORK_UNAVAILABLE, _TRANSPORTER_STATUS_T[TRANSPORTER_STATUS.COMET_REQUEST_ERROR] = CONNECTION_STATUS.NETWORK_UNAVAILABLE, _TRANSPORTER_STATUS_T);

  var CONNECT_TYPE = {
    COMET: 'comet',
    WEBSOCKET: 'websocket'
  };
  var CONVERSATION_TYPE = {
    PRIVATE: 1,
    GROUP: 3,
    CHATROOM: 4,
    CUSTOMER_SERVICE: 5,
    SYSTEM: 6,
    RTC_ROOM: 12
  };
  var MESSAGE_DIRECTION = {
    SEND: 1,
    RECEIVE: 2
  };
  var MESSAGS_TIME_ORDER = {
    DESC: 0,
    ASC: 1
  };
  var CHATROOM_ORDER = {
    ASC: 1,
    DESC: 2
  };
  var RECALL_MESSAGE_TYPE = 'RC:RcCmd';
  var MENTIOND_TYPE = {
    ALL: 1,
    SINGAL: 2
  };
  var MESSAGE_TYPE = {
    TEXT: 'RC:TxtMsg',
    VOICE: 'RC:VcMsg',
    HQ_VOICE: 'RC:HQVCMsg',
    IMAGE: 'RC:ImgMsg',
    GIF: 'RC:GIFMsg',
    RICH_CONTENT: 'RC:ImgTextMsg',
    LOCATION: 'RC:LBSMsg',
    FILE: 'RC:FileMsg',
    SIGHT: 'RC:SightMsg',
    COMBINE: 'RC:CombineMsg',
    CHRM_KV_NOTIFY: 'RC:chrmKVNotiMsg',
    LOG_COMMAND: 'RC:LogCmdMsg'
  };
  var RTC_API_TYPE = {
    ROOM: 1,
    PERSON: 2
  };
  var FILE_TYPE = {
    IMAGE: 1,
    AUDIO: 2,
    VIDEO: 3,
    FILE: 4
  };
  var CHATROOM_ENTRY_TYPE = {
    UPDATE: 1,
    DELETE: 2
  };
  var NOTIFICATION_STATUS = {
    DO_NOT_DISTURB: 1,
    NOTIFY: 2
  };
  var product = {
    CONNECT_TYPE: CONNECT_TYPE,
    CONNECTION_STATUS: CONNECTION_STATUS,
    CONVERSATION_TYPE: CONVERSATION_TYPE,
    MESSAGE_DIRECTION: MESSAGE_DIRECTION,
    MESSAGS_TIME_ORDER: MESSAGS_TIME_ORDER,
    CHATROOM_ORDER: CHATROOM_ORDER,
    RECALL_MESSAGE_TYPE: RECALL_MESSAGE_TYPE,
    MESSAGE_TYPE: MESSAGE_TYPE,
    MENTIOND_TYPE: MENTIOND_TYPE,
    SDK_VERSION: SDK_VERSION,
    FILE_TYPE: FILE_TYPE,
    CHATROOM_ENTRY_TYPE: CHATROOM_ENTRY_TYPE,
    NOTIFICATION_STATUS: NOTIFICATION_STATUS
  };

  var IM_TIMEOUT = 30000;
  var IM_PING_INTERVAL_TIME = 30000;
  var IM_COMET_PULLMSG_TIMEOUT = 45000;
  var IM_PING_MAX_TIMEOUT = 6000;
  var IM_PING_MIN_TIMEOUT = 2000;
  var PULL_MSG_TIME = 180000;
  var NAVI_EXPIRED_TIME = 7200000;
  var CMP_SNIFF_INTERNAL_TIME = 1000;
  var FIRST_PING_TIMEOUT = 1000;
  var NAVI_REQUEST_SUCCESS_CODE = 200;
  var NAVI_SEPARATOR_IN_TOKEN = '@';
  var DOMAIN_SEPARATOR_IN_NAVLIST = ';';
  var DOMAIN_SEPARATOR_IN_CMPLIST = ',';
  var MAX_SINGAL_ID = 65535;
  var MINIMUM_CONNECT_DURATION = 5000;
  var CHATROOM_KEY_LENGTH = {
    MAX: 128,
    MIN: 1
  };
  var CHATROOM_VALUE_LENGTH = {
    MAX: 4096,
    MIN: 1
  };
  var TYPE_HAS_CONVERSATION = [CONVERSATION_TYPE.PRIVATE, CONVERSATION_TYPE.GROUP, CONVERSATION_TYPE.SYSTEM];
  var PLATFORM = {
    WEB: 'web',
    WX: 'wx',
    ZFB: 'zfb',
    TT: 'tt',
    BAIDU: 'baidu',
    QUICK_APP: 'quick_app',
    UNI: 'uni'
  };
  var REQUEST_METHOD = {
    POST: 'post',
    GET: 'get'
  };
  var STORAGE_ROOT_KEY = 'rc-';
  var STORAGE_DEVICE_ID_KEY = STORAGE_ROOT_KEY + 'deviceId';
  var STORAGE_SESSION_ID_KEY = STORAGE_ROOT_KEY + 'sessionId';
  var STORAGE_NAVI = {
    ROOT_KEY_TPL: 'nav-{appkey}-{UID}',
    SUB_KEY: {
      CONNECT_TYPE: 'connettype',
      TIME_WHEN_SAVED: 'time',
      RESPONSE: 'resp'
    }
  };
  var STORAGE_SYNC_TIME = {
    ROOT_KEY_TPL: 'sync-{appkey}-{userId}',
    SUB_KEY: {
      SENDBOX: 'send',
      INBOX: 'in'
    }
  };
  var SESSION_SYNC_TIME = {
    ROOT_KEY_TPL: 'sync-{appkey}-{userId}',
    SUB_KEY: {
      TIME: 't'
    }
  };
  var STORAGE_CONVERSATION = {
    ROOT_KEY_TPL: 'con-{appkey}-{userId}',
    SUB_KEY: {
      ROOT_TPL: '{type}-{id}',
      UNREAD_COUNT: 'c',
      UNREAD_LAST_TIME: 't',
      HAS_MENTIOND: 'hm',
      MENTIOND_INFO: 'm',
      NOTIFICATION: 'no',
      TOP: 'to'
    }
  };
  var STORAGE_CONVERSATION_STATUS = {
    ROOT_KEY_TPL: 'con-s-{appkey}-{userId}',
    SUB_KEY: {
      TIME: 't'
    }
  };
  var STORAGE_USER_SETTING = {
    ROOT_KEY_TPL: 'sett-{appkey}-{userId}',
    SUB_KEY: {
      VERSION: 'v',
      SETTINGS: 's'
    }
  };
  var HTTP_PROTOCOL = {
    HTTP: 'http:',
    HTTPS: 'https:',
    FILE: 'file:'
  };
  var WS_PROTOCOL = {
    WSS: 'wss:',
    WS: 'ws:'
  };
  var NAVI_CALLBACK_NAME = 'getServerEndpoint';
  var NAVI_TYPE = {
    COMET: 'cometnavi',
    WEBSOCKET: 'navi'
  };
  var NAVI_URL_TPL = '{url}/{type}.js?appId={appkey}&token={token}&callBack=' + NAVI_CALLBACK_NAME + '&r={random}&v=' + SDK_VERSION;
  var CMP_URL_TPL = '{protocol}//{domain}/websocket?appId={appkey}&token={token}&apiVer={apiVer}&sdkVer=' + SDK_VERSION;
  var MINI_CMP_URL_TPL = '{protocol}//{domain}/websocket?appId={appkey}&token={token}&apiVer={apiVer}&sdkVer=' + SDK_VERSION + '&platform={platform}';
  var COMET_REQ_HAS_TOPIC_URL_TPL = '{protocol}//{domain}/websocket?messageid={messageId}&header={headerCode}&sessionid={sessionId}&topic={topic}&targetid={targetId}&pid={pid}';
  var COMET_REQ_NO_TOPIC_URL_TPL = '{protocol}//{domain}/websocket?messageid={messageId}&header={headerCode}&sessionid={sessionId}&pid={pid}';
  var COMET_PULL_URL_TPL = '{protocol}//{domain}/pullmsg.js?sessionid={sessionId}&timestrap={timestamp}&pid={pid}';
  var TIMER_TYPE = {
    INTERVAL: 'interval',
    TIMEOUT: 'timeout'
  };
  var TIMER_STATUS = {
    PENNDING: 'pendding',
    BUSY: 'busy',
    ENDING: 'ending'
  };
  var PLATFORM_TYPE = {
    MINI: 'MiniProgram',
    WEB: 'Web'
  };
  var SESSION_SYNC_CHATROOM = {
    ROOT_KEY_TPL: 'sync-chrm-{appkey}-{userId}'
  };

  var UnKown = 'UnKown';

  var hasMiniBaseEvent = function hasMiniBaseEvent(miniGlobal) {
    var baseMiniEventNames = ['canIUse', 'getSystemInfo'];

    for (var i = 0, max = baseMiniEventNames.length; i < max; i++) {
      var baseEventName = baseMiniEventNames[i];

      if (!miniGlobal[baseEventName]) {
        return false;
      }
    }

    return true;
  };

  var isFromUniappEnv = function isFromUniappEnv() {
    if (typeof uni !== 'undefined' && hasMiniBaseEvent(uni)) {
      return true;
    }

    return false;
  };

  var isFromUniapp = isFromUniappEnv();

  var isAppPlusEnv = function isAppPlusEnv() {
    if (isFromUniapp) {
      var systemInfo = uni.getSystemInfoSync();

      if (['ios', 'android'].includes(systemInfo.platform) && systemInfo.version) {
        return true;
      }
    }

    return false;
  };

  var isAppPlus = isAppPlusEnv();

  var isMiniEnv = function isMiniEnv(global) {
    if (isAppPlus) {
      return false;
    }

    return global !== window;
  };

  var getEnvInfo = function getEnvInfo() {
    if (isAppPlus) {
      return {
        platform: PLATFORM.UNI,
        global: uni
      };
    } else if (typeof swan !== 'undefined' && hasMiniBaseEvent(swan)) {
      return {
        platform: PLATFORM.BAIDU,
        global: swan
      };
    } else if (typeof tt !== 'undefined' && hasMiniBaseEvent(tt)) {
      return {
        platform: PLATFORM.TT,
        global: tt
      };
    } else if (typeof my !== 'undefined' && hasMiniBaseEvent(my)) {
      return {
        platform: PLATFORM.ZFB,
        global: my
      };
    } else if (typeof wx !== 'undefined' && hasMiniBaseEvent(wx) && !navigator) {
      return {
        platform: PLATFORM.WX,
        global: wx
      };
    } else {
      return {
        platform: PLATFORM.WEB,
        global: window
      };
    }
  };

  var getWebSystemInfo = function getWebSystemInfo() {
    var userAgent = navigator.userAgent;
    var version, type;
    var condition = {
      IE: /rv:([\d.]+)\) like Gecko|MSIE ([\d.]+)/,
      Edge: /Edge\/([\d.]+)/,
      Firefox: /Firefox\/([\d.]+)/,
      Opera: /(?:OPERA|OPR).([\d.]+)/,
      WeiXin: /MicroMessenger\/([\d.]+)/,
      QQBrowser: /QQBrowser\/([\d.]+)/,
      Chrome: /Chrome\/([\d.]+)/,
      Safari: /Version\/([\d.]+).*Safari/
    };

    for (var key in condition) {
      if (!condition.hasOwnProperty(key)) continue;
      var browserContent = userAgent.match(condition[key]);

      if (browserContent) {
        type = key;
        version = browserContent[1] || browserContent[2];
        break;
      }
    }

    return {
      model: type || UnKown,
      version: version || UnKown
    };
  };

  var getMiniSystemInfo = function getMiniSystemInfo(global) {
    var systemInfo = global.getSystemInfoSync() || {};
    var model = systemInfo.model,
        brand = systemInfo.brand;

    if (model && brand) {
      model = model + ' ' + brand;
    }

    systemInfo.model = model;
    return systemInfo;
  };

  var getProtocol = function getProtocol(global) {
    var location = global.location || {};
    var isHttp = location.protocol === HTTP_PROTOCOL.HTTP || location.protocol === HTTP_PROTOCOL.FILE;
    var protocol = {
      http: isHttp ? HTTP_PROTOCOL.HTTP : HTTP_PROTOCOL.HTTPS,
      ws: WS_PROTOCOL.WSS
    };

    if (isHttp) {
      protocol.ws = WS_PROTOCOL.WS;
    }

    return protocol;
  };

  var adaptGlobalObjectCreate = function adaptGlobalObjectCreate(global, isMini) {
    if (!isMini && !isAppPlus && !global.Object.create) {
      global.Object.create = function (o, properties) {
        if (typeof o !== 'object' && typeof o !== 'function') throw new TypeError('Object prototype may only be an Object: ' + o);else if (o === null) throw new Error('This browser\'s implementation of Object.create is a shim and doesn\'t support \'null\' as the first argument.');
        if (typeof properties !== 'undefined') throw new Error('This browser\'s implementation of Object.create is a shim and doesn\'t support a second argument.');

        function F() {}

        F.prototype = o;
        return new F();
      };
    }
  };

  var getMiniGlobal = function getMiniGlobal(global) {
    return Object.assign(global, {
      JSON: JSON,
      Promise: Promise,
      setTimeout: setTimeout,
      setInterval: setInterval,
      encodeURIComponent: encodeURIComponent,
      clearTimeout: function (_clearTimeout) {
        function clearTimeout(_x) {
          return _clearTimeout.apply(this, arguments);
        }

        clearTimeout.toString = function () {
          return _clearTimeout.toString();
        };

        return clearTimeout;
      }(function (id) {
        clearTimeout(id);
      }),
      clearInterval: function (_clearInterval) {
        function clearInterval(_x2) {
          return _clearInterval.apply(this, arguments);
        }

        clearInterval.toString = function () {
          return _clearInterval.toString();
        };

        return clearInterval;
      }(function (id) {
        clearInterval(id);
      })
    });
  };

  var envInfo = getEnvInfo();
  var platform = envInfo.platform,
      global$1 = envInfo.global;
  var isMini = isMiniEnv(global$1);
  var protocol = getProtocol(global$1);
  var system = isMini || isAppPlus ? getMiniSystemInfo(global$1) : getWebSystemInfo();
  system.name = platform;
  adaptGlobalObjectCreate(global$1, isMini);
  global$1 = isMini || isAppPlus ? getMiniGlobal(global$1) : global$1;
  var env = {
    global: global$1,
    system: system,
    isMini: isMini,
    protocol: protocol,
    isAppPlus: isAppPlus,
    isFromUniapp: isFromUniapp
  };

  var global$2 = env.global,
      system$1 = env.system;
  var isZFB = system$1.name === PLATFORM.ZFB;

  var ZFBStorage = function () {
    function ZFBStorage() {}

    var _proto = ZFBStorage.prototype;

    _proto.set = function set(key, value) {
      global$2.setStorageSync({
        key: key,
        data: value
      });
    };

    _proto.get = function get(key) {
      return global$2.getStorageSync({
        key: key
      });
    };

    _proto.remove = function remove(key) {
      return global$2.removeStorageSync({
        key: key
      });
    };

    _proto.getKeys = function getKeys() {
      var res = my.getStorageInfoSync();
      return res.keys;
    };

    return ZFBStorage;
  }();

  var MiniStorage = function () {
    function MiniStorage() {}

    var _proto2 = MiniStorage.prototype;

    _proto2.set = function set(key, value) {
      global$2.setStorageSync(key, value);
    };

    _proto2.get = function get(key) {
      try {
        return global$2.getStorageSync(key);
      } catch (e) {
        return null;
      }
    };

    _proto2.remove = function remove(key) {
      try {
        return global$2.removeStorageSync(key);
      } catch (e) {
        return null;
      }
    };

    _proto2.getKeys = function getKeys() {
      try {
        var res = global$2.getStorageInfoSync();
        return res.keys;
      } catch (e) {
        return [];
      }
    };

    return MiniStorage;
  }();

  var storage = isZFB ? ZFBStorage : MiniStorage;

  var JSON$1 = {
    parse: function parse(sJSON) {
      return new Function('', 'return (' + sJSON + ')')();
    },
    stringify: function stringify(value) {
      return JSON$1.str('', {
        '': value
      });
    },
    str: function str(key, holder) {
      var i,
          k,
          v,
          length,
          partial,
          value = holder[key],
          self = JSON$1;

      if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key);
      }

      switch (typeof value) {
        case 'string':
          return self.quote(value);

        case 'number':
          return isFinite(value) ? String(value) : 'null';

        case 'boolean':
          return String(value);

        case 'object':
          if (!value) {
            return 'null';
          }

          partial = [];

          if (Object.prototype.toString.apply(value) === '[object Array]') {
            length = value.length;

            for (i = 0; i < length; i += 1) {
              partial[i] = self.str(i, value) || 'null';
            }

            v = partial.length === 0 ? '[]' : '[' + partial.join(',') + ']';
            return v;
          }

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = self.str(k, value);

              if (v) {
                partial.push(self.quote(k) + ':' + v);
              }
            }
          }

          v = partial.length === 0 ? '{}' : '{' + partial.join(',') + '}';
          return v;
      }
    },
    quote: function quote(string) {
      var self = JSON$1;
      self.rx_escapable.lastIndex = 0;
      return self.rx_escapable.test(string) ? '"' + string.replace(self.rx_escapable, function (a) {
        var c = self.meta[a];
        return typeof c === 'string' ? c : "\\u" + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
    },
    rx_escapable: new RegExp("[\\\"\\\\\"\0-\x1F\x7F-\x9F\xAD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]", 'g'),
    meta: {
      '\b': '\\b',
      '	': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\'\'': '\\\'\'',
      '\\': '\\\\'
    }
  };

  var CacheStorage = function () {
    function CacheStorage(values) {
      this.caches = {};

      if (values) {
        this.caches = values;
      }
    }

    var _proto = CacheStorage.prototype;

    _proto.set = function set(key, value) {
      this.caches[key] = value;
    };

    _proto.remove = function remove(key) {
      var val = this.get(key);
      delete this.caches[key];
      return val;
    };

    _proto.get = function get(key) {
      return this.caches[key];
    };

    _proto.getKeys = function getKeys() {
      var keys = [];

      for (var key in this.caches) {
        keys.push(key);
      }

      return keys;
    };

    return CacheStorage;
  }();

  var global$3 = env.global;
  var TEST_KEY = 'RC_TEST_KEY';
  var TEST_VALUE = 'RC_TEST_VALUE';

  var isSupportLocalStorage = function isSupportLocalStorage() {
    var isSupport = false;
    var localStorage = global$3.localStorage;

    if (localStorage) {
      try {
        localStorage.setItem(TEST_KEY, TEST_VALUE);
        var testVal = localStorage.getItem(TEST_KEY);

        if (testVal === TEST_VALUE) {
          isSupport = true;
        }

        localStorage.removeItem(TEST_KEY);
      } catch (e) {}
    }

    return isSupport;
  };

  var WebStorage = function () {
    function WebStorage() {}

    var _proto = WebStorage.prototype;

    _proto.set = function set(key, value) {
      global$3.localStorage.setItem(key, JSON$1.stringify({
        d: value
      }));
    };

    _proto.get = function get(key) {
      var value;
      var localValue = global$3.localStorage.getItem(key);

      try {
        localValue = JSON$1.parse(localValue);
      } catch (e) {
        localValue = {};
      }

      if (localValue && localValue.d) {
        value = localValue.d;
      }

      return value;
    };

    _proto.remove = function remove(key) {
      return global$3.localStorage.removeItem(key);
    };

    _proto.getKeys = function getKeys() {
      var keyList = [];

      for (var key in global$3.localStorage) {
        keyList.push(key);
      }

      return keyList;
    };

    return WebStorage;
  }();

  var WebStorage$1 = isSupportLocalStorage() ? WebStorage : CacheStorage;

  var isMini$1 = env.isMini,
      isAppPlus$1 = env.isAppPlus;
  var Storage = isMini$1 || isAppPlus$1 ? storage : WebStorage$1,
      storage$1 = new Storage();

  var global$4 = env.global;
  var TEST_KEY$1 = 'RC_TEST_KEY';
  var TEST_VALUE$1 = 'RC_TEST_VALUE';

  var isSupportSessionStorage = function isSupportSessionStorage() {
    var isSupport = false;
    var sessionStorage = global$4.sessionStorage;

    if (sessionStorage) {
      try {
        sessionStorage.setItem(TEST_KEY$1, TEST_VALUE$1);
        var testVal = sessionStorage.getItem(TEST_KEY$1);

        if (testVal === TEST_VALUE$1) {
          isSupport = true;
        }

        sessionStorage.removeItem(TEST_KEY$1);
      } catch (e) {}
    }

    return isSupport;
  };

  var WebSession = function () {
    function WebSession() {}

    var _proto = WebSession.prototype;

    _proto.set = function set(key, value) {
      global$4.sessionStorage.setItem(key, JSON$1.stringify({
        d: value
      }));
    };

    _proto.get = function get(key) {
      var value;
      var localValue = global$4.sessionStorage.getItem(key);

      try {
        localValue = JSON$1.parse(localValue);
      } catch (e) {
        localValue = {};
      }

      if (localValue && localValue.d) {
        value = localValue.d;
      }

      return value;
    };

    _proto.remove = function remove(key) {
      return global$4.sessionStorage.removeItem(key);
    };

    _proto.getKeys = function getKeys() {
      var keyList = [];

      for (var key in global$4.sessionStorage) {
        keyList.push(key);
      }

      return keyList;
    };

    return WebSession;
  }();

  var WebSession$1 = isSupportSessionStorage() ? WebSession : CacheStorage;

  var isMini$2 = env.isMini,
      isAppPlus$2 = env.isAppPlus;
  var Session = isMini$2 || isAppPlus$2 ? CacheStorage : WebSession$1,
      session = new Session();

  var global$5 = env.global,
      isAppPlus$3 = env.isAppPlus;

  var Socket = function () {
    function Socket(options) {
      this.socket = void 0;

      if (isAppPlus$3) {
        options['complete'] = function () {};
      }

      this.socket = global$5.connectSocket(options);
    }

    var _proto = Socket.prototype;

    _proto.send = function send(data) {
      this.socket.send({
        data: data
      });
    };

    _proto.close = function close() {
      this.socket.close();
    };

    _proto.onOpen = function onOpen(callback) {
      this.socket.onOpen(callback);
    };

    _proto.onMessage = function onMessage(callback) {
      this.socket.onMessage(callback);
    };

    _proto.onError = function onError(callback) {
      this.socket.onError(callback);
    };

    _proto.onClose = function onClose(callback) {
      this.socket.onClose(callback);
    };

    return Socket;
  }();

  var Socket$1 = function () {
    function Socket(options) {
      this.socket = void 0;
      var url = options.url;
      this.socket = new WebSocket(url);
      this.socket.binaryType = 'arraybuffer';
      return this;
    }

    var _proto = Socket.prototype;

    _proto.send = function send(data) {
      return this.socket.send(data);
    };

    _proto.close = function close() {
      this.socket.close();
    };

    _proto.onOpen = function onOpen(callback) {
      this.socket.addEventListener('open', callback);
    };

    _proto.onMessage = function onMessage(callback) {
      this.socket.addEventListener('message', callback);
    };

    _proto.onError = function onError(callback) {
      this.socket.addEventListener('error', callback);
    };

    _proto.onClose = function onClose(callback) {
      this.socket.addEventListener('close', callback);
    };

    return Socket;
  }();

  var isMini$3 = env.isMini,
      isAppPlus$4 = env.isAppPlus;
  var Socket$2 = isMini$3 || isAppPlus$4 ? Socket : Socket$1;

  /*!
   基于 es6-promise
   * Github: https://github.com/stefanpenner/es6-promise
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
   * @version   v4.2.8+1e68dce6
   */
  var SparePromise = (function(){function a(a){var b=typeof a;return null!==a&&("object"===b||"function"===b)}function b(a){return "function"==typeof a}function c(a){P=a;}function d(a){Q=a;}function e(){return function(){return process.nextTick(j)}}function f(){return "undefined"!=typeof O?function(){O(j);}:i()}function g(){var a=0,b=new T(j),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2;}}function h(){var a=new MessageChannel;return a.port1.onmessage=j,function(){return a.port2.postMessage(0)}}function i(){var a=setTimeout;return function(){return a(j,1)}}function j(){var a,b,c;for(a=0;N>a;a+=2)b=W[a],c=W[a+1],b(c),W[a]=void 0,W[a+1]=void 0;N=0;}function k(){try{var a=Function("return this")().require("vertx");return O=a.runOnLoop||a.runOnContext,f()}catch(b){return i()}}function l(a,b){var e,f,c=this,d=new this.constructor(n);return void 0===d[Y]&&D(d),e=c._state,e?(f=arguments[e-1],Q(function(){return A(e,d,f,c._result)})):y(c,d,a,b),d}function m(a){var c,b=this;return a&&"object"==typeof a&&a.constructor===b?a:(c=new b(n),u(c,a),c)}function n(){}function o(){return new TypeError("You cannot resolve a promise with itself")}function p(){return new TypeError("A promises callback cannot return that same promise.")}function q(a,b,c,d){try{a.call(b,c,d);}catch(e){return e}}function r(a,b,c){Q(function(a){var d=!1,e=q(c,b,function(c){d||(d=!0,b!==c?u(a,c):w(a,c));},function(b){d||(d=!0,x(a,b));},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,x(a,e));},a);}function s(a,b){b._state===$?w(a,b._result):b._state===_?x(a,b._result):y(b,void 0,function(b){return u(a,b)},function(b){return x(a,b)});}function t(a,c,d){c.constructor===a.constructor&&d===l&&c.constructor.resolve===m?s(a,c):void 0===d?w(a,c):b(d)?r(a,c,d):w(a,c);}function u(b,c){if(b===c)x(b,o());else if(a(c)){var d=void 0;try{d=c.then;}catch(e){return void x(b,e)}t(b,c,d);}else w(b,c);}function v(a){a._onerror&&a._onerror(a._result),z(a);}function w(a,b){a._state===Z&&(a._result=b,a._state=$,0!==a._subscribers.length&&Q(z,a));}function x(a,b){a._state===Z&&(a._state=_,a._result=b,Q(v,a));}function y(a,b,c,d){var e=a._subscribers,f=e.length;a._onerror=null,e[f]=b,e[f+$]=c,e[f+_]=d,0===f&&a._state&&Q(z,a);}function z(a){var d,e,f,g,b=a._subscribers,c=a._state;if(0!==b.length){for(d=void 0,e=void 0,f=a._result,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?A(c,d,e,f):e(f);a._subscribers.length=0;}}function A(a,c,d,e){var f=b(d),g=void 0,h=void 0,i=!0;if(f){try{g=d(e);}catch(j){i=!1,h=j;}if(c===g)return void x(c,p())}else g=e;c._state!==Z||(f&&i?u(c,g):i===!1?x(c,h):a===$?w(c,g):a===_&&x(c,g));}function B(a,b){try{b(function(b){u(a,b);},function(b){x(a,b);});}catch(c){x(a,c);}}function C(){return ab++}function D(a){a[Y]=ab++,a._state=void 0,a._result=void 0,a._subscribers=[];}function E(){return new Error("Array Methods must be provided an Array")}function F(a){return new bb(this,a).promise}function G(a){var b=this;return new b(M(a)?function(c,d){for(var e=a.length,f=0;e>f;f++)b.resolve(a[f]).then(c,d);}:function(a,b){return b(new TypeError("You must pass an array to race."))})}function H(a){var b=this,c=new b(n);return x(c,a),c}function I(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function J(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function K(){var c,d,a=void 0;if("undefined"!=typeof global)a=global;else if("undefined"!=typeof self)a=self;else try{a=Function("return this")();}catch(b){throw new Error("polyfill failed because global object is unavailable in this environment")}if(c=a.Promise){d=null;try{d=Object.prototype.toString.call(c.resolve());}catch(b){}if("[object Promise]"===d&&!c.cast)return}a.Promise=cb;}var M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,L=void 0;return L=Array.isArray?Array.isArray:function(a){return "[object Array]"===Object.prototype.toString.call(a)},M=L,N=0,O=void 0,P=void 0,Q=function(a,b){W[N]=a,W[N+1]=b,N+=2,2===N&&(P?P(j):X());},R="undefined"!=typeof window?window:void 0,S=R||{},T=S.MutationObserver||S.WebKitMutationObserver,U="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),V="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,W=new Array(1e3),X=void 0,X=U?e():T?g():V?h():void 0===R&&"function"==typeof require?k():i(),Y=Math.random().toString(36).substring(2),Z=void 0,$=1,_=2,ab=0,bb=function(){function a(a,b){this._instanceConstructor=a,this.promise=new a(n),this.promise[Y]||D(this.promise),M(b)?(this.length=b.length,this._remaining=b.length,this._result=new Array(this.length),0===this.length?w(this.promise,this._result):(this.length=this.length||0,this._enumerate(b),0===this._remaining&&w(this.promise,this._result))):x(this.promise,E());}return a.prototype._enumerate=function(a){for(var b=0;this._state===Z&&b<a.length;b++)this._eachEntry(a[b],b);},a.prototype._eachEntry=function(a,b){var e,f,g,i,c=this._instanceConstructor,d=c.resolve;if(d===m){e=void 0,f=void 0,g=!1;try{e=a.then;}catch(h){g=!0,f=h;}e===l&&a._state!==Z?this._settledAt(a._state,b,a._result):"function"!=typeof e?(this._remaining--,this._result[b]=a):c===cb?(i=new c(n),g?x(i,f):t(i,a,e),this._willSettleAt(i,b)):this._willSettleAt(new c(function(b){return b(a)}),b);}else this._willSettleAt(d(a),b);},a.prototype._settledAt=function(a,b,c){var d=this.promise;d._state===Z&&(this._remaining--,a===_?x(d,c):this._result[b]=c),0===this._remaining&&w(d,this._result);},a.prototype._willSettleAt=function(a,b){var c=this;y(a,void 0,function(a){return c._settledAt($,b,a)},function(a){return c._settledAt(_,b,a)});},a}(),cb=function(){function a(b){this[Y]=C(),this._result=this._state=void 0,this._subscribers=[],n!==b&&("function"!=typeof b&&I(),this instanceof a?B(this,b):J());}return a.prototype["catch"]=function(a){return this.then(null,a)},a.prototype["finally"]=function(a){var c=this,d=c.constructor;return b(a)?c.then(function(b){return d.resolve(a()).then(function(){return b})},function(b){return d.resolve(a()).then(function(){throw b})}):c.then(a,a)},a}(),cb.prototype.then=l,cb.all=F,cb.race=G,cb.resolve=m,cb.reject=H,cb._setScheduler=c,cb._setAsap=d,cb._asap=Q,cb.polyfill=K,cb.Promise=cb,cb})();

  var global$6 = env.global;
  var MiniRequest = (function (option) {
    var success = option.success,
        fail = option.fail,
        body = option.body;
    option.data = option.data || body;
    var xhr;

    option.success = function (result) {
      success(result.data, result.statusCode);
    };

    option.fail = function (result) {
      fail(result.data, result.statusCode);
    };

    xhr = global$6.request(option);
    return xhr;
  });

  var global$7 = env.global;

  var isXDomainRequest = function isXDomainRequest(xhr) {
    return Object.prototype.toString.call(xhr) === '[object XDomainRequest]' || typeof XDomainRequest === 'object';
  };

  var isValidRequest = function isValidRequest(obj) {
    return typeof obj === 'function' || typeof obj === 'object';
  };

  var createXHR = function createXHR() {
    var item = {
      XMLHttpRequest: function (_XMLHttpRequest) {
        function XMLHttpRequest() {
          return _XMLHttpRequest.apply(this, arguments);
        }

        XMLHttpRequest.toString = function () {
          return _XMLHttpRequest.toString();
        };

        return XMLHttpRequest;
      }(function () {
        return new XMLHttpRequest();
      }),
      XDomainRequest: function (_XDomainRequest) {
        function XDomainRequest() {
          return _XDomainRequest.apply(this, arguments);
        }

        XDomainRequest.toString = function () {
          return _XDomainRequest.toString();
        };

        return XDomainRequest;
      }(function () {
        return new XDomainRequest();
      }),
      ActiveXObject: function (_ActiveXObject) {
        function ActiveXObject() {
          return _ActiveXObject.apply(this, arguments);
        }

        ActiveXObject.toString = function () {
          return _ActiveXObject.toString();
        };

        return ActiveXObject;
      }(function () {
        return new ActiveXObject('Microsoft.XMLHTTP');
      })
    };
    var isXHR = isValidRequest(global$7.XMLHttpRequest) && 'withCredentials' in new XMLHttpRequest();
    var isXDR = isValidRequest(global$7.XDomainRequest);
    var key = isXHR ? 'XMLHttpRequest' : isXDR ? 'XDomainRequest' : 'ActiveXObject';
    return item[key]();
  };

  var request = function request(option) {
    var url = option.url,
        method = option.method,
        body = option.body,
        headers = option.headers,
        success = option.success,
        fail = option.fail,
        timeout = option.timeout;
    method = method || REQUEST_METHOD.GET;
    var xhr = createXHR();
    xhr.open(method, url);

    if (headers && xhr.setRequestHeader) {
      for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    if ('onload' in xhr) {
      xhr.onload = function () {
        success(xhr.responseText, xhr);
      };

      xhr.onerror = function () {
        fail(xhr.responseText, xhr);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var result = xhr.responseText,
              status = xhr.status;

          if (status === 0) {
            fail(result, xhr, status);
          } else {
            success(result, xhr, status);
          }
        }
      };
    }

    if (timeout) {
      xhr.timeout = timeout;
    }

    if (isXDomainRequest(xhr) && typeof body === 'object') {
      body = JSON$1.stringify(body);
    }

    xhr.send(body);
    return xhr;
  };

  var request$1 = env.isMini || env.isAppPlus ? MiniRequest : request;

  /*
   * JavaScript MD5
   * https://github.com/blueimp/JavaScript-MD5
   *
   * Copyright 2011, Sebastian Tschan
   * https://blueimp.net
   *
   * Licensed under the MIT license:
   * https://opensource.org/licenses/MIT
   *
   * Based on
   * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
   * Digest Algorithm, as defined in RFC 1321.
   * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
   * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
   * Distributed under the BSD License
   * See http://pajhome.org.uk/crypt/md5 for more info.
   */
  var md5 = (function(){function a(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function b(a,b){return a<<b|a>>>32-b}function c(c,d,e,f,g,h){return a(b(a(a(d,c),a(f,h)),g),e)}function d(a,b,d,e,f,g,h){return c(b&d|~b&e,a,b,f,g,h)}function e(a,b,d,e,f,g,h){return c(b&e|d&~e,a,b,f,g,h)}function f(a,b,d,e,f,g,h){return c(b^d^e,a,b,f,g,h)}function g(a,b,d,e,f,g,h){return c(d^(b|~e),a,b,f,g,h)}function h(b,c){var h,i,j,k,l,m,n,o,p;for(b[c>>5]|=128<<c%32,b[(c+64>>>9<<4)+14]=c,m=1732584193,n=-271733879,o=-1732584194,p=271733878,h=0;h<b.length;h+=16)i=m,j=n,k=o,l=p,m=d(m,n,o,p,b[h],7,-680876936),p=d(p,m,n,o,b[h+1],12,-389564586),o=d(o,p,m,n,b[h+2],17,606105819),n=d(n,o,p,m,b[h+3],22,-1044525330),m=d(m,n,o,p,b[h+4],7,-176418897),p=d(p,m,n,o,b[h+5],12,1200080426),o=d(o,p,m,n,b[h+6],17,-1473231341),n=d(n,o,p,m,b[h+7],22,-45705983),m=d(m,n,o,p,b[h+8],7,1770035416),p=d(p,m,n,o,b[h+9],12,-1958414417),o=d(o,p,m,n,b[h+10],17,-42063),n=d(n,o,p,m,b[h+11],22,-1990404162),m=d(m,n,o,p,b[h+12],7,1804603682),p=d(p,m,n,o,b[h+13],12,-40341101),o=d(o,p,m,n,b[h+14],17,-1502002290),n=d(n,o,p,m,b[h+15],22,1236535329),m=e(m,n,o,p,b[h+1],5,-165796510),p=e(p,m,n,o,b[h+6],9,-1069501632),o=e(o,p,m,n,b[h+11],14,643717713),n=e(n,o,p,m,b[h],20,-373897302),m=e(m,n,o,p,b[h+5],5,-701558691),p=e(p,m,n,o,b[h+10],9,38016083),o=e(o,p,m,n,b[h+15],14,-660478335),n=e(n,o,p,m,b[h+4],20,-405537848),m=e(m,n,o,p,b[h+9],5,568446438),p=e(p,m,n,o,b[h+14],9,-1019803690),o=e(o,p,m,n,b[h+3],14,-187363961),n=e(n,o,p,m,b[h+8],20,1163531501),m=e(m,n,o,p,b[h+13],5,-1444681467),p=e(p,m,n,o,b[h+2],9,-51403784),o=e(o,p,m,n,b[h+7],14,1735328473),n=e(n,o,p,m,b[h+12],20,-1926607734),m=f(m,n,o,p,b[h+5],4,-378558),p=f(p,m,n,o,b[h+8],11,-2022574463),o=f(o,p,m,n,b[h+11],16,1839030562),n=f(n,o,p,m,b[h+14],23,-35309556),m=f(m,n,o,p,b[h+1],4,-1530992060),p=f(p,m,n,o,b[h+4],11,1272893353),o=f(o,p,m,n,b[h+7],16,-155497632),n=f(n,o,p,m,b[h+10],23,-1094730640),m=f(m,n,o,p,b[h+13],4,681279174),p=f(p,m,n,o,b[h],11,-358537222),o=f(o,p,m,n,b[h+3],16,-722521979),n=f(n,o,p,m,b[h+6],23,76029189),m=f(m,n,o,p,b[h+9],4,-640364487),p=f(p,m,n,o,b[h+12],11,-421815835),o=f(o,p,m,n,b[h+15],16,530742520),n=f(n,o,p,m,b[h+2],23,-995338651),m=g(m,n,o,p,b[h],6,-198630844),p=g(p,m,n,o,b[h+7],10,1126891415),o=g(o,p,m,n,b[h+14],15,-1416354905),n=g(n,o,p,m,b[h+5],21,-57434055),m=g(m,n,o,p,b[h+12],6,1700485571),p=g(p,m,n,o,b[h+3],10,-1894986606),o=g(o,p,m,n,b[h+10],15,-1051523),n=g(n,o,p,m,b[h+1],21,-2054922799),m=g(m,n,o,p,b[h+8],6,1873313359),p=g(p,m,n,o,b[h+15],10,-30611744),o=g(o,p,m,n,b[h+6],15,-1560198380),n=g(n,o,p,m,b[h+13],21,1309151649),m=g(m,n,o,p,b[h+4],6,-145523070),p=g(p,m,n,o,b[h+11],10,-1120210379),o=g(o,p,m,n,b[h+2],15,718787259),n=g(n,o,p,m,b[h+9],21,-343485551),m=a(m,i),n=a(n,j),o=a(o,k),p=a(p,l);return [m,n,o,p]}function i(a){var b,c="",d=32*a.length;for(b=0;d>b;b+=8)c+=String.fromCharCode(255&a[b>>5]>>>b%32);return c}function j(a){var b,d,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(d=8*a.length,b=0;d>b;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function k(a){return i(h(j(a),8*a.length))}function l(a,b){var c,g,d=j(a),e=[],f=[];for(e[15]=f[15]=void 0,d.length>16&&(d=h(d,8*a.length)),c=0;16>c;c+=1)e[c]=909522486^d[c],f[c]=1549556828^d[c];return g=h(e.concat(j(b)),512+8*b.length),i(h(f.concat(g),640))}function m(a){var d,e,b="0123456789abcdef",c="";for(e=0;e<a.length;e+=1)d=a.charCodeAt(e),c+=b.charAt(15&d>>>4)+b.charAt(15&d);return c}function n(a){return unescape(encodeURIComponent(a))}function o(a){return k(n(a))}function p(a){return m(o(a))}function q(a,b){return l(n(a),n(b))}function r(a,b){return m(q(a,b))}function s(a,b,c){return b?c?q(b,a):r(b,a):c?o(a):p(a)}return s})();

  var global$8 = env.global;
  var Promise$1 = global$8.Promise;

  var isSupportPromise = function isSupportPromise() {
    if (!global$8.Promise) return false;

    var defer = function () {
      return global$8.Promise.resolve();
    }();

    return defer.then && defer["catch"] && defer["finally"];
  };

  var setTimeout$1 = function setTimeout(event, timeout) {
    return global$8.setTimeout(event, timeout);
  };

  var clearTimeout$1 = function clearTimeout(id) {
    return global$8.clearTimeout(id);
  };

  var setInterval$1 = function setInterval(event, timeout) {
    return global$8.setInterval(event, timeout);
  };

  var clearInterval$1 = function clearInterval(id) {
    return global$8.clearInterval(id);
  };

  var Defer = isSupportPromise() ? global$8.Promise : SparePromise;

  var noop = function noop(data) {
    return data;
  };

  var deferNoop = function deferNoop(data) {
    return Promise$1.resolve(data);
  };

  var JSON$2 = global$8.JSON || JSON$1;

  var allowError = function allowError(event) {
    var result;

    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      result = event.apply(void 0, args);
    } catch (e) {
      result = null;
    }

    return result;
  };

  var toJSON = function toJSON(val) {
    return allowError(JSON$2.stringify, val);
  };

  var parseJSON = function parseJSON(val) {
    return allowError(JSON$2.parse, val);
  };

  var copy = function copy(val) {
    return parseJSON(toJSON(val));
  };

  var isObject = function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  };

  var isArray = function isArray(val) {
    return Object.prototype.toString.call(val).indexOf('Array') !== -1;
  };

  var isFunction = function isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]';
  };

  var isString = function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  };

  var isBoolean = function isBoolean(val) {
    return Object.prototype.toString.call(val) === '[object Boolean]';
  };

  var isUndefined = function isUndefined(val) {
    return val === undefined || Object.prototype.toString.call(val) === '[object Undefined]';
  };

  var isNull = function isNull(val) {
    return Object.prototype.toString.call(val) === '[object Null]';
  };

  var isNumber = function isNumber(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
  };

  var isArrayBuffer = function isArrayBuffer(val) {
    return Object.prototype.toString.call(val) === '[object ArrayBuffer]';
  };

  var isPromise = function isPromise(val) {
    var isTrue = false;

    try {
      isTrue = Object.prototype.toString.call(val) === '[object Promise]' || val && val.then && val["catch"] && val["finally"];
    } catch (e) {
      isTrue = false;
    }

    return isTrue;
  };

  var getTypeName = function getTypeName(data) {
    var typeName = Object.prototype.toString.call(data);
    return typeName.substring(8, typeName.length - 1);
  };

  var isEqual = function isEqual(source, target) {
    return source === target;
  };

  var ArrayBufferToArray = function ArrayBufferToArray(data) {
    if (isArrayBuffer(data)) {
      return [].slice.call(new Int8Array(data));
    }

    return data;
  };

  var ArrayBufferToUint8Array = function ArrayBufferToUint8Array(data) {
    if (isArrayBuffer(data)) {
      return new Uint8Array(data);
    }

    return data;
  };

  var forEach = function forEach(source, event, options) {
    options = options || {};
    event = event || noop;
    var _options = options,
        isReverse = _options.isReverse;

    var loopObj = function loopObj() {
      for (var key in source) {
        event(source[key], key, source);
      }
    };

    var loopArr = function loopArr() {
      if (isReverse) {
        for (var i = source.length - 1; i >= 0; i--) {
          event(source[i], i);
        }
      } else {
        for (var j = 0, len = source.length; j < len; j++) {
          event(source[j], j);
        }
      }
    };

    if (isObject(source)) {
      loopObj();
    }

    if (isArray(source) || isString(source)) {
      loopArr();
    }
  };

  var isFalse = function isFalse(val) {
    return val === false;
  };

  var isEmpty = function isEmpty(val) {
    var result = true;

    if (isObject(val)) {
      forEach(val, function () {
        result = false;
      });
    }

    if (isString(val) || isArray(val)) {
      result = val.length === 0;
    }

    if (isNumber(val)) {
      result = val === 0;
    }

    return result;
  };

  var isNumberData = function isNumberData(val) {
    var isEmptyVal = isEmpty(val);
    val = Number(val);
    return isNumber(val) && !isEmptyVal;
  };

  var getKeys = function getKeys(obj) {
    var keyList = [];
    forEach(obj, function (val, key) {
      keyList.push(key);
    });
    return keyList;
  };

  var getValues = function getValues(obj) {
    var valList = [];
    forEach(obj, function (val) {
      valList.push(val);
    });
    return valList;
  };

  var getTimestamp = function getTimestamp(time) {
    return new Date(time).getTime();
  };

  var getCurrentTimestamp = function getCurrentTimestamp() {
    return new Date().getTime();
  };

  var formatTime = function formatTime(timestamp, options) {
    timestamp = timestamp || getCurrentTimestamp();
    options = options || {};
    var temp = options.temp;
    var date = new Date(timestamp),
        formateds = {};
    formateds['YY'] = date.getFullYear();
    formateds['MM'] = date.getMonth() + 1;
    formateds['DD'] = date.getDate();
    formateds['hh'] = date.getHours();
    formateds['mm'] = date.getMinutes();
    formateds['ss'] = date.getSeconds();
    forEach(formateds, function (val, key) {
      formateds[key] = val >= 10 ? val : '0' + val;
    });

    if (temp) {
      var formatedText = temp;
      forEach(formateds, function (val, key) {
        formatedText = formatedText.replace(key, val);
      });
      return formatedText;
    }

    return formateds.YY + '-' + formateds.MM + '-' + formateds.DD + ' ' + formateds.hh + ':' + formateds.mm + ':' + formateds.ss;
  };

  var isValidJSON = function isValidJSON(jsonStr) {
    if (isObject(jsonStr)) {
      return true;
    }

    var isValid = false;

    try {
      var obj = JSON$2.parse(jsonStr);
      var str = JSON$2.stringify(obj);
      isValid = str === jsonStr;
    } catch (e) {
      isValid = false;
    }

    return isValid;
  };

  var isSupportSocket = function isSupportSocket() {
    var isMini = env.isMini;
    var isAppPlus = env.isAppPlus;

    if (isMini || isAppPlus) {
      return true;
    }

    var Socket = global$8.WebSocket;

    if (isUndefined(Socket)) {
      return false;
    }

    var hasWS = false,
        isIntegrity = false;

    try {
      hasWS = typeof Socket === 'object' || typeof Socket === 'function';
      isIntegrity = typeof Socket.OPEN === 'number';
    } catch (e) {}

    return hasWS && isIntegrity;
  };

  var indexOf = function indexOf(source, searchVal) {
    if (source.indexOf) {
      return source.indexOf(searchVal);
    }

    var index = -1;
    forEach(source, function (sub, i) {
      if (searchVal === sub) {
        index = i;
        return;
      }
    });
    return index;
  };

  var lastIndexOf = function lastIndexOf(source, searchVal) {
    if (source.lastIndexOf) {
      return source.lastIndexOf(searchVal);
    }

    var index = -1;
    forEach(source, function (sub, i) {
      if (searchVal === sub) {
        index = i;
        return;
      }
    }, {
      isReverse: true
    });
    return index;
  };

  var isInclude = function isInclude(source, searchVal) {
    if (isObject(source)) {
      var arr = [];
      forEach(source, function (val) {
        arr.push(val);
      });
      source = arr;
    }

    var index = indexOf(source, searchVal);
    return index !== -1;
  };

  var substring = function substring(source, start, end) {
    return source.substring(start, end);
  };

  var spliceByChild = function spliceByChild(arr, item) {
    forEach(arr, function (child, index) {
      if (isEqual(child, item)) {
        arr.splice(index, 1);
      }
    }, {
      isReverse: true
    });
  };

  var parse16To10 = function parse16To10(num) {
    return parseInt(num, 16);
  };

  var isPlus = function isPlus(num) {
    return +num === num;
  };

  var filter = function filter(source, event) {
    var newArr = [];

    for (var i = 0, max = source.length; i < max; i++) {
      var data = source[i];

      if (event(data, i)) {
        newArr.push(data);
      }
    }

    return newArr;
  };

  var map = function map(source, event) {
    forEach(source, function (item, index) {
      source[index] = event(item, index);
    });
    return source;
  };

  var extend = function extend(destination, sources, option) {
    option = option || {};
    var _option2 = option,
        isAllowNull = _option2.isAllowNull;
    destination = destination || {};
    sources = sources || {};

    for (var key in sources) {
      var value = sources[key];

      if (!isUndefined(value) || isAllowNull) {
        destination[key] = value;
      }
    }

    return destination;
  };

  var extendAllowNull = function extendAllowNull(destination, sources) {
    return extend(destination, sources, {
      isAllowNull: true
    });
  };

  var extendInShallow = function extendInShallow(destination, sources) {
    destination = destination || {};
    sources = sources || {};
    destination = copy(destination);
    sources = copy(sources);
    return extend(destination, sources);
  };

  var deferred = function deferred(callbacks) {
    return new Defer(callbacks);
  };

  var deferTimeout = function deferTimeout(timeout) {
    return deferred(function (resolve) {
      var timeouter = setTimeout$1(function () {
        resolve(timeouter);
      }, timeout);
    });
  };

  var tplEngine = function tplEngine(temp, data, regexp) {
    var replaceAction = function replaceAction(obj) {
      return temp.replace(regexp || /{([^}]+)}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
          return match.slice(1);
        }

        return obj[name] !== undefined ? obj[name] : '{' + name + '}';
      });
    };

    if (!isArray(data)) {
      data = [data];
    }

    var ret = [];
    forEach(data, function (item) {
      ret.push(replaceAction(item));
    });
    return ret.join('');
  };

  var getRandomNum = function getRandomNum(max, min) {
    min = min || 0;
    var range = max - min,
        random = Math.random();
    return min + Math.round(random * range);
  };

  var Timer = function () {
    function Timer(options) {
      this._timerId = void 0;
      this._timerEvent = void 0;
      this._timerClearEvent = void 0;
      this.timeout = 0;
      this.type = TIMER_TYPE.TIMEOUT;
      this.status = TIMER_STATUS.PENNDING;
      var self = this;
      extend(self, options);
      var type = self.type;
      var isTimeout = type === TIMER_TYPE.TIMEOUT;

      if (isTimeout) {
        self._timerEvent = setTimeout$1;
        self._timerClearEvent = clearTimeout$1;
      } else {
        self._timerEvent = setInterval$1;
        self._timerClearEvent = clearInterval$1;
      }

      return self;
    }

    var _proto = Timer.prototype;

    _proto.start = function start(event, options) {
      options = options || {};
      var self = this,
          isTimeout = self.type === TIMER_TYPE.TIMEOUT;
      var _options2 = options,
          args = _options2.args,
          thisArg = _options2.thisArg;
      self.stop();
      self._timerId = self._timerEvent.call(global$8, function () {
        isTimeout && self.stop();

        if (thisArg) {
          event.apply(thisArg, args);
        } else {
          event(args);
        }
      }, self.timeout);
      self.status = TIMER_STATUS.BUSY;
    };

    _proto.stop = function stop() {
      var self = this;

      if (self._timerId) {
        self._timerClearEvent.call(global$8, self._timerId);

        self.status = TIMER_STATUS.ENDING;
      }
    };

    return Timer;
  }();

  var DeferHandler = function () {
    function DeferHandler(options) {
      this._list = {};
      this.timeout = IM_TIMEOUT;
      extend(this, options);
    }

    var _proto2 = DeferHandler.prototype;

    _proto2._isInvalid = function _isInvalid(id) {
      var handlers = this._list[id];
      return !isArray(handlers) || isEmpty(handlers);
    };

    _proto2._exec = function _exec(id, isError, data) {
      var self = this;

      if (self._isInvalid(id)) {
        return;
      }

      var handlers = self._list[id],
          handler = handlers[0];
      isError ? handler.reject(data) : handler.resolve(data);
      handlers.splice(0, 1);
    };

    _proto2.add = function add(id, defer, options) {
      options = options || {};
      var self = this;
      var resolve = defer.resolve,
          reject = defer.reject;
      var timeout = options.timeout || self.timeout;

      if (self._isInvalid(id)) {
        self._list[id] = [];
      }

      var timer = new Timer({
        timeout: timeout
      });
      timer.start(function () {
        self.reject(id, ERROR_INFO.TIMEOUT.code);
      });

      self._list[id].push({
        resolve: resolve,
        reject: reject,
        timer: timer
      });
    };

    _proto2.resolve = function resolve(id, data) {
      this._exec(id, false, data);
    };

    _proto2.reject = function reject(id, error) {
      this._exec(id, true, error);
    };

    return DeferHandler;
  }();

  var EventEmitter = function () {
    function EventEmitter() {
      this._events = void 0;
      this._events = {};
    }

    var _proto3 = EventEmitter.prototype;

    _proto3.on = function on(name, event) {
      var _events = this._events[name] || [];

      _events.push(event);

      this._events[name] = _events;
    };

    _proto3.off = function off(name, offEvent) {
      if (offEvent) {
        var _events = this._events[name] || [];

        spliceByChild(_events, offEvent);
      } else {
        delete this._events[name];
      }
    };

    _proto3.emit = function emit(name, data, error) {
      var _events = this._events[name];
      forEach(_events, function (event) {
        isFunction(event) && event(data, error);
      });
    };

    _proto3.clear = function clear() {
      this._events = {};
    };

    return EventEmitter;
  }();

  var decodeURI = function decodeURI(uri) {
    return global$8.decodeURIComponent(uri);
  };

  var encodeURI = function encodeURI(uri) {
    return global$8.encodeURIComponent(uri);
  };

  var int64ToTimestamp = function int64ToTimestamp(obj) {
    if (!isObject(obj) || obj.low === undefined || obj.high === undefined) {
      return obj;
    }

    var low = obj.low;

    if (low < 0) {
      low += 0xffffffff + 1;
    }

    low = low.toString(16);
    var timestamp = parseInt(obj.high.toString(16) + '00000000'.replace(new RegExp('0{' + low.length + '}$'), low), 16);
    return timestamp;
  };

  var batchInt64ToTimestamp = function batchInt64ToTimestamp(data) {
    forEach(data, function (item, key) {
      if (isObject(item)) {
        data[key] = int64ToTimestamp(item);
      }
    });
    return data;
  };

  var Queue = function () {
    function Queue(defaultConfig) {
      this._isRunning = false;
      this._list = [];
      this._defaultConfig = void 0;
      this._defaultConfig = defaultConfig;
    }

    var _proto4 = Queue.prototype;

    _proto4.add = function add(params) {
      params = params || this._defaultConfig;

      this._list.push(params);

      this.run();
    };

    _proto4.run = function run() {
      var self = this;
      var _isRunning = self._isRunning,
          _list = self._list;
      var isFinished = isEmpty(_list);

      if (_isRunning || isFinished) {
        return;
      }

      var firstItem = _list.splice(0, 1)[0];

      var event = firstItem.event,
          args = firstItem.args,
          thisArg = firstItem.thisArg;

      var next = function next() {
        self._isRunning = false;
        self.run();
      };

      if (!event) {
        return next();
      }

      self._isRunning = true;
      event.apply(thisArg, args).then(next)["catch"](next);
    };

    return Queue;
  }();

  var secondsToMilliseconds = function secondsToMilliseconds(seconds) {
    return seconds * 1000;
  };

  var request$2 = function request(url, options) {
    options = options || {};
    return deferred(function (resolve, reject) {
      options = extend(options, {
        url: url,
        success: function success(responseText, xhr, status) {
          resolve({
            responseText: responseText,
            xhr: xhr,
            status: status
          });
        },
        fail: function fail(result, xhr, status) {
          reject({
            result: result,
            xhr: xhr,
            status: status
          });
        }
      });
      request$1(options);
    });
  };

  var requestByUrlList = function requestByUrlList(urlList, options) {
    if (isEmpty(urlList)) {
      return Defer.reject();
    }

    var url = urlList[0];
    var fixedNaviResp = {
      'responseText': '{"isFixedNaviResp":true}'
    };
    return request$2(url, options).then(function (result) {
      result = result || {};
      result.urlList = urlList;
      return result;
    })["catch"](function () {
      urlList.splice(0, 1);

      if (isEmpty(urlList)) {
        return fixedNaviResp;
      } else {
        return requestByUrlList(urlList, options);
      }
    });
  };

  var requestForFaster = function requestForFaster(urlList, option) {
    option = option || {};
    var timeInterval = option.timeInterval || 0;
    var faildCount = 0,
        totalCount = urlList.length;
    var requestXhrs = [];
    var totalTimer = new Timer({
      timeout: 15 * 1000
    });
    var reqCountdownTimers = [];

    var clearAll = function clearAll() {
      forEach(reqCountdownTimers, function (timer) {
        timer.stop();
      });
      forEach(requestXhrs, function (xhr) {
        xhr.abort();
      });
      reqCountdownTimers.length = 0;
      requestXhrs.length = 0;
    };

    var isAllFaild = function isAllFaild() {
      return faildCount === totalCount;
    };

    return deferred(function (resolve, reject) {
      var _success = function success(url, index) {
        clearAll();
        resolve({
          url: url,
          index: index
        });
      };

      var _fail = function fail() {
        clearAll();
        reject();
      };

      forEach(urlList, function (url, index) {
        var timer = new Timer({
          timeout: timeInterval * index
        });
        timer.start(function () {
          var xhr;
          var opt = extend({
            url: url,
            success: function success() {
              _success(url, index);
            },
            fail: function fail() {
              faildCount++;
              isAllFaild() && _fail();
            }
          }, option);
          xhr = request$1(opt);
          requestXhrs.push(xhr);
        });
        reqCountdownTimers.push(timer);
      });
      totalTimer.start(_fail);
    });
  };

  var NetworkDetecter = function () {
    function NetworkDetecter(option) {
      this._option = void 0;
      this._detectCount = 0;
      this._timeoutId = void 0;
      this._option = option;
    }

    var _proto5 = NetworkDetecter.prototype;

    _proto5._detect = function _detect() {
      var self = this;
      var _detectCount = self._detectCount,
          _option = self._option;
      var url = _option.url,
          timeout = _option.intervalTime,
          max = _option.max;
      _detectCount++;
      return request$2(url).then(function () {
        return;
      }, function (_ref) {
        var status = _ref.status;

        if (isEqual(status, 404)) {
          return;
        }

        var isAlreadyMax = max && isEqual(max, _detectCount);

        if (isAlreadyMax) {
          return Defer.reject();
        }

        return deferTimeout(timeout).then(function (timeoutId) {
          self._detectCount = _detectCount;
          self._timeoutId = timeoutId;
          return self._detect();
        });
      });
    };

    _proto5.start = function start() {
      return this._detect();
    };

    _proto5.stop = function stop() {
      var timeoutId = this._timeoutId;

      if (timeoutId) {
        clearTimeout$1(timeoutId);
      }
    };

    return NetworkDetecter;
  }();

  var toUpperCase = function toUpperCase(str, startIndex, endIndex) {
    if (isUndefined(startIndex) || isUndefined(endIndex)) {
      return str.toUpperCase();
    }

    var sliceStr = str.slice(startIndex, endIndex);
    str = str.replace(sliceStr, function (text) {
      return text.toUpperCase();
    });
    return str;
  };

  var getDomainByUrl = function getDomainByUrl(url) {
    var StartMark = '://',
        EndMark = '/';
    var urlProtocolIndex = indexOf(url, StartMark);
    var hasProtocol = urlProtocolIndex > -1;

    if (hasProtocol) {
      urlProtocolIndex = urlProtocolIndex + StartMark.length;
      url = substring(url, urlProtocolIndex, url.length);
    }

    var urlPathIndex = indexOf(url, EndMark);
    var hasPath = urlPathIndex > -1;

    if (hasPath) {
      url = substring(url, 0, urlPathIndex);
    }

    return url;
  };

  var getValidUrl = function getValidUrl(url, option) {
    option = option || {};
    var ProtocolMark = '://';
    var hasProtocol = isInclude(url, ProtocolMark);
    var localProtocol = env.protocol.http;
    var _option3 = option,
        protocol = _option3.protocol;

    if (protocol) {
      var domain = getDomainByUrl(url);
      url = protocol + "//" + domain;
    }

    if (hasProtocol) {
      var urlProtocolIndex = indexOf(url, ProtocolMark) + 1;
      var urlProtocol = substring(url, 0, urlProtocolIndex);
      var isHttpUrl = urlProtocol === HTTP_PROTOCOL.HTTP;
      var isLocalHttps = localProtocol === HTTP_PROTOCOL.HTTPS;

      if (isHttpUrl && isLocalHttps) {
        var _domain = getDomainByUrl(url);

        return HTTP_PROTOCOL.HTTPS + "//" + _domain;
      } else {
        return url;
      }
    } else {
      return localProtocol + "//" + url;
    }
  };

  var quickSort = function quickSort(arr, event) {
    var sort = function sort(array, left, right, event) {
      event = event || function (a, b) {
        return a <= b;
      };

      if (left < right) {
        var x = array[right],
            i = left - 1,
            temp;

        for (var j = left; j <= right; j++) {
          if (event(array[j], x)) {
            i++;
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
        }

        sort(array, left, i - 1, event);
        sort(array, i + 1, right, event);
      }

      return array;
    };

    return sort(arr, 0, arr.length - 1, event);
  };

  var unique = function unique(arr, event) {
    var keyEvent = event || function (data) {
      return data;
    };

    var hashTable = {};
    var newArr = [];
    forEach(arr, function (data) {
      var key = keyEvent(data);

      if (!hashTable[key]) {
        hashTable[key] = true;
        newArr.push(data);
      }
    });
    return newArr;
  };

  var isStackError = function isStackError(error) {
    error = error || {};
    return error.stack && error.stack.toString;
  };

  var consoleError = function consoleError() {
    var _console;

    return (_console = console).error.apply(_console, arguments);
  };

  var consoleLog = function consoleLog() {
    var _console2;

    return (_console2 = console).log.apply(_console2, arguments);
  };

  var string10to64 = function string10to64(number) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZa0'.split(''),
        radix = chars.length + 1,
        qutient = +number,
        arr = [];

    do {
      var mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      arr.unshift(chars[mod]);
    } while (qutient);

    return arr.join('');
  };

  var getUUID = function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  var getUUID22 = function getUUID22() {
    var uuid = getUUID();
    uuid = uuid.replace(/-/g, '') + 'a';
    uuid = parseInt(uuid, 16);
    uuid = string10to64(uuid);

    if (uuid.length > 22) {
      uuid = uuid.slice(0, 22);
    } else {
      var len = 22 - uuid.length;

      for (var i = 0; i < len; i++) {
        uuid = uuid + '0';
      }
    }

    return uuid;
  };

  var isValidTimestamp = function isValidTimestamp(time) {
    return isNumber(time) && time !== 0;
  };

  var formateDate = function formateDate(seperator) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return tplEngine('{year}{seperator}{month}{seperator}{day}', {
      year: year,
      month: month,
      day: day,
      seperator: seperator
    });
  };

  var utils = {
    Storage: storage$1,
    Session: session,
    Socket: Socket$2,
    Cache: CacheStorage,
    JSON: JSON$2,
    Defer: Defer,
    httpRequest: request$1,
    request: request$2,
    requestByUrlList: requestByUrlList,
    requestForFaster: requestForFaster,
    md5: md5,
    DeferHandler: DeferHandler,
    EventEmitter: EventEmitter,
    Timer: Timer,
    Queue: Queue,
    consoleError: consoleError,
    consoleLog: consoleLog,
    noop: noop,
    deferNoop: deferNoop,
    setTimeout: setTimeout$1,
    toJSON: toJSON,
    parseJSON: parseJSON,
    copy: copy,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    isArrayBuffer: isArrayBuffer,
    isString: isString,
    isBoolean: isBoolean,
    isUndefined: isUndefined,
    isNull: isNull,
    isNumber: isNumber,
    isNumberData: isNumberData,
    isPromise: isPromise,
    getTypeName: getTypeName,
    isPlus: isPlus,
    isEmpty: isEmpty,
    isFalse: isFalse,
    isEqual: isEqual,
    isValidJSON: isValidJSON,
    isSupportSocket: isSupportSocket,
    ArrayBufferToArray: ArrayBufferToArray,
    ArrayBufferToUint8Array: ArrayBufferToUint8Array,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    isInclude: isInclude,
    substring: substring,
    getKeys: getKeys,
    getValues: getValues,
    getTimestamp: getTimestamp,
    getCurrentTimestamp: getCurrentTimestamp,
    formatTime: formatTime,
    parse16To10: parse16To10,
    forEach: forEach,
    map: map,
    filter: filter,
    extend: extend,
    extendAllowNull: extendAllowNull,
    extendInShallow: extendInShallow,
    deferred: deferred,
    tplEngine: tplEngine,
    getRandomNum: getRandomNum,
    int64ToTimestamp: int64ToTimestamp,
    batchInt64ToTimestamp: batchInt64ToTimestamp,
    encodeURI: encodeURI,
    decodeURI: decodeURI,
    secondsToMilliseconds: secondsToMilliseconds,
    NetworkDetecter: NetworkDetecter,
    toUpperCase: toUpperCase,
    getDomainByUrl: getDomainByUrl,
    getValidUrl: getValidUrl,
    quickSort: quickSort,
    unique: unique,
    isStackError: isStackError,
    getUUID: getUUID,
    getUUID22: getUUID22,
    isValidTimestamp: isValidTimestamp,
    formateDate: formateDate
  };

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var _PUBLISH_TOPIC_TO_CON, _CONVERSATION_TYPE_TO, _CONVERSATION_TYPE_TO2, _CONVERSATION_TYPE_TO3, _CONVERSATION_TYPE_TO4;
  var SUCCESS_CODE = 0;
  var PULL_MSG_TYPE = {
    NORMAL: 1,
    CHATROOM: 2
  };
  var MESSAGE_NAME = {
    CONN_ACK: 'ConnAckMessage',
    DISCONNECT: 'DisconnectMessage',
    PING_REQ: 'PingReqMessage',
    PING_RESP: 'PingRespMessage',
    PUBLISH: 'PublishMessage',
    PUB_ACK: 'PubAckMessage',
    QUERY: 'QueryMessage',
    QUERY_CON: 'QueryConMessage',
    QUERY_ACK: 'QueryAckMessage'
  };
  var QOS = {
    AT_MOST_ONCE: 0,
    AT_LEAST_ONCE: 1,
    EXACTLY_ONCE: 2,
    DEFAULT: 3,
    '0': 'AT_MOST_ONCE',
    '1': 'AT_LEAST_ONCE',
    '2': 'EXACTLY_ONCE',
    '3': 'DEFAULT'
  };
  var OPERATE_TYPE = {
    CONNECT: 1,
    '1': 'CONNECT',
    CONNACK: 2,
    '2': 'CONNACK',
    PUBLISH: 3,
    '3': 'PUBLISH',
    PUBACK: 4,
    '4': 'PUBACK',
    QUERY: 5,
    '5': 'QUERY',
    QUERYACK: 6,
    '6': 'QUERYACK',
    QUERYCON: 7,
    '7': 'QUERYCON',
    SUBSCRIBE: 8,
    '8': 'SUBSCRIBE',
    SUBACK: 9,
    '9': 'SUBACK',
    UNSUBSCRIBE: 10,
    '10': 'UNSUBSCRIBE',
    UNSUBACK: 11,
    '11': 'UNSUBACK',
    PINGREQ: 12,
    '12': 'PINGREQ',
    PINGRESP: 13,
    '13': 'PINGRESP',
    DISCONNECT: 14,
    '14': 'DISCONNECT'
  };
  var MESSAGE_TAG = {
    NONE: 0,
    PERSIT_ONLY: 1,
    COUNT_ONLY: 2,
    PERSIT_AND_COUNT: 3
  };
  var PUBLISH_TOPIC = {
    PRIVATE: 'ppMsgP',
    GROUP: 'pgMsgP',
    CHATROOM: 'chatMsg',
    CUSTOMER_SERVICE: 'pcMsgP',
    RECALL: 'recallMsg',
    NOTIFY_PULL_MSG: 's_ntf',
    RECEIVE_MSG: 's_msg',
    SYNC_STATUS: 's_stat',
    SERVER_NOTIFY: 's_cmd',
    SETTING_NOTIFY: 's_us'
  };
  var PUBLISH_STATUS_TOPIC = {
    PRIVATE: 'ppMsgS',
    GROUP: 'pgMsgS',
    CHATROOM: 'chatMsgS'
  };
  var QUERY_TOPIC = {
    GET_SYNC_TIME: 'qrySessionsAtt',
    PULL_MSG: 'pullMsg',
    GET_CONVERSATION_LIST: 'qrySessions',
    REMOVE_CONVERSATION_LIST: 'delSessions',
    DELETE_MESSAGES: 'delMsg',
    CLEAR_UNREAD_COUNT: 'updRRTime',
    PULL_USER_SETTING: 'pullUS',
    PULL_CHRM_MSG: 'chrmPull',
    JOIN_CHATROOM: 'joinChrm',
    JOIN_EXIST_CHATROOM: 'joinChrmR',
    QUIT_CHATROOM: 'exitChrm',
    GET_CHATROOM_INFO: 'queryChrmI',
    UPDATE_CHATROOM_KV: 'setKV',
    DELETE_CHATROOM_KV: 'delKV',
    PULL_CHATROOM_KV: 'pullKV',
    GET_OLD_CONVERSATION_LIST: 'qryRelation',
    REMOVE_OLD_CONVERSATION: 'delRelation',
    GET_CONVERSATION_STATUS: 'pullSeAtts',
    SET_CONVERSATION_STATUS: 'setSeAtt',
    GET_UPLOAD_FILE_TOKEN: 'qnTkn',
    GET_UPLOAD_FILE_URL: 'qnUrl',
    CLEAR_MESSAGES: {
      PRIVATE: 'cleanPMsg',
      GROUP: 'cleanGMsg',
      CUSTOMER_SERVICE: 'cleanCMsg',
      SYSTEM: 'cleanSMsg'
    },
    JOIN_RTC_ROOM: 'rtcRJoin_data',
    QUIT_RTC_ROOM: 'rtcRExit',
    PING_RTC: 'rtcPing',
    SET_RTC_DATA: 'rtcSetData',
    USER_SET_RTC_DATA: 'userSetData',
    GET_RTC_DATA: 'rtcQryData',
    DEL_RTC_DATA: 'rtcDelData',
    SET_RTC_OUT_DATA: 'rtcSetOutData',
    GET_RTC_OUT_DATA: 'rtcQryUserOutData',
    GET_RTC_TOKEN: 'rtcToken',
    SET_RTC_STATE: 'rtcUserState',
    GET_RTC_ROOM_INFO: 'rtcRInfo',
    GET_RTC_USER_INFO_LIST: 'rtcUData',
    SET_RTC_USER_INFO: 'rtcUPut',
    DEL_RTC_USER_INFO: 'rtcUDel',
    GET_RTC_USER_LIST: 'rtcUList'
  };
  var QUERY_HISTORY_TOPIC = {
    PRIVATE: 'qryPMsg',
    GROUP: 'qryGMsg',
    CHATROOM: 'qryCHMsg',
    CUSTOMER_SERVICE: 'qryCMsg',
    SYSTEM: 'qrySMsg'
  };
  var SERVER_NOTIFY_TYPE = {
    KV_CHANGED: 2,
    CONVERSATION_STATUS_CHANGED: 3
  };
  var CHATROOM_KV_STATUS_CODE = {
    AUTO_DELETE: 0x0001,
    OVERWRITE: 0x0002,
    OPERATE: 0x0004
  };
  var PUBLISH_TOPIC_TO_CONVERSATION_TYPE = (_PUBLISH_TOPIC_TO_CON = {}, _PUBLISH_TOPIC_TO_CON[PUBLISH_TOPIC.PRIVATE] = CONVERSATION_TYPE.PRIVATE, _PUBLISH_TOPIC_TO_CON[PUBLISH_TOPIC.GROUP] = CONVERSATION_TYPE.GROUP, _PUBLISH_TOPIC_TO_CON[PUBLISH_TOPIC.CHATROOM] = CONVERSATION_TYPE.CHATROOM, _PUBLISH_TOPIC_TO_CON[PUBLISH_TOPIC.CUSTOMER_SERVICE] = CONVERSATION_TYPE.CUSTOMER_SERVICE, _PUBLISH_TOPIC_TO_CON[PUBLISH_STATUS_TOPIC.PRIVATE] = CONVERSATION_TYPE.PRIVATE, _PUBLISH_TOPIC_TO_CON[PUBLISH_STATUS_TOPIC.GROUP] = CONVERSATION_TYPE.GROUP, _PUBLISH_TOPIC_TO_CON[PUBLISH_STATUS_TOPIC.CHATROOM] = CONVERSATION_TYPE.CHATROOM, _PUBLISH_TOPIC_TO_CON);
  var CONVERSATION_TYPE_TO_PUBLISH_TOPIC = (_CONVERSATION_TYPE_TO = {}, _CONVERSATION_TYPE_TO[CONVERSATION_TYPE.PRIVATE] = PUBLISH_TOPIC.PRIVATE, _CONVERSATION_TYPE_TO[CONVERSATION_TYPE.GROUP] = PUBLISH_TOPIC.GROUP, _CONVERSATION_TYPE_TO[CONVERSATION_TYPE.CHATROOM] = PUBLISH_TOPIC.CHATROOM, _CONVERSATION_TYPE_TO[CONVERSATION_TYPE.CUSTOMER_SERVICE] = PUBLISH_TOPIC.CUSTOMER_SERVICE, _CONVERSATION_TYPE_TO);
  var CONVERSATION_TYPE_TO_PUBLISH_STATUS_TOPIC = (_CONVERSATION_TYPE_TO2 = {}, _CONVERSATION_TYPE_TO2[CONVERSATION_TYPE.PRIVATE] = PUBLISH_STATUS_TOPIC.PRIVATE, _CONVERSATION_TYPE_TO2[CONVERSATION_TYPE.GROUP] = PUBLISH_STATUS_TOPIC.GROUP, _CONVERSATION_TYPE_TO2);
  var CONVERSATION_TYPE_TO_QUERY_HISTORY_TOPIC = (_CONVERSATION_TYPE_TO3 = {}, _CONVERSATION_TYPE_TO3[CONVERSATION_TYPE.PRIVATE] = QUERY_HISTORY_TOPIC.PRIVATE, _CONVERSATION_TYPE_TO3[CONVERSATION_TYPE.GROUP] = QUERY_HISTORY_TOPIC.GROUP, _CONVERSATION_TYPE_TO3[CONVERSATION_TYPE.CHATROOM] = QUERY_HISTORY_TOPIC.CHATROOM, _CONVERSATION_TYPE_TO3[CONVERSATION_TYPE.CUSTOMER_SERVICE] = QUERY_HISTORY_TOPIC.CUSTOMER_SERVICE, _CONVERSATION_TYPE_TO3[CONVERSATION_TYPE.SYSTEM] = QUERY_HISTORY_TOPIC.SYSTEM, _CONVERSATION_TYPE_TO3);
  var CONVERSATION_TYPE_TO_CLEAR_MESSAGE_TOPIC = (_CONVERSATION_TYPE_TO4 = {}, _CONVERSATION_TYPE_TO4[CONVERSATION_TYPE.PRIVATE] = QUERY_TOPIC.CLEAR_MESSAGES.PRIVATE, _CONVERSATION_TYPE_TO4[CONVERSATION_TYPE.GROUP] = QUERY_TOPIC.CLEAR_MESSAGES.GROUP, _CONVERSATION_TYPE_TO4[CONVERSATION_TYPE.CUSTOMER_SERVICE] = QUERY_TOPIC.CLEAR_MESSAGES.CUSTOMER_SERVICE, _CONVERSATION_TYPE_TO4[CONVERSATION_TYPE.SYSTEM] = QUERY_TOPIC.CLEAR_MESSAGES.SYSTEM, _CONVERSATION_TYPE_TO4);
  var USER_SETTING_STATUS = {
    ADD: 1,
    UPDATE: 2,
    DELETE: 3
  };
  var CONVERSATION_STATUS_CONFIG = {
    ENABLED: '1',
    DISABLED: '0'
  };
  var CONVERSATION_STATUS_TYPE = {
    DO_NOT_DISTURB: 1,
    TOP: 2
  };

  var Header = function () {
    function Header(_type, _retain, _qos, _dup) {
      this.type = void 0;
      this.retain = false;
      this.qos = QOS.AT_LEAST_ONCE;
      this.dup = false;
      this.syncMsg = false;
      var isPlusType = utils.isPlus(_type);

      if (_type && isPlusType && arguments.length === 1) {
        this.retain = (_type & 1) > 0;
        this.qos = (_type & 6) >> 1;
        this.dup = (_type & 8) > 0;
        this.type = _type >> 4 & 15;
        this.syncMsg = (_type & 8) === 8;
      } else {
        this.type = _type;
        this.retain = _retain === undefined ? false : _retain;
        this.qos = _qos === undefined ? QOS.AT_LEAST_ONCE : _qos;
        this.dup = _dup === undefined ? false : _dup;
      }
    }

    var _proto = Header.prototype;

    _proto.encode = function encode() {
      var self = this;
      var validQosList = [QOS.AT_MOST_ONCE, QOS.AT_LEAST_ONCE, QOS.EXACTLY_ONCE, QOS.DEFAULT];
      utils.forEach(validQosList, function (qos) {
        if (self.qos === QOS[qos]) {
          self.qos = qos;
        }
      });

      var _byte = self.type << 4;

      _byte |= self.retain ? 1 : 0;
      _byte |= self.qos << 1;
      _byte |= self.dup ? 8 : 0;
      return _byte;
    };

    return Header;
  }();

  var BinaryHelper = {
    writeUTF: function writeUTF(str, isGetBytes) {
      var back = [],
          byteSize = 0;
      utils.forEach(str, function (_char, i) {
        var code = str.charCodeAt(i);

        if (code >= 0 && code <= 127) {
          byteSize += 1;
          back.push(code);
        } else if (code >= 128 && code <= 2047) {
          byteSize += 2;
          back.push(192 | 31 & code >> 6);
          back.push(128 | 63 & code);
        } else if (code >= 2048 && code <= 65535) {
          byteSize += 3;
          back.push(224 | 15 & code >> 12);
          back.push(128 | 63 & code >> 6);
          back.push(128 | 63 & code);
        }
      });
      utils.forEach(back, function (_char2, i) {
        if (_char2 > 255) {
          back[i] &= 255;
        }
      });

      if (isGetBytes) {
        return back;
      }

      if (byteSize <= 255) {
        return [0, byteSize].concat(back);
      } else {
        return [byteSize >> 8, byteSize & 255].concat(back);
      }
    },
    readUTF: function readUTF(arr) {
      var UTF = '';

      for (var i = 0, len = arr.length; i < len; i++) {
        var _char3 = arr[i];

        if (_char3 < 0) {
          arr[i] += 256;
        }

        var one = arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);

        if (v && one.length === 8) {
          var bytesLength = v[0].length,
              store = '';

          for (var st = 0; st < bytesLength; st++) {
            store += arr[st + i].toString(2).slice(2);
          }

          UTF += String.fromCharCode(parseInt(store, 2));
          i += bytesLength - 1;
        } else {
          UTF += String.fromCharCode(arr[i]);
        }
      }

      return UTF;
    }
  };

  var RongStreamReader = function () {
    function RongStreamReader(arr) {
      this.pool = void 0;
      this.position = 0;
      this.poolLen = 0;
      this.pool = arr;
      this.poolLen = arr.length;
    }

    var _proto2 = RongStreamReader.prototype;

    _proto2.check = function check() {
      return this.position >= this.pool.length;
    };

    _proto2.readInt = function readInt() {
      var self = this;

      if (self.check()) {
        return -1;
      }

      var end = '';

      for (var i = 0; i < 4; i++) {
        var t = self.pool[self.position++].toString(16);

        if (t.length === 1) {
          t = '0' + t;
        }

        end += t.toString();
      }

      return utils.parse16To10(end);
    };

    _proto2.readLong = function readLong() {
      var self = this;

      if (self.check()) {
        return -1;
      }

      var end = '';

      for (var i = 0; i < 8; i++) {
        var t = self.pool[self.position++].toString(16);

        if (t.length === 1) {
          t = '0' + t;
        }

        end += t;
      }

      return utils.parse16To10(end);
    };

    _proto2.readByte = function readByte() {
      if (this.check()) {
        return -1;
      }

      var val = this.pool[this.position++];

      if (val > 255) {
        val &= 255;
      }

      return val;
    };

    _proto2.readUTF = function readUTF() {
      if (this.check()) {
        return '';
      }

      var big = this.readByte() << 8 | this.readByte();
      var pool = this.pool.subarray(this.position, this.position += big);
      return BinaryHelper.readUTF(pool);
    };

    _proto2.readAll = function readAll() {
      return this.pool.subarray(this.position, this.poolLen);
    };

    return RongStreamReader;
  }();

  var RongStreamWriter = function () {
    function RongStreamWriter() {
      this.pool = [];
      this.position = 0;
      this.writen = 0;
    }

    var _proto3 = RongStreamWriter.prototype;

    _proto3.write = function write(_byte2) {
      if (utils.isArray(_byte2)) {
        this.pool = this.pool.concat(_byte2);
      } else if (utils.isPlus(_byte2)) {
        if (_byte2 > 255) {
          _byte2 &= 255;
        }

        this.pool.push(_byte2);
        this.writen++;
      }

      return _byte2;
    };

    _proto3.writeArr = function writeArr(_byte3) {
      this.pool = this.pool.concat(_byte3);
      return _byte3;
    };

    _proto3.writeUTF = function writeUTF(str) {
      var val = BinaryHelper.writeUTF(str);
      this.pool = this.pool.concat(val);
      this.writen += val.length;
    };

    _proto3.getBytesArray = function getBytesArray() {
      return this.pool;
    };

    return RongStreamWriter;
  }();

  var IDENTIFIER = {
    PUB: 'pub',
    QUERY: 'qry'
  };

  var _getIdentifier = function getIdentifier(messageId, identifier) {
    if (messageId && identifier) {
      return identifier + '_' + messageId;
    } else if (messageId) {
      return messageId;
    } else {
      return utils.getCurrentTimestamp();
    }
  };

  var BaseReader = function () {
    function BaseReader(header) {
      this._name = void 0;
      this._header = void 0;
      this.lengthSize = 0;
      this.messageId = void 0;
      this.timestamp = void 0;
      this.identifier = void 0;
      this._header = header;
    }

    var _proto = BaseReader.prototype;

    _proto.getIdentifier = function getIdentifier() {
      var messageId = this.messageId,
          identifier = this.identifier;
      return _getIdentifier(messageId, identifier);
    };

    _proto.read = function read(stream, length) {
      this.readMessage(stream, length);
    };

    _proto.readMessage = function readMessage(stream, length) {
      return {
        stream: stream,
        length: length
      };
    };

    return BaseReader;
  }();

  var BaseWriter = function () {
    function BaseWriter(headerType) {
      this._header = void 0;
      this.lengthSize = 0;
      this.data = void 0;
      this.messageId = void 0;
      this.topic = void 0;
      this.targetId = void 0;
      this.identifier = void 0;
      this._header = new Header(headerType, false, QOS.AT_MOST_ONCE, false);
    }

    var _proto2 = BaseWriter.prototype;

    _proto2.getIdentifier = function getIdentifier() {
      var messageId = this.messageId,
          identifier = this.identifier;
      return _getIdentifier(messageId, identifier);
    };

    _proto2.write = function write(stream) {
      var headerCode = this.getHeaderFlag();
      stream.write(headerCode);
      this.writeMessage(stream);
    };

    _proto2.writeMessage = function writeMessage(stream) {
      return stream;
    };

    _proto2.setHeaderQos = function setHeaderQos(qos) {
      this._header.qos = qos;
    };

    _proto2.getHeaderFlag = function getHeaderFlag() {
      return this._header.encode();
    };

    _proto2.getLengthSize = function getLengthSize() {
      return this.lengthSize;
    };

    _proto2.getBufferData = function getBufferData() {
      var stream = new RongStreamWriter();
      this.write(stream);
      var val = stream.getBytesArray();
      var binary = new Int8Array(val);
      return binary;
    };

    _proto2.getCometData = function getCometData() {
      var data = this.data || {};
      return utils.toJSON(data);
    };

    return BaseWriter;
  }();

  var ConnAckReader = function (_BaseReader) {
    _inheritsLoose(ConnAckReader, _BaseReader);

    function ConnAckReader() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _BaseReader.call.apply(_BaseReader, [this].concat(args)) || this;
      _this._name = MESSAGE_NAME.CONN_ACK;
      _this.status = void 0;
      _this.userId = void 0;
      _this.timestamp = void 0;
      return _this;
    }

    var _proto3 = ConnAckReader.prototype;

    _proto3.readMessage = function readMessage(stream, msgLength) {
      stream.readByte();
      this.status = +stream.readByte();

      if (msgLength > ConnAckReader.MESSAGE_LENGTH) {
        this.userId = stream.readUTF();
        stream.readUTF();
        this.timestamp = stream.readLong();
      }
    };

    return ConnAckReader;
  }(BaseReader);

  ConnAckReader.MESSAGE_LENGTH = 2;

  var DisconnectReader = function (_BaseReader2) {
    _inheritsLoose(DisconnectReader, _BaseReader2);

    function DisconnectReader() {
      var _this2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this2 = _BaseReader2.call.apply(_BaseReader2, [this].concat(args)) || this;
      _this2._name = MESSAGE_NAME.DISCONNECT;
      _this2.status = void 0;
      return _this2;
    }

    var _proto4 = DisconnectReader.prototype;

    _proto4.readMessage = function readMessage(stream) {
      stream.readByte();
      this.status = +stream.readByte();
    };

    return DisconnectReader;
  }(BaseReader);

  DisconnectReader.MESSAGE_LENGTH = 2;

  var PingReqWriter = function (_BaseWriter) {
    _inheritsLoose(PingReqWriter, _BaseWriter);

    function PingReqWriter() {
      var _this3;

      _this3 = _BaseWriter.call(this, OPERATE_TYPE.PINGREQ) || this;
      _this3._name = MESSAGE_NAME.PING_REQ;
      return _this3;
    }

    return PingReqWriter;
  }(BaseWriter);

  var PingRespReader = function (_BaseReader3) {
    _inheritsLoose(PingRespReader, _BaseReader3);

    function PingRespReader() {
      var _this4;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _this4 = _BaseReader3.call.apply(_BaseReader3, [this].concat(args)) || this;
      _this4._name = MESSAGE_NAME.PING_RESP;
      return _this4;
    }

    return PingRespReader;
  }(BaseReader);

  var RetryableReader = function (_BaseReader4) {
    _inheritsLoose(RetryableReader, _BaseReader4);

    function RetryableReader() {
      var _this5;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      _this5 = _BaseReader4.call.apply(_BaseReader4, [this].concat(args)) || this;
      _this5.messageId = void 0;
      return _this5;
    }

    var _proto5 = RetryableReader.prototype;

    _proto5.readMessage = function readMessage(stream) {
      var msgId = stream.readByte() * 256 + stream.readByte();
      this.messageId = parseInt(msgId, 10);
    };

    return RetryableReader;
  }(BaseReader);

  var RetryableWriter = function (_BaseWriter2) {
    _inheritsLoose(RetryableWriter, _BaseWriter2);

    function RetryableWriter() {
      var _this6;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      _this6 = _BaseWriter2.call.apply(_BaseWriter2, [this].concat(args)) || this;
      _this6.messageId = void 0;
      return _this6;
    }

    var _proto6 = RetryableWriter.prototype;

    _proto6.writeMessage = function writeMessage(stream) {
      var id = this.messageId;
      var lsb = id & 255;
      var msb = (id & 65280) >> 8;
      stream.write(msb);
      stream.write(lsb);
    };

    return RetryableWriter;
  }(BaseWriter);

  var PublishReader = function (_RetryableReader) {
    _inheritsLoose(PublishReader, _RetryableReader);

    function PublishReader() {
      var _this7;

      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      _this7 = _RetryableReader.call.apply(_RetryableReader, [this].concat(args)) || this;
      _this7._name = MESSAGE_NAME.PUBLISH;
      _this7.topic = void 0;
      _this7.data = void 0;
      _this7.targetId = void 0;
      _this7.date = void 0;
      _this7.syncMsg = false;
      _this7.identifier = IDENTIFIER.PUB;
      return _this7;
    }

    var _proto7 = PublishReader.prototype;

    _proto7.readMessage = function readMessage(stream) {
      this.date = stream.readInt();
      this.topic = stream.readUTF();
      this.targetId = stream.readUTF();
      RetryableReader.prototype.readMessage.apply(this, arguments);
      this.data = stream.readAll();
    };

    return PublishReader;
  }(RetryableReader);

  var PublishWriter = function (_RetryableWriter) {
    _inheritsLoose(PublishWriter, _RetryableWriter);

    function PublishWriter(topic, data, targetId) {
      var _this8;

      _this8 = _RetryableWriter.call(this, OPERATE_TYPE.PUBLISH) || this;
      _this8._name = MESSAGE_NAME.PUBLISH;
      _this8.topic = void 0;
      _this8.data = void 0;
      _this8.targetId = void 0;
      _this8.date = void 0;
      _this8.syncMsg = false;
      _this8.identifier = IDENTIFIER.PUB;
      _this8.topic = topic;
      _this8.data = utils.isString(data) ? BinaryHelper.writeUTF(data) : data;
      _this8.targetId = targetId;
      return _this8;
    }

    var _proto8 = PublishWriter.prototype;

    _proto8.writeMessage = function writeMessage(stream) {
      stream.writeUTF(this.topic);
      stream.writeUTF(this.targetId);
      RetryableWriter.prototype.writeMessage.apply(this, arguments);
      stream.write(this.data);
    };

    return PublishWriter;
  }(RetryableWriter);

  var PubAckReader = function (_RetryableReader2) {
    _inheritsLoose(PubAckReader, _RetryableReader2);

    function PubAckReader() {
      var _this9;

      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      _this9 = _RetryableReader2.call.apply(_RetryableReader2, [this].concat(args)) || this;
      _this9._name = MESSAGE_NAME.PUB_ACK;
      _this9.status = void 0;
      _this9.date = 0;
      _this9.data = void 0;
      _this9.millisecond = 0;
      _this9.messageUId = void 0;
      _this9.timestamp = 0;
      _this9.identifier = IDENTIFIER.PUB;
      return _this9;
    }

    var _proto9 = PubAckReader.prototype;

    _proto9.readMessage = function readMessage(stream) {
      RetryableReader.prototype.readMessage.call(this, stream);
      this.date = stream.readInt();
      this.status = stream.readByte() * 256 + stream.readByte();
      this.millisecond = stream.readByte() * 256 + stream.readByte();
      this.timestamp = this.date * 1000 + this.millisecond;
      this.messageUId = stream.readUTF();
    };

    return PubAckReader;
  }(RetryableReader);

  var PubAckWriter = function (_RetryableWriter2) {
    _inheritsLoose(PubAckWriter, _RetryableWriter2);

    function PubAckWriter(messageId) {
      var _this10;

      _this10 = _RetryableWriter2.call(this, OPERATE_TYPE.PUBACK) || this;
      _this10._name = MESSAGE_NAME.PUB_ACK;
      _this10.status = void 0;
      _this10.date = 0;
      _this10.millisecond = 0;
      _this10.messageUId = void 0;
      _this10.timestamp = 0;
      _this10.messageId = messageId;
      return _this10;
    }

    var _proto10 = PubAckWriter.prototype;

    _proto10.writeMessage = function writeMessage(stream) {
      RetryableWriter.prototype.writeMessage.call(this, stream);
    };

    return PubAckWriter;
  }(RetryableWriter);

  var QueryWriter = function (_RetryableWriter3) {
    _inheritsLoose(QueryWriter, _RetryableWriter3);

    function QueryWriter(topic, data, targetId) {
      var _this11;

      _this11 = _RetryableWriter3.call(this, OPERATE_TYPE.QUERY) || this;
      _this11._name = MESSAGE_NAME.QUERY;
      _this11.topic = void 0;
      _this11.data = void 0;
      _this11.targetId = void 0;
      _this11.identifier = IDENTIFIER.QUERY;
      _this11.topic = topic;
      _this11.data = utils.isString(data) ? BinaryHelper.writeUTF(data) : data;
      _this11.targetId = targetId;
      return _this11;
    }

    var _proto11 = QueryWriter.prototype;

    _proto11.writeMessage = function writeMessage(stream) {
      stream.writeUTF(this.topic);
      stream.writeUTF(this.targetId);
      RetryableWriter.prototype.writeMessage.call(this, stream);
      stream.write(this.data);
    };

    return QueryWriter;
  }(RetryableWriter);

  var QueryConWriter = function (_RetryableWriter4) {
    _inheritsLoose(QueryConWriter, _RetryableWriter4);

    function QueryConWriter(messageId) {
      var _this12;

      _this12 = _RetryableWriter4.call(this, OPERATE_TYPE.QUERYCON) || this;
      _this12._name = MESSAGE_NAME.QUERY_CON;
      _this12.messageId = messageId;
      return _this12;
    }

    return QueryConWriter;
  }(RetryableWriter);

  var QueryAckReader = function (_RetryableReader3) {
    _inheritsLoose(QueryAckReader, _RetryableReader3);

    function QueryAckReader() {
      var _this13;

      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      _this13 = _RetryableReader3.call.apply(_RetryableReader3, [this].concat(args)) || this;
      _this13._name = MESSAGE_NAME.QUERY_ACK;
      _this13.data = void 0;
      _this13.status = void 0;
      _this13.date = void 0;
      _this13.identifier = IDENTIFIER.QUERY;
      return _this13;
    }

    var _proto12 = QueryAckReader.prototype;

    _proto12.readMessage = function readMessage(stream) {
      RetryableReader.prototype.readMessage.call(this, stream);
      this.date = stream.readInt();
      this.status = stream.readByte() * 256 + stream.readByte();
      this.data = stream.readAll();
    };

    return QueryAckReader;
  }(RetryableReader);

  var getReaderByHeader = function getReaderByHeader(header) {
    var type = header.type,
        msg = new BaseReader(header);

    switch (type) {
      case OPERATE_TYPE.CONNACK:
        msg = new ConnAckReader(header);
        break;

      case OPERATE_TYPE.PUBLISH:
        msg = new PublishReader(header);
        msg.syncMsg = header.syncMsg;
        break;

      case OPERATE_TYPE.PUBACK:
        msg = new PubAckReader(header);
        break;

      case OPERATE_TYPE.QUERYACK:
        msg = new QueryAckReader(header);
        break;

      case OPERATE_TYPE.SUBACK:
      case OPERATE_TYPE.UNSUBACK:
      case OPERATE_TYPE.PINGRESP:
        msg = new PingRespReader(header);
        break;

      case OPERATE_TYPE.DISCONNECT:
        msg = new DisconnectReader(header);
        break;

      default:
        throw new Error('No support for deserializing ' + type + ' messages');
    }

    return msg;
  };

  var readWSBuffer = function readWSBuffer(data) {
    var arr = new Uint8Array(data);
    var stream = new RongStreamReader(arr);
    var flags = stream.readByte(),
        header = new Header(flags);
    var msg = getReaderByHeader(header);
    msg.read(stream, arr.length - 1);
    return msg;
  };

  var readCometData = function readCometData(data) {
    var flags = data.headerCode,
        header = new Header(flags);
    var msg = getReaderByHeader(header);
    utils.forEach(data, function (item, key) {
      if (key in msg) {
        msg[key] = item;
      }
    });
    return msg;
  };

  var ENGINE_EVENT = {
    WATCH: 'watch',
    UN_WATCH: 'unwatch',
    CONNECT: 'connect',
    RECONNECT: 'reconnect',
    DISCONNECT: 'disconnect',
    CHANGE_USER: 'changeUser',
    GET_CONNECTION_STATUS: 'getConnectionStatus',
    GET_CONNECTION_USER_ID: 'getConnectionUserId',
    GET_CONNECTED_TIME: 'getConnectedTime',
    GET_APP_INFO: 'getAppInfo',
    GET_CONVERSATION_LIST: 'getConversationList',
    REMOVE_CONVERSATION_LIST: 'removeConversationList',
    REMOVE_CONVERSATION: 'removeConversation',
    GET_TOTAL_UNREAD_COUNT: 'getTotalUnreadCount',
    CLEAR_UNREAD_COUNT: 'clearUnreadCount',
    GET_UNREAD_COUNT: 'getUnreadCount',
    GET_LOCAL_CONVERSATION: 'getLocalConversation',
    SET_CONVERSATION_STATUS_LIST: 'setConversationStatusList',
    SEND_MESSAGE: 'sendMessage',
    GET_HISTORY_MSGS: 'getHistoryMessages',
    DELETE_MESSAGES: 'deleteHistoryMessages',
    CLEAR_MESSAGES: 'clearHistoryMessages',
    RECALL_MESSAGE: 'recallMessage',
    JOIN_CHATROOM: 'joinChatRoom',
    QUIT_CHATROOM: 'quitChatRoom',
    GET_CHATROOM_INFO: 'getChatRoomInfo',
    GET_CHATROOM_MSGS: 'getChatRoomHistoryMessages',
    SET_KV: 'setChatRoomKV',
    FORCE_SET_KV: 'forceSetChatRoomKV',
    DEL_KV: 'removeChatRoomKV',
    FORCE_DEL_KV: 'forceRemoveChatRoomKV',
    GET_KV: 'getChatRoomKV',
    GET_ALL_KV: 'getAllChatRoomKV',
    JOIN_RTC: 'joinRTCRoom',
    QUIT_RTC: 'quitRTCRoom',
    PING_RTC: 'RTCPing',
    GET_RTC_ROOM_INFO: 'getRTCRoomInfo',
    SET_RTC_DATA: 'setRTCData',
    SET_RTC_USER_DATA: 'setRTCUserData',
    GET_RTC_DATA: 'getRTCData',
    DEL_RTC_DATA: 'removeRTCData',
    SET_RTC_OUT_DATA: 'setRTCOutData',
    GET_RTC_OUT_DATA: 'getRTCOutData',
    GET_RTC_TOKEN: 'getRTCToken',
    SET_RTC_STATE: 'setRTCState',
    GET_RTC_USER_INFO_LIST: 'getRTCUserInfoList',
    SET_RTC_USER_INFO: 'setRTCUserInfo',
    DEL_RTC_USER_INFO: 'removeRTCUserInfo',
    GET_RTC_USER_LIST: 'getRTCUserList',
    GET_UPLOAD_TOKEN: 'getFileToken',
    GET_UPLOAD_URL: 'getFileUrl'
  };
  var ENGINE_EVENT_NEED_CONNECTED = [ENGINE_EVENT.GET_CONVERSATION_LIST, ENGINE_EVENT.REMOVE_CONVERSATION_LIST, ENGINE_EVENT.REMOVE_CONVERSATION, ENGINE_EVENT.GET_TOTAL_UNREAD_COUNT, ENGINE_EVENT.CLEAR_UNREAD_COUNT, ENGINE_EVENT.SEND_MESSAGE, ENGINE_EVENT.GET_HISTORY_MSGS, ENGINE_EVENT.DELETE_MESSAGES, ENGINE_EVENT.CLEAR_MESSAGES, ENGINE_EVENT.RECALL_MESSAGE, ENGINE_EVENT.JOIN_CHATROOM, ENGINE_EVENT.QUIT_CHATROOM, ENGINE_EVENT.GET_CHATROOM_INFO, ENGINE_EVENT.GET_CHATROOM_MSGS];
  var ENGINE_EVENT_NEED_DISCONNECTED = [ENGINE_EVENT.CONNECT, ENGINE_EVENT.RECONNECT];
  var IM_EVENT = {
    STATUS: 'status',
    MESSAGE: 'message',
    CONVERSATION: 'conversation',
    SETTING: 'setting',
    CHATROOM: 'chatroom'
  };
  var TRANSPORT_EVENT = {
    SIGNAL: 'signal',
    STATUS: 'status'
  };
  var SERVER_EVENT_NAME = {
    STATUS: 'status',
    NOTIFY_PULL: 'notifyPull',
    DIRECT_MSG: 'directMessage',
    CHRM_KV_CHANGED: 'chatRoomKV',
    CHRM_KV_SET: 'chatRoomKVSet',
    MESSAGE_SEND: 'sendMessage',
    JOIN_CHATROOM: 'joinChatRoom',
    BEFORE_JOIN_CHATROOM: 'beforeJoinChatRoom',
    USER_SETTING_CHANGED: 'userSetting',
    CONVERSATION_STATUS_CHANGED: 'converStatusChanged',
    CONVERSATION_STATUS_SETED: 'converStatusSeted'
  };

  var _APP_ENGINE_EVENT_LOG;
  var PLATFORM$1 = 'Web';
  var LEVEL = {
    FATAL: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
  };
  var STORE_SIZE = {
    ADVANCED: 500,
    LOW: 500
  };
  var LOG_TYPE = {
    'IM': 'IM',
    'RTC': 'RTC'
  };
  var TAG = {
    L_GET_NAVI_T: 'L-get_navi-T',
    L_GET_NAVI_R: 'L-get_navi-R',
    L_PING_WS_T: 'L-ping_ws-T',
    L_PING_WS_R: 'L-ping_ws-R',
    L_NETWORK_CHANGED_S: 'L-network_changed-S',
    L_DECODE_MSG_E: 'L-decode_msg-E',
    L_RECONNECT_T: 'L-reconnect-T',
    L_RECONNECT_R: 'L-reconnect-R',
    L_PULL_CHRM_KV_T: 'L-pull-chrm-kv-T',
    L_PULL_CHRM_KV_R: 'L-pull-chrm-kv-R',
    L_PING_S: 'L-ping-S',
    L_CRASH_E: 'L-crash-E',
    L_COMET_SEND_SIGNAL_E: 'L-comet_send_signal-E',
    A_INIT_O: 'A-init-O',
    A_CONNECT_T: 'A-connect-T',
    A_CONNECT_R: 'A-connect-R',
    A_DISCONNECT_T: 'A-disconnect-T',
    A_DISCONNECT_R: 'A-disconnect-R',
    A_RECONNECT_T: 'A-reconnect-T',
    A_RECONNECT_R: 'A-reconnect-R',
    A_JOIN_CHATROOM_T: 'A-join_chatroom-T',
    A_JOIN_CHATROOM_R: 'A-join_chatroom-R',
    A_QUIT_CHATROOM_T: 'A-quit_chatroom-T',
    A_QUIT_CHATROOM_R: 'A-quit_chatroom-R',
    P_NOTIFY_CHRM_KV_S: 'P-notify-chrm-kv-R',
    G_CRASH_E: 'G-crash-E',
    G_UPLOAD_LOG_S: 'G-upload_log-S',
    G_UPLOAD_LOG_E: 'G-upload_log-E'
  };
  var APP_ENGINE_EVENT_LOG_TAG = (_APP_ENGINE_EVENT_LOG = {}, _APP_ENGINE_EVENT_LOG[ENGINE_EVENT.CONNECT] = {
    req: TAG.A_CONNECT_T,
    resp: TAG.A_CONNECT_R
  }, _APP_ENGINE_EVENT_LOG[ENGINE_EVENT.DISCONNECT] = {
    req: TAG.A_DISCONNECT_T,
    resp: TAG.A_DISCONNECT_R
  }, _APP_ENGINE_EVENT_LOG[ENGINE_EVENT.RECONNECT] = {
    req: TAG.A_RECONNECT_T,
    resp: TAG.A_RECONNECT_R
  }, _APP_ENGINE_EVENT_LOG[ENGINE_EVENT.JOIN_CHATROOM] = {
    req: TAG.A_JOIN_CHATROOM_T,
    resp: TAG.A_JOIN_CHATROOM_R
  }, _APP_ENGINE_EVENT_LOG[ENGINE_EVENT.QUIT_CHATROOM] = {
    req: TAG.A_QUIT_CHATROOM_T,
    resp: TAG.A_QUIT_CHATROOM_R
  }, _APP_ENGINE_EVENT_LOG);
  var REPORT_TYPE = {
    REALTIME: 0,
    FULL: 1
  };
  var CSV_LOG_TPL = '{sessionId},{time},{type},{level},{tag},{content}\n';
  var REALTIME_URL_TPL = '{protocol}{url}?version={version}&appkey={appkey}&userId={userId}&deviceId={deviceId}&deviceInfo={deviceInfo}&platform={platform}';
  var MSGNOTIF_URL_TPL = '{protocol}{url}?version={version}&appkey={appkey}&userId={userId}&logId={logId}&deviceId={deviceId}&deviceInfo={deviceInfo}&platform={platform}';
  var LOG_CMD_MSG_SENDER = 'rongcloudsystem';
  var NO_FULL_LOG = 'nodata';
  var REQUEST_TIMEOUT = 15000;
  var DEFAULT_SERVER_OPTION = {
    isOpen: true,
    url: 'logcollection.ronghub.com',
    realtimeLevel: LEVEL.ERROR,
    realtimeInterval: 20000,
    realtimeMaxTimes: 5,
    fullInterval: 5000,
    fullMaxTimes: 3,
    fullLevel: LEVEL.DEBUG
  };
  var IGNORE_ERROR_CODE = [ERROR_CODE.RC_CONNECTION_EXIST];

  var isEmpty$1 = utils.isEmpty,
      tplEngine$1 = utils.tplEngine;

  var getTransporterUrl = function getTransporterUrl(option) {
    var domain = option.domain,
        appkey = option.appkey,
        token = option.token,
        connectType = option.connectType,
        protocol = option.protocol;
    var isComet = connectType === CONNECT_TYPE.COMET;
    var cmpTpl = CMP_URL_TPL;

    if (isEmpty$1(protocol)) {
      protocol = isComet ? env.protocol.http : env.protocol.ws;
    }

    var tplOption = {
      domain: domain,
      appkey: appkey,
      protocol: protocol,
      apiVer: env.isFromUniapp ? 'uniapp' : 'normal',
      token: utils.encodeURI(token)
    };

    if (env.isMini) {
      cmpTpl = MINI_CMP_URL_TPL;
      utils.extend(tplOption, {
        platform: PLATFORM_TYPE.MINI
      });
    }

    return tplEngine$1(cmpTpl, tplOption);
  };

  var isGroup = function isGroup(type) {
    return type === CONVERSATION_TYPE.GROUP;
  };

  var isChatRoom = function isChatRoom(type) {
    return type === CONVERSATION_TYPE.CHATROOM;
  };

  var getConversationTypeList = function getConversationTypeList() {
    return utils.getValues(CONVERSATION_TYPE);
  };

  var isValidConversationType = function isValidConversationType(type) {
    var conversationTypeList = getConversationTypeList();
    return utils.isNumber(type) && utils.isInclude(conversationTypeList, type);
  };

  var getSessionId = function getSessionId(option) {
    var isStatusMessage = option.isStatusMessage;
    var isPersited = option.isPersited,
        isCounted = option.isCounted,
        isMentiond = option.isMentiond,
        disableNotification = option.disableNotification;

    if (isStatusMessage) {
      isPersited = isCounted = false;
    }

    var sessionId = 0;

    if (isPersited) {
      sessionId = sessionId | 0x01;
    }

    if (isCounted) {
      sessionId = sessionId | 0x02;
    }

    if (isMentiond) {
      sessionId = sessionId | 0x04;
    }

    if (disableNotification) {
      sessionId = sessionId | 0x20;
    }

    return sessionId;
  };

  var getPersitedAndCountedBySessionId = function getPersitedAndCountedBySessionId(sessionId) {
    var isPersited, isCounted;

    switch (sessionId) {
      case MESSAGE_TAG.COUNT_ONLY:
        isPersited = false;
        isCounted = true;
        break;

      case MESSAGE_TAG.PERSIT_ONLY:
        isPersited = true;
        isCounted = false;
        break;

      case MESSAGE_TAG.NONE:
        isPersited = isCounted = false;
        break;

      case MESSAGE_TAG.PERSIT_AND_COUNT:
      default:
        isPersited = isCounted = true;
        break;
    }

    return {
      isPersited: isPersited,
      isCounted: isCounted
    };
  };

  var getPersitedAndCountedAndSlientBySessionId = function getPersitedAndCountedAndSlientBySessionId(sessionId) {
    var binaryNum = Number(sessionId).toString(2);
    var sessionIdArr = [];

    for (var i = 0; i < binaryNum.length; i++) {
      var index = binaryNum.length - 1 - i;
      sessionIdArr.push(Number(binaryNum[index]));
    }

    return {
      isPersited: Boolean(sessionIdArr[0]),
      isCounted: Boolean(sessionIdArr[1]),
      disableNotification: Boolean(sessionIdArr[5])
    };
  };

  var getMessageOptionByStatus = function getMessageOptionByStatus(status) {
    var isPersited = true,
        isCounted = true,
        isMentiond = false,
        disableNotification = false;
    isPersited = !!(status & 0x10);
    isCounted = !!(status & 0x20);
    isMentiond = !!(status & 0x40);
    disableNotification = !!(status & 0x200);
    return {
      isPersited: isPersited,
      isCounted: isCounted,
      isMentiond: isMentiond,
      disableNotification: disableNotification
    };
  };

  var SignalId = {
    ids: {},
    temp: '{appkey}_{userId}',
    get: function get(option) {
      var key = utils.tplEngine(SignalId.temp, option);
      var id = SignalId.ids[key] || 0;
      id++;
      SignalId.ids[key] = id;
      return id;
    },
    clear: function clear(option) {
      var key = utils.tplEngine(SignalId.temp, option);
      SignalId.ids[key] = 0;
    },
    isExceedLimit: function isExceedLimit(id) {
      return id > MAX_SINGAL_ID;
    }
  };

  var RCSocket = function () {
    function RCSocket(options) {
      this._socket = void 0;
      this.eventEmitter = new utils.EventEmitter();
      this.KEY = {
        OPEN: 'open',
        MSG: 'msg',
        ERROR: 'error',
        CLOSE: 'close'
      };
      var self = this;
      var KEY = self.KEY;
      self._socket = new utils.Socket(options);

      self._socket.onOpen(function (data) {
        self.eventEmitter.emit(KEY.OPEN, data);
      });

      self._socket.onMessage(function (data) {
        self.eventEmitter.emit(KEY.MSG, data);
      });

      self._socket.onError(function (data) {
        data = self._formatCloseData(data);
        self.eventEmitter.emit(KEY.ERROR, data);
      });

      self._socket.onClose(function (data) {
        data = self._formatCloseData(data);
        self.eventEmitter.emit(KEY.CLOSE, data);
      });
    }

    var _proto = RCSocket.prototype;

    _proto._formatCloseData = function _formatCloseData(data) {
      if (env.isMini || env.isAppPlus) {
        data = data || {};
        var _data = data,
            errMsg = _data.errMsg;
        data.code = MINI_ERROR_MSG_TO_STATUS[errMsg];
      }

      return data;
    };

    _proto.send = function send(data) {
      return this._socket.send(data);
    };

    _proto.close = function close() {
      this.eventEmitter.clear();

      this._socket.close();
    };

    _proto.onOpen = function onOpen(event) {
      this.eventEmitter.on(this.KEY.OPEN, event);
    };

    _proto.onMessage = function onMessage(event) {
      this.eventEmitter.on(this.KEY.MSG, event);
    };

    _proto.onError = function onError(event) {
      this.eventEmitter.on(this.KEY.ERROR, event);
    };

    _proto.onClose = function onClose(event) {
      this.eventEmitter.on(this.KEY.CLOSE, event);
    };

    return RCSocket;
  }();

  var RCStorage = function () {
    function RCStorage(suffix) {
      var _ref;

      this._cache = void 0;
      this.STORAGE_KEY = void 0;
      var storageKey = suffix ? STORAGE_ROOT_KEY + suffix : STORAGE_ROOT_KEY;
      var localCache = utils.Storage.get(storageKey) || {};
      this._cache = new utils.Cache((_ref = {}, _ref[storageKey] = localCache, _ref));
      this.STORAGE_KEY = storageKey;
    }

    var _proto2 = RCStorage.prototype;

    _proto2._get = function _get() {
      var KEY = this.STORAGE_KEY;
      return this._cache.get(KEY) || {};
    };

    _proto2._set = function _set(cache) {
      var KEY = this.STORAGE_KEY;
      cache = cache || {};

      this._cache.set(KEY, cache);

      utils.Storage.set(KEY, cache);
    };

    _proto2.set = function set(key, value) {
      var localValue = this._get();

      localValue[key] = value;

      this._set(localValue);
    };

    _proto2.remove = function remove(key) {
      var localValue = this._get();

      delete localValue[key];

      this._set(localValue);
    };

    _proto2.clear = function clear() {
      var KEY = this.STORAGE_KEY;
      utils.Storage.remove(KEY);

      this._cache.remove(KEY);
    };

    _proto2.get = function get(key) {
      var localValue = this._get();

      return localValue[key];
    };

    _proto2.getKeys = function getKeys() {
      var localValue = this._get();

      return utils.getKeys(localValue);
    };

    _proto2.getValues = function getValues() {
      return this._get() || {};
    };

    return RCStorage;
  }();

  var formatSyncTime = function formatSyncTime(_syncTime) {
    _syncTime = _syncTime || {};
    _syncTime.inboxTime = _syncTime.inboxTime || 0;
    _syncTime.sendboxTime = _syncTime.sendboxTime || 0;
    return _syncTime;
  };

  var MessageTimeSyner = function () {
    function MessageTimeSyner(option) {
      this._syncTime = void 0;
      this._storage = void 0;
      option = option || {};
      var _option = option,
          startSyncTime = _option.startSyncTime;

      this._initStorage(option);

      if (startSyncTime) {
        this._syncTime = formatSyncTime(startSyncTime);
      }
    }

    var _proto3 = MessageTimeSyner.prototype;

    _proto3._initStorage = function _initStorage(option) {
      var appkey = option.appkey,
          userId = option.userId;
      var ROOT_KEY = utils.tplEngine(STORAGE_SYNC_TIME.ROOT_KEY_TPL, {
        appkey: appkey,
        userId: userId
      });
      var storage = new RCStorage(ROOT_KEY);
      var syncTime = {
        sendboxTime: storage.get(STORAGE_SYNC_TIME.SUB_KEY.SENDBOX),
        inboxTime: storage.get(STORAGE_SYNC_TIME.SUB_KEY.INBOX)
      };
      this._storage = storage;
      this._syncTime = formatSyncTime(syncTime);
    };

    _proto3.setInbox = function setInbox(time) {
      var beforeTime = this._syncTime.inboxTime || 0;

      if (beforeTime < time) {
        this._syncTime.inboxTime = time;

        this._storage.set(STORAGE_SYNC_TIME.SUB_KEY.INBOX, time);
      }
    };

    _proto3.setSendbox = function setSendbox(time) {
      var beforeTime = this._syncTime.sendboxTime || 0;

      if (beforeTime < time) {
        this._syncTime.sendboxTime = time;

        this._storage.set(STORAGE_SYNC_TIME.SUB_KEY.SENDBOX, time);
      }
    };

    _proto3.setByMessage = function setByMessage(msg) {
      var messageDirection = msg.messageDirection,
          sentTime = msg.sentTime;
      var isSelfSend = messageDirection === MESSAGE_DIRECTION.SEND;
      isSelfSend ? this.setSendbox(sentTime) : this.setInbox(sentTime);
    };

    _proto3.get = function get() {
      return formatSyncTime(this._syncTime);
    };

    return MessageTimeSyner;
  }();

  var ChatRoomMessageTimeSyner = function () {
    function ChatRoomMessageTimeSyner(option) {
      this._rootKey = void 0;
      this._pullTimes = {};
      option = option || {};
      var _option2 = option,
          appkey = _option2.appkey,
          userId = _option2.userId;
      this._rootKey = utils.tplEngine(SESSION_SYNC_TIME.ROOT_KEY_TPL, {
        appkey: appkey,
        userId: userId
      });
    }

    var _proto4 = ChatRoomMessageTimeSyner.prototype;

    _proto4.set = function set(chrmId, time) {
      this._pullTimes[chrmId] = time;
      utils.Session.set(this._rootKey, this._pullTimes);
    };

    _proto4.get = function get(chrmId) {
      var pullTimes;

      if (utils.isEmpty(this._pullTimes)) {
        pullTimes = utils.Session.get(this._rootKey) || {};
      } else {
        pullTimes = this._pullTimes;
      }

      return pullTimes[chrmId] || 0;
    };

    _proto4.setByMessage = function setByMessage(msg) {
      var sentTime = msg.sentTime;
      var chrmId = msg.targetId;
      var beforeTime = this.get(chrmId);

      if (beforeTime < sentTime) {
        this.set(chrmId, sentTime);
      }
    };

    return ChatRoomMessageTimeSyner;
  }();

  var JoinedChatRoomSyner = function () {
    function JoinedChatRoomSyner(option) {
      this._rootKey = void 0;
      this._joinedChatRoomInfos = [];
      option = option || {};
      var _option3 = option,
          appkey = _option3.appkey,
          userId = _option3.userId;
      this._rootKey = utils.tplEngine(SESSION_SYNC_CHATROOM.ROOT_KEY_TPL, {
        appkey: appkey,
        userId: userId
      });
    }

    var _proto5 = JoinedChatRoomSyner.prototype;

    _proto5.set = function set(option) {
      var _this = this;

      var chrmId = option.chrmId,
          count = option.count,
          isOpenJoinMulitpleChrmService = option.isOpenJoinMulitpleChrmService;
      var backupJoinedChatRoomInfos = utils.copy(this._joinedChatRoomInfos);

      if (isOpenJoinMulitpleChrmService) {
        utils.forEach(backupJoinedChatRoomInfos, function (chrmInfo, index) {
          if (chrmInfo.chrmId === option.chrmId) {
            _this._joinedChatRoomInfos.splice(index, 1);
          }
        });

        this._joinedChatRoomInfos.push({
          chrmId: chrmId,
          count: count
        });
      } else {
        this._joinedChatRoomInfos = [{
          chrmId: chrmId,
          count: count
        }];
      }

      utils.Session.set(this._rootKey, this._joinedChatRoomInfos);
    };

    _proto5.get = function get() {
      if (utils.isEmpty(this._joinedChatRoomInfos)) {
        return utils.Session.get(this._rootKey) || [];
      } else {
        return this._joinedChatRoomInfos;
      }
    };

    _proto5.remove = function remove(chrmId) {
      var joinedChatRoom = utils.isEmpty(this._joinedChatRoomInfos) ? this._joinedChatRoomInfos : utils.Session.get(this._rootKey);
      if (utils.isEmpty(joinedChatRoom)) return;
      utils.forEach(joinedChatRoom, function (chrmInfo, index) {
        if (chrmInfo.chrmId === chrmId) {
          return joinedChatRoom.splice(index, 1);
        }
      });
      utils.Session.set(this._rootKey, joinedChatRoom);
    };

    _proto5.clear = function clear() {
      this._joinedChatRoomInfos = [];
      utils.Session.remove(this._rootKey);
    };

    return JoinedChatRoomSyner;
  }();

  var getUIDByToken = function getUIDByToken(token) {
    return utils.md5(token).slice(8, 16);
  };

  var isIncludeNavi = function isIncludeNavi(token) {
    return utils.isInclude(token, NAVI_SEPARATOR_IN_TOKEN);
  };

  var getNaviListByToken = function getNaviListByToken(token) {
    var navDomainList = [];

    if (isIncludeNavi(token)) {
      var separatorIndex = utils.indexOf(token, NAVI_SEPARATOR_IN_TOKEN);
      var navsText = token.substring(separatorIndex + 1, token.length);
      var domainList = navsText.split(DOMAIN_SEPARATOR_IN_NAVLIST);
      utils.forEach(domainList, function (domain) {
        if (!isEmpty$1(domain)) {
          navDomainList.push(domain);
        }
      });
    }

    return navDomainList;
  };

  var getCMPDomainList = function getCMPDomainList(option, customOption) {
    var server = option.server,
        backupServer = option.backupServer;
    server = server || '';
    backupServer = backupServer || '';
    var backupCMPList = backupServer.split(DOMAIN_SEPARATOR_IN_CMPLIST);
    var cmpList = [];

    if (!utils.isEmpty(server)) {
      cmpList.push(server);
    }

    utils.forEach(backupCMPList, function (cmp) {
      if (!utils.isEmpty(cmp)) {
        cmpList.push(cmp);
      }
    });

    if (!utils.isUndefined(customOption.customCMP) && !utils.isEmpty(customOption.customCMP)) {
      cmpList = customOption.customCMP;
    }

    return cmpList;
  };

  var getValidToken = function getValidToken(token) {
    if (isIncludeNavi(token)) {
      var separatorIndex = utils.indexOf(token, NAVI_SEPARATOR_IN_TOKEN);
      token = token.substring(0, separatorIndex + 1);
    }

    return token;
  };

  var getConnectType = function getConnectType(option) {
    var connectType = option.connectType;
    var isSpecifiedSocket = connectType === CONNECT_TYPE.WEBSOCKET;
    var isSocket = isSpecifiedSocket && utils.isSupportSocket();
    return isSocket ? CONNECT_TYPE.WEBSOCKET : CONNECT_TYPE.COMET;
  };

  var isConnected = function isConnected(status) {
    return utils.isEqual(status, CONNECTION_STATUS.CONNECTED);
  };

  var isConnecting = function isConnecting(status) {
    return utils.isEqual(status, CONNECTION_STATUS.CONNECTING);
  };

  var isDisconnected = function isDisconnected(status) {
    return !isConnected(status) && !isConnecting(status);
  };

  var getNavReqOption = function getNavReqOption(option, user) {
    option = utils.copy(option);
    option.token = user.token;
    return option;
  };

  var getPingTimeout = function getPingTimeout(timeSpentConnect) {
    var timeout = timeSpentConnect * 3;

    if (timeout < IM_PING_MIN_TIMEOUT) {
      return IM_PING_MIN_TIMEOUT;
    }

    if (timeout > IM_PING_MAX_TIMEOUT) {
      return IM_PING_MAX_TIMEOUT;
    }

    return timeout;
  };

  var DelayTimer = {
    _delayTime: 0,
    setTime: function setTime(time) {
      var currentTime = utils.getCurrentTimestamp();
      DelayTimer._delayTime = currentTime - time;
    },
    getTime: function getTime() {
      var delayTime = DelayTimer._delayTime;
      var currentTime = utils.getCurrentTimestamp();
      return currentTime - delayTime;
    }
  };

  var isInValidConversationData = function isInValidConversationData(conversation) {
    return !conversation.type || !conversation.targetId || !utils.isObject(conversation.latestMessage) || utils.isUndefined(conversation.unreadMessageCount);
  };

  var fixConversationData = function fixConversationData(conversation) {
    conversation = conversation || {};
    var _conversation = conversation,
        targetId = _conversation.targetId,
        type = _conversation.type;
    var defaultType = CONVERSATION_TYPE.PRIVATE,
        defaultId = '',
        defaultMsg = {
      messageType: MESSAGE_TYPE.TEXT,
      sentTime: DelayTimer.getTime(),
      content: {
        content: ''
      },
      senderUserId: targetId,
      targetId: targetId,
      type: type
    };
    conversation.type = type || defaultType;
    conversation.targetId = targetId || defaultId;
    conversation.latestMessage = conversation.latestMessage || defaultMsg;
    return conversation;
  };

  var sortConversationList = function sortConversationList(conversationList) {
    if (utils.isEmpty(conversationList)) {
      return [];
    }

    return utils.quickSort(conversationList, function (before, after) {
      before = before || {};
      after = after || {};
      var beforeLatestMessage = before.latestMessage || {},
          afterLatestMessage = after.latestMessage || {},
          beforeLatestSentTime = beforeLatestMessage.sentTime || 0,
          afterLatestSentTime = afterLatestMessage.sentTime || 0;
      var flag = false;

      if (before.isTop && !after.isTop) {
        flag = false;
      } else if (!before.isTop && after.isTop) {
        flag = true;
      } else {
        flag = afterLatestSentTime <= beforeLatestSentTime;
      }

      return flag;
    });
  };

  var splitConversationListByIsTop = function splitConversationListByIsTop(conversationList) {
    var topConversationList = [],
        unToppedConversationList = [];
    utils.forEach(conversationList, function (conversation) {
      var hasMentiond = conversation.hasMentiond,
          mentiondInfo = conversation.mentiondInfo;
      conversation.hasMentioned = hasMentiond;
      conversation.mentionedInfo = mentiondInfo;
      var isTop = conversation.isTop || false;

      if (isTop) {
        topConversationList.push(conversation);
      } else {
        unToppedConversationList.push(conversation);
      }
    });
    return {
      topConversationList: topConversationList || [],
      unToppedConversationList: unToppedConversationList || []
    };
  };

  var sortConList = function sortConList(conversationList) {
    if (utils.isEmpty(conversationList)) {
      return [];
    }

    var splitConversationList = splitConversationListByIsTop(conversationList);

    var _sortListBySentTime = function _sortListBySentTime(convers) {
      return utils.quickSort(convers, function (before, after) {
        before = before || {};
        after = after || {};
        var beforeLatestMessage = before.latestMessage || {},
            afterLatestMessage = after.latestMessage || {},
            beforeLatestSentTime = beforeLatestMessage.sentTime || 0,
            afterLatestSentTime = afterLatestMessage.sentTime || 0;
        return afterLatestSentTime <= beforeLatestSentTime;
      });
    };

    var topConversationList = _sortListBySentTime(splitConversationList.topConversationList);

    var unToppedConversationList = _sortListBySentTime(splitConversationList.unToppedConversationList);

    topConversationList.push.apply(topConversationList, unToppedConversationList);
    return topConversationList;
  };

  var isSupportStatusMessage = function isSupportStatusMessage(type) {
    return !!CONVERSATION_TYPE_TO_PUBLISH_STATUS_TOPIC[type];
  };

  var getConversationKey = function getConversationKey(option) {
    var type = option.type,
        targetId = option.targetId;
    return type + '_' + targetId;
  };

  var getConversationByKey = function getConversationByKey(key) {
    key = key || '';
    var arr = key.split('_');

    if (arr.length === 2) {
      return {
        type: arr[0],
        targetId: arr[1]
      };
    } else {
      return {
        type: CONVERSATION_TYPE.PRIVATE,
        targetId: ''
      };
    }
  };

  var getChatRoomKVOptStatus = function getChatRoomKVOptStatus(entity, action) {
    var status = 0;

    if (entity.isAutoDelete) {
      status = status | CHATROOM_KV_STATUS_CODE.AUTO_DELETE;
    }

    if (entity.isOverwrite) {
      status = status | CHATROOM_KV_STATUS_CODE.OVERWRITE;
    }

    if (utils.isEqual(action, CHATROOM_ENTRY_TYPE.DELETE)) {
      status = status | CHATROOM_KV_STATUS_CODE.OPERATE;
    }

    return status;
  };

  var getChatRoomKVByStatus = function getChatRoomKVByStatus(status) {
    var isDeleteOpt = !!(status & CHATROOM_KV_STATUS_CODE.OPERATE);
    return {
      isAutoDelete: !!(status & CHATROOM_KV_STATUS_CODE.AUTO_DELETE),
      isOverwrite: !!(status & CHATROOM_KV_STATUS_CODE.OVERWRITE),
      type: isDeleteOpt ? CHATROOM_ENTRY_TYPE.DELETE : CHATROOM_ENTRY_TYPE.UPDATE
    };
  };

  var TextCompressor = {
    _dataType: {
      Tail: 0x30,
      Compressed: 0x40,
      NormalExt: 0x50,
      Normal: 0x60,
      Mark: 0x70
    },
    _chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    _scale: 62,
    _max: 238327,
    _indexOf: function _indexOf(map, source, fromIndex) {
      var result = {
        length: 0,
        offset: -1
      };

      if (fromIndex >= source.length - 1) {
        return result;
      }

      var c1 = source.charAt(fromIndex);
      var c2 = source.charAt(fromIndex + 1);
      var items = map[c1 + c2];

      if (items[0] === fromIndex) {
        return result;
      }

      var space1 = source.length - fromIndex;

      for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        var space2 = fromIndex - item;

        if (space2 > TextCompressor._max) {
          continue;
        }

        var end = Math.min(space1, space2);

        if (end <= result.length) {
          break;
        }

        if (result.length > 2) {
          if (source.charAt(item + result.length - 1) !== source.charAt(fromIndex + result.length - 1)) {
            continue;
          }
        }

        var m = 2;

        for (var j = m; j < end; j++) {
          if (source.charAt(item + j) === source.charAt(fromIndex + j)) {
            m++;
          } else {
            break;
          }
        }

        if (m >= result.length) {
          result.length = m;
          result.offset = item;
        }
      }

      return result;
    },
    _numberEncode: function _numberEncode(num) {
      var result = [],
          remainder = 0;

      do {
        remainder = num % TextCompressor._scale;
        result.push(TextCompressor._chars.charAt(remainder));
        num = (num - remainder) / TextCompressor._scale;
      } while (num > 0);

      return result.join('');
    },
    _numberDecode: function _numberDecode(str) {
      var num = 0,
          index = 0;

      for (var i = str.length - 1; i >= 0; i--) {
        index = TextCompressor._chars.indexOf(str.charAt(i));

        if (index === -1) {
          throw new Error('decode number error, data is \'' + str + '\'');
        }

        num = num * TextCompressor._scale + index;
      }

      return num;
    },
    compress: function compress(data) {
      var map = {};

      for (var p = 0; p < data.length - 1; p++) {
        var c1 = data.charAt(p);
        var c2 = data.charAt(p + 1);
        var c = c1 + c2;

        if (!map.hasOwnProperty(c)) {
          map[c] = [p];
          continue;
        }

        map[c].push(p);
      }

      var compressedData = [],
          normalBlockBuffer = [];

      var encodeNormalBlock = function encodeNormalBlock() {
        if (normalBlockBuffer.length > 0) {
          var normalBlock = normalBlockBuffer.join('');
          normalBlockBuffer = [];

          if (normalBlock.length > 26) {
            var normalExtBlockLength = TextCompressor._numberEncode(normalBlock.length);

            var normalExtBlockHeader = String.fromCharCode(TextCompressor._dataType.NormalExt | normalExtBlockLength.length);
            compressedData.push(normalExtBlockHeader + normalExtBlockLength);
          } else {
            var normalBlockHeader = String.fromCharCode(TextCompressor._dataType.Normal | normalBlock.length);
            compressedData.push(normalBlockHeader);
          }

          compressedData.push(normalBlock);
        }
      };

      var i = 0;

      while (i < data.length) {
        var r = TextCompressor._indexOf(map, data, i);

        if (r.length < 2) {
          normalBlockBuffer.push(data.charAt(i++));
          continue;
        }

        if (r.length < 4) {
          normalBlockBuffer.push(data.substr(i, r.length));
          i += r.length;
          continue;
        }

        var offset = TextCompressor._numberEncode(i - r.offset);

        var length = TextCompressor._numberEncode(r.length);

        if (offset.length + length.length >= r.length) {
          normalBlockBuffer.push(data.substr(i, r.length));
          i += r.length;
          continue;
        }

        encodeNormalBlock();
        var compressedBlockHeader = String.fromCharCode(TextCompressor._dataType.Compressed | offset.length << 2 | length.length);
        compressedData.push(compressedBlockHeader + offset + length);
        i += r.length;
      }

      encodeNormalBlock();

      var dataLengthTo62 = TextCompressor._numberEncode(data.length);

      var tailBlockHeader = String.fromCharCode(TextCompressor._dataType.Tail | dataLengthTo62.length);
      compressedData.push(tailBlockHeader + dataLengthTo62);
      return compressedData.join('');
    },
    uncompress: function uncompress(data) {
      var i = 0;
      var result = '';

      label1: do {
        var header = data.charCodeAt(i++);
        var headerType = header & TextCompressor._dataType.Mark;
        var headerVal = header & 0xF;

        switch (headerType) {
          case TextCompressor._dataType.Compressed:
            var p1 = headerVal >> 2;
            var p2 = headerVal & 3;

            if (p1 === 0 || p2 === 0) {
              throw new Error('Data parsing error,at ' + i);
            }

            var offset = TextCompressor._numberDecode(data.substr(i, p1));

            var len = TextCompressor._numberDecode(data.substr(i += p1, p2));

            offset = result.length - offset;

            if (offset + len > result.length) {
              throw new Error('Data parsing error,at ' + i);
            }

            i += p2;
            result += result.substr(offset, len);
            break;

          case TextCompressor._dataType.Tail:
            var num = TextCompressor._numberDecode(data.substr(i, headerVal));

            if (num !== result.length) {
              throw new Error('Data parsing error,at ' + i);
            }

            i += headerVal;
            break label1;

          case TextCompressor._dataType.NormalExt:
            var normalNum = TextCompressor._numberDecode(data.substr(i, headerVal));

            result += data.substr(i += headerVal, normalNum);
            i += normalNum;
            break;

          case TextCompressor._dataType.Normal:
            result += data.substr(i, headerVal);
            i += headerVal;
            break;

          case TextCompressor._dataType.Mark:
            if (headerVal > 10) {
              throw new Error('Data parsing error,at ' + i);
            }

            result += data.substr(i, 16 + headerVal);
            i += 16 + headerVal;
            break;

          default:
            throw new Error('Data parsing error,at ' + i + ' header:' + headerType);
        }
      } while (i < data.length);

      return result;
    }
  };

  var isBelowIE = function isBelowIE(version) {
    var system = env.system;
    var flag = system.model === 'IE' && Number(system.version) < version ? true : false;
    return flag;
  };

  var stringToCsv = function stringToCsv(str) {
    var csvStr = str.replace(/"/g, '""');
    var tpl = '"{csvStr}"';
    return tplEngine$1(tpl, {
      csvStr: csvStr
    });
  };

  var getWebSessionId = function getWebSessionId() {
    var sessionId = utils.Session.get(STORAGE_SESSION_ID_KEY);

    if (utils.isEmpty(sessionId)) {
      sessionId = utils.getUUID22().slice(0, 10);
      utils.Session.set(STORAGE_SESSION_ID_KEY, sessionId);
    }

    return sessionId;
  };

  var getDeviceId = function getDeviceId() {
    var deviceId = utils.Storage.get(STORAGE_DEVICE_ID_KEY);

    if (utils.isEmpty(deviceId)) {
      deviceId = utils.getUUID22();
      utils.Storage.set(STORAGE_DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
  };

  var getDeviceInfo = function getDeviceInfo() {
    var tpl = '{brower}|{version}|{sessionId}';
    return tplEngine$1(tpl, {
      brower: env.system.model,
      version: env.system.version,
      sessionId: getWebSessionId()
    });
  };

  var getReportLogUrl = function getReportLogUrl(params) {
    var entireUrl = '',
        protocol = env.protocol.http + '//';
    var urlConf = {
      protocol: protocol,
      url: params.url,
      version: SDK_VERSION,
      appkey: params.appkey,
      deviceId: getDeviceId(),
      deviceInfo: getDeviceInfo(),
      platform: PLATFORM$1,
      userId: params.userId
    };

    switch (params.type) {
      case REPORT_TYPE.REALTIME:
        entireUrl = tplEngine$1(REALTIME_URL_TPL, urlConf);
        break;

      case REPORT_TYPE.FULL:
        entireUrl = tplEngine$1(MSGNOTIF_URL_TPL, utils.extend(urlConf, {
          logId: params.logId
        }));
        break;

      default:
        break;
    }

    return entireUrl;
  };

  var isLogCommandMsg = function isLogCommandMsg(msg) {
    var content = msg.content;
    return msg.messageType === MESSAGE_TYPE.LOG_COMMAND && msg.senderUserId === LOG_CMD_MSG_SENDER && content.platform === 'Web';
  };

  var isValidChatRoomKey = function isValidChatRoomKey(key) {
    if (!utils.isString(key)) {
      return;
    }

    var isValid = /^[A-Za-z0-9_=+-]+$/.test(key),
        keyLen = key.length,
        isLimit = keyLen <= CHATROOM_KEY_LENGTH.MAX && keyLen >= CHATROOM_KEY_LENGTH.MIN;
    return isValid && isLimit;
  };

  var isValidChatRoomValue = function isValidChatRoomValue(value) {
    if (!utils.isString(value)) {
      return;
    }

    var valLen = value.length;
    return valLen <= CHATROOM_VALUE_LENGTH.MAX && valLen >= CHATROOM_VALUE_LENGTH.MIN;
  };

  var genUploadFileName = function genUploadFileName(type, fileName) {
    var tpl = '{type}__RC-{date}_{random}_{timestamp}{uuid}{extension}';
    var random = Math.floor(Math.random() * 1000 % 10000);
    var uuid = utils.getUUID();
    var fileNameArr, extension;

    if (fileName) {
      fileNameArr = fileName.split('.');
      extension = '.' + fileNameArr[fileNameArr.length - 1];
    }

    return tplEngine$1(tpl, {
      type: type,
      date: utils.formateDate('-'),
      random: random,
      uuid: uuid,
      timestamp: DelayTimer.getTime(),
      extension: extension || ''
    });
  };

  var getUploadFileDomains = function getUploadFileDomains(navi) {
    var uploadServer = navi.uploadServer,
        bosAddr = navi.bosAddr;
    return {
      qiniu: uploadServer,
      bos: bosAddr
    };
  };

  var mergeConversationList = function mergeConversationList(option) {
    option = option || {};
    var _option4 = option,
        conversationList = _option4.conversationList,
        updatedConversationList = _option4.updatedConversationList;
    var allConversationList = updatedConversationList.concat(conversationList);
    var hashTable = {};
    var newList = [];
    var invalidDataIndexList = [];
    utils.forEach(allConversationList, function (conversation) {
      if (!utils.isObject(conversation)) {
        return;
      }

      var key = getConversationKey(conversation),
          hashItem = hashTable[key] || {},
          hashIndex = utils.isUndefined(hashItem.index) ? newList.length : hashItem.index,
          hashVal = hashItem.val || {},
          cacheUpdatedItems = hashVal.updatedItems || {},
          updatedItems = conversation.updatedItems || {};
      conversation = utils.extend(conversation, hashVal);
      utils.forEach(cacheUpdatedItems, function (item, key) {
        conversation[key] = item.val;
      });
      utils.forEach(updatedItems, function (item, key) {
        var cacheItem = cacheUpdatedItems[key] || {},
            cacheItemUpdatedTime = cacheItem.time || 0;

        if (item.time > cacheItemUpdatedTime) {
          conversation[key] = item.val;
        }
      });
      hashTable[key] = {
        index: hashIndex,
        val: conversation
      };
      newList[hashIndex] = conversation;
      isInValidConversationData(conversation) && invalidDataIndexList.push(hashIndex);
    });
    utils.forEach(invalidDataIndexList, function (invalidIndex) {
      var conversation = newList[invalidIndex];
      newList[invalidIndex] = fixConversationData(conversation);
    });
    newList = sortConList(newList);
    return utils.map(newList, function (item) {
      delete item.updatedItems;
      return item;
    });
  };

  var common = {
    isConnected: isConnected,
    isConnecting: isConnecting,
    isDisconnected: isDisconnected,
    getConnectType: getConnectType,
    getTransporterUrl: getTransporterUrl,
    isGroup: isGroup,
    isChatRoom: isChatRoom,
    getConversationTypeList: getConversationTypeList,
    isValidConversationType: isValidConversationType,
    getUIDByToken: getUIDByToken,
    getSessionId: getSessionId,
    getMessageOptionByStatus: getMessageOptionByStatus,
    getPersitedAndCountedBySessionId: getPersitedAndCountedBySessionId,
    SignalId: SignalId,
    MessageTimeSyner: MessageTimeSyner,
    ChatRoomMessageTimeSyner: ChatRoomMessageTimeSyner,
    JoinedChatRoomSyner: JoinedChatRoomSyner,
    getCMPDomainList: getCMPDomainList,
    getNaviListByToken: getNaviListByToken,
    getValidToken: getValidToken,
    RCSocket: RCSocket,
    RCStorage: RCStorage,
    getNavReqOption: getNavReqOption,
    getPingTimeout: getPingTimeout,
    fixConversationData: fixConversationData,
    sortConversationList: sortConversationList,
    DelayTimer: DelayTimer,
    isSupportStatusMessage: isSupportStatusMessage,
    getConversationKey: getConversationKey,
    getConversationByKey: getConversationByKey,
    getChatRoomKVOptStatus: getChatRoomKVOptStatus,
    getChatRoomKVByStatus: getChatRoomKVByStatus,
    TextCompressor: TextCompressor,
    isBelowIE: isBelowIE,
    getReportLogUrl: getReportLogUrl,
    isLogCommandMsg: isLogCommandMsg,
    getWebSessionId: getWebSessionId,
    getDeviceId: getDeviceId,
    stringToCsv: stringToCsv,
    isValidChatRoomKey: isValidChatRoomKey,
    isValidChatRoomValue: isValidChatRoomValue,
    genUploadFileName: genUploadFileName,
    getUploadFileDomains: getUploadFileDomains,
    mergeConversationList: mergeConversationList,
    sortConList: sortConList,
    getPersitedAndCountedAndSlientBySessionId: getPersitedAndCountedAndSlientBySessionId
  };

  var EventEmitter$1 = utils.EventEmitter,
      DeferHandler$1 = utils.DeferHandler,
      Timer$1 = utils.Timer;
  var RCSocket$1 = common.RCSocket;
  var TransHandlerID = {
    CONNECT: 'connect',
    PING: 'ping'
  };

  var Heartbeat = function () {
    function Heartbeat(transporter, option) {
      this._transporter = void 0;
      this._timer = void 0;
      option = option || {};
      var timeout = option.timeout;
      this._transporter = transporter;
      this._timer = new Timer$1({
        type: TIMER_TYPE.INTERVAL,
        timeout: timeout
      });
    }

    var _proto = Heartbeat.prototype;

    _proto.check = function check(timeout) {
      var _transporter = this._transporter;
      var _deferHandler = _transporter._deferHandler;
      var pingReqSignal = new PingReqWriter();

      _transporter.sendSignal(pingReqSignal);

      return utils.deferred(function (resolve, reject) {
        _deferHandler.add(TransHandlerID.PING, {
          resolve: resolve,
          reject: reject
        }, {
          timeout: timeout
        });
      });
    };

    _proto.start = function start(timeout, onError) {
      var self = this;

      self._timer.start(function () {
        self.check(timeout).then(utils.noop)["catch"](onError);
      });
    };

    _proto.stop = function stop() {
      this._timer && this._timer.stop();
    };

    return Heartbeat;
  }();

  var SocketTransporter = function () {
    function SocketTransporter(option) {
      this._socket = void 0;
      this._option = void 0;
      this._transporterEventEmiiter = new EventEmitter$1();
      this._deferHandler = new DeferHandler$1();
      this._heartbeat = new Heartbeat(this, {
        timeout: IM_PING_INTERVAL_TIME
      });
      this._connectedTime = void 0;
      this._option = option;
    }

    var _proto2 = SocketTransporter.prototype;

    _proto2._createSocket = function _createSocket(url) {
      var self = this;
      var _transporterEventEmiiter = self._transporterEventEmiiter;
      var socket = new RCSocket$1({
        url: url
      });

      var onClose = function onClose(event) {
        event = event || {};
        var code = event.code || TRANSPORTER_STATUS.CLOSE_ABNORMAL;

        _transporterEventEmiiter.emit(TRANSPORT_EVENT.STATUS, code);

        self.disconnect();
      };

      socket.onMessage(function (msg) {
        var data = msg.data;

        if (!utils.isArrayBuffer(data)) {
          throw new Error('Error socket signal');
        }

        var signal = readWSBuffer(data);
        self.handleSignal(signal);
      });
      socket.onError(onClose);
      socket.onClose(onClose);
      return socket;
    };

    _proto2._startHeartbeat = function _startHeartbeat(timeSpentConnect) {
      var self = this;
      var _heartbeat = self._heartbeat,
          _transporterEventEmiiter = self._transporterEventEmiiter;

      _heartbeat.check(FIRST_PING_TIMEOUT).then(utils.noop)["catch"](function () {
        _transporterEventEmiiter.emit(TRANSPORT_EVENT.STATUS, TRANSPORTER_STATUS.PING_FIRST_TIMEOUT);

        self.disconnect();
      });

      var pingTimeout = common.getPingTimeout(timeSpentConnect);

      _heartbeat.start(pingTimeout, function () {
        _transporterEventEmiiter.emit(TRANSPORT_EVENT.STATUS, TRANSPORTER_STATUS.PING_TIMEOUT);

        self.disconnect();
      });
    };

    _proto2._stopHeartbeat = function _stopHeartbeat() {
      this._heartbeat.stop();
    };

    _proto2.watchSignal = function watchSignal(watcher) {
      this._transporterEventEmiiter.on(TRANSPORT_EVENT.SIGNAL, watcher);
    };

    _proto2.watchStatus = function watchStatus(watcher) {
      this._transporterEventEmiiter.on(TRANSPORT_EVENT.STATUS, watcher);
    };

    _proto2.connect = function connect(user, option) {
      var self = this;
      var _self$_option = self._option,
          appkey = _self$_option.appkey,
          connectType = _self$_option.connectType,
          _deferHandler = self._deferHandler;
      var token = user.token;
      var domain = option.domain;
      var url = common.getTransporterUrl({
        domain: domain,
        appkey: appkey,
        connectType: connectType,
        token: token
      });
      var timeBeforeConnect = utils.getCurrentTimestamp();
      self._socket = this._createSocket(url);
      return utils.deferred(function (resolve, reject) {
        _deferHandler.add(TransHandlerID.CONNECT, {
          resolve: resolve,
          reject: reject
        });
      }).then(function (result) {
        var timeAfterConnect = utils.getCurrentTimestamp();
        var timeSpentConnect = timeAfterConnect - timeBeforeConnect;

        self._startHeartbeat(timeSpentConnect);

        return result;
      });
    };

    _proto2.sendSignal = function sendSignal(writer) {
      var binary = writer.getBufferData();

      this._socket.send(binary.buffer);
    };

    _proto2.handleSignal = function handleSignal(signal) {
      var _transporterEventEmiiter = this._transporterEventEmiiter,
          _deferHandler = this._deferHandler;

      if (signal instanceof ConnAckReader) {
        this.handleConnAck(signal);
      } else if (signal instanceof PingRespReader) {
        _deferHandler.resolve(TransHandlerID.PING);
      } else {
        _transporterEventEmiiter.emit(TRANSPORT_EVENT.SIGNAL, signal);
      }

      if (signal && utils.isValidTimestamp(signal.timestamp)) {
        common.DelayTimer.setTime(signal.timestamp);
      }
    };

    _proto2.handleConnAck = function handleConnAck(signal) {
      var self = this;
      var _deferHandler = self._deferHandler;
      var status = signal.status;
      var isConnected = status === SUCCESS_CODE;
      var event = isConnected ? _deferHandler.resolve : _deferHandler.reject;
      event.call(_deferHandler, TransHandlerID.CONNECT, signal);

      if (isConnected) {
        self._connectedTime = utils.getCurrentTimestamp();
      }
    };

    _proto2.disconnect = function disconnect() {
      this._stopHeartbeat();

      this._socket && this._socket.close();
    };

    return SocketTransporter;
  }();

  var logEventEmitter = new utils.EventEmitter();
  var LogEventName = 'log';
  var LocalLogPrefix = '[Rong]';
  var ServerOption = DEFAULT_SERVER_OPTION;
  var Option = {
    isDebug: false,
    isUploadToServer: true,
    appkey: '',
    userId: '',
    isNetworkUnavailable: true
  };
  var realTimeUploadHasStarted = false,
      RealtimeUploadTimes = 1,
      isRealtimeUploading = false,
      fullLogId = '';

  var isFirstDefaultUpload = function isFirstDefaultUpload(interval) {
    return interval === 20000;
  };

  var getRealtimeUploadInterval = function getRealtimeUploadInterval(uploadTimes) {
    var realtimeInterval = ServerOption.realtimeInterval;
    return realtimeInterval * Math.pow(2, uploadTimes - 1);
  };

  var getFullUploadInterval = function getFullUploadInterval(uploadTimes) {
    var fullInterval = ServerOption.fullInterval;
    return fullInterval * Math.pow(2, uploadTimes - 1);
  };

  var getCSVForLog = function getCSVForLog(log) {
    log = log || {};
    var content = log.content || {};
    utils.forEach(content, function (val, key) {
      if (utils.isObject(val) || utils.isArray(val)) {
        content[key] = utils.toJSON(val);
      }
    });
    content = utils.toJSON(content) || '""';
    content = common.stringToCsv(content);
    return utils.tplEngine(CSV_LOG_TPL, {
      sessionId: common.getWebSessionId(),
      time: log.time,
      type: log.type,
      level: log.level,
      tag: log.tag,
      content: content
    });
  };

  var setServerOption = function setServerOption(serverData) {
    var logSwitch = serverData.logSwitch,
        logPolicy = serverData.logPolicy;
    var isOpen = !!logSwitch;
    if (utils.isEmpty(serverData)) return;
    ServerOption.isOpen = isOpen;

    if (!isOpen) {
      return;
    }

    var logConf = utils.parseJSON(logPolicy || '') || {};
    var url = logConf.url,
        level = logConf.level,
        itv = logConf.itv,
        times = logConf.times;
    utils.extend(ServerOption, {
      url: url,
      realtimeLevel: Number(level),
      realtimeInterval: Number(itv) * 1000,
      realtimeMaxTimes: Number(times)
    });
  };

  var setServerResponseOption = function setServerResponseOption(resText) {
    var resConf = utils.parseJSON(resText || '');
    var nextTime = resConf.nextTime,
        level = resConf.level,
        logSwitch = resConf.logSwitch;
    if (utils.isEmpty(resConf)) return;
    var isOpen = !!logSwitch;
    ServerOption.isOpen = isOpen;
    if (!isOpen) return;
    utils.extend(ServerOption, {
      realtimeLevel: Number(level),
      realtimeInterval: Number(nextTime) * 1000
    });
  };

  var getLogLevel = function getLogLevel(log) {
    log = log || {};
    var _Option = Option,
        isNetworkUnavailable = _Option.isNetworkUnavailable,
        _log = log,
        level = _log.level,
        isLevelToDegrad = utils.isEqual(level, LEVEL.ERROR) || utils.isEqual(level, LEVEL.WARN);

    if (isNetworkUnavailable && isLevelToDegrad) {
      log.level = LEVEL.INFO;
    }

    return log;
  };

  var LogStore = {
    _list: [],
    MaxSize: common.isBelowIE(9) ? STORE_SIZE.LOW : STORE_SIZE.ADVANCED,
    add: function add(log) {
      log = getLogLevel(log);

      LogStore._list.push(log);

      var currentSize = LogStore._list.length,
          maxSize = LogStore.MaxSize;

      if (currentSize > maxSize) {
        LogStore._list.splice(0, currentSize - maxSize);
      }
    },
    get: function get(option) {
      var type = option.type,
          uploadLevel = option.level;
      var _list = LogStore._list;
      var uploadList = [];
      utils.forEach(_list, function (log, index) {
        var logTime = log.time || 0,
            logLevel = log.level || LEVEL.DEBUG,
            isUploadLevel = logLevel <= uploadLevel,
            fullUploadOption = option.fullUploadOption || {},
            startTime = fullUploadOption.startTime || 0,
            endTime = fullUploadOption.endTime || common.DelayTimer.getTime();
        var isUpload = isUploadLevel;

        switch (type) {
          case REPORT_TYPE.REALTIME:
            isUpload = isUpload && !log.isUploaded;
            isUpload && (LogStore._list[index].isUploaded = true);
            break;

          case REPORT_TYPE.FULL:
            isUpload = isUpload && logTime >= startTime && logTime <= endTime;
            break;

          default:
        }

        if (isUpload) {
          uploadList.push(log);
        }
      });
      return uploadList;
    },
    clear: function clear() {
      LogStore._list = [];
    }
  };

  var upload = function upload(option) {
    var url = option.url,
        logList = option.logList,
        type = option.type;
    var requestUrl = common.getReportLogUrl({
      type: type,
      appkey: Option.appkey || '',
      userId: Option.userId || '',
      url: url || ServerOption.url || DEFAULT_SERVER_OPTION.url,
      logId: option.logId
    });
    var csvLog = '';
    utils.forEach(logList, function (log) {
      csvLog += getCSVForLog(log);
    });

    if (utils.isEmpty(csvLog) && type === REPORT_TYPE.REALTIME) {
      return utils.Defer.reject();
    }

    if (utils.isEmpty(csvLog) && type === REPORT_TYPE.FULL) {
      csvLog = NO_FULL_LOG;
    }

    csvLog = common.TextCompressor.compress(csvLog);
    return utils.request(requestUrl, {
      method: REQUEST_METHOD.POST,
      body: csvLog,
      timeout: REQUEST_TIMEOUT
    });
  };

  var uploadRealtime = function uploadRealtime() {
    if (isRealtimeUploading) {
      return;
    }

    var interval = getRealtimeUploadInterval(RealtimeUploadTimes);
    var realtimeMaxTimes = ServerOption.realtimeMaxTimes,
        realtimeLevel = ServerOption.realtimeLevel;

    if (RealtimeUploadTimes < realtimeMaxTimes) {
      RealtimeUploadTimes++;
    }

    if (isFirstDefaultUpload(interval)) {
      RealtimeUploadTimes = 1;
    }

    utils.setTimeout(function () {
      var logList = LogStore.get({
        type: REPORT_TYPE.REALTIME,
        level: realtimeLevel
      });
      isRealtimeUploading = true;
      upload({
        logList: logList,
        type: REPORT_TYPE.REALTIME
      }).then(function (response) {
        isRealtimeUploading = false;
        var responseText = response.responseText || '{}';
        var conf = response.responseText || {};
        setServerResponseOption(responseText);

        if (ServerOption.isOpen) {
          RealtimeUploadTimes = utils.isEmpty(conf) ? RealtimeUploadTimes : 1;
          uploadRealtime();
        }
      })["catch"](function () {
        isRealtimeUploading = false;
        uploadRealtime();
      });
    }, interval);
  };

  var uploadFull = function uploadFull(uploadTimes, option, connectedTime) {
    if (!Option.isUploadToServer || env.isMini) {
      return;
    }

    uploadTimes = uploadTimes || 0;
    option = option || {};
    var _option = option,
        uri = _option.uri,
        logId = _option.logId;
    var isFirst = uploadTimes === 0;
    var interval = isFirst ? 0 : getFullUploadInterval(uploadTimes);
    var fullMaxTimes = ServerOption.fullMaxTimes,
        fullLevel = ServerOption.fullLevel;
    if (fullLogId === logId) return;

    if (uploadTimes <= fullMaxTimes) {
      uploadTimes++;
    } else {
      return;
    }

    fullLogId = logId;

    (function (option) {
      utils.setTimeout(function () {
        var logList = LogStore.get({
          type: REPORT_TYPE.FULL,
          level: fullLevel,
          fullUploadOption: option
        });
        if (logList.length === 0 && Number(option.endTime) < connectedTime) return;
        upload({
          logId: logId,
          url: uri,
          logList: logList,
          type: REPORT_TYPE.FULL
        }).then(function () {})["catch"](function () {
          uploadFull(uploadTimes, option, connectedTime);
        });
      }, interval);
    })(option);
  };

  var writeLocalLog = function writeLocalLog(log) {
    var time = log.time;
    var formatedTime = utils.formatTime(time);
    var localLog = LocalLogPrefix + ":" + formatedTime + ": " + utils.toJSON(log);
    logEventEmitter.emit(LogEventName, localLog);

    if (Option.isDebug) {
      utils.consoleLog(localLog);
    }
  };

  var isIgnoreErrorCode = function isIgnoreErrorCode(code) {
    return utils.indexOf(IGNORE_ERROR_CODE, code) > -1;
  };

  var Logger = {
    _events: [],
    LogStore: LogStore,
    setOption: function setOption(option) {
      Option = utils.extend(Option, option);
    },
    setServerOption: setServerOption,
    watchLog: function watchLog(event) {
      logEventEmitter.on(LogEventName, event);

      Logger._events.push(event);
    },
    write: function write(log) {
      log = log || {};
      log.tag = log.tag || TAG.L_CRASH_E;
      log.time = log.time || common.DelayTimer.getTime();
      log.type = log.type || LOG_TYPE.IM;
      LogStore.add(log);
      writeLocalLog(log);
    },
    fatal: function fatal(tag, content) {
      Logger.write({
        tag: tag,
        content: content,
        level: LEVEL.FATAL
      });
    },
    error: function error(tag, content) {
      Logger.write({
        tag: tag,
        content: content,
        level: LEVEL.ERROR
      });
    },
    warn: function warn(tag, content) {
      Logger.write({
        tag: tag,
        content: content,
        level: LEVEL.WARN
      });
    },
    info: function info(tag, content) {
      Logger.write({
        tag: tag,
        content: content,
        level: LEVEL.INFO
      });
    },
    debug: function debug(tag, content) {
      Logger.write({
        tag: tag,
        content: content,
        level: LEVEL.DEBUG
      });
    },
    startRealtimeUpload: function startRealtimeUpload() {
      if (realTimeUploadHasStarted) return;

      if (Option.isUploadToServer && !env.isMini) {
        uploadRealtime();
      }

      realTimeUploadHasStarted = true;
    },
    resetRealtimeUpload: function resetRealtimeUpload() {
      RealtimeUploadTimes = 1;
    },
    uploadFull: uploadFull,
    isIgnoreErrorCode: isIgnoreErrorCode
  };

  var EventEmitter$2 = utils.EventEmitter,
      DeferHandler$2 = utils.DeferHandler,
      httpRequest = utils.httpRequest,
      request$3 = utils.request,
      Defer$1 = utils.Defer;

  var CometTransporter = function () {
    function CometTransporter(option) {
      this._option = void 0;
      this._transporterEventEmiiter = new EventEmitter$2();
      this._deferHandler = new DeferHandler$2();
      this._pid = utils.encodeURI(utils.getCurrentTimestamp() + Math.random() + '');
      this._domain = void 0;
      this._sessionid = void 0;
      this._xhrCache = new utils.Cache();
      this._pullSignalTimer = new utils.Timer({
        timeout: IM_COMET_PULLMSG_TIMEOUT
      });
      this._isDisconnected = true;
      this._option = option;
    }

    var _proto = CometTransporter.prototype;

    _proto._startPullSignal = function _startPullSignal() {
      var self = this;
      var _domain = self._domain,
          _sessionid = self._sessionid,
          _pid = self._pid,
          _transporterEventEmiiter = self._transporterEventEmiiter,
          _pullSignalTimer = self._pullSignalTimer;
      var timestamp = utils.getCurrentTimestamp();
      var protocol = env.protocol.http;
      var url = utils.tplEngine(COMET_PULL_URL_TPL, {
        protocol: protocol,
        timestamp: timestamp,
        domain: _domain,
        sessionId: _sessionid,
        pid: _pid
      });
      var xhr = httpRequest({
        url: url,
        body: {
          pid: _pid
        },
        timeout: IM_COMET_PULLMSG_TIMEOUT,
        success: function success(responseText) {
          _pullSignalTimer.stop();

          var isSuccess = self.handleCometResponse(responseText);

          if (isSuccess) {
            !self._isDisconnected && self._startPullSignal();
          } else if (!self._isDisconnected) {
            _transporterEventEmiiter.emit(TRANSPORT_EVENT.STATUS, TRANSPORTER_STATUS.COMET_REQUEST_ERROR);
          }

          self._xhrCache.remove(url);
        },
        fail: function fail() {
          _pullSignalTimer.stop();

          if (!self._isDisconnected) {
            _transporterEventEmiiter.emit(TRANSPORT_EVENT.STATUS, TRANSPORTER_STATUS.COMET_REQUEST_ERROR);
          }

          self._xhrCache.remove(url);
        }
      });

      _pullSignalTimer.start(function () {
        if (!self._isDisconnected) {
          _transporterEventEmiiter.emit(TRANSPORT_EVENT.STATUS, TRANSPORTER_STATUS.PING_TIMEOUT);

          self.disconnect();
        }
      });

      self._xhrCache.set(url, xhr);
    };

    _proto.watchSignal = function watchSignal(event) {
      this._transporterEventEmiiter.on(TRANSPORT_EVENT.SIGNAL, event);
    };

    _proto.watchStatus = function watchStatus(event) {
      this._transporterEventEmiiter.on(TRANSPORT_EVENT.STATUS, function (status) {
        event && event(status);
      });
    };

    _proto.connect = function connect(user, option) {
      var self = this;
      var _pid = self._pid,
          _self$_option = self._option,
          appkey = _self$_option.appkey,
          connectType = _self$_option.connectType;
      var token = user.token;
      var domain = option.domain;
      var url = common.getTransporterUrl({
        domain: domain,
        appkey: appkey,
        token: token,
        connectType: connectType
      });
      self._domain = domain;
      self._isDisconnected = false;

      var success = function success(_ref) {
        var responseText = _ref.responseText;

        if (!utils.isValidJSON(responseText)) {
          return Defer$1.reject();
        }

        var response = utils.isObject(responseText) ? responseText : utils.parseJSON(responseText);
        var isConnectSuccess = utils.isEqual(response.status, SUCCESS_CODE);

        if (isConnectSuccess && utils.isObject(response) && utils.isValidTimestamp(response.timestamp)) {
          common.DelayTimer.setTime(response.timestamp);
        }

        return isConnectSuccess ? Defer$1.resolve(response) : Defer$1.reject(response);
      };

      return request$3(url, {
        body: {
          pid: _pid
        }
      }).then(success).then(function (response) {
        self._sessionid = response.sessionid;

        self._startPullSignal();

        return response;
      });
    };

    _proto.sendSignal = function sendSignal(writer) {
      var self = this;
      var _domain = self._domain,
          _sessionid = self._sessionid,
          _pid = self._pid;
      var messageId = writer.messageId,
          topic = writer.topic,
          targetId = writer.targetId;
      var headerCode = writer.getHeaderFlag();
      var protocol = env.protocol.http;
      var TPL = topic ? COMET_REQ_HAS_TOPIC_URL_TPL : COMET_REQ_NO_TOPIC_URL_TPL;
      var url = utils.tplEngine(TPL, {
        protocol: protocol,
        messageId: messageId,
        headerCode: headerCode,
        topic: topic,
        targetId: targetId,
        pid: _pid,
        sessionId: _sessionid,
        domain: _domain
      });
      var currentTime = utils.getCurrentTimestamp() + '';
      var xhr = httpRequest({
        url: url,
        method: REQUEST_METHOD.POST,
        body: writer.getCometData(),
        success: function success(responseText) {
          var isSuccess = self.handleCometResponse(responseText);

          if (!isSuccess) {
            self.handleError(messageId);
          }

          self._xhrCache.remove(currentTime);
        },
        fail: function fail(error) {
          self.handleError(messageId);

          self._xhrCache.remove(currentTime);

          Logger.error(TAG.L_COMET_SEND_SIGNAL_E, {
            content: {
              info: 'comet error',
              error: error
            }
          });
        }
      });

      self._xhrCache.set(currentTime, xhr);
    };

    _proto.handleCometResponse = function handleCometResponse(responseText) {
      var self = this;
      var _transporterEventEmiiter = self._transporterEventEmiiter;
      var response = utils.isString(responseText) ? utils.parseJSON(responseText) : responseText;

      if (!response) {
        return false;
      }

      if (!response || !utils.isArray(response)) {
        return true;
      }

      utils.forEach(response, function (data) {
        var sessionid = data.sessionid;

        if (sessionid) {
          self._sessionid = sessionid;
        }

        var signal = readCometData(data);

        _transporterEventEmiiter.emit(TRANSPORT_EVENT.SIGNAL, signal);

        if (signal && utils.isValidTimestamp(signal.timestamp)) {
          common.DelayTimer.setTime(signal.timestamp);
        }
      });
      return true;
    };

    _proto.handleError = function handleError(messageId, status) {
      var signal = {
        messageId: messageId,
        status: status || ERROR_CODE.TIMEOUT
      };

      this._transporterEventEmiiter.emit(TRANSPORT_EVENT.SIGNAL, signal);
    };

    _proto.disconnect = function disconnect() {
      var self = this;
      self._isDisconnected = true;
      var _xhrCache = self._xhrCache,
          _pullSignalTimer = self._pullSignalTimer;

      var xhrKeys = _xhrCache.getKeys();

      _pullSignalTimer.stop();

      utils.forEach(xhrKeys, function (key) {
        var xhr = _xhrCache.get(key);

        xhr.abort();

        _xhrCache.remove(key);
      });
    };

    return CometTransporter;
  }();

  var Transporter = (function (option) {
    var connectType = option.connectType;
    var isSocket = connectType === CONNECT_TYPE.WEBSOCKET;
    var Transporter = isSocket ? SocketTransporter : CometTransporter;
    return new Transporter(option);
  });

  var PBName = {
    UpStreamMessage: 'UpStreamMessage',
    DownStreamMessage: 'DownStreamMessage',
    DownStreamMessages: 'DownStreamMessages',
    SessionsAttQryInput: 'SessionsAttQryInput',
    SessionsAttOutput: 'SessionsAttOutput',
    SyncRequestMsg: 'SyncRequestMsg',
    ChrmPullMsg: 'ChrmPullMsg',
    NotifyMsg: 'NotifyMsg',
    HistoryMsgInput: 'HistoryMsgInput',
    HistoryMsgOuput: 'HistoryMsgOuput',
    RelationQryInput: 'RelationQryInput',
    RelationsOutput: 'RelationsOutput',
    DeleteSessionsInput: 'DeleteSessionsInput',
    SessionInfo: 'SessionInfo',
    DeleteSessionsOutput: 'DeleteSessionsOutput',
    RelationsInput: 'RelationsInput',
    DeleteMsgInput: 'DeleteMsgInput',
    CleanHisMsgInput: 'CleanHisMsgInput',
    SessionMsgReadInput: 'SessionMsgReadInput',
    ChrmInput: 'ChrmInput',
    QueryChatRoomInfoInput: 'QueryChatRoomInfoInput',
    QueryChatRoomInfoOutput: 'QueryChatRoomInfoOutput',
    RtcInput: 'RtcInput',
    RtcUserListOutput: 'RtcUserListOutput',
    SetUserStatusInput: 'SetUserStatusInput',
    RtcSetDataInput: 'RtcSetDataInput',
    RtcUserSetDataInput: 'RtcUserSetDataInput',
    RtcDataInput: 'RtcDataInput',
    RtcSetOutDataInput: 'RtcSetOutDataInput',
    MCFollowInput: 'MCFollowInput',
    RtcTokenOutput: 'RtcTokenOutput',
    RtcQryOutput: 'RtcQryOutput',
    RtcQryUserOutDataInput: 'RtcQryUserOutDataInput',
    RtcUserOutDataOutput: 'RtcUserOutDataOutput',
    RtcQueryListInput: 'RtcQueryListInput',
    RtcRoomInfoOutput: 'RtcRoomInfoOutput',
    RtcValueInfo: 'RtcValueInfo',
    RtcKeyDeleteInput: 'RtcKeyDeleteInput',
    GetQNupTokenInput: 'GetQNupTokenInput',
    GetQNupTokenOutput: 'GetQNupTokenOutput',
    GetQNdownloadUrlInput: 'GetQNdownloadUrlInput',
    GetQNdownloadUrlOutput: 'GetQNdownloadUrlOutput',
    SetChrmKV: 'SetChrmKV',
    ChrmKVOutput: 'ChrmKVOutput',
    QueryChrmKV: 'QueryChrmKV',
    ChrmNotifyMsg: 'ChrmNotifyMsg',
    SetUserSettingInput: 'SetUserSettingInput',
    SetUserSettingOutput: 'SetUserSettingOutput',
    PullUserSettingInput: 'PullUserSettingInput',
    PullUserSettingOutput: 'PullUserSettingOutput',
    UserSettingNotification: 'UserSettingNotification',
    SessionReq: 'SessionReq',
    SessionStates: 'SessionStates',
    SessionState: 'SessionState',
    SessionStateItem: 'SessionStateItem',
    SessionStateModifyReq: 'SessionStateModifyReq',
    SessionStateModifyResp: 'SessionStateModifyResp'
  };

  var _SSMsg;
  var SSMsg = (_SSMsg = {}, _SSMsg[PBName.UpStreamMessage] = ['sessionId', 'classname', 'content', 'pushText', 'userId', 'configFlag', 'appData'], _SSMsg[PBName.DownStreamMessages] = ['list', 'syncTime', 'finished'], _SSMsg[PBName.DownStreamMessage] = ['fromUserId', 'type', 'groupId', 'classname', 'content', 'dataTime', 'status', 'msgId'], _SSMsg[PBName.SessionsAttQryInput] = ['nothing'], _SSMsg[PBName.SessionsAttOutput] = ['inboxTime', 'sendboxTime', 'totalUnreadCount'], _SSMsg[PBName.SyncRequestMsg] = ['syncTime', 'ispolling', 'isweb', 'isPullSend', 'isKeeping', 'sendBoxSyncTime'], _SSMsg[PBName.ChrmPullMsg] = ['syncTime', 'count'], _SSMsg[PBName.NotifyMsg] = ['type', 'time', 'chrmId'], _SSMsg[PBName.HistoryMsgInput] = ['targetId', 'time', 'count', 'order'], _SSMsg[PBName.HistoryMsgOuput] = ['list', 'syncTime', 'hasMsg'], _SSMsg[PBName.RelationQryInput] = ['type', 'count', 'startTime', 'order'], _SSMsg[PBName.RelationsOutput] = ['info'], _SSMsg[PBName.DeleteSessionsInput] = ['sessions'], _SSMsg[PBName.SessionInfo] = ['type', 'channelId'], _SSMsg[PBName.DeleteSessionsOutput] = ['nothing'], _SSMsg[PBName.RelationsInput] = ['type', 'msg', 'count', 'offset', 'startTime', 'endTime'], _SSMsg[PBName.DeleteMsgInput] = ['type', 'conversationId', 'msgs'], _SSMsg[PBName.CleanHisMsgInput] = ['targetId', 'dataTime', 'conversationType'], _SSMsg[PBName.SessionMsgReadInput] = ['type', 'msgTime', 'channelId'], _SSMsg[PBName.ChrmInput] = ['nothing'], _SSMsg[PBName.QueryChatRoomInfoInput] = ['count', 'order'], _SSMsg[PBName.QueryChatRoomInfoOutput] = ['userTotalNums', 'userInfos'], _SSMsg[PBName.GetQNupTokenInput] = ['type'], _SSMsg[PBName.GetQNdownloadUrlInput] = ['type', 'key', 'fileName'], _SSMsg[PBName.GetQNupTokenOutput] = ['deadline', 'token'], _SSMsg[PBName.GetQNdownloadUrlOutput] = ['downloadUrl'], _SSMsg[PBName.SetChrmKV] = ['entry', 'bNotify', 'notification', 'type'], _SSMsg[PBName.ChrmKVOutput] = ['entries', 'bFullUpdate', 'syncTime'], _SSMsg[PBName.QueryChrmKV] = ['timestamp'], _SSMsg[PBName.ChrmNotifyMsg] = ['type', 'time', 'chrmId'], _SSMsg[PBName.SetUserSettingInput] = ['version', 'value'], _SSMsg[PBName.SetUserSettingOutput] = ['version', 'reserve'], _SSMsg[PBName.PullUserSettingInput] = ['version', 'reserve'], _SSMsg[PBName.PullUserSettingOutput] = ['items', 'version'], _SSMsg);

  var Codec = {};
  utils.forEach(SSMsg, function (paramList, name) {
    Codec[name] = function () {};

    Codec[name].prototype.data = {};

    Codec[name].prototype.getData = function () {
      return this.data;
    };

    utils.forEach(paramList, function (param) {
      var setEventName = 'set' + utils.toUpperCase(param, 0, 1);

      Codec[name].prototype[setEventName] = function (item) {
        this.data[param] = item;
      };
    });

    Codec[name].decode = function (data) {
      var decodeResult = {};

      if (utils.isString(data)) {
        data = utils.parseJSON(data);
      }

      var _loop = function _loop(key) {
        var getEventName = 'get' + utils.toUpperCase(key, 0, 1);
        decodeResult[key] = data[key];

        decodeResult[getEventName] = function () {
          return data[key];
        };
      };

      for (var key in data) {
        _loop(key);
      }

      return decodeResult;
    };
  });

  Codec.getModule = function (pbName) {
    var modules = new Codec[pbName]();

    modules.getArrayData = function () {
      return modules.getData();
    };

    return modules;
  };

  function protobuf(a){var b=void 0,c=function(){function a(a,b,c){this.low=0|a,this.high=0|b,this.unsigned=!!c;}function b(a){return (a&&a.__isLong__)===!0}function e(a,b){var e,f,h;return b?(a>>>=0,(h=a>=0&&256>a)&&(f=d[a])?f:(e=g(a,0>(0|a)?-1:0,!0),h&&(d[a]=e),e)):(a|=0,(h=a>=-128&&128>a)&&(f=c[a])?f:(e=g(a,0>a?-1:0,!1),h&&(c[a]=e),e))}function f(a,b){if(isNaN(a)||!isFinite(a))return b?r:q;if(b){if(0>a)return r;if(a>=n)return w}else{if(-o>=a)return x;if(a+1>=o)return v}return 0>a?f(-a,b).neg():g(0|a%m,0|a/m,b)}function g(b,c,d){return new a(b,c,d)}function i(a,b,c){var d,e,g,j,k,l,m;if(0===a.length)throw Error("empty string");if("NaN"===a||"Infinity"===a||"+Infinity"===a||"-Infinity"===a)return q;if("number"==typeof b?(c=b,b=!1):b=!!b,c=c||10,2>c||c>36)throw RangeError("radix");if((d=a.indexOf("-"))>0)throw Error("interior hyphen");if(0===d)return i(a.substring(1),b,c).neg();for(e=f(h(c,8)),g=q,j=0;j<a.length;j+=8)k=Math.min(8,a.length-j),l=parseInt(a.substring(j,j+k),c),8>k?(m=f(h(c,k)),g=g.mul(m).add(f(l))):(g=g.mul(e),g=g.add(f(l)));return g.unsigned=b,g}function j(b){return b instanceof a?b:"number"==typeof b?f(b):"string"==typeof b?i(b):g(b.low,b.high,b.unsigned)}var c,d,h,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y;return Object.defineProperty(a.prototype,"__isLong__",{value:!0,enumerable:!1,configurable:!1}),a.isLong=b,c={},d={},a.fromInt=e,a.fromNumber=f,a.fromBits=g,h=Math.pow,a.fromString=i,a.fromValue=j,k=65536,l=1<<24,m=k*k,n=m*m,o=n/2,p=e(l),q=e(0),a.ZERO=q,r=e(0,!0),a.UZERO=r,s=e(1),a.ONE=s,t=e(1,!0),a.UONE=t,u=e(-1),a.NEG_ONE=u,v=g(-1,2147483647,!1),a.MAX_VALUE=v,w=g(-1,-1,!0),a.MAX_UNSIGNED_VALUE=w,x=g(0,-2147483648,!1),a.MIN_VALUE=x,y=a.prototype,y.toInt=function(){return this.unsigned?this.low>>>0:this.low},y.toNumber=function(){return this.unsigned?(this.high>>>0)*m+(this.low>>>0):this.high*m+(this.low>>>0)},y.toString=function(a){var b,c,d,e,g,i,j,k,l;if(a=a||10,2>a||a>36)throw RangeError("radix");if(this.isZero())return "0";if(this.isNegative())return this.eq(x)?(b=f(a),c=this.div(b),d=c.mul(b).sub(this),c.toString(a)+d.toInt().toString(a)):"-"+this.neg().toString(a);for(e=f(h(a,6),this.unsigned),g=this,i="";;){if(j=g.div(e),k=g.sub(j.mul(e)).toInt()>>>0,l=k.toString(a),g=j,g.isZero())return l+i;for(;l.length<6;)l="0"+l;i=""+l+i;}},y.getHighBits=function(){return this.high},y.getHighBitsUnsigned=function(){return this.high>>>0},y.getLowBits=function(){return this.low},y.getLowBitsUnsigned=function(){return this.low>>>0},y.getNumBitsAbs=function(){var a,b;if(this.isNegative())return this.eq(x)?64:this.neg().getNumBitsAbs();for(a=0!=this.high?this.high:this.low,b=31;b>0&&0==(a&1<<b);b--);return 0!=this.high?b+33:b+1},y.isZero=function(){return 0===this.high&&0===this.low},y.isNegative=function(){return !this.unsigned&&this.high<0},y.isPositive=function(){return this.unsigned||this.high>=0},y.isOdd=function(){return 1===(1&this.low)},y.isEven=function(){return 0===(1&this.low)},y.equals=function(a){return b(a)||(a=j(a)),this.unsigned!==a.unsigned&&1===this.high>>>31&&1===a.high>>>31?!1:this.high===a.high&&this.low===a.low},y.eq=y.equals,y.notEquals=function(a){return !this.eq(a)},y.neq=y.notEquals,y.lessThan=function(a){return this.comp(a)<0},y.lt=y.lessThan,y.lessThanOrEqual=function(a){return this.comp(a)<=0},y.lte=y.lessThanOrEqual,y.greaterThan=function(a){return this.comp(a)>0},y.gt=y.greaterThan,y.greaterThanOrEqual=function(a){return this.comp(a)>=0},y.gte=y.greaterThanOrEqual,y.compare=function(a){if(b(a)||(a=j(a)),this.eq(a))return 0;var c=this.isNegative(),d=a.isNegative();return c&&!d?-1:!c&&d?1:this.unsigned?a.high>>>0>this.high>>>0||a.high===this.high&&a.low>>>0>this.low>>>0?-1:1:this.sub(a).isNegative()?-1:1},y.comp=y.compare,y.negate=function(){return !this.unsigned&&this.eq(x)?x:this.not().add(s)},y.neg=y.negate,y.add=function(a){var c,d,e,f,h,i,k,l,m,n,o,p;return b(a)||(a=j(a)),c=this.high>>>16,d=65535&this.high,e=this.low>>>16,f=65535&this.low,h=a.high>>>16,i=65535&a.high,k=a.low>>>16,l=65535&a.low,m=0,n=0,o=0,p=0,p+=f+l,o+=p>>>16,p&=65535,o+=e+k,n+=o>>>16,o&=65535,n+=d+i,m+=n>>>16,n&=65535,m+=c+h,m&=65535,g(o<<16|p,m<<16|n,this.unsigned)},y.subtract=function(a){return b(a)||(a=j(a)),this.add(a.neg())},y.sub=y.subtract,y.multiply=function(a){var c,d,e,h,i,k,l,m,n,o,r,s;return this.isZero()?q:(b(a)||(a=j(a)),a.isZero()?q:this.eq(x)?a.isOdd()?x:q:a.eq(x)?this.isOdd()?x:q:this.isNegative()?a.isNegative()?this.neg().mul(a.neg()):this.neg().mul(a).neg():a.isNegative()?this.mul(a.neg()).neg():this.lt(p)&&a.lt(p)?f(this.toNumber()*a.toNumber(),this.unsigned):(c=this.high>>>16,d=65535&this.high,e=this.low>>>16,h=65535&this.low,i=a.high>>>16,k=65535&a.high,l=a.low>>>16,m=65535&a.low,n=0,o=0,r=0,s=0,s+=h*m,r+=s>>>16,s&=65535,r+=e*m,o+=r>>>16,r&=65535,r+=h*l,o+=r>>>16,r&=65535,o+=d*m,n+=o>>>16,o&=65535,o+=e*l,n+=o>>>16,o&=65535,o+=h*k,n+=o>>>16,o&=65535,n+=c*m+d*l+e*k+h*i,n&=65535,g(r<<16|s,n<<16|o,this.unsigned)))},y.mul=y.multiply,y.divide=function(a){var c,d,e,g,i,k,l,m;if(b(a)||(a=j(a)),a.isZero())throw Error("division by zero");if(this.isZero())return this.unsigned?r:q;if(this.unsigned){if(a.unsigned||(a=a.toUnsigned()),a.gt(this))return r;if(a.gt(this.shru(1)))return t;e=r;}else{if(this.eq(x))return a.eq(s)||a.eq(u)?x:a.eq(x)?s:(g=this.shr(1),c=g.div(a).shl(1),c.eq(q)?a.isNegative()?s:u:(d=this.sub(a.mul(c)),e=c.add(d.div(a))));if(a.eq(x))return this.unsigned?r:q;if(this.isNegative())return a.isNegative()?this.neg().div(a.neg()):this.neg().div(a).neg();if(a.isNegative())return this.div(a.neg()).neg();e=q;}for(d=this;d.gte(a);){for(c=Math.max(1,Math.floor(d.toNumber()/a.toNumber())),i=Math.ceil(Math.log(c)/Math.LN2),k=48>=i?1:h(2,i-48),l=f(c),m=l.mul(a);m.isNegative()||m.gt(d);)c-=k,l=f(c,this.unsigned),m=l.mul(a);l.isZero()&&(l=s),e=e.add(l),d=d.sub(m);}return e},y.div=y.divide,y.modulo=function(a){return b(a)||(a=j(a)),this.sub(this.div(a).mul(a))},y.mod=y.modulo,y.not=function(){return g(~this.low,~this.high,this.unsigned)},y.and=function(a){return b(a)||(a=j(a)),g(this.low&a.low,this.high&a.high,this.unsigned)},y.or=function(a){return b(a)||(a=j(a)),g(this.low|a.low,this.high|a.high,this.unsigned)},y.xor=function(a){return b(a)||(a=j(a)),g(this.low^a.low,this.high^a.high,this.unsigned)},y.shiftLeft=function(a){return b(a)&&(a=a.toInt()),0===(a&=63)?this:32>a?g(this.low<<a,this.high<<a|this.low>>>32-a,this.unsigned):g(0,this.low<<a-32,this.unsigned)},y.shl=y.shiftLeft,y.shiftRight=function(a){return b(a)&&(a=a.toInt()),0===(a&=63)?this:32>a?g(this.low>>>a|this.high<<32-a,this.high>>a,this.unsigned):g(this.high>>a-32,this.high>=0?0:-1,this.unsigned)},y.shr=y.shiftRight,y.shiftRightUnsigned=function(a){var c,d;return b(a)&&(a=a.toInt()),a&=63,0===a?this:(c=this.high,32>a?(d=this.low,g(d>>>a|c<<32-a,c>>>a,this.unsigned)):32===a?g(c,0,this.unsigned):g(c>>>a-32,0,this.unsigned))},y.shru=y.shiftRightUnsigned,y.toSigned=function(){return this.unsigned?g(this.low,this.high,!1):this},y.toUnsigned=function(){return this.unsigned?this:g(this.low,this.high,!0)},y.toBytes=function(a){return a?this.toBytesLE():this.toBytesBE()},y.toBytesLE=function(){var a=this.high,b=this.low;return [255&b,255&b>>>8,255&b>>>16,255&b>>>24,255&a,255&a>>>8,255&a>>>16,255&a>>>24]},y.toBytesBE=function(){var a=this.high,b=this.low;return [255&a>>>24,255&a>>>16,255&a>>>8,255&a,255&b>>>24,255&b>>>16,255&b>>>8,255&b]},a}(),d=function(a){function f(a){var b=0;return function(){return b<a.length?a.charCodeAt(b++):null}}function g(){var a=[],b=[];return function(){return 0===arguments.length?b.join("")+e.apply(String,a):(a.length+arguments.length>1024&&(b.push(e.apply(String,a)),a.length=0),Array.prototype.push.apply(a,arguments),void 0)}}function h(a,b,c,d,e){var f,g,h=8*e-d-1,i=(1<<h)-1,j=i>>1,k=-7,l=c?e-1:0,m=c?-1:1,n=a[b+l];for(l+=m,f=n&(1<<-k)-1,n>>=-k,k+=h;k>0;f=256*f+a[b+l],l+=m,k-=8);for(g=f&(1<<-k)-1,f>>=-k,k+=d;k>0;g=256*g+a[b+l],l+=m,k-=8);if(0===f)f=1-j;else{if(f===i)return g?0/0:1/0*(n?-1:1);g+=Math.pow(2,d),f-=j;}return (n?-1:1)*g*Math.pow(2,f-d)}function i(a,b,c,d,e,f){var g,h,i,j=8*f-e-1,k=(1<<j)-1,l=k>>1,m=23===e?Math.pow(2,-24)-Math.pow(2,-77):0,n=d?0:f-1,o=d?1:-1,p=0>b||0===b&&0>1/b?1:0;for(b=Math.abs(b),isNaN(b)||1/0===b?(h=isNaN(b)?1:0,g=k):(g=Math.floor(Math.log(b)/Math.LN2),b*(i=Math.pow(2,-g))<1&&(g--,i*=2),b+=g+l>=1?m/i:m*Math.pow(2,1-l),b*i>=2&&(g++,i/=2),g+l>=k?(h=0,g=k):g+l>=1?(h=(b*i-1)*Math.pow(2,e),g+=l):(h=b*Math.pow(2,l-1)*Math.pow(2,e),g=0));e>=8;a[c+n]=255&h,n+=o,h/=256,e-=8);for(g=g<<e|h,j+=e;j>0;a[c+n]=255&g,n+=o,g/=256,j-=8);a[c+n-o]|=128*p;}var c,d,e,j,k,b=function(a,c,e){if("undefined"==typeof a&&(a=b.DEFAULT_CAPACITY),"undefined"==typeof c&&(c=b.DEFAULT_ENDIAN),"undefined"==typeof e&&(e=b.DEFAULT_NOASSERT),!e){if(a=0|a,0>a)throw RangeError("Illegal capacity");c=!!c,e=!!e;}this.buffer=0===a?d:new ArrayBuffer(a),this.view=0===a?null:new Uint8Array(this.buffer),this.offset=0,this.markedOffset=-1,this.limit=a,this.littleEndian=c,this.noAssert=e;};return b.VERSION="5.0.1",b.LITTLE_ENDIAN=!0,b.BIG_ENDIAN=!1,b.DEFAULT_CAPACITY=16,b.DEFAULT_ENDIAN=b.BIG_ENDIAN,b.DEFAULT_NOASSERT=!1,b.Long=a||null,c=b.prototype,c.__isByteBuffer__,Object.defineProperty(c,"__isByteBuffer__",{value:!0,enumerable:!1,configurable:!1}),d=new ArrayBuffer(0),e=String.fromCharCode,b.accessor=function(){return Uint8Array},b.allocate=function(a,c,d){return new b(a,c,d)},b.concat=function(a,c,d,e){var f,i,g,h,k,j;for(("boolean"==typeof c||"string"!=typeof c)&&(e=d,d=c,c=void 0),f=0,g=0,h=a.length;h>g;++g)b.isByteBuffer(a[g])||(a[g]=b.wrap(a[g],c)),i=a[g].limit-a[g].offset,i>0&&(f+=i);if(0===f)return new b(0,d,e);for(j=new b(f,d,e),g=0;h>g;)k=a[g++],i=k.limit-k.offset,0>=i||(j.view.set(k.view.subarray(k.offset,k.limit),j.offset),j.offset+=i);return j.limit=j.offset,j.offset=0,j},b.isByteBuffer=function(a){return (a&&a.__isByteBuffer__)===!0},b.type=function(){return ArrayBuffer},b.wrap=function(a,d,e,f){var g,h;if("string"!=typeof d&&(f=e,e=d,d=void 0),"string"==typeof a)switch("undefined"==typeof d&&(d="utf8"),d){case"base64":return b.fromBase64(a,e);case"hex":return b.fromHex(a,e);case"binary":return b.fromBinary(a,e);case"utf8":return b.fromUTF8(a,e);case"debug":return b.fromDebug(a,e);default:throw Error("Unsupported encoding: "+d)}if(null===a||"object"!=typeof a)throw TypeError("Illegal buffer");if(b.isByteBuffer(a))return g=c.clone.call(a),g.markedOffset=-1,g;if(a instanceof Uint8Array)g=new b(0,e,f),a.length>0&&(g.buffer=a.buffer,g.offset=a.byteOffset,g.limit=a.byteOffset+a.byteLength,g.view=new Uint8Array(a.buffer));else if(a instanceof ArrayBuffer)g=new b(0,e,f),a.byteLength>0&&(g.buffer=a,g.offset=0,g.limit=a.byteLength,g.view=a.byteLength>0?new Uint8Array(a):null);else{if("[object Array]"!==Object.prototype.toString.call(a))throw TypeError("Illegal buffer");for(g=new b(a.length,e,f),g.limit=a.length,h=0;h<a.length;++h)g.view[h]=a[h];}return g},c.writeBitSet=function(a,b){var h,d,e,f,g,i,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if(!(a instanceof Array))throw TypeError("Illegal BitSet: Not an array");if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}for(d=b,e=a.length,f=e>>3,g=0,b+=this.writeVarint32(e,b);f--;)h=1&!!a[g++]|(1&!!a[g++])<<1|(1&!!a[g++])<<2|(1&!!a[g++])<<3|(1&!!a[g++])<<4|(1&!!a[g++])<<5|(1&!!a[g++])<<6|(1&!!a[g++])<<7,this.writeByte(h,b++);if(e>g){for(i=0,h=0;e>g;)h|=(1&!!a[g++])<<i++;this.writeByte(h,b++);}return c?(this.offset=b,this):b-d},c.readBitSet=function(a){var h,c,d,e,f,g,i,b="undefined"==typeof a;for(b&&(a=this.offset),c=this.readVarint32(a),d=c.value,e=d>>3,f=0,g=[],a+=c.length;e--;)h=this.readByte(a++),g[f++]=!!(1&h),g[f++]=!!(2&h),g[f++]=!!(4&h),g[f++]=!!(8&h),g[f++]=!!(16&h),g[f++]=!!(32&h),g[f++]=!!(64&h),g[f++]=!!(128&h);if(d>f)for(i=0,h=this.readByte(a++);d>f;)g[f++]=!!(1&h>>i++);return b&&(this.offset=a),g},c.readBytes=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+a>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+a+") <= "+this.buffer.byteLength)}return d=this.slice(b,b+a),c&&(this.offset+=a),d},c.writeBytes=c.append,c.writeInt8=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a|=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=1,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=1,this.view[b]=a,c&&(this.offset+=1),this},c.writeByte=c.writeInt8,c.readInt8=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+1>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+1+") <= "+this.buffer.byteLength)}return c=this.view[a],128===(128&c)&&(c=-(255-c+1)),b&&(this.offset+=1),c},c.readByte=c.readInt8,c.writeUint8=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=1,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=1,this.view[b]=a,c&&(this.offset+=1),this},c.writeUInt8=c.writeUint8,c.readUint8=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+1>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+1+") <= "+this.buffer.byteLength)}return c=this.view[a],b&&(this.offset+=1),c},c.readUInt8=c.readUint8,c.writeInt16=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a|=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=2,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=2,this.littleEndian?(this.view[b+1]=(65280&a)>>>8,this.view[b]=255&a):(this.view[b]=(65280&a)>>>8,this.view[b+1]=255&a),c&&(this.offset+=2),this},c.writeShort=c.writeInt16,c.readInt16=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+2>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+2+") <= "+this.buffer.byteLength)}return c=0,this.littleEndian?(c=this.view[a],c|=this.view[a+1]<<8):(c=this.view[a]<<8,c|=this.view[a+1]),32768===(32768&c)&&(c=-(65535-c+1)),b&&(this.offset+=2),c},c.readShort=c.readInt16,c.writeUint16=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=2,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=2,this.littleEndian?(this.view[b+1]=(65280&a)>>>8,this.view[b]=255&a):(this.view[b]=(65280&a)>>>8,this.view[b+1]=255&a),c&&(this.offset+=2),this},c.writeUInt16=c.writeUint16,c.readUint16=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+2>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+2+") <= "+this.buffer.byteLength)}return c=0,this.littleEndian?(c=this.view[a],c|=this.view[a+1]<<8):(c=this.view[a]<<8,c|=this.view[a+1]),b&&(this.offset+=2),c},c.readUInt16=c.readUint16,c.writeInt32=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a|=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=4,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=4,this.littleEndian?(this.view[b+3]=255&a>>>24,this.view[b+2]=255&a>>>16,this.view[b+1]=255&a>>>8,this.view[b]=255&a):(this.view[b]=255&a>>>24,this.view[b+1]=255&a>>>16,this.view[b+2]=255&a>>>8,this.view[b+3]=255&a),c&&(this.offset+=4),this},c.writeInt=c.writeInt32,c.readInt32=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+4>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+4+") <= "+this.buffer.byteLength)}return c=0,this.littleEndian?(c=this.view[a+2]<<16,c|=this.view[a+1]<<8,c|=this.view[a],c+=this.view[a+3]<<24>>>0):(c=this.view[a+1]<<16,c|=this.view[a+2]<<8,c|=this.view[a+3],c+=this.view[a]<<24>>>0),c|=0,b&&(this.offset+=4),c},c.readInt=c.readInt32,c.writeUint32=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=4,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=4,this.littleEndian?(this.view[b+3]=255&a>>>24,this.view[b+2]=255&a>>>16,this.view[b+1]=255&a>>>8,this.view[b]=255&a):(this.view[b]=255&a>>>24,this.view[b+1]=255&a>>>16,this.view[b+2]=255&a>>>8,this.view[b+3]=255&a),c&&(this.offset+=4),this},c.writeUInt32=c.writeUint32,c.readUint32=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+4>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+4+") <= "+this.buffer.byteLength)}return c=0,this.littleEndian?(c=this.view[a+2]<<16,c|=this.view[a+1]<<8,c|=this.view[a],c+=this.view[a+3]<<24>>>0):(c=this.view[a+1]<<16,c|=this.view[a+2]<<8,c|=this.view[a+3],c+=this.view[a]<<24>>>0),b&&(this.offset+=4),c},c.readUInt32=c.readUint32,a&&(c.writeInt64=function(b,c){var e,f,g,d="undefined"==typeof c;if(d&&(c=this.offset),!this.noAssert){if("number"==typeof b)b=a.fromNumber(b);else if("string"==typeof b)b=a.fromString(b);else if(!(b&&b instanceof a))throw TypeError("Illegal value: "+b+" (not an integer or Long)");if("number"!=typeof c||0!==c%1)throw TypeError("Illegal offset: "+c+" (not an integer)");if(c>>>=0,0>c||c+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+c+" (+"+0+") <= "+this.buffer.byteLength)}return "number"==typeof b?b=a.fromNumber(b):"string"==typeof b&&(b=a.fromString(b)),c+=8,e=this.buffer.byteLength,c>e&&this.resize((e*=2)>c?e:c),c-=8,f=b.low,g=b.high,this.littleEndian?(this.view[c+3]=255&f>>>24,this.view[c+2]=255&f>>>16,this.view[c+1]=255&f>>>8,this.view[c]=255&f,c+=4,this.view[c+3]=255&g>>>24,this.view[c+2]=255&g>>>16,this.view[c+1]=255&g>>>8,this.view[c]=255&g):(this.view[c]=255&g>>>24,this.view[c+1]=255&g>>>16,this.view[c+2]=255&g>>>8,this.view[c+3]=255&g,c+=4,this.view[c]=255&f>>>24,this.view[c+1]=255&f>>>16,this.view[c+2]=255&f>>>8,this.view[c+3]=255&f),d&&(this.offset+=8),this},c.writeLong=c.writeInt64,c.readInt64=function(b){var d,e,f,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+8>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+8+") <= "+this.buffer.byteLength)}return d=0,e=0,this.littleEndian?(d=this.view[b+2]<<16,d|=this.view[b+1]<<8,d|=this.view[b],d+=this.view[b+3]<<24>>>0,b+=4,e=this.view[b+2]<<16,e|=this.view[b+1]<<8,e|=this.view[b],e+=this.view[b+3]<<24>>>0):(e=this.view[b+1]<<16,e|=this.view[b+2]<<8,e|=this.view[b+3],e+=this.view[b]<<24>>>0,b+=4,d=this.view[b+1]<<16,d|=this.view[b+2]<<8,d|=this.view[b+3],d+=this.view[b]<<24>>>0),f=new a(d,e,!1),c&&(this.offset+=8),f},c.readLong=c.readInt64,c.writeUint64=function(b,c){var e,f,g,d="undefined"==typeof c;if(d&&(c=this.offset),!this.noAssert){if("number"==typeof b)b=a.fromNumber(b);else if("string"==typeof b)b=a.fromString(b);else if(!(b&&b instanceof a))throw TypeError("Illegal value: "+b+" (not an integer or Long)");if("number"!=typeof c||0!==c%1)throw TypeError("Illegal offset: "+c+" (not an integer)");if(c>>>=0,0>c||c+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+c+" (+"+0+") <= "+this.buffer.byteLength)}return "number"==typeof b?b=a.fromNumber(b):"string"==typeof b&&(b=a.fromString(b)),c+=8,e=this.buffer.byteLength,c>e&&this.resize((e*=2)>c?e:c),c-=8,f=b.low,g=b.high,this.littleEndian?(this.view[c+3]=255&f>>>24,this.view[c+2]=255&f>>>16,this.view[c+1]=255&f>>>8,this.view[c]=255&f,c+=4,this.view[c+3]=255&g>>>24,this.view[c+2]=255&g>>>16,this.view[c+1]=255&g>>>8,this.view[c]=255&g):(this.view[c]=255&g>>>24,this.view[c+1]=255&g>>>16,this.view[c+2]=255&g>>>8,this.view[c+3]=255&g,c+=4,this.view[c]=255&f>>>24,this.view[c+1]=255&f>>>16,this.view[c+2]=255&f>>>8,this.view[c+3]=255&f),d&&(this.offset+=8),this},c.writeUInt64=c.writeUint64,c.readUint64=function(b){var d,e,f,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+8>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+8+") <= "+this.buffer.byteLength)}return d=0,e=0,this.littleEndian?(d=this.view[b+2]<<16,d|=this.view[b+1]<<8,d|=this.view[b],d+=this.view[b+3]<<24>>>0,b+=4,e=this.view[b+2]<<16,e|=this.view[b+1]<<8,e|=this.view[b],e+=this.view[b+3]<<24>>>0):(e=this.view[b+1]<<16,e|=this.view[b+2]<<8,e|=this.view[b+3],e+=this.view[b]<<24>>>0,b+=4,d=this.view[b+1]<<16,d|=this.view[b+2]<<8,d|=this.view[b+3],d+=this.view[b]<<24>>>0),f=new a(d,e,!0),c&&(this.offset+=8),f},c.readUInt64=c.readUint64),c.writeFloat32=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a)throw TypeError("Illegal value: "+a+" (not a number)");if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=4,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=4,i(this.view,a,b,this.littleEndian,23,4),c&&(this.offset+=4),this},c.writeFloat=c.writeFloat32,c.readFloat32=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+4>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+4+") <= "+this.buffer.byteLength)}return c=h(this.view,a,this.littleEndian,23,4),b&&(this.offset+=4),c},c.readFloat=c.readFloat32,c.writeFloat64=function(a,b){var d,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof a)throw TypeError("Illegal value: "+a+" (not a number)");if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return b+=8,d=this.buffer.byteLength,b>d&&this.resize((d*=2)>b?d:b),b-=8,i(this.view,a,b,this.littleEndian,52,8),c&&(this.offset+=8),this},c.writeDouble=c.writeFloat64,c.readFloat64=function(a){var c,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+8>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+8+") <= "+this.buffer.byteLength)}return c=h(this.view,a,this.littleEndian,52,8),b&&(this.offset+=8),c},c.readDouble=c.readFloat64,b.MAX_VARINT32_BYTES=5,b.calculateVarint32=function(a){return a>>>=0,128>a?1:16384>a?2:1<<21>a?3:1<<28>a?4:5},b.zigZagEncode32=function(a){return ((a|=0)<<1^a>>31)>>>0},b.zigZagDecode32=function(a){return 0|a>>>1^-(1&a)},c.writeVarint32=function(a,c){var f,e,g,d="undefined"==typeof c;if(d&&(c=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a|=0,"number"!=typeof c||0!==c%1)throw TypeError("Illegal offset: "+c+" (not an integer)");if(c>>>=0,0>c||c+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+c+" (+"+0+") <= "+this.buffer.byteLength)}for(e=b.calculateVarint32(a),c+=e,g=this.buffer.byteLength,c>g&&this.resize((g*=2)>c?g:c),c-=e,a>>>=0;a>=128;)f=128|127&a,this.view[c++]=f,a>>>=7;return this.view[c++]=a,d?(this.offset=c,this):e},c.writeVarint32ZigZag=function(a,c){return this.writeVarint32(b.zigZagEncode32(a),c)},c.readVarint32=function(a){var e,c,d,f,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+1>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+1+") <= "+this.buffer.byteLength)}c=0,d=0;do{if(!this.noAssert&&a>this.limit)throw f=Error("Truncated"),f.truncated=!0,f;e=this.view[a++],5>c&&(d|=(127&e)<<7*c),++c;}while(0!==(128&e));return d|=0,b?(this.offset=a,d):{value:d,length:c}},c.readVarint32ZigZag=function(a){var c=this.readVarint32(a);return "object"==typeof c?c.value=b.zigZagDecode32(c.value):c=b.zigZagDecode32(c),c},a&&(b.MAX_VARINT64_BYTES=10,b.calculateVarint64=function(b){"number"==typeof b?b=a.fromNumber(b):"string"==typeof b&&(b=a.fromString(b));var c=b.toInt()>>>0,d=b.shiftRightUnsigned(28).toInt()>>>0,e=b.shiftRightUnsigned(56).toInt()>>>0;return 0==e?0==d?16384>c?128>c?1:2:1<<21>c?3:4:16384>d?128>d?5:6:1<<21>d?7:8:128>e?9:10},b.zigZagEncode64=function(b){return "number"==typeof b?b=a.fromNumber(b,!1):"string"==typeof b?b=a.fromString(b,!1):b.unsigned!==!1&&(b=b.toSigned()),b.shiftLeft(1).xor(b.shiftRight(63)).toUnsigned()},b.zigZagDecode64=function(b){return "number"==typeof b?b=a.fromNumber(b,!1):"string"==typeof b?b=a.fromString(b,!1):b.unsigned!==!1&&(b=b.toSigned()),b.shiftRightUnsigned(1).xor(b.and(a.ONE).toSigned().negate()).toSigned()},c.writeVarint64=function(c,d){var f,g,h,i,j,e="undefined"==typeof d;if(e&&(d=this.offset),!this.noAssert){if("number"==typeof c)c=a.fromNumber(c);else if("string"==typeof c)c=a.fromString(c);else if(!(c&&c instanceof a))throw TypeError("Illegal value: "+c+" (not an integer or Long)");if("number"!=typeof d||0!==d%1)throw TypeError("Illegal offset: "+d+" (not an integer)");if(d>>>=0,0>d||d+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+d+" (+"+0+") <= "+this.buffer.byteLength)}switch("number"==typeof c?c=a.fromNumber(c,!1):"string"==typeof c?c=a.fromString(c,!1):c.unsigned!==!1&&(c=c.toSigned()),f=b.calculateVarint64(c),g=c.toInt()>>>0,h=c.shiftRightUnsigned(28).toInt()>>>0,i=c.shiftRightUnsigned(56).toInt()>>>0,d+=f,j=this.buffer.byteLength,d>j&&this.resize((j*=2)>d?j:d),d-=f,f){case 10:this.view[d+9]=1&i>>>7;case 9:this.view[d+8]=9!==f?128|i:127&i;case 8:this.view[d+7]=8!==f?128|h>>>21:127&h>>>21;case 7:this.view[d+6]=7!==f?128|h>>>14:127&h>>>14;case 6:this.view[d+5]=6!==f?128|h>>>7:127&h>>>7;case 5:this.view[d+4]=5!==f?128|h:127&h;case 4:this.view[d+3]=4!==f?128|g>>>21:127&g>>>21;case 3:this.view[d+2]=3!==f?128|g>>>14:127&g>>>14;case 2:this.view[d+1]=2!==f?128|g>>>7:127&g>>>7;case 1:this.view[d]=1!==f?128|g:127&g;}return e?(this.offset+=f,this):f},c.writeVarint64ZigZag=function(a,c){return this.writeVarint64(b.zigZagEncode64(a),c)},c.readVarint64=function(b){var d,e,f,g,h,i,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+1>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+1+") <= "+this.buffer.byteLength)}if(d=b,e=0,f=0,g=0,h=0,h=this.view[b++],e=127&h,128&h&&(h=this.view[b++],e|=(127&h)<<7,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],e|=(127&h)<<14,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],e|=(127&h)<<21,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],f=127&h,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],f|=(127&h)<<7,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],f|=(127&h)<<14,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],f|=(127&h)<<21,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],g=127&h,(128&h||this.noAssert&&"undefined"==typeof h)&&(h=this.view[b++],g|=(127&h)<<7,128&h||this.noAssert&&"undefined"==typeof h))))))))))throw Error("Buffer overrun");return i=a.fromBits(e|f<<28,f>>>4|g<<24,!1),c?(this.offset=b,i):{value:i,length:b-d}},c.readVarint64ZigZag=function(c){var d=this.readVarint64(c);return d&&d.value instanceof a?d.value=b.zigZagDecode64(d.value):d=b.zigZagDecode64(d),d}),c.writeCString=function(a,b){var d,e,g,c="undefined"==typeof b;if(c&&(b=this.offset),e=a.length,!this.noAssert){if("string"!=typeof a)throw TypeError("Illegal str: Not a string");for(d=0;e>d;++d)if(0===a.charCodeAt(d))throw RangeError("Illegal str: Contains NULL-characters");if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return e=k.calculateUTF16asUTF8(f(a))[1],b+=e+1,g=this.buffer.byteLength,b>g&&this.resize((g*=2)>b?g:b),b-=e+1,k.encodeUTF16toUTF8(f(a),function(a){this.view[b++]=a;}.bind(this)),this.view[b++]=0,c?(this.offset=b,this):e},c.readCString=function(a){var c,e,f,b="undefined"==typeof a;if(b&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+1>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+1+") <= "+this.buffer.byteLength)}return c=a,f=-1,k.decodeUTF8toUTF16(function(){if(0===f)return null;if(a>=this.limit)throw RangeError("Illegal range: Truncated data, "+a+" < "+this.limit);return f=this.view[a++],0===f?null:f}.bind(this),e=g(),!0),b?(this.offset=a,e()):{string:e(),length:a-c}},c.writeIString=function(a,b){var e,d,g,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("string"!=typeof a)throw TypeError("Illegal str: Not a string");if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}if(d=b,e=k.calculateUTF16asUTF8(f(a),this.noAssert)[1],b+=4+e,g=this.buffer.byteLength,b>g&&this.resize((g*=2)>b?g:b),b-=4+e,this.littleEndian?(this.view[b+3]=255&e>>>24,this.view[b+2]=255&e>>>16,this.view[b+1]=255&e>>>8,this.view[b]=255&e):(this.view[b]=255&e>>>24,this.view[b+1]=255&e>>>16,this.view[b+2]=255&e>>>8,this.view[b+3]=255&e),b+=4,k.encodeUTF16toUTF8(f(a),function(a){this.view[b++]=a;}.bind(this)),b!==d+4+e)throw RangeError("Illegal range: Truncated data, "+b+" == "+(b+4+e));return c?(this.offset=b,this):b-d},c.readIString=function(a){var d,e,f,c="undefined"==typeof a;
  if(c&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+4>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+4+") <= "+this.buffer.byteLength)}return d=a,e=this.readUint32(a),f=this.readUTF8String(e,b.METRICS_BYTES,a+=4),a+=f.length,c?(this.offset=a,f.string):{string:f.string,length:a-d}},b.METRICS_CHARS="c",b.METRICS_BYTES="b",c.writeUTF8String=function(a,b){var d,e,g,c="undefined"==typeof b;if(c&&(b=this.offset),!this.noAssert){if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: "+b+" (not an integer)");if(b>>>=0,0>b||b+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+b+" (+"+0+") <= "+this.buffer.byteLength)}return e=b,d=k.calculateUTF16asUTF8(f(a))[1],b+=d,g=this.buffer.byteLength,b>g&&this.resize((g*=2)>b?g:b),b-=d,k.encodeUTF16toUTF8(f(a),function(a){this.view[b++]=a;}.bind(this)),c?(this.offset=b,this):b-e},c.writeString=c.writeUTF8String,b.calculateUTF8Chars=function(a){return k.calculateUTF16asUTF8(f(a))[0]},b.calculateUTF8Bytes=function(a){return k.calculateUTF16asUTF8(f(a))[1]},b.calculateString=b.calculateUTF8Bytes,c.readUTF8String=function(a,c,d){var e,i,f,h,j;if("number"==typeof c&&(d=c,c=void 0),e="undefined"==typeof d,e&&(d=this.offset),"undefined"==typeof c&&(c=b.METRICS_CHARS),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal length: "+a+" (not an integer)");if(a|=0,"number"!=typeof d||0!==d%1)throw TypeError("Illegal offset: "+d+" (not an integer)");if(d>>>=0,0>d||d+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+d+" (+"+0+") <= "+this.buffer.byteLength)}if(f=0,h=d,c===b.METRICS_CHARS){if(i=g(),k.decodeUTF8(function(){return a>f&&d<this.limit?this.view[d++]:null}.bind(this),function(a){++f,k.UTF8toUTF16(a,i);}),f!==a)throw RangeError("Illegal range: Truncated data, "+f+" == "+a);return e?(this.offset=d,i()):{string:i(),length:d-h}}if(c===b.METRICS_BYTES){if(!this.noAssert){if("number"!=typeof d||0!==d%1)throw TypeError("Illegal offset: "+d+" (not an integer)");if(d>>>=0,0>d||d+a>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+d+" (+"+a+") <= "+this.buffer.byteLength)}if(j=d+a,k.decodeUTF8toUTF16(function(){return j>d?this.view[d++]:null}.bind(this),i=g(),this.noAssert),d!==j)throw RangeError("Illegal range: Truncated data, "+d+" == "+j);return e?(this.offset=d,i()):{string:i(),length:d-h}}throw TypeError("Unsupported metrics: "+c)},c.readString=c.readUTF8String,c.writeVString=function(a,c){var g,h,e,i,d="undefined"==typeof c;if(d&&(c=this.offset),!this.noAssert){if("string"!=typeof a)throw TypeError("Illegal str: Not a string");if("number"!=typeof c||0!==c%1)throw TypeError("Illegal offset: "+c+" (not an integer)");if(c>>>=0,0>c||c+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+c+" (+"+0+") <= "+this.buffer.byteLength)}if(e=c,g=k.calculateUTF16asUTF8(f(a),this.noAssert)[1],h=b.calculateVarint32(g),c+=h+g,i=this.buffer.byteLength,c>i&&this.resize((i*=2)>c?i:c),c-=h+g,c+=this.writeVarint32(g,c),k.encodeUTF16toUTF8(f(a),function(a){this.view[c++]=a;}.bind(this)),c!==e+g+h)throw RangeError("Illegal range: Truncated data, "+c+" == "+(c+g+h));return d?(this.offset=c,this):c-e},c.readVString=function(a){var d,e,f,c="undefined"==typeof a;if(c&&(a=this.offset),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+1>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+1+") <= "+this.buffer.byteLength)}return d=a,e=this.readVarint32(a),f=this.readUTF8String(e.value,b.METRICS_BYTES,a+=e.length),a+=f.length,c?(this.offset=a,f.string):{string:f.string,length:a-d}},c.append=function(a,c,d){var e,f,g;if(("number"==typeof c||"string"!=typeof c)&&(d=c,c=void 0),e="undefined"==typeof d,e&&(d=this.offset),!this.noAssert){if("number"!=typeof d||0!==d%1)throw TypeError("Illegal offset: "+d+" (not an integer)");if(d>>>=0,0>d||d+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+d+" (+"+0+") <= "+this.buffer.byteLength)}return a instanceof b||(a=b.wrap(a,c)),f=a.limit-a.offset,0>=f?this:(d+=f,g=this.buffer.byteLength,d>g&&this.resize((g*=2)>d?g:d),d-=f,this.view.set(a.view.subarray(a.offset,a.limit),d),a.offset+=f,e&&(this.offset+=f),this)},c.appendTo=function(a,b){return a.append(this,b),this},c.assert=function(a){return this.noAssert=!a,this},c.capacity=function(){return this.buffer.byteLength},c.clear=function(){return this.offset=0,this.limit=this.buffer.byteLength,this.markedOffset=-1,this},c.clone=function(a){var c=new b(0,this.littleEndian,this.noAssert);return a?(c.buffer=new ArrayBuffer(this.buffer.byteLength),c.view=new Uint8Array(c.buffer)):(c.buffer=this.buffer,c.view=this.view),c.offset=this.offset,c.markedOffset=this.markedOffset,c.limit=this.limit,c},c.compact=function(a,b){var c,e,f;if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof b&&(b=this.limit),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal begin: Not an integer");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal end: Not an integer");if(b>>>=0,0>a||a>b||b>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+a+" <= "+b+" <= "+this.buffer.byteLength)}return 0===a&&b===this.buffer.byteLength?this:(c=b-a,0===c?(this.buffer=d,this.view=null,this.markedOffset>=0&&(this.markedOffset-=a),this.offset=0,this.limit=0,this):(e=new ArrayBuffer(c),f=new Uint8Array(e),f.set(this.view.subarray(a,b)),this.buffer=e,this.view=f,this.markedOffset>=0&&(this.markedOffset-=a),this.offset=0,this.limit=c,this))},c.copy=function(a,c){if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof c&&(c=this.limit),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal begin: Not an integer");if(a>>>=0,"number"!=typeof c||0!==c%1)throw TypeError("Illegal end: Not an integer");if(c>>>=0,0>a||a>c||c>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+a+" <= "+c+" <= "+this.buffer.byteLength)}if(a===c)return new b(0,this.littleEndian,this.noAssert);var d=c-a,e=new b(d,this.littleEndian,this.noAssert);return e.offset=0,e.limit=d,e.markedOffset>=0&&(e.markedOffset-=a),this.copyTo(e,0,a,c),e},c.copyTo=function(a,c,d,e){var f,g,h;if(!this.noAssert&&!b.isByteBuffer(a))throw TypeError("Illegal target: Not a ByteBuffer");if(c=(g="undefined"==typeof c)?a.offset:0|c,d=(f="undefined"==typeof d)?this.offset:0|d,e="undefined"==typeof e?this.limit:0|e,0>c||c>a.buffer.byteLength)throw RangeError("Illegal target range: 0 <= "+c+" <= "+a.buffer.byteLength);if(0>d||e>this.buffer.byteLength)throw RangeError("Illegal source range: 0 <= "+d+" <= "+this.buffer.byteLength);return h=e-d,0===h?a:(a.ensureCapacity(c+h),a.view.set(this.view.subarray(d,e),c),f&&(this.offset+=h),g&&(a.offset+=h),this)},c.ensureCapacity=function(a){var b=this.buffer.byteLength;return a>b?this.resize((b*=2)>a?b:a):this},c.fill=function(a,b,c){var d="undefined"==typeof b;if(d&&(b=this.offset),"string"==typeof a&&a.length>0&&(a=a.charCodeAt(0)),"undefined"==typeof b&&(b=this.offset),"undefined"==typeof c&&(c=this.limit),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal value: "+a+" (not an integer)");if(a|=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal begin: Not an integer");if(b>>>=0,"number"!=typeof c||0!==c%1)throw TypeError("Illegal end: Not an integer");if(c>>>=0,0>b||b>c||c>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+b+" <= "+c+" <= "+this.buffer.byteLength)}if(b>=c)return this;for(;c>b;)this.view[b++]=a;return d&&(this.offset=b),this},c.flip=function(){return this.limit=this.offset,this.offset=0,this},c.mark=function(a){if(a="undefined"==typeof a?this.offset:a,!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal offset: "+a+" (not an integer)");if(a>>>=0,0>a||a+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+a+" (+"+0+") <= "+this.buffer.byteLength)}return this.markedOffset=a,this},c.order=function(a){if(!this.noAssert&&"boolean"!=typeof a)throw TypeError("Illegal littleEndian: Not a boolean");return this.littleEndian=!!a,this},c.LE=function(a){return this.littleEndian="undefined"!=typeof a?!!a:!0,this},c.BE=function(a){return this.littleEndian="undefined"!=typeof a?!a:!1,this},c.prepend=function(a,c,d){var e,f,g,h,i;if(("number"==typeof c||"string"!=typeof c)&&(d=c,c=void 0),e="undefined"==typeof d,e&&(d=this.offset),!this.noAssert){if("number"!=typeof d||0!==d%1)throw TypeError("Illegal offset: "+d+" (not an integer)");if(d>>>=0,0>d||d+0>this.buffer.byteLength)throw RangeError("Illegal offset: 0 <= "+d+" (+"+0+") <= "+this.buffer.byteLength)}return a instanceof b||(a=b.wrap(a,c)),f=a.limit-a.offset,0>=f?this:(g=f-d,g>0?(h=new ArrayBuffer(this.buffer.byteLength+g),i=new Uint8Array(h),i.set(this.view.subarray(d,this.buffer.byteLength),f),this.buffer=h,this.view=i,this.offset+=g,this.markedOffset>=0&&(this.markedOffset+=g),this.limit+=g,d+=g):new Uint8Array(this.buffer),this.view.set(a.view.subarray(a.offset,a.limit),d-f),a.offset=a.limit,e&&(this.offset-=f),this)},c.prependTo=function(a,b){return a.prepend(this,b),this},c.printDebug=function(a){"function"!=typeof a&&(a=console.log.bind(console)),a(this.toString()+"\n-------------------------------------------------------------------\n"+this.toDebug(!0));},c.remaining=function(){return this.limit-this.offset},c.reset=function(){return this.markedOffset>=0?(this.offset=this.markedOffset,this.markedOffset=-1):this.offset=0,this},c.resize=function(a){var b,c;if(!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal capacity: "+a+" (not an integer)");if(a|=0,0>a)throw RangeError("Illegal capacity: 0 <= "+a)}return this.buffer.byteLength<a&&(b=new ArrayBuffer(a),c=new Uint8Array(b),c.set(this.view),this.buffer=b,this.view=c),this},c.reverse=function(a,b){if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof b&&(b=this.limit),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal begin: Not an integer");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal end: Not an integer");if(b>>>=0,0>a||a>b||b>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+a+" <= "+b+" <= "+this.buffer.byteLength)}return a===b?this:(Array.prototype.reverse.call(this.view.subarray(a,b)),this)},c.skip=function(a){if(!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal length: "+a+" (not an integer)");a|=0;}var b=this.offset+a;if(!this.noAssert&&(0>b||b>this.buffer.byteLength))throw RangeError("Illegal length: 0 <= "+this.offset+" + "+a+" <= "+this.buffer.byteLength);return this.offset=b,this},c.slice=function(a,b){if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof b&&(b=this.limit),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal begin: Not an integer");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal end: Not an integer");if(b>>>=0,0>a||a>b||b>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+a+" <= "+b+" <= "+this.buffer.byteLength)}var c=this.clone();return c.offset=a,c.limit=b,c},c.toBuffer=function(a){var e,b=this.offset,c=this.limit;if(!this.noAssert){if("number"!=typeof b||0!==b%1)throw TypeError("Illegal offset: Not an integer");if(b>>>=0,"number"!=typeof c||0!==c%1)throw TypeError("Illegal limit: Not an integer");if(c>>>=0,0>b||b>c||c>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+b+" <= "+c+" <= "+this.buffer.byteLength)}return a||0!==b||c!==this.buffer.byteLength?b===c?d:(e=new ArrayBuffer(c-b),new Uint8Array(e).set(new Uint8Array(this.buffer).subarray(b,c),0),e):this.buffer},c.toArrayBuffer=c.toBuffer,c.toString=function(a,b,c){if("undefined"==typeof a)return "ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";switch("number"==typeof a&&(a="utf8",b=a,c=b),a){case"utf8":return this.toUTF8(b,c);case"base64":return this.toBase64(b,c);case"hex":return this.toHex(b,c);case"binary":return this.toBinary(b,c);case"debug":return this.toDebug();case"columns":return this.toColumns();default:throw Error("Unsupported encoding: "+a)}},j=function(){var d,e,a={},b=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47],c=[];for(d=0,e=b.length;e>d;++d)c[b[d]]=d;return a.encode=function(a,c){for(var d,e;null!==(d=a());)c(b[63&d>>2]),e=(3&d)<<4,null!==(d=a())?(e|=15&d>>4,c(b[63&(e|15&d>>4)]),e=(15&d)<<2,null!==(d=a())?(c(b[63&(e|3&d>>6)]),c(b[63&d])):(c(b[63&e]),c(61))):(c(b[63&e]),c(61),c(61));},a.decode=function(a,b){function g(a){throw Error("Illegal character code: "+a)}for(var d,e,f;null!==(d=a());)if(e=c[d],"undefined"==typeof e&&g(d),null!==(d=a())&&(f=c[d],"undefined"==typeof f&&g(d),b(e<<2>>>0|(48&f)>>4),null!==(d=a()))){if(e=c[d],"undefined"==typeof e){if(61===d)break;g(d);}if(b((15&f)<<4>>>0|(60&e)>>2),null!==(d=a())){if(f=c[d],"undefined"==typeof f){if(61===d)break;g(d);}b((3&e)<<6>>>0|f);}}},a.test=function(a){return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(a)},a}(),c.toBase64=function(a,b){if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof b&&(b=this.limit),a=0|a,b=0|b,0>a||b>this.capacity||a>b)throw RangeError("begin, end");var c;return j.encode(function(){return b>a?this.view[a++]:null}.bind(this),c=g()),c()},b.fromBase64=function(a,c){if("string"!=typeof a)throw TypeError("str");var d=new b(3*(a.length/4),c),e=0;return j.decode(f(a),function(a){d.view[e++]=a;}),d.limit=e,d},b.btoa=function(a){return b.fromBinary(a).toBase64()},b.atob=function(a){return b.fromBase64(a).toBinary()},c.toBinary=function(a,b){if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof b&&(b=this.limit),a|=0,b|=0,0>a||b>this.capacity()||a>b)throw RangeError("begin, end");if(a===b)return "";for(var c=[],d=[];b>a;)c.push(this.view[a++]),c.length>=1024&&(d.push(String.fromCharCode.apply(String,c)),c=[]);return d.join("")+String.fromCharCode.apply(String,c)},b.fromBinary=function(a,c){if("string"!=typeof a)throw TypeError("str");for(var f,d=0,e=a.length,g=new b(e,c);e>d;){if(f=a.charCodeAt(d),f>255)throw RangeError("illegal char code: "+f);g.view[d++]=f;}return g.limit=e,g},c.toDebug=function(a){for(var d,b=-1,c=this.buffer.byteLength,e="",f="",g="";c>b;){if(-1!==b&&(d=this.view[b],e+=16>d?"0"+d.toString(16).toUpperCase():d.toString(16).toUpperCase(),a&&(f+=d>32&&127>d?String.fromCharCode(d):".")),++b,a&&b>0&&0===b%16&&b!==c){for(;e.length<51;)e+=" ";g+=e+f+"\n",e=f="";}e+=b===this.offset&&b===this.limit?b===this.markedOffset?"!":"|":b===this.offset?b===this.markedOffset?"[":"<":b===this.limit?b===this.markedOffset?"]":">":b===this.markedOffset?"'":a||0!==b&&b!==c?" ":"";}if(a&&" "!==e){for(;e.length<51;)e+=" ";g+=e+f+"\n";}return a?g:e},b.fromDebug=function(a,c,d){for(var i,j,e=a.length,f=new b(0|(e+1)/3,c,d),g=0,h=0,k=!1,l=!1,m=!1,n=!1,o=!1;e>g;){switch(i=a.charAt(g++)){case"!":if(!d){if(l||m||n){o=!0;break}l=m=n=!0;}f.offset=f.markedOffset=f.limit=h,k=!1;break;case"|":if(!d){if(l||n){o=!0;break}l=n=!0;}f.offset=f.limit=h,k=!1;break;case"[":if(!d){if(l||m){o=!0;break}l=m=!0;}f.offset=f.markedOffset=h,k=!1;break;case"<":if(!d){if(l){o=!0;break}l=!0;}f.offset=h,k=!1;break;case"]":if(!d){if(n||m){o=!0;break}n=m=!0;}f.limit=f.markedOffset=h,k=!1;break;case">":if(!d){if(n){o=!0;break}n=!0;}f.limit=h,k=!1;break;case"'":if(!d){if(m){o=!0;break}m=!0;}f.markedOffset=h,k=!1;break;case" ":k=!1;break;default:if(!d&&k){o=!0;break}if(j=parseInt(i+a.charAt(g++),16),!d&&(isNaN(j)||0>j||j>255))throw TypeError("Illegal str: Not a debug encoded string");f.view[h++]=j,k=!0;}if(o)throw TypeError("Illegal str: Invalid symbol at "+g)}if(!d){if(!l||!n)throw TypeError("Illegal str: Missing offset or limit");if(h<f.buffer.byteLength)throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+h+" < "+e)}return f},c.toHex=function(a,b){if(a="undefined"==typeof a?this.offset:a,b="undefined"==typeof b?this.limit:b,!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal begin: Not an integer");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal end: Not an integer");if(b>>>=0,0>a||a>b||b>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+a+" <= "+b+" <= "+this.buffer.byteLength)}for(var d,c=new Array(b-a);b>a;)d=this.view[a++],16>d?c.push("0",d.toString(16)):c.push(d.toString(16));return c.join("")},b.fromHex=function(a,c,d){var g,e,f,h,i;if(!d){if("string"!=typeof a)throw TypeError("Illegal str: Not a string");if(0!==a.length%2)throw TypeError("Illegal str: Length not a multiple of 2")}for(e=a.length,f=new b(0|e/2,c),h=0,i=0;e>h;h+=2){if(g=parseInt(a.substring(h,h+2),16),!d&&(!isFinite(g)||0>g||g>255))throw TypeError("Illegal str: Contains non-hex characters");f.view[i++]=g;}return f.limit=i,f},k=function(){var a={};return a.MAX_CODEPOINT=1114111,a.encodeUTF8=function(a,b){var c=null;for("number"==typeof a&&(c=a,a=function(){return null});null!==c||null!==(c=a());)128>c?b(127&c):2048>c?(b(192|31&c>>6),b(128|63&c)):65536>c?(b(224|15&c>>12),b(128|63&c>>6),b(128|63&c)):(b(240|7&c>>18),b(128|63&c>>12),b(128|63&c>>6),b(128|63&c)),c=null;},a.decodeUTF8=function(a,b){for(var c,d,e,f,g=function(a){a=a.slice(0,a.indexOf(null));var b=Error(a.toString());throw b.name="TruncatedError",b.bytes=a,b};null!==(c=a());)if(0===(128&c))b(c);else if(192===(224&c))null===(d=a())&&g([c,d]),b((31&c)<<6|63&d);else if(224===(240&c))(null===(d=a())||null===(e=a()))&&g([c,d,e]),b((15&c)<<12|(63&d)<<6|63&e);else{if(240!==(248&c))throw RangeError("Illegal starting byte: "+c);(null===(d=a())||null===(e=a())||null===(f=a()))&&g([c,d,e,f]),b((7&c)<<18|(63&d)<<12|(63&e)<<6|63&f);}},a.UTF16toUTF8=function(a,b){for(var c,d=null;;){if(null===(c=null!==d?d:a()))break;c>=55296&&57343>=c&&null!==(d=a())&&d>=56320&&57343>=d?(b(1024*(c-55296)+d-56320+65536),d=null):b(c);}null!==d&&b(d);},a.UTF8toUTF16=function(a,b){var c=null;for("number"==typeof a&&(c=a,a=function(){return null});null!==c||null!==(c=a());)65535>=c?b(c):(c-=65536,b((c>>10)+55296),b(c%1024+56320)),c=null;},a.encodeUTF16toUTF8=function(b,c){a.UTF16toUTF8(b,function(b){a.encodeUTF8(b,c);});},a.decodeUTF8toUTF16=function(b,c){a.decodeUTF8(b,function(b){a.UTF8toUTF16(b,c);});},a.calculateCodePoint=function(a){return 128>a?1:2048>a?2:65536>a?3:4},a.calculateUTF8=function(a){for(var b,c=0;null!==(b=a());)c+=128>b?1:2048>b?2:65536>b?3:4;return c},a.calculateUTF16asUTF8=function(b){var c=0,d=0;return a.UTF16toUTF8(b,function(a){++c,d+=128>a?1:2048>a?2:65536>a?3:4;}),[c,d]},a}(),c.toUTF8=function(a,b){if("undefined"==typeof a&&(a=this.offset),"undefined"==typeof b&&(b=this.limit),!this.noAssert){if("number"!=typeof a||0!==a%1)throw TypeError("Illegal begin: Not an integer");if(a>>>=0,"number"!=typeof b||0!==b%1)throw TypeError("Illegal end: Not an integer");if(b>>>=0,0>a||a>b||b>this.buffer.byteLength)throw RangeError("Illegal range: 0 <= "+a+" <= "+b+" <= "+this.buffer.byteLength)}var c;try{k.decodeUTF8toUTF16(function(){return b>a?this.view[a++]:null}.bind(this),c=g());}catch(d){if(a!==b)throw RangeError("Illegal range: Truncated data, "+a+" != "+b)}return c()},b.fromUTF8=function(a,c,d){if(!d&&"string"!=typeof a)throw TypeError("Illegal str: Not a string");var e=new b(k.calculateUTF16asUTF8(f(a),!0)[1],c,d),g=0;return k.encodeUTF16toUTF8(f(a),function(a){e.view[g++]=a;}),e.limit=g,e},b}(c),e=function(b,c){var f,h,i,e={};return e.ByteBuffer=b,e.c=b,f=b,e.Long=c||null,e.VERSION="5.0.1",e.WIRE_TYPES={},e.WIRE_TYPES.VARINT=0,e.WIRE_TYPES.BITS64=1,e.WIRE_TYPES.LDELIM=2,e.WIRE_TYPES.STARTGROUP=3,e.WIRE_TYPES.ENDGROUP=4,e.WIRE_TYPES.BITS32=5,e.PACKABLE_WIRE_TYPES=[e.WIRE_TYPES.VARINT,e.WIRE_TYPES.BITS64,e.WIRE_TYPES.BITS32],e.TYPES={int32:{name:"int32",wireType:e.WIRE_TYPES.VARINT,defaultValue:0},uint32:{name:"uint32",wireType:e.WIRE_TYPES.VARINT,defaultValue:0},sint32:{name:"sint32",wireType:e.WIRE_TYPES.VARINT,defaultValue:0},int64:{name:"int64",wireType:e.WIRE_TYPES.VARINT,defaultValue:e.Long?e.Long.ZERO:void 0},uint64:{name:"uint64",wireType:e.WIRE_TYPES.VARINT,defaultValue:e.Long?e.Long.UZERO:void 0},sint64:{name:"sint64",wireType:e.WIRE_TYPES.VARINT,defaultValue:e.Long?e.Long.ZERO:void 0},bool:{name:"bool",wireType:e.WIRE_TYPES.VARINT,defaultValue:!1},"double":{name:"double",wireType:e.WIRE_TYPES.BITS64,defaultValue:0},string:{name:"string",wireType:e.WIRE_TYPES.LDELIM,defaultValue:""},bytes:{name:"bytes",wireType:e.WIRE_TYPES.LDELIM,defaultValue:null},fixed32:{name:"fixed32",wireType:e.WIRE_TYPES.BITS32,defaultValue:0},sfixed32:{name:"sfixed32",wireType:e.WIRE_TYPES.BITS32,defaultValue:0},fixed64:{name:"fixed64",wireType:e.WIRE_TYPES.BITS64,defaultValue:e.Long?e.Long.UZERO:void 0},sfixed64:{name:"sfixed64",wireType:e.WIRE_TYPES.BITS64,defaultValue:e.Long?e.Long.ZERO:void 0},"float":{name:"float",wireType:e.WIRE_TYPES.BITS32,defaultValue:0},"enum":{name:"enum",wireType:e.WIRE_TYPES.VARINT,defaultValue:0},message:{name:"message",wireType:e.WIRE_TYPES.LDELIM,defaultValue:null},group:{name:"group",wireType:e.WIRE_TYPES.STARTGROUP,defaultValue:null}},e.MAP_KEY_TYPES=[e.TYPES.int32,e.TYPES.sint32,e.TYPES.sfixed32,e.TYPES.uint32,e.TYPES.fixed32,e.TYPES.int64,e.TYPES.sint64,e.TYPES.sfixed64,e.TYPES.uint64,e.TYPES.fixed64,e.TYPES.bool,e.TYPES.string,e.TYPES.bytes],e.ID_MIN=1,e.ID_MAX=536870911,e.convertFieldsToCamelCase=!1,e.populateAccessors=!0,e.populateDefaults=!0,e.Util=function(){var a={};return a.IS_NODE=!("object"!=typeof process||"[object process]"!=process+""||process.browser),a.XHR=function(){var c,a=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],b=null;for(c=0;c<a.length;c++){try{b=a[c]();}catch(d){continue}break}if(!b)throw Error("XMLHttpRequest is not supported");return b},a.fetch=function(b,c){if(c&&"function"!=typeof c&&(c=null),a.IS_NODE)if(c)g.readFile(b,function(a,b){a?c(null):c(""+b);});else try{return g.readFileSync(b)}catch(d){return null}else{var e=a.XHR();if(e.open("GET",b,c?!0:!1),e.setRequestHeader("Accept","text/plain"),"function"==typeof e.overrideMimeType&&e.overrideMimeType("text/plain"),!c)return e.send(null),200==e.status||0==e.status&&"string"==typeof e.responseText?e.responseText:null;if(e.onreadystatechange=function(){4==e.readyState&&(200==e.status||0==e.status&&"string"==typeof e.responseText?c(e.responseText):c(null));},4==e.readyState)return;e.send(null);}},a.toCamelCase=function(a){return a.replace(/_([a-zA-Z])/g,function(a,b){return b.toUpperCase()})},a}(),e.Lang={DELIM:/[\s\{\}=;:\[\],'"\(\)<>]/g,RULE:/^(?:required|optional|repeated|map)$/,TYPE:/^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,NAME:/^[a-zA-Z_][a-zA-Z_0-9]*$/,TYPEDEF:/^[a-zA-Z][a-zA-Z_0-9]*$/,TYPEREF:/^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,FQTYPEREF:/^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,NUMBER:/^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,NUMBER_DEC:/^(?:[1-9][0-9]*|0)$/,NUMBER_HEX:/^0[xX][0-9a-fA-F]+$/,NUMBER_OCT:/^0[0-7]+$/,NUMBER_FLT:/^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,BOOL:/^(?:true|false)$/i,ID:/^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,NEGID:/^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,WHITESPACE:/\s/,STRING:/(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,STRING_DQ:/(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,STRING_SQ:/(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g},e.DotProto=function(a,b){function h(a,c){var d=-1,e=1;if("-"==a.charAt(0)&&(e=-1,a=a.substring(1)),b.NUMBER_DEC.test(a))d=parseInt(a);else if(b.NUMBER_HEX.test(a))d=parseInt(a.substring(2),16);else{if(!b.NUMBER_OCT.test(a))throw Error("illegal id value: "+(0>e?"-":"")+a);d=parseInt(a.substring(1),8);}if(d=0|e*d,!c&&0>d)throw Error("illegal id value: "+(0>e?"-":"")+a);return d}function i(a){var c=1;if("-"==a.charAt(0)&&(c=-1,a=a.substring(1)),b.NUMBER_DEC.test(a))return c*parseInt(a,10);if(b.NUMBER_HEX.test(a))return c*parseInt(a.substring(2),16);if(b.NUMBER_OCT.test(a))return c*parseInt(a.substring(1),8);if("inf"===a)return 1/0*c;if("nan"===a)return 0/0;if(b.NUMBER_FLT.test(a))return c*parseFloat(a);throw Error("illegal number value: "+(0>c?"-":"")+a)}function j(a,b,c){"undefined"==typeof a[b]?a[b]=c:(Array.isArray(a[b])||(a[b]=[a[b]]),a[b].push(c));}var f,g,c={},d=function(a){this.source=a+"",this.index=0,this.line=1,this.stack=[],this._stringOpen=null;},e=d.prototype;return e._readString=function(){var c,a='"'===this._stringOpen?b.STRING_DQ:b.STRING_SQ;if(a.lastIndex=this.index-1,c=a.exec(this.source),!c)throw Error("unterminated string");return this.index=a.lastIndex,this.stack.push(this._stringOpen),this._stringOpen=null,c[1]},e.next=function(){var a,c,d,e,f,g;if(this.stack.length>0)return this.stack.shift();if(this.index>=this.source.length)return null;if(null!==this._stringOpen)return this._readString();do{for(a=!1;b.WHITESPACE.test(d=this.source.charAt(this.index));)if("\n"===d&&++this.line,++this.index===this.source.length)return null;if("/"===this.source.charAt(this.index))if(++this.index,"/"===this.source.charAt(this.index)){for(;"\n"!==this.source.charAt(++this.index);)if(this.index==this.source.length)return null;++this.index,++this.line,a=!0;}else{if("*"!==(d=this.source.charAt(this.index)))return "/";do{if("\n"===d&&++this.line,++this.index===this.source.length)return null;c=d,d=this.source.charAt(this.index);}while("*"!==c||"/"!==d);++this.index,a=!0;}}while(a);if(this.index===this.source.length)return null;if(e=this.index,b.DELIM.lastIndex=0,f=b.DELIM.test(this.source.charAt(e++)),!f)for(;e<this.source.length&&!b.DELIM.test(this.source.charAt(e));)++e;return g=this.source.substring(this.index,this.index=e),('"'===g||"'"===g)&&(this._stringOpen=g),g},e.peek=function(){if(0===this.stack.length){var a=this.next();if(null===a)return null;this.stack.push(a);}return this.stack[0]},e.skip=function(a){var b=this.next();if(b!==a)throw Error("illegal '"+b+"', '"+a+"' expected")},e.omit=function(a){return this.peek()===a?(this.next(),!0):!1},e.toString=function(){return "Tokenizer ("+this.index+"/"+this.source.length+" at line "+this.line+")"},c.Tokenizer=d,f=function(a){this.tn=new d(a),this.proto3=!1;},g=f.prototype,g.parse=function(){var c,a={name:"[ROOT]","package":null,messages:[],enums:[],imports:[],options:{},services:[]},d=!0;try{for(;c=this.tn.next();)switch(c){case"package":if(!d||null!==a["package"])throw Error("unexpected 'package'");if(c=this.tn.next(),!b.TYPEREF.test(c))throw Error("illegal package name: "+c);this.tn.skip(";"),a["package"]=c;break;case"import":if(!d)throw Error("unexpected 'import'");c=this.tn.peek(),"public"===c&&this.tn.next(),c=this._readString(),this.tn.skip(";"),a.imports.push(c);break;case"syntax":if(!d)throw Error("unexpected 'syntax'");this.tn.skip("="),"proto3"===(a.syntax=this._readString())&&(this.proto3=!0),this.tn.skip(";");break;case"message":this._parseMessage(a,null),d=!1;break;case"enum":this._parseEnum(a),d=!1;break;case"option":this._parseOption(a);break;case"service":this._parseService(a);break;case"extend":this._parseExtend(a);break;default:throw Error("unexpected '"+c+"'")}}catch(e){throw e.message="Parse error at line "+this.tn.line+": "+e.message,e}return delete a.name,a},f.parse=function(a){return new f(a).parse()},g._readString=function(){var b,c,a="";do{if(c=this.tn.next(),"'"!==c&&'"'!==c)throw Error("illegal string delimiter: "+c);a+=this.tn.next(),this.tn.skip(c),b=this.tn.peek();}while('"'===b||'"'===b);return a},g._readValue=function(a){var c=this.tn.peek();if('"'===c||"'"===c)return this._readString();if(this.tn.next(),b.NUMBER.test(c))return i(c);if(b.BOOL.test(c))return "true"===c.toLowerCase();if(a&&b.TYPEREF.test(c))return c;throw Error("illegal value: "+c)},g._parseOption=function(a,c){var f,d=this.tn.next(),e=!1;if("("===d&&(e=!0,d=this.tn.next()),!b.TYPEREF.test(d))throw Error("illegal option name: "+d);f=d,e&&(this.tn.skip(")"),f="("+f+")",d=this.tn.peek(),b.FQTYPEREF.test(d)&&(f+=d,this.tn.next())),this.tn.skip("="),this._parseOptionValue(a,f),c||this.tn.skip(";");},g._parseOptionValue=function(a,c){var d=this.tn.peek();if("{"!==d)j(a.options,c,this._readValue(!0));else for(this.tn.skip("{");"}"!==(d=this.tn.next());){if(!b.NAME.test(d))throw Error("illegal option name: "+c+"."+d);this.tn.omit(":")?j(a.options,c+"."+d,this._readValue(!0)):this._parseOptionValue(a,c+"."+d);}},g._parseService=function(a){var d,e,c=this.tn.next();if(!b.NAME.test(c))throw Error("illegal service name at line "+this.tn.line+": "+c);for(d=c,e={name:d,rpc:{},options:{}},this.tn.skip("{");"}"!==(c=this.tn.next());)if("option"===c)this._parseOption(e);else{if("rpc"!==c)throw Error("illegal service token: "+c);this._parseServiceRPC(e);}this.tn.omit(";"),a.services.push(e);},g._parseServiceRPC=function(a){var e,f,c="rpc",d=this.tn.next();if(!b.NAME.test(d))throw Error("illegal rpc service method name: "+d);if(e=d,f={request:null,response:null,request_stream:!1,response_stream:!1,options:{}},this.tn.skip("("),d=this.tn.next(),"stream"===d.toLowerCase()&&(f.request_stream=!0,d=this.tn.next()),!b.TYPEREF.test(d))throw Error("illegal rpc service request type: "+d);if(f.request=d,this.tn.skip(")"),d=this.tn.next(),"returns"!==d.toLowerCase())throw Error("illegal rpc service request type delimiter: "+d);if(this.tn.skip("("),d=this.tn.next(),"stream"===d.toLowerCase()&&(f.response_stream=!0,d=this.tn.next()),f.response=d,this.tn.skip(")"),d=this.tn.peek(),"{"===d){for(this.tn.next();"}"!==(d=this.tn.next());){if("option"!==d)throw Error("illegal rpc service token: "+d);this._parseOption(f);}this.tn.omit(";");}else this.tn.skip(";");"undefined"==typeof a[c]&&(a[c]={}),a[c][e]=f;},g._parseMessage=function(a,c){var d=!!c,e=this.tn.next(),f={name:"",fields:[],enums:[],messages:[],options:{},services:[],oneofs:{}};if(!b.NAME.test(e))throw Error("illegal "+(d?"group":"message")+" name: "+e);for(f.name=e,d&&(this.tn.skip("="),c.id=h(this.tn.next()),f.isGroup=!0),e=this.tn.peek(),"["===e&&c&&this._parseFieldOptions(c),this.tn.skip("{");"}"!==(e=this.tn.next());)if(b.RULE.test(e))this._parseMessageField(f,e);else if("oneof"===e)this._parseMessageOneOf(f);else if("enum"===e)this._parseEnum(f);else if("message"===e)this._parseMessage(f);else if("option"===e)this._parseOption(f);else if("service"===e)this._parseService(f);else if("extensions"===e)f.extensions=this._parseExtensionRanges();else if("reserved"===e)this._parseIgnored();else if("extend"===e)this._parseExtend(f);else{if(!b.TYPEREF.test(e))throw Error("illegal message token: "+e);if(!this.proto3)throw Error("illegal field rule: "+e);this._parseMessageField(f,"optional",e);}return this.tn.omit(";"),a.messages.push(f),f},g._parseIgnored=function(){for(;";"!==this.tn.peek();)this.tn.next();this.tn.skip(";");},g._parseMessageField=function(a,c,d){var e,f,g;if(!b.RULE.test(c))throw Error("illegal message field rule: "+c);if(e={rule:c,type:"",name:"",options:{},id:0},"map"===c){if(d)throw Error("illegal type: "+d);if(this.tn.skip("<"),f=this.tn.next(),!b.TYPE.test(f)&&!b.TYPEREF.test(f))throw Error("illegal message field type: "+f);if(e.keytype=f,this.tn.skip(","),f=this.tn.next(),!b.TYPE.test(f)&&!b.TYPEREF.test(f))throw Error("illegal message field: "+f);if(e.type=f,this.tn.skip(">"),f=this.tn.next(),!b.NAME.test(f))throw Error("illegal message field name: "+f);e.name=f,this.tn.skip("="),e.id=h(this.tn.next()),f=this.tn.peek(),"["===f&&this._parseFieldOptions(e),this.tn.skip(";");}else if(d="undefined"!=typeof d?d:this.tn.next(),"group"===d){if(g=this._parseMessage(a,e),!/^[A-Z]/.test(g.name))throw Error("illegal group name: "+g.name);e.type=g.name,e.name=g.name.toLowerCase(),this.tn.omit(";");}else{if(!b.TYPE.test(d)&&!b.TYPEREF.test(d))throw Error("illegal message field type: "+d);if(e.type=d,f=this.tn.next(),!b.NAME.test(f))throw Error("illegal message field name: "+f);
  e.name=f,this.tn.skip("="),e.id=h(this.tn.next()),f=this.tn.peek(),"["===f&&this._parseFieldOptions(e),this.tn.skip(";");}return a.fields.push(e),e},g._parseMessageOneOf=function(a){var e,d,f,c=this.tn.next();if(!b.NAME.test(c))throw Error("illegal oneof name: "+c);for(d=c,f=[],this.tn.skip("{");"}"!==(c=this.tn.next());)e=this._parseMessageField(a,"optional",c),e.oneof=d,f.push(e.id);this.tn.omit(";"),a.oneofs[d]=f;},g._parseFieldOptions=function(a){this.tn.skip("[");for(var b,c=!0;"]"!==(b=this.tn.peek());)c||this.tn.skip(","),this._parseOption(a,!0),c=!1;this.tn.next();},g._parseEnum=function(a){var e,c={name:"",values:[],options:{}},d=this.tn.next();if(!b.NAME.test(d))throw Error("illegal name: "+d);for(c.name=d,this.tn.skip("{");"}"!==(d=this.tn.next());)if("option"===d)this._parseOption(c);else{if(!b.NAME.test(d))throw Error("illegal name: "+d);this.tn.skip("="),e={name:d,id:h(this.tn.next(),!0)},d=this.tn.peek(),"["===d&&this._parseFieldOptions({options:{}}),this.tn.skip(";"),c.values.push(e);}this.tn.omit(";"),a.enums.push(c);},g._parseExtensionRanges=function(){var c,d,e,b=[];do{for(d=[];;){switch(c=this.tn.next()){case"min":e=a.ID_MIN;break;case"max":e=a.ID_MAX;break;default:e=i(c);}if(d.push(e),2===d.length)break;if("to"!==this.tn.peek()){d.push(e);break}this.tn.next();}b.push(d);}while(this.tn.omit(","));return this.tn.skip(";"),b},g._parseExtend=function(a){var d,c=this.tn.next();if(!b.TYPEREF.test(c))throw Error("illegal extend reference: "+c);for(d={ref:c,fields:[]},this.tn.skip("{");"}"!==(c=this.tn.next());)if(b.RULE.test(c))this._parseMessageField(d,c);else{if(!b.TYPEREF.test(c))throw Error("illegal extend token: "+c);if(!this.proto3)throw Error("illegal field rule: "+c);this._parseMessageField(d,"optional",c);}return this.tn.omit(";"),a.messages.push(d),d},g.toString=function(){return "Parser at line "+this.tn.line},c.Parser=f,c}(e,e.Lang),e.Reflect=function(a){function k(b){if("string"==typeof b&&(b=a.TYPES[b]),"undefined"==typeof b.defaultValue)throw Error("default value for type "+b.name+" is not supported");return b==a.TYPES.bytes?new f(0):b.defaultValue}function l(b,c){if(b&&"number"==typeof b.low&&"number"==typeof b.high&&"boolean"==typeof b.unsigned&&b.low===b.low&&b.high===b.high)return new a.Long(b.low,b.high,"undefined"==typeof c?b.unsigned:c);if("string"==typeof b)return a.Long.fromString(b,c||!1,10);if("number"==typeof b)return a.Long.fromNumber(b,c||!1);throw Error("not convertible to Long")}function o(b,c){var d=c.readVarint32(),e=7&d,f=d>>>3;switch(e){case a.WIRE_TYPES.VARINT:do d=c.readUint8();while(128===(128&d));break;case a.WIRE_TYPES.BITS64:c.offset+=8;break;case a.WIRE_TYPES.LDELIM:d=c.readVarint32(),c.offset+=d;break;case a.WIRE_TYPES.STARTGROUP:o(f,c);break;case a.WIRE_TYPES.ENDGROUP:if(f===b)return !1;throw Error("Illegal GROUPEND after unknown group: "+f+" ("+b+" expected)");case a.WIRE_TYPES.BITS32:c.offset+=4;break;default:throw Error("Illegal wire type in unknown group "+b+": "+e)}return !0}var g,h,i,j,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,c={},d=function(a,b,c){this.builder=a,this.parent=b,this.name=c,this.className;},e=d.prototype;return e.fqn=function(){for(var a=this.name,b=this;;){if(b=b.parent,null==b)break;a=b.name+"."+a;}return a},e.toString=function(a){return (a?this.className+" ":"")+this.fqn()},e.build=function(){throw Error(this.toString(!0)+" cannot be built directly")},c.T=d,g=function(a,b,c,e,f){d.call(this,a,b,c),this.className="Namespace",this.children=[],this.options=e||{},this.syntax=f||"proto2";},h=g.prototype=Object.create(d.prototype),h.getChildren=function(a){var b,c,d;if(a=a||null,null==a)return this.children.slice();for(b=[],c=0,d=this.children.length;d>c;++c)this.children[c]instanceof a&&b.push(this.children[c]);return b},h.addChild=function(a){var b;if(b=this.getChild(a.name))if(b instanceof m.Field&&b.name!==b.originalName&&null===this.getChild(b.originalName))b.name=b.originalName;else{if(!(a instanceof m.Field&&a.name!==a.originalName&&null===this.getChild(a.originalName)))throw Error("Duplicate name in namespace "+this.toString(!0)+": "+a.name);a.name=a.originalName;}this.children.push(a);},h.getChild=function(a){var c,d,b="number"==typeof a?"id":"name";for(c=0,d=this.children.length;d>c;++c)if(this.children[c][b]===a)return this.children[c];return null},h.resolve=function(a,b){var g,d="string"==typeof a?a.split("."):a,e=this,f=0;if(""===d[f]){for(;null!==e.parent;)e=e.parent;f++;}do{do{if(!(e instanceof c.Namespace)){e=null;break}if(g=e.getChild(d[f]),!(g&&g instanceof c.T&&(!b||g instanceof c.Namespace))){e=null;break}e=g,f++;}while(f<d.length);if(null!=e)break;if(null!==this.parent)return this.parent.resolve(a,b)}while(null!=e);return e},h.qn=function(a){var e,f,b=[],d=a;do b.unshift(d.name),d=d.parent;while(null!==d);for(e=1;e<=b.length;e++)if(f=b.slice(b.length-e),a===this.resolve(f,a instanceof c.Namespace))return f.join(".");return a.fqn()},h.build=function(){var e,c,d,a={},b=this.children;for(c=0,d=b.length;d>c;++c)e=b[c],e instanceof g&&(a[e.name]=e.build());return Object.defineProperty&&Object.defineProperty(a,"$options",{value:this.buildOpt()}),a},h.buildOpt=function(){var c,d,e,f,a={},b=Object.keys(this.options);for(c=0,d=b.length;d>c;++c)e=b[c],f=this.options[b[c]],a[e]=f;return a},h.getOption=function(a){return "undefined"==typeof a?this.options:"undefined"!=typeof this.options[a]?this.options[a]:null},c.Namespace=g,i=function(b,c,d,e){if(this.type=b,this.resolvedType=c,this.isMapKey=d,this.syntax=e,d&&a.MAP_KEY_TYPES.indexOf(b)<0)throw Error("Invalid map key type: "+b.name)},j=i.prototype,i.defaultFieldValue=k,j.verifyValue=function(c){var f,g,h,d=function(a,b){throw Error("Illegal value for "+this.toString(!0)+" of type "+this.type.name+": "+a+" ("+b+")")}.bind(this);switch(this.type){case a.TYPES.int32:case a.TYPES.sint32:case a.TYPES.sfixed32:return ("number"!=typeof c||c===c&&0!==c%1)&&d(typeof c,"not an integer"),c>4294967295?0|c:c;case a.TYPES.uint32:case a.TYPES.fixed32:return ("number"!=typeof c||c===c&&0!==c%1)&&d(typeof c,"not an integer"),0>c?c>>>0:c;case a.TYPES.int64:case a.TYPES.sint64:case a.TYPES.sfixed64:if(a.Long)try{return l(c,!1)}catch(e){d(typeof c,e.message);}else d(typeof c,"requires Long.js");case a.TYPES.uint64:case a.TYPES.fixed64:if(a.Long)try{return l(c,!0)}catch(e){d(typeof c,e.message);}else d(typeof c,"requires Long.js");case a.TYPES.bool:return "boolean"!=typeof c&&d(typeof c,"not a boolean"),c;case a.TYPES["float"]:case a.TYPES["double"]:return "number"!=typeof c&&d(typeof c,"not a number"),c;case a.TYPES.string:return "string"==typeof c||c&&c instanceof String||d(typeof c,"not a string"),""+c;case a.TYPES.bytes:return b.isByteBuffer(c)?c:b.wrap(c);case a.TYPES["enum"]:for(f=this.resolvedType.getChildren(a.Reflect.Enum.Value),h=0;h<f.length;h++){if(f[h].name==c)return f[h].id;if(f[h].id==c)return f[h].id}if("proto3"===this.syntax)return ("number"!=typeof c||c===c&&0!==c%1)&&d(typeof c,"not an integer"),(c>4294967295||0>c)&&d(typeof c,"not in range for uint32"),c;d(c,"not a valid enum value");case a.TYPES.group:case a.TYPES.message:if(c&&"object"==typeof c||d(typeof c,"object expected"),c instanceof this.resolvedType.clazz)return c;if(c instanceof a.Builder.Message){g={};for(h in c)c.hasOwnProperty(h)&&(g[h]=c[h]);c=g;}return new this.resolvedType.clazz(c)}throw Error("[INTERNAL] Illegal value for "+this.toString(!0)+": "+c+" (undefined type "+this.type+")")},j.calculateLength=function(b,c){if(null===c)return 0;var d;switch(this.type){case a.TYPES.int32:return 0>c?f.calculateVarint64(c):f.calculateVarint32(c);case a.TYPES.uint32:return f.calculateVarint32(c);case a.TYPES.sint32:return f.calculateVarint32(f.zigZagEncode32(c));case a.TYPES.fixed32:case a.TYPES.sfixed32:case a.TYPES["float"]:return 4;case a.TYPES.int64:case a.TYPES.uint64:return f.calculateVarint64(c);case a.TYPES.sint64:return f.calculateVarint64(f.zigZagEncode64(c));case a.TYPES.fixed64:case a.TYPES.sfixed64:return 8;case a.TYPES.bool:return 1;case a.TYPES["enum"]:return f.calculateVarint32(c);case a.TYPES["double"]:return 8;case a.TYPES.string:return d=f.calculateUTF8Bytes(c),f.calculateVarint32(d)+d;case a.TYPES.bytes:if(c.remaining()<0)throw Error("Illegal value for "+this.toString(!0)+": "+c.remaining()+" bytes remaining");return f.calculateVarint32(c.remaining())+c.remaining();case a.TYPES.message:return d=this.resolvedType.calculate(c),f.calculateVarint32(d)+d;case a.TYPES.group:return d=this.resolvedType.calculate(c),d+f.calculateVarint32(b<<3|a.WIRE_TYPES.ENDGROUP)}throw Error("[INTERNAL] Illegal value to encode in "+this.toString(!0)+": "+c+" (unknown type)")},j.encodeValue=function(b,c,d){var e,g;if(null===c)return d;switch(this.type){case a.TYPES.int32:0>c?d.writeVarint64(c):d.writeVarint32(c);break;case a.TYPES.uint32:d.writeVarint32(c);break;case a.TYPES.sint32:d.writeVarint32ZigZag(c);break;case a.TYPES.fixed32:d.writeUint32(c);break;case a.TYPES.sfixed32:d.writeInt32(c);break;case a.TYPES.int64:case a.TYPES.uint64:d.writeVarint64(c);break;case a.TYPES.sint64:d.writeVarint64ZigZag(c);break;case a.TYPES.fixed64:d.writeUint64(c);break;case a.TYPES.sfixed64:d.writeInt64(c);break;case a.TYPES.bool:"string"==typeof c?d.writeVarint32("false"===c.toLowerCase()?0:!!c):d.writeVarint32(c?1:0);break;case a.TYPES["enum"]:d.writeVarint32(c);break;case a.TYPES["float"]:d.writeFloat32(c);break;case a.TYPES["double"]:d.writeFloat64(c);break;case a.TYPES.string:d.writeVString(c);break;case a.TYPES.bytes:if(c.remaining()<0)throw Error("Illegal value for "+this.toString(!0)+": "+c.remaining()+" bytes remaining");e=c.offset,d.writeVarint32(c.remaining()),d.append(c),c.offset=e;break;case a.TYPES.message:g=(new f).LE(),this.resolvedType.encode(c,g),d.writeVarint32(g.offset),d.append(g.flip());break;case a.TYPES.group:this.resolvedType.encode(c,d),d.writeVarint32(b<<3|a.WIRE_TYPES.ENDGROUP);break;default:throw Error("[INTERNAL] Illegal value to encode in "+this.toString(!0)+": "+c+" (unknown type)")}return d},j.decode=function(b,c,d){if(c!=this.type.wireType)throw Error("Unexpected wire type for element");var e,f;switch(this.type){case a.TYPES.int32:return 0|b.readVarint32();case a.TYPES.uint32:return b.readVarint32()>>>0;case a.TYPES.sint32:return 0|b.readVarint32ZigZag();case a.TYPES.fixed32:return b.readUint32()>>>0;case a.TYPES.sfixed32:return 0|b.readInt32();case a.TYPES.int64:return b.readVarint64();case a.TYPES.uint64:return b.readVarint64().toUnsigned();case a.TYPES.sint64:return b.readVarint64ZigZag();case a.TYPES.fixed64:return b.readUint64();case a.TYPES.sfixed64:return b.readInt64();case a.TYPES.bool:return !!b.readVarint32();case a.TYPES["enum"]:return b.readVarint32();case a.TYPES["float"]:return b.readFloat();case a.TYPES["double"]:return b.readDouble();case a.TYPES.string:return b.readVString();case a.TYPES.bytes:if(f=b.readVarint32(),b.remaining()<f)throw Error("Illegal number of bytes for "+this.toString(!0)+": "+f+" required but got only "+b.remaining());return e=b.clone(),e.limit=e.offset+f,b.offset+=f,e;case a.TYPES.message:return f=b.readVarint32(),this.resolvedType.decode(b,f);case a.TYPES.group:return this.resolvedType.decode(b,-1,d)}throw Error("[INTERNAL] Illegal decode type")},j.valueFromString=function(b){if(!this.isMapKey)throw Error("valueFromString() called on non-map-key element");switch(this.type){case a.TYPES.int32:case a.TYPES.sint32:case a.TYPES.sfixed32:case a.TYPES.uint32:case a.TYPES.fixed32:return this.verifyValue(parseInt(b));case a.TYPES.int64:case a.TYPES.sint64:case a.TYPES.sfixed64:case a.TYPES.uint64:case a.TYPES.fixed64:return this.verifyValue(b);case a.TYPES.bool:return "true"===b;case a.TYPES.string:return this.verifyValue(b);case a.TYPES.bytes:return f.fromBinary(b)}},j.valueToString=function(b){if(!this.isMapKey)throw Error("valueToString() called on non-map-key element");return this.type===a.TYPES.bytes?b.toString("binary"):b.toString()},c.Element=i,m=function(a,b,c,d,e,f){g.call(this,a,b,c,d,f),this.className="Message",this.extensions=void 0,this.clazz=null,this.isGroup=!!e,this._fields=null,this._fieldsById=null,this._fieldsByName=null;},n=m.prototype=Object.create(g.prototype),n.build=function(c){var d,h,e,g;if(this.clazz&&!c)return this.clazz;for(d=function(a,c){function k(b,c,d,e){var g,h,i,j,l,m,n;if(null===b||"object"!=typeof b)return e&&e instanceof a.Reflect.Enum&&(g=a.Reflect.Enum.getName(e.object,b),null!==g)?g:b;if(f.isByteBuffer(b))return c?b.toBase64():b.toBuffer();if(a.Long.isLong(b))return d?b.toString():a.Long.fromValue(b);if(Array.isArray(b))return h=[],b.forEach(function(a,b){h[b]=k(a,c,d,e);}),h;if(h={},b instanceof a.Map){for(i=b.entries(),j=i.next();!j.done;j=i.next())h[b.keyElem.valueToString(j.value[0])]=k(j.value[1],c,d,b.valueElem.resolvedType);return h}l=b.$type,m=void 0;for(n in b)b.hasOwnProperty(n)&&(h[n]=l&&(m=l.getChild(n))?k(b[n],c,d,m.resolvedType):k(b[n],c,d));return h}var i,j,d=c.getChildren(a.Reflect.Message.Field),e=c.getChildren(a.Reflect.Message.OneOf),g=function(b){var i,j,k,l;for(a.Builder.Message.call(this),i=0,j=e.length;j>i;++i)this[e[i].name]=null;for(i=0,j=d.length;j>i;++i)k=d[i],this[k.name]=k.repeated?[]:k.map?new a.Map(k):null,!k.required&&"proto3"!==c.syntax||null===k.defaultValue||(this[k.name]=k.defaultValue);if(arguments.length>0)if(1!==arguments.length||null===b||"object"!=typeof b||!("function"!=typeof b.encode||b instanceof g)||Array.isArray(b)||b instanceof a.Map||f.isByteBuffer(b)||b instanceof ArrayBuffer||a.Long&&b instanceof a.Long)for(i=0,j=arguments.length;j>i;++i)"undefined"!=typeof(l=arguments[i])&&this.$set(d[i].name,l);else this.$set(b);},h=g.prototype=Object.create(a.Builder.Message.prototype);for(h.add=function(b,d,e){var f=c._fieldsByName[b];if(!e){if(!f)throw Error(this+"#"+b+" is undefined");if(!(f instanceof a.Reflect.Message.Field))throw Error(this+"#"+b+" is not a field: "+f.toString(!0));if(!f.repeated)throw Error(this+"#"+b+" is not a repeated field");d=f.verifyValue(d,!0);}return null===this[b]&&(this[b]=[]),this[b].push(d),this},h.$add=h.add,h.set=function(b,d,e){var f,g,h;if(b&&"object"==typeof b){e=d;for(f in b)b.hasOwnProperty(f)&&"undefined"!=typeof(d=b[f])&&this.$set(f,d,e);return this}if(g=c._fieldsByName[b],e)this[b]=d;else{if(!g)throw Error(this+"#"+b+" is not a field: undefined");if(!(g instanceof a.Reflect.Message.Field))throw Error(this+"#"+b+" is not a field: "+g.toString(!0));this[g.name]=d=g.verifyValue(d);}return g&&g.oneof&&(h=this[g.oneof.name],null!==d?(null!==h&&h!==g.name&&(this[h]=null),this[g.oneof.name]=g.name):h===b&&(this[g.oneof.name]=null)),this},h.$set=h.set,h.get=function(b,d){if(d)return this[b];var e=c._fieldsByName[b];if(!(e&&e instanceof a.Reflect.Message.Field))throw Error(this+"#"+b+" is not a field: undefined");if(!(e instanceof a.Reflect.Message.Field))throw Error(this+"#"+b+" is not a field: "+e.toString(!0));return this[e.name]},h.$get=h.get,i=0;i<d.length;i++)j=d[i],j instanceof a.Reflect.Message.ExtensionField||c.builder.options.populateAccessors&&function(a){var d,e,f,b=a.originalName.replace(/(_[a-zA-Z])/g,function(a){return a.toUpperCase().replace("_","")});b=b.substring(0,1).toUpperCase()+b.substring(1),d=a.originalName.replace(/([A-Z])/g,function(a){return "_"+a}),e=function(b,c){return this[a.name]=c?b:a.verifyValue(b),this},f=function(){return this[a.name]},null===c.getChild("set"+b)&&(h["set"+b]=e),null===c.getChild("set_"+d)&&(h["set_"+d]=e),null===c.getChild("get"+b)&&(h["get"+b]=f),null===c.getChild("get_"+d)&&(h["get_"+d]=f);}(j);return h.encode=function(a,d){var e,f;"boolean"==typeof a&&(d=a,a=void 0),e=!1,a||(a=new b,e=!0),f=a.littleEndian;try{return c.encode(this,a.LE(),d),(e?a.flip():a).LE(f)}catch(g){throw a.LE(f),g}},g.encode=function(a,b,c){return new g(a).encode(b,c)},h.calculate=function(){return c.calculate(this)},h.encodeDelimited=function(a){var d,b=!1;return a||(a=new f,b=!0),d=(new f).LE(),c.encode(this,d).flip(),a.writeVarint32(d.remaining()),a.append(d),b?a.flip():a},h.encodeAB=function(){try{return this.encode().toArrayBuffer()}catch(a){throw a.encoded&&(a.encoded=a.encoded.toArrayBuffer()),a}},h.toArrayBuffer=h.encodeAB,h.encodeNB=function(){try{return this.encode().toBuffer()}catch(a){throw a.encoded&&(a.encoded=a.encoded.toBuffer()),a}},h.toBuffer=h.encodeNB,h.encode64=function(){try{return this.encode().toBase64()}catch(a){throw a.encoded&&(a.encoded=a.encoded.toBase64()),a}},h.toBase64=h.encode64,h.encodeHex=function(){try{return this.encode().toHex()}catch(a){throw a.encoded&&(a.encoded=a.encoded.toHex()),a}},h.toHex=h.encodeHex,h.toRaw=function(a,b){return k(this,!!a,!!b,this.$type)},h.encodeJSON=function(){return JSON.stringify(k(this,!0,!0,this.$type))},g.decode=function(a,b){var d,e;"string"==typeof a&&(a=f.wrap(a,b?b:"base64")),a=f.isByteBuffer(a)?a:f.wrap(a),d=a.littleEndian;try{return e=c.decode(a.LE()),a.LE(d),e}catch(g){throw a.LE(d),g}},g.decodeDelimited=function(a,b){var d,e,g;if("string"==typeof a&&(a=f.wrap(a,b?b:"base64")),a=f.isByteBuffer(a)?a:f.wrap(a),a.remaining()<1)return null;if(d=a.offset,e=a.readVarint32(),a.remaining()<e)return a.offset=d,null;try{return g=c.decode(a.slice(a.offset,a.offset+e).LE()),a.offset+=e,g}catch(h){throw a.offset+=e,h}},g.decode64=function(a){return g.decode(a,"base64")},g.decodeHex=function(a){return g.decode(a,"hex")},g.decodeJSON=function(a){return new g(JSON.parse(a))},h.toString=function(){return c.toString()},Object.defineProperty&&(Object.defineProperty(g,"$options",{value:c.buildOpt()}),Object.defineProperty(h,"$options",{value:g["$options"]}),Object.defineProperty(g,"$type",{value:c}),Object.defineProperty(h,"$type",{value:c})),g}(a,this),this._fields=[],this._fieldsById={},this._fieldsByName={},e=0,g=this.children.length;g>e;e++)if(h=this.children[e],h instanceof t||h instanceof m||h instanceof x){if(d.hasOwnProperty(h.name))throw Error("Illegal reflect child of "+this.toString(!0)+": "+h.toString(!0)+" cannot override static property '"+h.name+"'");d[h.name]=h.build();}else if(h instanceof m.Field)h.build(),this._fields.push(h),this._fieldsById[h.id]=h,this._fieldsByName[h.name]=h;else if(!(h instanceof m.OneOf||h instanceof w))throw Error("Illegal reflect child of "+this.toString(!0)+": "+this.children[e].toString(!0));return this.clazz=d},n.encode=function(a,b,c){var e,h,f,g,i,d=null;for(f=0,g=this._fields.length;g>f;++f)e=this._fields[f],h=a[e.name],e.required&&null===h?null===d&&(d=e):e.encode(c?h:e.verifyValue(h),b,a);if(null!==d)throw i=Error("Missing at least one required field for "+this.toString(!0)+": "+d),i.encoded=b,i;return b},n.calculate=function(a){for(var e,f,b=0,c=0,d=this._fields.length;d>c;++c){if(e=this._fields[c],f=a[e.name],e.required&&null===f)throw Error("Missing at least one required field for "+this.toString(!0)+": "+e);b+=e.calculate(f,a);}return b},n.decode=function(b,c,d){var g,h,i,j,e,f,k,l,m,n,p,q;for(c="number"==typeof c?c:-1,e=b.offset,f=new this.clazz;b.offset<e+c||-1===c&&b.remaining()>0;){if(g=b.readVarint32(),h=7&g,i=g>>>3,h===a.WIRE_TYPES.ENDGROUP){if(i!==d)throw Error("Illegal group end indicator for "+this.toString(!0)+": "+i+" ("+(d?d+" expected":"not a group")+")");break}if(j=this._fieldsById[i])j.repeated&&!j.options.packed?f[j.name].push(j.decode(h,b)):j.map?(l=j.decode(h,b),f[j.name].set(l[0],l[1])):(f[j.name]=j.decode(h,b),j.oneof&&(m=f[j.oneof.name],null!==m&&m!==j.name&&(f[m]=null),f[j.oneof.name]=j.name));else switch(h){case a.WIRE_TYPES.VARINT:b.readVarint32();break;case a.WIRE_TYPES.BITS32:b.offset+=4;break;case a.WIRE_TYPES.BITS64:b.offset+=8;break;case a.WIRE_TYPES.LDELIM:k=b.readVarint32(),b.offset+=k;break;case a.WIRE_TYPES.STARTGROUP:for(;o(i,b););break;default:throw Error("Illegal wire type for unknown field "+i+" in "+this.toString(!0)+"#decode: "+h)}}for(n=0,p=this._fields.length;p>n;++n)if(j=this._fields[n],null===f[j.name])if("proto3"===this.syntax)f[j.name]=j.defaultValue;else{if(j.required)throw q=Error("Missing at least one required field for "+this.toString(!0)+": "+j.name),q.decoded=f,q;a.populateDefaults&&null!==j.defaultValue&&(f[j.name]=j.defaultValue);}return f},c.Message=m,p=function(b,c,e,f,g,h,i,j,k,l){d.call(this,b,c,h),this.className="Message.Field",this.required="required"===e,this.repeated="repeated"===e,this.map="map"===e,this.keyType=f||null,this.type=g,this.resolvedType=null,this.id=i,this.options=j||{},this.defaultValue=null,this.oneof=k||null,this.syntax=l||"proto2",this.originalName=this.name,this.element=null,this.keyElement=null,!this.builder.options.convertFieldsToCamelCase||this instanceof m.ExtensionField||(this.name=a.Util.toCamelCase(this.name));},q=p.prototype=Object.create(d.prototype),q.build=function(){this.element=new i(this.type,this.resolvedType,!1,this.syntax),this.map&&(this.keyElement=new i(this.keyType,void 0,!0,this.syntax)),"proto3"!==this.syntax||this.repeated||this.map?"undefined"!=typeof this.options["default"]&&(this.defaultValue=this.verifyValue(this.options["default"])):this.defaultValue=i.defaultFieldValue(this.type);},q.verifyValue=function(b,c){var d,e,f;if(c=c||!1,d=function(a,b){throw Error("Illegal value for "+this.toString(!0)+" of type "+this.type.name+": "+a+" ("+b+")")}.bind(this),null===b)return this.required&&d(typeof b,"required"),"proto3"===this.syntax&&this.type!==a.TYPES.message&&d(typeof b,"proto3 field without field presence cannot be null"),null;if(this.repeated&&!c){for(Array.isArray(b)||(b=[b]),f=[],e=0;e<b.length;e++)f.push(this.element.verifyValue(b[e]));return f}return this.map&&!c?b instanceof a.Map?b:(b instanceof Object||d(typeof b,"expected ProtoBuf.Map or raw object for map field"),new a.Map(this,b)):(!this.repeated&&Array.isArray(b)&&d(typeof b,"no array expected"),this.element.verifyValue(b))},q.hasWirePresence=function(b,c){if("proto3"!==this.syntax)return null!==b;if(this.oneof&&c[this.oneof.name]===this.name)return !0;switch(this.type){case a.TYPES.int32:case a.TYPES.sint32:case a.TYPES.sfixed32:case a.TYPES.uint32:case a.TYPES.fixed32:return 0!==b;case a.TYPES.int64:case a.TYPES.sint64:case a.TYPES.sfixed64:case a.TYPES.uint64:case a.TYPES.fixed64:return 0!==b.low||0!==b.high;case a.TYPES.bool:return b;case a.TYPES["float"]:case a.TYPES["double"]:return 0!==b;case a.TYPES.string:return b.length>0;case a.TYPES.bytes:return b.remaining()>0;case a.TYPES["enum"]:return 0!==b;case a.TYPES.message:return null!==b;default:return !0}},q.encode=function(b,c,d){var e,g,h,i,j;if(null===this.type||"object"!=typeof this.type)throw Error("[INTERNAL] Unresolved type in "+this.toString(!0)+": "+this.type);if(null===b||this.repeated&&0==b.length)return c;try{if(this.repeated)if(this.options.packed&&a.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)>=0){for(c.writeVarint32(this.id<<3|a.WIRE_TYPES.LDELIM),c.ensureCapacity(c.offset+=1),g=c.offset,e=0;e<b.length;e++)this.element.encodeValue(this.id,b[e],c);h=c.offset-g,i=f.calculateVarint32(h),i>1&&(j=c.slice(g,c.offset),g+=i-1,c.offset=g,c.append(j)),c.writeVarint32(h,g-i);}else for(e=0;e<b.length;e++)c.writeVarint32(this.id<<3|this.type.wireType),this.element.encodeValue(this.id,b[e],c);else this.map?b.forEach(function(b,d){var g=f.calculateVarint32(8|this.keyType.wireType)+this.keyElement.calculateLength(1,d)+f.calculateVarint32(16|this.type.wireType)+this.element.calculateLength(2,b);c.writeVarint32(this.id<<3|a.WIRE_TYPES.LDELIM),c.writeVarint32(g),c.writeVarint32(8|this.keyType.wireType),this.keyElement.encodeValue(1,d,c),c.writeVarint32(16|this.type.wireType),this.element.encodeValue(2,b,c);},this):this.hasWirePresence(b,d)&&(c.writeVarint32(this.id<<3|this.type.wireType),this.element.encodeValue(this.id,b,c));}catch(k){throw Error("Illegal value for "+this.toString(!0)+": "+b+" ("+k+")")}return c},q.calculate=function(b,c){var d,e,g;if(b=this.verifyValue(b),null===this.type||"object"!=typeof this.type)throw Error("[INTERNAL] Unresolved type in "+this.toString(!0)+": "+this.type);if(null===b||this.repeated&&0==b.length)return 0;d=0;try{if(this.repeated)if(this.options.packed&&a.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)>=0){for(d+=f.calculateVarint32(this.id<<3|a.WIRE_TYPES.LDELIM),g=0,e=0;e<b.length;e++)g+=this.element.calculateLength(this.id,b[e]);d+=f.calculateVarint32(g),d+=g;}else for(e=0;e<b.length;e++)d+=f.calculateVarint32(this.id<<3|this.type.wireType),d+=this.element.calculateLength(this.id,b[e]);else this.map?b.forEach(function(b,c){var g=f.calculateVarint32(8|this.keyType.wireType)+this.keyElement.calculateLength(1,c)+f.calculateVarint32(16|this.type.wireType)+this.element.calculateLength(2,b);d+=f.calculateVarint32(this.id<<3|a.WIRE_TYPES.LDELIM),d+=f.calculateVarint32(g),d+=g;},this):this.hasWirePresence(b,c)&&(d+=f.calculateVarint32(this.id<<3|this.type.wireType),d+=this.element.calculateLength(this.id,b));}catch(h){throw Error("Illegal value for "+this.toString(!0)+": "+b+" ("+h+")")}return d},q.decode=function(b,c,d){var e,f,h,j,k,l,m,g=!this.map&&b==this.type.wireType||!d&&this.repeated&&this.options.packed&&b==a.WIRE_TYPES.LDELIM||this.map&&b==a.WIRE_TYPES.LDELIM;if(!g)throw Error("Illegal wire type for field "+this.toString(!0)+": "+b+" ("+this.type.wireType+" expected)");if(b==a.WIRE_TYPES.LDELIM&&this.repeated&&this.options.packed&&a.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)>=0&&!d){for(f=c.readVarint32(),f=c.offset+f,h=[];c.offset<f;)h.push(this.decode(this.type.wireType,c,!0));return h}if(this.map){if(j=i.defaultFieldValue(this.keyType),e=i.defaultFieldValue(this.type),f=c.readVarint32(),c.remaining()<f)throw Error("Illegal number of bytes for "+this.toString(!0)+": "+f+" required but got only "+c.remaining());for(k=c.clone(),k.limit=k.offset+f,c.offset+=f;k.remaining()>0;)if(l=k.readVarint32(),b=7&l,m=l>>>3,1===m)j=this.keyElement.decode(k,b,m);else{if(2!==m)throw Error("Unexpected tag in map field key/value submessage");e=this.element.decode(k,b,m);}return [j,e]}return this.element.decode(c,b,this.id)},c.Message.Field=p,r=function(a,b,c,d,e,f,g){p.call(this,a,b,c,null,d,e,f,g),this.extension;},r.prototype=Object.create(p.prototype),c.Message.ExtensionField=r,s=function(a,b,c){d.call(this,a,b,c),this.fields=[];},c.Message.OneOf=s,t=function(a,b,c,d,e){g.call(this,a,b,c,d,e),this.className="Enum",this.object=null;},t.getName=function(a,b){var e,d,c=Object.keys(a);for(d=0;d<c.length;++d)if(a[e=c[d]]===b)return e;return null},u=t.prototype=Object.create(g.prototype),u.build=function(b){var c,d,e,f;if(this.object&&!b)return this.object;for(c=new a.Builder.Enum,d=this.getChildren(t.Value),e=0,f=d.length;f>e;++e)c[d[e]["name"]]=d[e]["id"];return Object.defineProperty&&Object.defineProperty(c,"$options",{value:this.buildOpt(),enumerable:!1}),this.object=c},c.Enum=t,v=function(a,b,c,e){d.call(this,a,b,c),this.className="Enum.Value",this.id=e;},v.prototype=Object.create(d.prototype),c.Enum.Value=v,w=function(a,b,c,e){d.call(this,a,b,c),this.field=e;},w.prototype=Object.create(d.prototype),c.Extension=w,x=function(a,b,c,d){g.call(this,a,b,c,d),this.className="Service",this.clazz=null;},y=x.prototype=Object.create(g.prototype),y.build=function(b){return this.clazz&&!b?this.clazz:this.clazz=function(a,b){var g,c=function(b){a.Builder.Service.call(this),this.rpcImpl=b||function(a,b,c){setTimeout(c.bind(this,Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")),0);};},d=c.prototype=Object.create(a.Builder.Service.prototype),e=b.getChildren(a.Reflect.Service.RPCMethod);for(g=0;g<e.length;g++)!function(a){d[a.name]=function(c,d){try{try{c=a.resolvedRequestType.clazz.decode(f.wrap(c));}catch(e){if(!(e instanceof TypeError))throw e}if(null===c||"object"!=typeof c)throw Error("Illegal arguments");c instanceof a.resolvedRequestType.clazz||(c=new a.resolvedRequestType.clazz(c)),this.rpcImpl(a.fqn(),c,function(c,e){if(c)return d(c),void 0;try{e=a.resolvedResponseType.clazz.decode(e);}catch(f){}return e&&e instanceof a.resolvedResponseType.clazz?(d(null,e),void 0):(d(Error("Illegal response type received in service method "+b.name+"#"+a.name)),void 0)});}catch(e){setTimeout(d.bind(this,e),0);}},c[a.name]=function(b,d,e){new c(b)[a.name](d,e);},Object.defineProperty&&(Object.defineProperty(c[a.name],"$options",{value:a.buildOpt()}),Object.defineProperty(d[a.name],"$options",{value:c[a.name]["$options"]}));}(e[g]);return Object.defineProperty&&(Object.defineProperty(c,"$options",{value:b.buildOpt()}),Object.defineProperty(d,"$options",{value:c["$options"]}),Object.defineProperty(c,"$type",{value:b}),Object.defineProperty(d,"$type",{value:b})),c}(a,this)},c.Service=x,z=function(a,b,c,e){d.call(this,a,b,c),this.className="Service.Method",this.options=e||{};},A=z.prototype=Object.create(d.prototype),A.buildOpt=h.buildOpt,c.Service.Method=z,B=function(a,b,c,d,e,f,g,h){z.call(this,a,b,c,h),this.className="Service.RPCMethod",this.requestName=d,this.responseName=e,this.requestStream=f,this.responseStream=g,this.resolvedRequestType=null,this.resolvedResponseType=null;},B.prototype=Object.create(z.prototype),c.Service.RPCMethod=B,c}(e),e.Builder=function(a,b,c){function f(a){a.messages&&a.messages.forEach(function(b){b.syntax=a.syntax,f(b);}),a.enums&&a.enums.forEach(function(b){b.syntax=a.syntax;});}var d=function(a){this.ns=new c.Namespace(this,null,""),this.ptr=this.ns,this.resolved=!1,this.result=null,this.files={},this.importRoot=null,this.options=a||{};},e=d.prototype;return d.isMessage=function(a){return "string"!=typeof a.name?!1:"undefined"!=typeof a.values||"undefined"!=typeof a.rpc?!1:!0},d.isMessageField=function(a){return "string"!=typeof a.rule||"string"!=typeof a.name||"string"!=typeof a.type||"undefined"==typeof a.id?!1:!0},d.isEnum=function(a){return "string"!=typeof a.name?!1:"undefined"!=typeof a.values&&Array.isArray(a.values)&&0!==a.values.length?!0:!1},d.isService=function(a){return "string"==typeof a.name&&"object"==typeof a.rpc&&a.rpc?!0:!1},d.isExtend=function(a){return "string"!=typeof a.ref?!1:!0},e.reset=function(){return this.ptr=this.ns,this},e.define=function(a){if("string"!=typeof a||!b.TYPEREF.test(a))throw Error("illegal namespace: "+a);return a.split(".").forEach(function(a){var b=this.ptr.getChild(a);null===b&&this.ptr.addChild(b=new c.Namespace(this,this.ptr,a)),this.ptr=b;},this),this},e.create=function(b){var e,f,g,h,i;if(!b)return this;if(Array.isArray(b)){if(0===b.length)return this;b=b.slice();}else b=[b];for(e=[b];e.length>0;){if(b=e.pop(),!Array.isArray(b))throw Error("not a valid namespace: "+JSON.stringify(b));for(;b.length>0;){if(f=b.shift(),d.isMessage(f)){if(g=new c.Message(this,this.ptr,f.name,f.options,f.isGroup,f.syntax),h={},f.oneofs&&Object.keys(f.oneofs).forEach(function(a){g.addChild(h[a]=new c.Message.OneOf(this,g,a));},this),f.fields&&f.fields.forEach(function(a){if(null!==g.getChild(0|a.id))throw Error("duplicate or invalid field id in "+g.name+": "+a.id);if(a.options&&"object"!=typeof a.options)throw Error("illegal field options in "+g.name+"#"+a.name);var b=null;if("string"==typeof a.oneof&&!(b=h[a.oneof]))throw Error("illegal oneof in "+g.name+"#"+a.name+": "+a.oneof);a=new c.Message.Field(this,g,a.rule,a.keytype,a.type,a.name,a.id,a.options,b,f.syntax),b&&b.fields.push(a),g.addChild(a);},this),i=[],f.enums&&f.enums.forEach(function(a){i.push(a);}),f.messages&&f.messages.forEach(function(a){i.push(a);}),f.services&&f.services.forEach(function(a){i.push(a);}),f.extensions&&(g.extensions="number"==typeof f.extensions[0]?[f.extensions]:f.extensions),this.ptr.addChild(g),i.length>0){e.push(b),b=i,i=null,this.ptr=g,g=null;continue}i=null;}else if(d.isEnum(f))g=new c.Enum(this,this.ptr,f.name,f.options,f.syntax),f.values.forEach(function(a){g.addChild(new c.Enum.Value(this,g,a.name,a.id));},this),this.ptr.addChild(g);else if(d.isService(f))g=new c.Service(this,this.ptr,f.name,f.options),Object.keys(f.rpc).forEach(function(a){var b=f.rpc[a];g.addChild(new c.Service.RPCMethod(this,g,a,b.request,b.response,!!b.request_stream,!!b.response_stream,b.options));},this),this.ptr.addChild(g);else{if(!d.isExtend(f))throw Error("not a valid definition: "+JSON.stringify(f));if(g=this.ptr.resolve(f.ref,!0))f.fields.forEach(function(b){var d,e,f,h;if(null!==g.getChild(0|b.id))throw Error("duplicate extended field id in "+g.name+": "+b.id);
  if(g.extensions&&(d=!1,g.extensions.forEach(function(a){b.id>=a[0]&&b.id<=a[1]&&(d=!0);}),!d))throw Error("illegal extended field id in "+g.name+": "+b.id+" (not within valid ranges)");e=b.name,this.options.convertFieldsToCamelCase&&(e=a.Util.toCamelCase(e)),f=new c.Message.ExtensionField(this,g,b.rule,b.type,this.ptr.fqn()+"."+e,b.id,b.options),h=new c.Extension(this,this.ptr,b.name,f),f.extension=h,this.ptr.addChild(h),g.addChild(f);},this);else if(!/\.?google\.protobuf\./.test(f.ref))throw Error("extended message "+f.ref+" is not defined")}f=null,g=null;}b=null,this.ptr=this.ptr.parent;}return this.resolved=!1,this.result=null,this},e["import"]=function(b,c){var e,g,h,i,j,k,l,m,d="/";if("string"==typeof c){if(a.Util.IS_NODE,this.files[c]===!0)return this.reset();this.files[c]=!0;}else if("object"==typeof c){if(e=c.root,a.Util.IS_NODE,(e.indexOf("\\")>=0||c.file.indexOf("\\")>=0)&&(d="\\"),g=e+d+c.file,this.files[g]===!0)return this.reset();this.files[g]=!0;}if(b.imports&&b.imports.length>0){for(i=!1,"object"==typeof c?(this.importRoot=c.root,i=!0,h=this.importRoot,c=c.file,(h.indexOf("\\")>=0||c.indexOf("\\")>=0)&&(d="\\")):"string"==typeof c?this.importRoot?h=this.importRoot:c.indexOf("/")>=0?(h=c.replace(/\/[^\/]*$/,""),""===h&&(h="/")):c.indexOf("\\")>=0?(h=c.replace(/\\[^\\]*$/,""),d="\\"):h=".":h=null,j=0;j<b.imports.length;j++)if("string"==typeof b.imports[j]){if(!h)throw Error("cannot determine import root");if(k=b.imports[j],"google/protobuf/descriptor.proto"===k)continue;if(k=h+d+k,this.files[k]===!0)continue;if(/\.proto$/i.test(k)&&!a.DotProto&&(k=k.replace(/\.proto$/,".json")),l=a.Util.fetch(k),null===l)throw Error("failed to import '"+k+"' in '"+c+"': file not found");/\.json$/i.test(k)?this["import"](JSON.parse(l+""),k):this["import"](a.DotProto.Parser.parse(l),k);}else c?/\.(\w+)$/.test(c)?this["import"](b.imports[j],c.replace(/^(.+)\.(\w+)$/,function(a,b,c){return b+"_import"+j+"."+c})):this["import"](b.imports[j],c+"_import"+j):this["import"](b.imports[j]);i&&(this.importRoot=null);}return b["package"]&&this.define(b["package"]),b.syntax&&f(b),m=this.ptr,b.options&&Object.keys(b.options).forEach(function(a){m.options[a]=b.options[a];}),b.messages&&(this.create(b.messages),this.ptr=m),b.enums&&(this.create(b.enums),this.ptr=m),b.services&&(this.create(b.services),this.ptr=m),b["extends"]&&this.create(b["extends"]),this.reset()},e.resolveAll=function(){var d;if(null==this.ptr||"object"==typeof this.ptr.type)return this;if(this.ptr instanceof c.Namespace)this.ptr.children.forEach(function(a){this.ptr=a,this.resolveAll();},this);else if(this.ptr instanceof c.Message.Field){if(b.TYPE.test(this.ptr.type))this.ptr.type=a.TYPES[this.ptr.type];else{if(!b.TYPEREF.test(this.ptr.type))throw Error("illegal type reference in "+this.ptr.toString(!0)+": "+this.ptr.type);if(d=(this.ptr instanceof c.Message.ExtensionField?this.ptr.extension.parent:this.ptr.parent).resolve(this.ptr.type,!0),!d)throw Error("unresolvable type reference in "+this.ptr.toString(!0)+": "+this.ptr.type);if(this.ptr.resolvedType=d,d instanceof c.Enum){if(this.ptr.type=a.TYPES["enum"],"proto3"===this.ptr.syntax&&"proto3"!==d.syntax)throw Error("proto3 message cannot reference proto2 enum")}else{if(!(d instanceof c.Message))throw Error("illegal type reference in "+this.ptr.toString(!0)+": "+this.ptr.type);this.ptr.type=d.isGroup?a.TYPES.group:a.TYPES.message;}}if(this.ptr.map){if(!b.TYPE.test(this.ptr.keyType))throw Error("illegal key type for map field in "+this.ptr.toString(!0)+": "+this.ptr.keyType);this.ptr.keyType=a.TYPES[this.ptr.keyType];}}else if(this.ptr instanceof a.Reflect.Service.Method){if(!(this.ptr instanceof a.Reflect.Service.RPCMethod))throw Error("illegal service type in "+this.ptr.toString(!0));if(d=this.ptr.parent.resolve(this.ptr.requestName,!0),!(d&&d instanceof a.Reflect.Message))throw Error("Illegal type reference in "+this.ptr.toString(!0)+": "+this.ptr.requestName);if(this.ptr.resolvedRequestType=d,d=this.ptr.parent.resolve(this.ptr.responseName,!0),!(d&&d instanceof a.Reflect.Message))throw Error("Illegal type reference in "+this.ptr.toString(!0)+": "+this.ptr.responseName);this.ptr.resolvedResponseType=d;}else if(!(this.ptr instanceof a.Reflect.Message.OneOf||this.ptr instanceof a.Reflect.Extension||this.ptr instanceof a.Reflect.Enum.Value))throw Error("illegal object in namespace: "+typeof this.ptr+": "+this.ptr);return this.reset()},e.build=function(a){var b,c,d;if(this.reset(),this.resolved||(this.resolveAll(),this.resolved=!0,this.result=null),null===this.result&&(this.result=this.ns.build()),!a)return this.result;for(b="string"==typeof a?a.split("."):a,c=this.result,d=0;d<b.length;d++){if(!c[b[d]]){c=null;break}c=c[b[d]];}return c},e.lookup=function(a,b){return a?this.ns.resolve(a,b):this.ns},e.toString=function(){return "Builder"},d.Message=function(){},d.Enum=function(){},d.Service=function(){},d}(e,e.Lang,e.Reflect),e.Map=function(a,b){function e(a){var b=0;return {next:function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}}var c=function(a,c){var d,e,f,g;if(!a.map)throw Error("field is not a map");if(this.field=a,this.keyElem=new b.Element(a.keyType,null,!0,a.syntax),this.valueElem=new b.Element(a.type,a.resolvedType,!1,a.syntax),this.map={},Object.defineProperty(this,"size",{get:function(){return Object.keys(this.map).length}}),c)for(d=Object.keys(c),e=0;e<d.length;e++)f=this.keyElem.valueFromString(d[e]),g=this.valueElem.verifyValue(c[d[e]]),this.map[this.keyElem.valueToString(f)]={key:f,value:g};},d=c.prototype;return d.clear=function(){this.map={};},d["delete"]=function(a){var b=this.keyElem.valueToString(this.keyElem.verifyValue(a)),c=b in this.map;return delete this.map[b],c},d.entries=function(){var d,c,a=[],b=Object.keys(this.map);for(c=0;c<b.length;c++)a.push([(d=this.map[b[c]]).key,d.value]);return e(a)},d.keys=function(){var c,a=[],b=Object.keys(this.map);for(c=0;c<b.length;c++)a.push(this.map[b[c]].key);return e(a)},d.values=function(){var c,a=[],b=Object.keys(this.map);for(c=0;c<b.length;c++)a.push(this.map[b[c]].value);return e(a)},d.forEach=function(a,b){var e,d,c=Object.keys(this.map);for(d=0;d<c.length;d++)a.call(b,(e=this.map[c[d]]).value,e.key,this);},d.set=function(a,b){var c=this.keyElem.verifyValue(a),d=this.valueElem.verifyValue(b);return this.map[this.keyElem.valueToString(c)]={key:c,value:d},this},d.get=function(a){var b=this.keyElem.valueToString(this.keyElem.verifyValue(a));return b in this.map?this.map[b].value:void 0},d.has=function(a){var b=this.keyElem.valueToString(this.keyElem.verifyValue(a));return b in this.map},c}(e,e.Reflect),e.loadProto=function(a,b,c){return ("string"==typeof b||b&&"string"==typeof b.file&&"string"==typeof b.root)&&(c=b,b=void 0),e.loadJson(e.DotProto.Parser.parse(a),b,c)},e.protoFromString=e.loadProto,e.loadProtoFile=function(a,b,c){if(b&&"object"==typeof b?(c=b,b=null):b&&"function"==typeof b||(b=null),b)return e.Util.fetch("string"==typeof a?a:a.root+"/"+a.file,function(d){if(null===d)return b(Error("Failed to fetch file")),void 0;try{b(null,e.loadProto(d,c,a));}catch(f){b(f);}});var d=e.Util.fetch("object"==typeof a?a.root+"/"+a.file:a);return null===d?null:e.loadProto(d,c,a)},e.protoFromFile=e.loadProtoFile,e.newBuilder=function(a){return a=a||{},"undefined"==typeof a.convertFieldsToCamelCase&&(a.convertFieldsToCamelCase=e.convertFieldsToCamelCase),"undefined"==typeof a.populateAccessors&&(a.populateAccessors=e.populateAccessors),new e.Builder(a)},e.loadJson=function(a,b,c){return ("string"==typeof b||b&&"string"==typeof b.file&&"string"==typeof b.root)&&(c=b,b=null),b&&"object"==typeof b||(b=e.newBuilder()),"string"==typeof a&&(a=JSON.parse(a)),b["import"](a,c),b.resolveAll(),b},e.loadJsonFile=function(a,b,c){if(b&&"object"==typeof b?(c=b,b=null):b&&"function"==typeof b||(b=null),b)return e.Util.fetch("string"==typeof a?a:a.root+"/"+a.file,function(d){if(null===d)return b(Error("Failed to fetch file")),void 0;try{b(null,e.loadJson(JSON.parse(d),c,a));}catch(f){b(f);}});var d=e.Util.fetch("object"==typeof a?a.root+"/"+a.file:a);return null===d?null:e.loadJson(JSON.parse(d),c,a)},h=a,i=e.loadProto(h,void 0,"").build("Modules").probuf}(d,c,b);return e}

  var SSMsg$1 = "\npackage Modules;\nmessage probuf {\n  message " + PBName.SetUserStatusInput + "\n  {\n    optional int32 status=1;\n  }\n\n  message SetUserStatusOutput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusInput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusOutput\n  {\n    optional string status=1;\n    optional string subUserId=2;\n  }\n\n  message SubUserStatusInput\n  {\n    repeated string userid =1;\n  }\n\n  message SubUserStatusOutput\n  {\n    optional int32 nothing=1; \n  }\n  message VoipDynamicInput\n  {\n    required int32  engineType = 1;\n    required string channelName = 2;\n    optional string channelExtra = 3;\n  }\n\n  message VoipDynamicOutput\n  {\n      required string dynamicKey=1;\n  }\n  message " + PBName.NotifyMsg + " {\n    required int32 type = 1;\n    optional int64 time = 2;\n    optional string chrmId=3;\n  }\n  message " + PBName.SyncRequestMsg + " {\n    required int64 syncTime = 1;\n    required bool ispolling = 2;\n    optional bool isweb=3;\n    optional bool isPullSend=4;\n    optional bool isKeeping=5;\n    optional int64 sendBoxSyncTime=6;\n  }\n  message " + PBName.UpStreamMessage + " {\n    required int32 sessionId = 1;\n    required string classname = 2;\n    required bytes content = 3;\n    optional string pushText = 4;\n    optional string appData = 5;\n    repeated string userId = 6;\n    optional int64 delMsgTime = 7;\n    optional string delMsgId = 8;\n    optional int32 configFlag = 9;\n  }\n  message " + PBName.DownStreamMessages + " {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    optional bool finished = 3;\n  }\n  message " + PBName.DownStreamMessage + " {\n    required string fromUserId = 1;\n    required ChannelType type = 2;\n    optional string groupId = 3;\n    required string classname = 4;\n    required bytes content = 5;\n    required int64 dataTime = 6;\n    required int64 status = 7;\n    optional int64 extra = 8;\n    optional string msgId = 9;\n    optional int32 direction = 10;\n  }\n  enum ChannelType {\n    PERSON = 1;\n    PERSONS = 2;\n    GROUP = 3;\n    TEMPGROUP = 4;\n    CUSTOMERSERVICE = 5;\n    NOTIFY = 6;\n    MC=7;\n    MP=8;\n  }\n  message CreateDiscussionInput {\n    optional string name = 1;\n  }\n  message CreateDiscussionOutput {\n    required string id = 1;\n  }\n  message ChannelInvitationInput {\n    repeated string users = 1;\n  }\n  message LeaveChannelInput {\n    required int32 nothing = 1;\n  }\n  message ChannelEvictionInput {\n    required string user = 1;\n  }\n  message RenameChannelInput {\n    required string name = 1;\n  }\n  message ChannelInfoInput {\n    required int32 nothing = 1;\n  }\n  message ChannelInfoOutput {\n    required ChannelType type = 1;\n    required string channelId = 2;\n    required string channelName = 3;\n    required string adminUserId = 4;\n    repeated string firstTenUserIds = 5;\n    required int32 openStatus = 6;\n  }\n  message ChannelInfosInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message ChannelInfosOutput {\n    repeated ChannelInfoOutput channels = 1;\n    required int32 total = 2;\n  }\n  message MemberInfo {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n    required string extension = 4;\n  }\n  message GroupMembersInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message GroupMembersOutput {\n    repeated MemberInfo members = 1;\n    required int32 total = 2;\n  }\n  message GetUserInfoInput {\n    required int32 nothing = 1;\n  }\n  message GetUserInfoOutput {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n  }\n  message GetSessionIdInput {\n    required int32 nothing = 1;\n  }\n  message GetSessionIdOutput {\n    required int32 sessionId = 1;\n  }\n  enum FileType {\n    image = " + FILE_TYPE.IMAGE + ";\n    audio = " + FILE_TYPE.AUDIO + ";\n    video = " + FILE_TYPE.VIDEO + ";\n    file = " + FILE_TYPE.FILE + ";\n  }\n  message " + PBName.GetQNupTokenInput + " {\n    required FileType type = 1;\n    optional string key = 2;\n  }\n  message " + PBName.GetQNdownloadUrlInput + " {\n    required FileType type = 1;\n    required string key = 2;\n    optional string  fileName = 3;\n  }\n  message " + PBName.GetQNupTokenOutput + " {\n    required int64 deadline = 1;\n    required string token = 2;\n    optional string bosToken = 3;\n    optional string bosDate = 4;\n    optional string path = 5;\n  }\n  message " + PBName.GetQNdownloadUrlOutput + " {\n    required string downloadUrl = 1;\n  }\n  message Add2BlackListInput {\n    required string userId = 1;\n  }\n  message RemoveFromBlackListInput {\n    required string userId = 1;\n  }\n  message QueryBlackListInput {\n    required int32 nothing = 1;\n  }\n  message QueryBlackListOutput {\n    repeated string userIds = 1;\n  }\n  message BlackListStatusInput {\n    required string userId = 1;\n  }\n  message BlockPushInput {\n    required string blockeeId = 1;\n  }\n  message ModifyPermissionInput {\n    required int32 openStatus = 1;\n  }\n  message GroupInput {\n    repeated GroupInfo groupInfo = 1;\n  }\n  message GroupOutput {\n    required int32 nothing = 1;\n  }\n  message GroupInfo {\n    required string id = 1;\n    required string name = 2;\n  }\n  message GroupHashInput {\n    required string userId = 1;\n    required string groupHashCode = 2;\n  }\n  message GroupHashOutput {\n    required GroupHashType result = 1;\n  }\n  enum GroupHashType {\n    group_success = 0x00;\n    group_failure = 0x01;\n  }\n  message " + PBName.ChrmInput + " {\n    required int32 nothing = 1;\n  }\n  message ChrmOutput {\n    required int32 nothing = 1;\n  }\n  message " + PBName.ChrmPullMsg + " {\n    required int64 syncTime = 1;\n    required int32 count = 2;\n  }\n  \n  message ChrmPullMsgNew \n  {\n    required int32 count = 1;\n    required int64 syncTime = 2;\n    optional string chrmId=3;\n  }\n  message " + PBName.RelationQryInput + "\n  {\n    optional ChannelType type = 1;\n    optional int32 count = 2;\n    optional int64 startTime = 3;\n    optional int32 order = 4;\n  }\n  message " + PBName.RelationsInput + "\n  {\n    required ChannelType type = 1;\n    optional DownStreamMessage msg =2;\n    optional int32 count = 3;\n    optional int32 offset = 4;\n    optional int64 startTime = 5;\n    optional int64 endTime = 6;\n  }\n  message " + PBName.RelationsOutput + "\n  {\n    repeated RelationInfo info = 1;\n  }\n  message RelationInfo\n  {\n    required ChannelType type = 1;\n    required string userId = 2;\n    optional DownStreamMessage msg =3;\n    optional int64 readMsgTime= 4;\n    optional int64 unreadCount= 5;\n  }\n  message RelationInfoReadTime\n  {\n    required ChannelType type = 1;\n    required int64 readMsgTime= 2;\n    required string targetId = 3;\n  }\n  message " + PBName.CleanHisMsgInput + "\n  {\n      required string targetId = 1;\n      required int64 dataTime = 2;\n      optional int32 conversationType= 3;\n  }\n  message HistoryMessageInput\n  {\n    required string targetId = 1;\n    required int64 dataTime =2;\n    required int32 size  = 3;\n  }\n\n  message HistoryMessagesOuput\n  {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    required int32 hasMsg = 3;\n  }\n  message " + PBName.QueryChatRoomInfoInput + "\n  {\n    required int32 count= 1;\n    optional int32 order= 2;\n  }\n\n  message " + PBName.QueryChatRoomInfoOutput + "\n  {\n    optional int32 userTotalNums = 1;\n    repeated ChrmMember userInfos = 2;\n  }\n  message ChrmMember\n  {\n    required int64 time = 1;\n    required string id = 2;\n  }\n  message MPFollowInput\n  {\n    required string id = 1;\n  }\n\n  message MPFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message " + PBName.MCFollowInput + "\n  {\n    required string id = 1;\n  }\n\n  message MCFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message MpInfo  \n  {\n    required string mpid=1;\n    required string name = 2;\n    required string type = 3;\n    required int64 time=4;\n    optional string portraitUrl=5;\n    optional string extra =6;\n  }\n\n  message SearchMpInput\n  {\n    required int32 type=1;\n    required string id=2;\n  }\n\n  message SearchMpOutput\n  {\n    required int32 nothing=1;\n    repeated MpInfo info = 2;\n  }\n\n  message PullMpInput\n  {\n    required int64 time=1;\n    required string mpid=2;\n  }\n\n  message PullMpOutput\n  {\n    required int32 status=1;\n    repeated MpInfo info = 2;\n  }\n  message " + PBName.HistoryMsgInput + "\n  {\n    optional string targetId = 1;\n    optional int64 time = 2;\n    optional int32 count  = 3;\n    optional int32 order = 4;\n  }\n\n  message " + PBName.HistoryMsgOuput + "\n  {\n    repeated DownStreamMessage list=1;\n    required int64 syncTime=2;\n    required int32 hasMsg=3;\n  }\n  message " + PBName.RtcQueryListInput + "{\n    optional int32 order=1;\n  }\n\n  message " + PBName.RtcKeyDeleteInput + "{\n    repeated string key=1;\n  }\n\n  message " + PBName.RtcValueInfo + "{\n    required string key=1;\n    required string value=2;\n  }\n\n  message RtcUserInfo{\n    required string userId=1;\n    repeated " + PBName.RtcValueInfo + " userData=2;\n  }\n\n  message " + PBName.RtcUserListOutput + "{\n    repeated RtcUserInfo list=1;\n    optional string token=2;\n    optional string sessionId=3;\n  }\n  message RtcRoomInfoOutput{\n    optional string roomId = 1;\n    repeated " + PBName.RtcValueInfo + " roomData = 2;\n    optional int32 userCount = 3;\n    repeated RtcUserInfo list=4;\n  }\n  message " + PBName.RtcInput + "{\n    required int32 roomType=1;\n    optional int32 broadcastType=2;\n  }\n  message RtcQryInput{ \n    required bool isInterior=1;\n    required targetType target=2;\n    repeated string key=3;\n  }\n  message " + PBName.RtcQryOutput + "{\n    repeated " + PBName.RtcValueInfo + " outInfo=1;\n  }\n  message RtcDelDataInput{\n    repeated string key=1;\n    required bool isInterior=2;\n    required targetType target=3;\n  }\n  message " + PBName.RtcDataInput + "{ \n    required bool interior=1;\n    required targetType target=2;\n    repeated string key=3;\n    optional string objectName=4;\n    optional string content=5;\n  }\n  message " + PBName.RtcSetDataInput + "{\n    required bool interior=1;\n    required targetType target=2;\n    required string key=3;\n    required string value=4;\n    optional string objectName=5;\n    optional string content=6;\n  }\n  message " + PBName.RtcUserSetDataInput + " {\n    repeated " + PBName.RtcValueInfo + " valueInfo = 1;\n    required string objectName = 2;\n    repeated " + PBName.RtcValueInfo + " content = 3;\n  }\n  message RtcOutput\n  {\n    optional int32 nothing=1; \n  }\n  message " + PBName.RtcTokenOutput + "{\n    required string rtcToken=1;\n  }\n  enum targetType {\n    ROOM =1 ;\n    PERSON = 2;\n  }\n  message " + PBName.RtcSetOutDataInput + "{\n    required targetType target=1;\n    repeated " + PBName.RtcValueInfo + " valueInfo=2;\n    optional string objectName=3;\n    optional string content=4;\n  }\n  message " + PBName.RtcQryUserOutDataInput + "{\n    repeated string userId = 1;\n  }\n  message " + PBName.RtcUserOutDataOutput + "{\n    repeated RtcUserInfo user = 1;\n  }\n  message " + PBName.SessionsAttQryInput + "{\n    required int32 nothing = 1;\n  }\n  message " + PBName.SessionsAttOutput + "{\n    required int64 inboxTime = 1;\n    required int64 sendboxTime = 2;\n    required int64 totalUnreadCount = 3;\n  }\n  message " + PBName.SessionMsgReadInput + "\n  {\n    required ChannelType type = 1;\n    required int64 msgTime = 2;\n    required string channelId = 3;\n  }\n  message SessionMsgReadOutput\n  {\n    optional int32 nothing=1; \n  }\n  message " + PBName.DeleteSessionsInput + "\n  {\n    repeated SessionInfo sessions = 1;\n  }\n  message " + PBName.SessionInfo + "\n  {\n    required ChannelType type = 1;\n    required string channelId = 2;\n  }\n  message " + PBName.DeleteSessionsOutput + "\n  {\n    optional int32 nothing=1; \n  }\n  message " + PBName.DeleteMsgInput + "\n  {\n    optional ChannelType type = 1;\n    optional string conversationId = 2;\n    repeated DeleteMsg msgs = 3;\n  }\n  message DeleteMsg\n  {\n    optional string msgId = 1;\n    optional int64 msgDataTime = 2;\n    optional int32 direct = 3;\n  }\n  message ChrmKVEntity {\n    required string key = 1;\n    required string value = 2;\n    optional int32 status = 3;\n    optional int64 timestamp = 4;\n    optional string uid = 5;\n  }\n  message " + PBName.SetChrmKV + " {\n    required ChrmKVEntity entry = 1;\n    optional bool bNotify = 2;\n    optional UpStreamMessage notification = 3;\n    optional ChannelType type = 4;\n  }\n  message " + PBName.ChrmKVOutput + " {\n    repeated ChrmKVEntity entries = 1;\n    optional bool bFullUpdate = 2;\n    optional int64 syncTime = 3;\n  }\n  message " + PBName.QueryChrmKV + " {\n    required int64 timestamp = 1;\n  }\n  message " + PBName.ChrmNotifyMsg + " {\t\n    required int32 type= 1;\n    optional int64 time= 2;\n    optional string chrmId=3;\n  }\n  message " + PBName.SetUserSettingInput + " {\n    required int64 version=1;\n    required string value=2;\n  }\n  message " + PBName.SetUserSettingOutput + " {\n    required int64 version=1;\n    required bool reserve=2;\n  }\n  message " + PBName.PullUserSettingInput + " {\n    required int64 version=1;//\u5F53\u524D\u5BA2\u6237\u7AEF\u7684\u6700\u5927\u7248\u672C\u53F7\n    optional bool reserve=2;\n  }\n  message " + PBName.PullUserSettingOutput + " {\n    repeated UserSettingItem items = 1;\n    required int64 version=2;\n  }\n  message UserSettingItem {\n    required string targetId= 1;\n    required ChannelType type = 2;\n    required string key = 4;\n    required bytes value = 5;\n    required int64 version=6;\n    required int32 status=7;\n  }\n  message " + PBName.SessionReq + " {\n    required int64 time = 1;\n  }\n  message " + PBName.SessionStates + " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message " + PBName.SessionState + " {\n    required ChannelType type = 1;\n    required string channelId = 2;  \n    optional int64 time = 3;\n    repeated SessionStateItem stateItem = 4;\n  }\n  message " + PBName.SessionStateItem + " {\n    required SessionStateType sessionStateType = 1;\n    required string value = 2;\n  }\n  enum SessionStateType {\n    IsSilent = 1;\n    IsTop = 2;\n  }\n  message " + PBName.SessionStateModifyReq + " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message " + PBName.SessionStateModifyResp + " {\n    required int64 version=1;\n  }\n}\n";

  var Codec$1 = {};

  try {
    Codec$1 = protobuf(SSMsg$1);
  } catch (e) {
    Codec$1 = {};
  }

  Codec$1.getModule = function (pbName) {
    var modules = new Codec$1[pbName]();

    modules.getArrayData = function () {
      var data = modules.toArrayBuffer();
      data = utils.ArrayBufferToArray(data);
      return data;
    };

    return modules;
  };

  var SocketCodec = Codec$1;

  var isGroup$1 = common.isGroup,
      isChatRoom$1 = common.isChatRoom;

  var Codec$2 = function () {
    function Codec$$1(option) {
      this.codec = SocketCodec;
      option = option || {};
      var type = option.connectType;
      type && this.setCodecType(type);
    }

    var _proto = Codec$$1.prototype;

    _proto.setCodecType = function setCodecType(type) {
      this.codec = type === CONNECT_TYPE.COMET ? Codec : SocketCodec;
    };

    _proto.decodeByPBName = function decodeByPBName(data, pbName, option) {
      var _formatEventMap;

      var self = this;
      var formatEventMap = (_formatEventMap = {}, _formatEventMap[PBName.DownStreamMessages] = self.formatSyncMessages, _formatEventMap[PBName.DownStreamMessage] = self.formatReceivedMessage, _formatEventMap[PBName.UpStreamMessage] = self.formatSentMessage, _formatEventMap[PBName.HistoryMsgOuput] = self.formatHistoryMessages, _formatEventMap[PBName.RelationsOutput] = self.formatConversationList, _formatEventMap[PBName.QueryChatRoomInfoOutput] = self.formatChatRoomInfos, _formatEventMap[PBName.RtcUserListOutput] = self.formatRTCUserList, _formatEventMap[PBName.RtcQryOutput] = self.formatRTCData, _formatEventMap[PBName.ChrmKVOutput] = self.formatChatRoomKVList, _formatEventMap[PBName.PullUserSettingOutput] = self.formatUserSetting, _formatEventMap[PBName.SessionStates] = self.formatConversationStatus, _formatEventMap);
      var decodedData = data;
      var formatEvent = formatEventMap[pbName];

      try {
        decodedData = self.codec[pbName].decode(data);

        if (utils.isObject(decodedData)) {
          decodedData = utils.batchInt64ToTimestamp(decodedData);
        }

        if (utils.isFunction(formatEvent)) {
          decodedData = formatEvent.call(self, decodedData, option);
        }
      } catch (e) {}

      return decodedData;
    };

    _proto.formatBytes = function formatBytes(content) {
      try {
        var _content = content,
            offset = _content.offset,
            buffer = _content.buffer,
            limit = _content.limit;

        if (offset) {
          content = utils.ArrayBufferToUint8Array(buffer).subarray(offset, limit);
          content = BinaryHelper.readUTF(content);
        }

        content = utils.parseJSON(content);
      } catch (e) {}

      return content;
    };

    _proto.formatSyncMessages = function formatSyncMessages(data, option) {
      option = option || {};
      var self = this,
          onMessage = option.onMessage || utils.noop,
          list = data.list,
          syncTime = data.syncTime,
          maxListIndex = list.length - 1;
      var finished = data.finished;

      if (utils.isUndefined(finished)) {
        data.finished = finished = true;
      }

      data.syncTime = utils.int64ToTimestamp(syncTime);
      data.list = utils.map(list, function (msgData, index) {
        var message = self.formatReceivedMessage(msgData, option),
            isLastInAPull = utils.isEqual(index, maxListIndex),
            isFinished = isLastInAPull && finished;

        try {
          onMessage({
            isLastInAPull: isLastInAPull,
            message: message,
            finished: isFinished
          });
        } catch (e) {
          utils.consoleError(e);
        }

        return message;
      });
      return data;
    };

    _proto.formatReceivedMessage = function formatReceivedMessage(data, option) {
      option = option || {};
      var self = this;

      var _option = option,
          currentUserId = _option.currentUserId,
          connectedTime = _option.connectedTime,
          content = data.content,
          fromUserId = data.fromUserId,
          type = data.type,
          groupId = data.groupId,
          status = data.status,
          dataTime = data.dataTime,
          messageType = data.classname,
          messageUId = data.msgId,
          direction = data.direction || MESSAGE_DIRECTION.RECEIVE,
          isSelfSend = utils.isEqual(direction, MESSAGE_DIRECTION.SEND),
          _common$getMessageOpt = common.getMessageOptionByStatus(status),
          isPersited = _common$getMessageOpt.isPersited,
          isCounted = _common$getMessageOpt.isCounted,
          isMentiond = _common$getMessageOpt.isMentiond,
          disableNotification = _common$getMessageOpt.disableNotification,
          targetId = isGroup$1(type) || isChatRoom$1(type) ? groupId : fromUserId,
          senderUserId = isSelfSend ? currentUserId : fromUserId,
          sentTime = utils.int64ToTimestamp(dataTime),
          isOffLineMessage = sentTime < connectedTime,
          isChatRoomMsg = common.isChatRoom(type);

      var messageDirection = isSelfSend ? MESSAGE_DIRECTION.SEND : MESSAGE_DIRECTION.RECEIVE;

      if (isChatRoomMsg && utils.isEqual(fromUserId, currentUserId)) {
        messageDirection = MESSAGE_DIRECTION.SEND;
      }

      var isMentioned = isMentiond;
      return {
        type: type,
        targetId: targetId,
        senderUserId: senderUserId,
        messageType: messageType,
        messageUId: messageUId,
        isPersited: isPersited,
        isCounted: isCounted,
        isMentiond: isMentiond,
        isMentioned: isMentioned,
        sentTime: sentTime,
        isOffLineMessage: isOffLineMessage,
        messageDirection: messageDirection,
        receivedTime: common.DelayTimer.getTime(),
        disableNotification: disableNotification,
        content: self.formatBytes(content)
      };
    };

    _proto.formatSentMessage = function formatSentMessage(data, option) {
      var self = this;

      var content = data.content,
          messageType = data.classname,
          sessionId = data.sessionId,
          messageUId = data.msgId,
          signal = option.signal,
          currentUserId = option.currentUserId,
          date = signal.date,
          topic = signal.topic,
          targetId = signal.targetId,
          _common$getPersitedAn = common.getPersitedAndCountedAndSlientBySessionId(sessionId),
          isPersited = _common$getPersitedAn.isPersited,
          isCounted = _common$getPersitedAn.isCounted,
          disableNotification = _common$getPersitedAn.disableNotification,
          type = PUBLISH_TOPIC_TO_CONVERSATION_TYPE[topic] || CONVERSATION_TYPE.PRIVATE,
          isStatusMessage = utils.isInclude(PUBLISH_STATUS_TOPIC, topic);

      return {
        type: type,
        targetId: targetId,
        messageType: messageType,
        messageUId: messageUId,
        isPersited: isPersited,
        isCounted: isCounted,
        isStatusMessage: isStatusMessage,
        senderUserId: currentUserId,
        content: self.formatBytes(content),
        sentTime: utils.secondsToMilliseconds(date),
        receivedTime: common.DelayTimer.getTime(),
        messageDirection: MESSAGE_DIRECTION.SEND,
        isOffLineMessage: false,
        disableNotification: disableNotification
      };
    };

    _proto.formatHistoryMessages = function formatHistoryMessages(data, option) {
      var self = this;
      var conversation = option.conversation || {},
          msgList = data.list,
          hasMsg = data.hasMsg,
          targetId = conversation.targetId,
          syncTime = utils.int64ToTimestamp(data.syncTime);
      var list = [];
      utils.forEach(msgList, function (msgData) {
        var msg = self.formatReceivedMessage(msgData, option);
        msg.targetId = targetId;
        list.push(msg);
      }, {
        isReverse: true
      });
      return {
        syncTime: syncTime,
        list: list,
        hasMore: !!hasMsg
      };
    };

    _proto.formatConversationList = function formatConversationList(serverData, option) {
      var self = this;
      var conversationList = serverData.info;
      var afterDecode = option.afterDecode || utils.noop;
      conversationList = utils.map(conversationList, function (serverConversation) {
        var msg = serverConversation.msg,
            userId = serverConversation.userId,
            type = serverConversation.type,
            unreadCount = serverConversation.unreadCount;
        msg = self.formatReceivedMessage(msg, option);
        msg.targetId = userId;
        var conversation = {
          targetId: userId,
          type: type,
          unreadMessageCount: unreadCount,
          latestMessage: msg
        };
        return afterDecode(conversation) || conversation;
      });
      return conversationList || [];
    };

    _proto.formatChatRoomInfos = function formatChatRoomInfos(data) {
      var userTotalNums = data.userTotalNums,
          userInfos = data.userInfos;
      userInfos = utils.map(userInfos, function (user) {
        var id = user.id,
            time = user.time;
        time = utils.int64ToTimestamp(time);
        return {
          id: id,
          time: time
        };
      });
      return {
        userCount: userTotalNums,
        userInfos: userInfos
      };
    };

    _proto.formatRTCUserList = function formatRTCUserList(rtcInfos) {
      var list = rtcInfos.list,
          token = rtcInfos.token,
          sessionId = rtcInfos.sessionId;
      var users = {};
      utils.forEach(list, function (item) {
        var userId = item.userId,
            userData = item.userData;
        var tmpData = {};
        utils.forEach(userData, function (data) {
          var key = data.key,
              value = data.value;
          tmpData[key] = value;
        });
        users[userId] = tmpData;
      });
      return {
        users: users,
        token: token,
        sessionId: sessionId
      };
    };

    _proto.formatRTCData = function formatRTCData(data) {
      var list = data.outInfo;
      var props = {};
      utils.forEach(list, function (item) {
        props[item.key] = item.value;
      });
      return props;
    };

    _proto.formatRTCRoomInfo = function formatRTCRoomInfo(data) {
      var id = data.roomId,
          total = data.userCount,
          roomData = data.roomData;
      var room = {
        id: id,
        total: total
      };
      utils.forEach(roomData, function (data) {
        room[data.key] = data.value;
      });
      return room;
    };

    _proto.formatChatRoomKVList = function formatChatRoomKVList(data) {
      var kvEntries = data.entries,
          isFullUpdate = data.bFullUpdate,
          syncTime = data.syncTime;
      kvEntries = kvEntries || [];
      kvEntries = utils.map(kvEntries, function (kv) {
        var key = kv.key,
            value = kv.value,
            status = kv.status,
            timestamp = kv.timestamp,
            uid = kv.uid;

        var _common$getChatRoomKV = common.getChatRoomKVByStatus(status),
            isAutoDelete = _common$getChatRoomKV.isAutoDelete,
            isOverwrite = _common$getChatRoomKV.isOverwrite,
            type = _common$getChatRoomKV.type;

        return {
          key: key,
          value: value,
          isAutoDelete: isAutoDelete,
          isOverwrite: isOverwrite,
          type: type,
          userId: uid,
          timestamp: utils.int64ToTimestamp(timestamp)
        };
      });
      return {
        kvEntries: kvEntries,
        isFullUpdate: isFullUpdate,
        syncTime: syncTime
      };
    };

    _proto.formatUserSetting = function formatUserSetting(data) {
      var self = this;
      var items = data.items,
          version = data.version;
      var settings = {};
      utils.forEach(items || [], function (setting) {
        var key = setting.key,
            version = setting.version,
            value = setting.value;
        setting.version = utils.int64ToTimestamp(version);
        setting.value = self.formatBytes(value);
        settings[key] = setting;
      });
      return {
        settings: settings,
        version: version
      };
    };

    _proto.formatConversationStatus = function formatConversationStatus(data) {
      var stateList = data.state;
      var statusList = [];
      utils.forEach(stateList, function (session) {
        var type = session.type,
            targetId = session.channelId,
            updatedTime = session.time,
            stateItem = session.stateItem;
        var notificationStatus = NOTIFICATION_STATUS.NOTIFY,
            isTop = false;
        utils.forEach(stateItem, function (_ref) {
          var sessionStateType = _ref.sessionStateType,
              value = _ref.value;

          switch (sessionStateType) {
            case CONVERSATION_STATUS_TYPE.DO_NOT_DISTURB:
              notificationStatus = utils.isEqual(value, CONVERSATION_STATUS_CONFIG.ENABLED) ? NOTIFICATION_STATUS.DO_NOT_DISTURB : NOTIFICATION_STATUS.NOTIFY;
              break;

            case CONVERSATION_STATUS_TYPE.TOP:
              isTop = utils.isEqual(value, CONVERSATION_STATUS_CONFIG.ENABLED);
              break;

            default:
              break;
          }
        });
        statusList.push({
          type: type,
          targetId: targetId,
          notificationStatus: notificationStatus,
          isTop: isTop,
          updatedTime: utils.int64ToTimestamp(updatedTime)
        });
      });
      return statusList;
    };

    _proto.encodeServerConfParams = function encodeServerConfParams() {
      var modules = this.codec.getModule(PBName.SessionsAttQryInput);
      modules.setNothing(1);
      return modules.getArrayData();
    };

    _proto.getUpMsgModule = function getUpMsgModule(conversation, option) {
      var type = conversation.type;
      var messageType = option.messageType,
          isMentiond = option.isMentiond,
          mentiondType = option.mentiondType,
          mentiondUserIdList = option.mentiondUserIdList,
          content = option.content,
          pushContent = option.pushContent,
          pushData = option.pushData,
          directionalUserIdList = option.directionalUserIdList,
          isFilerWhiteBlacklist = option.isFilerWhiteBlacklist,
          isVoipPush = option.isVoipPush;
      var isGroupType = common.isGroup(type);
      var modules = this.codec.getModule(PBName.UpStreamMessage);
      var sessionId = common.getSessionId(option);
      var flag = 0;
      modules.setSessionId(sessionId);

      if (isGroupType && isMentiond && content) {
        content.mentionedInfo = {
          userIdList: mentiondUserIdList,
          type: mentiondType || MENTIOND_TYPE.ALL
        };
      }

      pushContent && modules.setPushText(pushContent);
      pushData && modules.setAppData(pushData);
      directionalUserIdList && modules.setUserId(directionalUserIdList);
      flag |= isVoipPush ? 0x01 : 0;
      flag |= isFilerWhiteBlacklist ? 0x02 : 0;
      modules.setConfigFlag(flag);
      modules.setClassname(messageType);
      modules.setContent(utils.toJSON(content));
      return modules;
    };

    _proto.encodeUpMsg = function encodeUpMsg(conversation, option) {
      var modules = this.getUpMsgModule(conversation, option);
      return modules.getArrayData();
    };

    _proto.encodeSyncMsg = function encodeSyncMsg(syncMsgArgs) {
      var sendboxTime = syncMsgArgs.sendboxTime,
          inboxTime = syncMsgArgs.inboxTime;
      var modules = this.codec.getModule(PBName.SyncRequestMsg);
      modules.setIspolling(false);
      modules.setIsPullSend(true);
      modules.setSendBoxSyncTime(sendboxTime);
      modules.setSyncTime(inboxTime);
      return modules.getArrayData();
    };

    _proto.encodeChrmSyncMsg = function encodeChrmSyncMsg(time, count) {
      time = time || 0;
      count = count || 0;
      var modules = this.codec.getModule(PBName.ChrmPullMsg);
      modules.setCount(count);
      modules.setSyncTime(time);
      return modules.getArrayData();
    };

    _proto.encodeGetHistoryMsg = function encodeGetHistoryMsg(conversation, option) {
      var targetId = conversation.targetId;
      var count = option.count,
          order = option.order,
          timestrap = option.timestrap;
      var modules = this.codec.getModule(PBName.HistoryMsgInput);
      modules.setTargetId(targetId);
      modules.setTime(timestrap);
      modules.setCount(count);
      modules.setOrder(order);
      return modules.getArrayData();
    };

    _proto.encodeGetConversationList = function encodeGetConversationList(option) {
      option = option || {};
      var _option2 = option,
          count = _option2.count,
          startTime = _option2.startTime;
      var modules = this.codec.getModule(PBName.RelationQryInput);
      modules.setType(1);
      modules.setCount(count);
      modules.setStartTime(startTime);
      return modules.getArrayData();
    };

    _proto.encodeOldConversationList = function encodeOldConversationList(option) {
      option = option || {};
      var _option3 = option,
          count = _option3.count,
          type = _option3.type;
      var modules = this.codec.getModule(PBName.RelationsInput);
      type = type || CONVERSATION_TYPE.PRIVATE;
      count = count || 0;
      modules.setType(type);
      modules.setCount(count);
      return modules.getArrayData();
    };

    _proto.encodeRemoveConversationList = function encodeRemoveConversationList(conversationList) {
      var _this = this;

      var modules = this.codec.getModule(PBName.DeleteSessionsInput);
      var sessions = [];
      utils.forEach(conversationList, function (conversation) {
        var type = conversation.type,
            targetId = conversation.targetId;

        var session = _this.codec.getModule(PBName.SessionInfo);

        session.setType(type);
        session.setChannelId(targetId);
        sessions.push(session);
      });
      modules.setSessions(sessions);
      return modules.getArrayData();
    };

    _proto.encodeDeleteMessages = function encodeDeleteMessages(conversation, messages) {
      var type = conversation.type,
          targetId = conversation.targetId;
      var modules = this.codec.getModule(PBName.DeleteMsgInput);
      var encodeMsgs = [];
      utils.forEach(messages, function (message) {
        encodeMsgs.push({
          msgId: message.messageUId,
          msgDataTime: message.sentTime,
          direct: message.messageDirection
        });
      });
      modules.setType(type);
      modules.setConversationId(targetId);
      modules.setMsgs(encodeMsgs);
      return modules.getArrayData();
    };

    _proto.encodeClearMessages = function encodeClearMessages(conversation, option) {
      var targetId = conversation.targetId;
      var timestrap = option.timestrap;
      var modules = this.codec.getModule(PBName.CleanHisMsgInput);
      timestrap = timestrap || utils.getCurrentTimestamp();
      modules.setDataTime(timestrap);
      modules.setTargetId(targetId);
      return modules.getArrayData();
    };

    _proto.encodeClearUnreadCount = function encodeClearUnreadCount(conversation, option) {
      var type = conversation.type,
          targetId = conversation.targetId;
      var timestrap = option.timestrap;
      var modules = this.codec.getModule(PBName.SessionMsgReadInput);
      timestrap = timestrap || +new Date();
      modules.setType(type);
      modules.setChannelId(targetId);
      modules.setMsgTime(timestrap);
      return modules.getArrayData();
    };

    _proto.encodeJoinOrQuitChatRoom = function encodeJoinOrQuitChatRoom() {
      var modules = this.codec.getModule(PBName.ChrmInput);
      modules.setNothing(1);
      return modules.getArrayData();
    };

    _proto.encodeGetChatRoomInfo = function encodeGetChatRoomInfo(option) {
      option = option || {};
      var _option4 = option,
          count = _option4.count,
          order = _option4.order;
      var modules = this.codec.getModule(PBName.QueryChatRoomInfoInput);
      modules.setCount(count);
      modules.setOrder(order);
      return modules.getArrayData();
    };

    _proto.encodeJoinRTCRoom = function encodeJoinRTCRoom(room) {
      var mode = room.mode,
          broadcastType = room.broadcastType;
      var modules = this.codec.getModule(PBName.RtcInput);
      mode = mode || 0;
      modules.setRoomType(mode);
      !utils.isUndefined(broadcastType) && modules.setBroadcastType(broadcastType);
      return modules.getArrayData();
    };

    _proto.encodeQuitRTCRoom = function encodeQuitRTCRoom() {
      return this.codec.getModule(PBName.SetUserStatusInput).getArrayData();
    };

    _proto.encodeSetRTCData = function encodeSetRTCData(key, value, isInner, apiType, message) {
      var modules = this.codec.getModule(PBName.RtcSetDataInput);
      modules.setInterior(isInner);
      modules.setTarget(apiType);
      modules.setKey(key);
      modules.setValue(value);
      message = message || {};
      var _message = message,
          name = _message.name,
          content = _message.content;
      !utils.isUndefined(name) && modules.setObjectName(name);

      if (!utils.isUndefined(content)) {
        if (utils.isObject(content)) {
          content = utils.toJSON(content);
        }

        modules.setContent(content);
      }

      return modules.getArrayData();
    };

    _proto.encodeUserSetRTCData = function encodeUserSetRTCData(message, valueInfo, objectName) {
      var modules = this.codec.getModule(PBName.RtcUserSetDataInput);
      modules.setObjectName(objectName);
      var val = this.codec.getModule(PBName.RtcValueInfo);
      val.setKey(message.name);
      val.setValue(message.content);
      modules.setContent(val);
      val = this.codec.getModule(PBName.RtcValueInfo);
      val.setKey('uris');
      val.setValue(valueInfo);
      modules.setValueInfo(val);
      return modules.getArrayData();
    };

    _proto.encodeGetRTCData = function encodeGetRTCData(keys, isInner, apiType) {
      var modules = this.codec.getModule(PBName.RtcDataInput);
      modules.setInterior(isInner);
      modules.setTarget(apiType);
      modules.setKey(keys);
      return modules.getArrayData();
    };

    _proto.encodeRemoveRTCData = function encodeRemoveRTCData(keys, isInner, apiType, message) {
      var modules = this.codec.getModule(PBName.RtcDataInput);
      modules.setInterior(isInner);
      modules.setTarget(apiType);
      modules.setKey(keys);
      message = message || {};
      var _message2 = message,
          name = _message2.name,
          content = _message2.content;
      !utils.isUndefined(name) && modules.setObjectName(name);

      if (!utils.isUndefined(content)) {
        if (utils.isObject(content)) {
          content = utils.toJSON(content);
        }

        modules.setContent(content);
      }

      return modules.getArrayData();
    };

    _proto.encodeSetRTCOutData = function encodeSetRTCOutData(data, type, message) {
      var modules = this.codec.getModule(PBName.RtcSetOutDataInput);
      modules.setTarget(type);

      if (!utils.isArray(data)) {
        data = [data];
      }

      utils.forEach(data, function (item, index) {
        item.key = item.key ? item.key.toString() : item.key;
        item.value = item.value ? item.value.toString() : item.value;
        data[index] = item;
      });
      modules.setValueInfo(data);
      message = message || {};
      var _message3 = message,
          name = _message3.name,
          content = _message3.content;
      !utils.isUndefined(name) && modules.setObjectName(name);

      if (!utils.isUndefined(content)) {
        if (utils.isObject(content)) {
          content = utils.toJSON(content);
        }

        modules.setContent(content);
      }

      return modules.getArrayData();
    };

    _proto.ecnodeGetRTCOutData = function ecnodeGetRTCOutData(userIds) {
      var modules = this.codec.getModule(PBName.RtcQryUserOutDataInput);
      modules.setUserId(userIds);
      return modules.getArrayData();
    };

    _proto.encodeSetRTCState = function encodeSetRTCState(content) {
      var modules = this.codec.getModule(PBName.MCFollowInput);
      var report = content.report;
      modules.setId(report);
      return modules.getArrayData();
    };

    _proto.encodeGetRTCRoomInfo = function encodeGetRTCRoomInfo() {
      var modules = this.codec.getModule(PBName.RtcQueryListInput);
      modules.setOrder(2);
      return modules.getArrayData();
    };

    _proto.encodeSetRTCUserInfo = function encodeSetRTCUserInfo(info) {
      var modules = this.codec.getModule(PBName.RtcValueInfo);
      var key = info.key,
          value = info.value;
      modules.setKey(key);
      modules.setValue(value);
      return modules.getArrayData();
    };

    _proto.encodeRemoveRTCUserInfo = function encodeRemoveRTCUserInfo(info) {
      var modules = this.codec.getModule(PBName.RtcKeyDeleteInput);
      var keys = info.keys || [];

      if (!utils.isArray(keys)) {
        keys = [keys];
      }

      modules.setKey(keys);
      return modules.getArrayData();
    };

    _proto.encodeGetFileToken = function encodeGetFileToken(fileType, fileName) {
      var modules = this.codec.getModule(PBName.GetQNupTokenInput);
      modules.setType(fileType);
      modules.setKey(fileName);
      return modules.getArrayData();
    };

    _proto.encodeGetFileUrl = function encodeGetFileUrl(fileType, fileName, originName) {
      var modules = this.codec.getModule(PBName.GetQNdownloadUrlInput);
      modules.setType(fileType);
      modules.setKey(fileName);

      if (originName) {
        modules.setFileName(originName);
      }

      return modules.getArrayData();
    };

    _proto.encodeModifyChatRoomKV = function encodeModifyChatRoomKV(chrm, entry, action, currentUserId) {
      var modules = this.codec.getModule(PBName.SetChrmKV);
      var key = entry.key,
          value = entry.value,
          extra = entry.notificationExtra,
          isSendNotification = entry.isSendNotification;
      var status = common.getChatRoomKVOptStatus(entry, action);
      var serverEntry = {
        key: key,
        status: status,
        value: value || '',
        uid: currentUserId
      };

      if (utils.isEmpty(serverEntry.status)) {
        delete serverEntry.status;
      }

      modules.setEntry(serverEntry);

      if (isSendNotification) {
        var conversation = {
          type: CONVERSATION_TYPE.CHATROOM,
          targetId: chrm.id
        };
        var msgContent = {
          key: key,
          value: value,
          extra: extra,
          type: action
        };
        var msgModule = this.getUpMsgModule(conversation, {
          messageType: MESSAGE_TYPE.CHRM_KV_NOTIFY,
          content: msgContent,
          isPersited: false,
          isCounted: false
        });
        modules.setNotification(msgModule);
        modules.setBNotify(true);
        modules.setType(CONVERSATION_TYPE.CHATROOM);
      }

      return modules.getArrayData();
    };

    _proto.encodePullChatRoomKV = function encodePullChatRoomKV(time) {
      var modules = this.codec.getModule(PBName.QueryChrmKV);
      modules.setTimestamp(time);
      return modules.getArrayData();
    };

    _proto.encodePullUserSetting = function encodePullUserSetting(version) {
      var modules = this.codec.getModule(PBName.PullUserSettingInput);
      modules.setVersion(version);
      return modules.getArrayData();
    };

    _proto.encodeGetConversationStatus = function encodeGetConversationStatus(time) {
      var modules = this.codec.getModule(PBName.SessionReq);
      modules.setTime(time);
      return modules.getArrayData();
    };

    _proto.encodeSetConversationStatus = function encodeSetConversationStatus(statusList) {
      var _this2 = this;

      var modules = this.codec.getModule(PBName.SessionStateModifyReq),
          currentTime = common.DelayTimer.getTime();
      var stateModuleList = [];
      utils.forEach(statusList, function (status) {
        var stateModules = _this2.codec.getModule(PBName.SessionState);

        var type = status.type,
            targetId = status.targetId,
            notificationStatus = status.notificationStatus,
            isTop = status.isTop;
        var stateItemModuleList = [];
        stateModules.setType(type);
        stateModules.setChannelId(targetId);
        stateModules.setTime(currentTime);
        var isNotDisturb = utils.isEqual(notificationStatus, NOTIFICATION_STATUS.DO_NOT_DISTURB);
        var TypeToVal = {};

        if (!utils.isUndefined(notificationStatus)) {
          TypeToVal[CONVERSATION_STATUS_TYPE.DO_NOT_DISTURB] = isNotDisturb;
        }

        if (!utils.isUndefined(isTop)) {
          TypeToVal[CONVERSATION_STATUS_TYPE.TOP] = isTop;
        }

        utils.forEach(TypeToVal, function (val, type) {
          if (!utils.isUndefined(val)) {
            var stateItemModules = _this2.codec.getModule(PBName.SessionStateItem);

            val = val ? CONVERSATION_STATUS_CONFIG.ENABLED : CONVERSATION_STATUS_CONFIG.DISABLED;
            stateItemModules.setSessionStateType(Number(type));
            stateItemModules.setValue(val);
            stateItemModuleList.push(stateItemModules);
          }
        });
        stateModules.setStateItem(stateItemModuleList);
        stateModuleList.push(stateModules);
      });
      modules.setVersion(currentTime);
      modules.setState(stateModuleList);
      return modules.getArrayData();
    };

    return Codec$$1;
  }();

  var DeferHandler$3 = utils.DeferHandler,
      Defer$2 = utils.Defer;
  var SignalId$1 = common.SignalId;

  var ServerEngine = function () {
    function ServerEngine(option) {
      this._transporter = void 0;
      this._serverEventEmitter = new utils.EventEmitter();
      this._deferHandler = new DeferHandler$3();
      this._serverDataCodec = void 0;
      this._selfUserId = void 0;
      this._connectedTime = void 0;
      this.option = void 0;
      var self = this;
      var transporter = new Transporter(option);
      transporter.watchSignal(function (signal) {
        self._handleSignal(signal);
      });
      transporter.watchStatus(function (status) {
        Logger.info(TAG.L_NETWORK_CHANGED_S, status);

        self._handleStatus(status);
      });
      self._serverDataCodec = new Codec$2(option);
      utils.extend(self, {
        _transporter: transporter,
        option: option
      });
    }

    var _proto = ServerEngine.prototype;

    _proto._handleStatus = function _handleStatus(status) {
      if (common.isDisconnected(status)) {
        this.disconnect();
        var currentTime = utils.getCurrentTimestamp();
        var isDisconnectTooFast = currentTime - this._connectedTime < MINIMUM_CONNECT_DURATION;
        var NotSwitchStauts = [TRANSPORTER_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT];

        if (isDisconnectTooFast && !utils.isInclude(NotSwitchStauts, status)) {
          return this._serverEventEmitter.emit(SERVER_EVENT_NAME.STATUS, TRANSPORTER_STATUS.DISCONNECT_TOO_FAST);
        }
      }

      this._serverEventEmitter.emit(SERVER_EVENT_NAME.STATUS, status);
    };

    _proto._handleSignal = function _handleSignal(signal) {
      var self = this;
      var _deferHandler = self._deferHandler;
      var messageId = signal.messageId;

      if (messageId && signal.getIdentifier) {
        var deferId = signal.getIdentifier();

        _deferHandler.resolve(deferId, signal);
      }

      self._handleSignalAck(signal);

      self._dispatchTask(signal);
    };

    _proto._handleSignalAck = function _handleSignalAck(signal) {
      var _transporter = this._transporter;
      var messageId = signal.messageId;
      var isQosNeedAck = signal._header && signal._header.qos !== QOS.AT_MOST_ONCE;

      if (signal instanceof PublishReader && !signal.syncMsg && isQosNeedAck) {
        var writer = new PubAckWriter(messageId);

        _transporter.sendSignal(writer);
      }

      if (signal instanceof QueryAckReader && isQosNeedAck) {
        var _writer = new QueryConWriter(messageId);

        _transporter.sendSignal(_writer);
      }
    };

    _proto._dispatchTask = function _dispatchTask(signal) {
      var self = this;

      if (signal instanceof DisconnectReader) {
        var status = signal.status;
        status = SERVER_DISCONNECT_STATUS_TO_TRANSPORTER_STATUS[status] || status;
        return self._handleStatus(status);
      }

      if (signal instanceof PublishReader) {
        var _PUBLISH_TOPIC$NOTIFY;

        var isSyncMsgSentBySelfOtherClient = signal.syncMsg,
            topic = signal.topic;

        if (isSyncMsgSentBySelfOtherClient) {
          return self._receiveMsgFromOtherDevice(signal);
        }

        var task = (_PUBLISH_TOPIC$NOTIFY = {}, _PUBLISH_TOPIC$NOTIFY[PUBLISH_TOPIC.NOTIFY_PULL_MSG] = self._notifyPullMessage, _PUBLISH_TOPIC$NOTIFY[PUBLISH_TOPIC.RECEIVE_MSG] = self._notifyDirectMessage, _PUBLISH_TOPIC$NOTIFY[PUBLISH_TOPIC.SERVER_NOTIFY] = self._notifyForServer, _PUBLISH_TOPIC$NOTIFY[PUBLISH_TOPIC.SETTING_NOTIFY] = self._notifySettingChanged, _PUBLISH_TOPIC$NOTIFY)[topic] || utils.noop;
        task.call(self, signal);
      }
    };

    _proto._notifyPullMessage = function _notifyPullMessage(signal) {
      var notifyPullConfig = this._serverDataCodec.decodeByPBName(signal.data, PBName.NotifyMsg);

      this._serverEventEmitter.emit(SERVER_EVENT_NAME.NOTIFY_PULL, notifyPullConfig);
    };

    _proto._notifyDirectMessage = function _notifyDirectMessage(signal) {
      var currentUserId = this._selfUserId,
          connectedTime = this._connectedTime;

      var msg = this._serverDataCodec.decodeByPBName(signal.data, PBName.DownStreamMessage, {
        currentUserId: currentUserId,
        connectedTime: connectedTime
      });

      this._serverEventEmitter.emit(SERVER_EVENT_NAME.DIRECT_MSG, msg);
    };

    _proto._notifyForServer = function _notifyForServer(signal) {
      var self = this,
          notifyData = self._serverDataCodec.decodeByPBName(signal.data, PBName.ChrmNotifyMsg),
          type = notifyData.type;

      Logger.info(TAG.P_NOTIFY_CHRM_KV_S, notifyData);

      switch (type) {
        case SERVER_NOTIFY_TYPE.KV_CHANGED:
          self._serverEventEmitter.emit(SERVER_EVENT_NAME.CHRM_KV_CHANGED, notifyData);

          break;

        case SERVER_NOTIFY_TYPE.CONVERSATION_STATUS_CHANGED:
          self._serverEventEmitter.emit(SERVER_EVENT_NAME.CONVERSATION_STATUS_CHANGED, notifyData.time);

          break;

        default:
          break;
      }
    };

    _proto._notifySettingChanged = function _notifySettingChanged(signal) {
      var self = this,
          notifyData = self._serverDataCodec.decodeByPBName(signal.data, PBName.UserSettingNotification);

      self._serverEventEmitter.emit(SERVER_EVENT_NAME.USER_SETTING_CHANGED, notifyData);
    };

    _proto._sendSignal = function _sendSignal(writer, decodePBName, option) {
      var appkey = this.option.appkey,
          _serverDataCodec = this._serverDataCodec;
      var _transporter = this._transporter,
          _deferHandler = this._deferHandler,
          currentUserId = this._selfUserId,
          connectedTime = this._connectedTime;
      var signalId = SignalId$1.get({
        appkey: appkey,
        userId: currentUserId
      });

      if (SignalId$1.isExceedLimit(signalId)) {
        this._handleStatus(TRANSPORTER_STATUS.EXCEED_MESSAGE_ID_LIMIT);

        return utils.Defer.reject(ERROR_INFO.TIMEOUT);
      }

      writer.messageId = signalId;
      var deferId = writer.getIdentifier();
      return utils.deferred(function (resolve, reject) {
        _deferHandler.add(deferId, {
          resolve: resolve,
          reject: reject
        });

        _transporter.sendSignal(writer);
      }).then(function (signal) {
        var status = signal.status,
            data = signal.data;
        var isSuccess = utils.isEqual(status, SUCCESS_CODE);
        var result = isSuccess ? signal : {
          status: SERVER_ERROR_TO_CODE[status] || status
        };

        if (isSuccess && decodePBName) {
          signal.data = _serverDataCodec.decodeByPBName(data, decodePBName, utils.extend({
            signal: signal,
            currentUserId: currentUserId,
            connectedTime: connectedTime
          }, option));
        }

        var exec = isSuccess ? Defer$2.resolve : Defer$2.reject;
        return exec.call(Defer$2, result);
      });
    };

    _proto._sendSignalForData = function _sendSignalForData(writer, decodePBName, option) {
      return this._sendSignal(writer, decodePBName, option).then(function (successSignal) {
        var data = decodePBName ? successSignal.data : undefined;
        return data;
      });
    };

    _proto._receiveMsgFromOtherDevice = function _receiveMsgFromOtherDevice(signal) {
      var self = this;
      var _deferHandler = self._deferHandler,
          currentUserId = self._selfUserId,
          connectType = self.option.connectType,
          _serverDataCodec = self._serverDataCodec;
      var isComet = connectType === CONNECT_TYPE.COMET;
      var data = signal.data,
          topic = signal.topic;

      var msg = _serverDataCodec.decodeByPBName(data, PBName.UpStreamMessage, {
        currentUserId: currentUserId,
        signal: signal
      });

      if (isComet || msg.isStatusMessage) {
        msg.sentTime = common.DelayTimer.getTime();
        return self._serverEventEmitter.emit(SERVER_EVENT_NAME.DIRECT_MSG, msg);
      }

      return utils.deferred(function (resolve, reject) {
        var deferId = signal.getIdentifier();

        _deferHandler.add(deferId, {
          resolve: resolve,
          reject: reject
        });
      }).then(function (ackSignal) {
        msg.messageUId = ackSignal.messageUId;
        msg.sentTime = ackSignal.timestamp;
        return self._serverEventEmitter.emit(SERVER_EVENT_NAME.DIRECT_MSG, msg);
      })["catch"](function (error) {
        Logger.error(TAG.L_DECODE_MSG_E, {
          content: {
            info: 'received msg from other device error',
            error: error,
            topic: topic
          }
        });
      });
    };

    _proto.watch = function watch(events) {
      var self = this;
      events = events || {};
      utils.forEach(events, function (event, eventName) {
        utils.isFunction(event) && self._serverEventEmitter.on(eventName, event);
      });
    };

    _proto.unwatch = function unwatch(events) {
      var self = this;
      events = events || {};
      utils.forEach(events, function (event, eventName) {
        utils.isFunction(event) && self._serverEventEmitter.off(eventName, event);
      });
    };

    _proto.connect = function connect(user, option) {
      var self = this;
      var _transporter = self._transporter;
      return _transporter.connect(user, option).then(function (result) {
        var isConnectSuccess = utils.isEqual(result.status, SUCCESS_CODE);
        return isConnectSuccess ? Defer$2.resolve(result) : Defer$2.reject(result);
      }).then(function (_ref) {
        var userId = _ref.userId,
            timestamp = _ref.timestamp;
        self._selfUserId = userId;
        self._connectedTime = timestamp;
        return {
          id: userId
        };
      }, function (_ref2) {
        var status = _ref2.status;
        var errorInfo = CONNECT_SERVER_STATUS_MAP_ERROR_INFO[status] || {
          code: status
        };
        return utils.Defer.reject(errorInfo);
      });
    };

    _proto.disconnect = function disconnect() {
      var appkey = this.option.appkey;
      var _transporter = this._transporter,
          _selfUserId = this._selfUserId;
      _transporter && _transporter.disconnect();
      SignalId$1.clear({
        appkey: appkey,
        userId: _selfUserId
      });
      return Defer$2.resolve(_selfUserId);
    };

    _proto.getConnectedTime = function getConnectedTime() {
      var connectedTime = this._connectedTime;
      return connectedTime;
    };

    _proto.getServerConfig = function getServerConfig() {
      var _selfUserId = this._selfUserId,
          _serverDataCodec = this._serverDataCodec;

      var data = _serverDataCodec.encodeServerConfParams();

      var writer = new QueryWriter(QUERY_TOPIC.GET_SYNC_TIME, data, _selfUserId);
      return this._sendSignalForData(writer, PBName.SessionsAttOutput);
    };

    _proto.pullMessageList = function pullMessageList(syncMsgArgs, option) {
      var _selfUserId = this._selfUserId,
          _serverDataCodec = this._serverDataCodec;

      var data = _serverDataCodec.encodeSyncMsg(syncMsgArgs);

      var writer = new QueryWriter(QUERY_TOPIC.PULL_MSG, data, _selfUserId);
      writer.setHeaderQos(QOS.AT_LEAST_ONCE);
      return this._sendSignalForData(writer, PBName.DownStreamMessages, option);
    };

    _proto.pullChrmMessageList = function pullChrmMessageList(chatRoomId, time, count, option) {
      time = time || 0;
      count = count || 0;

      var data = this._serverDataCodec.encodeChrmSyncMsg(time, count);

      var writer = new QueryWriter(QUERY_TOPIC.PULL_CHRM_MSG, data, chatRoomId);
      writer.setHeaderQos(QOS.AT_LEAST_ONCE);
      return this._sendSignalForData(writer, PBName.DownStreamMessages, option);
    };

    _proto.sendMessage = function sendMessage(conversation, sendOption, topic) {
      var self = this;
      var currentUserId = self._selfUserId,
          _serverDataCodec = self._serverDataCodec;
      var type = conversation.type,
          targetId = conversation.targetId;
      var isStatusMessage = sendOption.isStatusMessage;
      isStatusMessage = isStatusMessage && common.isSupportStatusMessage(type);
      var publishTopic = topic || CONVERSATION_TYPE_TO_PUBLISH_TOPIC[type] || PUBLISH_TOPIC.PRIVATE;

      if (isStatusMessage && utils.isUndefined(topic)) {
        publishTopic = CONVERSATION_TYPE_TO_PUBLISH_STATUS_TOPIC[type];
      }

      var data = _serverDataCodec.encodeUpMsg(conversation, sendOption);

      var signal = new PublishWriter(publishTopic, data, targetId);
      signal.setHeaderQos(QOS.AT_LEAST_ONCE);

      var msg = _serverDataCodec.decodeByPBName(data, PBName.UpStreamMessage, {
        signal: signal,
        currentUserId: currentUserId
      });

      if (isStatusMessage) {
        self._sendSignal(signal)["catch"](function () {});

        msg.sentTime = common.DelayTimer.getTime();
        return utils.Defer.resolve(msg);
      }

      return self._sendSignal(signal).then(function (_ref3) {
        var messageUId = _ref3.messageUId,
            timestamp = _ref3.timestamp;
        msg.messageUId = messageUId;
        msg.sentTime = timestamp;

        self._serverEventEmitter.emit(SERVER_EVENT_NAME.MESSAGE_SEND, msg);

        return msg;
      });
    };

    _proto.recallMessage = function recallMessage(conversation, message, option) {
      var upMsgArgs = utils.extend(option || {}, message);
      var type = conversation.type,
          targetId = conversation.targetId;
      var messageUId = message.messageUId,
          sentTime = message.sentTime;
      upMsgArgs.messageType = RECALL_MESSAGE_TYPE;
      upMsgArgs.content = {
        conversationType: type,
        targetId: targetId,
        messageUId: messageUId,
        sentTime: sentTime
      };
      return this.sendMessage({
        type: type,
        targetId: this._selfUserId
      }, upMsgArgs, PUBLISH_TOPIC.RECALL);
    };

    _proto.getFileToken = function getFileToken(fileType, fileName) {
      var data = this._serverDataCodec.encodeGetFileToken(fileType, fileName);

      var writer = new QueryWriter(QUERY_TOPIC.GET_UPLOAD_FILE_TOKEN, data, this._selfUserId);
      return this._sendSignalForData(writer, PBName.GetQNupTokenOutput);
    };

    _proto.getFileUrl = function getFileUrl(fileType, fileName, originName) {
      var data = this._serverDataCodec.encodeGetFileUrl(fileType, fileName, originName);

      var writer = new QueryWriter(QUERY_TOPIC.GET_UPLOAD_FILE_URL, data, this._selfUserId);
      return this._sendSignalForData(writer, PBName.GetQNdownloadUrlOutput);
    };

    _proto.getConversationList = function getConversationList(option) {
      var _selfUserId = this._selfUserId,
          _serverDataCodec = this._serverDataCodec;

      var data = _serverDataCodec.encodeGetConversationList(option);

      var writer = new QueryWriter(QUERY_TOPIC.GET_CONVERSATION_LIST, data, _selfUserId);
      return this._sendSignalForData(writer, PBName.RelationsOutput);
    };

    _proto.removeConversationList = function removeConversationList(conversationList) {
      var _selfUserId = this._selfUserId,
          _serverDataCodec = this._serverDataCodec;

      var data = _serverDataCodec.encodeRemoveConversationList(conversationList);

      var writer = new QueryWriter(QUERY_TOPIC.REMOVE_CONVERSATION_LIST, data, _selfUserId);
      return this._sendSignalForData(writer, PBName.DeleteSessionsOutput);
    };

    _proto.removeConversation = function removeConversation(conversation) {
      return this.removeConversationList([conversation]);
    };

    _proto.getHistoryMessages = function getHistoryMessages(conversation, option) {
      var _selfUserId = this._selfUserId,
          _serverDataCodec = this._serverDataCodec;
      var type = conversation.type;
      var historyTopic = CONVERSATION_TYPE_TO_QUERY_HISTORY_TOPIC[type] || QUERY_HISTORY_TOPIC.PRIVATE;

      var data = _serverDataCodec.encodeGetHistoryMsg(conversation, option);

      var writer = new QueryWriter(historyTopic, data, _selfUserId);
      return this._sendSignalForData(writer, PBName.HistoryMsgOuput, {
        conversation: conversation
      });
    };

    _proto.deleteHistoryMessages = function deleteHistoryMessages(conversation, messages) {
      var _selfUserId = this._selfUserId;

      var data = this._serverDataCodec.encodeDeleteMessages(conversation, messages);

      var writer = new QueryWriter(QUERY_TOPIC.DELETE_MESSAGES, data, _selfUserId);
      return this._sendSignalForData(writer);
    };

    _proto.clearHistoryMessages = function clearHistoryMessages(conversation, option) {
      var _selfUserId = this._selfUserId;
      var type = conversation.type;

      var data = this._serverDataCodec.encodeClearMessages(conversation, option);

      var topic = CONVERSATION_TYPE_TO_CLEAR_MESSAGE_TOPIC[type];
      var writer = new QueryWriter(topic, data, _selfUserId);
      return this._sendSignalForData(writer);
    };

    _proto.getTotalUnreadCount = function getTotalUnreadCount() {
      return this.getServerConfig().then(function (_ref4) {
        var totalUnreadCount = _ref4.totalUnreadCount;
        return totalUnreadCount;
      });
    };

    _proto.clearUnreadCount = function clearUnreadCount(conversation, option) {
      var _selfUserId = this._selfUserId;

      var data = this._serverDataCodec.encodeClearUnreadCount(conversation, option);

      var writer = new QueryWriter(QUERY_TOPIC.CLEAR_UNREAD_COUNT, data, _selfUserId);
      return this._sendSignalForData(writer);
    };

    _proto.joinChatRoom = function joinChatRoom(chrm, option) {
      var self = this;
      var id = chrm.id;
      var count = option.count,
          isJoinExist = option.isJoinExist,
          isAutoRejoin = option.isAutoRejoin;

      var data = self._serverDataCodec.encodeJoinOrQuitChatRoom();

      var topic = isJoinExist ? QUERY_TOPIC.JOIN_EXIST_CHATROOM : QUERY_TOPIC.JOIN_CHATROOM;
      var writer = new QueryWriter(topic, data, id);

      self._serverEventEmitter.emit(SERVER_EVENT_NAME.BEFORE_JOIN_CHATROOM, {
        id: id
      });

      return self._sendSignalForData(writer).then(function (result) {
        self._serverEventEmitter.emit(SERVER_EVENT_NAME.JOIN_CHATROOM, {
          id: id,
          count: count,
          isAutoRejoin: isAutoRejoin
        });

        return result;
      });
    };

    _proto.quitChatRoom = function quitChatRoom(chrm) {
      var id = chrm.id;

      var data = this._serverDataCodec.encodeJoinOrQuitChatRoom();

      var writer = new QueryWriter(QUERY_TOPIC.QUIT_CHATROOM, data, id);
      return this._sendSignalForData(writer);
    };

    _proto.getChatRoomInfo = function getChatRoomInfo(chrm, option) {
      var id = chrm.id;

      var data = this._serverDataCodec.encodeGetChatRoomInfo(option);

      var writer = new QueryWriter(QUERY_TOPIC.GET_CHATROOM_INFO, data, id);
      return this._sendSignalForData(writer, PBName.QueryChatRoomInfoOutput);
    };

    _proto.getChatRoomHistoryMessages = function getChatRoomHistoryMessages(chrm, option) {
      var _selfUserId = this._selfUserId,
          _serverDataCodec = this._serverDataCodec;
      var targetId = chrm.id;
      var type = CONVERSATION_TYPE.CHATROOM;
      var conversation = {
        type: type,
        targetId: targetId
      };
      var historyTopic = QUERY_HISTORY_TOPIC.CHATROOM;

      var data = _serverDataCodec.encodeGetHistoryMsg(conversation, option);

      var writer = new QueryWriter(historyTopic, data, _selfUserId);
      return this._sendSignalForData(writer, PBName.HistoryMsgOuput, {
        conversation: conversation
      });
    };

    _proto.modifyChatRoomKV = function modifyChatRoomKV(chrm, entry) {
      var self = this;

      var _selfUserId = self._selfUserId,
          _serverDataCodec = self._serverDataCodec,
          chatRoomId = chrm.id,
          action = entry.type || CHATROOM_ENTRY_TYPE.UPDATE,
          data = _serverDataCodec.encodeModifyChatRoomKV(chrm, entry, action, _selfUserId),
          topic = utils.isEqual(action, CHATROOM_ENTRY_TYPE.DELETE) ? QUERY_TOPIC.DELETE_CHATROOM_KV : QUERY_TOPIC.UPDATE_CHATROOM_KV,
          writer = new QueryWriter(topic, data, chatRoomId);

      return this._sendSignalForData(writer).then(function () {
        self._serverEventEmitter.emit(SERVER_EVENT_NAME.CHRM_KV_SET, {
          id: chatRoomId,
          data: {
            kvEntries: [entry],
            syncTime: common.DelayTimer.getTime()
          }
        });
      });
    };

    _proto.pullChatRoomKV = function pullChatRoomKV(chrm, time) {
      var _serverDataCodec = this._serverDataCodec,
          chatRoomId = chrm.id,
          data = _serverDataCodec.encodePullChatRoomKV(time),
          writer = new QueryWriter(QUERY_TOPIC.PULL_CHATROOM_KV, data, chatRoomId);

      return this._sendSignalForData(writer, PBName.ChrmKVOutput);
    };

    _proto.getUserSettings = function getUserSettings(version) {
      var _serverDataCodec = this._serverDataCodec,
          _selfUserId = this._selfUserId,
          data = _serverDataCodec.encodePullUserSetting(version),
          writer = new QueryWriter(QUERY_TOPIC.PULL_USER_SETTING, data, _selfUserId);

      return this._sendSignalForData(writer, PBName.PullUserSettingOutput);
    };

    _proto.getConversationStatus = function getConversationStatus(time) {
      var _serverDataCodec = this._serverDataCodec,
          _selfUserId = this._selfUserId,
          data = _serverDataCodec.encodeGetConversationStatus(time),
          writer = new QueryWriter(QUERY_TOPIC.GET_CONVERSATION_STATUS, data, _selfUserId);

      return this._sendSignalForData(writer, PBName.SessionStates);
    };

    _proto.setConversationStatusList = function setConversationStatusList(statusList) {
      var self = this;

      var _serverDataCodec = this._serverDataCodec,
          _selfUserId = this._selfUserId,
          data = _serverDataCodec.encodeSetConversationStatus(statusList),
          writer = new QueryWriter(QUERY_TOPIC.SET_CONVERSATION_STATUS, data, _selfUserId);

      return this._sendSignalForData(writer, PBName.SessionStateModifyResp).then(function (_ref5) {
        var version = _ref5.version;
        statusList = utils.map(statusList, function (status) {
          status.updatedTime = version;
          return status;
        });

        self._serverEventEmitter.emit(SERVER_EVENT_NAME.CONVERSATION_STATUS_SETED, statusList);

        return true;
      });
    };

    _proto.joinRTCRoom = function joinRTCRoom(room) {
      var data = this._serverDataCodec.encodeJoinRTCRoom(room);

      var writer = new QueryWriter(QUERY_TOPIC.JOIN_RTC_ROOM, data, room.id);
      return this._sendSignalForData(writer, PBName.RtcUserListOutput);
    };

    _proto.quitRTCRoom = function quitRTCRoom(room) {
      var data = this._serverDataCodec.encodeQuitRTCRoom();

      var writer = new QueryWriter(QUERY_TOPIC.QUIT_RTC_ROOM, data, room.id);
      return this._sendSignalForData(writer);
    };

    _proto.RTCPing = function RTCPing(room) {
      var data = this._serverDataCodec.encodeJoinRTCRoom(room);

      var writer = new QueryWriter(QUERY_TOPIC.PING_RTC, data, room.id);
      return this._sendSignalForData(writer);
    };

    _proto.getRTCRoomInfo = function getRTCRoomInfo(room) {
      var data = this._serverDataCodec.encodeGetRTCRoomInfo();

      var writer = new QueryWriter(QUERY_TOPIC.GET_RTC_ROOM_INFO, data, room.id);
      return this._sendSignalForData(writer, PBName.RtcRoomInfoOutput);
    };

    _proto.getRTCUserInfoList = function getRTCUserInfoList(room) {
      var data = this._serverDataCodec.encodeGetRTCRoomInfo();

      var writer = new QueryWriter(QUERY_TOPIC.GET_RTC_USER_INFO_LIST, data, room.id);
      return this._sendSignalForData(writer, PBName.RtcUserListOutput);
    };

    _proto.setRTCUserInfo = function setRTCUserInfo(room, info) {
      var data = this._serverDataCodec.encodeSetRTCUserInfo(info);

      var writer = new QueryWriter(QUERY_TOPIC.SET_RTC_USER_INFO, data, room.id);
      return this._sendSignalForData(writer);
    };

    _proto.removeRTCUserInfo = function removeRTCUserInfo(room, info) {
      var data = this._serverDataCodec.encodeRemoveRTCUserInfo(info);

      var writer = new PublishWriter(QUERY_TOPIC.DEL_RTC_USER_INFO, data, room.id);
      return this._sendSignalForData(writer);
    };

    _proto.setRTCData = function setRTCData(roomId, key, value, isInner, apiType, message) {
      var data = this._serverDataCodec.encodeSetRTCData(key, value, isInner, apiType, message);

      var writer = new PublishWriter(QUERY_TOPIC.SET_RTC_DATA, data, roomId);
      return this._sendSignalForData(writer);
    };

    _proto.setRTCUserData = function setRTCUserData(roomId, message, valueInfo, objectName) {
      var data = this._serverDataCodec.encodeUserSetRTCData(message, valueInfo, objectName);

      var writer = new PublishWriter(QUERY_TOPIC.USER_SET_RTC_DATA, data, roomId);
      return this._sendSignalForData(writer);
    };

    _proto.getRTCData = function getRTCData(roomId, keys, isInner, apiType) {
      var data = this._serverDataCodec.encodeGetRTCData(keys, isInner, apiType);

      var writer = new QueryWriter(QUERY_TOPIC.GET_RTC_DATA, data, roomId);
      return this._sendSignalForData(writer, PBName.RtcQryOutput);
    };

    _proto.removeRTCData = function removeRTCData(roomId, keys, isInner, apiType, message) {
      var data = this._serverDataCodec.encodeRemoveRTCData(keys, isInner, apiType, message);

      var writer = new PublishWriter(QUERY_TOPIC.DEL_RTC_DATA, data, roomId);
      return this._sendSignalForData(writer);
    };

    _proto.setRTCOutData = function setRTCOutData(roomId, rtcData, type, message) {
      var data = this._serverDataCodec.encodeSetRTCOutData(rtcData, type, message);

      var writer = new PublishWriter(QUERY_TOPIC.SET_RTC_OUT_DATA, data, roomId);
      return this._sendSignalForData(writer);
    };

    _proto.getRTCOutData = function getRTCOutData(roomId, userIds) {
      var data = this._serverDataCodec.ecnodeGetRTCOutData(userIds);

      var writer = new QueryWriter(QUERY_TOPIC.GET_RTC_OUT_DATA, data, roomId);
      return this._sendSignalForData(writer, PBName.RtcUserOutDataOutput);
    };

    _proto.getRTCToken = function getRTCToken(room) {
      var data = this._serverDataCodec.encodeJoinRTCRoom(room);

      var writer = new QueryWriter(QUERY_TOPIC.GET_RTC_TOKEN, data, room.id);
      return this._sendSignalForData(writer, PBName.RtcTokenOutput);
    };

    _proto.setRTCState = function setRTCState(room, content) {
      var data = this._serverDataCodec.encodeSetRTCState(content);

      var writer = new QueryWriter(QUERY_TOPIC.SET_RTC_STATE, data, room.id);
      return this._sendSignalForData(writer);
    };

    _proto.getRTCUserList = function getRTCUserList(room) {
      var data = this._serverDataCodec.encodeGetRTCRoomInfo();

      var writer = new QueryWriter(QUERY_TOPIC.GET_RTC_USER_LIST, data, room.id);
      return this._sendSignalForData(writer, PBName.RtcUserListOutput);
    };

    _proto.getOldServerConfig = function getOldServerConfig(userId) {
      var appkey = this.option.appkey;
      var syncTime = new common.MessageTimeSyner({
        appkey: appkey,
        userId: userId
      }).get();
      return Defer$2.resolve(syncTime);
    };

    _proto.getOldConversationList = function getOldConversationList(option, formatOpt) {
      var self = this;
      var _selfUserId = self._selfUserId;

      var data = self._serverDataCodec.encodeOldConversationList(option);

      var writer = new QueryWriter(QUERY_TOPIC.GET_OLD_CONVERSATION_LIST, data, _selfUserId);
      return self._sendSignalForData(writer, PBName.RelationsOutput, formatOpt);
    };

    _proto.removeOldConversation = function removeOldConversation(conversation) {
      var type = conversation.type,
          targetId = conversation.targetId;

      var data = this._serverDataCodec.encodeOldConversationList({
        type: type
      });

      var writer = new QueryWriter(QUERY_TOPIC.REMOVE_OLD_CONVERSATION, data, targetId);
      return this._sendSignalForData(writer);
    };

    return ServerEngine;
  }();

  var NAVIGATORS = ['nav.cn.ronghub.com', 'nav2-cn.ronghub.com'];
  var MINI_SOCKET_DOMAIN_LIST = ['wsproxy.cn.ronghub.com', 'wsap-cn.ronghub.com'];
  var MINI_COMET_DOMAIN_LIST = ['cometproxy-cn.ronghub.com', 'mini-cn.ronghub.com'];
  var MINI_UPLOAD_DOMAIN_QINIU = 'https://upload.qiniup.com';
  var MINI_UPLOAD_DOMAIN_BOS = 'https://gz.bcebos.com';
  var NETWORK_DETECT_OPTION = {
    url: 'https://cdn.ronghub.com/im_detecting',
    intervalTime: 1500
  };
  var IM_OPTION = {
    connectType: CONNECT_TYPE.WEBSOCKET,
    navigators: NAVIGATORS,
    detect: NETWORK_DETECT_OPTION,
    isOldServer: true,
    isDebug: false
  };
  var GET_MESSAGES_OPTION = {
    count: 20,
    order: MESSAGS_TIME_ORDER.DESC,
    timestrap: 0
  };
  var SEND_MESSAGE_OPTION = {
    isMentiond: false,
    isCounted: true,
    isPersited: true
  };
  var GET_CHATROOM_INFO_OPTION = {
    count: 20,
    order: CHATROOM_ORDER.DESC
  };
  var CHATROOM_NOT_PULL_MSG_COUNT = -1;
  var JOIN_CHATROOM_OPTION = {
    count: CHATROOM_NOT_PULL_MSG_COUNT
  };
  var GET_CHATROOM_MESSAGES = {
    count: 20,
    order: MESSAGS_TIME_ORDER.DESC
  };
  var SEND_MESSAGE_TYPE_OPTION = {
    'RC:TxtMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:ImgMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:VcMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:ImgTextMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:FileMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:HQVCMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:LBSMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:PSImgTxtMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:PSMultiImgTxtMsg': {
      isCounted: true,
      isPersited: true
    },
    'RCJrmf:RpMsg': {
      isCounted: true,
      isPersited: true
    },
    'RCJrmf:RpOpendMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:CombineMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:InfoNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:ContactNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:ProfileNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:CmdNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:GrpNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:RcCmd': {
      isCounted: false,
      isPersited: true
    },
    'RC:CmdMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:TypSts': {
      isCounted: false,
      isPersited: false
    },
    'RC:PSCmd': {
      isCounted: false,
      isPersited: false
    },
    'RC:SRSMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:RRReqMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:RRRspMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsChaR': {
      isCounted: false,
      isPersited: false
    },
    'RC:CSCha': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsEva': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsContact': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsHs': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsHsR': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsSp': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsEnd': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsUpdate': {
      isCounted: false,
      isPersited: false
    },
    'RC:ReadNtf': {
      isCounted: false,
      isPersited: false
    },
    'RC:chrmKVNotiMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCAccept': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCRinging': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCSummary': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCHangup': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCInvite': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCModifyMedia': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCModifyMem': {
      isCounted: false,
      isPersited: false
    }
  };
  var BASE_NAVI_RESP = {
    isFixedNaviResp: true,
    code: 300,
    userId: '',
    server: '',
    backupServer: '',
    voipCallInfo: '{"strategy":1,"callEngine":[{"engineType":4,"mediaServer":"https://rtc-info.ronghub.com","maxStreamCount":20},{"engineType":3,"vendorKey":"","signKey":"","blinkCMPServer":"rtccmp.ronghub.com:80","blinkSnifferServer":"rtccmp.ronghub.com:80"}]}',
    kvStorage: 1,
    uploadServer: 'upload.qiniup.com',
    openMp: 1,
    openUS: 1,
    logSwitch: 1,
    logPolicy: '{"url": "logcollection.ronghub.com","level": 1,"itv": 6,"times": 5}',
    bosAddr: 'gz.bcebos.com',
    joinMChrm: true,
    activeServer: '',
    alone: true,
    chatroomMsg: true,
    compDays: 0,
    errorMessage: '',
    extkitSwitch: 1,
    gifSize: 2048,
    grpMsgLimit: 1,
    historyMsg: true,
    isFormatted: 1,
    location: '',
    monitor: 0,
    msgAck: '',
    offlinelogserver: '',
    onlinelogserver: '',
    openHttpDNS: true,
    qnAddr: '',
    videoTimes: 120,
    voipServer: ''
  };
  var CMP_HOST_HTTPS = {
    backupServer: 'wsap-cn.ronghub.com:443'
  };
  var CMP_HOST_HTTP = {
    backupServer: 'wsap-cn.ronghub.com:80'
  };

  var RCStorage$1 = common.RCStorage;

  var LocalNaviHandler = function () {
    function LocalNaviHandler(option) {
      this.storage = void 0;
      this.option = void 0;
      var appkey = option.appkey,
          token = option.token;
      var UID = common.getUIDByToken(token);
      var KEY = utils.tplEngine(STORAGE_NAVI.ROOT_KEY_TPL, {
        appkey: appkey,
        UID: UID
      });
      this.storage = new RCStorage$1(KEY);
      this.option = option;
    }

    var _proto = LocalNaviHandler.prototype;

    _proto.set = function set(resp) {
      var connectType = this.option.connectType;
      this.storage.set(STORAGE_NAVI.SUB_KEY.CONNECT_TYPE, connectType);
      this.storage.set(STORAGE_NAVI.SUB_KEY.TIME_WHEN_SAVED, utils.getCurrentTimestamp());
      this.storage.set(STORAGE_NAVI.SUB_KEY.RESPONSE, resp);
    };

    _proto.clear = function clear() {
      this.storage.clear();
    };

    _proto.getResp = function getResp() {
      return this.storage.get(STORAGE_NAVI.SUB_KEY.RESPONSE);
    };

    _proto.isValid = function isValid() {
      var storage = this.storage,
          connectType = this.option.connectType;
      var resp = this.getResp();

      if (utils.isEmpty(resp)) {
        return false;
      }

      var oldConnectType = storage.get(STORAGE_NAVI.SUB_KEY.CONNECT_TYPE);
      var timeWhenSaved = storage.get(STORAGE_NAVI.SUB_KEY.TIME_WHEN_SAVED);
      var isSameConnectType = utils.isEqual(oldConnectType, connectType);
      var isNotExpired = utils.getCurrentTimestamp() - timeWhenSaved < NAVI_EXPIRED_TIME;
      return isSameConnectType && isNotExpired;
    };

    return LocalNaviHandler;
  }();

  var getNaviUrl = function getNaviUrl(url, option) {
    var appkey = option.appkey,
        connectType = option.connectType,
        token = option.token;
    var encodeToken = utils.encodeURI(token);
    var protocol = env.protocol.http;
    var type = connectType === CONNECT_TYPE.COMET ? NAVI_TYPE.COMET : NAVI_TYPE.WEBSOCKET;
    var random = utils.getCurrentTimestamp();
    url = utils.getValidUrl(url);
    var naviUrlOption = {
      protocol: protocol,
      url: url,
      type: type,
      appkey: appkey,
      random: random,
      token: encodeToken
    };
    return utils.tplEngine(NAVI_URL_TPL, naviUrlOption);
  };

  var parseNaviResponse = function parseNaviResponse(responseText) {
    var startText = NAVI_CALLBACK_NAME + '(';
    var endText = ')';
    var startIndex = utils.indexOf(responseText, startText) + startText.length;
    var endIndex = utils.lastIndexOf(responseText, endText);

    if (startIndex === -1 || endIndex === -1) {
      return utils.parseJSON(responseText);
    }

    var response = utils.substring(responseText, startIndex, endIndex);

    if (utils.isValidJSON(response)) {
      return utils.parseJSON(response);
    } else {
      return {};
    }
  };

  var getMiniNavi = function getMiniNavi(option) {
    var connectType = option.connectType;
    var isComet = utils.isEqual(connectType, CONNECT_TYPE.COMET);
    var CmpDomainList = isComet ? MINI_COMET_DOMAIN_LIST : MINI_SOCKET_DOMAIN_LIST;
    var naviResp = {
      backupServer: CmpDomainList.join(DOMAIN_SEPARATOR_IN_CMPLIST),
      uploadServer: MINI_UPLOAD_DOMAIN_QINIU,
      bosAddr: MINI_UPLOAD_DOMAIN_BOS
    };
    return utils.Defer.resolve(naviResp);
  };

  var getNaviRespByWS = function getNaviRespByWS(navi) {
    var protocol = env.protocol.http;
    var optionCMP = protocol === HTTP_PROTOCOL.HTTP ? CMP_HOST_HTTP : CMP_HOST_HTTPS;
    return utils.extend(navi, optionCMP);
  };

  var getPreparedNaviResp = function getPreparedNaviResp(option) {
    var appkey = option.appkey;
    var naviResp = BASE_NAVI_RESP;
    var voipCallInfo = naviResp.voipCallInfo;

    try {
      var parseVoipCallInfo = utils.parseJSON(voipCallInfo);
      utils.forEach(parseVoipCallInfo.callEngine, function (item) {
        if (item.engineType === 3) {
          item.vendorKey = appkey;
        }
      });
      var jsonVoipCallInfo = utils.toJSON(parseVoipCallInfo);
      naviResp.voipCallInfo = jsonVoipCallInfo;
    } catch (error) {}

    return getNaviRespByWS(naviResp);
  };

  var NaviManager = function () {
    function NaviManager(option) {
      this.option = void 0;
      this.localNaviHandler = void 0;
      this.option = option;
      this.localNaviHandler = new LocalNaviHandler(option);
    }

    var _proto2 = NaviManager.prototype;

    _proto2.get = function get() {
      var self = this;
      var option = self.option,
          localNaviHandler = self.localNaviHandler;
      var navigators = option.navigators,
          token = option.token,
          connectType = option.connectType;

      if (env.isMini) {
        return getMiniNavi(option).then(function (miniNaviResp) {
          localNaviHandler.set(miniNaviResp);
          return utils.Defer.resolve(miniNaviResp);
        });
      }

      Logger.info(TAG.L_GET_NAVI_T, {
        navigators: navigators,
        token: token
      });
      var localConfigForNavi = self.getLocalConfig();

      if (localNaviHandler.isValid()) {
        Logger.info(TAG.L_GET_NAVI_R, {
          content: {
            info: 'local navi',
            localConfigForNavi: localConfigForNavi
          }
        });
        return utils.Defer.resolve(localConfigForNavi);
      }

      var naviListInToken = common.getNaviListByToken(token);
      navigators = naviListInToken.concat(navigators);
      option.token = common.getValidToken(token);
      var urlList = utils.map(navigators, function (url) {
        return getNaviUrl(url, option);
      });
      return utils.requestByUrlList(urlList).then(function (_ref) {
        var responseText = _ref.responseText;
        Logger.info(TAG.L_GET_NAVI_R, {
          content: {
            info: 'remote navi',
            responseText: responseText
          }
        });
        var resp = parseNaviResponse(responseText);
        var code = resp.code,
            isFixedNaviResp = resp.isFixedNaviResp;
        var isSuccess = code === NAVI_REQUEST_SUCCESS_CODE;

        if (isSuccess) {
          localNaviHandler.set(resp);
          return resp;
        } else if (resp && code) {
          var error = utils.extendInShallow(NAVI_ERROR_INFO[code], {
            msg: resp.errorMessage
          });
          return utils.Defer.reject(error);
        } else if (isFixedNaviResp) {
          if (connectType === CONNECT_TYPE.COMET) {
            return utils.Defer.reject(ERROR_INFO.NAVI_REQUEST_ERROR);
          }

          var naviResp = getPreparedNaviResp(option);
          localNaviHandler.set(naviResp);
          return naviResp;
        } else {
          return utils.Defer.reject(utils.extendInShallow(ERROR_INFO.NAVI_REQUEST_ERROR, {
            error: responseText
          }));
        }
      }, function (error) {
        return utils.Defer.reject(utils.extendInShallow(ERROR_INFO.NAVI_REQUEST_ERROR, {
          error: error
        }));
      });
    };

    _proto2.setLocalConfig = function setLocalConfig(config) {
      if (utils.isObject(config)) {
        var localConf = this.getLocalConfig() || {};
        var newConf = utils.extend(localConf, config);
        this.localNaviHandler.set(newConf);
      }
    };

    _proto2.getLocalConfig = function getLocalConfig() {
      return this.localNaviHandler.getResp();
    };

    _proto2.clear = function clear() {
      var option = this.option;
      var localNaviHanlder = new LocalNaviHandler(option);
      localNaviHanlder.clear();
    };

    return NaviManager;
  }();

  var CMPManager = function () {
    function CMPManager() {
      this.cmpDomainList = [];
      this.invalidDomainList = [];
      this.option = void 0;
    }

    var _proto = CMPManager.prototype;

    _proto.setDomainList = function setDomainList(cmpDomainList, option) {
      this.cmpDomainList = cmpDomainList;
      this.option = option || {};
    };

    _proto.getFaster = function getFaster() {
      var cmpDomainList = this.cmpDomainList,
          invalidDomainList = this.invalidDomainList,
          option = this.option;
      var sniffUrlList = utils.filter(cmpDomainList, function (domain) {
        return !utils.isInclude(invalidDomainList, domain);
      });
      sniffUrlList = utils.map(sniffUrlList, function (domain) {
        var timestamp = utils.getCurrentTimestamp();
        var url = domain + "/ping?r=" + timestamp;
        return utils.getValidUrl(url, option);
      });

      if (utils.isEmpty(sniffUrlList)) {
        return utils.Defer.reject(ERROR_INFO.CMP_REQUEST_ERROR);
      }

      return utils.requestForFaster(sniffUrlList, {
        timeInterval: CMP_SNIFF_INTERNAL_TIME
      }).then(function (_ref) {
        var url = _ref.url,
            index = _ref.index;
        return {
          url: url,
          index: index,
          domain: utils.getDomainByUrl(url)
        };
      })["catch"](function () {
        return utils.Defer.reject(ERROR_INFO.CMP_REQUEST_ERROR);
      });
    };

    _proto.addInvalid = function addInvalid(domain) {
      this.invalidDomainList.push(domain);
    };

    _proto.clearInvalid = function clearInvalid() {
      this.invalidDomainList.length = 0;
    };

    _proto.isAllInvalid = function isAllInvalid() {
      var cmpDomainList = this.cmpDomainList,
          invalidDomainList = this.invalidDomainList;
      return utils.isEqual(cmpDomainList.length, invalidDomainList.length);
    };

    return CMPManager;
  }();

  var _STORAGE_KEY_MAP_CONV;
  var SUB_KEY = STORAGE_CONVERSATION.SUB_KEY;
  var STORAGE_KEY_MAP_CONVERSATION = (_STORAGE_KEY_MAP_CONV = {}, _STORAGE_KEY_MAP_CONV[SUB_KEY.UNREAD_COUNT] = {
    keyName: 'unreadMessageCount',
    defaultVal: 0
  }, _STORAGE_KEY_MAP_CONV[SUB_KEY.HAS_MENTIOND] = {
    keyName: 'hasMentiond',
    defaultVal: false
  }, _STORAGE_KEY_MAP_CONV[SUB_KEY.MENTIOND_INFO] = {
    keyName: 'mentiondInfo',
    defaultVal: null
  }, _STORAGE_KEY_MAP_CONV[SUB_KEY.UNREAD_LAST_TIME] = {
    keyName: 'lastUnreadTime',
    defaultVal: 0
  }, _STORAGE_KEY_MAP_CONV[SUB_KEY.NOTIFICATION] = {
    keyName: 'notificationStatus',
    defaultVal: NOTIFICATION_STATUS.NOTIFY
  }, _STORAGE_KEY_MAP_CONV[SUB_KEY.TOP] = {
    keyName: 'isTop',
    defaultVal: false
  }, _STORAGE_KEY_MAP_CONV);
  var conversationKeyMapStorageKey = {};
  utils.forEach(STORAGE_KEY_MAP_CONVERSATION, function (_ref, storeKey) {
    var keyName = _ref.keyName;
    conversationKeyMapStorageKey[keyName] = storeKey;
  });
  var CONVERSATION_KEY_MAP_STORAGE_KEY = conversationKeyMapStorageKey;

  var ConversationStore = function () {
    function ConversationStore(option) {
      this._storage = void 0;
      var StorageKey = utils.tplEngine(STORAGE_CONVERSATION.ROOT_KEY_TPL, option);
      this._storage = new common.RCStorage(StorageKey);
    }

    var _proto = ConversationStore.prototype;

    _proto.set = function set(option, conversation) {
      conversation = conversation || {};
      var key = common.getConversationKey(option);
      var local = this._storage.get(key) || {};
      utils.forEach(conversation, function (val, key) {
        var storageKey = CONVERSATION_KEY_MAP_STORAGE_KEY[key];

        if (utils.isUndefined(storageKey) || utils.isUndefined(val)) {
          return;
        }

        var defaultVal = STORAGE_KEY_MAP_CONVERSATION[storageKey].defaultVal;

        if (utils.isEqual(defaultVal, val)) {
          delete local[storageKey];
        } else {
          local[storageKey] = val;
        }
      });

      if (!local[SUB_KEY.UNREAD_COUNT]) {
        delete local[SUB_KEY.UNREAD_LAST_TIME];
      }

      if (utils.isEmpty(local)) {
        this._storage.remove(key);
      } else {
        this._storage.set(key, local);
      }
    };

    _proto.get = function get(option) {
      var key = common.getConversationKey(option),
          local = this._storage.get(key) || {};
      var conversation = {};
      utils.forEach(STORAGE_KEY_MAP_CONVERSATION, function (val, key) {
        var keyName = val.keyName,
            defaultVal = val.defaultVal;
        conversation[keyName] = local[key] || defaultVal;
      });
      return conversation;
    };

    _proto.getValues = function getValues(event) {
      var setEvent = event || utils.noop;
      var values = this._storage.getValues() || {};
      var storeConversationList = [];
      utils.forEach(values, function (store, key) {
        var _common$getConversati = common.getConversationByKey(key),
            type = _common$getConversati.type,
            targetId = _common$getConversati.targetId;

        var conversation = {};
        utils.forEach(store, function (val, storeKey) {
          var _ref2 = STORAGE_KEY_MAP_CONVERSATION[storeKey] || {},
              keyName = _ref2.keyName,
              defaultVal = _ref2.defaultVal;

          conversation[keyName] = val || defaultVal;
        });
        conversation = utils.extend(conversation, {
          type: type,
          targetId: targetId
        });
        conversation = setEvent(conversation);
        storeConversationList.push(conversation);
      });
      return storeConversationList;
    };

    return ConversationStore;
  }();

  var PullQueueManager = function () {
    function PullQueueManager(option) {
      this.isLoading = false;
      this._queue = new utils.Queue();
      this._option = void 0;
      option = option || {};
      this._option = option;
    }

    var _proto = PullQueueManager.prototype;

    _proto._execEvent = function _execEvent() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = this;

      var _this$_option = this._option,
          event = _this$_option.event,
          thisArg = _this$_option.thisArg,
          onBefore = this._option.onBefore || function () {
        return args;
      },
          onFinished = this._option.onFinished || utils.noop,
          onError = this._option.onError || utils.noop;

      onBefore.apply(void 0, args);
      self.isLoading = true;
      return event.apply(thisArg, args).then(function (result) {
        self.isLoading = false;
        onFinished.apply(void 0, [result].concat(args));
      })["catch"](function (error) {
        self.isLoading = false;
        onError(error);
      });
    };

    _proto.pull = function pull() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._queue.add({
        event: this._execEvent,
        args: args,
        thisArg: this
      });
    };

    return PullQueueManager;
  }();

  var EventName = {
    CHANGED: 'changed'
  };

  var ConversationStatusManager = function () {
    function ConversationStatusManager(serverEngine) {
      var _serverEngine$watch;

      this._serverEngine = void 0;
      this._eventEmitter = new utils.EventEmitter();
      this._timeStorage = void 0;
      this._handleSetConversationStatus = void 0;
      this._handleConversationStatusChanged = void 0;
      var self = this,
          userId = serverEngine._selfUserId,
          appkey = serverEngine.option.appkey,
          storageKey = utils.tplEngine(STORAGE_CONVERSATION_STATUS.ROOT_KEY_TPL, {
        appkey: appkey,
        userId: userId
      }),
          timeStorage = new common.RCStorage(storageKey),
          firstPullTime = timeStorage.get(STORAGE_CONVERSATION_STATUS.SUB_KEY.TIME) || 0;
      var pullQueue = new PullQueueManager({
        event: self.pull,
        thisArg: self,
        onFinished: function onFinished(list) {
          self._set(list);
        }
      });

      self._handleConversationStatusChanged = function (time) {
        pullQueue.pull(time);
      };

      self._handleSetConversationStatus = function (list) {
        self._set(list);
      };

      self._timeStorage = timeStorage;
      self._serverEngine = serverEngine;
      serverEngine.watch((_serverEngine$watch = {}, _serverEngine$watch[SERVER_EVENT_NAME.CONVERSATION_STATUS_CHANGED] = self._handleConversationStatusChanged, _serverEngine$watch[SERVER_EVENT_NAME.CONVERSATION_STATUS_SETED] = self._handleSetConversationStatus, _serverEngine$watch));
      pullQueue.pull(firstPullTime);
    }

    var _proto = ConversationStatusManager.prototype;

    _proto.watchChanged = function watchChanged(event) {
      this._eventEmitter.on(EventName.CHANGED, event);
    };

    _proto.close = function close() {
      var _this$_serverEngine$u;

      this._serverEngine.unwatch((_this$_serverEngine$u = {}, _this$_serverEngine$u[SERVER_EVENT_NAME.CONVERSATION_STATUS_CHANGED] = this._handleConversationStatusChanged, _this$_serverEngine$u[SERVER_EVENT_NAME.CONVERSATION_STATUS_SETED] = this._handleSetConversationStatus, _this$_serverEngine$u));
    };

    _proto.pull = function pull(newPullTime) {
      if (common.getConnectType(this._serverEngine.option) === CONNECT_TYPE.COMET) {
        return utils.Defer.reject();
      }

      var time = this._timeStorage.get(STORAGE_CONVERSATION_STATUS.SUB_KEY.TIME) || 0;

      if (newPullTime >= time) {
        return this._serverEngine.getConversationStatus(time);
      } else {
        return utils.Defer.reject();
      }
    };

    _proto._set = function _set(list) {
      var self = this;

      if (utils.isUndefined(list)) {
        return;
      }

      var time = self._timeStorage.get(STORAGE_CONVERSATION_STATUS.SUB_KEY.TIME) || 0;
      var listCount = list.length;
      utils.forEach(list, function (statusItem, index) {
        var updatedTime = statusItem.updatedTime || 0;
        time = updatedTime > time ? updatedTime : time;

        self._eventEmitter.emit(EventName.CHANGED, {
          statusItem: statusItem,
          isLastInAPull: index === listCount - 1
        });
      });

      self._timeStorage.set(STORAGE_CONVERSATION_STATUS.SUB_KEY.TIME, time);
    };

    return ConversationStatusManager;
  }();

  var EventName$1 = {
    CHANGED: 'conversationChanged'
  };

  var ConversationManager = function () {
    function ConversationManager(option, serverEngine) {
      this._selfUserId = void 0;
      this._store = void 0;
      this._eventEmitter = new utils.EventEmitter();
      this._statusManager = void 0;
      this._allConversationList = [];
      this._updatedConversations = {};
      var self = this;
      var statusManager = new ConversationStatusManager(serverEngine);
      statusManager.watchChanged(function (_ref) {
        var statusItem = _ref.statusItem,
            isLastInAPull = _ref.isLastInAPull;

        self._addStatus(statusItem, isLastInAPull);
      });
      self._store = new ConversationStore(option);
      self._selfUserId = option.userId;
      self._statusManager = statusManager;
    }

    var _proto = ConversationManager.prototype;

    _proto.watch = function watch(events) {
      var conversation = events.conversation;

      this._eventEmitter.on(EventName$1.CHANGED, conversation);
    };

    _proto.addMessage = function addMessage(msgArgs) {
      var self = this;
      var message = msgArgs.message,
          isLastInAPull = msgArgs.isLastInAPull,
          type = message.type,
          isPersited = message.isPersited,
          isSaveConversationType = utils.isInclude(TYPE_HAS_CONVERSATION, type);

      if (!isSaveConversationType) {
        return;
      }

      var hasChanged = false;

      var storageConversation = self._store.get(message);

      var calcEvents = [self._setUnreadCount, self._setMentiondInfo];
      utils.forEach(calcEvents, function (event) {
        var _event$call = event.call(self, message, storageConversation),
            hasCalcChanged = _event$call.hasChanged,
            conversation = _event$call.conversation;

        hasChanged = hasChanged || hasCalcChanged;
        storageConversation = conversation;
      });

      if (hasChanged) {
        self._store.set(message, storageConversation);
      }

      if (isPersited) {
        var conversation = self._getConversationByMessage(message);

        conversation.updatedItems = {
          latestMessage: {
            time: message.sentTime,
            val: message
          }
        };

        self._setUpdatedConversation(conversation);
      }

      var isNeedNotifyUpdate = utils.isUndefined(isLastInAPull) ? true : isLastInAPull;

      if (isNeedNotifyUpdate) {
        self._notifyConversationChanged();
      }
    };

    _proto.get = function get(option) {
      var conversation = this._store.get(option);

      var notificationStatus = conversation.notificationStatus,
          isNotDisturb = utils.isEqual(notificationStatus, NOTIFICATION_STATUS.DO_NOT_DISTURB);

      if (isNotDisturb) {
        conversation.unreadMessageCount = 0;
      }

      return conversation;
    };

    _proto.read = function read(option) {
      var self = this,
          type = option.type,
          targetId = option.targetId,
          _store = self._store,
          _updatedConversations = self._updatedConversations,
          key = common.getConversationKey(option),
          updatedConversation = _updatedConversations[key] || {};
      var storeConversation = _store.get(option) || {},
          _storeConversation = storeConversation,
          unreadMessageCount = _storeConversation.unreadMessageCount,
          hasMentiond = _storeConversation.hasMentiond;

      if (unreadMessageCount || hasMentiond) {
        var updatedTime = common.DelayTimer.getTime();
        var updatedValues = {
          type: type,
          targetId: targetId,
          unreadMessageCount: 0,
          hasMentiond: false,
          mentiondInfo: null,
          updatedItems: {
            unreadMessageCount: {
              time: updatedTime,
              val: 0
            },
            hasMentiond: {
              time: updatedTime,
              val: false
            },
            mentiondInfo: {
              time: updatedTime,
              val: null
            }
          }
        };
        storeConversation = utils.extendAllowNull(storeConversation, updatedValues);

        _store.set(option, storeConversation);

        _updatedConversations[key] = utils.extendAllowNull(updatedConversation, updatedValues);

        self._notifyConversationChanged();
      }
    };

    _proto.getTotalUnreadCount = function getTotalUnreadCount() {
      var _store = this._store,
          conversationList = _store.getValues();

      var totalCount = 0;
      utils.forEach(conversationList, function (_ref2) {
        var unreadMessageCount = _ref2.unreadMessageCount;
        unreadMessageCount = utils.isNumber(unreadMessageCount) ? unreadMessageCount : 0;
        totalCount += unreadMessageCount;
      });
      return totalCount;
    };

    _proto.getUnreadCount = function getUnreadCount(option) {
      var _store = this._store;
      var storeConversation = _store.get(option) || {};
      var unreadMessageCount = storeConversation.unreadMessageCount;
      var count = utils.isNumber(unreadMessageCount) ? unreadMessageCount : 0;
      return count;
    };

    _proto.close = function close() {
      this._statusManager.close();
    };

    _proto._getConversationByMessage = function _getConversationByMessage(message) {
      var type = message.type,
          targetId = message.targetId,
          storeConversation = this._store.get(message);

      var conversation = utils.extend(storeConversation, {
        type: type,
        targetId: targetId,
        latestMessage: message
      });
      return conversation;
    };

    _proto._getUpdatedConversationList = function _getUpdatedConversationList() {
      var self = this,
          updatedConversations = self._updatedConversations,
          list = [];
      utils.forEach(updatedConversations, function (conversation) {
        var storageItems = self._store.get(conversation);

        utils.forEach(storageItems, function (val, key) {
          conversation[key] = val;
        });
        list.push(conversation);
      });
      return common.sortConList(list);
    };

    _proto._setUnreadCount = function _setUnreadCount(message, conversation) {
      var content = message.content,
          messageType = message.messageType,
          sentTime = message.sentTime,
          isCounted = message.isCounted,
          messageDirection = message.messageDirection,
          senderUserId = message.senderUserId,
          isSelfSend = utils.isEqual(messageDirection, MESSAGE_DIRECTION.SEND) || utils.isEqual(senderUserId, this._selfUserId),
          isRecall = utils.isEqual(messageType, RECALL_MESSAGE_TYPE),
          hasContent = utils.isObject(content);
      var hasChanged = false;
      var lastUnreadTime = conversation.lastUnreadTime || 0,
          unreadMessageCount = conversation.unreadMessageCount || 0,
          hasBeenAdded = lastUnreadTime > sentTime;

      if (hasBeenAdded || isSelfSend) {
        return {
          hasChanged: hasChanged,
          conversation: conversation
        };
      }

      if (isCounted) {
        conversation.unreadMessageCount = unreadMessageCount + 1;
        conversation.lastUnreadTime = sentTime;
        hasChanged = true;
      }

      if (isRecall && hasContent) {
        var isNotRead = lastUnreadTime >= content.sentTime;

        if (isNotRead && unreadMessageCount) {
          conversation.unreadMessageCount = unreadMessageCount - 1;
          hasChanged = true;
        }
      }

      return {
        hasChanged: hasChanged,
        conversation: conversation
      };
    };

    _proto._setMentiondInfo = function _setMentiondInfo(message, conversation) {
      var content = message.content,
          messageDirection = message.messageDirection,
          isMentiond = message.isMentiond,
          isSelfSend = utils.isEqual(messageDirection, MESSAGE_DIRECTION.SEND),
          hasContent = utils.isObject(content);
      var hasChanged = false;

      if (isSelfSend) ; else if (isMentiond && hasContent && content.mentionedInfo) {
        conversation.hasMentiond = true;
        conversation.mentiondInfo = content.mentionedInfo;
        hasChanged = true;
      }

      return {
        hasChanged: hasChanged,
        conversation: conversation
      };
    };

    _proto._setUpdatedConversation = function _setUpdatedConversation(conversation) {
      if (utils.isObject(conversation) && conversation.targetId && conversation.type) {
        var self = this,
            cacheKey = common.getConversationKey(conversation),
            cacheConversation = self._updatedConversations[cacheKey];
        self._updatedConversations[cacheKey] = utils.extendAllowNull(cacheConversation, conversation);
      }
    };

    _proto._notifyConversationChanged = function _notifyConversationChanged() {
      var self = this,
          _eventEmitter = self._eventEmitter,
          updatedConversationList = self._getUpdatedConversationList();

      if (utils.isEmpty(updatedConversationList)) ; else {
        utils.setTimeout(function () {
          _eventEmitter.emit(EventName$1.CHANGED, {
            updatedConversationList: updatedConversationList
          });

          self._updatedConversations = {};
        }, 0);
      }
    };

    _proto._addStatus = function _addStatus(conversationStatus, isLastInAPull) {
      var type = conversationStatus.type,
          targetId = conversationStatus.targetId,
          updatedTime = conversationStatus.updatedTime,
          notificationStatus = conversationStatus.notificationStatus,
          isTop = conversationStatus.isTop,
          option = {
        type: type,
        targetId: targetId
      };
      var updatedItems = {};

      if (!utils.isUndefined(notificationStatus)) {
        updatedItems['notificationStatus'] = {
          time: updatedTime,
          val: notificationStatus
        };
      }

      if (!utils.isUndefined(isTop)) {
        updatedItems['isTop'] = {
          time: updatedTime,
          val: isTop
        };
      }

      this._setUpdatedConversation({
        type: type,
        targetId: targetId,
        updatedItems: updatedItems
      });

      this._store.set(option, {
        notificationStatus: notificationStatus,
        isTop: isTop
      });

      if (isLastInAPull) {
        this._notifyConversationChanged();
      }
    };

    return ConversationManager;
  }();

  var MessageTimeSyner$1 = common.MessageTimeSyner,
      ChatRoomMessageTimeSyner$1 = common.ChatRoomMessageTimeSyner;
  var EVENT_NAME$1 = {
    MESSAGE_RECEIVED: 'msg-received'
  };

  var MessagePullManager = function () {
    function MessagePullManager(serverEngine, option) {
      var _serverEngine$watch;

      this._serverEngine = void 0;
      this._pullQueue = void 0;
      this._messageTimeSyner = void 0;
      this._chatRoomMessageTimeSyner = void 0;
      this._eventEmitter = new utils.EventEmitter();
      this._pullMessageTimer = new utils.Timer({
        type: TIMER_TYPE.INTERVAL,
        timeout: PULL_MSG_TIME
      });
      this._sentMsgCacheInPulling = {};
      this._handleDirectMessage = void 0;
      this._handleNotifyPull = void 0;
      this._handleJoinChatRoom = void 0;
      this._handleSendMessage = void 0;
      var self = this;
      var appkey = serverEngine.option.appkey,
          userId = serverEngine._selfUserId;
      var startSyncTime = option.startSyncTime;
      var pullQueue = new PullQueueManager({
        event: this._pullEvent,
        thisArg: this,
        onFinished: function onFinished() {},
        onError: function onError() {}
      });

      self._handleDirectMessage = function (message) {
        !pullQueue.isLoading && self.notifyMessage({
          message: message,
          hasMore: false
        });
      };

      self._handleNotifyPull = function (option) {
        pullQueue.pull(option);
      };

      self._handleJoinChatRoom = function (_ref) {
        var id = _ref.id,
            count = _ref.count,
            isAutoRejoin = _ref.isAutoRejoin;

        if (utils.isEqual(count, CHATROOM_NOT_PULL_MSG_COUNT)) {
          self._chatRoomMessageTimeSyner.set(id, common.DelayTimer.getTime());
        } else {
          var type = PULL_MSG_TYPE.CHATROOM,
              chrmId = id;
          var time = isAutoRejoin ? self._chatRoomMessageTimeSyner.get(id) + 1 : 0;

          self._chatRoomMessageTimeSyner.set(id, time);

          pullQueue.pull({
            type: type,
            time: time,
            chrmId: chrmId,
            count: count
          });
        }
      };

      self._handleSendMessage = function (message) {
        pullQueue.isLoading ? self._setSentMsgCacheInPulling(message) : self._setPullTime(message);
      };

      serverEngine.watch((_serverEngine$watch = {}, _serverEngine$watch[SERVER_EVENT_NAME.DIRECT_MSG] = self._handleDirectMessage, _serverEngine$watch[SERVER_EVENT_NAME.NOTIFY_PULL] = self._handleNotifyPull, _serverEngine$watch[SERVER_EVENT_NAME.JOIN_CHATROOM] = self._handleJoinChatRoom, _serverEngine$watch[SERVER_EVENT_NAME.MESSAGE_SEND] = self._handleSendMessage, _serverEngine$watch));
      self._serverEngine = serverEngine;
      self._pullQueue = pullQueue;
      self._messageTimeSyner = new MessageTimeSyner$1({
        appkey: appkey,
        userId: userId,
        startSyncTime: startSyncTime
      });
      self._chatRoomMessageTimeSyner = new ChatRoomMessageTimeSyner$1({
        appkey: appkey,
        userId: userId
      });

      self._pullMessageTimer.start(pullQueue.pull, {
        thisArg: pullQueue
      });

      pullQueue.pull();
    }

    var _proto = MessagePullManager.prototype;

    _proto.watchMessage = function watchMessage(event) {
      this._eventEmitter.on(EVENT_NAME$1.MESSAGE_RECEIVED, event);
    };

    _proto.notifyMessage = function notifyMessage(messageArgs) {
      var message = messageArgs.message;

      this._setPullTime(message);

      this._eventEmitter.emit(EVENT_NAME$1.MESSAGE_RECEIVED, messageArgs);
    };

    _proto.close = function close() {
      var _this$_serverEngine$u;

      this._pullMessageTimer.stop();

      this._sentMsgCacheInPulling = {};

      this._serverEngine.unwatch((_this$_serverEngine$u = {}, _this$_serverEngine$u[SERVER_EVENT_NAME.DIRECT_MSG] = this._handleDirectMessage, _this$_serverEngine$u[SERVER_EVENT_NAME.NOTIFY_PULL] = this._handleNotifyPull, _this$_serverEngine$u[SERVER_EVENT_NAME.JOIN_CHATROOM] = this._handleJoinChatRoom, _this$_serverEngine$u[SERVER_EVENT_NAME.MESSAGE_SEND] = this._handleSendMessage, _this$_serverEngine$u));
    };

    _proto._pullEvent = function _pullEvent(option) {
      option = option || {};

      var self = this,
          _serverEngine = self._serverEngine,
          _messageTimeSyner = self._messageTimeSyner,
          _chatRoomMessageTimeSyner = self._chatRoomMessageTimeSyner,
          _option = option,
          type = _option.type,
          chrmId = _option.chrmId,
          serverPullTime = _option.time,
          count = _option.count,
          isPullChrmMsg = utils.isEqual(type, PULL_MSG_TYPE.CHATROOM),
          msgSyncTime = _messageTimeSyner.get(),
          currentReceiveTime = isPullChrmMsg ? _chatRoomMessageTimeSyner.get(chrmId) : msgSyncTime.inboxTime,
          syncTime = utils.copy(msgSyncTime);

      if (serverPullTime && serverPullTime < currentReceiveTime) {
        return utils.Defer.resolve();
      }

      var onMessage = function onMessage(_ref2) {
        var message = _ref2.message,
            finished = _ref2.finished,
            isLastInAPull = _ref2.isLastInAPull;

        self._displatchMessages({
          message: message,
          finished: finished,
          isPullChrmMsg: isPullChrmMsg,
          isLastInAPull: isLastInAPull,
          normalSyncTime: syncTime,
          chatRoomReceiveTime: currentReceiveTime
        });
      };

      if (isPullChrmMsg) {
        return _serverEngine.pullChrmMessageList(chrmId, currentReceiveTime, count, {
          onMessage: onMessage
        });
      } else {
        return _serverEngine.pullMessageList(syncTime, {
          onMessage: onMessage
        });
      }
    };

    _proto._displatchMessages = function _displatchMessages(option) {
      var self = this,
          message = option.message,
          finished = option.finished,
          isPullChrmMsg = option.isPullChrmMsg,
          isLastInAPull = option.isLastInAPull,
          _ref3 = option.normalSyncTime || {},
          inboxTime = _ref3.inboxTime,
          sendboxTime = _ref3.sendboxTime,
          sentTime = message.sentTime,
          messageDirection = message.messageDirection,
          messageUId = message.messageUId,
          isSelfSend = messageDirection === MESSAGE_DIRECTION.SEND,
          pullTime = isSelfSend ? sendboxTime : inboxTime;

      if (sentTime <= pullTime && !isPullChrmMsg) {
        return;
      }

      if (self._sentMsgCacheInPulling[messageUId]) {
        return;
      }

      self.notifyMessage({
        message: message,
        hasMore: !finished,
        isLastInAPull: isLastInAPull
      });
    };

    _proto._setPullTime = function _setPullTime(message) {
      var isChatRoom = message.type === CONVERSATION_TYPE.CHATROOM;
      isChatRoom ? this._chatRoomMessageTimeSyner.setByMessage(message) : this._messageTimeSyner.setByMessage(message);
    };

    _proto._setSentMsgCacheInPulling = function _setSentMsgCacheInPulling(message) {
      var messageUId = message.messageUId;

      if (utils.isUndefined(messageUId)) {
        return;
      }

      this._sentMsgCacheInPulling[messageUId] = message;
    };

    _proto._consumeSentMsgCacheInPulling = function _consumeSentMsgCacheInPulling() {
      var self = this;
      var _sentMsgCacheInPulling = self._sentMsgCacheInPulling;
      utils.forEach(_sentMsgCacheInPulling, function (message) {
        self._setPullTime(message);
      });
      self._sentMsgCacheInPulling = {};
    };

    return MessagePullManager;
  }();

  var ChatRoomKVStore = function () {
    function ChatRoomKVStore(chrmId, currentUserId) {
      this._chatRoomId = void 0;
      this._kvCaches = {};
      this._currentUserId = void 0;
      this._chatRoomId = chrmId;
      this._currentUserId = currentUserId;
    }

    var _proto = ChatRoomKVStore.prototype;

    _proto.setEntries = function setEntries(data) {
      data = data || {};
      var self = this;
      var _data = data,
          kvList = _data.kvEntries,
          isFullUpdate = _data.isFullUpdate;
      kvList = kvList || [];
      isFullUpdate = isFullUpdate || false;
      isFullUpdate && self.clear();
      utils.forEach(kvList, function (kv) {
        self.setEntry(kv, {
          isFullUpdate: isFullUpdate
        });
      });
    };

    _proto.setEntry = function setEntry(kv, option) {
      option = option || {};
      var _option = option,
          isFullUpdate = _option.isFullUpdate,
          key = kv.key,
          type = kv.type,
          isOverwrite = kv.isOverwrite,
          userId = kv.userId,
          latestUserId = this.getSetUserId(key),
          isDeleteOpt = utils.isEqual(type, CHATROOM_ENTRY_TYPE.DELETE),
          isSameAtLastSetUser = utils.isEqual(latestUserId, userId),
          isKeyNotExist = !this.isExisted(key);
      var event = isDeleteOpt ? this.remove : this.add;

      if (isFullUpdate) {
        event.call(this, kv);
      } else if (isOverwrite || isSameAtLastSetUser || isKeyNotExist) {
        event.call(this, kv);
      }
    };

    _proto.add = function add(kv) {
      var key = kv.key;
      kv.isDeleted = false;
      this._kvCaches[key] = kv;
    };

    _proto.remove = function remove(kv) {
      var key = kv.key;
      var cacheKV = this.get(key) || {};
      cacheKV.isDeleted = true;
      this._kvCaches[key] = cacheKV;
    };

    _proto.clear = function clear() {
      this._kvCaches = {};
    };

    _proto.get = function get(key) {
      return this._kvCaches[key];
    };

    _proto.getSetUserId = function getSetUserId(key) {
      var cache = this.get(key) || {};
      return cache.userId;
    };

    _proto.getValue = function getValue(key) {
      var kv = this._kvCaches[key] || {};
      var isDeleted = kv.isDeleted;
      return isDeleted ? null : kv.value;
    };

    _proto.getAll = function getAll() {
      var kvEntries = {};
      utils.forEach(this._kvCaches, function (kv, key) {
        if (!kv.isDeleted) {
          kvEntries[key] = kv.value;
        }
      });
      return kvEntries;
    };

    _proto.getUpdatedTime = function getUpdatedTime() {
      var maxTime = 0;
      utils.forEach(this._kvCaches, function (entry) {
        var timestamp = entry.timestamp || 0;

        if (maxTime < timestamp) {
          maxTime = timestamp;
        }
      });
      return maxTime;
    };

    _proto.isExisted = function isExisted(key) {
      var cache = this.get(key) || {};
      var value = cache.value,
          isDeletedOnLatestOperate = cache.isDeleted;
      return value && !isDeletedOnLatestOperate;
    };

    return ChatRoomKVStore;
  }();

  var storeCaches = {};

  var get = function get(chrmId) {
    return storeCaches[chrmId];
  };

  var set$1 = function set(chrmId, data, currentUserId) {
    var kvStore = get(chrmId);

    if (utils.isEmpty(kvStore)) {
      kvStore = new ChatRoomKVStore(chrmId, currentUserId);
    }

    kvStore.setEntries(data);
    storeCaches[chrmId] = kvStore;
  };

  var getValue = function getValue(chrmId, key) {
    var kvStore = get(chrmId);
    var value = kvStore ? kvStore.getValue(key) : null;
    return value;
  };

  var getAll = function getAll(chrmId) {
    var kvStore = get(chrmId);
    var kvs = {};

    if (kvStore) {
      kvs = kvStore.getAll();
    }

    return kvs;
  };

  var clear = function clear(chrmId) {
    var kvStore = get(chrmId) || {};
    kvStore.clear && kvStore.clear();
  };

  var ChatRoomKVStore$1 = {
    get: get,
    set: set$1,
    getValue: getValue,
    getAll: getAll,
    clear: clear
  };

  var PullTimeCache = {
    _caches: {},
    set: function set(chrmId, time) {
      PullTimeCache._caches[chrmId] = time;
    },
    get: function get(chrmId) {
      return PullTimeCache._caches[chrmId] || 0;
    },
    clear: function clear(chrmId) {
      PullTimeCache._caches[chrmId] = 0;
    }
  };

  var ChatRoomKVManager = function () {
    function ChatRoomKVManager(serverEngine) {
      var _serverEngine$watch;

      this._serverEngine = void 0;
      this._pullQueue = void 0;
      this._handleChrmKVSet = void 0;
      this._handleChrmKVChanged = void 0;
      this._handleBeforeJoinChrm = void 0;
      var self = this;
      var userId = serverEngine._selfUserId;
      var pullQueue = new PullQueueManager({
        event: this._pullEvent,
        thisArg: this,
        onFinished: function onFinished(data, option) {
          if (!data || !option.chrmId) {
            return;
          }

          var chrmId = option.chrmId;

          if (data.isFullUpdate) {
            self._reset(chrmId);
          }

          Logger.info(TAG.L_PULL_CHRM_KV_R, {
            data: data,
            option: option
          });
          ChatRoomKVStore$1.set(chrmId, data, userId);
          PullTimeCache.set(chrmId, data.syncTime || 0);
        }
      });

      self._handleChrmKVSet = function (_ref) {
        var id = _ref.id,
            data = _ref.data;
        ChatRoomKVStore$1.set(id, data, userId);
      };

      self._handleChrmKVChanged = function (data) {
        self.pull(data);
      };

      self._handleBeforeJoinChrm = function (_ref2) {
        var id = _ref2.id;

        self._reset(id);
      };

      serverEngine.watch((_serverEngine$watch = {}, _serverEngine$watch[SERVER_EVENT_NAME.CHRM_KV_SET] = self._handleChrmKVSet, _serverEngine$watch[SERVER_EVENT_NAME.CHRM_KV_CHANGED] = self._handleChrmKVChanged, _serverEngine$watch[SERVER_EVENT_NAME.BEFORE_JOIN_CHATROOM] = self._handleBeforeJoinChrm, _serverEngine$watch));
      this._serverEngine = serverEngine;
      this._pullQueue = pullQueue;
    }

    var _proto = ChatRoomKVManager.prototype;

    _proto._reset = function _reset(chrmId) {
      ChatRoomKVStore$1.clear(chrmId);
      PullTimeCache.clear(chrmId);
    };

    _proto._pullEvent = function _pullEvent(data) {
      var time = data.time,
          chrmId = data.chrmId,
          currentTime = PullTimeCache.get(chrmId),
          isUpdated = currentTime > time;
      Logger.info(TAG.L_PULL_CHRM_KV_T, {
        currentTime: currentTime,
        serverTime: time,
        isUpdated: isUpdated,
        data: data
      });

      if (isUpdated) {
        Logger.info(TAG.L_PULL_CHRM_KV_R, {
          info: 'kv is updated. not pull again'
        });
        return utils.Defer.resolve();
      }

      return this._serverEngine.pullChatRoomKV({
        id: chrmId
      }, currentTime);
    };

    _proto.pull = function pull(data) {
      this._pullQueue.pull(data);
    };

    _proto.getValue = function getValue(chrmId, key) {
      return ChatRoomKVStore$1.getValue(chrmId, key);
    };

    _proto.getAll = function getAll(chrmId) {
      return ChatRoomKVStore$1.getAll(chrmId);
    };

    _proto.close = function close() {
      var _self$_serverEngine$u;

      var self = this;

      self._serverEngine.unwatch((_self$_serverEngine$u = {}, _self$_serverEngine$u[SERVER_EVENT_NAME.CHRM_KV_SET] = self._handleChrmKVSet, _self$_serverEngine$u[SERVER_EVENT_NAME.CHRM_KV_CHANGED] = self._handleChrmKVChanged, _self$_serverEngine$u[SERVER_EVENT_NAME.BEFORE_JOIN_CHATROOM] = self._handleBeforeJoinChrm, _self$_serverEngine$u));
    };

    return ChatRoomKVManager;
  }();

  var SettingStore = function () {
    function SettingStore(appkey, userId) {
      this._storage = void 0;
      var storageKey = utils.tplEngine(STORAGE_USER_SETTING.ROOT_KEY_TPL, {
        appkey: appkey,
        userId: userId
      });
      this._storage = new common.RCStorage(storageKey);
    }

    var _proto = SettingStore.prototype;

    _proto.set = function set(serverData) {
      var self = this,
          _storage = self._storage,
          settings = serverData.settings,
          oldSettingItems = _storage.get(STORAGE_USER_SETTING.SUB_KEY.SETTINGS) || {};
      var newSettingItems = oldSettingItems,
          isChanged = false;
      utils.forEach(settings, function (newSetting, key) {
        newSetting = newSetting || {};
        var oldSetting = oldSettingItems[key] || {},
            _newSetting = newSetting,
            newVersion = _newSetting.version,
            status = _newSetting.status,
            newValue = _newSetting.value,
            oldGlobalVersion = _storage.get(STORAGE_USER_SETTING.SUB_KEY.VERSION) || 0,
            isNeedUpdateItem = newVersion > (oldSetting.version || 0),
            isNeedUpdateVersion = newVersion > oldGlobalVersion;

        if (!isNeedUpdateItem) {
          return;
        }

        isChanged = true;

        switch (status) {
          case USER_SETTING_STATUS.ADD:
          case USER_SETTING_STATUS.UPDATE:
            newSettingItems[key] = {
              value: newValue,
              version: newVersion
            };
            break;

          case USER_SETTING_STATUS.DELETE:
            delete newSettingItems[key];
            break;

          default:
        }

        if (isNeedUpdateVersion) {
          _storage.set(STORAGE_USER_SETTING.SUB_KEY.VERSION, newVersion);
        }
      });

      if (!isChanged) {
        return;
      }

      if (utils.isEmpty(newSettingItems)) {
        _storage.remove(STORAGE_USER_SETTING.SUB_KEY.SETTINGS);
      } else {
        _storage.set(STORAGE_USER_SETTING.SUB_KEY.SETTINGS, newSettingItems);
      }
    };

    _proto.getSetting = function getSetting() {
      var settings = this._storage.get(STORAGE_USER_SETTING.SUB_KEY.SETTINGS) || {};
      return utils.map(settings, function (set) {
        set = set || {};
        return set.value;
      });
    };

    _proto.getVersion = function getVersion() {
      return this._storage.get(STORAGE_USER_SETTING.SUB_KEY.VERSION) || 0;
    };

    return SettingStore;
  }();

  var EventNames = {
    CHANGED: 'change'
  };

  var SettingManager = function () {
    function SettingManager(serverEngine, option) {
      var _serverEngine$watch;

      this._serverEngine = void 0;
      this._settingStore = void 0;
      this._pullQueue = void 0;
      this._eventEmitter = new utils.EventEmitter();
      this._handleNotifySettingChanged = void 0;
      var self = this,
          appkey = option.appkey,
          userId = option.userId,
          isAutoPull = option.isAutoPull,
          settingStore = new SettingStore(appkey, userId),
          localVersion = settingStore.getVersion() || 0;
      var pullQueue = new PullQueueManager({
        event: serverEngine.getUserSettings,
        thisArg: serverEngine,
        onFinished: function onFinished(serverData) {
          if (serverData && serverData.version) {
            self._settingStore.set(serverData);

            self._eventEmitter.emit(EventNames.CHANGED, self.get());
          }
        }
      });

      self._handleNotifySettingChanged = function (notifyData) {
        var version = notifyData.version,
            localVersion = self._settingStore.getVersion();

        if (version >= localVersion) {
          pullQueue.pull(localVersion);
        }
      };

      self._settingStore = new SettingStore(appkey, userId);
      self._pullQueue = pullQueue;
      self._serverEngine = serverEngine;
      serverEngine.watch((_serverEngine$watch = {}, _serverEngine$watch[SERVER_EVENT_NAME.USER_SETTING_CHANGED] = self._handleNotifySettingChanged, _serverEngine$watch));
      isAutoPull && pullQueue.pull(localVersion);
    }

    var _proto = SettingManager.prototype;

    _proto.watchSettingChanged = function watchSettingChanged(event) {
      this._eventEmitter.on(EventNames.CHANGED, event);
    };

    _proto.get = function get() {
      return this._settingStore.getSetting() || {};
    };

    _proto.close = function close() {
      var _this$_serverEngine$u;

      this._serverEngine.unwatch((_this$_serverEngine$u = {}, _this$_serverEngine$u[SERVER_EVENT_NAME.USER_SETTING_CHANGED] = this._handleNotifySettingChanged, _this$_serverEngine$u));
    };

    return SettingManager;
  }();

  var WebIMEngine = function () {
    function WebIMEngine(option) {
      this._option = void 0;
      this._user = void 0;
      this._naviManager = void 0;
      this._cmpManager = new CMPManager();
      this._conversationManager = void 0;
      this._messageManager = void 0;
      this._chatRoomKVManager = void 0;
      this._userSettingManager = void 0;
      this._serverEngine = void 0;
      this._imEventEmitter = new utils.EventEmitter();
      this._connectionStatus = CONNECTION_STATUS.DISCONNECTED;
      this._connectedDomain = void 0;
      this._networkDetecter = void 0;
      this._joinedChatRoomSyner = void 0;
      var self = this;
      var detect = option.detect;
      var serverEngine = new ServerEngine(option);
      serverEngine.watch({
        status: function status(_status) {
          self._handleConnectionStatus(_status);
        }
      });
      this._serverEngine = serverEngine;
      this._option = option;
      this._networkDetecter = new utils.NetworkDetecter(detect);
      utils.forEach(ServerEngine.prototype, function (event, eventName) {
        var server = serverEngine,
            web = self;
        var selfEvent = web[eventName],
            serverEvent = server[eventName];

        if (!selfEvent && serverEvent && utils.isFunction(serverEvent)) {
          web[eventName] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return serverEvent.call.apply(serverEvent, [server].concat(args));
          };
        }
      });
    }

    var _proto = WebIMEngine.prototype;

    _proto._notifyMessage = function _notifyMessage(event) {
      var self = this;
      var message = event.message;
      var _serverEngine = self._serverEngine;

      var connectedTime = _serverEngine.getConnectedTime();

      if (common.isLogCommandMsg(message)) {
        var content = message.content;
        Logger.uploadFull(0, content, connectedTime);
        return;
      }

      this._conversationManager.addMessage(event);

      this._imEventEmitter.emit(IM_EVENT.MESSAGE, event);
    };

    _proto._handleConnectionStatus = function _handleConnectionStatus(status) {
      var _cmpManager = this._cmpManager,
          _naviManager = this._naviManager,
          _connectedDomain = this._connectedDomain;
      var isNeedUpdateCMPList = utils.isInclude(TRANSPORTER_STATUS_NEED_UPDATE_CMP, status);
      var isNeedReconnect = utils.isInclude(TRANSPORTER_STATUS_NEED_RECONNECT, status);
      var isKickedOfflineByOtherClient = utils.isEqual(CONNECTION_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT, status);

      if (isNeedUpdateCMPList) {
        _cmpManager.addInvalid(_connectedDomain);

        if (_cmpManager.isAllInvalid()) {
          _naviManager.clear();

          _cmpManager.clearInvalid();
        }
      }

      if (isNeedReconnect) {
        this.disconnect();
        this.reconnect(true);
      }

      if (isKickedOfflineByOtherClient) {
        this.disconnect();
      }

      var connectionStatus = TRANSPORTER_STATUS_TO_CONNECTION_STATUS[status] || status;
      this._connectionStatus = connectionStatus;

      this._imEventEmitter.emit(IM_EVENT.STATUS, {
        status: connectionStatus
      });
    };

    _proto._handleConnectError = function _handleConnectError(errorInfo) {
      var _user = this._user;
      var code = errorInfo.code || errorInfo.status;
      this.disconnect();

      if (code === ERROR_INFO.CONN_REDIRECTED.code) {
        this._naviManager.clear();

        return this.connect(_user);
      }

      this._connectionStatus = CONNECTION_STATUS.DISCONNECTED;
      return utils.Defer.reject(errorInfo);
    };

    _proto._afterConnect = function _afterConnect(connectUser, syncTime) {
      var self = this,
          _serverEngine = self._serverEngine,
          appkey = self._option.appkey,
          _imEventEmitter = self._imEventEmitter,
          _naviManager = self._naviManager,
          id = connectUser.id,
          localNavi = _naviManager.getLocalConfig() || {};
      Logger.setOption({
        userId: id
      });
      self._user.id = id;
      var conversationManager = new ConversationManager({
        appkey: appkey,
        userId: id
      }, _serverEngine);
      conversationManager.watch({
        conversation: function conversation(_ref) {
          var updatedConversationList = _ref.updatedConversationList;

          _imEventEmitter.emit(IM_EVENT.CONVERSATION, {
            updatedConversationList: updatedConversationList
          });
        }
      });
      self._conversationManager = conversationManager;
      var messageManager = new MessagePullManager(_serverEngine, {
        startSyncTime: syncTime
      });
      messageManager.watchMessage(function (event) {
        self._notifyMessage(event);
      });
      self._messageManager = messageManager;
      self._chatRoomKVManager = new ChatRoomKVManager(_serverEngine);
      var isAutoPull = !!Number(localNavi.openUS);
      var userSettingManager = new SettingManager(_serverEngine, {
        appkey: appkey,
        userId: id,
        isAutoPull: isAutoPull
      });
      self._joinedChatRoomSyner = new common.JoinedChatRoomSyner({
        appkey: appkey,
        userId: id
      });
      userSettingManager.watchSettingChanged(function (config) {
        config = config || {};
        var _config = config,
            voipCallInfo = _config.VoipInfo;

        _naviManager.setLocalConfig({
          voipCallInfo: utils.toJSON(voipCallInfo)
        });

        self._imEventEmitter.emit(IM_EVENT.SETTING, config);
      });
      self._userSettingManager = userSettingManager;
    };

    _proto.watch = function watch(watchers) {
      var _events;

      var statusWatcher = watchers.status,
          messageWatcher = watchers.message,
          conversationWatcher = watchers.conversation,
          chatroomWatcher = watchers.chatroom;
      var self = this;
      var events = (_events = {}, _events[IM_EVENT.STATUS] = statusWatcher, _events[IM_EVENT.MESSAGE] = messageWatcher, _events[IM_EVENT.CONVERSATION] = conversationWatcher, _events[IM_EVENT.CHATROOM] = chatroomWatcher, _events);
      utils.forEach(events, function (event, eventName) {
        utils.isFunction(event) && self._imEventEmitter.on(eventName, event);
      });
    };

    _proto.unwatch = function unwatch(watchers) {
      var _imEventEmitter = this._imEventEmitter;
      var offEventNameObj = {
        status: 'IM_EVENT.STATUS',
        message: 'IM_EVENT.MESSAGE',
        conversation: 'IM_EVENT.CONVERSATION',
        chatroom: 'IM_EVENT.CHATROOM'
      };

      if (watchers) {
        utils.forEach(watchers, function (val, key) {
          if (offEventNameObj[key]) {
            _imEventEmitter.off(key, val);
          }
        });
      } else {
        _imEventEmitter.clear();
      }
    };

    _proto.getConnectionStatus = function getConnectionStatus() {
      return this._connectionStatus;
    };

    _proto.getConnectionUserId = function getConnectionUserId() {
      var user = this._user || {};
      return user.id;
    };

    _proto.getAppInfo = function getAppInfo() {
      var _option = this._option,
          _naviManager = this._naviManager,
          _userSettingManager = this._userSettingManager;
      return utils.extendInShallow(_option, {
        navi: _naviManager.getLocalConfig(),
        serverConfig: _userSettingManager ? _userSettingManager.get() : {}
      });
    };

    _proto.connect = function connect(user, options) {
      Logger.startRealtimeUpload();
      var self = this;
      var _option = self._option,
          _serverEngine = self._serverEngine,
          _cmpManager = self._cmpManager;
      var naviOpt = common.getNavReqOption(_option, user);
      var naviManager = new NaviManager(naviOpt);
      var getServerConfig = _option.isOldServer ? _serverEngine.getOldServerConfig : _serverEngine.getServerConfig;
      options = options || {};
      var isAutoReconnect = options.isAutoReconnect;

      self._handleConnectionStatus(CONNECTION_STATUS.CONNECTING);

      self._user = utils.copy(user);
      self._naviManager = naviManager;
      var connectUser;
      return naviManager.get().then(function (configForNavi) {
        var cmpDomainList = common.getCMPDomainList(configForNavi, _option);
        Logger.setServerOption(configForNavi);

        _cmpManager.setDomainList(cmpDomainList);

        return _cmpManager.getFaster();
      }).then(function (_ref2) {
        var domain = _ref2.domain;
        self._connectedDomain = domain;
        return _serverEngine.connect(user, {
          domain: domain
        });
      }).then(function (user) {
        connectUser = user;
        isAutoReconnect && self.rejoinChatRoom();
        return getServerConfig.call(_serverEngine, user.id);
      }).then(function (serverConfig) {
        self._afterConnect(connectUser, serverConfig);

        self._handleConnectionStatus(CONNECTION_STATUS.CONNECTED);

        return connectUser;
      })["catch"](function (error) {
        return self._handleConnectError(error);
      });
    };

    _proto.reconnect = function reconnect(isAutoReconnect) {
      var self = this;
      var _user = self._user;

      if (utils.isUndefined(_user)) {
        return utils.Defer.reject(ERROR_INFO.NOT_CONNECTED);
      }

      return self._networkDetecter.start().then(function () {
        return self.connect(_user, {
          isAutoReconnect: isAutoReconnect
        });
      });
    };

    _proto.disconnect = function disconnect(isNotify) {
      isNotify && this._handleConnectionStatus(CONNECTION_STATUS.DISCONNECTED);
      this._networkDetecter && this._networkDetecter.stop();
      this._messageManager && this._messageManager.close();
      this._chatRoomKVManager && this._chatRoomKVManager.close();
      this._userSettingManager && this._userSettingManager.close();
      this._conversationManager && this._conversationManager.close();
      return this._serverEngine.disconnect();
    };

    _proto.changeUser = function changeUser(user) {
      this.disconnect(true);
      return this.connect(user);
    };

    _proto.sendMessage = function sendMessage(conversation, option) {
      var self = this;
      return self._serverEngine.sendMessage(conversation, option).then(function (message) {
        self._conversationManager.addMessage({
          message: message,
          hasMore: false
        });

        return message;
      });
    };

    _proto.recallMessage = function recallMessage(conversation, message, option) {
      var self = this;
      return self._serverEngine.recallMessage(conversation, message, option).then(function (message) {
        self._conversationManager.addMessage({
          message: message,
          hasMore: false
        });

        return message;
      });
    };

    _proto.getConversationList = function getConversationList(option) {
      var isOldServer = this._option.isOldServer,
          _serverEngine = this._serverEngine,
          _conversationManager = this._conversationManager;
      var func = isOldServer ? _serverEngine.getOldConversationList : _serverEngine.getConversationList;
      return func.call(_serverEngine, option, {
        afterDecode: function afterDecode(conversation) {
          var localConversation = _conversationManager.get(conversation);

          conversation = utils.extendAllowNull(conversation, localConversation);
          return conversation;
        }
      }).then(function (list) {
        return common.sortConList(list);
      });
    };

    _proto.getLocalConversation = function getLocalConversation(conversation) {
      var local = this._conversationManager.get(conversation);

      return {
        unreadMessageCount: local.unreadMessageCount || 0,
        hasMentiond: local.hasMentiond || false,
        mentiondInfo: local.mentiondInfo
      };
    };

    _proto.removeConversation = function removeConversation(conversation) {
      var isOldServer = this._option.isOldServer,
          _serverEngine = this._serverEngine;
      var func = isOldServer ? _serverEngine.removeOldConversation : _serverEngine.removeConversation;
      return func.call(_serverEngine, conversation);
    };

    _proto.getTotalUnreadCount = function getTotalUnreadCount() {
      var isOldServer = this._option.isOldServer,
          _serverEngine = this._serverEngine;

      if (isOldServer) {
        var totalCount = this._conversationManager.getTotalUnreadCount();

        return utils.Defer.resolve(totalCount);
      } else {
        return _serverEngine.getTotalUnreadCount();
      }
    };

    _proto.getUnreadCount = function getUnreadCount(conversation) {
      var isOldServer = this._option.isOldServer;

      if (isOldServer) {
        var count = this._conversationManager.getUnreadCount(conversation);

        return utils.Defer.resolve(count);
      }
    };

    _proto.clearUnreadCount = function clearUnreadCount(conversation, option) {
      var isOldServer = this._option.isOldServer,
          _serverEngine = this._serverEngine;

      if (isOldServer) {
        this._conversationManager.read(conversation);

        return utils.Defer.resolve();
      } else {
        return _serverEngine.clearUnreadCount(conversation, option);
      }
    };

    _proto.joinChatRoom = function joinChatRoom(chrm, option) {
      var self = this;
      var _serverEngine = self._serverEngine,
          _naviManager = self._naviManager,
          _chatRoomKVManager = self._chatRoomKVManager,
          _joinedChatRoomSyner = self._joinedChatRoomSyner;
      var isAutoRejoin = option.isAutoRejoin;
      return _serverEngine.joinChatRoom(chrm, option).then(function () {
        return _naviManager.get();
      }).then(function (configForNavi) {
        var isOpenKVStorageService = configForNavi.kvStorage,
            isOpenJoinMulitpleChrmService = configForNavi.joinMChrm;
        !isAutoRejoin && _joinedChatRoomSyner.set({
          chrmId: chrm.id,
          count: option.count,
          isOpenJoinMulitpleChrmService: isOpenJoinMulitpleChrmService
        });
        var initialTime = 0;
        return isOpenKVStorageService ? _chatRoomKVManager.pull({
          time: initialTime,
          chrmId: chrm.id
        }) : utils.Defer.resolve();
      });
    };

    _proto.quitChatRoom = function quitChatRoom(chrm) {
      var self = this;
      var _serverEngine = self._serverEngine;
      return _serverEngine.quitChatRoom(chrm).then(function () {
        self._joinedChatRoomSyner.remove(chrm.id);

        return utils.Defer.resolve();
      });
    };

    _proto.rejoinChatRoom = function rejoinChatRoom() {
      var self = this;
      var _joinedChatRoomSyner = self._joinedChatRoomSyner,
          _imEventEmitter = self._imEventEmitter;

      var joinedChrmInfos = _joinedChatRoomSyner.get();

      utils.forEach(joinedChrmInfos, function (chrmInfo) {
        var chrmId = chrmInfo.chrmId,
            count = chrmInfo.count;
        var isAutoRejoin = true,
            isJoinExist = true;
        return self.joinChatRoom({
          id: chrmId
        }, {
          count: count,
          isAutoRejoin: isAutoRejoin,
          isJoinExist: isJoinExist
        }).then(function () {
          _imEventEmitter.emit(IM_EVENT.CHATROOM, {
            chatroomId: chrmId,
            count: count
          });
        }, function (reason) {
          _imEventEmitter.emit(IM_EVENT.CHATROOM, {
            chatroomId: chrmId,
            count: count,
            errorCode: reason
          });
        });
      });
    };

    _proto.setChatRoomKV = function setChatRoomKV(chrm, entry) {
      var self = this;
      utils.extend(entry, {
        type: CHATROOM_ENTRY_TYPE.UPDATE,
        userId: self._user.id
      });
      entry.type = CHATROOM_ENTRY_TYPE.UPDATE;
      return self._serverEngine.modifyChatRoomKV(chrm, entry);
    };

    _proto.forceSetChatRoomKV = function forceSetChatRoomKV(chrm, entry) {
      entry.isOverwrite = true;
      return this.setChatRoomKV(chrm, entry);
    };

    _proto.removeChatRoomKV = function removeChatRoomKV(chrm, entry) {
      var self = this;
      utils.extend(entry, {
        type: CHATROOM_ENTRY_TYPE.DELETE,
        userId: self._user.id
      });
      return self._serverEngine.modifyChatRoomKV(chrm, entry);
    };

    _proto.forceRemoveChatRoomKV = function forceRemoveChatRoomKV(chrm, entry) {
      entry.isOverwrite = true;
      return this.removeChatRoomKV(chrm, entry);
    };

    _proto.getChatRoomKV = function getChatRoomKV(chrm, key) {
      var value = this._chatRoomKVManager.getValue(chrm.id, key);

      if (utils.isEmpty(value)) {
        return utils.Defer.reject(ERROR_INFO.CHATROOM_KEY_NOT_EXIST);
      } else {
        return utils.Defer.resolve(value);
      }
    };

    _proto.getAllChatRoomKV = function getAllChatRoomKV(chrm) {
      var kvs = this._chatRoomKVManager.getAll(chrm.id);

      return utils.Defer.resolve(kvs);
    };

    _proto.getFileToken = function getFileToken(fileType, originName) {
      var self = this;
      var fileName = common.genUploadFileName(fileType, originName);
      var uploadDomains = common.getUploadFileDomains(self._naviManager.getLocalConfig());
      return self._serverEngine.getFileToken(fileType, fileName).then(function (data) {
        return utils.extendInShallow(uploadDomains, data);
      });
    };

    _proto.getFileUrl = function getFileUrl(fileType, fileName, originName, uploadResp) {
      var self = this;
      uploadResp = uploadResp || {};

      if (uploadResp.isBosRes) {
        return utils.Defer.resolve(uploadResp);
      }

      return self._serverEngine.getFileUrl(fileType, fileName, originName);
    };

    return WebIMEngine;
  }();

  var Engine = (function (imArg) {
    return new WebIMEngine(imArg);
  });

  var execEngineByEvent = function execEngineByEvent(params, engine) {
    var eventName = params.event,
        args = params.args;
    args = args || [];

    var engineEvent = engine[eventName] || function () {
      return utils.Defer.reject(ERROR_INFO.SDK_INTERNAL_ERROR);
    };

    return engineEvent.apply(engine, args);
  };

  var EngineDispatcher = function () {
    function EngineDispatcher(option) {
      this._engine = void 0;
      this._engine = new Engine(option);
    }

    var _proto = EngineDispatcher.prototype;

    _proto._isEventNeedConnect = function _isEventNeedConnect(eventName) {
      var engine = this._engine,
          connectionStatus = engine.getConnectionStatus(),
          isNotConnected = connectionStatus !== CONNECTION_STATUS.CONNECTED,
          isEventNeedConnected = utils.isInclude(ENGINE_EVENT_NEED_CONNECTED, eventName);
      return isNotConnected && isEventNeedConnected;
    };

    _proto._isEventNeedDisconnect = function _isEventNeedDisconnect(eventName) {
      var engine = this._engine,
          connectionStatus = engine.getConnectionStatus(),
          isConnecting = common.isConnected(connectionStatus) || common.isConnecting(connectionStatus),
          isEventNeedDisconnected = utils.isInclude(ENGINE_EVENT_NEED_DISCONNECTED, eventName);
      return isConnecting && isEventNeedDisconnected;
    };

    _proto._exec = function _exec(params) {
      var event = params.event;
      var engine = this._engine;

      if (this._isEventNeedConnect(event)) {
        return utils.Defer.reject(ERROR_INFO.NOT_CONNECTED);
      }

      if (this._isEventNeedDisconnect(event)) {
        return utils.Defer.reject(ERROR_INFO.RC_CONNECTION_EXIST);
      }

      var execResult = execEngineByEvent(params, engine);
      return utils.isPromise(execResult) ? execResult["catch"](function (error) {
        var errorCode = error.status || error.code || error;
        var msg = utils.isObject(error) ? error.msg : null;
        var errorInfo = ERROR_CODE_TO_INFO[errorCode] || {
          code: errorCode
        };

        if (msg) {
          errorInfo.msg = msg;
        }

        var isValidErrorCode = utils.isNumberData(errorCode);

        if (!isValidErrorCode) {
          if (utils.isStackError(error)) {
            error = error.stack.toString();
          }

          Logger.fatal(TAG.L_CRASH_E, {
            content: {
              desc: 'SDK Error',
              error: error
            }
          });
          errorInfo = utils.extendInShallow(ERROR_INFO.SDK_INTERNAL_ERROR, {
            error: error
          });
        }

        return utils.Defer.reject(errorInfo);
      }) : execResult;
    };

    _proto.exec = function exec(params) {
      var event = params.event;

      var LOG_TAG = APP_ENGINE_EVENT_LOG_TAG[event],
          isNeedLog = !utils.isEmpty(LOG_TAG),
          _ref = LOG_TAG || {},
          reqLogTag = _ref.req,
          respLogTag = _ref.resp;

      isNeedLog && Logger.info(reqLogTag, params);

      var execResult = this._exec(params);

      if (utils.isPromise(execResult)) {
        return execResult.then(function (result) {
          isNeedLog && Logger.info(respLogTag, result);
          return result;
        })["catch"](function (error) {
          error = error || {};
          var _error = error,
              code = _error.code;

          if (isNeedLog && !Logger.isIgnoreErrorCode(code)) {
            Logger.error(respLogTag, error);
          }

          return utils.Defer.reject(error);
        });
      } else {
        isNeedLog && Logger.info(respLogTag, execResult);
        return execResult;
      }
    };

    return EngineDispatcher;
  }();

  var Type = function Type(name, validator, options) {
    options = options || {};
    var self = this;
    self.validate = validator;
    self.name = name;
    self.errorInfo = options.errorInfo;

    self.canBeNull = function () {
      self.validate = function (data) {
        return utils.isUndefined(data) || utils.isNull(data) || validator(data);
      };

      return self;
    };
  };

  Type.isType = function (type) {
    return type instanceof Type;
  };

  Type.String = new Type('String', utils.isString);
  Type.Number = new Type('Number', utils.isNumber);
  Type.Boolean = new Type('Boolean', utils.isBoolean);
  Type.Function = new Type('Function', utils.isFunction);
  Type.Object = new Type('Object', utils.isObject);
  Type.Array = new Type('Array', utils.isArray);
  Type.NotAllUndefined = new Type('AllUndefined', function (obj) {
    if (utils.isObject(obj) || utils.isArray(obj)) {
      var isNotUndefined = false;
      utils.forEach(obj, function (val) {
        if (!utils.isUndefined(val)) {
          isNotUndefined = true;
        }
      });
      return isNotUndefined;
    } else {
      return !utils.isUndefined(obj);
    }
  });
  var conversationType = common.getConversationTypeList().join('、');
  Type.ConversationType = new Type(conversationType, common.isValidConversationType, {
    errorInfo: 'Not all settings are empty'
  });
  Type.ChatRoomEntryKey = new Type('ChatRoomEntryKey', common.isValidChatRoomKey, {
    errorInfo: 'ChatRoom Key length must be 1 - 128, Only letters、numbers、+、=、-、_ are supported'
  });
  Type.ChatRoomEntryValue = new Type('ChatRoomEntryValue', common.isValidChatRoomValue, {
    errorInfo: 'ChatRoom Value length must be 1 - 4096'
  });

  var Struct = function () {
    function Struct(structure, funcName, paths) {
      if (paths === void 0) {
        paths = [];
      }

      if (!(this instanceof Struct)) {
        return new Struct(structure, funcName, paths);
      }

      var self = this;
      self.structure = structure;
      self.paths = paths;
      self.funcName = funcName;

      if (Type.isType(structure)) {
        self.validate = self._validateType;
      } else if (utils.isArray(structure)) {
        self.validate = self._validateArray;
      } else if (utils.isObject(structure)) {
        self.validate = self._validateObject;
      } else {
        self.validate = self._validateOther;
      }
    }

    var _proto = Struct.prototype;

    _proto._validateType = function _validateType(data) {
      var structure = this.structure;
      var isValid = structure.validate(data);
      return isValid ? this._getSuccess() : this._getError(data);
    };

    _proto._validateArray = function _validateArray(data) {
      var structure = this.structure;

      if (utils.isEmpty(structure)) {
        return this._getSuccess();
      }

      if (!utils.isArray(data)) {
        return this._getError(data);
      }

      var typer = structure[0];

      for (var filed in data) {
        var val = data[filed];

        var result = this._validateField(typer, filed, val);

        if (result.isError) {
          return result;
        }
      }

      return this._getSuccess();
    };

    _proto._validateObject = function _validateObject(data) {
      var structure = this.structure,
          paths = this.paths;
      data = data || {};

      if (utils.isEmpty(structure)) {
        return this._getSuccess();
      }

      if (!utils.isObject(data)) {
        return this._getError(data);
      }

      var checkedField = [];

      for (var filed in data) {
        var typer = structure[filed],
            val = data[filed];

        var result = this._validateField(typer, filed, val);

        if (result.isError) {
          return result;
        }

        checkedField.push(filed);
      }

      for (var checkField in structure) {
        var _typer = structure[checkField];
        var unCheckData = data[checkField];

        if (!utils.isInclude(checkedField, checkField) && !_typer.validate(unCheckData)) {
          var errPaths = utils.copy(paths);
          errPaths.push(checkField);
          return this._getError(unCheckData, {
            paths: errPaths,
            expect: _typer.name
          });
        }
      }

      return this._getSuccess();
    };

    _proto._validateOther = function _validateOther(data) {
      var self = this;
      var structure = self.structure;

      if (utils.isEqual(structure, data) || utils.isEmpty(structure)) {
        return self._getSuccess();
      } else {
        return self._getError(data, {
          current: data,
          expect: structure
        });
      }
    };

    _proto._validateField = function _validateField(typer, filed, value) {
      var paths = this.paths,
          funcName = this.funcName;
      var newPaths = utils.copy(paths);
      newPaths.push(filed);
      return new Struct(typer, funcName, newPaths).validate(value);
    };

    _proto._getError = function _getError(data, options) {
      if (options === void 0) {
        options = [];
      }

      var structure = this.structure,
          paths = this.paths,
          funcName = this.funcName;
      options = utils.extend({
        current: data,
        expect: structure.name || utils.getTypeName(structure),
        paths: paths
      }, options);
      paths = options.paths;
      var _options = options,
          current = _options.current,
          expect = _options.expect;
      var param = utils.isEmpty(paths) ? 'param' : paths.join('.');
      var currentType = utils.getTypeName(current);
      current = utils.toJSON(current) || current;
      current = current + "(" + currentType + ")";
      var msg = utils.tplEngine(ERROR_INFO.PARAMETER_ERROR.msg, {
        param: param,
        expect: expect,
        current: current
      });
      var info = {
        code: ERROR_INFO.PARAMETER_ERROR.code,
        funcName: funcName,
        msg: msg
      };
      var jsonInfo = utils.toJSON(info);
      if (utils.isEmpty(funcName)) delete info[funcName];

      if (structure.errorInfo) {
        info = structure.errorInfo;
      }

      return {
        isError: true,
        info: info,
        jsonInfo: jsonInfo
      };
    };

    _proto._getSuccess = function _getSuccess() {
      return {
        isError: false
      };
    };

    return Struct;
  }();

  var validate = (function (struct, params, eventName) {
    return Struct(struct, eventName).validate(params);
  });

  var _MESSAGE_TYPE_VALIDAT;
  var MESSAGE_TYPE_VALIDATE = (_MESSAGE_TYPE_VALIDAT = {}, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.TEXT] = {
    content: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.VOICE] = {
    content: Type.String,
    duration: Type.Number
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.HQ_VOICE] = {
    remoteUrl: Type.String,
    duration: Type.Number
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.IMAGE] = {
    content: Type.String,
    imageUri: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.GIF] = {
    gifDataSize: Type.Number,
    width: Type.Number,
    height: Type.Number,
    remoteUrl: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.RICH_CONTENT] = {
    title: Type.String,
    content: Type.String,
    imageUri: Type.String,
    url: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.LOCATION] = {
    content: Type.String,
    latitude: Type.Number,
    longitude: Type.Number,
    poi: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.FILE] = {
    name: Type.String,
    size: Type.Number,
    type: Type.String,
    fileUrl: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.SIGHT] = {
    sightUrl: Type.String,
    content: Type.String,
    duration: Type.Number,
    size: Type.Number,
    name: Type.String
  }, _MESSAGE_TYPE_VALIDAT[MESSAGE_TYPE.COMBINE] = {
    remoteUrl: Type.String,
    conversationType: Type.Number,
    nameList: Type.Array,
    summaryList: Type.Array
  }, _MESSAGE_TYPE_VALIDAT);
  var validateMsgContent = (function (objectName, option, eventName) {
    var validateByObjectName = MESSAGE_TYPE_VALIDATE[objectName];

    if (validateByObjectName) {
      return validate(validateByObjectName, option, eventName);
    } else {
      return {
        isError: false,
        info: ''
      };
    }
  });

  var Conversation = (function (_engineDispatcher) {
    var _temp;

    return _temp = function () {
      Conversation.create = function create(option) {
        return new Conversation(option);
      };

      Conversation.get = function get(option) {
        return new Conversation(option);
      };

      Conversation.merge = function merge(option) {
        try {
          return common.mergeConversationList(option);
        } catch (e) {
          utils.consoleError(e);
        }
      };

      Conversation.remove = function remove(option) {
        var _validate = validate({
          type: Type.ConversationType,
          targetId: Type.String
        }, option, 'Conversation.remove'),
            isError = _validate.isError,
            info = _validate.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.REMOVE_CONVERSATION,
          args: [option]
        });
      };

      Conversation.getList = function getList(option) {
        var _validate2 = validate({
          count: Type.Number.canBeNull(),
          startTime: Type.Number.canBeNull()
        }, option, 'Conversation.getList'),
            isError = _validate2.isError,
            info = _validate2.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_CONVERSATION_LIST,
          args: [option]
        });
      };

      Conversation.getTotalUnreadCount = function getTotalUnreadCount() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_TOTAL_UNREAD_COUNT
        });
      };

      function Conversation(option) {
        this.type = void 0;
        this.targetId = void 0;

        var _validate3 = validate({
          type: Type.ConversationType,
          targetId: Type.String
        }, option, 'new Conversation'),
            isError = _validate3.isError,
            jsonInfo = _validate3.jsonInfo;

        if (isError) {
          utils.consoleError(jsonInfo);
          return jsonInfo;
        }

        utils.extend(this, option);
      }

      var _proto = Conversation.prototype;

      _proto.send = function send(option) {
        var eventName = 'conversation.send';

        var _validate4 = validate({
          messageType: Type.String,
          content: Type.Object
        }, option, eventName),
            isError = _validate4.isError,
            info = _validate4.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        var _option = option,
            messageType = _option.messageType,
            content = _option.content;

        var _validateMsgContent = validateMsgContent(messageType, content, eventName),
            isContentError = _validateMsgContent.isError,
            formatInfo = _validateMsgContent.info;

        if (isContentError) {
          return utils.Defer.reject(formatInfo);
        }

        var _option2 = option,
            isMentiond = _option2.isMentiond,
            mentiondType = _option2.mentiondType,
            mentiondUserIdList = _option2.mentiondUserIdList;
        isMentiond && (option.isMentioned = isMentiond);
        mentiondType && (option.mentionedType = mentiondType);
        mentiondUserIdList && (option.mentionedUserIdList = mentiondUserIdList);
        option = utils.extendInShallow(SEND_MESSAGE_TYPE_OPTION[messageType], option);
        option = utils.extendInShallow(SEND_MESSAGE_OPTION, option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SEND_MESSAGE,
          args: [this, option]
        });
      };

      _proto.recall = function recall(message, option) {
        var _validate5 = validate({
          sentTime: Type.Number,
          messageUId: Type.String
        }, message, 'conversation.recall'),
            isError = _validate5.isError,
            info = _validate5.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.RECALL_MESSAGE,
          args: [this, message, option]
        });
      };

      _proto.read = function read(option) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.CLEAR_UNREAD_COUNT,
          args: [this, option]
        });
      };

      _proto.getUnreadCount = function getUnreadCount() {
        var conversation = this;
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_UNREAD_COUNT,
          args: [conversation]
        });
      };

      _proto.getMessages = function getMessages(option) {
        var _validate6 = validate({
          order: Type.Number.canBeNull(),
          count: Type.Number.canBeNull(),
          timestrap: Type.Number.canBeNull()
        }, option, 'conversation.getMessages'),
            isError = _validate6.isError,
            info = _validate6.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        option = utils.extendInShallow(GET_MESSAGES_OPTION, option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_HISTORY_MSGS,
          args: [this, option]
        });
      };

      _proto.deleteMessages = function deleteMessages(messages) {
        var _validate7 = validate([{
          sentTime: Type.Number,
          messageUId: Type.String,
          messageDirection: Type.Number
        }], messages, 'conversation.deleteMessages'),
            isError = _validate7.isError,
            info = _validate7.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.DELETE_MESSAGES,
          args: [this, messages]
        });
      };

      _proto.clearMessages = function clearMessages(option) {
        var _validate8 = validate({
          timestrap: Type.Number
        }, option, 'conversation.clearMessages'),
            isError = _validate8.isError,
            info = _validate8.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.CLEAR_MESSAGES,
          args: [this, option]
        });
      };

      _proto.setStatus = function setStatus(option) {
        var _validate9 = validate({
          notificationStatus: Type.Number.canBeNull(),
          isTop: Type.Boolean.canBeNull()
        }, option, 'conversation.setStatus'),
            isError = _validate9.isError,
            info = _validate9.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        var allUndefinedValidate = validate(Type.NotAllUndefined, option);
        isError = allUndefinedValidate.isError;

        if (isError) {
          info = allUndefinedValidate.info;
          return utils.Defer.reject(info);
        }

        var notificationStatus = option.notificationStatus,
            isTop = option.isTop;
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_CONVERSATION_STATUS_LIST,
          args: [[{
            type: this.type,
            targetId: this.targetId,
            notificationStatus: notificationStatus,
            isTop: isTop
          }]]
        });
      };

      _proto.setStatusList = function setStatusList(statusList) {
        var _validate10 = validate([{
          notificationStatus: Type.Number.canBeNull(),
          isTop: Type.Boolean.canBeNull()
        }], statusList, 'conversation.setStatusList'),
            isError = _validate10.isError,
            info = _validate10.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        var self = this;
        statusList = utils.map(statusList, function (status) {
          return utils.extend(status, {
            type: self.type,
            targetId: self.targetId
          });
        });
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_CONVERSATION_STATUS_LIST,
          args: [statusList]
        });
      };

      _proto.destory = function destory() {
        var conversation = this;
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.REMOVE_CONVERSATION,
          args: [conversation]
        });
      };

      return Conversation;
    }(), _temp;
  });

  var ChatRoom = (function (_engineDispatcher) {
    var _temp;

    return _temp = function () {
      ChatRoom.get = function get(option) {
        return new ChatRoom(option);
      };

      function ChatRoom(option) {
        this.id = void 0;

        var _validate = validate({
          id: Type.String
        }, option, 'new ChatRoom'),
            isError = _validate.isError,
            jsonInfo = _validate.jsonInfo;

        if (isError) {
          utils.consoleError(jsonInfo);
          return jsonInfo;
        }

        utils.extend(this, option);
      }

      var _proto = ChatRoom.prototype;

      _proto.join = function join(option) {
        var _validate2 = validate({
          count: Type.Number.canBeNull()
        }, option, 'chatRoom.join'),
            isError = _validate2.isError,
            info = _validate2.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        option = utils.extendInShallow(JOIN_CHATROOM_OPTION, option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.JOIN_CHATROOM,
          args: [this, option]
        });
      };

      _proto.joinExist = function joinExist(option) {
        var _validate3 = validate({
          count: Type.Number.canBeNull()
        }, option, 'chatRoom.joinExist'),
            isError = _validate3.isError,
            info = _validate3.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        option['isJoinExist'] = true;
        option = utils.extendInShallow(JOIN_CHATROOM_OPTION, option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.JOIN_CHATROOM,
          args: [this, option]
        });
      };

      _proto.quit = function quit() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.QUIT_CHATROOM,
          args: [this]
        });
      };

      _proto.getInfo = function getInfo(option) {
        var _validate4 = validate({
          count: Type.Number.canBeNull(),
          order: Type.Number.canBeNull()
        }, option, 'chatRoom.getInfo'),
            isError = _validate4.isError,
            info = _validate4.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        option = utils.extendInShallow(GET_CHATROOM_INFO_OPTION, option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_CHATROOM_INFO,
          args: [this, option]
        });
      };

      _proto.send = function send(option) {
        var eventName = 'chatRoom.send';

        var _validate5 = validate({
          messageType: Type.String,
          content: Type.Object
        }, option, eventName),
            isError = _validate5.isError,
            info = _validate5.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        var id = this.id;
        var _option = option,
            messageType = _option.messageType,
            content = _option.content;

        var _validateMsgContent = validateMsgContent(messageType, content, eventName),
            isContentError = _validateMsgContent.isError,
            formatInfo = _validateMsgContent.info;

        if (isContentError) {
          return utils.Defer.reject(formatInfo);
        }

        var conversation = {
          type: CONVERSATION_TYPE.CHATROOM,
          targetId: id
        };
        option = utils.extendInShallow(SEND_MESSAGE_TYPE_OPTION[messageType], option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SEND_MESSAGE,
          args: [conversation, option]
        });
      };

      _proto.getMessages = function getMessages(option) {
        var _validate6 = validate({
          count: Type.Number.canBeNull(),
          order: Type.Number.canBeNull(),
          timestrap: Type.Number
        }, option, 'chatRoom.getInfo'),
            isError = _validate6.isError,
            info = _validate6.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        option = utils.extendInShallow(GET_CHATROOM_MESSAGES, option);
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_CHATROOM_MSGS,
          args: [this, option]
        });
      };

      _proto.setEntry = function setEntry(option) {
        var _validate7 = validate({
          key: Type.ChatRoomEntryKey,
          value: Type.ChatRoomEntryValue
        }, option, 'chatRoom.setEntry'),
            isError = _validate7.isError,
            info = _validate7.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_KV,
          args: [this, option]
        });
      };

      _proto.forceSetEntry = function forceSetEntry(option) {
        var _validate8 = validate({
          key: Type.ChatRoomEntryKey,
          value: Type.ChatRoomEntryValue
        }, option, 'chatRoom.forceSetEntry'),
            isError = _validate8.isError,
            info = _validate8.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.FORCE_SET_KV,
          args: [this, option]
        });
      };

      _proto.removeEntry = function removeEntry(option) {
        var _validate9 = validate({
          key: Type.ChatRoomEntryKey
        }, option, 'chatRoom.removeEntry'),
            isError = _validate9.isError,
            info = _validate9.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.DEL_KV,
          args: [this, option]
        });
      };

      _proto.forceRemoveEntry = function forceRemoveEntry(option) {
        var _validate10 = validate({
          key: Type.ChatRoomEntryKey
        }, option, 'chatRoom.forceRemoveEntry'),
            isError = _validate10.isError,
            info = _validate10.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.FORCE_DEL_KV,
          args: [this, option]
        });
      };

      _proto.getEntry = function getEntry(key) {
        var _validate11 = validate(Type.ChatRoomEntryKey, key, 'chatRoom.getEntry'),
            isError = _validate11.isError,
            info = _validate11.info;

        if (isError) {
          return utils.Defer.reject(info);
        }

        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_KV,
          args: [this, key]
        });
      };

      _proto.getAllEntries = function getAllEntries() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_ALL_KV,
          args: [this]
        });
      };

      return ChatRoom;
    }(), _temp;
  });

  var RTC = (function (_engineDispatcher) {
    var _temp;

    return _temp = function () {
      RTC.get = function get(option) {
        return new RTC(option);
      };

      function RTC(option) {
        this.roomId = void 0;
        this.option = void 0;
        this.roomId = option.id;
        this.option = option;
      }

      var _proto = RTC.prototype;

      _proto.join = function join() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.JOIN_RTC,
          args: [this.option]
        });
      };

      _proto.quit = function quit() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.QUIT_RTC,
          args: [this.option]
        });
      };

      _proto.ping = function ping() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.PING_RTC,
          args: [this.option]
        });
      };

      _proto.getRoomInfo = function getRoomInfo() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_RTC_ROOM_INFO,
          args: [this.option]
        });
      };

      _proto.getUserInfoList = function getUserInfoList() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_RTC_USER_INFO_LIST,
          args: [this.option]
        });
      };

      _proto.setUserInfo = function setUserInfo(info) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_RTC_USER_INFO,
          args: [this.option, info]
        });
      };

      _proto.removeUserInfo = function removeUserInfo(info) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.DEL_RTC_USER_INFO,
          args: [this.option, info]
        });
      };

      _proto.setData = function setData(key, value, isInner, apiType, message) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_RTC_DATA,
          args: [this.roomId, key, value, isInner, apiType, message]
        });
      };

      _proto.getData = function getData(keys, isInner, apiType) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_RTC_DATA,
          args: [this.roomId, keys, isInner, apiType]
        });
      };

      _proto.removeData = function removeData(keys, isInner, apiType, message) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.DEL_RTC_DATA,
          args: [this.roomId, keys, isInner, apiType, message]
        });
      };

      _proto.setUserData = function setUserData(key, value, isInner, message) {
        return this.setData(key, value, isInner, RTC_API_TYPE.PERSON, message);
      };

      _proto.setRTCUserData = function setRTCUserData(message, valueInfo, objectName) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_RTC_USER_DATA,
          args: [this.roomId, message, valueInfo, objectName]
        });
      };

      _proto.getUserData = function getUserData(keys, isInner) {
        return this.getData(keys, isInner, RTC_API_TYPE.PERSON);
      };

      _proto.removeUserData = function removeUserData(keys, isInner, message) {
        return this.removeData(keys, isInner, RTC_API_TYPE.PERSON, message);
      };

      _proto.setRoomData = function setRoomData(key, value, isInner, message) {
        return this.setData(key, value, isInner, RTC_API_TYPE.ROOM, message);
      };

      _proto.getRoomData = function getRoomData(keys, isInner) {
        return this.getData(keys, isInner, RTC_API_TYPE.ROOM);
      };

      _proto.removeRoomData = function removeRoomData(keys, isInner, message) {
        return this.removeData(keys, isInner, RTC_API_TYPE.ROOM, message);
      };

      _proto.getUserList = function getUserList() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_RTC_USER_LIST,
          args: [this.option]
        });
      };

      _proto.setOutData = function setOutData(rtcData, type, message) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_RTC_OUT_DATA,
          args: [this.roomId, rtcData, type, message]
        });
      };

      _proto.getOutData = function getOutData(userIds) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_RTC_OUT_DATA,
          args: [this.roomId, userIds]
        });
      };

      _proto.getToken = function getToken() {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.GET_RTC_TOKEN,
          args: [this.option]
        });
      };

      _proto.setState = function setState(content) {
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SET_RTC_STATE,
          args: [this.option, content]
        });
      };

      _proto.send = function send(option) {
        var id = this.roomId;
        var conversation = {
          type: CONVERSATION_TYPE.RTC_ROOM,
          targetId: id
        };
        return _engineDispatcher.exec({
          event: ENGINE_EVENT.SEND_MESSAGE,
          args: [conversation, option]
        });
      };

      return RTC;
    }(), _temp;
  });

  var IM = function () {
    function IM(option) {
      this._engineDispatcher = void 0;

      var _validate = validate({
        appkey: Type.String
      }, option, 'RongIMLib.init'),
          isError = _validate.isError,
          jsonInfo = _validate.jsonInfo;

      if (isError) {
        throw Error(jsonInfo);
      }

      var engineHandler = new EngineDispatcher(option);
      this._engineDispatcher = engineHandler;
      var Modules = {
        Conversation: Conversation(engineHandler),
        ChatRoom: ChatRoom(engineHandler),
        RTC: RTC(engineHandler)
      };
      utils.extend(this, Modules);
    }

    var _proto = IM.prototype;

    _proto.getConnectionStatus = function getConnectionStatus() {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.GET_CONNECTION_STATUS
      });
    };

    _proto.getConnectionUserId = function getConnectionUserId() {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.GET_CONNECTION_USER_ID
      });
    };

    _proto.getConnectedTime = function getConnectedTime() {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.GET_CONNECTED_TIME
      });
    };

    _proto.getAppInfo = function getAppInfo() {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.GET_APP_INFO
      });
    };

    _proto.watch = function watch(watchers) {
      var _validate2 = validate({
        conversation: Type.Function.canBeNull(),
        message: Type.Function.canBeNull(),
        status: Type.Function.canBeNull(),
        setting: Type.Function.canBeNull()
      }, watchers, 'im.watch'),
          isError = _validate2.isError,
          jsonInfo = _validate2.jsonInfo;

      if (isError) {
        utils.consoleError(jsonInfo);
        return jsonInfo;
      }

      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.WATCH,
        args: [watchers]
      });
    };

    _proto.unwatch = function unwatch(watchers) {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.UN_WATCH,
        args: [watchers]
      });
    };

    _proto.connect = function connect(user) {
      var _validate3 = validate({
        token: Type.String
      }, user, 'im.connect'),
          isError = _validate3.isError,
          info = _validate3.info;

      if (isError) {
        return utils.Defer.reject(info);
      }

      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.CONNECT,
        args: [user]
      });
    };

    _proto.reconnect = function reconnect() {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.RECONNECT
      });
    };

    _proto.disconnect = function disconnect() {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.DISCONNECT,
        args: [true]
      });
    };

    _proto.changeUser = function changeUser(user) {
      var _validate4 = validate({
        token: Type.String
      }, user, 'im.changeUser'),
          isError = _validate4.isError,
          info = _validate4.info;

      if (isError) {
        return utils.Defer.reject(info);
      }

      var self = this;
      return self.disconnect().then(function () {
        return self.connect(user);
      });
    };

    _proto.getFileToken = function getFileToken(fileType, originName) {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.GET_UPLOAD_TOKEN,
        args: [fileType, originName]
      });
    };

    _proto.getFileUrl = function getFileUrl(fileType, fileName, originName, uploadResp) {
      return this._engineDispatcher.exec({
        event: ENGINE_EVENT.GET_UPLOAD_URL,
        args: [fileType, fileName, originName, uploadResp]
      });
    };

    return IM;
  }();

  var imInstance;

  var initLogger = function initLogger(option, im) {
    var isDebug = option.isDebug,
        appkey = option.appkey,
        logCollectEvent = option.logger;
    utils.isFunction(logCollectEvent) && Logger.watchLog(logCollectEvent);
    Logger.setOption({
      isDebug: isDebug,
      appkey: appkey
    });
    Logger.info(TAG.A_INIT_O, {
      content: option
    });
    im.watch({
      status: function status(_ref) {
        var _status = _ref.status;
        Logger.setOption({
          isNetworkUnavailable: utils.isEqual(_status, CONNECTION_STATUS.NETWORK_UNAVAILABLE)
        });
      }
    });
  };

  var init = function init(option) {
    option = utils.extendInShallow(IM_OPTION, option);
    option.connectType = common.getConnectType(option);

    if (!imInstance) {
      imInstance = new IM(option);
      initLogger(option, imInstance);
    }

    return imInstance;
  };

  var getInstance = function getInstance() {
    return imInstance;
  };

  var index = utils.extend({
    init: init,
    getInstance: getInstance,
    env: env,
    common: common,
    ERROR_CODE: ERROR_CODE,
    Logger: Logger
  }, product);

  return index;

})));
