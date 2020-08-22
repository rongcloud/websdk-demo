(function (win, dependencies, components) {
  var Vue = dependencies.Vue,
    iview = dependencies.iview,
    VueJsonPretty = dependencies.VueJsonPretty,
    RongIM = dependencies.RongIM,
    Service = RongIM.Service,
    utils = RongIM.Utils,
    ApiList = RongIM.ApiList,
    DefailtReadyApiQueue = RongIM.DefailtReadyApiQueue,
    DefaultConfig = RongIM.config.im,
    Config = utils.copy(DefaultConfig),
    Storage = utils.Storage,
    StorageConfig = Storage.get(Storage.ConfigKey),
    DefaultTargetId = Config.targetId,
    isDebug = RongIM.config.isDebug,
    debugConf = RongIM.config.debugConf;

  DefailtReadyApiQueue.push([]);

  var ValidStatus = [0, 1, 2, 6, 201, 202];
  var ValidErrorCode = [23424, 23427, 23426, 23423];
  var isStop = false;

  var isStorageConfig = false;
  if (StorageConfig && !isDebug) {
    isStorageConfig = true;
    Config = utils.copy(StorageConfig);
  }
  var urlQueryConfig = utils.getRCUrlQuery();
  Config = utils.extend(Config, urlQueryConfig);

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

  function runAllApi(allRefs, currentIndex, finishCallback) {
    var total = allRefs.length;
    var isFinished = total === currentIndex || isStop;
    if (isFinished) {
      return finishCallback && finishCallback();
    }
    var refList = allRefs[currentIndex];
    var deferArr = [];
    utils.forEach(refList, function (instance) {
      deferArr.push(instance.run());
    });
    return utils.Defer.all(deferArr).then(function (result) {
      result = result[0];
      var isSuccess = result.isSuccess || ValidErrorCode.indexOf(result.data.result) !== -1;
      if (isSuccess) {
        vueInstance.runInfo.successApiCount++;
      } else {
        vueInstance.runInfo.failApiList.push(result.data);
      }
      currentIndex++;
      runAllApi(allRefs, currentIndex, finishCallback);
    });
  }

  function runOneByOne(finishCallback) {
    var refs = vueInstance.$refs;
    var allRefs = [];
    utils.forEach(refs, function (subRefList) {
      utils.forEach(subRefList, function (ref) {
        allRefs.push([ ref ]);
      });
    });
    runAllApi(allRefs, 0, finishCallback);
  }

  function runLineByLine(finishCallback) {
    var refs = vueInstance.$refs;
    var allRefs = [];
    utils.forEach(refs, function (ins) {
      allRefs.push(ins);
    });
    runAllApi(allRefs, 0, finishCallback);
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
    var output = vueInstance.addOutput(title, status, 0, [], {
      color: utils.TypeColor.STATUS
    });
    if (ValidStatus.indexOf(status) === -1) {
      vueInstance.runInfo.failApiList.push(output);
    }
    var isSuccess = utils.SuccessStatus.indexOf(status) !== -1;
    var event = isSuccess ? vueInstance.$Message.success : vueInstance.$Message.error;
    event.call(vueInstance.$Message, {
      background: true,
      content: title
    });
  }

  function watchMessage(message) {
    if (RongIM.config.isDebug && !RongIM.config.debugConf.isShowMsg) {
      return;
    }
    var title = utils.tplEngine(ReceiveMsgTextTpl, {
      typeName: utils.ConversationName[message.type],
      conversationType: message.type,
      senderUserId: message.senderUserId
    });
    vueInstance.addOutput(title, message, 0, [], {
      color: utils.TypeColor.MSG
    });
    console.log('Reveice Msg', utils.toJSON(message));
  }

  function watchChatroom(entries) {
    vueInstance.addOutput('监听到聊天室 KV 更新', entries, 0, [], {
      color: utils.TypeColor.MSG
    });
  }

  function autoRun() {
    Vue.nextTick(function () {
      runOneByOne(function () {
        vueInstance.runInfo.runCount++;
        localStorage.removeItem('rong_servers');
        localStorage.removeItem('rong_fullnavi');
        vueInstance.outputList = [];
        vueInstance.allOutputList = [];
        !isStop && autoRun();
      });
    });
  }

  function loginSuccessEvent(userId, config) {
    vueInstance.$Message.success({
      background: true,
      content: '链接成功 ' + userId
    });
    vueInstance.currentUserId = userId;
    vueInstance.isLogged = true;
    if (isDebug && debugConf.autoRun) {
      Vue.nextTick(autoRun);
    }
  }

  function login(config) {
    setConfig(config);
    return Service.init(config, {
      status: watchStatus,
      message: watchMessage,
      chatroom: watchChatroom
    }).then(function ({ id }) {
      Storage.set(Storage.ConfigKey, config);
      loginSuccessEvent(id, config);
    }).catch(function (error) {
      console.log(error);
      vueInstance.$Message.error({
        background: true,
        content: '链接失败 ' + JSON.stringify(error)
      });
      return utils.Defer.reject();
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
        return output;
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
        if (isStorageConfig && isEqualStorage && !isEqualDefault && !isDebug) {
          vueInstance.$Modal.confirm({
            title: '注意',
            content: '您目前使用的为上一次链接配置, 请确定配置是否可用 ?',
            onOk: function () {
              login(config);
            }
          });
        } else {
          return login(config);
        }
      },
      alarm: function () {
        if (!this.isAlarmMuted) {
          vueInstance.$refs.alarm.play();
        }
      },
      mute: function () {
        vueInstance.$refs.alarm.pause();
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
        isShowOutList: false,

        isDebug: RongIM.config.isDebug,
        runInfo: {
          runCount: 0,
          successApiCount: 0,
          failApiList: []
        },
        isAlarmMuted: false
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
      },
      displayedOutputList: function () {
        if (isDebug) {
          return this.runInfo.failApiList;
        } else {
          return this.outputList;
        }
      }
    },
    watch: {
      'runInfo.failApiList': function (newList) {
        if (newList.length > 20) {
          this.alarm();
        }
      },
      isAlarmMuted: function (isMuted) {
        if (isMuted) {
          this.mute();
        }
      }
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

  (function () {
    function start() {
      isStop = false;
      if (vueInstance.isLogged) {
        autoRun();
      } else {
        vueInstance.login(vueInstance.globalConfig).then(autoRun);
      }
    }
    window.addEventListener("message", function (event) {
      var type = event.data;
      if (type === 'start') {
        start();
      } else if (type === 'pause') {
        isStop = true;
      }
    }, false);
  })();

})(window, {
  Vue: Vue,
  iview: iview,
  VueJsonPretty: VueJsonPretty,
  RongIM: RongIM
}, window.RongIM.components);