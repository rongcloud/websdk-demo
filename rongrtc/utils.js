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
  return utils;
})();