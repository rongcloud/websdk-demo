(function (global, factory) {
  if (typeof exports === 'object' && module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory);
  } else {
    global.RongCall = global.RongCall || {};
    global.RongCall.setting = factory();
  }
})(this, function () {

  var ENUM = {};

  ENUM.Events = {
    INVITE: 'invite',
    ACCEPT: 'accept',
    HUNGUP: 'hungup',
    MEDIA_MODIFY: 'media_modify',
    MEMBER_MODIFY: 'member_modify',

    RTC_ADDED: 'added',
    RTC_REMOVED: 'removed',
    RTC_LEAVE: 'leave'
  };

  return {
    appkey: 'appkey',
    navi: '',
    server: 'http://localhost:9929',

    ENUM: ENUM
  };
});