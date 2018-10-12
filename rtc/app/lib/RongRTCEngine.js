/* 
version: 1.0.0
*/

/** This library require adapter.js */

/** ----- 参数定义 ----- */
var RongRTCGlobal = {
    /** 带宽设置计数器 */
    bandWidthCount: 0
}
/** ----- 参数定义 ----- */

/** ----- 常量定义 ----- */
var RongRTCConstant = {
    /** RongRTC SDK版本号 */
    SDK_VERSION_NAME: '1.6.0',
    /** logon version */
    LOGON_VERSION: '1',
    /** keepAlive时间间隔 */
    KEEPALIVE_INTERVAL: 5 * 1000,
    /** keepAlive最大连续失败次数 */
    KEEPALIVE_FAILEDTIMES_MAX: 4,
    /** keepAliveTimer时间间隔 */
    KEEPALIVE_TIMER_INTERVAL: 1 * 1000,
    /** keepAlive未收到result最大超时时间 */
    KEEPALIVE_TIMER_TIMEOUT_MAX: 20,
    /** keepAlive未收到result最大超时时间 */
    KEEPALIVE_TIMER_TIMEOUT_RECONNECT: 12,
    /** reconnect最大连续次数 */
    RECONNECT_MAXTIMES: 10,
    /** reconnect连续重连时间间隔 */
    RECONNECT_TIMEOUT: 1 * 1000,
    /** getStatsReport时间间隔 */
    GETSTATSREPORT_INTERVAL: 1 * 1000
}
/** 连接类型 */
RongRTCConstant.ConnectionType = {
    /** P2P模式 */
    P2P: '0',
    /** MediaServer模式 */
    MEDIASERVER: '1'
}
/** 用户模式类型 */
RongRTCConstant.UserType = {
    /** 普通模式 */
    NORMAL: '1',
    /** 观察者模式 */
    OBSERVER: '2'
}
/** 与服务器的连接状态 */
RongRTCConstant.ConnectionState = {
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    ROOM_ERROR: 'ROOM_ERROR'
}
/** websocket的连接状态 */
RongRTCConstant.wsConnectionState = {
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    CONNECTING: 'CONNECTING'
}
/** 交换类型 */
RongRTCConstant.ExchangeType = {
    /** offer */
    OFFER: '1',
    /** answer */
    ANSWER: '2',
    /** candidate */
    CANDIDATE: '3'
}
/** logonAndJoin status */
RongRTCConstant.LogonAndJoinStatus = {
    CONNECT: 0,
    RECONNECT: 1
}
/** offer status */
RongRTCConstant.OfferStatus = {
    SENDING: 'SENDING',
    DONE: 'DONE'
}
/**
 * 会控
 */
RongRTCConstant.Meeting = {
    RoleChange: {
        DEMOTION: 1,
        INVITE: 2,
        REMOVE: 3
    },
    ChannelAnswer: {
        INVITE_OBSERVER: 1,
        OBSERVER_SPEAK: 2,
        INVITE_OPEN_DEV: 3,
        DEMOTIONUSER: 4,
        INVITE_CLOSE_DEV: 5
    }

}
/** 信令 */
RongRTCConstant.SignalType = {
    /** 请求信令 */
    // LOGON : 'logon',
    // JOIN : 'join',
    // PING : 'ping',
    LOGONANDJOIN: 'logonAndJoin',
    CHANNEL_PING: 'channelPing',
    UPDATETALKTYPE: 'updateTalkType',
    LEAVE: 'leave',
    EWB_CREATE: 'ewb_create',
    EWB_QUERY: 'ewb_query',
    /** 应答信令 */
    LOGONANDJOIN_RESULT: 'logonAndJoin_result',
    CHANNEL_PING_RESULT: 'channelPing_result',
    LEAVE_RESULT: 'leave_result',
    EWB_CREATE_RESULT: 'ewb_create_result',
    EWB_QUERY_RESULT: 'ewb_query_result',
    /** 通知信令 */
    JOINED: 'joined',
    UPDATE_TALKTYPE: 'update_talktype',
    OFFER_REQUEST: 'offerRequest',
    LEFT: 'left',
    EWB_CREATE_NOTIFY: 'ewb_create_notify',
    FLOWSUBSCRIBE: 'flowSubscribe', //本地大小流切换 通知服务器
    /** exchange信令 */
    EXCHANGE: 'exchange',
    /** 白板创建信令 */
    EWB_CREATE_NOTIFY: 'ewb_create_notify',
    /** 会议控制*/
    ROLECHANGE: 'rolechange',
    ROLECHANGE_RESULT: 'rolechange_result',
    APPLY: 'apply',
    APPLY_RESULT: 'apply_result',
    MANAGEACTION: 'manageaction',
    MANAGEACTION_RESULT: 'manageaction_result',
    CHANNELANSWER: 'channelanswer',
    CHANNELANSWER_RESULT: 'channelanswer_result',
    CREATENOTIFY: 'createnotify',
    CREATENOTIFY_RESULT: 'createnotify_result',
    EWBService: 'ewbservice',
    SCREENSHARING: 'screensharing',
    TURNTALKTYPE: 'turntalktype',
    TURNTALKTYPE_RESULT: 'turntalktype_result'


}
/** 视频分辨率 */
RongRTCConstant.VideoProfile_default = {
    width: 640,
    height: 480,
    frameRate: 15
}
/** 小视频分辨率 */
RongRTCConstant.VideoProfile_min = {
    width: 176,
    height: 144,
    frameRate: 15
}
/** 共享屏幕分辨率 */
RongRTCConstant.ShareProfile_default = {
    width: 1280,
    height: 720,
    frameRate: 15
}
/** 带宽 */
RongRTCConstant.BandWidth_default = {
    min: 100,
    max: 500
}
/** 带宽全部 */
RongRTCConstant.BandWidth_320_240 = {
    min: 100,
    max: 320
}
RongRTCConstant.BandWidth_640_480 = {
    min: 100,
    max: 500
}
RongRTCConstant.BandWidth_1280_720 = {
    min: 100,
    max: 1500
}
RongRTCConstant.BandWidth_ScreenShare_1280_720 = {
	min: 1000,
	max: 1500
}
/** ----- 常量定义 ----- */

/** ----- RongRTCEngine ----- */
//var RongRTCEngine = (function() {
/**
 * 构造函数
 *
 */
var rongRTCengine,rongRTCEngine;
var RongRTCEngine = function (wsNavUrl) {
    this.init(wsNavUrl);
    this.initShare();
    this.rongRTCMeeting = new RongRTCMeeting();
    rongRTCEngine = rongRTCengine = this ;
    return this;
}
RongRTCEngine.prototype.initShare = function () {
    // 绑定插件监听事件
    this.addEventListener();
    // 检测插件
    setTimeout(function () {
        window.postMessage('test', '*');
    }, 1000)
}
/**
 * 初始化
 *
 */
RongRTCEngine.prototype.init = function (wsNavUrl) {
    /** 会议ID */
    this.channelId = null;
    /** 连接集合 */
    this.peerConnections = {};
    /** 本地视频流 */
    this.localStream = null;
    /** 远端视频流数组 */
    this.remoteStreams = new Array();
    /** 屏幕共享音频流*/
    this.localAudioStream = null;
    /** logonAndJoin status 登录类型，第一次登录加入房间传0，断线重连传1 */
    this.logonAndJoinStatus = null;
    /** offer status */
    this.offerStatus = null;
    /** 连接的用户集合 */
    this.joinedUsers = new RongRTCMap();
    /** remote cname Map */
    this.remoteCnameMap = new RongRTCMap();
    /** remote Sdp Map */
    this.remoteSdpMap = new RongRTCMap();
    /** 麦克风开关 */
    this.microphoneEnable = true;
    /** 本地视频开关 */
    this.localVideoEnable = true;
    /** 远端音频开关 */
    this.remoteAudioEnable = true;
    /** keepAlive连续失败次数计数器 */
    this.keepAliveFailedTimes = 0;
    /** keepAlive间隔 */
    this.keepAliveInterval = null;
    /** keepAlive未收到result计时 */
    this.keepAliveTimerCount = 0;
    /** keepAlive未收到result计时器 */
    this.keepAliveTimer = null;
    /** reconnect连续次数计数器 */
    this.reconnectTimes = 0;
    /** csequence */
    this.csequence = 0;
    /** websocket对象 */
    this.signaling = null;
    /** websocket消息队列 */
    this.wsQueue = [];
    /** websocket连接状态, true:已连接, false:未连接 */
    this.wsConnectionState = null;
    /** websocket是否强制关闭：true:是, false不是 */
    this.wsForcedClose = false;
    /** websocket是否需要重连：true:是, false不是 */
    this.wsNeedConnect = true;
    /** websocket地址列表 */
    this.wsUrlList = [];
    /** websocket地址索引 */
    this.wsUrlIndex = 0;

    // 设置websocket nav url
    this.wsNavUrl = wsNavUrl;

    /** 视频参数默认值 */
    this.userType = RongRTCConstant.UserType.NORMAL;
    this.isAudioOnly = false;
    this.localVideoEnable = true;
    this.videoProfile = RongRTCConstant.VideoProfile_default;
    this.videoMinProfile = RongRTCConstant.VideoProfile_min;
    this.videoMaxRate = RongRTCConstant.BandWidth_default.max;
    this.videoMinRate = RongRTCConstant.BandWidth_default.min;
    /** media config */
    this.mediaConfig = {
        video: this.videoProfile,
        audio: true
    }
    /** mediaMin config */
    this.mediaMinConfig = {
        video: this.videoMinProfile,
        audio: false//小流不需要视频
    }
    /** bandwidth */
    this.bandWidth = {
        min: this.videoMinRate,
        max: this.videoMaxRate
    };
    /** 白板 */
    this.ewbCreated = false;
//	/** sdp属性 */
//	// 统一设置，包含观察者模式和普通模式无摄像头情况
//	this.mediaConfig.sdpConstraints = {};
//	this.mediaConfig.sdpConstraints.mandatory = {};
//	this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveAudio = true;
//	this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveVideo = true;

    /** 是否上报丢包率信息 */
    this.isSendLostReport = false;
    /** RongRTCConnectionStatsReport */
    this.rongRTCConnectionStatsReport = null;
    /** getStatsReport间隔 */
    this.getStatsReportInterval = null;
    /** 是否支持屏幕共享 */
    this.isScreenShareSupport = false;
};
/**
 * reset
 *
 */
RongRTCEngine.prototype.reset = function () {

}
/**
 * clear
 *
 */
RongRTCEngine.prototype.clear = function () {
    this.exitScheduleKeepAlive();
    this.exitScheduleKeepAliveTimer();
    this.disconnect(false);
    this.closePeerConnection(this.selfUserId);
}
/** ----- 提供能力 ----- */
/**
 * 获取RongRTC SDK版本号
 *
 * @return sdkversion
 */
RongRTCEngine.prototype.getSDKVersion = function () {
    return RongRTCConstant.SDK_VERSION_NAME;
}
/**
 * 设置RongRTCEngineEventHandle监听
 *
 */
RongRTCEngine.prototype.setRongRTCEngineEventHandle = function (rongRTCEngineEventHandle) {
    this.rongRTCEngineEventHandle = rongRTCEngineEventHandle;
}
/**
 * 设置视频参数
 *
 */
RongRTCEngine.prototype.setVideoParameters = function (config) {
    if (config.USER_TYPE != null && config.USER_TYPE == RongRTCConstant.UserType.OBSERVER) {
        this.userType = RongRTCConstant.UserType.OBSERVER;
    }
    if (config.IS_AUDIO_ONLY != null) {
        this.isAudioOnly = config.IS_AUDIO_ONLY;
    }
    if (config.IS_CLOSE_VIDEO != null) {
        this.localVideoEnable = !config.IS_CLOSE_VIDEO;
    }
    if (config.VIDEO_PROFILE != null) {
        this.videoProfile = config.VIDEO_PROFILE;
        /** media config */
        this.mediaConfig.video = this.videoProfile;
    }
    /** bandwidth */
    if (config.VIDEO_MAX_RATE != null) {
        this.videoMaxRate = config.VIDEO_MAX_RATE;
        this.bandWidth.max = this.videoMaxRate;
    } else if (config.VIDEO_PROFILE.width != null && config.VIDEO_PROFILE.height != null) {
        var bandWidth_resulotion = RongRTCConstant["BandWidth_" + config.VIDEO_PROFILE.width + "_" + config.VIDEO_PROFILE.height]
        if (bandWidth_resulotion != null) {
            this.videoMaxRate = bandWidth_resulotion.max;
            this.bandWidth.max = this.videoMaxRate;
        }
    }
    if (config.VIDEO_MIN_RATE != null) {
        this.videoMinRate = config.VIDEO_MIN_RATE;
        this.bandWidth.min = this.videoMinRate;
    } else if (config.VIDEO_PROFILE.width != null && config.VIDEO_PROFILE.height != null) {
        var bandWidth_resulotion = RongRTCConstant["BandWidth_" + config.VIDEO_PROFILE.width + "_" + config.VIDEO_PROFILE.height]
        if (bandWidth_resulotion != null) {
            this.videoMinRate = bandWidth_resulotion.min;
            this.bandWidth.min = this.videoMinRate;
        }
    }
//	/** sdp属性 */
//	if (this.userType == RongRTCConstant.UserType.OBSERVER) { // 观察者模式
//		if (this.mediaConfig.sdpConstraints == null) {
//			this.mediaConfig.sdpConstraints = {};
//		}
//		if (this.mediaConfig.sdpConstraints.mandatory == null) {
//			this.mediaConfig.sdpConstraints.mandatory = {};
//		}
//		this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveAudio = true;
//		this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveVideo = true;
//	}
}
/**
 * 列举 麦克风  摄像头
 * @return audioState ：0 没有麦克风 1 有 ；videoState 0 没有摄像头 1 有
 */
