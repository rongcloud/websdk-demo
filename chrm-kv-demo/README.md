### 聊天室自定义属性 Demo

#### Demo 作用

1. 验证自定义属性功能是否可用
2. 提供接口直接接口调用, 方便开发者调试

`注:` 若需实现复杂业务逻辑, 开发者可根据以下文档集成

文档: [https://docs.rongcloud.cn/im/imlib/web/chatroom/](https://docs.rongcloud.cn/im/imlib/web/chatroom/)

#### 快速运行

1、配置信息

`位置:` setting.js

```js
window.setting = {
  appkey: 'appkey', // 开发者获取的融云 AppKey
  userList: [
    {
      token: 'user1 token' // 第一个登陆用户的 token
    },
    {
      token: 'user2 token' // 第二个登陆用户的 token
    },
    {
      token: 'user3 token' // 第三个登陆用户的 token
    }
  ],
  chatRoomIdList: [
    'kvchatroom1', // 聊天室 1 的 id
    'kvchatroom2' // 聊天室 2 的 id
  ]
};
```

2、页面运行

`页面:` index.html

通过此页面, 可登陆三个用户(可开启多 tab 页测试)

`用户 1:` localhost/websdk-demo/chrm-kv-demo/?0

`用户 2:` localhost/websdk-demo/chrm-kv-demo/?1

`用户 3:` localhost/websdk-demo/chrm-kv-demo/?2

`注:` 建议使用 [nginx](http://nginx.org/en/download.html) 或 [Node.js puer](https://www.npmjs.com/package/puer) 启动页面