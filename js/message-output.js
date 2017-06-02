/*
接收消息，并导出为文本

1. 接受存储新消息
	RongIMClient.setOnReceiveMessageListener({
		// 接收到的消息
		onReceived: function (message) {
		    messageOutput(message);
		}
	});
2. 控制台运行 messageOutput.show(); 获得blobUrl
3. 保存
*/
function messageOutput(message){
	/* message 数据结构
	{
		"content": {
			"messageName": "TextMessage",
			"content": "阿拉部",
			"extra": {
				"name": "name",
				"age": 12
			},
			"user": {
				"userId": "this-is-a-test-id",
				"name": "张三",
				"portraitUri": "http://rongcloud.cn/images/newVersion/log_wx.png"
			}
		},
		"conversationType": 1,
		"objectName": "RC:TxtMsg",
		"messageDirection": 2,
		"messageId": "1_13887103",
		"receivedStatus": 0,
		"receivedTime": 1496373353260,
		"senderUserId": "user10",
		"sentTime": 1496287140858,
		"targetId": "user10",
		"messageType": "TextMessage",
		"messageUId": "5E63-AERV-843A-D3EE",
		"offLineMessage": true
	}
	*/

	messageOutput["list"] = messageOutput["list"] || [];

	var msg = {
		"content" : message.content.content,
		"messageUId" : message.messageUId,
		"senderUserId" : message.senderUserId,
		"sentTime" : message.sentTime
	};

	messageOutput["list"].push(JSON.stringify(msg) + "\n");

	var id = "messageOutputBtn";
	var target = document.getElementById(id);
	if(!target){
		target = document.createElement("span");
		target.id = id;
		target.style.cssText = "position:fixed;right:1em;top:1em;border:1px solid #ccc;background:#f5f5f5;border-radius:5px;font-size:14px;padding:10px;cursor:pointer;";
		document.body.appendChild(target);
		target.onclick = function(){
			var list = messageOutput["list"];
			var file = new Blob(list, { "type" : "text\/plain" }); // the blob

			var url = window.URL.createObjectURL(file);
			window.open(url);
		}
	}
	target.innerHTML = "导出消息(" + messageOutput["list"].length + ")";
}