describe("sendMessage", function() {
  var RongIMLib = window.RongIMLib;

  var config = window.AppConfig;

  var appKey = config.appKey;
  var token = config.token;
  var userId = "user10";

  var message = null;

  it("sendTextMessage", function() {
    runs(function() {
        var instance = RongIMClient.getInstance();
        var content = {
          content: [
            "阿拉伯语：الشرق الأوسط ",
            "希伯来语：המזרח התיכון",
            "emoji: 😊 ",
            "希腊字母： π，α，β, ",
            "数字单位部分字符 如：× ",
            "拉丁文所有字符 如：Ο Ρ σ Ï Æ ",
            "拼音所有字符 如： ě ì ň ",
            "英文音标部分字符 如 ： ə ʃ ",
            "俄文部分字符 如 ：ш ; ⊇ â Œ Š ™ "
          ].join(","),
          user : {
            "userId" : "this-is-a-test-id", //不支持中文及特殊字符
            "name" : "张三",
            "portraitUri" : "http://rongcloud.cn/images/newVersion/log_wx.png"
          },
          extra: "{\"key\":\"value\", \"key2\" : 12, \"key3\":true}"
        };

        var msg = new RongIMLib.TextMessage(content);

		var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
		var targetId = "user9";

        instance.sendMessage(conversationType, targetId, msg, {
              onSuccess: function (_message) {
              	message = _message;
              },
              onError: function (errorCode,message) {

              }
          });
    });

    waitsFor(function() {
      return message;
    });


    /*{
		"content": {
			"messageName": "TextMessage",
			"content": "阿拉伯语：الشرق الأوسط ,希伯来语：המזרח התיכון,emoji: 😊 ,希腊字母： π，α，β, ,数字单位部分字符 如：× ,拉丁文所有字符 如：Ο Ρ σ Ï Æ ,拼音所有字符 如： ě ì ň ,英文音标部分字符 如 ： ə ʃ ,俄文部分字符 如 ：ш ; ⊇ â Œ Š ™ ",
			"extra": "{\"key\":\"value\", \"key2\" : 12, \"key3\":true}",
			-"user": {
				"userId": "this-is-a-test-id",
				"name": "张三",
				"portraitUri": "http://rongcloud.cn/images/newVersion/log_wx.png"
			}
		},
		"conversationType": 1,
		"objectName": "RC:TxtMsg",
		"messageDirection": 1,
		"messageId": 2,
		"senderUserId": "user10",
		"sentStatus": 30,
		"sentTime": 1505378092714,
		"targetId": "user9",
		"messageType": "TextMessage",
		"messageUId": "5F7V-1M6L-843A-D3EE"
	}*/
    runs(function() {
		expect(typeof message).toEqual("object");
		expect(message.conversationType).toEqual(1);
		expect(message.objectName).toEqual("RC:TxtMsg");
		expect(message.targetId).toEqual("user9");
		expect(message.senderUserId).toEqual("user10");
    });

  });
});