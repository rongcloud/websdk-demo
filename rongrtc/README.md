### 调试说明

#### 配置

填写 mock.js 配置文件

```js
var App = {
  appkey: 'appkey',
  users: [
    {
      token: 'token1'
    },
    {
      token: 'token2'
    }
  ]
};
```

#### 启动

1、本地启动页面 http://localhost/xxx/api/api.html?0

2、本地启动页面 http://localhost/xxx/api/api.html?1

3、两个页面输入相同的房间号, 进入加入房间

4、可查看双方视频流

#### 注意事项

1、必须为 HTTPS 站点或 localhost, 端口不限

2、appkey 必须开通音视频服务