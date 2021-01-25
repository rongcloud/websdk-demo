## 实现功能
Demo 中实现了集成 2.x SDK 实现聊天室功能，实现聊天室内发送消息，点赞等功能。

## Demo 启动
可使用 nginx 代理静态页面。

**访问地址**

http://localhost:8080/test/chatroom-demo/demo.html?id=11

http://localhost:8080/test/chatroom-demo/demo.html?id=22

## Demo 数据修改说明

Demo 使用了假数据进行测试，Demo 访问前需要您替换成您的相关信息。

操作文件：mock.js
修改位置如下：
```js
const appInfo = {
  "appKey": "",
  "22": "",
  "11": ""
};
```
