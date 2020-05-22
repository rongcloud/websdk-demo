(function (win, dependencies) {
  var RongIM = dependencies.RongIM;
  var utils = RongIM.Utils;

  RongIM.dialog = RongIM.dialog || {};
  RongIM.dialog.jsonAlert = function(options) {
    var vueInstance = RongIM.vueInstance;

    options = options || {};

    utils.mountDialog({
      name: 'json-alert',
      template: '#rong-json-alert',
      data: function () {
        return {
          isShow: true,
          data: options.data
        };
      },
      watch: {
        isShow: function(isShow) {
          if (!isShow) {
            utils.removeDom(this.$el);
          }
        }
      },
      methods: {
        hide: function() {
          this.isShow = false;
        }
      }
    }, vueInstance);
  };

})(window, {
  RongIM: RongIM
});