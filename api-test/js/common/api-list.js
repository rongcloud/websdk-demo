(function (win, dependencies) {
  var RongIMLib = win.RongIMLib,
    RongIMClient = RongIMLib.RongIMClient;

  var RongIM = dependencies.RongIM,
    utils = RongIM.Utils,
    Service = RongIM.Service,
    config = RongIM.config.im,
    urlQueryConfig = utils.getUrlQuery();

  var MiniUnSupportEventList = [
    'sendRecallMessage', 'deleteRemoteMessages', 'clearRemoteHistoryMessages'
  ];

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
      // { name: '是否嗅探', type: 'boolean', value: true },
      // { name: '嗅探 url', type: 'string', value: 'https://cdn.ronghub.com/RongIMLib-2.2.6.min.js?d=' + Date.now() },
      // { name: '嗅探频率', type: 'string', value: '100,1000,3000,3000,3000' }
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
      { name: '数量', type: 'number', value: 20 },
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
      { name: '对方 id', type: 'string', value: config.targetId },
      { name: '状态消息', type: 'boolean', value: false }
    ]
  };

  var sendImageMessage = {
    name: '发送图片消息',
    event: Service.sendImageMessage,
    eventName: 'sendMessage',
    desc: '发送图片消息(ImageMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#image',
    params: [
      { name: '缩略图', type: 'string', value: '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oIqCtEXZdtphdSJsrH4QTjLqhtKCtdMhkt5rQxoa3QCgQWREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQQdQtK0ywtklbJG5+VXVc0DT1K3TqFpTtvA2z4Do2WfDSrhU13UqVe7HQvsgfA1zWOOKjnYjnnrUrbWGzdbpf6jDjrXu6D0/DT8FmSeiehERVRERAREQEREBERAREQEREBERAREQEREBERAREQEREEEE6GiijtxwpPgtG02W2yzSGK2GONwoG0zbpmDz+SDdo7ccJR244URtc2Noe7E4DN1KVVkEUduOEo7ccKUQRR244SjtxwpRBFHbjhKO3HClEEUduOEo7ccKUQRR244SjtxwpRBFHbjhKO3HClEEUduOEo7ccKUQRR244SjtxwpRBFHbjhKO3HClEEUduOEo7ccKUQRR244SjtxwpRBFHbjhKO3HClEEUduOEo7ccKUQD4Ii07VLbmOlFngY8BowEnU8oNxF8ya0XuC8RWSI4Wijia4jlWgqNM9f87mKfrMBADKd70OWn5oM6LFG6Qvo4CnzWVAREQEREBERAREQEREBERAREQEREBERAREQEREBERAOoUoiAiIgIiIC+VaLymiksrWtjImjxuqDkaeGaIgXfeU1qbZS9sY6wcXYQcqGmWazR22R0sTS1lHuAOR/gr+qIg30REBERAREQEREBERAREQEREBERAREQEREH//Z' },
      { name: '原图 url', type: 'string', value: 'https://nfsprodrcx.cn.ronghub.com/v3/BGSPKH501EG0K6MI/base64.png?token=Um9uZ2Nsb3VkMTQyMDIwMDMxNzAzMzk1OTM2MDBtZXNzYWdlOzs7MjczMTk5NDg4OA==' },
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
      { name: '文件大小', type: 'number', value: 20000 },
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
      { name: '语音 url', type: 'string', value: 'https://rongcloud-audio.cn.ronghub.com/audio_amr__RC-2020-03-17_42_1584413950049.aac?e=1599965952&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:CDngyWj7ZApNmAfoecng7L_3SaU=' },
      { name: '语音类型', type: 'string', value: 'aac' },
      { name: '语音时长', type: 'number', value: 6 },
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
      { name: '位置缩略图', type: 'string', value: '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' },
      { name: '维度', type: 'number', value: 40.03190424323978 },
      { name: '经度', type: 'number', value: 116.41731465378871 },
      { name: '位置信息', type: 'string', value: '奥运村街道麦当劳(上品奥运村店)上品+(奥运村店)' },
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
      { name: '拉取消息数', type: 'number', value: 2 }
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

  var getChatRoomHistoryMessages = {
    name: '获取聊天室历史消息',
    event: Service.getChatRoomHistoryMessages,
    eventName: 'getChatRoomHistoryMessages',
    desc: '获取聊天室历史消息',
    params: [
      { name: '聊天室 id', type: 'string', value: config.targetId },
      { name: '获取时间', type: 'number', value: 0 },
      { name: '获取个数', type: 'number', value: 20 },
      { name: '排序方式', type: 'number', value: 0 }
    ]
  };

  var setChatRoomEntry = {
    name: '设置聊天室属性',
    event: Service.setChatRoomEntry,
    eventName: 'setChatRoomEntry',
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

  var forceSetChatRoomEntry = {
    name: '设置聊天室属性(强制)',
    event: Service.forceSetChatRoomEntry,
    eventName: 'forceSetChatRoomEntry',
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

  var removeChatRoomEntry = {
    name: '删除聊天室属性',
    event: Service.removeChatRoomEntry,
    eventName: 'removeChatRoomEntry',
    desc: '删除聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_3',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey1' },
      { name: '是否发送消息', type: 'boolean', value: true },
      { name: '附加信息', type: 'string', value: '我是消息中的附加信息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var forceRemoveChatRoomEntry = {
    name: '删除聊天室属性(强制)',
    event: Service.forceRemoveChatRoomEntry,
    eventName: 'forceRemoveChatRoomEntry',
    desc: '强制删除聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_4',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey2' },
      { name: '是否发送消息', type: 'boolean', value: true },
      { name: '附加信息', type: 'string', value: '我是消息中的附加信息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var getChatRoomEntry = {
    name: '获取聊天室属性',
    event: Service.getChatRoomEntry,
    eventName: 'getChatRoomEntry',
    desc: '获取指定聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_5',
    params: [
      { name: '属性 key', type: 'string', value: 'chrmKey1' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var getAllChatRoomEntries = {
    name: '获取聊天室属性(所有)',
    event: Service.getAllChatRoomEntries,
    eventName: 'getAllChatRoomEntries',
    desc: '获取所有聊天室自定义属性',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/chatroom/#_6',
    params: [
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var sendChatRoomMessage = {
    name: '发送聊天室消息',
    event: Service.sendChatRoomMessage,
    eventName: 'sendMessage',
    desc: '发送聊天室消息, 以文本消息为例(TextMessage)',
    doc: 'https://docs.rongcloud.cn/im/imlib/web/message-send/#example',
    params: [
      { name: '文字内容', type: 'string', value: '我是一条聊天室的文字消息' },
      { name: '聊天室 id', type: 'string', value: config.targetId }
    ]
  };

  var joinRTCRoom = {
    name: '加入 RTC 房间',
    event: Service.joinRTCRoom,
    eventName: 'rtc.join',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId },
      { name: '模式', type: 'number', value: 0 }
    ]
  };

  var pingRTCRoom = {
    name: 'Ping RTC',
    event: Service.pingRTCRoom,
    eventName: 'rtc.ping',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  var setRTCData = {
    name: '设置 RTC 数据',
    event: Service.setRTCData,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId },
      { name: 'key', type: 'string', value: 'key' },
      { name: 'value', type: 'string', value: 'value' },
      { name: 'isInner', type: 'boolean', value: false },
      { name: 'apiType', type: 'number', value: 1 }
    ]
  };

  var getRTCData = {
    name: '获取 RTC 数据',
    event: Service.getRTCData,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId },
      { name: 'key', type: 'string', value: 'key' },
      { name: 'isInner', type: 'boolean', value: false },
      { name: 'apiType', type: 'number', value: 1 }
    ]
  };

  var removeRTCData = {
    name: '删除 RTC 数据',
    event: Service.removeRTCData,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId },
      { name: 'key', type: 'string', value: 'key' },
      { name: 'isInner', type: 'boolean', value: false },
      { name: 'apiType', type: 'number', value: 1 }
    ]
  };

  var getRTCToken = {
    name: '获取 RTC Token',
    event: Service.getRTCToken,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  var getRTCRoomInfo = {
    name: '获取 RTC 房间信息',
    event: Service.getRTCRoomInfo,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  var setRTCUserInfo = {
    name: '设置 RTC 人员信息',
    event: Service.setRTCUserInfo,
    eventName: 'rtc.getRTCUserInfoList',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  var getRTCUserInfoList = {
    name: '获取 RTC 人员列表',
    event: Service.getRTCUserInfoList,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  var removeRTCUserInfo = {
    name: '删除 RTC 人员信息',
    event: Service.removeRTCUserInfo,
    eventName: '',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  var quitRTCRoom = {
    name: '退出 RTC 房间',
    event: Service.quitRTCRoom,
    eventName: 'rtc.quit',
    desc: '',
    params: [
      { name: '房间 id', type: 'string', value: config.targetId }
    ]
  };

  win.RongIM = win.RongIM || {};
  
  var DefailtReadyApiQueue = [
    [disconnect, reconnect],
    [getConversationList, removeConversation, /* getUnreadCount */ getTotalUnreadCount, clearUnreadCount],
    [sendTextMessage, sendImageMessage, sendRecallMessage, sendFileMessage, sendVoiceMessage, sendRegisterMessage, sendAtMessage, sendLocationMessage, sendRichContentMessage],
    [getHistoryMessages, deleteRemoteMessages, clearHistoryMessages],
    [joinChatRoom, getChatRoomInfo, sendChatRoomMessage, getChatRoomHistoryMessages],
    [setChatRoomEntry, getChatRoomEntry, forceSetChatRoomEntry, getAllChatRoomEntries, removeChatRoomEntry, forceRemoveChatRoomEntry],
    [quitChatRoom],
    [joinRTCRoom, pingRTCRoom, setRTCData, getRTCData, removeRTCData, getRTCToken, getRTCRoomInfo, getRTCUserInfoList, setRTCUserInfo, removeRTCUserInfo],
    [quitRTCRoom],
  ];
  urlQueryConfig.isMini && utils.forEach(DefailtReadyApiQueue, function (list, i) {
    utils.forEach(list, function (item, j) {
      if (MiniUnSupportEventList.indexOf(item.eventName) !== -1) {
        list.splice(j, 1);
      }
    }, { isReverse: true })
  });
  win.RongIM.DefailtReadyApiQueue = DefailtReadyApiQueue;
  
  win.RongIM.ApiList = [
    getConversationList
  ];

  window.RongIM.Api = {
    changeUser: changeUser
  }

})(window, {
  RongIM: RongIM
});