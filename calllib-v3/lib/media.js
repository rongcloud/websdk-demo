(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.RongMedia = factory(global));
})(window, function (win) {
  'use strict';
  var mediaDevices = win.navigator.mediaDevices;

  var isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  var noop = function () {};

  var DeviceKinds = {
    audio: {
      input: 'audioinput',
      output: 'audiooutput'
    },
    video: {
      input: 'videoinput'
    }
  };

  /**
   * 结果为:
   * {
   *    audioinput: [ audio, input ],
   *    audiooutput: [ audio, output ],
   *    videoinput: [ video, input ]
   * }
   */
  var kindMapDeviceKeys = (function () {
    var keys = {};
    for (var deviceName in DeviceKinds) {
      var deviceInfo = DeviceKinds[deviceName];
      if (isObject(deviceInfo)) {
        for (var type in deviceInfo) {
          var kind = deviceInfo[type];
          keys[kind] = [deviceName, type ];
        }
      }
    }
    return keys;
  })();

  function formatDevices(deviceList) {
    var formatedDevices = {
      audio: {
        input: [],
        output: []
      },
      video: {
        input: []
      }
    };
    deviceList.forEach(function (device) {
      var kind = device.kind;
      var keys = kindMapDeviceKeys[kind];
      formatedDevices[keys[0]][keys[1]].push(device);
    });
    return formatedDevices;
  }

  var get = function (option) {
    return mediaDevices.getUserMedia(option);
  };

  var getDeviceList = function (callback) {
    callback = callback || noop;
    return new Promise(function (resolve, reject) {
      mediaDevices.enumerateDevices().then(function (deviceList) {
        var deviceInfos = formatDevices(deviceList);
        callback(null, deviceInfos);
        resolve(deviceInfos);
      }).catch(function (error) {
        callback(error);
        reject(error);
      });
    });
  };

  var checkDevice = function (callback) {
    callback = callback || noop;
    var check = function (deviceInfos) {
      var devicesState = {};
      for (var deviceName in deviceInfos) {
        devicesState[deviceName] = {};
        var types = deviceInfos[deviceName];
        for (var type in types) {
          var deviceList = types[type] || [];
          devicesState[deviceName][type] = !!deviceList.length;
        }
      }
      return devicesState;
    };
    return new Promise(function (resolve, reject) {
      getDeviceList().then(function (deviceInfos) {
        var devicesState = check(deviceInfos);
        callback(null, devicesState);
        resolve(devicesState);
      }, function (error) {
        callback(error);
        reject(error);
      });
    });
  };

  return {
    get: get,
    Device: {
      check: checkDevice,
      getList: getDeviceList
    }
  };
});