RongRTCEngine.prototype.audioVideoState = async function () {
    // 列举设备 audioState  videoState
    let audioState = 0;
    let videoState = 0;
    let audioAuthorized = 0;
    let videoAuthorized = 0;
    await navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
        let deviceArr = deviceInfos.map(function(deviceInfo, index) {
            return deviceInfo.kind;
        })
        deviceArr.forEach(function(kind) {
            if (kind.indexOf('video') > -1)
                videoState = 1;
            if (kind.indexOf('audio') > -1)
                audioState = 1;
        })
    });
    if (videoState) {
        await  navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(data)  {
            videoAuthorized = 1;
        }).catch(function(error)  {
            if (error.name == 'PermissionDeniedError')
                videoAuthorized = 0;
        })

    }
    if (audioState) {
        await  navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(function(data)  {
            audioAuthorized = 1;
        }).catch(function(error)  {
            if (error.name == 'PermissionDeniedError')
                audioAuthorized = 0;
        })
    }
    return {
        audioState: audioState,
        audioAuthorized: audioAuthorized,
        videoState: videoState,
        videoAuthorized: videoAuthorized
    }
}
/**
 * 加入会议
 *
 */
RongRTCEngine.prototype.joinChannel = function (channelId, userId, token) {

    this.channelId = RongRTCConstant.ConnectionType.MEDIASERVER + channelId;
    this.selfUserId = userId;
    this.token = token;
    // 创建本地视频    pc.addStream(rongRTCEngine.localStreamMin);//加入小流
    var rongRTCEngine = this;
    if (rongRTCEngine.userType == 2) {
        rongRTCEngine.createSignaling();
        rongRTCEngine.logonAndJoin(RongRTCConstant.LogonAndJoinStatus.CONNECT);
        this.localStream = new MediaStream();
        return
    }
    navigator.getUserMedia(rongRTCEngine.mediaConfig, function (stream) {
        RongRTCLogger.info("navigator.getUserMedia success");
        rongRTCEngine.localStream = stream;
        rongRTCengine.localStream.id = rongRTCengine.selfUserId;
        if (!rongRTCEngine.localVideoEnable) {
            rongRTCEngine.closeLocalVideoWithUpdateTalkType(
                !rongRTCEngine.localVideoEnable, false);
        }
        // 创建websocket连接
        rongRTCEngine.createSignaling();
        rongRTCEngine.logonAndJoin(RongRTCConstant.LogonAndJoinStatus.CONNECT);
    }, function (error) {
        RongRTCLogger.error("navigator.getUserMedia error: ", error);

    });
   /* //小流媒体
    navigator.getUserMedia(rongRTCEngine.mediaMinConfig, function (stream) {
        RongRTCLogger.info("navigator.geMinMedia success");
        stream.id = rongRTCEngine.selfUserId + "_tiny";
        rongRTCEngine.localStreamMin = stream;

    }, function (error) {
        RongRTCLogger.error("navigator.getMinMedia error: ", error);

    });*/
};
/**
 * 离开会议
 *
 */
RongRTCEngine.prototype.leaveChannel = function () {
    this.leave();
}
/**
 * 获取本地视频视图
 * @Deprecated
 *
 */
RongRTCEngine.prototype.getLocalVideoView = function () {
    return this.getLocalStream();
};
/**
 * 获取远端视频视图
 * @Deprecated
 *
 */
RongRTCEngine.prototype.getRemoteVideoView = function (userId) {
    return this.getRemoteStream(userId);
};
/**
 * 获取本地视频流
 *
 */
RongRTCEngine.prototype.getLocalStream = function () {
    return this.localStream;
};
/**
 * 获取远端视频流
 *
 */
