var RongCallLib = RongCallLib.init({
  RongIMLib: RongIMLib
});

var tools = {
  //仅支持类选择器和 Id 选择器
  getDom: function(selector) {
    var selectorMap = {
      class: function(selector) {
        return document.getElementsByClassName(selector);
      },
      id: function(selector) {
        return document.getElementById(selector);
      }
    };
    var isClass = (selector.indexOf('.') == 0);
    var type = isClass ? 'class' : 'id';
    var name = selector.slice(1);
    return selectorMap[type](name);
  },
  toggleClass: function(node, name) {
    node.className = name;
  },
  createDom: function(name, attrs) {
    attrs = attrs || {};
    var node = document.createElement(name);
    for (var key in attrs) {
      node[key] = attrs[key];
    }
    return node;
  },
  noop: function(){}
};

var ClassType = {
  MAX: 'rong-max-window',
  MIN: 'rong-min-window'
};

var containerNode = tools.getDom('.rong-container')[0];

var clearWindow = function() {
  containerNode.innerHTML = '';
};

var setMaxWindow = function(minNode) {
  var maxNode = tools.getDom('.' + ClassType.MAX)[0];
  if (maxNode) {
    tools.toggleClass(maxNode, ClassType.MIN);
  }
  tools.toggleClass(minNode, ClassType.MAX);
};


var videoItem = {
  added: function(result) {
    var node = result.data;


    var win = tools.createDom('div', {
      className: ClassType.MIN
    });
    var isLocal = result.isLocal;

    win.onclick = function(event) {
      setMaxWindow(event.currentTarget);
    };
    win.appendChild(node);
    containerNode.appendChild(win);

    
    if (isLocal) {
      setMaxWindow(win);
    }
  },
  removed: function(result) {
    var videoId = result.data;
    var video = tools.getDom('#' + videoId);
    if (video) {
      var win = video.parentNode;
      containerNode.removeChild(win);
    }
  },
  leave: function() {
    clearWindow();
  }
};
// 注册视频节点监听
RongCallLib.videoWatch(function(result) {
  videoItem[result.type](result);
});

var tBarCallVideo = tools.getDom('.rong-callvideo')[0];
var tBarCallAudio = tools.getDom('.rong-callaudio')[0];

var tBarAccept = tools.getDom('.rong-accept')[0];
var tBarHungup = tools.getDom('.rong-hungup')[0];

var tBarMute = tools.getDom('.rong-mute')[0];
var tBarUnMute = tools.getDom('.rong-unmute')[0];

var tBarDisableVideo = tools.getDom('.rong-disable-video')[0];
var tbarDisableAudio = tools.getDom('.rong-disable-audio')[0];

var show = function(node){
  node.style.display = 'block';
};
var hide = function(node){
  node.style.display = 'none';
};

var Buttons = {
  showCall: function(){
    show(tBarCallVideo);
    show(tBarCallAudio); 
  },
  hideCall: function(){
    hide(tBarCallVideo);
    hide(tBarCallAudio); 
  },
  showAccept: function(){
    show(tBarAccept);
  },
  hideAccept: function(){
    hide(tBarAccept);
  },
  showMute: function(){
    show(tBarMute);
    hide(tBarUnMute);
  },
  showUnmute: function(){
    show(tBarUnMute);
    hide(tBarMute);
  },
  showDisableVideo: function(){
    show(tBarDisableVideo);
    hide(tbarDisableAudio);
  },
  showDisableAudio: function(){
    show(tbarDisableAudio);
    hide(tBarDisableVideo);
  },
  showCaller: function(){
    show(tBarHungup);
    show(tBarMute);
    show(tBarDisableVideo);
  },
  showCallee: function(){
    show(tBarAccept);
    show(tBarHungup);
    show(tBarMute);
    show(tBarDisableVideo); 
  },
  hideOperate: function(){
    hide(tBarHungup);
    hide(tBarAccept);
    hide(tBarMute);
    hide(tBarUnMute);
    hide(tBarDisableVideo);
    hide(tbarDisableAudio);
  }
};

var commandMap = {
  InviteMessage: function(){
    Buttons.showCallee();
    Buttons.hideCall();
  }
};
// 注册命令监听
RongCallLib.commandWatch(function(command) {
  var cmd = commandMap[command.messageType] || tools.noop;
  cmd();
  console.log(command);
});

var CallType = RongIMLib.VoIPMediaType;
function callVideo() {
  var mediaType = CallType.MEDIA_VEDIO;
  call(mediaType);
}

function callAudio() {
  var mediaType = CallType.MEDIA_AUDIO;
  call(mediaType);
}

function call(mediaType) {

  Buttons.hideCall();
  Buttons.showCaller();

  params.mediaType = mediaType;
  RongCallLib.call(params, function(error) {
    console.log(error);
  });
}

function hungup() {
  Buttons.showCall();
  Buttons.hideOperate();
  clearWindow();
  RongCallLib.hungup(params, function(error, summary) {
    console.log(summary);
  });
}

function acceptVideo() {
  Buttons.hideAccept();
  params.mediaType = CallType.MEDIA_VEDIO;
  RongCallLib.accept(params);
}

function reject() {
  RongCallLib.reject(params);
}

function mute() {
  Buttons.showUnmute();
  RongCallLib.mute();
}

function unmute() {
  Buttons.showMute();
  RongCallLib.unmute();
}

function videoToAudio() {
  Buttons.showDisableAudio();
  RongCallLib.videoToAudio();
}

function audioToVideo() {
  Buttons.showDisableVideo();
  RongCallLib.audioToVideo();
}
