# CallLib IE Web

### 使用说明

1、CallLib IE 接口与 CallLib Web 一致, 可参考[文档](http://127.0.0.1:8000/rtc/calllib/web/summary)

2、CallLib Demo 的运行方法, 可参考[教程](https://tutorials.rongcloud.cn/tutorial/web-calllib-demo#0)

3、IE 插件不强制要求站点为 https

4、IE CallLib 界面需通过 object 标签渲染, 具体见[插件使用](https://docs.rongcloud.cn/rtc/rtclib/ie/plugin)

5、使用 IE CallLib 需要在 init 时传入 engineId 参数

示例:

```js
var config = {
  RongIMLib: RongIMLib,
  RongRTC: RongRTC,
  currentUserId: 'userId',
  engineId: 'RTCEngine' // engineId 为 object 标签 id
};
var callLib = RongCallLib.init(config);
```

6、IE CallLib 不需要监听 videoWatch, 界面由 object 自动渲染
