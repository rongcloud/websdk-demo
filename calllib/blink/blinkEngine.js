/** This library require adapter.js */

//var BlinkEngine = (function() {
/** ----- 参数定义 ----- */
/** 定义环境，0为私有云环境，1为生产环境，2为演示环境，3为测试环境，4为本地环境，5为开发环境1，52为开发环境2 */
var envType = '2';
/** ----- 参数定义 ----- */
/** ----- 常量定义 ----- */
/** 常量 */
var Constants = {
	/** 获取TOKEN的地址——生产环境 */
	TOKEN_URL_PROD : 'https://api.blinktalk.io:8800/token',
	/** 获取TOKEN的地址——演示环境 */
	TOKEN_URL_DEMO : 'https://api.blinktalk.site:8800/token',
	/** 获取TOKEN的地址——测试环境 */
	TOKEN_URL_TEST : 'https://api.blinktalk.online:8800/token',
	/** 获取TOKEN的地址——本地环境 */
	TOKEN_URL_LOCAL : 'https://api.blinktalk.online:8800/token',
	/** 获取TOKEN的地址——开发环境1 */
	TOKEN_URL_DEV1 : 'https://api.blinktalk.online:8800/token',
	/** 获取TOKEN的地址——开发环境2 */
	TOKEN_URL_DEV2 : 'https://api.blinktalk.online:8800/token',
	/** websocket导航地址——生产环境 */
	WS_NAV_URL_PROD : 'https://api.blinktalk.io:8081/websocketlist',
	/** websocket导航地址——演示环境 */
	WS_NAV_URL_DEMO : 'https://api.blinktalk.site:8080/websocketlist',
	/** websocket导航地址——测试环境 */
	WS_NAV_URL_TEST : 'https://api.blinktalk.online:8081/websocketlist',
	/** websocket导航地址——本地环境 */
	WS_NAV_URL_LOCAL : '',
	/** websocket导航地址——开发环境1 */
	WS_NAV_URL_DEV1 : 'https://192.168.1.200:8080/websocketlist',
	/** websocket导航地址——开发环境2 */
	WS_NAV_URL_DEV2 : 'https://10.10.30.149:8081/websocketlist',
	/** websocket地址——本地环境 */
	WS_URL_LOCAL : 'api.blinktalk.io:8888',
	/** logon version */
	LOGON_VERSION : '1',
	/** channelPing 时间间隔 */
	CHANNELPING_INTERVAL : 10 * 1000,
	SDK_VERSION_NAME : '1.0.0'
};
/** 环境类型 */
var EnvType = {
	/** 私有云环境 */
	PRIVATE : '0',
	/** 生产环境 */
	PROD : '1',
	/** 演示环境 */
	DEMO : '2',
	/** 测试环境 */
	TEST : '3',
	/** 开发环境 */
	LOCAL : '4',
	/** 开发环境1 */
	DEV1 : '5',
	/** 开发环境2 */
	DEV2 : '52'
}
/** 连接类型 */
var ConnectionType = {
	/** P2P模式 */
	P2P : '0',
	/** MediaServer模式 */
	MEDIASERVER : '1'
}
/** 用户模式类型 */
var UserType = {
	/** 普通模式 */
	NORMAL : '1',
	/** 观察者模式 */
	OBSERVER : '2'
}
/** 交换类型 */
var ExchangeType = {
	/** offer */
	OFFER : '1',
	/** answer */
	ANSWER : '2',
	/** candidate */
	CANDIDATE : '3'
}
/** 信令 */
var SignalType = {
	/** 请求信令 */
	// LOGON : 'logon',
	// JOIN : 'join',
	LOGONANDJOIN : 'logonAndJoin',
	CHANNEL_PING : 'channelPing',
	UPDATETALKTYPE : 'updateTalkType',
	LEAVE : 'leave',
	EWB_CREATE : 'ewb_create',
	EWB_QUERY : 'ewb_query',
	/** 应答信令 */
	LOGONANDJOIN_RESULT : 'logonAndJoin_result',
	LEAVE_RESULT : 'leave_result',
	EWB_CREATE_RESULT : 'ewb_create_result',
	EWB_QUERY_RESULT : 'ewb_query_result',
	/** 通知信令 */
	JOINED : 'joined',
	UPDATE_TALKTYPE : 'update_talktype',
	OFFER_REQUEST : 'offerRequest',
	EXCHANGE : 'exchange',
	PING : 'ping',
	LEFT : 'left',
	EWB_CREATE_NOTIFY : 'ewb_create_notify'
}
/** 视频分辨率 */
var VIDEO_PROFILE = {
	width : 640,
	height : 480,
	frameRate : 15
}
/** 带宽 */
var BandWidth = {
	start : 500,
	min : 300,
	max : 600
}
/** 视频参数KEY值 */
var ParameterKey = {
	/** 是否为纯音频 */
	KEY_IS_AUDIO_ONLY : "IS_AUDIO_ONLY",
	/** 视频分辨率/帧率等参数 */
	KEY_VIDEO_PROFILE : "VIDEO_PROFILE",
	/** 视频的最大码率 */
	KEY_VIDEO_MAX_RATE : "VIDEO_MAX_RATE",
	/** 视频的最小码率 */
	KEY_VIDEO_MIN_RATE : "VIDEO_MIN_RAT",
	/** 用户类型 */
	KEY_USER_TYPE : "USER_TYPE",
	/** 是否关闭本地摄像头 */
	KEY_IS_CLOSE_VIDEO : "IS_CLOSE_VIDEO",
}
/** ----- 常量定义 ----- */
/** ----- BlinkEngine ----- */
/**
 * 构造函数
 * 
 */
var BlinkEngine = function(wsNavUrl) {
	this.init(wsNavUrl);
	return this;
}
/**
 * 初始化
 * 
 */
