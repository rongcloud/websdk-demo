(function (RongCall, dependencies) {
  /* 通话逻辑 */

  var win = dependencies.win,
    Vue = win.Vue,
    RongIMLib = win.RongIMLib,
    RongCallLib = win.RongCallLib,
    RongIMClient = RongIMLib.RongIMClient,
    utils = RongCall.utils,
    EventEmitter = utils.EventEmitter;

  var toast = utils.toast,
    dialog = RongCall.dialog,
    ConversationType = RongIMLib.ConversationType,
    MediaType = RongIMLib.VoIPMediaType;

  // 通话阶段
  var CallStep = {
    READY_TO_CALL: 1, // 准备拨打(最初状态)
    INVITED_TO_ANSWER: 2, // 被邀请接听, 其他人拨打, 己方选择接听或拒绝
    CALLING: 3 // 拨打中
  };

  var CallName = {};
  CallName[MediaType.MEDIA_AUDIO] = '语音';
  CallName[MediaType.MEDIA_VEDIO] = '视频';

  // 将消息转化为调用 CallLib 需要参数
  function messageToCallInfo(message) {
    return {
      conversationType: message.conversationType,
      targetId: message.targetId,
      mediaType: message.content.mediaType
    };
  }
  
  // 获取挂断原因
  function getHungupReason(reason, message) {
    var reasonPrompt;
    var senderUserId = message.senderUserId;
    switch(reason) {
    case 8:
      reasonPrompt = '其他设备已处理';
      break;
    case 11:
      reasonPrompt = senderUserId + '已取消';
      break;
    case 12:
      reasonPrompt = senderUserId + '已拒绝';
      break;
    case 13:
      reasonPrompt = senderUserId + '已挂断';
      break;
    case 14:
      reasonPrompt = senderUserId + '忙碌中';
      break;
    case 15:
      reasonPrompt = senderUserId + '未接听';
      break;
    default:
      reasonPrompt = '未知原因挂断';
    }
    return reasonPrompt;
  }

  // 己方挂断后的提示
  function getSummaryText(status, message) {
    var senderUserId = message.senderUserId;
    var text;
    switch(status) {
    case 1:
      text = '己方已取消';
      break;
    case 2:
      text = '己方已拒绝';
      break;
    case 3:
      text = '己方挂断';
      break;
    case 4:
      text = '收到' + senderUserId + '的音视频邀请, 但己方忙碌中, 不处理';
      break;
    case 5:
      text = '己方未接听';
      break;
    case 7:
      text = '己方网络错误';
      break;
    default:
      text = '未知原因';
    }
    return text;
  }

  function mediaTypeToTalkType(mediaType) {
    return mediaType === MediaType.MEDIA_AUDIO ? 0 : 1;
  }

  var InviteTpl = '{senderUserId} 邀请您进行 {mediaType} 通话{type}';
  var commandEvents = {
    // 监听其他人邀请自己
    InviteMessage: function (message, context) {
      var conversationType = message.conversationType === ConversationType.PRIVATE ? '单聊' : '群聊';
      toast(utils.tplEngine(InviteTpl, {
        senderUserId: message.senderUserId,
        mediaType: CallName[message.content.mediaType],
        type: conversationType
      }));
      context.callInfo = messageToCallInfo(message);
      context.callStep = CallStep.INVITED_TO_ANSWER;
    },
    MemberModifyMessage: function (message, context) {
      if (message.content.inviteUserIds.indexOf(context.selfUserId) !== -1) {
        var conversationType = message.conversationType === ConversationType.PRIVATE ? '单聊' : '群聊';
        toast(utils.tplEngine(InviteTpl, {
          senderUserId: message.senderUserId,
          mediaType: CallName[message.content.mediaType],
          type: conversationType
        }));
        context.callInfo = messageToCallInfo(message);
        context.callStep = CallStep.INVITED_TO_ANSWER;
      }
    },
    HungupMessage: function (message) {
      var reason = getHungupReason(message.content.reason, message);
      toast(reason);
    },
    MediaModifyMessage: function (message, context) {
      var senderUserId = message.senderUserId,
        mediaType = message.content.mediaType;
      context.userList.forEach(function (user) {
        if (user.userId === senderUserId) {
          user.talkType = mediaTypeToTalkType(mediaType);
        }
      });
    },
    SummaryMessage: function (message, context) {
      var status = message.content.status;
      var promptText = getSummaryText(status, message);
      if (context.callStep === CallStep.CALLING) {
        toast(promptText);
      }
      if (status === 5 || status === 7) { // 自己未接听|自己网络错误, 回到初始状态
        context.callStep = CallStep.READY_TO_CALL;
      }
    }
  };

  var videoChangedEvents = {
    added: function (detail, context) {
      context.userList.push(detail);
    },
    removed: function (detail, context) {
      context.userList = utils.removeArray(detail, context.userList, 'userId');
    },
    leave: function (detail, context) {
      context.userList = [];
    }
  };

  function getMembers(currentUserList, selfUserId) {
    return utils.getMembers().then(function (members) {
      members = members.filter(function (user) {
        var currentUserIds = currentUserList.map(function (user) {
          return user.id || user.userId;
        });
        return user.id !== selfUserId && currentUserIds.indexOf(user.id) === -1;
      });
      return RongCall.Promise.resolve(members);
    });
  }

  function call(callParams) {
    var context = this;
    RongCallLib.call(callParams, function (error) {
      // 置为通话中状态
      context.callStep = error ? context.callStep : CallStep.CALLING;
    });
    context.callInfo = callParams;
  }

  function accept() {
    var context = this;
    var callInfo = context.callInfo; // callInfo 在监听到 InviteMessage 时赋值, 格式见 messageToCallInfo 方法
    RongCallLib.accept(callInfo, function (error) {
      // 置为通话中状态
      context.callStep = error ? context.callStep : CallStep.CALLING;
    });
  }

  function invite() {
    var context = this;
    var callInfo = context.callInfo,
      inviteParams = {
        conversationType: ConversationType.GROUP,
        targetId: callInfo.targetId,
        inviteUserIds: [],
        mediaType: callInfo.mediaType
      };
    var inviteUserIds = win.prompt('请输入被邀请人 id(id 间用 , 分割): ');
    inviteUserIds = inviteUserIds.split(',');
    inviteUserIds = inviteUserIds.map(function (userId) {
      return userId.replace(/\s/g, '');
    });
    inviteParams.inviteUserIds = inviteUserIds;
    RongCallLib.invite(inviteParams);
    // getMembers(context.userList, context.selfUserId).then(function (members) {
    //   dialog.selectUser({
    //     userList: members,
    //     confirmed: function (selectedUserList) {
    //       var selectedIds = selectedUserList.map(function (user) {
    //         return user.id;
    //       });
    //       inviteParams.inviteUserIds = selectedIds;
    //       RongCallLib.invite(inviteParams);
    //     }
    //   });
    // }).catch(function () {
    //   toast('获取群组成员失败');
    // });
  }

  function reject() {
    var context = this;
    var callInfo = context.callInfo; // callInfo 在监听到 InviteMessage 时赋值, 格式见 messageToCallInfo 方法
    RongCallLib.reject(callInfo, function (error) {
      // 置为最初的准备拨打状态
      context.callStep = error ? context.callStep : CallStep.READY_TO_CALL;
    });
  }

  function hungup() {
    var context = this;
    // clearTimeout(context.hungupTimeout);
    var callInfo = context.callInfo;
    context.callStep = CallStep.READY_TO_CALL;
    RongCallLib.hungup(callInfo, function (error) {
      console.log('hungup result', error);
    });
  }

  function mute() {
    var isMuted = this.isMuted;
    var event = isMuted ? RongCallLib.unmute : RongCallLib.mute;
    event();
    this.isMuted = !isMuted;
  }

  function setVideo() {
    var callInfo = this.callInfo,
      mediaType = callInfo.mediaType;
    var event = mediaType === MediaType.MEDIA_AUDIO ? RongCallLib.audioToVideo : RongCallLib.videoToAudio;
    event();
    this.callInfo.mediaType = mediaType === MediaType.MEDIA_AUDIO ? MediaType.MEDIA_VEDIO : MediaType.MEDIA_AUDIO;
  }

  RongCall.call = Vue.component('call', {
    template: '#rong-template-call',
    data: function () {
      return {
        userList: [],
        callStep: CallStep.READY_TO_CALL,
        callType: ConversationType.PRIVATE, // 通话类型, 默认为单聊
        /**
         * 通话信息. 给 callInfo 赋值的地方有:
         * 1. 发送 call 成功后, 存储当前通话信息
         * 2. 接收到 InviteMessage 后, 存储通话信息
         */
        callInfo: {},
        isMuted: false,
        isNetworkValid: true,
        hungupTimeout: null
      };
    },
    directives: {
      video: function (el, binding) {
        var user = binding.value;
        var video = user.data;
        el.appendChild(video);
        video.play();
      }
    },
    computed: {
      CallStep: function () {
        return CallStep;
      },
      // 大窗口用户
      maxUser: function () {
        var context = this;
        var maxUser;
        context.userList.forEach(function (user) {
          if (user.userId === context.selfUserId) {
            maxUser = user;
          }
        });
        if (maxUser) {
          maxUser.talkType = mediaTypeToTalkType(context.callInfo.mediaType);
        }
        return maxUser;
      },
      // 小窗口用户列表
      minUserList: function () {
        var context = this,
          maxUser = context.maxUser || {};
        return context.userList.filter(function (user) {
          return user.userId !== maxUser.userId;
        });
      },
      selfUserId: function () {
        return this.$route.params.userId;
      },
      engineStyle: function () {
        var isCallling = this.callStep === CallStep.CALLING;
        return {
          opacity: isCallling ? 1 : 0
        }
      }
    },
    methods: {
      /**
       * @param {boolean} isOnlyAudio 是否仅以音频发起
       */
      startCall: function (isOnlyAudio) {
        var mediaType = isOnlyAudio ? MediaType.MEDIA_AUDIO : MediaType.MEDIA_VEDIO;
        if (this.callType == ConversationType.GROUP) {
          this.startGroupCall(mediaType);
        } else {
          this.startPrivateCall(mediaType);
        }
      },
      startPrivateCall: function (mediaType) {
        var targetId = win.prompt('请输入接收者 id:');
        if (targetId === this.selfUserId) {
          return alert('不可呼叫自己');
        }
        if (targetId == undefined || targetId === 'undefined') {
          return alert('请填写正确的接收者 id');
        }
        var callParams = {
          conversationType: ConversationType.PRIVATE,
          targetId: targetId,
          inviteUserIds: [targetId],
          mediaType: mediaType
        };
        targetId && this.call(callParams);
      },
      startGroupCall: function (mediaType) {
        var context = this;
        var params = context.$route.params,
          groupId = params.groupId;

        var callParams = {
          conversationType: ConversationType.GROUP,
          targetId: groupId,
          inviteUserIds: [],
          mediaType: mediaType
        };
        // groupId = win.prompt('请输入群组 id: ') || groupId;
        var inviteUserIds = win.prompt('请输入被邀请人 id(id 间用 , 分割): ');
        inviteUserIds = inviteUserIds.split(',');
        inviteUserIds = inviteUserIds.map(function (userId) {
          return userId.replace(/\s/g, '');
        });
        callParams.inviteUserIds = inviteUserIds;
        context.call(callParams);
      },
      call: call,
      accept: accept,
      invite: invite,
      reject: reject,
      hungup: hungup,
      mute: mute,
      setVideo: setVideo
    },
    mounted: function () {
      var context = this;
      // window.testContext = context;

      EventEmitter.on('NetworkError', function () {
        if (context.isNetworkValid) {
          context.isNetworkValid = false;
          toast('网络已断开');
          context.hungup();
        }
      });
      EventEmitter.on('NetworkReconnect', function () {
        context.isNetworkValid = true;
        // clearTimeout(context.hungupTimeout);
        if (context.callStep === CallStep.READY_TO_CALL) {
          context.hungup();
        }
      });

      // 初始化
      RongCallLib = RongCall.initCallLib(context.selfUserId);

      // 注册命令(消息)监听
      RongCallLib.commandWatch(function (message) {
        var event = commandEvents[message.messageType];
        event && event(message, context);
        console.log('received message', message);
      });

      // 注册音视频节点监听
      RongCallLib.videoWatch(function (result) {
        var event = videoChangedEvents[result.type];
        event && event(result, context);
        console.log('video changed', result);
      });
    }
  });

})(window.RongCall, {
  win: window
});