(function (dependencies) {
  var RongIM = dependencies.RongIM,
    win = dependencies.win,
    RongIMLib = win.RongIMLib,
    RongIMClient = RongIMLib.RongIMClient,
    ErrorCode = RongIMLib.ErrorCode,
    utils = RongIM.utils;

  var ChrmJoinedDomId = 'chrmJoined',
    ChrmJoiningDomId = 'chrmJoining',
    ChrmTipDomId = 'chrmTips',
    ChrmSetDomId = 'chrmSetDialog',
    ChrmLoadingDomId = 'chrmLoading';
    ChrmTipsClearDomId = 'chrmTipsClear';

  var ChrmSetKeyDomId = 'chrmKey',
    ChrmSetValueDomId = 'chrmValue', ChrmSetValueBoxDomId = 'chrmSetValueBox', 
    ChrmSetExtraDomId = 'chrmExtra', ChrmSetExtraBoxDomId = 'chrmSetExtraBox',
    ChrmSetDeleteDomId = 'chrmDelete', ChrmSetDeleteBoxDomId = 'chrmSetDeleteBox',
    ChrmSetSendDomId = 'chrmSend', ChrmSetSendBoxDomId = 'chrmSetSendBox';

  var waitingFunc, joinedChatroomId;
  
  function getLoginUser() {
    var index = location.search.substring(1);
    return win.setting.userList[index];
  }

  function getChatRoomId(index) {
    return win.setting.chatRoomIdList[index];
  }

  function showJoined() {
    utils.showDom(ChrmJoinedDomId);
    utils.hideDom(ChrmJoiningDomId);
  }

  function clearChrmSetDialogStatus() {
    var clearDomIds = [ChrmSetKeyDomId, ChrmSetValueDomId, ChrmSetExtraDomId, ChrmSetDeleteDomId, ChrmSetSendDomId];
    var boxIds = [ChrmSetValueBoxDomId, ChrmSetExtraBoxDomId, ChrmSetDeleteBoxDomId, ChrmSetSendBoxDomId];
    utils.forEach(clearDomIds, function (domId) {
      var dom = utils.getDom(domId);
      dom.value = '';
      dom.checked = false;
    });
    utils.forEach(boxIds, function (domId) {
      utils.showDom(domId);
    });
  }

  function showChrmSetDialog(hideIds, waitingFuncName) {
    utils.showDom(ChrmSetDomId);
    utils.forEach(hideIds, function (domId) {
      utils.hideDom(domId);
    });
    waitingFunc = waitingFuncName;
  }

  function hideChrmSetDialog() {
    clearChrmSetDialogStatus();
    utils.hideDom(ChrmSetDomId);
    waitingFunc = null;
  }

  function showTips(data) {
    var dom = document.getElementById(ChrmTipDomId);
    var time = utils.formatDate(new Date());
    dom.innerHTML += '<li>' + time + ':  ' + data + '</li>';
  }

  function clearTips() {
    var dom = document.getElementById(ChrmTipDomId);
    dom.innerHTML = '';
  }

  function showSendWSTips(data) {
    data = JSON.stringify(data);
    var dom = document.getElementById('chrmWSTips');
    var time = utils.formatDate(new Date());
    dom.innerHTML += '<li>' + time + ':  SendMsg: ' + data + '</li>';
  }
  window.showSendWSTips = showSendWSTips;

  function showReceiveWSTips(data) {
    data = JSON.stringify(data);
    var dom = document.getElementById('chrmWSTips');
    var time = utils.formatDate(new Date());
    dom.innerHTML += '<li>' + time + ':  ReceiveMsg: ' + data + '</li>';
  }
  window.showReceiveWSTips = showReceiveWSTips;

  function showLoading() {
    utils.showDom(ChrmLoadingDomId);
  }

  function hideLoading() {
    utils.hideDom(ChrmLoadingDomId);
  }

  function joinChatRoom(index) {
    chatRoomId = getChatRoomId(index);
    showLoading();
    RongIMClient.getInstance().joinChatRoom(chatRoomId, 50, {
      onSuccess: function () {
        hideLoading();
        showTips('加入聊天室 ' + chatRoomId + ' 成功');
        showJoined();
        joinedChatroomId = chatRoomId;
      },
      onError: function (error) {
        showTips('加入聊天室失败' + error + ' ' + ErrorCode[error]);
      }
    });
  }

  function getChrmSetParams() {
    return {
      key: utils.getInputValue(ChrmSetKeyDomId),
      value: utils.getInputValue(ChrmSetValueDomId),
      notificationExtra: utils.getInputValue(ChrmSetExtraDomId),
      isAutoDelete: utils.getCheckValue(ChrmSetDeleteDomId),
      isSendNotification: utils.getCheckValue(ChrmSetSendDomId)
    };
  }

  function setChatroomEntry(params) {
    params = params || getChrmSetParams();
    RongIMClient.getInstance().setChatroomEntry(joinedChatroomId, params, {
      onSuccess: function () {
        showTips('设置 kv 成功 ' + utils.toString(params));
      },
      onError: function (error) {
        showTips('设置 kv 失败 ' + error + ' ' + ErrorCode[error]);
      }
    });
  }

  function setChatroomEntryForce() {
    var params = getChrmSetParams();
    params = params || getChrmSetParams();
    RongIMClient.getInstance().forceSetChatroomEntry(joinedChatroomId, params, {
      onSuccess: function () {
        showTips('强制设置 kv 成功 ' + utils.toString(params));
      },
      onError: function (error) {
        showTips('强制设置 kv 失败 ' + error + ' ' + ErrorCode[error]);
      }
    });
  }

  function removeChatroomEntry(params) {
    params = params || getChrmSetParams();
    RongIMClient.getInstance().removeChatroomEntry(joinedChatroomId, params, {
      onSuccess: function () {
        showTips('删除 kv 成功 ' + utils.toString(params));
      },
      onError: function (error) {
        showTips('删除 kv 失败 ' + error + ' ' + ErrorCode[error]);
      }
    });
  }

  function removeChatroomEntryForce(params) {
    params = params || getChrmSetParams();
    RongIMClient.getInstance().forceRemoveChatroomEntry(joinedChatroomId, params, {
      onSuccess: function () {
        showTips('强制删除 kv 成功 ' + utils.toString(params));
      },
      onError: function (error) {
        showTips('强制删除 kv 失败 ' + error + ' ' + ErrorCode[error]);
      }
    });
  }

  function getChatroomEntry() {
    var params = getChrmSetParams();
    RongIMClient.getInstance().getChatroomEntry(joinedChatroomId, params.key, {
      onSuccess: function (value) {
        showTips('获取' + params.key + ' 的 value 成功 ' + value);
      },
      onError: function (error) {
        showTips('获取 value 失败 ' + error + ' ' + ErrorCode[error]);
      }
    });
  }

  function getAllChatroomEntry() {
    var params = getChrmSetParams();
    RongIMClient.getInstance().getAllChatroomEntries(joinedChatroomId, {
      onSuccess: function (items) {
        showTips('获取所有 kv:' + JSON.stringify(items));
      },
      onError: function (error) {
        showTips('获取所有 kv 失败: ' + error);
      }
    });
  }

  function quitChatroom() {
    RongIMClient.getInstance().quitChatRoom(joinedChatroomId, {
      onSuccess: function() {
        alert('退出' + joinedChatroomId + '成功');
        window.location.reload();
      },
      onError: function(error) {
        alert('退出失败' + error);
      }
    })
  }

  function confirmSetChrm() {
    waitingFunc & RongIM.main[waitingFunc]();
    hideChrmSetDialog();
  }

  showLoading();
  window.setting.token = getLoginUser().token;
  RongIM.init(window.setting, {
    connected: function (errorCode, userId) {
      if (errorCode) {
        showTips('链接失败 ' + errorCode);
      } else {
        showTips('链接成功 ' + userId);
      }
      hideLoading();
    },
    receiveMessages: function (message) {
      showTips('收到消息 ' + utils.toString(message));
    }
  });
  utils.getDom(ChrmTipsClearDomId).onclick = clearTips;

  RongIM.main = {
    hideChrmSetDialog: hideChrmSetDialog,
    showChrmSetDialog: showChrmSetDialog,
    joinChatRoom: joinChatRoom,
    confirmSetChrm: confirmSetChrm,
    
    setChatroomEntry: setChatroomEntry,
    setChatroomEntryForce: setChatroomEntryForce,
    removeChatroomEntry: removeChatroomEntry,
    removeChatroomEntryForce: removeChatroomEntryForce,
    getChatroomEntry: getChatroomEntry,
    getAllChatroomEntry: getAllChatroomEntry,
    quitChatroom: quitChatroom
  };

})({
  win: window,
  RongIM: window.RongIM
});