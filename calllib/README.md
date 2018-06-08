### 文档

开通音视频服务，请参考 [音视频开通指南](http://www.rongcloud.cn/docs/call.html#open)

CallLib [开发指南](http://www.rongcloud.cn/docs/web_calllib.html#CallLibInit)

### 示例说明

1、HTTPS 站点或 localhost, 端口不限

2、配置 `private.html` 、`group.html` 页面中的用户信息 <span style="color: red;">至少配置 2 个 用户</span>

`private.html`:

```js
var config = {
  // 融云开发者后台创建应用获取 http://developer.rongcloud.cn/
  appKey: 'appkey',
  users: [{
    // 用户 Id
    id: "XDov3Ln7p",
    /*
      用户 Token 
      Server API：http://www.rongcloud.cn/docs/server.html#user_get_token
      Server SDK：http://rongcloud.github.io/server-sdk-nodejs/docs/v1/user/user.html#register
    */ 
    token: "48WQuGNh7065SB3WVJYnt6+YsUIoF3ojin3K2sssIg+8Ph5+QmAtoP6tdpZUyLdaH"
  }, {
    id: "Qlyvf1BdT",
    token: "KM7HOjWA2JPghgUJSvFUkcjRgiV1+NBKF4hsSSFA/joNtsdS1YEkeV2IKH+AY1qZPXnLINfK"
  }]
};
```

`group.html`:

```js
var config = {
  // 融云开发者后台创建应用获取 http://developer.rongcloud.cn/
  appKey: 'appkey',
  groupId: '群组 Id',
  members: [{
    id: "XDov3Ln7p",
    /*
      用户 Token 
      Server API：http://www.rongcloud.cn/docs/server.html#user_get_token
      Server SDK：http://rongcloud.github.io/server-sdk-nodejs/docs/v1/user/user.html#register
    */ 
    token: "48WQuGNojin3K277sfOlwuO8bLvftw4xaa/DrZEyJMsLZ9PPIg+8Ph5+QmAtoP6tdpZUyLdaH"
  }, {
    id: "Qlyvf1BdT",
    token: "KM7HOjWA2JPgasdfrUJSvFUkcjRgiV1+NBKF4hsSSFA/joNtsdS1YEkeV2IKH+AY1qZPXnLINfK"
  }, {
    id: "OasdgfrU",
    token: "KM7HfOasdgfrUJSvFUkcjRgiV1+KH+AY1qZPXnLINfK"
  }]
};
```

3、访问地址:

>一对一视频通话

用户 XDov3Ln7p: `https://域名/private.html?0`

用户 Qlyvf1BdT: `https://域名/private.html?1`

>多人视频通话

用户 XDov3Ln7p: `https://域名/private.html?0`

用户 Qlyvf1BdT: `https://域名/private.html?1`

用户 OasdgfrU: `https://域名/private.html?2`