RongRTCEngine.prototype.getRemoteStream = function (userId) {
    for (var i in this.remoteStreams) {
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
RongRTCEngine.prototype.getRemoteStreamCount = function () {
    return this.remoteStreams.length;
};
/**
 * 创建视频视图
 *
 */
RongRTCEngine.prototype.createVideoView = function () {
    var videoView = document.createElement('video');
    // 视频自动播放
    videoView.autoplay = true;
    videoView.setAttribute("playsinline", true); // isa
    return videoView;
};
/**
 * 创建本地视频视图
 *
 */
RongRTCEngine.prototype.createLocalVideoView = function () {
    var localVideoView = this.createVideoView();
    // 本地视频静音
    localVideoView.muted = true;
    // ID
    localVideoView.id = this.selfUserId;
    // 附加视频流
    localVideoView.srcObject = this.getLocalStream();
    return localVideoView;
};
/**
 * 创建远端视频视图
 *
 */
RongRTCEngine.prototype.createRemoteVideoView = function (userId) {
    var remoteStream = this.getRemoteStream(userId);
    // if (remoteStream == null) {
    // 	return null;
    // }
    var remoteVideoView = this.createVideoView();
    // ID
    remoteVideoView.id = userId;
    // 附加视频流
    remoteVideoView.srcObject = remoteStream;
    return remoteVideoView;
};
/**
 * 关闭/打开麦克风 true, 关闭 false, 打开
 *
 */
RongRTCEngine.prototype.muteMicrophone = function (isMute) {
    this.updateTalkTypeMic(isMute);
}
/**
 * 关闭/打开本地摄像头 true, 关闭 false, 打开
 *
 */
RongRTCEngine.prototype.closeLocalVideo = function (isCameraClose) {
    this.updateTalkTypeCamera(isCameraClose);
}
/**
 * 关闭/打开本地摄像头和发送updateTalkType信令
 *
 * @param isCameraClose
 *            true, 关闭 false, 打开
 * @param isUpdateTalkType
 *            true, 发送 false, 不发送
 */
RongRTCEngine.prototype.closeLocalVideoWithUpdateTalkType = function (isCameraClose, isUpdateTalkType) {
    this.localStream && this.localStream.getVideoTracks().forEach(function (track) {
        track.enabled = !isCameraClose;
    })
    RongRTCLogger.info("Local video close=" + isCameraClose);
    this.localVideoEnable = !isCameraClose;
    // 发送updateTalkType信令
    /* if (isUpdateTalkType) {
         this.updateTalkType();
     }*/
}
/**
 * 关闭/打开声音 true, 关闭 false, 打开
 *
 */
RongRTCEngine.prototype.closeRemoteAudio = function (isAudioClose) {
    if (this.remoteStreams.length === 0) {
        RongRTCLogger.info("No remote audio available.");
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
    RongRTCLogger.info("Remote audio close=" + isAudioClose);
    this.remoteAudioEnable = !isAudioClose;
}
/**
 * 关闭本地媒体流（视频流和音频流）
 *
 */
RongRTCEngine.prototype.closeLocalStream = function () {
    if (this.localStream == null || this.localStream.getTracks() == null
        || this.localStream.getTracks().length === 0) {
        RongRTCLogger.info("No local track available.");
    } else {
    	for (i = 0; i < this.localStream.getTracks().length; i++) {
            this.localStream.getTracks()[i].stop();
        }
    }
    if (this.minStream) { // 小流
    	if (this.localStreamMin == null || this.localStreamMin.getTracks() == null
	        || this.localStreamMin.getTracks().length === 0) {
	        RongRTCLogger.info("No MinStream track available.");
	    } else {
	    	for (i = 0; i < this.localStreamMin.getTracks().length; i++) {
		        this.localStreamMin.getTracks()[i].stop();
		    }
	    }
    }
}
/**
 * 请求白板页面 HTTP URL
 *
 */
RongRTCEngine.prototype.requestWhiteBoardURL = function () {
    this.ewb_create();
}
/**
 * 查询白板
 *
 */
RongRTCEngine.prototype.queryWhiteBoard = function () {
    this.ewb_query();
}
/**
 * 设置是否上报丢包率信息
 *
 */
RongRTCEngine.prototype.enableSendLostReport = function (enable) {
    this.isSendLostReport = enable
}
RongRTCEngine.prototype.checkSupportScreen= function () {
    // 检测浏览器是否支持
    var supportBrowser = ['Chrome'];
    var mb = RongRTCUtil.myBrowser();
    if (supportBrowser.indexOf(mb) < 0) {
        this.rongRTCEngineEventHandle.call('onStartScreenShareComplete', {
            'isSuccess': false,
            'code': 1 // 浏览器不支持
        });
        return;
    }

    var rongRTCEngine = this;

    if (!rongRTCEngine.isScreenShareSupport) {
        rongRTCEngine.rongRTCEngineEventHandle.call('onStartScreenShareComplete', {
            'isSuccess': false,
            'code': 2 // 未安装插件
        });
        return;
    }
}
RongRTCEngine.prototype._startScreenShare = function (stream) {
    this.checkSupportScreen();
    if (stream) {
        this.shareWithStream(stream);
    } else {
        // 发起屏幕共享
        rongRTCEngine.requestScreenShare();

    }
}
/**
 * 开启屏幕共享
 *
 */
RongRTCEngine.prototype.startScreenShare = function (stream) {

    this._startScreenShare(stream);

}
/**
 * 关闭屏幕共享
 *
 */
RongRTCEngine.prototype.stopScreenShare = function () {
    this.endShareScreen();
}
/**
 *结束屏幕共享
 */
RongRTCEngine.prototype.endShareScreen = function () {
    this.rongRTCMeeting.screenShare(false);
    var rongRTCEnv = this;
    rongRTCEnv.getLocalStreamFromRtcApi(rongRTCEnv.mediaConfig).then(function (stream) {
        //关闭音频
        rongRTCEnv.localAudioStream ? rongRTCEnv.localAudioStream.getTracks().forEach(function (track) {
            track.stop();
        }) : void 0;
        //还原音频状态
        stream.getAudioTracks().forEach(function (track) {
            track.enabled = rongRTCEnv.microphoneEnable;
        });
        rongRTCEngine.screenSharingStatus = false;
        RongRTCUtil.setMediaStream(rongRTCEnv.selfUserId, stream);
        rongRTCEnv.screenOffer(stream);

        // talktype[0:无视频有音频, 1:有视频有音频, 2:有视频无音频, 3:无视频无音频]
        var talkType;
        if (!rongRTCEnv.localVideoEnable && rongRTCEnv.microphoneEnable)
            talkType = 0;
        else if (rongRTCEnv.localVideoEnable && rongRTCEnv.microphoneEnable)
            talkType =1;
        else  if(rongRTCEnv.localVideoEnable && !rongRTCEnv.microphoneEnable)
            talkType =2;
        else
            talkType=3;
        rongRTCengine.rongRTCEngineEventHandle.call('onShareComplete', {
            'isShared': false,
            stream: rongRTCengine.localStream,
            userId: rongRTCengine.selfUserId,
            talkType:talkType

        });

        rongRTCEngine.rongRTCEngineEventHandle.call('onStopScreenShareComplete', {
            'isSuccess': true,
            'isShared': false,
            stream: rongRTCengine.localStream,
            userId: rongRTCengine.selfUserId
        });

    }).catch(function (error) {
        RongRTCLogger.error("stopScreenShare getLocalStreamFromRtcApi error: " + error);
        rongRTCEngine.rongRTCEngineEventHandle.call('onStopScreenShareComplete', {
            'isSuccess': false
        });
    });

}
/** ----- 提供能力 ----- */
/** ----- websocket ----- */
/**
 * 创建WebSocket对象
 *
 */
RongRTCEngine.prototype.createSignaling = function () {
    // ws正在连接
    this.wsConnectionState = RongRTCConstant.wsConnectionState.CONNECTING;
    if (this.wsUrlList.length > 0) { // 已取得websocket连接地址
        this.wsUrlIndex++;
        if (this.wsUrlIndex > this.wsUrlList.length - 1) {
            this.wsUrlIndex = 0;
        }
        var url = this.wsUrlList[this.wsUrlIndex];
        this.createSignalingWithUrl(url);
    } else { // 还没有取得websocket连接地址
        var rongRTCEngine = this;
        RongRTCUtil.getWsUrlList(this.wsNavUrl, function (data) {
            var wsUrlList = data;
            if (wsUrlList.length < 1) {
                throw new Error("websocket连接失败!");
            }
            rongRTCEngine.wsUrlList = RongRTCUtil.shuffle(wsUrlList);
            var url = rongRTCEngine.wsUrlList[0];
            rongRTCEngine.createSignalingWithUrl(url);
        });
    }
};
/**
 * 创建WebScoket对象
 *
 */
RongRTCEngine.prototype.createSignalingWithUrl = function (url) {
    var rongRTCEngine = this;
    rongRTCEngine.signaling = new WebSocket('wss://' + url + '/signaling');
    rongRTCEngine.signaling.onopen = function () {
        rongRTCEngine.onOpen();
    };
    rongRTCEngine.signaling.onmessage = function (ev) {
        rongRTCEngine.onMessage(ev);
    };
    rongRTCEngine.signaling.onerror = function (ev) {
        rongRTCEngine.onError(ev);
    };
    rongRTCEngine.signaling.onclose = function (ev) {
        rongRTCEngine.onClose(ev);
    };
};
/**
 * RongRTCMessage实体
 *
 * @param signal
 * @param content
 * @param parameters
 * @returns
 */
var RongRTCMessage = function (signal, content, parameters) {
    this.signal = signal;
    this.content = content;
    this.parameters = parameters;
};
/**
 * 发送消息
 *
 */
RongRTCEngine.prototype.sendMsg = function (signal, msgBody, parameters) {
    this.csequence++;
    parameters.csequence = this.csequence;
    var message = JSON.stringify(new RongRTCMessage(signal, msgBody, parameters));
    this.send(message);
};
/**
 * 发送消息
 *
 */
RongRTCEngine.prototype.send = function (message) {
    var signal = JSON.parse(message).signal;
    if (this.wsConnectionState == RongRTCConstant.wsConnectionState.CONNECTED) { // ws连接可用
        if (signal == RongRTCConstant.SignalType.CHANNEL_PING) { // channelPing记录debug日志
            RongRTCLogger.debug("req: " + message);
        } else {
            RongRTCLogger.info("req: " + message);
        }
        this.signaling.send(message);
    } else { // websocket不可用
        RongRTCLogger.warn("websocket not connected!");
        if (this.wsQueue.length == 0 // 消息队列只保留一条logonAndJoin
            && signal == RongRTCConstant.SignalType.LOGONANDJOIN) { // logonAndJoin
            // 加入消息队列
            this.wsQueue.push(message);
        }
    }
};
/**
 * 发送队列中的消息
 */
RongRTCEngine.prototype.doWsQueue = function () {
    if (this.wsQueue.length > 0) {
        // 消息队列只有一条logonAndJoin，取出并删除
        var message = this.wsQueue.shift();
        this.send(message);
    }
};
/**
 * onOpen
 *
 */
RongRTCEngine.prototype.onOpen = function () {
    RongRTCLogger.info('websocket open');
    // ws连接可用
    this.wsConnectionState = RongRTCConstant.wsConnectionState.CONNECTED;
    // 重置reconnectTimes
    this.reconnectTimes = 0;
    // websocket可用后，发送队列中的消息
    this.doWsQueue();
}
/**
 * onMessage
 *
 */
RongRTCEngine.prototype.onMessage = function (ev) {
    var data = JSON.parse(ev.data);
    if (data.signal == RongRTCConstant.SignalType.CHANNEL_PING_RESULT) { // channelPing_result记录debug日志
        RongRTCLogger.debug("res: " + ev.data);
    } else {
        RongRTCLogger.info("res: " + ev.data);
    }
    switch (data.signal) {
        // 应答信令
        case RongRTCConstant.SignalType.LOGONANDJOIN_RESULT:
            this.logonAndJoin_result(data);
            return;
        case RongRTCConstant.SignalType.CHANNEL_PING_RESULT:
            this.channelPing_result(data);
            return;
        case RongRTCConstant.SignalType.LEAVE_RESULT:
            this.leave_result(data);
            return;
        case RongRTCConstant.SignalType.EWB_CREATE_RESULT:
            this.ewb_create_result(data);
            return;
        case RongRTCConstant.SignalType.EWB_QUERY_RESULT:
            this.ewb_query_result(data);
            return;
        // 通知信令
        case RongRTCConstant.SignalType.JOINED:
            this.joined(data);
            return;
        case RongRTCConstant.SignalType.LEFT:
            this.left(data);
            return;
        case RongRTCConstant.SignalType.OFFER_REQUEST:
            this.offerRequest(data);
            return;
        case RongRTCConstant.SignalType.UPDATE_TALKTYPE:
            this.update_talktype(data);
            return;
        // exchange信令
        case RongRTCConstant.SignalType.EXCHANGE:
            this.exchange(data);
            return;
        // exchange信令
        case RongRTCConstant.SignalType.EWB_CREATE_NOTIFY:
            this.ewbCreateNotify(data);
            return;
        //会控信令 // todo
        case RongRTCConstant.SignalType.ROLECHANGE:
            this.rongRTCMeeting.roleChange(data);
            return;
        case RongRTCConstant.SignalType.APPLY:
            this.rongRTCMeeting.applyMessage(data);
            return;
        case RongRTCConstant.SignalType.MANAGEACTION:
            this.rongRTCMeeting.manageAction(data);
            return;
        case RongRTCConstant.SignalType.CHANNELANSWER:
            this.rongRTCMeeting.channelAnswer(data);
            return;
        case RongRTCConstant.SignalType.CREATENOTIFY:
            console.info(data)
            return;
        case RongRTCConstant.SignalType.SCREENSHARING:
            console.info(data)
            return;
        case RongRTCConstant.SignalType.TURNTALKTYPE:
            this.rongRTCMeeting.turntalktype(data);
            return;
        default:
            RongRTCLogger.warn('Event ' + data.signal + ' do not have defined function', data.parameters);
    }
};
/**
 * onClose
 *
 */
RongRTCEngine.prototype.onClose = function (ev) {
    var rongRTCEnv = this;
    RongRTCLogger.warn('websocket close', ev);
    if (ev.code == 1000 && ev.reason == 'wsForcedClose') { // 如果自定义关闭ws连接，避免二次重连
        return;
    }
    // ws连接不可用
    this.wsConnectionState = RongRTCConstant.wsConnectionState.DISCONNECTED;
    if (this.wsNeedConnect) { // ws需要重连
        setTimeout(function () {
            rongRTCEnv.reconnect()
        }, RongRTCConstant.RECONNECT_TIMEOUT)
    }
};
/**
 * onError
 *
 */
RongRTCEngine.prototype.onError = function (ev) {
    RongRTCLogger.error('websocket error', ev);
};
/**
 * disconnect
 *
 */
RongRTCEngine.prototype.disconnect = function (wsNeedConnect) {
    RongRTCLogger.warn('websocket disconnect');
    RongRTCLogger.warn('wsNeedConnect=' + wsNeedConnect);

    this.wsForcedClose = true;
    this.wsNeedConnect = wsNeedConnect;
    this.wsConnectionState = RongRTCConstant.wsConnectionState.DISCONNECTED;
    // 自定义关闭ws连接
    this.signaling.close(1000, 'wsForcedClose');
    // 网断后，执行close方法后不会立即触发onclose事件，所以需要手动重连
    if (this.wsNeedConnect) { // ws需要重连
        this.reconnect();
    }
};
/**
 * reconnect
 *
 */
RongRTCEngine.prototype.reconnect = function () {
    if (this.wsConnectionState != RongRTCConstant.wsConnectionState.DISCONNECTED) { // ws连接可用或正在连接不重连
        return;
    }
    this.reconnectTimes++;
    RongRTCLogger.warn('reconnectTimes=' + this.reconnectTimes);
    if (this.reconnectTimes > RongRTCConstant.RECONNECT_MAXTIMES) {
        this.keepAliveDisconnect();
    } else {
        var rongRTCEngine = this;
        if (rongRTCEngine.reconnectTimes > 1) { // 连续重连的话间隔一定时间
            setTimeout(function () {
                reconnectFunc(rongRTCEngine);
            }, RongRTCConstant.RECONNECT_TIMEOUT);
        } else {
            reconnectFunc(rongRTCEngine);
        }

        function reconnectFunc(rongRTCEngine) {
            if (rongRTCEngine.wsConnectionState == RongRTCConstant.wsConnectionState.DISCONNECTED) { // ws连接不可用
                RongRTCLogger.info('websocket reconnect');
                rongRTCEngine.createSignaling();
                // 重新logonAndJoin
                rongRTCEngine.logonAndJoin(RongRTCConstant.LogonAndJoinStatus.RECONNECT);
            }
        }
    }
};
/** ----- websocket ----- */
/** ----- keepAlive ---- */
/**
 * keepAlive
 *
 */
RongRTCEngine.prototype.keepAlive = function () {
    if (this.wsConnectionState == RongRTCConstant.wsConnectionState.CONNECTED) { // ws连接可用
        // 开始计时
        this.startScheduleKeepAliveTimer();
        this.channelPing();
    } else {
        this.keepAliveFailed();
    }
}
/**
 * keepAlive失败
 *
 */
RongRTCEngine.prototype.keepAliveFailed = function () {
    this.keepAliveFailedTimes++;
    RongRTCLogger.warn("keepAliveFailedTimes=" + this.keepAliveFailedTimes);
    if (this.keepAliveFailedTimes > RongRTCConstant.KEEPALIVE_FAILEDTIMES_MAX) {
        this.keepAliveDisconnect();
    }
}
/**
 * 开始keepAlive
 *
 */
RongRTCEngine.prototype.startScheduleKeepAlive = function () {
    this.exitScheduleKeepAlive();
    this.exitScheduleKeepAliveTimer();

    var rongRTCEngine = this;
    rongRTCEngine.keepAlive(); // 立即执行1次
    rongRTCEngine.keepAliveInterval = setInterval(function () {
        rongRTCEngine.keepAlive();
    }, RongRTCConstant.KEEPALIVE_INTERVAL);
}
/**
 * 停止keepAlive
 *
 */
RongRTCEngine.prototype.exitScheduleKeepAlive = function () {
    this.keepAliveFailedTimes = 0;
    if (this.keepAliveInterval != null) {
        clearInterval(this.keepAliveInterval);
        this.keepAliveInterval = null;
    }
}
/**
 * keepAlive未收到result计时器方法
 *
 */
RongRTCEngine.prototype.keepAliveTimerFunc = function () {
    this.keepAliveTimerCount++;
    if (this.keepAliveTimerCount > RongRTCConstant.KEEPALIVE_TIMER_TIMEOUT_MAX / 3) {
        RongRTCLogger.warn("keepAliveTimerCount=" + this.keepAliveTimerCount);
    } else {
        RongRTCLogger.debug("keepAliveTimerCount=" + this.keepAliveTimerCount);
    }
    if (this.keepAliveTimerCount > RongRTCConstant.KEEPALIVE_TIMER_TIMEOUT_MAX) {
        this.keepAliveDisconnect();
        return;
    }
    if (this.keepAliveTimerCount == RongRTCConstant.KEEPALIVE_TIMER_TIMEOUT_RECONNECT) {
        // 断开本次连接，进行重连
        this.disconnect(true);
    }
}
/**
 * 开始keepAlive未收到result计时器
 *
 */
RongRTCEngine.prototype.startScheduleKeepAliveTimer = function () {
    if (this.keepAliveTimer == null) {
        var rongRTCEngine = this;
        // keepAlive5秒间隔，这个时候有可能已经断了5秒
        rongRTCEngine.keepAliveTimerCount += RongRTCConstant.KEEPALIVE_INTERVAL / 1000;
        rongRTCEngine.keepAliveTimer = setInterval(function () {
            rongRTCEngine.keepAliveTimerFunc();
        }, RongRTCConstant.KEEPALIVE_TIMER_INTERVAL);
    }
}
/**
 * 停止keepAlive未收到result计时器
 *
 */
RongRTCEngine.prototype.exitScheduleKeepAliveTimer = function () {
    this.keepAliveTimerCount = 0;
    if (this.keepAliveTimer != null) {
        clearInterval(this.keepAliveTimer);
        this.keepAliveTimer = null;
    }
}
/**
 * 与服务器断开
 *
 */
RongRTCEngine.prototype.keepAliveDisconnect = function () {
    this.clear();
    this.rongRTCEngineEventHandle.call('onConnectionStateChanged', {
        'connectionState': RongRTCConstant.ConnectionState.DISCONNECTED
    });
}
/** ----- keepAlive ---- */
/** ----- getStatsReport ---- */
/**
 * getStatsReport
 *
 */
RongRTCEngine.prototype.getStatsReport = function () {
    var pcClient = this.peerConnections[this.selfUserId];
    if (pcClient != null) {
        var pc = pcClient['pc'];
        var rongRTCEngine = this;
        pc.getStats(null, function (report) {
            rongRTCEngine.rongRTCConnectionStatsReport.parseStatsReport(report);
            if (rongRTCEngine.isSendLostReport) {
                RongRTCLogger.debug("onNetworkSentLost=" +
                    rongRTCEngine.rongRTCConnectionStatsReport.packetSendLossRate);
                // 上报丢包率信息，返回本地数据流的丢包率
                rongRTCEngine.rongRTCEngineEventHandle.call('onNetworkSentLost', {
                    packetSendLossRate: rongRTCEngine.rongRTCConnectionStatsReport.packetSendLossRate
                });
            }
        }, function (error) {
            RongRTCLogger.error("getStatsReport error: ", error);
        });
    }
}
/**
 * 开始getStatsReport
 *
 */
RongRTCEngine.prototype.startScheduleGetStatsReport = function () {
    this.exitScheduleGetStatsReport();

    this.rongRTCConnectionStatsReport = new RongRTCConnectionStatsReport();
    var rongRTCEngine = this;
    rongRTCEngine.getStatsReportInterval = setInterval(function () {
        rongRTCEngine.getStatsReport();
    }, RongRTCConstant.GETSTATSREPORT_INTERVAL);
}
/**
 * 停止getStatsReport
 *
 */
RongRTCEngine.prototype.exitScheduleGetStatsReport = function () {
    if (this.getStatsReportInterval != null) {
        clearInterval(this.getStatsReportInterval);
        this.getStatsReportInterval = null;
    }
    this.rongRTCConnectionStatsReport = null;
}
/** ----- getStatsReport ---- */
/** ----- screenShare ---- */
/**
 * 绑定插件监听事件
 *
 */
RongRTCEngine.prototype.addEventListener = function () {
    if (this.isBindEvent) { // 已经绑定过事件
        return;
    }
    var rongRTCEngine = this;
    window.addEventListener("message", function (msg) {
        var messageHandler = {
            onResponseReqSouId: function (msg) {
                rongRTCEngine.getLocalStreamFromRtcApi({video: false, audio: true}).then(function (stream) {
                    rongRTCEngine.localAudioStream = stream;
                    stream.getAudioTracks().forEach(function (track) {
                        track.enabled = rongRTCEngine.microphoneEnable;
                    });
                }).catch(function (error) {
                    RongRTCLogger.error("onResponseReqSouId getLocalStreamFromRtcApi error: " + error);
                    rongRTCEngine.rongRTCEngineEventHandle.call('onStartScreenShareComplete', {
                        'isSuccess': false
                    });
                });
                rongRTCEngine.getScreenStream(msg.data.sourceId).then(function (stream) {
                    stream.getVideoTracks()[0].onended = function () {
                        // 关闭屏幕共享
                        rongRTCEngine.endShareScreen();
                    };
                    // 进行屏幕共享
                    rongRTCEngine.screenShare(stream);
                }).catch(function (error) {
                    RongRTCLogger.error("onResponseReqSouId getScreenStream error: " + error);
                    rongRTCEngine.rongRTCEngineEventHandle.call('onStartScreenShareComplete', {
                        'isSuccess': false
                    });
                });
            },
            testMessage: function (msg) {
                rongRTCEngine.isScreenShareSupport = true;
            },
            other: function (msg) {
                RongRTCLogger.info(msg);
            }
        }
        var handle = messageHandler[msg.data.type] || messageHandler.other;
        handle(msg, rongRTCEngine);
    }, false);
    this.isBindEvent = true;
}
/**
 * 发起屏幕共享
 *
 */
RongRTCEngine.prototype.requestScreenShare = function () {
    window.postMessage('requestScreenSourceId', '*');
}
/**
 * 根据RtcApi获取本地视频
 *
 */
RongRTCEngine.prototype.getLocalStreamFromRtcApi = function (config) {
    return new Promise(function (resolve, reject) {
        navigator.getUserMedia(config, resolve, reject);
    })
}
/**
 * 获取本地桌面共享流
 *
 */
RongRTCEngine.prototype.getScreenStream = function (sourceId) {
    var constraints = {
        mandatory: {
            chromeMediaSource: 'desktop',
            maxWidth: RongRTCConstant.ShareProfile_default.width,
            maxHeight: RongRTCConstant.ShareProfile_default.height,
            chromeMediaSourceId: sourceId
        },
        optional: [
            {googTemporalLayeredScreencast: true}
        ]
    };
    sourceId = null;
    return new Promise(function (resolve, reject) {
        navigator.getUserMedia({video: constraints}, resolve, reject);
    })
}
/**
 * 进行屏幕共享
 *
 */
RongRTCEngine.prototype.screenShare = function (stream) {
    this.screenSharingStatus = true;
    this.screenOffer(stream);
    RongRTCUtil.setMediaStream(this.selfUserId, stream);
    this.rongRTCEngineEventHandle.call('onStartScreenShareComplete', {
        'isSuccess': true
    });
}
/**
 * 屏幕共享发offer
 *
 */
RongRTCEngine.prototype.screenOffer = function (stream) {
    var oldStream = this.localStream;
    this.localStream = stream;
    var pcClient = this.peerConnections[this.selfUserId];
    if (pcClient != null) { // 只有一人时，值为null
        var pc = pcClient['pc'];
        if (this.screenSharingStatus) {
            pc.addStream(this.localAudioStream);
            this.minStream && pc.removeStream(this.localStreamMin);
        } else {
            pc.removeStream(this.localAudioStream);
            this.minStream && pc.addStream(this.localStreamMin);
        }
        pc.removeStream(oldStream);
        pc.addStream(stream);
        RongRTCLogger.info("createOfferforShare");
        this.createOffer(pc, this.selfUserId, true);
    }
    oldStream.getTracks().forEach(function (track) {
        track.stop()
    });// 关闭
    if (!this.localVideoEnable) {
        this.closeLocalVideoWithUpdateTalkType(
            !this.localVideoEnable, false);
    }
}
/** ----- screenShare ---- */
/** ----- 请求信令 ----- */
// /**
// * 请求logon信令
// *
// */
// RongRTCEngine.prototype.logon = function() {
// this.sendMsg(RongRTCConstant.SignalType.LOGON, this.token, {
// 'version' : RongRTCConstant.LOGON_VERSION
// });
// }
// /**
// * 请求join信令
// *
// */
// RongRTCEngine.prototype.join = function() {
// this.sendMsg(RongRTCConstant.SignalType.JOIN, null, {
// 'key' : this.channelId,
// 'type' : this.userType
// });
// }
/**
 * 请求logonAndJoin信令
 *
 */
RongRTCEngine.prototype.logonAndJoin = function (status) {
    this.logonAndJoinStatus = (status == null || status == undefined ? 0 : status);
    this.offerStatus = null;
    this.sendMsg(RongRTCConstant.SignalType.LOGONANDJOIN, this.token, {
        'key': this.channelId,
        'type': this.userType,
        'index': this.localVideoEnable ? 1 : 0,
        'status': this.logonAndJoinStatus,
        'version': RongRTCConstant.LOGON_VERSION
        // , 'mediaid': this.selfUserId // 只在融云RCE环境下开启
    });
}
/**
 * 请求channelPing信令
 *
 */
RongRTCEngine.prototype.channelPing = function () {
    this.sendMsg(RongRTCConstant.SignalType.CHANNEL_PING, null, {
        'key': this.channelId
    });
}
/**@deprecated
 * 请求updateTalkType信令
 *
 */
RongRTCEngine.prototype.updateTalkType = function () {
    this.sendMsg(RongRTCConstant.SignalType.UPDATETALKTYPE, null, {
        'key': this.channelId,
        'index': this.localVideoEnable ? 1 : 0
    });
}
/**
 * 摄像头开关闭通知服务端
 */
RongRTCEngine.prototype.updateTalkTypeCamera = function (isClosed) {
    var isUpdateTalkType = true;
    if (this.userType == RongRTCConstant.UserType.OBSERVER) { // 观察者模式
        isUpdateTalkType = false;
    }
    this.closeLocalVideoWithUpdateTalkType(isClosed, isUpdateTalkType);
    this.sendMsg(RongRTCConstant.SignalType.TURNTALKTYPE, null, {
        'key': this.channelId,
        'index': this.localVideoEnable ? 1 : 2,
        type: 1
    });
}
/**
 * m麦克风开关闭通知服务端
 */
RongRTCEngine.prototype.updateTalkTypeMic = function (isMute) {
    this.localStream && this.localStream.getAudioTracks().forEach(function (track) {
        track.enabled = !isMute;
    })
    this.localAudioStream && this.localAudioStream.getAudioTracks().forEach(function (track) {
        track.enabled = !isMute;
    })

    RongRTCLogger.info("Microphone mute=" + isMute);
    this.microphoneEnable = !isMute;
    this.sendMsg(RongRTCConstant.SignalType.TURNTALKTYPE, null, {
        'key': this.channelId,
        'index': this.microphoneEnable ? 1 : 2,
        type: 2
    });
}
/**
 * 请求leave信令
 *
 */
RongRTCEngine.prototype.leave = function () {
    this.sendMsg(RongRTCConstant.SignalType.LEAVE, null, {
        'key': this.channelId
    });
}
/**
 * 请求offer信令
 *
 */
RongRTCEngine.prototype.offer = function (desc, from) {
    this.sendMsg(RongRTCConstant.SignalType.EXCHANGE, desc, {
        'key': this.channelId,
        'type': RongRTCConstant.ExchangeType.OFFER,
        'to': from
    });
}
/**
 * 请求answer信令
 *
 */
RongRTCEngine.prototype.answer = function (desc, from) {
    this.sendMsg(RongRTCConstant.SignalType.EXCHANGE, desc, {
        'key': this.channelId,
        'type': RongRTCConstant.ExchangeType.ANSWER,
        'to': from
    });
}
/**
 * 请求candidate信令
 *
 */
RongRTCEngine.prototype.candidate = function (candidate, userId) {
    this.sendMsg(RongRTCConstant.SignalType.EXCHANGE, candidate, {
        'key': this.channelId,
        'type': RongRTCConstant.ExchangeType.CANDIDATE,
        'to': userId
    });
}
/**
 * 请求白板信令
 *
 */
RongRTCEngine.prototype.ewb_create = function () {
    this.sendMsg(RongRTCConstant.SignalType.EWB_CREATE, null, {
        'key': this.channelId
    });
}
/**
 * 查询白板信令
 *
 */
RongRTCEngine.prototype.ewb_query = function () {
    this.sendMsg(RongRTCConstant.SignalType.EWB_QUERY, null, {
        'key': this.channelId
    });
}
/**
 * 本地视频切换 大小流变化通知
 * @param candidate
 * @param userId
 */
RongRTCEngine.prototype.flowSubscribe = function (msgBody) {
    this.sendMsg(RongRTCConstant.SignalType.FLOWSUBSCRIBE, msgBody, {
        'key': this.channelId
    });
}
// ========= 会控 begin
RongRTCEngine.prototype.changeMicPhone = function (isOpen, needSendMessage) {
    this.localStream.getAudioTracks().forEach(function (track) {
        track.enabled = isOpen;
    })
};
RongRTCEngine.prototype.changeVideo = function (isOpen, needSendMessage) {
    this.localStream.getVideoTracks().forEach(function (track) {
        track.enabled = isOpen;
    })
};
/**
 * 处理channelAnswer通知信令
 *
 */
var channelHandler = {

    1: function (data) { // 邀请观察者发言同意后收到通知
        console.error(data)
        rongRTCengine.rongRTCEngineEventHandle.call("onBecomeUser", {
            userId: data.parameters.from,
            userType: 1
        });
    },
    2: function (data) {// 观察者主动要求发言 todo wenti
        console.error(data)
        var userId = data.parameters.serverData;
        var status = data.parameters.status;
        if (status == 1 && userId == rongRTCengine.selfUserId) {
            console.error("fffffffffffffffffffffffff")
            rongRTCengine.rongRTCMeeting.observerBecomeUser(userId);
        } else {
            rongRTCengine.rongRTCEngineEventHandle.call("onBecomeUser", {
                userId: userId
            });
        }
    },
    3: function (data) { //邀请打开设备
        rongRTCengine.rongRTCEngineEventHandle.call("onUserAgreeOpen", {
            userId: data.parameters.from,
            type: data.parameters.type,
            userType: 1,
            status: data.parameters.status
        });
    },
    4: function (data) { // 将与会人降级为观察者
        rongRTCengine.remoteStreams = rongRTCengine.remoteStreams.filter(function (stream) {
            return stream.id != data.parameters.from;
        })
        rongRTCengine.rongRTCEngineEventHandle.call("onUserDown", {
            userId: data.parameters.from,
            userType: 1
        });
    },
    5: function (data) { //邀请关闭设备
        rongRTCengine.rongRTCEngineEventHandle.call("onUserLeft5", {
            userId: data.to,
            userType: 1
        });
    },
    other: function (data) {
        console.warn("no handler to handle data", data);
    }
}

RongRTCEngine.prototype.closeStream = function (stream) {
    stream ? stream.getTracks().forEach(function (track) {
        track.stop();
    }) : console.error(" stream is not exist")
}
RongRTCEngine.prototype.getPeerConnection = function (userId) {
    var pcClient = this.peerConnections[userId];
    var pc = pcClient['pc'];
    if (!pc) {
        throw  new Error("userId => peerConnection is not exist", userId);
    }
    return pc;
}
var RongRTCMeeting = function () {

}
RongRTCMeeting.prototype.turntalktype = function (data) {
    var type = data.parameters.type;
    var index = data.parameters.index;
    var userId = data.parameters.serverData;
    var remoteStream = rongRTCengine.getRemoteStream(userId);
    if (index == 1 && type == 1) {
        remoteStream.getVideoTracks().forEach(function (track) {
            track.enabled = true;
        })

    }
    rongRTCengine.rongRTCEngineEventHandle.call("onTurnTalkType", {
        userId: data.parameters.serverData,
        type: type,
        open: index == 1 ? true : false
    });
}
RongRTCMeeting.prototype.channelAnswer = function (data) {
    var type = data.parameters['index'] || "other";
    ;
    var handler = channelHandler[type];
    handler(data);

};
var applyHandler = {

    1: function (data) { //收到观察者主动要求发言
        var requestUserId = data.parameters.from
        rongRTCengine.rongRTCEngineEventHandle.call("OnReciveRequestToUser", {
            userId: requestUserId
        });
    },
    2: function (data) { //获取主持人权限响应
        rongRTCengine.rongRTCEngineEventHandle.call("OnOtherUserBecomeHost", {
            hostId: data.parameters.from
        });
    },
    other: function (data) {
        console.warn("no handler to handle data", data);
    }
}
/**
 * 处理apply通知信令
 *
 */

RongRTCMeeting.prototype.applyMessage = function (data) {
    var type = data.parameters['index'];
    var to = data.parameters.to;
    var handler = applyHandler[type];
    handler(data);

};
/**
 * 处理roleChange通知信令
 *
 */

RongRTCMeeting.prototype.roleChange = function (data) {
    var type = data.parameters['index'];
    var to = data.parameters.to;
    if (type == RongRTCConstant.Meeting.RoleChange.DEMOTION) { // 将与会人降级为观察者
        this.noramlUserDoHostRequestDegradeNormalUserToObserver(to, true);
    }
    else if (type == RongRTCConstant.Meeting.RoleChange.INVITE) { // 邀请观察者发言
        rongRTCengine.rongRTCEngineEventHandle.call("onBeRequestToUser", {
            hostId: data.parameters.to
        });// 说明：被邀请观察者收到邀请通知

    }
    else if (type == RongRTCConstant.Meeting.RoleChange.REMOVE) { //移除与会人员
        if (to == rongRTCengine.selfUserId) {
            rongRTCengine.rongRTCEngineEventHandle.call("onHostRemoved", {
                userId: to
            });// 说明：当被操作用户被踢出房间时，被操作用户会收到此通知
        }
    }
};
/**
 函数名：ObserverRequestBecomeNormalUser
 参数：
 返回值：
 说明：观察者请求成为正常人员，只有用户为观察身份时，此接口才有效
 */
RongRTCMeeting.prototype.observerRequestBecomeNormalUser = function () {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.APPLY, null, {
        'key': rongRTCengine.channelId,
        'index': 0x01
    });
};
/**
 函数名：HostDoObserverRequestBecomeNormalUser
 参数：strUserId，请求者ID，enumEngineOperationType，主持人回复请求类型
 返回值：
 说明：当观察者请求发言，主持人通过该接口处理，接受，拒绝，或者忙碌
 */
RongRTCMeeting.prototype.hostDoObserverRequestBecomeNormalUser = function (userId, isAccept) {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.CHANNELANSWER, null, {
        'key': rongRTCengine.channelId,
        'to': userId,
        'index': 0x02,
        'status': isAccept
    });
}

/**
 * 函数名：HostRequestDegradeNormalUserToObserver
 * 参数：strUserId，被操作人员的用户ID
 * 返回值：
 * 说明：主持人请求将正常用户降级为观察者
 */
RongRTCMeeting.prototype.hostRequestNormalUserToObserver = function (userId) {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.ROLECHANGE, null, {
        'key': rongRTCengine.channelId,
        'to': userId,
        'index': 0x01
    });
}

