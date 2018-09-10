function init(params, callbacks) {
	var appkey = params.appkey;
	var token = params.token;
	var navi = params.navi || "";
	var userId = params.userId;
	var protobuf = params.protobuf || null;

	var RongIMClient = RongIMLib.RongIMClient;

	var config = {
		showError: true , 
		isPolling: false
	};

	//私有云切换navi导航
	if (navi !== "") {
		config.navi = navi;
	}

	//私有云切换api
	var api = params.api || "";
	if (api !== "") {
		config.api = api;
	}

	//support protobuf url + function
	if (protobuf != null) {
		config.protobuf = protobuf;
	};

	var imClient = params.imClient;
	var dataProvider = null;
	if (imClient) {
		dataProvider = new RongIMLib.VCDataProvider(imClient);
	}

	var sdkInfo = RongIMClient.init(appkey, dataProvider, config) || {};

	//if (RongMessageTypes.chatroom) {
		//RongIMClient.getInstance().setMessageTypes(RongMessageTypes.chatroom);
	//}

var messageName = "StickerMessage"; // 消息名称。
var objectName = "RC:StkMsg";
var messageTag = new RongIMLib.MessageTag(true, true);
var prototypes = ["packageId", "stickerId", "digest", "height", "width"];
RongIMClient.registerMessageType(messageName,objectName, messageTag, prototypes);

	var instance = RongIMClient.getInstance();

	// 连接状态监听器
	RongIMClient.setConnectionStatusListener({
		onChanged: function(status) {
			console.log('status', status);
			switch (status) {
				case RongIMLib.ConnectionStatus.CONNECTED:
					callbacks.connected && callbacks.connected(instance);
					break;
				case 3:
				case 4:
				case 5:
				case 6:
					callbacks.disconnectd && callbacks.disconnectd();
					break;
			}

		}
	});

	/*
	文档：http://www.rongcloud.cn/docs/web.html#3、设置消息监听器

	注意事项：
		1：为了看到接收效果，需要另外一个用户向本用户发消息
		2：判断会话唯一性 ：conversationType + targetId
		3：显示消息在页面前，需要判断是否属于当前会话，避免消息错乱。
		4：消息体属性说明可参考：http://rongcloud.cn/docs/api/js/index.html
	*/
	RongIMClient.setOnReceiveMessageListener({
		// 接收到的消息
		onReceived: function(message) {
			callbacks.received && callbacks.received(message);
		}
	});


	var connect = function(config) {
		config = config || {};
		//开始链接
		RongIMClient.connect(token, {
			onSuccess: function(userId) {
				console.log("链接成功，用户id：" + userId);
			},
			onTokenIncorrect: function() {
				console.log('token无效');
			},
			onError: function(errorCode) {
				console.log(errorCode);
			}
		});
	};

	var connectMap = {
		desktop: function() {
			var config = {
				appkey: appkey,
				userId: 'GVJccf6KwCHLYmWaRAfTeX',
				token: token,
				version: sdkInfo.ver,
				url: "https://" + navi + "/navi.json"
			};
			RongDesktop.Navi.get(config, function(error, result){
				connect(result);
			});
		},
		web: function() {
			connect();
		}
	};
	var type = imClient ? 'desktop' : 'web';
	connectMap[type]();
}