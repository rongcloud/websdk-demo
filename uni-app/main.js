import Vue from 'vue'
import App from './App'
import Protobuf from './static/protobuf-2.3.4.min.js'
import RongIMLib from './static/RongIMLib-2.4.0.js'

RongIMLib.RongIMClient.Protobuf = Protobuf

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})


var appkey = '8w7jv4qb78a9y'
var token = 'ZThhLI1Xa1BX5EMREAdArWSH6ouuI8NT/fNmMkzF+4IOKIoFvbsi6JnH8QmnSltLkCcsK8vOgKl3IZgfbxFiWg=='
var navi = null
var RongIMClient = RongIMLib.RongIMClient
var config = {}
if (navi) {
	config.navi = navi
}
RongIMClient.init(appkey, null, config)
RongIMClient.setConnectionStatusListener({
	onChanged: function(status) {
		switch (status) {
			case RongIMLib.ConnectionStatus['CONNECTED']:
			case 0:
				console.log('连接成功')
				break

			case RongIMLib.ConnectionStatus['CONNECTING']:
			case 1:
				console.log('连接中')
				break

			case RongIMLib.ConnectionStatus['DISCONNECTED']:
			case 2:
				console.log('当前用户主动断开链接')
				break

			case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
			case 3:
				console.log('网络不可用')
				break

			case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
			case 4:
				console.log('未知原因，连接关闭')
				break

			case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
			case 6:
				console.log('用户账户在其他设备登录，本机会被踢掉线')
				break

			case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
			case 12:
				console.log('当前运行域名错误，请检查安全域名配置')
				break
		}
	}
})

RongIMClient.setOnReceiveMessageListener({
	// 接收到的消息
	onReceived: function(message) {
		console.log('新消息 ' + message.targetId + ':' + JSON.stringify(message))
	}
})

RongIMClient.connect(token, {
	onSuccess: function(userId) {
		console.log('链接成功，用户id：' + userId)
		alert('链接成功，用户id：' + userId);
	},
	onTokenIncorrect: function() {
		console.log('token无效')
	},
	onError: function(errorCode) {
		console.log(errorCode)
	}
}, null)


app.$mount()