BlinkEngine.prototype.init = function(wsNavUrl) {
	/** 会议ID */
	this.channelId = null;
	/** 连接集合 */
	this.peerConnections = {};
	/** 本地视频流 */
	this.localStream = null;
	/** 远端视频流数组 */
	this.remoteStreams = new Array();
	/** 远端视频流数量 */
	this.remoteStreamCount = 0;
	/** 连接的用户集合 */
	this.joinedUsers = new BlinkMap();
	/** 麦克风开关 */
	this.microphoneEnable = true;
	/** 本地视频开关 */
	this.localVideoEnable = true;
	/** 远端音频开关 */
	this.remoteAudioEnable = true;
	/** channelPing间隔 */
	this.channelPingInterval;
	/** csequence */
	this.csequence = 0;
	/** websocket对象 */
	this.signaling = null;
	/** websocket消息队列 */
	this.wsQueue = [];
	/** websocket连接状态, true:已连接, false:未连接 */
	this.wsConnected = false;
	/** websocket是否关闭： true:已关闭 false：未关闭 */
	this.wsIsClose = false;
	/** websocket地址列表 */
	this.wsUrlList = [];
	/** websocket地址索引 */
	this.wsUrlIndex = 0;
	
	// 设置websocket nav url
	if (wsNavUrl != null && wsNavUrl != '') {
		this.wsNavUrl = wsNavUrl;
	} else {
		this.wsNavUrl = getWsNavUrl(envType);
	}
	// 创建websocket连接
	this.createSignaling();
};
/** ----- 提供能力 ----- */
/**
 * 获取Blink SDK版本号
 * 
 * @return sdkversion
 */
BlinkEngine.prototype.getSDKVersion = function() {
	return Constants.SDK_VERSION_NAME;
}
/**
 * 设置BlinkEngineEventHandle监听
 * 
 */
BlinkEngine.prototype.setBlinkEngineEventHandle = function(
		blinkEngineEventHandle) {
	this.blinkEngineEventHandle = blinkEngineEventHandle;
}
/**
 * 设置视频参数
 * 
 */
BlinkEngine.prototype.setVideoParameters = function(config) {
	this.isAudioOnly = config.IS_AUDIO_ONLY == null ? false
			: config.IS_AUDIO_ONLY;
	this.videoProfile = config.VIDEO_PROFILE == null ? VIDEO_PROFILE
			: config.VIDEO_PROFILE;
	this.videoMaxRate = config.VIDEO_MAX_RATE == null ? BandWidth.max
			: config.VIDEO_MAX_RATE;
	this.videoMinRate = config.VIDEO_MIN_RATE == null ? BandWidth.min
			: config.VIDEO_MIN_RATE;
	this.userType = config.USER_TYPE == UserType.OBSERVER ? UserType.OBSERVER
			: UserType.NORMAL;
	this.localVideoEnable = !(config.IS_CLOSE_VIDEO == null ? false
			: config.IS_CLOSE_VIDEO);
	
	/** media config */
	this.mediaConfig = {
		video : this.videoProfile,
		audio : true
	}
	/** sdp属性 */
//	if (this.userType == UserType.OBSERVER) { // 观察者模式
//		if (this.mediaConfig.sdpConstraints == null) {
//			this.mediaConfig.sdpConstraints = {};
//		}
//		if (this.mediaConfig.sdpConstraints.mandatory == null) {
//			this.mediaConfig.sdpConstraints.mandatory = {};
//		}
//		this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveAudio = true;
//		this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveVideo = true;
//	}
	// 统一设置，包含观察者模式和普通模式无摄像头情况
	if (this.mediaConfig.sdpConstraints == null) {
		this.mediaConfig.sdpConstraints = {};
	}
	if (this.mediaConfig.sdpConstraints.mandatory == null) {
		this.mediaConfig.sdpConstraints.mandatory = {};
	}
	this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveAudio = true;
	this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveVideo = true;
	
	/** bandwidth */
	this.bandWidth = {
		min : this.videoMinRate,
		max : this.videoMaxRate
	};
}
// /**
// * 加入会议
// *
// */
// BlinkEngine.prototype.joinChannel = function(channelId) {
// this.channelId = ConnectionType.MEDIASERVER + channelId;
// var blinkEngine = this;
// // 创建本地视频
// navigator.getUserMedia(blinkEngine.mediaConfig, function(stream) {
// blinkEngine.localStream = stream;
// if (!blinkEngine.localVideoEnable) {
// blinkEngine.closeLocalVideoWithUpdateTalkType(
// !blinkEngine.localVideoEnable, false);
// }
// blinkEngine.logon();
// // logon和join之间停顿1秒，等待logon完成
// setTimeout(function() {
// blinkEngine.join();
// blinkEngine.blinkEngineEventHandle.call('onJoinComplete', {
// 'isJoined' : true
// });
// blinkEngine.channelPingInterval = setInterval(function() {
// blinkEngine.channelPing();
// }, Constants.CHANNELPING_INTERVAL);
// }, 1 * 1000);
// }, function(error) {
// console.log(error);
// blinkEngine.blinkEngineEventHandle.call('onJoinComplete', {
// 'isJoined' : false
// })
// })
// };
/**
 * 加入会议
 * 
 */
BlinkEngine.prototype.joinChannel = function(channelId, userId, token) {
	this.channelId = ConnectionType.MEDIASERVER + channelId;
	this.selfUserId = userId;
	this.token = token;
	// 创建本地视频
	var blinkEngine = this;
	navigator.getUserMedia(blinkEngine.mediaConfig, function(stream) {
		blinkEngine.localStream = stream;
		if (!blinkEngine.localVideoEnable) {
			blinkEngine.closeLocalVideoWithUpdateTalkType(
					!blinkEngine.localVideoEnable, false);
		}
		blinkEngine.logonAndJoin();
	}, function(error) {
		console.log(error);
		blinkEngine.blinkEngineEventHandle.call('onJoinComplete', {
			'isJoined' : false
		});
	});
};
/**
 * 离开会议
 * 
 */
BlinkEngine.prototype.leaveChannel = function() {
	this.leave();
}
/**
 * 获取本地视频视图
 * 
 */
BlinkEngine.prototype.getLocalVideoView = function() {
	return this.localStream;
};
/**
 * 获取远端视频视图
 * 
 */
BlinkEngine.prototype.getRemoteVideoView = function(userId) {
	for ( var i in this.remoteStreams) {
		if (this.remoteStreams[i].id == userId) {
			return this.remoteStreams[i]
			break;
		}
	}
	return null;
};
/**
 * 获取远端视频流数量
 * 
 */
BlinkEngine.prototype.getRemoteStreamCount = function() {
	return this.remoteStreamCount;
};
/**
 * 关闭/打开麦克风 true, 关闭 false, 打开
 * 
 */
BlinkEngine.prototype.muteMicrophone = function(isMute) {
	if (this.localStream.getAudioTracks()
			&& this.localStream.getAudioTracks().length === 0) {
		console.log("No local MIC available.");
		return;
	}
	for (i = 0; i < this.localStream.getAudioTracks().length; i++) {
		this.localStream.getAudioTracks()[i].enabled = !isMute;
	}
	console.log("Microphone mute=" + isMute);
	this.microphoneEnable = !isMute;
}
/**
 * 停止视频流
 * 
 */
