describe("init connect", function() {
  var RongIMLib = window.RongIMLib;

  var config = window.AppConfig;

  var appKey = config.appKey;
  var token = config.token;
  var userId = "user10";

  var value = "";

  it("user10 connect", function() {
    runs(function() {
	     RongIMLib.RongIMClient.init(appKey);

        var instance = RongIMClient.getInstance();

        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
            console.log(status);
              switch (status) {
                  case RongIMLib.ConnectionStatus.CONNECTED:
                      break;
                  }
          }
        });

        RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
              // 判断消息类型
              // console.log("新消息: " + message.targetId);
              console.log(message);
          }
        });

        //开始链接
        RongIMClient.connect(token, {
          onSuccess: function(userId) {
            value = userId;
          },
          onTokenIncorrect: function() {
          },
          onError:function(errorCode){
          }
        });
    });

    waitsFor(function() {
    	return value;
    });

    runs(function() {
    	expect(value).toEqual("user10");
    });

  });
});