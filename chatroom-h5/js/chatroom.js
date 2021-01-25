; (function (global, factory, namespace) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		global[namespace] = factory();
	}
})(window, function () {
	"use strict";

	function initApp(appInfo, callbacks) {
		window.RongIM = window.RongIM || {};
		var RongIMLib = window.RongIMLib;
		var RongIMClient = RongIMLib.RongIMClient;

		if (RongIM.ready) {
			callbacks.onReady && callbacks.onReady(RongIM.instance);
			callbacks.onConnected && callbacks.onConnected(RongIM.instance, RongIM.userInfo);
			return;
		} else {
			var appKey = appInfo.appKey;
			var token = appInfo[id];

			RongIMLib.RongIMClient.init(appKey);
			registerMessageType();

			RongIMClient.connect(token, {
				onSuccess: function (userId) {
					RongIM.ready = true;
					RongIM.userInfo = {
						data: { userId: userId },
						status: "ok",
						info: "链接成功"
					};
					callbacks.onConnected && callbacks.onConnected(RongIM.instance, RongIM.userInfo);
				},
				onError: function (errorCode) {
					RongIM.ready = false;
					RongIM.userInfo = {
						data: {},
						status: "fail",
						info: errorCode
					};

					for (var i = 0, len = onConnectList.length; i < len; i++) {
						onConnectList[i](RongIM.instance, RongIM.userInfo);
					}
				}
			});
		}

		RongIMClient.setConnectionStatusListener({
			onChanged: function (status) {
				switch (status) {
					case RongIMLib.ConnectionStatus.CONNECTED:
						RongIM.instance = RongIMClient.getInstance();
						callbacks.onReady && callbacks.onReady(RongIM.instance);
						break;
				}
			}
		});

		RongIMClient.setOnReceiveMessageListener({
			onReceived: function (message) {
				callbacks.onMessage && callbacks.onMessage(message)
			}
		});
	}

	function initChatRoom(appInfo, chatRoomInfo, callbacks, modules) {
		var chatRoomId = chatRoomInfo.chatRoomId;
		var count = chatRoomInfo.count;

		window.chatRoomCallbacks = {};

		var initCallbacks = {
			onReady: function (_instance) {
			},
			onMessage: function (message) {
				var onMessage = callbacks.onMessage;
				if (message.conversationType == 4 && message.targetId == chatRoomId) {
					onMessage(message);
				}
			},
			onConnected: function (IM, userInfo) {
				IM.joinChatRoom(chatRoomId, count, {
					onSuccess: function () {
						var chatRoom = {
							id: chatRoomId,
							currentUser: userInfo.data,
							getInfo: function (params, callbacks) {
								var order = params.order;
								var memberCount = params.memberCount;
								IM.getChatRoomInfo(chatRoomId, memberCount, order, callbacks);
							},
							quit: function (callbacks) {
								IM.quitChatRoom(chatRoomId, callbacks);
							},
							sendMessage: function (msg, callbacks) {
								var conversationType = RongIMLib.ConversationType.CHATROOM;
								IM.sendMessage(conversationType, chatRoomId, msg, callbacks);
							}
						};
						callbacks.onSuccess && callbacks.onSuccess(chatRoom);
					},
					onError: function (error) {
						callbacks.onError && callbacks.onError(error);
					}
				});
			}
		};
		initApp(appInfo, initCallbacks);
	}

	function registerMessageType() {
		var messageName = 'PersonMessage';
		var objectName = 's:person';
		var isCounted = true;
		var isPersited = true;
		var mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited);
		var prototypes = ['name', 'portrait', 'id'];
		RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);

		var messageName = 'LikerMessage';
		var objectName = 's:liker';
		var isCounted = false;
		var isPersited = false;
		var mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited);
		var prototypes = ['likerNum'];
		RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);

	}
	return {
		init: initChatRoom
	};
}, "RongChatRoom");