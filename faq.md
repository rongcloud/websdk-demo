# 融云 SDK 常见问题

## 一、引入 SDK （连接融云服务器）


### 参考文档：[http://www.rongcloud.cn/docs/web.html#sdk](http://www.rongcloud.cn/docs/web.html#sdk)

### WebIM 集成引导：[https://rongcloud.github.io/websdk-demo/integrate/guide.html](https://rongcloud.github.io/websdk-demo/integrate/guide.html)

### IE9 下 RequireJS 加载时 protobuf 文件报错 (不支持 websocket 内核的浏览器会报错)

（1）通过 script 直接引入的方式，SDK 有判断，IE9 下使用长链接，并且不引入 protobuf

（2）如果是 Require 方式加载，需要加个判断，在不支持 websocket 的浏览器里不引入 protobuf，只在支持的浏览器引入

（3）RequireJS 加载 SDK demo: [https://rongcloud.github.io/websdk-demo/require.html](https://rongcloud.github.io/websdk-demo/require.html)


### 集成 electron 问题 报错：Cannot find module 'ByteBuffer' 

（1）由于 Electron 集成了 Node.js，有一些额外的符号被插入到 DOM，比如 module， exports， require。这对于某些库会引发问题，因为它们可能需要插入同名的符号。

（2）在 Electron 中关闭 Node 集成

```

// In the main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()

```

（3）确定 electron 引入 SDK 是通过 RequireJS 引入，或者通过 页面 引入的

（4）如果是通过 RequireJS 引入的 SDK，参考 demo：[https://rongcloud.github.io/websdk-demo/electron/requirejs-in-node.html](https://rongcloud.github.io/websdk-demo/electron/requirejs-in-node.html)

（5）如果是通过 页面直接引入的 SDK，如果保留使用 Node.js 和 Electron APIs 的能力，必须要在引用其它库之前在页面中重命名这些符号：

```

<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>

```

参考 demo ：[https://rongcloud.github.io/websdk-demo/electron/normal.html](https://rongcloud.github.io/websdk-demo/electron/normal.html)

（6）参考文档：

[https://www.kancloud.cn/simon_chang/electron/227476](https://www.kancloud.cn/simon_chang/electron/227476)

[http://requirejs.org/docs/node.html](http://requirejs.org/docs/node.html)


###  如何动态获取 token

（1）动态获取 token 需要在 APP server 端获取

（2）参考文档：[http://www.rongcloud.cn/docs/server.html#user_get_token](http://www.rongcloud.cn/docs/server.html#user_get_token)


### token 失效问题

Token无效一般有以下两种原因：

（1）token错误，请您检查客户端初始化使用的AppKey和您服务器获取token使用的AppKey是否一致

（2）token过期，是因为您在开发者后台设置了token过期时间，您需要请求您的服务器重新获取token并再次用新的token建立连接。

所以：

（1）请确认一下  AppKey 和 token 是否匹配。

（2）请在开发者后台确认 token 是否在有效期。

（3）请使用工具：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html) 来测试一下能否链接成功。


### 连接成功后，聊天界面一直开着，过一段时间，会自动断开

（1）请确认该 token 是否有在其他端登录。判断方法：在开发者工具console里看错误信息，是否输出了 “其他端登录” 的信息

（2）断开连接时网络是否正常，请查看一下开发者工具console里的输出的断开原因，截图一下

（3）WebSDK有重链的方法，但是没有默认自动重链，请根据自己需要处理

（4）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

### 重连错误

（1）执行重连过程：融云连接状态监听器 setConnectionStatusListener 监听到 断开连接（这里的断开连接是指 连接融云服务器断开），可以执行重连方法。

（2）融云连接状态监听器 setConnectionStatusListener 监听到 网络不可用，开始检测当前网络是否已连接，当网络正常连接后，再执行重连方法。

（3）reconnect 方法是监听到连接融云服务器断开后调用的重连方法，如果是网络断开连接了，需要先进行网络嗅探，在确认网络连接成功后再进行重连。

（4）在提示 其他端登录 不要使用重连方法，会造成两个页面互踢的情况，需要同一个 userid 同时登录多个页面，需要开通 多设备消息同步 服务，此服务为增值服务，开发环境免费，生产环境付费。

（5）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

（6）多设备消息同步 服务参考链接：[http://www.rongcloud.cn/docs/payment.html#multi_device_message_sync](http://www.rongcloud.cn/docs/payment.html#multi_device_message_sync)


###  Web 端获取对方在线状态

（1）不能通过消息来判断用户是否在线，需要通过应用服务器处理

（2）用户是否在线需要用 server 端的在线状态订阅，具体可以参看用户状态相关文档：[http://www.rongcloud.cn/docs/server.html#online_status](http://www.rongcloud.cn/docs/server.html#online_status)


## 二、会话列表

### 获取会话列表问题

（1）获取会话列表 需要开通 单群聊消息云端存储 服务，该服务在开发环境是免费的，您可以在开发者后台 - 付费功能中自行开通！

（2）确认开通服务后，在init初始化以及连接融云服务器成功后，再调用同步会话列表方法

（3）确认在开通服务后有过消息收发

（4）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

（5）提供 appKey 和 token / 线上的测试地址

（6）单群聊消息云端存储 服务说明连接：[http://www.rongcloud.cn/docs/payment.html#history_message_cloud_storage](http://www.rongcloud.cn/docs/payment.html#history_message_cloud_storage)

### 获取会话列表的参数问题

（1）获取会话列表应该有两个参数传入

（2）conservationType 默认为 null，具体格式设置需要补充（现在传具体会话类型不能过滤，属于 bug ）

（3）limit 获取会话的数量，不传或者传 null 为获取全部，暂时不支持分页

### 会话列表顺序问题

（1）确定一下顺序问题是 一直有问题，还是最近出现的问题 

（2）如果是一直有问题 sortConversationList() 方法可以改变顺序

（3）如果是最近出现的问题，提供 appKey 以及出现问题的 token  / 提供线上的测试地址，Web 端复现问题，server 端有没有更改

### 会话列表和聊天页面分成两个页面

（1）Web 端默认只支持一个页面链接，属于单页面应用，单页面应用只需 init 和 connect 一次， connect 后客户端和服务器会一直保持长连接。

（2）开页面就要分别对每个页面初始化 和 connect ，会提示其他设备登录，需要多页面链接需要开通 多设备消息同步 服务。

（3）参考链接：[http://www.rongcloud.cn/docs/payment.html#multi_device_message_sync](http://www.rongcloud.cn/docs/payment.html#multi_device_message_sync)

### 聊天插件中删除会话列表问题

（1）聊天插件中点击删除最近联系人会话中的一个会话，没有效果，刷新页面重新登录就已经删除成功

（2）属于聊天插件的 bug ，建议修改 删除逻辑，根据 id 在本地做隐藏，或者等待 SDK 的版本更新

### 未读消息数量

（1）获取未读消息数必须在获取会话列表和收到实时消息之后，未读消息储存在 localstorage 中

（2）在获取会话列表后，每次有收到新的消息时会执行 获取未读消息( getUnreadCount() ) 方法，数量 count 会不断累加，执行清除未读消息 方法后，count 清零。

（3）清除未读消息( clearUnreadCount() ) 方法可以清除当前端的未读数，并不会多端同步，多端同步需要发送 SynReadStatusMessage ,同步给多端请参考 SendSynReadStatusMessage 。

（4）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

（5）参考文档：[http://www.rongcloud.cn/docs/web_api_demo.html#conversation_unread_message](http://www.rongcloud.cn/docs/web_api_demo.html#conversation_unread_message)


## 三、历史消息


### 获取历史消息出错或者为空

（1）获取历史消息 需要开通 单群聊消息云端存储 服务，该服务在开发环境是免费的，您可以在开发者后台 - 付费功能中自行开通！

（2）确认开通服务后，在init初始化以及连接融云服务器成功后，再调用 获取历史消息 方法

（3）确认在开通服务后有过消息收发

（4）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

（5）参考文档：[http://www.rongcloud.cn/docs/web.html#history_message](http://www.rongcloud.cn/docs/web.html#history_message)

（6）提供 appKey 和 token / 提供线上的测试地址

（7）单群聊消息云端存储 服务说明连接：[http://www.rongcloud.cn/docs/payment.html#history_message_cloud_storage](http://www.rongcloud.cn/docs/payment.html#history_message_cloud_storage)

### 获取历史消息方法中的参数 conversationType 可以指定多种消息会话类型

（1）消息会话类型请参考文档：[http://www.rongcloud.cn/docs/web_api_demo.html#conversation_type](http://www.rongcloud.cn/docs/web_api_demo.html#conversation_type)

```

（1）私聊  RongIMLib.ConversationType.PRIVATE, conversationType = 1
（2）讨论组 RongIMLib.ConversationType.DISCUSSION,  conversationType = 2
（3）群组 RongIMLib.ConversationType.GROUP, conversationType = 3
（4）聊天室 RongIMLib.ConversationType.CHATROOM, conversationType = 4
（5）客服 RongIMLib.ConversationType.CUSTOMER_SERVICE, conversationType = 5
（6）系统消息 RongIMLib.ConversationType.SYSTEM, conversationType = 6
（7）应用内默认关注得公众账号 RongIMLib.ConversationType.APP_PUBLIC_SERVICE, conversationType = 7
（8）手动关注的公众账号  RongIMLib.ConversationType.PUBLIC_SERVICE, conversationType = 8

```

### 历史消息下载问题

（1）消息历史记录下载地址获取方法 请参考：[http://rongcloud.cn/docs/server.html#history_message](http://rongcloud.cn/docs/server.html#history_message)

### 获取历史消息方法中的参数 timestrap

（1）默认传 null 

（2）若从头开始获取历史消息,timestrap = 0

（3）timestrap 可以为时间戳, 当 timestrap 为时间戳时，获取的是 消息发送时间（sentTime）之前的历史消息

### 获取历史消息循环拉取问题

（1）拉取历史消息最多一次性拉取 20 条消息。拉取顺序按时间倒序拉取，一次性拉取最少为 2 条消息。

（2）在点击会话列表第一次进入聊天界面时，获取历史消息应该是从头拉取的，此时 timestrap 设为 0，可以保证每次进入聊天界面时都是从头拉取的

（3）在获取 更多历史消息 的时候，timestrap 拉取必须为 null 才能实现循环拉取（ timestrap 传 0 或着时间戳时不能循环拉取 ）

### 离线消息

（1）获取离线消息使用获取 历史消息的方法

（2）在获取历史消息方法返回的消息体中 有 offLineMessage 属性，标识是否为离线消息，如果为 true ，则为离线消息，反之，则是普通消息

### Web 端清除聊天记录

（1）RongIMClient.getInstance().clearMessages() 方法清除本地会话中的历史消息（不能清除服务器中的历史消息记录）

### Web 端用户信息( 用户头像和昵称 )的获取

（1）用户数据 和 用户好友消息 保存在您的应用服务器上，用户信息（昵称、头像地址等）需要在自己的数据库进行获取以及维护，通过 targetId 和 userId 进行匹配,得到相应的用户信息

（2）参考 SDK 架构说明文档：[http://www.rongcloud.cn/docs/quick_start.html](http://www.rongcloud.cn/docs/quick_start.html)

消息中显示用户信息有两种方式：

（1）通过消息中的 senderUserId 匹配自己的用户信息

（2）在消息体体中携带用户信息，请参考：[http://support.rongcloud.cn/kb/NDMy](http://support.rongcloud.cn/kb/NDMy)

### targetId 和 senderUserId 问题

（1）在发送端，targetId 和 senderUserId 不同，targetId 为 目标Id ，senderUserId 为发送者Id

（2）在接收端，targetId 和 senderUserId 相同

## 四、发送接收消息


### 发送图片消息

（1）web发送图片时,要传参数content和imageUri,其中content为图片的base64缩略图，imageUri 为大图的网络路径，七牛上传完图片后可得到。

（2）图片消息中，缩略图必须是 base64 码的 jpg 图，而且不带前缀，到晓不得超过 100 kb。

（3）七牛云上传图片，正式业务中需要使用自己的七牛账号或者其他的文件存储服务（可以通过任意方式上传图片，然后使用上传后的url和生成的base64缩略图构造消息即可）

（4）发送图片消息的步骤：

```

（1）上传图片文件到服务器，获取网络路径（即 原图的 url ）

（2）本地构造 base64 缩略图

（3）构造消息体（需要 base64 格式缩略图 和 原图的 url），发送消息。

```

（5）图片消息体：

```
var content = {
    imageUri: "http://rongcloud.cn/images/newVersion/log_wx.png",   //此处为图片的网络路径
    content: getBase64Image()  //这里是 base64码的 jpg 图
};

var msg = new RongIMLib.ImageMessage(content);

```

（6）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

（7）参考文档：[http://www.rongcloud.cn/docs/web_api_demo.html#message_send](http://www.rongcloud.cn/docs/web_api_demo.html#message_send)

### Web 端聊天插件提示音

（1）WebIMWidget.init中配置 voiceUrl 路径

（2）在收到消息时，在插件中的消息监听 setOnReceiveMessageListener 方法 onReceived 中执行 play 方法

### Web 端聊天插件收不到客服消息

（1）消息接收 demo ：[https://rongcloud.github.io/websdk-demo/connect-check.html](https://rongcloud.github.io/websdk-demo/connect-check.html)

（2）使用 demo 检测下能不能收到客服发过来的消息

（3）与客服对话需要先发起握手消息

（4）参考 demo ：[https://rongcloud.github.io/rongcloud-web-im-widget/demo/customerservice/](https://rongcloud.github.io/rongcloud-web-im-widget/demo/customerservice/)

（5）参考文档：[http://www.rongcloud.cn/docs/web.html#custom_service_widget](http://www.rongcloud.cn/docs/web.html#custom_service_widget)

### Web 端语音消息

（1）Web 端支持语音消息类型，但没有 发送语音消息 的方法，如果可以自行解决录音和转码问题，Web 端就可以发送语音消息

（2）转码需要转成 amr 格式的 base64 str 

（3）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

### Emoji 表情

（1）融云表情库只支持 128 个 emoji 表情

（2）emoji 表情无法显示，先确认一下表情是否在融云支持范围内

（3）移动端支持原生 emoji 字符，Web 端不支持时使用 emoji 转 HTML 方法，转换成 HTML 用图片来呈现 

（4）Android 端页面 emoji 表情不清晰，需要自行更换高清表情图，因为涉及版权问题，emoji表情只提供代码和示例图片，正式使用请自行解决版权问题

（5）接入emoji表情报错（RongEmoji-2.2.4.min.js:1 Uncaught TypeError: Cannot read property 'emojiImage' of undefined）：在初始化 Web SDK ( RongIMClient.init(appkey) )之后再执行 初始化表情库 ( RongIMLib.RongIMEmoji.init() )操作

（6）有一端显示 emoji 表情为灰色，样式不对，确实一下是不是样式有冲突

（7）emoji 网络素材 [http://emojipedia.org/](http://emojipedia.org/)

（8）emoji 参考文档：[http://www.rongcloud.cn/docs/web.html#emoji](http://www.rongcloud.cn/docs/web.html#emoji)

### 群组管理禁言和拉入黑名单权限 

（1）融云提供接口，谁有权限把谁禁言都需要自己在服务器实现

（2）参考文档：[http://www.rongcloud.cn/docs/server.html#group_user_gag](http://www.rongcloud.cn/docs/server.html#group_user_gag)

（3）SDK 架构说明：[http://www.rongcloud.cn/docs/quick_start.html](http://www.rongcloud.cn/docs/quick_start.html)

### 服务端发送消息用户接收不到

（1）需要确认发送消息是否成功（注意消息类型，可以使用融云开发者后台的功能发送）

（2）在端上消息监听里看是否能收到消息

（3）如果还是收不到消息，请提供 appKey 和 token 以及发送消息的时间等，继续排查

### 确认发送消息成功的方法

（1）执行了发送消息成功 onSuccess 方法

（2）看 message 中是否包含 messageUId ，如果有 messageUId 说明成功了。

### 是否可以在 server 端获取聊天记录

（1）可以的，需要开通 服务端实时消息路由 服务，请参考：[http://www.rongcloud.cn/docs/payment.html#server_message_sync](http://www.rongcloud.cn/docs/payment.html#server_message_sync)

## 五、聊天室问题


### 创建聊天室问题

（1）聊天室服务端自动创建 joinChatRoom 填入聊天室 Id 即可。

（2）聊天室 1 个小时后无人说话就会自动销毁

### 进入聊天室拉取消息问题

（1）聊天室不支持通过 getHistoryMessage() 方法获取历史消息

（2）可以在 joinChatRoom 时拉取最近的消息，最多五十条

（3）参考文档：[http://www.rongcloud.cn/docs/web_api_demo.html#chatroom](http://www.rongcloud.cn/docs/web_api_demo.html#chatroom)

### 加入聊天室失败

（1）需要在init初始化以及连接融云服务器成功后，再调用加入聊天室方法

（2）demo ：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

### 提示 xxx 进入聊天室 / 群组的方法

（1）在用户进入聊天室或者群组后自动发送一条消息，其他用户通过消息监听可以知道有用户进入

（2）消息类型和内容都可以由您自己决定，可以根据实际情况设计标识，并通过标识判断是否为新用户

（3）具体类型可以参考文档：[http://www.rongcloud.cn/docs/server.html#message](http://www.rongcloud.cn/docs/server.html#message)

### 手机环境下，进入聊天室，然后手机待机一段时间，重新唤醒屏幕，消息不能发送，提示超时。

（1）手机待机后，系统会有一些节能的操作，浏览器的很多活动会被限制甚至被回收。

（2）建议在浏览器监听window.onfous时间来获取唤醒的时机，唤醒时刷新页面重新开始。

### 聊天室人数上限问题

（1）融云直播聊天室人数无上限

（2）参考文档：[http://www.rongcloud.cn/docs/live_chatroom.html](http://www.rongcloud.cn/docs/live_chatroom.html)

### 游客进入融云聊天室问题

（1）融云要求用户必须根据id等获取token，并链接才能加入聊天室

（2）给游客分配一个id，获取token，链接融云，再调用方法加入聊天室

### Web 端直接关闭网页，退出聊天室问题

（1）网页关闭后，用户会有 保活策略，过了保活期会自动退出

（2）在保活期内重新打开可直接恢复

（3）过了保护期重新打开需要重新加入聊天室

（4）参考文档：[http://www.rongcloud.cn/docs/web_api_demo.html#chatroom](http://www.rongcloud.cn/docs/web_api_demo.html#chatroom)

（5）聊天室规则：[http://www.rongcloud.cn/docs/server.html#chatroom](http://www.rongcloud.cn/docs/server.html#chatroom)

### 关闭网页，用户保活策略问题

（1）使用 session 保存用户信息，超时后自动销毁，在没有超时的一段时间里，就是保活期

（2）目前我们没有保护期，用户在线时直接关闭网页，再次打开网页需要重新登录

### 聊天室续活方法

（1）通过定时向聊天室发消息，例如：server端每隔不到1个小时发送一条cmdMsg。

### Web 端发送聊天室消息，APP 接收不到问题

（1）需要确认 APP 端和 Web 端的 appkey 的是否一致

（2）确认 Web 端用户有没有加入对应聊天室（APP端发消息的和web端加入的是否是同一个聊天室id）

（3）反过来， APP 发消息，Web 端 是否可以收到消息


## 六、音视频问题


### web 端音视频支持问题

（1）WebCallLib 只支持两台电脑一对一视频通话

（2）WebCallLib 只支持windows 和 mac 

### 错误代码问题

```

（1）VOIPCLOSE = 24016 
（2）CLOSE_BEFORE_OPEN = 51001 
（3）ALREADY_IN_USE = 51002 
（4）INVALID_CHANNEL_NAME = 51003 
（5）VIDEU_CONTAINER_IS_NULL = 51004 

```

### 设置视频的清晰度

（1）目前不支持清晰度定制 

### 主叫呼叫后，被叫未接通，主叫挂断，被叫如何获取挂断消息？

（1）挂断时，主叫和被叫都会收到summaryMessage ，监听对方的消息就可以获取挂断消息

（2）demo 主叫： [https://rongcloud.github.io/websdk-demo/voip.html](https://rongcloud.github.io/websdk-demo/voip.html)

（3）demo 被叫： [https://rongcloud.github.io/websdk-demo/voip.html?userId=receiver](https://rongcloud.github.io/websdk-demo/voip.html?userId=receiver)

### 视频聊天步骤

（1）A 向 B 发起音视频请求

（2）B 收到音视频请求 InviteMessage

（3）A 收到响铃消息 RingingMessage

（4）B 接受音视频请求 joincall

（5）A 收到 B 接受视频请求的消息 AcceptMessage 

（6）成功建立视频通话

（7）demo 主叫： [https://rongcloud.github.io/websdk-demo/voip.html](https://rongcloud.github.io/websdk-demo/voip.html)

（8）demo 被叫： [https://rongcloud.github.io/websdk-demo/voip.html?userId=receiver](https://rongcloud.github.io/websdk-demo/voip.html?userId=receiver)

### wss://localhost.agora.io:8921/ 服务器访问不到

（1）确认是否安装 agoraWebAgent 插件并启动 

（2）两台电脑一对一视频通话

（3）windows 插件下载地址：[http://cdn.ronghub.com/AgoraWebAgentSetup.exe](http://cdn.ronghub.com/AgoraWebAgentSetup.exe)

（4）mac 插件下载地址：[http://cdn.ronghub.com/AgoraWebAgent.pkg](http://cdn.ronghub.com/AgoraWebAgent.pkg)

### 发起通话报错 18

（1）[http://www.rongcloud.cn/docs/web_calllib.html#status](http://www.rongcloud.cn/docs/web_calllib.html#status)

（2）VOIP 不可用，确认一下是否开启了音视频服务

（3）音视频开通方式说明：[http://www.rongcloud.cn/docs/call.html#open](http://www.rongcloud.cn/docs/call.html#open)

### 将 VOIP 和 Web 聊天插件结合

（1）在聊天界面中增加发起视频或语音通话按钮（通过修改模板加入新的 dom 节点，赋予相应的 css 做好样式，通过 AngularJS 的双向绑定方式添加相应的事件）

（2）用户点击按钮发起会话 

（3）接收方点击接受，开始通讯

### b._voipProvider is undefind

（1）根据错误提示应该是 音视频 SDK 未初始化

（2）参考文档: [http://www.rongcloud.cn/docs/web_calllib.html](http://www.rongcloud.cn/docs/web_calllib.html)

### 通过 H5 写的 web 型 APP 集成音视频

（1）在 引入 SDK 之前设置 window["SCHEMETYPE"] = "http";

（2）参考文档；[http://www.rongcloud.cn/docs/web_api_demo.html#other](http://www.rongcloud.cn/docs/web_api_demo.html#other)


## 消息体

```

{
    "content": {
        "messageName": "TextMessage",
        "content": "hello",  //消息内容
        "extra": "RongCloud"
    },
    "conversationType": 1,   // 会话类型（单聊、群聊、聊天室等）
    "objectName": "RC:TxtMsg",  
    "messageDirection": 1,
    "messageId": 36,
    "senderUserId": "user8",    //发送者id
    "sentStatus": 30,    //消息状态
    "sentTime": 1484621850284,   //发送时间，自己转化格式
    "targetId": "user9",    // 目标Id
    "messageType": "TextMessage",
    "messageUId": "5CQK-MT6L-G43A-D3EE"   // 消息唯一标示 ，消息Id
}

```


## 参考文档

（1）SDK 架构：[http://www.rongcloud.cn/docs/quick_start.html](http://www.rongcloud.cn/docs/quick_start.html)

（2）Web SDK 开发指南：[http://www.rongcloud.cn/docs/web.html](http://www.rongcloud.cn/docs/web.html)

（3）Web SDK API 示例：[http://www.rongcloud.cn/docs/web_api_demo.html](http://www.rongcloud.cn/docs/web_api_demo.html)

（4）Web SDK API 文件：<a href="http://www.rongcloud.cn/docs/api/js/RongIMClient.js.html">http://www.rongcloud.cn/docs/api/js/RongIMClient.js.html

（5）Server 开发指南：[http://www.rongcloud.cn/docs/server.html](http://www.rongcloud.cn/docs/server.html)

（6）聊天插件下载地址：[https://github.com/rongcloud/rongcloud-web-im-widget](https://github.com/rongcloud/rongcloud-web-im-widget)

（7）聊天插件的开发文档：[https://github.com/rongcloud/rongcloud-web-im-widget/blob/master/doc/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md](https://github.com/rongcloud/rongcloud-web-im-widget/blob/master/doc/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md)

（8）Web 端 H5 插件：[https://github.com/rongcloud/rongcloud-web-im-widget-h5](https://github.com/rongcloud/rongcloud-web-im-widget-h5)

（9）WebIM 集成引导：[https://rongcloud.github.io/websdk-demo/integrate/guide.html](https://rongcloud.github.io/websdk-demo/integrate/guide.html)


## 参考 demo 

（1）demo：[https://rongcloud.github.io/websdk-demo/api-test.html](https://rongcloud.github.io/websdk-demo/api-test.html)

（2）消息接收 demo:[https://rongcloud.github.io/websdk-demo/connect-check.html](https://rongcloud.github.io/websdk-demo/connect-check.html)

（3）聊天插件在线 demo：[http://rongcloud.github.io/rongcloud-web-im-widget/demo/](http://rongcloud.github.io/rongcloud-web-im-widget/demo/)

（4）RequireJS 加载 SDK demo: [https://rongcloud.github.io/websdk-demo/require.html](https://rongcloud.github.io/websdk-demo/require.html)