BlinkEngine.prototype.closeLocalStream = function() {
	if (this.localStream.getTracks()
			&& this.localStream.getTracks().length === 0) {
		console.log("No local track available.");
		return;
	}
	for (i = 0; i < this.localStream.getTracks().length; i++) {
		this.localStream.getTracks()[i].stop();
	}
}

/**
 * 关闭/打开本地摄像头 true, 关闭 false, 打开
 * 
 */
BlinkEngine.prototype.closeLocalVideo = function(isCameraClose) {
	var isUpdateTalkType = true;
	if (this.userType == UserType.OBSERVER) { // 观察者模式
		isUpdateTalkType = false;
	}
	this.closeLocalVideoWithUpdateTalkType(isCameraClose, isUpdateTalkType);
}
/**
 * 关闭/打开本地摄像头和发送updateTalkType信令
 * 
 * @param isCameraClose
 *            true, 关闭 false, 打开
 * @param isUpdateTalkType
 *            true, 发送 false, 不发送
 */
BlinkEngine.prototype.closeLocalVideoWithUpdateTalkType = function(
		isCameraClose, isUpdateTalkType) {
	if (this.localStream.getVideoTracks()
			&& this.localStream.getVideoTracks().length === 0) {
		console.log("No local video available.");
		return;
	}
	for (i = 0; i < this.localStream.getVideoTracks().length; i++) {
		this.localStream.getVideoTracks()[i].enabled = !isCameraClose;
	}
	console.log("Local video close=" + isCameraClose);
	this.localVideoEnable = !isCameraClose;
	// 发送updateTalkType信令
	if (isUpdateTalkType) {
		this.updateTalkType();
	}
}
/**
 * 关闭/打开声音 true, 关闭 false, 打开
 * 
 */
BlinkEngine.prototype.closeRemoteAudio = function(isAudioClose) {
	if (this.remoteStreams.length === 0) {
		console.log("No remote audio available.");
		return;
	}
	for (x = 0; x < this.remoteStreams.length; x++) {
		var tmpRemoteStream = this.remoteStreams[x];
		if (tmpRemoteStream && tmpRemoteStream.getAudioTracks()
				&& tmpRemoteStream.getAudioTracks().length > 0) {
			for (y = 0; y < tmpRemoteStream.getAudioTracks().length; y++) {
				tmpRemoteStream.getAudioTracks()[y].enabled = !isAudioClose;
			}
		}
	}
	console.log("Remote audio close=" + isAudioClose);
	this.remoteAudioEnable = !isAudioClose;
}
/**
 * 请求白板页面 HTTP URL
 * 
 */
BlinkEngine.prototype.requestWhiteBoardURL = function() {
	this.ewb_create();
}
/**
 * 查询白板
 * 
 */
BlinkEngine.prototype.queryWhiteBoard = function() {
	this.ewb_query();
}
/** ----- 提供能力 ----- */
/** ----- websoceket ----- */
/**
 * 根据环境类型获取token url
 * 
 */
function getTokenUrl(envType) {
	switch (envType) {
	case EnvType.PROD:
		return Constants.TOKEN_URL_PROD;
	case EnvType.DEMO:
		return Constants.TOKEN_URL_DEMO;
	case EnvType.TEST:
		return Constants.TOKEN_URL_TEST;
	case EnvType.LOCAL:
		return Constants.TOKEN_URL_LOCAL;
	case EnvType.DEV1:
		return Constants.TOKEN_URL_DEV1;
	case EnvType.DEV2:
		return Constants.TOKEN_URL_DEV2;
	default:
		return Constants.TOKEN_URL_TEST;
	}
}
/**
 * 根据环境类型获取websocket nav url
 * 
 */
function getWsNavUrl(envType) {
	switch (envType) {
	case EnvType.PROD:
		return Constants.WS_NAV_URL_PROD;
	case EnvType.DEMO:
		return Constants.WS_NAV_URL_DEMO;
	case EnvType.TEST:
		return Constants.WS_NAV_URL_TEST;
	case EnvType.LOCAL:
		return Constants.WS_NAV_URL_LOCAL;
	case EnvType.DEV1:
		return Constants.WS_NAV_URL_DEV1;
	case EnvType.DEV2:
		return Constants.WS_NAV_URL_DEV2;
	default:
		return Constants.WS_NAV_URL_TEST;
	}
}
/**
 * 获取websocket地址列表
 * 
 */
function getWsUrlList(wsNavUrl, callback) {
	var wsUrlList;
	BlinkAjax({
		type : "GET",
		url : wsNavUrl,
		async : true,
		data : {
			rand : Math.random()
		},
		dataType : "JSON",
		success : function(data) {
			callback(data);
		},
		error : function(err) {
			console.log("request nav error");
			throw err;
		}
	});
}
/**
 * 创建WebScoket对象
 * 
 */
BlinkEngine.prototype.createSignaling = function() {
	switch (envType) {
	case EnvType.LOCAL:
		this.createSignalingWithUrl(Constants.WS_URL_LOCAL);
		return;
	default:
		if (this.wsUrlList.length > 1) { // 已取得websocket连接地址
			if (this.wsUrlIndex > this.wsUrlList.length - 1) {
				throw new Error("websocket连接失败!");
			}
			var url = this.wsUrlList[this.wsUrlIndex];
			this.createSignalingWithUrl(url);
		} else { // 还没有取得websocket连接地址
			var blinkEngine = this;
			getWsUrlList(this.wsNavUrl, function(data) {
				var wsUrlList = data;
				if (wsUrlList.length < 1) {
					throw new Error("websocket连接失败!");
				}
				blinkEngine.wsUrlList = shuffle(wsUrlList);
				var url = blinkEngine.wsUrlList[0];
				blinkEngine.createSignalingWithUrl(url);
			});
		}
	}
};
/**
 * 创建WebScoket对象
 * 
 */
BlinkEngine.prototype.createSignalingWithUrl = function(url) {
	var blinkEngine = this;
	blinkEngine.signaling = new WebSocket('wss://' + url + '/signaling');
	blinkEngine.signaling.onopen = function() {
		blinkEngine.wsConnected = true;
		// websocket可用后，发送队列中的消息
		blinkEngine.doWsQueue();
	};
	blinkEngine.signaling.onmessage = function(ev) {
		blinkEngine.onMessage(ev);
	};
	blinkEngine.signaling.onerror = function(ev) {
		blinkEngine.onError(ev);
	};
	blinkEngine.signaling.onclose = function(ev) {
		blinkEngine.onClose(ev);
	};
};
/**
 * Message实体
 * 
 * @param signal
 * @param content
 * @param parameters
 * @returns
 */
