(function (dependencies) {
  var win = dependencies.win;
  var RongCall = win.RongCall || {};

  var noop = function () {};

  var Dom = {
    get: function (name) {
      var selector = null;
      try {
        selector = win.document.querySelector(name);
      } catch (e) {
        // console.error(e);
      }
      return selector;
    },
    getById: function (id) {
      return win.document.getElementById(id);
    },
    create: function (innerHTML) {
      var div = win.document.createElement('div');
      div.innerHTML = innerHTML;
      return div.children[0];
    }
  };

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

  function getBrowser() {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf('Opera') > -1;
    var isIE = window.ActiveXObject || 'ActiveXObject' in window;
    var isEdge = userAgent.indexOf('Edge') > -1;
    var isFF = userAgent.indexOf('Firefox') > -1;
    var isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1;
    var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && !isEdge;
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (userAgent.indexOf('MSIE 6.0') != -1) {
        return 'IE6';
      } else if (fIEVersion == 7) { return 'IE7'; }
      else if (fIEVersion == 8) { return 'IE8'; }
      else if (fIEVersion == 9) { return 'IE9'; }
      else if (fIEVersion == 10) { return 'IE10'; }
      else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
        return 'IE11';
      }
      else { return '0' }//IE版本过低
    }//isIE end 
    if (isFF) { return 'FF'; }
    if (isOpera) { return 'Opera'; }
    if (isSafari) { return 'Safari'; }
    if (isChrome) { return 'Chrome'; }
    if (isEdge) { return 'Edge'; }
  }

  /**
   * http 请求
   * @param {object} option 
   * @param {object} option.url 地址
   * @param {object} option.queryStrings
   * @param {object} option.headers
   * @param {object} option.body
   * @param {object} option.isSync
   */
  function ajax(option) {
    var browser = getBrowser();
    var isSupportHeaders = browser === 'IE9' || browser === 'IE8' || browser === 'IE7';
    var getXHR = function () {
      var xhr = null;
      var hasXDomain = function () {
        return (typeof XDomainRequest != 'undefined');
      };
      var hasXMLRequest = function () {
        return (typeof XMLHttpRequest != 'undefined');
      };
      if (hasXMLRequest() && !isSupportHeaders) {
        xhr = new win.XMLHttpRequest();
      } else if (hasXDomain()) {
        xhr = new win.XDomainRequest();
      } else {
        xhr = new win.ActiveXObject('Microsoft.XMLHTTP');
      }
      return xhr;
    };

    var xhr = getXHR();
    var method = option.method || 'GET';
    var url = option.url;
    var isSync = option.isSync;
    var queryStrings = option.queryStrings || {};
    var tpl = '{key}={value}', strings = [];
    for (var key in queryStrings) {
      var value = queryStrings[key];
      var str = tplEngine(tpl, {
        key: key,
        value: value
      });
      strings.push(str);
    }
    queryStrings = strings.join('&');
    var urlTpl = '{url}?{queryString}';
    url = tplEngine(urlTpl, {
      url: url,
      queryString: queryStrings
    });
    xhr.open(method, url);

    var headers = option.headers || {};
    if (xhr.setRequestHeader) {
      for (var name in headers) {
        var header = headers[name];
        xhr.setRequestHeader(name, header);
      }
    }

    var isSuccess = function (xhr) {
      return /^(200|202|10000)$/.test(xhr.status) || xhr.responseText;
    };
    var success = option.success || noop;
    var fail = option.fail || noop;
    var onLoad = function () {
      var result = xhr.responseText;
      if (isSuccess(xhr)) {
        success(result);
      } else {
        fail(result);
      }
    }
    if ('onload' in xhr) {
      xhr.onload = onLoad;
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          onLoad();
        }
      };
    }
    xhr.onerror = function (result) {
      fail(result);
    };

    xhr.send(option.body);
  }

  /* 监听器(观察者模式) */
  var EventEmitter = (function () {
    var events = {};

    var on = function (name, event) {
      var currentEventList = events[name] || [];
      currentEventList.push(event);
      events[name] = currentEventList;
    };

    var off = function (name, event) {
      if (!event) {
        delete events[name];
      } else {
        var currentEventList = events[name];
        currentEventList && currentEventList.forEach(function (currentEvent) {
          if (currentEvent === event) {
            var index = currentEventList.indexOf(currentEvent);
            currentEventList.splice(index, 1);
          }
        });
      }
    };

    var emit = function (name, data) {
      var currentEventList = events[name] || [];
      currentEventList.forEach(function (event) {
        event(data);
      });
    };

    var clear = function () {
      events = {};
    };

    return {
      on: on,
      off: off,
      emit: emit,
      clear: clear
    };
  })();

  function mountDialog(options) {
    var Dialog = win.Vue.extend(options);
    var instance = new Dialog({
      el: document.createElement('div')
    });
    var wrap = document.getElementsByTagName('body')[0];
    wrap.appendChild(instance.$el);
    return instance;
  }

  function removeArray(value, array, removeKey) {
    var removeKeyList = array.map(function (value) {
      return value[removeKey];
    });
    var index = removeKeyList.indexOf(value[removeKey]);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }

  function DialogQueue() {
    this.isRunning = false;
    this.list = [];
  }
  DialogQueue.prototype.add = function (fn) {
    var context = this;
    var run = function () {
      context.isRunning = true;
      var index = context.list.indexOf(run);
      context.list.splice(index, 1);
      var runNext = function () {
        context.isRunning = false;
        context.run();
      };
      fn(runNext);
    };
    context.list.push(run);
  };
  DialogQueue.prototype.run = function () {
    if (this.list.length && !this.isRunning) {
      var run = this.list[0];
      run && run();
    }
  };

  var toastQueue = new DialogQueue();

  function toast(content) {
    var destroyTimeout = 3000;
    var fn = function (runNext) {
      win.RongCall.dialog.toast({
        content: content,
        destroyTimeout: destroyTimeout,
        onDestoryed: runNext
      });
    };
    toastQueue.add(fn);
    toastQueue.run();
  }

  function login(userId) {
    return new RongCall.Promise(function (resolve, reject) {
      ajax({
        url: win.RongCall.setting.server + '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: win.JSON.stringify({
          userId: userId
        }),
        success: function (result) {
          resolve(win.JSON.parse(result));
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  }

  function getMembers(groupId) {
    return new RongCall.Promise(function (resolve, reject) {
      ajax({
        url: win.RongCall.setting.server + '/getMembers',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: win.JSON.stringify({
          groupId: groupId
        }),
        success: function (result) {
          resolve(win.JSON.parse(result).members);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  }

  function compatiblePlaceholder() {
    if (!('placeholder' in document.createElement('input'))) {
      // 将返回的nodeList对象转为数组
      var nodes = Array.prototype.slice.call(document.querySelectorAll('[placeholder]'))
      nodes.forEach(function (item, index) {
        item.addEventListener('focus', function () {
          this.nextSibling.style.display = 'none'
        })
        item.addEventListener('blur', function () {
          if (!this.value) {
            this.style.display = 'none'
            this.nextSibling.style.display = 'inline'
          }
        })
        var cloneNode = item.cloneNode()
        // 如果[type='password']类型，则转为text
        if (cloneNode.getAttribute('type').toLowerCase() === 'password') {
          cloneNode.setAttribute('type', 'text')
        }
        cloneNode.setAttribute('value', cloneNode.getAttribute('placeholder'))
        cloneNode.style.display = 'none'
        item.insertAdjacentHTML('afterend', cloneNode.outerHTML)
        item.nextSibling.addEventListener('focus', function () {
          this.style.display = 'none'
          this.previousSibling.style.display = 'inline'
          this.previousSibling.focus()
        })
        if (!item.value) {
          item.style.display = 'none'
          item.nextSibling.style.display = 'inline'
        }
      })
    }
  }


  win.RongCall = RongCall || {};
  win.RongCall.utils = {
    Dom: Dom,
    console: win.console,
    ajax: ajax,
    EventEmitter: EventEmitter,
    mountDialog: mountDialog,
    removeArray: removeArray,
    toast: toast,
    login: login,
    getMembers: getMembers,
    tplEngine: tplEngine,
    compatiblePlaceholder: compatiblePlaceholder
  };

})({
  win: window
});