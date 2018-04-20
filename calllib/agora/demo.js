// 大视频窗口
var element = $('.video-main')[0];
// video box
var videoBox = $('.video-box')[0];

var clearChild = function() {
    videoBox.innerHTML = "";
    element.innerHTML = "";
};

var setMain = function(node) {
    element.appendChild(node);
};

var videoItem = {
    added: function(result) {
        var node = result.data;
        // node.onclick = function(){
        //     setMain(node);
        // };
        
        if (result.isLocal) {
            setMain(node);
        }else{
            var jNode = $(node);
            var videoNode = jNode.find('video');
            if (videoNode.length > 0) {
                videoNode.attr('style', '');
            }
            videoBox.appendChild(node);
        }
    },
    removed: function(result) {
        var videoElId = result.data;
        $('div').remove('#' + videoElId);
    },
    leave: function() {
        clearChild();
    },
    joined: function(result){
        var userId = result.userId;
        console.warn(userId + '加入通话')
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
        mediaType: mediaType,
        profile: '720P_2'
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
        mediaType: CallType.MEDIA_VEDIO,
        profile: '720P_6'
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