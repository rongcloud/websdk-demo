/*
* RongRTC.js v3.0.4
* Copyright 2019 RongCloud
* Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RongRTC = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*!
   基于 es6-promise
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
   * @version   v4.2.8+1e68dce6
   */

  function objectOrFunction(x) {
    var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
    return x !== null && (type === 'object' || type === 'function');
  }

  function isFunction(x) {
    return typeof x === 'function';
  }

  var _isArray = void 0;
  if (Array.isArray) {
    _isArray = Array.isArray;
  } else {
    _isArray = function _isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  }

  var isArray = _isArray;

  var len = 0;
  var vertxNext = void 0;
  var customSchedulerFn = void 0;

  var asap = function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 2, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      if (customSchedulerFn) {
        customSchedulerFn(flush);
      } else {
        scheduleFlush();
      }
    }
  };

  function setScheduler(scheduleFn) {
    customSchedulerFn = scheduleFn;
  }

  function setAsap(asapFn) {
    asap = asapFn;
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // see https://github.com/cujojs/when/issues/410 for details
    return function () {
      return process.nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }

    return useSetTimeout();
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    // Store setTimeout reference so es6-promise will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var globalSetTimeout = setTimeout;
    return function () {
      return globalSetTimeout(flush, 1);
    };
  }

  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];

      callback(arg);

      queue[i] = undefined;
      queue[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertx() {
    try {
      var vertx = Function('return this')().require('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush = void 0;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && typeof require === 'function') {
    scheduleFlush = attemptVertx();
  } else {
    scheduleFlush = useSetTimeout();
  }

  function then(onFulfillment, onRejection) {
    var parent = this;

    var child = new this.constructor(noop);

    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
    }

    var _state = parent._state;

    if (_state) {
      var callback = arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    } else {
      subscribe(parent, child, onFulfillment, onRejection);
    }

    return child;
  }

  /**
   
    @method resolve
    @static
    @param {Any} value value that the returned promise will be resolved with
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$1(object) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop);
    resolve(promise, object);
    return promise;
  }

  var PROMISE_ID = Math.random().toString(36).substring(2);

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  function selfFulfillment() {
    return new TypeError("You cannot resolve a promise with itself");
  }

  function cannotReturnOwn() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
    try {
      then$$1.call(value, fulfillmentHandler, rejectionHandler);
    } catch (e) {
      return e;
    }
  }

  function handleForeignThenable(promise, thenable, then$$1) {
    asap(function (promise) {
      var sealed = false;
      var error = tryThen(then$$1, thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable !== value) {
          resolve(promise, value);
        } else {
          fulfill(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && error) {
        sealed = true;
        reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        return resolve(promise, value);
      }, function (reason) {
        return reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$1) {
    if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
      handleOwnThenable(promise, maybeThenable);
    } else {
      if (then$$1 === undefined) {
        fulfill(promise, maybeThenable);
      } else if (isFunction(then$$1)) {
        handleForeignThenable(promise, maybeThenable, then$$1);
      } else {
        fulfill(promise, maybeThenable);
      }
    }
  }

  function resolve(promise, value) {
    if (promise === value) {
      reject(promise, selfFulfillment());
    } else if (objectOrFunction(value)) {
      var then$$1 = void 0;
      try {
        then$$1 = value.then;
      } catch (error) {
        reject(promise, error);
        return;
      }
      handleMaybeThenable(promise, value, then$$1);
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onerror) {
      promise._onerror(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length !== 0) {
      asap(publish, promise);
    }
  }

  function reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;

    asap(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var _subscribers = parent._subscribers;
    var length = _subscribers.length;

    parent._onerror = null;

    _subscribers[length] = child;
    _subscribers[length + FULFILLED] = onFulfillment;
    _subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      asap(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (subscribers.length === 0) {
      return;
    }

    var child = void 0,
        callback = void 0,
        detail = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, detail);
      } else {
        callback(detail);
      }
    }

    promise._subscribers.length = 0;
  }

  function invokeCallback(settled, promise, callback, detail) {
    var hasCallback = isFunction(callback),
        value = void 0,
        error = void 0,
        succeeded = true;

    if (hasCallback) {
      try {
        value = callback(detail);
      } catch (e) {
        succeeded = false;
        error = e;
      }

      if (promise === value) {
        reject(promise, cannotReturnOwn());
        return;
      }
    } else {
      value = detail;
    }

    if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (succeeded === false) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    try {
      resolver(function resolvePromise(value) {
        resolve(promise, value);
      }, function rejectPromise(reason) {
        reject(promise, reason);
      });
    } catch (e) {
      reject(promise, e);
    }
  }

  var id = 0;
  function nextId() {
    return id++;
  }

  function makePromise(promise) {
    promise[PROMISE_ID] = id++;
    promise._state = undefined;
    promise._result = undefined;
    promise._subscribers = [];
  }

  function validationError() {
    return new Error('Array Methods must be provided an Array');
  }

  var Enumerator = function () {
    function Enumerator(Constructor, input) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(noop);

      if (!this.promise[PROMISE_ID]) {
        makePromise(this.promise);
      }

      if (isArray(input)) {
        this.length = input.length;
        this._remaining = input.length;

        this._result = new Array(this.length);

        if (this.length === 0) {
          fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate(input);
          if (this._remaining === 0) {
            fulfill(this.promise, this._result);
          }
        }
      } else {
        reject(this.promise, validationError());
      }
    }

    Enumerator.prototype._enumerate = function _enumerate(input) {
      for (var i = 0; this._state === PENDING && i < input.length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
      var c = this._instanceConstructor;
      var resolve$$1 = c.resolve;

      if (resolve$$1 === resolve$1) {
        var _then = void 0;
        var error = void 0;
        var didError = false;
        try {
          _then = entry.then;
        } catch (e) {
          didError = true;
          error = e;
        }

        if (_then === then && entry._state !== PENDING) {
          this._settledAt(entry._state, i, entry._result);
        } else if (typeof _then !== 'function') {
          this._remaining--;
          this._result[i] = entry;
        } else if (c === Promise$1) {
          var promise = new c(noop);
          if (didError) {
            reject(promise, error);
          } else {
            handleMaybeThenable(promise, entry, _then);
          }
          this._willSettleAt(promise, i);
        } else {
          this._willSettleAt(new c(function (resolve$$1) {
            return resolve$$1(entry);
          }), i);
        }
      } else {
        this._willSettleAt(resolve$$1(entry), i);
      }
    };

    Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
      var promise = this.promise;

      if (promise._state === PENDING) {
        this._remaining--;

        if (state === REJECTED) {
          reject(promise, value);
        } else {
          this._result[i] = value;
        }
      }

      if (this._remaining === 0) {
        fulfill(promise, this._result);
      }
    };

    Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
      var enumerator = this;

      subscribe(promise, undefined, function (value) {
        return enumerator._settledAt(FULFILLED, i, value);
      }, function (reason) {
        return enumerator._settledAt(REJECTED, i, reason);
      });
    };

    return Enumerator;
  }();

  /**
    @method all
    @static
    @param {Array} entries array of promises
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries) {
    return new Enumerator(this, entries).promise;
  }

  /**
    @method race
    @static
    @param {Array} promises array of promises to observe
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries) {
    /*jshint validthis:true */
    var Constructor = this;

    if (!isArray(entries)) {
      return new Constructor(function (_, reject) {
        return reject(new TypeError('You must pass an array to race.'));
      });
    } else {
      return new Constructor(function (resolve, reject) {
        var length = entries.length;
        for (var i = 0; i < length; i++) {
          Constructor.resolve(entries[i]).then(resolve, reject);
        }
      });
    }
  }

  /**
    @method reject
    @static
    @param {Any} reason value that the returned promise will be rejected with.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$1(reason) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop);
    reject(promise, reason);
    return promise;
  }

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    @class Promise
    @param {Function} resolver
    Useful for tooling.
    @constructor
  */

  var Promise$1 = function () {
    function Promise(resolver) {
      this[PROMISE_ID] = nextId();
      this._result = this._state = undefined;
      this._subscribers = [];

      if (noop !== resolver) {
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
      }
    }

    /**
     @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
    */

    /**
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
    */

    Promise.prototype['catch'] = function _catch(onRejection) {
      return this.then(null, onRejection);
    };

    /**
      @method finally
      @param {Function} callback
      @return {Promise}
    */

    Promise.prototype['finally'] = function _finally(callback) {
      var promise = this;
      var constructor = promise.constructor;

      if (isFunction(callback)) {
        return promise.then(function (value) {
          return constructor.resolve(callback()).then(function () {
            return value;
          });
        }, function (reason) {
          return constructor.resolve(callback()).then(function () {
            throw reason;
          });
        });
      }

      return promise.then(callback, callback);
    };

    return Promise;
  }();

  Promise$1.prototype.then = then;
  Promise$1.all = all;
  Promise$1.race = race;
  Promise$1.resolve = resolve$1;
  Promise$1.reject = reject$1;
  Promise$1._setScheduler = setScheduler;
  Promise$1._setAsap = setAsap;
  Promise$1._asap = asap;

  /*global self*/
  function polyfill() {
    var local = void 0;

    if (typeof global !== 'undefined') {
      local = global;
    } else if (typeof self !== 'undefined') {
      local = self;
    } else {
      try {
        local = Function('return this')();
      } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
      }
    }

    var P = local.Promise;

    if (P) {
      var promiseToString = null;
      try {
        promiseToString = Object.prototype.toString.call(P.resolve());
      } catch (e) {
        // silently ignored
      }

      if (promiseToString === '[object Promise]' && !P.cast) {
        return;
      }
    }

    local.Promise = Promise$1;
  }

  // Strange compat..
  Promise$1.polyfill = polyfill;
  Promise$1.Promise = Promise$1;

  var _IE_RESOLUTION_TO_BIT;

  var StreamType = {
    NODE: -1,
    AUDIO: 0,
    VIDEO: 1,
    AUDIO_AND_VIDEO: 2
  };

  var StreamSize = {
    MAX: 1,
    MIN: 2
  };

  var StreamState = {
    ENABLE: 1,
    DISBALE: 0
  };

  var UserState = {
    JOINED: 0,
    LEFT: 1,
    OFFLINE: 2
  };

  var PingCount = 4;

  var LogTag = {
    ICE: 'ice',
    LIFECYCLE: 'lifecycle',
    ROOM: 'room',
    STREAM: 'stream',
    STREAM_HANDLER: 'stream_handler',
    ROOM_HANDLER: 'room_handler',
    STORAGE_HANDLER: 'storage_handler',
    IM: 'im',
    MESSAGE: 'message',
    DEVICE: 'device',
    IE_NOTIFY: 'ie_notify'
  };

  var LogLevel = {
    INFO: 'I',
    DEBUG: 'D',
    VERBOSE: 'V',
    WARN: 'W',
    ERROR: 'E'
  };

  var EventType = {
    REQUEST: 1,
    RESPONSE: 2
  };

  var StorageType = {
    ROOM: 1,
    USER: 2
  };

  var REGEXP_ROOM_ID = /[A-Za-z0-9+=-_]+$/;

  var LENGTH_ROOM_ID = 64;
  var MIN_STREAM_SUFFIX = 'tiny';

  var AUDIO_LEVEL = [0, 1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];

  var REPORT_FREQUENCY = 1 * 1000;

  var REQUEST_TIMEOUT = 5 * 1000;

  var MEDIASERVER_SUCCESS = 10000;

  var IE9_REQUEST_SUCCESS = 0;

  var RTC_MODE = {
    RTC: 0,
    LIVE: 1
  };

  var TAG_V2 = '';

  var IE_ENABLE = {
    CLOSE: 0,
    OPEN: 1
  };

  var IE_RESPONSE = {
    SUCCESS: 0
  };

  var IE_MEDIA_TYPE = {
    AUDIO: 1,
    VIDEO: 2,
    AUDIO_AND_VIDEO: 3
  };

  var IE_RESOLUTION = {
    'Solution_256_144': 1,
    'Solution_320_240': 2,
    'Solution_480_360': 3,
    'Solution_640_360': 4,
    'Solution_640_480': 5,
    'Solution_720_480': 6,
    'Solution_1280_720': 7,
    'Solution_1920_1080': 8
  };

  var IE_RESOLUTION_TO_BITRATE = (_IE_RESOLUTION_TO_BIT = {}, defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_256_144'], {
    max: 150,
    min: 30
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_320_240'], {
    max: 500,
    min: 150
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_480_360'], {
    max: 650,
    min: 200
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_640_360'], {
    max: 800,
    min: 250
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_640_480'], {
    max: 1000,
    min: 350
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_720_480'], {
    max: 1200,
    min: 400
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_1280_720'], {
    max: 2500,
    min: 750
  }), defineProperty(_IE_RESOLUTION_TO_BIT, IE_RESOLUTION['Solution_1920_1080'], {
    max: 4500,
    min: 1500
  }), _IE_RESOLUTION_TO_BIT);

  var IE_FRAME_RATE = {
    'Rate_5': 1,
    'Rate_10': 2,
    'Rate_15': 3,
    'Rate_20': 4,
    'Rate_25': 5,
    'Rate_30': 6
  };

  var IE_ROTATE = {
    NONE: 0,
    ROTATE_X: 1
  };

  var IE_TAG = {
    RTC: 'RongCloudRTC',
    ScreenShare: 'screenshare'
  };

  var IE_NOTIFY_EVENT = {
    ICE_CONNECTION_CHANGE: 1,
    VIDEO_RENDER_CHANGE: 2
  };

  var noop$1 = function noop() {};
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  var isArray$1 = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  var isFunction$1 = function isFunction(arr) {
    return Object.prototype.toString.call(arr) === '[object Function]';
  };
  var isString = function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  };
  var isBoolean = function isBoolean(str) {
    return Object.prototype.toString.call(str) === '[object Boolean]';
  };
  var isUndefined = function isUndefined(str) {
    return Object.prototype.toString.call(str) === '[object Undefined]';
  };
  var isNull = function isNull(str) {
    return Object.prototype.toString.call(str) === '[object Null]';
  };
  var isNumber = function isNumber(str) {
    return Object.prototype.toString.call(str) === '[object Number]';
  };
  var stringify = function stringify(obj) {
    return JSON.stringify(obj);
  };
  var parse = function parse(str) {
    var value = str;
    try {
      value = JSON.parse(str);
    } catch (e) {}
    return value;
  };
  var toJSON = function toJSON(value) {
    return JSON.stringify(value);
  };
  var forEach = function forEach(obj, callback) {
    callback = callback || noop$1;
    var loopObj = function loopObj() {
      for (var key in obj) {
        callback(obj[key], key, obj);
      }
    };
    var loopArr = function loopArr() {
      for (var i = 0, len = obj.length; i < len; i++) {
        callback(obj[i], i);
      }
    };
    if (isObject(obj)) {
      loopObj();
    }
    if (isArray$1(obj)) {
      loopArr();
    }
  };
  var isEmpty = function isEmpty(obj) {
    var result = true;
    if (isObject(obj)) {
      forEach(obj, function () {
        result = false;
      });
    }
    if (isString(obj) || isArray$1(obj)) {
      result = obj.length === 0;
    }
    return result;
  };
  var rename = function rename(origin, newNames) {
    var isObj = isObject(origin);
    if (isObj) {
      origin = [origin];
    }
    origin = parse(stringify(origin));
    var updateProperty = function updateProperty(val, key, obj) {
      delete obj[key];
      key = newNames[key];
      obj[key] = val;
    };
    forEach(origin, function (item) {
      forEach(item, function (val, key, obj) {
        var isRename = key in newNames;
        (isRename ? updateProperty : noop$1)(val, key, obj);
      });
    });
    return isObject ? origin[0] : origin;
  };
  var extend = function extend(destination, sources) {
    for (var key in sources) {
      var value = sources[key];
      if (!isUndefined(value)) {
        destination[key] = value;
      }
    }
    return destination;
  };
  var Defer = Promise$1;
  var deferred = function deferred(callback) {
    return new Defer(callback);
  };
  var tplEngine = function tplEngine(tpl, data, regexp) {
    if (!isArray$1(data)) {
      data = [data];
    }
    var ret = [];
    var replaceAction = function replaceAction(object) {
      return tpl.replace(regexp || /\\?\{([^}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') return match.slice(1);
        return object[name] !== undefined ? object[name] : '{' + name + '}';
      });
    };
    for (var i = 0, j = data.length; i < j; i++) {
      ret.push(replaceAction(data[i]));
    }
    return ret.join('');
  };
  // 暂时支持 String
  var isContain = function isContain(str, keyword) {
    return str.indexOf(keyword) > -1;
  };
  var isEqual = function isEqual(source, target) {
    return source === target;
  };
  var Cache = function Cache(cache) {
    if (!isObject(cache)) {
      cache = {};
    }
    var set = function set(key, value) {
      cache[key] = value;
    };
    var get = function get(key) {
      return cache[key];
    };
    var remove = function remove(key) {
      delete cache[key];
    };
    var getKeys = function getKeys() {
      var keys = [];
      for (var key in cache) {
        keys.push(key);
      }
      return keys;
    };
    var clear = function clear() {
      cache = {};
    };
    return {
      set: set,
      get: get,
      remove: remove,
      getKeys: getKeys,
      clear: clear
    };
  };

  /* IE 组件带入的 request */
  var pcEngineRequest = function pcEngineRequest(url, options, pc) {
    options = options || {};
    var headers = options.headers || {},
        body = options.body || {};

    var headerTpl = '"{name}:{header}"',
        headersTpl = '[{headers}]';

    var formatedHeaders = [];

    forEach(headers, function (header, name) {
      header = tplEngine(headerTpl, {
        header: header,
        name: name
      });
      formatedHeaders.push(header);
    });
    formatedHeaders = tplEngine(headersTpl, {
      headers: formatedHeaders.join(',')
    });

    return deferred(function (resolve, reject) {
      var code = pc.HttpPost(url, formatedHeaders, body, function (result) {
        result = parse(result);
        resolve(result);
      });
      if (code !== IE9_REQUEST_SUCCESS) {
        reject({
          status: code
        });
      }
    });
  };

  var request = function request(url, option) {
    return deferred(function (resolve, reject) {
      option = option || {};
      var xhr = new XMLHttpRequest();
      var method = option.method || 'GET';
      xhr.open(method, url, true);
      var headers = option.headers || {};
      forEach(headers, function (header, name) {
        xhr.setRequestHeader(name, header);
      });
      var body = option.body || {};
      var isSuccess = function isSuccess() {
        return (/^(200|202)$/.test(xhr.status)
        );
      };
      var timeout = option.timeout;
      if (timeout) {
        xhr.timeout = timeout;
      }
      xhr.onreadystatechange = function () {
        if (isEqual(xhr.readyState, 4)) {
          var responseText = xhr.responseText;

          responseText = responseText || '{}';
          var result = JSON.parse(responseText);
          if (isSuccess()) {
            resolve(result);
          } else {
            var status = xhr.status;

            extend(result, {
              status: status
            });
            reject(result);
          }
        }
      };
      xhr.onerror = function (error) {
        reject(error);
      };
      xhr.send(body);
    });
  };
  var map = function map(arrs, callback) {
    return arrs.map(callback);
  };
  var filter = function filter(arrs, callback) {
    return arrs.filter(callback);
  };
  var uniq = function uniq(arrs, callback) {
    var newData = [],
        tempData = {};
    arrs.forEach(function (target) {
      var temp = callback(target);
      tempData[temp.key] = temp.value;
    });
    forEach(tempData, function (val) {
      newData.push(val);
    });
    return newData;
  };
  var some = function some(arrs, callback) {
    return arrs.some(callback);
  };
  var toArray$1 = function toArray(obj) {
    var arrs = [];
    forEach(obj, function (v, k) {
      arrs.push([k, v]);
    });
    return arrs;
  };
  function Timer(_option) {
    _option = _option || {};
    var option = {
      timeout: 0,
      // interval | timeout
      type: 'interval'
    };
    extend(option, _option);
    var timers = [];
    var _timeout = option.timeout,
        type = option.type;

    var timerType = {
      resume: {
        interval: function interval(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setInterval(callback, _timeout);
        },
        timeout: function timeout(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setTimeout(callback, _timeout);
        }
      },
      pause: {
        interval: function interval(timer) {
          return clearInterval(timer);
        },
        timeout: function timeout(timer) {
          return clearTimeout(timer);
        }
      }
    };
    this.resume = function (callback, immediate) {
      callback = callback || noop$1;
      var resume = timerType.resume;

      var timer = resume[type](callback, immediate);
      timers.push(timer);
    };
    this.pause = function () {
      var pause = timerType.pause;

      forEach(timers, function (timer) {
        pause[type](timer);
      });
    };
  }
  var isInclude = function isInclude(str, match) {
    return str.indexOf(match) > -1;
  };
  var clone = function clone(source) {
    return JSON.parse(JSON.stringify(source));
  };
  function Index() {
    var index = 0;
    this.add = function () {
      index += 1;
    };
    this.get = function () {
      return index;
    };
    this.reset = function () {
      index = 0;
    };
  }
  function Observer() {
    var observers = [];
    this.add = function (observer, force) {
      if (isFunction$1(observer)) {
        if (force) {
          return observers = [observer];
        }
        observers.push(observer);
      }
    };
    this.remove = function (observer) {
      observers = filter(observers, function (_observer) {
        return _observer !== observer;
      });
    };
    this.emit = function (data) {
      forEach(observers, function (observer) {
        observer(data);
      });
    };
  }
  function Prosumer() {
    var data = [],
        isConsuming = false;
    this.produce = function (res) {
      data.push(res);
    };
    this.consume = function (callback, finished) {
      if (isConsuming) {
        return;
      }
      isConsuming = true;
      var next = function next() {
        var res = data.shift();
        if (isUndefined(res)) {
          isConsuming = false;
          finished && finished();
          return;
        }
        callback(res, next);
      };
      next();
    };
    this.isExeuting = function () {
      return isConsuming;
    };
  }
  /* 
   prosumer.consume(function(data, next){
    //dosomething
    next();
   });
  */
  var Log = console;
  var getBrowser = function getBrowser() {
    var userAgent = navigator.userAgent;
    var name = '',
        version = '';
    if (/(Msie|Firefox|Opera|Chrome|Netscape)\D+(\d[\d.]*)/.test(userAgent)) {
      name = RegExp.$1;
      version = RegExp.$2;
    }
    if (/Version\D+(\d[\d.]*).*Safari/.test(userAgent)) {
      name = 'Safari';
      version = RegExp.$1;
    }
    return {
      name: name,
      version: version
    };
  };

  var isSupportRequestHeaders = function isSupportRequestHeaders() {
    var userAgent = navigator.userAgent;
    var isIE = window.ActiveXObject || 'ActiveXObject' in window;
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      return fIEVersion <= 9;
    }
    return false;
  };

  var getDate = function getDate(timestramp) {
    timestramp = timestramp || Date.now();
    var date = new Date(timestramp);
    var dateList = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    return dateList.join('_');
  };

  var utils = {
    Prosumer: Prosumer,
    Log: Log,
    Observer: Observer,
    Timer: Timer,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isString: isString,
    isObject: isObject,
    isArray: isArray$1,
    isFunction: isFunction$1,
    stringify: stringify,
    parse: parse,
    rename: rename,
    extend: extend,
    clone: clone,
    deferred: deferred,
    Defer: Defer,
    forEach: forEach,
    tplEngine: tplEngine,
    isContain: isContain,
    noop: noop$1,
    Cache: Cache,
    request: request,
    pcEngineRequest: pcEngineRequest,
    map: map,
    filter: filter,
    uniq: uniq,
    some: some,
    isEqual: isEqual,
    isEmpty: isEmpty,
    toJSON: toJSON,
    isInclude: isInclude,
    isNull: isNull,
    isNumber: isNumber,
    toArray: toArray$1,
    Index: Index,
    getBrowser: getBrowser,
    getDate: getDate,
    isSupportRequestHeaders: isSupportRequestHeaders
  };

  var DownEvent = {
    ROOM_USER_JOINED: 'room_user_joined',
    ROOM_USER_LEFT: 'room_user_left',

    STREAM_PUBLISHED: 'stream_published',
    STREAM_UNPUBLISHED: 'stream_unpublished',
    STREAM_DISABLED: 'stream_disabled',
    STREAM_ENABLED: 'stream_enabled',
    STREAM_MUTED: 'stream_muted',
    STREAM_UNMUTED: 'stream_unmuted',
    STREAM_RESIZED: 'stream_resized',

    RTC_ERROR: 'rtc_error',
    RTC_MOUNTED: 'rtc_mounted',
    RTC_UNMOUNTED: 'rtc_unmounted',

    MESSAGE_RECEIVED: 'message_received',

    REPORT_SPOKE: 'report_spoke'
  };

  var UpEvent = {
    ROOM_JOIN: 'room_join',
    ROOM_LEAVE: 'room_leave',
    ROOM_GET: 'room_get',

    STREAM_PUBLISH: 'stream_publish',
    STREAM_UNPUBLISH: 'stream_UNPUBLISH',
    STREAM_SUBSCRIBE: 'stream_subscribe',
    STREAM_UNSUBSCRIBE: 'stream_unsubscribe',
    STREAM_RESIZE: 'stream_resize',
    STREAM_GET: 'stream_get',
    STREAM_UPDATE: 'stream_update',

    AUDIO_MUTE: 'audio_mute',
    AUDIO_UNMUTE: 'audio_unmute',

    VIDEO_DISABLE: 'video_disable',
    VIDEO_ENABLE: 'video_enable',

    STORAGE_SET: 'strorage_set',
    STORAGE_GET: 'strorage_get',
    STORAGE_REMOVE: 'strorage_remove',

    MESSAGE_SEND: 'message_send',

    DEVICE_GET: 'device_get',

    REPORT_START: 'report_start',
    REPORT_STOP: 'report_stop'
  };

  var RoomEvents = [{
    name: DownEvent.ROOM_USER_JOINED,
    type: 'joined'
  }, {
    name: DownEvent.ROOM_USER_LEFT,
    type: 'left'
  }];

  var StreamEvents = [{
    name: DownEvent.STREAM_PUBLISHED,
    type: 'published'
  }, {
    name: DownEvent.STREAM_UNPUBLISHED,
    type: 'unpublished'
  }, {
    name: DownEvent.STREAM_DISABLED,
    type: 'disabled'
  }, {
    name: DownEvent.STREAM_ENABLED,
    type: 'enabled'
  }, {
    name: DownEvent.STREAM_MUTED,
    type: 'muted'
  }, {
    name: DownEvent.STREAM_UNMUTED,
    type: 'unmuted'
  }, {
    name: DownEvent.STREAM_RESIZED,
    type: 'resized'
  }];

  var MessageEvents = [{
    name: DownEvent.MESSAGE_RECEIVED,
    type: 'received'
  }];

  var ReportEvents = [{
    name: DownEvent.REPORT_SPOKE,
    type: 'spoke'
  }];

  var getErrors = function getErrors() {
    var errors = [{
      code: 10000,
      name: 'INSTANCE_IS_DESTROYED',
      msg: 'RongRTC instance has been destroyed'
    }, {
      code: 50000,
      name: 'IM_NOT_CONNECTED',
      msg: 'IM not connected'
    }, {
      code: 50001,
      name: 'ROOM_ID_IS_ILLEGAL',
      msg: 'The roomId is illegal and can contain only upper and lower case letters, Arabic numerals, +, =, -, _ and cannot exceed 64 characters in length'
    }, {
      code: 50002,
      name: 'ROOM_REPEAT_JOIN',
      msg: 'Not rejoin the room'
    }, {
      code: 50010,
      name: '',
      msg: 'Http request timeout'
    }, {
      code: 50011,
      name: '',
      msg: 'http response error'
    }, {
      code: 50012,
      name: '',
      msg: 'Network unavailable'
    }, {
      code: 50020,
      name: '',
      msg: 'Resources has been published'
    }, {
      code: 50021,
      name: 'SET_OFFER_ERROR',
      msg: 'Set offer error'
    }, {
      code: 50021,
      name: 'SET_ANSWER_ERROR',
      msg: 'Set answer error'
    }, {
      code: 50023,
      name: 'PUBLISH_STREAM_EXCEED_LIMIT',
      msg: 'The maximum number of published resources has been reached'
    }, {
      code: 50024,
      name: 'STREAM_NOT_EXIST',
      msg: 'Stream not exist. Please check user.id、stream.type or stream.tag'
    }, {
      code: 50030,
      name: 'SUBSCRIBE_STREAM_NOT_EXIST',
      msg: 'Subscribe to non-existent resource'
    }, {
      code: 50030,
      name: 'STREAM_TRACK_NOT_EXIST',
      msg: 'Track not exist. Please check user.id、stream.type or stream.tag'
    }, {
      code: 50031,
      name: 'STREAM_SUBSCRIBED',
      msg: 'Resources has been subscribed'
    }, {
      code: 50032,
      name: 'UNSUBSCRIBE_STREAM_NOT_EXIST',
      msg: 'Unsubscribe to non-existent resource'
    }, {
      code: 50050,
      name: 'RTC_NOT_JOIN_ROOM',
      msg: 'Please join the room first'
    }, {
      code: 50051,
      name: 'SOCKET_UNAVAILABLE',
      msg: 'IM socket unavailable'
    }, {
      code: 50052,
      name: 'NETWORK_UNAVAILABLE',
      msg: 'Network unavailable'
    }, {
      code: 50053,
      name: 'IM_SDK_VER_NOT_MATCH',
      msg: 'IM SDK version is too low, minimum version 2.4.0, please check: https://www.rongcloud.cn/docs/web_rtclib.html'
    }, {
      code: 50054,
      name: 'STREAM_DESKTOPID_ILLEGAL',
      msg: 'Failed to get screen shared stream, illegal desktopStreamId'
    }, {
      code: 50055,
      name: 'PARAMTER_ILLEGAL',
      msg: 'Please check the parameters, the {name} parameter is mandatory'
    }, {
      code: 50056,
      name: 'ENGINE_ERROR',
      msg: 'RTC engine error'
    }, {
      code: 50057,
      name: 'MEDIA_SERVER_ERROR',
      msg: 'Network is abnormal or Media Server is unavailable'
    }, {
      code: 50058,
      name: 'MEDIA_SERVER_RESPONSE_EMPTY',
      msg: 'Media Server response body is empty'
    }, {
      code: 40001,
      name: 'NOT_IN_ROOM',
      msg: 'Not in the room'
    }, {
      code: 40002,
      name: 'INTERNAL_ERROR',
      msg: 'IM Server internal error'
    }, {
      code: 40003,
      name: 'HAS_NO_ROOM',
      msg: 'IM Server room info not exist'
    }, {
      code: 40004,
      name: 'INVALID_USERID',
      msg: 'UserId illegal'
    }, {
      code: 40005,
      name: 'REPEAT_JOIN_ROOM',
      msg: 'Not rejoin the room'
    }];

    var errorMap = {
      Inner: {},
      Outer: {}
    };
    utils.forEach(errors, function (error) {
      var name = error.name,
          code = error.code,
          msg = error.msg;

      var info = {
        code: code,
        msg: msg
      };
      errorMap.Inner[name] = info;
      errorMap[code] = info;
      errorMap.Outer[name] = code;
    });
    return errorMap;
  };
  var ErrorType = getErrors();

  /* 
    data： 任意对象
    rules: 校验规则，数组
    let user = {
      id: '',
      stream: {
        type: 1,
        tag: 2
      }
    };
    // 校验必传入参数, 暂时支持 2 级
    check(user, ['id', 'stream.type', 'stream.tag', 'stream.mediaStream']);
  */
  var check = function check(data, rules) {
    var isIllegal = false,
        name = '';
    var getBody = function getBody() {
      return {
        isIllegal: isIllegal,
        name: name
      };
    };
    if (!utils.isArray(rules)) {
      rules = [rules];
    }
    if (!utils.isObject(data)) {
      throw new Error('check(data, rules): data must be an object');
    }
    utils.forEach(rules, function (rule) {
      var isTier = rule.indexOf('.') > -1;
      if (!isTier) {
        isIllegal = utils.isUndefined(data[rule]);
        if (isIllegal) {
          return name = rule;
        }
      }
      if (isTier) {
        var props = rule.split('.');

        var _props = slicedToArray(props, 2),
            parent = _props[0],
            child = _props[1];

        var parentData = data[parent];
        isIllegal = utils.isUndefined(parentData);
        if (isIllegal) {
          return name = parent;
        }
        if (!utils.isArray(parentData)) {
          parentData = [parentData];
        }
        utils.forEach(parentData, function (parent) {
          var childData = parent[child];
          isIllegal = utils.isUndefined(childData);
          if (isIllegal) {
            return name = child;
          }
        });
      }
    });
    return getBody();
  };

  var getError = function getError(name) {
    var error = ErrorType.Inner.PARAMTER_ILLEGAL;
    var msg = error.msg;

    msg = utils.tplEngine(msg, {
      name: name
    });
    return utils.extend(error, {
      msg: msg
    });
  };

  var getHeaders = function getHeaders(im) {
    var roomId = im.getRoomId();
    var token = im.getRTCToken();

    var _im$getAppInfo = im.getAppInfo(),
        appKey = _im$getAppInfo.appKey;

    var browser = utils.getBrowser();
    var tpl = 'web|{name}|{version}';
    var type = utils.tplEngine(tpl, browser);
    return {
      'App-Key': appKey,
      RoomId: roomId,
      Token: token,
      ClientType: type,
      ClientVersion: 1
    };
  };

  var dispatchStreamEvent = function dispatchStreamEvent(user, callback) {
    var id = user.id,
        uris = user.uris;

    if (utils.isString(uris)) {
      uris = utils.parse(uris);
    }
    var streams = [user];
    if (uris) {
      streams = utils.uniq(uris, function (target) {
        var tag = target.tag,
            mediaType = target.mediaType,
            state = target.state;

        var streamId = target.streamId || target.msid;
        return {
          key: [streamId, tag].join('_'),
          value: {
            tag: tag,
            uris: uris,
            mediaType: mediaType,
            state: state
          }
        };
      });
    }
    utils.forEach(streams, function (stream) {
      callback({
        id: id,
        stream: stream
      });
    });
  };

  var dispatchOperationEvent = function dispatchOperationEvent(user, callback) {
    var getModifyEvents = function getModifyEvents() {
      var events = {},
          tpl = '{type}_{state}';
      // 禁用视频
      var name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_DISABLED;
      // 启用视频
      name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_ENABLED;
      // 音频静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_MUTED;
      // 音频取消静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_UNMUTED;
      return events;
    };
    var _user$stream = user.stream,
        type = _user$stream.mediaType,
        state = _user$stream.state;

    var tpl = '{type}_{state}';
    var name = utils.tplEngine(tpl, {
      type: type,
      state: state
    });
    var events = getModifyEvents();
    var event = events[name];
    return callback(event, user);
  };

  var isSafari = function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
  };

  var isV2Tag = function isV2Tag(tag) {
    return utils.isUndefined(tag) || utils.isEmpty(tag);
  };

  var toIEMediaType = function toIEMediaType(mediaType) {
    var mediaTypeMap = {};
    utils.forEach(StreamType, function (type, key) {
      mediaTypeMap[type] = IE_MEDIA_TYPE[key] || type;
    });
    return mediaTypeMap[mediaType];
  };

  var getRenderState = function getRenderState(mediaType, isEnabled) {
    switch (mediaType) {
      case IE_MEDIA_TYPE.AUDIO:
        return isEnabled ? 1 : 0;
      case IE_MEDIA_TYPE.VIDEO:
        return isEnabled ? 2 : 1;
      case IE_MEDIA_TYPE.AUDIO_AND_VIDEO:
        return isEnabled ? 3 : 0;
    }
  };

  function Logger() {
    var observer = new utils.Observer();
    var write = function write(level, tag, meta) {
      var time = new Date().getTime();
      var log = {
        level: level,
        tag: tag,
        meta: meta,
        time: time,
        platform: 'web'
      };
      observer.emit(log);
    };
    var warn = function warn(tag, meta) {
      return write(LogLevel.WARN, tag, meta);
    };
    var error = function error(tag, meta) {
      return write(LogLevel.ERROR, tag, meta);
    };
    var info = function info(tag, meta) {
      return write(LogLevel.INFO, tag, meta);
    };
    var log = function log(tag, meta) {
      return write(LogLevel.VERBOSE, tag, meta);
    };
    var watch = function watch(watcher, force) {
      observer.add(watcher, force);
    };
    return {
      warn: warn,
      error: error,
      info: info,
      log: log,
      watch: watch
    };
  }
  var Logger$1 = Logger();

  var Room = function () {
    function Room(option) {
      classCallCheck(this, Room);

      var context = this;

      var _ref = option || '',
          id = _ref.id;

      var roomIdLen = id.length;
      var client = context.getClient();
      if (!REGEXP_ROOM_ID.test(id) || roomIdLen > LENGTH_ROOM_ID) {
        var Inner = ErrorType.Inner;

        return client.emit(DownEvent.RTC_ERROR, Inner.ROOM_ID_IS_ILLEGAL);
      }
      utils.forEach(RoomEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.ROOM, {
            event: type,
            user: user
          });
        });
      });
      utils.extend(context, {
        option: option,
        client: client,
        room: {
          id: id
        }
      });
    }

    createClass(Room, [{
      key: 'join',
      value: function join(user) {
        var _check = check(user, ['id']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var room = this.room,
            client = this.client;

        utils.extend(room, {
          user: user
        });
        return client.exec({
          event: UpEvent.ROOM_JOIN,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'leave',
      value: function leave() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_LEAVE,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'get',
      value: function get$$1() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET,
          type: 'room',
          args: [room]
        });
      }
    }]);
    return Room;
  }();

  function Video(client) {
    return {
      disable: function disable(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_DISABLE,
          type: 'stream',
          args: [user]
        });
      },
      enable: function enable(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_ENABLE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  function Audio(client) {
    return {
      mute: function mute(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_MUTE,
          type: 'stream',
          args: [user]
        });
      },
      unmute: function unmute(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_UNMUTE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  var Stream = function () {
    function Stream(option) {
      classCallCheck(this, Stream);

      var context = this;
      var client = context.getClient();
      utils.forEach(StreamEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.STREAM, {
            event: type,
            user: user
          });
        });
      });
      client.extendOption(option);
      utils.extend(context, {
        option: option,
        client: client,
        video: new Video(client),
        audio: new Audio(client)
      });
    }

    createClass(Stream, [{
      key: 'publish',
      value: function publish(user) {
        var _check = check(user, ['id', 'stream.tag', 'stream.mediaStream', 'stream.type']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_PUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unpublish',
      value: function unpublish(user) {
        var _check2 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UNPUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(user) {
        var _check3 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_SUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(user) {
        var _check4 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check4.isIllegal,
            name = _check4.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UNSUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'resize',
      value: function resize(user) {
        var _check5 = check(user, ['id', 'stream.tag']),
            isIllegal = _check5.isIllegal,
            name = _check5.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_RESIZE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(constraints) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_GET,
          type: 'stream',
          args: [constraints]
        });
      }
    }, {
      key: 'update',
      value: function update(user) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UPDATE,
          type: 'stream',
          args: [user]
        });
      }
    }]);
    return Stream;
  }();

  var EventEmitter = function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);

      this.events = {};
      this.onceEvents = {};
    }

    createClass(EventEmitter, [{
      key: 'on',
      value: function on(name, event) {
        var events = this.events[name] || [];
        events.push(event);
        this.events[name] = events;
      }
    }, {
      key: 'off',
      value: function off(name) {
        delete this.events[name];
      }
    }, {
      key: 'emit',
      value: function emit(name, data, error) {
        var events = this.events[name];
        utils.forEach(events, function (event) {
          event(error, data);
        });

        var onceEvent = this.onceEvents[name] || utils.noop;
        onceEvent(error, data);
        delete this.onceEvents[name];
      }
    }, {
      key: 'once',
      value: function once(name, event) {
        this.onceEvents[name] = event;
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        for (var name in this.events) {
          this.off(name);
        }
        for (var _name in this.onceEvents) {
          delete this.onceEvents[_name];
        }
      }
    }]);
    return EventEmitter;
  }();

  var CommonEvent = {
    JOINED: 'common_joined',
    LEFT: 'common_left',
    ERROR: 'common_error',
    CONSUME: 'common_consume',
    REQUEST_CONSUME: 'common_request_consume',
    CONNECTED: 'common_connected',
    PEERCONN_CREATED: 'common_peerconn_created',
    PUBLISHED_STREAM: 'common_published_stream',
    RTC_PING_RECONNECT: 'common_rtcping_reconnect'
  };

  function request$1() {
    var config = {
      urls: []
    };
    // 正在使用的 URL 下标，每次请求在 urls 中取对应的地址发送请求
    var indexTools = new utils.Index();

    var prosumer = new utils.Prosumer();
    var eventEmitter = new EventEmitter();
    var setOption = function setOption(_config) {
      utils.extend(config, _config);
    };
    var postProcess = function postProcess(option) {
      var urls = config.urls,
          pc = config.pc;
      var path = option.path,
          body = option.body;

      var tpl = '{domain}{path}';

      return utils.deferred(function (resolve, reject) {
        var doRequest = function doRequest(error) {
          var index = indexTools.get();
          var isRange = index >= urls.length;
          if (isRange) {
            var Inner = ErrorType.Inner;

            indexTools.reset();
            error = utils.isEqual(error.status, 0) ? Inner.MEDIA_SERVER_ERROR : error;
            return reject(error);
          }
          var domain = urls[index];
          var url = utils.tplEngine(tpl, {
            domain: 'https://mdsrv01-ksbj.rongcloud.net:1443',
            path: path
          });
          var headers = {
            'Content-Type': 'application/json;charset=UTF-8'
          };
          var _headers = option.headers;

          if (utils.isObject(_headers)) {
            utils.extend(headers, _headers);
          }

          var requestFunc = utils.isSupportRequestHeaders() ? utils.pcEngineRequest : utils.request;

          requestFunc(url, {
            method: 'POST',
            timeout: REQUEST_TIMEOUT,
            body: JSON.stringify(body),
            headers: headers
          }, pc).then(function (result) {
            var code = result.resultCode;

            if (utils.isEqual(code, MEDIASERVER_SUCCESS)) {
              resolve(result);
            } else {
              reject(result);
            }
          }, function (error) {
            var status = error.status;

            if (utils.isInclude([403], status)) {
              return reject(error);
            }
            indexTools.add();
            doRequest(error);
          });
        };
        doRequest();
      });
    };
    eventEmitter.on(CommonEvent.REQUEST_CONSUME, function () {
      prosumer.consume(function (_ref, next) {
        var option = _ref.option,
            resolve = _ref.resolve,
            reject = _ref.reject;

        postProcess(option).then(function (result) {
          resolve(result);
          next();
        }, function (error) {
          reject(error);
          next();
        });
      });
    });
    var post = function post(option) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({ option: option, resolve: resolve, reject: reject });
        eventEmitter.emit(CommonEvent.REQUEST_CONSUME);
      });
    };
    return {
      setOption: setOption,
      post: post
    };
  }
  var request$2 = request$1();

  var PeerConnection = function (_EventEmitter) {
    inherits(PeerConnection, _EventEmitter);

    function PeerConnection(options) {
      classCallCheck(this, PeerConnection);

      var _this = possibleConstructorReturn(this, (PeerConnection.__proto__ || Object.getPrototypeOf(PeerConnection)).call(this));

      var context = _this;
      var im = options.im;

      var appInfo = im.getAppInfo() || {};
      var appKey = appInfo.appKey;
      var pc = window.document.getElementById(options.id);

      var StreamCache = utils.Cache();

      pc.SetLogEnabled(1, appKey, utils.getDate());
      // pc.Init();
      pc.CreatePeerConnection('');
      request$2.setOption({
        pc: pc
      });
      utils.extend(context, {
        options: options,
        pc: pc,
        StreamCache: StreamCache
      });

      context.addEngineNotify();
      return _this;
    }

    createClass(PeerConnection, [{
      key: 'addEngineNotify',
      value: function addEngineNotify() {
        var context = this;
        var id = context.options.id;

        var notifyEvent = 'RongRTCEngineNotify';

        var notifyAttrs = {
          language: 'javascript',
          for: id,
          event: 'EngineNotify(msg)'
        };

        var notifyDom = document.createElement('script');
        utils.forEach(notifyAttrs, function (value, key) {
          notifyDom.setAttribute(key, value);
        });

        notifyDom.innerHTML = '\n      var ret = JSON.parse(msg);\n      console.log(ret);\n      window[\'' + notifyEvent + '\'](ret);\n    ';

        window.document.body.appendChild(notifyDom);
        window[notifyEvent] = function (msg) {
          context.receiveEngineNotify(msg);
        };
      }
    }, {
      key: 'receiveEngineNotify',
      value: function receiveEngineNotify(msg) {
        var context = this;
        Logger$1.log(LogTag.IE_NOTIFY, defineProperty({
          msg: 'receiveEngineNotify:msg'
        }, 'msg', msg));
        switch (msg.id) {
          case IE_NOTIFY_EVENT.ICE_CONNECTION_CHANGE:
            break;
          case IE_NOTIFY_EVENT.VIDEO_RENDER_CHANGE:
            var big_stream_id = msg.big_stream_id,
                small_stream_id = msg.small_stream_id;

            context.emitUserResized([
            /* big、small 为切换之前为 big、small */
            { id: big_stream_id, size: StreamSize.MIN }, { id: small_stream_id, size: StreamSize.MAX }]);
            break;
        }
      }
    }, {
      key: 'emitUserResized',
      value: function emitUserResized(resizeIdList) {
        var context = this;
        var im = context.options.im;

        utils.forEach(resizeIdList, function (_ref) {
          var id = _ref.id,
              size = _ref.size;

          var user = context.getUserByStreamId(id);
          user.stream.size = size;
          im.emit(DownEvent.STREAM_RESIZED, user);
        });
      }

      // render(user, isEnable) {
      //   let { pc } = context;
      //   let { name, stream: { type } } = user;
      //   let streamId = context.getStreamId(user);
      //   let mediaType = common.toIEMediaType(type);
      //   var state = common.getRenderState(mediaType, isEnable);
      //   pc.AddVideoRender(streamId, name, mediaType, state);
      // }

    }, {
      key: 'getBitrate',
      value: function getBitrate(resolution) {
        return IE_RESOLUTION_TO_BITRATE[resolution] || {};
      }
    }, {
      key: 'setBitrate',
      value: function setBitrate() {
        var context = this;
        var pc = context.pc,
            StreamCache = context.StreamCache;

        var keys = StreamCache.getKeys();
        utils.forEach(keys, function (streamId) {
          var value = StreamCache.get(streamId);
          var resolution = value.resolution;
          var bitrate = context.getBitrate(resolution);
          if (bitrate.max && bitrate.min) {
            pc.SetVideoStreamBitrate(streamId, bitrate.min, bitrate.max);
          }
        });
      }
    }, {
      key: 'addRenderers',
      value: function addRenderers(user) {
        var context = this;

        var pc = context.pc,
            im = context.options.im,
            StreamCache = context.StreamCache;

        var _im$getUser = im.getUser(),
            currentUserId = _im$getUser.id;

        var id = user.id,
            name = user.name,
            isZoomIn = user.isZoomIn,
            _user$stream = user.stream,
            type = _user$stream.type,
            tag = _user$stream.tag,
            resolution = _user$stream.resolution,
            rate = _user$stream.rate,
            rotate = _user$stream.rotate;

        var mediaType = toIEMediaType(type);
        var streamId = context.getStreamId(user);

        name = name || id;
        isZoomIn = isZoomIn || false;
        resolution = resolution || IE_RESOLUTION.Solution_640_480;
        rate = rate || IE_FRAME_RATE.Rate_15;
        rotate = utils.isUndefined(rotate) ? IE_ROTATE.NONE : rotate;

        var isSelf = currentUserId === id,
            isScreenShare = tag === IE_TAG.ScreenShare;

        var isLocal = isSelf ? IE_ENABLE.OPEN : IE_ENABLE.CLOSE;

        if (isSelf) {
          if (isScreenShare) {
            pc.AddScreenShareStream(streamId);
          } else {
            pc.AddDefaultStream(streamId, mediaType, resolution, rate);
          }
          StreamCache.set(streamId, {
            resolution: resolution,
            rate: rate
          });
        }

        var isSelfScreenShare = isSelf && isScreenShare;
        // 不展示自己的屏幕共享流
        if (!isSelfScreenShare) {
          var state = getRenderState(mediaType, true);
          pc.AddVideoRender(streamId, name, mediaType, state, isZoomIn, isLocal, rotate);
        }
      }
    }, {
      key: 'updateDisplayName',
      value: function updateDisplayName(user) {
        var context = this;
        var pc = context.pc;
        var name = user.name;

        var streamId = context.getStreamId(user);
        return pc.UpdateDisplayName(streamId, name);
      }
    }, {
      key: 'updateRenderers',
      value: function updateRenderers(user, type, isEnable) {
        var context = this;
        var pc = context.pc;

        var streamId = context.getStreamId(user);
        var mediaType = toIEMediaType(type);
        var state = getRenderState(mediaType, isEnable);
        return pc.UpdateMediaState(streamId, mediaType, state);
      }
    }, {
      key: 'removeRenderers',
      value: function removeRenderers(user) {
        var context = this;

        var pc = context.pc,
            im = context.options.im;

        var _im$getUser2 = im.getUser(),
            currentUserId = _im$getUser2.id;

        var id = user.id,
            _user$stream2 = user.stream,
            type = _user$stream2.type,
            tag = _user$stream2.tag;

        var mediaType = toIEMediaType(type) || IE_MEDIA_TYPE.AUDIO_AND_VIDEO;
        var streamId = context.getStreamId(user);

        if (currentUserId === id) {
          if (tag === IE_TAG.ScreenShare) {
            pc.RemoveScreenShareStream(streamId);
          } else {
            pc.RemoveDefaultStream(streamId, mediaType);
          }
        }
        pc.RemoveVideoRender(streamId, mediaType, function (ret) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'removeRender:result',
            ret: ret
          });
        });
      }
    }, {
      key: 'setTrackEnabled',
      value: function setTrackEnabled(user, isEnable) {
        var context = this;

        var pc = context.pc,
            im = context.options.im;

        var _im$getUser3 = im.getUser(),
            currentUserId = _im$getUser3.id;

        var id = user.id,
            type = user.stream.type;

        var mediaType = toIEMediaType(type);
        var streamId = context.getStreamId(user);
        var isSelf = currentUserId === id;
        var enable = isEnable ? IE_ENABLE.OPEN : IE_ENABLE.CLOSE;

        if (isSelf) {
          pc.SetLocalTrackEnabled(streamId, mediaType, enable);
        } else {
          pc.SetRemoteTrackEnabled(streamId, mediaType, enable);
        }
        var state = getRenderState(mediaType, isEnable);
        pc.UpdateMediaState(streamId, mediaType, state);
      }
    }, {
      key: 'addStream',
      value: function addStream(user) {
        var context = this;
        context.addRenderers(user);
        // return context.createOffer(user);
      }
    }, {
      key: 'removeStream',
      value: function removeStream(user) {
        var context = this;
        context.removeRenderers(user);
        // return context.createOffer(user);
      }
    }, {
      key: 'createOffer',
      value: function createOffer(config) {
        config = config || {};
        var context = this;
        var pc = context.pc;
        var _config = config,
            isRestartICE = _config.isRestartICE;


        isRestartICE = isRestartICE ? IE_ENABLE.OPEN : IE_ENABLE.CLOSE;
        return utils.deferred(function (resolve, reject) {
          pc.CreateOffer(isRestartICE, function (ret) {
            var msg = utils.parse(ret);
            if (msg.code != IE_RESPONSE.SUCCESS) {
              return reject(msg);
            }
            var desc = {
              sdp: msg.sdp,
              type: 'offer'
            };
            desc = context.renameCodec(desc);
            utils.extend(context, {
              desc: desc
            });
            resolve(desc);
          });
        });
      }
    }, {
      key: 'setOffer',
      value: function setOffer(desc) {
        var context = this;
        var pc = context.pc;
        var sdp = desc.sdp;

        return utils.deferred(function (resolve, reject) {
          pc.SetLocalOffer(sdp, function (ret) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'setLocalOffer:success',
              ret: ret
            });
            ret = utils.parse(ret);
            ret.code == IE_RESPONSE.SUCCESS ? resolve() : reject(ret);
          });
        });
      }
    }, {
      key: 'setAnwser',
      value: function setAnwser(answer) {
        var context = this;
        var pc = context.pc;
        var sdp = answer.sdp;

        return utils.deferred(function (resolve, reject) {
          pc.SetRemoteAnswer(sdp, function (ret) {
            context.setBitrate();
            ret = utils.parse(ret);
            ret.code == IE_RESPONSE.SUCCESS ? resolve() : reject(ret);
          });
        });
      }
    }, {
      key: 'getOffer',
      value: function getOffer(config) {
        var context = this;
        // let success = (desc) => {
        //   desc = context.renameCodec(desc);
        //   return desc;
        // };
        return context.createOffer(config);
      }
    }, {
      key: 'getStreamRatio',
      value: function getStreamRatio() {
        return {};
      }
    }, {
      key: 'getStreamId',
      value: function getStreamId(user, size) {
        var tpl = '{userId}_{tag}';
        var userId = user.id,
            stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }

        var _stream = stream,
            _stream2 = slicedToArray(_stream, 1),
            tag = _stream2[0].tag;

        if (utils.isEqual(size, StreamSize.MIN)) {
          tpl = '{userId}_{tag}_{suffix}';
        }
        if (isV2Tag(tag)) {
          return userId;
        }
        return utils.tplEngine(tpl, {
          userId: userId,
          tag: tag,
          suffix: MIN_STREAM_SUFFIX
        });
      }
    }, {
      key: 'getUserByStreamId',
      value: function getUserByStreamId(id) {
        var details = id.split('_');
        return {
          id: details[0],
          stream: {
            tag: details[details.length - 1]
          }
        };
      }
    }, {
      key: 'getTagByStreamId',
      value: function getTagByStreamId(id) {
        var details = id.split('_');
        return details[details.length - 1];
      }
    }, {
      key: 'getStreamSymbolById',
      value: function getStreamSymbolById(id) {
        var connector = '_';
        var details = id.split(connector);
        if (utils.isEqual(details.length, 1)) {
          details.push(TAG_V2);
          return details;
        }
        var tag = details.pop();
        var userId = details.join(connector);
        return [userId, tag];
      }
    }, {
      key: 'close',
      value: function close() {
        var context = this;
        var pc = context.pc;

        if (pc) {
          pc.DestroyPeerConnection();
          context.pc = null;
          delete context.pc;
        }
      }
    }, {
      key: 'getStats',
      value: function getStats() {}
    }, {
      key: 'renameCodec',
      value: function renameCodec(offer) {
        return offer;
      }
    }]);
    return PeerConnection;
  }(EventEmitter);

  var Path = {
    PUBLISH: '/exchange',
    UNPUBLISH: '/exchange',
    RESIZE: '/exchange',
    SUBSCRIBE: '/exchange',
    UNSUBSCRIBE: '/exchange',
    EXIT: '/exit'
  };

  var Message = {
    PUBLISH: 'RTCPublishResourceMessage',
    UNPUBLISH: 'RTCUnpublishResourceMessage',
    MODIFY: 'RTCModifyResourceMessage',
    STATE: 'RTCUserChangeMessage',
    ROOM_NOTIFY: 'RTCRoomDataNotifyMessage',
    USER_NOTIFY: 'RTCUserDataNotifyMessage'
  };

  var MessageName = {
    PUBLISH: 'RCRTC:PublishResource',
    UNPUBLISH: 'RCRTC:UnpublishResource',
    MODIFY: 'RCRTC:ModifyResource',
    STATE: 'RCRTC:state',
    ROOM_NOTIFY: 'RCRTC:RoomNtf',
    USER_NOTIFY: 'RCRTC:UserNtf'
  };
  var Timeout = {
    TIME: 10 * 1000
  };
  var errorHandler = function errorHandler(code) {
    var error = ErrorType[code] || {
      code: code
    };
    return error;
  };
  var getMsgName = function getMsgName(type) {
    switch (type) {
      case Message.PUBLISH:
        return MessageName.PUBLISH;
      case Message.UNPUBLISH:
        return MessageName.UNPUBLISH;
      case Message.MODIFY:
        return MessageName.MODIFY;
      case Message.STATE:
        return MessageName.STATE;
      case Message.ROOM_NOTIFY:
        return MessageName.ROOM_NOTIFY;
      case Message.USER_NOTIFY:
        return MessageName.USER_NOTIFY;
    }
  };
  var IM = function (_EventEmitter) {
    inherits(IM, _EventEmitter);

    function IM(option) {
      classCallCheck(this, IM);

      var _this = possibleConstructorReturn(this, (IM.__proto__ || Object.getPrototypeOf(IM)).call(this));

      var timer = new utils.Timer({
        timeout: Timeout.TIME
      });
      var v2Users = utils.Cache();
      var context = _this;
      var isJoinRoom = false;
      var isRTCPingInFailure = false;
      utils.extend(context, {
        timer: timer,
        isJoinRoom: isJoinRoom,
        v2Users: v2Users,
        isRTCPingInFailure: isRTCPingInFailure
      });
      var im = option.RongIMLib.RongIMClient,
          RongIMLib = option.RongIMLib;

      var init = function init() {
        if (context.isJoinRoom) {
          context.rePing();
        }
        context.registerMessage();
      };
      var connectState = -1;
      try {
        connectState = im.getInstance().getCurrentConnectionStatus();
      } catch (error) {
        Logger$1.error(LogTag.IM, {
          content: error,
          pos: 'new RongRTC'
        });
      }
      var CONNECTED = RongIMLib.ConnectionStatus.CONNECTED;

      utils.extend(context, {
        connectState: connectState,
        im: im,
        RongIMLib: RongIMLib
      });
      // 如果实例化 RongRTC 时，IM 已连接成功，主动触发内部 init
      if (utils.isEqual(connectState, CONNECTED)) {
        init();
      }
      im.statusWatch = im.statusWatch || utils.noop;
      im.statusWatch(function (status) {
        switch (status) {
          case CONNECTED:
            init();
            context.emit(CommonEvent.CONNECTED);
            break;
        }
        utils.extend(context, {
          connectState: status
        });
      });
      var roomEventHandler = function roomEventHandler(users) {
        utils.forEach(users, function (user) {
          var id = user.userId,
              state = user.state;

          switch (+state) {
            case UserState.JOINED:
              context.emit(DownEvent.ROOM_USER_JOINED, { id: id });
              break;
            case UserState.LEFT:
            case UserState.OFFLINE:
              Logger$1.log(LogTag.ROOM, {
                msg: 'room:member:left',
                user: user
              });
              context.emit(DownEvent.ROOM_USER_LEFT, { id: id });
              break;
            default:
              Logger$1.warn('UserState: unkown state ' + state);
          }
        });
      };
      /**
       * 收到 UnkownMessage 自动转为 ObjectName + "Message" 做为 MessageType
       * 免去注册自定义消息逻辑
       */
      var renameMessage = function renameMessage(message) {
        var messageType = message.messageType;

        var isCustom = utils.isEqual(im.MessageType.UnknownMessage, messageType);
        var clear = function clear(msg, content) {
          delete content.objectName;
          delete content.messageName;
          delete msg.conversationType;
          delete msg.messageId;
          delete msg.offLineMessage;
          delete msg.receivedStatus;
          delete msg.messageType;
          delete msg.targetId;
          delete msg.messageDirection;
        };
        var msg = utils.parse(utils.toJSON(message));
        var content = {};
        if (isCustom) {
          var customMsg = msg.content;
          content = customMsg.message.content;
        } else {
          content = msg.content;
        }
        clear(msg, content);
        utils.extend(msg, {
          content: content
        });
        msg = utils.rename(msg, {
          objectName: 'name',
          messageUId: 'uId',
          senderUserId: 'senderId'
        });
        return msg;
      };
      im.messageWatch = im.messageWatch || utils.noop;
      im.messageWatch(function (message) {
        var type = message.messageType,
            id = message.senderUserId,
            _message$content = message.content,
            uris = _message$content.uris,
            users = _message$content.users;

        var user = { id: id };
        if (utils.isArray(uris)) {
          uris = utils.map(uris, function (uri) {
            var tag = uri.tag;

            if (isV2Tag(tag)) {
              utils.extend(uri, {
                tag: TAG_V2
              });
            }
            return uri;
          });
        }
        switch (type) {
          case Message.STATE:
            roomEventHandler(users);
            break;
          case Message.PUBLISH:
            user = { id: id, uris: uris };
            if (utils.isInclude(id, '_')) {
              v2Users.set(id, true);
            }
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_PUBLISHED, user);
            });
            break;
          case Message.UNPUBLISH:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_UNPUBLISHED, user);
            });
            break;
          case Message.MODIFY:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              dispatchOperationEvent(user, function (event, user) {
                context.emit(event, user);
              });
            });
            break;
          default:
            context.emit(DownEvent.MESSAGE_RECEIVED, renameMessage(message));
        }
        Logger$1.log(LogTag.IM, {
          msg: 'receive:message',
          message: message
        });
      });
      return _this;
    }

    createClass(IM, [{
      key: 'registerMessage',
      value: function registerMessage() {
        var im = this.im,
            RongIMLib = this.RongIMLib;

        var register = function register(message) {
          var type = message.type,
              name = message.name,
              props = message.props;

          var isCounted = false;
          var isPersited = false;
          var tag = new RongIMLib.MessageTag(isCounted, isPersited);
          im.registerMessageType(type, name, tag, props);
        };
        var messages = [{
          type: Message.PUBLISH,
          name: getMsgName(Message.PUBLISH),
          props: ['uris']
        }, {
          type: Message.UNPUBLISH,
          name: getMsgName(Message.UNPUBLISH),
          props: ['uris']
        }, {
          type: Message.MODIFY,
          name: getMsgName(Message.MODIFY),
          props: ['uris']
        }, {
          type: Message.STATE,
          name: getMsgName(Message.STATE),
          props: ['users']
        }, {
          type: Message.ROOM_NOTIFY,
          name: getMsgName(Message.ROOM_NOTIFY),
          props: ['content']
        }, {
          type: Message.USER_NOTIFY,
          name: getMsgName(Message.USER_NOTIFY),
          props: ['content']
        }];
        utils.forEach(messages, function (message) {
          register(message);
        });
      }
    }, {
      key: 'joinRoom',
      value: function joinRoom(room) {
        var context = this;
        var im = context.im;

        utils.extend(context, {
          room: room,
          isJoinRoom: true
        });
        return utils.deferred(function (resolve, reject) {
          im.getInstance().joinRTCRoom(room, {
            onSuccess: function onSuccess(_ref) {
              var users = _ref.users,
                  token = _ref.token;

              context.rtcPing(room);

              var _context$getUser = context.getUser(),
                  currentUserId = _context$getUser.id;

              var tempUsers = utils.clone(users);
              Logger$1.log(LogTag.IM, {
                msg: 'join:room:inner:success',
                users: tempUsers
              });
              utils.forEach(tempUsers, function (tUser, userId) {
                tUser = tUser || {};
                // 过滤自己和为空的用户
                if (utils.isEmpty(tUser) || utils.isEqual(currentUserId, tUser.id)) {
                  delete users[userId];
                } else {
                  var user = users[userId];
                  var uris = user.uris;

                  context.v2Users.set(userId, true);
                  if (!utils.isUndefined(uris)) {
                    uris = utils.parse(uris);
                    utils.extend(user, {
                      uris: uris
                    });
                  }
                }
              });
              utils.extend(room, {
                rtcToken: token,
                users: users
              });
              context.emit(CommonEvent.JOINED, room);
              resolve(users);
            },
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'setLeaveStatus',
      value: function setLeaveStatus() {
        var context = this;
        var im = context.im,
            room = context.room,
            timer = context.timer;

        timer.pause();
        utils.extend(context, {
          isJoinRoom: false
        });
        context.emit(CommonEvent.LEFT, room);
        im.isJoinedRTCRoom = false;
      }
    }, {
      key: 'leaveRoom',
      value: function leaveRoom() {
        var context = this;
        var im = context.im,
            room = context.room,
            timer = context.timer;

        timer.pause();
        utils.extend(context, {
          isJoinRoom: false
        });
        context.emit(CommonEvent.LEFT, room);
        return utils.deferred(function (resolve, reject) {
          im.getInstance().quitRTCRoom(room, {
            onSuccess: function onSuccess() {
              resolve();
            },
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'getRoom',
      value: function getRoom() {
        var im = this.im,
            room = this.room;

        return utils.deferred(function (resolve, _reject) {
          im.getInstance().getRTCRoomInfo(room, {
            onSuccess: resolve,
            reject: function reject(code) {
              return _reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'getUsers',
      value: function getUsers() {
        var im = this.im,
            room = this.room;

        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCUserInfoList(room, {
            onSuccess: resolve,
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'getRTCToken',
      value: function getRTCToken() {
        var rtcToken = this.room.rtcToken;

        return rtcToken;
      }
    }, {
      key: 'getRoomId',
      value: function getRoomId() {
        var id = this.room.id;

        return id;
      }
    }, {
      key: 'getMSUrl',
      value: function getMSUrl() {
        var im = this.im;

        var navi = im.getInstance().getNavi();
        var rtcInfo = navi.voipCallInfo;

        rtcInfo = rtcInfo || '{"callEngine": [{}]}';
        rtcInfo = utils.parse(rtcInfo);
        var engines = rtcInfo.callEngine;
        var engine = utils.filter(engines, function (e) {
          return e.engineType === 4;
        })[0] || {};
        var urls = engine.backupMediaServer,
            mediaServer = engine.mediaServer;

        if (utils.isUndefined(urls)) {
          urls = [];
        }
        if (!utils.isUndefined(mediaServer)) {
          urls.unshift(mediaServer);
        }
        return urls;
      }
    }, {
      key: 'getUser',
      value: function getUser() {
        var user = this.room.user;

        return user;
      }
    }, {
      key: 'setUserInfo',
      value: function setUserInfo(key, value) {
        var room = this.room,
            im = this.im;

        value = utils.toJSON(value);
        var info = {
          key: key,
          value: value
        };
        return utils.deferred(function (resolve, reject) {
          im.getInstance().setRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      }
    }, {
      key: 'removeUserInfo',
      value: function removeUserInfo(keys) {
        var room = this.room,
            im = this.im;

        var info = {
          keys: keys
        };
        return utils.deferred(function (resolve, reject) {
          im.getInstance().removeRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      }
    }, {
      key: 'setUserData',
      value: function setUserData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        value = utils.toJSON(value);
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'setUserData:before',
          roomId: id,
          value: value,
          message: message
        });
        return utils.deferred(function (resolve, reject) {
          im.getInstance().setRTCUserData(id, key, value, isInner, {
            onSuccess: function onSuccess() {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'setUserData:after',
                roomId: id,
                value: value,
                message: message
              });
              resolve();
            },
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'getUserData',
      value: function getUserData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: function onError(error) {
              reject(error);
            }
          });
        });
      }
    }, {
      key: 'removeUserData',
      value: function removeUserData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().removeRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'setRoomData',
      value: function setRoomData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        return utils.deferred(function (resolve, reject) {
          im.getInstance().setRTCRoomData(id, key, value, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'getRoomData',
      value: function getRoomData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCRoomData(id, keys, isInner, {
            onSuccess: function onSuccess(data) {
              resolve(data);
            },
            onError: reject
          });
        });
      }
    }, {
      key: 'removeRoomData',
      value: function removeRoomData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return utils.deferred(function (resolve, reject) {
          im.getInstance().removeRTCRoomData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      }
    }, {
      key: 'getExistUsers',
      value: function getExistUsers() {
        var im = this.im,
            room = this.room;

        return utils.deferred(function (resolve, reject) {
          im.getInstance().getRTCUserList(room, {
            onSuccess: resolve,
            onError: function onError(code) {
              return reject(errorHandler(code));
            }
          });
        });
      }
    }, {
      key: 'sendMessage',
      value: function sendMessage(message) {
        var im = this.im,
            room = this.room,
            RongIMLib = this.RongIMLib;

        return utils.deferred(function (resolve, reject) {
          var conversationType = 12,
              targetId = room.id;
          var register = function register(name) {
            var isCounted = false;
            var isPersited = false;
            var tag = new RongIMLib.MessageTag(isCounted, isPersited);
            var content = message.content;

            var props = utils.map(utils.toArray(content), function (columns) {
              return columns[0];
            });
            im.registerMessageType(name, name, tag, props);
          };
          var create = function create() {
            var name = message.name,
                content = message.content;

            if (utils.isUndefined(im.RegisterMessage[name])) {
              register(name);
            }
            return new im.RegisterMessage[name](content);
          };
          var msg = create();
          Logger$1.log(LogTag.IM, {
            msg: 'send:before',
            message: message
          });
          im.getInstance().sendMessage(conversationType, targetId, msg, {
            onSuccess: function onSuccess() {
              Logger$1.log(LogTag.IM, {
                msg: 'send:after',
                message: message
              });
              resolve(room);
            },
            onError: function onError(code) {
              Logger$1.log(LogTag.IM, {
                msg: 'send:after',
                error: code
              });
              reject(code);
            }
          });
        });
      }
    }, {
      key: 'getMessage',
      value: function getMessage(type, content) {
        var name = getMsgName(type);
        content = utils.toJSON(content);
        return {
          name: name,
          content: content
        };
      }
    }, {
      key: 'isIMReady',
      value: function isIMReady() {
        var context = this;
        var CONNECTED = context.RongIMLib.ConnectionStatus.CONNECTED;

        return context.connectState === CONNECTED;
      }
    }, {
      key: 'getAppInfo',
      value: function getAppInfo() {
        var context = this;
        var im = context.im;

        return im.getInstance().getAppInfo();
      }
    }, {
      key: 'isJoined',
      value: function isJoined() {
        var context = this;
        return context.isJoinRoom;
      }
    }, {
      key: 'isSupportRTC',
      value: function isSupportRTC() {
        var context = this;
        var im = context.im;

        var isSupport = false;
        if (utils.isFunction(im.prototype.RTCPing)) {
          isSupport = true;
        }
        return isSupport;
      }
    }, {
      key: 'rePing',
      value: function rePing() {
        var context = this;
        var timer = context.timer;

        var roomId = context.getRoomId();
        if (!utils.isUndefined(roomId)) {
          context.emit(CommonEvent.RTC_PING_RECONNECT);
          timer.pause();
          context.rtcPing(context.room);
        }
      }
    }, {
      key: 'rtcPing',
      value: function rtcPing(room) {
        var context = this;
        var im = context.im,
            timer = context.timer;

        var count = 0;
        var isPinging = false;
        var Status = {
          reset: function reset() {
            count = 0;
            isPinging = false;
          },
          sum: function sum() {
            count += 1;
          }
        };
        var Inner = ErrorType.Inner;

        timer.resume(function () {
          if (count > PingCount) {
            timer.pause();
            utils.extend(context, {
              isJoinRoom: false
            });
            context.emit(CommonEvent.LEFT);
            return context.emit(CommonEvent.ERROR, Inner.SOCKET_UNAVAILABLE);
          }
          if (!context.isIMReady()) {
            return;
          }
          // 如果上次 Ping 没有结束，累计 Ping 次数
          if (isPinging) {
            Status.sum();
          }
          isPinging = true;
          im.getInstance().RTCPing(room, {
            onSuccess: function onSuccess() {
              if (context.isRTCPingInFailure) {
                context.emit(CommonEvent.RTC_PING_RECONNECT);
                Logger$1.log(LogTag.IM, {
                  msg: 'RTC Ping ReSuccess'
                });
              }
              context.isRTCPingInFailure = false;
              Status.reset();
            },
            onError: function onError(code) {
              context.isRTCPingInFailure = true;
              Logger$1.error(LogTag.IM, {
                msg: 'RTC Ping Error' + code
              });
            }
          });
        }, true);
      }
    }]);
    return IM;
  }(EventEmitter);

  function StreamHandler(im, option) {
    var pc = null;
    var prosumer = new utils.Prosumer();
    var eventEmitter = new EventEmitter();
    // const { detect } = option;
    // const network = new Network(detect);

    utils.extend(option, { im: im });

    var User = {
      set: function set$$1(key, data, isInner, message) {
        return im.setUserData(key, data, isInner, message);
      },
      SET_USERINFO: 'uris'
    };

    // 缓存数据
    var DataCache = utils.Cache();
    var DataCacheName = {
      USERS: 'room_users',
      // 全部通知后一次性交换 SDP
      IS_NOTIFY_READY: 'is_notify_ready'
    };

    // 已发布资源数据
    var PubResourceCache = utils.Cache();

    /**
     * 缓存订阅关系, 每次修改需同步全量数据
     */
    var subCache = utils.Cache();
    var SubscribeCache = {
      get: function get$$1(userId) {
        return subCache.get(userId);
      },
      set: function set$$1(userId, subs) {
        return subCache.set(userId, subs);
      },
      getKeys: function getKeys() {
        return subCache.getKeys();
      },
      remove: function remove(user) {
        var userId = user.id;

        var subs = subCache.get(userId) || [];
        var streamId = pc.getStreamId(user);
        subs = utils.filter(subs, function (_ref) {
          var msid = _ref.msid;

          return !utils.isEqual(streamId, msid);
        });
        subCache.set(userId, subs);
      },
      clear: function clear() {
        subCache.clear();
      }
    };

    var clear = function clear() {
      DataCache.clear();
      PubResourceCache.clear();
      SubscribeCache.clear();
    };

    // const getSubPromiseUId = (user) => {
    //   let { id, stream: { tag, type } } = user;
    //   let tpl = '{id}_{tag}_{type}';
    //   return utils.tplEngine(tpl, {
    //     id,
    //     tag,
    //     type
    //   });
    // };

    var getSubs = function getSubs() {
      var subs = [];
      var userIds = SubscribeCache.getKeys();
      utils.forEach(userIds, function (userId) {
        var streams = SubscribeCache.get(userId);
        utils.forEach(streams, function (stream) {
          subs.push(stream);
        });
      });
      return subs;
    };

    var getBody = function getBody(desc, config) {
      var subs = getSubs();
      var body = {
        subscribeList: subs
      };
      if (desc) {
        utils.extend(body, {
          sdp: desc
        });
        return utils.Defer.resolve(body);
      }
      return pc.getOffer(config).then(function (offer) {
        utils.extend(body, {
          sdp: offer
        });
        return body;
      });
    };

    var negotiate = function negotiate(offer, response) {
      var sdp = response.sdp;

      pc.setOffer(offer).then(function () {
        pc.setAnwser(sdp);
      });
    };

    var getUris = function getUris(publishList) {
      return utils.map(publishList, function (stream) {
        var msid = stream.msid;

        var tag = pc.getTagByStreamId(msid);
        utils.extend(stream, {
          tag: tag,
          state: StreamState.ENABLE
        });
        return stream;
      });
    };

    var exchangeHandler = function exchangeHandler(result, user, type, offer) {
      var publishList = result.publishList,
          sdp = result.sdp;

      pc.setOffer(offer).then(function () {
        pc.setAnwser(sdp);
      });
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'exchangeHandler set sdp'
      });
      var uris = getUris(publishList);
      var getTempUris = function getTempUris(type) {
        var userId = user.id;

        var cacheUris = PubResourceCache.get(userId) || [];
        var isPublish = utils.isEqual(type, Message.PUBLISH);
        if (isPublish) {
          cacheUris = uris;
        }
        var streamId = pc.getStreamId(user);
        var getCondition = function getCondition(stream) {
          var msid = stream.msid;

          return utils.isEqual(msid, streamId);
        };
        var tempUris = utils.filter(cacheUris, function (stream) {
          return getCondition(stream);
        });
        return utils.isEmpty(tempUris) ? uris : tempUris;
      };
      var sendUris = getTempUris(type);
      var content = {
        uris: sendUris
      };
      var message = im.getMessage(type, content);
      var isInner = true;
      User.set(User.SET_USERINFO, uris, isInner, message);
      return PubResourceCache.set(user.id, uris);
    };

    var getUId = function getUId(user, tpl) {
      tpl = tpl || '{userId}_{tag}_{type}';
      var userId = user.id,
          _user$stream = user.stream,
          tag = _user$stream.tag,
          type = _user$stream.type;

      if (utils.isEmpty(tag)) {
        tpl = '{userId}_{type}';
      }
      return utils.tplEngine(tpl, {
        userId: userId,
        tag: tag,
        type: type
      });
    };

    var dispatchStreamEvent$$1 = function dispatchStreamEvent$$1(user, callback) {
      var id = user.id,
          uris = user.stream.uris;

      utils.forEach(uris, function (uri) {
        var tag = uri.tag,
            type = uri.mediaType;

        var key = getUId({ id: id, stream: { tag: tag, type: type } });
        callback(key, uri);
      });
    };

    var getUsersById = function getUsersById(user) {
      var id = user.id;

      var subs = SubscribeCache.get(id);
      var streams = {},
          msTypes = {};
      utils.forEach(subs, function (_ref2) {
        var msid = _ref2.msid,
            tag = _ref2.tag,
            type = _ref2.type;

        streams[msid] = tag;
        var types = msTypes[msid] || [];
        types.push(type);
        msTypes[msid] = types;
      });
      var users = [];
      utils.forEach(streams, function (tag, msid) {
        var types = msTypes[msid] || [];
        var type = msTypes[0];
        type = utils.isEqual(types.length, 2) ? StreamType.AUDIO_AND_VIDEO : type;
        users.push({
          id: id,
          stream: {
            tag: tag,
            type: type
          }
        });
      });
      return users;
    };

    var isTrackExist = function isTrackExist(user, types) {
      var userId = user.id,
          tag = user.stream.tag;

      var isError = false;
      utils.forEach(types, function (type) {
        var tUser = {
          id: userId,
          stream: {
            tag: tag,
            type: type
          }
        };
        var key = getUId(tUser);

        var _ref3 = DataCache.get(key) || {},
            uri = _ref3.uri;

        if (utils.isUndefined(uri)) {
          isError = true;
        }
      });
      return isError;
    };

    var publish = function publish(user) {
      var roomId = im.getRoomId();
      pc.addStream(user);
      return utils.deferred(function (resolve, reject) {
        pc.createOffer(user).then(function (desc) {
          return getBody(desc).then(function (body) {
            var url = utils.tplEngine(Path.PUBLISH, {
              roomId: roomId
            });
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'publish:request',
              roomId: roomId,
              user: user,
              body: body
            });
            var headers = getHeaders(im);
            return request$2.post({
              path: url,
              body: body,
              headers: headers
            }).then(function (response) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'publish:response',
                roomId: roomId,
                user: user,
                response: response
              });
              exchangeHandler(response, user, Message.PUBLISH, desc);
              resolve();
            }, function (error) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'publish:response:error',
                roomId: roomId,
                user: user,
                error: error
              });
              reject(error);
            });
          });
        });
      });
    };

    var unpublish = function unpublish(user) {
      user = utils.clone(user);
      var roomId = im.getRoomId();
      pc.removeStream(user);
      return getBody().then(function (body) {
        var desc = body.sdp;

        var url = utils.tplEngine(Path.UNPUBLISH, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unpublish:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders(im);
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unpublish:response',
            roomId: roomId,
            user: user,
            response: response
          });
          exchangeHandler(response, user, Message.UNPUBLISH, desc);
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unpublish:response',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      });
    };

    var subscribe = function subscribe(user, callback) {
      var userId = user.id,
          _user$stream2 = user.stream,
          tag = _user$stream2.tag,
          type = _user$stream2.type,
          size = _user$stream2.size;

      var subs = SubscribeCache.get(userId) || [];
      var types = [StreamType.VIDEO, StreamType.AUDIO];
      if (!utils.isEqual(type, StreamType.AUDIO_AND_VIDEO)) {
        types = [type];
      }
      if (isTrackExist(user, types)) {
        var Inner = ErrorType.Inner;

        return utils.Defer.reject(Inner.STREAM_TRACK_NOT_EXIST);
      }

      if (utils.isUndefined(size)) {
        size = StreamSize.MAX;
      }

      utils.forEach(types, function (type) {
        var tUser = {
          id: userId,
          stream: {
            tag: tag,
            type: type
          }
        };
        var key = getUId(tUser);
        var uri = DataCache.get(key);
        var isAdd = true;
        utils.forEach(subs, function (sub) {
          var existType = sub.type,
              existTag = sub.tag;

          if (isV2Tag(existTag)) {
            tag = TAG_V2;
          }
          var isExist = utils.isEqual(type, existType) && utils.isEqual(tag, existTag);
          if (isExist) {
            isAdd = false;
          }
        });
        if (isAdd && !utils.isUndefined(uri)) {
          uri = utils.clone(uri);
          uri = utils.rename(uri, {
            mediaType: 'type'
          });
          subs.push(uri);
        }
      });
      SubscribeCache.set(userId, subs);
      var roomId = im.getRoomId();
      return utils.deferred(function (resolve, reject) {
        getBody().then(function (body) {
          var offer = body.sdp;

          var url = utils.tplEngine(Path.SUBSCRIBE, {
            roomId: roomId
          });
          var headers = getHeaders(im);
          var option = {
            path: url,
            body: body,
            headers: headers
          };
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'subscribe:request',
            roomId: roomId,
            option: option
          });
          request$2.post(option).then(function (response) {
            var answer = response.sdp;

            pc.setOffer(offer).then(function () {
              pc.setAnwser(answer);
            });
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'subscribe:response:stream:not:arrive',
              roomId: roomId,
              user: user,
              response: response
            });
            callback();
            pc.addRenderers(user);

            var uris = SubscribeCache.get(user.id) || [];
            utils.forEach(uris, function (uri) {
              var state = uri.state,
                  type = uri.type;

              var isEnabled = utils.isEqual(state, StreamState.ENABLE);
              pc.updateRenderers(user, type, isEnabled);
            });

            resolve(user);
          });
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'subscribe:response:error',
            roomId: roomId,
            user: user,
            error: error
          });
          reject(error);
        });
      });
    };

    var unsubscribe = function unsubscribe(user) {
      SubscribeCache.remove(user);
      var roomId = im.getRoomId();
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'unsubscribe:start',
        roomId: roomId,
        user: user
      });
      return getBody().then(function (body) {
        var url = utils.tplEngine(Path.UNSUBSCRIBE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unsubscrube:request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders(im);
        var offer = body.sdp;

        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response',
            roomId: roomId,
            user: user,
            response: response
          });
          negotiate(offer, response);
          pc.removeRenderers(user);
        }, function (error) {
          Logger$1.error(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response:error',
            roomId: roomId,
            user: user,
            error: error
          });
        }).catch(function (error) {
          Logger$1.error(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:response:error',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      });
    };

    var update = function update(user) {
      return utils.deferred(function (resolve, reject) {
        var code = pc.updateDisplayName(user);
        code === IE9_REQUEST_SUCCESS ? resolve() : reject();
      });
    };

    var resize = function resize(user) {
      var size = user.stream.size,
          id = user.id;

      var streams = SubscribeCache.get(id);
      if (utils.isUndefined(streams)) {
        return utils.Defer.reject(ErrorType.Inner.STREAM_NOT_EXIST);
      }
      var roomId = im.getRoomId();
      Logger$1.log(LogTag.STREAM_HANDLER, {
        msg: 'resize:start',
        roomId: roomId,
        user: user
      });
      return getBody().then(function (body) {
        var streamId = pc.getStreamId(user);
        var stream = utils.filter(streams, function (stream) {
          var msid = stream.msid;

          return utils.isEqual(streamId, msid);
        })[0];
        if (!stream) {
          var error = ErrorType.Inner.STREAM_NOT_EXIST;
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            error: error
          });
          return utils.Defer.reject(error);
        }
        var uri = stream.uri;

        utils.forEach(body.subscribeList, function (stream) {
          if (utils.isEqual(stream.uri, uri)) {
            utils.extend(stream, {
              simulcast: size
            });
          }
        });
        var url = utils.tplEngine(Path.RESIZE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'resize: request',
          roomId: roomId,
          user: user,
          body: body
        });
        var headers = getHeaders(im);
        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            response: response
          });
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:response',
            roomId: roomId,
            user: user,
            error: error
          });
        });
      });
    };

    var isCurrentUser = function isCurrentUser(user) {
      var _im$getUser = im.getUser(),
          id = _im$getUser.id;

      return utils.isEqual(user.id, id);
    };

    var trackHandler = function trackHandler(user, type, isEnable) {
      user.stream.type = type;
      pc.setTrackEnabled(user, isEnable);
    };

    var getFitUris = function getFitUris(user, type, state) {
      var id = user.id;

      var uris = PubResourceCache.get(id) || [];
      var targetId = pc.getStreamId(user);
      uris = utils.filter(uris, function (stream) {
        var msid = stream.msid,
            mediaType = stream.mediaType;

        var isSameStream = utils.isEqual(targetId, msid),
            isSameType = utils.isEqual(mediaType, type);
        var isFit = isSameStream && isSameType;
        if (isFit) {
          utils.extend(stream, {
            state: state
          });
        }
        return isFit;
      });
      return uris;
    };

    var saveModify = function saveModify(user, type, state) {
      var uris = getFitUris(user, type, state);
      if (!utils.isEmpty(uris)) {
        var id = user.id;

        var fullUris = PubResourceCache.get(id);
        var content = {
          uris: uris
        };
        var message = im.getMessage(Message.MODIFY, content);
        var isInner = true;
        User.set(User.SET_USERINFO, fullUris, isInner, message);
      }
      return utils.Defer.resolve();
    };

    var modifyTrack = function modifyTrack(user, type, state, isEnabled) {
      trackHandler(user, type, isEnabled);
      if (isCurrentUser(user)) {
        saveModify(user, type, state, isEnabled);
      }
      return utils.Defer.resolve();
    };

    var mute = function mute(user) {
      var isEnabled = false;
      return modifyTrack(user, StreamType.AUDIO, StreamState.DISBALE, isEnabled);
    };

    var unmute = function unmute(user) {
      var isEnabled = true;
      return modifyTrack(user, StreamType.AUDIO, StreamState.ENABLE, isEnabled);
    };

    var disable = function disable(user) {
      var isEnabled = false;
      return modifyTrack(user, StreamType.VIDEO, StreamState.DISBALE, isEnabled);
    };

    var enable = function enable(user) {
      var isEnabled = true;
      return modifyTrack(user, StreamType.VIDEO, StreamState.ENABLE, isEnabled);
    };

    var reconnect = function reconnect() {
      var roomId = im.getRoomId();
      getBody(null, {
        isRestartICE: true
      }).then(function (body) {
        var url = utils.tplEngine(Path.SUBSCRIBE, {
          roomId: roomId
        });
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'publish:reconnect:request',
          roomId: roomId,
          body: body
        });
        var headers = getHeaders(im);
        var offer = body.sdp;

        return request$2.post({
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publish:reconnect:response',
            roomId: roomId,
            response: response
          });
          negotiate(offer, response);
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publish:reconnect:response',
            roomId: roomId,
            error: error
          });
          return error;
        });
      });
    };

    var compare = function compare() {
      var format = function format(users) {
        var streams = {};
        utils.forEach(users, function (_ref4) {
          var uris = _ref4.uris;

          utils.forEach(uris, function (uri) {
            var msid = uri.msid;

            var resources = streams[msid] || [];
            resources.push(uri);
            streams[msid] = resources;
          });
        });
        return streams;
      };

      var dispatch = function dispatch(event, id, uris, callback) {
        dispatchStreamEvent({ id: id, uris: uris }, function (user) {
          if (utils.isFunction(callback)) {
            return callback(user);
          }
          im.emit(event, user);
        });
      };

      var compareStreams = function compareStreams(localUsers, remoteUsers) {
        localUsers = format(localUsers);
        remoteUsers = format(remoteUsers);
        var tempLocalUsers = utils.clone(localUsers);
        utils.forEach(remoteUsers, function (remoteUris, remoteMSId) {
          /** 
           * 包含本地资源说明流没有变化，删除 tempLocalUsers，且需比对 track 变化，state 有差异，以 remoteUsers 为准
           * 未包含说明是新发布资源，触发 published 事件 
           * 遍历后 tempLocalUsers 还有数据认为是取消发布
           */
          var isInclude = remoteMSId in localUsers;

          var _pc$getStreamSymbolBy = pc.getStreamSymbolById(remoteMSId),
              _pc$getStreamSymbolBy2 = slicedToArray(_pc$getStreamSymbolBy, 1),
              userId = _pc$getStreamSymbolBy2[0];

          var _im$getUser2 = im.getUser(),
              currentUserId = _im$getUser2.id;

          var isCurrent = utils.isEqual(currentUserId, userId);
          if (isInclude) {
            delete tempLocalUsers[remoteMSId];
            var tempRemote = utils.toJSON(remoteUris);
            var localUris = localUsers[remoteMSId];
            var tempLocal = utils.toJSON(localUris);
            if (!utils.isEqual(tempRemote, tempLocal)) {
              dispatch('', userId, remoteUris, function (user) {
                dispatchOperationEvent(user, function (event, user) {
                  im.emit(event, user);
                });
              });
            }
          } else {
            if (!isCurrent) {
              dispatch(DownEvent.STREAM_PUBLISHED, userId, remoteUris);
            }
          }
        });
        utils.forEach(tempLocalUsers, function (localUris, localMSId) {
          var _pc$getStreamSymbolBy3 = pc.getStreamSymbolById(localMSId),
              _pc$getStreamSymbolBy4 = slicedToArray(_pc$getStreamSymbolBy3, 1),
              userId = _pc$getStreamSymbolBy4[0];

          dispatch(DownEvent.STREAM_UNPUBLISHED, userId, localUris);
        });
      };

      var compareUser = function compareUser(localUsers, remoteUsers) {
        var tempLocalUsers = utils.clone(localUsers);
        var tempRemoteUsers = utils.toArray(remoteUsers);

        var _im$getUsers = im.getUsers(),
            currentUserId = _im$getUsers.id;

        utils.forEach(tempRemoteUsers, function (_ref5) {
          var _ref6 = slicedToArray(_ref5, 1),
              remoteUserId = _ref6[0];

          var isInclude = remoteUserId in localUsers;
          var isCurrent = utils.isEqual(currentUserId, remoteUserId);
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'stream:compareuser',
            currentUserId: currentUserId,
            remoteUserId: remoteUserId,
            isInclude: isInclude,
            localUsers: localUsers
          });
          if (isInclude) {
            delete tempLocalUsers[remoteUserId];
          } else {
            if (!isCurrent) {
              im.emit(DownEvent.ROOM_USER_JOINED, { id: remoteUserId });
            }
          }
        });
        tempLocalUsers = utils.toArray(tempLocalUsers);
        utils.forEach(tempLocalUsers, function (_ref7) {
          var _ref8 = slicedToArray(_ref7, 1),
              id = _ref8[0];

          im.emit(DownEvent.ROOM_USER_LEFT, { id: id });
        });
      };

      return im.getUsers().then(function (remoteUsers) {
        utils.forEach(remoteUsers, function (user) {
          var uris = user.uris;

          uris = utils.parse(uris);
          utils.extend(user, {
            uris: uris
          });
        });
        var localUsers = DataCache.get(DataCacheName.USERS);
        compareUser(localUsers, remoteUsers);
        compareStreams(localUsers, remoteUsers);
        DataCache.set(DataCacheName.USERS, remoteUsers);
      });
    };

    im.on(CommonEvent.CONNECTED, function () {
      var users = DataCache.get(DataCacheName.USERS);
      if (users) {
        // 断网重连后, 调用 compare()
        compare().then(function () {
          reconnect();
        }, function (error) {
          Logger$1.log(LogTag.IM, {
            msg: 'reconnect:compare:error',
            error: error
          });
        });
      }
    });

    /**
     * 已在房间，再有新人发布资源触发此事件
     * 此处为缓存对应人员资源信息
     */
    im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
      if (error) {
        throw error;
      }
      dispatchStreamEvent$$1(user, function (key, uri) {
        DataCache.set(key, uri);
      });
    });

    im.on(CommonEvent.LEFT, function () {
      clear();
      pc && pc.close();
    });

    im.on(CommonEvent.JOINED, function (error, room) {
      if (error) {
        throw error;
      }
      var users = room.users;

      pc = new PeerConnection(option);
      im.emit(CommonEvent.PEERCONN_CREATED, pc);

      /**
       * IE 插件自动渲染
       * 此处不监听 addstream、removestream
       * TODO 是否需要监听 change, 做重连处理
       */

      var usersHandler = function usersHandler() {
        DataCache.set(DataCacheName.USERS, users);

        var _im$getUsers2 = im.getUsers(),
            currentUserId = _im$getUsers2.id;

        utils.forEach(users, function (data, id) {
          var uris = data.uris;

          if (utils.isUndefined(uris)) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'user exist, uris is empty',
              user: {
                id: id
              }
            });
            return;
          }
          if (utils.isEqual(currentUserId, id)) {
            var _uris = slicedToArray(uris, 1),
                stream = _uris[0];

            if (utils.isUndefined(stream)) {
              return;
            }
            var type = stream.mediaType,
                tag = stream.tag;

            type = utils.isEqual(uris.length, 1) ? type : StreamType.AUDIO_AND_VIDEO;
            return unpublish({
              id: id,
              stream: {
                tag: tag,
                type: type
              }
            });
          }
          utils.forEach(uris, function (uri) {
            var type = uri.mediaType,
                tag = uri.tag;

            var key = getUId({
              id: id,
              stream: {
                type: type,
                tag: tag
              }
            });
            DataCache.set(key, uri);
          });
          var streams = utils.uniq(uris, function (target) {
            var streamId = target.streamId,
                tag = target.tag;

            if (isV2Tag(tag)) {
              tag = TAG_V2;
            }
            return {
              key: [streamId, tag].join('_'),
              value: { tag: tag }
            };
          });
          utils.forEach(streams, function (stream) {
            var tag = stream.tag;

            var msUris = utils.filter(uris, function (_ref9) {
              var msid = _ref9.msid;

              return utils.isInclude(msid, tag);
            });
            setTimeout(function () {
              im.emit(DownEvent.STREAM_PUBLISHED, {
                id: id,
                stream: {
                  tag: tag,
                  uris: msUris
                }
              });
            });
          });
        });
      };
      usersHandler();
    });

    im.on(CommonEvent.RTC_PING_RECONNECT, function () {
      reconnect();
    });

    im.on(DownEvent.ROOM_USER_LEFT, function (error, user) {
      if (error) {
        throw error;
      }
      var users = getUsersById(user);
      utils.forEach(users, function (user) {
        unsubscribe(user);
      });
    });

    im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
      if (error) {
        throw error;
      }
      dispatchStreamEvent$$1(user, function (key) {
        DataCache.remove(key);
      });
      unsubscribe(user);
    });

    im.on(DownEvent.STREAM_MUTED, function (error, user) {
      if (error) {
        throw error;
      }
      pc.updateRenderers(user, StreamType.AUDIO, false);
    });

    im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
      if (error) {
        throw error;
      }
      pc.updateRenderers(user, StreamType.AUDIO, true);
    });

    im.on(DownEvent.STREAM_DISABLED, function (error, user) {
      if (error) {
        throw error;
      }
      pc.updateRenderers(user, StreamType.VIDEO, false);
    });

    im.on(DownEvent.STREAM_ENABLED, function (error, user) {
      if (error) {
        throw error;
      }
      pc.updateRenderers(user, StreamType.VIDEO, true);
    });

    eventEmitter.on(CommonEvent.CONSUME, function () {
      prosumer.consume(function (_ref10, next) {
        var event = _ref10.event,
            args = _ref10.args,
            resolve = _ref10.resolve,
            reject = _ref10.reject;

        switch (event) {
          case UpEvent.STREAM_PUBLISH:
            return publish.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNPUBLISH:
            return unpublish.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_SUBSCRIBE:
            return subscribe.apply(undefined, toConsumableArray(args).concat([function () {
              next();
            }])).then(function (result) {
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNSUBSCRIBE:
            return unsubscribe.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_RESIZE:
            return resize.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UPDATE:
            return update.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_MUTE:
            return mute.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_UNMUTE:
            return unmute.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_DISABLE:
            return disable.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_ENABLE:
            return enable.apply(undefined, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          default:
            Logger$1.warn(LogTag.STREAM_HANDLER, {
              event: event,
              msg: 'unkown event'
            });
        }
      });
    });

    var dispatch = function dispatch(event, args) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({
          event: event,
          args: args,
          resolve: resolve,
          reject: reject
        });
        eventEmitter.emit(CommonEvent.CONSUME);
      });
    };

    return {
      dispatch: dispatch
    };
  }

  function RoomHandler(im, option) {
    var join = function join(room) {
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'join:before',
        room: room
      });
      if (im.isJoined()) {
        var Inner = ErrorType.Inner;

        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'join:after',
          extra: 'repeate join room'
        });
        return utils.Defer.reject(Inner.ROOM_REPEAT_JOIN);
      }
      return utils.deferred(function (resolve, reject) {
        var mode = option.mode;

        utils.extend(room, {
          mode: mode
        });
        im.joinRoom(room).then(function (users) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after',
            users: users
          });
          users = utils.toArray(users);
          users = utils.map(users, function (user) {
            return {
              id: user[0]
            };
          });
          resolve({
            users: users
          });
        }).catch(function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after:error',
            room: room,
            error: error
          });
          reject(error);
        });
      });
    };
    var leave = function leave() {
      var roomId = im.getRoomId();
      var user = im.getUser();
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'leave:before',
        roomId: roomId,
        user: user
      });
      im.setLeaveStatus();
      var token = im.getRTCToken();
      var url = utils.tplEngine(Path.EXIT, {
        roomId: roomId
      });
      var headers = getHeaders(im);
      return utils.deferred(function (resolve, reject) {
        request$2.post({
          path: url,
          headers: headers,
          body: {
            token: token
          }
        }).then(function () {
          im.leaveRoom().then(function () {
            Logger$1.log(LogTag.ROOM_HANDLER, {
              msg: 'leave:after',
              roomId: roomId,
              user: user
            });
            resolve();
          }, function (error) {
            Logger$1.log(LogTag.ROOM_HANDLER, {
              msg: 'leave:im:error',
              roomId: roomId,
              error: error,
              user: user
            });
            reject(error);
          });
        }, function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:ms:error',
            roomId: roomId,
            error: error,
            user: user
          });
          reject(error);
        });
      });
    };
    var get$$1 = function get$$1() {
      return im.getRoom();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.ROOM_JOIN:
          return join.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_LEAVE:
          return leave.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.ROOM_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function StorageHandler(im) {
    var isInner = false;
    var getType = function getType(type) {
      return utils.isEqual(type, StorageType.ROOM) ? 'Room' : 'User';
    };
    var getName = function getName(operate, type) {
      var tpl = '{operate}{type}Data';
      type = getType(type);
      return utils.tplEngine(tpl, {
        operate: operate,
        type: type
      });
    };
    var set$$1 = function set$$1(type, key, value, message) {
      var name = getName('set', type);
      return im[name](key, value, isInner, message);
    };
    var get$$1 = function get$$1(type, key) {
      var name = getName('get', type);
      return im[name](key, isInner);
    };
    var remove = function remove(type, key, message) {
      var name = getName('remove', type);
      return im[name](key, isInner, message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.STORAGE_SET:
          return set$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_REMOVE:
          return remove.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.STORAGE_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function MessageHandler(im) {
    var send = function send(message) {
      return im.sendMessage(message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.MESSAGE_SEND:
          return send.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.MESSAGE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function DeviceHandler() {
    var get$$1 = function get$$1() {
      return navigator.mediaDevices.enumerateDevices();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.DEVICE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.DEVICE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function ReportHandler(im) {
    var pc = null,
        reportTimer = 0;

    var TrackCache = utils.Cache();
    var TrackStateCache = utils.Cache();
    var setTrackCache = function setTrackCache(stream, user) {
      var tracks = stream.getTracks();
      var id = user.id,
          tag = user.stream.tag;

      utils.forEach(tracks, function (_ref) {
        var trackId = _ref.id;

        TrackCache.set(trackId, {
          id: id,
          stream: { tag: tag }
        });
      });
    };
    var getAudioLevel = function getAudioLevel(level) {
      level = level || 0;
      var index = Math.floor(level / 1000);
      if (index >= AUDIO_LEVEL.length) {
        index = 0;
      }
      return AUDIO_LEVEL[index];
    };
    var resourceHandler = function resourceHandler(stat) {
      var trackId = stat.googTrackId,
          mediaType = stat.mediaType;

      if (utils.isEqual(mediaType, 'audio')) {
        // 不区分 Input、Output 最终对应用层按 user 暴露
        var audioLevel = stat['audioOutputLevel'] || stat['audioInputLevel'];
        audioLevel = getAudioLevel(audioLevel);
        var latestLevel = TrackStateCache.get(trackId);
        if (!utils.isEqual(latestLevel, audioLevel)) {
          var user = TrackCache.get(trackId);
          if (utils.isObject(user)) {
            utils.extend(user.stream, {
              audioLevel: audioLevel
            });
            TrackStateCache.set(trackId, audioLevel);
            im.emit(DownEvent.REPORT_SPOKE, user);
          }
        }
      }
    };
    var statsHandler = function statsHandler(stats) {
      utils.forEach(stats, function (stat) {
        var type = stat.type;

        if (utils.isInclude(type, 'ssrc')) {
          resourceHandler(stat);
        }
      });
    };
    var clear = function clear() {
      clearInterval(reportTimer);
    };
    im.on(CommonEvent.PEERCONN_CREATED, function (error, _pc) {
      if (error) {
        throw error;
      }
      pc = _pc;
    });
    im.on(CommonEvent.LEFT, function () {
      TrackCache.clear();
      TrackStateCache.clear();
      clear();
    });
    im.on(CommonEvent.PUBLISHED_STREAM, function (error, data) {
      if (error) {
        throw error;
      }
      var mediaStream = data.mediaStream,
          user = data.user;

      setTrackCache(mediaStream, user);
    });

    var start = function start(_option) {
      var option = {
        frequency: REPORT_FREQUENCY
      };
      if (utils.isObject(_option)) {
        utils.extend(option, _option);
      }
      if (isSafari()) {
        return;
      }
      if (reportTimer) {
        clear();
      }
      reportTimer = setInterval(function () {
        if (!pc) {
          return clear();
        }
        pc.getStats(function (stats) {
          statsHandler(stats);
        });
      }, option.frequency);
      return utils.Defer.resolve();
    };
    var stop = function stop() {
      clear();
      return utils.Defer.resolve();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.REPORT_START:
          return start.apply(undefined, toConsumableArray(args));
        case UpEvent.REPORT_STOP:
          return stop.apply(undefined, toConsumableArray(args));
      }
    };
    return {
      dispatch: dispatch
    };
  }

  var Client = function (_EventEmitter) {
    inherits(Client, _EventEmitter);

    /* 
      let option = {
        url: 'mediaServer path',
        RongIMLib
      };
    */
    function Client(option) {
      classCallCheck(this, Client);

      var _this = possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this));

      var im = new IM(option);
      var RequestHandler = {
        room: RoomHandler(im, option),
        stream: StreamHandler(im, option),
        storage: StorageHandler(im),
        message: MessageHandler(im),
        device: DeviceHandler(im),
        report: ReportHandler(im)
      };
      var context = _this;
      var RongIMLib = option.RongIMLib;

      var destroyed = false;
      utils.extend(context, {
        RongIMLib: RongIMLib,
        option: option,
        destroyed: destroyed,
        im: im,
        RequestHandler: RequestHandler
      });
      var bindEvent = function bindEvent(event) {
        var name = event.name;

        im.on(name, function (error, user) {
          context.emit(name, user, error);
        });
      };
      utils.forEach(RoomEvents, bindEvent);
      im.on(CommonEvent.JOINED, function () {
        var urls = im.getMSUrl();
        var customUrl = option.url;

        if (!utils.isEmpty(customUrl)) {
          urls = [customUrl];
        }
        if (utils.isEmpty(urls)) {
          var Inner = ErrorType.Inner;

          var error = Inner.ENGINE_ERROR;
          return context.emit(DownEvent.RTC_ERROR, error);
        }
        request$2.setOption({
          urls: urls
        });
        context.emit(DownEvent.RTC_MOUNTED);
      });
      im.on(CommonEvent.LEFT, function () {
        context.emit(DownEvent.RTC_UNMOUNTED);
      });
      im.on(CommonEvent.ERROR, function (error, data) {
        context.emit(DownEvent.RTC_ERROR, data, error);
      });
      im.on(DownEvent.MESSAGE_RECEIVED, function (error, message) {
        context.emit(DownEvent.MESSAGE_RECEIVED, message, error);
      });
      im.on(DownEvent.REPORT_SPOKE, function (error, user) {
        context.emit(DownEvent.REPORT_SPOKE, user, error);
      });
      var getMSType = function getMSType(uris) {
        var check = function check(msType) {
          return utils.some(uris, function (_ref) {
            var mediaType = _ref.mediaType;

            // return utils.isEqual(msType, mediaType) && utils.isEqual(state, StreamState.ENABLE);
            // 只区分 track 不区分
            return utils.isEqual(msType, mediaType);
          });
        };
        var type = StreamType.NODE;
        var hasAudio = check(StreamType.AUDIO);
        var hasVideo = check(StreamType.VIDEO);
        if (hasAudio) {
          type = StreamType.AUDIO;
        }
        if (hasVideo) {
          type = StreamType.VIDEO;
        }
        if (hasVideo && hasAudio) {
          type = StreamType.AUDIO_AND_VIDEO;
        }
        return type;
      };
      var eventHandler = function eventHandler(name, result, error) {
        var id = result.id,
            _result$stream = result.stream,
            tag = _result$stream.tag,
            uris = _result$stream.uris,
            size = _result$stream.size;

        var user = {
          id: id,
          stream: {
            tag: tag
          }
        };
        if (uris) {
          user.stream.type = getMSType(uris);
        }
        if (size) {
          user.stream.size = size;
        }
        context.emit(name, user, error);
      };
      im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_PUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNPUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_DISABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_DISABLED, user, error);
      });
      im.on(DownEvent.STREAM_ENABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_ENABLED, user, error);
      });
      im.on(DownEvent.STREAM_MUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_MUTED, user, error);
      });
      im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNMUTED, user, error);
      });
      im.on(DownEvent.STREAM_RESIZED, function (error, user) {
        eventHandler(DownEvent.STREAM_RESIZED, user, error);
      });
      return _this;
    }

    createClass(Client, [{
      key: 'exec',
      value: function exec(params) {
        var context = this;
        var im = context.im;

        if (context.isDestroyed()) {
          return utils.Defer.reject(ErrorType.Inner.INSTANCE_IS_DESTROYED);
        }
        if (!im.isSupportRTC()) {
          return utils.Defer.reject(ErrorType.Inner.IM_SDK_VER_NOT_MATCH);
        }
        var type = params.type,
            args = params.args,
            event = params.event;

        var APIWhitelist = [UpEvent.ROOM_JOIN, UpEvent.DEVICE_GET, UpEvent.STREAM_GET];
        var isInclude = utils.isInclude(APIWhitelist, event);

        if (!im.isIMReady() && !isInclude) {
          return utils.Defer.reject(ErrorType.Inner.IM_NOT_CONNECTED);
        }

        if (!isInclude && !im.isJoined()) {
          return utils.Defer.reject(ErrorType.Inner.RTC_NOT_JOIN_ROOM);
        }
        var RequestHandler = this.RequestHandler;

        Logger$1.log(type, {
          func: event,
          type: EventType.REQUEST,
          args: args
        });
        return RequestHandler[type].dispatch(event, args).then(function (result) {
          Logger$1.log(type, {
            func: event,
            type: EventType.RESPONSE,
            result: result
          });
          return result;
        }, function (error) {
          Logger$1.error(type, {
            func: event,
            type: EventType.RESPONSE,
            error: error
          });
          error = utils.rename(error, {
            resultCode: 'code'
          });
          throw error;
        });
      }
    }, {
      key: 'isDestroyed',
      value: function isDestroyed() {
        return this.destroyed;
      }
    }, {
      key: 'extendOption',
      value: function extendOption(_option) {
        var context = this;
        utils.extend(context.option, _option);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var context = this;
        utils.extend(context, {
          destroyed: true
        });
        context.teardown();
        context.im.teardown();
      }
    }]);
    return Client;
  }(EventEmitter);

  var Storage = function () {
    function Storage(_option) {
      classCallCheck(this, Storage);

      _option = _option || {};
      var context = this;
      var client = context.getClient();
      var option = {
        type: StorageType.ROOM
      };
      utils.extend(option, _option);
      utils.extend(context, {
        option: option,
        client: client
      });
    }

    createClass(Storage, [{
      key: 'set',
      value: function set$$1(key, value, message) {
        var _check = check({ key: key, value: value }, ['key', 'value']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_SET,
          type: 'storage',
          args: [type, key, value, message]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(key) {
        var _check2 = check({ key: key }, ['key']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_GET,
          type: 'storage',
          args: [type, key]
        });
      }
    }, {
      key: 'remove',
      value: function remove(key, message) {
        var _check3 = check({ key: key }, ['key']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_REMOVE,
          type: 'storage',
          args: [type, key, message]
        });
      }
    }]);
    return Storage;
  }();

  var Message$1 = function () {
    function Message(_option) {
      classCallCheck(this, Message);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(MessageEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, message) {
          event = option[type] || utils.noop;
          event(message, error);
          Logger$1.log(LogTag.MESSAGE, {
            event: type,
            message: message
          });
        });
      });
    }

    createClass(Message, [{
      key: 'send',
      value: function send(message) {
        var _check = check(message, ['name', 'content']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client;

        return client.exec({
          event: UpEvent.MESSAGE_SEND,
          type: 'message',
          args: [message]
        });
      }
    }]);
    return Message;
  }();

  var Device = function () {
    function Device() {
      classCallCheck(this, Device);

      var context = this;
      var client = context.getClient();
      utils.extend(context, {
        client: client
      });
    }

    createClass(Device, [{
      key: 'get',
      value: function get$$1() {
        var client = this.client;

        return client.exec({
          event: UpEvent.DEVICE_GET,
          type: 'device',
          args: []
        });
      }
    }]);
    return Device;
  }();

  var Report = function () {
    function Report(_option) {
      classCallCheck(this, Report);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(ReportEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, report) {
          event = option[type] || utils.noop;
          event(report, error);
        });
      });
    }

    createClass(Report, [{
      key: 'start',
      value: function start(option) {
        var client = this.client;

        return client.exec({
          event: UpEvent.REPORT_START,
          type: 'report',
          args: [option]
        });
      }
    }, {
      key: 'stop',
      value: function stop() {
        var client = this.client;

        return client.exec({
          event: UpEvent.REPORT_STOP,
          type: 'report',
          args: []
        });
      }
    }]);
    return Report;
  }();

  var RongRTC = function () {
    function RongRTC(_option) {
      classCallCheck(this, RongRTC);

      var context = this;
      var option = {
        url: '',
        debug: false,
        bitrate: {
          max: 1000,
          min: 100,
          start: 300
        },
        mode: RTC_MODE.RTC,
        created: function created() {},
        mounted: function mounted() {},
        unmounted: function unmounted() {},
        destroyed: function destroyed() {},
        error: function error() {}
      };
      utils.extend(option, _option);
      var logger = option.logger,
          debug = option.debug;
      var Outer = ErrorType.Outer;

      if (utils.isFunction(logger)) {
        Logger$1.watch(logger, true);
      }
      if (debug) {
        Logger$1.watch(function (log) {
          utils.Log.log(log);
        });
      }
      var client = new Client(option);
      utils.forEach([Room, Stream, Storage, Message$1, Device, Report], function (module) {
        module.prototype.getClient = function () {
          return client;
        };
      });
      utils.extend(context, {
        Room: Room,
        Stream: Stream,
        Storage: Storage,
        StreamType: StreamType,
        StreamSize: StreamSize,
        StorageType: StorageType,
        Mode: RTC_MODE,
        Message: Message$1,
        Device: Device,
        Report: Report,
        ErrorType: Outer,
        option: option,
        client: client
      });
      var created = option.created,
          mounted = option.mounted,
          unmounted = option.unmounted,
          error = option.error;

      created();
      Logger$1.log(LogTag.LIFECYCLE, {
        state: 'created'
      });
      client.on(DownEvent.RTC_MOUNTED, function () {
        mounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'mounted'
        });
      });
      client.on(DownEvent.RTC_UNMOUNTED, function () {
        unmounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'unmounted'
        });
      });
      client.on(DownEvent.RTC_ERROR, function (e, data) {
        if (e) {
          throw new Error(e);
        }
        error(data);
      });
    }

    createClass(RongRTC, [{
      key: 'destroy',
      value: function destroy() {
        var destroyed = this.option.destroyed,
            client = this.client;

        destroyed();
        client.destroy();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'destroyed'
        });
      }
    }]);
    return RongRTC;
  }();

  utils.extend(RongRTC, {
    StreamType: StreamType,
    StreamSize: StreamSize,
    StorageType: StorageType,
    Tag: IE_TAG,
    Resolution: IE_RESOLUTION,
    FrameRate: IE_FRAME_RATE,
    Rotate: IE_ROTATE,
    Mode: RTC_MODE
  });

  return RongRTC;

})));
