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
        userId: '',
        isLoading: false
      };
    },
    methods: {
      login: function () {
        var context = this;
        if (context.isLoading) {
          return;
        }
        context.isLoading = true;
        var userId = context.userId;
        var loginDetail;
        utils.login(userId).then(function (result) {
          setting.token = result.token;
          loginDetail = result;
          return RongCall.initIM(setting);
        }).then(function () {
          RongCall.instance.auth = loginDetail;
          toInfoPage(loginDetail);
        }).catch(function () {
          context.isLoading = false;
          win.alert('登录失败, 请检查 CallLib Demo Server 是否启动');
        });
      }
    },
    mounted: function () {
      utils.compatiblePlaceholder();
    }
  });

})(window.RongCall, {
  win: window
});