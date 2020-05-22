(function (win, dependencies) {
  var RongIMLib = win.RongIMLib,
    RongIMClient = RongIMLib.RongIMClient;

  var RongIM = dependencies.RongIM,
    utils = RongIM.Utils,
    Service = RongIM.Service,
    config = RongIM.config;

  var disconnect = {
    name: '断开链接',
    event: Service.disconnect,
    eventName: 'disconnect',
    desc: '断开链接',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/connect/#disconnect',
    params: []
  };

  var reconnect = {
    name: '重新链接',
    event: Service.reconnect,
    eventName: 'reconnect',
    desc: '重新链接',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/connect/#reconnect',
    params: [
      { name: '是否嗅探', type: 'boolean', value: true },
      { name: '嗅探 url', type: 'string', value: 'https://cdn.ronghub.com/RongIMLib-2.2.6.min.js?d=' + Date.now() },
      { name: '嗅探频率', type: 'string', value: '100,1000,3000,3000,3000' }
    ]
  };

  var changeUser = {
    name: '切换用户',
    evnet: utils.noop,
    eventName: 'logout',
    desc: '切换用户',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/connect/#logout',
    params: [
      { name: 'Token', type: 'string', value: '5JQlp5czM31GNl99DOZyI3xpRjANxKgfakOnYLFljI+TMvOF0hGaVtR1n9Qp4baLgKBGsyl3w5j4gAWBbNZ3nOKrvnVo8Ldl' }
    ]
  };

  var registerMessage = {
    name: '注册自定义消息',
    event: Service.registerMessage,
    eventName: 'registerMessageType',
    desc: '注册自定义消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#custom-register',
    params: [
      { name: 'messageType', type: 'string', value: 'PersonMessage' },
      { name: 'objectName', type: 'string', value: 's:person' },
      { name: '是否计数', type: 'boolean', value: true },
      { name: '是否存储', type: 'boolean', value: true },
      { name: '属性', type: 'string', value: 'name,age' },
    ]
  };

  var getConversationList = {
    name: '获取会话列表',
    event: Service.getConversationList,
    eventName: 'getConversationList',
    desc: '获取会话列表',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/conversation/get-list/',
    params: [
      { name: '数量', type: 'number', value: 1000 }
    ]
  };

  var removeConversation = {
    name: '删除会话列表',
    event: Service.removeConversation,
    eventName: 'removeConversation',
    desc: '删除会话列表',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/conversation/remove/',
    params: [
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var getHistoryMessages = {
    name: '获取历史消息',
    event: Service.getHistoryMessages,
    eventName: 'getHistoryMessages',
    desc: '获取历史消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-list/get-list',
    params: [
      { name: '时间戳', type: 'number', value: 0 },
      { name: '数量', type: 'count', value: 20 },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var deleteRemoteMessages = {
    name: '删除历史消息(按消息)',
    event: Service.deleteRemoteMessages,
    eventName: 'deleteRemoteMessages',
    desc: '按消息删除指定历史消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-list/remove-list/#_2',
    params: [
      { name: '消息 Uid', type: 'string', value: '', event: Service.getLastCacheMsgUId },
      { name: '发送时间', type: 'number', value: 0, event: Service.getLastCacheMsgSentTime },
      { name: '消息方向', type: 'number', value: 1, event: Service.getLastCacheMsgDirection },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var clearHistoryMessages = {
    name: '删除历史消息(按时间)',
    event: Service.clearHistoryMessages,
    eventName: 'clearRemoteHistoryMessages',
    desc: '按时间删除历史消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-list/remove-list/#_1',
    params: [
      { name: '删除时间戳', type: 'number', value: Date.now()  },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendTextMessage = {
    name: '发送文字消息',
    event: Service.sendTextMessage,
    eventName: 'sendMessage',
    desc: '发送文字消息(TextMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#text',
    params: [
      { name: '文字内容', type: 'string', value: '我是一条文字消息' },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendImageMessage = {
    name: '发送图片消息',
    event: Service.sendImageMessage,
    eventName: 'sendMessage',
    desc: '发送图片消息(ImageMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#image',
    params: [
      { name: '缩略图', type: 'string', value: utils.getBase64Image() },
      { name: '原图 url', type: 'string', value: 'http://rongcloud.cn/images/newVersion/log_wx.png' },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendFileMessage = {
    name: '发送文件消息',
    event: Service.sendFileMessage,
    eventName: 'sendMessage',
    desc: '发送文件消息(FileMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#file',
    params: [
      { name: '文件名', type: 'string', value: 'logo_wx' },
      { name: '文件大小', type: 'string', value: '20k' },
      { name: '文件类型', type: 'string', value: 'png' },
      { name: '文件 url', type: 'string', value: 'http://rongcloud.cn/images/newVersion/log_wx.png' },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendVoiceMessage = {
    name: '发送语音消息',
    event: Service.sendVoiceMessage,
    eventName: 'sendMessage',
    desc: '发送语音消息(HQVoiceMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#example',
    params: [
      { name: '语音 url', type: 'string', value: 'https://rongcloud-audio.cn.ronghub.com/FoBsJofHDUm0Lh96iEFtaHDpjP8M?e=1578910770&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:Eqr39NNM2Xd2Bie8rcnOQUpRaIM=' },
      { name: '语音时长', type: 'number', value: 7 },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendRecallMessage = {
    name: '发送撤回消息',
    event: Service.sendRecallMessage,
    eventName: 'sendRecallMessage',
    desc: '发送撤回消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#recall',
    params: [
      { name: '消息 Uid', type: 'string', value: '', event: Service.getLastCacheMsgUId },
      { name: '发送时间', type: 'number', value: 0, event: Service.getLastCacheMsgSentTime },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendAtMessage = {
    name: '发送 @ 消息',
    event: Service.sendAtMessage,
    eventName: 'sendMessage',
    desc: '发送 @ 消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#example',
    params: [
      { name: '文字内容', type: 'string', value: '我是一条文本消息, 我 @ 了其他人' },
      { name: '@ 对象 id', type: 'string', value: config.targetId },
      { name: '会话类型', type: 'number', value: 3 },
      { name: '群组 id', type: 'string', value: config.targetId }
    ]
  };

  var sendRegisterMessage = {
    name: '发送自定义消息',
    event: Service.sendRegisterMessage,
    eventName: 'sendMessage',
    desc: '发送自定义消息(RegisterMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#custom-send',
    params: [
      { name: '消息类型', type: 'string', value: 'PersonMessage' },
      { name: '属性值', type: 'string', value: 'name,age' },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendLocationMessage = {
    name: '发送位置消息',
    event: Service.sendLocationMessage,
    eventName: 'sendMessage',
    desc: '发送位置消息(sendLocationMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#location',
    params: [
      { name: '维度', type: 'number', value: 40.0317727 },
      { name: '经度', type: 'number', value: 116.4175057 },
      { name: '位置缩略图', type: 'string', value: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKE' },
      { name: '位置信息', type: 'string', value: '北苑路北辰·泰岳' },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var sendRichContentMessage = {
    name: '发送富文本消息',
    event: Service.sendRichContentMessage,
    eventName: 'sendMessage',
    desc: '发送富文本(图文)消息(sendRichContentMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#rich-content',
    params: [
      { name: '图文标题', type: 'string', value: '标题: 融云' },
      { name: '图文内容', type: 'string', value: '为用户提供 IM 即时通讯和音视频通讯云服务' },
      { name: '图片信息', type: 'string', value: 'https://www.rongcloud.cn/images/newVersion/log_wx.png' },
      { name: '图文链接', type: 'string', value: 'https://developer.rongcloud.cn' },
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var getUnreadCount = {
    name: '获取会话未读数',
    event: Service.getUnreadCount,
    eventName: 'getUnreadCount',
    desc: '获取指定会话未读数',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/conversation/unreadcount/#get-one',
    params: [
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var getTotalUnreadCount = {
    name: '获取会话未读数总数',
    event: Service.getTotalUnreadCount,
    eventName: 'getTotalUnreadCount',
    desc: '获取会话未读总数',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/conversation/unreadcount/#get-all',
    params: [
    ]
  };

  var clearUnreadCount = {
    name: '清除会话未读数',
    event: Service.clearUnreadCount,
    eventName: 'clearUnreadCount',
    desc: '清除指定会话未读数',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/conversation/unreadcount/#clear',
    params: [
      { name: '会话类型', type: 'number', value: 1 },
      { name: '对方 id', type: 'string', value: config.targetId }
    ]
  };

  var joinChatRoom = {
    name: '加入聊天室',
    event: Service.joinChatRoom,
    eventName: 'joinChatRoom',
    desc: '加入指定聊天室, 并拉取消息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#join',
    params: [
      { name: '聊天室 id', type: 'string', value: config.targetId },
      { name: '拉取消息数', type: 'number', value: 5 }
    ]
  };

  var quitChatRoom = {
    name: '退出聊天室',
    event: Service.quitChatRoom,
    eventName: 'quitChatRoom',
    desc: '退出聊天室',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#quit',
    params: [
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var getChatRoomInfo = {
    name: '获取聊天室信息',
    event: Service.getChatRoomInfo,
    eventName: 'getChatRoomInfo',
    desc: '获取聊天室信息',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#get',
    params: [
      { name: '聊天室 id', type: 'string', value: config.targetId },
      { name: '获取人数', type: 'number', value: 20 },
      { name: '排序方式', type: 'number', value: 1 }
    ]
  };

  var setChatroomEntry = {
    name: '设置聊天室属性',
    event: Service.setChatroomEntry,
    eventName: 'setChatroomEntry',
    desc: '设置聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_1',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey1' },
      { name: '属性 value', type: 'string', value: '我是一个聊天室 value' },
      { name: '是否退出清除', type: 'boolean', value: true },
      { name: '是否发送消息', type: 'boolean', value: true },
      { name: '附加信息', type: 'string', value: '我是消息中的附加信息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var forceSetChatroomEntry = {
    name: '设置聊天室属性(强制)',
    event: Service.forceSetChatroomEntry,
    eventName: 'forceSetChatroomEntry',
    desc: '强制设置聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_2',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey2' },
      { name: '属性 value', type: 'string', value: '我是一个聊天室 value' },
      { name: '是否退出清除', type: 'boolean', value: true },
      { name: '是否发送消息', type: 'boolean', value: true },
      { name: '附加信息', type: 'string', value: '我是消息中的附加信息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var removeChatroomEntry = {
    name: '删除聊天室属性',
    event: Service.removeChatroomEntry,
    eventName: 'removeChatroomEntry',
    desc: '删除聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_3',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey1' },
      { name: '是否发送消息', type: 'boolean', value: true },
      { name: '附加信息', type: 'string', value: '我是消息中的附加信息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var forceRemoveChatroomEntry = {
    name: '删除聊天室属性(强制)',
    event: Service.forceRemoveChatroomEntry,
    eventName: 'forceRemoveChatroomEntry',
    desc: '强制删除聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_4',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey2' },
      { name: '是否发送消息', type: 'boolean', value: true },
      { name: '附加信息', type: 'string', value: '我是消息中的附加信息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var getChatroomEntry = {
    name: '获取聊天室属性',
    event: Service.getChatroomEntry,
    eventName: 'getChatroomEntry',
    desc: '获取指定聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_5',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey1' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var getAllChatroomEntries = {
    name: '获取聊天室属性(所有)',
    event: Service.getAllChatroomEntries,
    eventName: 'getAllChatroomEntries',
    desc: '获取所有聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_6',
    params: [
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var sendChatroomMessage = {
    name: '发送聊天室消息',
    event: Service.sendChatroomMessage,
    eventName: 'sendMessage',
    desc: '发送聊天室消息, 以文本消息为例(TextMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#example',
    params: [
      { name: '文字内容', type: 'string', value: '我是一条聊天室的文字消息' },
      { name: '会话类型', type: 'number', value: 4 },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  win.RongIM = win.RongIM || {};
  
  win.RongIM.DefailtReadyApiQueue = [
    [disconnect, reconnect],
    [registerMessage],
    [getConversationList, removeConversation, getUnreadCount, getTotalUnreadCount, clearUnreadCount],
    [sendTextMessage, sendImageMessage, sendRecallMessage, sendFileMessage, sendVoiceMessage, sendRegisterMessage, sendAtMessage, sendLocationMessage, sendRichContentMessage],
    [getHistoryMessages, deleteRemoteMessages, clearHistoryMessages],
    [joinChatRoom, getChatRoomInfo, sendChatroomMessage],
    [setChatroomEntry, getChatroomEntry, forceSetChatroomEntry, getAllChatroomEntries, removeChatroomEntry, forceRemoveChatroomEntry],
    [quitChatRoom]
  ];
  
  win.RongIM.ApiList = [
    getConversationList
  ];

  window.RongIM.Api = {
    changeUser: changeUser
  }

})(window, {
  RongIM: RongIM
});