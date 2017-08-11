function initMuti(callbacks, appInfo, modules){	
	window.RongIM = window.RongIM || {};
	RongIM.appInfo = RongIM.appInfo || appInfo;

	//缓存消息回调队列
	onMessageList = window.onMessageList || [];
	onMessageList.push(callbacks.onMessage);

	//缓存状态队列
	onConnectList = window.onConnectList || [];
	onConnectList.push(callbacks.onConnect);

	modules = modules || {};
	var RongIMLib = modules.RongIMLib || window.RongIMLib;
	var RongIMClient = RongIMLib.RongIMClient;

	if(RongIM.ready){
		callbacks.onReady && callbacks.onReady(RongIM.instance);
		callbacks.onConnect && callbacks.onConnect(RongIM.userInfo);
		return;
	}else{
		var appInfo = RongIM.appInfo;
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
	            	onConnectList[i](RongIM.userInfo);
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
	            	onConnectList[i](userInfo);
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
	            	onConnectList[i](userInfo);
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