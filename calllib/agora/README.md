### Rong CallLib API 说明

### 启动示例

1、修改 `config` 的 `appKey`、`private`、`group` 属性中的 `userid` 和 `token`

2、访问 `private.html` 或者 `group.html`

### 分辨率

## 分辨率说明{#resolution}

| 视频属性       | 分辨率（ 宽 x 高 ）  |  帧率      | 码率(Kbps)
|:--------------|:------------------|:----------|:----------
|240P           |   320X240         |   15      |   200
|360P           |   640X360         |   15      |   400
|480P           |   640x480         |   15      |   500
|720P           |   960x720         |   15      |   910

### API
    
#### videoWatch

方法： `RongCallLib.videoWatch(watcher);` 。

描述： 监控视频流，当有人加入、离开会触发此监听。
   
示例：

```js
var watcher = function(result){
    // result => {type: 'added', data: ''}
};

RongCallLib.videoWatch(watcher);
```
    
#### commandWatch

方法： `RongCallLib.commandWatch(watcher);` 。

描述： 接收指令，根据指令操作 UI，按钮、浮层等等。
   
示例：

```js
RongCallLib.commandWatch(function(command){
    // command => 消息指令
});

```
#### call

方法： `RongCallLib.call(params, callback);` 。

描述： 发起音视频通话。
   
示例：

```js
var CallType = RongIMLib.VoIPMediaType;

var params = {
    // 会话类型，请参考: http://rongcloud.cn/docs/web_api_demo.html#conversation_type
    conversationType: conversationType,
    // 会话目标 Id，群 Id 或者 userId。 
    targetId: targetId,
    // 被邀请人 Id , 多人视频填写多个 userId, 一对一和 targetId 值一致。
    inviteUserIds: inviteUserIds,
    // 音频类型
    // CallType.MEDIA_VEDIO
    // CallType.MEDIA_AUDIO
    mediaType: CallType.MEDIA_VEDIO
};
RongCallLib.call(params, function(error){
    // do something...
});
```
#### hungup

方法： `RongCallLib.hungup(params, callback);` 。

描述： 挂断音视频通话。
   
示例：

```js
var params = {
    // 会话类型，请参考: http://rongcloud.cn/docs/web_api_demo.html#conversation_type
    conversationType: conversationType,
    // 会话目标 Id，群 Id 或者 userId。 
    targetId: targetId,   
};
RongCallLib.hungup(params, function(error, summary){
    // summary => 音视频通话汇总信息
});
```
#### reject

方法： `RongCallLib.reject(params);` 。

描述： 收到请求音视频指令，拒绝通话。
   
示例：

```js
var params = {
    // 会话类型，请参考: http://rongcloud.cn/docs/web_api_demo.html#conversation_type
    conversationType: conversationType,
    // 会话目标 Id，群 Id 或者 userId。 
    targetId: targetId
};
RongCallLib.reject(params);
```

#### mute

方法： `RongCallLib.mute();` 。

描述： 关闭麦克风

示例：

```js
RongCallLib.mute();
```

#### unmute

方法： `RongCallLib.unmute();` 。

描述： 打开麦克风
   
示例：

```js
RongCallLib.unmute();
```

#### videoToAudio

方法： `RongCallLib.videoToAudio;` 。

描述： 视频转音频
   
示例：

```js
RongCallLib.videoToAudio();
```

#### audioToVideo

方法： `RongCallLib.audioToVideo();` 。

描述： 音频转视频

示例：

```js
RongCallLib.audioToVideo();
```

#### accept

方法： `RongCallLib.accept();` 。

描述：
   

示例：

```js
var CallType = RongIMLib.VoIPMediaType;

var params = {
    // 会话类型，请参考: http://rongcloud.cn/docs/web_api_demo.html#conversation_type
    conversationType: conversationType,
    // 会话目标 Id，群 Id 或者 userId。 
    targetId: targetId,
    // 音频类型
    // CallType.MEDIA_VEDIO
    // CallType.MEDIA_AUDIO
    mediaType: CallType.MEDIA_VEDIO
};
RongCallLib.accept(params);
```