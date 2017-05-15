
function init(userInfo,callbacks) {
    if (!userInfo.appKey || !userInfo.token){
        return false;
    }

    //公有云初始化
    RongIMLib.RongIMClient.init(userInfo.appKey);
    var instance = RongIMClient.getInstance();

    //连接状态监听器
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
                case RongIMLib.ConnectionStatus.CONNECTED:
                    console.log("链接成功 ");
                    callbacks.CONNECTED && callbacks.CONNECTED(instance);
                    break;
                case RongIMLib.ConnectionStatus.CONNECTING:
                    console.log('正在链接');
                    break;
                case RongIMLib.ConnectionStatus.DISCONNECTED:
                    console.log('断开连接');
                    break;
                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    console.log('其他设备登录');
                    break;
                case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                    console.log('域名不正确');
                    break;
                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    console.log('网络不可用');
                    break;
            }
        }
    });


    RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            callbacks.Received && callbacks.Received(message);
        }
    });


    //开始链接
    RongIMClient.connect(userInfo.token, {
        onSuccess: function (id) {
            callbacks.Success && callbacks.Success(id);
        },
        onTokenIncorrect: function () {
            console.log('token无效');
        },
        onError: function (errorCode) {
            var info = '';
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时';
                    break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                    info = '未知错误';
                    break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                    info = '不可接受的协议版本';
                    break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                    info = 'appkey不正确';
                    break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                    info = '服务器不可用';
                    break;
            }
            console.log(info);
        }
    });

}