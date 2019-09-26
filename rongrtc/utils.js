var utils = (function () {
    var utils = {
      stringFormat: function (temp, data, regexp) {
        if (!(Object.prototype.toString.call(data) === "[object Array]")) data = [data];
        var ret = [];
        for (var i = 0, j = data.length; i < j; i++) {
          ret.push(replaceAction(data[i]));
        }
        return ret.join("");
  
        function replaceAction(object) {
          return temp.replace(regexp || (/\\?\{([^}]+)\}/g), function (match, name) {
            if (match.charAt(0) == '\\') return match.slice(1);
            return (object[name] != undefined) ? object[name] : '{' + name + '}';
          });
        }
      },
      isArray: function (array) {
        return Object.prototype.toString.call(array) == '[object Array]';
      },
      prettyJSON: function (objs, opts) {
        opts = opts || {};
        var isArray = utils.isArray(objs);
        objs = isArray ? objs : [objs];
        var tpl = opts.tpl || '<span class={type}-font>{v}</span>';
        for (var i = 0, len = objs.length; i < len; i++) {
          var obj = objs[i];
          for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
              var v = obj[k] || 'null';
              var type = (typeof v);
              if (type == 'object') {
                utils.prettyJSON(v);
              } else {
                obj[k] = utils.stringFormat(tpl, {
                  type: type,
                  v: v
                });
              }
            }
          }
        }
        return isArray ? objs : objs[0];
      }
    };
    var noop = function () { };
    var isObject = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    };
    var isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
    var isNodeList = function (obj) {
      return Object.prototype.toString.call(obj) === '[object NodeList]';
    };
    var tplEngine =  function (temp, data, regexp) {
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
    };
    var forEach = function (obj, callback) {
      callback = callback || noop;
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
      if (isObject(obj)) {
        loopObj();
      }
      if (isArray(obj) || isNodeList(obj)) {
        loopArr();
      }
    }
    var ajax = function (option) {
      var getXHR = function () {
        var xhr = null;
        var hasXDomain = function () {
          return (typeof XDomainRequest != 'undefined');
        };
        var hasXMLRequest = function () {
          return (typeof XMLHttpRequest != 'undefined');
        };
        if (hasXDomain()) {
          xhr = new window.XDomainRequest();
        } else if (hasXMLRequest()) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        return xhr;
      };
  
      var xhr = getXHR();
      var method = option.method || 'GET';
      var url = option.url;
      var queryStrings = option.queryStrings || {};
      var tpl = '{key}={value}', strings = [];
      forEach(queryStrings, function (value, key) {
        var str = tplEngine(tpl, {
          key: key,
          value: value
        });
        strings.push(str);
      });
      var queryString = strings.join('&');
      var urlTpl = '{url}?{queryString}';
      url = tplEngine(urlTpl, {
        url: url,
        queryString: queryString
      });
  
      xhr.open(method, url, true);
  
      var headers = option.headers || {};
      forEach(headers, function (header, name) {
        xhr.setRequestHeader(name, header);
      });
  
      var success = option.success || noop;
      var fail = option.fail || noop;
      var isSuccess = function (xhr) {
        return /^(200|202|10000)$/.test(xhr.status);
      };
  
      var onLoad = function () {
        var result = xhr.responseText;
        if (isSuccess(xhr)) {
          success(result);
        } else {
          fail(result.target.status);
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
      xhr.onerror = function (error) {
        fail(error.target.status);
      };
      xhr.send(option.body);
    }
    function Logger(option) {
      option = option || {};
      var element = option.el;
      var tpl = '<pre>{logs}</pre>'
      this.log = function (logs, title) {
        logs = utils.prettyJSON(logs);
        logs = JSON.stringify(logs, null, '  ');
        if(title){
          logs = title + '<br>' + logs;
        }
        element.innerHTML += utils.stringFormat(tpl, {
          logs: logs
        });
      };
      this.clear = function () {
        element.innerHTML = '';
      }
    }
    utils.Logger = Logger;
    utils.ajax = ajax;
    return utils;
  })();