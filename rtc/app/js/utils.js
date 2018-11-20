(function (dependencies) {
  var utils = {
    getScale: function (dom) {
      var transform = dom.style.transform;
      if (transform.indexOf('scale') === -1) {
        return null;
      }
      var scale = transform.substring(6, transform.length - 1);
      return Number(scale);
    },
    scaleEl: function (dom, percent) {
      var scale = utils.getScale(dom);
      percent = scale ? scale * percent : percent;
      dom.style.transform = 'scale(' + percent + ')';
    },
    ObserverList: function () {
      var checkIndexOutBound = function (index, bound) {
        return index > -1 && index < bound;
      };
      this.observerList = [];
      this.add = function (observer, force) {
        force && (this.observerList.length = 0);
        this.observerList.push(observer);
      };
      this.get = function (index) {
        if (checkIndexOutBound(index, this.observerList.length)) {
          return this.observerList[index];
        }
      };
      this.count = function () {
        return this.observerList.length;
      };
      this.removeAt = function (index) {
        checkIndexOutBound(index, this.observerList.length) && this.observerList.splice(index, 1);
      };
      this.remove = function (observer) {
        if (!observer) {
          this.observerList.length = 0;
          return;
        }
        observer = Object.prototype.toString.call(observer) == '[object Function]' ? [observer] : observer;
        for (var i = 0, len = this.observerList.length; i < len; i++) {
          if (this.observerList[i] === observer[i]) {
            this.removeAt(i);
            break;
          }
        }
      };
      this.notify = function (val) {
        for (var i = 0, len = this.observerList.length; i < len; i++) {
          this.observerList[i](val);
        }
      };
      this.indexOf = function (observer, startIndex) {
        var i = startIndex || 0,
          len = this.observerList.length;
        while (i < len) {
          if (this.observerList[i] === observer) {
            return i;
          }
          i++;
        }
        return -1;
      };
    },
    Cache: function (config) {
      config = config || {};
      var prefix = config.prefix || 'rongrtc';
      var genKey = function (key) {
        return utils.tplEngine('{prefix}_{key}', {
          prefix: prefix,
          key: key
        });
      };
      var set = function (key, value) {
        localStorage.setItem(genKey(key), value);
      };
      var get = function (key) {
        return localStorage.getItem(genKey(key));
      };
      var remove = function (key) {
        localStorage.removeItem(genKey(key));
      };
      var update = function (key, value) {
        localStorage.setItem(genKey(key), value);
      };
      return {
        set: set,
        get: get,
        update: update,
        remove: remove
      };
    },
    tplEngine: function (temp, data, regexp) {
      if (!(Object.prototype.toString.call(data) === '[object Array]')) data = [data];
      var ret = [];
      for (var i = 0, j = data.length; i < j; i++) {
        ret.push(replaceAction(data[i]));
      }
      return ret.join('');

      function replaceAction(object) {
        return temp.replace(regexp || (/{([^}]+)}/g), function (match, name) {
          if (match.charAt(0) == '\\') return match.slice(1);
          return (object[name] != undefined) ? object[name] : '{' + name + '}';
        });
      }
    },
    copy: function (target, source) {
      for (var key in source) {
        target[key] = source[key];
      }
    },
    noop: function () { },
    getRandom: function (range) {
      return Math.floor(Math.random() * range);
    },
    getTimestamp: function (timestamp) {
      var date = new Date();
      if (timestamp > 0) {
        date = new Date(timestamp);
      }
      return date.getTime();
    },
    forEach: function (obj, callback) {
      callback = callback || utils.noop;
      var loopObj = function () {
        for (var key in obj) {
          callback(obj[key], key, obj);
        }
      };
      var loopArr = function () {
        for (var i = 0, len = obj.length; i < len; i++) {
          callback(obj[i], i);
        }
      };
      if (utils.isObject(obj)) {
        loopObj();
      }
      if (utils.isArray(obj)) {
        loopArr();
      }
    },
    rename: function (origin, newNames) {
      var isObject = utils.isObject(origin);
      if (isObject) {
        origin = [origin];
      }
      origin = JSON.parse(JSON.stringify(origin));
      var updateProperty = function (val, key, obj) {
        delete obj[key];
        key = newNames[key];
        obj[key] = val;
      };
      utils.forEach(origin, function (item) {
        utils.forEach(item, function (val, key, obj) {
          var isRename = (key in newNames);
          (isRename ? updateProperty : utils.noop)(val, key, obj);
        });
      });
      return isObject ? origin[0] : origin;
    },
    isObject: function (obj) {
      return (Object.prototype.toString.call(obj) == '[object Object]');
    },
    isArray: function (arr) {
      return (Object.prototype.toString.call(arr) == '[object Array]');
    },
    isNumber: function (num) {
      return (Object.prototype.toString.call(num) == '[object Number]');
    },
    isString: function (str) {
      return (Object.prototype.toString.call(str) == '[object String]');
    },
    isFunction: function (arr) {
      return (Object.prototype.toString.call(arr) == '[object Function]');
    },
    //暂时支持 Object
    isEmpty: function (obj) {
      var result = true;
      if (utils.isObject(obj)) {
        utils.forEach(obj, function () {
          result = false;
        });
      }
      if (utils.isString(obj)) {
        result = (obj.length == 0);
      }
      return result;
    },
    filter: function (arrs, callback) {
      if (utils.isObject(arrs)) {
        arrs = [arrs];
      }
      var result = [];
      utils.forEach(arrs, function (item) {
        callback(item) && result.push(item);
      });
      return result;
    },
    /* 
      var option = {
        url: '',
        method: '',
        headers: {},
        success: function(){},
        fail: function(){}
      };
    */
    ajax: function (option) {
      var getXHR = function () {
        var xhr = null;
        var hasXDomain = function () {
          return (typeof XDomainRequest != 'undefined');
        };
        var hasXMLRequest = function () {
          return (typeof XMLHttpRequest != 'undefined');
        };
        if (hasXDomain()) {
          xhr = new XDomainRequest();
        } else if (hasXMLRequest()) {
          xhr = new XMLHttpRequest();
        } else {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
      };

      var xhr = getXHR();
      var method = option.method || 'GET';
      var url = option.url;
      var queryStrings = option.queryStrings || {};
      var tpl = '{key}={value}', strings = [];
      utils.forEach(queryStrings, function (value, key) {
        var str = utils.tplEngine(tpl, {
          key: key,
          value: value
        });
        strings.push(str);
      });
      var queryString = strings.join('&');
      var urlTpl = '{url}?{queryString}';
      url = utils.tplEngine(urlTpl, {
        url: url,
        queryString: queryString
      });

      xhr.open(method, url, true);

      var headers = option.headers || {};
      utils.forEach(headers, function (header, name) {
        xhr.setRequestHeader(name, header);
      });

      var success = option.success || utils.noop;
      var fail = option.fail || utils.noop;
      var isSuccess = function (xhr) {
        return /^(200|202|10000)$/.test(xhr.status);
      };

      var onLoad = function () {
        var result = xhr.responseText;
        if (isSuccess(xhr)) {
          success(result);
        } else {
          fail(result);
        }
      };
      if ('onload' in xhr) {
        xhr.onload = onLoad;
      }
      else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            onLoad();
          }
        };
      }
      xhr.send(option.body);
    }
  };

  window.RongRTC = window.RongRTC || {};
  window.RongRTC.utils = utils;
})({
  win: window
});