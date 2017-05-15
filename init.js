function init(params,callbacks){	
	var appKey = params.appKey;
	var token = params.token;
	var navi = params.navi || "";

	if(navi !== ""){
		//私有云
		var config = {
			navi : navi
		};
		console.log("私有云");
		console.log(params);
		RongIMLib.RongIMClient.init(appKey,null,config);
	}else{
		//公有云
		console.log("公有云");
		console.log(params);
		RongIMLib.RongIMClient.init(appKey);
	}

	var instance = RongIMClient.getInstance();

	// 连接状态监听器
	RongIMClient.setConnectionStatusListener({
		onChanged: function (status) {
			console.log(status);
		    switch (status) {
		        case RongIMLib.ConnectionStatus.CONNECTED:
		            callbacks.getInstance && callbacks.getInstance(instance);
		            break;
		        }
		}
	});


	RongIMClient.setOnReceiveMessageListener({
		// 接收到的消息
		onReceived: function (message) {
		    // 判断消息类型
		    console.log("新消息: " + message.targetId);
            console.log(message);
            callbacks.receiveNewMessage && callbacks.receiveNewMessage(message);
		}
	});

	//开始链接
	RongIMClient.connect(token, {
		onSuccess: function(userId) {
			callbacks.getCurrentUser && callbacks.getCurrentUser({userId:userId});
			console.log("链接成功，用户id：" + userId);
		},
		onTokenIncorrect: function() {
			//console.log('token无效');
		},
		onError:function(errorCode){
		  console.log("=============================================");
		  console.log(info);
		}
	});
}