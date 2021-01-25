/**
 * @rongcloud/imlib-v4
 * Version: v4.1.0
 * CommitId: 0012eb74bbf7318ea4a4e2ee3e3e858d6849090c
 * Date: Mon Dec 28 2020 11:08:22 GMT+0800 (China Standard Time)
 * ©2020 RongCloud, Inc. All rights reserved.
 */
var RongIMLib = (function (exports) {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
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
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap;

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator;

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }

      context.delegate = null;
      return ContinueSentinel;
    }

    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };
    return exports;
  }((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" ? module.exports : {});

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }

  var _this = undefined,
      _methods,
      _validators,
      _SSMsg,
      _PublishTopicToConver,
      _ConversationTypeToQu,
      _ConversationTypeToCl;

  var ReceivedStatus;

  (function (ReceivedStatus) {
    ReceivedStatus[ReceivedStatus["READ"] = 1] = "READ";
    ReceivedStatus[ReceivedStatus["LISTENED"] = 2] = "LISTENED";
    ReceivedStatus[ReceivedStatus["DOWNLOADED"] = 4] = "DOWNLOADED";
    ReceivedStatus[ReceivedStatus["RETRIEVED"] = 8] = "RETRIEVED";
    ReceivedStatus[ReceivedStatus["UNREAD"] = 0] = "UNREAD";
  })(ReceivedStatus || (ReceivedStatus = {}));

  var ReceivedStatus$1 = ReceivedStatus;
  var NAVI_CACHE_DURATION = 2 * 60 * 60 * 1000;
  var NAVI_REQ_TIMEOUT = 10 * 1000;
  var PING_REQ_TIMEOUT = 5 * 1000;
  var WEB_SOCKET_TIMEOUT = 5 * 1000;
  var PUBLIC_CLOUD_NAVI_URIS = ['https://nav.cn.ronghub.com', 'https://nav2-cn.ronghub.com'];
  var MINI_SOCKET_CONNECT_URIS = ['wsproxy.cn.ronghub.com', 'wsap-cn.ronghub.com'];
  var MINI_COMET_CONNECT_URIS = ['cometproxy-cn.ronghub.com', 'mini-cn.ronghub.com'];
  var IM_SIGNAL_TIMEOUT = 30 * 1000;
  var IM_PING_INTERVAL_TIME = 30 * 1000;
  var MAX_MESSAGE_CONTENT_BYTES = 128 * 1024;
  var IM_COMET_PULLMSG_TIMEOUT = 45000;
  var STORAGE_ROOT_KEY = 'RCV4-';
  var SEND_MESSAGE_TYPE_OPTION = {
    'RC:TxtMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:ImgMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:VcMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:ImgTextMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:FileMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:HQVCMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:LBSMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:PSImgTxtMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:PSMultiImgTxtMsg': {
      isCounted: true,
      isPersited: true
    },
    'RCJrmf:RpMsg': {
      isCounted: true,
      isPersited: true
    },
    'RCJrmf:RpOpendMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:CombineMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:ReferenceMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:SightMsg': {
      isCounted: true,
      isPersited: true
    },
    'RC:InfoNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:ContactNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:ProfileNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:CmdNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:GrpNtf': {
      isCounted: false,
      isPersited: true
    },
    'RC:RcCmd': {
      isCounted: false,
      isPersited: true
    },
    'RC:CmdMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:TypSts': {
      isCounted: false,
      isPersited: false
    },
    'RC:PSCmd': {
      isCounted: false,
      isPersited: false
    },
    'RC:SRSMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:RRReqMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:RRRspMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsChaR': {
      isCounted: false,
      isPersited: false
    },
    'RC:CSCha': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsEva': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsContact': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsHs': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsHsR': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsSp': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsEnd': {
      isCounted: false,
      isPersited: false
    },
    'RC:CsUpdate': {
      isCounted: false,
      isPersited: false
    },
    'RC:ReadNtf': {
      isCounted: false,
      isPersited: false
    },
    'RC:chrmKVNotiMsg': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCAccept': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCRinging': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCSummary': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCHangup': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCInvite': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCModifyMedia': {
      isCounted: false,
      isPersited: false
    },
    'RC:VCModifyMem': {
      isCounted: false,
      isPersited: false
    },
    'RC:MsgExMsg': {
      isCounted: false,
      isPersited: false
    }
  };
  var rootStorage;

  var createRootStorage = function createRootStorage(runtime) {
    var _this2 = this;

    _newArrowCheck(this, _this);

    if (!rootStorage) {
      rootStorage = {
        set: function set(key, val) {
          _newArrowCheck(this, _this2);

          runtime.localStorage.setItem(key, JSON.stringify(val));
        }.bind(this),
        get: function get(key) {
          _newArrowCheck(this, _this2);

          var val;

          try {
            val = JSON.parse(runtime.localStorage.getItem(key));
          } catch (e) {
            val = null;
          }

          return val;
        }.bind(this),
        remove: function remove(key) {
          _newArrowCheck(this, _this2);

          return runtime.localStorage.removeItem(key);
        }.bind(this),
        getKeys: function getKeys() {
          _newArrowCheck(this, _this2);

          var keys = [];

          for (var _key in runtime.localStorage) {
            keys.push(_key);
          }

          return keys;
        }.bind(this)
      };
    }

    return rootStorage;
  }.bind(undefined);

  var AppCache = function () {
    function AppCache(value) {
      _classCallCheck(this, AppCache);

      this._caches = {};

      if (value) {
        this._caches = value;
      }
    }

    _createClass(AppCache, [{
      key: "set",
      value: function set(key, value) {
        this._caches[key] = value;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        var val = this.get(key);
        delete this._caches[key];
        return val;
      }
    }, {
      key: "get",
      value: function get(key) {
        return this._caches[key];
      }
    }, {
      key: "getKeys",
      value: function getKeys() {
        var keys = [];

        for (var _key2 in this._caches) {
          keys.push(_key2);
        }

        return keys;
      }
    }]);

    return AppCache;
  }();

  var AppStorage = function () {
    function AppStorage(runtime, suffix) {
      _classCallCheck(this, AppStorage);

      var key = suffix ? "".concat(STORAGE_ROOT_KEY).concat(suffix) : STORAGE_ROOT_KEY;
      this._rootStorage = createRootStorage(runtime);
      var localCache = this._rootStorage.get(key) || {};
      this._cache = new AppCache(_defineProperty({}, key, localCache));
      this._storageKey = key;
    }

    _createClass(AppStorage, [{
      key: "_get",
      value: function _get() {
        var key = this._storageKey;
        return this._cache.get(key) || {};
      }
    }, {
      key: "_set",
      value: function _set(cache) {
        var key = this._storageKey;
        cache = cache || {};

        this._cache.set(key, cache);

        this._rootStorage.set(key, cache);
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var localValue = this._get();

        localValue[key] = value;

        this._set(localValue);
      }
    }, {
      key: "remove",
      value: function remove(key) {
        var localValue = this._get();

        delete localValue[key];

        this._set(localValue);
      }
    }, {
      key: "clear",
      value: function clear() {
        var key = this._storageKey;

        this._rootStorage.remove(key);

        this._cache.remove(key);
      }
    }, {
      key: "get",
      value: function get(key) {
        var localValue = this._get();

        return localValue[key];
      }
    }, {
      key: "getKeys",
      value: function getKeys() {
        var localValue = this._get();

        var keyList = [];

        for (var _key3 in localValue) {
          keyList.push(_key3);
        }

        return keyList;
      }
    }, {
      key: "getValues",
      value: function getValues() {
        return this._get() || {};
      }
    }]);

    return AppStorage;
  }();

  var Todo = function (_Error) {
    _inherits(Todo, _Error);

    var _super = _createSuper(Todo);

    function Todo(message) {
      _classCallCheck(this, Todo);

      return _super.call(this, "TODO => ".concat(message));
    }

    return Todo;
  }(_wrapNativeSuper(Error));

  var todo = function todo(message) {
    _newArrowCheck(this, _this);

    return new Todo(message);
  }.bind(undefined);

  var toUpperCase = function toUpperCase(str, startIndex, endIndex) {
    var _this3 = this;

    _newArrowCheck(this, _this);

    if (startIndex === undefined || endIndex === undefined) {
      return str.toUpperCase();
    }

    var sliceStr = str.slice(startIndex, endIndex);
    str = str.replace(sliceStr, function (text) {
      _newArrowCheck(this, _this3);

      return text.toUpperCase();
    }.bind(this));
    return str;
  }.bind(undefined);

  var getByteLength = function getByteLength(str) {
    var charset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';
    var total = 0;
    var chatCode;

    if (charset === 'utf-16') {
      for (var i = 0, max = str.length; i < max; i++) {
        chatCode = str.charCodeAt(i);

        if (chatCode <= 0xffff) {
          total += 2;
        } else {
          total += 4;
        }
      }
    } else {
      for (var _i = 0, _max = str.length; _i < _max; _i++) {
        chatCode = str.charCodeAt(_i);

        if (chatCode < 0x007f) {
          total += 1;
        } else if (chatCode <= 0x07ff) {
          total += 2;
        } else if (chatCode <= 0xffff) {
          total += 3;
        } else {
          total += 4;
        }
      }
    }

    return total;
  };

  var appendUrl = function appendUrl(url, query) {
    var _this4 = this;

    _newArrowCheck(this, _this);

    url = url.replace(/\?$/, '');

    if (!query) {
      return url;
    }

    var searchArr = Object.keys(query).map(function (key) {
      _newArrowCheck(this, _this4);

      return "".concat(key, "=").concat(query[key]);
    }.bind(this)).filter(function (item) {
      _newArrowCheck(this, _this4);

      return !!item;
    }.bind(this));

    if (searchArr.length) {
      return [url, searchArr.join('&')].join('?');
    }

    return url;
  }.bind(undefined);

  var matchVersion = function matchVersion(apiVersion) {
    _newArrowCheck(this, _this);

    var matches = apiVersion.match(/\d+(\.\d+){2}/);
    return matches[0];
  }.bind(undefined);



  (function (LogLevel) {
    LogLevel[LogLevel["LOG"] = 0] = "LOG";
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["NONE"] = 1000] = "NONE";
  })(exports.LogLevel || (exports.LogLevel = {}));

  var methods = (_methods = {}, _defineProperty(_methods, exports.LogLevel.DEBUG, console.debug.bind(console)), _defineProperty(_methods, exports.LogLevel.INFO, console.info.bind(console)), _defineProperty(_methods, exports.LogLevel.WARN, console.warn.bind(console)), _defineProperty(_methods, exports.LogLevel.ERROR, console.error.bind(console)), _methods);

  var Logger = function () {
    function Logger(_tag) {
      _classCallCheck(this, Logger);

      this._tag = _tag;
      this._outLevel = exports.LogLevel.WARN;
      this._stdout = this._defaultStdout;
      this.log = this._out;
      this.debug = this._out.bind(this, exports.LogLevel.DEBUG);
      this.info = this._out.bind(this, exports.LogLevel.INFO);
      this.warn = this._out.bind(this, exports.LogLevel.WARN);
      this.error = this._out.bind(this, exports.LogLevel.ERROR);
    }

    _createClass(Logger, [{
      key: "_defaultStdout",
      value: function _defaultStdout(level) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key4 = 1; _key4 < _len; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        methods[level].apply(methods, ["[".concat(this._tag, "](").concat(new Date().toUTCString(), "):")].concat(args));
      }
    }, {
      key: "_out",
      value: function _out(level) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key5 = 1; _key5 < _len2; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        level >= this._outLevel && this._stdout.apply(this, [level].concat(args));
      }
    }, {
      key: "set",
      value: function set(outLevel, stdout) {
        this._outLevel = outLevel;
        this._stdout = stdout || this._defaultStdout;
      }
    }]);

    return Logger;
  }();

  var logger = new Logger('RCLog');
  var ConversationType;

  (function (ConversationType) {
    ConversationType[ConversationType["NONE"] = 0] = "NONE";
    ConversationType[ConversationType["PRIVATE"] = 1] = "PRIVATE";
    ConversationType[ConversationType["DISCUSSION"] = 2] = "DISCUSSION";
    ConversationType[ConversationType["GROUP"] = 3] = "GROUP";
    ConversationType[ConversationType["CHATROOM"] = 4] = "CHATROOM";
    ConversationType[ConversationType["CUSTOMER_SERVICE"] = 5] = "CUSTOMER_SERVICE";
    ConversationType[ConversationType["SYSTEM"] = 6] = "SYSTEM";
    ConversationType[ConversationType["APP_PUBLIC_SERVICE"] = 7] = "APP_PUBLIC_SERVICE";
    ConversationType[ConversationType["PUBLIC_SERVICE"] = 8] = "PUBLIC_SERVICE";
    ConversationType[ConversationType["RTC_ROOM"] = 12] = "RTC_ROOM";
  })(ConversationType || (ConversationType = {}));

  var ConversationType$1 = ConversationType;
  var FileType;

  (function (FileType) {
    FileType[FileType["IMAGE"] = 1] = "IMAGE";
    FileType[FileType["AUDIO"] = 2] = "AUDIO";
    FileType[FileType["VIDEO"] = 3] = "VIDEO";
    FileType[FileType["FILE"] = 4] = "FILE";
    FileType[FileType["SIGHT"] = 5] = "SIGHT";
    FileType[FileType["COMBINE_HTML"] = 6] = "COMBINE_HTML";
  })(FileType || (FileType = {}));

  var FileType$1 = FileType;

  var isString = function isString(value) {
    _newArrowCheck(this, _this);

    return typeof value === 'string';
  }.bind(undefined);

  var isNumber = function isNumber(value) {
    _newArrowCheck(this, _this);

    return typeof value === 'number' && !isNaN(value);
  }.bind(undefined);

  var isArray = function isArray(arr) {
    _newArrowCheck(this, _this);

    return Object.prototype.toString.call(arr).indexOf('Array') !== -1;
  }.bind(undefined);

  var isArrayBuffer = function isArrayBuffer(arr) {
    _newArrowCheck(this, _this);

    return Object.prototype.toString.call(arr) === '[object ArrayBuffer]';
  }.bind(undefined);

  var notEmptyString = function notEmptyString(str) {
    _newArrowCheck(this, _this);

    return isString(str) && str.length > 0;
  }.bind(undefined);

  var notEmptyArray = function notEmptyArray(arr) {
    _newArrowCheck(this, _this);

    return isArray(arr) && arr.length > 0;
  }.bind(undefined);

  var isObject = function isObject(val) {
    _newArrowCheck(this, _this);

    return Object.prototype.toString.call(val) === '[object Object]';
  }.bind(undefined);

  var isFunction = function isFunction(val) {
    _newArrowCheck(this, _this);

    return Object.prototype.toString.call(val) === '[object Function]';
  }.bind(undefined);

  var isUndefined = function isUndefined(val) {
    _newArrowCheck(this, _this);

    return val === undefined || Object.prototype.toString.call(val) === '[object Undefined]';
  }.bind(undefined);

  var isNull = function isNull(val) {
    _newArrowCheck(this, _this);

    return Object.prototype.toString.call(val) === '[object Null]';
  }.bind(undefined);

  var isHttpUrl = function isHttpUrl(value) {
    _newArrowCheck(this, _this);

    return isString(value) && /https?:\/\//.test(value);
  }.bind(undefined);

  var notEmptyObject = function notEmptyObject(val) {
    _newArrowCheck(this, _this);

    for (var _key6 in val) {
      return true;
    }

    return false;
  }.bind(undefined);

  var isValidConversationType = function isValidConversationType(conversation) {
    _newArrowCheck(this, _this);

    return isNumber(conversation) && Object.prototype.hasOwnProperty.call(ConversationType$1, conversation);
  }.bind(undefined);

  var isValidFileType = function isValidFileType(fileType) {
    _newArrowCheck(this, _this);

    return isNumber(fileType) && Object.prototype.hasOwnProperty.call(FileType$1, fileType);
  }.bind(undefined);

  var AssertRules;

  (function (AssertRules) {
    AssertRules[AssertRules["STRING"] = 0] = "STRING";
    AssertRules[AssertRules["ONLY_STRING"] = 1] = "ONLY_STRING";
    AssertRules[AssertRules["NUMBER"] = 2] = "NUMBER";
    AssertRules[AssertRules["BOOLEAN"] = 3] = "BOOLEAN";
    AssertRules[AssertRules["OBJECT"] = 4] = "OBJECT";
    AssertRules[AssertRules["ARRAY"] = 5] = "ARRAY";
    AssertRules[AssertRules["CALLBACK"] = 6] = "CALLBACK";
  })(AssertRules || (AssertRules = {}));

  var validators = (_validators = {}, _defineProperty(_validators, AssertRules.STRING, notEmptyString), _defineProperty(_validators, AssertRules.ONLY_STRING, isString), _defineProperty(_validators, AssertRules.NUMBER, isNumber), _defineProperty(_validators, AssertRules.BOOLEAN, function (value) {
    _newArrowCheck(this, _this);

    return typeof value === 'boolean';
  }.bind(undefined)), _defineProperty(_validators, AssertRules.OBJECT, isObject), _defineProperty(_validators, AssertRules.ARRAY, isArray), _defineProperty(_validators, AssertRules.CALLBACK, function (callback) {
    _newArrowCheck(this, _this);

    var flag = true;

    if (!isObject(callback)) {
      flag = false;
    }

    callback = callback || {};

    if (callback.onSuccess && !isFunction(callback.onSuccess)) {
      flag = false;
    }

    if (callback.onError && !isFunction(callback.onError)) {
      flag = false;
    }

    return flag;
  }.bind(undefined)), _validators);

  var RCAssertError = function (_Error2) {
    _inherits(RCAssertError, _Error2);

    var _super2 = _createSuper(RCAssertError);

    function RCAssertError(message) {
      var _this5;

      _classCallCheck(this, RCAssertError);

      _this5 = _super2.call(this, message);
      _this5.name = 'RCAssertError';
      return _this5;
    }

    return RCAssertError;
  }(_wrapNativeSuper(Error));

  var assert = function assert(key, value, validator) {
    var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!validate(key, value, validator, required)) {
      throw new RCAssertError("".concat(key, " is invalid."));
    }
  };

  var validate = function validate(key, value, validator) {
    var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    validator = validators[validator] || validator;
    var invalid = required && !validator(value) || !required && !(isUndefined(value) || value === null || validator(value));

    if (invalid) {
      var msg = "".concat(key, " is invalid.");
      logger.error(msg);
    }

    return !invalid;
  };

  var assertCPPMode = function assertCPPMode(isCPPMode, errorMsg) {
    _newArrowCheck(this, _this);

    errorMsg = errorMsg || 'Method is only available in cppProtocol mode';

    if (!isCPPMode) {
      throw new RCAssertError(errorMsg);
    }
  }.bind(undefined);

  var forEach = function forEach(source, event, options) {
    var _this6 = this;

    _newArrowCheck(this, _this);

    options = options || {};

    event = event || function () {};

    var _options2 = options,
        isReverse = _options2.isReverse;

    var loopObj = function loopObj() {
      _newArrowCheck(this, _this6);

      for (var _key7 in source) {
        event(source[_key7], _key7, source);
      }
    }.bind(this);

    var loopArr = function loopArr() {
      _newArrowCheck(this, _this6);

      if (isReverse) {
        for (var i = source.length - 1; i >= 0; i--) {
          event(source[i], i);
        }
      } else {
        for (var j = 0, len = source.length; j < len; j++) {
          event(source[j], j);
        }
      }
    }.bind(this);

    if (isObject(source)) {
      loopObj();
    }

    if (isArray(source) || isString(source)) {
      loopArr();
    }
  }.bind(undefined);

  var map = function map(source, event) {
    var _this7 = this;

    _newArrowCheck(this, _this);

    forEach(source, function (item, index) {
      _newArrowCheck(this, _this7);

      source[index] = event(item, index);
    }.bind(this));
    return source;
  }.bind(undefined);

  var indexOf = function indexOf(source, searchVal) {
    var _this8 = this;

    _newArrowCheck(this, _this);

    if (source.indexOf) {
      return source.indexOf(searchVal);
    }

    var index = -1;
    forEach(source, function (sub, i) {
      _newArrowCheck(this, _this8);

      if (searchVal === sub) {
        index = i;
      }
    }.bind(this));
    return index;
  }.bind(undefined);

  var isInclude = function isInclude(source, searchVal) {
    _newArrowCheck(this, _this);

    var index = indexOf(source, searchVal);
    return index !== -1;
  }.bind(undefined);

  var isInObject = function isInObject(source, searchVal) {
    var _this9 = this;

    _newArrowCheck(this, _this);

    var arr = [];
    forEach(source, function (val) {
      _newArrowCheck(this, _this9);

      arr.push(val);
    }.bind(this));
    var index = indexOf(arr, searchVal);
    return index !== -1;
  }.bind(undefined);

  var cloneByJSON = function cloneByJSON(sourceObj) {
    _newArrowCheck(this, _this);

    return JSON.parse(JSON.stringify(sourceObj));
  }.bind(undefined);

  var ChatroomEntryType;

  (function (ChatroomEntryType) {
    ChatroomEntryType[ChatroomEntryType["UPDATE"] = 1] = "UPDATE";
    ChatroomEntryType[ChatroomEntryType["DELETE"] = 2] = "DELETE";
  })(ChatroomEntryType || (ChatroomEntryType = {}));

  var ChatroomEntryType$1 = ChatroomEntryType;

  var getMessageOptionByStatus = function getMessageOptionByStatus(status) {
    _newArrowCheck(this, _this);

    var isPersited = true;
    var isCounted = true;
    var isMentioned = false;
    var disableNotification = false;
    var receivedStatus = ReceivedStatus$1.READ;
    var isReceivedByOtherClient = false;
    var canIncludeExpansion = false;
    isPersited = !!(status & 0x10);
    isCounted = !!(status & 0x20);
    isMentioned = !!(status & 0x40);
    disableNotification = !!(status & 0x100);
    isReceivedByOtherClient = !!(status & 0x02);
    receivedStatus = isReceivedByOtherClient ? ReceivedStatus$1.RETRIEVED : receivedStatus;
    canIncludeExpansion = !!(status & 0x400);
    return {
      isPersited: isPersited,
      isCounted: isCounted,
      isMentioned: isMentioned,
      disableNotification: disableNotification,
      receivedStatus: receivedStatus,
      canIncludeExpansion: canIncludeExpansion
    };
  }.bind(undefined);

  var getUpMessageOptionBySessionId = function getUpMessageOptionBySessionId(sessionId) {
    _newArrowCheck(this, _this);

    var isPersited = false;
    var isCounted = false;
    var disableNotification = false;
    var canIncludeExpansion = false;
    isPersited = !!(sessionId & 0x01);
    isCounted = !!(sessionId & 0x02);
    disableNotification = !!(sessionId & 0x10);
    canIncludeExpansion = !!(sessionId & 0x40);
    return {
      isPersited: isPersited,
      isCounted: isCounted,
      disableNotification: disableNotification,
      canIncludeExpansion: canIncludeExpansion
    };
  }.bind(undefined);

  var formatExtraContent = function formatExtraContent(extraContent) {
    var _this10 = this;

    _newArrowCheck(this, _this);

    var expansion = {};
    var parseExtraContent = JSON.parse(extraContent);
    forEach(parseExtraContent, function (value, key) {
      _newArrowCheck(this, _this10);

      expansion[key] = value.v;
    }.bind(this));
    return expansion;
  }.bind(undefined);

  var DelayTimer = {
    _delayTime: 0,
    setTime: function setTime(time) {
      _newArrowCheck(this, _this);

      var currentTime = new Date().getTime();
      DelayTimer._delayTime = currentTime - time;
    }.bind(undefined),
    getTime: function getTime() {
      _newArrowCheck(this, _this);

      var delayTime = DelayTimer._delayTime;
      var currentTime = new Date().getTime();
      return currentTime - delayTime;
    }.bind(undefined)
  };

  var getChatRoomKVByStatus = function getChatRoomKVByStatus(status) {
    _newArrowCheck(this, _this);

    var isDeleteOpt = !!(status & 0x0004);
    return {
      isAutoDelete: !!(status & 0x0001),
      isOverwrite: !!(status & 0x0002),
      type: isDeleteOpt ? ChatroomEntryType$1.DELETE : ChatroomEntryType$1.UPDATE
    };
  }.bind(undefined);

  var getChatRoomKVOptStatus = function getChatRoomKVOptStatus(entity, action) {
    _newArrowCheck(this, _this);

    var status = 0;

    if (entity.isAutoDelete) {
      status = status | 0x0001;
    }

    if (entity.isOverwrite) {
      status = status | 0x0002;
    }

    if (action === 2) {
      status = status | 0x0004;
    }

    return status;
  }.bind(undefined);

  var getSessionId = function getSessionId(option) {
    _newArrowCheck(this, _this);

    var isStatusMessage = option.isStatusMessage;
    var isPersited = option.isPersited,
        isCounted = option.isCounted,
        isMentioned = option.isMentioned,
        disableNotification = option.disableNotification,
        canIncludeExpansion = option.canIncludeExpansion;

    if (isStatusMessage) {
      isPersited = isCounted = false;
    }

    var sessionId = 0;

    if (isPersited) {
      sessionId = sessionId | 0x01;
    }

    if (isCounted) {
      sessionId = sessionId | 0x02;
    }

    if (isMentioned) {
      sessionId = sessionId | 0x04;
    }

    if (disableNotification) {
      sessionId = sessionId | 0x20;
    }

    if (canIncludeExpansion) {
      sessionId = sessionId | 0x40;
    }

    return sessionId;
  }.bind(undefined);

  function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  var QOS;

  (function (QOS) {
    QOS[QOS["AT_MOST_ONCE"] = 0] = "AT_MOST_ONCE";
    QOS[QOS["AT_LEAST_ONCE"] = 1] = "AT_LEAST_ONCE";
    QOS[QOS["EXACTLY_ONCE"] = 2] = "EXACTLY_ONCE";
    QOS[QOS["DEFAULT"] = 3] = "DEFAULT";
  })(QOS || (QOS = {}));

  var OperationType;

  (function (OperationType) {
    OperationType[OperationType["SYMMETRIC"] = 0] = "SYMMETRIC";
    OperationType[OperationType["CONNECT"] = 1] = "CONNECT";
    OperationType[OperationType["CONN_ACK"] = 2] = "CONN_ACK";
    OperationType[OperationType["PUBLISH"] = 3] = "PUBLISH";
    OperationType[OperationType["PUB_ACK"] = 4] = "PUB_ACK";
    OperationType[OperationType["QUERY"] = 5] = "QUERY";
    OperationType[OperationType["QUERY_ACK"] = 6] = "QUERY_ACK";
    OperationType[OperationType["QUERY_CONFIRM"] = 7] = "QUERY_CONFIRM";
    OperationType[OperationType["SUBSCRIBE"] = 8] = "SUBSCRIBE";
    OperationType[OperationType["SUB_ACK"] = 9] = "SUB_ACK";
    OperationType[OperationType["UNSUBSCRIBE"] = 10] = "UNSUBSCRIBE";
    OperationType[OperationType["UNSUB_ACK"] = 11] = "UNSUB_ACK";
    OperationType[OperationType["PING_REQ"] = 12] = "PING_REQ";
    OperationType[OperationType["PING_RESP"] = 13] = "PING_RESP";
    OperationType[OperationType["DISCONNECT"] = 14] = "DISCONNECT";
    OperationType[OperationType["RESERVER2"] = 15] = "RESERVER2";
  })(OperationType || (OperationType = {}));

  var MessageName;

  (function (MessageName) {
    MessageName["CONN_ACK"] = "ConnAckMessage";
    MessageName["DISCONNECT"] = "DisconnectMessage";
    MessageName["PING_REQ"] = "PingReqMessage";
    MessageName["PING_RESP"] = "PingRespMessage";
    MessageName["PUBLISH"] = "PublishMessage";
    MessageName["PUB_ACK"] = "PubAckMessage";
    MessageName["QUERY"] = "QueryMessage";
    MessageName["QUERY_CON"] = "QueryConMessage";
    MessageName["QUERY_ACK"] = "QueryAckMessage";
  })(MessageName || (MessageName = {}));

  var IDENTIFIER;

  (function (IDENTIFIER) {
    IDENTIFIER["PUB"] = "pub";
    IDENTIFIER["QUERY"] = "qry";
  })(IDENTIFIER || (IDENTIFIER = {}));

  var Header = function () {
    function Header(type) {
      var retain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var qos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QOS.AT_LEAST_ONCE;
      var dup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      _classCallCheck(this, Header);

      this._retain = false;
      this.qos = QOS.AT_LEAST_ONCE;
      this._dup = false;
      this.syncMsg = false;
      var isPlusType = type > 0;

      if (type && isPlusType && arguments.length === 1) {
        this._retain = (type & 1) > 0;
        this.qos = (type & 6) >> 1;
        this._dup = (type & 8) > 0;
        this.type = type >> 4 & 15;
        this.syncMsg = (type & 8) === 8;
      } else {
        this.type = type;
        this._retain = retain;
        this.qos = qos;
        this._dup = dup;
      }
    }

    _createClass(Header, [{
      key: "encode",
      value: function encode() {
        var byte = this.type << 4;
        byte |= this._retain ? 1 : 0;
        byte |= this.qos << 1;
        byte |= this._dup ? 8 : 0;
        return byte;
      }
    }]);

    return Header;
  }();

  var BinaryHelper = function () {
    function BinaryHelper() {
      _classCallCheck(this, BinaryHelper);
    }

    _createClass(BinaryHelper, null, [{
      key: "writeUTF",
      value: function writeUTF(str, isGetBytes) {
        var back = [];
        var byteSize = 0;

        if (isString(str)) {
          for (var i = 0, len = str.length; i < len; i++) {
            var code = str.charCodeAt(i);

            if (code >= 0 && code <= 127) {
              byteSize += 1;
              back.push(code);
            } else if (code >= 128 && code <= 2047) {
              byteSize += 2;
              back.push(192 | 31 & code >> 6);
              back.push(128 | 63 & code);
            } else if (code >= 2048 && code <= 65535) {
              byteSize += 3;
              back.push(224 | 15 & code >> 12);
              back.push(128 | 63 & code >> 6);
              back.push(128 | 63 & code);
            }
          }
        }

        for (var _i2 = 0, _len3 = back.length; _i2 < _len3; _i2++) {
          if (back[_i2] > 255) {
            back[_i2] &= 255;
          }
        }

        if (isGetBytes) {
          return back;
        }

        if (byteSize <= 255) {
          return [0, byteSize].concat(back);
        } else {
          return [byteSize >> 8, byteSize & 255].concat(back);
        }
      }
    }, {
      key: "readUTF",
      value: function readUTF(arr) {
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var strBytes = arr;
        var result = '';

        while (++index < strBytes.length) {
          var codePoint = Number(strBytes[index]);
          if (codePoint === (codePoint & 0x7F)) ;else if ((codePoint & 0xF0) === 0xF0) {
            codePoint ^= 0xF0;
            codePoint = codePoint << 6 | strBytes[++index] ^ 0x80;
            codePoint = codePoint << 6 | strBytes[++index] ^ 0x80;
            codePoint = codePoint << 6 | strBytes[++index] ^ 0x80;
          } else if ((codePoint & 0xE0) === 0xE0) {
            codePoint ^= 0xE0;
            codePoint = codePoint << 6 | strBytes[++index] ^ 0x80;
            codePoint = codePoint << 6 | strBytes[++index] ^ 0x80;
          } else if ((codePoint & 0xC0) === 0xC0) {
            codePoint ^= 0xC0;
            codePoint = codePoint << 6 | strBytes[++index] ^ 0x80;
          }

          if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || Math.floor(codePoint) !== codePoint) {
            throw RangeError('Invalid code point: ' + codePoint);
          }

          if (codePoint <= 0xFFFF) {
            codeUnits.push(codePoint);
          } else {
            codePoint -= 0x10000;
            highSurrogate = codePoint >> 10 | 0xD800;
            lowSurrogate = codePoint % 0x400 | 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
          }

          if (index + 1 === strBytes.length || codeUnits.length > MAX_SIZE) {
            result += String.fromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }

        return result;
      }
    }]);

    return BinaryHelper;
  }();

  var RongStreamReader = function () {
    function RongStreamReader(arr) {
      _classCallCheck(this, RongStreamReader);

      this._position = 0;
      this._poolLen = 0;
      this._pool = arr;
      this._poolLen = arr.length;
    }

    _createClass(RongStreamReader, [{
      key: "check",
      value: function check() {
        return this._position >= this._pool.length;
      }
    }, {
      key: "readInt",
      value: function readInt() {
        var self = this;

        if (self.check()) {
          return -1;
        }

        var end = '';

        for (var i = 0; i < 4; i++) {
          var t = self._pool[self._position++].toString(16);

          if (t.length === 1) {
            t = '0' + t;
          }

          end += t.toString();
        }

        return parseInt(end, 16);
      }
    }, {
      key: "readLong",
      value: function readLong() {
        var self = this;

        if (self.check()) {
          return -1;
        }

        var end = '';

        for (var i = 0; i < 8; i++) {
          var t = self._pool[self._position++].toString(16);

          if (t.length === 1) {
            t = '0' + t;
          }

          end += t;
        }

        return parseInt(end, 16);
      }
    }, {
      key: "readByte",
      value: function readByte() {
        if (this.check()) {
          return -1;
        }

        var val = this._pool[this._position++];

        if (val > 255) {
          val &= 255;
        }

        return val;
      }
    }, {
      key: "readUTF",
      value: function readUTF() {
        if (this.check()) {
          return '';
        }

        var big = this.readByte() << 8 | this.readByte();

        var pool = this._pool.subarray(this._position, this._position += big);

        return BinaryHelper.readUTF(pool);
      }
    }, {
      key: "readAll",
      value: function readAll() {
        return this._pool.subarray(this._position, this._poolLen);
      }
    }]);

    return RongStreamReader;
  }();

  var RongStreamWriter = function () {
    function RongStreamWriter() {
      _classCallCheck(this, RongStreamWriter);

      this._pool = [];
      this._position = 0;
      this._writen = 0;
    }

    _createClass(RongStreamWriter, [{
      key: "write",
      value: function write(byte) {
        if (Object.prototype.toString.call(byte).indexOf('Array') !== -1) {
          this._pool = this._pool.concat(byte);
        } else if (byte >= 0) {
          if (byte > 255) {
            byte &= 255;
          }

          this._pool.push(byte);

          this._writen++;
        }

        return byte;
      }
    }, {
      key: "writeArr",
      value: function writeArr(byte) {
        this._pool = this._pool.concat(byte);
        return byte;
      }
    }, {
      key: "writeUTF",
      value: function writeUTF(str) {
        var val = BinaryHelper.writeUTF(str);
        this._pool = this._pool.concat(val);
        this._writen += val.length;
      }
    }, {
      key: "getBytesArray",
      value: function getBytesArray() {
        return this._pool;
      }
    }]);

    return RongStreamWriter;
  }();

  var PBName = {
    UpStreamMessage: 'UpStreamMessage',
    DownStreamMessage: 'DownStreamMessage',
    DownStreamMessages: 'DownStreamMessages',
    SessionsAttQryInput: 'SessionsAttQryInput',
    SessionsAttOutput: 'SessionsAttOutput',
    SyncRequestMsg: 'SyncRequestMsg',
    ChrmPullMsg: 'ChrmPullMsg',
    NotifyMsg: 'NotifyMsg',
    HistoryMsgInput: 'HistoryMsgInput',
    HistoryMsgOuput: 'HistoryMsgOuput',
    RelationQryInput: 'RelationQryInput',
    RelationsOutput: 'RelationsOutput',
    DeleteSessionsInput: 'DeleteSessionsInput',
    SessionInfo: 'SessionInfo',
    DeleteSessionsOutput: 'DeleteSessionsOutput',
    RelationsInput: 'RelationsInput',
    DeleteMsgInput: 'DeleteMsgInput',
    CleanHisMsgInput: 'CleanHisMsgInput',
    SessionMsgReadInput: 'SessionMsgReadInput',
    ChrmInput: 'ChrmInput',
    QueryChatRoomInfoInput: 'QueryChatRoomInfoInput',
    QueryChatRoomInfoOutput: 'QueryChatRoomInfoOutput',
    RtcInput: 'RtcInput',
    RtcUserListOutput: 'RtcUserListOutput',
    SetUserStatusInput: 'SetUserStatusInput',
    RtcSetDataInput: 'RtcSetDataInput',
    RtcUserSetDataInput: 'RtcUserSetDataInput',
    RtcDataInput: 'RtcDataInput',
    RtcSetOutDataInput: 'RtcSetOutDataInput',
    MCFollowInput: 'MCFollowInput',
    RtcTokenOutput: 'RtcTokenOutput',
    RtcQryOutput: 'RtcQryOutput',
    RtcQryUserOutDataInput: 'RtcQryUserOutDataInput',
    RtcUserOutDataOutput: 'RtcUserOutDataOutput',
    RtcQueryListInput: 'RtcQueryListInput',
    RtcRoomInfoOutput: 'RtcRoomInfoOutput',
    RtcValueInfo: 'RtcValueInfo',
    RtcKeyDeleteInput: 'RtcKeyDeleteInput',
    GetQNupTokenInput: 'GetQNupTokenInput',
    GetQNupTokenOutput: 'GetQNupTokenOutput',
    GetQNdownloadUrlInput: 'GetQNdownloadUrlInput',
    GetDownloadUrlInput: 'GetDownloadUrlInput',
    GetQNdownloadUrlOutput: 'GetQNdownloadUrlOutput',
    GetDownloadUrlOutput: 'GetDownloadUrlOutput',
    SetChrmKV: 'SetChrmKV',
    ChrmKVOutput: 'ChrmKVOutput',
    QueryChrmKV: 'QueryChrmKV',
    SetUserSettingInput: 'SetUserSettingInput',
    SetUserSettingOutput: 'SetUserSettingOutput',
    PullUserSettingInput: 'PullUserSettingInput',
    PullUserSettingOutput: 'PullUserSettingOutput',
    UserSettingNotification: 'UserSettingNotification',
    SessionReq: 'SessionReq',
    SessionStates: 'SessionStates',
    SessionState: 'SessionState',
    SessionStateItem: 'SessionStateItem',
    SessionStateModifyReq: 'SessionStateModifyReq',
    SessionStateModifyResp: 'SessionStateModifyResp'
  };
  var SSMsg = (_SSMsg = {}, _defineProperty(_SSMsg, PBName.UpStreamMessage, ['sessionId', 'classname', 'content', 'pushText', 'userId', 'configFlag', 'appData', 'extraContent']), _defineProperty(_SSMsg, PBName.DownStreamMessages, ['list', 'syncTime', 'finished']), _defineProperty(_SSMsg, PBName.DownStreamMessage, ['fromUserId', 'type', 'groupId', 'classname', 'content', 'dataTime', 'status', 'msgId', 'extraContent']), _defineProperty(_SSMsg, PBName.SessionsAttQryInput, ['nothing']), _defineProperty(_SSMsg, PBName.SessionsAttOutput, ['inboxTime', 'sendboxTime', 'totalUnreadCount']), _defineProperty(_SSMsg, PBName.SyncRequestMsg, ['syncTime', 'ispolling', 'isweb', 'isPullSend', 'isKeeping', 'sendBoxSyncTime']), _defineProperty(_SSMsg, PBName.ChrmPullMsg, ['syncTime', 'count']), _defineProperty(_SSMsg, PBName.NotifyMsg, ['type', 'time', 'chrmId']), _defineProperty(_SSMsg, PBName.HistoryMsgInput, ['targetId', 'time', 'count', 'order']), _defineProperty(_SSMsg, PBName.HistoryMsgOuput, ['list', 'syncTime', 'hasMsg']), _defineProperty(_SSMsg, PBName.RelationQryInput, ['type', 'count', 'startTime', 'order']), _defineProperty(_SSMsg, PBName.RelationsOutput, ['info']), _defineProperty(_SSMsg, PBName.DeleteSessionsInput, ['sessions']), _defineProperty(_SSMsg, PBName.SessionInfo, ['type', 'channelId']), _defineProperty(_SSMsg, PBName.DeleteSessionsOutput, ['nothing']), _defineProperty(_SSMsg, PBName.RelationsInput, ['type', 'msg', 'count', 'offset', 'startTime', 'endTime']), _defineProperty(_SSMsg, PBName.DeleteMsgInput, ['type', 'conversationId', 'msgs']), _defineProperty(_SSMsg, PBName.CleanHisMsgInput, ['targetId', 'dataTime', 'conversationType']), _defineProperty(_SSMsg, PBName.SessionMsgReadInput, ['type', 'msgTime', 'channelId']), _defineProperty(_SSMsg, PBName.ChrmInput, ['nothing']), _defineProperty(_SSMsg, PBName.QueryChatRoomInfoInput, ['count', 'order']), _defineProperty(_SSMsg, PBName.QueryChatRoomInfoOutput, ['userTotalNums', 'userInfos']), _defineProperty(_SSMsg, PBName.GetQNupTokenInput, ['type', 'key']), _defineProperty(_SSMsg, PBName.GetQNdownloadUrlInput, ['type', 'key', 'fileName']), _defineProperty(_SSMsg, PBName.GetDownloadUrlInput, ['type', 'key', 'fileName']), _defineProperty(_SSMsg, PBName.GetQNupTokenOutput, ['deadline', 'token', 'bosToken', 'bosDate', 'path', 'osskeyId', 'ossPolicy', 'ossSign', 'ossBucketName']), _defineProperty(_SSMsg, PBName.GetQNdownloadUrlOutput, ['downloadUrl']), _defineProperty(_SSMsg, PBName.GetDownloadUrlOutput, ['downloadUrl']), _defineProperty(_SSMsg, PBName.SetChrmKV, ['entry', 'bNotify', 'notification', 'type']), _defineProperty(_SSMsg, PBName.ChrmKVOutput, ['entries', 'bFullUpdate', 'syncTime']), _defineProperty(_SSMsg, PBName.QueryChrmKV, ['timestamp']), _defineProperty(_SSMsg, PBName.SetUserSettingInput, ['version', 'value']), _defineProperty(_SSMsg, PBName.SetUserSettingOutput, ['version', 'reserve']), _defineProperty(_SSMsg, PBName.PullUserSettingInput, ['version', 'reserve']), _defineProperty(_SSMsg, PBName.PullUserSettingOutput, ['items', 'version']), _defineProperty(_SSMsg, PBName.SessionReq, ['time']), _defineProperty(_SSMsg, PBName.SessionStates, ['version', 'state']), _defineProperty(_SSMsg, PBName.SessionState, ['type', 'channelId', 'time', 'stateItem']), _defineProperty(_SSMsg, PBName.SessionStateItem, ['sessionStateType', 'value']), _defineProperty(_SSMsg, PBName.SessionStateModifyReq, ['version', 'state']), _defineProperty(_SSMsg, PBName.SessionStateModifyResp, ['version']), _SSMsg);
  var Codec = {};

  var _loop = function _loop() {
    var _this165 = this;

    var paramsList = SSMsg[key];

    Codec[key] = function () {
      _newArrowCheck(this, _this165);

      var data = {};
      var ins = {
        getArrayData: function getArrayData() {
          return data;
        }
      };

      var _loop3 = function _loop3(i) {
        var _this166 = this;

        var param = paramsList[i];
        var setEventName = "set".concat(toUpperCase(param, 0, 1));

        ins[setEventName] = function (item) {
          _newArrowCheck(this, _this166);

          data[param] = item;
        }.bind(this);
      };

      for (var i = 0; i < paramsList.length; i++) {
        _loop3(i);
      }

      return ins;
    }.bind(this);

    Codec[key].decode = function (data) {
      var decodeResult = {};

      if (isString(data)) {
        data = JSON.parse(data);
      }

      var _loop4 = function _loop4(_key21) {
        var _this167 = this;

        var getEventName = "get".concat(toUpperCase(_key21, 0, 1));
        decodeResult[_key21] = data[_key21];

        decodeResult[getEventName] = function () {
          _newArrowCheck(this, _this167);

          return data[_key21];
        }.bind(this);
      };

      for (var _key21 in data) {
        _loop4(_key21);
      }

      return decodeResult;
    };
  };

  for (var key in SSMsg) {
    _loop();
  }

  Codec.getModule = function (pbName) {
    _newArrowCheck(this, _this);

    return Codec[pbName]();
  }.bind(undefined);

  var SSMsg$1 = "\npackage Modules;\nmessage probuf {\n  message ".concat(PBName.SetUserStatusInput, "\n  {\n    optional int32 status=1;\n  }\n\n  message SetUserStatusOutput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusInput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusOutput\n  {\n    optional string status=1;\n    optional string subUserId=2;\n  }\n\n  message SubUserStatusInput\n  {\n    repeated string userid =1;\n  }\n\n  message SubUserStatusOutput\n  {\n    optional int32 nothing=1; \n  }\n  message VoipDynamicInput\n  {\n    required int32  engineType = 1;\n    required string channelName = 2;\n    optional string channelExtra = 3;\n  }\n\n  message VoipDynamicOutput\n  {\n      required string dynamicKey=1;\n  }\n  message ").concat(PBName.NotifyMsg, " {\n    required int32 type = 1;\n    optional int64 time = 2;\n    optional string chrmId=3;\n  }\n  message ").concat(PBName.SyncRequestMsg, " {\n    required int64 syncTime = 1;\n    required bool ispolling = 2;\n    optional bool isweb=3;\n    optional bool isPullSend=4;\n    optional bool isKeeping=5;\n    optional int64 sendBoxSyncTime=6;\n  }\n  message ").concat(PBName.UpStreamMessage, " {\n    required int32 sessionId = 1;\n    required string classname = 2;\n    required bytes content = 3;\n    optional string pushText = 4;\n    optional string appData = 5;\n    repeated string userId = 6;\n    optional int64 delMsgTime = 7;\n    optional string delMsgId = 8;\n    optional int32 configFlag = 9;\n    optional int64 clientUniqueId = 10;\n    optional string extraContent = 11;\n  }\n  message ").concat(PBName.DownStreamMessages, " {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    optional bool finished = 3;\n  }\n  message ").concat(PBName.DownStreamMessage, " {\n    required string fromUserId = 1;\n    required ChannelType type = 2;\n    optional string groupId = 3;\n    required string classname = 4;\n    required bytes content = 5;\n    required int64 dataTime = 6;\n    required int64 status = 7;\n    optional int64 extra = 8;\n    optional string msgId = 9;\n    optional int32 direction = 10;\n    optional int32 plantform =11;\n    optional int32 isRemoved = 12; \n    optional string source = 13; \n    optional int64 clientUniqueId = 14; \n    optional string extraContent = 15; \n\n  }\n  enum ChannelType {\n    PERSON = 1;\n    PERSONS = 2;\n    GROUP = 3;\n    TEMPGROUP = 4;\n    CUSTOMERSERVICE = 5;\n    NOTIFY = 6;\n    MC=7;\n    MP=8;\n  }\n  message CreateDiscussionInput {\n    optional string name = 1;\n  }\n  message CreateDiscussionOutput {\n    required string id = 1;\n  }\n  message ChannelInvitationInput {\n    repeated string users = 1;\n  }\n  message LeaveChannelInput {\n    required int32 nothing = 1;\n  }\n  message ChannelEvictionInput {\n    required string user = 1;\n  }\n  message RenameChannelInput {\n    required string name = 1;\n  }\n  message ChannelInfoInput {\n    required int32 nothing = 1;\n  }\n  message ChannelInfoOutput {\n    required ChannelType type = 1;\n    required string channelId = 2;\n    required string channelName = 3;\n    required string adminUserId = 4;\n    repeated string firstTenUserIds = 5;\n    required int32 openStatus = 6;\n  }\n  message ChannelInfosInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message ChannelInfosOutput {\n    repeated ChannelInfoOutput channels = 1;\n    required int32 total = 2;\n  }\n  message MemberInfo {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n    required string extension = 4;\n  }\n  message GroupMembersInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message GroupMembersOutput {\n    repeated MemberInfo members = 1;\n    required int32 total = 2;\n  }\n  message GetUserInfoInput {\n    required int32 nothing = 1;\n  }\n  message GetUserInfoOutput {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n  }\n  message GetSessionIdInput {\n    required int32 nothing = 1;\n  }\n  message GetSessionIdOutput {\n    required int32 sessionId = 1;\n  }\n  enum FileType {\n    image = ").concat(FileType$1.IMAGE, ";\n    audio = ").concat(FileType$1.AUDIO, ";\n    video = ").concat(FileType$1.VIDEO, ";\n    file = ").concat(FileType$1.FILE, ";\n  }\n  message ").concat(PBName.GetQNupTokenInput, " {\n    required FileType type = 1;\n    optional string key = 2;\n  }\n  message ").concat(PBName.GetQNdownloadUrlInput, " {\n    required FileType type = 1;\n    required string key = 2;\n    optional string  fileName = 3;\n  }\n  message ").concat(PBName.GetDownloadUrlInput, " {\n    required FileType type = 1;      // \u4E0B\u8F7D\u7684\u6587\u4EF6\u7C7B\u578B\n    required string key = 2;           // \u8BF7\u6C42\u4E0B\u8F7D\u7684\u6587\u4EF6\u540D\n    optional string fileName = 3;     // \u4E0B\u8F7D\u751F\u6210\u7684\u6587\u4EF6\u540D\u5B57\n   }\n  message ").concat(PBName.GetQNupTokenOutput, " {\n    required int64 deadline = 1;\n    required string token = 2;\n    optional string bosToken = 3;\n    optional string bosDate = 4;\n    optional string path = 5;\n    optional string osskeyId = 6;\n    optional string ossPolicy = 7;\n    optional string ossSign = 8;\n    optional string ossBucketName = 9;\n  }\n  message ").concat(PBName.GetQNdownloadUrlOutput, " {\n    required string downloadUrl = 1;\n  }\n  message ").concat(PBName.GetDownloadUrlOutput, " {\n    required string downloadUrl = 1;\n  }\n  message Add2BlackListInput {\n    required string userId = 1;\n  }\n  message RemoveFromBlackListInput {\n    required string userId = 1;\n  }\n  message QueryBlackListInput {\n    required int32 nothing = 1;\n  }\n  message QueryBlackListOutput {\n    repeated string userIds = 1;\n  }\n  message BlackListStatusInput {\n    required string userId = 1;\n  }\n  message BlockPushInput {\n    required string blockeeId = 1;\n  }\n  message ModifyPermissionInput {\n    required int32 openStatus = 1;\n  }\n  message GroupInput {\n    repeated GroupInfo groupInfo = 1;\n  }\n  message GroupOutput {\n    required int32 nothing = 1;\n  }\n  message GroupInfo {\n    required string id = 1;\n    required string name = 2;\n  }\n  message GroupHashInput {\n    required string userId = 1;\n    required string groupHashCode = 2;\n  }\n  message GroupHashOutput {\n    required GroupHashType result = 1;\n  }\n  enum GroupHashType {\n    group_success = 0x00;\n    group_failure = 0x01;\n  }\n  message ").concat(PBName.ChrmInput, " {\n    required int32 nothing = 1;\n  }\n  message ChrmOutput {\n    required int32 nothing = 1;\n  }\n  message ").concat(PBName.ChrmPullMsg, " {\n    required int64 syncTime = 1;\n    required int32 count = 2;\n  }\n  \n  message ChrmPullMsgNew \n  {\n    required int32 count = 1;\n    required int64 syncTime = 2;\n    optional string chrmId=3;\n  }\n  message ").concat(PBName.RelationQryInput, "\n  {\n    optional ChannelType type = 1;\n    optional int32 count = 2;\n    optional int64 startTime = 3;\n    optional int32 order = 4;\n  }\n  message ").concat(PBName.RelationsInput, "\n  {\n    required ChannelType type = 1;\n    optional DownStreamMessage msg =2;\n    optional int32 count = 3;\n    optional int32 offset = 4;\n    optional int64 startTime = 5;\n    optional int64 endTime = 6;\n  }\n  message ").concat(PBName.RelationsOutput, "\n  {\n    repeated RelationInfo info = 1;\n  }\n  message RelationInfo\n  {\n    required ChannelType type = 1;\n    required string userId = 2;\n    optional DownStreamMessage msg =3;\n    optional int64 readMsgTime= 4;\n    optional int64 unreadCount= 5;\n  }\n  message RelationInfoReadTime\n  {\n    required ChannelType type = 1;\n    required int64 readMsgTime= 2;\n    required string targetId = 3;\n  }\n  message ").concat(PBName.CleanHisMsgInput, "\n  {\n      required string targetId = 1;\n      required int64 dataTime = 2;\n      optional int32 conversationType= 3;\n  }\n  message HistoryMessageInput\n  {\n    required string targetId = 1;\n    required int64 dataTime =2;\n    required int32 size  = 3;\n  }\n\n  message HistoryMessagesOuput\n  {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    required int32 hasMsg = 3;\n  }\n  message ").concat(PBName.QueryChatRoomInfoInput, "\n  {\n    required int32 count= 1;\n    optional int32 order= 2;\n  }\n\n  message ").concat(PBName.QueryChatRoomInfoOutput, "\n  {\n    optional int32 userTotalNums = 1;\n    repeated ChrmMember userInfos = 2;\n  }\n  message ChrmMember\n  {\n    required int64 time = 1;\n    required string id = 2;\n  }\n  message MPFollowInput\n  {\n    required string id = 1;\n  }\n\n  message MPFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message ").concat(PBName.MCFollowInput, "\n  {\n    required string id = 1;\n  }\n\n  message MCFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message MpInfo  \n  {\n    required string mpid=1;\n    required string name = 2;\n    required string type = 3;\n    required int64 time=4;\n    optional string portraitUrl=5;\n    optional string extra =6;\n  }\n\n  message SearchMpInput\n  {\n    required int32 type=1;\n    required string id=2;\n  }\n\n  message SearchMpOutput\n  {\n    required int32 nothing=1;\n    repeated MpInfo info = 2;\n  }\n\n  message PullMpInput\n  {\n    required int64 time=1;\n    required string mpid=2;\n  }\n\n  message PullMpOutput\n  {\n    required int32 status=1;\n    repeated MpInfo info = 2;\n  }\n  message ").concat(PBName.HistoryMsgInput, "\n  {\n    optional string targetId = 1;\n    optional int64 time = 2;\n    optional int32 count  = 3;\n    optional int32 order = 4;\n  }\n\n  message ").concat(PBName.HistoryMsgOuput, "\n  {\n    repeated DownStreamMessage list=1;\n    required int64 syncTime=2;\n    required int32 hasMsg=3;\n  }\n  message ").concat(PBName.RtcQueryListInput, "{\n    optional int32 order=1;\n  }\n\n  message ").concat(PBName.RtcKeyDeleteInput, "{\n    repeated string key=1;\n  }\n\n  message ").concat(PBName.RtcValueInfo, "{\n    required string key=1;\n    required string value=2;\n  }\n\n  message RtcUserInfo{\n    required string userId=1;\n    repeated ").concat(PBName.RtcValueInfo, " userData=2;\n  }\n\n  message ").concat(PBName.RtcUserListOutput, "{\n    repeated RtcUserInfo list=1;\n    optional string token=2;\n    optional string sessionId=3;\n  }\n  message RtcRoomInfoOutput{\n    optional string roomId = 1;\n    repeated ").concat(PBName.RtcValueInfo, " roomData = 2;\n    optional int32 userCount = 3;\n    repeated RtcUserInfo list=4;\n  }\n  message ").concat(PBName.RtcInput, "{\n    required int32 roomType=1;\n    optional int32 broadcastType=2;\n  }\n  message RtcQryInput{ \n    required bool isInterior=1;\n    required targetType target=2;\n    repeated string key=3;\n  }\n  message ").concat(PBName.RtcQryOutput, "{\n    repeated ").concat(PBName.RtcValueInfo, " outInfo=1;\n  }\n  message RtcDelDataInput{\n    repeated string key=1;\n    required bool isInterior=2;\n    required targetType target=3;\n  }\n  message ").concat(PBName.RtcDataInput, "{ \n    required bool interior=1;\n    required targetType target=2;\n    repeated string key=3;\n    optional string objectName=4;\n    optional string content=5;\n  }\n  message ").concat(PBName.RtcSetDataInput, "{\n    required bool interior=1;\n    required targetType target=2;\n    required string key=3;\n    required string value=4;\n    optional string objectName=5;\n    optional string content=6;\n  }\n  message ").concat(PBName.RtcUserSetDataInput, " {\n    repeated ").concat(PBName.RtcValueInfo, " valueInfo = 1;\n    required string objectName = 2;\n    repeated ").concat(PBName.RtcValueInfo, " content = 3;\n  }\n  message RtcOutput\n  {\n    optional int32 nothing=1; \n  }\n  message ").concat(PBName.RtcTokenOutput, "{\n    required string rtcToken=1;\n  }\n  enum targetType {\n    ROOM =1 ;\n    PERSON = 2;\n  }\n  message ").concat(PBName.RtcSetOutDataInput, "{\n    required targetType target=1;\n    repeated ").concat(PBName.RtcValueInfo, " valueInfo=2;\n    optional string objectName=3;\n    optional string content=4;\n  }\n  message ").concat(PBName.RtcQryUserOutDataInput, "{\n    repeated string userId = 1;\n  }\n  message ").concat(PBName.RtcUserOutDataOutput, "{\n    repeated RtcUserInfo user = 1;\n  }\n  message ").concat(PBName.SessionsAttQryInput, "{\n    required int32 nothing = 1;\n  }\n  message ").concat(PBName.SessionsAttOutput, "{\n    required int64 inboxTime = 1;\n    required int64 sendboxTime = 2;\n    required int64 totalUnreadCount = 3;\n  }\n  message ").concat(PBName.SessionMsgReadInput, "\n  {\n    required ChannelType type = 1;\n    required int64 msgTime = 2;\n    required string channelId = 3;\n  }\n  message SessionMsgReadOutput\n  {\n    optional int32 nothing=1; \n  }\n  message ").concat(PBName.DeleteSessionsInput, "\n  {\n    repeated SessionInfo sessions = 1;\n  }\n  message ").concat(PBName.SessionInfo, "\n  {\n    required ChannelType type = 1;\n    required string channelId = 2;\n  }\n  message ").concat(PBName.DeleteSessionsOutput, "\n  {\n    optional int32 nothing=1; \n  }\n  message ").concat(PBName.DeleteMsgInput, "\n  {\n    optional ChannelType type = 1;\n    optional string conversationId = 2;\n    repeated DeleteMsg msgs = 3;\n  }\n  message DeleteMsg\n  {\n    optional string msgId = 1;\n    optional int64 msgDataTime = 2;\n    optional int32 direct = 3;\n  }\n  message ChrmKVEntity {\n    required string key = 1;\n    required string value = 2;\n    optional int32 status = 3;\n    optional int64 timestamp = 4;\n    optional string uid = 5;\n  }\n  message ").concat(PBName.SetChrmKV, " {\n    required ChrmKVEntity entry = 1;\n    optional bool bNotify = 2;\n    optional UpStreamMessage notification = 3;\n    optional ChannelType type = 4;\n  }\n  message ").concat(PBName.ChrmKVOutput, " {\n    repeated ChrmKVEntity entries = 1;\n    optional bool bFullUpdate = 2;\n    optional int64 syncTime = 3;\n  }\n  message ").concat(PBName.QueryChrmKV, " {\n    required int64 timestamp = 1;\n  }\n  message ").concat(PBName.SetUserSettingInput, " {\n    required int64 version=1;\n    required string value=2;\n  }\n  message ").concat(PBName.SetUserSettingOutput, " {\n    required int64 version=1;\n    required bool reserve=2;\n  }\n  message ").concat(PBName.PullUserSettingInput, " {\n    required int64 version=1;//\u5F53\u524D\u5BA2\u6237\u7AEF\u7684\u6700\u5927\u7248\u672C\u53F7\n    optional bool reserve=2;\n  }\n  message ").concat(PBName.PullUserSettingOutput, " {\n    repeated UserSettingItem items = 1;\n    required int64 version=2;\n  }\n  message UserSettingItem {\n    required string targetId= 1;\n    required ChannelType type = 2;\n    required string key = 4;\n    required bytes value = 5;\n    required int64 version=6;\n    required int32 status=7;\n  }\n  message ").concat(PBName.SessionReq, " {\n    required int64 time = 1;\n  }\n  message ").concat(PBName.SessionStates, " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message ").concat(PBName.SessionState, " {\n    required ChannelType type = 1;\n    required string channelId = 2;  \n    optional int64 time = 3;\n    repeated SessionStateItem stateItem = 4;\n  }\n  message ").concat(PBName.SessionStateItem, " {\n    required SessionStateType sessionStateType = 1;\n    required string value = 2;\n  }\n  enum SessionStateType {\n    IsSilent = 1;\n    IsTop = 2;\n  }\n  message ").concat(PBName.SessionStateModifyReq, " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message ").concat(PBName.SessionStateModifyResp, " {\n    required int64 version=1;\n  }\n}\n");

  function protobuf(a) {
    var c = function () {
      function a(a, b, c) {
        this.low = 0 | a, this.high = 0 | b, this.unsigned = !!c;
      }

      function b(a) {
        return (a && a.__isLong__) === !0;
      }

      function e(a, b) {
        var e, f, h;
        return b ? (a >>>= 0, (h = a >= 0 && a < 256) && (f = d[a]) ? f : (e = g(a, (0 | a) < 0 ? -1 : 0, !0), h && (d[a] = e), e)) : (a |= 0, (h = a >= -128 && a < 128) && (f = c[a]) ? f : (e = g(a, a < 0 ? -1 : 0, !1), h && (c[a] = e), e));
      }

      function f(a, b) {
        if (isNaN(a) || !isFinite(a)) return b ? r : q;

        if (b) {
          if (a < 0) return r;
          if (a >= n) return w;
        } else {
          if (-o >= a) return x;
          if (a + 1 >= o) return v;
        }

        return a < 0 ? f(-a, b).neg() : g(0 | a % m, 0 | a / m, b);
      }

      function g(b, c, d) {
        return new a(b, c, d);
      }

      function i(a, b, c) {
        var d, e, g, j, k, l, m;
        if (a.length === 0) throw Error('empty string');
        if (a === 'NaN' || a === 'Infinity' || a === '+Infinity' || a === '-Infinity') return q;
        if (typeof b === 'number' ? (c = b, b = !1) : b = !!b, c = c || 10, c < 2 || c > 36) throw RangeError('radix');
        if ((d = a.indexOf('-')) > 0) throw Error('interior hyphen');
        if (d === 0) return i(a.substring(1), b, c).neg();

        for (e = f(h(c, 8)), g = q, j = 0; j < a.length; j += 8) {
          k = Math.min(8, a.length - j), l = parseInt(a.substring(j, j + k), c), k < 8 ? (m = f(h(c, k)), g = g.mul(m).add(f(l))) : (g = g.mul(e), g = g.add(f(l)));
        }

        return g.unsigned = b, g;
      }

      function j(b) {
        return b instanceof a ? b : typeof b === 'number' ? f(b) : typeof b === 'string' ? i(b) : g(b.low, b.high, b.unsigned);
      }

      var c, d, h, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
      return a.prototype.__isLong__, Object.defineProperty(a.prototype, '__isLong__', {
        value: !0,
        enumerable: !1,
        configurable: !1
      }), a.isLong = b, c = {}, d = {}, a.fromInt = e, a.fromNumber = f, a.fromBits = g, h = Math.pow, a.fromString = i, a.fromValue = j, k = 65536, l = 1 << 24, m = k * k, n = m * m, o = n / 2, p = e(l), q = e(0), a.ZERO = q, r = e(0, !0), a.UZERO = r, s = e(1), a.ONE = s, t = e(1, !0), a.UONE = t, u = e(-1), a.NEG_ONE = u, v = g(-1, 2147483647, !1), a.MAX_VALUE = v, w = g(-1, -1, !0), a.MAX_UNSIGNED_VALUE = w, x = g(0, -2147483648, !1), a.MIN_VALUE = x, y = a.prototype, y.toInt = function () {
        return this.unsigned ? this.low >>> 0 : this.low;
      }, y.toNumber = function () {
        return this.unsigned ? (this.high >>> 0) * m + (this.low >>> 0) : this.high * m + (this.low >>> 0);
      }, y.toString = function (a) {
        var b, c, d, e, g, i, j, k, l;
        if (a = a || 10, a < 2 || a > 36) throw RangeError('radix');
        if (this.isZero()) return '0';
        if (this.isNegative()) return this.eq(x) ? (b = f(a), c = this.div(b), d = c.mul(b).sub(this), c.toString(a) + d.toInt().toString(a)) : '-' + this.neg().toString(a);

        for (e = f(h(a, 6), this.unsigned), g = this, i = '';;) {
          if (j = g.div(e), k = g.sub(j.mul(e)).toInt() >>> 0, l = k.toString(a), g = j, g.isZero()) return l + i;

          for (; l.length < 6;) {
            l = '0' + l;
          }

          i = '' + l + i;
        }
      }, y.getHighBits = function () {
        return this.high;
      }, y.getHighBitsUnsigned = function () {
        return this.high >>> 0;
      }, y.getLowBits = function () {
        return this.low;
      }, y.getLowBitsUnsigned = function () {
        return this.low >>> 0;
      }, y.getNumBitsAbs = function () {
        var a, b;
        if (this.isNegative()) return this.eq(x) ? 64 : this.neg().getNumBitsAbs();

        for (a = this.high != 0 ? this.high : this.low, b = 31; b > 0 && (a & 1 << b) == 0; b--) {
        }

        return this.high != 0 ? b + 33 : b + 1;
      }, y.isZero = function () {
        return this.high === 0 && this.low === 0;
      }, y.isNegative = function () {
        return !this.unsigned && this.high < 0;
      }, y.isPositive = function () {
        return this.unsigned || this.high >= 0;
      }, y.isOdd = function () {
        return (1 & this.low) === 1;
      }, y.isEven = function () {
        return (1 & this.low) === 0;
      }, y.equals = function (a) {
        return b(a) || (a = j(a)), this.unsigned !== a.unsigned && this.high >>> 31 === 1 && a.high >>> 31 === 1 ? !1 : this.high === a.high && this.low === a.low;
      }, y.eq = y.equals, y.notEquals = function (a) {
        return !this.eq(a);
      }, y.neq = y.notEquals, y.lessThan = function (a) {
        return this.comp(a) < 0;
      }, y.lt = y.lessThan, y.lessThanOrEqual = function (a) {
        return this.comp(a) <= 0;
      }, y.lte = y.lessThanOrEqual, y.greaterThan = function (a) {
        return this.comp(a) > 0;
      }, y.gt = y.greaterThan, y.greaterThanOrEqual = function (a) {
        return this.comp(a) >= 0;
      }, y.gte = y.greaterThanOrEqual, y.compare = function (a) {
        if (b(a) || (a = j(a)), this.eq(a)) return 0;
        var c = this.isNegative();
        var d = a.isNegative();
        return c && !d ? -1 : !c && d ? 1 : this.unsigned ? a.high >>> 0 > this.high >>> 0 || a.high === this.high && a.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(a).isNegative() ? -1 : 1;
      }, y.comp = y.compare, y.negate = function () {
        return !this.unsigned && this.eq(x) ? x : this.not().add(s);
      }, y.neg = y.negate, y.add = function (a) {
        var c, d, e, f, h, i, k, l, m, n, o, p;
        return b(a) || (a = j(a)), c = this.high >>> 16, d = 65535 & this.high, e = this.low >>> 16, f = 65535 & this.low, h = a.high >>> 16, i = 65535 & a.high, k = a.low >>> 16, l = 65535 & a.low, m = 0, n = 0, o = 0, p = 0, p += f + l, o += p >>> 16, p &= 65535, o += e + k, n += o >>> 16, o &= 65535, n += d + i, m += n >>> 16, n &= 65535, m += c + h, m &= 65535, g(o << 16 | p, m << 16 | n, this.unsigned);
      }, y.subtract = function (a) {
        return b(a) || (a = j(a)), this.add(a.neg());
      }, y.sub = y.subtract, y.multiply = function (a) {
        var c, d, e, h, i, k, l, m, n, o, r, s;
        return this.isZero() ? q : (b(a) || (a = j(a)), a.isZero() ? q : this.eq(x) ? a.isOdd() ? x : q : a.eq(x) ? this.isOdd() ? x : q : this.isNegative() ? a.isNegative() ? this.neg().mul(a.neg()) : this.neg().mul(a).neg() : a.isNegative() ? this.mul(a.neg()).neg() : this.lt(p) && a.lt(p) ? f(this.toNumber() * a.toNumber(), this.unsigned) : (c = this.high >>> 16, d = 65535 & this.high, e = this.low >>> 16, h = 65535 & this.low, i = a.high >>> 16, k = 65535 & a.high, l = a.low >>> 16, m = 65535 & a.low, n = 0, o = 0, r = 0, s = 0, s += h * m, r += s >>> 16, s &= 65535, r += e * m, o += r >>> 16, r &= 65535, r += h * l, o += r >>> 16, r &= 65535, o += d * m, n += o >>> 16, o &= 65535, o += e * l, n += o >>> 16, o &= 65535, o += h * k, n += o >>> 16, o &= 65535, n += c * m + d * l + e * k + h * i, n &= 65535, g(r << 16 | s, n << 16 | o, this.unsigned)));
      }, y.mul = y.multiply, y.divide = function (a) {
        var c, d, e, g, i, k, l, m;
        if (b(a) || (a = j(a)), a.isZero()) throw Error('division by zero');
        if (this.isZero()) return this.unsigned ? r : q;

        if (this.unsigned) {
          if (a.unsigned || (a = a.toUnsigned()), a.gt(this)) return r;
          if (a.gt(this.shru(1))) return t;
          e = r;
        } else {
          if (this.eq(x)) return a.eq(s) || a.eq(u) ? x : a.eq(x) ? s : (g = this.shr(1), c = g.div(a).shl(1), c.eq(q) ? a.isNegative() ? s : u : (d = this.sub(a.mul(c)), e = c.add(d.div(a))));
          if (a.eq(x)) return this.unsigned ? r : q;
          if (this.isNegative()) return a.isNegative() ? this.neg().div(a.neg()) : this.neg().div(a).neg();
          if (a.isNegative()) return this.div(a.neg()).neg();
          e = q;
        }

        for (d = this; d.gte(a);) {
          for (c = Math.max(1, Math.floor(d.toNumber() / a.toNumber())), i = Math.ceil(Math.log(c) / Math.LN2), k = i <= 48 ? 1 : h(2, i - 48), l = f(c), m = l.mul(a); m.isNegative() || m.gt(d);) {
            c -= k, l = f(c, this.unsigned), m = l.mul(a);
          }

          l.isZero() && (l = s), e = e.add(l), d = d.sub(m);
        }

        return e;
      }, y.div = y.divide, y.modulo = function (a) {
        return b(a) || (a = j(a)), this.sub(this.div(a).mul(a));
      }, y.mod = y.modulo, y.not = function () {
        return g(~this.low, ~this.high, this.unsigned);
      }, y.and = function (a) {
        return b(a) || (a = j(a)), g(this.low & a.low, this.high & a.high, this.unsigned);
      }, y.or = function (a) {
        return b(a) || (a = j(a)), g(this.low | a.low, this.high | a.high, this.unsigned);
      }, y.xor = function (a) {
        return b(a) || (a = j(a)), g(this.low ^ a.low, this.high ^ a.high, this.unsigned);
      }, y.shiftLeft = function (a) {
        return b(a) && (a = a.toInt()), (a &= 63) === 0 ? this : a < 32 ? g(this.low << a, this.high << a | this.low >>> 32 - a, this.unsigned) : g(0, this.low << a - 32, this.unsigned);
      }, y.shl = y.shiftLeft, y.shiftRight = function (a) {
        return b(a) && (a = a.toInt()), (a &= 63) === 0 ? this : a < 32 ? g(this.low >>> a | this.high << 32 - a, this.high >> a, this.unsigned) : g(this.high >> a - 32, this.high >= 0 ? 0 : -1, this.unsigned);
      }, y.shr = y.shiftRight, y.shiftRightUnsigned = function (a) {
        var c, d;
        return b(a) && (a = a.toInt()), a &= 63, a === 0 ? this : (c = this.high, a < 32 ? (d = this.low, g(d >>> a | c << 32 - a, c >>> a, this.unsigned)) : a === 32 ? g(c, 0, this.unsigned) : g(c >>> a - 32, 0, this.unsigned));
      }, y.shru = y.shiftRightUnsigned, y.toSigned = function () {
        return this.unsigned ? g(this.low, this.high, !1) : this;
      }, y.toUnsigned = function () {
        return this.unsigned ? this : g(this.low, this.high, !0);
      }, y.toBytes = function (a) {
        return a ? this.toBytesLE() : this.toBytesBE();
      }, y.toBytesLE = function () {
        var a = this.high;
        var b = this.low;
        return [255 & b, 255 & b >>> 8, 255 & b >>> 16, 255 & b >>> 24, 255 & a, 255 & a >>> 8, 255 & a >>> 16, 255 & a >>> 24];
      }, y.toBytesBE = function () {
        var a = this.high;
        var b = this.low;
        return [255 & a >>> 24, 255 & a >>> 16, 255 & a >>> 8, 255 & a, 255 & b >>> 24, 255 & b >>> 16, 255 & b >>> 8, 255 & b];
      }, a;
    }();

    var d = function (a) {
      function f(a) {
        var b = 0;
        return function () {
          return b < a.length ? a.charCodeAt(b++) : null;
        };
      }

      function g() {
        var a = [];
        var b = [];
        return function () {
          return arguments.length === 0 ? b.join('') + e.apply(String, a) : (a.length + arguments.length > 1024 && (b.push(e.apply(String, a)), a.length = 0), Array.prototype.push.apply(a, arguments), void 0);
        };
      }

      function h(a, b, c, d, e) {
        var f;
        var g;
        var h = 8 * e - d - 1;
        var i = (1 << h) - 1;
        var j = i >> 1;
        var k = -7;
        var l = c ? e - 1 : 0;
        var m = c ? -1 : 1;
        var n = a[b + l];

        for (l += m, f = n & (1 << -k) - 1, n >>= -k, k += h; k > 0; f = 256 * f + a[b + l], l += m, k -= 8) {
        }

        for (g = f & (1 << -k) - 1, f >>= -k, k += d; k > 0; g = 256 * g + a[b + l], l += m, k -= 8) {
        }

        if (f === 0) f = 1 - j;else {
          if (f === i) return g ? 0 / 0 : 1 / 0 * (n ? -1 : 1);
          g += Math.pow(2, d), f -= j;
        }
        return (n ? -1 : 1) * g * Math.pow(2, f - d);
      }

      function i(a, b, c, d, e, f) {
        var g;
        var h;
        var i;
        var j = 8 * f - e - 1;
        var k = (1 << j) - 1;
        var l = k >> 1;
        var m = e === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var n = d ? 0 : f - 1;
        var o = d ? 1 : -1;
        var p = b < 0 || b === 0 && 1 / b < 0 ? 1 : 0;

        for (b = Math.abs(b), isNaN(b) || 1 / 0 === b ? (h = isNaN(b) ? 1 : 0, g = k) : (g = Math.floor(Math.log(b) / Math.LN2), b * (i = Math.pow(2, -g)) < 1 && (g--, i *= 2), b += g + l >= 1 ? m / i : m * Math.pow(2, 1 - l), b * i >= 2 && (g++, i /= 2), g + l >= k ? (h = 0, g = k) : g + l >= 1 ? (h = (b * i - 1) * Math.pow(2, e), g += l) : (h = b * Math.pow(2, l - 1) * Math.pow(2, e), g = 0)); e >= 8; a[c + n] = 255 & h, n += o, h /= 256, e -= 8) {
        }

        for (g = g << e | h, j += e; j > 0; a[c + n] = 255 & g, n += o, g /= 256, j -= 8) {
        }

        a[c + n - o] |= 128 * p;
      }

      var c;
      var d;
      var e;
      var j;
      var k;

      var b = function b(a, c, e) {
        if (typeof a === 'undefined' && (a = b.DEFAULT_CAPACITY), typeof c === 'undefined' && (c = b.DEFAULT_ENDIAN), typeof e === 'undefined' && (e = b.DEFAULT_NOASSERT), !e) {
          if (a = 0 | a, a < 0) throw RangeError('Illegal capacity');
          c = !!c, e = !!e;
        }

        this.buffer = a === 0 ? d : new ArrayBuffer(a), this.view = a === 0 ? null : new Uint8Array(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = a, this.littleEndian = c, this.noAssert = e;
      };

      return b.VERSION = '5.0.1', b.LITTLE_ENDIAN = !0, b.BIG_ENDIAN = !1, b.DEFAULT_CAPACITY = 16, b.DEFAULT_ENDIAN = b.BIG_ENDIAN, b.DEFAULT_NOASSERT = !1, b.Long = a || null, c = b.prototype, c.__isByteBuffer__, Object.defineProperty(c, '__isByteBuffer__', {
        value: !0,
        enumerable: !1,
        configurable: !1
      }), d = new ArrayBuffer(0), e = String.fromCharCode, b.accessor = function () {
        return Uint8Array;
      }, b.allocate = function (a, c, d) {
        return new b(a, c, d);
      }, b.concat = function (a, c, d, e) {
        var f, i, g, h, k, j;

        for ((typeof c === 'boolean' || typeof c !== 'string') && (e = d, d = c, c = void 0), f = 0, g = 0, h = a.length; h > g; ++g) {
          b.isByteBuffer(a[g]) || (a[g] = b.wrap(a[g], c)), i = a[g].limit - a[g].offset, i > 0 && (f += i);
        }

        if (f === 0) return new b(0, d, e);

        for (j = new b(f, d, e), g = 0; h > g;) {
          k = a[g++], i = k.limit - k.offset, i <= 0 || (j.view.set(k.view.subarray(k.offset, k.limit), j.offset), j.offset += i);
        }

        return j.limit = j.offset, j.offset = 0, j;
      }, b.isByteBuffer = function (a) {
        return (a && a.__isByteBuffer__) === !0;
      }, b.type = function () {
        return ArrayBuffer;
      }, b.wrap = function (a, d, e, f) {
        var g, h;
        if (typeof d !== 'string' && (f = e, e = d, d = void 0), typeof a === 'string') switch (typeof d === 'undefined' && (d = 'utf8'), d) {
          case 'base64':
            return b.fromBase64(a, e);

          case 'hex':
            return b.fromHex(a, e);

          case 'binary':
            return b.fromBinary(a, e);

          case 'utf8':
            return b.fromUTF8(a, e);

          case 'debug':
            return b.fromDebug(a, e);

          default:
            throw Error('Unsupported encoding: ' + d);
        }
        if (a === null || _typeof(a) !== 'object') throw TypeError('Illegal buffer');
        if (b.isByteBuffer(a)) return g = c.clone.call(a), g.markedOffset = -1, g;
        if (a instanceof Uint8Array) g = new b(0, e, f), a.length > 0 && (g.buffer = a.buffer, g.offset = a.byteOffset, g.limit = a.byteOffset + a.byteLength, g.view = new Uint8Array(a.buffer));else if (a instanceof ArrayBuffer) g = new b(0, e, f), a.byteLength > 0 && (g.buffer = a, g.offset = 0, g.limit = a.byteLength, g.view = a.byteLength > 0 ? new Uint8Array(a) : null);else {
          if (Object.prototype.toString.call(a) !== '[object Array]') throw TypeError('Illegal buffer');

          for (g = new b(a.length, e, f), g.limit = a.length, h = 0; h < a.length; ++h) {
            g.view[h] = a[h];
          }
        }
        return g;
      }, c.writeBitSet = function (a, b) {
        var h;
        var d;
        var e;
        var f;
        var g;
        var i;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (!(a instanceof Array)) throw TypeError('Illegal BitSet: Not an array');
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        for (d = b, e = a.length, f = e >> 3, g = 0, b += this.writeVarint32(e, b); f--;) {
          h = 1 & !!a[g++] | (1 & !!a[g++]) << 1 | (1 & !!a[g++]) << 2 | (1 & !!a[g++]) << 3 | (1 & !!a[g++]) << 4 | (1 & !!a[g++]) << 5 | (1 & !!a[g++]) << 6 | (1 & !!a[g++]) << 7, this.writeByte(h, b++);
        }

        if (e > g) {
          for (i = 0, h = 0; e > g;) {
            h |= (1 & !!a[g++]) << i++;
          }

          this.writeByte(h, b++);
        }

        return c ? (this.offset = b, this) : b - d;
      }, c.readBitSet = function (a) {
        var h;
        var c;
        var d;
        var e;
        var f;
        var g;
        var i;
        var b = typeof a === 'undefined';

        for (b && (a = this.offset), c = this.readVarint32(a), d = c.value, e = d >> 3, f = 0, g = [], a += c.length; e--;) {
          h = this.readByte(a++), g[f++] = !!(1 & h), g[f++] = !!(2 & h), g[f++] = !!(4 & h), g[f++] = !!(8 & h), g[f++] = !!(16 & h), g[f++] = !!(32 & h), g[f++] = !!(64 & h), g[f++] = !!(128 & h);
        }

        if (d > f) for (i = 0, h = this.readByte(a++); d > f;) {
          g[f++] = !!(1 & h >> i++);
        }
        return b && (this.offset = a), g;
      }, c.readBytes = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + a > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + a + ') <= ' + this.buffer.byteLength);
        }

        return d = this.slice(b, b + a), c && (this.offset += a), d;
      }, c.writeBytes = c.append, c.writeInt8 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a |= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 1, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 1, this.view[b] = a, c && (this.offset += 1), this;
      }, c.writeByte = c.writeInt8, c.readInt8 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 1 + ') <= ' + this.buffer.byteLength);
        }

        return c = this.view[a], (128 & c) === 128 && (c = -(255 - c + 1)), b && (this.offset += 1), c;
      }, c.readByte = c.readInt8, c.writeUint8 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 1, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 1, this.view[b] = a, c && (this.offset += 1), this;
      }, c.writeUInt8 = c.writeUint8, c.readUint8 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 1 + ') <= ' + this.buffer.byteLength);
        }

        return c = this.view[a], b && (this.offset += 1), c;
      }, c.readUInt8 = c.readUint8, c.writeInt16 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a |= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 2, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 2, this.littleEndian ? (this.view[b + 1] = (65280 & a) >>> 8, this.view[b] = 255 & a) : (this.view[b] = (65280 & a) >>> 8, this.view[b + 1] = 255 & a), c && (this.offset += 2), this;
      }, c.writeShort = c.writeInt16, c.readInt16 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 2 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 2 + ') <= ' + this.buffer.byteLength);
        }

        return c = 0, this.littleEndian ? (c = this.view[a], c |= this.view[a + 1] << 8) : (c = this.view[a] << 8, c |= this.view[a + 1]), (32768 & c) === 32768 && (c = -(65535 - c + 1)), b && (this.offset += 2), c;
      }, c.readShort = c.readInt16, c.writeUint16 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 2, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 2, this.littleEndian ? (this.view[b + 1] = (65280 & a) >>> 8, this.view[b] = 255 & a) : (this.view[b] = (65280 & a) >>> 8, this.view[b + 1] = 255 & a), c && (this.offset += 2), this;
      }, c.writeUInt16 = c.writeUint16, c.readUint16 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 2 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 2 + ') <= ' + this.buffer.byteLength);
        }

        return c = 0, this.littleEndian ? (c = this.view[a], c |= this.view[a + 1] << 8) : (c = this.view[a] << 8, c |= this.view[a + 1]), b && (this.offset += 2), c;
      }, c.readUInt16 = c.readUint16, c.writeInt32 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a |= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 4, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 4, this.littleEndian ? (this.view[b + 3] = 255 & a >>> 24, this.view[b + 2] = 255 & a >>> 16, this.view[b + 1] = 255 & a >>> 8, this.view[b] = 255 & a) : (this.view[b] = 255 & a >>> 24, this.view[b + 1] = 255 & a >>> 16, this.view[b + 2] = 255 & a >>> 8, this.view[b + 3] = 255 & a), c && (this.offset += 4), this;
      }, c.writeInt = c.writeInt32, c.readInt32 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 4 + ') <= ' + this.buffer.byteLength);
        }

        return c = 0, this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0), c |= 0, b && (this.offset += 4), c;
      }, c.readInt = c.readInt32, c.writeUint32 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 4, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 4, this.littleEndian ? (this.view[b + 3] = 255 & a >>> 24, this.view[b + 2] = 255 & a >>> 16, this.view[b + 1] = 255 & a >>> 8, this.view[b] = 255 & a) : (this.view[b] = 255 & a >>> 24, this.view[b + 1] = 255 & a >>> 16, this.view[b + 2] = 255 & a >>> 8, this.view[b + 3] = 255 & a), c && (this.offset += 4), this;
      }, c.writeUInt32 = c.writeUint32, c.readUint32 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 4 + ') <= ' + this.buffer.byteLength);
        }

        return c = 0, this.littleEndian ? (c = this.view[a + 2] << 16, c |= this.view[a + 1] << 8, c |= this.view[a], c += this.view[a + 3] << 24 >>> 0) : (c = this.view[a + 1] << 16, c |= this.view[a + 2] << 8, c |= this.view[a + 3], c += this.view[a] << 24 >>> 0), b && (this.offset += 4), c;
      }, c.readUInt32 = c.readUint32, a && (c.writeInt64 = function (b, c) {
        var e;
        var f;
        var g;
        var d = typeof c === 'undefined';

        if (d && (c = this.offset), !this.noAssert) {
          if (typeof b === 'number') b = a.fromNumber(b);else if (typeof b === 'string') b = a.fromString(b);else if (!(b && b instanceof a)) throw TypeError('Illegal value: ' + b + ' (not an integer or Long)');
          if (typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal offset: ' + c + ' (not an integer)');
          if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + c + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return typeof b === 'number' ? b = a.fromNumber(b) : typeof b === 'string' && (b = a.fromString(b)), c += 8, e = this.buffer.byteLength, c > e && this.resize((e *= 2) > c ? e : c), c -= 8, f = b.low, g = b.high, this.littleEndian ? (this.view[c + 3] = 255 & f >>> 24, this.view[c + 2] = 255 & f >>> 16, this.view[c + 1] = 255 & f >>> 8, this.view[c] = 255 & f, c += 4, this.view[c + 3] = 255 & g >>> 24, this.view[c + 2] = 255 & g >>> 16, this.view[c + 1] = 255 & g >>> 8, this.view[c] = 255 & g) : (this.view[c] = 255 & g >>> 24, this.view[c + 1] = 255 & g >>> 16, this.view[c + 2] = 255 & g >>> 8, this.view[c + 3] = 255 & g, c += 4, this.view[c] = 255 & f >>> 24, this.view[c + 1] = 255 & f >>> 16, this.view[c + 2] = 255 & f >>> 8, this.view[c + 3] = 255 & f), d && (this.offset += 8), this;
      }, c.writeLong = c.writeInt64, c.readInt64 = function (b) {
        var d;
        var e;
        var f;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 8 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 8 + ') <= ' + this.buffer.byteLength);
        }

        return d = 0, e = 0, this.littleEndian ? (d = this.view[b + 2] << 16, d |= this.view[b + 1] << 8, d |= this.view[b], d += this.view[b + 3] << 24 >>> 0, b += 4, e = this.view[b + 2] << 16, e |= this.view[b + 1] << 8, e |= this.view[b], e += this.view[b + 3] << 24 >>> 0) : (e = this.view[b + 1] << 16, e |= this.view[b + 2] << 8, e |= this.view[b + 3], e += this.view[b] << 24 >>> 0, b += 4, d = this.view[b + 1] << 16, d |= this.view[b + 2] << 8, d |= this.view[b + 3], d += this.view[b] << 24 >>> 0), f = new a(d, e, !1), c && (this.offset += 8), f;
      }, c.readLong = c.readInt64, c.writeUint64 = function (b, c) {
        var e;
        var f;
        var g;
        var d = typeof c === 'undefined';

        if (d && (c = this.offset), !this.noAssert) {
          if (typeof b === 'number') b = a.fromNumber(b);else if (typeof b === 'string') b = a.fromString(b);else if (!(b && b instanceof a)) throw TypeError('Illegal value: ' + b + ' (not an integer or Long)');
          if (typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal offset: ' + c + ' (not an integer)');
          if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + c + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return typeof b === 'number' ? b = a.fromNumber(b) : typeof b === 'string' && (b = a.fromString(b)), c += 8, e = this.buffer.byteLength, c > e && this.resize((e *= 2) > c ? e : c), c -= 8, f = b.low, g = b.high, this.littleEndian ? (this.view[c + 3] = 255 & f >>> 24, this.view[c + 2] = 255 & f >>> 16, this.view[c + 1] = 255 & f >>> 8, this.view[c] = 255 & f, c += 4, this.view[c + 3] = 255 & g >>> 24, this.view[c + 2] = 255 & g >>> 16, this.view[c + 1] = 255 & g >>> 8, this.view[c] = 255 & g) : (this.view[c] = 255 & g >>> 24, this.view[c + 1] = 255 & g >>> 16, this.view[c + 2] = 255 & g >>> 8, this.view[c + 3] = 255 & g, c += 4, this.view[c] = 255 & f >>> 24, this.view[c + 1] = 255 & f >>> 16, this.view[c + 2] = 255 & f >>> 8, this.view[c + 3] = 255 & f), d && (this.offset += 8), this;
      }, c.writeUInt64 = c.writeUint64, c.readUint64 = function (b) {
        var d;
        var e;
        var f;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 8 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 8 + ') <= ' + this.buffer.byteLength);
        }

        return d = 0, e = 0, this.littleEndian ? (d = this.view[b + 2] << 16, d |= this.view[b + 1] << 8, d |= this.view[b], d += this.view[b + 3] << 24 >>> 0, b += 4, e = this.view[b + 2] << 16, e |= this.view[b + 1] << 8, e |= this.view[b], e += this.view[b + 3] << 24 >>> 0) : (e = this.view[b + 1] << 16, e |= this.view[b + 2] << 8, e |= this.view[b + 3], e += this.view[b] << 24 >>> 0, b += 4, d = this.view[b + 1] << 16, d |= this.view[b + 2] << 8, d |= this.view[b + 3], d += this.view[b] << 24 >>> 0), f = new a(d, e, !0), c && (this.offset += 8), f;
      }, c.readUInt64 = c.readUint64), c.writeFloat32 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number') throw TypeError('Illegal value: ' + a + ' (not a number)');
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 4, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 4, i(this.view, a, b, this.littleEndian, 23, 4), c && (this.offset += 4), this;
      }, c.writeFloat = c.writeFloat32, c.readFloat32 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 4 + ') <= ' + this.buffer.byteLength);
        }

        return c = h(this.view, a, this.littleEndian, 23, 4), b && (this.offset += 4), c;
      }, c.readFloat = c.readFloat32, c.writeFloat64 = function (a, b) {
        var d;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'number') throw TypeError('Illegal value: ' + a + ' (not a number)');
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return b += 8, d = this.buffer.byteLength, b > d && this.resize((d *= 2) > b ? d : b), b -= 8, i(this.view, a, b, this.littleEndian, 52, 8), c && (this.offset += 8), this;
      }, c.writeDouble = c.writeFloat64, c.readFloat64 = function (a) {
        var c;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 8 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 8 + ') <= ' + this.buffer.byteLength);
        }

        return c = h(this.view, a, this.littleEndian, 52, 8), b && (this.offset += 8), c;
      }, c.readDouble = c.readFloat64, b.MAX_VARINT32_BYTES = 5, b.calculateVarint32 = function (a) {
        return a >>>= 0, a < 128 ? 1 : a < 16384 ? 2 : 1 << 21 > a ? 3 : 1 << 28 > a ? 4 : 5;
      }, b.zigZagEncode32 = function (a) {
        return ((a |= 0) << 1 ^ a >> 31) >>> 0;
      }, b.zigZagDecode32 = function (a) {
        return 0 | a >>> 1 ^ -(1 & a);
      }, c.writeVarint32 = function (a, c) {
        var f;
        var e;
        var g;
        var d = typeof c === 'undefined';

        if (d && (c = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a |= 0, typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal offset: ' + c + ' (not an integer)');
          if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + c + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        for (e = b.calculateVarint32(a), c += e, g = this.buffer.byteLength, c > g && this.resize((g *= 2) > c ? g : c), c -= e, a >>>= 0; a >= 128;) {
          f = 128 | 127 & a, this.view[c++] = f, a >>>= 7;
        }

        return this.view[c++] = a, d ? (this.offset = c, this) : e;
      }, c.writeVarint32ZigZag = function (a, c) {
        return this.writeVarint32(b.zigZagEncode32(a), c);
      }, c.readVarint32 = function (a) {
        var e;
        var c;
        var d;
        var f;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 1 + ') <= ' + this.buffer.byteLength);
        }

        c = 0, d = 0;

        do {
          if (!this.noAssert && a > this.limit) throw f = Error('Truncated'), f.truncated = !0, f;
          e = this.view[a++], c < 5 && (d |= (127 & e) << 7 * c), ++c;
        } while ((128 & e) !== 0);

        return d |= 0, b ? (this.offset = a, d) : {
          value: d,
          length: c
        };
      }, c.readVarint32ZigZag = function (a) {
        var c = this.readVarint32(a);
        return _typeof(c) === 'object' ? c.value = b.zigZagDecode32(c.value) : c = b.zigZagDecode32(c), c;
      }, a && (b.MAX_VARINT64_BYTES = 10, b.calculateVarint64 = function (b) {
        typeof b === 'number' ? b = a.fromNumber(b) : typeof b === 'string' && (b = a.fromString(b));
        var c = b.toInt() >>> 0;
        var d = b.shiftRightUnsigned(28).toInt() >>> 0;
        var e = b.shiftRightUnsigned(56).toInt() >>> 0;
        return e == 0 ? d == 0 ? c < 16384 ? c < 128 ? 1 : 2 : 1 << 21 > c ? 3 : 4 : d < 16384 ? d < 128 ? 5 : 6 : 1 << 21 > d ? 7 : 8 : e < 128 ? 9 : 10;
      }, b.zigZagEncode64 = function (b) {
        return typeof b === 'number' ? b = a.fromNumber(b, !1) : typeof b === 'string' ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned()), b.shiftLeft(1).xor(b.shiftRight(63)).toUnsigned();
      }, b.zigZagDecode64 = function (b) {
        return typeof b === 'number' ? b = a.fromNumber(b, !1) : typeof b === 'string' ? b = a.fromString(b, !1) : b.unsigned !== !1 && (b = b.toSigned()), b.shiftRightUnsigned(1).xor(b.and(a.ONE).toSigned().negate()).toSigned();
      }, c.writeVarint64 = function (c, d) {
        var f;
        var g;
        var h;
        var i;
        var j;
        var e = typeof d === 'undefined';

        if (e && (d = this.offset), !this.noAssert) {
          if (typeof c === 'number') c = a.fromNumber(c);else if (typeof c === 'string') c = a.fromString(c);else if (!(c && c instanceof a)) throw TypeError('Illegal value: ' + c + ' (not an integer or Long)');
          if (typeof d !== 'number' || d % 1 !== 0) throw TypeError('Illegal offset: ' + d + ' (not an integer)');
          if (d >>>= 0, d < 0 || d + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + d + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        switch (typeof c === 'number' ? c = a.fromNumber(c, !1) : typeof c === 'string' ? c = a.fromString(c, !1) : c.unsigned !== !1 && (c = c.toSigned()), f = b.calculateVarint64(c), g = c.toInt() >>> 0, h = c.shiftRightUnsigned(28).toInt() >>> 0, i = c.shiftRightUnsigned(56).toInt() >>> 0, d += f, j = this.buffer.byteLength, d > j && this.resize((j *= 2) > d ? j : d), d -= f, f) {
          case 10:
            this.view[d + 9] = 1 & i >>> 7;

          case 9:
            this.view[d + 8] = f !== 9 ? 128 | i : 127 & i;

          case 8:
            this.view[d + 7] = f !== 8 ? 128 | h >>> 21 : 127 & h >>> 21;

          case 7:
            this.view[d + 6] = f !== 7 ? 128 | h >>> 14 : 127 & h >>> 14;

          case 6:
            this.view[d + 5] = f !== 6 ? 128 | h >>> 7 : 127 & h >>> 7;

          case 5:
            this.view[d + 4] = f !== 5 ? 128 | h : 127 & h;

          case 4:
            this.view[d + 3] = f !== 4 ? 128 | g >>> 21 : 127 & g >>> 21;

          case 3:
            this.view[d + 2] = f !== 3 ? 128 | g >>> 14 : 127 & g >>> 14;

          case 2:
            this.view[d + 1] = f !== 2 ? 128 | g >>> 7 : 127 & g >>> 7;

          case 1:
            this.view[d] = f !== 1 ? 128 | g : 127 & g;
        }

        return e ? (this.offset += f, this) : f;
      }, c.writeVarint64ZigZag = function (a, c) {
        return this.writeVarint64(b.zigZagEncode64(a), c);
      }, c.readVarint64 = function (b) {
        var d;
        var e;
        var f;
        var g;
        var h;
        var i;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 1 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 1 + ') <= ' + this.buffer.byteLength);
        }

        if (d = b, e = 0, f = 0, g = 0, h = 0, h = this.view[b++], e = 127 & h, 128 & h && (h = this.view[b++], e |= (127 & h) << 7, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], e |= (127 & h) << 14, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], e |= (127 & h) << 21, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], f = 127 & h, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], f |= (127 & h) << 7, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], f |= (127 & h) << 14, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], f |= (127 & h) << 21, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], g = 127 & h, (128 & h || this.noAssert && typeof h === 'undefined') && (h = this.view[b++], g |= (127 & h) << 7, 128 & h || this.noAssert && typeof h === 'undefined')))))))))) throw Error('Buffer overrun');
        return i = a.fromBits(e | f << 28, f >>> 4 | g << 24, !1), c ? (this.offset = b, i) : {
          value: i,
          length: b - d
        };
      }, c.readVarint64ZigZag = function (c) {
        var d = this.readVarint64(c);
        return d && d.value instanceof a ? d.value = b.zigZagDecode64(d.value) : d = b.zigZagDecode64(d), d;
      }), c.writeCString = function (a, b) {
        var d;
        var e;
        var g;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), e = a.length, !this.noAssert) {
          if (typeof a !== 'string') throw TypeError('Illegal str: Not a string');

          for (d = 0; e > d; ++d) {
            if (a.charCodeAt(d) === 0) throw RangeError('Illegal str: Contains NULL-characters');
          }

          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return e = k.calculateUTF16asUTF8(f(a))[1], b += e + 1, g = this.buffer.byteLength, b > g && this.resize((g *= 2) > b ? g : b), b -= e + 1, k.encodeUTF16toUTF8(f(a), function (a) {
          this.view[b++] = a;
        }.bind(this)), this.view[b++] = 0, c ? (this.offset = b, this) : e;
      }, c.readCString = function (a) {
        var c;
        var e;
        var f;
        var b = typeof a === 'undefined';

        if (b && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 1 + ') <= ' + this.buffer.byteLength);
        }

        return c = a, f = -1, k.decodeUTF8toUTF16(function () {
          if (f === 0) return null;
          if (a >= this.limit) throw RangeError('Illegal range: Truncated data, ' + a + ' < ' + this.limit);
          return f = this.view[a++], f === 0 ? null : f;
        }.bind(this), e = g(), !0), b ? (this.offset = a, e()) : {
          string: e(),
          length: a - c
        };
      }, c.writeIString = function (a, b) {
        var e;
        var d;
        var g;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof a !== 'string') throw TypeError('Illegal str: Not a string');
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        if (d = b, e = k.calculateUTF16asUTF8(f(a), this.noAssert)[1], b += 4 + e, g = this.buffer.byteLength, b > g && this.resize((g *= 2) > b ? g : b), b -= 4 + e, this.littleEndian ? (this.view[b + 3] = 255 & e >>> 24, this.view[b + 2] = 255 & e >>> 16, this.view[b + 1] = 255 & e >>> 8, this.view[b] = 255 & e) : (this.view[b] = 255 & e >>> 24, this.view[b + 1] = 255 & e >>> 16, this.view[b + 2] = 255 & e >>> 8, this.view[b + 3] = 255 & e), b += 4, k.encodeUTF16toUTF8(f(a), function (a) {
          this.view[b++] = a;
        }.bind(this)), b !== d + 4 + e) throw RangeError('Illegal range: Truncated data, ' + b + ' == ' + (b + 4 + e));
        return c ? (this.offset = b, this) : b - d;
      }, c.readIString = function (a) {
        var d;
        var e;
        var f;
        var c = typeof a === 'undefined';

        if (c && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 4 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 4 + ') <= ' + this.buffer.byteLength);
        }

        return d = a, e = this.readUint32(a), f = this.readUTF8String(e, b.METRICS_BYTES, a += 4), a += f.length, c ? (this.offset = a, f.string) : {
          string: f.string,
          length: a - d
        };
      }, b.METRICS_CHARS = 'c', b.METRICS_BYTES = 'b', c.writeUTF8String = function (a, b) {
        var d;
        var e;
        var g;
        var c = typeof b === 'undefined';

        if (c && (b = this.offset), !this.noAssert) {
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: ' + b + ' (not an integer)');
          if (b >>>= 0, b < 0 || b + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + b + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return e = b, d = k.calculateUTF16asUTF8(f(a))[1], b += d, g = this.buffer.byteLength, b > g && this.resize((g *= 2) > b ? g : b), b -= d, k.encodeUTF16toUTF8(f(a), function (a) {
          this.view[b++] = a;
        }.bind(this)), c ? (this.offset = b, this) : b - e;
      }, c.writeString = c.writeUTF8String, b.calculateUTF8Chars = function (a) {
        return k.calculateUTF16asUTF8(f(a))[0];
      }, b.calculateUTF8Bytes = function (a) {
        return k.calculateUTF16asUTF8(f(a))[1];
      }, b.calculateString = b.calculateUTF8Bytes, c.readUTF8String = function (a, c, d) {
        var e, i, f, h, j;

        if (typeof c === 'number' && (d = c, c = void 0), e = typeof d === 'undefined', e && (d = this.offset), typeof c === 'undefined' && (c = b.METRICS_CHARS), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal length: ' + a + ' (not an integer)');
          if (a |= 0, typeof d !== 'number' || d % 1 !== 0) throw TypeError('Illegal offset: ' + d + ' (not an integer)');
          if (d >>>= 0, d < 0 || d + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + d + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        if (f = 0, h = d, c === b.METRICS_CHARS) {
          if (i = g(), k.decodeUTF8(function () {
            return a > f && d < this.limit ? this.view[d++] : null;
          }.bind(this), function (a) {
            ++f, k.UTF8toUTF16(a, i);
          }), f !== a) throw RangeError('Illegal range: Truncated data, ' + f + ' == ' + a);
          return e ? (this.offset = d, i()) : {
            string: i(),
            length: d - h
          };
        }

        if (c === b.METRICS_BYTES) {
          if (!this.noAssert) {
            if (typeof d !== 'number' || d % 1 !== 0) throw TypeError('Illegal offset: ' + d + ' (not an integer)');
            if (d >>>= 0, d < 0 || d + a > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + d + ' (+' + a + ') <= ' + this.buffer.byteLength);
          }

          if (j = d + a, k.decodeUTF8toUTF16(function () {
            return j > d ? this.view[d++] : null;
          }.bind(this), i = g(), this.noAssert), d !== j) throw RangeError('Illegal range: Truncated data, ' + d + ' == ' + j);
          return e ? (this.offset = d, i()) : {
            string: i(),
            length: d - h
          };
        }

        throw TypeError('Unsupported metrics: ' + c);
      }, c.readString = c.readUTF8String, c.writeVString = function (a, c) {
        var g;
        var h;
        var e;
        var i;
        var d = typeof c === 'undefined';

        if (d && (c = this.offset), !this.noAssert) {
          if (typeof a !== 'string') throw TypeError('Illegal str: Not a string');
          if (typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal offset: ' + c + ' (not an integer)');
          if (c >>>= 0, c < 0 || c + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + c + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        if (e = c, g = k.calculateUTF16asUTF8(f(a), this.noAssert)[1], h = b.calculateVarint32(g), c += h + g, i = this.buffer.byteLength, c > i && this.resize((i *= 2) > c ? i : c), c -= h + g, c += this.writeVarint32(g, c), k.encodeUTF16toUTF8(f(a), function (a) {
          this.view[c++] = a;
        }.bind(this)), c !== e + g + h) throw RangeError('Illegal range: Truncated data, ' + c + ' == ' + (c + g + h));
        return d ? (this.offset = c, this) : c - e;
      }, c.readVString = function (a) {
        var d;
        var e;
        var f;
        var c = typeof a === 'undefined';

        if (c && (a = this.offset), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 1 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 1 + ') <= ' + this.buffer.byteLength);
        }

        return d = a, e = this.readVarint32(a), f = this.readUTF8String(e.value, b.METRICS_BYTES, a += e.length), a += f.length, c ? (this.offset = a, f.string) : {
          string: f.string,
          length: a - d
        };
      }, c.append = function (a, c, d) {
        var e, f, g;

        if ((typeof c === 'number' || typeof c !== 'string') && (d = c, c = void 0), e = typeof d === 'undefined', e && (d = this.offset), !this.noAssert) {
          if (typeof d !== 'number' || d % 1 !== 0) throw TypeError('Illegal offset: ' + d + ' (not an integer)');
          if (d >>>= 0, d < 0 || d + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + d + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return a instanceof b || (a = b.wrap(a, c)), f = a.limit - a.offset, f <= 0 ? this : (d += f, g = this.buffer.byteLength, d > g && this.resize((g *= 2) > d ? g : d), d -= f, this.view.set(a.view.subarray(a.offset, a.limit), d), a.offset += f, e && (this.offset += f), this);
      }, c.appendTo = function (a, b) {
        return a.append(this, b), this;
      }, c.assert = function (a) {
        return this.noAssert = !a, this;
      }, c.capacity = function () {
        return this.buffer.byteLength;
      }, c.clear = function () {
        return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, this;
      }, c.clone = function (a) {
        var c = new b(0, this.littleEndian, this.noAssert);
        return a ? (c.buffer = new ArrayBuffer(this.buffer.byteLength), c.view = new Uint8Array(c.buffer)) : (c.buffer = this.buffer, c.view = this.view), c.offset = this.offset, c.markedOffset = this.markedOffset, c.limit = this.limit, c;
      }, c.compact = function (a, b) {
        var c, e, f;

        if (typeof a === 'undefined' && (a = this.offset), typeof b === 'undefined' && (b = this.limit), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + a + ' <= ' + b + ' <= ' + this.buffer.byteLength);
        }

        return a === 0 && b === this.buffer.byteLength ? this : (c = b - a, c === 0 ? (this.buffer = d, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= a), this.offset = 0, this.limit = 0, this) : (e = new ArrayBuffer(c), f = new Uint8Array(e), f.set(this.view.subarray(a, b)), this.buffer = e, this.view = f, this.markedOffset >= 0 && (this.markedOffset -= a), this.offset = 0, this.limit = c, this));
      }, c.copy = function (a, c) {
        if (typeof a === 'undefined' && (a = this.offset), typeof c === 'undefined' && (c = this.limit), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (a >>>= 0, typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (c >>>= 0, a < 0 || a > c || c > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + a + ' <= ' + c + ' <= ' + this.buffer.byteLength);
        }

        if (a === c) return new b(0, this.littleEndian, this.noAssert);
        var d = c - a;
        var e = new b(d, this.littleEndian, this.noAssert);
        return e.offset = 0, e.limit = d, e.markedOffset >= 0 && (e.markedOffset -= a), this.copyTo(e, 0, a, c), e;
      }, c.copyTo = function (a, c, d, e) {
        var f, g, h;
        if (!this.noAssert && !b.isByteBuffer(a)) throw TypeError('Illegal target: Not a ByteBuffer');
        if (c = (g = typeof c === 'undefined') ? a.offset : 0 | c, d = (f = typeof d === 'undefined') ? this.offset : 0 | d, e = typeof e === 'undefined' ? this.limit : 0 | e, c < 0 || c > a.buffer.byteLength) throw RangeError('Illegal target range: 0 <= ' + c + ' <= ' + a.buffer.byteLength);
        if (d < 0 || e > this.buffer.byteLength) throw RangeError('Illegal source range: 0 <= ' + d + ' <= ' + this.buffer.byteLength);
        return h = e - d, h === 0 ? a : (a.ensureCapacity(c + h), a.view.set(this.view.subarray(d, e), c), f && (this.offset += h), g && (a.offset += h), this);
      }, c.ensureCapacity = function (a) {
        var b = this.buffer.byteLength;
        return a > b ? this.resize((b *= 2) > a ? b : a) : this;
      }, c.fill = function (a, b, c) {
        var d = typeof b === 'undefined';

        if (d && (b = this.offset), typeof a === 'string' && a.length > 0 && (a = a.charCodeAt(0)), typeof b === 'undefined' && (b = this.offset), typeof c === 'undefined' && (c = this.limit), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal value: ' + a + ' (not an integer)');
          if (a |= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (b >>>= 0, typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (c >>>= 0, b < 0 || b > c || c > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + b + ' <= ' + c + ' <= ' + this.buffer.byteLength);
        }

        if (b >= c) return this;

        for (; c > b;) {
          this.view[b++] = a;
        }

        return d && (this.offset = b), this;
      }, c.flip = function () {
        return this.limit = this.offset, this.offset = 0, this;
      }, c.mark = function (a) {
        if (a = typeof a === 'undefined' ? this.offset : a, !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal offset: ' + a + ' (not an integer)');
          if (a >>>= 0, a < 0 || a + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + a + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return this.markedOffset = a, this;
      }, c.order = function (a) {
        if (!this.noAssert && typeof a !== 'boolean') throw TypeError('Illegal littleEndian: Not a boolean');
        return this.littleEndian = !!a, this;
      }, c.LE = function (a) {
        return this.littleEndian = typeof a !== 'undefined' ? !!a : !0, this;
      }, c.BE = function (a) {
        return this.littleEndian = typeof a !== 'undefined' ? !a : !1, this;
      }, c.prepend = function (a, c, d) {
        var e, f, g, h, i;

        if ((typeof c === 'number' || typeof c !== 'string') && (d = c, c = void 0), e = typeof d === 'undefined', e && (d = this.offset), !this.noAssert) {
          if (typeof d !== 'number' || d % 1 !== 0) throw TypeError('Illegal offset: ' + d + ' (not an integer)');
          if (d >>>= 0, d < 0 || d + 0 > this.buffer.byteLength) throw RangeError('Illegal offset: 0 <= ' + d + ' (+' + 0 + ') <= ' + this.buffer.byteLength);
        }

        return a instanceof b || (a = b.wrap(a, c)), f = a.limit - a.offset, f <= 0 ? this : (g = f - d, g > 0 ? (h = new ArrayBuffer(this.buffer.byteLength + g), i = new Uint8Array(h), i.set(this.view.subarray(d, this.buffer.byteLength), f), this.buffer = h, this.view = i, this.offset += g, this.markedOffset >= 0 && (this.markedOffset += g), this.limit += g, d += g) : new Uint8Array(this.buffer), this.view.set(a.view.subarray(a.offset, a.limit), d - f), a.offset = a.limit, e && (this.offset -= f), this);
      }, c.prependTo = function (a, b) {
        return a.prepend(this, b), this;
      }, c.printDebug = function (a) {
        typeof a !== 'function' && (a = console.log.bind(console)), a(this.toString() + '\n-------------------------------------------------------------------\n' + this.toDebug(!0));
      }, c.remaining = function () {
        return this.limit - this.offset;
      }, c.reset = function () {
        return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, this;
      }, c.resize = function (a) {
        var b, c;

        if (!this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal capacity: ' + a + ' (not an integer)');
          if (a |= 0, a < 0) throw RangeError('Illegal capacity: 0 <= ' + a);
        }

        return this.buffer.byteLength < a && (b = new ArrayBuffer(a), c = new Uint8Array(b), c.set(this.view), this.buffer = b, this.view = c), this;
      }, c.reverse = function (a, b) {
        if (typeof a === 'undefined' && (a = this.offset), typeof b === 'undefined' && (b = this.limit), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + a + ' <= ' + b + ' <= ' + this.buffer.byteLength);
        }

        return a === b ? this : (Array.prototype.reverse.call(this.view.subarray(a, b)), this);
      }, c.skip = function (a) {
        if (!this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal length: ' + a + ' (not an integer)');
          a |= 0;
        }

        var b = this.offset + a;
        if (!this.noAssert && (b < 0 || b > this.buffer.byteLength)) throw RangeError('Illegal length: 0 <= ' + this.offset + ' + ' + a + ' <= ' + this.buffer.byteLength);
        return this.offset = b, this;
      }, c.slice = function (a, b) {
        if (typeof a === 'undefined' && (a = this.offset), typeof b === 'undefined' && (b = this.limit), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + a + ' <= ' + b + ' <= ' + this.buffer.byteLength);
        }

        var c = this.clone();
        return c.offset = a, c.limit = b, c;
      }, c.toBuffer = function (a) {
        var e;
        var b = this.offset;
        var c = this.limit;

        if (!this.noAssert) {
          if (typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal offset: Not an integer');
          if (b >>>= 0, typeof c !== 'number' || c % 1 !== 0) throw TypeError('Illegal limit: Not an integer');
          if (c >>>= 0, b < 0 || b > c || c > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + b + ' <= ' + c + ' <= ' + this.buffer.byteLength);
        }

        return a || b !== 0 || c !== this.buffer.byteLength ? b === c ? d : (e = new ArrayBuffer(c - b), new Uint8Array(e).set(new Uint8Array(this.buffer).subarray(b, c), 0), e) : this.buffer;
      }, c.toArrayBuffer = c.toBuffer, c.toString = function (a, b, c) {
        if (typeof a === 'undefined') return 'ByteBufferAB(offset=' + this.offset + ',markedOffset=' + this.markedOffset + ',limit=' + this.limit + ',capacity=' + this.capacity() + ')';

        switch (typeof a === 'number' && (a = 'utf8', b = a, c = b), a) {
          case 'utf8':
            return this.toUTF8(b, c);

          case 'base64':
            return this.toBase64(b, c);

          case 'hex':
            return this.toHex(b, c);

          case 'binary':
            return this.toBinary(b, c);

          case 'debug':
            return this.toDebug();

          case 'columns':
            return this.toColumns();

          default:
            throw Error('Unsupported encoding: ' + a);
        }
      }, j = function () {
        var d;
        var e;
        var a = {};
        var b = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47];
        var c = [];

        for (d = 0, e = b.length; e > d; ++d) {
          c[b[d]] = d;
        }

        return a.encode = function (a, c) {
          for (var d, e; (d = a()) !== null;) {
            c(b[63 & d >> 2]), e = (3 & d) << 4, (d = a()) !== null ? (e |= 15 & d >> 4, c(b[63 & (e | 15 & d >> 4)]), e = (15 & d) << 2, (d = a()) !== null ? (c(b[63 & (e | 3 & d >> 6)]), c(b[63 & d])) : (c(b[63 & e]), c(61))) : (c(b[63 & e]), c(61), c(61));
          }
        }, a.decode = function (a, b) {
          function g(a) {
            throw Error('Illegal character code: ' + a);
          }

          for (var d, e, f; (d = a()) !== null;) {
            if (e = c[d], typeof e === 'undefined' && g(d), (d = a()) !== null && (f = c[d], typeof f === 'undefined' && g(d), b(e << 2 >>> 0 | (48 & f) >> 4), (d = a()) !== null)) {
              if (e = c[d], typeof e === 'undefined') {
                if (d === 61) break;
                g(d);
              }

              if (b((15 & f) << 4 >>> 0 | (60 & e) >> 2), (d = a()) !== null) {
                if (f = c[d], typeof f === 'undefined') {
                  if (d === 61) break;
                  g(d);
                }

                b((3 & e) << 6 >>> 0 | f);
              }
            }
          }
        }, a.test = function (a) {
          return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(a);
        }, a;
      }(), c.toBase64 = function (a, b) {
        if (typeof a === 'undefined' && (a = this.offset), typeof b === 'undefined' && (b = this.limit), a = 0 | a, b = 0 | b, a < 0 || b > this.capacity || a > b) throw RangeError('begin, end');
        var c;
        return j.encode(function () {
          return b > a ? this.view[a++] : null;
        }.bind(this), c = g()), c();
      }, b.fromBase64 = function (a, c) {
        if (typeof a !== 'string') throw TypeError('str');
        var d = new b(3 * (a.length / 4), c);
        var e = 0;
        return j.decode(f(a), function (a) {
          d.view[e++] = a;
        }), d.limit = e, d;
      }, b.btoa = function (a) {
        return b.fromBinary(a).toBase64();
      }, b.atob = function (a) {
        return b.fromBase64(a).toBinary();
      }, c.toBinary = function (a, b) {
        if (typeof a === 'undefined' && (a = this.offset), typeof b === 'undefined' && (b = this.limit), a |= 0, b |= 0, a < 0 || b > this.capacity() || a > b) throw RangeError('begin, end');
        if (a === b) return '';

        for (var c = [], d = []; b > a;) {
          c.push(this.view[a++]), c.length >= 1024 && (d.push(String.fromCharCode.apply(String, c)), c = []);
        }

        return d.join('') + String.fromCharCode.apply(String, c);
      }, b.fromBinary = function (a, c) {
        if (typeof a !== 'string') throw TypeError('str');

        for (var f, d = 0, e = a.length, g = new b(e, c); e > d;) {
          if (f = a.charCodeAt(d), f > 255) throw RangeError('illegal char code: ' + f);
          g.view[d++] = f;
        }

        return g.limit = e, g;
      }, c.toDebug = function (a) {
        for (var d, b = -1, c = this.buffer.byteLength, e = '', f = '', g = ''; c > b;) {
          if (b !== -1 && (d = this.view[b], e += d < 16 ? '0' + d.toString(16).toUpperCase() : d.toString(16).toUpperCase(), a && (f += d > 32 && d < 127 ? String.fromCharCode(d) : '.')), ++b, a && b > 0 && b % 16 === 0 && b !== c) {
            for (; e.length < 51;) {
              e += ' ';
            }

            g += e + f + '\n', e = f = '';
          }

          e += b === this.offset && b === this.limit ? b === this.markedOffset ? '!' : '|' : b === this.offset ? b === this.markedOffset ? '[' : '<' : b === this.limit ? b === this.markedOffset ? ']' : '>' : b === this.markedOffset ? "'" : a || b !== 0 && b !== c ? ' ' : '';
        }

        if (a && e !== ' ') {
          for (; e.length < 51;) {
            e += ' ';
          }

          g += e + f + '\n';
        }

        return a ? g : e;
      }, b.fromDebug = function (a, c, d) {
        for (var i, j, e = a.length, f = new b(0 | (e + 1) / 3, c, d), g = 0, h = 0, k = !1, l = !1, m = !1, n = !1, o = !1; e > g;) {
          switch (i = a.charAt(g++)) {
            case '!':
              if (!d) {
                if (l || m || n) {
                  o = !0;
                  break;
                }

                l = m = n = !0;
              }

              f.offset = f.markedOffset = f.limit = h, k = !1;
              break;

            case '|':
              if (!d) {
                if (l || n) {
                  o = !0;
                  break;
                }

                l = n = !0;
              }

              f.offset = f.limit = h, k = !1;
              break;

            case '[':
              if (!d) {
                if (l || m) {
                  o = !0;
                  break;
                }

                l = m = !0;
              }

              f.offset = f.markedOffset = h, k = !1;
              break;

            case '<':
              if (!d) {
                if (l) {
                  o = !0;
                  break;
                }

                l = !0;
              }

              f.offset = h, k = !1;
              break;

            case ']':
              if (!d) {
                if (n || m) {
                  o = !0;
                  break;
                }

                n = m = !0;
              }

              f.limit = f.markedOffset = h, k = !1;
              break;

            case '>':
              if (!d) {
                if (n) {
                  o = !0;
                  break;
                }

                n = !0;
              }

              f.limit = h, k = !1;
              break;

            case "'":
              if (!d) {
                if (m) {
                  o = !0;
                  break;
                }

                m = !0;
              }

              f.markedOffset = h, k = !1;
              break;

            case ' ':
              k = !1;
              break;

            default:
              if (!d && k) {
                o = !0;
                break;
              }

              if (j = parseInt(i + a.charAt(g++), 16), !d && (isNaN(j) || j < 0 || j > 255)) throw TypeError('Illegal str: Not a debug encoded string');
              f.view[h++] = j, k = !0;
          }

          if (o) throw TypeError('Illegal str: Invalid symbol at ' + g);
        }

        if (!d) {
          if (!l || !n) throw TypeError('Illegal str: Missing offset or limit');
          if (h < f.buffer.byteLength) throw TypeError('Illegal str: Not a debug encoded string (is it hex?) ' + h + ' < ' + e);
        }

        return f;
      }, c.toHex = function (a, b) {
        if (a = typeof a === 'undefined' ? this.offset : a, b = typeof b === 'undefined' ? this.limit : b, !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + a + ' <= ' + b + ' <= ' + this.buffer.byteLength);
        }

        for (var d, c = new Array(b - a); b > a;) {
          d = this.view[a++], d < 16 ? c.push('0', d.toString(16)) : c.push(d.toString(16));
        }

        return c.join('');
      }, b.fromHex = function (a, c, d) {
        var g, e, f, h, i;

        if (!d) {
          if (typeof a !== 'string') throw TypeError('Illegal str: Not a string');
          if (a.length % 2 !== 0) throw TypeError('Illegal str: Length not a multiple of 2');
        }

        for (e = a.length, f = new b(0 | e / 2, c), h = 0, i = 0; e > h; h += 2) {
          if (g = parseInt(a.substring(h, h + 2), 16), !d && (!isFinite(g) || g < 0 || g > 255)) throw TypeError('Illegal str: Contains non-hex characters');
          f.view[i++] = g;
        }

        return f.limit = i, f;
      }, k = function () {
        var a = {};
        return a.MAX_CODEPOINT = 1114111, a.encodeUTF8 = function (a, b) {
          var c = null;

          for (typeof a === 'number' && (c = a, a = function a() {
            return null;
          }); c !== null || (c = a()) !== null;) {
            c < 128 ? b(127 & c) : c < 2048 ? (b(192 | 31 & c >> 6), b(128 | 63 & c)) : c < 65536 ? (b(224 | 15 & c >> 12), b(128 | 63 & c >> 6), b(128 | 63 & c)) : (b(240 | 7 & c >> 18), b(128 | 63 & c >> 12), b(128 | 63 & c >> 6), b(128 | 63 & c)), c = null;
          }
        }, a.decodeUTF8 = function (a, b) {
          for (var c, d, e, f, g = function g(a) {
            a = a.slice(0, a.indexOf(null));
            var b = Error(a.toString());
            throw b.name = 'TruncatedError', b.bytes = a, b;
          }; (c = a()) !== null;) {
            if ((128 & c) === 0) b(c);else if ((224 & c) === 192) (d = a()) === null && g([c, d]), b((31 & c) << 6 | 63 & d);else if ((240 & c) === 224) ((d = a()) === null || (e = a()) === null) && g([c, d, e]), b((15 & c) << 12 | (63 & d) << 6 | 63 & e);else {
              if ((248 & c) !== 240) throw RangeError('Illegal starting byte: ' + c);
              ((d = a()) === null || (e = a()) === null || (f = a()) === null) && g([c, d, e, f]), b((7 & c) << 18 | (63 & d) << 12 | (63 & e) << 6 | 63 & f);
            }
          }
        }, a.UTF16toUTF8 = function (a, b) {
          for (var c, d = null;;) {
            if ((c = d !== null ? d : a()) === null) break;
            c >= 55296 && c <= 57343 && (d = a()) !== null && d >= 56320 && d <= 57343 ? (b(1024 * (c - 55296) + d - 56320 + 65536), d = null) : b(c);
          }

          d !== null && b(d);
        }, a.UTF8toUTF16 = function (a, b) {
          var c = null;

          for (typeof a === 'number' && (c = a, a = function a() {
            return null;
          }); c !== null || (c = a()) !== null;) {
            c <= 65535 ? b(c) : (c -= 65536, b((c >> 10) + 55296), b(c % 1024 + 56320)), c = null;
          }
        }, a.encodeUTF16toUTF8 = function (b, c) {
          a.UTF16toUTF8(b, function (b) {
            a.encodeUTF8(b, c);
          });
        }, a.decodeUTF8toUTF16 = function (b, c) {
          a.decodeUTF8(b, function (b) {
            a.UTF8toUTF16(b, c);
          });
        }, a.calculateCodePoint = function (a) {
          return a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
        }, a.calculateUTF8 = function (a) {
          for (var b, c = 0; (b = a()) !== null;) {
            c += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
          }

          return c;
        }, a.calculateUTF16asUTF8 = function (b) {
          var c = 0;
          var d = 0;
          return a.UTF16toUTF8(b, function (a) {
            ++c, d += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
          }), [c, d];
        }, a;
      }(), c.toUTF8 = function (a, b) {
        if (typeof a === 'undefined' && (a = this.offset), typeof b === 'undefined' && (b = this.limit), !this.noAssert) {
          if (typeof a !== 'number' || a % 1 !== 0) throw TypeError('Illegal begin: Not an integer');
          if (a >>>= 0, typeof b !== 'number' || b % 1 !== 0) throw TypeError('Illegal end: Not an integer');
          if (b >>>= 0, a < 0 || a > b || b > this.buffer.byteLength) throw RangeError('Illegal range: 0 <= ' + a + ' <= ' + b + ' <= ' + this.buffer.byteLength);
        }

        var c;

        try {
          k.decodeUTF8toUTF16(function () {
            return b > a ? this.view[a++] : null;
          }.bind(this), c = g());
        } catch (d) {
          if (a !== b) throw RangeError('Illegal range: Truncated data, ' + a + ' != ' + b);
        }

        return c();
      }, b.fromUTF8 = function (a, c, d) {
        if (!d && typeof a !== 'string') throw TypeError('Illegal str: Not a string');
        var e = new b(k.calculateUTF16asUTF8(f(a), !0)[1], c, d);
        var g = 0;
        return k.encodeUTF16toUTF8(f(a), function (a) {
          e.view[g++] = a;
        }), e.limit = g, e;
      }, b;
    }(c);

    var e = function (b, c) {
      var f;
      var h;
      var i;
      var e = {};
      return e.ByteBuffer = b, e.c = b, f = b, e.Long = c || null, e.VERSION = '5.0.1', e.WIRE_TYPES = {}, e.WIRE_TYPES.VARINT = 0, e.WIRE_TYPES.BITS64 = 1, e.WIRE_TYPES.LDELIM = 2, e.WIRE_TYPES.STARTGROUP = 3, e.WIRE_TYPES.ENDGROUP = 4, e.WIRE_TYPES.BITS32 = 5, e.PACKABLE_WIRE_TYPES = [e.WIRE_TYPES.VARINT, e.WIRE_TYPES.BITS64, e.WIRE_TYPES.BITS32], e.TYPES = {
        int32: {
          name: 'int32',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        uint32: {
          name: 'uint32',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        sint32: {
          name: 'sint32',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        int64: {
          name: 'int64',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: e.Long ? e.Long.ZERO : void 0
        },
        uint64: {
          name: 'uint64',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: e.Long ? e.Long.UZERO : void 0
        },
        sint64: {
          name: 'sint64',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: e.Long ? e.Long.ZERO : void 0
        },
        bool: {
          name: 'bool',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: !1
        },
        double: {
          name: 'double',
          wireType: e.WIRE_TYPES.BITS64,
          defaultValue: 0
        },
        string: {
          name: 'string',
          wireType: e.WIRE_TYPES.LDELIM,
          defaultValue: ''
        },
        bytes: {
          name: 'bytes',
          wireType: e.WIRE_TYPES.LDELIM,
          defaultValue: null
        },
        fixed32: {
          name: 'fixed32',
          wireType: e.WIRE_TYPES.BITS32,
          defaultValue: 0
        },
        sfixed32: {
          name: 'sfixed32',
          wireType: e.WIRE_TYPES.BITS32,
          defaultValue: 0
        },
        fixed64: {
          name: 'fixed64',
          wireType: e.WIRE_TYPES.BITS64,
          defaultValue: e.Long ? e.Long.UZERO : void 0
        },
        sfixed64: {
          name: 'sfixed64',
          wireType: e.WIRE_TYPES.BITS64,
          defaultValue: e.Long ? e.Long.ZERO : void 0
        },
        float: {
          name: 'float',
          wireType: e.WIRE_TYPES.BITS32,
          defaultValue: 0
        },
        enum: {
          name: 'enum',
          wireType: e.WIRE_TYPES.VARINT,
          defaultValue: 0
        },
        message: {
          name: 'message',
          wireType: e.WIRE_TYPES.LDELIM,
          defaultValue: null
        },
        group: {
          name: 'group',
          wireType: e.WIRE_TYPES.STARTGROUP,
          defaultValue: null
        }
      }, e.MAP_KEY_TYPES = [e.TYPES.int32, e.TYPES.sint32, e.TYPES.sfixed32, e.TYPES.uint32, e.TYPES.fixed32, e.TYPES.int64, e.TYPES.sint64, e.TYPES.sfixed64, e.TYPES.uint64, e.TYPES.fixed64, e.TYPES.bool, e.TYPES.string, e.TYPES.bytes], e.ID_MIN = 1, e.ID_MAX = 536870911, e.convertFieldsToCamelCase = !1, e.populateAccessors = !0, e.populateDefaults = !0, e.Util = function () {
        var a = {};
        return a.IS_NODE = !((typeof process === "undefined" ? "undefined" : _typeof(process)) !== 'object' || process + '' != '[object process]' || process.browser), a.XHR = function () {
          var c;
          var a = [function () {
            return new XMLHttpRequest();
          }, function () {
            return new ActiveXObject('Msxml2.XMLHTTP');
          }, function () {
            return new ActiveXObject('Msxml3.XMLHTTP');
          }, function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
          }];
          var b = null;

          for (c = 0; c < a.length; c++) {
            try {
              b = a[c]();
            } catch (d) {
              continue;
            }

            break;
          }

          if (!b) throw Error('XMLHttpRequest is not supported');
          return b;
        }, a.fetch = function (b, c) {
          if (c && typeof c !== 'function' && (c = null), a.IS_NODE) {
            if (c) g.readFile(b, function (a, b) {
              a ? c(null) : c('' + b);
            });else try {
              return g.readFileSync(b);
            } catch (d) {
              return null;
            }
          } else {
            var e = a.XHR();
            if (e.open('GET', b, c ? !0 : !1), e.setRequestHeader('Accept', 'text/plain'), typeof e.overrideMimeType === 'function' && e.overrideMimeType('text/plain'), !c) return e.send(null), e.status == 200 || e.status == 0 && typeof e.responseText === 'string' ? e.responseText : null;
            if (e.onreadystatechange = function () {
              e.readyState == 4 && (e.status == 200 || e.status == 0 && typeof e.responseText === 'string' ? c(e.responseText) : c(null));
            }, e.readyState == 4) return;
            e.send(null);
          }
        }, a.toCamelCase = function (a) {
          return a.replace(/_([a-zA-Z])/g, function (a, b) {
            return b.toUpperCase();
          });
        }, a;
      }(), e.Lang = {
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/,
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
        NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
        BOOL: /^(?:true|false)$/i,
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        WHITESPACE: /\s/,
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
      }, e.DotProto = function (a, b) {
        function h(a, c) {
          var d = -1;
          var e = 1;
          if (a.charAt(0) == '-' && (e = -1, a = a.substring(1)), b.NUMBER_DEC.test(a)) d = parseInt(a);else if (b.NUMBER_HEX.test(a)) d = parseInt(a.substring(2), 16);else {
            if (!b.NUMBER_OCT.test(a)) throw Error('illegal id value: ' + (e < 0 ? '-' : '') + a);
            d = parseInt(a.substring(1), 8);
          }
          if (d = 0 | e * d, !c && d < 0) throw Error('illegal id value: ' + (e < 0 ? '-' : '') + a);
          return d;
        }

        function i(a) {
          var c = 1;
          if (a.charAt(0) == '-' && (c = -1, a = a.substring(1)), b.NUMBER_DEC.test(a)) return c * parseInt(a, 10);
          if (b.NUMBER_HEX.test(a)) return c * parseInt(a.substring(2), 16);
          if (b.NUMBER_OCT.test(a)) return c * parseInt(a.substring(1), 8);
          if (a === 'inf') return 1 / 0 * c;
          if (a === 'nan') return 0 / 0;
          if (b.NUMBER_FLT.test(a)) return c * parseFloat(a);
          throw Error('illegal number value: ' + (c < 0 ? '-' : '') + a);
        }

        function j(a, b, c) {
          typeof a[b] === 'undefined' ? a[b] = c : (Array.isArray(a[b]) || (a[b] = [a[b]]), a[b].push(c));
        }

        var f;
        var g;
        var c = {};

        var d = function d(a) {
          this.source = a + '', this.index = 0, this.line = 1, this.stack = [], this._stringOpen = null;
        };

        var e = d.prototype;
        return e._readString = function () {
          var c;
          var a = this._stringOpen === '"' ? b.STRING_DQ : b.STRING_SQ;
          if (a.lastIndex = this.index - 1, c = a.exec(this.source), !c) throw Error('unterminated string');
          return this.index = a.lastIndex, this.stack.push(this._stringOpen), this._stringOpen = null, c[1];
        }, e.next = function () {
          var a, c, d, e, f, g;
          if (this.stack.length > 0) return this.stack.shift();
          if (this.index >= this.source.length) return null;
          if (this._stringOpen !== null) return this._readString();

          do {
            for (a = !1; b.WHITESPACE.test(d = this.source.charAt(this.index));) {
              if (d === '\n' && ++this.line, ++this.index === this.source.length) return null;
            }

            if (this.source.charAt(this.index) === '/') if (++this.index, this.source.charAt(this.index) === '/') {
              for (; this.source.charAt(++this.index) !== '\n';) {
                if (this.index == this.source.length) return null;
              }

              ++this.index, ++this.line, a = !0;
            } else {
              if ((d = this.source.charAt(this.index)) !== '*') return '/';

              do {
                if (d === '\n' && ++this.line, ++this.index === this.source.length) return null;
                c = d, d = this.source.charAt(this.index);
              } while (c !== '*' || d !== '/');

              ++this.index, a = !0;
            }
          } while (a);

          if (this.index === this.source.length) return null;
          if (e = this.index, b.DELIM.lastIndex = 0, f = b.DELIM.test(this.source.charAt(e++)), !f) for (; e < this.source.length && !b.DELIM.test(this.source.charAt(e));) {
            ++e;
          }
          return g = this.source.substring(this.index, this.index = e), (g === '"' || g === "'") && (this._stringOpen = g), g;
        }, e.peek = function () {
          if (this.stack.length === 0) {
            var a = this.next();
            if (a === null) return null;
            this.stack.push(a);
          }

          return this.stack[0];
        }, e.skip = function (a) {
          var b = this.next();
          if (b !== a) throw Error("illegal '" + b + "', '" + a + "' expected");
        }, e.omit = function (a) {
          return this.peek() === a ? (this.next(), !0) : !1;
        }, e.toString = function () {
          return 'Tokenizer (' + this.index + '/' + this.source.length + ' at line ' + this.line + ')';
        }, c.Tokenizer = d, f = function f(a) {
          this.tn = new d(a), this.proto3 = !1;
        }, g = f.prototype, g.parse = function () {
          var c;
          var a = {
            name: '[ROOT]',
            package: null,
            messages: [],
            enums: [],
            imports: [],
            options: {},
            services: []
          };
          var d = !0;

          try {
            for (; c = this.tn.next();) {
              switch (c) {
                case 'package':
                  if (!d || a.package !== null) throw Error("unexpected 'package'");
                  if (c = this.tn.next(), !b.TYPEREF.test(c)) throw Error('illegal package name: ' + c);
                  this.tn.skip(';'), a.package = c;
                  break;

                case 'import':
                  if (!d) throw Error("unexpected 'import'");
                  c = this.tn.peek(), c === 'public' && this.tn.next(), c = this._readString(), this.tn.skip(';'), a.imports.push(c);
                  break;

                case 'syntax':
                  if (!d) throw Error("unexpected 'syntax'");
                  this.tn.skip('='), (a.syntax = this._readString()) === 'proto3' && (this.proto3 = !0), this.tn.skip(';');
                  break;

                case 'message':
                  this._parseMessage(a, null), d = !1;
                  break;

                case 'enum':
                  this._parseEnum(a), d = !1;
                  break;

                case 'option':
                  this._parseOption(a);

                  break;

                case 'service':
                  this._parseService(a);

                  break;

                case 'extend':
                  this._parseExtend(a);

                  break;

                default:
                  throw Error("unexpected '" + c + "'");
              }
            }
          } catch (e) {
            throw e.message = 'Parse error at line ' + this.tn.line + ': ' + e.message, e;
          }

          return delete a.name, a;
        }, f.parse = function (a) {
          return new f(a).parse();
        }, g._readString = function () {
          var b;
          var c;
          var a = '';

          do {
            if (c = this.tn.next(), c !== "'" && c !== '"') throw Error('illegal string delimiter: ' + c);
            a += this.tn.next(), this.tn.skip(c), b = this.tn.peek();
          } while (b === '"' || b === '"');

          return a;
        }, g._readValue = function (a) {
          var c = this.tn.peek();
          if (c === '"' || c === "'") return this._readString();
          if (this.tn.next(), b.NUMBER.test(c)) return i(c);
          if (b.BOOL.test(c)) return c.toLowerCase() === 'true';
          if (a && b.TYPEREF.test(c)) return c;
          throw Error('illegal value: ' + c);
        }, g._parseOption = function (a, c) {
          var f;
          var d = this.tn.next();
          var e = !1;
          if (d === '(' && (e = !0, d = this.tn.next()), !b.TYPEREF.test(d)) throw Error('illegal option name: ' + d);
          f = d, e && (this.tn.skip(')'), f = '(' + f + ')', d = this.tn.peek(), b.FQTYPEREF.test(d) && (f += d, this.tn.next())), this.tn.skip('='), this._parseOptionValue(a, f), c || this.tn.skip(';');
        }, g._parseOptionValue = function (a, c) {
          var d = this.tn.peek();
          if (d !== '{') j(a.options, c, this._readValue(!0));else for (this.tn.skip('{'); (d = this.tn.next()) !== '}';) {
            if (!b.NAME.test(d)) throw Error('illegal option name: ' + c + '.' + d);
            this.tn.omit(':') ? j(a.options, c + '.' + d, this._readValue(!0)) : this._parseOptionValue(a, c + '.' + d);
          }
        }, g._parseService = function (a) {
          var d;
          var e;
          var c = this.tn.next();
          if (!b.NAME.test(c)) throw Error('illegal service name at line ' + this.tn.line + ': ' + c);

          for (d = c, e = {
            name: d,
            rpc: {},
            options: {}
          }, this.tn.skip('{'); (c = this.tn.next()) !== '}';) {
            if (c === 'option') this._parseOption(e);else {
              if (c !== 'rpc') throw Error('illegal service token: ' + c);

              this._parseServiceRPC(e);
            }
          }

          this.tn.omit(';'), a.services.push(e);
        }, g._parseServiceRPC = function (a) {
          var e;
          var f;
          var c = 'rpc';
          var d = this.tn.next();
          if (!b.NAME.test(d)) throw Error('illegal rpc service method name: ' + d);
          if (e = d, f = {
            request: null,
            response: null,
            request_stream: !1,
            response_stream: !1,
            options: {}
          }, this.tn.skip('('), d = this.tn.next(), d.toLowerCase() === 'stream' && (f.request_stream = !0, d = this.tn.next()), !b.TYPEREF.test(d)) throw Error('illegal rpc service request type: ' + d);
          if (f.request = d, this.tn.skip(')'), d = this.tn.next(), d.toLowerCase() !== 'returns') throw Error('illegal rpc service request type delimiter: ' + d);

          if (this.tn.skip('('), d = this.tn.next(), d.toLowerCase() === 'stream' && (f.response_stream = !0, d = this.tn.next()), f.response = d, this.tn.skip(')'), d = this.tn.peek(), d === '{') {
            for (this.tn.next(); (d = this.tn.next()) !== '}';) {
              if (d !== 'option') throw Error('illegal rpc service token: ' + d);

              this._parseOption(f);
            }

            this.tn.omit(';');
          } else this.tn.skip(';');

          typeof a[c] === 'undefined' && (a[c] = {}), a[c][e] = f;
        }, g._parseMessage = function (a, c) {
          var d = !!c;
          var e = this.tn.next();
          var f = {
            name: '',
            fields: [],
            enums: [],
            messages: [],
            options: {},
            services: [],
            oneofs: {}
          };
          if (!b.NAME.test(e)) throw Error('illegal ' + (d ? 'group' : 'message') + ' name: ' + e);

          for (f.name = e, d && (this.tn.skip('='), c.id = h(this.tn.next()), f.isGroup = !0), e = this.tn.peek(), e === '[' && c && this._parseFieldOptions(c), this.tn.skip('{'); (e = this.tn.next()) !== '}';) {
            if (b.RULE.test(e)) this._parseMessageField(f, e);else if (e === 'oneof') this._parseMessageOneOf(f);else if (e === 'enum') this._parseEnum(f);else if (e === 'message') this._parseMessage(f);else if (e === 'option') this._parseOption(f);else if (e === 'service') this._parseService(f);else if (e === 'extensions') f.extensions = this._parseExtensionRanges();else if (e === 'reserved') this._parseIgnored();else if (e === 'extend') this._parseExtend(f);else {
              if (!b.TYPEREF.test(e)) throw Error('illegal message token: ' + e);
              if (!this.proto3) throw Error('illegal field rule: ' + e);

              this._parseMessageField(f, 'optional', e);
            }
          }

          return this.tn.omit(';'), a.messages.push(f), f;
        }, g._parseIgnored = function () {
          for (; this.tn.peek() !== ';';) {
            this.tn.next();
          }

          this.tn.skip(';');
        }, g._parseMessageField = function (a, c, d) {
          var e, f, g;
          if (!b.RULE.test(c)) throw Error('illegal message field rule: ' + c);

          if (e = {
            rule: c,
            type: '',
            name: '',
            options: {},
            id: 0
          }, c === 'map') {
            if (d) throw Error('illegal type: ' + d);
            if (this.tn.skip('<'), f = this.tn.next(), !b.TYPE.test(f) && !b.TYPEREF.test(f)) throw Error('illegal message field type: ' + f);
            if (e.keytype = f, this.tn.skip(','), f = this.tn.next(), !b.TYPE.test(f) && !b.TYPEREF.test(f)) throw Error('illegal message field: ' + f);
            if (e.type = f, this.tn.skip('>'), f = this.tn.next(), !b.NAME.test(f)) throw Error('illegal message field name: ' + f);
            e.name = f, this.tn.skip('='), e.id = h(this.tn.next()), f = this.tn.peek(), f === '[' && this._parseFieldOptions(e), this.tn.skip(';');
          } else if (d = typeof d !== 'undefined' ? d : this.tn.next(), d === 'group') {
            if (g = this._parseMessage(a, e), !/^[A-Z]/.test(g.name)) throw Error('illegal group name: ' + g.name);
            e.type = g.name, e.name = g.name.toLowerCase(), this.tn.omit(';');
          } else {
            if (!b.TYPE.test(d) && !b.TYPEREF.test(d)) throw Error('illegal message field type: ' + d);
            if (e.type = d, f = this.tn.next(), !b.NAME.test(f)) throw Error('illegal message field name: ' + f);
            e.name = f, this.tn.skip('='), e.id = h(this.tn.next()), f = this.tn.peek(), f === '[' && this._parseFieldOptions(e), this.tn.skip(';');
          }

          return a.fields.push(e), e;
        }, g._parseMessageOneOf = function (a) {
          var e;
          var d;
          var f;
          var c = this.tn.next();
          if (!b.NAME.test(c)) throw Error('illegal oneof name: ' + c);

          for (d = c, f = [], this.tn.skip('{'); (c = this.tn.next()) !== '}';) {
            e = this._parseMessageField(a, 'optional', c), e.oneof = d, f.push(e.id);
          }

          this.tn.omit(';'), a.oneofs[d] = f;
        }, g._parseFieldOptions = function (a) {
          this.tn.skip('[');

          for (var b, c = !0; (b = this.tn.peek()) !== ']';) {
            c || this.tn.skip(','), this._parseOption(a, !0), c = !1;
          }

          this.tn.next();
        }, g._parseEnum = function (a) {
          var e;
          var c = {
            name: '',
            values: [],
            options: {}
          };
          var d = this.tn.next();
          if (!b.NAME.test(d)) throw Error('illegal name: ' + d);

          for (c.name = d, this.tn.skip('{'); (d = this.tn.next()) !== '}';) {
            if (d === 'option') this._parseOption(c);else {
              if (!b.NAME.test(d)) throw Error('illegal name: ' + d);
              this.tn.skip('='), e = {
                name: d,
                id: h(this.tn.next(), !0)
              }, d = this.tn.peek(), d === '[' && this._parseFieldOptions({
                options: {}
              }), this.tn.skip(';'), c.values.push(e);
            }
          }

          this.tn.omit(';'), a.enums.push(c);
        }, g._parseExtensionRanges = function () {
          var c;
          var d;
          var e;
          var b = [];

          do {
            for (d = [];;) {
              switch (c = this.tn.next()) {
                case 'min':
                  e = a.ID_MIN;
                  break;

                case 'max':
                  e = a.ID_MAX;
                  break;

                default:
                  e = i(c);
              }

              if (d.push(e), d.length === 2) break;

              if (this.tn.peek() !== 'to') {
                d.push(e);
                break;
              }

              this.tn.next();
            }

            b.push(d);
          } while (this.tn.omit(','));

          return this.tn.skip(';'), b;
        }, g._parseExtend = function (a) {
          var d;
          var c = this.tn.next();
          if (!b.TYPEREF.test(c)) throw Error('illegal extend reference: ' + c);

          for (d = {
            ref: c,
            fields: []
          }, this.tn.skip('{'); (c = this.tn.next()) !== '}';) {
            if (b.RULE.test(c)) this._parseMessageField(d, c);else {
              if (!b.TYPEREF.test(c)) throw Error('illegal extend token: ' + c);
              if (!this.proto3) throw Error('illegal field rule: ' + c);

              this._parseMessageField(d, 'optional', c);
            }
          }

          return this.tn.omit(';'), a.messages.push(d), d;
        }, g.toString = function () {
          return 'Parser at line ' + this.tn.line;
        }, c.Parser = f, c;
      }(e, e.Lang), e.Reflect = function (a) {
        function k(b) {
          if (typeof b === 'string' && (b = a.TYPES[b]), typeof b.defaultValue === 'undefined') throw Error('default value for type ' + b.name + ' is not supported');
          return b == a.TYPES.bytes ? new f(0) : b.defaultValue;
        }

        function l(b, c) {
          if (b && typeof b.low === 'number' && typeof b.high === 'number' && typeof b.unsigned === 'boolean' && b.low === b.low && b.high === b.high) return new a.Long(b.low, b.high, typeof c === 'undefined' ? b.unsigned : c);
          if (typeof b === 'string') return a.Long.fromString(b, c || !1, 10);
          if (typeof b === 'number') return a.Long.fromNumber(b, c || !1);
          throw Error('not convertible to Long');
        }

        function o(b, c) {
          var d = c.readVarint32();
          var e = 7 & d;
          var f = d >>> 3;

          switch (e) {
            case a.WIRE_TYPES.VARINT:
              do {
                d = c.readUint8();
              } while ((128 & d) === 128);

              break;

            case a.WIRE_TYPES.BITS64:
              c.offset += 8;
              break;

            case a.WIRE_TYPES.LDELIM:
              d = c.readVarint32(), c.offset += d;
              break;

            case a.WIRE_TYPES.STARTGROUP:
              o(f, c);
              break;

            case a.WIRE_TYPES.ENDGROUP:
              if (f === b) return !1;
              throw Error('Illegal GROUPEND after unknown group: ' + f + ' (' + b + ' expected)');

            case a.WIRE_TYPES.BITS32:
              c.offset += 4;
              break;

            default:
              throw Error('Illegal wire type in unknown group ' + b + ': ' + e);
          }

          return !0;
        }

        var g;
        var h;
        var i;
        var j;
        var m;
        var n;
        var p;
        var q;
        var r;
        var s;
        var t;
        var u;
        var v;
        var w;
        var x;
        var y;
        var z;
        var A;
        var B;
        var c = {};

        var d = function d(a, b, c) {
          this.builder = a, this.parent = b, this.name = c, this.className;
        };

        var e = d.prototype;
        return e.fqn = function () {
          for (var a = this.name, b = this;;) {
            if (b = b.parent, b == null) break;
            a = b.name + '.' + a;
          }

          return a;
        }, e.toString = function (a) {
          return (a ? this.className + ' ' : '') + this.fqn();
        }, e.build = function () {
          throw Error(this.toString(!0) + ' cannot be built directly');
        }, c.T = d, g = function g(a, b, c, e, f) {
          d.call(this, a, b, c), this.className = 'Namespace', this.children = [], this.options = e || {}, this.syntax = f || 'proto2';
        }, h = g.prototype = Object.create(d.prototype), h.getChildren = function (a) {
          var b, c, d;
          if (a = a || null, a == null) return this.children.slice();

          for (b = [], c = 0, d = this.children.length; d > c; ++c) {
            this.children[c] instanceof a && b.push(this.children[c]);
          }

          return b;
        }, h.addChild = function (a) {
          var b;
          if (b = this.getChild(a.name)) if (b instanceof m.Field && b.name !== b.originalName && this.getChild(b.originalName) === null) b.name = b.originalName;else {
            if (!(a instanceof m.Field && a.name !== a.originalName && this.getChild(a.originalName) === null)) throw Error('Duplicate name in namespace ' + this.toString(!0) + ': ' + a.name);
            a.name = a.originalName;
          }
          this.children.push(a);
        }, h.getChild = function (a) {
          var c;
          var d;
          var b = typeof a === 'number' ? 'id' : 'name';

          for (c = 0, d = this.children.length; d > c; ++c) {
            if (this.children[c][b] === a) return this.children[c];
          }

          return null;
        }, h.resolve = function (a, b) {
          var g;
          var d = typeof a === 'string' ? a.split('.') : a;
          var e = this;
          var f = 0;

          if (d[f] === '') {
            for (; e.parent !== null;) {
              e = e.parent;
            }

            f++;
          }

          do {
            do {
              if (!(e instanceof c.Namespace)) {
                e = null;
                break;
              }

              if (g = e.getChild(d[f]), !(g && g instanceof c.T && (!b || g instanceof c.Namespace))) {
                e = null;
                break;
              }

              e = g, f++;
            } while (f < d.length);

            if (e != null) break;
            if (this.parent !== null) return this.parent.resolve(a, b);
          } while (e != null);

          return e;
        }, h.qn = function (a) {
          var e;
          var f;
          var b = [];
          var d = a;

          do {
            b.unshift(d.name), d = d.parent;
          } while (d !== null);

          for (e = 1; e <= b.length; e++) {
            if (f = b.slice(b.length - e), a === this.resolve(f, a instanceof c.Namespace)) return f.join('.');
          }

          return a.fqn();
        }, h.build = function () {
          var e;
          var c;
          var d;
          var a = {};
          var b = this.children;

          for (c = 0, d = b.length; d > c; ++c) {
            e = b[c], e instanceof g && (a[e.name] = e.build());
          }

          return Object.defineProperty && Object.defineProperty(a, '$options', {
            value: this.buildOpt()
          }), a;
        }, h.buildOpt = function () {
          var c;
          var d;
          var e;
          var f;
          var a = {};
          var b = Object.keys(this.options);

          for (c = 0, d = b.length; d > c; ++c) {
            e = b[c], f = this.options[b[c]], a[e] = f;
          }

          return a;
        }, h.getOption = function (a) {
          return typeof a === 'undefined' ? this.options : typeof this.options[a] !== 'undefined' ? this.options[a] : null;
        }, c.Namespace = g, i = function i(b, c, d, e) {
          if (this.type = b, this.resolvedType = c, this.isMapKey = d, this.syntax = e, d && a.MAP_KEY_TYPES.indexOf(b) < 0) throw Error('Invalid map key type: ' + b.name);
        }, j = i.prototype, i.defaultFieldValue = k, j.verifyValue = function (c) {
          var f;
          var g;
          var h;

          var d = function (a, b) {
            throw Error('Illegal value for ' + this.toString(!0) + ' of type ' + this.type.name + ': ' + a + ' (' + b + ')');
          }.bind(this);

          switch (this.type) {
            case a.TYPES.int32:
            case a.TYPES.sint32:
            case a.TYPES.sfixed32:
              return (typeof c !== 'number' || c === c && c % 1 !== 0) && d(_typeof(c), 'not an integer'), c > 4294967295 ? 0 | c : c;

            case a.TYPES.uint32:
            case a.TYPES.fixed32:
              return (typeof c !== 'number' || c === c && c % 1 !== 0) && d(_typeof(c), 'not an integer'), c < 0 ? c >>> 0 : c;

            case a.TYPES.int64:
            case a.TYPES.sint64:
            case a.TYPES.sfixed64:
              if (a.Long) try {
                return l(c, !1);
              } catch (e) {
                d(_typeof(c), e.message);
              } else d(_typeof(c), 'requires Long.js');

            case a.TYPES.uint64:
            case a.TYPES.fixed64:
              if (a.Long) try {
                return l(c, !0);
              } catch (e) {
                d(_typeof(c), e.message);
              } else d(_typeof(c), 'requires Long.js');

            case a.TYPES.bool:
              return typeof c !== 'boolean' && d(_typeof(c), 'not a boolean'), c;

            case a.TYPES.float:
            case a.TYPES.double:
              return typeof c !== 'number' && d(_typeof(c), 'not a number'), c;

            case a.TYPES.string:
              return typeof c === 'string' || c && c instanceof String || d(_typeof(c), 'not a string'), '' + c;

            case a.TYPES.bytes:
              return b.isByteBuffer(c) ? c : b.wrap(c);

            case a.TYPES.enum:
              for (f = this.resolvedType.getChildren(a.Reflect.Enum.Value), h = 0; h < f.length; h++) {
                if (f[h].name == c) return f[h].id;
                if (f[h].id == c) return f[h].id;
              }

              if (this.syntax === 'proto3') return (typeof c !== 'number' || c === c && c % 1 !== 0) && d(_typeof(c), 'not an integer'), (c > 4294967295 || c < 0) && d(_typeof(c), 'not in range for uint32'), c;
              d(c, 'not a valid enum value');

            case a.TYPES.group:
            case a.TYPES.message:
              if (c && _typeof(c) === 'object' || d(_typeof(c), 'object expected'), c instanceof this.resolvedType.clazz) return c;

              if (c instanceof a.Builder.Message) {
                g = {};

                for (h in c) {
                  c.hasOwnProperty(h) && (g[h] = c[h]);
                }

                c = g;
              }

              return new this.resolvedType.clazz(c);
          }

          throw Error('[INTERNAL] Illegal value for ' + this.toString(!0) + ': ' + c + ' (undefined type ' + this.type + ')');
        }, j.calculateLength = function (b, c) {
          if (c === null) return 0;
          var d;

          switch (this.type) {
            case a.TYPES.int32:
              return c < 0 ? f.calculateVarint64(c) : f.calculateVarint32(c);

            case a.TYPES.uint32:
              return f.calculateVarint32(c);

            case a.TYPES.sint32:
              return f.calculateVarint32(f.zigZagEncode32(c));

            case a.TYPES.fixed32:
            case a.TYPES.sfixed32:
            case a.TYPES.float:
              return 4;

            case a.TYPES.int64:
            case a.TYPES.uint64:
              return f.calculateVarint64(c);

            case a.TYPES.sint64:
              return f.calculateVarint64(f.zigZagEncode64(c));

            case a.TYPES.fixed64:
            case a.TYPES.sfixed64:
              return 8;

            case a.TYPES.bool:
              return 1;

            case a.TYPES.enum:
              return f.calculateVarint32(c);

            case a.TYPES.double:
              return 8;

            case a.TYPES.string:
              return d = f.calculateUTF8Bytes(c), f.calculateVarint32(d) + d;

            case a.TYPES.bytes:
              if (c.remaining() < 0) throw Error('Illegal value for ' + this.toString(!0) + ': ' + c.remaining() + ' bytes remaining');
              return f.calculateVarint32(c.remaining()) + c.remaining();

            case a.TYPES.message:
              return d = this.resolvedType.calculate(c), f.calculateVarint32(d) + d;

            case a.TYPES.group:
              return d = this.resolvedType.calculate(c), d + f.calculateVarint32(b << 3 | a.WIRE_TYPES.ENDGROUP);
          }

          throw Error('[INTERNAL] Illegal value to encode in ' + this.toString(!0) + ': ' + c + ' (unknown type)');
        }, j.encodeValue = function (b, c, d) {
          var e, g;
          if (c === null) return d;

          switch (this.type) {
            case a.TYPES.int32:
              c < 0 ? d.writeVarint64(c) : d.writeVarint32(c);
              break;

            case a.TYPES.uint32:
              d.writeVarint32(c);
              break;

            case a.TYPES.sint32:
              d.writeVarint32ZigZag(c);
              break;

            case a.TYPES.fixed32:
              d.writeUint32(c);
              break;

            case a.TYPES.sfixed32:
              d.writeInt32(c);
              break;

            case a.TYPES.int64:
            case a.TYPES.uint64:
              d.writeVarint64(c);
              break;

            case a.TYPES.sint64:
              d.writeVarint64ZigZag(c);
              break;

            case a.TYPES.fixed64:
              d.writeUint64(c);
              break;

            case a.TYPES.sfixed64:
              d.writeInt64(c);
              break;

            case a.TYPES.bool:
              typeof c === 'string' ? d.writeVarint32(c.toLowerCase() === 'false' ? 0 : !!c) : d.writeVarint32(c ? 1 : 0);
              break;

            case a.TYPES.enum:
              d.writeVarint32(c);
              break;

            case a.TYPES.float:
              d.writeFloat32(c);
              break;

            case a.TYPES.double:
              d.writeFloat64(c);
              break;

            case a.TYPES.string:
              d.writeVString(c);
              break;

            case a.TYPES.bytes:
              if (c.remaining() < 0) throw Error('Illegal value for ' + this.toString(!0) + ': ' + c.remaining() + ' bytes remaining');
              e = c.offset, d.writeVarint32(c.remaining()), d.append(c), c.offset = e;
              break;

            case a.TYPES.message:
              g = new f().LE(), this.resolvedType.encode(c, g), d.writeVarint32(g.offset), d.append(g.flip());
              break;

            case a.TYPES.group:
              this.resolvedType.encode(c, d), d.writeVarint32(b << 3 | a.WIRE_TYPES.ENDGROUP);
              break;

            default:
              throw Error('[INTERNAL] Illegal value to encode in ' + this.toString(!0) + ': ' + c + ' (unknown type)');
          }

          return d;
        }, j.decode = function (b, c, d) {
          if (c != this.type.wireType) throw Error('Unexpected wire type for element');
          var e, f;

          switch (this.type) {
            case a.TYPES.int32:
              return 0 | b.readVarint32();

            case a.TYPES.uint32:
              return b.readVarint32() >>> 0;

            case a.TYPES.sint32:
              return 0 | b.readVarint32ZigZag();

            case a.TYPES.fixed32:
              return b.readUint32() >>> 0;

            case a.TYPES.sfixed32:
              return 0 | b.readInt32();

            case a.TYPES.int64:
              return b.readVarint64();

            case a.TYPES.uint64:
              return b.readVarint64().toUnsigned();

            case a.TYPES.sint64:
              return b.readVarint64ZigZag();

            case a.TYPES.fixed64:
              return b.readUint64();

            case a.TYPES.sfixed64:
              return b.readInt64();

            case a.TYPES.bool:
              return !!b.readVarint32();

            case a.TYPES.enum:
              return b.readVarint32();

            case a.TYPES.float:
              return b.readFloat();

            case a.TYPES.double:
              return b.readDouble();

            case a.TYPES.string:
              return b.readVString();

            case a.TYPES.bytes:
              if (f = b.readVarint32(), b.remaining() < f) throw Error('Illegal number of bytes for ' + this.toString(!0) + ': ' + f + ' required but got only ' + b.remaining());
              return e = b.clone(), e.limit = e.offset + f, b.offset += f, e;

            case a.TYPES.message:
              return f = b.readVarint32(), this.resolvedType.decode(b, f);

            case a.TYPES.group:
              return this.resolvedType.decode(b, -1, d);
          }

          throw Error('[INTERNAL] Illegal decode type');
        }, j.valueFromString = function (b) {
          if (!this.isMapKey) throw Error('valueFromString() called on non-map-key element');

          switch (this.type) {
            case a.TYPES.int32:
            case a.TYPES.sint32:
            case a.TYPES.sfixed32:
            case a.TYPES.uint32:
            case a.TYPES.fixed32:
              return this.verifyValue(parseInt(b));

            case a.TYPES.int64:
            case a.TYPES.sint64:
            case a.TYPES.sfixed64:
            case a.TYPES.uint64:
            case a.TYPES.fixed64:
              return this.verifyValue(b);

            case a.TYPES.bool:
              return b === 'true';

            case a.TYPES.string:
              return this.verifyValue(b);

            case a.TYPES.bytes:
              return f.fromBinary(b);
          }
        }, j.valueToString = function (b) {
          if (!this.isMapKey) throw Error('valueToString() called on non-map-key element');
          return this.type === a.TYPES.bytes ? b.toString('binary') : b.toString();
        }, c.Element = i, m = function m(a, b, c, d, e, f) {
          g.call(this, a, b, c, d, f), this.className = 'Message', this.extensions = void 0, this.clazz = null, this.isGroup = !!e, this._fields = null, this._fieldsById = null, this._fieldsByName = null;
        }, n = m.prototype = Object.create(g.prototype), n.build = function (c) {
          var d, h, e, g;
          if (this.clazz && !c) return this.clazz;

          for (d = function (a, c) {
            function k(b, c, d, e) {
              var g, h, i, j, l, m, n;
              if (b === null || _typeof(b) !== 'object') return e && e instanceof a.Reflect.Enum && (g = a.Reflect.Enum.getName(e.object, b), g !== null) ? g : b;
              if (f.isByteBuffer(b)) return c ? b.toBase64() : b.toBuffer();
              if (a.Long.isLong(b)) return d ? b.toString() : a.Long.fromValue(b);
              if (Array.isArray(b)) return h = [], b.forEach(function (a, b) {
                h[b] = k(a, c, d, e);
              }), h;

              if (h = {}, b instanceof a.Map) {
                for (i = b.entries(), j = i.next(); !j.done; j = i.next()) {
                  h[b.keyElem.valueToString(j.value[0])] = k(j.value[1], c, d, b.valueElem.resolvedType);
                }

                return h;
              }

              l = b.$type, m = void 0;

              for (n in b) {
                b.hasOwnProperty(n) && (h[n] = l && (m = l.getChild(n)) ? k(b[n], c, d, m.resolvedType) : k(b[n], c, d));
              }

              return h;
            }

            var i;
            var j;
            var d = c.getChildren(a.Reflect.Message.Field);
            var e = c.getChildren(a.Reflect.Message.OneOf);

            var g = function g(b) {
              var i, j, k, l;

              for (a.Builder.Message.call(this), i = 0, j = e.length; j > i; ++i) {
                this[e[i].name] = null;
              }

              for (i = 0, j = d.length; j > i; ++i) {
                k = d[i], this[k.name] = k.repeated ? [] : k.map ? new a.Map(k) : null, !k.required && c.syntax !== 'proto3' || k.defaultValue === null || (this[k.name] = k.defaultValue);
              }

              if (arguments.length > 0) if (arguments.length !== 1 || b === null || _typeof(b) !== 'object' || !(typeof b.encode !== 'function' || b instanceof g) || Array.isArray(b) || b instanceof a.Map || f.isByteBuffer(b) || b instanceof ArrayBuffer || a.Long && b instanceof a.Long) for (i = 0, j = arguments.length; j > i; ++i) {
                typeof (l = arguments[i]) !== 'undefined' && this.$set(d[i].name, l);
              } else this.$set(b);
            };

            var h = g.prototype = Object.create(a.Builder.Message.prototype);

            for (h.add = function (b, d, e) {
              var f = c._fieldsByName[b];

              if (!e) {
                if (!f) throw Error(this + '#' + b + ' is undefined');
                if (!(f instanceof a.Reflect.Message.Field)) throw Error(this + '#' + b + ' is not a field: ' + f.toString(!0));
                if (!f.repeated) throw Error(this + '#' + b + ' is not a repeated field');
                d = f.verifyValue(d, !0);
              }

              return this[b] === null && (this[b] = []), this[b].push(d), this;
            }, h.$add = h.add, h.set = function (b, d, e) {
              var f, g, h;

              if (b && _typeof(b) === 'object') {
                e = d;

                for (f in b) {
                  b.hasOwnProperty(f) && typeof (d = b[f]) !== 'undefined' && this.$set(f, d, e);
                }

                return this;
              }

              if (g = c._fieldsByName[b], e) this[b] = d;else {
                if (!g) throw Error(this + '#' + b + ' is not a field: undefined');
                if (!(g instanceof a.Reflect.Message.Field)) throw Error(this + '#' + b + ' is not a field: ' + g.toString(!0));
                this[g.name] = d = g.verifyValue(d);
              }
              return g && g.oneof && (h = this[g.oneof.name], d !== null ? (h !== null && h !== g.name && (this[h] = null), this[g.oneof.name] = g.name) : h === b && (this[g.oneof.name] = null)), this;
            }, h.$set = h.set, h.get = function (b, d) {
              if (d) return this[b];
              var e = c._fieldsByName[b];
              if (!(e && e instanceof a.Reflect.Message.Field)) throw Error(this + '#' + b + ' is not a field: undefined');
              if (!(e instanceof a.Reflect.Message.Field)) throw Error(this + '#' + b + ' is not a field: ' + e.toString(!0));
              return this[e.name];
            }, h.$get = h.get, i = 0; i < d.length; i++) {
              j = d[i], j instanceof a.Reflect.Message.ExtensionField || c.builder.options.populateAccessors && function (a) {
                var d;
                var e;
                var f;
                var b = a.originalName.replace(/(_[a-zA-Z])/g, function (a) {
                  return a.toUpperCase().replace('_', '');
                });
                b = b.substring(0, 1).toUpperCase() + b.substring(1), d = a.originalName.replace(/([A-Z])/g, function (a) {
                  return '_' + a;
                }), e = function e(b, c) {
                  return this[a.name] = c ? b : a.verifyValue(b), this;
                }, f = function f() {
                  return this[a.name];
                }, c.getChild('set' + b) === null && (h['set' + b] = e), c.getChild('set_' + d) === null && (h['set_' + d] = e), c.getChild('get' + b) === null && (h['get' + b] = f), c.getChild('get_' + d) === null && (h['get_' + d] = f);
              }(j);
            }

            return h.encode = function (a, d) {
              var e, f;
              typeof a === 'boolean' && (d = a, a = void 0), e = !1, a || (a = new b(), e = !0), f = a.littleEndian;

              try {
                return c.encode(this, a.LE(), d), (e ? a.flip() : a).LE(f);
              } catch (g) {
                throw a.LE(f), g;
              }
            }, g.encode = function (a, b, c) {
              return new g(a).encode(b, c);
            }, h.calculate = function () {
              return c.calculate(this);
            }, h.encodeDelimited = function (a) {
              var d;
              var b = !1;
              return a || (a = new f(), b = !0), d = new f().LE(), c.encode(this, d).flip(), a.writeVarint32(d.remaining()), a.append(d), b ? a.flip() : a;
            }, h.encodeAB = function () {
              try {
                return this.encode().toArrayBuffer();
              } catch (a) {
                throw a.encoded && (a.encoded = a.encoded.toArrayBuffer()), a;
              }
            }, h.toArrayBuffer = h.encodeAB, h.encodeNB = function () {
              try {
                return this.encode().toBuffer();
              } catch (a) {
                throw a.encoded && (a.encoded = a.encoded.toBuffer()), a;
              }
            }, h.toBuffer = h.encodeNB, h.encode64 = function () {
              try {
                return this.encode().toBase64();
              } catch (a) {
                throw a.encoded && (a.encoded = a.encoded.toBase64()), a;
              }
            }, h.toBase64 = h.encode64, h.encodeHex = function () {
              try {
                return this.encode().toHex();
              } catch (a) {
                throw a.encoded && (a.encoded = a.encoded.toHex()), a;
              }
            }, h.toHex = h.encodeHex, h.toRaw = function (a, b) {
              return k(this, !!a, !!b, this.$type);
            }, h.encodeJSON = function () {
              return JSON.stringify(k(this, !0, !0, this.$type));
            }, g.decode = function (a, b) {
              var d, e;
              typeof a === 'string' && (a = f.wrap(a, b || 'base64')), a = f.isByteBuffer(a) ? a : f.wrap(a), d = a.littleEndian;

              try {
                return e = c.decode(a.LE()), a.LE(d), e;
              } catch (g) {
                throw a.LE(d), g;
              }
            }, g.decodeDelimited = function (a, b) {
              var d, e, g;
              if (typeof a === 'string' && (a = f.wrap(a, b || 'base64')), a = f.isByteBuffer(a) ? a : f.wrap(a), a.remaining() < 1) return null;
              if (d = a.offset, e = a.readVarint32(), a.remaining() < e) return a.offset = d, null;

              try {
                return g = c.decode(a.slice(a.offset, a.offset + e).LE()), a.offset += e, g;
              } catch (h) {
                throw a.offset += e, h;
              }
            }, g.decode64 = function (a) {
              return g.decode(a, 'base64');
            }, g.decodeHex = function (a) {
              return g.decode(a, 'hex');
            }, g.decodeJSON = function (a) {
              return new g(JSON.parse(a));
            }, h.toString = function () {
              return c.toString();
            }, Object.defineProperty && (Object.defineProperty(g, '$options', {
              value: c.buildOpt()
            }), Object.defineProperty(h, '$options', {
              value: g.$options
            }), Object.defineProperty(g, '$type', {
              value: c
            }), Object.defineProperty(h, '$type', {
              value: c
            })), g;
          }(a, this), this._fields = [], this._fieldsById = {}, this._fieldsByName = {}, e = 0, g = this.children.length; g > e; e++) {
            if (h = this.children[e], h instanceof t || h instanceof m || h instanceof x) {
              if (d.hasOwnProperty(h.name)) throw Error('Illegal reflect child of ' + this.toString(!0) + ': ' + h.toString(!0) + " cannot override static property '" + h.name + "'");
              d[h.name] = h.build();
            } else if (h instanceof m.Field) h.build(), this._fields.push(h), this._fieldsById[h.id] = h, this._fieldsByName[h.name] = h;else if (!(h instanceof m.OneOf || h instanceof w)) throw Error('Illegal reflect child of ' + this.toString(!0) + ': ' + this.children[e].toString(!0));
          }

          return this.clazz = d;
        }, n.encode = function (a, b, c) {
          var e;
          var h;
          var f;
          var g;
          var i;
          var d = null;

          for (f = 0, g = this._fields.length; g > f; ++f) {
            e = this._fields[f], h = a[e.name], e.required && h === null ? d === null && (d = e) : e.encode(c ? h : e.verifyValue(h), b, a);
          }

          if (d !== null) throw i = Error('Missing at least one required field for ' + this.toString(!0) + ': ' + d), i.encoded = b, i;
          return b;
        }, n.calculate = function (a) {
          for (var e, f, b = 0, c = 0, d = this._fields.length; d > c; ++c) {
            if (e = this._fields[c], f = a[e.name], e.required && f === null) throw Error('Missing at least one required field for ' + this.toString(!0) + ': ' + e);
            b += e.calculate(f, a);
          }

          return b;
        }, n.decode = function (b, c, d) {
          var g, h, i, j, e, f, k, l, m, n, p, q;

          for (c = typeof c === 'number' ? c : -1, e = b.offset, f = new this.clazz(); b.offset < e + c || c === -1 && b.remaining() > 0;) {
            if (g = b.readVarint32(), h = 7 & g, i = g >>> 3, h === a.WIRE_TYPES.ENDGROUP) {
              if (i !== d) throw Error('Illegal group end indicator for ' + this.toString(!0) + ': ' + i + ' (' + (d ? d + ' expected' : 'not a group') + ')');
              break;
            }

            if (j = this._fieldsById[i]) j.repeated && !j.options.packed ? f[j.name].push(j.decode(h, b)) : j.map ? (l = j.decode(h, b), f[j.name].set(l[0], l[1])) : (f[j.name] = j.decode(h, b), j.oneof && (m = f[j.oneof.name], m !== null && m !== j.name && (f[m] = null), f[j.oneof.name] = j.name));else switch (h) {
              case a.WIRE_TYPES.VARINT:
                b.readVarint32();
                break;

              case a.WIRE_TYPES.BITS32:
                b.offset += 4;
                break;

              case a.WIRE_TYPES.BITS64:
                b.offset += 8;
                break;

              case a.WIRE_TYPES.LDELIM:
                k = b.readVarint32(), b.offset += k;
                break;

              case a.WIRE_TYPES.STARTGROUP:
                for (; o(i, b);) {
                }

                break;

              default:
                throw Error('Illegal wire type for unknown field ' + i + ' in ' + this.toString(!0) + '#decode: ' + h);
            }
          }

          for (n = 0, p = this._fields.length; p > n; ++n) {
            if (j = this._fields[n], f[j.name] === null) if (this.syntax === 'proto3') f[j.name] = j.defaultValue;else {
              if (j.required) throw q = Error('Missing at least one required field for ' + this.toString(!0) + ': ' + j.name), q.decoded = f, q;
              a.populateDefaults && j.defaultValue !== null && (f[j.name] = j.defaultValue);
            }
          }

          return f;
        }, c.Message = m, p = function p(b, c, e, f, g, h, i, j, k, l) {
          d.call(this, b, c, h), this.className = 'Message.Field', this.required = e === 'required', this.repeated = e === 'repeated', this.map = e === 'map', this.keyType = f || null, this.type = g, this.resolvedType = null, this.id = i, this.options = j || {}, this.defaultValue = null, this.oneof = k || null, this.syntax = l || 'proto2', this.originalName = this.name, this.element = null, this.keyElement = null, !this.builder.options.convertFieldsToCamelCase || this instanceof m.ExtensionField || (this.name = a.Util.toCamelCase(this.name));
        }, q = p.prototype = Object.create(d.prototype), q.build = function () {
          this.element = new i(this.type, this.resolvedType, !1, this.syntax), this.map && (this.keyElement = new i(this.keyType, void 0, !0, this.syntax)), this.syntax !== 'proto3' || this.repeated || this.map ? typeof this.options.default !== 'undefined' && (this.defaultValue = this.verifyValue(this.options.default)) : this.defaultValue = i.defaultFieldValue(this.type);
        }, q.verifyValue = function (b, c) {
          var d, e, f;
          if (c = c || !1, d = function (a, b) {
            throw Error('Illegal value for ' + this.toString(!0) + ' of type ' + this.type.name + ': ' + a + ' (' + b + ')');
          }.bind(this), b === null) return this.required && d(_typeof(b), 'required'), this.syntax === 'proto3' && this.type !== a.TYPES.message && d(_typeof(b), 'proto3 field without field presence cannot be null'), null;

          if (this.repeated && !c) {
            for (Array.isArray(b) || (b = [b]), f = [], e = 0; e < b.length; e++) {
              f.push(this.element.verifyValue(b[e]));
            }

            return f;
          }

          return this.map && !c ? b instanceof a.Map ? b : (b instanceof Object || d(_typeof(b), 'expected ProtoBuf.Map or raw object for map field'), new a.Map(this, b)) : (!this.repeated && Array.isArray(b) && d(_typeof(b), 'no array expected'), this.element.verifyValue(b));
        }, q.hasWirePresence = function (b, c) {
          if (this.syntax !== 'proto3') return b !== null;
          if (this.oneof && c[this.oneof.name] === this.name) return !0;

          switch (this.type) {
            case a.TYPES.int32:
            case a.TYPES.sint32:
            case a.TYPES.sfixed32:
            case a.TYPES.uint32:
            case a.TYPES.fixed32:
              return b !== 0;

            case a.TYPES.int64:
            case a.TYPES.sint64:
            case a.TYPES.sfixed64:
            case a.TYPES.uint64:
            case a.TYPES.fixed64:
              return b.low !== 0 || b.high !== 0;

            case a.TYPES.bool:
              return b;

            case a.TYPES.float:
            case a.TYPES.double:
              return b !== 0;

            case a.TYPES.string:
              return b.length > 0;

            case a.TYPES.bytes:
              return b.remaining() > 0;

            case a.TYPES.enum:
              return b !== 0;

            case a.TYPES.message:
              return b !== null;

            default:
              return !0;
          }
        }, q.encode = function (b, c, d) {
          var e, g, h, i, j;
          if (this.type === null || _typeof(this.type) !== 'object') throw Error('[INTERNAL] Unresolved type in ' + this.toString(!0) + ': ' + this.type);
          if (b === null || this.repeated && b.length == 0) return c;

          try {
            if (this.repeated) {
              if (this.options.packed && a.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                for (c.writeVarint32(this.id << 3 | a.WIRE_TYPES.LDELIM), c.ensureCapacity(c.offset += 1), g = c.offset, e = 0; e < b.length; e++) {
                  this.element.encodeValue(this.id, b[e], c);
                }

                h = c.offset - g, i = f.calculateVarint32(h), i > 1 && (j = c.slice(g, c.offset), g += i - 1, c.offset = g, c.append(j)), c.writeVarint32(h, g - i);
              } else for (e = 0; e < b.length; e++) {
                c.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, b[e], c);
              }
            } else this.map ? b.forEach(function (b, d) {
              var g = f.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, d) + f.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, b);
              c.writeVarint32(this.id << 3 | a.WIRE_TYPES.LDELIM), c.writeVarint32(g), c.writeVarint32(8 | this.keyType.wireType), this.keyElement.encodeValue(1, d, c), c.writeVarint32(16 | this.type.wireType), this.element.encodeValue(2, b, c);
            }, this) : this.hasWirePresence(b, d) && (c.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, b, c));
          } catch (k) {
            throw Error('Illegal value for ' + this.toString(!0) + ': ' + b + ' (' + k + ')');
          }

          return c;
        }, q.calculate = function (b, c) {
          var d, e, g;
          if (b = this.verifyValue(b), this.type === null || _typeof(this.type) !== 'object') throw Error('[INTERNAL] Unresolved type in ' + this.toString(!0) + ': ' + this.type);
          if (b === null || this.repeated && b.length == 0) return 0;
          d = 0;

          try {
            if (this.repeated) {
              if (this.options.packed && a.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                for (d += f.calculateVarint32(this.id << 3 | a.WIRE_TYPES.LDELIM), g = 0, e = 0; e < b.length; e++) {
                  g += this.element.calculateLength(this.id, b[e]);
                }

                d += f.calculateVarint32(g), d += g;
              } else for (e = 0; e < b.length; e++) {
                d += f.calculateVarint32(this.id << 3 | this.type.wireType), d += this.element.calculateLength(this.id, b[e]);
              }
            } else this.map ? b.forEach(function (b, c) {
              var g = f.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, c) + f.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, b);
              d += f.calculateVarint32(this.id << 3 | a.WIRE_TYPES.LDELIM), d += f.calculateVarint32(g), d += g;
            }, this) : this.hasWirePresence(b, c) && (d += f.calculateVarint32(this.id << 3 | this.type.wireType), d += this.element.calculateLength(this.id, b));
          } catch (h) {
            throw Error('Illegal value for ' + this.toString(!0) + ': ' + b + ' (' + h + ')');
          }

          return d;
        }, q.decode = function (b, c, d) {
          var e;
          var f;
          var h;
          var j;
          var k;
          var l;
          var m;
          var g = !this.map && b == this.type.wireType || !d && this.repeated && this.options.packed && b == a.WIRE_TYPES.LDELIM || this.map && b == a.WIRE_TYPES.LDELIM;
          if (!g) throw Error('Illegal wire type for field ' + this.toString(!0) + ': ' + b + ' (' + this.type.wireType + ' expected)');

          if (b == a.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && a.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !d) {
            for (f = c.readVarint32(), f = c.offset + f, h = []; c.offset < f;) {
              h.push(this.decode(this.type.wireType, c, !0));
            }

            return h;
          }

          if (this.map) {
            if (j = i.defaultFieldValue(this.keyType), e = i.defaultFieldValue(this.type), f = c.readVarint32(), c.remaining() < f) throw Error('Illegal number of bytes for ' + this.toString(!0) + ': ' + f + ' required but got only ' + c.remaining());

            for (k = c.clone(), k.limit = k.offset + f, c.offset += f; k.remaining() > 0;) {
              if (l = k.readVarint32(), b = 7 & l, m = l >>> 3, m === 1) j = this.keyElement.decode(k, b, m);else {
                if (m !== 2) throw Error('Unexpected tag in map field key/value submessage');
                e = this.element.decode(k, b, m);
              }
            }

            return [j, e];
          }

          return this.element.decode(c, b, this.id);
        }, c.Message.Field = p, r = function r(a, b, c, d, e, f, g) {
          p.call(this, a, b, c, null, d, e, f, g), this.extension;
        }, r.prototype = Object.create(p.prototype), c.Message.ExtensionField = r, s = function s(a, b, c) {
          d.call(this, a, b, c), this.fields = [];
        }, c.Message.OneOf = s, t = function t(a, b, c, d, e) {
          g.call(this, a, b, c, d, e), this.className = 'Enum', this.object = null;
        }, t.getName = function (a, b) {
          var e;
          var d;
          var c = Object.keys(a);

          for (d = 0; d < c.length; ++d) {
            if (a[e = c[d]] === b) return e;
          }

          return null;
        }, u = t.prototype = Object.create(g.prototype), u.build = function (b) {
          var c, d, e, f;
          if (this.object && !b) return this.object;

          for (c = new a.Builder.Enum(), d = this.getChildren(t.Value), e = 0, f = d.length; f > e; ++e) {
            c[d[e].name] = d[e].id;
          }

          return Object.defineProperty && Object.defineProperty(c, '$options', {
            value: this.buildOpt(),
            enumerable: !1
          }), this.object = c;
        }, c.Enum = t, v = function v(a, b, c, e) {
          d.call(this, a, b, c), this.className = 'Enum.Value', this.id = e;
        }, v.prototype = Object.create(d.prototype), c.Enum.Value = v, w = function w(a, b, c, e) {
          d.call(this, a, b, c), this.field = e;
        }, w.prototype = Object.create(d.prototype), c.Extension = w, x = function x(a, b, c, d) {
          g.call(this, a, b, c, d), this.className = 'Service', this.clazz = null;
        }, y = x.prototype = Object.create(g.prototype), y.build = function (b) {
          return this.clazz && !b ? this.clazz : this.clazz = function (a, b) {
            var g;

            var c = function c(b) {
              a.Builder.Service.call(this), this.rpcImpl = b || function (a, b, c) {
                setTimeout(c.bind(this, Error('Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services')), 0);
              };
            };

            var d = c.prototype = Object.create(a.Builder.Service.prototype);
            var e = b.getChildren(a.Reflect.Service.RPCMethod);

            for (g = 0; g < e.length; g++) {
              !function (a) {
                d[a.name] = function (c, d) {
                  try {
                    try {
                      c = a.resolvedRequestType.clazz.decode(f.wrap(c));
                    } catch (e) {
                      if (!(e instanceof TypeError)) throw e;
                    }

                    if (c === null || _typeof(c) !== 'object') throw Error('Illegal arguments');
                    c instanceof a.resolvedRequestType.clazz || (c = new a.resolvedRequestType.clazz(c)), this.rpcImpl(a.fqn(), c, function (c, e) {
                      if (c) return d(c), void 0;

                      try {
                        e = a.resolvedResponseType.clazz.decode(e);
                      } catch (f) {}

                      return e && e instanceof a.resolvedResponseType.clazz ? (d(null, e), void 0) : (d(Error('Illegal response type received in service method ' + b.name + '#' + a.name)), void 0);
                    });
                  } catch (e) {
                    setTimeout(d.bind(this, e), 0);
                  }
                }, c[a.name] = function (b, d, e) {
                  new c(b)[a.name](d, e);
                }, Object.defineProperty && (Object.defineProperty(c[a.name], '$options', {
                  value: a.buildOpt()
                }), Object.defineProperty(d[a.name], '$options', {
                  value: c[a.name].$options
                }));
              }(e[g]);
            }

            return Object.defineProperty && (Object.defineProperty(c, '$options', {
              value: b.buildOpt()
            }), Object.defineProperty(d, '$options', {
              value: c.$options
            }), Object.defineProperty(c, '$type', {
              value: b
            }), Object.defineProperty(d, '$type', {
              value: b
            })), c;
          }(a, this);
        }, c.Service = x, z = function z(a, b, c, e) {
          d.call(this, a, b, c), this.className = 'Service.Method', this.options = e || {};
        }, A = z.prototype = Object.create(d.prototype), A.buildOpt = h.buildOpt, c.Service.Method = z, B = function B(a, b, c, d, e, f, g, h) {
          z.call(this, a, b, c, h), this.className = 'Service.RPCMethod', this.requestName = d, this.responseName = e, this.requestStream = f, this.responseStream = g, this.resolvedRequestType = null, this.resolvedResponseType = null;
        }, B.prototype = Object.create(z.prototype), c.Service.RPCMethod = B, c;
      }(e), e.Builder = function (a, b, c) {
        function f(a) {
          a.messages && a.messages.forEach(function (b) {
            b.syntax = a.syntax, f(b);
          }), a.enums && a.enums.forEach(function (b) {
            b.syntax = a.syntax;
          });
        }

        var d = function d(a) {
          this.ns = new c.Namespace(this, null, ''), this.ptr = this.ns, this.resolved = !1, this.result = null, this.files = {}, this.importRoot = null, this.options = a || {};
        };

        var e = d.prototype;
        return d.isMessage = function (a) {
          return typeof a.name !== 'string' ? !1 : typeof a.values !== 'undefined' || typeof a.rpc !== 'undefined' ? !1 : !0;
        }, d.isMessageField = function (a) {
          return typeof a.rule !== 'string' || typeof a.name !== 'string' || typeof a.type !== 'string' || typeof a.id === 'undefined' ? !1 : !0;
        }, d.isEnum = function (a) {
          return typeof a.name !== 'string' ? !1 : typeof a.values !== 'undefined' && Array.isArray(a.values) && a.values.length !== 0 ? !0 : !1;
        }, d.isService = function (a) {
          return typeof a.name === 'string' && _typeof(a.rpc) === 'object' && a.rpc ? !0 : !1;
        }, d.isExtend = function (a) {
          return typeof a.ref !== 'string' ? !1 : !0;
        }, e.reset = function () {
          return this.ptr = this.ns, this;
        }, e.define = function (a) {
          if (typeof a !== 'string' || !b.TYPEREF.test(a)) throw Error('illegal namespace: ' + a);
          return a.split('.').forEach(function (a) {
            var b = this.ptr.getChild(a);
            b === null && this.ptr.addChild(b = new c.Namespace(this, this.ptr, a)), this.ptr = b;
          }, this), this;
        }, e.create = function (b) {
          var e, f, g, h, i;
          if (!b) return this;

          if (Array.isArray(b)) {
            if (b.length === 0) return this;
            b = b.slice();
          } else b = [b];

          for (e = [b]; e.length > 0;) {
            if (b = e.pop(), !Array.isArray(b)) throw Error('not a valid namespace: ' + JSON.stringify(b));

            for (; b.length > 0;) {
              if (f = b.shift(), d.isMessage(f)) {
                if (g = new c.Message(this, this.ptr, f.name, f.options, f.isGroup, f.syntax), h = {}, f.oneofs && Object.keys(f.oneofs).forEach(function (a) {
                  g.addChild(h[a] = new c.Message.OneOf(this, g, a));
                }, this), f.fields && f.fields.forEach(function (a) {
                  if (g.getChild(0 | a.id) !== null) throw Error('duplicate or invalid field id in ' + g.name + ': ' + a.id);
                  if (a.options && _typeof(a.options) !== 'object') throw Error('illegal field options in ' + g.name + '#' + a.name);
                  var b = null;
                  if (typeof a.oneof === 'string' && !(b = h[a.oneof])) throw Error('illegal oneof in ' + g.name + '#' + a.name + ': ' + a.oneof);
                  a = new c.Message.Field(this, g, a.rule, a.keytype, a.type, a.name, a.id, a.options, b, f.syntax), b && b.fields.push(a), g.addChild(a);
                }, this), i = [], f.enums && f.enums.forEach(function (a) {
                  i.push(a);
                }), f.messages && f.messages.forEach(function (a) {
                  i.push(a);
                }), f.services && f.services.forEach(function (a) {
                  i.push(a);
                }), f.extensions && (g.extensions = typeof f.extensions[0] === 'number' ? [f.extensions] : f.extensions), this.ptr.addChild(g), i.length > 0) {
                  e.push(b), b = i, i = null, this.ptr = g, g = null;
                  continue;
                }

                i = null;
              } else if (d.isEnum(f)) g = new c.Enum(this, this.ptr, f.name, f.options, f.syntax), f.values.forEach(function (a) {
                g.addChild(new c.Enum.Value(this, g, a.name, a.id));
              }, this), this.ptr.addChild(g);else if (d.isService(f)) g = new c.Service(this, this.ptr, f.name, f.options), Object.keys(f.rpc).forEach(function (a) {
                var b = f.rpc[a];
                g.addChild(new c.Service.RPCMethod(this, g, a, b.request, b.response, !!b.request_stream, !!b.response_stream, b.options));
              }, this), this.ptr.addChild(g);else {
                if (!d.isExtend(f)) throw Error('not a valid definition: ' + JSON.stringify(f));

                if (g = this.ptr.resolve(f.ref, !0)) {
                  f.fields.forEach(function (b) {
                    var d, e, f, h;
                    if (g.getChild(0 | b.id) !== null) throw Error('duplicate extended field id in ' + g.name + ': ' + b.id);
                    if (g.extensions && (d = !1, g.extensions.forEach(function (a) {
                      b.id >= a[0] && b.id <= a[1] && (d = !0);
                    }), !d)) throw Error('illegal extended field id in ' + g.name + ': ' + b.id + ' (not within valid ranges)');
                    e = b.name, this.options.convertFieldsToCamelCase && (e = a.Util.toCamelCase(e)), f = new c.Message.ExtensionField(this, g, b.rule, b.type, this.ptr.fqn() + '.' + e, b.id, b.options), h = new c.Extension(this, this.ptr, b.name, f), f.extension = h, this.ptr.addChild(h), g.addChild(f);
                  }, this);
                } else if (!/\.?google\.protobuf\./.test(f.ref)) throw Error('extended message ' + f.ref + ' is not defined');
              }

              f = null, g = null;
            }

            b = null, this.ptr = this.ptr.parent;
          }

          return this.resolved = !1, this.result = null, this;
        }, e.import = function (b, c) {
          var e;
          var g;
          var h;
          var i;
          var j;
          var k;
          var l;
          var m;
          var d = '/';

          if (typeof c === 'string') {
            if (a.Util.IS_NODE, this.files[c] === !0) return this.reset();
            this.files[c] = !0;
          } else if (_typeof(c) === 'object') {
            if (e = c.root, a.Util.IS_NODE, (e.indexOf('\\') >= 0 || c.file.indexOf('\\') >= 0) && (d = '\\'), g = e + d + c.file, this.files[g] === !0) return this.reset();
            this.files[g] = !0;
          }

          if (b.imports && b.imports.length > 0) {
            for (i = !1, _typeof(c) === 'object' ? (this.importRoot = c.root, i = !0, h = this.importRoot, c = c.file, (h.indexOf('\\') >= 0 || c.indexOf('\\') >= 0) && (d = '\\')) : typeof c === 'string' ? this.importRoot ? h = this.importRoot : c.indexOf('/') >= 0 ? (h = c.replace(/\/[^\/]*$/, ''), h === '' && (h = '/')) : c.indexOf('\\') >= 0 ? (h = c.replace(/\\[^\\]*$/, ''), d = '\\') : h = '.' : h = null, j = 0; j < b.imports.length; j++) {
              if (typeof b.imports[j] === 'string') {
                if (!h) throw Error('cannot determine import root');
                if (k = b.imports[j], k === 'google/protobuf/descriptor.proto') continue;
                if (k = h + d + k, this.files[k] === !0) continue;
                if (/\.proto$/i.test(k) && !a.DotProto && (k = k.replace(/\.proto$/, '.json')), l = a.Util.fetch(k), l === null) throw Error("failed to import '" + k + "' in '" + c + "': file not found");
                /\.json$/i.test(k) ? this.import(JSON.parse(l + ''), k) : this.import(a.DotProto.Parser.parse(l), k);
              } else c ? /\.(\w+)$/.test(c) ? this.import(b.imports[j], c.replace(/^(.+)\.(\w+)$/, function (a, b, c) {
                return b + '_import' + j + '.' + c;
              })) : this.import(b.imports[j], c + '_import' + j) : this.import(b.imports[j]);
            }

            i && (this.importRoot = null);
          }

          return b.package && this.define(b.package), b.syntax && f(b), m = this.ptr, b.options && Object.keys(b.options).forEach(function (a) {
            m.options[a] = b.options[a];
          }), b.messages && (this.create(b.messages), this.ptr = m), b.enums && (this.create(b.enums), this.ptr = m), b.services && (this.create(b.services), this.ptr = m), b.extends && this.create(b.extends), this.reset();
        }, e.resolveAll = function () {
          var d;
          if (this.ptr == null || _typeof(this.ptr.type) === 'object') return this;
          if (this.ptr instanceof c.Namespace) this.ptr.children.forEach(function (a) {
            this.ptr = a, this.resolveAll();
          }, this);else if (this.ptr instanceof c.Message.Field) {
            if (b.TYPE.test(this.ptr.type)) this.ptr.type = a.TYPES[this.ptr.type];else {
              if (!b.TYPEREF.test(this.ptr.type)) throw Error('illegal type reference in ' + this.ptr.toString(!0) + ': ' + this.ptr.type);
              if (d = (this.ptr instanceof c.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0), !d) throw Error('unresolvable type reference in ' + this.ptr.toString(!0) + ': ' + this.ptr.type);

              if (this.ptr.resolvedType = d, d instanceof c.Enum) {
                if (this.ptr.type = a.TYPES.enum, this.ptr.syntax === 'proto3' && d.syntax !== 'proto3') throw Error('proto3 message cannot reference proto2 enum');
              } else {
                if (!(d instanceof c.Message)) throw Error('illegal type reference in ' + this.ptr.toString(!0) + ': ' + this.ptr.type);
                this.ptr.type = d.isGroup ? a.TYPES.group : a.TYPES.message;
              }
            }

            if (this.ptr.map) {
              if (!b.TYPE.test(this.ptr.keyType)) throw Error('illegal key type for map field in ' + this.ptr.toString(!0) + ': ' + this.ptr.keyType);
              this.ptr.keyType = a.TYPES[this.ptr.keyType];
            }
          } else if (this.ptr instanceof a.Reflect.Service.Method) {
            if (!(this.ptr instanceof a.Reflect.Service.RPCMethod)) throw Error('illegal service type in ' + this.ptr.toString(!0));
            if (d = this.ptr.parent.resolve(this.ptr.requestName, !0), !(d && d instanceof a.Reflect.Message)) throw Error('Illegal type reference in ' + this.ptr.toString(!0) + ': ' + this.ptr.requestName);
            if (this.ptr.resolvedRequestType = d, d = this.ptr.parent.resolve(this.ptr.responseName, !0), !(d && d instanceof a.Reflect.Message)) throw Error('Illegal type reference in ' + this.ptr.toString(!0) + ': ' + this.ptr.responseName);
            this.ptr.resolvedResponseType = d;
          } else if (!(this.ptr instanceof a.Reflect.Message.OneOf || this.ptr instanceof a.Reflect.Extension || this.ptr instanceof a.Reflect.Enum.Value)) throw Error('illegal object in namespace: ' + _typeof(this.ptr) + ': ' + this.ptr);
          return this.reset();
        }, e.build = function (a) {
          var b, c, d;
          if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), this.result === null && (this.result = this.ns.build()), !a) return this.result;

          for (b = typeof a === 'string' ? a.split('.') : a, c = this.result, d = 0; d < b.length; d++) {
            if (!c[b[d]]) {
              c = null;
              break;
            }

            c = c[b[d]];
          }

          return c;
        }, e.lookup = function (a, b) {
          return a ? this.ns.resolve(a, b) : this.ns;
        }, e.toString = function () {
          return 'Builder';
        }, d.Message = function () {}, d.Enum = function () {}, d.Service = function () {}, d;
      }(e, e.Lang, e.Reflect), e.Map = function (a, b) {
        function e(a) {
          var b = 0;
          return {
            next: function next() {
              return b < a.length ? {
                done: !1,
                value: a[b++]
              } : {
                done: !0
              };
            }
          };
        }

        var c = function c(a, _c) {
          var d, e, f, g;
          if (!a.map) throw Error('field is not a map');
          if (this.field = a, this.keyElem = new b.Element(a.keyType, null, !0, a.syntax), this.valueElem = new b.Element(a.type, a.resolvedType, !1, a.syntax), this.map = {}, Object.defineProperty(this, 'size', {
            get: function get() {
              return Object.keys(this.map).length;
            }
          }), _c) for (d = Object.keys(_c), e = 0; e < d.length; e++) {
            f = this.keyElem.valueFromString(d[e]), g = this.valueElem.verifyValue(_c[d[e]]), this.map[this.keyElem.valueToString(f)] = {
              key: f,
              value: g
            };
          }
        };

        var d = c.prototype;
        return d.clear = function () {
          this.map = {};
        }, d.delete = function (a) {
          var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
          var c = (b in this.map);
          return delete this.map[b], c;
        }, d.entries = function () {
          var d;
          var c;
          var a = [];
          var b = Object.keys(this.map);

          for (c = 0; c < b.length; c++) {
            a.push([(d = this.map[b[c]]).key, d.value]);
          }

          return e(a);
        }, d.keys = function () {
          var c;
          var a = [];
          var b = Object.keys(this.map);

          for (c = 0; c < b.length; c++) {
            a.push(this.map[b[c]].key);
          }

          return e(a);
        }, d.values = function () {
          var c;
          var a = [];
          var b = Object.keys(this.map);

          for (c = 0; c < b.length; c++) {
            a.push(this.map[b[c]].value);
          }

          return e(a);
        }, d.forEach = function (a, b) {
          var e;
          var d;
          var c = Object.keys(this.map);

          for (d = 0; d < c.length; d++) {
            a.call(b, (e = this.map[c[d]]).value, e.key, this);
          }
        }, d.set = function (a, b) {
          var c = this.keyElem.verifyValue(a);
          var d = this.valueElem.verifyValue(b);
          return this.map[this.keyElem.valueToString(c)] = {
            key: c,
            value: d
          }, this;
        }, d.get = function (a) {
          var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
          return b in this.map ? this.map[b].value : void 0;
        }, d.has = function (a) {
          var b = this.keyElem.valueToString(this.keyElem.verifyValue(a));
          return b in this.map;
        }, c;
      }(e, e.Reflect), e.loadProto = function (a, b, c) {
        return (typeof b === 'string' || b && typeof b.file === 'string' && typeof b.root === 'string') && (c = b, b = void 0), e.loadJson(e.DotProto.Parser.parse(a), b, c);
      }, e.protoFromString = e.loadProto, e.loadProtoFile = function (a, b, c) {
        if (b && _typeof(b) === 'object' ? (c = b, b = null) : b && typeof b === 'function' || (b = null), b) return e.Util.fetch(typeof a === 'string' ? a : a.root + '/' + a.file, function (d) {
          if (d === null) return b(Error('Failed to fetch file')), void 0;

          try {
            b(null, e.loadProto(d, c, a));
          } catch (f) {
            b(f);
          }
        });
        var d = e.Util.fetch(_typeof(a) === 'object' ? a.root + '/' + a.file : a);
        return d === null ? null : e.loadProto(d, c, a);
      }, e.protoFromFile = e.loadProtoFile, e.newBuilder = function (a) {
        return a = a || {}, typeof a.convertFieldsToCamelCase === 'undefined' && (a.convertFieldsToCamelCase = e.convertFieldsToCamelCase), typeof a.populateAccessors === 'undefined' && (a.populateAccessors = e.populateAccessors), new e.Builder(a);
      }, e.loadJson = function (a, b, c) {
        return (typeof b === 'string' || b && typeof b.file === 'string' && typeof b.root === 'string') && (c = b, b = null), b && _typeof(b) === 'object' || (b = e.newBuilder()), typeof a === 'string' && (a = JSON.parse(a)), b.import(a, c), b.resolveAll(), b;
      }, e.loadJsonFile = function (a, b, c) {
        if (b && _typeof(b) === 'object' ? (c = b, b = null) : b && typeof b === 'function' || (b = null), b) return e.Util.fetch(typeof a === 'string' ? a : a.root + '/' + a.file, function (d) {
          if (d === null) return b(Error('Failed to fetch file')), void 0;

          try {
            b(null, e.loadJson(JSON.parse(d), c, a));
          } catch (f) {
            b(f);
          }
        });
        var d = e.Util.fetch(_typeof(a) === 'object' ? a.root + '/' + a.file : a);
        return d === null ? null : e.loadJson(JSON.parse(d), c, a);
      }, h = a, i = e.loadProto(h, void 0, '').build('Modules').probuf;
    }(d, c);

    return e;
  }

  var Codec$1 = protobuf(SSMsg$1);

  Codec$1.getModule = function (pbName) {
    var _this11 = this;

    _newArrowCheck(this, _this);

    var modules = new Codec$1[pbName]();

    modules.getArrayData = function () {
      _newArrowCheck(this, _this11);

      var data = modules.toArrayBuffer();
      data = isArrayBuffer(data) ? [].slice.call(new Int8Array(data)) : data;
      return data;
    }.bind(this);

    return modules;
  }.bind(undefined);

  var ErrorCode;

  (function (ErrorCode) {
    ErrorCode[ErrorCode["TIMEOUT"] = -1] = "TIMEOUT";
    ErrorCode[ErrorCode["UNKNOWN"] = -2] = "UNKNOWN";
    ErrorCode[ErrorCode["PARAMETER_ERROR"] = -3] = "PARAMETER_ERROR";
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["RC_MSG_UNAUTHORIZED"] = 20406] = "RC_MSG_UNAUTHORIZED";
    ErrorCode[ErrorCode["RC_DISCUSSION_GROUP_ID_INVALID"] = 20407] = "RC_DISCUSSION_GROUP_ID_INVALID";
    ErrorCode[ErrorCode["SEND_FREQUENCY_TOO_FAST"] = 20604] = "SEND_FREQUENCY_TOO_FAST";
    ErrorCode[ErrorCode["NOT_IN_DISCUSSION"] = 21406] = "NOT_IN_DISCUSSION";
    ErrorCode[ErrorCode["FORBIDDEN_IN_GROUP"] = 22408] = "FORBIDDEN_IN_GROUP";
    ErrorCode[ErrorCode["RECALL_MESSAGE"] = 25101] = "RECALL_MESSAGE";
    ErrorCode[ErrorCode["NOT_IN_GROUP"] = 22406] = "NOT_IN_GROUP";
    ErrorCode[ErrorCode["NOT_IN_CHATROOM"] = 23406] = "NOT_IN_CHATROOM";
    ErrorCode[ErrorCode["FORBIDDEN_IN_CHATROOM"] = 23408] = "FORBIDDEN_IN_CHATROOM";
    ErrorCode[ErrorCode["RC_CHATROOM_USER_KICKED"] = 23409] = "RC_CHATROOM_USER_KICKED";
    ErrorCode[ErrorCode["RC_CHATROOM_NOT_EXIST"] = 23410] = "RC_CHATROOM_NOT_EXIST";
    ErrorCode[ErrorCode["RC_CHATROOM_IS_FULL"] = 23411] = "RC_CHATROOM_IS_FULL";
    ErrorCode[ErrorCode["RC_CHATROOM_PATAMETER_INVALID"] = 23412] = "RC_CHATROOM_PATAMETER_INVALID";
    ErrorCode[ErrorCode["CHATROOM_GET_HISTORYMSG_ERROR"] = 23413] = "CHATROOM_GET_HISTORYMSG_ERROR";
    ErrorCode[ErrorCode["CHATROOM_NOT_OPEN_HISTORYMSG_STORE"] = 23414] = "CHATROOM_NOT_OPEN_HISTORYMSG_STORE";
    ErrorCode[ErrorCode["CHATROOM_KV_EXCEED"] = 23423] = "CHATROOM_KV_EXCEED";
    ErrorCode[ErrorCode["CHATROOM_KV_OVERWRITE_INVALID"] = 23424] = "CHATROOM_KV_OVERWRITE_INVALID";
    ErrorCode[ErrorCode["CHATROOM_KV_STORE_NOT_OPEN"] = 23426] = "CHATROOM_KV_STORE_NOT_OPEN";
    ErrorCode[ErrorCode["CHATROOM_KEY_NOT_EXIST"] = 23427] = "CHATROOM_KEY_NOT_EXIST";
    ErrorCode[ErrorCode["SENSITIVE_SHIELD"] = 21501] = "SENSITIVE_SHIELD";
    ErrorCode[ErrorCode["SENSITIVE_REPLACE"] = 21502] = "SENSITIVE_REPLACE";
    ErrorCode[ErrorCode["JOIN_IN_DISCUSSION"] = 21407] = "JOIN_IN_DISCUSSION";
    ErrorCode[ErrorCode["CREATE_DISCUSSION"] = 21408] = "CREATE_DISCUSSION";
    ErrorCode[ErrorCode["INVITE_DICUSSION"] = 21409] = "INVITE_DICUSSION";
    ErrorCode[ErrorCode["GET_USERINFO_ERROR"] = 23407] = "GET_USERINFO_ERROR";
    ErrorCode[ErrorCode["REJECTED_BY_BLACKLIST"] = 405] = "REJECTED_BY_BLACKLIST";
    ErrorCode[ErrorCode["RC_NET_CHANNEL_INVALID"] = 30001] = "RC_NET_CHANNEL_INVALID";
    ErrorCode[ErrorCode["RC_NET_UNAVAILABLE"] = 30002] = "RC_NET_UNAVAILABLE";
    ErrorCode[ErrorCode["RC_MSG_RESP_TIMEOUT"] = 30003] = "RC_MSG_RESP_TIMEOUT";
    ErrorCode[ErrorCode["RC_HTTP_SEND_FAIL"] = 30004] = "RC_HTTP_SEND_FAIL";
    ErrorCode[ErrorCode["RC_HTTP_REQ_TIMEOUT"] = 30005] = "RC_HTTP_REQ_TIMEOUT";
    ErrorCode[ErrorCode["RC_HTTP_RECV_FAIL"] = 30006] = "RC_HTTP_RECV_FAIL";
    ErrorCode[ErrorCode["RC_NAVI_RESOURCE_ERROR"] = 30007] = "RC_NAVI_RESOURCE_ERROR";
    ErrorCode[ErrorCode["RC_NODE_NOT_FOUND"] = 30008] = "RC_NODE_NOT_FOUND";
    ErrorCode[ErrorCode["RC_DOMAIN_NOT_RESOLVE"] = 30009] = "RC_DOMAIN_NOT_RESOLVE";
    ErrorCode[ErrorCode["RC_SOCKET_NOT_CREATED"] = 30010] = "RC_SOCKET_NOT_CREATED";
    ErrorCode[ErrorCode["RC_SOCKET_DISCONNECTED"] = 30011] = "RC_SOCKET_DISCONNECTED";
    ErrorCode[ErrorCode["RC_PING_SEND_FAIL"] = 30012] = "RC_PING_SEND_FAIL";
    ErrorCode[ErrorCode["RC_PONG_RECV_FAIL"] = 30013] = "RC_PONG_RECV_FAIL";
    ErrorCode[ErrorCode["RC_MSG_SEND_FAIL"] = 30014] = "RC_MSG_SEND_FAIL";
    ErrorCode[ErrorCode["RC_MSG_CONTENT_EXCEED_LIMIT"] = 30016] = "RC_MSG_CONTENT_EXCEED_LIMIT";
    ErrorCode[ErrorCode["RC_CONN_ACK_TIMEOUT"] = 31000] = "RC_CONN_ACK_TIMEOUT";
    ErrorCode[ErrorCode["RC_CONN_PROTO_VERSION_ERROR"] = 31001] = "RC_CONN_PROTO_VERSION_ERROR";
    ErrorCode[ErrorCode["RC_CONN_ID_REJECT"] = 31002] = "RC_CONN_ID_REJECT";
    ErrorCode[ErrorCode["RC_CONN_SERVER_UNAVAILABLE"] = 31003] = "RC_CONN_SERVER_UNAVAILABLE";
    ErrorCode[ErrorCode["RC_CONN_USER_OR_PASSWD_ERROR"] = 31004] = "RC_CONN_USER_OR_PASSWD_ERROR";
    ErrorCode[ErrorCode["RC_CONN_NOT_AUTHRORIZED"] = 31005] = "RC_CONN_NOT_AUTHRORIZED";
    ErrorCode[ErrorCode["RC_CONN_REDIRECTED"] = 31006] = "RC_CONN_REDIRECTED";
    ErrorCode[ErrorCode["RC_CONN_PACKAGE_NAME_INVALID"] = 31007] = "RC_CONN_PACKAGE_NAME_INVALID";
    ErrorCode[ErrorCode["RC_CONN_APP_BLOCKED_OR_DELETED"] = 31008] = "RC_CONN_APP_BLOCKED_OR_DELETED";
    ErrorCode[ErrorCode["RC_CONN_USER_BLOCKED"] = 31009] = "RC_CONN_USER_BLOCKED";
    ErrorCode[ErrorCode["RC_DISCONN_KICK"] = 31010] = "RC_DISCONN_KICK";
    ErrorCode[ErrorCode["RC_DISCONN_EXCEPTION"] = 31011] = "RC_DISCONN_EXCEPTION";
    ErrorCode[ErrorCode["RC_QUERY_ACK_NO_DATA"] = 32001] = "RC_QUERY_ACK_NO_DATA";
    ErrorCode[ErrorCode["RC_MSG_DATA_INCOMPLETE"] = 32002] = "RC_MSG_DATA_INCOMPLETE";
    ErrorCode[ErrorCode["BIZ_ERROR_CLIENT_NOT_INIT"] = 33001] = "BIZ_ERROR_CLIENT_NOT_INIT";
    ErrorCode[ErrorCode["BIZ_ERROR_DATABASE_ERROR"] = 33002] = "BIZ_ERROR_DATABASE_ERROR";
    ErrorCode[ErrorCode["BIZ_ERROR_INVALID_PARAMETER"] = 33003] = "BIZ_ERROR_INVALID_PARAMETER";
    ErrorCode[ErrorCode["BIZ_ERROR_NO_CHANNEL"] = 33004] = "BIZ_ERROR_NO_CHANNEL";
    ErrorCode[ErrorCode["BIZ_ERROR_RECONNECT_SUCCESS"] = 33005] = "BIZ_ERROR_RECONNECT_SUCCESS";
    ErrorCode[ErrorCode["BIZ_ERROR_CONNECTING"] = 33006] = "BIZ_ERROR_CONNECTING";
    ErrorCode[ErrorCode["MSG_ROAMING_SERVICE_UNAVAILABLE"] = 33007] = "MSG_ROAMING_SERVICE_UNAVAILABLE";
    ErrorCode[ErrorCode["MSG_INSERT_ERROR"] = 33008] = "MSG_INSERT_ERROR";
    ErrorCode[ErrorCode["MSG_DEL_ERROR"] = 33009] = "MSG_DEL_ERROR";
    ErrorCode[ErrorCode["CONVER_REMOVE_ERROR"] = 34001] = "CONVER_REMOVE_ERROR";
    ErrorCode[ErrorCode["CONVER_GETLIST_ERROR"] = 34002] = "CONVER_GETLIST_ERROR";
    ErrorCode[ErrorCode["CONVER_SETOP_ERROR"] = 34003] = "CONVER_SETOP_ERROR";
    ErrorCode[ErrorCode["CONVER_TOTAL_UNREAD_ERROR"] = 34004] = "CONVER_TOTAL_UNREAD_ERROR";
    ErrorCode[ErrorCode["CONVER_TYPE_UNREAD_ERROR"] = 34005] = "CONVER_TYPE_UNREAD_ERROR";
    ErrorCode[ErrorCode["CONVER_ID_TYPE_UNREAD_ERROR"] = 34006] = "CONVER_ID_TYPE_UNREAD_ERROR";
    ErrorCode[ErrorCode["CONVER_CLEAR_ERROR"] = 34007] = "CONVER_CLEAR_ERROR";
    ErrorCode[ErrorCode["EXPANSION_LIMIT_EXCEET"] = 34010] = "EXPANSION_LIMIT_EXCEET";
    ErrorCode[ErrorCode["MESSAGE_KV_NOT_SUPPORT"] = 34008] = "MESSAGE_KV_NOT_SUPPORT";
    ErrorCode[ErrorCode["CLEAR_HIS_TIME_ERROR"] = 34011] = "CLEAR_HIS_TIME_ERROR";
    ErrorCode[ErrorCode["CONVER_GET_ERROR"] = 34009] = "CONVER_GET_ERROR";
    ErrorCode[ErrorCode["GROUP_SYNC_ERROR"] = 35001] = "GROUP_SYNC_ERROR";
    ErrorCode[ErrorCode["GROUP_MATCH_ERROR"] = 35002] = "GROUP_MATCH_ERROR";
    ErrorCode[ErrorCode["CHATROOM_ID_ISNULL"] = 36001] = "CHATROOM_ID_ISNULL";
    ErrorCode[ErrorCode["CHARTOOM_JOIN_ERROR"] = 36002] = "CHARTOOM_JOIN_ERROR";
    ErrorCode[ErrorCode["CHATROOM_HISMESSAGE_ERROR"] = 36003] = "CHATROOM_HISMESSAGE_ERROR";
    ErrorCode[ErrorCode["CHATROOM_KV_NOT_FOUND"] = 36004] = "CHATROOM_KV_NOT_FOUND";
    ErrorCode[ErrorCode["BLACK_ADD_ERROR"] = 37001] = "BLACK_ADD_ERROR";
    ErrorCode[ErrorCode["BLACK_GETSTATUS_ERROR"] = 37002] = "BLACK_GETSTATUS_ERROR";
    ErrorCode[ErrorCode["BLACK_REMOVE_ERROR"] = 37003] = "BLACK_REMOVE_ERROR";
    ErrorCode[ErrorCode["DRAF_GET_ERROR"] = 38001] = "DRAF_GET_ERROR";
    ErrorCode[ErrorCode["DRAF_SAVE_ERROR"] = 38002] = "DRAF_SAVE_ERROR";
    ErrorCode[ErrorCode["DRAF_REMOVE_ERROR"] = 38003] = "DRAF_REMOVE_ERROR";
    ErrorCode[ErrorCode["SUBSCRIBE_ERROR"] = 39001] = "SUBSCRIBE_ERROR";
    ErrorCode[ErrorCode["QNTKN_FILETYPE_ERROR"] = 41001] = "QNTKN_FILETYPE_ERROR";
    ErrorCode[ErrorCode["QNTKN_GET_ERROR"] = 41002] = "QNTKN_GET_ERROR";
    ErrorCode[ErrorCode["COOKIE_ENABLE"] = 51001] = "COOKIE_ENABLE";
    ErrorCode[ErrorCode["GET_MESSAGE_BY_ID_ERROR"] = 61001] = "GET_MESSAGE_BY_ID_ERROR";
    ErrorCode[ErrorCode["HAVNODEVICEID"] = 24001] = "HAVNODEVICEID";
    ErrorCode[ErrorCode["DEVICEIDISHAVE"] = 24002] = "DEVICEIDISHAVE";
    ErrorCode[ErrorCode["FEILD"] = 24009] = "FEILD";
    ErrorCode[ErrorCode["VOIPISNULL"] = 24013] = "VOIPISNULL";
    ErrorCode[ErrorCode["NOENGINETYPE"] = 24010] = "NOENGINETYPE";
    ErrorCode[ErrorCode["NULLCHANNELNAME"] = 24011] = "NULLCHANNELNAME";
    ErrorCode[ErrorCode["VOIPDYANMICERROR"] = 24012] = "VOIPDYANMICERROR";
    ErrorCode[ErrorCode["NOVOIP"] = 24014] = "NOVOIP";
    ErrorCode[ErrorCode["INTERNALERRROR"] = 24015] = "INTERNALERRROR";
    ErrorCode[ErrorCode["VOIPCLOSE"] = 24016] = "VOIPCLOSE";
    ErrorCode[ErrorCode["CLOSE_BEFORE_OPEN"] = 51001] = "CLOSE_BEFORE_OPEN";
    ErrorCode[ErrorCode["ALREADY_IN_USE"] = 51002] = "ALREADY_IN_USE";
    ErrorCode[ErrorCode["INVALID_CHANNEL_NAME"] = 51003] = "INVALID_CHANNEL_NAME";
    ErrorCode[ErrorCode["VIDEO_CONTAINER_IS_NULL"] = 51004] = "VIDEO_CONTAINER_IS_NULL";
    ErrorCode[ErrorCode["DELETE_MESSAGE_ID_IS_NULL"] = 61001] = "DELETE_MESSAGE_ID_IS_NULL";
    ErrorCode[ErrorCode["CANCEL"] = 1] = "CANCEL";
    ErrorCode[ErrorCode["REJECT"] = 2] = "REJECT";
    ErrorCode[ErrorCode["HANGUP"] = 3] = "HANGUP";
    ErrorCode[ErrorCode["BUSYLINE"] = 4] = "BUSYLINE";
    ErrorCode[ErrorCode["NO_RESPONSE"] = 5] = "NO_RESPONSE";
    ErrorCode[ErrorCode["ENGINE_UN_SUPPORTED"] = 6] = "ENGINE_UN_SUPPORTED";
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 7] = "NETWORK_ERROR";
    ErrorCode[ErrorCode["REMOTE_CANCEL"] = 11] = "REMOTE_CANCEL";
    ErrorCode[ErrorCode["REMOTE_REJECT"] = 12] = "REMOTE_REJECT";
    ErrorCode[ErrorCode["REMOTE_HANGUP"] = 13] = "REMOTE_HANGUP";
    ErrorCode[ErrorCode["REMOTE_BUSYLINE"] = 14] = "REMOTE_BUSYLINE";
    ErrorCode[ErrorCode["REMOTE_NO_RESPONSE"] = 15] = "REMOTE_NO_RESPONSE";
    ErrorCode[ErrorCode["REMOTE_ENGINE_UN_SUPPORTED"] = 16] = "REMOTE_ENGINE_UN_SUPPORTED";
    ErrorCode[ErrorCode["REMOTE_NETWORK_ERROR"] = 17] = "REMOTE_NETWORK_ERROR";
    ErrorCode[ErrorCode["VOIP_NOT_AVALIABLE"] = 18] = "VOIP_NOT_AVALIABLE";
  })(ErrorCode || (ErrorCode = {}));

  var ErrorCode$1 = ErrorCode;

  var timerSetTimeout = function timerSetTimeout(fun, itv) {
    _newArrowCheck(this, _this);

    return setTimeout(fun, itv);
  }.bind(undefined);

  var int64ToTimestamp = function int64ToTimestamp(obj) {
    _newArrowCheck(this, _this);

    if (!isObject(obj) || obj.low === undefined || obj.high === undefined) {
      return obj;
    }

    var low = obj.low;

    if (low < 0) {
      low += 0xffffffff + 1;
    }

    low = low.toString(16);
    var timestamp = parseInt(obj.high.toString(16) + '00000000'.replace(new RegExp('0{' + low.length + '}$'), low), 16);
    return timestamp;
  }.bind(undefined);

  var batchInt64ToTimestamp = function batchInt64ToTimestamp(data) {
    _newArrowCheck(this, _this);

    for (var _key8 in data) {
      if (isObject(data[_key8])) {
        data[_key8] = int64ToTimestamp(data[_key8]);
      }
    }

    return data;
  }.bind(undefined);

  var formatDate = function formatDate(seperator) {
    _newArrowCheck(this, _this);

    seperator = seperator || '-';
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return "".concat(year).concat(seperator).concat(month).concat(seperator).concat(day);
  }.bind(undefined);

  var MentionedType;

  (function (MentionedType) {
    MentionedType[MentionedType["ALL"] = 1] = "ALL";
    MentionedType[MentionedType["SINGAL"] = 2] = "SINGAL";
  })(MentionedType || (MentionedType = {}));

  var MentionedType$1 = MentionedType;
  var MessageType;

  (function (MessageType) {
    MessageType["TextMessage"] = "RC:TxtMsg";
    MessageType["VOICE"] = "RC:VcMsg";
    MessageType["HQ_VOICE"] = "RC:HQVCMsg";
    MessageType["IMAGE"] = "RC:ImgMsg";
    MessageType["GIF"] = "RC:GIFMsg";
    MessageType["RICH_CONTENT"] = "RC:ImgTextMsg";
    MessageType["LOCATION"] = "RC:LBSMsg";
    MessageType["FILE"] = "RC:FileMsg";
    MessageType["SIGHT"] = "RC:SightMsg";
    MessageType["COMBINE"] = "RC:CombineMsg";
    MessageType["CHRM_KV_NOTIFY"] = "RC:chrmKVNotiMsg";
    MessageType["LOG_COMMAND"] = "RC:LogCmdMsg";
    MessageType["EXPANSION_NOTIFY"] = "RC:MsgExMsg";
    MessageType["REFERENCE"] = "RC:ReferenceMsg";
    MessageType["RECALL"] = "RC:RcCmd";
    MessageType["READ_RECEIPT"] = "RC:ReadNtf";
    MessageType["READ_RECEIPT_REQUEST"] = "RC:RRReqMsg";
    MessageType["READ_RECEIPT_RESPONSE"] = "RC:RRRspMsg";
    MessageType["SYNC_READ_STATUS"] = "RC:SRSMsg";
  })(MessageType || (MessageType = {}));

  var MessageType$1 = MessageType;
  var NotificationStatus;

  (function (NotificationStatus) {
    NotificationStatus[NotificationStatus["OPEN"] = 1] = "OPEN";
    NotificationStatus[NotificationStatus["CLOSE"] = 2] = "CLOSE";
  })(NotificationStatus || (NotificationStatus = {}));

  var NotificationStatus$1 = NotificationStatus;
  var PublishTopic = {
    PRIVATE: 'ppMsgP',
    GROUP: 'pgMsgP',
    CHATROOM: 'chatMsg',
    CUSTOMER_SERVICE: 'pcMsgP',
    RECALL: 'recallMsg',
    RTC_MSG: 'prMsgS',
    NOTIFY_PULL_MSG: 's_ntf',
    RECEIVE_MSG: 's_msg',
    SYNC_STATUS: 's_stat',
    SERVER_NOTIFY: 's_cmd',
    SETTING_NOTIFY: 's_us'
  };
  var PublishStatusTopic = {
    PRIVATE: 'ppMsgS',
    GROUP: 'pgMsgS',
    CHATROOM: 'chatMsgS'
  };
  var QueryTopic = {
    GET_SYNC_TIME: 'qrySessionsAtt',
    PULL_MSG: 'pullMsg',
    GET_CONVERSATION_LIST: 'qrySessions',
    REMOVE_CONVERSATION_LIST: 'delSessions',
    DELETE_MESSAGES: 'delMsg',
    CLEAR_UNREAD_COUNT: 'updRRTime',
    PULL_USER_SETTING: 'pullUS',
    PULL_CHRM_MSG: 'chrmPull',
    JOIN_CHATROOM: 'joinChrm',
    JOIN_EXIST_CHATROOM: 'joinChrmR',
    QUIT_CHATROOM: 'exitChrm',
    GET_CHATROOM_INFO: 'queryChrmI',
    UPDATE_CHATROOM_KV: 'setKV',
    DELETE_CHATROOM_KV: 'delKV',
    PULL_CHATROOM_KV: 'pullKV',
    GET_OLD_CONVERSATION_LIST: 'qryRelationR',
    REMOVE_OLD_CONVERSATION: 'delRelation',
    GET_CONVERSATION_STATUS: 'pullSeAtts',
    SET_CONVERSATION_STATUS: 'setSeAtt',
    GET_UPLOAD_FILE_TOKEN: 'qnTkn',
    GET_UPLOAD_FILE_URL: 'qnUrl',
    CLEAR_MESSAGES: {
      PRIVATE: 'cleanPMsg',
      GROUP: 'cleanGMsg',
      CUSTOMER_SERVICE: 'cleanCMsg',
      SYSTEM: 'cleanSMsg'
    },
    JOIN_RTC_ROOM: 'rtcRJoin_data',
    QUIT_RTC_ROOM: 'rtcRExit',
    PING_RTC: 'rtcPing',
    SET_RTC_DATA: 'rtcSetData',
    USER_SET_RTC_DATA: 'userSetData',
    GET_RTC_DATA: 'rtcQryData',
    DEL_RTC_DATA: 'rtcDelData',
    SET_RTC_OUT_DATA: 'rtcSetOutData',
    GET_RTC_OUT_DATA: 'rtcQryUserOutData',
    GET_RTC_TOKEN: 'rtcToken',
    SET_RTC_STATE: 'rtcUserState',
    GET_RTC_ROOM_INFO: 'rtcRInfo',
    GET_RTC_USER_INFO_LIST: 'rtcUData',
    SET_RTC_USER_INFO: 'rtcUPut',
    DEL_RTC_USER_INFO: 'rtcUDel',
    GET_RTC_USER_LIST: 'rtcUList'
  };
  var QueryHistoryTopic = {
    PRIVATE: 'qryPMsg',
    GROUP: 'qryGMsg',
    CHATROOM: 'qryCHMsg',
    CUSTOMER_SERVICE: 'qryCMsg',
    SYSTEM: 'qrySMsg'
  };
  var PublishTopicToConversationType = (_PublishTopicToConver = {}, _defineProperty(_PublishTopicToConver, PublishTopic.PRIVATE, ConversationType$1.PRIVATE), _defineProperty(_PublishTopicToConver, PublishTopic.GROUP, ConversationType$1.GROUP), _defineProperty(_PublishTopicToConver, PublishTopic.CHATROOM, ConversationType$1.CHATROOM), _defineProperty(_PublishTopicToConver, PublishTopic.CUSTOMER_SERVICE, ConversationType$1.CUSTOMER_SERVICE), _PublishTopicToConver);
  var ConversationTypeToQueryHistoryTopic = (_ConversationTypeToQu = {}, _defineProperty(_ConversationTypeToQu, ConversationType$1.PRIVATE, QueryHistoryTopic.PRIVATE), _defineProperty(_ConversationTypeToQu, ConversationType$1.GROUP, QueryHistoryTopic.GROUP), _defineProperty(_ConversationTypeToQu, ConversationType$1.CHATROOM, QueryHistoryTopic.CHATROOM), _defineProperty(_ConversationTypeToQu, ConversationType$1.CUSTOMER_SERVICE, QueryHistoryTopic.CUSTOMER_SERVICE), _defineProperty(_ConversationTypeToQu, ConversationType$1.SYSTEM, QueryHistoryTopic.SYSTEM), _ConversationTypeToQu);
  var ConversationTypeToClearMessageTopic = (_ConversationTypeToCl = {}, _defineProperty(_ConversationTypeToCl, ConversationType$1.PRIVATE, QueryTopic.CLEAR_MESSAGES.PRIVATE), _defineProperty(_ConversationTypeToCl, ConversationType$1.GROUP, QueryTopic.CLEAR_MESSAGES.GROUP), _defineProperty(_ConversationTypeToCl, ConversationType$1.CUSTOMER_SERVICE, QueryTopic.CLEAR_MESSAGES.CUSTOMER_SERVICE), _defineProperty(_ConversationTypeToCl, ConversationType$1.SYSTEM, QueryTopic.CLEAR_MESSAGES.SYSTEM), _ConversationTypeToCl);
  var ConversationStatusConfig = {
    ENABLED: '1',
    DISABLED: '0'
  };
  var ConversationStatusType = {
    DO_NOT_DISTURB: 1,
    TOP: 2
  };
  var MessageDirection;

  (function (MessageDirection) {
    MessageDirection[MessageDirection["SEND"] = 1] = "SEND";
    MessageDirection[MessageDirection["RECEIVE"] = 2] = "RECEIVE";
  })(MessageDirection || (MessageDirection = {}));

  var MessageDirection$1 = MessageDirection;

  var DataCodec = function () {
    function DataCodec(connectType) {
      _classCallCheck(this, DataCodec);

      this._codec = connectType === 'websocket' ? Codec$1 : Codec;
      this._connectType = connectType;
    }

    _createClass(DataCodec, [{
      key: "decodeByPBName",
      value: function decodeByPBName(data, pbName, option) {
        var _formatEventMap;

        var self = this;
        var formatEventMap = (_formatEventMap = {}, _defineProperty(_formatEventMap, PBName.DownStreamMessages, self._formatSyncMessages), _defineProperty(_formatEventMap, PBName.DownStreamMessage, self._formatReceivedMessage), _defineProperty(_formatEventMap, PBName.UpStreamMessage, self._formatSentMessage), _defineProperty(_formatEventMap, PBName.HistoryMsgOuput, self._formatHistoryMessages), _defineProperty(_formatEventMap, PBName.RelationsOutput, self._formatConversationList), _defineProperty(_formatEventMap, PBName.QueryChatRoomInfoOutput, self._formatChatRoomInfos), _defineProperty(_formatEventMap, PBName.RtcUserListOutput, self._formatRTCUserList), _defineProperty(_formatEventMap, PBName.RtcQryOutput, self._formatRTCData), _defineProperty(_formatEventMap, PBName.ChrmKVOutput, self._formatChatRoomKVList), _defineProperty(_formatEventMap, PBName.PullUserSettingOutput, self._formatUserSetting), _defineProperty(_formatEventMap, PBName.SessionStates, self._formatConversationStatus), _formatEventMap);
        var decodedData = data;
        var formatEvent = formatEventMap[pbName];

        try {
          var hasData = data.length > 0;
          decodedData = hasData && self._codec[pbName].decode(data);

          if (isObject(decodedData)) {
            decodedData = batchInt64ToTimestamp(decodedData);
          }

          if (isFunction(formatEvent)) {
            decodedData = formatEvent.call(this, decodedData, option);
          }
        } catch (e) {
          logger.error('PB parse error\n', e);
        }

        return decodedData;
      }
    }, {
      key: "_readBytes",
      value: function _readBytes(content) {
        var offset = content.offset,
            buffer = content.buffer,
            limit = content.limit;

        if (offset) {
          try {
            var _content = isArrayBuffer(buffer) ? new Uint8Array(buffer) : buffer;

            return BinaryHelper.readUTF(_content.subarray(offset, limit));
          } catch (e) {
            logger.info('readBytes error\n', e);
          }
        }

        return content;
      }
    }, {
      key: "_formatBytes",
      value: function _formatBytes(content) {
        var formatRes = this._readBytes(content);

        try {
          formatRes = JSON.parse(formatRes);
        } catch (e) {
          logger.info('formatBytes error\n', e);
        }

        return formatRes || content;
      }
    }, {
      key: "_formatSyncMessages",
      value: function _formatSyncMessages(data, option) {
        var _this12 = this;

        option = option || {};
        var self = this;
        var list = data.list,
            syncTime = data.syncTime,
            finished = data.finished;

        if (isUndefined(finished) || finished === null) {
          data.finished = true;
        }

        data.syncTime = int64ToTimestamp(syncTime);
        data.list = map(list, function (msgData) {
          _newArrowCheck(this, _this12);

          var message = self._formatReceivedMessage(msgData, option);

          return message;
        }.bind(this));
        return data;
      }
    }, {
      key: "_formatReceivedMessage",
      value: function _formatReceivedMessage(data, option) {
        option = option || {};
        var self = this;
        var _option = option,
            currentUserId = _option.currentUserId,
            connectedTime = _option.connectedTime;
        var content = data.content,
            fromUserId = data.fromUserId,
            type = data.type,
            groupId = data.groupId,
            status = data.status,
            dataTime = data.dataTime,
            messageType = data.classname,
            messageUId = data.msgId,
            extraContent = data.extraContent;
        var direction = data.direction || MessageDirection$1.RECEIVE;
        var isSelfSend = direction === MessageDirection$1.SEND;

        var _getMessageOptionBySt = getMessageOptionByStatus(status),
            isPersited = _getMessageOptionBySt.isPersited,
            isCounted = _getMessageOptionBySt.isCounted,
            isMentioned = _getMessageOptionBySt.isMentioned,
            disableNotification = _getMessageOptionBySt.disableNotification,
            receivedStatus = _getMessageOptionBySt.receivedStatus,
            canIncludeExpansion = _getMessageOptionBySt.canIncludeExpansion;

        var targetId = type === ConversationType$1.GROUP || type === ConversationType$1.CHATROOM ? groupId : fromUserId;
        var senderUserId = isSelfSend ? currentUserId : fromUserId;
        var sentTime = int64ToTimestamp(dataTime);
        var isOffLineMessage = sentTime < connectedTime;
        var isChatRoomMsg = type === ConversationType$1.CHATROOM;

        var utfContent = self._formatBytes(content);

        var messageDirection = isSelfSend ? MessageDirection$1.SEND : MessageDirection$1.RECEIVE;

        if (isChatRoomMsg && fromUserId === currentUserId) {
          messageDirection = MessageDirection$1.SEND;
        }

        var expansion;

        if (extraContent) {
          expansion = {};
          expansion = formatExtraContent(extraContent);
        }

        return {
          conversationType: type,
          targetId: targetId,
          senderUserId: senderUserId,
          messageType: messageType,
          messageUId: messageUId,
          isPersited: isPersited,
          isCounted: isCounted,
          isMentioned: isMentioned,
          sentTime: sentTime,
          isOffLineMessage: isOffLineMessage,
          messageDirection: messageDirection,
          receivedTime: DelayTimer.getTime(),
          disableNotification: disableNotification,
          receivedStatus: receivedStatus,
          canIncludeExpansion: canIncludeExpansion,
          content: utfContent,
          expansion: expansion
        };
      }
    }, {
      key: "_formatSentMessage",
      value: function _formatSentMessage(data, option) {
        var self = this;
        var content = data.content,
            messageType = data.classname,
            sessionId = data.sessionId,
            messageUId = data.msgId,
            extraContent = data.extraContent;
        var signal = option.signal,
            currentUserId = option.currentUserId;
        var date = signal.date,
            topic = signal.topic,
            targetId = signal.targetId;

        var _getUpMessageOptionBy = getUpMessageOptionBySessionId(sessionId),
            isPersited = _getUpMessageOptionBy.isPersited,
            isCounted = _getUpMessageOptionBy.isCounted,
            disableNotification = _getUpMessageOptionBy.disableNotification,
            canIncludeExpansion = _getUpMessageOptionBy.canIncludeExpansion;

        var type = PublishTopicToConversationType[topic] || ConversationType$1.PRIVATE;
        var isStatusMessage = isInObject(PublishStatusTopic, topic);
        var expansion;

        if (extraContent) {
          expansion = {};
          expansion = formatExtraContent(extraContent);
        }

        return {
          conversationType: type,
          targetId: targetId,
          messageType: messageType,
          messageUId: messageUId,
          isPersited: isPersited,
          isCounted: isCounted,
          isStatusMessage: isStatusMessage,
          senderUserId: currentUserId,
          content: self._formatBytes(content),
          sentTime: date * 1000,
          receivedTime: DelayTimer.getTime(),
          messageDirection: MessageDirection$1.SEND,
          isOffLineMessage: false,
          disableNotification: disableNotification,
          canIncludeExpansion: canIncludeExpansion,
          expansion: expansion
        };
      }
    }, {
      key: "_formatHistoryMessages",
      value: function _formatHistoryMessages(data, option) {
        var _this13 = this;

        var conversation = option.conversation || {};
        var msgList = data.list,
            hasMsg = data.hasMsg;
        var targetId = conversation.targetId;
        var syncTime = int64ToTimestamp(data.syncTime);
        var list = [];
        forEach(msgList, function (msgData) {
          _newArrowCheck(this, _this13);

          var msg = this._formatReceivedMessage(msgData, option);

          msg.targetId = targetId;
          list.push(msg);
        }.bind(this), {
          isReverse: true
        });
        return {
          syncTime: syncTime,
          list: list,
          hasMore: !!hasMsg
        };
      }
    }, {
      key: "_formatConversationList",
      value: function _formatConversationList(serverData, option) {
        var _this14 = this;

        var self = this;
        var conversationList = serverData.info;

        var afterDecode = option.afterDecode || function () {};

        conversationList = map(conversationList, function (serverConversation) {
          _newArrowCheck(this, _this14);

          var msg = serverConversation.msg,
              userId = serverConversation.userId,
              type = serverConversation.type,
              unreadCount = serverConversation.unreadCount;

          var latestMessage = self._formatReceivedMessage(msg, option);

          latestMessage.targetId = userId;
          var conversation = {
            targetId: userId,
            conversationType: type,
            unreadMessageCount: unreadCount,
            latestMessage: latestMessage
          };
          return afterDecode(conversation) || conversation;
        }.bind(this));
        return conversationList || [];
      }
    }, {
      key: "_formatChatRoomInfos",
      value: function _formatChatRoomInfos(data) {
        var _this15 = this;

        var userTotalNums = data.userTotalNums,
            userInfos = data.userInfos;
        var chrmInfos = map(userInfos, function (user) {
          _newArrowCheck(this, _this15);

          var id = user.id,
              time = user.time;
          var timestamp = int64ToTimestamp(time);
          return {
            id: id,
            time: timestamp
          };
        }.bind(this));
        return {
          userCount: userTotalNums,
          userInfos: chrmInfos
        };
      }
    }, {
      key: "_formatChatRoomKVList",
      value: function _formatChatRoomKVList(data) {
        var _this16 = this;

        var kvEntries = data.entries,
            isFullUpdate = data.bFullUpdate,
            syncTime = data.syncTime;
        kvEntries = kvEntries || [];
        kvEntries = map(kvEntries, function (kv) {
          _newArrowCheck(this, _this16);

          var key = kv.key,
              value = kv.value,
              status = kv.status,
              timestamp = kv.timestamp,
              uid = kv.uid;

          var _getChatRoomKVByStatu = getChatRoomKVByStatus(status),
              isAutoDelete = _getChatRoomKVByStatu.isAutoDelete,
              isOverwrite = _getChatRoomKVByStatu.isOverwrite,
              type = _getChatRoomKVByStatu.type;

          return {
            key: key,
            value: value,
            isAutoDelete: isAutoDelete,
            isOverwrite: isOverwrite,
            type: type,
            userId: uid,
            timestamp: int64ToTimestamp(timestamp)
          };
        }.bind(this));
        return {
          kvEntries: kvEntries,
          isFullUpdate: isFullUpdate,
          syncTime: syncTime
        };
      }
    }, {
      key: "_formatUserSetting",
      value: function _formatUserSetting(data) {
        var _this17 = this;

        var items = data.items,
            version = data.version;
        var settings = {};
        forEach(items || [], function (setting) {
          _newArrowCheck(this, _this17);

          var key = setting.key,
              version = setting.version,
              value = setting.value;
          setting.version = int64ToTimestamp(version);
          setting.value = this._readBytes(value);
          settings[key] = setting;
        }.bind(this));
        return {
          settings: settings,
          version: version
        };
      }
    }, {
      key: "_formatConversationStatus",
      value: function _formatConversationStatus(data) {
        var _this18 = this;

        var stateList = data.state;
        var statusList = [];
        forEach(stateList, function (session) {
          var _this19 = this;

          _newArrowCheck(this, _this18);

          var type = session.type,
              targetId = session.channelId,
              updatedTime = session.time,
              stateItem = session.stateItem;
          var notificationStatus = NotificationStatus$1.CLOSE;
          var isTop = false;
          forEach(stateItem, function (item) {
            _newArrowCheck(this, _this19);

            var sessionStateType = item.sessionStateType,
                value = item.value;

            switch (sessionStateType) {
              case ConversationStatusType.DO_NOT_DISTURB:
                notificationStatus = value === ConversationStatusConfig.ENABLED ? NotificationStatus$1.OPEN : NotificationStatus$1.CLOSE;
                break;

              case ConversationStatusType.TOP:
                isTop = value === ConversationStatusConfig.ENABLED;
                break;
            }
          }.bind(this));
          statusList.push({
            type: type,
            targetId: targetId,
            notificationStatus: notificationStatus,
            isTop: isTop,
            updatedTime: int64ToTimestamp(updatedTime)
          });
        }.bind(this));
        return statusList;
      }
    }, {
      key: "_formatRTCUserList",
      value: function _formatRTCUserList(rtcInfos) {
        var _this20 = this;

        var list = rtcInfos.list,
            token = rtcInfos.token,
            sessionId = rtcInfos.sessionId;
        var users = {};
        forEach(list, function (item) {
          var _this21 = this;

          _newArrowCheck(this, _this20);

          var userId = item.userId,
              userData = item.userData;
          var tmpData = {};
          forEach(userData, function (data) {
            _newArrowCheck(this, _this21);

            var key = data.key,
                value = data.value;
            tmpData[key] = value;
          }.bind(this));
          users[userId] = tmpData;
        }.bind(this));
        return {
          users: users,
          token: token,
          sessionId: sessionId
        };
      }
    }, {
      key: "_formatRTCData",
      value: function _formatRTCData(data) {
        var _this22 = this;

        var list = data.outInfo;
        var props = {};
        forEach(list, function (item) {
          _newArrowCheck(this, _this22);

          props[item.key] = item.value;
        }.bind(this));
        return props;
      }
    }, {
      key: "_formatRTCRoomInfo",
      value: function _formatRTCRoomInfo(data) {
        var _this23 = this;

        var id = data.roomId,
            total = data.userCount,
            roomData = data.roomData;
        var room = {
          id: id,
          total: total
        };
        forEach(roomData, function (data) {
          _newArrowCheck(this, _this23);

          room[data.key] = data.value;
        }.bind(this));
        return room;
      }
    }, {
      key: "encodeServerConfParams",
      value: function encodeServerConfParams() {
        var modules = this._codec.getModule(PBName.SessionsAttQryInput);

        modules.setNothing(1);
        return modules.getArrayData();
      }
    }, {
      key: "_getUpMsgModule",
      value: function _getUpMsgModule(conversation, option) {
        var _this24 = this;

        var type = conversation.type;
        var messageType = option.messageType,
            isMentioned = option.isMentioned,
            mentionedType = option.mentionedType,
            mentionedUserIdList = option.mentionedUserIdList,
            content = option.content,
            pushContent = option.pushContent,
            pushData = option.pushData,
            directionalUserIdList = option.directionalUserIdList,
            isFilerWhiteBlacklist = option.isFilerWhiteBlacklist,
            isVoipPush = option.isVoipPush,
            canIncludeExpansion = option.canIncludeExpansion,
            expansion = option.expansion;
        var isGroupType = type === ConversationType$1.GROUP;

        var modules = this._codec.getModule(PBName.UpStreamMessage);

        var sessionId = getSessionId(option);
        var flag = 0;
        modules.setSessionId(sessionId);

        if (isGroupType && isMentioned && content) {
          content.mentionedInfo = {
            userIdList: mentionedUserIdList,
            type: mentionedType || MentionedType$1.ALL
          };
        }

        pushContent && modules.setPushText(pushContent);
        pushData && modules.setAppData(pushData);
        directionalUserIdList && modules.setUserId(directionalUserIdList);
        flag |= isVoipPush ? 0x01 : 0;
        flag |= isFilerWhiteBlacklist ? 0x02 : 0;
        modules.setConfigFlag(flag);
        modules.setClassname(messageType);
        modules.setContent(JSON.stringify(content));

        if (canIncludeExpansion && expansion) {
          var extraContent = {};
          forEach(expansion, function (val, key) {
            _newArrowCheck(this, _this24);

            extraContent[key] = {
              v: val
            };
          }.bind(this));
          modules.setExtraContent(JSON.stringify(extraContent));
        }

        return modules;
      }
    }, {
      key: "encodeUpMsg",
      value: function encodeUpMsg(conversation, option) {
        var modules = this._getUpMsgModule(conversation, option);

        return modules.getArrayData();
      }
    }, {
      key: "encodeSyncMsg",
      value: function encodeSyncMsg(syncMsgArgs) {
        var sendboxTime = syncMsgArgs.sendboxTime,
            inboxTime = syncMsgArgs.inboxTime;

        var modules = this._codec.getModule(PBName.SyncRequestMsg);

        modules.setIspolling(false);
        modules.setIsPullSend(true);
        modules.setSendBoxSyncTime(sendboxTime);
        modules.setSyncTime(inboxTime);
        return modules.getArrayData();
      }
    }, {
      key: "encodeChrmSyncMsg",
      value: function encodeChrmSyncMsg(time, count) {
        time = time || 0;
        count = count || 0;

        var modules = this._codec.getModule(PBName.ChrmPullMsg);

        modules.setCount(count);
        modules.setSyncTime(time);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetHistoryMsg",
      value: function encodeGetHistoryMsg(targetId, option) {
        var count = option.count,
            order = option.order,
            timestamp = option.timestamp;

        var modules = this._codec.getModule(PBName.HistoryMsgInput);

        modules.setTargetId(targetId);
        modules.setTime(timestamp);
        modules.setCount(count);
        modules.setOrder(order);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetConversationList",
      value: function encodeGetConversationList(option) {
        option = option || {};
        var _option2 = option,
            count = _option2.count,
            startTime = _option2.startTime;

        var modules = this._codec.getModule(PBName.RelationQryInput);

        modules.setType(1);
        modules.setCount(count);
        modules.setStartTime(startTime);
        return modules.getArrayData();
      }
    }, {
      key: "encodeOldConversationList",
      value: function encodeOldConversationList(option) {
        option = option || {};
        var _option3 = option,
            count = _option3.count,
            type = _option3.type,
            startTime = _option3.startTime,
            order = _option3.order;
        count = count || 0;
        startTime = startTime || 0;
        order = order || 0;

        var modules = this._codec.getModule(PBName.RelationQryInput);

        modules.setType(type);
        modules.setCount(count);
        modules.setStartTime(startTime);
        modules.setOrder(order);
        return modules.getArrayData();
      }
    }, {
      key: "encodeRemoveConversationList",
      value: function encodeRemoveConversationList(conversationList) {
        var _this25 = this;

        var modules = this._codec.getModule(PBName.DeleteSessionsInput);

        var sessions = [];
        forEach(conversationList, function (conversation) {
          _newArrowCheck(this, _this25);

          var type = conversation.type,
              targetId = conversation.targetId;

          var session = this._codec.getModule(PBName.SessionInfo);

          session.setType(type);
          session.setChannelId(targetId);
          sessions.push(session);
        }.bind(this));
        modules.setSessions(sessions);
        return modules.getArrayData();
      }
    }, {
      key: "encodeDeleteMessages",
      value: function encodeDeleteMessages(conversationType, targetId, list) {
        var _this26 = this;

        var modules = this._codec.getModule(PBName.DeleteMsgInput);

        var encodeMsgs = [];
        forEach(list, function (message) {
          _newArrowCheck(this, _this26);

          encodeMsgs.push({
            msgId: message.messageUId,
            msgDataTime: message.sentTime,
            direct: message.messageDirection
          });
        }.bind(this));
        modules.setType(conversationType);
        modules.setConversationId(targetId);
        modules.setMsgs(encodeMsgs);
        return modules.getArrayData();
      }
    }, {
      key: "encodeClearMessages",
      value: function encodeClearMessages(targetId, timestamp) {
        var modules = this._codec.getModule(PBName.CleanHisMsgInput);

        timestamp = timestamp || new Date().getTime();
        modules.setDataTime(timestamp);
        modules.setTargetId(targetId);
        return modules.getArrayData();
      }
    }, {
      key: "encodeClearUnreadCount",
      value: function encodeClearUnreadCount(conversation, option) {
        var type = conversation.type,
            targetId = conversation.targetId;
        var timestamp = option.timestamp;

        var modules = this._codec.getModule(PBName.SessionMsgReadInput);

        timestamp = timestamp || +new Date();
        modules.setType(type);
        modules.setChannelId(targetId);
        modules.setMsgTime(timestamp);
        return modules.getArrayData();
      }
    }, {
      key: "encodeJoinOrQuitChatRoom",
      value: function encodeJoinOrQuitChatRoom() {
        var modules = this._codec.getModule(PBName.ChrmInput);

        modules.setNothing(1);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetChatRoomInfo",
      value: function encodeGetChatRoomInfo(count, order) {
        var modules = this._codec.getModule(PBName.QueryChatRoomInfoInput);

        modules.setCount(count);
        modules.setOrder(order);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetFileToken",
      value: function encodeGetFileToken(fileType, fileName) {
        var modules = this._codec.getModule(PBName.GetQNupTokenInput);

        modules.setType(fileType);
        modules.setKey(fileName);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetFileUrl",
      value: function encodeGetFileUrl(inputPBName, fileType, fileName, originName) {
        var modules = this._codec.getModule(inputPBName);

        modules.setType(fileType);
        modules.setKey(fileName);

        if (originName) {
          modules.setFileName(originName);
        }

        return modules.getArrayData();
      }
    }, {
      key: "encodeModifyChatRoomKV",
      value: function encodeModifyChatRoomKV(chrmId, entry, currentUserId) {
        var isComet = this._connectType === 'comet';

        var modules = this._codec.getModule(PBName.SetChrmKV);

        var key = entry.key,
            value = entry.value,
            extra = entry.notificationExtra,
            isSendNotification = entry.isSendNotification,
            type = entry.type;
        var action = type || ChatroomEntryType$1.UPDATE;
        var status = getChatRoomKVOptStatus(entry, action);
        var serverEntry = {
          key: key,
          value: value || '',
          uid: currentUserId
        };

        if (!isUndefined(status)) {
          serverEntry.status = status;
        }

        modules.setEntry(serverEntry);

        if (isSendNotification) {
          var conversation = {
            type: ConversationType$1.CHATROOM,
            targetId: chrmId
          };
          var msgContent = {
            key: key,
            value: value,
            extra: extra,
            type: action
          };

          var msgModule = this._getUpMsgModule(conversation, {
            messageType: MessageType$1.CHRM_KV_NOTIFY,
            content: msgContent,
            isPersited: false,
            isCounted: false
          });

          isComet ? modules.setNotification(msgModule.getArrayData()) : modules.setNotification(msgModule);
          modules.setBNotify(true);
          modules.setType(ConversationType$1.CHATROOM);
        }

        return modules.getArrayData();
      }
    }, {
      key: "encodePullChatRoomKV",
      value: function encodePullChatRoomKV(time) {
        var modules = this._codec.getModule(PBName.QueryChrmKV);

        modules.setTimestamp(time);
        return modules.getArrayData();
      }
    }, {
      key: "encodePullUserSetting",
      value: function encodePullUserSetting(version) {
        var modules = this._codec.getModule(PBName.PullUserSettingInput);

        modules.setVersion(version);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetConversationStatus",
      value: function encodeGetConversationStatus(time) {
        var modules = this._codec.getModule(PBName.SessionReq);

        modules.setTime(time);
        return modules.getArrayData();
      }
    }, {
      key: "encodeSetConversationStatus",
      value: function encodeSetConversationStatus(statusList) {
        var _this27 = this;

        var isComet = this._connectType === 'comet';

        var modules = this._codec.getModule(PBName.SessionStateModifyReq);

        var currentTime = DelayTimer.getTime();
        var stateModuleList = [];
        forEach(statusList, function (status) {
          var _this28 = this;

          _newArrowCheck(this, _this27);

          var stateModules = this._codec.getModule(PBName.SessionState);

          var type = status.conversationType,
              targetId = status.targetId,
              notificationStatus = status.notificationStatus,
              isTop = status.isTop;
          var stateItemModuleList = [];
          stateModules.setType(type);
          stateModules.setChannelId(targetId);
          stateModules.setTime(currentTime);
          var isNotDisturb = notificationStatus === NotificationStatus$1.OPEN;
          var TypeToVal = {};

          if (!isUndefined(notificationStatus)) {
            TypeToVal[ConversationStatusType.DO_NOT_DISTURB] = isNotDisturb;
          }

          if (!isUndefined(isTop)) {
            TypeToVal[ConversationStatusType.TOP] = isTop;
          }

          forEach(TypeToVal, function (val, type) {
            _newArrowCheck(this, _this28);

            if (!isUndefined(val)) {
              var stateItemModules = this._codec.getModule(PBName.SessionStateItem);

              val = val ? ConversationStatusConfig.ENABLED : ConversationStatusConfig.DISABLED;
              stateItemModules.setSessionStateType(Number(type));
              stateItemModules.setValue(val);
              var stateItemModulesData = isComet ? stateItemModules.getArrayData() : stateItemModules;
              stateItemModuleList.push(stateItemModulesData);
            }
          }.bind(this));
          stateModules.setStateItem(stateItemModuleList);
          var stateModulesData = isComet ? stateModules.getArrayData() : stateModules;
          stateModuleList.push(stateModulesData);
        }.bind(this));
        modules.setVersion(currentTime);
        modules.setState(stateModuleList);
        return modules.getArrayData();
      }
    }, {
      key: "encodeJoinRTCRoom",
      value: function encodeJoinRTCRoom(mode, broadcastType) {
        var modules = this._codec.getModule(PBName.RtcInput);

        mode = mode || 0;
        modules.setRoomType(mode);
        isUndefined(broadcastType) || modules.setBroadcastType(broadcastType);
        return modules.getArrayData();
      }
    }, {
      key: "encodeQuitRTCRoom",
      value: function encodeQuitRTCRoom() {
        return this._codec.getModule(PBName.SetUserStatusInput).getArrayData();
      }
    }, {
      key: "encodeSetRTCData",
      value: function encodeSetRTCData(key, value, isInner, apiType, message) {
        var modules = this._codec.getModule(PBName.RtcSetDataInput);

        modules.setInterior(isInner);
        modules.setTarget(apiType);
        modules.setKey(key);
        modules.setValue(value);
        message = message || {};
        var _message = message,
            name = _message.name,
            content = _message.content;
        !isUndefined(name) && modules.setObjectName(name);

        if (!isUndefined(content)) {
          if (isObject(content)) {
            content = JSON.stringify(content);
          }

          modules.setContent(content);
        }

        return modules.getArrayData();
      }
    }, {
      key: "encodeUserSetRTCData",
      value: function encodeUserSetRTCData(message, valueInfo, objectName) {
        var modules = this._codec.getModule(PBName.RtcUserSetDataInput);

        modules.setObjectName(objectName);

        var val = this._codec.getModule(PBName.RtcValueInfo);

        val.setKey(message.name);
        val.setValue(message.content);
        modules.setContent(val);
        val = this._codec.getModule(PBName.RtcValueInfo);
        val.setKey('uris');
        val.setValue(valueInfo);
        modules.setValueInfo(val);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetRTCData",
      value: function encodeGetRTCData(keys, isInner, apiType) {
        var modules = this._codec.getModule(PBName.RtcDataInput);

        modules.setInterior(isInner);
        modules.setTarget(apiType);
        modules.setKey(keys);
        return modules.getArrayData();
      }
    }, {
      key: "encodeRemoveRTCData",
      value: function encodeRemoveRTCData(keys, isInner, apiType, message) {
        var modules = this._codec.getModule(PBName.RtcDataInput);

        modules.setInterior(isInner);
        modules.setTarget(apiType);
        modules.setKey(keys);
        message = message || {};
        var _message2 = message,
            name = _message2.name,
            content = _message2.content;
        !isUndefined(name) && modules.setObjectName(name);

        if (!isUndefined(content)) {
          if (isObject(content)) {
            content = JSON.stringify(content);
          }

          modules.setContent(content);
        }

        return modules.getArrayData();
      }
    }, {
      key: "encodeSetRTCOutData",
      value: function encodeSetRTCOutData(data, type, message) {
        var _this29 = this;

        var modules = this._codec.getModule(PBName.RtcSetOutDataInput);

        modules.setTarget(type);

        if (!isArray(data)) {
          data = [data];
        }

        forEach(data, function (item, index) {
          _newArrowCheck(this, _this29);

          item.key = item.key ? item.key.toString() : item.key;
          item.value = item.value ? item.value.toString() : item.value;
          data[index] = item;
        }.bind(this));
        modules.setValueInfo(data);
        message = message || {};
        var _message3 = message,
            name = _message3.name,
            content = _message3.content;
        !isUndefined(name) && modules.setObjectName(name);

        if (!isUndefined(content)) {
          if (isObject(content)) {
            content = JSON.stringify(content);
          }

          modules.setContent(content);
        }

        return modules.getArrayData();
      }
    }, {
      key: "ecnodeGetRTCOutData",
      value: function ecnodeGetRTCOutData(userIds) {
        var modules = this._codec.getModule(PBName.RtcQryUserOutDataInput);

        modules.setUserId(userIds);
        return modules.getArrayData();
      }
    }, {
      key: "encodeSetRTCState",
      value: function encodeSetRTCState(report) {
        var modules = this._codec.getModule(PBName.MCFollowInput);

        modules.setId(report);
        return modules.getArrayData();
      }
    }, {
      key: "encodeGetRTCRoomInfo",
      value: function encodeGetRTCRoomInfo() {
        var modules = this._codec.getModule(PBName.RtcQueryListInput);

        modules.setOrder(2);
        return modules.getArrayData();
      }
    }, {
      key: "encodeSetRTCUserInfo",
      value: function encodeSetRTCUserInfo(key, value) {
        var modules = this._codec.getModule(PBName.RtcValueInfo);

        modules.setKey(key);
        modules.setValue(value);
        return modules.getArrayData();
      }
    }, {
      key: "encodeRemoveRTCUserInfo",
      value: function encodeRemoveRTCUserInfo(keys) {
        var modules = this._codec.getModule(PBName.RtcKeyDeleteInput);

        modules.setKey(keys);
        return modules.getArrayData();
      }
    }]);

    return DataCodec;
  }();

  var ADataChannel = function ADataChannel(type, _watcher) {
    _classCallCheck(this, ADataChannel);

    this._watcher = _watcher;
    this.codec = new DataCodec(type);
  };

  var _getIdentifier = function getIdentifier(messageId, identifier) {
    _newArrowCheck(this, _this);

    if (messageId && identifier) {
      return identifier + '_' + messageId;
    } else if (messageId) {
      return messageId;
    } else {
      return Date.now();
    }
  }.bind(undefined);

  var BaseReader = function () {
    function BaseReader(header) {
      _classCallCheck(this, BaseReader);

      this.header = header;
      this._name = null;
      this.lengthSize = 0;
      this.messageId = 0;
      this.timestamp = 0;
      this.syncMsg = false;
      this.identifier = '';
    }

    _createClass(BaseReader, [{
      key: "getIdentifier",
      value: function getIdentifier() {
        var messageId = this.messageId,
            identifier = this.identifier;
        return _getIdentifier(messageId, identifier);
      }
    }, {
      key: "read",
      value: function read(stream, length) {
        this.readMessage(stream, length);
      }
    }, {
      key: "readMessage",
      value: function readMessage(stream, length) {
        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return BaseReader;
  }();

  var BaseWriter = function () {
    function BaseWriter(headerType) {
      _classCallCheck(this, BaseWriter);

      this.lengthSize = 0;
      this.messageId = 0;
      this.topic = '';
      this.targetId = '';
      this.identifier = '';
      this._header = new Header(headerType, false, QOS.AT_MOST_ONCE, false);
    }

    _createClass(BaseWriter, [{
      key: "getIdentifier",
      value: function getIdentifier() {
        var messageId = this.messageId,
            identifier = this.identifier;
        return _getIdentifier(messageId, identifier);
      }
    }, {
      key: "write",
      value: function write(stream) {
        var headerCode = this.getHeaderFlag();
        stream.write(headerCode);
        this.writeMessage(stream);
      }
    }, {
      key: "setHeaderQos",
      value: function setHeaderQos(qos) {
        this._header.qos = qos;
      }
    }, {
      key: "getHeaderFlag",
      value: function getHeaderFlag() {
        return this._header.encode();
      }
    }, {
      key: "getLengthSize",
      value: function getLengthSize() {
        return this.lengthSize;
      }
    }, {
      key: "getBufferData",
      value: function getBufferData() {
        var stream = new RongStreamWriter();
        this.write(stream);
        var val = stream.getBytesArray();
        var binary = new Int8Array(val);
        return binary;
      }
    }, {
      key: "getCometData",
      value: function getCometData() {
        var data = this.data || {};
        return JSON.stringify(data);
      }
    }]);

    return BaseWriter;
  }();

  var ConnAckReader = function (_BaseReader) {
    _inherits(ConnAckReader, _BaseReader);

    var _super3 = _createSuper(ConnAckReader);

    function ConnAckReader() {
      var _this30;

      _classCallCheck(this, ConnAckReader);

      _this30 = _super3.apply(this, arguments);
      _this30._name = MessageName.CONN_ACK;
      _this30.status = null;
      _this30.userId = null;
      _this30.timestamp = 0;
      return _this30;
    }

    _createClass(ConnAckReader, [{
      key: "readMessage",
      value: function readMessage(stream, length) {
        stream.readByte();
        this.status = +stream.readByte();

        if (length > ConnAckReader.MESSAGE_LENGTH) {
          this.userId = stream.readUTF();
          stream.readUTF();
          this.timestamp = stream.readLong();
        }

        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return ConnAckReader;
  }(BaseReader);

  ConnAckReader.MESSAGE_LENGTH = 2;

  var DisconnectReader = function (_BaseReader2) {
    _inherits(DisconnectReader, _BaseReader2);

    var _super4 = _createSuper(DisconnectReader);

    function DisconnectReader() {
      var _this31;

      _classCallCheck(this, DisconnectReader);

      _this31 = _super4.apply(this, arguments);
      _this31._name = MessageName.DISCONNECT;
      _this31.status = 0;
      return _this31;
    }

    _createClass(DisconnectReader, [{
      key: "readMessage",
      value: function readMessage(stream, length) {
        stream.readByte();
        this.status = +stream.readByte();
        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return DisconnectReader;
  }(BaseReader);

  DisconnectReader.MESSAGE_LENGTH = 2;

  var PingReqWriter = function (_BaseWriter) {
    _inherits(PingReqWriter, _BaseWriter);

    var _super5 = _createSuper(PingReqWriter);

    function PingReqWriter() {
      var _this32;

      _classCallCheck(this, PingReqWriter);

      _this32 = _super5.call(this, OperationType.PING_REQ);
      _this32._name = MessageName.PING_REQ;
      return _this32;
    }

    _createClass(PingReqWriter, [{
      key: "writeMessage",
      value: function writeMessage(stream) {}
    }]);

    return PingReqWriter;
  }(BaseWriter);

  var PingRespReader = function (_BaseReader3) {
    _inherits(PingRespReader, _BaseReader3);

    var _super6 = _createSuper(PingRespReader);

    function PingRespReader(header) {
      var _this33;

      _classCallCheck(this, PingRespReader);

      _this33 = _super6.call(this, header);
      _this33._name = MessageName.PING_RESP;
      return _this33;
    }

    return PingRespReader;
  }(BaseReader);

  var RetryableReader = function (_BaseReader4) {
    _inherits(RetryableReader, _BaseReader4);

    var _super7 = _createSuper(RetryableReader);

    function RetryableReader() {
      var _this34;

      _classCallCheck(this, RetryableReader);

      _this34 = _super7.apply(this, arguments);
      _this34.messageId = 0;
      return _this34;
    }

    _createClass(RetryableReader, [{
      key: "readMessage",
      value: function readMessage(stream, length) {
        var msgId = stream.readByte() * 256 + stream.readByte();
        this.messageId = parseInt(msgId.toString(), 10);
        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return RetryableReader;
  }(BaseReader);

  var RetryableWriter = function (_BaseWriter2) {
    _inherits(RetryableWriter, _BaseWriter2);

    var _super8 = _createSuper(RetryableWriter);

    function RetryableWriter() {
      var _this35;

      _classCallCheck(this, RetryableWriter);

      _this35 = _super8.apply(this, arguments);
      _this35.messageId = 0;
      return _this35;
    }

    _createClass(RetryableWriter, [{
      key: "writeMessage",
      value: function writeMessage(stream) {
        var id = this.messageId;
        var lsb = id & 255;
        var msb = (id & 65280) >> 8;
        stream.write(msb);
        stream.write(lsb);
      }
    }]);

    return RetryableWriter;
  }(BaseWriter);

  var PublishReader = function (_RetryableReader) {
    _inherits(PublishReader, _RetryableReader);

    var _super9 = _createSuper(PublishReader);

    function PublishReader() {
      var _this36;

      _classCallCheck(this, PublishReader);

      _this36 = _super9.apply(this, arguments);
      _this36._name = MessageName.PUBLISH;
      _this36.topic = '';
      _this36.targetId = '';
      _this36.syncMsg = false;
      _this36.identifier = IDENTIFIER.PUB;
      return _this36;
    }

    _createClass(PublishReader, [{
      key: "readMessage",
      value: function readMessage(stream, length) {
        this.date = stream.readInt();
        this.topic = stream.readUTF();
        this.targetId = stream.readUTF();

        _get(_getPrototypeOf(PublishReader.prototype), "readMessage", this).call(this, stream, length);

        this.data = stream.readAll();
        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return PublishReader;
  }(RetryableReader);

  var PublishWriter = function (_RetryableWriter) {
    _inherits(PublishWriter, _RetryableWriter);

    var _super10 = _createSuper(PublishWriter);

    function PublishWriter(topic, data, targetId) {
      var _this37;

      _classCallCheck(this, PublishWriter);

      _this37 = _super10.call(this, OperationType.PUBLISH);
      _this37._name = MessageName.PUBLISH;
      _this37.syncMsg = false;
      _this37.identifier = IDENTIFIER.PUB;
      _this37.topic = topic;
      _this37.data = isString(data) ? BinaryHelper.writeUTF(data) : data;
      _this37.targetId = targetId;
      return _this37;
    }

    _createClass(PublishWriter, [{
      key: "writeMessage",
      value: function writeMessage(stream) {
        stream.writeUTF(this.topic);
        stream.writeUTF(this.targetId);

        _get(_getPrototypeOf(PublishWriter.prototype), "writeMessage", this).call(this, stream);

        stream.write(this.data);
      }
    }]);

    return PublishWriter;
  }(RetryableWriter);

  var PubAckReader = function (_RetryableReader2) {
    _inherits(PubAckReader, _RetryableReader2);

    var _super11 = _createSuper(PubAckReader);

    function PubAckReader() {
      var _this38;

      _classCallCheck(this, PubAckReader);

      _this38 = _super11.apply(this, arguments);
      _this38._name = MessageName.PUB_ACK;
      _this38.status = 0;
      _this38.date = 0;
      _this38.millisecond = 0;
      _this38.messageUId = '';
      _this38.timestamp = 0;
      _this38.identifier = IDENTIFIER.PUB;
      _this38.topic = '';
      _this38.targetId = '';
      return _this38;
    }

    _createClass(PubAckReader, [{
      key: "readMessage",
      value: function readMessage(stream, length) {
        _get(_getPrototypeOf(PubAckReader.prototype), "readMessage", this).call(this, stream, length);

        this.date = stream.readInt();
        this.status = stream.readByte() * 256 + stream.readByte();
        this.millisecond = stream.readByte() * 256 + stream.readByte();
        this.timestamp = this.date * 1000 + this.millisecond;
        this.messageUId = stream.readUTF();
        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return PubAckReader;
  }(RetryableReader);

  var PubAckWriter = function (_RetryableWriter2) {
    _inherits(PubAckWriter, _RetryableWriter2);

    var _super12 = _createSuper(PubAckWriter);

    function PubAckWriter(messageId) {
      var _this39;

      _classCallCheck(this, PubAckWriter);

      _this39 = _super12.call(this, OperationType.PUB_ACK);
      _this39._name = MessageName.PUB_ACK;
      _this39.status = 0;
      _this39.date = 0;
      _this39.millisecond = 0;
      _this39.messageUId = '';
      _this39.timestamp = 0;
      _this39.messageId = messageId;
      return _this39;
    }

    _createClass(PubAckWriter, [{
      key: "writeMessage",
      value: function writeMessage(stream) {
        _get(_getPrototypeOf(PubAckWriter.prototype), "writeMessage", this).call(this, stream);
      }
    }]);

    return PubAckWriter;
  }(RetryableWriter);

  var QueryWriter = function (_RetryableWriter3) {
    _inherits(QueryWriter, _RetryableWriter3);

    var _super13 = _createSuper(QueryWriter);

    function QueryWriter(topic, data, targetId) {
      var _this40;

      _classCallCheck(this, QueryWriter);

      _this40 = _super13.call(this, OperationType.QUERY);
      _this40.name = MessageName.QUERY;
      _this40.identifier = IDENTIFIER.QUERY;
      _this40.topic = topic;
      _this40.data = isString(data) ? BinaryHelper.writeUTF(data) : data;
      _this40.targetId = targetId;
      return _this40;
    }

    _createClass(QueryWriter, [{
      key: "writeMessage",
      value: function writeMessage(stream) {
        stream.writeUTF(this.topic);
        stream.writeUTF(this.targetId);

        _get(_getPrototypeOf(QueryWriter.prototype), "writeMessage", this).call(this, stream);

        stream.write(this.data);
      }
    }]);

    return QueryWriter;
  }(RetryableWriter);

  var QueryConWriter = function (_RetryableWriter4) {
    _inherits(QueryConWriter, _RetryableWriter4);

    var _super14 = _createSuper(QueryConWriter);

    function QueryConWriter(messageId) {
      var _this41;

      _classCallCheck(this, QueryConWriter);

      _this41 = _super14.call(this, OperationType.QUERY_CONFIRM);
      _this41._name = MessageName.QUERY_CON;
      _this41.messageId = messageId;
      return _this41;
    }

    return QueryConWriter;
  }(RetryableWriter);

  var QueryAckReader = function (_RetryableReader3) {
    _inherits(QueryAckReader, _RetryableReader3);

    var _super15 = _createSuper(QueryAckReader);

    function QueryAckReader() {
      var _this42;

      _classCallCheck(this, QueryAckReader);

      _this42 = _super15.apply(this, arguments);
      _this42._name = MessageName.QUERY_ACK;
      _this42.status = 0;
      _this42.identifier = IDENTIFIER.QUERY;
      _this42.topic = '';
      _this42.targetId = '';
      return _this42;
    }

    _createClass(QueryAckReader, [{
      key: "readMessage",
      value: function readMessage(stream, length) {
        _get(_getPrototypeOf(QueryAckReader.prototype), "readMessage", this).call(this, stream, length);

        this.date = stream.readInt();
        this.status = stream.readByte() * 256 + stream.readByte();
        this.data = stream.readAll();
        return {
          stream: stream,
          length: length
        };
      }
    }]);

    return QueryAckReader;
  }(RetryableReader);

  var getReaderByHeader = function getReaderByHeader(header) {
    _newArrowCheck(this, _this);

    var type = header.type;
    var msg;

    switch (type) {
      case OperationType.CONN_ACK:
        msg = new ConnAckReader(header);
        break;

      case OperationType.PUBLISH:
        msg = new PublishReader(header);
        msg.syncMsg = header.syncMsg;
        break;

      case OperationType.PUB_ACK:
        msg = new PubAckReader(header);
        break;

      case OperationType.QUERY_ACK:
        msg = new QueryAckReader(header);
        break;

      case OperationType.SUB_ACK:
      case OperationType.UNSUB_ACK:
      case OperationType.PING_RESP:
        msg = new PingRespReader(header);
        break;

      case OperationType.DISCONNECT:
        msg = new DisconnectReader(header);
        break;

      default:
        msg = new BaseReader(header);
        logger.error('No support for deserializing ' + type + ' messages');
    }

    return msg;
  }.bind(undefined);

  var readWSBuffer = function readWSBuffer(data) {
    _newArrowCheck(this, _this);

    var arr = new Uint8Array(data);
    var stream = new RongStreamReader(arr);
    var flags = stream.readByte();
    var header = new Header(flags);
    var msg = getReaderByHeader(header);
    msg.read(stream, arr.length - 1);
    return msg;
  }.bind(undefined);

  var readCometData = function readCometData(data) {
    _newArrowCheck(this, _this);

    var flags = data.headerCode;
    var header = new Header(flags);
    var msg = getReaderByHeader(header);

    for (var _key9 in data) {
      msg[_key9] = data[_key9];
    }

    return msg;
  }.bind(undefined);

  var ConnectResultCode = {
    ACCEPTED: 0,
    UNACCEPTABLE_PROTOCOL_VERSION: 1,
    IDENTIFIER_REJECTED: 2,
    SERVER_UNAVAILABLE: 3,
    TOKEN_INCORRECT: 4,
    NOT_AUTHORIZED: 5,
    REDIRECT: 6,
    PACKAGE_ERROR: 7,
    APP_BLOCK_OR_DELETE: 8,
    BLOCK: 9,
    TOKEN_EXPIRE: 10,
    DEVICE_ERROR: 11,
    HOSTNAME_ERROR: 12,
    HASOHTERSAMECLIENTONLINE: 13
  };
  var ConnectionStatus;

  (function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["CONNECTED"] = 0] = "CONNECTED";
    ConnectionStatus[ConnectionStatus["CONNECTING"] = 1] = "CONNECTING";
    ConnectionStatus[ConnectionStatus["DISCONNECTED"] = 2] = "DISCONNECTED";
    ConnectionStatus[ConnectionStatus["NETWORK_UNAVAILABLE"] = 3] = "NETWORK_UNAVAILABLE";
    ConnectionStatus[ConnectionStatus["CONNECTION_CLOSED"] = 4] = "CONNECTION_CLOSED";
    ConnectionStatus[ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"] = 6] = "KICKED_OFFLINE_BY_OTHER_CLIENT";
    ConnectionStatus[ConnectionStatus["WEBSOCKET_UNAVAILABLE"] = 7] = "WEBSOCKET_UNAVAILABLE";
    ConnectionStatus[ConnectionStatus["WEBSOCKET_ERROR"] = 8] = "WEBSOCKET_ERROR";
    ConnectionStatus[ConnectionStatus["BLOCKED"] = 9] = "BLOCKED";
    ConnectionStatus[ConnectionStatus["DOMAIN_INCORRECT"] = 12] = "DOMAIN_INCORRECT";
    ConnectionStatus[ConnectionStatus["APPKEY_IS_FAKE"] = 20] = "APPKEY_IS_FAKE";
    ConnectionStatus[ConnectionStatus["ULTRALIMIT"] = 1101] = "ULTRALIMIT";
    ConnectionStatus[ConnectionStatus["REQUEST_NAVI"] = 201] = "REQUEST_NAVI";
    ConnectionStatus[ConnectionStatus["RESPONSE_NAVI"] = 202] = "RESPONSE_NAVI";
    ConnectionStatus[ConnectionStatus["RESPONSE_NAVI_ERROR"] = 203] = "RESPONSE_NAVI_ERROR";
    ConnectionStatus[ConnectionStatus["RESPONSE_NAVI_TIMEOUT"] = 204] = "RESPONSE_NAVI_TIMEOUT";
  })(ConnectionStatus || (ConnectionStatus = {}));

  var ConnectionStatus$1 = ConnectionStatus;

  var randomNum = function randomNum(min, max) {
    _newArrowCheck(this, _this);

    return min + Math.floor(Math.random() * (max - min));
  }.bind(undefined);

  var getUUID = function getUUID() {
    var _this43 = this;

    _newArrowCheck(this, _this);

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      _newArrowCheck(this, _this43);

      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    }.bind(this));
  }.bind(undefined);

  var Topic;

  (function (Topic) {
    Topic[Topic["ppMsgP"] = 1] = "ppMsgP";
    Topic[Topic["ppMsgN"] = 2] = "ppMsgN";
    Topic[Topic["ppMsgS"] = 3] = "ppMsgS";
    Topic[Topic["pgMsgP"] = 4] = "pgMsgP";
    Topic[Topic["chatMsg"] = 5] = "chatMsg";
    Topic[Topic["pcMsgP"] = 6] = "pcMsgP";
    Topic[Topic["qryPMsg"] = 7] = "qryPMsg";
    Topic[Topic["qryGMsg"] = 8] = "qryGMsg";
    Topic[Topic["qryCHMsg"] = 9] = "qryCHMsg";
    Topic[Topic["qryCMsg"] = 10] = "qryCMsg";
    Topic[Topic["qrySMsg"] = 11] = "qrySMsg";
    Topic[Topic["recallMsg"] = 12] = "recallMsg";
    Topic[Topic["prMsgS"] = 13] = "prMsgS";
    Topic[Topic["s_ntf"] = 14] = "s_ntf";
    Topic[Topic["s_msg"] = 15] = "s_msg";
    Topic[Topic["s_stat"] = 16] = "s_stat";
    Topic[Topic["s_cmd"] = 17] = "s_cmd";
    Topic[Topic["s_us"] = 18] = "s_us";
    Topic[Topic["pullUS"] = 19] = "pullUS";
    Topic[Topic["pgMsgS"] = 20] = "pgMsgS";
    Topic[Topic["chatMsgS"] = 21] = "chatMsgS";
    Topic[Topic["qrySessionsAtt"] = 22] = "qrySessionsAtt";
    Topic[Topic["pullMsg"] = 23] = "pullMsg";
    Topic[Topic["qrySessions"] = 24] = "qrySessions";
    Topic[Topic["delSessions"] = 25] = "delSessions";
    Topic[Topic["delMsg"] = 26] = "delMsg";
    Topic[Topic["updRRTime"] = 27] = "updRRTime";
    Topic[Topic["chrmPull"] = 28] = "chrmPull";
    Topic[Topic["joinChrm"] = 29] = "joinChrm";
    Topic[Topic["joinChrmR"] = 30] = "joinChrmR";
    Topic[Topic["exitChrm"] = 31] = "exitChrm";
    Topic[Topic["queryChrmI"] = 32] = "queryChrmI";
    Topic[Topic["setKV"] = 33] = "setKV";
    Topic[Topic["delKV"] = 34] = "delKV";
    Topic[Topic["pullKV"] = 35] = "pullKV";
    Topic[Topic["qryRelation"] = 36] = "qryRelation";
    Topic[Topic["delRelation"] = 37] = "delRelation";
    Topic[Topic["pullSeAtts"] = 38] = "pullSeAtts";
    Topic[Topic["setSeAtt"] = 39] = "setSeAtt";
    Topic[Topic["qnTkn"] = 40] = "qnTkn";
    Topic[Topic["qnUrl"] = 41] = "qnUrl";
    Topic[Topic["aliUrl"] = 42] = "aliUrl";
    Topic[Topic["cleanPMsg"] = 43] = "cleanPMsg";
    Topic[Topic["cleanGMsg"] = 44] = "cleanGMsg";
    Topic[Topic["cleanCMsg"] = 45] = "cleanCMsg";
    Topic[Topic["cleanSMsg"] = 46] = "cleanSMsg";
    Topic[Topic["rtcRJoin_data"] = 47] = "rtcRJoin_data";
    Topic[Topic["rtcRExit"] = 48] = "rtcRExit";
    Topic[Topic["rtcPing"] = 49] = "rtcPing";
    Topic[Topic["rtcSetData"] = 50] = "rtcSetData";
    Topic[Topic["userSetData"] = 51] = "userSetData";
    Topic[Topic["rtcQryData"] = 52] = "rtcQryData";
    Topic[Topic["rtcDelData"] = 53] = "rtcDelData";
    Topic[Topic["rtcSetOutData"] = 54] = "rtcSetOutData";
    Topic[Topic["rtcQryUserOutData"] = 55] = "rtcQryUserOutData";
    Topic[Topic["rtcToken"] = 56] = "rtcToken";
    Topic[Topic["rtcUserState"] = 57] = "rtcUserState";
    Topic[Topic["rtcRInfo"] = 58] = "rtcRInfo";
    Topic[Topic["rtcUData"] = 59] = "rtcUData";
    Topic[Topic["rtcUPut"] = 60] = "rtcUPut";
    Topic[Topic["rtcUDel"] = 61] = "rtcUDel";
    Topic[Topic["rtcUList"] = 62] = "rtcUList";
  })(Topic || (Topic = {}));

  var Topic$1 = Topic;

  var getValidHosts = function getValidHosts(hosts, protocol, runtime) {
    _newArrowCheck(this, _this);

    return __awaiter$1(void 0, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
      var _this44 = this;

      var pingRes;
      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Promise.all(hosts.map(function (host) {
                _newArrowCheck(this, _this44);

                return __awaiter$1(void 0, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                  var now, url, res;
                  return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          now = Date.now();
                          url = "".concat(protocol, "://").concat(host, "/ping?r=").concat(randomNum(1000, 9999));
                          _context2.next = 4;
                          return runtime.httpReq({
                            url: url,
                            timeout: PING_REQ_TIMEOUT
                          });

                        case 4:
                          res = _context2.sent;
                          return _context2.abrupt("return", {
                            status: res.status,
                            host: host,
                            cost: Date.now() - now
                          });

                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                }));
              }.bind(this)));

            case 2:
              pingRes = _context3.sent;
              pingRes = pingRes.filter(function (item) {
                _newArrowCheck(this, _this44);

                return item.status === 200;
              }.bind(this));

              if (pingRes.length > 1) {
                pingRes = pingRes.sort(function (a, b) {
                  _newArrowCheck(this, _this44);

                  return a.cost - b.cost;
                }.bind(this));
              }

              return _context3.abrupt("return", pingRes.map(function (item) {
                _newArrowCheck(this, _this44);

                return item.host;
              }.bind(this)));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));
  }.bind(undefined);

  var formatWSUrl = function formatWSUrl(protocol, host, appkey, token, runtime, apiVersion, pid) {
    _newArrowCheck(this, _this);

    return "".concat(protocol, "://").concat(host, "/websocket?appId=").concat(appkey, "&token=").concat(encodeURIComponent(token), "&sdkVer=").concat(apiVersion, "&pid=").concat(pid, "&apiVer=").concat(runtime.isFromUniapp ? 'uniapp' : 'normal').concat(runtime.connectPlatform ? '&platform=' + runtime.connectPlatform : '');
  }.bind(undefined);

  var formatResolveKey = function formatResolveKey(messageId, identifier) {
    _newArrowCheck(this, _this);

    return [messageId, identifier].join('-');
  }.bind(undefined);

  var isStatusMessage = function isStatusMessage(topic) {
    var _this45 = this;

    _newArrowCheck(this, _this);

    return [Topic$1.ppMsgS, Topic$1.pgMsgS, Topic$1.chatMsgS].map(function (item) {
      _newArrowCheck(this, _this45);

      return Topic$1[item];
    }.bind(this)).indexOf(topic) >= 0;
  }.bind(undefined);

  var sendWSData = function sendWSData(writer, socket) {
    _newArrowCheck(this, _this);

    if (!(writer instanceof PingReqWriter)) {
      logger.debug('Websocket ==>', writer);
    }

    var binary = writer.getBufferData();
    socket.send(binary.buffer);
  }.bind(undefined);

  var WebSocketChannel = function (_ADataChannel) {
    _inherits(WebSocketChannel, _ADataChannel);

    var _super16 = _createSuper(WebSocketChannel);

    function WebSocketChannel(_runtime, watcher) {
      var _this47 = this;

      var _this46;

      _classCallCheck(this, WebSocketChannel);

      _this46 = _super16.call(this, 'websocket', watcher);
      _this46._runtime = _runtime;
      _this46._socket = null;
      _this46._messageIds = {};
      _this46._syncMessageIds = {};
      _this46._failedCount = 0;
      _this46.ALLOW_FAILED_TIMES = 4;
      _this46._idCount = 0;

      _this46._generateMessageId = function () {
        _newArrowCheck(this, _this47);

        if (_this46._idCount >= 65535) {
          _this46._idCount = 0;
        }

        return ++_this46._idCount;
      }.bind(this);

      return _this46;
    }

    _createClass(WebSocketChannel, [{
      key: "connect",
      value: function connect(appkey, token, hosts, protocol, apiVersion) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
          var _this48 = this;

          var validHosts, wsProtocol, _loop2, i, len, _ret;

          return regeneratorRuntime.wrap(function _callee3$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  apiVersion = matchVersion(apiVersion);

                  this._watcher.status(ConnectionStatus$1.CONNECTING);

                  _context5.next = 4;
                  return getValidHosts(hosts, protocol, this._runtime);

                case 4:
                  validHosts = _context5.sent;

                  if (!(validHosts.length === 0)) {
                    _context5.next = 8;
                    break;
                  }

                  logger.error('No valid websocket server hosts!');
                  return _context5.abrupt("return", ErrorCode$1.RC_SOCKET_NOT_CREATED);

                case 8:
                  wsProtocol = protocol.replace('http', 'ws');
                  _loop2 = regeneratorRuntime.mark(function _loop2(i, len) {
                    var _this49 = this;

                    var url, socket, disconnected, code;
                    return regeneratorRuntime.wrap(function _loop2$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            url = formatWSUrl(wsProtocol, validHosts[i], appkey, token, _this48._runtime, apiVersion);
                            socket = _this48._runtime.createWebSocket(url);

                            disconnected = function disconnected(code) {
                              _newArrowCheck(this, _this49);

                              if (_this48._socket === socket) {
                                _this48._socket = null;

                                _this48._watcher.status(code);
                              }
                            }.bind(this);

                            _context4.next = 5;
                            return new Promise(function (resolve) {
                              var _this50 = this;

                              _newArrowCheck(this, _this49);

                              socket.onMessage(function (data) {
                                _newArrowCheck(this, _this50);

                                if (Object.prototype.toString.call(data) !== '[object ArrayBuffer]') {
                                  logger.warn('Socket received invalid data:', data);
                                  return;
                                }

                                var signal = readWSBuffer(data);

                                if (signal instanceof PingRespReader && _this48._pingResolve) {
                                  _this48._pingResolve(ErrorCode$1.SUCCESS);

                                  _this48._pingResolve = undefined;
                                  return;
                                }

                                logger.debug('Websocket <==', signal);

                                if (signal instanceof ConnAckReader) {
                                  if (signal.status !== ConnectResultCode.ACCEPTED) {
                                    logger.error('Websocket connAck status:', signal.status);
                                    resolve(signal.status);
                                    return;
                                  }

                                  _this48.connectedTime = signal.timestamp;
                                  _this48.userId = signal.userId || '';
                                  resolve(ErrorCode$1.SUCCESS);
                                  return;
                                }

                                if (signal instanceof DisconnectReader) {
                                  var status = signal.status;
                                  var connStatus = status === 1 ? ConnectionStatus$1.KICKED_OFFLINE_BY_OTHER_CLIENT : status === 2 ? ConnectionStatus$1.BLOCKED : status;

                                  _this48._watcher.status(connStatus);

                                  return;
                                }

                                _this48._onReceiveSignal(signal);
                              }.bind(this));
                              socket.onClose(function (code, reason) {
                                _newArrowCheck(this, _this50);

                                logger.warn('websocket closed! code:', code, 'reason:', reason);
                                disconnected(ConnectionStatus$1.CONNECTION_CLOSED);
                                resolve(code);
                              }.bind(this));
                              socket.onError(function (error) {
                                _newArrowCheck(this, _this50);

                                logger.error('websocket error!', error);
                                disconnected(ConnectionStatus$1.WEBSOCKET_ERROR);
                                resolve(ErrorCode$1.NETWORK_ERROR);
                              }.bind(this));
                              socket.onOpen(function () {
                                _newArrowCheck(this, _this50);

                                return logger.debug('websocket open =>', url);
                              }.bind(this));
                              timerSetTimeout(function () {
                                _newArrowCheck(this, _this50);

                                resolve(ErrorCode$1.TIMEOUT);
                              }.bind(this), WEB_SOCKET_TIMEOUT);
                            }.bind(this));

                          case 5:
                            code = _context4.sent;

                            if (!(code === ErrorCode$1.SUCCESS)) {
                              _context4.next = 11;
                              break;
                            }

                            _this48._socket = socket;

                            _this48._checkAlive();

                            _this48._watcher.status(ConnectionStatus$1.CONNECTED);

                            return _context4.abrupt("return", {
                              v: code
                            });

                          case 11:
                            socket.close();

                          case 12:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _loop2, this);
                  });
                  i = 0, len = validHosts.length;

                case 11:
                  if (!(i < len)) {
                    _context5.next = 19;
                    break;
                  }

                  return _context5.delegateYield(_loop2(i, len), "t0", 13);

                case 13:
                  _ret = _context5.t0;

                  if (!(_typeof(_ret) === "object")) {
                    _context5.next = 16;
                    break;
                  }

                  return _context5.abrupt("return", _ret.v);

                case 16:
                  i += 1;
                  _context5.next = 11;
                  break;

                case 19:
                  return _context5.abrupt("return", ErrorCode$1.RC_NET_UNAVAILABLE);

                case 20:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee3, this);
        }));
      }
    }, {
      key: "_checkAlive",
      value: function _checkAlive() {
        var _a;

        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
          var _this51 = this;

          var code;
          return regeneratorRuntime.wrap(function _callee4$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (this._socket) {
                    _context6.next = 2;
                    break;
                  }

                  return _context6.abrupt("return");

                case 2:
                  this.sendOnly(new PingReqWriter());
                  _context6.next = 5;
                  return new Promise(function (resolve) {
                    var _this52 = this;

                    _newArrowCheck(this, _this51);

                    this._pingResolve = resolve;
                    setTimeout(function () {
                      _newArrowCheck(this, _this52);

                      this._pingResolve = undefined;
                      resolve(ErrorCode$1.TIMEOUT);
                    }.bind(this), IM_SIGNAL_TIMEOUT);
                  }.bind(this));

                case 5:
                  code = _context6.sent;

                  if (!(code !== ErrorCode$1.SUCCESS && ++this._failedCount >= this.ALLOW_FAILED_TIMES)) {
                    _context6.next = 9;
                    break;
                  }

                  (_a = this._socket) === null || _a === void 0 ? void 0 : _a.close();
                  return _context6.abrupt("return");

                case 9:
                  this._failedCount = 0;
                  setTimeout(function () {
                    _newArrowCheck(this, _this51);

                    return this._checkAlive();
                  }.bind(this), IM_PING_INTERVAL_TIME);

                case 11:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee4, this);
        }));
      }
    }, {
      key: "_onReceiveSignal",
      value: function _onReceiveSignal(signal) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
          var _this53 = this;

          var messageId, identifier, isQosNeedAck, key, resolve, syncMsg, topic, ack;
          return regeneratorRuntime.wrap(function _callee5$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  messageId = signal.messageId, identifier = signal.identifier;
                  isQosNeedAck = signal.header && signal.header.qos !== QOS.AT_MOST_ONCE;

                  if (isQosNeedAck) {
                    if (signal instanceof PublishReader && !signal.syncMsg) {
                      this.sendOnly(new PubAckWriter(messageId));
                    }

                    if (signal instanceof QueryAckReader) {
                      this.sendOnly(new QueryConWriter(messageId));
                    }
                  }

                  key = formatResolveKey(messageId, identifier);

                  if (messageId > 0) {
                    resolve = this._messageIds[key];
                    resolve && resolve(signal);
                    this._syncMessageIds[key] && this._syncMessageIds[key](signal);
                  }

                  if (!(signal instanceof PublishReader)) {
                    _context7.next = 15;
                    break;
                  }

                  syncMsg = signal.syncMsg, topic = signal.topic;

                  if (!(!syncMsg || isStatusMessage(topic))) {
                    _context7.next = 10;
                    break;
                  }

                  this._watcher.signal(signal);

                  return _context7.abrupt("return");

                case 10:
                  _context7.next = 12;
                  return new Promise(function (resolve) {
                    _newArrowCheck(this, _this53);

                    this._syncMessageIds[key] = resolve;
                  }.bind(this));

                case 12:
                  ack = _context7.sent;
                  delete this._syncMessageIds[key];

                  this._watcher.signal(signal, ack);

                case 15:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee5, this);
        }));
      }
    }, {
      key: "sendOnly",
      value: function sendOnly(writer) {
        if (this._socket) {
          sendWSData(writer, this._socket);
        }
      }
    }, {
      key: "send",
      value: function send(writer, respPBName, option) {
        var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : IM_SIGNAL_TIMEOUT;
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee6() {
          var _this54 = this;

          var messageId, identifier, respSignal, data;
          return regeneratorRuntime.wrap(function _callee6$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (!this._socket) {
                    _context8.next = 14;
                    break;
                  }

                  messageId = this._generateMessageId();
                  writer.messageId = messageId;
                  identifier = writer.identifier;
                  sendWSData(writer, this._socket);
                  _context8.next = 7;
                  return new Promise(function (resolve) {
                    var _this55 = this;

                    _newArrowCheck(this, _this54);

                    var key = formatResolveKey(messageId, identifier);
                    this._messageIds[key] = resolve;
                    setTimeout(function () {
                      _newArrowCheck(this, _this55);

                      delete this._messageIds[key];
                      resolve();
                    }.bind(this), timeout);
                  }.bind(this));

                case 7:
                  respSignal = _context8.sent;

                  if (respSignal) {
                    _context8.next = 10;
                    break;
                  }

                  return _context8.abrupt("return", {
                    code: ErrorCode$1.TIMEOUT
                  });

                case 10:
                  if (!(respSignal.status !== 0)) {
                    _context8.next = 12;
                    break;
                  }

                  return _context8.abrupt("return", {
                    code: respSignal.status
                  });

                case 12:
                  data = respPBName ? this.codec.decodeByPBName(respSignal.data, respPBName, option) : respSignal;
                  return _context8.abrupt("return", {
                    code: ErrorCode$1.SUCCESS,
                    data: data
                  });

                case 14:
                  return _context8.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 15:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee6, this);
        }));
      }
    }, {
      key: "close",
      value: function close() {
        if (this._socket) {
          this._socket.close();

          this._socket = null;

          this._watcher.status(ConnectionStatus$1.DISCONNECTED);
        }
      }
    }]);

    return WebSocketChannel;
  }(ADataChannel);

  var HttpMethod;

  (function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
  })(HttpMethod || (HttpMethod = {}));

  var isValidJSON = function isValidJSON(jsonStr) {
    _newArrowCheck(this, _this);

    if (isObject(jsonStr)) {
      return true;
    }

    var isValid = false;

    try {
      var obj = JSON.parse(jsonStr);
      var str = JSON.stringify(obj);
      isValid = str === jsonStr;
    } catch (e) {
      isValid = false;
    }

    return isValid;
  }.bind(undefined);

  var CometChannel = function (_ADataChannel2) {
    _inherits(CometChannel, _ADataChannel2);

    var _super17 = _createSuper(CometChannel);

    function CometChannel(_runtime, watcher) {
      var _this57 = this;

      var _this56;

      _classCallCheck(this, CometChannel);

      _this56 = _super17.call(this, 'comet', watcher);
      _this56._runtime = _runtime;
      _this56._messageIds = {};
      _this56._syncMessageIds = {};
      _this56._idCount = 0;

      _this56._generateMessageId = function () {
        _newArrowCheck(this, _this57);

        return ++_this56._idCount;
      }.bind(this);

      _this56._pid = encodeURIComponent(new Date().getTime() + Math.random() + '');
      return _this56;
    }

    _createClass(CometChannel, [{
      key: "handleCometRes",
      value: function handleCometRes(res) {
        var _this58 = this;

        if (res.status !== 200 && res.status !== 202) {
          return false;
        }

        var data = isString(res.data) ? JSON.parse(res.data) : res.data;

        if (!data) {
          logger.warn('received data is not a validJson', data);
          return false;
        }

        if (!isArray(data)) {
          return true;
        }

        forEach(data, function (item) {
          _newArrowCheck(this, _this58);

          return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee7() {
            var _this59 = this;

            var sessionid, signal, messageId, _header, status, identifier, isQosNeedAck, key, resolve, writer, _writer, connStatus, syncMsg, topic, ack;

            return regeneratorRuntime.wrap(function _callee7$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    sessionid = item.sessionid;

                    if (sessionid) {
                      this._sessionid = sessionid;
                    }

                    signal = readCometData(item);
                    messageId = signal.messageId, _header = signal._header, status = signal.status, identifier = signal.identifier;
                    isQosNeedAck = _header && _header.qos !== QOS.AT_MOST_ONCE;
                    key = formatResolveKey(messageId, identifier);

                    if (messageId && signal.getIdentifier) {
                      resolve = this._messageIds[key];
                      resolve && resolve(signal);
                      this._syncMessageIds[key] && this._syncMessageIds[key](signal);
                    }

                    if (isQosNeedAck) {
                      if (signal instanceof PublishReader && !signal.syncMsg) {
                        writer = new PubAckWriter(messageId);
                        this.sendOnly(writer);
                      }

                      if (signal instanceof QueryAckReader) {
                        _writer = new QueryConWriter(messageId);
                        this.sendOnly(_writer);
                      }
                    }

                    if (signal instanceof DisconnectReader) {
                      connStatus = status === 1 ? ConnectionStatus$1.KICKED_OFFLINE_BY_OTHER_CLIENT : status === 2 ? ConnectionStatus$1.BLOCKED : status;

                      this._watcher.status(connStatus);
                    }

                    if (!(signal instanceof PublishReader)) {
                      _context9.next = 19;
                      break;
                    }

                    syncMsg = signal.syncMsg, topic = signal.topic;

                    if (!(!syncMsg || isStatusMessage(topic))) {
                      _context9.next = 14;
                      break;
                    }

                    this._watcher.signal(signal);

                    return _context9.abrupt("return", false);

                  case 14:
                    _context9.next = 16;
                    return new Promise(function (resolve) {
                      _newArrowCheck(this, _this59);

                      this._syncMessageIds[key] = resolve;
                    }.bind(this));

                  case 16:
                    ack = _context9.sent;
                    delete this._syncMessageIds[key];

                    this._watcher.signal(signal, ack);

                  case 19:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee7, this);
          }));
        }.bind(this));
        return true;
      }
    }, {
      key: "_startPullSignal",
      value: function _startPullSignal(protocol) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee8() {
          var timestamp, url, res, isSuccess;
          return regeneratorRuntime.wrap(function _callee8$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  timestamp = new Date().getTime();
                  url = "".concat(protocol, "://").concat(this._domain, "/pullmsg.js?sessionid=").concat(this._sessionid, "&timestrap=").concat(timestamp, "&pid=").concat(this._pid);
                  _context10.next = 4;
                  return this._runtime.httpReq({
                    url: url,
                    body: {
                      pid: this._pid
                    },
                    timeout: IM_COMET_PULLMSG_TIMEOUT
                  });

                case 4:
                  res = _context10.sent;
                  isSuccess = this.handleCometRes(res);

                  if (!this._isDisconnected) {
                    if (isSuccess) {
                      this._startPullSignal(protocol);
                    } else {
                      this._watcher.status(ConnectionStatus$1.NETWORK_UNAVAILABLE);

                      this.close();
                    }
                  }

                case 7:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee8, this);
        }));
      }
    }, {
      key: "connect",
      value: function connect(appkey, token, hosts, protocol, apiVersion) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee9() {
          var _this60 = this;

          var validHosts, handleConnectRes, i, len, url, res, response;
          return regeneratorRuntime.wrap(function _callee9$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  apiVersion = matchVersion(apiVersion);
                  this._protocol = protocol;
                  this._isDisconnected = false;

                  this._watcher.status(ConnectionStatus$1.CONNECTING);

                  _context11.next = 6;
                  return getValidHosts(hosts, protocol, this._runtime);

                case 6:
                  validHosts = _context11.sent;

                  if (!(validHosts.length === 0)) {
                    _context11.next = 10;
                    break;
                  }

                  logger.error('No valid websocket server hosts!');
                  return _context11.abrupt("return", ErrorCode$1.RC_SOCKET_NOT_CREATED);

                case 10:
                  handleConnectRes = function handleConnectRes(res) {
                    _newArrowCheck(this, _this60);

                    if (res.status !== 200 && res.status !== 202) {
                      return false;
                    }

                    if (res.data) {
                      if (!isValidJSON(res.data)) {
                        logger.warn('received data is not a validJson', res.data);
                        return false;
                      }

                      return isObject(res.data) ? res.data : JSON.parse(res.data);
                    }

                    return false;
                  }.bind(this);

                  i = 0, len = validHosts.length;

                case 12:
                  if (!(i < len)) {
                    _context11.next = 29;
                    break;
                  }

                  url = formatWSUrl(protocol, validHosts[i], appkey, token, this._runtime, apiVersion, this._pid);
                  _context11.next = 16;
                  return this._runtime.httpReq({
                    url: url,
                    body: {
                      pid: this._pid
                    },
                    timeout: WEB_SOCKET_TIMEOUT
                  });

                case 16:
                  res = _context11.sent;
                  response = handleConnectRes(res);
                  this._domain = validHosts[i];

                  if (!(response && response.status === 0)) {
                    _context11.next = 26;
                    break;
                  }

                  this._watcher.status(ConnectionStatus$1.CONNECTED);

                  this._sessionid = response.sessionid;

                  this._startPullSignal(protocol);

                  this.userId = response.userId;
                  this.connectedTime = response.timestamp;
                  return _context11.abrupt("return", response.status);

                case 26:
                  i += 1;
                  _context11.next = 12;
                  break;

                case 29:
                  return _context11.abrupt("return", ErrorCode$1.RC_NET_UNAVAILABLE);

                case 30:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee9, this);
        }));
      }
    }, {
      key: "sendCometData",
      value: function sendCometData(writer) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee10() {
          var _domain, _sessionid, _pid, messageId, topic, targetId, identifier, headerCode, url, res;

          return regeneratorRuntime.wrap(function _callee10$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _domain = this._domain, _sessionid = this._sessionid, _pid = this._pid;
                  messageId = writer.messageId, topic = writer.topic, targetId = writer.targetId, identifier = writer.identifier;
                  headerCode = writer.getHeaderFlag();

                  if (topic) {
                    url = "".concat(this._protocol, "://").concat(_domain, "/websocket?messageid=").concat(messageId, "&header=").concat(headerCode, "&sessionid=").concat(_sessionid, "&topic=").concat(topic, "&targetid=").concat(targetId, "&pid=").concat(_pid);
                  } else {
                    url = "".concat(this._protocol, "://").concat(_domain, "/websocket?messageid=").concat(messageId, "&header=").concat(headerCode, "&sessionid=").concat(_sessionid, "&pid=").concat(_pid);
                  }

                  _context12.next = 6;
                  return this._runtime.httpReq({
                    url: url,
                    method: HttpMethod.POST,
                    body: writer.getCometData()
                  });

                case 6:
                  res = _context12.sent;
                  this.handleCometRes(res);

                case 8:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee10, this);
        }));
      }
    }, {
      key: "sendOnly",
      value: function sendOnly(writer) {
        this.sendCometData(writer);
      }
    }, {
      key: "send",
      value: function send(writer, respPBName, option) {
        var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : IM_SIGNAL_TIMEOUT;
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee11() {
          var _this61 = this;

          var messageId, identifier, respSignal, data;
          return regeneratorRuntime.wrap(function _callee11$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  messageId = this._generateMessageId();
                  writer.messageId = messageId;
                  this.sendCometData(writer);
                  identifier = writer.identifier;
                  _context13.next = 6;
                  return new Promise(function (resolve) {
                    var _this62 = this;

                    _newArrowCheck(this, _this61);

                    var key = formatResolveKey(messageId, identifier);
                    this._messageIds[key] = resolve;
                    setTimeout(function () {
                      _newArrowCheck(this, _this62);

                      delete this._messageIds[key];
                      resolve();
                    }.bind(this), timeout);
                  }.bind(this));

                case 6:
                  respSignal = _context13.sent;

                  if (respSignal) {
                    _context13.next = 9;
                    break;
                  }

                  return _context13.abrupt("return", {
                    code: ErrorCode$1.TIMEOUT
                  });

                case 9:
                  if (!(respSignal.status !== 0)) {
                    _context13.next = 11;
                    break;
                  }

                  return _context13.abrupt("return", {
                    code: respSignal.status
                  });

                case 11:
                  data = respPBName ? this.codec.decodeByPBName(respSignal.data, respPBName, option) : respSignal;
                  return _context13.abrupt("return", {
                    code: ErrorCode$1.SUCCESS,
                    data: data
                  });

                case 13:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee11, this);
        }));
      }
    }, {
      key: "close",
      value: function close() {
        this._isDisconnected = true;

        this._watcher.status(ConnectionStatus$1.DISCONNECTED);
      }
    }]);

    return CometChannel;
  }(ADataChannel);

  var getKey = function getKey(appkey, token) {
    _newArrowCheck(this, _this);

    return ['navi', appkey, token].join('_');
  }.bind(undefined);

  var getNaviInfoFromCache = function getNaviInfoFromCache(appkey, token, storage) {
    _newArrowCheck(this, _this);

    var key = getKey(appkey, token);
    var jsonStr = storage.getItem(key);

    if (!jsonStr) {
      return null;
    }

    var data;

    try {
      data = JSON.parse(jsonStr);
    } catch (err) {
      storage.removeItem(key);
      return null;
    }

    if (Date.now() - data.timestamp >= NAVI_CACHE_DURATION) {
      storage.removeItem(key);
      return null;
    }

    return data.naviInfo;
  }.bind(undefined);

  var setNaviInfo2Cache = function setNaviInfo2Cache(appkey, token, naviInfo, storage) {
    _newArrowCheck(this, _this);

    var key = getKey(appkey, token);
    var data = {
      naviInfo: naviInfo,
      timestamp: Date.now()
    };
    storage.setItem(key, JSON.stringify(data));
  }.bind(undefined);

  var clearCache = function clearCache(appkey, token, storage) {
    _newArrowCheck(this, _this);

    storage.removeItem(getKey(appkey, token));
  }.bind(undefined);

  var Navi = function () {
    function Navi(_runtime, _appkey, _navigators) {
      var _customCMP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      var _apiVersion = arguments.length > 4 ? arguments[4] : undefined;

      var _connectType = arguments.length > 5 ? arguments[5] : undefined;

      _classCallCheck(this, Navi);

      this._runtime = _runtime;
      this._appkey = _appkey;
      this._navigators = _navigators;
      this._customCMP = _customCMP;
      this._apiVersion = _apiVersion;
      this._connectType = _connectType;
      this._apiVersion = matchVersion(this._apiVersion);
    }

    _createClass(Navi, [{
      key: "_formatNaviUrl",
      value: function _formatNaviUrl(url, token, appkey, jsonpFunc, connectType) {
        var path = this._runtime.isSupportSocket() && connectType === 'websocket' ? 'navi' : 'cometnavi';
        var tmpUrl = "".concat(url, "/").concat(path, ".js?appId=").concat(appkey, "&token=").concat(encodeURIComponent(token), "&callBack=").concat(jsonpFunc, "&v=").concat(this._apiVersion, "&r=").concat(Date.now());
        return tmpUrl;
      }
    }, {
      key: "_reqNavi",
      value: function _reqNavi(uris, appkey, token, connectType) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee12() {
          var jsonpFunc, i, len, url, res, jsonStr, naviInfo, protocol;
          return regeneratorRuntime.wrap(function _callee12$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  jsonpFunc = 'getServerEndpoint';
                  i = 0, len = uris.length;

                case 2:
                  if (!(i < len)) {
                    _context14.next = 24;
                    break;
                  }

                  url = this._formatNaviUrl(uris[i], token, appkey, jsonpFunc, connectType);
                  logger.debug("req navi => ".concat(url));
                  _context14.next = 7;
                  return this._runtime.httpReq({
                    url: url,
                    timeout: NAVI_REQ_TIMEOUT
                  });

                case 7:
                  res = _context14.sent;

                  if (!(res.status !== 200)) {
                    _context14.next = 10;
                    break;
                  }

                  return _context14.abrupt("continue", 21);

                case 10:
                  _context14.prev = 10;
                  jsonStr = res.data.replace("".concat(jsonpFunc, "("), '').replace(/\);?$/, '');
                  naviInfo = JSON.parse(jsonStr);
                  protocol = /^https/.test(url) ? 'https' : 'http';
                  naviInfo.protocol = protocol;
                  return _context14.abrupt("return", naviInfo);

                case 18:
                  _context14.prev = 18;
                  _context14.t0 = _context14["catch"](10);
                  logger.error('parse navi err =>', _context14.t0);

                case 21:
                  i += 1;
                  _context14.next = 2;
                  break;

                case 24:
                  return _context14.abrupt("return", null);

                case 25:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee12, this, [[10, 18]]);
        }));
      }
    }, {
      key: "getInfo",
      value: function getInfo(token, dynamicUris, force, isCppMode) {
        var _a;

        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee13() {
          var _this63 = this;

          var connectUrl, _naviInfo, naviInfo, uris;

          return regeneratorRuntime.wrap(function _callee13$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  if (!isCppMode) {
                    _context15.next = 2;
                    break;
                  }

                  return _context15.abrupt("return", null);

                case 2:
                  if (this._runtime.useNavi) {
                    _context15.next = 7;
                    break;
                  }

                  if (this._runtime.isSupportSocket()) {
                    connectUrl = MINI_SOCKET_CONNECT_URIS.join(',');
                  } else {
                    connectUrl = MINI_COMET_CONNECT_URIS.join(',');
                  }

                  _naviInfo = {
                    code: 200,
                    protocol: 'https',
                    server: '',
                    voipCallInfo: '',
                    kvStorage: 0,
                    openHttpDNS: false,
                    historyMsg: false,
                    chatroomMsg: false,
                    uploadServer: 'https://upload.qiniup.com',
                    bosAddr: 'https://gz.bcebos.com',
                    location: '',
                    monitor: 0,
                    joinMChrm: false,
                    openMp: 0,
                    openUS: 0,
                    grpMsgLimit: 0,
                    isFormatted: 0,
                    gifSize: 2048,
                    logSwitch: 0,
                    logPolicy: '',
                    compDays: 0,
                    msgAck: '',
                    activeServer: '',
                    qnAddr: '',
                    extkitSwitch: 0,
                    alone: false,
                    voipServer: '',
                    offlinelogserver: '',
                    backupServer: ((_a = this._customCMP) === null || _a === void 0 ? void 0 : _a.length) ? this._customCMP.join(',') : connectUrl
                  };
                  setNaviInfo2Cache(this._appkey, token, _naviInfo, this._runtime.localStorage);
                  return _context15.abrupt("return", _naviInfo);

                case 7:
                  if (force) {
                    this._clear(token);
                  }

                  naviInfo = getNaviInfoFromCache(this._appkey, token, this._runtime.localStorage);

                  if (!naviInfo) {
                    _context15.next = 11;
                    break;
                  }

                  return _context15.abrupt("return", naviInfo);

                case 11:
                  uris = this._navigators.slice();
                  dynamicUris.length && dynamicUris.forEach(function (uri) {
                    _newArrowCheck(this, _this63);

                    uris.indexOf(uri) < 0 && uris.push(uri);
                  }.bind(this));
                  _context15.next = 15;
                  return this._reqNavi(uris, this._appkey, token, this._connectType);

                case 15:
                  naviInfo = _context15.sent;

                  if (!naviInfo) {
                    _context15.next = 19;
                    break;
                  }

                  setNaviInfo2Cache(this._appkey, token, naviInfo, this._runtime.localStorage);
                  return _context15.abrupt("return", naviInfo);

                case 19:
                  return _context15.abrupt("return", naviInfo);

                case 20:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee13, this);
        }));
      }
    }, {
      key: "getInfoFromCache",
      value: function getInfoFromCache(token) {
        return getNaviInfoFromCache(this._appkey, token, this._runtime.localStorage);
      }
    }, {
      key: "_clear",
      value: function _clear(token) {
        clearCache(this._appkey, token, this._runtime.localStorage);
      }
    }]);

    return Navi;
  }();

  var AEngine = function AEngine(runtime, _appkey, _watcher, _apiVersion, _options) {
    _classCallCheck(this, AEngine);

    this.runtime = runtime;
    this._appkey = _appkey;
    this._watcher = _watcher;
    this._apiVersion = _apiVersion;
    this._options = _options;
    this.currentUserId = '';
    this.connectedTime = 0;
  };

  var OUTBOX_KEY = 'outbox';
  var INBOX_KEY = 'inbox';

  var generateKey = function generateKey(prefix, appkey, userId) {
    _newArrowCheck(this, _this);

    return [prefix, appkey, userId].join('_');
  }.bind(undefined);

  var Letterbox = function () {
    function Letterbox(_runtime, _appkey) {
      _classCallCheck(this, Letterbox);

      this._runtime = _runtime;
      this._appkey = _appkey;
      this._inboxTime = 0;
      this._outboxTime = 0;
    }

    _createClass(Letterbox, [{
      key: "setInboxTime",
      value: function setInboxTime(timestamp, userId) {
        if (this._inboxTime > timestamp) {
          return;
        }

        this._inboxTime = timestamp;
        var key = generateKey(INBOX_KEY, this._appkey, userId);

        this._runtime.localStorage.setItem(key, timestamp.toString());
      }
    }, {
      key: "getInboxTime",
      value: function getInboxTime(userId) {
        if (this._inboxTime === 0) {
          var _key10 = generateKey(INBOX_KEY, this._appkey, userId);

          this._inboxTime = parseInt(this._runtime.localStorage.getItem(_key10)) || 0;
        }

        return this._inboxTime;
      }
    }, {
      key: "setOutboxTime",
      value: function setOutboxTime(timestamp, userId) {
        if (this._outboxTime > timestamp) {
          return;
        }

        this._outboxTime = timestamp;
        var key = generateKey(OUTBOX_KEY, this._appkey, userId);

        this._runtime.localStorage.setItem(key, timestamp.toString());
      }
    }, {
      key: "getOutboxTime",
      value: function getOutboxTime(userId) {
        if (this._outboxTime === 0) {
          var _key11 = generateKey(OUTBOX_KEY, this._appkey, userId);

          this._outboxTime = parseInt(this._runtime.localStorage.getItem(_key11)) || 0;
        }

        return this._outboxTime;
      }
    }]);

    return Letterbox;
  }();

  var PullTimeCache = {
    _caches: {},
    set: function set(chrmId, time) {
      this._caches[chrmId] = time;
    },
    get: function get(chrmId) {
      return this._caches[chrmId] || 0;
    },
    clear: function clear(chrmId) {
      this._caches[chrmId] = 0;
    }
  };

  var KVStore = function () {
    function KVStore(chatroomId, currentUserId) {
      _classCallCheck(this, KVStore);

      this._kvCaches = {};
      this._chatroomId = chatroomId;
      this._currentUserId = currentUserId;
    }

    _createClass(KVStore, [{
      key: "_add",
      value: function _add(kv) {
        var key = kv.key;
        kv.isDeleted = false;
        this._kvCaches[key] = kv;
      }
    }, {
      key: "_remove",
      value: function _remove(kv) {
        var key = kv.key;
        var cacheKV = this._kvCaches[key];
        cacheKV.isDeleted = true;
        this._kvCaches[key] = cacheKV;
      }
    }, {
      key: "_setEntry",
      value: function _setEntry(data, isFullUpdate) {
        var key = data.key,
            type = data.type,
            isOverwrite = data.isOverwrite,
            userId = data.userId;

        var latestUserId = this._getSetUserId(key);

        var isDeleteOpt = type === ChatroomEntryType$1.DELETE;
        var isSameAtLastSetUser = latestUserId === userId;
        var isKeyNotExist = !this._isExisted(key);
        var event = isDeleteOpt ? this._remove : this._add;

        if (isFullUpdate) {
          event.call(this, data);
        } else if (isOverwrite || isSameAtLastSetUser || isKeyNotExist) {
          event.call(this, data);
        } else ;
      }
    }, {
      key: "getValue",
      value: function getValue(key) {
        var kv = this._kvCaches[key] || {};
        var isDeleted = kv.isDeleted;
        return isDeleted ? null : kv.value;
      }
    }, {
      key: "getAllValue",
      value: function getAllValue() {
        var entries = {};

        for (var _key12 in this._kvCaches) {
          if (!this._kvCaches[_key12].isDeleted) {
            entries[_key12] = this._kvCaches[_key12].value;
          }
        }

        return entries;
      }
    }, {
      key: "_getSetUserId",
      value: function _getSetUserId(key) {
        var cache = this._kvCaches[key] || {};
        return cache.userId;
      }
    }, {
      key: "_isExisted",
      value: function _isExisted(key) {
        var cache = this._kvCaches[key] || {};
        var value = cache.value,
            isDeleted = cache.isDeleted;
        return value && !isDeleted;
      }
    }, {
      key: "setEntries",
      value: function setEntries(data) {
        var _this64 = this;

        var kvEntries = data.kvEntries,
            isFullUpdate = data.isFullUpdate;
        kvEntries = kvEntries || [];
        isFullUpdate = isFullUpdate || false;
        isFullUpdate && this.clear();
        kvEntries.forEach(function (kv) {
          _newArrowCheck(this, _this64);

          this._setEntry(kv, isFullUpdate);
        }.bind(this));
      }
    }, {
      key: "clear",
      value: function clear() {
        this._kvCaches = {};
      }
    }]);

    return KVStore;
  }();

  var ChrmEntryHandler = function () {
    function ChrmEntryHandler(engine) {
      _classCallCheck(this, ChrmEntryHandler);

      this._pullQueue = [];
      this._isPulling = false;
      this._storeCaches = {};
      this._engine = engine;
    }

    _createClass(ChrmEntryHandler, [{
      key: "_startPull",
      value: function _startPull() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee14() {
          var _this$_pullQueue$spli, chrmId, timestamp, pulledUpTime, _yield$this$_engine$p, code, data;

          return regeneratorRuntime.wrap(function _callee14$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  if (!(this._isPulling || this._pullQueue.length === 0)) {
                    _context16.next = 2;
                    break;
                  }

                  return _context16.abrupt("return");

                case 2:
                  this._isPulling = true;
                  _this$_pullQueue$spli = this._pullQueue.splice(0, 1)[0], chrmId = _this$_pullQueue$spli.chrmId, timestamp = _this$_pullQueue$spli.timestamp;
                  pulledUpTime = PullTimeCache.get(chrmId);

                  if (!(pulledUpTime > timestamp)) {
                    _context16.next = 8;
                    break;
                  }

                  this._isPulling = false;
                  return _context16.abrupt("return");

                case 8:
                  _context16.next = 10;
                  return this._engine.pullChatroomEntry(chrmId, timestamp);

                case 10:
                  _yield$this$_engine$p = _context16.sent;
                  code = _yield$this$_engine$p.code;
                  data = _yield$this$_engine$p.data;

                  if (code === ErrorCode$1.SUCCESS) {
                    this._isPulling = false;
                    PullTimeCache.set(chrmId, data.syncTime || 0);

                    this._startPull();
                  } else {
                    this._startPull();
                  }

                case 14:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee14, this);
        }));
      }
    }, {
      key: "reset",
      value: function reset(chrmId) {
        PullTimeCache.clear(chrmId);
        var kvStore = this._storeCaches[chrmId];
        kvStore.clear();
      }
    }, {
      key: "pullEntry",
      value: function pullEntry(chrmId, timestamp) {
        this._pullQueue.push({
          chrmId: chrmId,
          timestamp: timestamp
        });

        this._startPull();
      }
    }, {
      key: "setLocal",
      value: function setLocal(chrmId, data, userId) {
        var kvStore = this._storeCaches[chrmId];

        if (!notEmptyObject(kvStore)) {
          kvStore = new KVStore(chrmId, userId);
        }

        kvStore.setEntries(data);
        this._storeCaches[chrmId] = kvStore;
      }
    }, {
      key: "getValue",
      value: function getValue(chrmId, key) {
        var kvStore = this._storeCaches[chrmId];
        return kvStore ? kvStore.getValue(key) : null;
      }
    }, {
      key: "getAll",
      value: function getAll(chrmId) {
        var kvStore = this._storeCaches[chrmId];
        var entries = {};

        if (kvStore) {
          entries = kvStore.getAllValue();
        }

        return entries;
      }
    }]);

    return ChrmEntryHandler;
  }();

  var JoinedChrmManager = function () {
    function JoinedChrmManager(_runtime, _appkey, _userId, _canJoinMulipleChrm) {
      _classCallCheck(this, JoinedChrmManager);

      this._runtime = _runtime;
      this._appkey = _appkey;
      this._userId = _userId;
      this._canJoinMulipleChrm = _canJoinMulipleChrm;
      this._sessionKey = '';
      this._joinedChrmsInfo = {};
      this._sessionKey = "sync-chrm-".concat(this._appkey, "-").concat(this._userId);
    }

    _createClass(JoinedChrmManager, [{
      key: "set",
      value: function set(chrmId) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        !this._canJoinMulipleChrm && (this._joinedChrmsInfo = {});
        this._joinedChrmsInfo[chrmId] = count;

        this._runtime.sessionStorage.setItem(this._sessionKey, JSON.stringify(this._joinedChrmsInfo));
      }
    }, {
      key: "get",
      value: function get() {
        var infos;

        try {
          infos = this._runtime.sessionStorage.getItem(this._sessionKey);
        } catch (err) {
          logger.error('parse rejoined chrm infos error', err);
          infos = {};
        }

        return infos;
      }
    }, {
      key: "remove",
      value: function remove(chrmId) {
        delete this._joinedChrmsInfo[chrmId];

        if (notEmptyObject(this._joinedChrmsInfo)) {
          this._runtime.sessionStorage.setItem(this._sessionKey, JSON.stringify(this._joinedChrmsInfo));
        } else {
          this.clear();
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this._joinedChrmsInfo = {};

        this._runtime.sessionStorage.removeItem(this._sessionKey);
      }
    }]);

    return JoinedChrmManager;
  }();

  var EventDispatcher = function () {
    function EventDispatcher() {
      _classCallCheck(this, EventDispatcher);

      this._map = {};
    }

    _createClass(EventDispatcher, [{
      key: "on",
      value: function on(eventType, listener) {
        var arr = this._map[eventType] || (this._map[eventType] = []);

        if (arr.includes(listener)) {
          return;
        }

        arr.push(listener);
      }
    }, {
      key: "off",
      value: function off(eventType, listener) {
        var arr = this._map[eventType];

        if (!arr) {
          return;
        }

        var len = arr.length;

        for (var i = len - 1; i >= 0; i -= 1) {
          if (arr[i] === listener) {
            arr.splice(i, 1);

            if (len === 1) {
              delete this._map[eventType];
            }

            break;
          }
        }
      }
    }, {
      key: "emit",
      value: function emit(eventType, data) {
        var _this65 = this;

        var arr = this._map[eventType];

        if (!arr) {
          return;
        }

        arr.forEach(function (item) {
          _newArrowCheck(this, _this65);

          return item(data);
        }.bind(this));
      }
    }, {
      key: "removeAll",
      value: function removeAll(eventType) {
        delete this._map[eventType];
      }
    }, {
      key: "clear",
      value: function clear() {
        Object.keys(this._map).forEach(this.removeAll, this);
      }
    }]);

    return EventDispatcher;
  }();

  var EventName = {
    STATUS_CHANGED: 'converStatusChanged'
  };

  var ConversationStatus = function () {
    function ConversationStatus(engine, appkey, currentUserId) {
      _classCallCheck(this, ConversationStatus);

      this._eventEmitter = new EventDispatcher();
      this._pullQueue = [];
      this._isPulling = false;
      this._storage = createRootStorage(engine.runtime);
      this._appkey = appkey;
      this._currentUserId = currentUserId;
      this._engine = engine;
      this._storagePullTimeKey = "con-s-".concat(appkey, "-").concat(currentUserId);
    }

    _createClass(ConversationStatus, [{
      key: "_set",
      value: function _set(list) {
        var _this66 = this;

        if (isUndefined(list)) {
          return;
        }

        var localTime = this._storage.get(this._storagePullTimeKey) || 0;
        var listCount = list.length;
        list.forEach(function (statusItem, index) {
          _newArrowCheck(this, _this66);

          var updatedTime = statusItem.updatedTime || 0;
          localTime = updatedTime > localTime ? updatedTime : localTime;
          statusItem.conversationType = statusItem.type;

          this._eventEmitter.emit(EventName.STATUS_CHANGED, {
            statusItem: statusItem,
            isLastPull: index === listCount - 1
          });
        }.bind(this));

        this._storage.set(this._storagePullTimeKey, localTime);
      }
    }, {
      key: "_startPull",
      value: function _startPull() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee15() {
          var time, _yield$this$_engine$p2, code, data;

          return regeneratorRuntime.wrap(function _callee15$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  if (!(this._isPulling || this._pullQueue.length === 0)) {
                    _context17.next = 2;
                    break;
                  }

                  return _context17.abrupt("return");

                case 2:
                  this._isPulling = true;
                  time = this._pullQueue.splice(0, 1)[0];
                  _context17.next = 6;
                  return this._engine.pullConversationStatus(time);

                case 6:
                  _yield$this$_engine$p2 = _context17.sent;
                  code = _yield$this$_engine$p2.code;
                  data = _yield$this$_engine$p2.data;

                  if (code === ErrorCode$1.SUCCESS) {
                    this._isPulling = false;

                    this._set(data);

                    this._startPull();
                  } else {
                    this._startPull();
                  }

                case 10:
                case "end":
                  return _context17.stop();
              }
            }
          }, _callee15, this);
        }));
      }
    }, {
      key: "pull",
      value: function pull(newPullTime) {
        var time = this._storage.get(this._storagePullTimeKey) || 0;

        if (newPullTime > time || newPullTime === 0) {
          this._pullQueue.push(time);

          this._startPull();
        }
      }
    }, {
      key: "watch",
      value: function watch(event) {
        var _this67 = this;

        this._eventEmitter.on(EventName.STATUS_CHANGED, function (data) {
          _newArrowCheck(this, _this67);

          event(data);
        }.bind(this));
      }
    }, {
      key: "unwatch",
      value: function unwatch() {
        var _this68 = this;

        this._eventEmitter.off(EventName.STATUS_CHANGED, function (data) {
          _newArrowCheck(this, _this68);
        }.bind(this));
      }
    }]);

    return ConversationStatus;
  }();

  var StorageKey2ConversationKey = {
    c: {
      keyName: 'unreadMessageCount',
      defaultVal: 0
    },
    hm: {
      keyName: 'hasMentioned',
      defaultVal: false
    },
    m: {
      keyName: 'mentionedInfo',
      defaultVal: null
    },
    t: {
      keyName: 'lastUnreadTime',
      defaultVal: 0
    },
    nc: {
      keyName: 'notificationStatus',
      defaultVal: 2
    },
    to: {
      keyName: 'isTop',
      defaultVal: false
    }
  };
  var ConversationKey2StorageKey = {};

  for (var _key13 in StorageKey2ConversationKey) {
    var keyName = StorageKey2ConversationKey[_key13].keyName;
    ConversationKey2StorageKey[keyName] = _key13;
  }

  var ConversationStore = function () {
    function ConversationStore(runtime, _appkey, _currentUserId) {
      _classCallCheck(this, ConversationStore);

      this._appkey = _appkey;
      this._currentUserId = _currentUserId;
      var suffix = "con-".concat(_appkey, "-").concat(_currentUserId);
      this.storage = new AppStorage(runtime, suffix);
    }

    _createClass(ConversationStore, [{
      key: "_getStoreKey",
      value: function _getStoreKey(type, targetId) {
        return "".concat(type, "_").concat(targetId);
      }
    }, {
      key: "_getConOptionByKey",
      value: function _getConOptionByKey(key) {
        key = key || '';
        var arr = key.split('_');

        if (arr.length === 2) {
          return {
            conversationType: arr[0],
            targetId: arr[1]
          };
        } else {
          return {
            conversationType: ConversationType$1.PRIVATE,
            targetId: ''
          };
        }
      }
    }, {
      key: "updateMentionedData",
      value: function updateMentionedData(message) {
        var _this69 = this;

        var conversationType = message.conversationType,
            targetId = message.targetId,
            messageType = message.messageType,
            isMentioned = message.isMentioned,
            content = message.content,
            senderUserId = message.senderUserId;

        var key = this._getStoreKey(conversationType, targetId);

        var local = this.storage.get(key) || {};
        var storageMetionedInfoKey = ConversationKey2StorageKey.mentionedInfo;
        var storageHasMentionedKey = ConversationKey2StorageKey.hasMentioned;
        var updatedUserIdList = [];
        var localMentionedInfo = local[storageMetionedInfoKey] || {};
        var localUserIdList = localMentionedInfo.userIdList || [];
        var mentionedInfo = content.mentionedInfo;

        if (isMentioned && conversationType === ConversationType$1.GROUP && mentionedInfo.userIdList) {
          var receiveUserIdList = mentionedInfo.userIdList;
          var isNotIncludeSender = localUserIdList.indexOf(senderUserId) < 0;
          receiveUserIdList.forEach(function (userId) {
            _newArrowCheck(this, _this69);

            if (userId === this._currentUserId && isNotIncludeSender) {
              localUserIdList.push(senderUserId);
            }
          }.bind(this));

          if (mentionedInfo.type === MentionedType$1.ALL && localUserIdList.indexOf(senderUserId) < 0) {
            localUserIdList.push(senderUserId);
          }

          updatedUserIdList = localUserIdList;
        }

        if (messageType === MessageType$1.RECALL && conversationType === ConversationType$1.GROUP) {
          var list = localUserIdList;
          localUserIdList.forEach(function (userId, index) {
            _newArrowCheck(this, _this69);

            if (userId === senderUserId) {
              list.splice(index, 1);
            }
          }.bind(this));
          updatedUserIdList = list;
        }

        mentionedInfo = {
          userIdList: updatedUserIdList,
          type: mentionedInfo === null || mentionedInfo === void 0 ? void 0 : mentionedInfo.type
        };

        if (updatedUserIdList.length !== 0) {
          local[storageMetionedInfoKey] = mentionedInfo;
          local[storageHasMentionedKey] = true;
        } else {
          delete local[storageMetionedInfoKey];
          delete local[storageHasMentionedKey];
        }

        if (notEmptyObject(local)) {
          this.storage.set(key, local);
        } else {
          this.storage.remove(key);
        }
      }
    }, {
      key: "set",
      value: function set(type, targetId, conversation) {
        var key = this._getStoreKey(type, targetId);

        var local = this.storage.get(key) || {};

        for (var _key14 in conversation) {
          var storageKey = ConversationKey2StorageKey[_key14];
          var val = conversation[_key14];

          if (isUndefined(storageKey) || isUndefined(val) || _key14 === 'hasMentioned' || _key14 === 'MentionedInfo') {
            continue;
          }

          var defaultVal = StorageKey2ConversationKey[storageKey].defaultVal;

          if (val === defaultVal) {
            delete local[storageKey];
          } else {
            local[storageKey] = val;
          }

          if (!local.c) {
            delete local.t;
          }
        }

        if (notEmptyObject(local)) {
          this.storage.set(key, local);
        } else {
          this.storage.remove(key);
        }
      }
    }, {
      key: "get",
      value: function get(type, targetId) {
        var key = this._getStoreKey(type, targetId);

        var local = this.storage.get(key) || {};
        var conversation = {};

        for (var _key15 in StorageKey2ConversationKey) {
          var _StorageKey2Conversat = StorageKey2ConversationKey[_key15],
              _keyName = _StorageKey2Conversat.keyName,
              defaultVal = _StorageKey2Conversat.defaultVal;
          conversation[_keyName] = local[_key15] || defaultVal;
        }

        return conversation;
      }
    }, {
      key: "getValue",
      value: function getValue(func) {
        var values = this.storage.getValues() || {};
        var storageConversationList = [];

        for (var _key16 in values) {
          var _this$_getConOptionBy = this._getConOptionByKey(_key16),
              conversationType = _this$_getConOptionBy.conversationType,
              targetId = _this$_getConOptionBy.targetId;

          var conversation = {};
          var store = values[_key16];

          for (var storeKey in store) {
            var _StorageKey2Conversat2 = StorageKey2ConversationKey[storeKey],
                _keyName2 = _StorageKey2Conversat2.keyName,
                defaultVal = _StorageKey2Conversat2.defaultVal;
            conversation[_keyName2] = store[storeKey] || defaultVal;
          }

          conversation = Object.assign(conversation, {
            conversationType: conversationType,
            targetId: targetId
          });
          conversation = func ? func(conversation) : conversation;
          storageConversationList.push(conversation);
        }

        return storageConversationList;
      }
    }]);

    return ConversationStore;
  }();

  var saveConversationType = [ConversationType$1.PRIVATE, ConversationType$1.GROUP, ConversationType$1.SYSTEM];
  var EventName$1 = {
    CHANGED: 'conversationChanged'
  };

  var ConversationManager = function () {
    function ConversationManager(engine, appkey, userId, updatedConversationFunc) {
      var _this70 = this;

      _classCallCheck(this, ConversationManager);

      this._updatedConversations = {};
      this._eventEmitter = new EventDispatcher();
      this._draftMap = {};
      this._appkey = appkey;
      this._loginUserId = userId;
      this._store = new ConversationStore(engine.runtime, appkey, userId);
      this._statusManager = new ConversationStatus(engine, appkey, userId);

      this._statusManager.watch(function (data) {
        _newArrowCheck(this, _this70);

        var statusItem = data.statusItem,
            isLastPull = data.isLastPull;
        this.addStatus(statusItem, isLastPull);
      }.bind(this));

      this._eventEmitter.on(EventName$1.CHANGED, function (data) {
        _newArrowCheck(this, _this70);

        updatedConversationFunc(data);
      }.bind(this));
    }

    _createClass(ConversationManager, [{
      key: "_calcUnreadCount",
      value: function _calcUnreadCount(message, localConversation) {
        var content = message.content,
            messageType = message.messageType,
            sentTime = message.sentTime,
            isCounted = message.isCounted,
            messageDirection = message.messageDirection,
            senderUserId = message.senderUserId;
        var isSelfSend = messageDirection === MessageDirection$1.SEND && senderUserId === this._loginUserId;
        var isRecall = messageType === MessageType$1.RECALL;
        var hasContent = isObject(content);
        var hasChanged = false;
        var lastUnreadTime = localConversation.lastUnreadTime || 0;
        var unreadMessageCount = localConversation.unreadMessageCount || 0;
        var hasBeenAdded = lastUnreadTime > sentTime;

        if (hasBeenAdded || isSelfSend) {
          return {
            hasChanged: hasChanged,
            localConversation: localConversation
          };
        }

        if (isCounted) {
          localConversation.unreadMessageCount = unreadMessageCount + 1;
          localConversation.lastUnreadTime = sentTime;
          hasChanged = true;
        }

        if (isRecall && hasContent) {
          var isNotRead = lastUnreadTime >= content.sentTime;

          if (isNotRead && unreadMessageCount) {
            localConversation.unreadMessageCount = unreadMessageCount - 1;
            hasChanged = true;
          }
        }

        return {
          hasChanged: hasChanged,
          localConversation: localConversation
        };
      }
    }, {
      key: "_calcMentionedInfo",
      value: function _calcMentionedInfo(message, localConversation) {
        var content = message.content,
            messageDirection = message.messageDirection,
            isMentioned = message.isMentioned;
        var isSelfSend = messageDirection === MessageDirection$1.SEND;
        var hasContent = isObject(content);
        var hasChanged = false;

        if (isMentioned && hasContent && content.mentionedInfo) {
          localConversation.hasMentioned = true;
          // localConversation.mentionedInfo = content.mentionedInfo;
          hasChanged = true;
        }

        return {
          hasChanged: hasChanged,
          localConversation: localConversation
        };
      }
    }, {
      key: "_setUpdatedConversation",
      value: function _setUpdatedConversation(updatedConOptions) {
        if (isObject(updatedConOptions)) {
          var conversationType = updatedConOptions.conversationType,
              targetId = updatedConOptions.targetId;

          var _key17 = "".concat(conversationType, "_").concat(targetId);

          var cacheConversation = this._store.get(conversationType, targetId) || {};
          this._updatedConversations[_key17] = Object.assign(cacheConversation, updatedConOptions);
        }
      }
    }, {
      key: "addStatus",
      value: function addStatus(statusItem, isLastPull) {
        var conversationType = statusItem.conversationType,
            targetId = statusItem.targetId,
            updatedTime = statusItem.updatedTime,
            notificationStatus = statusItem.notificationStatus,
            isTop = statusItem.isTop;
        var updatedItems = {};

        if (!isUndefined(notificationStatus)) {
          updatedItems.notificationStatus = {
            time: updatedTime,
            val: notificationStatus
          };
        }

        if (!isUndefined(isTop)) {
          updatedItems.isTop = {
            time: updatedTime,
            val: isTop
          };
        }

        this._store.set(conversationType, targetId, {
          notificationStatus: notificationStatus,
          isTop: isTop
        });

        this._setUpdatedConversation({
          conversationType: conversationType,
          targetId: targetId,
          updatedItems: updatedItems
        });

        if (isLastPull) {
          this._notifyConversationChanged();
        }
      }
    }, {
      key: "_notifyConversationChanged",
      value: function _notifyConversationChanged() {
        var list = [];

        for (var _key18 in this._updatedConversations) {
          list.push(this._updatedConversations[_key18]);
        }

        this._eventEmitter.emit(EventName$1.CHANGED, list);

        this._updatedConversations = {};
      }
    }, {
      key: "setConversationCacheByMessage",
      value: function setConversationCacheByMessage(message, isPullMessageFinished) {
        var _this71 = this;

        var conversationType = message.conversationType,
            isPersited = message.isPersited,
            targetId = message.targetId;
        var isSaveConversationType = saveConversationType.indexOf(conversationType) >= 0;

        if (!isSaveConversationType) {
          return;
        }

        var hasChanged = false;

        var storageConversation = this._store.get(conversationType, targetId);

        var CalcEvents = [this._calcUnreadCount, this._calcMentionedInfo];
        CalcEvents.forEach(function (func) {
          _newArrowCheck(this, _this71);

          var _func$call = func.call(this, message, storageConversation),
              hasCaclChanged = _func$call.hasChanged,
              localConversation = _func$call.localConversation;

          hasChanged = hasChanged || hasCaclChanged;
          storageConversation = cloneByJSON(localConversation);
        }.bind(this));

        if (hasChanged) {
          this._store.set(conversationType, targetId, storageConversation);
        }

        this._store.updateMentionedData(message);

        if (isPersited) {
          var conversation = this._store.get(conversationType, targetId);

          conversation.updatedItems = {
            latestMessage: {
              time: message.sentTime,
              val: message
            }
          };
          conversation.latestMessage = message;
          var updateConOptions = Object.assign(conversation, {
            conversationType: conversationType,
            targetId: targetId
          });

          this._setUpdatedConversation(updateConOptions);
        }

        if (isPullMessageFinished) {
          this._notifyConversationChanged();
        }
      }
    }, {
      key: "get",
      value: function get(conversationType, targetId) {
        return this._store.get(conversationType, targetId);
      }
    }, {
      key: "getAllUnreadCount",
      value: function getAllUnreadCount() {
        var _this72 = this;

        var conversationList = this._store.getValue();

        var totalCount = 0;
        conversationList.forEach(function (_ref) {
          _newArrowCheck(this, _this72);

          var unreadMessageCount = _ref.unreadMessageCount;
          unreadMessageCount = unreadMessageCount || 0;
          totalCount += Number(unreadMessageCount);
        }.bind(this));
        return totalCount;
      }
    }, {
      key: "getUnreadCount",
      value: function getUnreadCount(conversationType, targetId) {
        var conversation = this._store.get(conversationType, targetId);

        return conversation.unreadMessageCount || 0;
      }
    }, {
      key: "clearUnreadCount",
      value: function clearUnreadCount(conversationType, targetId) {
        var conversation = this._store.get(conversationType, targetId);

        var unreadMessageCount = conversation.unreadMessageCount,
            hasMentioned = conversation.hasMentioned;

        if (unreadMessageCount || hasMentioned) {
          conversation.unreadMessageCount = 0;
          conversation.hasMentioned = false;
        }

        this._store.set(conversationType, targetId, conversation);

        var updateConOptions = Object.assign(conversation, {
          conversationType: conversationType,
          targetId: targetId
        });

        this._setUpdatedConversation(updateConOptions);

        this._notifyConversationChanged();
      }
    }, {
      key: "startPullConversationStatus",
      value: function startPullConversationStatus(time) {
        this._statusManager.pull(time);
      }
    }, {
      key: "setDraft",
      value: function setDraft(conversationType, targetId, draft) {
        var key = "".concat(conversationType, "_").concat(targetId);
        this._draftMap[key] = draft;
      }
    }, {
      key: "getDraft",
      value: function getDraft(conversationType, targetId) {
        var key = "".concat(conversationType, "_").concat(targetId);
        return this._draftMap[key];
      }
    }, {
      key: "clearDraft",
      value: function clearDraft(conversationType, targetId) {
        var key = "".concat(conversationType, "_").concat(targetId);
        delete this._draftMap[key];
      }
    }]);

    return ConversationManager;
  }();

  var UploadMethod;

  (function (UploadMethod) {
    UploadMethod[UploadMethod["QINIU"] = 1] = "QINIU";
    UploadMethod[UploadMethod["ALI"] = 2] = "ALI";
  })(UploadMethod || (UploadMethod = {}));

  var UploadMethod$1 = UploadMethod;

  var getUploadFileName = function getUploadFileName(type, fileName) {
    _newArrowCheck(this, _this);

    var random = Math.floor(Math.random() * 1000 % 10000);
    var uuid = getUUID();
    var date = formatDate();
    var timestamp = new Date().getTime();
    var extension = '';

    if (fileName) {
      var fileNameArr = fileName.split('.');
      extension = '.' + fileNameArr[fileNameArr.length - 1];
    }

    return "".concat(type, "__RC-").concat(date, "_").concat(random, "_").concat(timestamp).concat(uuid).concat(extension);
  }.bind(undefined);

  var getMimeKey = function getMimeKey(fileType) {
    _newArrowCheck(this, _this);

    var mimeKey = 'application/octet-stream';

    switch (fileType) {
      case FileType$1.IMAGE:
        mimeKey = 'image/jpeg';
        break;

      case FileType$1.AUDIO:
        mimeKey = 'audio/amr';
        break;

      case FileType$1.VIDEO:
        mimeKey = 'video/3gpp';
        break;

      case FileType$1.SIGHT:
        mimeKey = 'video/mpeg4';
        break;

      case FileType$1.COMBINE_HTML:
        mimeKey = 'text/html';
        break;
    }

    return mimeKey;
  }.bind(undefined);

  var pushConfigsToJSON = function pushConfigsToJSON() {
    var iOSConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var androidConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var threadId = iOSConfig.threadId,
        apnsCollapseId = iOSConfig.apnsCollapseId;
    var channelIdMi = androidConfig.channelIdMi,
        channelIdHW = androidConfig.channelIdHW,
        channelIdOPPO = androidConfig.channelIdOPPO,
        typeVivo = androidConfig.typeVivo;
    var APNS = {};
    APNS['thread-id'] = threadId || '';
    APNS['apns-collapse-id'] = apnsCollapseId || '';
    var pushCongfigs = [{
      HW: {
        channelId: channelIdHW || ''
      }
    }, {
      MI: {
        channelId: channelIdMi || ''
      }
    }, {
      OPPO: {
        channelId: channelIdOPPO || ''
      }
    }, {
      VIVO: {
        classification: typeVivo || ''
      }
    }, {
      APNS: APNS
    }];
    return JSON.stringify(pushCongfigs);
  };

  var getPubTopic = function getPubTopic(type) {
    var _ConversationType$1$P;

    _newArrowCheck(this, _this);

    return (_ConversationType$1$P = {}, _defineProperty(_ConversationType$1$P, ConversationType$1.PRIVATE, Topic$1.ppMsgP), _defineProperty(_ConversationType$1$P, ConversationType$1.GROUP, Topic$1.pgMsgP), _defineProperty(_ConversationType$1$P, ConversationType$1.CHATROOM, Topic$1.chatMsg), _defineProperty(_ConversationType$1$P, ConversationType$1.CUSTOMER_SERVICE, Topic$1.pcMsgP), _defineProperty(_ConversationType$1$P, ConversationType$1.RTC_ROOM, Topic$1.prMsgS), _ConversationType$1$P)[type];
  }.bind(undefined);

  var getStatPubTopic = function getStatPubTopic(type) {
    var _ConversationType$1$P2;

    _newArrowCheck(this, _this);

    return (_ConversationType$1$P2 = {}, _defineProperty(_ConversationType$1$P2, ConversationType$1.PRIVATE, Topic$1.ppMsgS), _defineProperty(_ConversationType$1$P2, ConversationType$1.GROUP, Topic$1.pgMsgS), _ConversationType$1$P2)[type];
  }.bind(undefined);

  var transSentAttrs2IReceivedMessage = function transSentAttrs2IReceivedMessage(conversationType, targetId, options, messageUId, sentTime, senderUserId) {
    _newArrowCheck(this, _this);

    return {
      conversationType: conversationType,
      targetId: targetId,
      senderUserId: senderUserId,
      messageDirection: MessageDirection$1.SEND,
      isCounted: !!options.isCounted,
      isMentioned: !!options.isMentioned,
      content: options.content,
      messageType: options.messageType,
      isOffLineMessage: false,
      isPersited: !!options.isPersited,
      messageUId: messageUId,
      sentTime: sentTime,
      receivedTime: 0,
      disableNotification: !!options.disableNotification,
      isStatusMessage: !!options.isStatusMessage,
      canIncludeExpansion: !!options.canIncludeExpansion,
      expansion: options.canIncludeExpansion ? options.expansion : null,
      receivedStatus: ReceivedStatus$1.UNREAD
    };
  }.bind(undefined);

  var JSEngine = function (_AEngine) {
    _inherits(JSEngine, _AEngine);

    var _super18 = _createSuper(JSEngine);

    function JSEngine(runtime, appkey, watcher, apiVersion) {
      var _this73;

      _classCallCheck(this, JSEngine);

      _this73 = _super18.call(this, runtime, appkey, watcher, apiVersion, {});
      _this73._customMessageType = {};
      _this73._pullingMsg = false;
      _this73._pullQueue = [];
      _this73._chrmsQueue = {};
      _this73._letterbox = new Letterbox(runtime, appkey);
      _this73._chrmEntryHandler = new ChrmEntryHandler(_assertThisInitialized(_this73));
      return _this73;
    }

    _createClass(JSEngine, [{
      key: "connect",
      value: function connect(token, naviInfo, connectType) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee16() {
          var _this74 = this;

          var hosts, backupServer, channel, code;
          return regeneratorRuntime.wrap(function _callee16$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  hosts = [];
                  this._naviInfo = naviInfo;

                  if (naviInfo.server) {
                    hosts.push(naviInfo.server);
                  } else {
                    logger.warn('navi.server is invalid');
                  }

                  backupServer = naviInfo.backupServer;
                  backupServer && backupServer.split(',').forEach(function (host) {
                    _newArrowCheck(this, _this74);

                    if (hosts.indexOf(host) < 0) {
                      hosts.push(host);
                    }
                  }.bind(this));

                  if (!(hosts.length === 0)) {
                    _context18.next = 8;
                    break;
                  }

                  logger.error('navi invaild.', hosts);
                  return _context18.abrupt("return", ErrorCode$1.UNKNOWN);

                case 8:
                  channel = this.runtime.createDataChannel({
                    status: function status(_status) {
                      _newArrowCheck(this, _this74);

                      this._connectionStatusHandler(_status, token, hosts, naviInfo.protocol);
                    }.bind(this),
                    signal: this._signalHandler.bind(this)
                  }, connectType);
                  _context18.next = 11;
                  return channel.connect(this._appkey, token, hosts, naviInfo.protocol, this._apiVersion);

                case 11:
                  code = _context18.sent;

                  if (code === ErrorCode$1.SUCCESS) {
                    this._channel = channel;
                    this.currentUserId = channel.userId;
                    this.connectedTime = channel.connectedTime;
                    this._conversationManager = new ConversationManager(this, this._appkey, this.currentUserId, this._watcher.conversation);

                    this._conversationManager.startPullConversationStatus(0);

                    this._joinedChrmManager = new JoinedChrmManager(this.runtime, this._appkey, this.currentUserId, naviInfo.joinMChrm);

                    this._syncMsg();
                  } else {
                    channel.close();
                  }

                  return _context18.abrupt("return", code);

                case 14:
                case "end":
                  return _context18.stop();
              }
            }
          }, _callee16, this);
        }));
      }
    }, {
      key: "_connectionStatusHandler",
      value: function _connectionStatusHandler(status, token, hosts, protocol) {
        logger.warn('connection status changed:', status);

        if (status === ConnectionStatus$1.CONNECTING || status === ConnectionStatus$1.CONNECTED) {
          this._watcher.status(status);

          return;
        }

        if (!this._channel || status === ConnectionStatus$1.DISCONNECTED) {
          this._watcher.status(status);

          return;
        }

        if (status === ConnectionStatus$1.BLOCKED || status === ConnectionStatus$1.KICKED_OFFLINE_BY_OTHER_CLIENT) {
          this.disconnect();

          this._watcher.status(status);

          return;
        }

        this._try2Reconnect(token, hosts, protocol);
      }
    }, {
      key: "_try2Reconnect",
      value: function _try2Reconnect(token, hosts, protocol) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee17() {
          var _this75 = this;

          var code;
          return regeneratorRuntime.wrap(function _callee17$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  if (this._channel) {
                    _context19.next = 2;
                    break;
                  }

                  return _context19.abrupt("return");

                case 2:
                  _context19.next = 4;
                  return this._channel.connect(this._appkey, token, hosts, protocol, this._apiVersion);

                case 4:
                  code = _context19.sent;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context19.next = 8;
                    break;
                  }

                  this._rejoinChrm();

                  return _context19.abrupt("return");

                case 8:
                  this._watcher.status(ConnectionStatus$1.WEBSOCKET_UNAVAILABLE);

                  setTimeout(function () {
                    _newArrowCheck(this, _this75);

                    this._try2Reconnect(token, hosts, protocol);
                  }.bind(this), 5000);

                case 10:
                case "end":
                  return _context19.stop();
              }
            }
          }, _callee17, this);
        }));
      }
    }, {
      key: "_signalHandler",
      value: function _signalHandler(signal, ack) {
        var syncMsg = signal.syncMsg,
            topic = signal.topic;

        if (syncMsg) {
          this._receiveSyncMsg(signal, ack);

          return;
        }

        var tmpTopic = Topic$1[topic];

        if (!tmpTopic) {
          logger.error('unknown topic:', topic);
          return;
        }

        switch (tmpTopic) {
          case Topic$1.s_ntf:
            this._pullMsg(signal);

            break;

          case Topic$1.s_msg:
            this._receiveMsg(signal);

            break;

          case Topic$1.s_cmd:
            this._receiveStateNotify(signal);

            break;

          case Topic$1.s_us:
            this._receiveSettingNotify(signal);

            break;
        }
      }
    }, {
      key: "_receiveStateNotify",
      value: function _receiveStateNotify(signal) {
        var _a;

        var _ref2 = (_a = this._channel) === null || _a === void 0 ? void 0 : _a.codec.decodeByPBName(signal.data, PBName.NotifyMsg),
            time = _ref2.time,
            type = _ref2.type,
            chrmId = _ref2.chrmId;

        switch (type) {
          case 2:
            logger.warn('server notify chrm:', chrmId, time);

            this._chrmEntryHandler.pullEntry(chrmId, time);

            break;

          case 3:
            this._conversationManager.startPullConversationStatus(time);

            break;
        }
      }
    }, {
      key: "_receiveSettingNotify",
      value: function _receiveSettingNotify(signal) {}
    }, {
      key: "_receiveMessageExpansion",
      value: function _receiveMessageExpansion(message) {
        var content = message.content;
        var put = content.put,
            del = content.del,
            mid = content.mid;

        if (put) {
          this._watcher.expansion({
            updatedExpansion: {
              messageUId: mid,
              expansion: put
            }
          });
        }

        if (del) {
          this._watcher.expansion({
            deletedExpansion: {
              messageUId: mid,
              deletedKeys: del
            }
          });
        }
      }
    }, {
      key: "_receiveSyncMsg",
      value: function _receiveSyncMsg(signal, ack) {
        var _a;

        var msg = (_a = this._channel) === null || _a === void 0 ? void 0 : _a.codec.decodeByPBName(signal.data, PBName.UpStreamMessage, {
          currentUserId: this.currentUserId,
          signal: signal
        });
        msg = this._handleMsgProperties(msg);
        msg.sentTime = ack.timestamp;
        msg.messageUId = ack.messageUId;

        if (this._pullingMsg) {
          this._pullQueue.push(ack.timestamp);

          return;
        }

        this._letterbox.setOutboxTime(ack.timestamp, this.currentUserId);

        if (msg.messageType === MessageType$1.EXPANSION_NOTIFY) {
          this._receiveMessageExpansion(msg);

          return;
        }

        this._watcher.message(msg);

        this._conversationManager.setConversationCacheByMessage(msg, true);
      }
    }, {
      key: "_pullMsg",
      value: function _pullMsg(signal) {
        if (!this._channel) {
          return;
        }

        var _this$_channel$codec$ = this._channel.codec.decodeByPBName(signal.data, PBName.NotifyMsg),
            type = _this$_channel$codec$.type,
            chrmId = _this$_channel$codec$.chrmId,
            time = _this$_channel$codec$.time;

        if (type === 2) {
          var info = this._chrmsQueue[chrmId];
          info.queue.push(time);

          this._pullChrmMsg(chrmId);
        } else {
          this._pullQueue.push(time);

          this._syncMsg();
        }
      }
    }, {
      key: "_syncMsg",
      value: function _syncMsg() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee18() {
          var _this76 = this,
              _this$_pullQueue;

          var outboxTime, inboxTime, reqBody, writer, _yield$this$_channel$, code, data, list, finished, syncTime, newOutboxTime, tmpPullQueue;

          return regeneratorRuntime.wrap(function _callee18$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  if (!this._pullingMsg) {
                    _context20.next = 2;
                    break;
                  }

                  return _context20.abrupt("return");

                case 2:
                  if (this._channel) {
                    _context20.next = 5;
                    break;
                  }

                  this._pullingMsg = false;
                  return _context20.abrupt("return");

                case 5:
                  this._pullingMsg = true;
                  outboxTime = this._letterbox.getOutboxTime(this.currentUserId);
                  inboxTime = this._letterbox.getInboxTime(this.currentUserId);
                  logger.warn('outboxTime', outboxTime);
                  logger.warn('inboxTime', inboxTime);
                  reqBody = this._channel.codec.encodeSyncMsg({
                    sendboxTime: outboxTime,
                    inboxTime: inboxTime
                  });
                  writer = new QueryWriter(Topic$1[Topic$1.pullMsg], reqBody, this.currentUserId);
                  _context20.next = 14;
                  return this._channel.send(writer, PBName.DownStreamMessages, {
                    connectedTime: this._channel.connectedTime,
                    currentUserId: this.currentUserId
                  });

                case 14:
                  _yield$this$_channel$ = _context20.sent;
                  code = _yield$this$_channel$.code;
                  data = _yield$this$_channel$.data;

                  if (!(code !== ErrorCode$1.SUCCESS || !data)) {
                    _context20.next = 21;
                    break;
                  }

                  logger.warn('Pull msg failed, code:', code, ', data: ', data);
                  this._pullingMsg = false;
                  return _context20.abrupt("return");

                case 21:
                  list = data.list, finished = data.finished, syncTime = data.syncTime;
                  newOutboxTime = 0;
                  list.forEach(function (item) {
                    _newArrowCheck(this, _this76);

                    if (item.messageDirection === MessageDirection$1.SEND) {
                      newOutboxTime = Math.max(item.sentTime, newOutboxTime);
                    }

                    if (item.messageType === MessageType$1.EXPANSION_NOTIFY) {
                      this._receiveMessageExpansion(item);

                      return;
                    }

                    this._watcher.message(item);

                    this._conversationManager.setConversationCacheByMessage(item, true);
                  }.bind(this));

                  this._letterbox.setInboxTime(syncTime, this.currentUserId);

                  this._letterbox.setOutboxTime(newOutboxTime, this.currentUserId);

                  this._pullingMsg = false;
                  tmpPullQueue = this._pullQueue.filter(function (timestamp) {
                    _newArrowCheck(this, _this76);

                    return timestamp > syncTime;
                  }.bind(this));
                  this._pullQueue.length = 0;

                  (_this$_pullQueue = this._pullQueue).push.apply(_this$_pullQueue, _toConsumableArray(tmpPullQueue));

                  if (!finished || tmpPullQueue.length > 0) {
                    this._syncMsg();
                  }

                case 31:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee18, this);
        }));
      }
    }, {
      key: "_receiveMsg",
      value: function _receiveMsg(signal) {
        if (!this._channel) {
          return;
        }

        var msg = this._channel.codec.decodeByPBName(signal.data, PBName.DownStreamMessage, {
          currentUserId: this.currentUserId,
          connectedTime: this._channel.connectedTime
        });

        msg = this._handleMsgProperties(msg);

        if (this._pullingMsg) {
          return;
        }

        this._letterbox.setInboxTime(msg.sentTime, this.currentUserId);

        if (msg.messageType === MessageType$1.EXPANSION_NOTIFY) {
          this._receiveMessageExpansion(msg);

          return;
        }

        this._watcher.message(msg);

        this._conversationManager.setConversationCacheByMessage(msg, true);
      }
    }, {
      key: "_handleMsgProperties",
      value: function _handleMsgProperties(msgOptions) {
        var isSendMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var messageType = msgOptions.messageType,
            isCounted = msgOptions.isCounted,
            isPersited = msgOptions.isPersited,
            isStatusMessage = msgOptions.isStatusMessage;
        var options;
        var inRCMessageType = (messageType in SEND_MESSAGE_TYPE_OPTION);
        var inCustomMessageType = (messageType in this._customMessageType);

        if (inRCMessageType) {
          options = SEND_MESSAGE_TYPE_OPTION[messageType];
        } else if (inCustomMessageType) {
          options = this._customMessageType[messageType];
        } else {
          options = {
            isCounted: isNull(isCounted) ? false : isCounted,
            isPersited: isNull(isPersited) ? false : isPersited
          };
        }

        Object.assign(msgOptions, {
          isCounted: options.isCounted,
          isPersited: options.isPersited,
          isStatusMessage: !(msgOptions.isCounted && msgOptions.isPersited)
        });
        isSendMsg && (msgOptions.isStatusMessage = isStatusMessage);
        return msgOptions;
      }
    }, {
      key: "getConnectTime",
      value: function getConnectTime() {
        if (this._channel) {
          return Promise.resolve({
            code: ErrorCode$1.SUCCESS,
            data: this._channel.connectedTime
          });
        }

        return Promise.resolve({
          code: ErrorCode$1.RC_NET_CHANNEL_INVALID
        });
      }
    }, {
      key: "getHistoryMessage",
      value: function getHistoryMessage(conversationType, targetId, timestamp, count, order) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee19() {
          var currentUserId, channel, hisTopic, data, resp, code, downstreamData;
          return regeneratorRuntime.wrap(function _callee19$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  currentUserId = this.currentUserId, channel = this._channel;
                  hisTopic = ConversationTypeToQueryHistoryTopic[conversationType] || QueryHistoryTopic.PRIVATE;

                  if (!channel) {
                    _context21.next = 12;
                    break;
                  }

                  data = channel.codec.encodeGetHistoryMsg(targetId, {
                    timestamp: timestamp,
                    count: count,
                    order: order
                  });
                  _context21.next = 6;
                  return channel.send(new QueryWriter(hisTopic, data, currentUserId), PBName.HistoryMsgOuput, {
                    currentUserId: currentUserId,
                    connectedTime: channel.connectedTime,
                    conversation: {
                      targetId: targetId
                    }
                  });

                case 6:
                  resp = _context21.sent;
                  code = resp.code;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context21.next = 10;
                    break;
                  }

                  return _context21.abrupt("return", {
                    code: code
                  });

                case 10:
                  downstreamData = resp.data;
                  return _context21.abrupt("return", {
                    code: code,
                    data: {
                      list: downstreamData.list,
                      hasMore: downstreamData.hasMore
                    }
                  });

                case 12:
                  return _context21.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 13:
                case "end":
                  return _context21.stop();
              }
            }
          }, _callee19, this);
        }));
      }
    }, {
      key: "deleteRemoteMessage",
      value: function deleteRemoteMessage(conversationType, targetId, list) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee20() {
          var currentUserId, channel, data, writer, resp, code;
          return regeneratorRuntime.wrap(function _callee20$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  currentUserId = this.currentUserId, channel = this._channel;

                  if (!channel) {
                    _context22.next = 11;
                    break;
                  }

                  data = channel.codec.encodeDeleteMessages(conversationType, targetId, list);
                  writer = new QueryWriter(QueryTopic.DELETE_MESSAGES, data, currentUserId);
                  _context22.next = 6;
                  return channel.send(writer);

                case 6:
                  resp = _context22.sent;
                  code = resp.code;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context22.next = 10;
                    break;
                  }

                  return _context22.abrupt("return", code);

                case 10:
                  return _context22.abrupt("return", code);

                case 11:
                  return _context22.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 12:
                case "end":
                  return _context22.stop();
              }
            }
          }, _callee20, this);
        }));
      }
    }, {
      key: "deleteRemoteMessageByTimestamp",
      value: function deleteRemoteMessageByTimestamp(conversationType, targetId, timestamp) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee21() {
          var currentUserId, channel, data, topic, writer, resp, code;
          return regeneratorRuntime.wrap(function _callee21$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  currentUserId = this.currentUserId, channel = this._channel;

                  if (!channel) {
                    _context23.next = 12;
                    break;
                  }

                  data = channel.codec.encodeClearMessages(targetId, timestamp);
                  topic = ConversationTypeToClearMessageTopic[conversationType];
                  writer = new QueryWriter(topic, data, currentUserId);
                  _context23.next = 7;
                  return channel.send(writer);

                case 7:
                  resp = _context23.sent;
                  code = resp.code;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context23.next = 11;
                    break;
                  }

                  return _context23.abrupt("return", code);

                case 11:
                  return _context23.abrupt("return", code);

                case 12:
                  return _context23.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 13:
                case "end":
                  return _context23.stop();
              }
            }
          }, _callee21, this);
        }));
      }
    }, {
      key: "getConversationList",
      value: function getConversationList() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
        var conversationType = arguments.length > 1 ? arguments[1] : undefined;
        var startTime = arguments.length > 2 ? arguments[2] : undefined;
        var order = arguments.length > 3 ? arguments[3] : undefined;
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee22() {
          var _this77 = this;

          var currentUserId, channel, buff, writer, resp, code, data;
          return regeneratorRuntime.wrap(function _callee22$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  currentUserId = this.currentUserId, channel = this._channel;
                  conversationType = conversationType || ConversationType$1.PRIVATE;

                  if (!channel) {
                    _context24.next = 13;
                    break;
                  }

                  buff = channel.codec.encodeOldConversationList({
                    count: count,
                    type: conversationType,
                    startTime: startTime,
                    order: order
                  });
                  writer = new QueryWriter(QueryTopic.GET_OLD_CONVERSATION_LIST, buff, currentUserId);
                  _context24.next = 7;
                  return channel.send(writer, PBName.RelationsOutput, {
                    currentUserId: currentUserId,
                    connectedTime: channel.connectedTime,
                    afterDecode: function afterDecode(conversation) {
                      _newArrowCheck(this, _this77);

                      var conversationType = conversation.conversationType,
                          targetId = conversation.targetId;

                      var localConversation = this._conversationManager.get(conversationType, targetId);

                      Object.assign(conversation, localConversation);
                      return conversation;
                    }.bind(this)
                  });

                case 7:
                  resp = _context24.sent;
                  logger.info('GetConversationList =>', resp);
                  code = resp.code, data = resp.data;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context24.next = 12;
                    break;
                  }

                  return _context24.abrupt("return", {
                    code: code
                  });

                case 12:
                  return _context24.abrupt("return", {
                    code: code,
                    data: data
                  });

                case 13:
                  return _context24.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 14:
                case "end":
                  return _context24.stop();
              }
            }
          }, _callee22, this);
        }));
      }
    }, {
      key: "removeConversation",
      value: function removeConversation(conversationType, targetId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee23() {
          var channel, data, writer, resp, code;
          return regeneratorRuntime.wrap(function _callee23$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  channel = this._channel;

                  if (!channel) {
                    _context25.next = 12;
                    break;
                  }

                  data = channel.codec.encodeOldConversationList({
                    type: conversationType
                  });
                  writer = new QueryWriter(QueryTopic.REMOVE_OLD_CONVERSATION, data, targetId);
                  _context25.next = 6;
                  return channel.send(writer);

                case 6:
                  resp = _context25.sent;
                  logger.info('RemoveConversation =>', resp);
                  code = resp.code;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context25.next = 11;
                    break;
                  }

                  return _context25.abrupt("return", code);

                case 11:
                  return _context25.abrupt("return", code);

                case 12:
                  return _context25.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 13:
                case "end":
                  return _context25.stop();
              }
            }
          }, _callee23, this);
        }));
      }
    }, {
      key: "getConversation",
      value: function getConversation(conversationType, targetId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getAllConversationUnreadCount",
      value: function getAllConversationUnreadCount() {
        var allUnreadCount = this._conversationManager.getAllUnreadCount();

        return Promise.resolve({
          code: ErrorCode$1.SUCCESS,
          data: allUnreadCount
        });
      }
    }, {
      key: "getConversationUnreadCount",
      value: function getConversationUnreadCount(conversationType, targetId) {
        var unreadCount = this._conversationManager.getUnreadCount(conversationType, targetId);

        return Promise.resolve({
          code: ErrorCode$1.SUCCESS,
          data: unreadCount
        });
      }
    }, {
      key: "clearConversationUnreadCount",
      value: function clearConversationUnreadCount(conversationType, targetId) {
        this._conversationManager.clearUnreadCount(conversationType, targetId);

        return Promise.resolve(ErrorCode$1.SUCCESS);
      }
    }, {
      key: "saveConversationMessageDraft",
      value: function saveConversationMessageDraft(conversationType, targetId, draft) {
        this._conversationManager.setDraft(conversationType, targetId, draft);

        return Promise.resolve(ErrorCode$1.SUCCESS);
      }
    }, {
      key: "getConversationMessageDraft",
      value: function getConversationMessageDraft(conversationType, targetId) {
        var draft = this._conversationManager.getDraft(conversationType, targetId);

        return Promise.resolve({
          code: ErrorCode$1.SUCCESS,
          data: draft
        });
      }
    }, {
      key: "clearConversationMessageDraft",
      value: function clearConversationMessageDraft(conversationType, targetId) {
        this._conversationManager.clearDraft(conversationType, targetId);

        return Promise.resolve(ErrorCode$1.SUCCESS);
      }
    }, {
      key: "pullConversationStatus",
      value: function pullConversationStatus(timestamp) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee24() {
          var channel, currentUserId, buff, writer, resp, code, data;
          return regeneratorRuntime.wrap(function _callee24$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  channel = this._channel, currentUserId = this.currentUserId;

                  if (!channel) {
                    _context26.next = 11;
                    break;
                  }

                  buff = channel.codec.encodeGetConversationStatus(timestamp);
                  writer = new QueryWriter(Topic$1[Topic$1.pullSeAtts], buff, currentUserId);
                  _context26.next = 6;
                  return channel.send(writer, PBName.SessionStates);

                case 6:
                  resp = _context26.sent;
                  code = resp.code, data = resp.data;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context26.next = 10;
                    break;
                  }

                  return _context26.abrupt("return", {
                    code: code
                  });

                case 10:
                  return _context26.abrupt("return", {
                    code: code,
                    data: data
                  });

                case 11:
                  return _context26.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 12:
                case "end":
                  return _context26.stop();
              }
            }
          }, _callee24, this);
        }));
      }
    }, {
      key: "batchSetConversationStatus",
      value: function batchSetConversationStatus(statusList) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee25() {
          var _this78 = this;

          var currentUserId, channel, buff, writer, resp, code, data, versionData;
          return regeneratorRuntime.wrap(function _callee25$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  currentUserId = this.currentUserId, channel = this._channel;

                  if (!channel) {
                    _context27.next = 13;
                    break;
                  }

                  buff = channel.codec.encodeSetConversationStatus(statusList);
                  writer = new QueryWriter(QueryTopic.SET_CONVERSATION_STATUS, buff, currentUserId);
                  _context27.next = 6;
                  return channel.send(writer, PBName.SessionStateModifyResp);

                case 6:
                  resp = _context27.sent;
                  code = resp.code, data = resp.data;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context27.next = 12;
                    break;
                  }

                  versionData = data;
                  statusList.forEach(function (item) {
                    _newArrowCheck(this, _this78);

                    this._conversationManager.addStatus(Object.assign(Object.assign({}, item), {
                      updatedTime: versionData.version
                    }), true);
                  }.bind(this));
                  return _context27.abrupt("return", code);

                case 12:
                  return _context27.abrupt("return", code);

                case 13:
                  return _context27.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 14:
                case "end":
                  return _context27.stop();
              }
            }
          }, _callee25, this);
        }));
      }
    }, {
      key: "_joinChrm",
      value: function _joinChrm(chrmId, count, isJoinExist) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee26() {
          var channel, buff, topic, writer, _yield$channel$send, code, data, info, isOpenKVService;

          return regeneratorRuntime.wrap(function _callee26$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  channel = this._channel;

                  if (channel) {
                    _context28.next = 3;
                    break;
                  }

                  return _context28.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 3:
                  buff = channel.codec.encodeJoinOrQuitChatRoom();
                  topic = isJoinExist ? QueryTopic.JOIN_EXIST_CHATROOM : QueryTopic.JOIN_CHATROOM;
                  writer = new QueryWriter(topic, buff, chrmId);
                  _context28.next = 8;
                  return channel.send(writer);

                case 8:
                  _yield$channel$send = _context28.sent;
                  code = _yield$channel$send.code;
                  data = _yield$channel$send.data;

                  if (code === ErrorCode$1.SUCCESS) {
                    info = this._chrmsQueue[chrmId];

                    if (!info) {
                      this._chrmsQueue[chrmId] = {
                        pulling: false,
                        queue: [],
                        timestamp: 0
                      };
                    }

                    this._pullChrmMsg(chrmId, count);

                    isOpenKVService = this._naviInfo.kvStorage;

                    if (isOpenKVService) {
                      this._chrmEntryHandler.pullEntry(chrmId, 0);
                    }

                    this._joinedChrmManager.set(chrmId, count);
                  }

                  return _context28.abrupt("return", code);

                case 13:
                case "end":
                  return _context28.stop();
              }
            }
          }, _callee26, this);
        }));
      }
    }, {
      key: "_rejoinChrm",
      value: function _rejoinChrm() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee27() {
          var joinedChrms, chrmId, code;
          return regeneratorRuntime.wrap(function _callee27$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  joinedChrms = this._joinedChrmManager.get();
                  _context29.t0 = regeneratorRuntime.keys(joinedChrms);

                case 2:
                  if ((_context29.t1 = _context29.t0()).done) {
                    _context29.next = 10;
                    break;
                  }

                  chrmId = _context29.t1.value;
                  _context29.next = 6;
                  return this._joinChrm(chrmId, joinedChrms[chrmId], true);

                case 6:
                  code = _context29.sent;

                  if (code === ErrorCode$1.SUCCESS) {
                    this._watcher.chatroom({
                      rejoinedRoom: {
                        chatroomId: chrmId,
                        count: joinedChrms[chrmId]
                      }
                    });
                  } else {
                    this._watcher.chatroom({
                      rejoinedRoom: {
                        chatroomId: chrmId,
                        errorCode: code
                      }
                    });
                  }

                  _context29.next = 2;
                  break;

                case 10:
                case "end":
                  return _context29.stop();
              }
            }
          }, _callee27, this);
        }));
      }
    }, {
      key: "_pullChrmMsg",
      value: function _pullChrmMsg(chrmId) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee28() {
          var _this79 = this;

          var chrmInfo, pulling, timestamp, reqBody, signal, _yield$this$_channel$2, code, data, list, syncTime, finished;

          return regeneratorRuntime.wrap(function _callee28$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  if (this._channel) {
                    _context30.next = 2;
                    break;
                  }

                  return _context30.abrupt("return");

                case 2:
                  chrmInfo = this._chrmsQueue[chrmId];
                  pulling = chrmInfo.pulling, timestamp = chrmInfo.timestamp;

                  if (!pulling) {
                    _context30.next = 6;
                    break;
                  }

                  return _context30.abrupt("return");

                case 6:
                  reqBody = this._channel.codec.encodeChrmSyncMsg(timestamp, count);
                  signal = new QueryWriter(Topic$1[Topic$1.chrmPull], reqBody, chrmId);
                  _context30.next = 10;
                  return this._channel.send(signal, PBName.DownStreamMessages, {
                    connectedTime: this._channel.connectedTime,
                    currentUserId: this.currentUserId
                  });

                case 10:
                  _yield$this$_channel$2 = _context30.sent;
                  code = _yield$this$_channel$2.code;
                  data = _yield$this$_channel$2.data;

                  if (!(code !== ErrorCode$1.SUCCESS || !data)) {
                    _context30.next = 16;
                    break;
                  }

                  logger.warn('pull chatroom msg failed, code:', code, ', data:', data);
                  return _context30.abrupt("return");

                case 16:
                  list = data.list, syncTime = data.syncTime, finished = data.finished;
                  chrmInfo.timestamp = syncTime;
                  chrmInfo.pulling = false;
                  chrmInfo.queue = chrmInfo.queue.filter(function (item) {
                    _newArrowCheck(this, _this79);

                    return item > timestamp;
                  }.bind(this));
                  list.forEach(function (item) {
                    _newArrowCheck(this, _this79);

                    if (item.sentTime < timestamp) {
                      return;
                    }

                    this._watcher.message(item);
                  }.bind(this));

                  if (!finished || chrmInfo.queue.length > 0) {
                    this._pullChrmMsg(chrmId);
                  }

                case 22:
                case "end":
                  return _context30.stop();
              }
            }
          }, _callee28, this);
        }));
      }
    }, {
      key: "joinChatroom",
      value: function joinChatroom(chatroomId, count) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee29() {
          return regeneratorRuntime.wrap(function _callee29$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  return _context31.abrupt("return", this._joinChrm(chatroomId, count, false));

                case 1:
                case "end":
                  return _context31.stop();
              }
            }
          }, _callee29, this);
        }));
      }
    }, {
      key: "joinExistChatroom",
      value: function joinExistChatroom(chatroomId, count) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee30() {
          return regeneratorRuntime.wrap(function _callee30$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  return _context32.abrupt("return", this._joinChrm(chatroomId, count, true));

                case 1:
                case "end":
                  return _context32.stop();
              }
            }
          }, _callee30, this);
        }));
      }
    }, {
      key: "quitChatroom",
      value: function quitChatroom(chrmId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee31() {
          var channel, buff, writer, resp, code;
          return regeneratorRuntime.wrap(function _callee31$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  channel = this._channel;

                  if (channel) {
                    _context33.next = 3;
                    break;
                  }

                  return _context33.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 3:
                  buff = channel.codec.encodeJoinOrQuitChatRoom();
                  writer = new QueryWriter(QueryTopic.QUIT_CHATROOM, buff, chrmId);
                  _context33.next = 7;
                  return channel.send(writer);

                case 7:
                  resp = _context33.sent;
                  code = resp.code;

                  if (code === ErrorCode$1.SUCCESS) {
                    delete this._chrmsQueue[chrmId];

                    this._chrmEntryHandler.reset(chrmId);

                    this._joinedChrmManager.remove(chrmId);
                  }

                  return _context33.abrupt("return", code);

                case 11:
                case "end":
                  return _context33.stop();
              }
            }
          }, _callee31, this);
        }));
      }
    }, {
      key: "getChatroomInfo",
      value: function getChatroomInfo(chatroomId, count, order) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee32() {
          var channel, buff, writer, resp, code, data;
          return regeneratorRuntime.wrap(function _callee32$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  channel = this._channel;

                  if (channel) {
                    _context34.next = 3;
                    break;
                  }

                  return _context34.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 3:
                  buff = channel.codec.encodeGetChatRoomInfo(count, order);
                  writer = new QueryWriter(Topic$1[Topic$1.queryChrmI], buff, chatroomId);
                  _context34.next = 7;
                  return channel.send(writer, PBName.QueryChatRoomInfoOutput);

                case 7:
                  resp = _context34.sent;
                  code = resp.code, data = resp.data;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context34.next = 11;
                    break;
                  }

                  return _context34.abrupt("return", {
                    code: code
                  });

                case 11:
                  return _context34.abrupt("return", {
                    code: code,
                    data: data
                  });

                case 12:
                case "end":
                  return _context34.stop();
              }
            }
          }, _callee32, this);
        }));
      }
    }, {
      key: "getChatroomHistoryMessages",
      value: function getChatroomHistoryMessages(chatroomId, timestamp, count, order) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee33() {
          var channel, buff, writer, resp, code, data;
          return regeneratorRuntime.wrap(function _callee33$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  channel = this._channel;

                  if (channel) {
                    _context35.next = 3;
                    break;
                  }

                  return _context35.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 3:
                  buff = channel.codec.encodeGetHistoryMsg(chatroomId, {
                    timestamp: timestamp,
                    count: count,
                    order: order
                  });
                  writer = new QueryWriter(QueryHistoryTopic.CHATROOM, buff, chatroomId);
                  _context35.next = 7;
                  return channel.send(writer, PBName.HistoryMsgOuput, {
                    conversation: {
                      targetId: chatroomId
                    }
                  });

                case 7:
                  resp = _context35.sent;
                  code = resp.code;
                  data = resp.data;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context35.next = 12;
                    break;
                  }

                  return _context35.abrupt("return", {
                    code: code
                  });

                case 12:
                  return _context35.abrupt("return", {
                    code: code,
                    data: {
                      list: data.list,
                      hasMore: data.hasMore
                    }
                  });

                case 13:
                case "end":
                  return _context35.stop();
              }
            }
          }, _callee33, this);
        }));
      }
    }, {
      key: "_modifyChatroomKV",
      value: function _modifyChatroomKV(chatroomId, entry) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee34() {
          var channel, currentUserId, buff, topic, writer, resp, code;
          return regeneratorRuntime.wrap(function _callee34$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  channel = this._channel, currentUserId = this.currentUserId;

                  if (channel) {
                    _context36.next = 3;
                    break;
                  }

                  return _context36.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 3:
                  buff = channel.codec.encodeModifyChatRoomKV(chatroomId, entry, currentUserId);
                  topic = entry.type === ChatroomEntryType$1.UPDATE ? QueryTopic.UPDATE_CHATROOM_KV : QueryTopic.DELETE_CHATROOM_KV;
                  writer = new QueryWriter(topic, buff, chatroomId);
                  _context36.next = 8;
                  return channel.send(writer);

                case 8:
                  resp = _context36.sent;
                  code = resp.code;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context36.next = 13;
                    break;
                  }

                  this._chrmEntryHandler.setLocal(chatroomId, {
                    kvEntries: [entry],
                    syncTime: new Date().getTime()
                  }, currentUserId);

                  return _context36.abrupt("return", code);

                case 13:
                  return _context36.abrupt("return", code);

                case 14:
                case "end":
                  return _context36.stop();
              }
            }
          }, _callee34, this);
        }));
      }
    }, {
      key: "setChatroomEntry",
      value: function setChatroomEntry(chatroomId, entry) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee35() {
          return regeneratorRuntime.wrap(function _callee35$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  entry.type = ChatroomEntryType$1.UPDATE;
                  return _context37.abrupt("return", this._modifyChatroomKV(chatroomId, entry));

                case 2:
                case "end":
                  return _context37.stop();
              }
            }
          }, _callee35, this);
        }));
      }
    }, {
      key: "forceSetChatroomEntry",
      value: function forceSetChatroomEntry(chatroomId, entry) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee36() {
          return regeneratorRuntime.wrap(function _callee36$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  entry.type = ChatroomEntryType$1.UPDATE;
                  entry.isOverwrite = true;
                  return _context38.abrupt("return", this._modifyChatroomKV(chatroomId, entry));

                case 3:
                case "end":
                  return _context38.stop();
              }
            }
          }, _callee36, this);
        }));
      }
    }, {
      key: "removeChatroomEntry",
      value: function removeChatroomEntry(chatroomId, entry) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee37() {
          return regeneratorRuntime.wrap(function _callee37$(_context39) {
            while (1) {
              switch (_context39.prev = _context39.next) {
                case 0:
                  entry.type = ChatroomEntryType$1.DELETE;
                  return _context39.abrupt("return", this._modifyChatroomKV(chatroomId, entry));

                case 2:
                case "end":
                  return _context39.stop();
              }
            }
          }, _callee37, this);
        }));
      }
    }, {
      key: "forceRemoveChatroomEntry",
      value: function forceRemoveChatroomEntry(chatroomId, entry) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee38() {
          return regeneratorRuntime.wrap(function _callee38$(_context40) {
            while (1) {
              switch (_context40.prev = _context40.next) {
                case 0:
                  entry.type = ChatroomEntryType$1.DELETE;
                  entry.isOverwrite = true;
                  return _context40.abrupt("return", this._modifyChatroomKV(chatroomId, entry));

                case 3:
                case "end":
                  return _context40.stop();
              }
            }
          }, _callee38, this);
        }));
      }
    }, {
      key: "getChatroomEntry",
      value: function getChatroomEntry(chatroomId, key) {
        var entry = this._chrmEntryHandler.getValue(chatroomId, key);

        if (entry) {
          return Promise.resolve({
            code: ErrorCode$1.SUCCESS,
            data: entry
          });
        } else {
          return Promise.resolve({
            code: ErrorCode$1.CHATROOM_KEY_NOT_EXIST
          });
        }
      }
    }, {
      key: "getAllChatroomEntry",
      value: function getAllChatroomEntry(chatroomId) {
        var entries = this._chrmEntryHandler.getAll(chatroomId);

        return Promise.resolve({
          code: ErrorCode$1.SUCCESS,
          data: entries
        });
      }
    }, {
      key: "pullChatroomEntry",
      value: function pullChatroomEntry(chatroomId, timestamp) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee39() {
          var _this80 = this;

          var channel, currentUserId, buff, writer, resp, code, data, kvEntries, updatedEntries;
          return regeneratorRuntime.wrap(function _callee39$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  channel = this._channel, currentUserId = this.currentUserId;

                  if (channel) {
                    _context41.next = 3;
                    break;
                  }

                  return _context41.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 3:
                  buff = channel.codec.encodePullChatRoomKV(timestamp);
                  writer = new QueryWriter(Topic$1[Topic$1.pullKV], buff, chatroomId);
                  _context41.next = 7;
                  return channel.send(writer, PBName.ChrmKVOutput);

                case 7:
                  resp = _context41.sent;
                  code = resp.code, data = resp.data;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context41.next = 15;
                    break;
                  }

                  this._chrmEntryHandler.setLocal(chatroomId, data, currentUserId);

                  kvEntries = data.kvEntries;
                  updatedEntries = [];

                  if (kvEntries.length > 0) {
                    kvEntries.forEach(function (entry) {
                      _newArrowCheck(this, _this80);

                      var key = entry.key,
                          value = entry.value,
                          type = entry.type,
                          timestamp = entry.timestamp;
                      updatedEntries.push({
                        key: key,
                        value: value,
                        type: type,
                        timestamp: timestamp,
                        chatroomId: chatroomId
                      });
                    }.bind(this));

                    this._watcher.chatroom({
                      updatedEntries: updatedEntries
                    });
                  }

                  return _context41.abrupt("return", {
                    code: code,
                    data: data
                  });

                case 15:
                  return _context41.abrupt("return", {
                    code: code
                  });

                case 16:
                case "end":
                  return _context41.stop();
              }
            }
          }, _callee39, this);
        }));
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(conversationType, targetId, options) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee40() {
          var isStatusMessage, topic, data, signal, _yield$this$_channel$3, code, resp, pubAck, receivedMessage;

          return regeneratorRuntime.wrap(function _callee40$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  if (this._channel) {
                    _context42.next = 2;
                    break;
                  }

                  return _context42.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  options = this._handleMsgProperties(options, true);
                  isStatusMessage = [ConversationType$1.PRIVATE, ConversationType$1.GROUP].includes(conversationType) ? options.isStatusMessage : false;
                  topic = isStatusMessage ? getStatPubTopic(conversationType) : getPubTopic(conversationType) || Topic$1.ppMsgP;

                  if (isStatusMessage) {
                    options.isPersited = false;
                    options.isCounted = false;
                  }

                  data = this._channel.codec.encodeUpMsg({
                    type: conversationType,
                    targetId: targetId
                  }, options);
                  signal = new PublishWriter(Topic$1[topic], data, targetId);
                  signal.setHeaderQos(QOS.AT_LEAST_ONCE);

                  if (!isStatusMessage) {
                    _context42.next = 12;
                    break;
                  }

                  this._channel.sendOnly(signal);

                  return _context42.abrupt("return", {
                    code: ErrorCode$1.SUCCESS,
                    data: transSentAttrs2IReceivedMessage(conversationType, targetId, Object.assign({}, options), '', 0, this.currentUserId)
                  });

                case 12:
                  _context42.next = 14;
                  return this._channel.send(signal);

                case 14:
                  _yield$this$_channel$3 = _context42.sent;
                  code = _yield$this$_channel$3.code;
                  resp = _yield$this$_channel$3.data;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context42.next = 19;
                    break;
                  }

                  return _context42.abrupt("return", {
                    code: code
                  });

                case 19:
                  pubAck = resp;

                  this._letterbox.setOutboxTime(pubAck.timestamp, this.currentUserId);

                  receivedMessage = transSentAttrs2IReceivedMessage(conversationType, targetId, Object.assign({}, options), pubAck.messageUId, pubAck.timestamp, this.currentUserId);

                  this._conversationManager.setConversationCacheByMessage(receivedMessage, true);

                  return _context42.abrupt("return", {
                    code: ErrorCode$1.SUCCESS,
                    data: receivedMessage
                  });

                case 24:
                case "end":
                  return _context42.stop();
              }
            }
          }, _callee40, this);
        }));
      }
    }, {
      key: "recallMsg",
      value: function recallMsg(conversationType, targetId, messageUId, sentTime, user) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee41() {
          var msg, topic, data, signal, _yield$this$_channel$4, code, resp, pubAck;

          return regeneratorRuntime.wrap(function _callee41$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  if (this._channel) {
                    _context43.next = 2;
                    break;
                  }

                  return _context43.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  msg = {
                    content: {
                      conversationType: conversationType,
                      targetId: targetId,
                      messageUId: messageUId,
                      sentTime: sentTime,
                      user: user
                    },
                    messageType: 'RC:RcCmd'
                  };
                  topic = Topic$1[Topic$1.recallMsg];
                  data = this._channel.codec.encodeUpMsg({
                    type: conversationType,
                    targetId: targetId
                  }, msg);
                  signal = new PublishWriter(topic, data, this.currentUserId);
                  signal.setHeaderQos(QOS.AT_LEAST_ONCE);
                  _context43.next = 9;
                  return this._channel.send(signal);

                case 9:
                  _yield$this$_channel$4 = _context43.sent;
                  code = _yield$this$_channel$4.code;
                  resp = _yield$this$_channel$4.data;

                  if (!(code !== ErrorCode$1.SUCCESS)) {
                    _context43.next = 14;
                    break;
                  }

                  return _context43.abrupt("return", {
                    code: code
                  });

                case 14:
                  pubAck = resp;
                  return _context43.abrupt("return", {
                    code: ErrorCode$1.SUCCESS,
                    data: transSentAttrs2IReceivedMessage(conversationType, targetId, Object.assign({}, msg), pubAck.messageUId, pubAck.timestamp, this.currentUserId)
                  });

                case 16:
                case "end":
                  return _context43.stop();
              }
            }
          }, _callee41, this);
        }));
      }
    }, {
      key: "pullUserSettings",
      value: function pullUserSettings(version) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee42() {
          var buff, writer;
          return regeneratorRuntime.wrap(function _callee42$(_context44) {
            while (1) {
              switch (_context44.prev = _context44.next) {
                case 0:
                  if (this._channel) {
                    _context44.next = 2;
                    break;
                  }

                  return _context44.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  buff = this._channel.codec.encodePullUserSetting(version);
                  writer = new QueryWriter(Topic$1[Topic$1.pullUS], buff, this.currentUserId);
                  return _context44.abrupt("return", this._channel.send(writer, PBName.PullUserSettingOutput));

                case 5:
                case "end":
                  return _context44.stop();
              }
            }
          }, _callee42, this);
        }));
      }
    }, {
      key: "getFileToken",
      value: function getFileToken(fileType, fileName) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee43() {
          var uploadFileName, buff, writer, _yield$this$_channel$5, code, data;

          return regeneratorRuntime.wrap(function _callee43$(_context45) {
            while (1) {
              switch (_context45.prev = _context45.next) {
                case 0:
                  if (this._channel) {
                    _context45.next = 2;
                    break;
                  }

                  return _context45.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  uploadFileName = getUploadFileName(fileType, fileName);
                  buff = this._channel.codec.encodeGetFileToken(fileType, uploadFileName);
                  writer = new QueryWriter(Topic$1[Topic$1.qnTkn], buff, this.currentUserId);
                  _context45.next = 7;
                  return this._channel.send(writer, PBName.GetQNupTokenOutput);

                case 7:
                  _yield$this$_channel$5 = _context45.sent;
                  code = _yield$this$_channel$5.code;
                  data = _yield$this$_channel$5.data;
                  data = Object.assign(data, {
                    fileName: uploadFileName
                  });

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context45.next = 13;
                    break;
                  }

                  return _context45.abrupt("return", {
                    code: code,
                    data: data
                  });

                case 13:
                  return _context45.abrupt("return", {
                    code: code
                  });

                case 14:
                case "end":
                  return _context45.stop();
              }
            }
          }, _callee43, this);
        }));
      }
    }, {
      key: "getFileUrl",
      value: function getFileUrl(fileType, uploadMethod, fileName, originName) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee44() {
          var topic, inputPBName, outputPBName, buff, writer, _yield$this$_channel$6, code, data, resp;

          return regeneratorRuntime.wrap(function _callee44$(_context46) {
            while (1) {
              switch (_context46.prev = _context46.next) {
                case 0:
                  if (this._channel) {
                    _context46.next = 2;
                    break;
                  }

                  return _context46.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  topic = '';
                  inputPBName = '';
                  outputPBName = '';

                  if (uploadMethod === UploadMethod$1.QINIU) {
                    topic = Topic$1[Topic$1.qnUrl];
                    inputPBName = PBName.GetQNdownloadUrlInput;
                    outputPBName = PBName.GetQNdownloadUrlOutput;
                  } else {
                    topic = Topic$1[Topic$1.aliUrl];
                    inputPBName = PBName.GetDownloadUrlInput;
                    outputPBName = PBName.GetDownloadUrlOutput;
                  }

                  buff = this._channel.codec.encodeGetFileUrl(inputPBName, fileType, fileName, originName);
                  writer = new QueryWriter(topic, buff, this.currentUserId);
                  _context46.next = 10;
                  return this._channel.send(writer, outputPBName);

                case 10:
                  _yield$this$_channel$6 = _context46.sent;
                  code = _yield$this$_channel$6.code;
                  data = _yield$this$_channel$6.data;
                  resp = data;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context46.next = 16;
                    break;
                  }

                  return _context46.abrupt("return", {
                    code: code,
                    data: resp
                  });

                case 16:
                  return _context46.abrupt("return", {
                    code: code
                  });

                case 17:
                case "end":
                  return _context46.stop();
              }
            }
          }, _callee44, this);
        }));
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this._channel) {
          this._channel.close();

          this._channel = undefined;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        throw new Error('JSEngine\'s method not implemented.');
      }
    }, {
      key: "registerMessageType",
      value: function registerMessageType(objectName, isPersited, isCounted, searchProps) {
        this._customMessageType[objectName] = {
          isPersited: isPersited,
          isCounted: isCounted
        };
      }
    }, {
      key: "joinRTCRoom",
      value: function joinRTCRoom(roomId, mode, broadcastType) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee45() {
          var reqBody, writer;
          return regeneratorRuntime.wrap(function _callee45$(_context47) {
            while (1) {
              switch (_context47.prev = _context47.next) {
                case 0:
                  if (this._channel) {
                    _context47.next = 2;
                    break;
                  }

                  return _context47.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  reqBody = this._channel.codec.encodeJoinRTCRoom(mode, broadcastType);
                  writer = new QueryWriter(Topic$1[Topic$1.rtcRJoin_data], reqBody, roomId);
                  return _context47.abrupt("return", this._channel.send(writer, PBName.RtcUserListOutput));

                case 5:
                case "end":
                  return _context47.stop();
              }
            }
          }, _callee45, this);
        }));
      }
    }, {
      key: "quitRTCRoom",
      value: function quitRTCRoom(roomId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee46() {
          var reqBody, writer, _yield$this$_channel$7, code;

          return regeneratorRuntime.wrap(function _callee46$(_context48) {
            while (1) {
              switch (_context48.prev = _context48.next) {
                case 0:
                  if (this._channel) {
                    _context48.next = 2;
                    break;
                  }

                  return _context48.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeQuitRTCRoom();
                  writer = new QueryWriter(Topic$1[Topic$1.rtcRExit], reqBody, roomId);
                  _context48.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$7 = _context48.sent;
                  code = _yield$this$_channel$7.code;
                  return _context48.abrupt("return", code);

                case 9:
                case "end":
                  return _context48.stop();
              }
            }
          }, _callee46, this);
        }));
      }
    }, {
      key: "rtcPing",
      value: function rtcPing(roomId, mode, broadcastType) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee47() {
          var reqBody, writer, _yield$this$_channel$8, code;

          return regeneratorRuntime.wrap(function _callee47$(_context49) {
            while (1) {
              switch (_context49.prev = _context49.next) {
                case 0:
                  if (this._channel) {
                    _context49.next = 2;
                    break;
                  }

                  return _context49.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeJoinRTCRoom(mode, broadcastType);
                  writer = new QueryWriter(Topic$1[Topic$1.rtcPing], reqBody, roomId);
                  _context49.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$8 = _context49.sent;
                  code = _yield$this$_channel$8.code;
                  return _context49.abrupt("return", code);

                case 9:
                case "end":
                  return _context49.stop();
              }
            }
          }, _callee47, this);
        }));
      }
    }, {
      key: "getRTCRoomInfo",
      value: function getRTCRoomInfo(roomId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee48() {
          var reqBody, writer;
          return regeneratorRuntime.wrap(function _callee48$(_context50) {
            while (1) {
              switch (_context50.prev = _context50.next) {
                case 0:
                  if (this._channel) {
                    _context50.next = 2;
                    break;
                  }

                  return _context50.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  reqBody = this._channel.codec.encodeGetRTCRoomInfo();
                  writer = new QueryWriter(Topic$1[Topic$1.rtcRInfo], reqBody, roomId);
                  return _context50.abrupt("return", this._channel.send(writer, PBName.RtcRoomInfoOutput));

                case 5:
                case "end":
                  return _context50.stop();
              }
            }
          }, _callee48, this);
        }));
      }
    }, {
      key: "getRTCUserInfoList",
      value: function getRTCUserInfoList(roomId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee49() {
          var reqBody, writer, _yield$this$_channel$9, code, data;

          return regeneratorRuntime.wrap(function _callee49$(_context51) {
            while (1) {
              switch (_context51.prev = _context51.next) {
                case 0:
                  if (this._channel) {
                    _context51.next = 2;
                    break;
                  }

                  return _context51.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  reqBody = this._channel.codec.encodeGetRTCRoomInfo();
                  writer = new QueryWriter(Topic$1[Topic$1.rtcUData], reqBody, roomId);
                  _context51.next = 6;
                  return this._channel.send(writer, PBName.RtcUserListOutput);

                case 6:
                  _yield$this$_channel$9 = _context51.sent;
                  code = _yield$this$_channel$9.code;
                  data = _yield$this$_channel$9.data;
                  return _context51.abrupt("return", {
                    code: code,
                    data: data ? {
                      users: data.users
                    } : data
                  });

                case 10:
                case "end":
                  return _context51.stop();
              }
            }
          }, _callee49, this);
        }));
      }
    }, {
      key: "setRTCUserInfo",
      value: function setRTCUserInfo(roomId, key, value) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee50() {
          var reqBody, writer, _yield$this$_channel$10, code;

          return regeneratorRuntime.wrap(function _callee50$(_context52) {
            while (1) {
              switch (_context52.prev = _context52.next) {
                case 0:
                  if (this._channel) {
                    _context52.next = 2;
                    break;
                  }

                  return _context52.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeSetRTCUserInfo(key, value);
                  writer = new QueryWriter(Topic$1[Topic$1.rtcUPut], reqBody, roomId);
                  _context52.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$10 = _context52.sent;
                  code = _yield$this$_channel$10.code;
                  return _context52.abrupt("return", code);

                case 9:
                case "end":
                  return _context52.stop();
              }
            }
          }, _callee50, this);
        }));
      }
    }, {
      key: "removeRTCUserInfo",
      value: function removeRTCUserInfo(roomId, keys) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee51() {
          var reqBody, writer, _yield$this$_channel$11, code;

          return regeneratorRuntime.wrap(function _callee51$(_context53) {
            while (1) {
              switch (_context53.prev = _context53.next) {
                case 0:
                  if (this._channel) {
                    _context53.next = 2;
                    break;
                  }

                  return _context53.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeRemoveRTCUserInfo(keys);
                  writer = new PublishWriter(Topic$1[Topic$1.rtcUDel], reqBody, roomId);
                  _context53.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$11 = _context53.sent;
                  code = _yield$this$_channel$11.code;
                  return _context53.abrupt("return", code);

                case 9:
                case "end":
                  return _context53.stop();
              }
            }
          }, _callee51, this);
        }));
      }
    }, {
      key: "setRTCData",
      value: function setRTCData(roomId, key, value, isInner, apiType, message) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee52() {
          var reqBody, writer, _yield$this$_channel$12, code;

          return regeneratorRuntime.wrap(function _callee52$(_context54) {
            while (1) {
              switch (_context54.prev = _context54.next) {
                case 0:
                  if (this._channel) {
                    _context54.next = 2;
                    break;
                  }

                  return _context54.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeSetRTCData(key, value, isInner, apiType, message);
                  writer = new PublishWriter(Topic$1[Topic$1.rtcSetData], reqBody, roomId);
                  _context54.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$12 = _context54.sent;
                  code = _yield$this$_channel$12.code;
                  return _context54.abrupt("return", code);

                case 9:
                case "end":
                  return _context54.stop();
              }
            }
          }, _callee52, this);
        }));
      }
    }, {
      key: "setRTCTotalRes",
      value: function setRTCTotalRes(roomId, message, valueInfo, objectName) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee53() {
          var reqBody, writer, _yield$this$_channel$13, code;

          return regeneratorRuntime.wrap(function _callee53$(_context55) {
            while (1) {
              switch (_context55.prev = _context55.next) {
                case 0:
                  if (this._channel) {
                    _context55.next = 2;
                    break;
                  }

                  return _context55.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeUserSetRTCData(message, valueInfo, objectName);
                  writer = new PublishWriter(Topic$1[Topic$1.userSetData], reqBody, roomId);
                  _context55.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$13 = _context55.sent;
                  code = _yield$this$_channel$13.code;
                  return _context55.abrupt("return", code);

                case 9:
                case "end":
                  return _context55.stop();
              }
            }
          }, _callee53, this);
        }));
      }
    }, {
      key: "getRTCData",
      value: function getRTCData(roomId, keys, isInner, apiType) {
        if (!this._channel) {
          return Promise.resolve({
            code: ErrorCode$1.RC_NET_CHANNEL_INVALID
          });
        }

        var reqBody = this._channel.codec.encodeGetRTCData(keys, isInner, apiType);

        var writer = new QueryWriter(Topic$1[Topic$1.rtcQryData], reqBody, roomId);
        return this._channel.send(writer, PBName.RtcQryOutput);
      }
    }, {
      key: "removeRTCData",
      value: function removeRTCData(roomId, keys, isInner, apiType, message) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee54() {
          var reqBody, writer, _yield$this$_channel$14, code;

          return regeneratorRuntime.wrap(function _callee54$(_context56) {
            while (1) {
              switch (_context56.prev = _context56.next) {
                case 0:
                  if (this._channel) {
                    _context56.next = 2;
                    break;
                  }

                  return _context56.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeRemoveRTCData(keys, isInner, apiType, message);
                  writer = new PublishWriter(Topic$1[Topic$1.rtcDelData], reqBody, roomId);
                  _context56.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$14 = _context56.sent;
                  code = _yield$this$_channel$14.code;
                  return _context56.abrupt("return", code);

                case 9:
                case "end":
                  return _context56.stop();
              }
            }
          }, _callee54, this);
        }));
      }
    }, {
      key: "setRTCOutData",
      value: function setRTCOutData(roomId, rtcData, type, message) {
        throw new Error('JSEngine\'s method not implemented.');
      }
    }, {
      key: "getRTCOutData",
      value: function getRTCOutData(roomId, userIds) {
        throw new Error('JSEngine\'s method not implemented.');
      }
    }, {
      key: "getRTCToken",
      value: function getRTCToken(roomId, mode, broadcastType) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee55() {
          var reqBody, writer;
          return regeneratorRuntime.wrap(function _callee55$(_context57) {
            while (1) {
              switch (_context57.prev = _context57.next) {
                case 0:
                  if (this._channel) {
                    _context57.next = 2;
                    break;
                  }

                  return _context57.abrupt("return", {
                    code: ErrorCode$1.RC_NET_CHANNEL_INVALID
                  });

                case 2:
                  reqBody = this._channel.codec.encodeJoinRTCRoom(mode, broadcastType);
                  writer = new QueryWriter(Topic$1[Topic$1.rtcToken], reqBody, roomId);
                  return _context57.abrupt("return", this._channel.send(writer, PBName.RtcTokenOutput));

                case 5:
                case "end":
                  return _context57.stop();
              }
            }
          }, _callee55, this);
        }));
      }
    }, {
      key: "setRTCState",
      value: function setRTCState(roomId, report) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee56() {
          var reqBody, writer, _yield$this$_channel$15, code;

          return regeneratorRuntime.wrap(function _callee56$(_context58) {
            while (1) {
              switch (_context58.prev = _context58.next) {
                case 0:
                  if (this._channel) {
                    _context58.next = 2;
                    break;
                  }

                  return _context58.abrupt("return", ErrorCode$1.RC_NET_CHANNEL_INVALID);

                case 2:
                  reqBody = this._channel.codec.encodeSetRTCState(report);
                  writer = new QueryWriter(Topic$1[Topic$1.rtcUserState], reqBody, roomId);
                  _context58.next = 6;
                  return this._channel.send(writer);

                case 6:
                  _yield$this$_channel$15 = _context58.sent;
                  code = _yield$this$_channel$15.code;
                  return _context58.abrupt("return", code);

                case 9:
                case "end":
                  return _context58.stop();
              }
            }
          }, _callee56, this);
        }));
      }
    }, {
      key: "getRTCUserInfo",
      value: function getRTCUserInfo(roomId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee57() {
          return regeneratorRuntime.wrap(function _callee57$(_context59) {
            while (1) {
              switch (_context59.prev = _context59.next) {
                case 0:
                  throw new Error('Method not implemented.');

                case 1:
                case "end":
                  return _context59.stop();
              }
            }
          }, _callee57);
        }));
      }
    }, {
      key: "getRTCUserList",
      value: function getRTCUserList(roomId) {
        if (!this._channel) {
          return Promise.resolve({
            code: ErrorCode$1.RC_NET_CHANNEL_INVALID
          });
        }

        var data = this._channel.codec.encodeGetRTCRoomInfo();

        var writer = new QueryWriter(Topic$1[Topic$1.rtcUList], data, roomId);
        return this._channel.send(writer, PBName.RtcUserListOutput);
      }
    }, {
      key: "clearConversations",
      value: function clearConversations() {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setUserStatusListener",
      value: function setUserStatusListener(config, listener) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setUserStatus",
      value: function setUserStatus(status) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "subscribeUserStatus",
      value: function subscribeUserStatus(userIds) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getUserStatus",
      value: function getUserStatus(userId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "addToBlacklist",
      value: function addToBlacklist(userId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "removeFromBlacklist",
      value: function removeFromBlacklist(userId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getBlacklist",
      value: function getBlacklist() {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getBlacklistStatus",
      value: function getBlacklistStatus(userId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "insertMessage",
      value: function insertMessage(conversationType, targetId, senderUserId, objectName, msgContent, direction) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "deleteMessages",
      value: function deleteMessages(timestamps) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "deleteMessagesByTimestamp",
      value: function deleteMessagesByTimestamp(conversationType, targetId, timestamp, cleanSpace) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getMessage",
      value: function getMessage(messageId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setMessageContent",
      value: function setMessageContent(messageId, content, objectName) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setMessageSearchField",
      value: function setMessageSearchField(messageId, content, searchFiles) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "searchConversationByContent",
      value: function searchConversationByContent(keyword, conversationTypes) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "searchMessageByContent",
      value: function searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getUnreadMentionedMessages",
      value: function getUnreadMentionedMessages(conversationType, targetId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setMessageSentStatus",
      value: function setMessageSentStatus(messageId, sentStatus) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setMessageReceivedStatus",
      value: function setMessageReceivedStatus(messageId, receivedStatus) {
        throw new Error('Method not implemented.');
      }
    }]);

    return JSEngine;
  }(AEngine);

  var RTCMode;

  (function (RTCMode) {
    RTCMode[RTCMode["RTC"] = 0] = "RTC";
    RTCMode[RTCMode["LIVE"] = 2] = "LIVE";
  })(RTCMode || (RTCMode = {}));

  var LiveType;

  (function (LiveType) {
    LiveType[LiveType["AUDIO_AND_VIDEO"] = 0] = "AUDIO_AND_VIDEO";
    LiveType[LiveType["AUDIO"] = 1] = "AUDIO";
  })(LiveType || (LiveType = {}));

  var LiveRole;

  (function (LiveRole) {
    LiveRole[LiveRole["ANCHOR"] = 1] = "ANCHOR";
    LiveRole[LiveRole["AUDIENCE"] = 2] = "AUDIENCE";
  })(LiveRole || (LiveRole = {}));

  var CallLibMsgType = {
    'RC:VCAccept': 'RC:VCAccept',
    'RC:VCRinging': 'RC:VCRinging',
    'RC:VCSummary': 'RC:VCSummary',
    'RC:VCHangup': 'RC:VCHangup',
    'RC:VCInvite': 'RC:VCInvite',
    'RC:VCModifyMedia': 'RC:VCModifyMedia',
    'RC:VCModifyMem': 'RC:VCModifyMem'
  };
  var RTCApiType;

  (function (RTCApiType) {
    RTCApiType[RTCApiType["ROOM"] = 1] = "ROOM";
    RTCApiType[RTCApiType["PERSON"] = 2] = "PERSON";
  })(RTCApiType || (RTCApiType = {}));

  var Heartbeat = function () {
    function Heartbeat(pongRes, connectionListener) {
      _classCallCheck(this, Heartbeat);

      this._timerId = 0;
      this._heartbeatTimeoutId = 0;
      this._isFirstPing = true;
      this._hasPingRes = pongRes;
      this._connectionListener = connectionListener;
    }

    _createClass(Heartbeat, [{
      key: "start",
      value: function start(cppHeartbeatFunc, cppEngine) {
        var _this81 = this;

        var self = this;

        var _startHeartbeat = function startHeartbeat() {
          var _this82 = this;

          _newArrowCheck(this, _this81);

          var time = this._isFirstPing ? 0 : 15 * 1000;
          self._timerId = setTimeout(function () {
            var _this83 = this;

            _newArrowCheck(this, _this82);

            self._isFirstPing = false;

            if (self._hasPingRes) {
              cppHeartbeatFunc.call(cppEngine);
              self._hasPingRes = false;

              _startHeartbeat();
            } else {
              self._heartbeatTimeoutId = setTimeout(function () {
                _newArrowCheck(this, _this83);
              }.bind(this), 90 * 1000);
            }
          }.bind(this), time);
        }.bind(this);

        _startHeartbeat();
      }
    }, {
      key: "stop",
      value: function stop() {
        clearTimeout(this._timerId);
      }
    }, {
      key: "setHeartbeatRes",
      value: function setHeartbeatRes(hasRes) {
        this._hasPingRes = hasRes;

        if (this._hasPingRes) {
          clearTimeout(this._heartbeatTimeoutId);
        }
      }
    }]);

    return Heartbeat;
  }();

  var CPPEngine = function (_AEngine2) {
    _inherits(CPPEngine, _AEngine2);

    var _super19 = _createSuper(CPPEngine);

    function CPPEngine(_runtime, _appkey, _watcher, _apiVersion, _cppProtocol, _options) {
      var _this85 = this;

      var _this84;

      _classCallCheck(this, CPPEngine);

      _this84 = _super19.call(this, _runtime, _appkey, _watcher, _apiVersion, _options);
      _this84._cppProtocol = _cppProtocol;
      _this84._currentToken = '';
      _this84._connectionStatus = ConnectionStatus$1.DISCONNECTED;
      _this84._promiseHandler = {};
      _this84._customMessageType = {};
      _this84._heartbeat = {};

      _this84._connectionListener = function (status) {
        _newArrowCheck(this, _this85);
      }.bind(this);

      _this84._cppConnectionStatus = ConnectionStatus$1.DISCONNECTED;

      _this84.init(_appkey, {
        version: _apiVersion,
        dbPath: _options.dbPath || '',
        navi: _options.navigators[0] || ''
      });

      _this84._setConnectionStatusListener(_watcher.status);

      _this84._setOnReceiveMessageListener(_watcher.message);

      _this84._setConversationStatusListener(_watcher.conversation);

      return _this84;
    }

    _createClass(CPPEngine, [{
      key: "_registerMsgTypes",
      value: function _registerMsgTypes() {
        SEND_MESSAGE_TYPE_OPTION['RC:RcCmd'] = {
          isCounted: false,
          isPersited: false
        };

        for (var messageType in SEND_MESSAGE_TYPE_OPTION) {
          var _SEND_MESSAGE_TYPE_OP = SEND_MESSAGE_TYPE_OPTION[messageType],
              isCounted = _SEND_MESSAGE_TYPE_OP.isCounted,
              isPersited = _SEND_MESSAGE_TYPE_OP.isPersited;
          var msgOptions = 0;

          if (isPersited) {
            msgOptions = msgOptions | 0x01;
          }

          if (isCounted) {
            msgOptions = msgOptions | 0x02;
          }

          this._cppProtocol.registerMessageType(messageType, msgOptions);
        }
      }
    }, {
      key: "_buildMessage",
      value: function _buildMessage(result, isOffLineMessage) {
        var receivedCppMessage = JSON.parse(result);
        var conversationType = receivedCppMessage.conversationType,
            targetId = receivedCppMessage.targetId,
            senderUserId = receivedCppMessage.senderUserId,
            content = receivedCppMessage.content,
            objectName = receivedCppMessage.objectName,
            messageUid = receivedCppMessage.messageUid,
            direction = receivedCppMessage.direction,
            status = receivedCppMessage.status,
            source = receivedCppMessage.source,
            messageId = receivedCppMessage.messageId,
            sentTime = receivedCppMessage.sentTime;
        var msgContent;

        if (isObject(content)) {
          msgContent = content;
        } else {
          msgContent = content ? JSON.parse(content) : content;
        }

        var msgOptions = {
          isCounted: false,
          isPersited: false
        };

        if (objectName in SEND_MESSAGE_TYPE_OPTION) {
          msgOptions = SEND_MESSAGE_TYPE_OPTION[objectName];
        } else if (objectName in this._customMessageType) {
          msgOptions = this._customMessageType[objectName];
        }

        var isOffline = isUndefined(isOffLineMessage) ? sentTime < this.connectedTime : isOffLineMessage;
        var msg = {
          conversationType: conversationType,
          targetId: targetId,
          senderUserId: senderUserId,
          content: msgContent || {},
          messageType: objectName,
          messageUId: messageUid,
          messageDirection: direction,
          isOffLineMessage: isOffline,
          sentTime: sentTime,
          receivedTime: 0,
          isPersited: msgOptions.isPersited,
          isCounted: msgOptions.isCounted,
          isMentioned: false,
          disableNotification: false,
          isStatusMessage: false,
          canIncludeExpansion: false,
          expansion: null,
          receivedStatus: status,
          messageId: messageId
        };

        if (direction === MessageDirection$1.RECEIVE) {
          msg.receivedStatus = status;
        } else if (direction === MessageDirection$1.SEND) {
          msg.sentStatus = status;
        }

        return msg;
      }
    }, {
      key: "_buildConversation",
      value: function _buildConversation(result) {
        var conver = JSON.parse(result);
        var conversationType = conver.conversationType,
            targetId = conver.targetId,
            unreadMessageCount = conver.unreadCount,
            lastestMsg = conver.lastestMsg,
            isTop = conver.isTop,
            isBlocked = conver.isBlocked;
        var isTopToBool = isTop === 1;
        var isNotify = isBlocked === 1 ? NotificationStatus$1.OPEN : NotificationStatus$1.CLOSE;
        return {
          conversationType: conversationType,
          targetId: targetId,
          unreadMessageCount: unreadMessageCount,
          latestMessage: this._buildMessage(lastestMsg),
          hasMentioned: false,
          mentionedInfo: null,
          notificationStatus: isNotify,
          isTop: isTopToBool,
          lastUnreadTime: 0
        };
      }
    }, {
      key: "_setConnectionStatusListener",
      value: function _setConnectionStatusListener(listener) {
        var _this86 = this;

        this._connectionListener = listener;

        this._cppProtocol.setConnectionStatusListener(function (status) {
          var _this87 = this;

          _newArrowCheck(this, _this86);

          logger.warn('protocol connection status changed:', status);
          this._cppConnectionStatus = status;
          var connectionStatus;

          switch (status) {
            case 10:
              connectionStatus = ConnectionStatus$1.CONNECTING;
              break;

            case 31004:
              setTimeout(function () {
                _newArrowCheck(this, _this87);

                this._promiseHandler.connect && this._promiseHandler.connect.resolve(ErrorCode$1.RC_CONN_USER_OR_PASSWD_ERROR);
              }.bind(this));
              return;

            case 12:
              connectionStatus = ConnectionStatus$1.DISCONNECTED;
              break;

            case 13:
              connectionStatus = ConnectionStatus$1.BLOCKED;
              break;

            case 1:
            case 8:
            case 9:
            case 11:
            case 31011:
            case 30000:
            case 30002:
              connectionStatus = ConnectionStatus$1.NETWORK_UNAVAILABLE;
              break;

            case 30010:
              this._try2Reconnect();

              connectionStatus = ConnectionStatus$1.NETWORK_UNAVAILABLE;
              break;

            case 0:
            case 33005:
              connectionStatus = ConnectionStatus$1.CONNECTED;
              this.connectedTime = new Date().getTime() - this._cppProtocol.getDeltaTime();
              setTimeout(function () {
                _newArrowCheck(this, _this87);

                this._promiseHandler.connect && this._promiseHandler.connect.resolve(ErrorCode$1.SUCCESS);
                this._heartbeat = new Heartbeat(true, listener);

                this._heartbeat.start(this._sendHeartbeat, this);
              }.bind(this));
              break;

            case ConnectionStatus$1.KICKED_OFFLINE_BY_OTHER_CLIENT:
              connectionStatus = ConnectionStatus$1.KICKED_OFFLINE_BY_OTHER_CLIENT;
              break;

            case 30004:
              return;

            default:
              connectionStatus = status;
              break;
          }

          this._connectionStatus = connectionStatus;
          setTimeout(function () {
            _newArrowCheck(this, _this87);

            listener(connectionStatus);
          }.bind(this));
        }.bind(this), this._dbInitCallback, function () {
          _newArrowCheck(this, _this86);

          this._heartbeat.setHeartbeatRes(true);
        }.bind(this));
      }
    }, {
      key: "_dbInitCallback",
      value: function _dbInitCallback(code) {}
    }, {
      key: "_sendHeartbeat",
      value: function _sendHeartbeat() {
        this._cppProtocol.sendHeartbeat();
      }
    }, {
      key: "_try2Reconnect",
      value: function _try2Reconnect() {
        var _this88 = this;

        if (this._cppConnectionStatus !== 30010 && this._cppConnectionStatus !== 30004) {
          return;
        }

        logger.warn('protocol reconnecting');

        this._cppProtocol.connectWithToken(this._currentToken, '', function () {
          _newArrowCheck(this, _this88);
        }.bind(this));

        setTimeout(function () {
          _newArrowCheck(this, _this88);

          this._try2Reconnect();
        }.bind(this), 5000);
      }
    }, {
      key: "_setOnReceiveMessageListener",
      value: function _setOnReceiveMessageListener(listener) {
        var _this89 = this;

        this._cppProtocol.setOnReceiveMessageListener(function (result, leftCount, offline, hasMore) {
          _newArrowCheck(this, _this89);

          var message = this._buildMessage(result, offline);

          listener(message);
        }.bind(this));
      }
    }, {
      key: "_setConversationStatusListener",
      value: function _setConversationStatusListener(listener) {
        var _this90 = this;

        this._cppProtocol.setConversationStatusListener(function (result) {
          var _this91 = this;

          _newArrowCheck(this, _this90);

          var list = JSON.parse(result).list;
          var updatedConvers = [];
          list.forEach(function (conver) {
            var _this92 = this;

            _newArrowCheck(this, _this91);

            var converData = JSON.parse(conver.obj);
            var conversationType = converData.conversationType,
                targetId = converData.targetId,
                status = converData.status;
            var statusObj = {
              notificationStatus: 2,
              isTop: false
            };
            status.forEach(function (status) {
              _newArrowCheck(this, _this92);

              var itemObj = JSON.parse(status.item);

              if (itemObj.type === 1) {
                statusObj.notificationStatus = Number(itemObj.value) === 1 ? NotificationStatus$1.OPEN : NotificationStatus$1.CLOSE;
              } else {
                statusObj.isTop = Number(itemObj.value) === 1;
              }
            }.bind(this));
            updatedConvers.push({
              conversationType: conversationType,
              targetId: targetId,
              updatedItems: {
                notificationStatus: {
                  val: statusObj.notificationStatus,
                  time: 0
                },
                isTop: {
                  val: statusObj.isTop,
                  time: 0
                }
              }
            });
          }.bind(this));
          listener(updatedConvers);
        }.bind(this));
      }
    }, {
      key: "_clearListener",
      value: function _clearListener() {
        this._cppProtocol.setOnReceiveMessageListener();

        this._cppProtocol.setConnectionStatusListener();

        this._cppProtocol.setOnReceiveStatusListener();
      }
    }, {
      key: "init",
      value: function init(appkey, config) {
        var sdkInfo = this._cppProtocol.initWithAppkey(appkey, config === null || config === void 0 ? void 0 : config.dbPath, config);

        if (sdkInfo) {
          sdkInfo = JSON.parse(sdkInfo);
        }

        this._registerMsgTypes();

        return sdkInfo;
      }
    }, {
      key: "registerMessageType",
      value: function registerMessageType(messageType, isPersited, isCounted, searchProps) {
        var msgOptions = 0;

        if (isPersited) {
          msgOptions = msgOptions | 0x01;
        }

        if (isCounted) {
          msgOptions = msgOptions | 0x02;
        }

        this._customMessageType[messageType] = {
          isCounted: isCounted,
          isPersited: isPersited
        };

        this._cppProtocol.registerMessageType(messageType, msgOptions, searchProps);
      }
    }, {
      key: "connect",
      value: function connect(token, naviInfo, connectType, userId) {
        var _this93 = this;

        var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        this._currentToken = token;

        if (options.type) {
          this._cppProtocol.setEnvironment(true);
        }

        this._cppProtocol.connectWithToken(token, userId, function (userId) {
          _newArrowCheck(this, _this93);

          this.currentUserId = userId;
        }.bind(this));

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this93);

          this._promiseHandler.connect = {
            resolve: resolve,
            reject: reject
          };
        }.bind(this));
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        this._cppProtocol.disconnect(true);

        this._heartbeat.stop();

        this._connectionListener(ConnectionStatus$1.DISCONNECTED);
      }
    }, {
      key: "logout",
      value: function logout() {
        this.disconnect();
      }
    }, {
      key: "getConnectTime",
      value: function getConnectTime() {
        var _this94 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this94);

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: this.connectedTime
          });
        }.bind(this));
      }
    }, {
      key: "setUserStatusListener",
      value: function setUserStatusListener(config, listener) {
        var _this95 = this;

        this._cppProtocol.setOnReceiveStatusListener(function (userId, status) {
          _newArrowCheck(this, _this95);

          listener({
            userId: userId,
            status: status
          });
        }.bind(this));

        var userIds = config.userIds || [];

        if (userIds.length) {
          this.subscribeUserStatus(userIds);
        }
      }
    }, {
      key: "subscribeUserStatus",
      value: function subscribeUserStatus(userIds) {
        var _this96 = this;

        return new Promise(function (resolve, reject) {
          var _this97 = this;

          _newArrowCheck(this, _this96);

          this._cppProtocol.subscribeUserStatus(userIds, function () {
            _newArrowCheck(this, _this97);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "setUserStatus",
      value: function setUserStatus(status) {
        var _this98 = this;

        return new Promise(function (resolve, reject) {
          var _this99 = this;

          _newArrowCheck(this, _this98);

          this._cppProtocol.setUserStatus(status, function () {
            _newArrowCheck(this, _this99);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "getUserStatus",
      value: function getUserStatus(userId) {
        var _this100 = this;

        return new Promise(function (resolve, reject) {
          var _this101 = this;

          _newArrowCheck(this, _this100);

          this._cppProtocol.getUserStatus(userId, function (status) {
            _newArrowCheck(this, _this101);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: {
                status: status
              }
            });
          }.bind(this), function (code) {
            _newArrowCheck(this, _this101);

            resolve({
              code: code
            });
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(conversationType, targetId, options) {
        var _this102 = this;

        var messageType = options.messageType,
            content = options.content,
            pushContent = options.pushContent,
            pushData = options.pushData,
            directionalUserIdList = options.directionalUserIdList,
            disableNotification = options.disableNotification,
            canIncludeExpansion = options.canIncludeExpansion,
            expansion = options.expansion,
            isVoipPush = options.isVoipPush,
            pushConfig = options.pushConfig;

        var _ref3 = pushConfig || {},
            iOSConfig = _ref3.iOSConfig,
            androidConfig = _ref3.androidConfig,
            pushTitle = _ref3.pushTitle,
            newPushContent = _ref3.pushContent,
            newPushData = _ref3.pushData,
            disablePushTitle = _ref3.disablePushTitle,
            forceShowDetailContent = _ref3.forceShowDetailContent;

        var serverPushConfigStr = pushConfigsToJSON(iOSConfig, androidConfig);
        return new Promise(function (resolve, reject) {
          var _this103 = this;

          _newArrowCheck(this, _this102);

          pushContent = pushContent || '';
          pushData = pushData || '';
          disableNotification = disableNotification || false;
          expansion = expansion || '';
          isVoipPush = isVoipPush || false;
          pushTitle = pushTitle || '';
          newPushContent = newPushContent || '';
          newPushData = newPushData || '';
          disablePushTitle = disablePushTitle || false;
          forceShowDetailContent = forceShowDetailContent || false;
          canIncludeExpansion = canIncludeExpansion || false;
          var notificationId = (androidConfig === null || androidConfig === void 0 ? void 0 : androidConfig.notificationId) || '';
          var isGroup = conversationType === ConversationType$1.GROUP;
          directionalUserIdList = [];

          if (isGroup && messageType === MessageType$1.READ_RECEIPT_RESPONSE) {
            if (content.receiptMessageDic) {
              for (var _key19 in content.receiptMessageDic) {
                directionalUserIdList === null || directionalUserIdList === void 0 ? void 0 : directionalUserIdList.push(_key19);
              }
            }
          }

          if (isGroup && messageType === MessageType$1.READ_RECEIPT_REQUEST) {
            directionalUserIdList === null || directionalUserIdList === void 0 ? void 0 : directionalUserIdList.push(this.currentUserId);
          }

          var onSuccess = function onSuccess(message, code) {
            _newArrowCheck(this, _this103);

            var msg = this._buildMessage(message, false);

            if (code === ErrorCode$1.SENSITIVE_REPLACE) {
              return resolve({
                code: code
              });
            }

            return resolve({
              code: ErrorCode$1.SUCCESS,
              data: msg
            });
          }.bind(this);

          var onError = function onError(message, code) {
            _newArrowCheck(this, _this103);

            var msg = this._buildMessage(message, false);

            return resolve({
              code: code,
              data: msg
            });
          }.bind(this);

          var pushTplId = '';

          this._cppProtocol.sendMessage(onSuccess, onError, conversationType, targetId, messageType, JSON.stringify(content), directionalUserIdList, disableNotification, disablePushTitle, forceShowDetailContent, pushContent, pushData, notificationId, pushTitle, serverPushConfigStr, pushTplId, canIncludeExpansion, JSON.stringify(expansion), isVoipPush);
        }.bind(this));
      }
    }, {
      key: "recallMsg",
      value: function recallMsg(conversationType, targetId, messageUId, sentTime, user, pushContent) {
        var _this104 = this;

        return new Promise(function (resolve, reject) {
          var _this105 = this;

          _newArrowCheck(this, _this104);

          pushContent = pushContent || '';
          var message = {
            conversationType: conversationType,
            targetId: targetId,
            senderUserId: this.currentUserId,
            content: null,
            objectName: MessageType$1.RECALL,
            messageUid: messageUId,
            messageDirection: MessageDirection$1.SEND,
            status: ReceivedStatus$1.UNREAD,
            sentTime: sentTime
          };

          var returnMsg = this._buildMessage(JSON.stringify(message), false);

          var disableNotification = false;
          var disablePushTitle = false;
          var forceShowDetailContent = false;
          var pushData = '';
          var notificationId = '';
          var pushTitle = '';
          var pushConfig = '';
          var pushTemplateId = '';

          var onSuccess = function onSuccess() {
            _newArrowCheck(this, _this105);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: returnMsg
            });
          }.bind(this);

          var onError = function onError(code) {
            _newArrowCheck(this, _this105);

            resolve({
              code: code
            });
          }.bind(this);

          this._cppProtocol.recallMessage(onSuccess, onError, MessageType$1.RECALL, JSON.stringify(returnMsg), disableNotification, disablePushTitle, forceShowDetailContent, pushContent, pushData, notificationId, pushTitle, pushConfig, pushTemplateId);
        }.bind(this));
      }
    }, {
      key: "getHistoryMessage",
      value: function getHistoryMessage(conversationType, targetId, timestamp, count, order, messageType) {
        var _this106 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this106);

          timestamp = timestamp || 0;
          messageType = messageType || '';
          var desc = order === 0;

          var cppMessagaes = this._cppProtocol.getHistoryMessages(conversationType, targetId, timestamp, count, messageType, desc);

          var messages = JSON.parse(cppMessagaes).list;
          var hisMessages = [];
          messages.reverse();

          for (var i = 0; i < messages.length; i++) {
            var buildMsg = this._buildMessage(messages[i].obj);

            hisMessages[i] = buildMsg;
          }

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: {
              list: hisMessages,
              hasMore: messages.length === count
            }
          });
        }.bind(this));
      }
    }, {
      key: "deleteRemoteMessage",
      value: function deleteRemoteMessage(conversationType, targetId, messages) {
        var _this107 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this107);

          this._cppProtocol.clearMessages(conversationType, targetId);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "deleteRemoteMessageByTimestamp",
      value: function deleteRemoteMessageByTimestamp(conversationType, targetId, timestamp) {
        var _this108 = this;

        return new Promise(function (resolve, reject) {
          var _this109 = this;

          _newArrowCheck(this, _this108);

          var onSuccess = function onSuccess() {
            _newArrowCheck(this, _this109);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this);

          var onError = function onError(code) {
            _newArrowCheck(this, _this109);

            resolve(code);
          }.bind(this);

          this._cppProtocol.clearRemoteHistoryMessages(conversationType, targetId, timestamp, onSuccess, onError);
        }.bind(this));
      }
    }, {
      key: "getConversationList",
      value: function getConversationList(count, conversationType, startTime, order) {
        var _this110 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this110);

          var converTypes = [1, 3, 6, 7];

          var result = this._cppProtocol.getConversationList(converTypes);

          var resultList = JSON.parse(result);
          var converList = resultList.list;
          var convers = [];

          for (var i = 0; i < converList.length; i++) {
            convers.push(this._buildConversation(converList[i].obj));
          }

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: convers
          });
        }.bind(this));
      }
    }, {
      key: "getConversation",
      value: function getConversation(conversationType, targetId) {
        var _this111 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this111);

          var result = this._cppProtocol.getConversation(conversationType, targetId);

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: this._buildConversation(result)
          });
        }.bind(this));
      }
    }, {
      key: "removeConversation",
      value: function removeConversation(conversationType, targetId) {
        var _this112 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this112);

          this._cppProtocol.removeConversation(conversationType, targetId);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "clearConversations",
      value: function clearConversations() {
        var _this113 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this113);

          this._cppProtocol.clearConversations();

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "getAllConversationUnreadCount",
      value: function getAllConversationUnreadCount() {
        var _this114 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this114);

          var count = this._cppProtocol.getTotalUnreadCount();

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: count
          });
        }.bind(this));
      }
    }, {
      key: "getConversationUnreadCount",
      value: function getConversationUnreadCount(conversationType, targetId) {
        var _this115 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this115);

          var count = this._cppProtocol.getUnreadCount(conversationType, targetId);

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: count
          });
        }.bind(this));
      }
    }, {
      key: "clearConversationUnreadCount",
      value: function clearConversationUnreadCount(conversationType, targetId) {
        var _this116 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this116);

          this._cppProtocol.clearUnreadCount(conversationType, targetId);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "clearUnreadCountByTimestamp",
      value: function clearUnreadCountByTimestamp(conversationType, targetId) {
        var _this117 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this117);

          this._cppProtocol.clearUnreadCountByTimestamp(conversationType, targetId);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "setConversationToTop",
      value: function setConversationToTop(conversationType, targetId, isTop) {
        var _this118 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this118);

          this._cppProtocol.setConversationToTop(conversationType, targetId, isTop);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "setConversationHidden",
      value: function setConversationHidden(conversationType, targetId, isHidden) {
        var _this119 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this119);

          this._cppProtocol.setConversationHidden(conversationType, targetId, isHidden);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "setConversationNotificationStatus",
      value: function setConversationNotificationStatus(conversationType, targetId, isNotify) {
        var _this120 = this;

        return new Promise(function (resolve, reject) {
          var _this121 = this;

          _newArrowCheck(this, _this120);

          this._cppProtocol.setConversationNotificationStatus(conversationType, targetId, isNotify, function () {
            _newArrowCheck(this, _this121);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "getConversationNotificationStatus",
      value: function getConversationNotificationStatus(conversationType, targetId) {
        var _this122 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this122);

          var notify = this._cppProtocol.getConversationNotificationStatus(conversationType, targetId);

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: notify
          });
        }.bind(this));
      }
    }, {
      key: "searchConversationByContent",
      value: function searchConversationByContent(keyword, conversationTypes) {
        var _this123 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this123);

          conversationTypes = conversationTypes || [1, 3, 6, 7];

          var data = this._cppProtocol.searchConversationByContent(conversationTypes, keyword);

          var list = JSON.parse(data).list;
          var convers = [];

          for (var i = 0; i < list.length; i++) {
            convers[i] = this._buildConversation(list[i].obj);
          }

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: convers
          });
        }.bind(this));
      }
    }, {
      key: "searchMessageByContent",
      value: function searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total) {
        var _this124 = this;

        return new Promise(function (resolve, reject) {
          var _this125 = this;

          _newArrowCheck(this, _this124);

          this._cppProtocol.searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total, function (result, matched) {
            _newArrowCheck(this, _this125);

            var list = result ? JSON.parse(result).list : [];
            var msgs = [];

            for (var i = 0; i < list.length; i++) {
              msgs[i] = this._buildMessage(list[i].obj);
            }

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: msgs
            });
          }.bind(this), function (code) {
            _newArrowCheck(this, _this125);

            resolve({
              code: code
            });
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "getUnreadMentionedMessages",
      value: function getUnreadMentionedMessages(conversationType, targetId) {
        var mentions = JSON.parse(this._cppProtocol.getUnreadMentionedMessages(conversationType, targetId)).list;

        for (var i = 0; i < mentions.length; i++) {
          mentions[i] = this._buildMessage(mentions[i].obj);
        }

        return mentions;
      }
    }, {
      key: "addToBlacklist",
      value: function addToBlacklist(userId) {
        var _this126 = this;

        return new Promise(function (resolve, reject) {
          var _this127 = this;

          _newArrowCheck(this, _this126);

          this._cppProtocol.addToBlacklist(userId, function () {
            _newArrowCheck(this, _this127);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "removeFromBlacklist",
      value: function removeFromBlacklist(userId) {
        var _this128 = this;

        return new Promise(function (resolve, reject) {
          var _this129 = this;

          _newArrowCheck(this, _this128);

          this._cppProtocol.removeFromBlacklist(userId, function () {
            _newArrowCheck(this, _this129);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "getBlacklist",
      value: function getBlacklist() {
        var _this130 = this;

        return new Promise(function (resolve, reject) {
          var _this131 = this;

          _newArrowCheck(this, _this130);

          this._cppProtocol.getBlacklist(function (userIds) {
            _newArrowCheck(this, _this131);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: userIds
            });
          }.bind(this), function (code) {
            _newArrowCheck(this, _this131);

            resolve({
              code: code
            });
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "getBlacklistStatus",
      value: function getBlacklistStatus(userId) {
        var _this132 = this;

        return new Promise(function (resolve, reject) {
          var _this133 = this;

          _newArrowCheck(this, _this132);

          this._cppProtocol.getBlacklistStatus(userId, function (result) {
            _newArrowCheck(this, _this133);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: result
            });
          }.bind(this), function (code) {
            _newArrowCheck(this, _this133);

            resolve({
              code: code
            });
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "insertMessage",
      value: function insertMessage(conversationType, targetId, senderUserId, messageType, msgContent, direction) {
        var _this134 = this;

        msgContent = JSON.stringify(msgContent);
        return new Promise(function (resolve, reject) {
          var _this135 = this;

          _newArrowCheck(this, _this134);

          var msg = this._cppProtocol.insertMessage(conversationType, targetId, senderUserId, messageType, msgContent, function () {
            _newArrowCheck(this, _this135);
          }.bind(this), function (error) {
            _newArrowCheck(this, _this135);

            resolve({
              code: error
            });
          }.bind(this), direction);

          var receivedMessage = this._buildMessage(msg, false);

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: receivedMessage
          });
        }.bind(this));
      }
    }, {
      key: "deleteMessages",
      value: function deleteMessages(timestamps) {
        var _this136 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this136);

          this._cppProtocol.deleteMessages(timestamps);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "deleteMessagesByTimestamp",
      value: function deleteMessagesByTimestamp(conversationType, targetId, timestamp, cleanSpace) {
        var _this137 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this137);

          this._cppProtocol.deleteMessagesByTimestamp(conversationType, targetId, timestamp, cleanSpace);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "getMessage",
      value: function getMessage(messageId) {
        var _this138 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this138);

          var result = this._cppProtocol.getMessage(messageId);

          var message = this._buildMessage(result, false);

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: message
          });
        }.bind(this));
      }
    }, {
      key: "setMessageContent",
      value: function setMessageContent(messageId, content, messageType) {
        var _this139 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this139);

          content = JSON.stringify(content);

          this._cppProtocol.setMessageContent(messageId, content, messageType);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "setMessageSearchField",
      value: function setMessageSearchField(messageId, content, searchFiles) {
        var _this140 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this140);

          this._cppProtocol.setMessageSearchField(messageId, content, searchFiles);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "setMessageSentStatus",
      value: function setMessageSentStatus(messageId, sentStatus) {
        var _this141 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this141);

          this._cppProtocol.setMessageSentStatus(messageId, sentStatus);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "setMessageReceivedStatus",
      value: function setMessageReceivedStatus(messageId, receivedStatus) {
        var _this142 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this142);

          this._cppProtocol.setMessageReceivedStatus(messageId, receivedStatus);

          resolve(ErrorCode$1.SUCCESS);
        }.bind(this));
      }
    }, {
      key: "saveConversationMessageDraft",
      value: function saveConversationMessageDraft(conversationType, targetId, draft) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getConversationMessageDraft",
      value: function getConversationMessageDraft(conversationType, targetId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "clearConversationMessageDraft",
      value: function clearConversationMessageDraft(conversationType, targetId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "pullConversationStatus",
      value: function pullConversationStatus(timestamp) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "batchSetConversationStatus",
      value: function batchSetConversationStatus(statusList) {
        var _statusList$ = statusList[0],
            conversationType = _statusList$.conversationType,
            targetId = _statusList$.targetId,
            isTop = _statusList$.isTop,
            notificationStatus = _statusList$.notificationStatus;

        if (isTop !== undefined) {
          return this.setConversationToTop(conversationType, targetId, isTop);
        } else if (notificationStatus !== undefined) {
          var isBlocked = notificationStatus === NotificationStatus$1.OPEN;
          return this.setConversationNotificationStatus(conversationType, targetId, isBlocked);
        } else {
          this.setConversationToTop(conversationType, targetId, isTop);

          var _isBlocked = notificationStatus === NotificationStatus$1.OPEN;

          return this.setConversationNotificationStatus(conversationType, targetId, _isBlocked);
        }
      }
    }, {
      key: "pullUserSettings",
      value: function pullUserSettings(version) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "joinChatroom",
      value: function joinChatroom(chatroomId, count) {
        var _this143 = this;

        return new Promise(function (resolve, reject) {
          var _this144 = this;

          _newArrowCheck(this, _this143);

          this._cppProtocol.joinChatRoom(chatroomId, count, function () {
            _newArrowCheck(this, _this144);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "joinExistChatroom",
      value: function joinExistChatroom(chatroomId, count) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "quitChatroom",
      value: function quitChatroom(chatroomId) {
        var _this145 = this;

        return new Promise(function (resolve, reject) {
          var _this146 = this;

          _newArrowCheck(this, _this145);

          this._cppProtocol.quitChatRoom(chatroomId, function () {
            _newArrowCheck(this, _this146);

            resolve(ErrorCode$1.SUCCESS);
          }.bind(this), resolve);
        }.bind(this));
      }
    }, {
      key: "getChatroomInfo",
      value: function getChatroomInfo(chatroomId, count, order) {
        var _this147 = this;

        return new Promise(function (resolve, reject) {
          var _this148 = this;

          _newArrowCheck(this, _this147);

          this._cppProtocol.getChatroomInfo(chatroomId, count, order, function (result, count) {
            _newArrowCheck(this, _this148);

            var list = result ? JSON.parse(result).list : [];
            var userInfos = [];

            if (list.length > 0) {
              for (var i = 0; i < list.length; i++) {
                userInfos.push(JSON.parse(list[i].obj));
              }
            }

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: {
                userInfos: userInfos,
                userCount: count
              }
            });
          }.bind(this), function (code) {
            _newArrowCheck(this, _this148);

            resolve({
              code: code
            });
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "getChatroomHistoryMessages",
      value: function getChatroomHistoryMessages(chatroomId, timestamp, count, order) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setChatroomEntry",
      value: function setChatroomEntry(chatroomId, entry) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "forceSetChatroomEntry",
      value: function forceSetChatroomEntry(chatroomId, entry) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "removeChatroomEntry",
      value: function removeChatroomEntry(chatroomId, entry) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "forceRemoveChatroomEntry",
      value: function forceRemoveChatroomEntry(chatroomId, entry) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getChatroomEntry",
      value: function getChatroomEntry(chatroomId, key) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getAllChatroomEntry",
      value: function getAllChatroomEntry(chatroomId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getFileToken",
      value: function getFileToken(fileType, fileName) {
        var _this149 = this;

        return new Promise(function (resolve, reject) {
          var _this150 = this;

          _newArrowCheck(this, _this149);

          var uploadFileName = getUploadFileName(fileType, fileName);

          this._cppProtocol.getUploadToken(fileType, uploadFileName, function (token, bosToken, bosDate, bosPath, ossToken, ossPolicy, ossSignature, ossBucketName) {
            _newArrowCheck(this, _this150);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: {
                token: token,
                deadline: 0,
                bosToken: bosToken,
                bosDate: bosDate,
                path: bosPath,
                osskeyId: ossToken,
                ossPolicy: ossPolicy,
                ossSign: ossSignature,
                ossBucketName: ossBucketName,
                fileName: uploadFileName
              }
            });
          }.bind(this), function (code) {
            _newArrowCheck(this, _this150);

            resolve({
              code: code
            });
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "getFileUrl",
      value: function getFileUrl(fileType, uploadMethod, fileName, originName) {
        var _this151 = this;

        return new Promise(function (resolve, reject) {
          var _this152 = this;

          _newArrowCheck(this, _this151);

          var onSuccess = function onSuccess(url) {
            _newArrowCheck(this, _this152);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: {
                downloadUrl: url
              }
            });
          }.bind(this);

          var onError = function onError(code) {
            _newArrowCheck(this, _this152);

            resolve({
              code: code
            });
          }.bind(this);

          var isOss = uploadMethod === UploadMethod$1.ALI;
          var mimeKey = getMimeKey(fileType);

          this._cppProtocol.getDownloadUrl(fileType, mimeKey, originName, isOss, onSuccess, onError);
        }.bind(this));
      }
    }, {
      key: "clearData",
      value: function clearData() {
        var _this153 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this153);

          var result = this._cppProtocol.clearData();

          resolve({
            code: ErrorCode$1.SUCCESS,
            data: result
          });
        }.bind(this));
      }
    }, {
      key: "setDeviceInfo",
      value: function setDeviceInfo(device) {
        var _this154 = this;

        return new Promise(function (resolve, reject) {
          _newArrowCheck(this, _this154);

          var id = device.id || '';

          this._cppProtocol.setDeviceInfo({
            id: id
          });
        }.bind(this));
      }
    }, {
      key: "getVoIPKey",
      value: function getVoIPKey(engineType, channelName) {
        var _this155 = this;

        return new Promise(function (resolve, reject) {
          var _this156 = this;

          _newArrowCheck(this, _this155);

          var extra = '';

          var onSuccess = function onSuccess(token) {
            _newArrowCheck(this, _this156);

            resolve({
              code: ErrorCode$1.SUCCESS,
              data: token
            });
          }.bind(this);

          var onError = function onError(code) {
            _newArrowCheck(this, _this156);

            resolve({
              code: code
            });
          }.bind(this);

          this._cppProtocol.getVoIPKey(engineType, channelName, extra, onSuccess, onError);
        }.bind(this));
      }
    }, {
      key: "joinRTCRoom",
      value: function joinRTCRoom(roomId, mode, broadcastType) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "quitRTCRoom",
      value: function quitRTCRoom(roomId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "rtcPing",
      value: function rtcPing(roomId, mode, broadcastType) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCRoomInfo",
      value: function getRTCRoomInfo(roomId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCUserInfoList",
      value: function getRTCUserInfoList(roomId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCUserInfo",
      value: function getRTCUserInfo(roomId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setRTCUserInfo",
      value: function setRTCUserInfo(roomId, key, value) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "removeRTCUserInfo",
      value: function removeRTCUserInfo(roomId, keys) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setRTCData",
      value: function setRTCData(roomId, key, value, isInner, apiType, message) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setRTCTotalRes",
      value: function setRTCTotalRes(roomId, message, valueInfo, messageType) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCData",
      value: function getRTCData(roomId, keys, isInner, apiType) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "removeRTCData",
      value: function removeRTCData(roomId, keys, isInner, apiType, message) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setRTCOutData",
      value: function setRTCOutData(roomId, rtcData, type, message) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCOutData",
      value: function getRTCOutData(roomId, userIds) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCToken",
      value: function getRTCToken(roomId, mode, broadcastType) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "setRTCState",
      value: function setRTCState(roomId, reportId) {
        throw new Error('Method not implemented.');
      }
    }, {
      key: "getRTCUserList",
      value: function getRTCUserList(roomId) {
        throw new Error('Method not implemented.');
      }
    }]);

    return CPPEngine;
  }(AEngine);

  var PluginContext = function () {
    function PluginContext(_context) {
      _classCallCheck(this, PluginContext);

      this._context = _context;
    }

    _createClass(PluginContext, [{
      key: "getCoreVersion",
      value: function getCoreVersion() {
        return this._context.coreVersion;
      }
    }, {
      key: "getAPIVersion",
      value: function getAPIVersion() {
        return this._context.apiVersion;
      }
    }, {
      key: "getAppkey",
      value: function getAppkey() {
        return this._context.appkey;
      }
    }, {
      key: "getCurrentId",
      value: function getCurrentId() {
        return this._context.getCurrentUserId();
      }
    }, {
      key: "getConnectionStatus",
      value: function getConnectionStatus() {
        return this._context.getConnectionStatus();
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(conversationType, targetId, options) {
        return this._context.sendMessage(conversationType, targetId, options);
      }
    }, {
      key: "registerMessageType",
      value: function registerMessageType(objectName, isPersited, isCounted) {
        var searchProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        this._context.registerMessageType(objectName, isPersited, isCounted, searchProps);
      }
    }]);

    return PluginContext;
  }();

  var RTCPluginContext = function (_PluginContext) {
    _inherits(RTCPluginContext, _PluginContext);

    var _super20 = _createSuper(RTCPluginContext);

    function RTCPluginContext() {
      _classCallCheck(this, RTCPluginContext);

      return _super20.apply(this, arguments);
    }

    _createClass(RTCPluginContext, [{
      key: "getNaviInfo",
      value: function getNaviInfo() {
        return this._context.getInfoFromCache();
      }
    }, {
      key: "joinRTCRoom",
      value: function joinRTCRoom(roomId, mode, broadcastType) {
        return this._context.joinRTCRoom(roomId, mode, broadcastType);
      }
    }, {
      key: "quitRTCRoom",
      value: function quitRTCRoom(roomId) {
        return this._context.quitRTCRoom(roomId);
      }
    }, {
      key: "rtcPing",
      value: function rtcPing(roomId, mode, broadcastType) {
        return this._context.rtcPing(roomId, mode, broadcastType);
      }
    }, {
      key: "getRTCRoomInfo",
      value: function getRTCRoomInfo(roomId) {
        return this._context.getRTCRoomInfo(roomId);
      }
    }, {
      key: "getRTCUserInfoList",
      value: function getRTCUserInfoList(roomId) {
        return this._context.getRTCUserInfoList(roomId);
      }
    }, {
      key: "getRTCUserInfo",
      value: function getRTCUserInfo(roomId) {
        return this._context.getRTCUserInfo(roomId);
      }
    }, {
      key: "setRTCUserInfo",
      value: function setRTCUserInfo(roomId, key, value) {
        return this._context.setRTCUserInfo(roomId, key, value);
      }
    }, {
      key: "removeRTCUserInfo",
      value: function removeRTCUserInfo(roomId, keys) {
        return this._context.removeRTCUserInfo(roomId, keys);
      }
    }, {
      key: "setRTCData",
      value: function setRTCData(roomId, key, value, isInner, apiType, message) {
        return this._context.setRTCData(roomId, key, value, isInner, apiType, message);
      }
    }, {
      key: "setRTCTotalRes",
      value: function setRTCTotalRes(roomId, message, valueInfo, objectName) {
        return this._context.setRTCTotalRes(roomId, message, valueInfo, objectName);
      }
    }, {
      key: "getRTCData",
      value: function getRTCData(roomId, keys, isInner, apiType) {
        return this._context.getRTCData(roomId, keys, isInner, apiType);
      }
    }, {
      key: "removeRTCData",
      value: function removeRTCData(roomId, keys, isInner, apiType, message) {
        return this._context.removeRTCData(roomId, keys, isInner, apiType, message);
      }
    }, {
      key: "setRTCOutData",
      value: function setRTCOutData(roomId, rtcData, type, message) {
        return this._context.setRTCOutData(roomId, rtcData, type, message);
      }
    }, {
      key: "getRTCOutData",
      value: function getRTCOutData(roomId, userIds) {
        return this._context.getRTCOutData(roomId, userIds);
      }
    }, {
      key: "getRTCToken",
      value: function getRTCToken(roomId, mode, broadcastType) {
        return this._context.getRTCToken(roomId, mode, broadcastType);
      }
    }, {
      key: "setRTCState",
      value: function setRTCState(roomId, report) {
        return this._context.setRTCState(roomId, report);
      }
    }, {
      key: "getRTCUserList",
      value: function getRTCUserList(roomId) {
        return this._context.getRTCUserList(roomId);
      }
    }]);

    return RTCPluginContext;
  }(PluginContext);

  function cloneMessage(message) {
    return Object.assign({}, message);
  }

  var APIContext = function () {
    function APIContext(_runtime, options) {
      var _this157 = this;

      _classCallCheck(this, APIContext);

      this._runtime = _runtime;
      this._token = '';
      this._pluginContextQueue = [];
      this.coreVersion = "4.1.0";
      this._connectionStatus = ConnectionStatus$1.DISCONNECTED;
      this._watcher = {
        message: undefined,
        conversationState: undefined,
        chatroomState: undefined,
        connectionState: undefined,
        rtcInnerWatcher: undefined,
        expansion: undefined
      };
      this._options = Object.assign({}, options);
      this.appkey = this._options.appkey;
      this.apiVersion = this._options.apiVersion;
      var _this$_options = this._options,
          isEnterPrise = _this$_options.isEnterPrise,
          appkey = _this$_options.appkey,
          miniCMPProxy = _this$_options.miniCMPProxy,
          apiVersion = _this$_options.apiVersion,
          connectionType = _this$_options.connectionType;

      if (_runtime.tag === "electron" && !this._options.cppProtocol) {
        var msg = 'cppProtocol is required';
        logger.error(msg);
        throw new Error(msg);
      }

      if (isEnterPrise && this._options.navigators.length === 0) {
        var _msg = 'private navigators is required';
        logger.error(_msg);
        throw new Error(_msg);
      }

      this._options.navigators = this._options.navigators.filter(function (item) {
        _newArrowCheck(this, _this157);

        return /^https?:\/\//.test(item);
      }.bind(this));

      if (this._options.navigators.length === 0) {
        var _this$_options$naviga;

        if (isEnterPrise) {
          var _msg2 = 'navi urls is invalid';
          logger.error(_msg2);
          throw new Error(_msg2);
        }

        (_this$_options$naviga = this._options.navigators).push.apply(_this$_options$naviga, PUBLIC_CLOUD_NAVI_URIS);
      }

      this._navi = new Navi(_runtime, appkey, this._options.navigators, miniCMPProxy, apiVersion, connectionType);
      var engineWatcher = {
        status: this._connectionStatusListener.bind(this),
        message: this._messageReceiver.bind(this),
        chatroom: this._chatroomInfoListener.bind(this),
        conversation: this._conversationInfoListener.bind(this),
        expansion: this._expansionInfoListener.bind(this)
      };
      this._engine = this._options.cppProtocol ? new CPPEngine(_runtime, appkey, engineWatcher, apiVersion, this._options.cppProtocol, this._options) : new JSEngine(_runtime, appkey, engineWatcher, apiVersion);
    }

    _createClass(APIContext, [{
      key: "install",
      value: function install(plugin, options) {
        var context = plugin.tag === 'RCRTC' ? new RTCPluginContext(this) : new PluginContext(this);
        var pluginClient = null;

        try {
          if (!plugin.verify(this._runtime)) {
            return null;
          }

          pluginClient = plugin.setup(context, this._runtime, options);
        } catch (error) {
          logger.error('install plugin error!\n', error);
        }

        pluginClient && this._pluginContextQueue.push(context);
        return pluginClient;
      }
    }, {
      key: "_connectionStatusListener",
      value: function _connectionStatusListener(status) {
        var _this158 = this;

        var _a;

        this._connectionStatus = status;
        ((_a = this._watcher.rtcInnerWatcher) === null || _a === void 0 ? void 0 : _a.status) && this._watcher.rtcInnerWatcher.status(status);

        this._pluginContextQueue.forEach(function (item) {
          _newArrowCheck(this, _this158);

          item.onconnectionstatechange && item.onconnectionstatechange(status);
        }.bind(this));

        this._watcher.connectionState && this._watcher.connectionState(status);
      }
    }, {
      key: "_messageReceiver",
      value: function _messageReceiver(message) {
        var _this159 = this;

        if (message.conversationType === ConversationType$1.RTC_ROOM || Object.prototype.hasOwnProperty.call(CallLibMsgType, message.messageType)) {
          if (this._watcher.rtcInnerWatcher && this._watcher.rtcInnerWatcher.message) {
            this._watcher.rtcInnerWatcher.message(cloneMessage(message));

            return;
          }
        }

        if (this._pluginContextQueue.some(function (item) {
          _newArrowCheck(this, _this159);

          if (!item.onmessage) {
            return false;
          }

          try {
            return item.onmessage(cloneMessage(message));
          } catch (err) {
            logger.error('plugin error =>', err);
            return false;
          }
        }.bind(this))) {
          return;
        }

        this._watcher.message && this._watcher.message(cloneMessage(message));
      }
    }, {
      key: "_chatroomInfoListener",
      value: function _chatroomInfoListener(info) {
        this._watcher.chatroomState && this._watcher.chatroomState(info);
      }
    }, {
      key: "_conversationInfoListener",
      value: function _conversationInfoListener(info) {
        this._watcher.conversationState && this._watcher.conversationState(info);
      }
    }, {
      key: "_expansionInfoListener",
      value: function _expansionInfoListener(info) {
        this._watcher.expansion && this._watcher.expansion(info);
      }
    }, {
      key: "assignWatcher",
      value: function assignWatcher(watcher) {
        var _this160 = this;

        Object.keys(this._watcher).forEach(function (key) {
          _newArrowCheck(this, _this160);

          if (Object.prototype.hasOwnProperty.call(watcher, key)) {
            var value = watcher[key];
            this._watcher[key] = isFunction(value) || isObject(value) ? value : undefined;
          }
        }.bind(this));
      }
    }, {
      key: "getConnectedTime",
      value: function getConnectedTime() {
        return this._engine.connectedTime;
      }
    }, {
      key: "getCurrentUserId",
      value: function getCurrentUserId() {
        return this._engine.currentUserId;
      }
    }, {
      key: "getConnectionStatus",
      value: function getConnectionStatus() {
        return this._connectionStatus;
      }
    }, {
      key: "connect",
      value: function connect(token) {
        var refreshNavi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee58() {
          var _this161 = this;

          var tmpArr, dynamicUris, isCppMode, naviInfo, code;
          return regeneratorRuntime.wrap(function _callee58$(_context60) {
            while (1) {
              switch (_context60.prev = _context60.next) {
                case 0:
                  if (!(this._connectionStatus === ConnectionStatus$1.CONNECTED)) {
                    _context60.next = 2;
                    break;
                  }

                  return _context60.abrupt("return", {
                    code: ErrorCode$1.SUCCESS,
                    userId: this._engine.currentUserId
                  });

                case 2:
                  if (!(this._connectionStatus === ConnectionStatus$1.CONNECTING)) {
                    _context60.next = 4;
                    break;
                  }

                  return _context60.abrupt("return", {
                    code: ErrorCode$1.BIZ_ERROR_CONNECTING
                  });

                case 4:
                  if (!(typeof token !== 'string' || token.length === 0)) {
                    _context60.next = 6;
                    break;
                  }

                  return _context60.abrupt("return", {
                    code: ErrorCode$1.RC_CONN_USER_OR_PASSWD_ERROR
                  });

                case 6:
                  this._token = token;
                  tmpArr = token.split('@');
                  dynamicUris = tmpArr[1] ? tmpArr[1].split(';').map(function (item) {
                    _newArrowCheck(this, _this161);

                    return /^https?:/.test(item) ? item : "https://".concat(item);
                  }.bind(this)) : [];
                  isCppMode = !!this._options.cppProtocol;
                  _context60.next = 12;
                  return this._navi.getInfo(this._getTokenWithoutNavi(), dynamicUris, refreshNavi, isCppMode);

                case 12:
                  naviInfo = _context60.sent;

                  if (!(!naviInfo && !isCppMode)) {
                    _context60.next = 15;
                    break;
                  }

                  return _context60.abrupt("return", {
                    code: ErrorCode$1.RC_NAVI_RESOURCE_ERROR
                  });

                case 15:
                  _context60.next = 17;
                  return this._engine.connect(this._getTokenWithoutNavi(), naviInfo, this._options.connectionType);

                case 17:
                  code = _context60.sent;

                  if (code === ErrorCode$1.SUCCESS && !isCppMode) {
                    naviInfo.openUS === 1 && this._pullUserSettings();
                  }

                  return _context60.abrupt("return", {
                    code: code,
                    userId: this._engine.currentUserId
                  });

                case 20:
                case "end":
                  return _context60.stop();
              }
            }
          }, _callee58, this);
        }));
      }
    }, {
      key: "getConnectTime",
      value: function getConnectTime() {
        return this._engine.getConnectTime();
      }
    }, {
      key: "_pullUserSettings",
      value: function _pullUserSettings() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee59() {
          return regeneratorRuntime.wrap(function _callee59$(_context61) {
            while (1) {
              switch (_context61.prev = _context61.next) {
                case 0:
                case "end":
                  return _context61.stop();
              }
            }
          }, _callee59);
        }));
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        var _this162 = this;

        this._engine.disconnect();

        this._pluginContextQueue.forEach(function (item) {
          _newArrowCheck(this, _this162);

          if (!item.ondisconnect) {
            return;
          }

          try {
            item.ondisconnect();
          } catch (err) {
            logger.error('plugin error =>', err);
          }
        }.bind(this));

        return Promise.resolve();
      }
    }, {
      key: "reconnect",
      value: function reconnect() {
        return this.connect(this._getTokenWithoutNavi());
      }
    }, {
      key: "_getTokenWithoutNavi",
      value: function _getTokenWithoutNavi() {
        return this._token.replace(/@.+$/, '@');
      }
    }, {
      key: "getInfoFromCache",
      value: function getInfoFromCache() {
        return this._navi.getInfoFromCache(this._getTokenWithoutNavi());
      }
    }, {
      key: "registerMessageType",
      value: function registerMessageType(objectName, isPersited, isCounted) {
        var searchProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        this._engine.registerMessageType(objectName, isPersited, isCounted, searchProps);
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(conversationType, targetId, options) {
        var contentJson = JSON.stringify(options.content);

        if (getByteLength(contentJson) > MAX_MESSAGE_CONTENT_BYTES) {
          return Promise.resolve({
            code: ErrorCode$1.RC_MSG_CONTENT_EXCEED_LIMIT
          });
        }

        return this._engine.sendMessage(conversationType, targetId, options);
      }
    }, {
      key: "sendExpansionMessage",
      value: function sendExpansionMessage(options) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee60() {
          var conversationType, targetId, messageUId, keys, expansion, originExpansion, removeAll, canIncludeExpansion, isExceedLimit, isIllgalEx, exKeysLength, totalExpansion, totalExKeysLength, _key20, val, content, _yield$this$_engine$s, code;

          return regeneratorRuntime.wrap(function _callee60$(_context62) {
            while (1) {
              switch (_context62.prev = _context62.next) {
                case 0:
                  conversationType = options.conversationType, targetId = options.targetId, messageUId = options.messageUId, keys = options.keys, expansion = options.expansion, originExpansion = options.originExpansion, removeAll = options.removeAll, canIncludeExpansion = options.canIncludeExpansion;

                  if (canIncludeExpansion) {
                    _context62.next = 3;
                    break;
                  }

                  return _context62.abrupt("return", {
                    code: ErrorCode$1.MESSAGE_KV_NOT_SUPPORT
                  });

                case 3:
                  isExceedLimit = false;
                  isIllgalEx = false;

                  if (isObject(expansion)) {
                    originExpansion = originExpansion || {};
                    exKeysLength = Object.keys(expansion).length;
                    totalExpansion = Object.assign(originExpansion, expansion);
                    totalExKeysLength = Object.keys(totalExpansion).length;
                    isExceedLimit = totalExKeysLength > 300 || exKeysLength > 20;

                    for (_key20 in expansion) {
                      val = expansion[_key20];
                      isExceedLimit = _key20.length > 32 || val.length > 64;
                      isIllgalEx = !/^[A-Za-z0-9_=+-]+$/.test(_key20);
                    }
                  }

                  if (!isExceedLimit) {
                    _context62.next = 8;
                    break;
                  }

                  return _context62.abrupt("return", {
                    code: ErrorCode$1.EXPANSION_LIMIT_EXCEET
                  });

                case 8:
                  if (!isIllgalEx) {
                    _context62.next = 10;
                    break;
                  }

                  return _context62.abrupt("return", {
                    code: ErrorCode$1.BIZ_ERROR_INVALID_PARAMETER
                  });

                case 10:
                  content = {
                    mid: messageUId
                  };
                  expansion && (content.put = expansion);
                  keys && (content.del = keys);
                  removeAll && (content.removeAll = 1);
                  _context62.next = 16;
                  return this._engine.sendMessage(conversationType, targetId, {
                    content: content,
                    messageType: MessageType$1.EXPANSION_NOTIFY
                  });

                case 16:
                  _yield$this$_engine$s = _context62.sent;
                  code = _yield$this$_engine$s.code;
                  return _context62.abrupt("return", {
                    code: code
                  });

                case 19:
                case "end":
                  return _context62.stop();
              }
            }
          }, _callee60, this);
        }));
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        var _this163 = this;

        this._watcher = {};

        this._engine.disconnect();

        this._pluginContextQueue.forEach(function (item) {
          _newArrowCheck(this, _this163);

          if (!item.ondestroy) {
            return;
          }

          try {
            item.ondestroy();
          } catch (err) {
            logger.error('plugin error =>', err);
          }
        }.bind(this));

        this._pluginContextQueue.length = 0;
      }
    }, {
      key: "getHistoryMessage",
      value: function getHistoryMessage(conversationType, targetId) {
        var timestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        return this._engine.getHistoryMessage(conversationType, targetId, timestamp, count, order);
      }
    }, {
      key: "getConversationList",
      value: function getConversationList() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
        var conversationType = arguments.length > 1 ? arguments[1] : undefined;
        var startTime = arguments.length > 2 ? arguments[2] : undefined;
        var order = arguments.length > 3 ? arguments[3] : undefined;
        return this._engine.getConversationList(count, conversationType, startTime, order);
      }
    }, {
      key: "removeConversation",
      value: function removeConversation(conversationType, targetId) {
        return this._engine.removeConversation(conversationType, targetId);
      }
    }, {
      key: "clearUnreadCount",
      value: function clearUnreadCount(conversationType, targetId) {
        return this._engine.clearConversationUnreadCount(conversationType, targetId);
      }
    }, {
      key: "getUnreadCount",
      value: function getUnreadCount(conversationType, targetId) {
        return this._engine.getConversationUnreadCount(conversationType, targetId);
      }
    }, {
      key: "getTotalUnreadCount",
      value: function getTotalUnreadCount() {
        return this._engine.getAllConversationUnreadCount();
      }
    }, {
      key: "setConversationStatus",
      value: function setConversationStatus(conversationType, targetId, isTop, notificationStatus) {
        var statusList = [{
          conversationType: conversationType,
          targetId: targetId,
          isTop: isTop,
          notificationStatus: notificationStatus
        }];
        return this._engine.batchSetConversationStatus(statusList);
      }
    }, {
      key: "saveConversationMessageDraft",
      value: function saveConversationMessageDraft(conversationType, targetId, draft) {
        return this._engine.saveConversationMessageDraft(conversationType, targetId, draft);
      }
    }, {
      key: "getConversationMessageDraft",
      value: function getConversationMessageDraft(conversationType, targetId) {
        return this._engine.getConversationMessageDraft(conversationType, targetId);
      }
    }, {
      key: "clearConversationMessageDraft",
      value: function clearConversationMessageDraft(conversationType, targetId) {
        return this._engine.clearConversationMessageDraft(conversationType, targetId);
      }
    }, {
      key: "recallMessage",
      value: function recallMessage(conversationType, targetId, messageUId, sentTime, user) {
        return this._engine.recallMsg(conversationType, targetId, messageUId, sentTime, user);
      }
    }, {
      key: "deleteRemoteMessage",
      value: function deleteRemoteMessage(conversationType, targetId, list) {
        return this._engine.deleteRemoteMessage(conversationType, targetId, list);
      }
    }, {
      key: "deleteRemoteMessageByTimestamp",
      value: function deleteRemoteMessageByTimestamp(conversationType, targetId, timestamp) {
        return this._engine.deleteRemoteMessageByTimestamp(conversationType, targetId, timestamp);
      }
    }, {
      key: "joinChatroom",
      value: function joinChatroom(roomId) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        return this._engine.joinChatroom(roomId, count);
      }
    }, {
      key: "joinExistChatroom",
      value: function joinExistChatroom(roomId) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        return this._engine.joinExistChatroom(roomId, count);
      }
    }, {
      key: "quitChatroom",
      value: function quitChatroom(roomId) {
        return this._engine.quitChatroom(roomId);
      }
    }, {
      key: "getChatroomInfo",
      value: function getChatroomInfo(roomId) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return this._engine.getChatroomInfo(roomId, count, order);
      }
    }, {
      key: "setChatroomEntry",
      value: function setChatroomEntry(roomId, entry) {
        return this._engine.setChatroomEntry(roomId, entry);
      }
    }, {
      key: "forceSetChatroomEntry",
      value: function forceSetChatroomEntry(roomId, entry) {
        return this._engine.forceSetChatroomEntry(roomId, entry);
      }
    }, {
      key: "removeChatroomEntry",
      value: function removeChatroomEntry(roomId, entry) {
        return this._engine.removeChatroomEntry(roomId, entry);
      }
    }, {
      key: "forceRemoveChatroomEntry",
      value: function forceRemoveChatroomEntry(roomId, entry) {
        return this._engine.forceRemoveChatroomEntry(roomId, entry);
      }
    }, {
      key: "getChatroomEntry",
      value: function getChatroomEntry(roomId, key) {
        return this._engine.getChatroomEntry(roomId, key);
      }
    }, {
      key: "getAllChatroomEntries",
      value: function getAllChatroomEntries(roomId) {
        return this._engine.getAllChatroomEntry(roomId);
      }
    }, {
      key: "getChatRoomHistoryMessages",
      value: function getChatRoomHistoryMessages(roomId) {
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var timestamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        return this._engine.getChatroomHistoryMessages(roomId, timestamp, count, order);
      }
    }, {
      key: "getFileToken",
      value: function getFileToken(fileType, fileName) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee61() {
          var naviInfo, bos, qiniu, ossConfig, _yield$this$_engine$g, code, data;

          return regeneratorRuntime.wrap(function _callee61$(_context63) {
            while (1) {
              switch (_context63.prev = _context63.next) {
                case 0:
                  naviInfo = this.getInfoFromCache();
                  bos = (naviInfo === null || naviInfo === void 0 ? void 0 : naviInfo.bosAddr) || '';
                  qiniu = (naviInfo === null || naviInfo === void 0 ? void 0 : naviInfo.uploadServer) || '';
                  ossConfig = (naviInfo === null || naviInfo === void 0 ? void 0 : naviInfo.ossConfig) || '';
                  _context63.next = 6;
                  return this._engine.getFileToken(fileType, fileName);

                case 6:
                  _yield$this$_engine$g = _context63.sent;
                  code = _yield$this$_engine$g.code;
                  data = _yield$this$_engine$g.data;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context63.next = 11;
                    break;
                  }

                  return _context63.abrupt("return", Promise.resolve(Object.assign(data, {
                    bos: bos,
                    qiniu: qiniu,
                    ossConfig: ossConfig
                  })));

                case 11:
                  return _context63.abrupt("return", Promise.reject(code));

                case 12:
                case "end":
                  return _context63.stop();
              }
            }
          }, _callee61, this);
        }));
      }
    }, {
      key: "getFileUrl",
      value: function getFileUrl(fileType, fileName, originName, uploadRes) {
        var uploadMethod = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : UploadMethod$1.QINIU;
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee62() {
          var _yield$this$_engine$g2, code, data;

          return regeneratorRuntime.wrap(function _callee62$(_context64) {
            while (1) {
              switch (_context64.prev = _context64.next) {
                case 0:
                  if (!(uploadRes === null || uploadRes === void 0 ? void 0 : uploadRes.isBosRes)) {
                    _context64.next = 2;
                    break;
                  }

                  return _context64.abrupt("return", Promise.resolve(uploadRes));

                case 2:
                  _context64.next = 4;
                  return this._engine.getFileUrl(fileType, uploadMethod, fileName, originName);

                case 4:
                  _yield$this$_engine$g2 = _context64.sent;
                  code = _yield$this$_engine$g2.code;
                  data = _yield$this$_engine$g2.data;

                  if (!(code === ErrorCode$1.SUCCESS)) {
                    _context64.next = 9;
                    break;
                  }

                  return _context64.abrupt("return", Promise.resolve(data));

                case 9:
                  return _context64.abrupt("return", Promise.reject(code));

                case 10:
                case "end":
                  return _context64.stop();
              }
            }
          }, _callee62, this);
        }));
      }
    }, {
      key: "clearConversations",
      value: function clearConversations() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee63() {
          return regeneratorRuntime.wrap(function _callee63$(_context65) {
            while (1) {
              switch (_context65.prev = _context65.next) {
                case 0:
                  _context65.next = 2;
                  return this._engine.clearConversations();

                case 2:
                  return _context65.abrupt("return", _context65.sent);

                case 3:
                case "end":
                  return _context65.stop();
              }
            }
          }, _callee63, this);
        }));
      }
    }, {
      key: "setUserStatusListener",
      value: function setUserStatusListener(config, listener) {
        var _this164 = this;

        return this._engine.setUserStatusListener(config, function (data) {
          _newArrowCheck(this, _this164);

          try {
            listener(data);
          } catch (error) {
            logger.error(error);
          }
        }.bind(this));
      }
    }, {
      key: "addToBlacklist",
      value: function addToBlacklist(userId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee64() {
          return regeneratorRuntime.wrap(function _callee64$(_context66) {
            while (1) {
              switch (_context66.prev = _context66.next) {
                case 0:
                  return _context66.abrupt("return", this._engine.addToBlacklist(userId));

                case 1:
                case "end":
                  return _context66.stop();
              }
            }
          }, _callee64, this);
        }));
      }
    }, {
      key: "removeFromBlacklist",
      value: function removeFromBlacklist(userId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee65() {
          return regeneratorRuntime.wrap(function _callee65$(_context67) {
            while (1) {
              switch (_context67.prev = _context67.next) {
                case 0:
                  return _context67.abrupt("return", this._engine.removeFromBlacklist(userId));

                case 1:
                case "end":
                  return _context67.stop();
              }
            }
          }, _callee65, this);
        }));
      }
    }, {
      key: "getBlacklist",
      value: function getBlacklist() {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee66() {
          return regeneratorRuntime.wrap(function _callee66$(_context68) {
            while (1) {
              switch (_context68.prev = _context68.next) {
                case 0:
                  return _context68.abrupt("return", this._engine.getBlacklist());

                case 1:
                case "end":
                  return _context68.stop();
              }
            }
          }, _callee66, this);
        }));
      }
    }, {
      key: "getBlacklistStatus",
      value: function getBlacklistStatus(userId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee67() {
          return regeneratorRuntime.wrap(function _callee67$(_context69) {
            while (1) {
              switch (_context69.prev = _context69.next) {
                case 0:
                  return _context69.abrupt("return", this._engine.getBlacklistStatus(userId));

                case 1:
                case "end":
                  return _context69.stop();
              }
            }
          }, _callee67, this);
        }));
      }
    }, {
      key: "insertMessage",
      value: function insertMessage(conversationType, targetId, senderUserId, messageType, msgContent, direction) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee68() {
          return regeneratorRuntime.wrap(function _callee68$(_context70) {
            while (1) {
              switch (_context70.prev = _context70.next) {
                case 0:
                  return _context70.abrupt("return", this._engine.insertMessage(conversationType, targetId, senderUserId, messageType, msgContent, direction));

                case 1:
                case "end":
                  return _context70.stop();
              }
            }
          }, _callee68, this);
        }));
      }
    }, {
      key: "deleteMessages",
      value: function deleteMessages(timestamp) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee69() {
          return regeneratorRuntime.wrap(function _callee69$(_context71) {
            while (1) {
              switch (_context71.prev = _context71.next) {
                case 0:
                  return _context71.abrupt("return", this._engine.deleteMessages(timestamp));

                case 1:
                case "end":
                  return _context71.stop();
              }
            }
          }, _callee69, this);
        }));
      }
    }, {
      key: "deleteMessagesByTimestamp",
      value: function deleteMessagesByTimestamp(conversationType, targetId, timestamp, cleanSpace) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee70() {
          return regeneratorRuntime.wrap(function _callee70$(_context72) {
            while (1) {
              switch (_context72.prev = _context72.next) {
                case 0:
                  return _context72.abrupt("return", this._engine.deleteMessagesByTimestamp(conversationType, targetId, timestamp, cleanSpace));

                case 1:
                case "end":
                  return _context72.stop();
              }
            }
          }, _callee70, this);
        }));
      }
    }, {
      key: "getMessage",
      value: function getMessage(messageId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee71() {
          return regeneratorRuntime.wrap(function _callee71$(_context73) {
            while (1) {
              switch (_context73.prev = _context73.next) {
                case 0:
                  return _context73.abrupt("return", this._engine.getMessage(messageId));

                case 1:
                case "end":
                  return _context73.stop();
              }
            }
          }, _callee71, this);
        }));
      }
    }, {
      key: "setMessageContent",
      value: function setMessageContent(messageId, content, messageType) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee72() {
          return regeneratorRuntime.wrap(function _callee72$(_context74) {
            while (1) {
              switch (_context74.prev = _context74.next) {
                case 0:
                  return _context74.abrupt("return", this._engine.setMessageContent(messageId, content, messageType));

                case 1:
                case "end":
                  return _context74.stop();
              }
            }
          }, _callee72, this);
        }));
      }
    }, {
      key: "setMessageSearchField",
      value: function setMessageSearchField(messageId, content, searchFiles) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee73() {
          return regeneratorRuntime.wrap(function _callee73$(_context75) {
            while (1) {
              switch (_context75.prev = _context75.next) {
                case 0:
                  return _context75.abrupt("return", this._engine.setMessageSearchField(messageId, content, searchFiles));

                case 1:
                case "end":
                  return _context75.stop();
              }
            }
          }, _callee73, this);
        }));
      }
    }, {
      key: "setMessageSentStatus",
      value: function setMessageSentStatus(messageId, sentStatus) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee74() {
          return regeneratorRuntime.wrap(function _callee74$(_context76) {
            while (1) {
              switch (_context76.prev = _context76.next) {
                case 0:
                  return _context76.abrupt("return", this._engine.setMessageSentStatus(messageId, sentStatus));

                case 1:
                case "end":
                  return _context76.stop();
              }
            }
          }, _callee74, this);
        }));
      }
    }, {
      key: "setMessageReceivedStatus",
      value: function setMessageReceivedStatus(messageId, receivedStatus) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee75() {
          return regeneratorRuntime.wrap(function _callee75$(_context77) {
            while (1) {
              switch (_context77.prev = _context77.next) {
                case 0:
                  return _context77.abrupt("return", this._engine.setMessageReceivedStatus(messageId, receivedStatus));

                case 1:
                case "end":
                  return _context77.stop();
              }
            }
          }, _callee75, this);
        }));
      }
    }, {
      key: "setUserStatus",
      value: function setUserStatus(status) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee76() {
          return regeneratorRuntime.wrap(function _callee76$(_context78) {
            while (1) {
              switch (_context78.prev = _context78.next) {
                case 0:
                  return _context78.abrupt("return", this._engine.setUserStatus(status));

                case 1:
                case "end":
                  return _context78.stop();
              }
            }
          }, _callee76, this);
        }));
      }
    }, {
      key: "subscribeUserStatus",
      value: function subscribeUserStatus(userIds) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee77() {
          return regeneratorRuntime.wrap(function _callee77$(_context79) {
            while (1) {
              switch (_context79.prev = _context79.next) {
                case 0:
                  return _context79.abrupt("return", this._engine.subscribeUserStatus(userIds));

                case 1:
                case "end":
                  return _context79.stop();
              }
            }
          }, _callee77, this);
        }));
      }
    }, {
      key: "getUserStatus",
      value: function getUserStatus(userId) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee78() {
          return regeneratorRuntime.wrap(function _callee78$(_context80) {
            while (1) {
              switch (_context80.prev = _context80.next) {
                case 0:
                  return _context80.abrupt("return", this._engine.getUserStatus(userId));

                case 1:
                case "end":
                  return _context80.stop();
              }
            }
          }, _callee78, this);
        }));
      }
    }, {
      key: "searchConversationByContent",
      value: function searchConversationByContent(keyword, conversationTypes) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee79() {
          return regeneratorRuntime.wrap(function _callee79$(_context81) {
            while (1) {
              switch (_context81.prev = _context81.next) {
                case 0:
                  return _context81.abrupt("return", this._engine.searchConversationByContent(keyword, conversationTypes));

                case 1:
                case "end":
                  return _context81.stop();
              }
            }
          }, _callee79, this);
        }));
      }
    }, {
      key: "searchMessageByContent",
      value: function searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total) {
        return __awaiter$1(this, void 0, void 0, regeneratorRuntime.mark(function _callee80() {
          return regeneratorRuntime.wrap(function _callee80$(_context82) {
            while (1) {
              switch (_context82.prev = _context82.next) {
                case 0:
                  return _context82.abrupt("return", this._engine.searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total));

                case 1:
                case "end":
                  return _context82.stop();
              }
            }
          }, _callee80, this);
        }));
      }
    }, {
      key: "getUnreadMentionedMessages",
      value: function getUnreadMentionedMessages(conversationType, targetId) {
        return this._engine.getUnreadMentionedMessages(conversationType, targetId);
      }
    }, {
      key: "joinRTCRoom",
      value: function joinRTCRoom(roomId, mode, mediaType) {
        return this._engine.joinRTCRoom(roomId, mode, mediaType);
      }
    }, {
      key: "quitRTCRoom",
      value: function quitRTCRoom(roomId) {
        return this._engine.quitRTCRoom(roomId);
      }
    }, {
      key: "rtcPing",
      value: function rtcPing(roomId, mode, mediaType) {
        return this._engine.rtcPing(roomId, mode, mediaType);
      }
    }, {
      key: "getRTCRoomInfo",
      value: function getRTCRoomInfo(roomId) {
        return this._engine.getRTCRoomInfo(roomId);
      }
    }, {
      key: "getRTCUserInfoList",
      value: function getRTCUserInfoList(roomId) {
        return this._engine.getRTCUserInfoList(roomId);
      }
    }, {
      key: "getRTCUserInfo",
      value: function getRTCUserInfo(roomId) {
        return this._engine.getRTCUserInfo(roomId);
      }
    }, {
      key: "setRTCUserInfo",
      value: function setRTCUserInfo(roomId, key, value) {
        return this._engine.setRTCUserInfo(roomId, key, value);
      }
    }, {
      key: "removeRTCUserInfo",
      value: function removeRTCUserInfo(roomId, keys) {
        return this._engine.removeRTCUserInfo(roomId, keys);
      }
    }, {
      key: "setRTCData",
      value: function setRTCData(roomId, key, value, isInner, apiType, message) {
        return this._engine.setRTCData(roomId, key, value, isInner, apiType, message);
      }
    }, {
      key: "setRTCTotalRes",
      value: function setRTCTotalRes(roomId, message, valueInfo, objectName) {
        return this._engine.setRTCTotalRes(roomId, message, valueInfo, objectName);
      }
    }, {
      key: "getRTCData",
      value: function getRTCData(roomId, keys, isInner, apiType) {
        return this._engine.getRTCData(roomId, keys, isInner, apiType);
      }
    }, {
      key: "removeRTCData",
      value: function removeRTCData(roomId, keys, isInner, apiType, message) {
        return this._engine.removeRTCData(roomId, keys, isInner, apiType, message);
      }
    }, {
      key: "setRTCOutData",
      value: function setRTCOutData(roomId, rtcData, type, message) {
        return this._engine.setRTCOutData(roomId, rtcData, type, message);
      }
    }, {
      key: "getRTCOutData",
      value: function getRTCOutData(roomId, userIds) {
        return this._engine.getRTCOutData(roomId, userIds);
      }
    }, {
      key: "getRTCToken",
      value: function getRTCToken(roomId, mode, broadcastType) {
        return this._engine.getRTCToken(roomId, mode, broadcastType);
      }
    }, {
      key: "setRTCState",
      value: function setRTCState(roomId, report) {
        return !this._options.isEnterPrise ? this._engine.setRTCState(roomId, report) : Promise.resolve(ErrorCode$1.SUCCESS);
      }
    }, {
      key: "getRTCUserList",
      value: function getRTCUserList(roomId) {
        return this._engine.getRTCUserList(roomId);
      }
    }], [{
      key: "init",
      value: function init(runtime, options) {
        logger.debug('APIContext.init =>', options.appkey, options.navigators);

        if (this._context) {
          logger.error('Repeat initialize!');
          return this._context;
        }

        this._context = new APIContext(runtime, options);
        return this._context;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this._context) {
          this._context._destroy();

          this._context = undefined;
        }
      }
    }]);

    return APIContext;
  }();

  {
    logger.warn('RCEngineVersion:', "4.1.0");
    logger.warn('VersionCode:', "0012eb74bbf7318ea4a4e2ee3e3e858d6849090c");
  }

  const logger$1 = new Logger('RCIM');
  logger$1.set( exports.LogLevel.DEBUG );

  const ERROR_INFO = {
      // 超时
      TIMEOUT: {
          code: -1,
          msg: 'Network timeout'
      },
      // SDK 内部错误
      SDK_INTERNAL_ERROR: {
          code: -2,
          msg: 'SDK internal error'
      },
      // 开发者参数传入错误
      PARAMETER_ERROR: {
          code: -3,
          msg: 'Please check the parameters, the {param} expected a value of {expect} but received {current}'
      },
      REJECTED_BY_BLACKLIST: {
          code: 405,
          msg: 'Blacklisted by the other party'
      },
      // 发送频率过快
      SEND_TOO_FAST: {
          code: 20604,
          msg: 'Sending messages too quickly'
      },
      // 不在群组中
      NOT_IN_GROUP: {
          code: 22406,
          msg: 'Not in group'
      },
      // 在群组中被禁言
      FORBIDDEN_IN_GROUP: {
          code: 22408,
          msg: 'Forbbiden from speaking in the group'
      },
      // 不在聊天室中
      NOT_IN_CHATROOM: {
          code: 23406,
          msg: 'Not in chatRoom'
      },
      // 在聊天室中被禁言
      FORBIDDEN_IN_CHATROOM: {
          code: 23408,
          msg: 'Forbbiden from speaking in the chatRoom'
      },
      // 已被踢出并禁止加入聊天室
      KICKED_FROM_CHATROOM: {
          code: 23409,
          msg: 'Kicked out and forbbiden from joining the chatRoom'
      },
      // 聊天室不存在
      CHATROOM_NOT_EXIST: {
          code: 23410,
          msg: 'ChatRoom does not exist'
      },
      // 聊天室成员超限
      CHATROOM_IS_FULL: {
          code: 23411,
          msg: 'ChatRoom members exceeded'
      },
      // 聊天室参数无效
      PARAMETER_INVALID_CHATROOM: {
          code: 23412,
          msg: 'Invalid chatRoom parameters'
      },
      // 聊天室云存储业务未开通
      ROAMING_SERVICE_UNAVAILABLE_CHATROOM: {
          code: 23414,
          msg: 'ChatRoom message roaming service is not open, Please go to the developer to open this service'
      },
      // 撤回消息失败
      RECALLMESSAGE_PARAMETER_INVALID: {
          code: 25101,
          msg: 'Invalid recall message parameter'
      },
      // 未开通单群聊消息云存储服务
      ROAMING_SERVICE_UNAVAILABLE_MESSAGE: {
          code: 25102,
          msg: 'Single group chat roaming service is not open, Please go to the developer to open this service'
      },
      // push 设置参数无效
      PUSHSETTING_PARAMETER_INVALID: {
          code: 26001,
          msg: 'Invalid push parameter'
      },
      // 操作被禁止
      OPERATION_BLOCKED: {
          code: 20605,
          msg: 'Operation is blocked'
      },
      // 操作不支持
      OPERATION_NOT_SUPPORT: {
          code: 20606,
          msg: 'Operation is not supported'
      },
      // 发送的消息中包含敏感词 (发送方发送失败，接收方不会收到消息)
      MSG_BLOCKED_SENSITIVE_WORD: {
          code: 21501,
          msg: 'The sent message contains sensitive words'
      },
      // 消息中敏感词已经被替换 (接收方可以收到被替换之后的消息)
      REPLACED_SENSITIVE_WORD: {
          code: 21502,
          msg: 'Sensitive words in the message have been replaced'
      },
      // 用户未连接成功
      NOT_CONNECTED: {
          code: 30001,
          msg: 'Please connect successfully first'
      },
      // 导航 http 请求失败
      NAVI_REQUEST_ERROR: {
          code: 30007,
          msg: 'Navigation http request failed'
      },
      // CMP 嗅探 http 请求失败
      CMP_REQUEST_ERROR: {
          code: 30010,
          msg: 'CMP sniff http request failed'
      },
      CONN_APPKEY_FAKE: {
          code: 31002,
          msg: 'Your appkey is fake'
      },
      CONN_MINI_SERVICE_NOT_OPEN: {
          code: 31003,
          msg: 'Mini program service is not open, Please go to the developer to open this service'
      },
      CONN_ACK_TIMEOUT: {
          code: 31000,
          msg: 'Connection ACK timeout'
      },
      CONN_TOKEN_INCORRECT: {
          code: 31004,
          msg: 'Your token is not valid or expired'
      },
      CONN_NOT_AUTHRORIZED: {
          code: 31005,
          msg: 'AppKey and Token do not match'
      },
      CONN_REDIRECTED: {
          code: 31006,
          msg: 'Connection redirection'
      },
      CONN_APP_BLOCKED_OR_DELETED: {
          code: 31008,
          msg: 'AppKey is banned or deleted'
      },
      CONN_USER_BLOCKED: {
          code: 31009,
          msg: 'User blocked'
      },
      // 域名无效
      CONN_DOMAIN_INCORRECT: {
          code: 31012,
          msg: 'Connect domain error, Please check the set security domain'
      },
      // 未开通单群聊历史消息云存储
      ROAMING_SERVICE_UNAVAILABLE: {
          code: 33007,
          msg: 'Roaming service cloud is not open, Please go to the developer to open this service'
      },
      // 已连接, 不可再次调用链接(错误码与移动端对齐)
      RC_CONNECTION_EXIST: {
          code: 34001,
          msg: 'Connection already exists'
      },
      // 聊天室 KV 设置超出最大值(已满, 默认最多设置 100 个)
      CHATROOM_KV_EXCEED: {
          code: 23423,
          msg: 'ChatRoom KV setting exceeds maximum'
      },
      // 聊天室 KV 已存在
      CHATROOM_KV_OVERWRITE_INVALID: {
          code: 23424,
          msg: 'ChatRoom KV already exists'
      },
      // 聊天室 KV 存储功能没有开通
      CHATROOM_KV_STORE_NOT_OPEN: {
          code: 23426,
          msg: 'ChatRoom KV storage service is not open, Please go to the developer to open this service'
      },
      // 聊天室Key不存在
      CHATROOM_KEY_NOT_EXIST: {
          code: 23427,
          msg: 'ChatRoom key does not exist'
      },
      // 消息不支持扩展存储(错误码与移动端对齐)
      MSG_KV_NOT_SUPPORT: {
          code: 34008,
          msg: 'The message cannot be extended'
      },
      // 发送扩展存储消息失败(错误码与移动端对齐)
      SEND_MESSAGE_KV_FAIL: {
          code: 34009,
          msg: 'Sending RC expansion message fail'
      },
      // 扩展存储 key value 超出限制(错误码与移动端对齐)
      EXPANSION_LIMIT_EXCEET: {
          code: 34010,
          msg: 'The message expansion size is beyond the limit'
      },
      // 调用接口时传入的参数不正确(错误码与移动端对齐)
      ILLGAL_PARAMS: {
          code: 33003,
          msg: 'Incorrect parameters passed in while calling the interface'
      }
  };
  const ERROR_CODE = {};
  for (const name in ERROR_INFO) {
      const info = ERROR_INFO[name];
      const { code } = info;
      // ERROR_CODE[name] = code
      ERROR_CODE[code] = name;
  }
  // 服务返回的错误码, 转化为 SDK 的 ErrorCode
  const SERVER_ERROR_TO_CODE = {
      // 未开通单群聊历史消息云存储
      1: ERROR_INFO.ROAMING_SERVICE_UNAVAILABLE.code
  };

  const CONNECTION_STATUS = {
      CONNECTED: 0,
      CONNECTING: 1,
      DISCONNECTED: 2,
      NETWORK_UNAVAILABLE: 3,
      SOCKET_ERROR: 4,
      KICKED_OFFLINE_BY_OTHER_CLIENT: 6,
      BLOCKED: 12 // 用户被封禁(服务值为 2, 转为状态码后 + 10)
  };

  /**
   * 业务层枚举, 此处枚举会暴露给开发者
  */
  const CONNECT_TYPE = {
      COMET: 'comet',
      WEBSOCKET: 'websocket'
  };
  const CONVERSATION_TYPE = ConversationType$1;
  const MESSAGE_DIRECTION = MessageDirection$1;
  const MESSAGS_TIME_ORDER = {
      DESC: 0,
      ASC: 1 // 正序
  };
  // 聊天室历史消息、聊天室用户信息排序
  const CHATROOM_ORDER = {
      ASC: 1,
      DESC: 2
  };
  const RECALL_MESSAGE_TYPE = 'RC:RcCmd';
  const MENTIONED_TYPE = {
      ALL: 1,
      SINGAL: 2
  };
  const MESSAGE_TYPE = {
      TEXT: 'RC:TxtMsg',
      VOICE: 'RC:VcMsg',
      HQ_VOICE: 'RC:HQVCMsg',
      IMAGE: 'RC:ImgMsg',
      GIF: 'RC:GIFMsg',
      RICH_CONTENT: 'RC:ImgTextMsg',
      LOCATION: 'RC:LBSMsg',
      FILE: 'RC:FileMsg',
      SIGHT: 'RC:SightMsg',
      COMBINE: 'RC:CombineMsg',
      CHRM_KV_NOTIFY: 'RC:chrmKVNotiMsg',
      LOG_COMMAND: 'RC:LogCmdMsg',
      EXPANSION_NOTIFY: 'RC:MsgExMsg',
      REFERENCE: 'RC:ReferenceMsg'
  };
  const FILE_TYPE = FileType$1;
  // 聊天室 kv 存储操作类型. 对方操作, 己方收到消息(RC:chrmKVNotiMsg)中会带入此值. 根据此值判断是删除还是更新
  const CHATROOM_ENTRY_TYPE = {
      UPDATE: 1,
      DELETE: 2
  };
  const NOTIFICATION_STATUS = {
      DO_NOT_DISTURB: 1,
      NOTIFY: 2 // 提醒(非免打扰)
  };
  const RECEIVED_STATUS = {
      READ: 0x1,
      LISTENED: 0x2,
      DOWNLOADED: 0x4,
      RETRIEVED: 0x8,
      UNREAD: 0 // 未读
  };
  const SDK_VERSION = "4.1.0";

  /**
   * 转化 APIContext 传过来的消息数据
   * @param msg APIContext 消息
   * @returns V3 需要的消息数据
   */
  function tranReceivedMessage(msg) {
      let { conversationType: type, messageType, content, senderUserId, targetId, sentTime, receivedTime, messageUId, messageDirection, isPersited, isCounted, isOffLineMessage, canIncludeExpansion, expansion, receivedStatus, disableNotification, isMentioned, isStatusMessage } = msg;
      if (!receivedStatus) {
          receivedStatus = ReceivedStatus$1.UNREAD;
      }
      return {
          messageType,
          content,
          senderUserId,
          targetId,
          type,
          sentTime,
          receivedTime,
          messageUId,
          messageDirection,
          isPersited,
          isCounted,
          isOffLineMessage,
          isMentioned,
          disableNotification,
          isStatusMessage,
          canIncludeExpansion,
          expansion,
          receivedStatus
      };
  }
  /**
   * 转化 APIContext 传过来的会话数据
   * @param conversation APIContext 会话
   * @returns V3 需要的会话数据
   */
  function tranReceiveConversation(conversation) {
      const { conversationType: type, targetId, latestMessage, unreadMessageCount, hasMentioned, mentionedInfo, lastUnreadTime, notificationStatus, isTop } = conversation;
      const latestMessageV3 = latestMessage && tranReceivedMessage(latestMessage);
      const mentionedInfoV3 = {
          type: mentionedInfo === null || mentionedInfo === void 0 ? void 0 : mentionedInfo.type,
          userIdList: mentionedInfo === null || mentionedInfo === void 0 ? void 0 : mentionedInfo.userIdList
      };
      return {
          type,
          targetId,
          latestMessage: latestMessageV3,
          unreadMessageCount,
          hasMentioned,
          mentionedInfo: mentionedInfoV3,
          lastUnreadTime,
          notificationStatus,
          isTop
      };
  }
  function tranReceiveUpdateConversation(conversation) {
      const { updatedItems, conversationType: type, targetId, latestMessage, unreadMessageCount, lastUnreadTime, notificationStatus, isTop, mentionedInfo, hasMentioned } = conversation;
      const latestMessageV3 = latestMessage && tranReceivedMessage(latestMessage);
      if (updatedItems && updatedItems.latestMessage) {
          updatedItems.latestMessage.val = latestMessageV3;
      }
      return {
          updatedItems,
          type,
          targetId,
          latestMessage: latestMessageV3,
          unreadMessageCount,
          lastUnreadTime,
          notificationStatus,
          isTop,
          mentionedInfo,
          hasMentioned
      };
  }
  /**
   * 校验发消息的参数
   */
  function assertSendMsgOption(options) {
      assert('options.messageType', options.messageType, AssertRules.STRING, true);
      assert('options.content', options.content, (value) => {
          return isObject(value);
      }, true);
      assert('options.isPersited', options.isPersited, AssertRules.BOOLEAN);
      assert('options.isCounted', options.isCounted, AssertRules.BOOLEAN);
      assert('options.pushContent', options.pushContent, AssertRules.STRING);
      assert('options.pushData', options.pushData, AssertRules.STRING);
      assert('options.isVoipPush', options.isVoipPush, AssertRules.BOOLEAN);
      assert('options.isStatusMessage', options.isStatusMessage, AssertRules.BOOLEAN);
      assert('options.isMentioned', options.isMentioned, AssertRules.BOOLEAN);
      assert('options.mentionedType', options.mentionedType, AssertRules.NUMBER);
      assert('options.mentionedUserIdList', options.mentionedUserIdList, (value) => {
          return isArray(value) && (value.length === 0 || value.every(isString));
      });
      assert('options.directionalUserIdList', options.directionalUserIdList, (value) => {
          return isArray(value) && (value.length === 0 || value.every(isString));
      });
      if (!isUndefined(options.isPersited) || !isUndefined(options.isCounted) || !isUndefined(options.isStatusMessage)) {
          logger$1.warn('注意: 由于参数 isPersited、isCounted、isStatusMessage 的传入在接收消息时会导致移动端与 Web 端的 isPersited、isCounted、isStatusMessage 这三个参数值不一致。\n故 isPersited、isCounted、isStatusMessage 即将废弃，非内置消息请使用 registerMessageType 方法注册自定义消息.');
      }
  }

  // import { isObject, isUndefined } from '../../utils/validator'
  /**
   * 会话排序（拆分-排序-合并）
   * 将会话列表拆分为置顶和非置顶的两个数组
   * 再对两个数组按时间进行排序，时间戳大的说明是最近的消息排最上
  */
  const sortConList = (conversationList, order) => {
      if (!conversationList) {
          return [];
      }
      const splitConversationList = splitConversationListByIsTop(conversationList);
      const topConversationList = _sortListBySentTime(splitConversationList.topConversationList, order);
      const unToppedConversationList = _sortListBySentTime(splitConversationList.unToppedConversationList, order);
      topConversationList.push.apply(topConversationList, unToppedConversationList);
      return topConversationList;
  };
  const mergeConversationList = (option) => {
      option = option || {};
      let { conversationList, updatedConversationList } = option;
      conversationList = conversationList || [];
      updatedConversationList = updatedConversationList || [];
      const allConversationList = [...updatedConversationList, ...conversationList];
      // 按顺序合并相同会话的数值(顺序依然为上一步的排序, 只是数值合并, 顺序靠后的数值合并到顺序靠前数值中)
      const hashTable = {};
      let newList = [];
      const invalidDataIndexList = [];
      forEach(allConversationList, (conversation) => {
          if (!isObject(conversation)) { // 会话格式错误, 不添加至新列表
              return;
          }
          const { type, targetId } = conversation;
          const key = getConversationKey({ type, targetId });
          const hashItem = hashTable[key] || {};
          const hashIndex = isUndefined(hashItem.index) ? newList.length : hashItem.index;
          const hashVal = hashItem.val || {};
          const cacheUpdatedItems = hashVal.updatedItems || {};
          const updatedItems = conversation.updatedItems;
          conversation = extend(conversation, hashVal);
          forEach(cacheUpdatedItems, (item, key) => {
              conversation[key] = item.val;
          });
          forEach(updatedItems, (item, key) => {
              const cacheItem = cacheUpdatedItems[key] || {};
              const cacheItemUpdatedTime = cacheItem.time || 0;
              if (item.time > cacheItemUpdatedTime) {
                  conversation[key] = item.val;
              }
          });
          hashTable[key] = { index: hashIndex, val: conversation };
          newList[hashIndex] = conversation;
          isInValidConversationData(conversation) && invalidDataIndexList.push(hashIndex);
      });
      forEach(invalidDataIndexList, (invalidIndex) => {
          const conversation = newList[invalidIndex];
          newList[invalidIndex] = fixConversationData(conversation);
      });
      newList = sortConList(newList);
      return map(newList, (item) => {
          delete item.updatedItems;
          return item;
      });
  };
  const splitConversationListByIsTop = (conversationList) => {
      const topConversationList = [];
      const unToppedConversationList = [];
      forEach(conversationList, (conversation) => {
          // 兼容会话中单词拼写错误字段 hasMentiond、mentiondInfo
          const { hasMentioned, mentionedInfo } = conversation;
          conversation.hasMentioned = hasMentioned;
          conversation.mentionedInfo = mentionedInfo;
          // 兼容接收
          const isTop = conversation.isTop || false;
          if (isTop) {
              topConversationList.push(conversation);
          }
          else {
              unToppedConversationList.push(conversation);
          }
      });
      return {
          topConversationList: topConversationList || [],
          unToppedConversationList: unToppedConversationList || []
      };
  };
  const getConversationKey = (option) => {
      const { type, targetId } = option;
      return type + '_' + targetId;
  };
  const _sortListBySentTime = (convers, order = 0) => {
      return quickSort(convers, (before, after) => {
          before = before || {};
          after = after || {};
          const beforeLatestMessage = before.latestMessage || {};
          const afterLatestMessage = after.latestMessage || {};
          const beforeLatestSentTime = beforeLatestMessage.sentTime || 0;
          const afterLatestSentTime = afterLatestMessage.sentTime || 0;
          if (!order) {
              return afterLatestSentTime <= beforeLatestSentTime;
          }
          return afterLatestSentTime >= beforeLatestSentTime;
      });
  };
  const fixConversationData = (conversation) => {
      conversation = conversation || {};
      const { targetId, type } = conversation;
      const defaultType = ConversationType$1.PRIVATE;
      const defaultMsg = {
          messageType: MessageType$1.TextMessage,
          sentTime: DelayTimer.getTime(),
          content: { content: '' },
          senderUserId: targetId,
          targetId,
          type
      };
      conversation.type = type || defaultType;
      conversation.targetId = targetId || '';
      conversation.latestMessage = conversation.latestMessage || defaultMsg;
      return conversation;
  };
  const quickSort = (arr, event) => {
      const sort = (array, left, right, event) => {
          event = event || ((a, b) => {
              return a <= b;
          });
          if (left < right) {
              const x = array[right];
              let i = left - 1;
              let temp;
              for (let j = left; j <= right; j++) {
                  if (event(array[j], x)) {
                      i++;
                      temp = array[i];
                      array[i] = array[j];
                      array[j] = temp;
                  }
              }
              sort(array, left, i - 1, event);
              sort(array, i + 1, right, event);
          }
          return array;
      };
      return sort(arr, 0, arr.length - 1, event);
  };
  const isInValidConversationData = (conversation) => {
      return !conversation.type ||
          !conversation.targetId ||
          !isObject(conversation.latestMessage) ||
          isUndefined(conversation.unreadMessageCount);
  };
  const extend = (destination, sources, option) => {
      option = option || {};
      const { isAllowNull } = option;
      destination = destination || {};
      sources = sources || {};
      for (const key in sources) {
          const value = sources[key];
          if (!isUndefined(value) || isAllowNull) {
              destination[key] = value;
          }
      }
      return destination;
  };

  class Conversation {
      constructor(_context, option) {
          this._context = _context;
          this.targetId = option.targetId;
          this.type = option.type;
      }
      /**
       * 删除指定会话
       */
      destory() {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.removeConversation(this.type, this.targetId);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 清除会话未读数
       */
      read() {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.clearUnreadCount(this.type, this.targetId);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 获取指定会话未读数
       */
      getUnreadCount() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getUnreadCount(this.type, this.targetId);
              // 当未读数为空时，返回 0 故不校验 data 值
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 发送消息
       * @param options
       * @deprecated options.isPersited
       * @deprecated options.isCounted
       * @deprecated options.isStatusMessage
       */
      send(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assertSendMsgOption(options);
              if (!Object.prototype.hasOwnProperty.call(options, 'isPersited')) {
                  options.isPersited = true;
              }
              if (!Object.prototype.hasOwnProperty.call(options, 'isCounted')) {
                  options.isCounted = true;
              }
              const { code, data } = yield this._context.sendMessage(this.type, this.targetId, options);
              if (code === ErrorCode$1.SUCCESS) {
                  return tranReceivedMessage(data);
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 设置会话状态
       */
      setStatus(status) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.notificationStatus', status.notificationStatus, (value) => {
                  return (value === 1 || value === 2);
              });
              assert('options.isTop', status.isTop, AssertRules.BOOLEAN);
              const code = yield this._context.setConversationStatus(this.type, this.targetId, status.isTop, status.notificationStatus);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 获取历史消息
       */
      getMessages(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.timestamp', options.timestamp, AssertRules.NUMBER);
              assert('options.count', options.count, AssertRules.NUMBER);
              assert('options.order', options.order, (value) => {
                  return (value === 0 || value === 1);
              });
              const { code, data } = yield this._context.getHistoryMessage(this.type, this.targetId, options === null || options === void 0 ? void 0 : options.timestamp, options === null || options === void 0 ? void 0 : options.count, options === null || options === void 0 ? void 0 : options.order);
              if (code === ErrorCode$1.SUCCESS && data) {
                  const list = data.list.map(item => tranReceivedMessage(item));
                  return Promise.resolve({
                      list,
                      hasMore: data.hasMore
                  });
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 撤回消息
       * @param options
       */
      recall(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.messageUId', options.messageUId, AssertRules.STRING, true);
              assert('options.sentTime', options.sentTime, AssertRules.NUMBER, true);
              const { code, data } = yield this._context.recallMessage(this.type, this.targetId, options.messageUId, options.sentTime, options.user);
              if (code === ErrorCode$1.SUCCESS && data) {
                  return tranReceivedMessage(data);
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 按消息 id 删除消息
       */
      deleteMessages(messages) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options', messages, (value) => {
                  return isArray(value) && value.length;
              }, true);
              messages.forEach((item) => {
                  assert('options.messageUId', item.messageUId, AssertRules.STRING, true);
                  assert('options.sentTime', item.sentTime, AssertRules.NUMBER, true);
                  assert('options.messageDirection', item.messageDirection, (value) => {
                      return (value === 1 || value === 2);
                  }, true);
              });
              const code = yield this._context.deleteRemoteMessage(this.type, this.targetId, messages);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 按时间戳删除消息
       */
      clearMessages(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.timestamp', options.timestamp, AssertRules.NUMBER, true);
              const code = yield this._context.deleteRemoteMessageByTimestamp(this.type, this.targetId, options.timestamp);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 更新（添加、替换）消息扩展属性
       * @param expansion 要更新的消息扩展信息键值对
       * @param message 要更新的原始消息体
      */
      updateMessageExpansion(expansion, message) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('expansion', expansion, AssertRules.OBJECT, true);
              assert('message', message, AssertRules.OBJECT, true);
              const { type: conversationType, targetId, messageUId, canIncludeExpansion, expansion: originExpansion } = message;
              const { code } = yield this._context.sendExpansionMessage({
                  conversationType,
                  targetId,
                  messageUId,
                  expansion,
                  canIncludeExpansion,
                  originExpansion
              });
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 删除扩展存储
       * @params keys 需删除消息扩展的 keys
       * @params message 原始消息体
      */
      removeMessageExpansion(keys, message) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('keys', keys, AssertRules.ARRAY, true);
              assert('message', message, AssertRules.OBJECT, true);
              const { conversationType, targetId, messageUId, canIncludeExpansion } = message;
              const { code } = yield this._context.sendExpansionMessage({
                  conversationType,
                  targetId,
                  messageUId,
                  canIncludeExpansion,
                  keys
              });
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 设置会话文本草稿
       * @params conversationType 会话乐行
       * @params targetId 目标 ID
       * @params draft 草稿内容
      */
      setDraft(draft) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('draft', draft, AssertRules.STRING, true);
              const code = yield this._context.saveConversationMessageDraft(this.type, this.targetId, draft);
              if (code === ErrorCode$1.SUCCESS) {
                  return Promise.resolve();
              }
          });
      }
      /**
       * 获取会话文本草稿
       * @params conversationType 会话乐行
       * @params targetId 目标 ID
      */
      getDraft() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getConversationMessageDraft(this.type, this.targetId);
              if (code === ErrorCode$1.SUCCESS) {
                  return Promise.resolve(data);
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 删除会话文本草稿
       * @params conversationType 会话乐行
       * @params targetId 目标 ID
      */
      deleteDraft() {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.clearConversationMessageDraft(this.type, this.targetId);
              if (code === ErrorCode$1.SUCCESS) {
                  return Promise.resolve();
              }
          });
      }
  }
  class ConversationModule {
      constructor(apiContext) {
          this._context = apiContext;
      }
      /**
       * 获取会话列表
       * @param options
       */
      getList(options) {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getConversationList(options === null || options === void 0 ? void 0 : options.count, undefined, options === null || options === void 0 ? void 0 : options.startTime, options === null || options === void 0 ? void 0 : options.order);
              if (code === ErrorCode$1.SUCCESS && data) {
                  const list = data.map(item => tranReceiveConversation(item));
                  return sortConList(list);
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 获取指定会话实例，通过实例可实现向指定会话收发消息等功能
       * @description 通过该方法获取的会话可能并不存在于当前的会话列表中，此处只作为功能性封装语法糖
       * @param options
       */
      get(options) {
          assert('options.type', options.type, isValidConversationType, true);
          return new Conversation(this._context, options);
      }
      remove(options) {
          assert('options.type', options.type, isValidConversationType, true);
          return new Conversation(this._context, options).destory();
      }
      /**
       * 获取当前所有会话的消息未读数
       */
      getTotalUnreadCount() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getTotalUnreadCount();
              // 当未读数为空时，返回 0 故不校验 data 值
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 合并会话
       * @param option
       */
      merge(option) {
          !option.conversationList && logger$1.warn('Parameter option.conversationList are required!');
          return mergeConversationList(option);
      }
  }

  /**
   * 校验设置聊天室属性的参数
   * @param options
   */
  const assertSetChatRoomEntryOption = (options) => {
      assert('options.key', options.key, AssertRules.STRING, true);
      assert('options.value', options.value, AssertRules.STRING, true);
      assert('options.isAutoDelete', options.isAutoDelete, AssertRules.BOOLEAN);
      assert('options.isSendNotification', options.isSendNotification, AssertRules.BOOLEAN);
      assert('options.notificationExtra', options.notificationExtra, AssertRules.STRING);
  };
  /**
   * 校验删除聊天室属性的参数
   * @param options
   */
  const assertRemoveChatRoomEntryOption = (options) => {
      assert('options.key', options.key, AssertRules.STRING, true);
      assert('options.isSendNotification', options.isSendNotification, AssertRules.BOOLEAN);
      assert('options.notificationExtra', options.notificationExtra, AssertRules.STRING);
  };
  class Chatroom {
      constructor(context, id) {
          this._context = context;
          this._id = id;
      }
      /**
       * 加入聊天室
       */
      join(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.count', options.count, AssertRules.NUMBER, true);
              const code = yield this._context.joinChatroom(this._id, options.count);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 加入已存在的聊天室
       */
      joinExist(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.count', options.count, AssertRules.NUMBER, true);
              const code = yield this._context.joinExistChatroom(this._id, options.count);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 退出聊天室
       */
      quit() {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.quitChatroom(this._id);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 获取聊天室房间数据
       * @description count 或 order 有一个为 0 时，只返回成员总数，不返回成员列表信息
       */
      getInfo(options = {}) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.count', options.count, AssertRules.NUMBER);
              assert('options.order', options.order, (value) => {
                  return [0, 1, 2].includes(value);
              });
              const { code, data: chatroomInfo } = yield this._context.getChatroomInfo(this._id, options.count, options.order);
              if (code === ErrorCode$1.SUCCESS && chatroomInfo) {
                  return chatroomInfo;
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 设置聊天室自定义属性
       * @description 仅聊天室中不存在此属性或属性设置者为己方时可设置成功
       */
      setEntry(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assertSetChatRoomEntryOption(options);
              const code = yield this._context.setChatroomEntry(this._id, options);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 强制 增加/修改 任意聊天室属性
       * @description 仅聊天室中不存在此属性或属性设置者为己方时可设置成功
       */
      forceSetEntry(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assertSetChatRoomEntryOption(options);
              const code = yield this._context.forceSetChatroomEntry(this._id, options);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 删除聊天室属性
       * @description 仅限于删除自己设置的聊天室属性
       * @param key 属性名称, 支持英文字母、数字、+、=、-、_ 的组合方式, 最大长度 128 字符
       * @param isSendNotification? 删除成功后是否发送通知消息
       * @param notificationExtra? RC:chrmKVNotiMsg 通知消息中携带的附加信息
       */
      removeEntry(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assertRemoveChatRoomEntryOption(options);
              const code = yield this._context.removeChatroomEntry(this._id, options);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 强制删除聊天室内的任意属性
       * @description
       */
      forceRemoveEntry(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assertRemoveChatRoomEntryOption(options);
              const code = yield this._context.forceRemoveChatroomEntry(this._id, options);
              if (code !== ErrorCode$1.SUCCESS) {
                  return Promise.reject({ code, msg: ERROR_CODE[code] });
              }
          });
      }
      /**
       * 获取聊天室的指定属性
       */
      getEntry(key
      /**
       * 属性名称, 支持英文字母、数字、+、=、-、_ 的组合方式, 最大长度 128 字符
       */
      ) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('key', key, (value) => {
                  return isString(value) && /[\w+=-]+/.test(value) && value.length <= 128;
              }, true);
              const { code, data } = yield this._context.getChatroomEntry(this._id, key);
              if (code === ErrorCode$1.SUCCESS && data) {
                  return data;
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 获取聊天室的所有属性
       */
      getAllEntries() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getAllChatroomEntries(this._id);
              if (code === ErrorCode$1.SUCCESS && data) {
                  return data;
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 发送消息
       */
      send(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assertSendMsgOption(options);
              if (!Object.prototype.hasOwnProperty.call(options, 'isPersited')) {
                  options.isPersited = true;
              }
              if (!Object.prototype.hasOwnProperty.call(options, 'isCounted')) {
                  options.isCounted = true;
              }
              const { code, data } = yield this._context.sendMessage(ConversationType$1.CHATROOM, this._id, options);
              if (code === ErrorCode$1.SUCCESS) {
                  return tranReceivedMessage(data);
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 获取聊天室的历史消息
       */
      getMessages(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.timestamp', options.timestamp, AssertRules.NUMBER);
              assert('options.count', options.count, AssertRules.NUMBER);
              assert('options.order', options.order, (value) => {
                  return (value === 0 || value === 1);
              });
              const { code, data } = yield this._context.getChatRoomHistoryMessages(this._id, options.count, options.order, options.timestamp);
              if (code === ErrorCode$1.SUCCESS && data) {
                  const list = data.list.map(item => tranReceivedMessage(item));
                  return {
                      list,
                      hasMore: data.hasMore
                  };
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
      /**
       * 撤回聊天室消息
      */
      recall(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.messageUId', options.messageUId, AssertRules.STRING, true);
              assert('options.sentTime', options.sentTime, AssertRules.NUMBER, true);
              const conversationType = ConversationType$1.CHATROOM;
              const { code, data } = yield this._context.recallMessage(conversationType, this._id, options.messageUId, options.sentTime, options.user);
              if (code === ErrorCode$1.SUCCESS && data) {
                  return tranReceivedMessage(data);
              }
              return Promise.reject({ code, msg: ERROR_CODE[code] });
          });
      }
  }
  class ChatroomModule {
      constructor(apiContext) {
          this._context = apiContext;
      }
      /**
       * 根据聊天室 id 初始化一个聊天室功能实例，以实现收发消息等聊天室相关功能
       * @param option
       */
      get(option) {
          assert('option.id', option.id, notEmptyString, true);
          return new Chatroom(this._context, option.id);
      }
  }

  class RTCClient {
      constructor(_options, _context) {
          this._options = _options;
          this._context = _context;
          this._roomId = _options.id;
      }
      join() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.joinRTCRoom(this._roomId, this._options.mode, this._options.broadcastType);
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject(code);
          });
      }
      quit() {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.quitRTCRoom(this._roomId);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      getRoomInfo() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getRTCRoomInfo(this._roomId);
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject(code);
          });
      }
      setUserInfo(info) {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.setRTCUserInfo(this._roomId, info.key, info.value);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      removeUserInfo(info) {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.removeRTCUserInfo(this._roomId, info.keys);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      setData(key, value, isInner, apiType, message) {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.setRTCData(this._roomId, key, value, isInner, apiType, message);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      setUserData(key, value, isInner, message) {
          return this.setData(key, value, isInner, RTCApiType.PERSON, message);
      }
      /**
       * 全量 URI 资源发布
       * @param message 旧版本消息，含消息名及消息内容
       * @param valueInfo 全量消息数据
       * @param objectName 全量 URI 消息名
       */
      setRTCUserData(message, valueInfo, objectName) {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.setRTCTotalRes(this._roomId, message, valueInfo, objectName);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      getData(keys, isInner, apiType) {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getRTCData(this._roomId, keys, isInner, apiType);
              return code === ErrorCode$1.SUCCESS ? data : Promise.reject(code);
          });
      }
      getUserData(keys, isInner) {
          return this.getData(keys, isInner, RTCApiType.PERSON);
      }
      removeData(keys, isInner, apiType, message) {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.removeRTCData(this._roomId, keys, isInner, apiType, message);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      removeUserData(keys, isInner, message) {
          return this.removeData(keys, isInner, RTCApiType.PERSON, message);
      }
      setRoomData(key, value, isInner, message) {
          return this.setData(key, value, isInner, RTCApiType.ROOM, message);
      }
      getRoomData(keys, isInner) {
          return this.getData(keys, isInner, RTCApiType.ROOM);
      }
      removeRoomData(keys, isInner, message) {
          return this.removeData(keys, isInner, RTCApiType.ROOM, message);
      }
      setState(content) {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.setRTCState(this._roomId, content.report);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      getUserList() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getRTCUserInfoList(this._roomId);
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject(code);
          });
      }
      getUserInfoList() {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.getRTCUserInfoList(this._roomId);
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject(code);
          });
      }
      getToken() {
          return __awaiter(this, void 0, void 0, function* () {
              const { data, code } = yield this._context.getRTCToken(this._roomId, this._options.mode, this._options.broadcastType);
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject(code);
          });
      }
      ping() {
          return __awaiter(this, void 0, void 0, function* () {
              const code = yield this._context.rtcPing(this._roomId, this._options.mode, this._options.broadcastType);
              return code === ErrorCode$1.SUCCESS ? code : Promise.reject(code);
          });
      }
      send(options) {
          return __awaiter(this, void 0, void 0, function* () {
              const { code, data } = yield this._context.sendMessage(ConversationType$1.RTC_ROOM, this._roomId, {
                  content: Object.assign({}, options.content),
                  messageType: options.messageType
              });
              if (code === ErrorCode$1.SUCCESS) {
                  return data;
              }
              return Promise.reject(code);
          });
      }
  }
  // export class RTCModule {
  //   private _context: APIContext
  //   constructor (apiContext: APIContext) {
  //     this._context = apiContext
  //   }
  //   /**
  //     * 为 RTCLib 提供的 API 接口，业务层不可使用
  //     * @private
  //     * @param options
  //     */
  //   get (options: RTCRoomOption) {
  //     assert('options.id', options.id, notEmptyString, true)
  //     return new RTCClient(options, this._context)
  //   }
  // }

  const hasMiniBaseEvent = (miniGlobal) => {
      const baseMiniEventNames = ['canIUse', 'getSystemInfo'];
      for (let i = 0, max = baseMiniEventNames.length; i < max; i++) {
          const baseEventName = baseMiniEventNames[i];
          if (!miniGlobal[baseEventName]) {
              return false;
          }
      }
      return true;
  };
  const isFromUniappEnv = () => {
      if (typeof uni !== 'undefined' && hasMiniBaseEvent(uni)) {
          return true;
      }
      return false;
  };

  const isFromUniapp = isFromUniappEnv();
  const isValidRequest = (obj) => {
      return typeof obj === 'function' || typeof obj === 'object';
  };
  const createXHR = () => {
      if (isValidRequest(XMLHttpRequest) && 'withCredentials' in new XMLHttpRequest()) {
          return new XMLHttpRequest();
      }
      // IE 7-9 中的跨域请求方案
      if (isValidRequest(XDomainRequest)) {
          return new XDomainRequest();
      }
      // 更低版本 IE 使用 ActiveXObject 插件实现跨域请求
      return new ActiveXObject('Microsoft.XMLHTTP');
  };
  function httpReq(options) {
      const method = options.method || HttpMethod.GET;
      const timeout = options.timeout || 60 * 1000;
      const { headers, query, body } = options;
      const url = appendUrl(options.url, query);
      return new Promise((resolve) => {
          const xhr = createXHR();
          xhr.timeout = timeout;
          xhr.open(method, url);
          if (headers && xhr.setRequestHeader) {
              for (const key in headers) {
                  xhr.setRequestHeader(key, headers[key]);
              }
          }
          if ('onload' in xhr) {
              xhr.onload = function () {
                  resolve({ data: xhr.responseText, status: xhr.status });
              };
              xhr.onerror = function () {
                  resolve({ status: xhr.status });
              };
              xhr.ontimeout = function () {
                  resolve({ status: xhr.status });
              };
          }
          else {
              xhr.onreadystatechange = () => {
                  if (xhr.readyState === 4) {
                      const { result, status } = xhr.responseText;
                      resolve({ data: result, status });
                  }
              };
              setTimeout(() => resolve({ status: xhr.responseText.status }), timeout);
          }
          const isXDomainRequest = Object.prototype.toString.call(xhr) === '[object XDomainRequest]';
          const reqBody = isXDomainRequest && typeof body === 'object' ? JSON.stringify(body) : body;
          xhr.send(reqBody);
      });
  }
  function createWebSocket(url, protocols) {
      const ws = new WebSocket(url, protocols);
      ws.binaryType = 'arraybuffer';
      return {
          onClose(callback) {
              ws.onclose = (evt) => {
                  const { code, reason } = evt;
                  callback(code, reason);
              };
          },
          onError(callback) {
              ws.onerror = callback;
          },
          onMessage(callback) {
              ws.onmessage = (evt) => {
                  callback(evt.data);
              };
          },
          onOpen(callback) {
              ws.onopen = callback;
          },
          send(data) {
              ws.send(data);
          },
          close(code, reason) {
              ws.close(code, reason);
          }
      };
  }
  const browser = {
      tag: "browser",
      httpReq,
      localStorage: window === null || window === void 0 ? void 0 : window.localStorage,
      sessionStorage: window === null || window === void 0 ? void 0 : window.sessionStorage,
      isSupportSocket() {
          const bool = typeof WebSocket !== 'undefined';
          bool || logger$1.warn('websocket not support');
          return bool;
      },
      useNavi: true,
      connectPlatform: '',
      isFromUniapp,
      createWebSocket,
      createDataChannel(watcher, connectType) {
          if (this.isSupportSocket() && connectType === 'websocket') {
              return new WebSocketChannel(this, watcher);
          }
          else {
              return new CometChannel(this, watcher);
          }
      }
  };

  const isFromUniapp$1 = isFromUniappEnv();

  const isFromUniapp$2 = isFromUniappEnv();

  let runtime$1;
  {
      runtime$1 = browser;
  }
  var runtime$2 = runtime$1;

  // RTCLib、CallLib 相关监听存储
  const rtcInnerMsgWatcher = [];
  const rtcInnerStatusWatcher = [];
  const rtcInnerWatcher = {
      message(message) {
          rtcInnerMsgWatcher.forEach(item => item(message));
      },
      status(status) {
          rtcInnerStatusWatcher.forEach(item => item(status));
      }
  };
  class IMClient {
      constructor(apiContext) {
          this._token = '';
          this._context = apiContext;
          this.Conversation = new ConversationModule(apiContext);
          this.ChatRoom = new ChatroomModule(apiContext);
          this.RTC = function (options) {
              assert('options.id', options.id, notEmptyString, true);
              return new RTCClient(options, apiContext);
          };
      }
      /**
       * 装载 plugin 插件，并返回相应的插件实例，需在调用 `connect` 方法之前使用
       * @param plugins
       */
      install(plugin, options) {
          return this._context.install(plugin, options);
      }
      /**
       * 添加全局事件监听，同一类型事件会覆盖添加，以避免多次监听引起的复杂问题
       * @param options
       */
      watch(options) {
          const { status: statusListener, conversation: conversationListener, message: messageListener, chatroom: chatroomListener, expansion: expansionListener } = options;
          const watcher = {};
          if (statusListener) {
              watcher.connectionState = (status) => {
                  // 对业务层的方法要增加 catch 捕获，避免影响内部调用栈的继续进行
                  try {
                      statusListener({ status });
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              };
          }
          if (conversationListener) {
              watcher.conversationState = (conversations) => {
                  try {
                      const list = conversations.map((item) => tranReceiveUpdateConversation(item));
                      conversationListener({
                          updatedConversationList: list
                      });
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              };
          }
          if (messageListener) {
              watcher.message = (message) => {
                  try {
                      messageListener({ message: tranReceivedMessage(message) });
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              };
          }
          if (chatroomListener) {
              watcher.chatroomState = (event) => {
                  try {
                      chatroomListener(event);
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              };
          }
          if (expansionListener) {
              watcher.expansion = (event) => {
                  try {
                      expansionListener(event);
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              };
          }
          this._context.assignWatcher(watcher);
      }
      unwatch() {
          this._context.assignWatcher({
              message: undefined,
              connectionState: undefined,
              conversationState: undefined,
              chatroomState: undefined,
              expansion: undefined
          });
      }
      rtcInnerWatch(attrs) {
          const { message: messageListener, status: statusListener } = attrs;
          if (messageListener) {
              rtcInnerMsgWatcher.push((message) => {
                  try {
                      messageListener({ message: tranReceivedMessage(message) });
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              });
          }
          if (statusListener) {
              rtcInnerStatusWatcher.push((status) => {
                  try {
                      statusListener({ status });
                  }
                  catch (err) {
                      logger$1.error(err);
                  }
              });
          }
          this._context.assignWatcher({ rtcInnerWatcher });
      }
      rtcInnerUnwatch() {
          rtcInnerStatusWatcher.length = rtcInnerStatusWatcher.length = 0;
          this._context.assignWatcher({ rtcInnerWatcher: undefined });
      }
      /**
       * 建立 IM 连接
       * @param options
       */
      connect(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.token', options.token, AssertRules.STRING, true);
              const token = options.token;
              this._token = token;
              const res = yield this._context.connect(token, true);
              if (res.code === ErrorCode$1.SUCCESS) {
                  return { id: res.userId };
              }
              return Promise.reject({ code: res.code, msg: ERROR_CODE[res.code] });
          });
      }
      /**
       * 使用上一次的链接 token 重新建立连接，该方法只需在主动调用 `disconnect` 方法之后有重连需求时调用
       */
      reconnect() {
          return __awaiter(this, void 0, void 0, function* () {
              const res = yield this._context.reconnect();
              if (res.code === ErrorCode$1.SUCCESS) {
                  return { id: res.userId };
              }
              return Promise.reject({ code: res.code, msg: ERROR_CODE[res.code] });
          });
      }
      /**
       * 断开当前用户的连接
       * @description 调用后将不再接收消息，不可发送消息，不可获取历史消息，不可获取会话列表
       */
      disconnect() {
          return this._context.disconnect();
      }
      /**
       * 获取当前 IM 环境信息
       */
      getAppInfo() {
          return {
              appkey: this._context.appkey,
              token: this._token,
              navi: this._context.getInfoFromCache()
          };
      }
      /**
       * 获取 IM 连接时间
       */
      getConnectedTime() {
          return this._context.getConnectedTime();
      }
      /**
       * 获取 IM 连接状态
       */
      getConnectionStatus() {
          return this._context.getConnectionStatus();
      }
      /**
       * 获取 IM 连接用户的 id
       */
      getConnectionUserId() {
          return this._context.getCurrentUserId();
      }
      /**
       * 获取文件 token
       * @description 上传文件时，获取文件 token
       * @param fileType 上传类型, 通过 RongIMLib.FILE_TYPE 获取
       * @param fileName 上传文件名，Server 通过文件名生成百度上传认证, 若不传 engine 自动生成
       */
      getFileToken(fileType, fileName) {
          assert('fileType', fileType, isValidFileType, true);
          return this._context.getFileToken(fileType, fileName);
      }
      /**
       * 获取文件上传后的下载地址
       */
      getFileUrl(
      /**
       * 上传类型, 通过 RongIMLib.FILE_TYPE 获取
       */
      fileType, 
      /**
       * 上传后的文件名
       */
      filename, 
      /**
       * 原始文件名
       */
      oriname, 
      /**
       * 上传成功返回数据
       * 百度 bos 上传地址即为下载地址，IM Server 不会返回百度 bos 下载地址，通过用户层传入再返回
      */
      uploadRes, 
      /**
       * 上传方式，阿里或七牛，RongIMLib.UploadMethod 获取
       */
      uploadMethod) {
          assert('fileType', fileType, isValidFileType, true);
          assert('filename', filename, AssertRules.STRING);
          assert('oriname', oriname, AssertRules.STRING);
          assert('uploadMethod', uploadMethod, AssertRules.NUMBER);
          return this._context.getFileUrl(fileType, filename, oriname, uploadRes, uploadMethod);
      }
      /**
       * 切换用户，作用等同于断开当前用户连接，以新的 token 重新建立连接
       * @param option
       */
      changeUser(options) {
          return __awaiter(this, void 0, void 0, function* () {
              assert('options.token', options.token, AssertRules.STRING, true);
              yield this.disconnect();
              return this.connect(options);
          });
      }
      /**
       * 注册自定义消息
       * @param messageType 消息类型
       * @param isPersited  是否存储
       * @param isCounted   是否计数
       * @param prototypes  消息属性名称
      */
      registerMessageType(messageType, isPersited, isCounted, prototypes) {
          this._context.registerMessageType(messageType, isPersited, isCounted, prototypes);
      }
  }
  let imInstance;
  /**
   * 初始化
   * @param {IInitOption} options
   */
  const init = (options) => {
      if (imInstance) {
          logger$1.error('The instance already exists. Do not repeatedly call the init method');
          return imInstance;
      }
      assert('options.appkey', options.appkey, AssertRules.STRING, true);
      assert('options.debug', options.debug, AssertRules.BOOLEAN);
      assert('options.navigators', options.navigators, (value) => {
          return isArray(value) && (value.length === 0 || value.every(isHttpUrl));
      });
      const context = APIContext.init(runtime$2, {
          appkey: options.appkey,
          apiVersion: "4.1.0",
          navigators: options.navigators || [],
          miniCMPProxy: options.customCMP || [],
          isEnterPrise: !true,
          connectionType: options.connectType || 'websocket',
          cppProtocol: options.cppProtocol
      });
      imInstance = new IMClient(context);
      return imInstance;
  };
  const getInstance = () => {
      if (!imInstance) {
          logger$1.error('Please call the init method first');
      }
      return imInstance;
  };

  exports.CHATROOM_ENTRY_TYPE = CHATROOM_ENTRY_TYPE;
  exports.CHATROOM_ORDER = CHATROOM_ORDER;
  exports.CONNECTION_STATUS = CONNECTION_STATUS;
  exports.CONNECT_TYPE = CONNECT_TYPE;
  exports.CONVERSATION_TYPE = CONVERSATION_TYPE;
  exports.ConnectionStatus = ConnectionStatus$1;
  exports.ERROR_CODE = ERROR_CODE;
  exports.FILE_TYPE = FILE_TYPE;
  exports.IMClient = IMClient;
  exports.MENTIONED_TYPE = MENTIONED_TYPE;
  exports.MESSAGE_DIRECTION = MESSAGE_DIRECTION;
  exports.MESSAGE_TYPE = MESSAGE_TYPE;
  exports.MESSAGS_TIME_ORDER = MESSAGS_TIME_ORDER;
  exports.NOTIFICATION_STATUS = NOTIFICATION_STATUS;
  exports.RECALL_MESSAGE_TYPE = RECALL_MESSAGE_TYPE;
  exports.RECEIVED_STATUS = RECEIVED_STATUS;
  exports.SDK_VERSION = SDK_VERSION;
  exports.UploadMethod = UploadMethod$1;
  exports.getInstance = getInstance;
  exports.init = init;

  return exports;

}({}));
