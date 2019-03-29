(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.ScreenShare = factory(global));
})(window, function (win) {
  'use strict';
  var Keys = {
    CHECK: 'rong-check-share-installed',
    CHECK_RESPONSE: 'rong-share-installed',
    GET: 'rong-share-get',
    GET_RESPONSE: 'rong-share-get-response',
    CLEAR_BOX: 'rong-share-clear-box'
  };

  var Reason = {
    PLUGIN_NOT_INSTALLED: 'Plugin not installed'
  };

  var ShareProfile = {
    width: 1280,
    height: 720,
    frameRate: 15
  };

  var checkTimeout = 1500;

  var sendToPlugin = function (key) {
    win.postMessage({
      type: key
    });
  };

  var addListener = function (event) {
    win.addEventListener('message', event);
  };

  var removeListenr = function (event) {
    win.removeEventListener('message', event);
  };

  var clearTimeoutAndListenr = function (timeout, listener) {
    listener && removeListenr(listener);
    timeout && clearTimeout(timeout);
  };

  var check = function (callback) {
    var timeout, checkCallback;
    checkCallback = function (data) {
      var data = data.data || {};
      var type = data.type;
      if (type === Keys.CHECK_RESPONSE) {
        callback && callback(null);
        clearTimeoutAndListenr(timeout, checkCallback);
      }
    };
    timeout = setTimeout(function () {
      callback && callback(Reason.PLUGIN_NOT_INSTALLED);
      clearTimeoutAndListenr(timeout, checkCallback);
    }, checkTimeout);
    addListener(checkCallback);
    sendToPlugin(Keys.CHECK);
  };

  var get = function (callback) {
    var getCallback = function (data) {
      var data = data.data || {};
      var type = data.type;
      if (type === Keys.GET_RESPONSE) {
        var sourceId = data.sourceId;
        callback && callback(sourceId)
        removeListenr(getCallback);
      }
    };
    check(function (error) {
      if (error) {
        console.error(error);
        return;
      }
      addListener(getCallback);
      sendToPlugin(Keys.GET);
    })
  };

  var clear = function () {
    sendToPlugin(Keys.CLEAR_BOX);
  };

  return {
    check,
    get,
    clear
  };
});