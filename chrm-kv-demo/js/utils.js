(function (dependencies) {
  var win = dependencies.win;

  var isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  var isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  var getDom = function (id) {
    return document.getElementById(id);
  }
  var showDom = function (id) {
    var dom = getDom(id);
    dom.style.display = 'block';
  };
  var hideDom = function (id) {
    var dom = getDom(id);
    dom.style.display = 'none';
  };
  var createDom = function (innerHTML) {
    var div = win.document.createElement('div');
    div.innerHTML = innerHTML;
    return div.children[0];
  }
  var appendDom = function (tempId) {
    var temp = document.getElementById(tempId).innerText;
    var dom = createDom(temp);
    document.body.appendChild(dom);
  };

  var getInputValue = function (domId) {
    var dom = getDom(domId);
    return dom.value;
  };

  var getCheckValue = function (domId) {
    var dom = getDom(domId);
    return dom.checked;
  };

  var forEach = function(obj, callback) {
    callback = callback || noop;
    var loopObj = function() {
      for (var key in obj) {
        callback(obj[key], key, obj);
      }
    };
    var loopArr = function() {
      for (var i = 0, len = obj.length; i < len; i++) {
        callback(obj[i], i);
      }
    };
    if (isObject(obj)) {
      loopObj();
    }
    if (isArray(obj)) {
      loopArr();
    }
  };

  function toString(obj) {
    return JSON.stringify(obj);
  }

  function formatDate(time) {
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  }

  RongIM = win.RongIM || {};
  RongIM.utils = {
    getDom: getDom,
    showDom: showDom,
    hideDom: hideDom,
    createDom: createDom,
    appendDom: appendDom,
    getInputValue: getInputValue,
    getCheckValue: getCheckValue,

    forEach: forEach,
    toString: toString,
    formatDate: formatDate
  };
})({
  win: window
});