/**
 函数名：NoramlUserDoHostRequestDegradeNormalUserToObserver
 参数：strHostId，主持人的用户ID，bAccept，接受请求还是拒绝
 返回值：
 说明：被请求降级的用户处理主持人的降级请求 //todo 观察者模式加入
 */
RongRTCMeeting.prototype.noramlUserDoHostRequestDegradeNormalUserToObserver = function (userId, bAccept) {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.CHANNELANSWER, null, {
        'key': rongRTCengine.channelId,
        'to': userId,
        'index': 0x04,
        'status': 0x01
    });
    rongRTCengine.closeStream(rongRTCengine.localStream);
    var pc = rongRTCengine.getPeerConnection(rongRTCengine.selfUserId);
    pc.removeStream(rongRTCengine.localStream);

    rongRTCengine.createOffer(pc, rongRTCengine.selfUserId, false);
    rongRTCengine.rongRTCEngineEventHandle.call("onUserDown", {
        userId: userId
    });

}
var deviceControl = {
    1: function (isOpen) { //摄像头
        rongRTCengine.changeVideo(isOpen);
    },
    2: function (isOpen) {//麦克风
        rongRTCengine.changeMicPhone(isOpen);
    }
}
/**
 函数名：UserDoHostRequestControlUserDevice
 参数：strHostId，主持人的用户ID，enumControlAction，操作类型，关闭或者打开，enumControlMediaType，操作的媒体类型，bAccept，是否同意打开音、视频或者音视频
 返回值：
 说明：用户通过该接口处理主持人打开或关闭音视频的开关进行请求或者观察者处理主持人邀请发言
 */