var Message = function(signal, content, parameters) {
	this.signal = signal;
	this.content = content;
	this.parameters = parameters;
};
/**
 * 发送消息
 * 
 */
BlinkEngine.prototype.sendMsg = function(signal, msgBody, parameters) {
	this.csequence++;
	parameters.csequence = this.csequence;
	var message = JSON.stringify(new Message(signal, msgBody, parameters));
	this.send(message);
};
/**
 * 发送消息
 * 
 */
BlinkEngine.prototype.send = function(message) {
	if (!this.wsConnected) { // websocket不可用
		// 加入消息队列
		this.wsQueue.push(message);
		return;
	}
	console.log("req: " + message);
	this.signaling.send(message);
};
/**
 * 发送队列中的消息
 */
BlinkEngine.prototype.doWsQueue = function() {
	for (var i = 0, len = this.wsQueue.length; i < len; i++) {
		this.send(this.wsQueue[i]);
	}
};
/**
 * 处理消息
 * 
 */
BlinkEngine.prototype.onMessage = function(ev) {
	console.log("res: " + ev.data);
	var data = JSON.parse(ev.data);
	switch (data.signal) {
	// 应答信令
	case SignalType.LOGONANDJOIN_RESULT:
		this.logonAndJoin_result(data);
		return;
	case SignalType.LEAVE_RESULT:
		this.leave_result(data);
		return;
	case SignalType.EWB_CREATE_RESULT:
		this.ewb_create_result(data);
		return;
	case SignalType.EWB_QUERY_RESULT:
		this.ewb_query_result(data);
		return;
		// 通知信令
	case SignalType.JOINED:
		this.joined(data);
		return;
	case SignalType.LEFT:
		this.left(data);
		return;
	case SignalType.OFFER_REQUEST:
		this.offerRequest(data);
		return;
	case SignalType.EXCHANGE:
		this.exchange(data);
		return;
	case SignalType.UPDATE_TALKTYPE:
		this.update_talktype(data);
		return;
	default:
		console.log('Event ' + data.signal + ' do not have defined function');
	}
};
/**
 * onClose
 * 
 */
BlinkEngine.prototype.onClose = function(ev) {
	console.log('close ' + JSON.stringify(ev));
	// if (ev.code == 1006) {
	// this.reconnect();
	// }
};
/**
 * onError
 * 
 */
BlinkEngine.prototype.onError = function(ev) {
	console.log('error ' + JSON.stringify(ev));
	this.reconnect();
};
/**
 * disconnect
 * 
 */
BlinkEngine.prototype.disconnect = function() {
	this.wsConnected = false;
	this.signaling.close();
};
/**
 * reconnect
 * 
 */
BlinkEngine.prototype.reconnect = function() {
	this.wsUrlIndex++;
	this.createSignaling();
};
/** ----- websoceket ----- */
/** ----- 请求信令 ----- */
// /**
// * 请求logon信令
// *
// */
// BlinkEngine.prototype.logon = function() {
// this.sendMsg(SignalType.LOGON, this.token, {
// 'version' : Constants.LOGON_VERSION
// });
// }
// /**
// * 请求join信令
// *
// */
// BlinkEngine.prototype.join = function() {
// this.sendMsg(SignalType.JOIN, null, {
// 'key' : this.channelId,
// 'type' : this.userType
// });
// }
/**
 * 请求logonAndJoin信令
 * 
 */
BlinkEngine.prototype.logonAndJoin = function() {
	this.sendMsg(SignalType.LOGONANDJOIN, this.token, {
		'key' : this.channelId,
		'type' : this.userType,
		'index' : this.localVideoEnable ? 1 : 0,
		'version' : Constants.LOGON_VERSION
	});
}
/**
 * 请求channelPing信令
 * 
 */
BlinkEngine.prototype.channelPing = function() {
	this.sendMsg(SignalType.CHANNEL_PING, null, {
		'key' : this.channelId
	});
}
/**
 * 请求updateTalkType信令
 * 
 */
BlinkEngine.prototype.updateTalkType = function() {
	this.sendMsg(SignalType.UPDATETALKTYPE, null, {
		'key' : this.channelId,
		'index' : this.localVideoEnable ? 1 : 0
	});
}
/**
 * 请求leave信令
 * 
 */
BlinkEngine.prototype.leave = function() {
	this.sendMsg(SignalType.LEAVE, null, {
		'key' : this.channelId
	});
}
/**
 * 请求offer信令
 * 
 */
BlinkEngine.prototype.offer = function(desc, from) {
	this.sendMsg(SignalType.EXCHANGE, desc, {
		'key' : this.channelId,
		'type' : ExchangeType.OFFER,
		'to' : from
	});
}
/**
 * 请求answer信令
 * 
 */
BlinkEngine.prototype.answer = function(desc, from) {
	this.sendMsg(SignalType.EXCHANGE, desc, {
		'key' : this.channelId,
		'type' : ExchangeType.ANSWER,
		'to' : from
	});
}
/**
 * 请求candidate信令
 * 
 */
BlinkEngine.prototype.candidate = function(candidate, userId) {
	this.sendMsg(SignalType.EXCHANGE, candidate, {
		'key' : this.channelId,
		'type' : ExchangeType.CANDIDATE,
		'to' : userId
	});
}
/**
 * 请求白板信令
 * 
 */
BlinkEngine.prototype.ewb_create = function() {
	this.sendMsg(SignalType.EWB_CREATE, null, {
		'key' : this.channelId
	});
}
/**
 * 查询白板信令
 * 
 */
BlinkEngine.prototype.ewb_query = function() {
	this.sendMsg(SignalType.EWB_QUERY, null, {
		'key' : this.channelId
	});
}
/** ----- 请求信令 *----- */
/** ----- 处理应答信令 ----- */
/**
 * 处理join_result应答信令
 * 
 */
