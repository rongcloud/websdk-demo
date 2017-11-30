//基于 Web IM SDK 封装的聊天室中间层示例
;(function (global, factory, namespace) {
    if(typeof exports === 'object' && typeof module !== 'undefined'){
    	module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
    	define(factory);
    }else{
    	global[namespace] = factory();
    }
})(window, function(){
	"use strict";

	function initApp(appInfo, callbacks, modules){	
		window.RongIM = window.RongIM || {};

		//缓存消息回调队列
		window.onMessageList = window.onMessageList || [];
		window.onMessageList.push(callbacks.onMessage);

		//缓存状态队列
		window.onConnectList = window.onConnectList || [];
		window.onConnectList.push(callbacks.onConnected);

		modules = modules || {};
		var RongIMLib = modules.RongIMLib || window.RongIMLib;
		var RongIMClient = RongIMLib.RongIMClient;

		if(RongIM.ready){
			callbacks.onReady && callbacks.onReady(RongIM.instance);
			callbacks.onConnected && callbacks.onConnected(RongIM.instance, RongIM.userInfo);
			return;
		}else{
			var appKey = appInfo.appKey;
			var token = appInfo.token;
			var navi = appInfo.navi || "";

			var protobuf = modules.protobuf || null;

			var config = {};

			//私有云
			if(navi !== ""){
				config.navi = navi;
			}

			//support protobuf url + module
			if(protobuf != null){
				config.protobuf = protobuf;
			};

			RongIMLib.RongIMClient.init(appKey,null,config);

			//开始链接
			RongIMClient.connect(token, {
				onSuccess: function(userId) {
					RongIM.ready = true;
					RongIM.userInfo = {
						data : {userId: userId},
						status : "ok",
						info : "链接成功"
					};

					for(var i = 0, len = onConnectList.length; i<len; i++){
		            	onConnectList[i](RongIM.instance, RongIM.userInfo);
		            }
				},
				onTokenIncorrect: function() {
					// console.log('token无效');
					RongIM.ready = false;
					RongIM.userInfo = {
						data : {},
						status : "fail",
						info : "token无效"
					};

					for(var i = 0, len = onConnectList.length; i<len; i++){
		            	onConnectList[i](RongIM.instance, RongIM.userInfo);
		            }
				},
				onError:function(errorCode){
					// console.log("connect error");
					// console.log(errorCode);

					RongIM.ready = false;
					RongIM.userInfo = {
						data : {},
						status : "fail",
						info : errorCode
					};

					for(var i = 0, len = onConnectList.length; i<len; i++){
		            	onConnectList[i](RongIM.instance, RongIM.userInfo);
		            }
				}
			});
		}

		// 连接状态监听器
		RongIMClient.setConnectionStatusListener({
			onChanged: function (status) {
				// console.log(status);
			    switch (status) {
			        case RongIMLib.ConnectionStatus.CONNECTED:
			        	RongIM.instance = RongIMClient.getInstance();
			            callbacks.onReady && callbacks.onReady(RongIM.instance);
			            break;
			        }
			}
		});

		RongIMClient.setOnReceiveMessageListener({
			// 接收到的消息
			onReceived: function (message) {
			    // 判断消息类型
			    // console.log("新消息: " + message.targetId);
	            // console.log(message);
	            for(var i = 0, len = onMessageList.length; i<len; i++){
	            	onMessageList[i](message);
	            }
			}
		});
	}

	function initChatRoom(appInfo, chatRoomInfo, callbacks, modules){
		var chatRoomId = chatRoomInfo.chatRoomId;
		var count = chatRoomInfo.count;

		window.chatRoomCallbacks = {};

		//公有云初始化
		var config = {
	        //protobuf: './local-sdk/protobuf-2.2.7.min.js' //支持http(s)网络路径、本地相对路径
	    };

		var initCallbacks = {
			onReady : function(_instance){
				// alert(_instance)
				// IM = _instance;
			},
			onMessage : function(message){
				// 判断消息类型

	            // console.log("messageUId:" + message.messageUId + ",   messageId:" + message.messageId);
	            // console.log(message);
	            var onMessage = callbacks.onMessage;
            	if (message.conversationType == 4 && message.targetId == chatRoomId) {
	            	onMessage(message);
	            }
			},
			onConnected : function(IM, userInfo){
				//链接成功
				IM.joinChatRoom(chatRoomId, count, {
					onSuccess: function() {
						var chatRoom = {
							id : chatRoomId,
							currentUser : userInfo.data,
							getInfo : function (params,callbacks){
								var order = params.order; //RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
								var memberCount = params.memberCount; // 获取聊天室人数 （范围 0-20 ）

								IM.getChatRoomInfo(chatRoomId, memberCount, order,callbacks);
							},
							quit : function(callbacks){
								IM.quitChatRoom(chatRoomId, callbacks);
							},
							sendMessage : function(content, callbacks){
								var conversationType = RongIMLib.ConversationType.CHATROOM;
								var msg = new RongIMLib.TextMessage(content);

								IM.sendMessage(conversationType, chatRoomId, msg, callbacks);
							}
						};
			            callbacks.onSuccess && callbacks.onSuccess(chatRoom);
					},
					onError: function(error) {
			            callbacks.onError && callbacks.onError(error);
					}
				});
			}
		};
		initApp(appInfo, initCallbacks, config);
	}

	return {
		init : initChatRoom
	};
}, "RongChatRoom");