RongRTCMeeting.prototype.userDoHostRequestControlUserDevice = function (hostId, isOpen, type, accept) {
    var index = isOpen ? 0x03 : 0x05;
    var type = type;
    var handler = deviceControl[type];
    handler(isOpen);
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.CHANNELANSWER, null, {
        'key': rongRTCengine.channelId,
        'to': hostId,
        'index': index,
        'type': type,
        'status': accept
    });
};
/**
 函数名：HostRequestUpgradeObserverToNormalUser
 参数：strUserId，被操作观察者的用户ID
 返回值：
 说明：主持人请求观察者升级为正常用户
 */
RongRTCMeeting.prototype.hostUpUser = function (userId) {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.ROLECHANGE, null, {
        'key': rongRTCengine.channelId,
        'to': userId,
        'index': 0x02
    });
};
RongRTCMeeting.prototype.observerBecomeUser = function (userId) {
    var rongRTCEnv=rongRTCengine;
    rongRTCengine.getLocalStreamFromRtcApi(rongRTCengine.mediaConfig).then(function (stream) {
        rongRTCengine.localStream = stream;
        var peerConnection = rongRTCengine.getPeerConnection(rongRTCengine.selfUserId);
        peerConnection.addStream(stream);
        rongRTCengine.createOffer(peerConnection, rongRTCengine.selfUserId, false);
        RongRTCUtil.refreshMediaStream(rongRTCengine.selfUserId);
        rongRTCengine.rongRTCEngineEventHandle.call('onBecomeUser', {
            userId: rongRTCengine.selfUserId,
            stream: rongRTCengine.localStream
        });

        // talktype[0:无视频有音频, 1:有视频有音频, 2:有视频无音频, 3:无视频无音频]

        var talkType;
        if (!rongRTCEnv.localVideoEnable && rongRTCEnv.microphoneEnable)
            talkType = 0;
        else if (rongRTCEnv.localVideoEnable && rongRTCEnv.microphoneEnable)
            talkType =1;
        else  if(rongRTCEnv.localVideoEnable && !rongRTCEnv.microphoneEnable)
            talkType =2;
        else
            talkType=3;;
            rongRTCengine.localVideoEnable = true
        rongRTCengine.microphoneEnable = true;
        rongRTCengine.rongRTCEngineEventHandle.call('onaddstream', {
            userId: rongRTCengine.selfUserId,
            stream: rongRTCengine.localStream,
            userType: RongRTCConstant.UserType.NORMAL,
            talkType: 1,//升级后音视频默认都开
            isLocal: false

        });
    });
}
/**
 函数名：ObserverDoHostRequestUpgradeObserverToNormalUser
 参数：strUserId，主持人的用户ID，bAccept，是否同意升级为正常用户，打开音视频
 返回值：
 说明：观察者处理主持人邀请发言 或者死自己主动调用加入
 */
RongRTCMeeting.prototype.doHostRequestToUser = function (hostId, bAccept) {
    var status = bAccept == 1 ? 0x01 : bAccept == 2 ? 0x02 : 0x02;

    if (status == 0x01) {
        this.observerBecomeUser(this.selfUserId);
    }
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.CHANNELANSWER, null, {
        'key': rongRTCengine.channelId,
        'to': hostId,
        'index': 0x01,
        'status': status
    });
}
/**
 函数名：HostReomveUser
 参数：strUserId，被操作人员的用户ID
 返回值：
 说明：主持人将用户踢出房间
 */
RongRTCMeeting.prototype.hostRemoveUser = function (userId) {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.ROLECHANGE, null, {
        'key': rongRTCengine.channelId,
        'to': userId,
        'index': 0x03
    });
};
/**
 函数名：HostReomveUser
 参数：strUserId，被操作人员的用户ID
 返回值：
 说明：主持人将用户踢出房间
 */
RongRTCMeeting.prototype.screenShare = function (isopen) {
    var isopen = isopen == true ? 0x01 : 0x02;
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.SCREENSHARING, null, {
        'key': rongRTCengine.channelId,
        'index': isopen
    });
};
var manageActionHandler = {
    1: function (data) { //收到邀请打开
        rongRTCengine.rongRTCEngineEventHandle.call("OnHostRequestControlDevice", {
            userId: data.parameters.to,
            content: data.parameters
        });
    },
    2: function (data) { //收到邀请打开
        rongRTCengine.rongRTCEngineEventHandle.call("OnHostRequestControlDevice", {

            userId: data.parameters.to,
            content: data.parameters
        });
    },
    other: function (data) {
        console.warn("no handler to handle data", data);
    }
}
/**
 * 处理apply通知信令
 *
 */

RongRTCMeeting.prototype.manageAction = function (data) {
    var type = data.parameters['index'];
    var to = data.parameters.to;
    var handler = manageActionHandler[type];
    handler(data);

};
/**
 * 函数名：hostRequestControlUserDevice
 * 参数：userId，被操作人员的用户ID
 * 返回值：0x01：邀请打开
 0x02：邀请关闭
 type
 0x01：摄像头
 0x02：麦克风
 0x03：摄像头+麦克风
 * 说明：主持人通过该接口对与会人员音视频的开关进行管理
 */
RongRTCMeeting.prototype.hostRequestControlUserDevice = function (userId, type, closeOrOpen) {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.MANAGEACTION, null, {
        'key': rongRTCengine.channelId,
        'to': userId,
        'index': closeOrOpen,
        'type': type
    });
}
/**
 函数名：GetHostPower
 参数：
 返回值：
 说明：获取主持人权限
 */
RongRTCMeeting.prototype.getHostPower = function () {
    rongRTCengine.sendMsg(RongRTCConstant.SignalType.APPLY, null, {
        'key': rongRTCengine.channelId,
        'index': 0x02
    });
}
/**
 函数名：GetInviteUrl
 参数：
 返回值：
 说明：获取邀请链接 todo 未完成
 */
RongRTCMeeting.prototype.GetInviteUrl = function () {

};
// ========= 会控 end

//======屏幕共享 begin
/**
 * 当前浏览器
 */
RongRTCEngine.prototype.myBrowser = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }
    ; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    ; //判断是否IE浏览器

}
/**
 *rce electron 直接可以获取屏幕流 不安装插件
 */
