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

    var im = RongIMLib.init({
      appkey: appKey,
      navigators: [navi]
    });

    im.watch({
      status: function (event) {
        console.log('status changed', event);
      }
    });

    return im.connect({
      token
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