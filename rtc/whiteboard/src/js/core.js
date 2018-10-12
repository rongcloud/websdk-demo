var RongUtils = {
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
  Cache: function () {
    var cache = {};
    var set = function (key, value) {
      cache[key] = value;
    };
    var get = function (key) {
      return cache[key];
    };
    var remove = function (key) {
      delete cache[key];
    };
    var update = function (key, value) {
      set(key, value);
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
    var isSuccess = function (result) {
      return /^(200|202|10000)$/.test(result.code);
    };

    var onLoad = function () {
      var result = xhr.responseText;
      if (result != '') {
        result = JSON.parse(xhr.responseText);
      }
      if (isSuccess(result)) {
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
    xhr.send(JSON.stringify(option.body));
  }
};
var imageNode = document.querySelector(".rong-image");
var tableNode = document.querySelector(".rong-table");
var initDrag = function(node){
  node.onmousedown = function (e) {
    node.style.cursor = 'move';
    var clientX = e.clientX, clientY = e.clientY;
    var left = node.offsetLeft, top = node.offsetTop;
    RongUtils.copy(node, {
      startX: clientX - left,
      startY: clientY - top
    });
    
    var getStartPos = function(){
      return {
        x: node.startX,
        y: node.startY
      };
    };
    var getClientPos = function(e){
      return {
        x: e.clientX,
        y: e.clientY
      };
    };
  
    var getBody = function(){
      var body = document.body;
      var space = 200;
      return {
        width: body.clientWidth - space,
        height: body.clientHeight - space
      }
    };
    var getPos = function(e){
      var tpl = '{pos}px';
      var startPos = getStartPos();
      var startX = startPos.x;
      var startY = startPos.y;
  
      var clientPos = getClientPos(e);
      var clientX = clientPos.x;
      var clientY = clientPos.y;
  
      var body = getBody();
      var height = body.height;
      var width = body.width;
  
      var left = clientX - startX;
      left = (left < 0) ? 0 : left;
      left = (left > width) ? width : left;
  
      var top = clientY - startY;
      top = (top < 0) ? 0 : top;
      top = (top > height) ? height : top;
  
      left = RongUtils.tplEngine(tpl, {
        pos: left
      });
      top = RongUtils.tplEngine(tpl, {
        pos: top
      });
  
      return {
        left: left,
        top: top
      };
    };
    node.onmousemove = function (e) {
      var pos = getPos(e);
      RongUtils.copy(node.style, pos);
    };
    node.onmouseup = function () {
      node.onmousemove = null;
      node.onmouseup = null;
    };
  }
};
initDrag(imageNode);
initDrag(tableNode);

var getImageInfo = function(file, callback){
  var url = URL.createObjectURL(file);
  var image = new Image();
  image.src = url;
  image.onload = function(){
    callback(image);
  };
};
var uploadNode = document.querySelector('#uploadFile');
uploadNode.onchange = function(){
  var file = this.files[0];
  getImageInfo(file, function(image){
    var url = URL.createObjectURL(file);
    RongUtils.copy(imageNode.style, {
      display: 'block',
      backgroundImage: 'url(' + url + ')'
    });
  });
};

var tbuttonNode = document.querySelector('.rong-button-table');
tbuttonNode.onclick = function(){
  tableNode.style.display = 'block'
};

var clearNode = document.querySelector('.rong-button-clear');
clearNode.onclick = function(){
  uploadNode.value = '';
  imageNode.style.backgroundImage = '';
  tableNode.style.display = 'none';
  imageNode.style.display = 'none';
};