BlinkEngine.prototype.logonAndJoin_result = function(data) {
	var statusCode = data.parameters['statusCode'];
	var isJoined = statusCode == 'OK' ? true : false;
	if (isJoined) {
		var content = data.content; // 返回的结果是包含自己的
		var contentArr = content.split("],");
		var member = contentArr.length > 1 ? contentArr[1] : contentArr[0];
		var memberArr = eval(member);
		for ( var i in memberArr) {
			var userId = memberArr[i].userId;
			if (!this.joinedUsers.contains(userId)) {
				var userType = memberArr[i].type;
				var talkType = memberArr[i].talktype;
				var joinedUser = new Array();
				joinedUser.push(userType);
				joinedUser.push(talkType);
				joinedUser.push(null);
				this.joinedUsers.put(userId, joinedUser);
			}
		}
		var blinkEngine = this;
		blinkEngine.channelPingInterval = setInterval(function() {
			blinkEngine.channelPing();
		}, Constants.CHANNELPING_INTERVAL);
	}
	this.blinkEngineEventHandle.call('onJoinComplete', {
		'isJoined' : isJoined
	});
}
/**
 * 处理leave_result应答信令
 * 
 */
BlinkEngine.prototype.leave_result = function(data) {
	var statusCode = data.parameters['statusCode'];
	var isLeft = statusCode == 'OK' ? true : false;
	if (isLeft) {
		clearInterval(this.channelPingInterval);
		this.disconnect();
	}
	this.blinkEngineEventHandle.call('onLeaveComplete', {
		'isLeft' : isLeft
	});
}
/**
 * 处理ewb_create_result应答信令
 * 
 */
BlinkEngine.prototype.ewb_create_result = function(data) {
	var statusCode = data.parameters['statusCode'];
	var isSuccess = statusCode == 'OK' ? true : false;
	var url = '';
	if (isSuccess) {
		url = data.content;
	}
	this.blinkEngineEventHandle.call('onWhiteBoardURL', {
		'isSuccess' : isSuccess,
		'url' : url // 观察者模式url返回为空
	});
}
/**
 * 处理ewb_query_result应答信令
 * 
 */
BlinkEngine.prototype.ewb_query_result = function(data) {
	var statusCode = data.parameters['statusCode'];
	var isSuccess = statusCode == 'OK' ? true : false;
	var url = '';
	if (isSuccess) {
		url = data.content;
	}
	this.blinkEngineEventHandle.call('onWhiteBoardQuery', {
		'isSuccess' : isSuccess,
		'url' : url // 当前会议没有白板url返回为空
	});
}
/** ----- 处理应答信令 ----- */
/** ----- 处理通知信令 ----- */
/**
 * 处理joined通知信令
 * 
 */
BlinkEngine.prototype.joined = function(data) {
	var userId = data.parameters['serverData'];
	var userType = data.parameters['type'];
	var talkType = data.parameters['index'];
	if (!this.joinedUsers.contains(userId)) {
		var joinedUser = new Array();
		joinedUser.push(userType);
		joinedUser.push(talkType);
		joinedUser.push(null);
		this.joinedUsers.put(userId, joinedUser);
	}
	if (userType == UserType.OBSERVER) {
		this.blinkEngineEventHandle.call('onUserJoined', { // 观察者模式
			userId : userId,
			userType : UserType.OBSERVER,
			talkType : talkType
		});
	}
}
/**
 * 处理update_talktype通知信令
 * 
 */
BlinkEngine.prototype.update_talktype = function(data) {
	var userId = data.parameters['serverData'];
	var userType = data.parameters['type'];
	var talkType = data.parameters['index'];
	this.blinkEngineEventHandle.call('onUserUpdatedTalkType', {
		userId : userId,
		userType : userType,
		talkType : talkType
	});
};
/**
 * 处理left通知信令
 * 
 */
BlinkEngine.prototype.left = function(data) {
	var userId = data.parameters['serverData'];
	var userType = data.parameters['type'];
	if (userType == UserType.NORMAL) {
		for ( var i in this.remoteStreams) {
			if (this.remoteStreams[i].id == userId) {
				this.remoteStreams.splice(i, 1);
				break;
			}
		}
		this.remoteStreamCount = this.remoteStreams.length;
	}
	this.joinedUsers.remove(userId);
	if (this.joinedUsers.size() == 1) { // 当没有其它用户在会议时，关闭连接
		if (this.peerConnections[this.selfUserId] != null) {
			this.peerConnections[this.selfUserId]['pc'].close();
			this.peerConnections[this.selfUserId] = null;
		}
	}
	this.blinkEngineEventHandle.call('onUserLeft', {
		userId : userId,
		userType : userType
	});
}
/**
 * 处理OfferRequest通知信令
 * 
 */
BlinkEngine.prototype.offerRequest = function(data) {
	var from = data.parameters['serverData'];
	var pc = this.preparePeerConnection(from);
	if (this.userType == UserType.NORMAL) {
		pc['pc'].addStream(this.localStream);
	}

	var blinkEngine = this;
	pc['pc'].createOffer(function(desc) {
		// change streamId use userId
		desc.sdp = changeStreamId(desc.sdp, blinkEngine.localStream.id,
				blinkEngine.selfUserId);
		// 替换video参数
		desc.sdp = changeVideoDesc(desc.sdp);
		pc['pc'].setLocalDescription(desc, function() {
			blinkEngine.offer(JSON.stringify(desc), from);
		}, error, success);
	}, error, blinkEngine.mediaConfig.sdpConstraints);
};
/**
 * 处理exchange通知信令
 * 
 */
BlinkEngine.prototype.exchange = function(data) {
	var type = data.parameters['type'];
	if (type == ExchangeType.OFFER) {
		this.handleOffer(data);
	} else if (type == ExchangeType.ANSWER) {
		this.handleAnswer(data);
	} else if (type == ExchangeType.CANDIDATE) {
		this.handleCandidate(data);
	}
};
/**
 * 建立连接
 * 
 */
