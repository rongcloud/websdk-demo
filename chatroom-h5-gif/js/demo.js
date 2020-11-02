var ht = new HeartsFlow({
  canvasEl: '.rc-hearts-canvas',
  amount: 1
});

var lastTime = new Date(), num = 1, t;
var id = window.location.search.replace('?id=', '');
appInfo.id = id;

const messageEvent = {
  'TextMessage': updateMessage,
  'PersonMessage': userJoinMeeage,
  'LikerMessage': updateLiker
}

const chatRoomInfo = {
  "chatRoomId": "chatRoomId-001",
  "count": 0
};
// (function () {
//emoji表情
// var RongIMEmoji = RongIMLib.RongIMEmoji;
// window.RongIMEmoji = RongIMEmoji;
// RongIMEmoji.init();

// var panel = document.getElementById("rc-emoji-panel");
// var panelBtn = document.getElementById("rc-chatroom-emoji");
var input = document.getElementById("rc-chatroom-input");
var btn = document.getElementById("rc-chatroom-button");

// var emojis = RongIMEmoji.list;
// for (var i = 0; i < 24; i++) {
// 	var value = RongIMEmoji.list[i];
// 	panel.appendChild(value.node);
// }

// panelBtn.onclick = function () {
// 	if (panel.style.display == "block") {
// 		panel.style.display = "none";
// 	} else {
// 		panel.style.display = "block";
// 	}
// };

// //表情选择
// panel.onclick = function (event) {
// 	var e = event || window.event;
// 	var target = e.target || e.srcElement;
// 	if (document.all && !document.addEventListener === false) {
// 		console.log(target);
// 	}
// 	input.value += RongIMEmoji.symbolToEmoji(target.getAttribute("name"));
// }



RongChatRoom.init(appInfo, chatRoomInfo, {
  onSuccess: function (chatRoom) {
    var msg = new RongIMClient.RegisterMessage.PersonMessage(getUserInfo(appInfo.id));
    chatRoom.sendMessage(msg, {
      onSuccess: function (message) {
        RongIMLib.chatRoom = chatRoom;
        var welcomeMessageInfo = {
          content: {
            content: "欢迎来到直播间~ 请自行调节手机音量至合适大小。"
          }
        }
        updateMessage(welcomeMessageInfo);
      },
      onError: function (errorCode, message) {
        console.log("发送聊天室消息失败", errorCode);
      }
    });
  },
  onError: function (error) {
    alert('加入聊天室失败。')
  },
  onMessage: function (message) {
    console.info(message);
    let event = messageEvent[message.messageType];
    event(message);
  }
});

function send() {
  let content = document.getElementById('rc-chatroom-input').value;
  if (content) {
    let messageValue = textMessageInfo = {
      content: content,
      user: getUserInfo(RongIMLib.chatRoom.currentUser.userId)
    }
    var msg = new RongIMLib.TextMessage(messageValue);
    RongIMLib.chatRoom.sendMessage(msg, {
      onSuccess: function (message) {
        updateMessage(message);
        document.getElementById('rc-chatroom-input').value = '';
        document.getElementById('send').style.display = 'none';
      },
      onError: function (errorCode, message) {
        console.log("发送聊天室消息失败", errorCode);
      }
    });
  }
}

function clicLiker() {
  ht.startAnimation();
  var nowTime = new Date();
  if (Math.round(nowTime.getTime() - lastTime.getTime()) < 400) {//判断两次点击之间的时间差
    num++;
    lastTime = nowTime;
    return;
  }
  clearTimeout(t)
  t = setTimeout(() => {
    let msg = new RongIMClient.RegisterMessage.LikerMessage({ likerNum: num });
    RongIMLib.chatRoom.sendMessage(msg, {
      onSuccess: function (message) {
        lastTime = nowTime;
        num = 1;
      },
      onError: function (errorCode, message) {
        console.log("发送聊天室消息失败", errorCode);
      }
    });
  }, 400)
  lastTime = nowTime;
}

function onFocus() {
  document.getElementById('send').style.display = 'block';
}

function onBlur() {
  let content = document.getElementById('rc-chatroom-input').value;
  if (!content) {
    document.getElementById('send').style.display = 'none';
  }
}

function updateMessage(message) {
  var t = document.getElementById("rc-message-list");
  // message.content.content = RongIMEmoji.symbolToEmoji(message.content.content);
  var html = renderUI(message);
  t.innerHTML += html;
  document.getElementById('rc-message-list-wrapper').scrollTop = document.getElementById('rc-message-list-wrapper').scrollHeight;
}

function userJoinMeeage(message) {
  var t = document.getElementById("rc-user-join");
  var html = renderUserUI(message.content);
  t.innerHTML += html;
  setTimeout(() => {
    document.getElementById(message.content.id).remove();
  }, 1500)
}

function updateLiker(message) {
  let likerNum = message.content.likerNum
  if (likerNum) {
    for (let i = 0; i < likerNum; i++) {
      ht.startAnimation();
    }
  }
}