RongRTCEngine.prototype.shareWithStream = function (videoStream) { //todo bug 加入前根据麦克风状态静音
    this.rongRTCMeeting.screenShare(true);
    rongRTCengine.getLocalStreamFromRtcApi({video: false, audio: true}).then(function (stream) {
        rongRTCengine.localAudioStream = stream;
        stream.getAudioTracks().forEach(function (track) {
            track.enabled = rongRTCengine.microphoneEnable;
        });
        videoStream.getVideoTracks()[0].onended = function () {
            rongRTCengine.endShareScreen();
        };
       rongRTCengine.screenSharingStatus = true;
        rongRTCengine.screenOffer(videoStream);
    }).catch(function (err) {
        RongRTCLogger.error(err);
    });

}


//======= end
/** ----- 请求信令 ----- */
/** ----- 处理应答信令 ----- */
/**
 * 处理join_result应答信令
 *
 */
RongRTCEngine.prototype.logonAndJoin_result = function (data) {
    var statusCode = data.parameters['statusCode'];
    var isJoined = statusCode == 'OK' ? true : false;
    if (isJoined) {
        var content = data.content; // 返回的结果是包含自己的
        var contentArr = content.split("],");
        var member = contentArr.length > 1 ? contentArr[1] : contentArr[0];
        var memberArr = eval(member);
        for (var i in memberArr) {
            var userId = memberArr[i].userId;
            if (!this.joinedUsers.contains(userId)) {
                var userType = memberArr[i].type;
                var talkType = memberArr[i].talktype;
                var joinedUser = new Array();
                joinedUser.push(userType);
                joinedUser.push(talkType);
                joinedUser.push(null);
                this.joinedUsers.put(userId, joinedUser);
                //if (userId != this.selfUserId) {
                //    this.rongRTCEngineEventHandle.call('onUserJoined', { // 观
                //        userId: userId,
                //        userType: userType,
                //        talkType: talkType
                //    });
                //}

            }

        }
        // 开始keepAlive
        this.startScheduleKeepAlive();
        if (this.logonAndJoinStatus == RongRTCConstant.LogonAndJoinStatus.RECONNECT) { // 断线重连，主动发offer
            var pcClient = this.peerConnections[this.selfUserId];
            if (pcClient != null) { // 只有一人时，值为null
                var pc = pcClient['pc'];
                RongRTCLogger.warn("reLogonAndJoin createOffer");
                this.createOffer(pc, this.selfUserId, true);
            }
        }
    }
    var joinedUser = this.joinedUsers.get(this.selfUserId);
    var talkType = 1;
    if (this.logonAndJoinStatus == RongRTCConstant.LogonAndJoinStatus.CONNECT // 正常加入
        || (this.logonAndJoinStatus == RongRTCConstant.LogonAndJoinStatus.RECONNECT && !isJoined ) // 重连加入且加入失败
        || !this.onJoinComplete
    ) {
        this.rongRTCEngineEventHandle.call('onJoinComplete', {
            'isJoined': isJoined,
            'userId': this.selfUserId,
            talkType:talkType
        });
        this.onJoinComplete = true;
    }
}
/**
 * 处理channelPing_result应答信令
 *
 */
RongRTCEngine.prototype.channelPing_result = function (data) {
    // 收到result，停止计时
    this.exitScheduleKeepAliveTimer();

    var statusCode = data.parameters['statusCode'];
    var isOK = statusCode == 'OK' ? true : false;
    if (!isOK) {
        this.keepAliveFailed();
    } else {
        // 重置keepAliveFailedTimes
        this.keepAliveFailedTimes = 0;
    }
}
/**
 * 处理leave_result应答信令
 *
 */
RongRTCEngine.prototype.leave_result = function (data) {
    var statusCode = data.parameters['statusCode'];
    var isLeft = statusCode == 'OK' ? true : false;
    if (isLeft) {
        this.clear();
    }
    this.rongRTCEngineEventHandle.call('onLeaveComplete', {
        'isLeft': isLeft
    });
}
/**
 * 处理ewb_create_result应答信令
 *
 */
RongRTCEngine.prototype.ewb_create_result = function (data) {
    var statusCode = data.parameters['statusCode'];
    var isSuccess = statusCode == 'OK' ? true : false;
    var url = '';
    if (isSuccess) {
        url = data.content;
    }
    this.rongRTCEngineEventHandle.call('onWhiteBoardURL', {
        'isSuccess': isSuccess,
        'url': url // 观察者模式url返回为空
    });
}
/**
 * 处理ewb_query_result应答信令
 *
 */
RongRTCEngine.prototype.ewb_query_result = function (data) {
    var statusCode = data.parameters['statusCode'];
    var isSuccess = statusCode == 'OK' ? true : false;
    var url = '';
    if (isSuccess) {
        url = data.content;
        url ? this.ewbCreated = true : void 0;
    }
    this.rongRTCEngineEventHandle.call('onWhiteBoardQuery', {
        'isSuccess': isSuccess,
        'url': url // 当前会议没有白板url返回为空
    });
}
/** ----- 处理应答信令 ----- */
/** ----- 处理通知信令 ----- */
/**
 * 处理joined通知信令
 *
 */
RongRTCEngine.prototype.joined = function (data) {
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
    //if (userType == RongRTCConstant.UserType.OBSERVER) {
    this.rongRTCEngineEventHandle.call('onUserJoined', { // 观察者模式
        userId: userId,
        userType: userType,
        talkType: talkType
    });
    //}
}
/** @deprecated
 * 处理update_talktype通知信令
 *
 */
RongRTCEngine.prototype.update_talktype = function (data) {
    var userId = data.parameters['serverData'];
    var userType = data.parameters['type'];
    var talkType = data.parameters['index'];
    this.rongRTCEngineEventHandle.call('onUserUpdatedTalkType', {
        userId: userId,
        userType: userType,
        talkType: talkType
    });
};
/**
 * 请求本地设备开关
 *
 */
RongRTCEngine.prototype.turnTalkType = function (serverData, index, type) {
    this.sendMsg(RongRTCConstant.SignalType.TURNTALKTYPE, null, {
        'key': this.channelId,
        'serverdata': serverData,
        'index': index,
        'type': type

    });
}
/**
 * 处理left通知信令
 *
 */
RongRTCEngine.prototype.left = function (data) {
    var userId = data.parameters['serverData'];
    var userType = data.parameters['type'];
    this.joinedUsers.remove(userId);
    this.remoteCnameMap.remove(userId);
    this.remoteSdpMap.remove(userId);
    this.remoteStreams = this.remoteStreams.filter(function (stream) {
        return stream.id != userId;
    })
    if (this.joinedUsers.size() == 1) { // 当没有其它用户在会议时
        // 重置offerStatus状态
        this.offerStatus = null;
        // 关闭连接
        this.closePeerConnection(this.selfUserId);
    }
    this.rongRTCEngineEventHandle.call('onUserLeft', {
        userId: userId,
        userType: userType
    });
}
/**
 * 建立连接
 *
 */
RongRTCEngine.prototype.preparePeerConnection = function (userId) {
    RongRTCLogger.info("preparePeerConnection userId=" + userId);
    var rongRTCEngine = this;
    if (rongRTCEngine.peerConnections[userId] == null) {
        var pc = new RTCPeerConnection();
        var pcMin = new RTCPeerConnection();
        pc.onaddstream = function (evt) {
            RongRTCLogger.debug("onaddstream", evt);

            rongRTCEngine.remoteStreams.push(evt.stream);
            var joinedUser = rongRTCEngine.joinedUsers.get(evt.stream.id);
            joinedUser.splice(2, 1, evt.stream);
            var talkType = joinedUser[1];
            console.log("talkType", talkType);
            if (talkType == 0 || talkType == 3) {
                console.log("remove Video track", talkType);
                evt.stream.getVideoTracks().forEach(function (track) {
                    track.enabled = false;
                })
            }
            rongRTCEngine.rongRTCEngineEventHandle.call('onaddstream', { //
                userId: evt.stream.id,
                userType: RongRTCConstant.UserType.NORMAL,
                talkType: talkType,
                stream: evt.stream,
                isLocal: false

            });
        };

        pc.onremovestream = function (evt) {
            RongRTCLogger.debug("onremovestream", evt);
        };

        pc.ontrack = null;

        pc.onsignalingstatechange = function (evt) {
            RongRTCLogger.debug("onsignalingstatechange", evt);
        };

        pc.oniceconnectionstatechange = function (evt) {
            RongRTCLogger.debug("oniceconnectionstatechange", evt);
            RongRTCLogger.warn("pc.iceConnectionState=" + pc.iceConnectionState);

            if (pc.iceConnectionState == 'failed') {
                if (rongRTCEngine.wsConnectionState == RongRTCConstant.wsConnectionState.CONNECTED) { // ws连接可用
                    RongRTCLogger.warn("oniceconnectionstatechange createOffer");
                    rongRTCEngine.createOffer(pc, userId, true);
                }
            }
        };

        pc.onnegotiationneeded = null;
        pc.ondatachannel = null;

        pc.onicecandidate = function (evt) {
            RongRTCLogger.debug("onicecandidate", evt);

            handle(pc, evt);

            function handle(pc, evt) {
                if ((pc.signalingState || pc.readyState) == 'stable'
                    && rongRTCEngine.peerConnections[userId]['rem'] == true) {
                    if (evt.candidate) {
                        rongRTCEngine.candidate(JSON.stringify(evt.candidate),
                            userId);
                    }
                    return;
                }
                setTimeout(function () {
                    handle(pc, evt);
                }, 2 * 1000);
            }
        };
        rongRTCEngine.peerConnections[userId] = {}
        rongRTCEngine.peerConnections[userId]['pc'] = pc;
        rongRTCEngine.peerConnections[userId]['pcMin'] = pcMin;
        rongRTCEngine.peerConnections[userId]['rem'] = false;

        // peerConnection创建成功，开始getStatsReport
        rongRTCEngine.startScheduleGetStatsReport();
    }
    return rongRTCEngine.peerConnections[userId];
};
/**
 * 关闭连接
 *
 */
RongRTCEngine.prototype.closePeerConnection = function (userId) {
    if (this.peerConnections[userId] != null) {
        this.peerConnections[userId]['pc'].close();
        this.peerConnections[userId] = null;
    }
    // 重置带宽设置计数器
    RongRTCGlobal.bandWidthCount = 0;
    // peerConnection关闭，停止getStatsReport
    this.exitScheduleGetStatsReport();
}
/**
 * 处理OfferRequest通知信令
 *
 */
RongRTCEngine.prototype.offerRequest = function (data) {
    var from = data.parameters['serverData'];

    var pcClient = this.preparePeerConnection(from);
    var pc = pcClient['pc'];
    if (this.userType == RongRTCConstant.UserType.NORMAL) {
        pc.addStream(this.localStream);
        rongRTCengine.screenSharingStatus && pc.addStream(this.localAudioStream);//未有人加入时开启共享

    }
    if (data.parameters.type && data.parameters.type == '2' && this.userType == RongRTCConstant.UserType.NORMAL) {
       /* pc.addStream(rongRTCEngine.localStreamMin);
        this.minStream = true;*/
    }
    RongRTCLogger.warn("offerRequest createOffer");
    this.createOffer(pc, from, false);
};
/**
 * 处理exchange通知信令
 *
 */
RongRTCEngine.prototype.exchange = function (data) {
    var type = data.parameters['type'];
    if (type == RongRTCConstant.ExchangeType.OFFER) {
        this.handleOffer(data);
    } else if (type == RongRTCConstant.ExchangeType.ANSWER) {
        this.handleAnswer(data);
    } else if (type == RongRTCConstant.ExchangeType.CANDIDATE) {
        this.handleCandidate(data);
    }
};
/**
 * 处理白板创建通知信令
 *
 */
RongRTCEngine.prototype.ewbCreateNotify = function (data) {
    this.ewbCreated = true;
};
/**
 * handle offer
 *
 */