BlinkEngine.prototype.preparePeerConnection = function(userId) {
	var blinkEngine = this;
	if (blinkEngine.peerConnections[userId] == undefined) {
		var pc = new RTCPeerConnection();
		pc.onaddstream = function(evt) {
			blinkEngine.remoteStreams.push(evt.stream);
			blinkEngine.remoteStreamCount = blinkEngine.remoteStreams.length;
			var joinedUser = blinkEngine.joinedUsers.get(evt.stream.id);
			joinedUser.splice(2, 1, evt.stream);
			var talkType = joinedUser[1];
			blinkEngine.blinkEngineEventHandle.call('onUserJoined', { // 普通模式
				userId : evt.stream.id,
				userType : UserType.NORMAL,
				talkType : talkType
			});
		};

		pc.onremovestream = function(evt) {
			console.log(JSON.stringify(evt));
		};

		pc.ontrack = null;

		pc.onsignalingstatechange = function(evt) {
			console.log(JSON.stringify(evt));
		};

		pc.oniceconnectionstatechange = function(evt) {
			console.log(JSON.stringify(evt));
		};

		pc.onnegotiationneeded = null;
		pc.ondatachannel = null;

		pc.onicecandidate = function(evt) {
			handle(pc, evt);

			function handle(pc, evt) {
				if ((pc.signalingState || pc.readyState) == 'stable'
						&& blinkEngine.peerConnections[userId]['rem'] == true) {
					if (evt.candidate) {
						blinkEngine.candidate(JSON.stringify(evt.candidate),
								userId);
					}
					return;
				}
				setTimeout(function() {
					handle(pc, evt);
				}, 2 * 1000);
			}
		};
		blinkEngine.peerConnections[userId] = {}
		blinkEngine.peerConnections[userId]['pc'] = pc;
		blinkEngine.peerConnections[userId]['rem'] = false;
	}
	return blinkEngine.peerConnections[userId];
};
/**
 * handle offer
 * 
 */
BlinkEngine.prototype.handleOffer = function(data) {
	var from = data.parameters['from'];
	var pc = this.preparePeerConnection(from);
	if (this.userType == UserType.NORMAL) {
		pc['pc'].addStream(this.localStream);
	}
	// set bandwidth
	var desc = JSON.parse(data.content.replace(new RegExp('\'', 'g'), '"'));
	desc.sdp = setBandWidth(desc.sdp, this.bandWidth);

	var blinkEngine = this;
	pc['pc'].setRemoteDescription(new RTCSessionDescription(desc), function() {
		pc['rem'] = true;
		pc['pc'].createAnswer(function(desc2) {
			pc['pc'].setLocalDescription(desc2, function() {
				blinkEngine.answer(JSON.stringify(desc2), from);
			}, error, success);
		}, success, blinkEngine.mediaConfig.sdpConstraints);
	}, error);
};
/**
 * handle answer
 * 
 */
BlinkEngine.prototype.handleAnswer = function(data) {
	var from = data.parameters['from'];
	var pc = this.preparePeerConnection(from);
	// set bandwidth
	var desc = JSON.parse(data.content.replace(new RegExp('\'', 'g'), '"'));
	desc.sdp = setBandWidth(desc.sdp, this.bandWidth);

	pc['pc'].setRemoteDescription(new RTCSessionDescription(desc), function() {
		pc['rem'] = true;
	}, error);
};
/**
 * handle candidate
 * 
 */
BlinkEngine.prototype.handleCandidate = function(signal) {
	var from = signal.parameters['from'];
	var pc = this.preparePeerConnection(from);
	pc['pc'].addIceCandidate(new RTCIceCandidate(JSON.parse(signal.content
			.replace(new RegExp('\'', 'g'), '"'))), success, error);
}
/** ----- 处理通知信令 ----- */
/**
 * close
 * 
 */
var close = function(event) {
	this.signaling.close();
};
/**
 * error
 * 
 */
var error = function(error) {
	console.log('error ' + JSON.stringify(error));
};
/**
 * success
 * 
 */
var success = function(success) {
	console.log('success ' + JSON.stringify(success));
};
/**
 * SDP设置带宽
 * 
 * @param sdp
 * @param bandWidthParam
 * @returns
 */
var bandWidthCount=0;
function setBandWidth(sdp, bandWidthParam) {
	// 给带宽设置增加计数器，使每次设置的最小码率不同，防止码率一样WebRTC将码率重置成默认最小值
	bandWidthCount++;
	var currentBandWidth = JSON.parse(JSON.stringify(bandWidthParam));
	if (bandWidthCount % 2 == 0) {
		currentBandWidth.min = currentBandWidth.min + 1;
	}
	
	// set BAS
	sdp = sdp.replace(/a=mid:video\n/g, 'a=mid:video\nb=AS:'
			+ currentBandWidth.max + '\n');
	
	// 查找最优先用的视频代码
	var sep1 = "\n";
	var findStr1 = "m=video";
	
	var sdpArr = sdp.split(sep1);
	// 查找findStr1
	var findIndex1 = findLine(sdpArr, findStr1);
	if (findIndex1 == null) {
		return sdp;
	}
	
	var sep2 = " ";
	
	var videoDescArr1 = sdpArr[findIndex1].split(sep2);
	// m=video 9 UDP/TLS/RTP/SAVPF
	var firstVideoCode = videoDescArr1[3];
	var findStr2 = "a=rtpmap:" + firstVideoCode;
	// 查找findStr2
	var findIndex2 = findLine(sdpArr, findStr2);
	if (findIndex2 == null) {
		return sdp;
	}
	
	var appendStr = 'a=fmtp:' + firstVideoCode + ' x-google-min-bitrate=' + currentBandWidth.min
	// + '; x-google-max-bitrate=' + currentBandWidth.max
	// + '; x-google-start-bitrate=' + currentBandWidth.start + sep1;
	+ '; x-google-max-bitrate=' + currentBandWidth.max;
	sdpArr[findIndex2] = sdpArr[findIndex2].concat(sep1 + appendStr);
	
	return sdpArr.join(sep1);
}
/**
 * SDP修改stream id
 * 
 * @param sdp
 * @param oldId
 * @param newId
 * @returns
 */
function changeStreamId(sdp, oldId, newId) {
	sdp = sdp.replace(new RegExp(oldId, 'g'), newId);
	return sdp;
}
/**
 * SDP修改video兼容参数
 * 
 * @param sdp
 * @returns
 */
