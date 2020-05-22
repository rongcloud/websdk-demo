(function(win) {
  var RongIMLib = win.RongIMLib,
    RongIMClient = RongIMLib.RongIMClient,
    utils = win.RongIM.Utils;

  var selfUserId;

  // 缓存消息, 用作撤回、删除等操作的参数
  var CacheMsg = {
    eventEmitter: new utils.EventEmitter(),
    _list: [],
    set: function (msg) {
      this._list.push(msg);
      this.eventEmitter.emit('msgChanged');
    },
    remove: function (msg) {
      var list = this._list;
      utils.forEach(list, function(child, index) {
        if (child.messageUId === msg.messageUId) {
          list.splice(index, 1);
        }
      }, { isReverse: true });
      this.eventEmitter.emit('msgChanged');
    },
    getLast: function () {
      var list = this._list, length = list.length;
      var msg = {};
      if (length) {
        msg = list[length - 1];
      }
      return msg;
    }
  };

  /**
   * 初始化以及链接
   * @param {object} config 
   * @param {string} config.appkey 融云颁发的 appkey
   * @param {string} config.token 融云颁发的 token(代表某一个用户)
   * @param {Object} watcher 
   * @param {Object} watcher.status 监听链接状态的变化
   * @param {Object} watcher.message 监听消息的接收
   */
  function init(config, watcher) {
    watcher = watcher || {};
    return utils.defered(function(resolve, reject) {
      var appkey = config.appkey;
      var token = config.token;
      config = utils.clearUndefKey(config);
      config = utils.copy(config);
      
      /* 
        初始化
        文档: https://docs.rongcloud.cn/im/imlib/web/init/
       */
      RongIMClient.init(appkey, null, config);
      RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          // 201、202 为请求导航过程状态码, 没有必要进行处理
          var unHandleStatus = [ 201, 202 ];
          if (unHandleStatus.indexOf(status) === -1) {
            watcher.status(status);
          }
        }
      });
      RongIMClient.setOnReceiveMessageListener({
        onReceived: watcher.message
      });

      /*
        链接
        文档: https://docs.rongcloud.cn/im/imlib/web/connect/
       */
      RongIMClient.connect(token, {
        onSuccess: function (userId) {
          selfUserId = userId;
          resolve(userId);
        },
        onTokenIncorrect: function () {
          reject('Token 错误');
        },
        onError: reject
      });
    });
  }

  /**
   * 断开链接
   * 文档: https://docs.rongcloud.cn/im/imlib/web/connect/#disconnect
   */
  function disconnect() {
    return utils.defered(function (resolve) {
      RongIMClient.getInstance().disconnect();
      resolve();
    });
  }

  function changeUser(config, watcher) {
    RongIMClient.getInstance().clearCache();
    RongIMClient.getInstance().logout();
    return init(config, watcher);
  }

  /**
   * 重新链接
   * 文档: https://docs.rongcloud.cn/im/imlib/web/connect/#reconnect
   */
  function reconnect(isAuto, url, rate) {
    rate = rate.split(',');
    utils.forEach(rate, function (rate, index) {
      rate[index] = Number(rate);
    });
    var config = {
      auto: isAuto,
      url: url,
      rate: rate
    };
    return utils.defered(function (resolve, reject) {
      var callback = {
        onSuccess: resolve,
        onTokenIncorrect: reject,
        onError: reject // 注: 此处因网络还不可用导致重连失败后, 可调用 reconnect(config) 继续重连
      };
      RongIMClient.reconnect(callback, config);
    });
  }

  /**
   * 获取会话列表
   * 文档: https://docs.rongcloud.cn/im/imlib/web/conversation/get-list/
   *
   * @param {number} count 获取会话的数量
   */
  function getConversationList(count) {
    return utils.defered(function(resolve, reject) {
      RongIMClient.getInstance().getConversationList({
        onSuccess: resolve,
        onError: reject
      }, null, count);
    });
  }

  /**
   * 删除会话列表
   * 文档: https://docs.rongcloud.cn/im/imlib/web/conversation/remove/
   */
  function removeConversation(conversationType, targetId) {
    conversationType = Number(conversationType);
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().removeConversation(conversationType, targetId, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 获取历史消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-list/get-list/
   * 
   * @param {number} timestrap 时间戳
   * @param {number} count 数量
   */
  function getHistoryMessages(timestrap, count, conversationType, targetId) {
    conversationType = Number(conversationType);
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 按时间删除历史消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-list/remove-list/#_1
   *
   * @param {number} timestrap 时间戳
   */
  function clearHistoryMessages(timestamp, conversationType, targetId) {
    conversationType = Number(conversationType);
    var params = {
      conversationType: conversationType,
      targetId: targetId,
      timestamp: timestamp
    };

    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().clearRemoteHistoryMessages(params, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 按消息删除历史消息
   * @param {string} messageUId 消息在 server 的唯一标识
   * @param {number} sentTime 消息发送时间
   * @param {number} messageDirection 消息方向
   */
  function deleteRemoteMessages(messageUId, sentTime, messageDirection, conversationType, targetId) {
    conversationType = Number(conversationType);
    if (!messageUId || !sentTime) {
      return utils.Defer.reject('请先发送消息, 再进行删除历史消息操作');
    }
    
    var deleteMsg = { 
      messageUId: messageUId,
      sentTime: sentTime,
      messageDirection: messageDirection
    };
    var messages = [ deleteMsg ];

    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().deleteRemoteMessages(conversationType, targetId, messages, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }


  /**
   * 获取指定会话未读数
   * 文档: https://docs.rongcloud.cn/im/imlib/web/conversation/unreadcount/#get-one
   * 
   * @param {number} conversationType 会话类型
   * @param {string} targetId 目标 id (对方 id、群组 id、聊天室 id 等)
   */
  function getUnreadCount(conversationType, targetId) {
    conversationType = Number(conversationType);
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().getUnreadCount(conversationType, targetId, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 获取所有会话未读数
   * 文档: https://docs.rongcloud.cn/im/imlib/web/conversation/unreadcount/#get-all
   */
  function getTotalUnreadCount() {
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().getTotalUnreadCount({
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 清除指定会话未读数
   * 文档: https://docs.rongcloud.cn/im/imlib/web/conversation/unreadcount/#clear
   */
  function clearUnreadCount(conversationType, targetId) {
    conversationType = Number(conversationType);
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function sendMessage(conversationType, targetId, msg) {
    conversationType = Number(conversationType);
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          CacheMsg.set(message);
          resolve(message);
        },
        onError: reject
      });
    });
  }

  /**
   * 发送文本消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#text
   * 注意事项:
   *    1: 单条消息整体不得大于128K
   *    2: conversationType 类型是 number，targetId 类型是 string
   * 
   * @param {string} text 文字内容
   * @param {number} conversationType 会话类型
   * @param {string} targetId 目标 id (对方 id、群组 id、聊天室 id 等)
   */
  function sendTextMessage(text, conversationType, targetId) {
    var content = {
      content: text // 文本内容
    };
    var msg = new RongIMLib.TextMessage(content);
    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 发送图片消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#image
   * 注意事项:
   *    1. 略缩图(content 字段)必须是 base64 字符串, 类型必须为 jpg
   *    2. base64 略缩图必须不带前缀
   *    3. base64 字符串大小不可超过 100 k
   *    4. 可通过 FileReader 或者 canvas 对图片进行压缩, 生成压缩后的 base64 字符串
   * imageUri 为上传至服务器的原图 url, 用来展示高清图片
   * 上传图片需开发者实现. 可参考上传插件: https://docs.rongcloud.cn/im/imlib/web/plugin/upload
   * 
   * @param {string} base64 图片 base64 缩略图
   * @param {string} imageUri 图片上传后的 url
   */
  function sendImageMessage(base64, imageUri, conversationType, targetId) {
    var content = {
      content: base64, // 压缩后的 base64 略缩图, 用来快速展示图片
      imageUri: imageUri // 上传到服务器的 url. 用来展示高清图片
    };
    var msg = new RongIMLib.ImageMessage(content);
    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 发送文件消息
   * 文档：https://docs.rongcloud.cn/im/imlib/web/message-send/#file
   * 
   * @param {string} fileName 文件名
   * @param {string} fileSize 文件大小
   * @param {string} fileType 文件类型
   * @param {string} fileUrl 文件上传后的 url
   */
  function sendFileMessage(fileName, fileSize, fileType, fileUrl, conversationType, targetId) {
    var content = {
      name: fileName, // 文件名
      size: fileSize, // 文件大小
      type: fileType, // 文件类型
      fileUrl: fileUrl // 文件地址
    };
    var msg = new RongIMLib.FileMessage(content);
    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 高质量语音消息: https://docs.rongcloud.cn/im/introduction/message_structure/#hqvoice_message
   * 注意事项:
   *   融云不提供声音录制的方法. remoteUrl 的生成需开发者实现
   * 
   * @param {string} remoteUrl 语音上传后的 url
   * @param {number} duration 语音时长
   */
  function sendVoiceMessage(remoteUrl, duration, conversationType, targetId) {
    var content = {
      remoteUrl: remoteUrl, // 音频 url, 建议格式: aac
      duration: duration // 音频时长
    };
    var msg = new RongIMLib.HQVoiceMessage(content);
    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 撤回消息: https://docs.rongcloud.cn/im/imlib/web/message-send/#recall
   * 注意事项:
   *   消息撤回操作服务器端没有撤回时间范围的限制，由客户端决定
   *
   * @param {string} messageUId 撤回的消息 Uid
   * @param {number} sentTime 撤回的消息 sentTime
   */
  function sendRecallMessage(messageUId, sentTime, conversationType, targetId) {
    if (!messageUId || !sentTime) {
      return utils.Defer.reject('请先发送消息, 再进行撤回操作');
    }
    var recallMessage = {
      messageUId: messageUId,
      sentTime: sentTime,
      senderUserId: selfUserId,
      conversationType: conversationType,
      targetId: targetId
    };
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().sendRecallMessage(recallMessage, {
        onSuccess: resolve,
        onError: reject
      });
    })
  }

  /**
   * 发送 @ 消息(此处以文本消息举例)
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#example
   * 
   * @param {string} text 文字内容
   * @param {string} methiondId @ 对象的 id
   */
  function sendAtMessage(text, methiondId, conversationType, targetId) {
    conversationType = Number(conversationType);

    var isMentioned = true;

    var mentioneds = new RongIMLib.MentionedInfo();
    mentioneds.type = RongIMLib.MentionedType.PART;
    mentioneds.userIdList = [methiondId]; // @ 人 id 列表

    var content = {
      content: text,
      mentionedInfo: mentioneds
    };
    var msg = new RongIMLib.TextMessage(content);

    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: resolve,
        onError: reject
      }, isMentioned);
    });
  }

  /**
   * 注册自定义消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#custom
   *
   * @param {string} messageName 注册消息的 Web 端类型名
   * @param {string} objectName 注册消息的唯一名称. 注: 此名称需多端一致
   * @param {boolean} isCounted 是否计数
   * @param {boolean} isPersited 是否存储
   * @param {Array<string>} props 消息包含的字段集合
   */
  function registerMessage(messageName, objectName, isCounted, isPersited, props) {
    var mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited); //true true 保存且计数，false false 不保存不计数。
    props = props.split(','); // 将字符串截取为数组. 此处为 Demo 逻辑, 与融云无关
    RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, props);
    return utils.Defer.resolve();
  }

  /**
   * 发送自定义消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#custom
   * 
   * @param {string} messageType 注册消息的 Web 端类型名
   * @param {*} props 消息包含的字段集合
   */
  function sendRegisterMessage(messageType, props, conversationType, targetId) {
    var content = props.split(',');
    var msg = new RongIMClient.RegisterMessage[messageType](content);
    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 发送位置消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#location
   * 注意事项:
   *   1. 缩略图必须是base64码的jpg图, 而且不带前缀"data:image/jpeg;base64,", 不得超过100K
   *   2. 需要开发者做显示效果, 一般显示逻辑: 图片加链接, 传入经纬度并跳转进入地图网站
   * 
   * @param {string} base64 位置缩略图
   * @param {number} latitude 维度
   * @param {number} longitude 经度
   * @param {string} poi 位置信息
   */
  function sendLocationMessage(base64, latitude, longitude, poi, conversationType, targetId) {
    var msg = new RongIMLib.LocationMessage({
      latitude: latitude,
      longitude: longitude,
      poi: poi,
      content: base64
    });

    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 发送富文本(图文)消息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#rich-content
   *
   * @param {string} title 图文标题
   * @param {number} content 图文内容
   * @param {number} imageUri 显示图片的 url(图片信息)
   * @param {string} url 点击图文后打开的 url
   */
  function sendRichContentMessage(title, content, imageUri, url, conversationType, targetId) {
    var msg = new RongIMLib.RichContentMessage({
      title: title,
      content: content,
      imageUri: imageUri,
      url: url
    });

    return sendMessage(conversationType, targetId, msg);
  }

  /**
   * 加入聊天室
   * 文档: https://docs.rongcloud.cn/im/imlib/web/chatroom/#join
   *
   * @param {string} chatRoomId 聊天室 id
   * @param {number} count 拉取消息数量
   */
  function joinChatRoom(chatRoomId, count) {
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 退出聊天室
   * 文档: https://docs.rongcloud.cn/im/imlib/web/chatroom/#quit
   *
   * @param {string} chatRoomId 聊天室 id
   */
  function quitChatRoom(chatRoomId) {
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().quitChatRoom(chatRoomId, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 获取聊天室信息
   * 文档: https://docs.rongcloud.cn/im/imlib/web/chatroom/#get
   *
   * @param {string} chatRoomId 聊天室 id
   * @param {string} count 获取人数
   * @param {string} order 排序方式
   */
  function getChatRoomInfo(chatRoomId, count, order) {
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count, order, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  /**
   * 发送聊天室消息(以文本消息为例)
   * 文档: https://docs.rongcloud.cn/im/imlib/web/message-send/#text
   *
   * @param {string} text 文字内容
   */
  function sendChatroomMessage(text, conversationType, targetId) {
    var content = {
      content: text // 文本内容
    };
    var msg = new RongIMLib.TextMessage(content);
    return sendMessage(conversationType, targetId, msg);
  }

  function setChatroomEntry(key, value, isAutoDelete, isSendNotification, extra, chatRoomId) {
    var entry = {
      key: key,
      value: value,
      notificationExtra: extra,
      isAutoDelete: isAutoDelete,
      isSendNotification: isSendNotification
    };
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().setChatroomEntry(chatRoomId, entry, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function forceSetChatroomEntry(key, value, isAutoDelete, isSendNotification, extra, chatRoomId) {
    var entry = {
      key: key,
      value: value,
      notificationExtra: extra,
      isAutoDelete: isAutoDelete,
      isSendNotification: isSendNotification
    };
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().forceSetChatroomEntry(chatRoomId, entry, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function removeChatroomEntry(key, isSendNotification, extra, chatRoomId) {
    var entry = {
      key: key,
      notificationExtra: extra,
      isSendNotification: isSendNotification
    };
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().removeChatroomEntry(chatRoomId, entry, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function forceRemoveChatroomEntry(key, isSendNotification, extra, chatRoomId) {
    var entry = {
      key: key,
      notificationExtra: extra,
      isSendNotification: isSendNotification
    };
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().forceRemoveChatroomEntry(chatRoomId, entry, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function getChatroomEntry(key, chatRoomId) {
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().getChatroomEntry(chatRoomId, key, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function getAllChatroomEntries(chatRoomId) {
    return utils.defered(function (resolve, reject) {
      RongIMClient.getInstance().getAllChatroomEntries(chatRoomId, {
        onSuccess: resolve,
        onError: reject
      });
    });
  }

  function getLastCacheMsgUId() {
    return CacheMsg.getLast().messageUId;
  }
  function getLastCacheMsgSentTime() {
    return CacheMsg.getLast().sentTime;
  }
  function getLastCacheMsgDirection() {
    return CacheMsg.getLast().messageDirection;
  }

  win.RongIM = win.RongIM || {};
  win.RongIM.Service = {
    init: init,
    disconnect: disconnect,
    reconnect: reconnect,

    registerMessage: registerMessage,
    sendRegisterMessage: sendRegisterMessage,

    getConversationList: getConversationList,
    removeConversation: removeConversation,

    getHistoryMessages: getHistoryMessages,
    clearHistoryMessages: clearHistoryMessages,
    deleteRemoteMessages: deleteRemoteMessages,

    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage,
    sendFileMessage: sendFileMessage,
    sendVoiceMessage: sendVoiceMessage,
    sendAtMessage: sendAtMessage,
    sendLocationMessage: sendLocationMessage,
    sendRichContentMessage: sendRichContentMessage,
    sendRecallMessage: sendRecallMessage,
    
    getUnreadCount: getUnreadCount,
    getTotalUnreadCount: getTotalUnreadCount,
    clearUnreadCount: clearUnreadCount,

    joinChatRoom: joinChatRoom,
    quitChatRoom: quitChatRoom,
    getChatRoomInfo: getChatRoomInfo,
    sendChatroomMessage: sendChatroomMessage,
    setChatroomEntry: setChatroomEntry,
    forceSetChatroomEntry: forceSetChatroomEntry,
    removeChatroomEntry: removeChatroomEntry,
    forceRemoveChatroomEntry: forceRemoveChatroomEntry,
    getChatroomEntry: getChatroomEntry,
    getAllChatroomEntries: getAllChatroomEntries,

    getLastCacheMsgSentTime: getLastCacheMsgSentTime,
    getLastCacheMsgUId: getLastCacheMsgUId,
    getLastCacheMsgDirection: getLastCacheMsgDirection,
    msgEmitter: CacheMsg.eventEmitter,

    changeUser: changeUser
  };
  
})(window);