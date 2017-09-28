describe("Message -> ", function() {
    var RongIMLib = window.RongIMLib;

    var config = window.AppConfig;

    //current user
    var appKey = config.appKey;
    var token = config.token;
    var userId = "user10";

    //TextMessage
    var textMessage = null;
    it("Send text message", function() {
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
                	textMessage = _message;
                },
                onError: function (errorCode,message) {

                }
            });
        });

        waitsFor(function() {
            return textMessage;
        });

        runs(function() {
    		expect(typeof textMessage).toEqual("object");
    		expect(textMessage.conversationType).toEqual(1);
    		expect(textMessage.objectName).toEqual("RC:TxtMsg");
    		expect(textMessage.targetId).toEqual("user9");
    		expect(textMessage.senderUserId).toEqual("user10");
        });
    });

    it("Recall mine message", function() {
        var recallMessage = null;

        runs(function() {
            var instance = RongIMClient.getInstance();
            
            instance.sendRecallMessage(textMessage, {
                onSuccess: function (message) {
                    recallMessage = {
                        message : message,
                        result : true
                    };
                },
                onError: function (errorCode,message) {
                    recallMessage = {
                        message : message,
                        errorCode : errorCode,
                        result : false
                    }
                }
            });
        });

        waitsFor(function() {
            return recallMessage;
        });

        runs(function() {
            expect(recallMessage.result).toEqual(true);
        });
    });

    it("Recall mine histroy message", function() {
        var recallMessage = null;

        var textMessage = {
            "content": {
                "messageName": "TextMessage",
                "content": "阿拉伯语",
                "extra": "{\"key\":\"value\", \"key2\" : 12, \"key3\":true}",
                "user": {
                    "userId": "this-is-a-test-id",
                    "name": "张三",
                    "portraitUri": "http://rongcloud.cn/images/newVersion/log_wx.png"
                }
            },
            "conversationType": 1,
            "objectName": "RC:TxtMsg",
            "messageDirection": 1,
            "messageId": "1_10450369",
            "receivedStatus": 1,
            "receivedTime": 1506055578362,
            "senderUserId": "user10",
            "sentStatus": 50,
            "sentTime": 1506054257398,
            "targetId": "",
            "messageType": "TextMessage",
            "messageUId": "5FAF-L1QU-O43A-D3EE",
            "offLineMessage": true
        };
        
        runs(function() {
            var instance = RongIMClient.getInstance();
            
            instance.sendRecallMessage(textMessage, {
                onSuccess: function (message) {
                    recallMessage = {
                        message : message,
                        result : true
                    };
                },
                onError: function (errorCode,message) {
                    console.log(errorCode)
                    recallMessage = {
                        message : message,
                        errorCode : errorCode,
                        result : false
                    }
                }
            });
        });

        waitsFor(function() {
            return recallMessage;
        });

        runs(function() {
            expect(recallMessage.result).toEqual(true);
        });
    });  

    it("Recall other`s message", function() {
        var recallMessage = null;

        var textMessage = {
            "content": {
                "messageName": "TextMessage",
                "content": "文字内容 content",
                "extra": {
                    "name": "name",
                    "age": 12
                }
            },
            "conversationType": 1,
            "objectName": "RC:TxtMsg",
            "messageDirection": 2,
            "messageId": "1_10209496",
            "receivedStatus": 1,
            "receivedTime": 1506055578362,
            "senderUserId": "user9",
            "sentStatus": 50,
            "sentTime": 1506054987049,
            "targetId": "user9",
            "messageType": "TextMessage",
            "messageUId": "5FAF-NQT5-4772-MAPA",
            "offLineMessage": true
        };
        
        runs(function() {
            var instance = RongIMClient.getInstance();
            
            instance.sendRecallMessage(textMessage, {
                onSuccess: function (message) {
                    recallMessage = {
                        message : message,
                        result : true
                    };
                },
                onError: function (errorCode,message) {
                    recallMessage = {
                        message : message,
                        errorCode : errorCode,
                        result : false
                    }
                }
            });
        });

        waitsFor(function() {
            return recallMessage;
        });

        runs(function() {
            expect(recallMessage.result).toEqual(false);
        });
    });       
});