// 大视频窗口
var element = $('.video-main')[0];
// video box
var videoBox = $('.video-box')[0];

var createVideo = function(id, srcObject) {
    var video = document.createElement('video');
    video.id = 'main-' + id;
    video.autoplay = true;
    video.controls = false;
    video.srcObject = srcObject;
    return video;
};

var clearChild = function() {
    videoBox.innerHTML = "";
    element.innerHTML = "";
};

var setMain = function(node) {
    var id = node.id;
    var srcObject = node.srcObject;
    var video = createVideo(id, srcObject);
    element.innerHTML = "";
    element.appendChild(video);
};

var videoItem = {
    added: function(result) {
        var node = result.data;
        var videoEl = $('<div class="voide-child"></div>')[0];

        videoEl.onclick = function(){
            setMain(node);
        };

        videoEl.appendChild(node);
        videoBox.appendChild(videoEl);
        
        if (result.isLocal) {
            setMain(node);
        }
    },
    removed: function(result) {
        var videoElId = result.data;
        var videoEl = $('#' + videoElId)[0];
        if (videoEl) {
            var parentEl = videoEl.parentNode;
            videoBox.removeChild(parentEl);
        }
    },
    leave: function() {
        clearChild();
    }
};
// 注册视频节点监听
RongCallLib.videoWatch(function(result) {
    videoItem[result.type](result);
});

// 注册命令监听
RongCallLib.commandWatch(function(command) {
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

function call(mediaType){
     var params = {
        conversationType: conversationType,
        targetId: targetId,
        inviteUserIds: inviteUserIds,
        mediaType: mediaType
    };
    RongCallLib.call(params, function(error) {
        console.log(error);
    });
}

function hungup() {
    clearChild();
    var params = {
        conversationType: conversationType,
        targetId: targetId,
    };
    RongCallLib.hungup(params, function(error, summary) {
        console.log(summary);
    });
}

function acceptAudio() {
    var params = {
        conversationType: conversationType,
        targetId: targetId,
        mediaType: CallType.MEDIA_AUDIO
    };
    RongCallLib.accept(params);
}

function acceptVideo() {
    var params = {
        conversationType: conversationType,
        targetId: targetId,
        mediaType: CallType.MEDIA_VEDIO
    };
    RongCallLib.accept(params);
}

function reject() {
    var params = {
        conversationType: conversationType,
        targetId: targetId,
    };
    RongCallLib.reject(params);
}

function mute() {
    RongCallLib.mute();
}

function unmute() {
    RongCallLib.unmute();
}

function videoToAudio() {
    RongCallLib.videoToAudio();
}

function audioToVideo() {
    RongCallLib.audioToVideo();
}