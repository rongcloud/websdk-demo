(function (win) {

  var Defer = win.Promise || ES6Promise;
  var Vue = win.Vue;

  var TypeColor = {
    FAILED: '#ed4014',
    MSG: '#2db7f5',
    STATUS: '#ff9900'
  };

  var ConversationName = {
    1: '单聊',
    3: '群聊',
    4: '聊天室',
    5: '客服',
    6: '系统',
    7: '公众号',
    8: '公众号'
  };

  var StatusName = {
    0: '已连接',
    1: '正在链接',
    2: '主动断开链接',
    3: '网络不可用',
    4: '链接关闭',
    5: 'Socket Error',
    6: '其他设备登录, 被踢',
    12: '被封禁',
    20: 'AppKey 错误',
    201: '正在请求 Navi',
    202: '请求 Navi 成功',
    203: '请求 Navi 错误',
    204: '请求 Navi 超时'
  };

  var SuccessStatus = [0, 1, 2, 4, 201, 202, 203, 204];

  var noop = function () {};

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  function isNodeList(arr) {
    return Object.prototype.toString.call(arr) === '[object NodeList]' || 
      Object.prototype.toString.call(arr) === '[object HTMLCollection]';
  }
  function isFunction(arr) {
    return Object.prototype.toString.call(arr) === '[object Function]';
  }
  function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  }
  function isBoolean(str) {
    return Object.prototype.toString.call(str) === '[object Boolean]';
  }
  function isUndefined(str) {
    return Object.prototype.toString.call(str) === '[object Undefined]';
  }
  function isNull(str) {
    return Object.prototype.toString.call(str) === '[object Null]';
  }
  function isNumber(str) {
    return Object.prototype.toString.call(str) === '[object Number]';
  }

  function defered(callback) {
    return new Defer(callback);
  }
  function isEmpty(val) {
    let result = true;
    if (isObject(val)) {
      forEach(val, () => {
        result = false;
      });
    }
    if (isString(val) || isArray(val)) {
      result = val.length === 0;
    }
    if (isNumber(val)) {
      result = val === 0;
    }
    return result;
  }

  function tplEngine(temp, data, regexp) {
    var replaceAction = function (object) {
      return temp.replace(regexp || (/{([^}]+)}/g), function (match, name) {
        if (match.charAt(0) === '\\') return match.slice(1);
        return (object[name] !== undefined) ? object[name] : '{' + name + '}';
      });
    };
    if (!(Object.prototype.toString.call(data) === '[object Array]')) data = [data];
    var ret = [];
    for (var i = 0, j = data.length; i < j; i++) {
      ret.push(replaceAction(data[i]));
    }
    return ret.join('');
  }

  function forEach(obj, callback, options) {
    options = options || {};
    callback = callback || noop;
    var isReverse = options.isReverse;
    var loopObj = function() {
      for (var key in obj) {
        callback(obj[key], key, obj);
      }
    };
    var loopArr = function() {
      if (isReverse) {
        for (var i = obj.length - 1; i >= 0; i--) {
          callback(obj[i], i);
        }
      } else {
        for (var j = 0, len = obj.length; j < len; j++) {
          callback(obj[j], j);
        }
      }
    };
    if (isObject(obj)) {
      loopObj();
    }
    if (isArray(obj) || isNodeList(obj)) {
      loopArr();
    }
  };

  function clearUndefKey(obj) {
    forEach(obj, function (key, val) {
      if (isUndefined(val)) {
        delete obj[key];
      }
    });
    return obj;
  }

  function map(arr, event) {
    forEach(arr, function(item, index) {
      arr[index] = event(item, index);
    });
    return arr;
  }

  function deepMap(arr, event) {
    forEach(arr, function (item, index) {
      if (isArray(item) || isObject(item)) {
        arr[index] = deepMap(item, event);
      } else {
        arr[index] = event(item, index);
      }
    });
    return arr;
  }

  function isEqual(obj1, obj2) {
    if (isObject(obj1) && isObject(obj2)) {
      var isEq = true;
      forEach(obj1, function (val, key) {
        if (obj2[key] !== val) {
          isEq = false;
        }
      });
      return isEq;
    } else {
      return obj1 == obj2;
    }
  }

  function getDom(id) {
    return document.getElementById(id);
  }

  function queryAllDom(sel) {
    return document.querySelectorAll(sel);
  }

  function queryDom(sel) {
    return document.querySelector(sel);
  }

  function removeDom(dom) {
    var parent = dom.parentNode || dom.parentElement;
    parent.removeChild(dom);
  }

  function getParent(dom) {
    return dom.parentNode || dom.parentElement;
  }

  function getChildren(dom) {
    return dom.children;
  }

  function getTemp(id) {
    var dom = getDom(id);
    return dom.innerHTML;
  }

  function getDomIndex(dom) {
    var parent = getParent(dom);
    var children = parent.children;
    for (var i = 0, max = children.length; i < max; i++) {
      var child = children[i];
      if (dom === child) {
        return i;
      }
    }
    return -1;
  }

  function toJSON(obj) {
    return JSON.stringify(obj);
  }

  function parseJSON(str) {
    var val;
    try {
      val = JSON.parse(str);
    } catch(e) {}
    return val;
  }

  function copy(obj) {
    var copyObj = parseJSON(toJSON(obj));
    return copyObj;
  }

  function hasClass(el, className) {
    if (!el) {
      return false;
    }
    var classList = el.classList;
    for (var i = 0, max = classList.length; i < max; i++) {
      if (classList[i] === className) {
        return true;
      }
    }
    return false;
  }

  function timestampToString(timestamp) {
    var date = timestamp ? new Date(timestamp) : new Date();
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
  }

  function extend(destination, sources) {
    for (var key in sources) {
      var value = sources[key];
      if (!isUndefined(value)) {
        destination[key] = value;
      }
    }
    return destination;
  };

  /**
  * 封装弹框组件
  * @param {object} options
  */
  function mountDialog(options, instance) {
    options.parent = instance;
    var Dialog = Vue.extend(options);
    var instance = new Dialog({
      el: document.createElement('div')
    });
    var wrap = document.getElementsByTagName('body')[0];
    wrap.appendChild(instance.$el);
    return instance;
  }

  function reverse(obj) {
    var newObj = copy(obj);
    return newObj.reverse();
  }

  function openUrl(url) {
    window.open(url);
  }

  function getBase64Image() {
    var canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    var context = canvas.getContext('2d');
    context.font = '20pt Arial';
    context.fillStyle = 'blue';
    context.fillText('RongCloud.cn', 10, 20);
    var content = canvas.toDataURL('image/jpeg');
    content = content.replace('data:image/jpeg;base64,', '');
    return content;
  }

  var increaseNumber = 0;
  function getIncreasNumber() {
    return ++increaseNumber;
  }

  var EventEmitter = function () {
    this._events = {};
    
    this.on = function (name, event) {
      var _events = this._events[name] || [];
      _events.push(event);
      this._events[name] = _events;
    };

    this.emit = function (name, data) {
      var _events = this._events[name];
      forEach(_events, function(event) {
        event(data);
      });
    };
  };

  var Storage = {
    ConfigKey: 'config',
    get: function (key) {
      var str = localStorage.getItem(key);
      return parseJSON(str);
    },
    set: function (key, val) {
      var str = toJSON(val);
      localStorage.setItem(key, str);
    }
  };

  function getUrlQuery() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf('?') != -1) {
      var str = url.substr(1);
      strs = str.split('&');
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  }

  function getRCUrlQuery() {
    var theRequest = getUrlQuery();
    var transMap = {
      'true': true, 'false': false
    };
    map(theRequest, function (val, key) {
      var transVal = transMap[val];
      if (!isUndefined(transVal)) {
        val = transVal;
      }
      return val;
    });
    forEach(theRequest, function (val, key) {
      if (key === 'encodeToken') {
        theRequest.token = decodeURIComponent(val);
        delete theRequest.encodeToken;
      }
      if (key === 'isMini') {
        delete theRequest.isMini;
      }
    });
    return theRequest;
  }

  function deferNoop() {
    return Defer.resolve();
  }

  win.RongIM = win.RongIM || {};
  win.RongIM.Utils = {
    Storage: Storage,

    TypeColor: TypeColor,
    ConversationName: ConversationName,
    StatusName: StatusName,
    SuccessStatus: SuccessStatus,

    EventEmitter: EventEmitter,

    noop: noop,
    isNumber: isNumber,
    isFunction: isFunction,
    map: map,
    deepMap: deepMap,
    isEqual: isEqual,
    clearUndefKey: clearUndefKey,
    Defer: Defer,
    defered: defered,
    tplEngine: tplEngine,
    forEach: forEach,
    toJSON: toJSON,
    parseJSON: parseJSON,
    copy: copy,
    removeDom: removeDom,
    getParent: getParent,
    getChildren: getChildren,
    hasClass: hasClass,
    getDomIndex: getDomIndex,
    timestampToString: timestampToString,
    extend: extend,
    reverse: reverse,
    openUrl: openUrl,
    getBase64Image: getBase64Image,
    getIncreasNumber: getIncreasNumber,

    getDom: getDom,
    queryDom: queryDom,
    queryAllDom: queryAllDom,
    getTemp: getTemp,
    mountDialog: mountDialog,
    getUrlQuery: getUrlQuery,
    getRCUrlQuery: getRCUrlQuery,
    deferNoop: deferNoop,
    isEmpty: isEmpty,
  };

})(window);