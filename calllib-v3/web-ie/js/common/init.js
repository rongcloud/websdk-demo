(function (RongCall, dependencies) {
  var RongIMLib = dependencies.RongIMLib,
    RongIMClient = RongIMLib.RongIMClient,
    RongCallLib = dependencies.RongCallLib,
    RongRTC = dependencies.RongRTC;

  var win = dependencies.win;

  var isConnecting = false;

  function reconnect() {
    console.log('准备重连 isConnecting: ', isConnecting);
    if (isConnecting) {
      return;
    }
    isConnecting = true;
    var utils = win.RongCall.utils,
      EventEmitter = utils.EventEmitter;
    var callback = {
      onSuccess: function (userId) {
        isConnecting = false;
        EventEmitter.emit('NetworkReconnect');
      },
      onTokenIncorrect: function () {
        isConnecting = false;
        alert('重连 Token 无效')
      },
      onError: function (errorCode) {
        isConnecting = false;
        if (errorCode == -1 || errorCode == 3) {
          reconnect();
        } else {
          alert('重连失败');
        }
      }
    };
    var config = {
      auto: true,
      url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js?d=' + Date.now(),
      rate: [100, 1000, 1000, 1000, 1000, 1000, 2000, 2000, 2000]
    };
    RongIMClient.reconnect(callback, config);
  }

  /**
   * 
   * @param {string} params.appkey 融云 appKey
   * @param {string} params.token 融云 token
   * @param {string} params.navi navi 地址, 公有云可不配置
   * @param {string} params.onError navi 地址, 公有云可不配置
   */
  var initIM = function (params) {
    var console = win.console,
      utils = win.RongCall.utils,
      EventEmitter = utils.EventEmitter;

    var appKey = params.appkey,
      token = params.token,
      navi = params.navi;
    
    if (navi) {
      // 私有云初始化
      RongIMClient.init(appKey, null, {
        navi: navi, // 私有云 navi 地址
        protobuf: './lib/protobuf-2.3.6.min.js'
      });
    } else {
      RongIMClient.init(appKey, null, {
        protobuf: './lib/protobuf-2.3.6.min.js'
      });
    }

    // 设置状态监听器
    RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        console.log('status changed', status);
        switch (status) {
          case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
            reconnect();
            EventEmitter.emit('NetworkError');
            break;
          case RongIMLib.ConnectionStatus.WEBSOCKET_ERROR:
            RongIMClient.getInstance().disconnect();
            reconnect();
            EventEmitter.emit('NetworkError');
            break;
        }
      }
    });

    // 设置消息监听器
    RongIMClient.setOnReceiveMessageListener({
      onReceived: function (message) {
        console.log('received message', message, 'is offLineMessage :', message.offLineMessage);
      }
    });

    return new RongCall.Promise(function (resolve, reject) {
      // 连接融云服务器
      RongIMClient.connect(token, {
        onSuccess: function (userId) {
          resolve(userId)
        },
        onTokenIncorrect: function () {
          reject();
        },
        onError: function (errorCode) {
          reject(errorCode);
        }
      }, '');
    });
  };

  var initCallLib = function (userId) {
    var config = {
      RongIMLib: RongIMLib,
      RongRTC: RongRTC,
      currentUserId: userId,
      engineId: 'RTCEngine'
    };
    // 初始化 CallLib
    RongCallLib = RongCallLib.init(config);

    return RongCallLib;
  };

  RongCall = RongCall || {};
  RongCall.initIM = initIM;
  RongCall.initCallLib = initCallLib;
  
})(window.RongCall, {
  win: window,
  RongIMLib: window.RongIMLib,
  RongCallLib: window.RongCallLib,
  RongRTC: window.RongRTC
});