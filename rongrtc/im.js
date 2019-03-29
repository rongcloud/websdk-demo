function initIM(params, callbacks) {
  var appkey = params.appkey;
  var token = params.token;
  RongIMClient.init(appkey, null);
  RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
      switch (status) {
        case RongIMLib.ConnectionStatus.CONNECTING:
          break;
        case RongIMLib.ConnectionStatus.DISCONNECTED:
          callbacks.disconnectd(status);
        break;
        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
        case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
        callbacks.error(status);
          break;
      }
    }
  });
  RongIMClient.setOnReceiveMessageListener({
    onReceived: function (message) {
      console.log(message);
    }
  });
  RongIMClient.connect(token, {
    onSuccess: function (userId) {
      callbacks.connected(RongIMClient.getInstance(), { id: userId });
    },
    onTokenIncorrect: function () {
      callbacks.onTokenIncorrect()
    },
    onError: function (code) {
      callbacks.disconnectd(status);
    }
  });
}