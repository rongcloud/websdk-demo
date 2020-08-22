(function (win, dependencies, components) {
  var Vue = dependencies.Vue,
    RongIM = dependencies.RongIM,
    utils = RongIM.Utils,
    isDebug = RongIM.config.isDebug,
    debugConf = RongIM.config.debugConf;

  var ConfigPlacehoder = {
    appkey: '开发者的融云 AppKey',
    token: '开发者的用户 Token',
    targetId: '对方 id. 发消息、获取历史消息等都默认对此用户操作. 默认聊天室、群组、个人 id 都为此 id',
    navi: '导航地址. 注: 国内数据中心可不填',
    cmpUrl: '链接地址(开发者忽略此项)',
    isPolling: '若使用长轮训链接方式, 可选择此项(开发者可忽略)'
  };

  components.login = Vue.component('login', {
    template: utils.getTemp('rong-global-config'),
    props: ['config', 'login'],
    computed: {
      configList: function() {
        var items = [];
        utils.forEach(this.config, function(val, key) {
          items.push({
            type: typeof val,
            name: key
          });
        });
        return items;
      },
      prompt: function() {
        return ConfigPlacehoder;
      }
    },
    methods: {
      clearStorage: function () {
        window.localStorage.clear();
        this.$Message.success({
          background: true,
          content: '清空本地缓存成功'
        });
      }
    },
    mounted: function () {
      if (isDebug && debugConf.autoRun) {
        var self = this;
        Vue.nextTick(function () {
          self.login(self.config);
        });
      }
    }
  });

})(window, {
  Vue: Vue,
  iview: iview,
  RongIM: RongIM
}, window.RongIM.components);