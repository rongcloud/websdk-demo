(function (RongCall, dependencies) {
  /* 登录逻辑 */

  var win = dependencies.win,
    Vue = win.Vue;
  var utils = RongCall.utils,
    setting = RongCall.setting;

  function toInfoPage(data) {
    var instance = RongCall.instance;
    instance.$router.push({
      name: 'call',
      params: data
    });
  }

  RongCall.login = Vue.component('login', {
    template: '#rong-template-login',
    data: function () {
      return {
        userId: ''
      };
    },
    methods: {
      login: function () {
        var userId = this.userId;
        var loginDetail
        utils.login(userId).then(function (result) {
          setting.token = result.token;
          loginDetail = result;
          return RongCall.initIM(setting);
        }).then(function () {
          RongCall.instance.auth = loginDetail;
          toInfoPage(loginDetail);
        }).catch(function () {
          win.alert('登录失败, 请检查 CallLib Demo Server 是否启动');
        });
      }
    }
  });

})(window.RongCall, {
  win: window
});