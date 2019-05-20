(function (RongCall, dependencies) {
  var RongIMLib = dependencies.RongIMLib,
    RongIMClient = RongIMLib.RongIMClient,
    RongCallLib = dependencies.RongCallLib,
    RongRTC = dependencies.RongRTC;

  var win = dependencies.win;

  /**
   * 
   * @param {string} params.appkey 融云 appKey
   * @param {string} params.token 融云 token
   * @param {string} params.navi navi 地址, 公有云可不配置
   */
  var initIM = function (params) {
    var console = win.console;

    var appKey = params.appkey,
      token = params.token,
      navi = params.navi;
    
    if (navi) {
      // 私有云初始化
      RongIMClient.init(appKey, null, {
        navi: navi // 私有云 navi 地址
      });
    } else {
      RongIMClient.init(appKey);
    }

    // 设置状态监听器
    RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        console.log('status changed', status);
        // 此处若监听到网络错误, 需调用 disconnect 做重连处理
      }
    });

    // 设置消息监听器
    RongIMClient.setOnReceiveMessageListener({
      onReceived: function (message) {
        console.log('received message', message, 'is offLineMessage :', message.offLineMessage);
      }
    });

    return new win.Promise(function (resolve, reject) {
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
      currentUserId: userId
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