RongRTCEngine.prototype.handleOffer = function (data) {
    if (this.offerStatus == RongRTCConstant.OfferStatus.SENDING) {
        RongRTCLogger.warn("handleOffer offerStatus sending");
        return;
    }

    var from = data.parameters['from'];
    var desc = JSON.parse(data.content.replace(new RegExp('\'', 'g'), '"'));
    // set bandwidth
    desc.sdp = RongRTCUtil.setBandWidth(desc.sdp, this.getBandWidth());

    var pcClient = this.preparePeerConnection(from);
    var pc = pcClient['pc'];
    if (this.userType == RongRTCConstant.UserType.NORMAL) {
        pc.addStream(this.localStream);
    }
    var rongRTCEngine = this;
    pc.setRemoteDescription(new RTCSessionDescription(desc), function () {
        RongRTCLogger.info("handleOffer setRemoteDescription success");
        rongRTCEngine.offerStatus = RongRTCConstant.OfferStatus.DONE;
        // set remote cname map
        rongRTCEngine.setRemoteCnameMap(desc.sdp);
        pcClient['rem'] = true;
        pc.createAnswer(function (desc2) {
            RongRTCLogger.info("createAnswer success");
            pc.setLocalDescription(desc2, function () {
                RongRTCLogger.info("createAnswer setLocalDescription success");
                rongRTCEngine.answer(JSON.stringify(desc2), from);
            }, function (error) {
                RongRTCLogger.error("createAnswer setLocalDescription error: ", error);
            });
        }, function (error) {
            RongRTCLogger.error("createAnswer error: ", error);
        }, rongRTCEngine.getSdpMediaConstraints(false));
    }, function (error) {
        RongRTCLogger.error("handleOffer setRemoteDescription error: ", error);
    });
};
/**
 * handle answer
 *
 */
RongRTCEngine.prototype.handleAnswer = function (data) {
    if (this.offerStatus == RongRTCConstant.OfferStatus.DONE) { // 已经设置过一次SDP，放弃本次设置
        RongRTCLogger.warn("handleAnswer offerStatus done");
        return;
    }

    var from = data.parameters['from'];
    var desc = JSON.parse(data.content.replace(new RegExp('\'', 'g'), '"'));
    var pcClient = this.preparePeerConnection(from);
    var pc;
    // if (desc.type=="tinyStreamAnswer") {
    //     desc.type = "answer";
    //     pc = pcClient['pcMin'];
    // }else {
    pc = pcClient['pc'];
    // }
    // set bandwidth
    desc.sdp = RongRTCUtil.setBandWidth(desc.sdp, this.getBandWidth());


    var rongRTCEngine = this;
    pc.setRemoteDescription(new RTCSessionDescription(desc), function () {
        RongRTCLogger.info("handleAnswer setRemoteDescription success");
        rongRTCEngine.offerStatus = RongRTCConstant.OfferStatus.DONE;
        // set remote cname map
        rongRTCEngine.setRemoteCnameMap(desc.sdp);
        pcClient['rem'] = true;
    }, function (error) {
        RongRTCLogger.error("handleAnswer setRemoteDescription error: ", error);
    });
};
/**
 * handle candidate
 *
 */
RongRTCEngine.prototype.handleCandidate = function (data) {
    var from = data.parameters['from'];
    var desc = JSON.parse(data.content.replace(new RegExp('\'', 'g'), '"'))

    var pcClient = this.preparePeerConnection(from);
    var pc = pcClient['pc'];
    pc.addIceCandidate(new RTCIceCandidate(desc), function () {
        RongRTCLogger.info("addIceCandidate success");
    }, function (error) {
        RongRTCLogger.error("addIceCandidate error: ", error);
    });
}
/**
 * create offer
 *
 */
RongRTCEngine.prototype.createOffer = function (pc, userId, isIceRestart) {
    if (this.offerStatus == RongRTCConstant.OfferStatus.SENDING) { // 已经创建过Offer，本次不创建
        RongRTCLogger.warn("createOffer offerStatus sending");
        return;
    }
    RongRTCLogger.info("createOffer userId=" + userId);
    var rongRTCEngine = this;
    pc.createOffer(function (desc) {
        RongRTCLogger.info("createOffer success");
        // change streamId use userId
        desc.sdp = RongRTCUtil.changeStreamId(desc.sdp,
            rongRTCEngine.localStream.id, rongRTCEngine.selfUserId);
        if (rongRTCEngine.minStream && !rongRTCEngine.screenSharingStatus) {
            desc.sdp = RongRTCUtil.changeStreamId(desc.sdp,
                rongRTCEngine.localStreamMin.id, rongRTCEngine.selfUserId + '_tiny');
        }
        // change streamId use userId
        if (rongRTCEngine.screenSharingStatus  && rongRTCengine.localAudioStream) {
            desc.sdp = RongRTCUtil.changeStreamId(desc.sdp,
                rongRTCEngine.localAudioStream.id, rongRTCEngine.selfUserId);
        }

        // 替换video参数
        desc.sdp = RongRTCUtil.changeVideoDesc(desc.sdp);
        pc.setLocalDescription(desc, function () {
            RongRTCLogger.info("createOffer setLocalDescription success");
            rongRTCEngine.offerStatus = RongRTCConstant.OfferStatus.SENDING;
            rongRTCEngine.offer(JSON.stringify(desc), userId);
        }, function (error) {
            RongRTCLogger.error("createOffer setLocalDescription error: ", error);
        });
    }, function (error) {
        RongRTCLogger.error("createOffer error: ", error);
    }, rongRTCEngine.getSdpMediaConstraints(isIceRestart));


    /*    var pcMin=rongRTCEngine.peerConnections[userId]['pcMin']
        pcMin.addStream(rongRTCEngine.localStreamMin);
        pcMin.createOffer(function (desc) {
            RongRTCLogger.info("createOfferMin success");
            // change streamId use userId
            desc.sdp = RongRTCUtil.changeStreamId(desc.sdp,
                rongRTCEngine.localStreamMin.id, rongRTCEngine.selfUserId+"_tiny");
            // 替换video参数
            desc.sdp = RongRTCUtil.changeVideoDesc(desc.sdp);
            pcMin.setLocalDescription(desc, function() {
                RongRTCLogger.info("createpcMinOffer setLocalDescription success");
                rongRTCEngine.offerStatus = RongRTCConstant.OfferStatus.SENDING;
                rongRTCEngine.offer(JSON.stringify(desc).replace(/offer/, "tinyStreamOffer"), userId);
            }, function(error) {
                RongRTCLogger.error("createpcMinOffer setLocalDescription error: ", error);
            });

        }, function(error) {
            RongRTCLogger.error("createOfferMin  error: ", error);
        })*/
}
/**
 * 设置sdp属性
 *
 */
RongRTCEngine.prototype.getSdpMediaConstraints = function (isIceRestart) {
//	if (this.userType == RongRTCConstant.UserType.OBSERVER) { // 观察者模式
//		if (this.mediaConfig.sdpConstraints == null) {
//			this.mediaConfig.sdpConstraints = {};
//		}
//		if (this.mediaConfig.sdpConstraints.mandatory == null) {
//			this.mediaConfig.sdpConstraints.mandatory = {};
//		}
//		this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveAudio = true;
//		this.mediaConfig.sdpConstraints.mandatory.OfferToReceiveVideo = true;
//	}

    var sdpMediaConstraints = {};
    sdpMediaConstraints.mandatory = {};
    // 统一设置，包含观察者模式和普通模式无摄像头情况
    sdpMediaConstraints.mandatory.OfferToReceiveAudio = true;
    sdpMediaConstraints.mandatory.OfferToReceiveVideo = true;
    // IceRestart
    RongRTCLogger.warn("isIceRestart=" + isIceRestart);
    sdpMediaConstraints.mandatory.IceRestart = isIceRestart;
    return sdpMediaConstraints;
}
/**
 * 设置remote cname map
 *
 */
RongRTCEngine.prototype.setRemoteCnameMap = function (sdp) {
    var userArr = this.joinedUsers.getEntrys();
    for (var i in userArr) {
        var userId = userArr[i].key;
        if (userId == this.selfUserId) { // 不是远端
            continue;
        }
        if (!this.remoteCnameMap.contains(userId)) {
            var cname = RongRTCUtil.getCname(sdp, userId);
            if (cname != null && cname != "") {
                this.remoteCnameMap.put(userId, cname);
                this.remoteSdpMap.put(userId, sdp);
            }
        } else {
            var cname = this.remoteCnameMap.get(userId);
            if (cname != null && cname != ""
                && !RongRTCUtil.isHasCname(sdp, cname)) {
                var newCname = RongRTCUtil.getCname(sdp, userId);
                if (newCname != null && newCname != "") {
                    this.remoteCnameMap.put(userId, newCname);
                    RongRTCUtil.refreshMediaStream(userId);// 屏幕共享cname不变
                    // userId不变，cname变化，视为客户端杀进程后重连，刷新远端视频流
                }
            } else if (cname != null && cname != ""
                && RongRTCUtil.isHasCname(sdp, cname)) {
                var newCname = RongRTCUtil.getCname(sdp, userId);
                if (cname == newCname) {
                    var oldSdp = this.remoteSdpMap.get(userId);
                    var ts = RongRTCUtil.getSsrc(oldSdp, userId, cname);
                    var newTs = RongRTCUtil.getSsrc(sdp, userId, cname);
                    if (ts != newTs)
                        RongRTCUtil.refreshMediaStream(userId)

                }
            }

        }
    }
}
/**
 * 获取带宽
 * 
 */
RongRTCEngine.prototype.getBandWidth = function () {
	if (this.screenSharingStatus) { // 正在屏幕共享
		return RongRTCConstant.BandWidth_ScreenShare_1280_720;
	}
	return this.bandWidth;
}
/** ----- 处理通知信令 ----- */
//
// return RongRTCEngine;
// });
/** ----- RongRTCEngine ----- */

/** ----- RongRTCEngineEventHandle ----- */
// var RongRTCEngineEventHandle = (function() {
/**
 * 构造函数
 *
 */
var RongRTCEngineEventHandle = function (config) {
    /** 事件集合 */
    this.eventHandles = {};
    return this;
}
/**
 * 绑定事件
 *
 */
RongRTCEngineEventHandle.prototype.on = function (eventName, event) {
    this.eventHandles[eventName] = event;
};
/**
 * 调用事件
 *
 */
RongRTCEngineEventHandle.prototype.call = function (eventName, data) {
    for (var eventHandle in this.eventHandles) {
        if (eventName === eventHandle) {
            return this.eventHandles[eventName](data);
        }
    }
    RongRTCLogger.info('EventHandle ' + eventName + ' do not have defined function');
};
//
// return RongRTCEngineEventHandle;
// });
/** ----- RongRTCEngineEventHandle ----- */

/** ----- RongRTCConnectionStatsReport ----- */
var RongRTCConnectionStatsReport = function () {
    this.statsReportSend = {};
    this.statsReportRecvs = new Array();
    this.packetSendLossRate = 0;
}
/**
 * parse statsReport
 *
 */
RongRTCConnectionStatsReport.prototype.parseStatsReport = function (report) {
    var packetsSent = this.statsReportSend.packetsSent;
    packetsSent = (packetsSent == null || packetsSent == "") ? 0 : packetsSent;
    var packetsLost = this.statsReportSend.packetsLost;
    packetsLost = (packetsLost == null || packetsLost == "") ? 0 : packetsLost;
    var packetSendLossRate = 0;

    var statsReportSend = {};
    var statsReportRecvs = new Array();
    for (var i in report) {
        var now = report[i];
        if (now.type == 'ssrc' && now.mediaType == 'video') {
            if (now.id.indexOf("recv") != -1) {
                var statsReportRecv = {};
                statsReportRecv.googTrackId = now.googTrackId;
                statsReportRecv.googCodecName = now.googCodecName
                statsReportRecv.googCurrentDelayMs = now.googCurrentDelayMs;
                statsReportRecv.googDecodeMs = now.googDecodeMs;
                statsReportRecv.googFrameHeightReceived = now.googFrameHeightReceived;
                statsReportRecv.googFrameRateDecoded = now.googFrameRateDecoded;
                statsReportRecv.googFrameRateOutput = now.googFrameRateOutput;
                statsReportRecv.googFrameRateReceived = now.googFrameRateReceived;
                statsReportRecv.googFrameWidthReceived = now.googFrameWidthReceived;
                statsReportRecv.packetsLost = now.packetsLost;
                statsReportRecv.packetsReceived = now.packetsReceived;

                statsReportRecvs.push(statsReportRecv);
            } else if (now.id.indexOf("send") != -1) {
                statsReportSend.googCodecName = now.googCodecName;
                statsReportSend.googAvgEncodeMs = now.googAvgEncodeMs;
                statsReportSend.googFrameHeightInput = now.googFrameHeightInput;
                statsReportSend.googFrameHeightSent = now.googFrameHeightSent;
                statsReportSend.googFrameRateSent = now.googFrameRateSent;
                statsReportSend.googFrameWidthInput = now.googFrameWidthInput;
                statsReportSend.googFrameWidthSent = now.googFrameWidthSent;
                statsReportSend.googFrameRateInput = now.googFrameRateInput;
                statsReportSend.packetsLost = now.packetsLost;
                statsReportSend.packetsSent = now.packetsSent;

                if (statsReportSend.packetsLost != null
                    && statsReportSend.packetsLost != ""
                    && statsReportSend.packetsSent != null
                    && statsReportSend.packetsSent != ""
                    && (statsReportSend.packetsSent - packetsSent != 0)) {
                    packetSendLossRate = (statsReportSend.packetsLost - packetsLost)
                        * 100 / (statsReportSend.packetsSent - packetsSent);
                }
            }
        }
    }
    // 重置
    this.statsReportSend = null;
    this.statsReportRecvs = null;
    this.packetSendLossRate = 0;
    this.statsReportSend = statsReportSend;
    this.statsReportRecvs = statsReportRecvs;
    RongRTCLogger.debug("packetSendLossRate=" + packetSendLossRate);
    this.packetSendLossRate = parseInt(packetSendLossRate);
    RongRTCLogger.debug("this.packetSendLossRate=" + this.packetSendLossRate);
}
/** ----- RongRTCConnectionStatsReport ----- */

