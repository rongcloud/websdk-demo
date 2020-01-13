(function (win, dependencies, components) {
  var Vue = dependencies.Vue,
    RongIM = dependencies.RongIM,
    utils = RongIM.Utils,
    Service = RongIM.Service;

  var OutputMark = {
    SUCCESS: '成功',
    FAILED: '失败'
  };

  var copyApi = function (api) {
    var params = api.params || [];
    var copyParams = utils.copy(params);
    utils.forEach(params, function (item, index) {
      utils.forEach(item, function (val, key) {
        if (utils.isFunction(val)) {
          copyParams[index][key] = val;
        }
      });
    });
    api.params = copyParams;
    return api;
  };

  components.apiBtn = Vue.component('api-btn', {
    template: utils.getTemp('rong-tpl-apibtn'),
    props: ['api', 'isdragging'],
    data: function() {
      return {
        isShowEditDialog: false,
        selfApi: copyApi(this.api)
      }
    },
    watch: {
      markMessage: function (newMsg) {
        console.log(newMsg);
      }
    },
    computed: {
      tip: function() {
        var api = this.selfApi;
        return utils.tplEngine(TipTpl, api);
      },
      apiValue: function() {
        var api = this.selfApi;
        return utils.toJSON(api);
      },
      paramList: function () {
        var paramList = this.selfApi.params;
        return paramList;
      },
      hasParams: function () {
        var params = this.selfApi.params;
        return params && params.length;
      }
    },
    methods: {
      openUrl: utils.openUrl,
      showEditDialog: function() {
        this.isShowEditDialog = true;
      },
      hideEditDialog: function() {
        this.isShowEditDialog = false;
      },
      change: function() {
      },
      run: function() {
        var self = this;
        var params = [];
        var startTime = +new Date();
        utils.forEach(self.selfApi.params, function(item) {
          params.push(item.value);
        });
        var imInstance = RongIM.vueInstance;

        var addOutput = function(data, isSuccess) {
          var currentTime = +new Date();
          var consumedTime = currentTime - startTime;
          var title = self.api.name + (isSuccess ? OutputMark.SUCCESS : OutputMark.FAILED);
          var config = {};
          if (!isSuccess) {
            config.color = utils.TypeColor.FAILED;
          }
          imInstance.addOutput(title, data, consumedTime, params, config);
          self.hideEditDialog();
        };
        return self.api.event.apply(void 0, params).then(function(data) {
          addOutput(data, true);
        }).catch(function(error) {
          error = utils.isNumber(error) ? error : error.toString();
          addOutput(error, false);
        });
      }
    },
    mounted: function() {
      var self = this;

      var setParams = function () {
        var paramList = self.selfApi.params;
        utils.forEach(paramList, function (item) {
          if (item.event) {
            item.value = item.value || item.event();
          }
        });
      };

      setParams();
      Service.msgEmitter.on('msgChanged', setParams);
    }
  });

})(window, {
  Vue: Vue,
  iview: iview,
  RongIM: RongIM
}, window.RongIM.components);