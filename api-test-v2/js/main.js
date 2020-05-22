(function (win, dependencies, components) {
  var Vue = dependencies.Vue,
    iview = dependencies.iview,
    VueJsonPretty = dependencies.VueJsonPretty,
    RongIM = dependencies.RongIM,
    Service = RongIM.Service,
    utils = RongIM.Utils,
    ApiList = RongIM.ApiList,
    DefailtReadyApiQueue = RongIM.DefailtReadyApiQueue,
    DefaultConfig = RongIM.config,
    Config = utils.copy(DefaultConfig),
    Storage = utils.Storage,
    StorageConfig = Storage.get(Storage.ConfigKey),
    DefaultTargetId = Config.targetId;

  DefailtReadyApiQueue.push([]);

  var isStorageConfig = false;
  if (StorageConfig) {
    isStorageConfig = true;
    Config = utils.copy(StorageConfig);
  }

  var ReceiveMsgTextTpl = '监听到{typeName} ({conversationType})消息. 发送者: {senderUserId}';
  var StatusTextTpl = '链接状态: {statusName} ({status})';

  var OptBoxClass = 'rong-ready-box';
  var ApiBoxClass = 'rong-api-list';
  var ApiSourceClass = 'rong-api-source';

  var RunType = {
    OneByOne: { name: '逐个运行', prompt: 'Api 逐个执行' },
    LineByLine: { name: '逐行运行', prompt: '每行 Api 并行. 执行完一行后执行下一行' }
  };
  
  var vueInstance;

  function runAllApi(allRefs, currentIndex) {
    var total = allRefs.length;
    var isFinished = total === currentIndex;
    if (isFinished) {
      return;
    }
    var refList = allRefs[currentIndex];
    var deferArr = [];
    utils.forEach(refList, function (instance) {
      deferArr.push(instance.run());
    });
    return utils.Defer.all(deferArr).then(function () {
      currentIndex++;
      runAllApi(allRefs, currentIndex);
    });
  }

  function runOneByOne() {
    var refs = vueInstance.$refs;
    var allRefs = [];
    utils.forEach(refs, function (subRefList) {
      utils.forEach(subRefList, function (ref) {
        allRefs.push([ ref ]);
      });
    });
    runAllApi(allRefs, 0);
  }

  function runLineByLine() {
    var refs = vueInstance.$refs;
    var allRefs = [];
    utils.forEach(refs, function (ins) {
      allRefs.push(ins);
    });
    runAllApi(allRefs, 0);
  }

  function setConfig(config) {
    var currentTargetId = config.targetId;
    vueInstance.globalConfig = config;
    vueInstance.readyApiQueue = utils.deepMap(vueInstance.readyApiQueue, function (item) {
      if (item === DefaultTargetId) {
        item = currentTargetId;
      }
      return item;
    });
  }

  function watchStatus(status) {
    var title = utils.tplEngine(StatusTextTpl, {
      status: status,
      statusName: utils.StatusName[status]
    });
    vueInstance.addOutput(title, status, 0, [], {
      color: utils.TypeColor.STATUS
    });
    var isSuccess = utils.SuccessStatus.indexOf(status) !== -1;
    var event = isSuccess ? vueInstance.$Message.success : vueInstance.$Message.error;
    event.call(vueInstance.$Message, {
      background: true,
      content: title
    });
  }

  function watchMessage(message) {
    var title = utils.tplEngine(ReceiveMsgTextTpl, {
      typeName: utils.ConversationName[message.conversationType],
      conversationType: message.conversationType,
      senderUserId: message.senderUserId
    });
    vueInstance.addOutput(title, message, 0, [], {
      color: utils.TypeColor.MSG
    });
    console.log('Reveice Msg', utils.toJSON(message));
  }

  function loginSuccessEvent(userId, config) {
    vueInstance.$Message.success({
      background: true,
      content: '链接成功 ' + userId
    });
    vueInstance.currentUserId = userId;
    vueInstance.isLogged = true;
  }

  function login(config) {
    setConfig(config);
    return Service.init(config, {
      status: watchStatus,
      message: watchMessage
    }).then(function (userId) {
      Storage.set(Storage.ConfigKey, config);
      loginSuccessEvent(userId, config);
    }).catch(function (error) {
      vueInstance.$Message.error({
        background: true,
        content: '链接失败 ' + error
      });
    });
  }

  function getApiListMethods() {
    return {
      addOutput: function (title, result, consumedTime, params, config) {
        config = config || {};
        var output = {
          id: utils.getIncreasNumber(),
          title: title,
          result: result,
          consumedTime: consumedTime,
          params: params,
          config: config
        };
        output.time = utils.timestampToString();
        vueInstance.allOutputList.push(output);
        vueInstance.outputList.push(output);
      },
      clearOutput: function () {
        vueInstance.outputList = [];
      },
      showAllOutput: function () {
        vueInstance.outputList = vueInstance.allOutputList;
      },
      toJSON: function (data) {
        return utils.toJSON(data);
      },
      showJSONAlert: function(data) {
        RongIM.dialog.jsonAlert({
          data: data
        });
      },
      runAllApi: function() {
        if (vueInstance.runType === 'OneByOne') {
          runOneByOne();
        } else {
          runLineByLine();
        }
      },
      startDragging: function () {
        setTimeout(function() {
          vueInstance.isDragging = true;
        }, 100);
      }
    };
  }

  function getServiceMethods() {
    return {
      openUrl: utils.openUrl,
      reverse: utils.reverse,
      login: function(config) {
        var isEqualStorage = utils.isEqual(config, StorageConfig);
        var isEqualDefault = utils.isEqual(config, DefaultConfig);
        if (isStorageConfig && isEqualStorage && !isEqualDefault) {
          vueInstance.$Modal.confirm({
            title: '注意',
            content: '您目前使用的为上一次链接配置, 请确定配置是否可用 ?',
            onOk: function () {
              login(config);
            }
          });
        } else {
          login(config);
        }
      }
    };
  }


  Vue.use(iview);

  vueInstance = new Vue({
    el: '#app',
    data: function() {
      return {
        currentUserId: '',
        isLogged: false,
        readyApiQueue: DefailtReadyApiQueue,
        allOutputList: [],
        outputList: [],
        globalConfig: Config,
        RunType: RunType,
        runType: 'OneByOne',

        alertJSON: null,
        isDragging: false,
        isShowRunType: false,
        isShowOutList: false
      };
    },
    computed: {
      apiList: function() {
        return ApiList;
      },
      changeUserApi: function () {
        var self = this;
        var changeUserApi = RongIM.Api.changeUser;
        var changeUserEvent = changeUserApi.event;
        changeUserApi.event = function (token) {
          var globalConfig = self.globalConfig
          globalConfig.token = token;
          return Service.changeUser(globalConfig, {
            status: watchStatus,
            message: watchMessage
          }).then(function (userId) {
            loginSuccessEvent(userId, globalConfig);
          }).catch(function () {
            vueInstance.$Message.error({
              background: true,
              content: '切换用户失败 ' + error
            });
          });
        };
        return changeUserApi;
      },
      currentOutput: function() {
        var outputList = this.outputList;
        if (outputList.length) {
          return outputList[outputList.length - 1];
        }
      }
    },
    watch: {
    },
    components: {
      apiBtn: components.apiBtn,
      login: components.login,
      prettyjson: Vue.component('prettyjson', VueJsonPretty.default)
    },
    mounted: function() {
      this.isPageLoaded = true;
    },
    methods: utils.extend(getApiListMethods(), getServiceMethods())
  });

  RongIM.vueInstance = vueInstance;

})(window, {
  Vue: Vue,
  iview: iview,
  VueJsonPretty: VueJsonPretty,
  RongIM: RongIM
}, window.RongIM.components);