/** ----- RongRTCVideoView ----- */
var RongRTCVideoView = function () {

}

/** ----- RongRTCUtil ---- */
var RongRTCUtil = {
    /**
     * 获取websocket地址列表
     *
     */
    getWsUrlList: function (wsNavUrl, callback) {
        var wsUrlList;
        RongRTCAjax({
            type: "GET",
            url: wsNavUrl,
            async: true,
            data: {
                rand: Math.random()
            },
            dataType: "JSON",
            success: function (data) {
                callback(data);
            },
            error: function (error) {
                RongRTCLogger.error("request nav error: ", error);
                throw error;
            }
        });
    },
    /**
     * SDP设置带宽
     *
     * @param sdp
     * @param bandWidthParam
     * @returns
     */
    setBandWidth: function (sdp, bandWidthParam) {
    	var currentBandWidth = JSON.parse(JSON.stringify(bandWidthParam));
    	var startBandWidth;
    	if (RongRTCGlobal.bandWidthCount == 0) {
    		startBandWidth = (currentBandWidth.min + currentBandWidth.max) / 2;
    	}
        // 给带宽设置增加计数器，使每次设置的最小码率不同，防止码率一样WebRTC将码率重置成默认最小值
        RongRTCGlobal.bandWidthCount++;
        if (RongRTCGlobal.bandWidthCount % 2 == 0) {
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
        var findIndex1 = RongRTCUtil.findLine(sdpArr, findStr1);
        if (findIndex1 == null) {
            return sdp;
        }

        var sep2 = " ";

        var videoDescArr1 = sdpArr[findIndex1].split(sep2);
        // m=video 9 UDP/TLS/RTP/SAVPF
        var firstVideoCode = videoDescArr1[3];
        var findStr2 = "a=rtpmap:" + firstVideoCode;
        // 查找findStr2
        var findIndex2 = RongRTCUtil.findLine(sdpArr, findStr2);
        if (findIndex2 == null) {
            return sdp;
        }

        var appendStr = 'a=fmtp:' + firstVideoCode + ' x-google-min-bitrate=' + currentBandWidth.min
        	+ '; x-google-max-bitrate=' + currentBandWidth.max;
        if (startBandWidth != null) {
        	appendStr += '; x-google-start-bitrate=' + startBandWidth;
        }
        sdpArr[findIndex2] = sdpArr[findIndex2].concat(sep1 + appendStr);

        return sdpArr.join(sep1);
    },
    /**
     * SDP修改stream id
     *
     * @param sdp
     * @param oldId
     * @param newId
     * @returns
     */
    changeStreamId: function (sdp, oldId, newId) {
        sdp = sdp.replace(new RegExp(oldId, 'g'), newId);
        return sdp;
    },
    /**
     * SDP修改video兼容参数
     *
     * @param sdp
     * @returns
     */
    changeVideoDesc: function (sdp) {
//		var videoDesc1 = "m=video 9 RTP/AVPF 98 96 100 127 125 97 99 101";
//		var videoDesc2 = "a=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtpmap:98 H264/90000\r\na=rtcp-fb:98 ccm fir\r\na=rtcp-fb:98 nack\r\na=rtcp-fb:98 nack pli\r\na=rtcp-fb:98 goog-remb\r\na=rtcp-fb:98 transport-cc\r\na=fmtp:98 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\na=rtpmap:100 red/90000\r\na=rtpmap:127 ulpfec/90000\r\na=rtpmap:125 flexfec-03/90000\r\na=rtcp-fb:125 transport-cc\r\na=rtcp-fb:125 goog-remb\r\na=fmtp:125 repair-window=10000000\r\na=rtpmap:97 rtx/90000\r\na=fmtp:97 apt=96\r\na=rtpmap:99 rtx/90000\r\na=fmtp:99 apt=98\r\na=rtpmap:101 rtx/90000\r\na=fmtp:101 apt=100";
//
//		var findStr1 = "m=video";
//		var findStr2 = "a=rtcp-rsize";
//		var findStr3 = "a=ssrc-group";
//
//		var sdpArr = sdp.split('\r\n');
//		// 查找videoDesc1
//		var findIndex1 = RongRTCUtil.findLine(sdpArr, findStr1);
//		// 替换videoDesc1
//		sdpArr[findIndex1] = videoDesc1;
//		// 查找videoDesc2
//		var findIndex2 = RongRTCUtil.findLine(sdpArr, findStr2);
//		var findIndex3 = RongRTCUtil.findLine(sdpArr, findStr3);
//		// 删除中间的元素
//		sdpArr.splice(findIndex2 + 1, findIndex3 - findIndex2 - 1);
//		// 替换videoDesc2
//		sdpArr[findIndex2] = sdpArr[findIndex2].concat('\r\n' + videoDesc2);
//		return sdpArr.join('\r\n');

        var sep1 = "\r\n";
        var findStr1 = "m=video";

        var sdpArr = sdp.split(sep1);
        // 查找videoDesc1
        var findIndex1 = RongRTCUtil.findLine(sdpArr, findStr1);
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
        var findIndex2 = RongRTCUtil.findLineInRange(sdpArr, findStr2, findIndex1 + 1, sdpArr.length - 1);
        var findIndex3 = RongRTCUtil.findLineInRange(sdpArr, findStr3, findIndex2 + 1, sdpArr.length - 1);
        if (findIndex3 == null) { // 观察者模式没有findStr3相关信息
            findIndex3 = sdpArr.length - 1;
        }
        // 删除中间的元素
        var removeArr = sdpArr.splice(findIndex2, findIndex3 - findIndex2);

        // 查找H264
        var h264_index = RongRTCUtil.findLine(removeArr, h264_search);
        // 查找VP8
        var vp8_index = RongRTCUtil.findLine(removeArr, vp8_search);
        // 查找red
        var red_index = RongRTCUtil.findLine(removeArr, red_search);
        // 查找ulpfec
        var ulpfec_index = RongRTCUtil.findLine(removeArr, ulpfec_search);
        // 查找flexfec
        var flexfec_index = RongRTCUtil.findLine(removeArr, flexfec_search);

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
    },
    /**
     * get cname
     *
     * @param userId
     */
    getCname: function (sdp, userId) {
        var sep1 = "\n";
        var sep2 = " ";
        var sdpArr = sdp.split(sep1);

        // a=ssrc:702269835 msid:A9532881-B4CA-4B23-B219-9837CE93AA70 4716df1f-046f-4b96-a260-2593048d7e9e
        var msid_search = "msid:" + userId;
        var msid_index = RongRTCUtil.findLine(sdpArr, msid_search);
        if (msid_index == null) {
            return null;
        }
        var ssrc = sdpArr[msid_index].split(sep2)[0];

        // a=ssrc:702269835 cname:wRow2WLrs18ZB3Dg
        var cname_search = ssrc + " cname:";
        var cname_index = RongRTCUtil.findLine(sdpArr, cname_search);
        var cname = sdpArr[cname_index].split("cname:")[1];
        return cname;
    },
    /**
     * check cname
     *
     * @param userId
     */
    isHasCname: function (sdp, cname) {
        var sep1 = "\n";
        var sdpArr = sdp.split(sep1);

        // a=ssrc:702269835 cname:wRow2WLrs18ZB3Dg
        var cname_search = "cname:" + cname;
        var cname_index = RongRTCUtil.findLine(sdpArr, cname_search);
        return cname_index != null;
    },
    getSsrc: function (sdp, userId, cname) {
        //ssrc变化则为屏幕共享

        var sdpArr = sdp.split('\n');
        var videoLine = sdpArr.map(function (line, index) {
            if (line.indexOf('mid:video') > -1)
                return index;
        }).filter(function (item) {
            return item;
        })
        sdpArr = sdpArr.slice(videoLine[0])
        var ssrc = sdpArr.filter(function (line) {
            return line.indexOf('a=ssrc:') > -1;
        })
        var cnameLine = ssrc.map(function (line, index) {
            if (line.indexOf('cname:' + cname) > -1)
                return index;
        }).filter(function (item) {
            return item;
        })
        var ts = ssrc.slice(cnameLine[0] + 1, cnameLine[0] + 2);
        return ts[0].split(" ")[2];

    },
    /**
     * 数组中查找
     *
     * @param arr
     * @param substr
     * @returns
     */
    findLine: function (arr, substr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(substr) != -1) {
                return i;
            }
        }
        return null;
    },
    /**
     * 数组中查找
     *
     * @param arr
     * @param substr
     * @param startIndex
     * @param endIndex
     * @returns
     */
    findLineInRange: function (arr, substr, startIndex, endIndex) {
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
    },
    /**
     * 随机打乱数组内排序
     *
     * @param input
     * @returns
     */
    shuffle: function (input) {
        for (var i = input.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    },
    /**
     * 刷新VideoView的视频流
     *
     * @param userId
     */
    refreshMediaStream: function (userId) {
        var videoView = document.getElementById(userId);
        if (videoView != null) {
            var stream = userId == rongRTCengine.selfUserId ? rongRTCengine.localStream : rongRTCengine.remoteStreams.filter(function (stream) {
                return stream.id == userId;
            })[0];
            videoView.srcObject = stream;
            videoView.srcObject = videoView.srcObject
        }
    },
    /**
     * 设置VideoView的视频流为指定流
     *
     * @param userId
     */
    setMediaStream: function (userId, stream) {
        var videoView = document.getElementById(userId);
        if (videoView != null) {
            videoView.srcObject = stream;
        }
    },
    /**
     * 当前浏览器
     */
    myBrowser: function () {
        var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }
        ; // 判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } // 判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } // 判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }
        ; // 判断是否IE浏览器
    }
}

/** ----- RongRTCAjax ----- */
var RongRTCAjax = function (opt) {
    opt.type = opt.type.toUpperCase() || 'POST';
    if (opt.type === 'POST') {
        post(opt);
    } else {
        get(opt);
    }

    // 初始化数据
    function init(opt) {
        var optAdapter = {
            url: '',
            type: 'GET',
            data: {},
            async: true,
            dataType: 'JSON',
            success: function () {
            },
            error: function (s) {
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
            var versions = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'];
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
        for (var i in data) {
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
            xhr.onreadystatechange = function () {
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
            xhr.onreadystatechange = function () {
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

/** ----- RongRTCMap ----- */
var RongRTCMap = function () {
    this._entrys = new Array();

    this.put = function (key, value) {
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
    this.get = function (key) {
        var index = this._getIndex(key);
        return (index != -1) ? this._entrys[index].value : null;
    };
    this.remove = function (key) {
        var index = this._getIndex(key);
        if (index != -1) {
            this._entrys.splice(index, 1);
        }
    };
    this.clear = function () {
        this._entrys.length = 0;
    };
    this.contains = function (key) {
        var index = this._getIndex(key);
        return (index != -1) ? true : false;
    };
    this.size = function () {
        return this._entrys.length;
    };
    this.getEntrys = function () {
        return this._entrys;
    };
    this._getIndex = function (key) {
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

/** ----- RongRTCException ----- */
var RongRTCException = function (code, message) {
    this.code = code;
    this.message = message;
}

/** ----- RongRTCLogger ----- */
var RongRTCLogger = {
    /**
     * debug
     *
     */
    debug: function (message, data) {
        console.debug(new Date() + " DEBUG " + message);
        if (data != null && data != undefined) {
            console.debug(data);
        }
    },
    /**
     * info
     *
     */
    info: function (message, data) {
        console.info(new Date() + " INFO " + message);
        if (data != null && data != undefined) {
            console.info(data);
        }
    },
    /**
     * log
     *
     */
    log: function (message, data) {
        console.log(new Date() + " LOG " + message);
        if (data != null && data != undefined) {
            console.log(data);
        }
    },
    /**
     * warn
     *
     */
    warn: function (message, data) {
        console.warn(new Date() + " WARN " + message);
        if (data != null && data != undefined) {
            console.warn(data);
        }
    },
    /**
     * error
     *
     */
    error: function (message, error) {
        console.error(new Date() + " ERROR " + message);
        if (error != null && error != undefined) {
            console.error(error);
        }
    }
}