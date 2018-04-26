"use strict";
(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.RongService = factory();
  }
})(window, function() {

  var IMLib = null,
    IMClient = null,
    imInstance = null;

  var utils = {
    isFunction: function(func) {
      return (typeof func == 'function');
    },
    isArray: function(arrs) {
      return (Object.prototype.toString.call(arrs) == '[object Array]');
    },
    noop: function() {},
    forEach: function(arrs, callback) {
      for (var i = 0, len = arrs.length; i < len; i++) {
        var item = arrs[i];
        callback(item, i);
      }
    },
    copy: function(target, source) {
      for (var key in source) {
        target[key] = source[key];
      }
    }
  };

  var Logger = {
    warn: console.warn,
    log: console.log
  };

  var Emitter = (function() {
    var events = {};
    var fire = function(name, args) {
      if (name in events) {
        for (var i = 0, len = events[name].length; i < len; i++) {
          events[name][i](args);
        }
      }
    };

    var on = function(name, event) {
      var isFunc = utils.isFunction(event);
      if (!isFunc) {
        return;
      }
      events[name] = events[name] || [];
      events[name].push(event);
    };

    return {
      fire: fire,
      on: on
    };
  })();

  function Watcher() {
    var checkIndexOutBound = function(index, bound) {
      return index > -1 && index < bound;
    };

    this.watcherList = [];

    this.add = function(observer, force) {
      if (force) {
        this.watcherList.length = 0;
      }
      this.watcherList.push(observer);
    };

    this.get = function(index) {
      if (checkIndexOutBound(index, this.watcherList.length)) {
        return this.watcherList[index];
      }
    };

    this.count = function() {
      return this.watcherList.length;
    };

    this.removeAt = function(index) {
      checkIndexOutBound(index, this.watcherList.length) && this.watcherList.splice(index, 1);
    };

    this.remove = function(observer) {
      if (!observer) {
        this.watcherList.length = 0;
        return;
      }
      var isFunction = (Object.prototype.toString.call(observer) === '[object Function]');
      var watcherList = isFunction ? [observer] : observer;
      for (var i = 0, len = this.watcherList.length; i < len; i++) {
        for (var j = 0; j < watcherList.length; j++) {
          if (this.watcherList[i] === watcherList[j]) {
            this.removeAt(i);
            break;
          }
        }
      }
    };

    this.notify = function(val) {
      for (var i = 0, len = this.watcherList.length; i < len; i++) {
        this.watcherList[i](val);
      }
    };

    this.indexOf = function(observer, startIndex) {
      var i = startIndex || 0,
        len = this.watcherList.length;
      while (i < len) {
        if (this.watcherList[i] === observer) {
          return i;
        }
        i++;
      }
      return -1;
    };
  }

  var User = {
    _Cache: {}
  };

  /*
    此处只为演示，实际应用需请求应用服务器获取用户信息
  */
  User.get = function(user) {
    var id = user.id;

    //保证不刷新页面情况下，同一个 userId 的信息是一致的
    user = User._Cache[id];
    if (user) {
      return user;
    }

    var nameList = "梦琪忆柳之桃慕青问兰尔岚元香初夏沛菡傲珊曼文乐菱痴珊恨玉惜文香寒新柔语蓉海安夜蓉涵柏水桃醉蓝春儿语琴从彤傲晴语兰又菱碧彤元霜怜梦紫寒妙彤曼易南莲紫翠雨寒易烟如萱若南寻真晓亦向珊慕灵以蕊寻雁映易雪柳孤岚笑霜海云";
    var nameLen = nameList.length;

    var xingList = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张于";
    var xingLen = xingList.length;

    var portraits = [
      'https://rongcloud-image.cn.ronghub.com/fa33294a358e7f2abf.gif?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:z2QkbpEqUEMrOPrJtV3tBP4gQYo=',
      'http://7xogjk.com1.z0.glb.clouddn.com/01fac54313ad977d6e.gif',
      'https://rongcloud-image.cn.ronghub.com/2fcdba4205860a63fb.gif?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:m7S0ADf1E-d2bIG3E0vuiZJSH_w=',
      'http://oqekw07cj.bkt.clouddn.com/9da99c4255a24baba1.gif',
      'http://2f.zol-img.com.cn/product/172_100x75/267/cepP02EKJTV6.gif',
      'https://fsprodrcx.cn.ronghub.com/lVMs15VSLeR47CzXlVMs15VbxLGVULo2/timg.gif',
      'https://fsprodrcx.cn.ronghub.com/FmUv4RZmLtL72i_hFmUv4RYqrWMWbCI7/timg+%284%29.gif',
      'https://fsprodrcx.cn.ronghub.com/vJiff7ybnkxRJ59_vJiff7zADyO8gW0a/timg+%285%29.gif',
      'https://fsprodrcx.cn.ronghub.com/5FJuo-RTb5AJ7W6j5FJuo-Rf_-_kU162/timg+%283%29.gif',
      'https://fsprodrcx.cn.ronghub.com/Jx-MkScejaLKoIyRJx-MkScT89YnHp6U/timg+%282%29.gif',
      'https://fsprodrcx.cn.ronghub.com/pQjyn6UJ86xIt_KfpQjyn6UGM_6lDaO-/timg+%281%29.gif',
      'https://fsprodrcx.cn.ronghub.com/1T1xVdU_cGY4gnFV1T1xVdUFyRPVM_4N/test.gif',
      'https://fsprodrcx.cn.ronghub.com/yn2CV8p8g2QnwoJXyn2CV8ppkNXKdrNS/1512691986120.gif',
      'https://fsprodrcx.cn.ronghub.com/B0qmIAdLpxPq9aYgB0qmIAdV5acHSrhp/timg.jpeg'
    ];

    var portraitLen = portraits.length;

    var getIndex = (max) => {
      return Math.floor(Math.random() * max) || 1;
    };

    var getName = (len) => {
      var names = [];
      for (var i = 0; i < len; i++) {
        var index = getIndex(nameLen);
        names.push(nameList[index]);
      }
      return names.join('');
    };

    var getXing = (index) => {
      return xingList.split('')[index];
    };

    var getPortrait = (index) => {
      return portraits[index];
    };

    var nameIndex = getIndex(3);
    var xingIndex = getIndex(xingLen);
    var name = getXing(xingIndex) + getName(nameIndex);

    var portraitIndex = getIndex(portraitLen);

    var portrait = getPortrait(portraitIndex);

    user = {
      name: name,
      portrait: portrait
    };
    User._Cache[id] = user;
    return user;
  };

  var formatSentTime = function(time) {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return hours + ':' + minutes;
  }

  var getMessageContent = function(message) {
    var content = '[暂未解析此类型消息]';
    var messageMap = {
      TextMessage: message.content.content,
      FileMessage: '[文件]',
      ImageMessage: '[图片]'
    };
    var messageType = message.messageType;
    return messageMap[messageType] || content;
  };

  var formartMessage = function(message) {
    var sender = User.get({
      id: message.senderUserId
    });
    var sentTime = message.sentTime;
    sentTime = formatSentTime(sentTime);

    var direction = (message.messageDirection == 1) ? 'sender' : 'receiver';

    var content = getMessageContent(message);

    utils.copy(message, {
      _sender: sender,
      _sentTime: sentTime,
      _direction: direction,
      _content: content
    });
  }

  var conversationWatcher = new Watcher();

  var Conversation = {};

  Conversation.get = function(callback) {
    callback = callback || utils.noop;
    // 过滤会话类型，null 为不过滤，获取全部会话类型, conversationTypes = null | [1, 3]
    var conversationTypes = null;
    imInstance.getConversationList({
      onSuccess: function(conversationList) {
        var error = null;

        // 示例暂时只演示单聊
        conversationList = conversationList.filter(function(conversation) {
          var isPrivate = (conversation.conversationType == IMLib.ConversationType.PRIVATE);
          return isPrivate;
        });

        utils.forEach(conversationList, function(conversation) {
          var target = User.get({
            id: conversation.targetId
          });

          var sentTime = conversation.sentTime;
          sentTime = formatSentTime(sentTime);

          var message = conversation.latestMessage;
          var content = getMessageContent(message);
          var sender = User.get({
            id: message.senderUserId
          });

          utils.copy(message, {
            _content: content
          });
          utils.copy(conversation, {
            _target: target,
            _sentTime: sentTime,
            _sender: sender
          });
        });

        callback(error, conversationList);
      },
      onError: function(error) {
        Logger.log('Conversation.get Error: %s', error);
        callback(error);
      }
    }, conversationTypes);
  };

  Conversation.watch = function(watcher) {
    conversationWatcher.add(watcher);
  };

  Emitter.on('onconversation', function(conversation) {
    Conversation.get(function(conversationList) {
      conversationWatcher.notify(conversationList);
    });
  });

  var Message = {};
  var messageWatcher = new Watcher();

  Message.get = function(conversation, callback) {
    var type = conversation.type;
    var targetId = conversation.targetId;
    var count = 20;
    // 获取历史消息起始时间，0 表示从最近的一条消息开始向前获取 20 条, 详细说明：http://www.rongcloud.cn/docs/web_api_demo.html#message_history
    var timestrap = 0;
    imInstance.getHistoryMessages(type, targetId, timestrap, count, {
      onSuccess: function(messageList) {
        var error = null;

        utils.forEach(messageList, function(message) {
            formartMessage(message);
        });

        callback(error, messageList);
      },
      onError: function(error) {
        Logger.log('Message.get Error: %s', error);
        callback(error);
      }
    });
  };

  Message.sendTxt = function(message, callback) {
    callback = callback || utils.noop;

    var content = message.content;
    var sender = message.sender;
    var msg = new IMLib.TextMessage({
      content: content,
      user: sender
    });

    var conversationtype = message.type
    var targetId = message.targetId;
    imInstance.sendMessage(conversationtype, targetId, msg, {
      onSuccess: function(message) {
        var error = null;
        formartMessage(message);
        callback(error, message);

        Emitter.fire('onconversation');
      },
      onError: function(error) {
        Logger.log('Message.sendTxt Error: %s', error);
        callback(error);
      }
    });
  };

  Message.watch = function(watcher) {
    messageWatcher.add(watcher);
  };

  Emitter.on('onmessage', function(message) {
    messageWatcher.notify(message);
  });

  var setListener = function() {
    IMClient.setConnectionStatusListener({
      onChanged: function(status) {
        //Status 说明可参考 http://www.rongcloud.cn/docs/web_api_demo.html#init_listener
        Logger.warn('WebSDK Status Changed: %d', status);
      }
    });

    IMClient.setOnReceiveMessageListener({
      onReceived: function(message) {
        formartMessage(message);
        Emitter.fire('onmessage', message);
        Emitter.fire('onconversation');
      }
    });
  };

  var services = {
    Conversation: Conversation,
    Message: Message
  };

  var connect = function(token, callback) {
    callback = callback || utils.noop;
    IMClient.connect(token, {
      onSuccess: function(id) {
        var currentUser = {
          id: id
        };
        callback(services, currentUser);
      },
      onTokenIncorrect: function() {
        Logger.log('token 无效, 请参考: http://support.rongcloud.cn/kb/NDQ1');
      },
      onError: function(code) {
        Logger.log(code);
      }
    });
  };

  /*
    var options = {
      appKey: '',
      sdk: {
        navi: '',
        protobuf: ''
      }
    };
    
    var callback = function(services, currentUser){
     
    };

    var modules = {
      RongIMLib: RongIMLib,
      protobuf: protobuf
    };
  */
  var init = function(options, callback, modules) {
    IMLib = modules.RongIMLib;
    IMClient = IMLib.RongIMClient;

    var appKey = options.appKey;
    var sdk = options.sdk;
    IMClient.init(appKey, null, sdk);
    imInstance = IMClient.getInstance();

    setListener();

    var token = options.token;
    connect(token, callback);

  };

  return {
    init: init
  };

});