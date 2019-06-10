<template>
  <div>
    <h1>Web SDK electron-vue</h1>
    <p class="rong-input">
      <span>appkey:</span>
      <input type="text" v-model="appkey" size="20">
    </p>
    <p class="rong-input">
      <span>token:</span><input type="text" size="110" v-model="token">
    </p>
    <p class="rong-input">
      <span>navi:</span><input type="text" size="50" v-model="navi"><i>此配置项仅针对私有部署，公有云请置空，格式为 10.10.10.10:8080</i>
    </p>
    <p class="rong-input">
      <span></span>
      <button @click="init">初始化链接</button>
    </p>
    <div class="rong-show-box">
      <h3>初始化以及消息接收:</h3>
      <p v-for="data in showDatas">
        {{data}}
      </p>
    </div>
  </div>
</template>

<script>
  require('../../../static/js/RongIMLib-2.4.0.js')
  require('../../../static/js/protobuf-2.3.4.min.js')
  require('../../../static/js/RongEmoji-2.2.7.js')
  var RongIMLib = window.RongIMLib
  var RongIMClient = RongIMLib.RongIMClient

  function init (params, addPromptInfo) {
    var appkey = params.appkey
    var token = params.token
    var navi = params.navi
    var config = {}
    if (navi) {
      config.navi = navi
    }
    RongIMClient.init(appkey, null, config)
    RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        switch (status) {
          case RongIMLib.ConnectionStatus['CONNECTED']:
          case 0:
            addPromptInfo('连接成功')
            break

          case RongIMLib.ConnectionStatus['CONNECTING']:
          case 1:
            addPromptInfo('连接中')
            break

          case RongIMLib.ConnectionStatus['DISCONNECTED']:
          case 2:
            addPromptInfo('当前用户主动断开链接')
            break

          case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
          case 3:
            addPromptInfo('网络不可用')
            break

          case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
          case 4:
            addPromptInfo('未知原因，连接关闭')
            break

          case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
          case 6:
            addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
            break

          case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
          case 12:
            addPromptInfo('当前运行域名错误，请检查安全域名配置')
            break
        }
      }
    })

    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function (message) {
        addPromptInfo('新消息 ' + message.targetId + ':' + JSON.stringify(message))
      }
    })

    RongIMClient.connect(token, {
      onSuccess: function (userId) {
        addPromptInfo('链接成功，用户id：' + userId)
      },
      onTokenIncorrect: function () {
        addPromptInfo('token无效')
      },
      onError: function (errorCode) {
        addPromptInfo(errorCode)
      }
    }, null)
  }

  export default {
    name: 'landing-page',
    data: function () {
      return {
        appkey: '',
        token: '',
        navi: '',
        showDatas: []
      }
    },
    methods: {
      addPromptInfo: function (prompt) {
        this.showDatas.push(prompt)
      },
      init: function () {
        var appkey = this.appkey
        var token = this.token
        if (!appkey || !token) {
          alert('appkey 和 token 不能为空')
        } else {
          init({
            appkey: appkey,
            token: token,
            navi: this.navi
          }, this.addPromptInfo)
        }
      }
    }
  }
</script>

<style>
.rong-input span {
  display: inline-block;
  width: 60px;
}
.rong-show-box {
  border: 1px solid lightgray;
  padding: 10px;
}
.rong-show-box h3, .rong-show-box p {
  margin: 5px 0;
}

</style>