function changeVideoDesc(sdp) {
//	var videoDesc1 = "m=video 9 RTP/AVPF 98 96 100 127 125 97 99 101";
//	var videoDesc2 = "a=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtpmap:98 H264/90000\r\na=rtcp-fb:98 ccm fir\r\na=rtcp-fb:98 nack\r\na=rtcp-fb:98 nack pli\r\na=rtcp-fb:98 goog-remb\r\na=rtcp-fb:98 transport-cc\r\na=fmtp:98 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\na=rtpmap:100 red/90000\r\na=rtpmap:127 ulpfec/90000\r\na=rtpmap:125 flexfec-03/90000\r\na=rtcp-fb:125 transport-cc\r\na=rtcp-fb:125 goog-remb\r\na=fmtp:125 repair-window=10000000\r\na=rtpmap:97 rtx/90000\r\na=fmtp:97 apt=96\r\na=rtpmap:99 rtx/90000\r\na=fmtp:99 apt=98\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100";
	
//	var findStr1 = "m=video";
//	var findStr2 = "a=rtcp-rsize";
//	var findStr3 = "a=ssrc-group";
//	
//	var sdpArr = sdp.split('\r\n');
//	// 查找videoDesc1
//	var findIndex1 = findLine(sdpArr, findStr1);
//	// 替换videoDesc1
//	sdpArr[findIndex1] = videoDesc1;
//	// 查找videoDesc2
//	var findIndex2 = findLine(sdpArr, findStr2);
//	var findIndex3 = findLine(sdpArr, findStr3);
//	// 删除中间的元素
//	sdpArr.splice(findIndex2 + 1, findIndex3 - findIndex2 - 1);
//	// 替换videoDesc2
//	sdpArr[findIndex2] = sdpArr[findIndex2].concat('\r\n' + videoDesc2);
//	return sdpArr.join('\r\n');

	var sep1 = "\r\n";
	var findStr1 = "m=video";
	
	var sdpArr = sdp.split(sep1);
	// 查找videoDesc1
	var findIndex1 = findLine(sdpArr, findStr1);
	if (findIndex1 == null) {
		return sdp;
	}
	
	var h264_code = "98";
	var vp8_code = "96";
	var red_code = "100"
	var ulpfec_code = "127";
	var flexfec_code = "125";
	var h264_rtx_code = "99";
	var vp8_rtx_code = "97";
	var red_rtx_code = "101"

	var h264_search = "H264/90000";
	var vp8_search = "VP8/90000";
	var red_search = "red/90000";
	var ulpfec_search = "ulpfec/90000";
	var flexfec_search = "flexfec-03/90000";

	var h264_replace = "a=rtpmap:98 H264/90000\r\na=rtcp-fb:98 ccm fir\r\na=rtcp-fb:98 nack\r\na=rtcp-fb:98 nack pli\r\na=rtcp-fb:98 goog-remb\r\na=rtcp-fb:98 transport-cc\r\na=fmtp:98 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\na=rtpmap:99 rtx/90000\r\na=fmtp:99 apt=98";
	var vp8_replace = "a=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtpmap:97 rtx/90000\r\na=fmtp:97 apt=96";
	var red_replace = "a=rtpmap:100 red/90000\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100";
	var ulpfec_replace = "a=rtpmap:127 ulpfec/90000";
	var flexfec_replace = "a=rtpmap:125 flexfec-03/90000\r\na=rtcp-fb:125 transport-cc\r\na=rtcp-fb:125 goog-remb\r\na=fmtp:125 repair-window=10000000";

	var sep2 = " ";
	var findStr2 = "a=rtpmap";
	var findStr3 = "a=ssrc-group";
	
	var videoDescArr1 = sdpArr[findIndex1].split(sep2);
	// m=video 9 UDP/TLS/RTP/SAVPF
	var videoReplace1 = videoDescArr1[0] + sep2 + videoDescArr1[1] + sep2
			+ videoDescArr1[2];
	// 查找videoDesc2
	var findIndex2 = findLineInRange(sdpArr, findStr2, findIndex1 + 1, sdpArr.length - 1);
	var findIndex3 = findLineInRange(sdpArr, findStr3, findIndex2 + 1, sdpArr.length - 1);
	if (findIndex3 == null) { // 观察者模式没有findStr3相关信息
		findIndex3 = sdpArr.length - 1;
	}
	// 删除中间的元素
	var removeArr = sdpArr.splice(findIndex2, findIndex3 - findIndex2);
	
	// 查找H264
	var h264_index = findLine(removeArr, h264_search);
	// 查找VP8
	var vp8_index = findLine(removeArr, vp8_search);
	// 查找red
	var red_index = findLine(removeArr, red_search);
	// 查找ulpfec
	var ulpfec_index = findLine(removeArr, ulpfec_search);
	// 查找flexfec
	var flexfec_index = findLine(removeArr, flexfec_search);

	var videoReplace2 = "";
	if (h264_index != null) {
		videoReplace1 += sep2 + h264_code;
		videoReplace2 += sep1 + h264_replace;
	}
	if (vp8_index != null) {
		videoReplace1 += sep2 + vp8_code;
		videoReplace2 += sep1 + vp8_replace;
	}
	if (red_index != null) {
		videoReplace1 += sep2 + red_code;
		videoReplace2 += sep1 + red_replace;
	}
	if (ulpfec_index != null) {
		videoReplace1 += sep2 + ulpfec_code;
		videoReplace2 += sep1 + ulpfec_replace;
	}
	if (flexfec_index != null) {
		videoReplace1 += sep2 + flexfec_code;
		videoReplace2 += sep1 + flexfec_replace;
	}
	if (h264_index != null) {
		videoReplace1 += sep2 + h264_rtx_code;
	}
	if (vp8_index != null) {
		videoReplace1 += sep2 + vp8_rtx_code;
	}
	if (red_index != null) {
		videoReplace1 += sep2 + red_rtx_code;
	}

	// 替换videoDesc1
	sdpArr[findIndex1] = videoReplace1;
	// 替换videoDesc2
	sdpArr[findIndex2 - 1] = sdpArr[findIndex2 - 1].concat(videoReplace2);
	
	return sdpArr.join(sep1);
}
/**
 * 数组中查找
 * 
 * @param arr
 * @param substr
 * @returns
 */
function findLine(arr, substr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].indexOf(substr) != -1) {
			return i;
		}
	}
	return null;
}
/**
 * 数组中查找
 * 
 * @param arr
 * @param substr
 * @param startIndex
 * @param endIndex
 * @returns
 */
function findLineInRange(arr, substr, startIndex, endIndex) {
	var start = (startIndex == null || startIndex == '' || startIndex < 0) ? 0
			: startIndex;
	var end = (endIndex == null || endIndex == '' || endIndex < 0 || endIndex > arr.length - 1) ? arr.length - 1
			: endIndex;
	start = start > end ? end : start;
	for (var i = start; i <= end; i++) {
		if (arr[i].indexOf(substr) != -1) {
			return i;
		}
	}
	return null;
}
/**
 * 随机打乱数组内排序
 * 
 * @param input
 * @returns
 */
