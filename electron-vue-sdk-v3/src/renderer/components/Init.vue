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
  import RongIMLib from '../../../static/js/RongIMLib-3.0.1-dev.es.js'

  function init (params, addPromptInfo) {
    var appkey = params.appkey
    var token = params.token
    var navi = params.navi
    var config = {}
    if (navi) {
      config.navi = navi
    }
    var im = RongIMLib.init({
      appkey
    })

    im.watch({
      message: (event) => {
        addPromptInfo('收到消息: ' + JSON.stringify(event))
      },
      conversation: (event) => {
        addPromptInfo('会话变化: ' + JSON.stringify(event))
      },
      status: (event) => {
        addPromptInfo('状态变化: ' + JSON.stringify(event))
      }
    })

    im.connect({
      token
    }).then((user) => {
      addPromptInfo('链接成功: ' + user.id)
      console.log('connect success', user.id)
    }).catch((e) => {
      addPromptInfo('链接失败: ' + e.msg)
      console.log('error')
    })
  }

  export default {
    name: 'landing-page',
    data: function () {
      return {
        appkey: 'n19jmcy59f1q9',
        token: '5JQlp5czM31GNl99DOZyI3xpRjANxKgfakOnYLFljI+TMvOF0hGaVtR1n9Qp4baLgKBGsyl3w5j4gAWBbNZ3nOKrvnVo8Ldl',
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