function shuffle(input) {
	for (var i = input.length - 1; i >= 0; i--) {
		var randomIndex = Math.floor(Math.random() * (i + 1));
		var itemAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
}
//
// return BlinkEngine;
// });
/** ----- BlinkEngine ----- */
/** ----- BlinkEngineEventHandle ----- */
// var BlinkEngineEventHandle = (function() {
/**
 * 构造函数
 * 
 */
var BlinkEngineEventHandle = function(config) {
	/** 事件集合 */
	this.eventHandles = {};
	return this;
}
/**
 * 绑定事件
 * 
 */
BlinkEngineEventHandle.prototype.on = function(eventName, event) {
	this.eventHandles[eventName] = event;
};
/**
 * 调用事件
 * 
 */
BlinkEngineEventHandle.prototype.call = function(eventName, data) {
	for ( var eventHandle in this.eventHandles) {
		if (eventName === eventHandle) {
			return this.eventHandles[eventName](data);
		}
	}
	console.log('EventHandle ' + eventName + ' do not have defined function');
};
//
// return BlinkEngineEventHandle;
// });
/** ----- BlinkEngineEventHandle ----- */
/** ----- BlinkVideoView ----- */
var BlinkVideoView = function() {

}
/** ----- BlinkAjax ----- */
var BlinkAjax = function(opt) {
	opt.type = opt.type.toUpperCase() || 'POST';
	if (opt.type === 'POST') {
		post(opt);
	} else {
		get(opt);
	}

	// 初始化数据
	function init(opt) {
		var optAdapter = {
			url : '',
			type : 'GET',
			data : {},
			async : true,
			dataType : 'JSON',
			success : function() {
			},
			error : function(s) {
				// alert('status:' + s + 'error!');
			}
		}
		opt.url = opt.url || optAdapter.url;
		opt.type = opt.type.toUpperCase() || optAdapter.method;
		opt.data = params(opt.data) || params(optAdapter.data);
		opt.dataType = opt.dataType.toUpperCase() || optAdapter.dataType;
		// opt.async = opt.async || optAdapter.async;
		opt.success = opt.success || optAdapter.success;
		opt.error = opt.error || optAdapter.error;
		return opt;
	}
	// 创建XMLHttpRequest对象
	function createXHR() {
		if (window.XMLHttpRequest) { // IE7+、Firefox、Opera、Chrome、Safari
			return new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE6 及以下
			var versions = [ 'MSXML2.XMLHttp', 'Microsoft.XMLHTTP' ];
			for (var i = 0, len = versions.length; i < len; i++) {
				try {
					return new ActiveXObject(version[i]);
					break;
				} catch (e) {
					// 跳过
				}
			}
		} else {
			throw new Error('浏览器不支持XHR对象！');
		}
	}
	function params(data) {
		var arr = [];
		for ( var i in data) {
			// 特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	}
	function callback(opt, xhr) {
		if (xhr.readyState == 4 && xhr.status == 200) { // 判断http的交互是否成功，200表示成功
			var returnValue;
			switch (opt.dataType) {
			case "XML":
				returnValue = xhr.responseXML;
				break;
			case "JSON":
				var jsonText = xhr.responseText;
				if (jsonText) {
					returnValue = eval("(" + jsonText + ")");
				}
				break;
			default:
				returnValue = xhr.responseText;
				break;
			}
			if (returnValue) {
				opt.success(returnValue);
			}
		} else {
			// alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' +
			// xhr.statusText);
			opt.error(xhr);
		}

	}
	// post方法
	function post(opt) {
		var xhr = createXHR(); // 创建XHR对象
		var opt = init(opt);
		opt.type = 'post';
		if (opt.async === true) { // true表示异步，false表示同步
			// 使用异步调用的时候，需要触发readystatechange 事件
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) { // 判断对象的状态是否交互完成
					callback(opt, xhr); // 回调
				}
			};
		}
		// 在使用XHR对象时，必须先调用open()方法，
		// 它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
		xhr.open(opt.type, opt.url, opt.async);
		// post方式需要自己设置http的请求头，来模仿表单提交。
		// 放在open方法之后，send方法之前。
		xhr.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded;charset=utf-8');
		xhr.send(opt.data); // post方式将数据放在send()方法里
		if (opt.async === false) { // 同步
			callback(opt, xhr); // 回调
		}
	}
	// get方法
	function get(opt) {
		var xhr = createXHR(); // 创建XHR对象
		var opt = init(opt);
		opt.type = 'get';
		if (opt.async === true) { // true表示异步，false表示同步
			// 使用异步调用的时候，需要触发readystatechange 事件
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) { // 判断对象的状态是否交互完成
					callback(opt, xhr); // 回调
				}
			};
		}
		// 若是GET请求，则将数据加到url后面
		opt.url += opt.url.indexOf('?') == -1 ? '?' + opt.data : '&' + opt.data;
		// 在使用XHR对象时，必须先调用open()方法，
		// 它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
		xhr.open(opt.type, opt.url, opt.async);
		xhr.send(null); // get方式则填null
		if (opt.async === false) { // 同步
			callback(opt, xhr); // 回调
		}
	}
}
/** ----- BlinkMap ----- */
var BlinkMap = function() {
	this._entrys = new Array();

	this.put = function(key, value) {
		if (key == null || key == undefined) {
			return;
		}
		var index = this._getIndex(key);
		if (index == -1) {
			var entry = new Object();
			entry.key = key;
			entry.value = value;
			this._entrys[this._entrys.length] = entry;
		} else {
			this._entrys[index].value = value;
		}
	};
	this.get = function(key) {
		var index = this._getIndex(key);
		return (index != -1) ? this._entrys[index].value : null;
	};
	this.remove = function(key) {
		var index = this._getIndex(key);
		if (index != -1) {
			this._entrys.splice(index, 1);
		}
	};
	this.clear = function() {
		this._entrys.length = 0;
	};
	this.contains = function(key) {
		var index = this._getIndex(key);
		return (index != -1) ? true : false;
	};
	this.size = function() {
		return this._entrys.length;
	};
	this.getEntrys = function() {
		return this._entrys;
	};
	this._getIndex = function(key) {
		if (key == null || key == undefined) {
			return -1;
		}
		var _length = this._entrys.length;
		for (var i = 0; i < _length; i++) {
			var entry = this._entrys[i];
			if (entry == null || entry == undefined) {
				continue;
			}
			if (entry.key === key) {// equal
				return i;
			}
		}
		return -1;
	};
}
/** ----- BlinkException ----- */
var BlinkException = function(code, message) {
	this.code = code;
	this.message = message;
}
