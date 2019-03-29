### 集成步骤

### chameleon-tool 基本使用

1. 全局安装 chameleon-tool 构建工具： `npm i -g chameleon-tool`
  
2. 创建项目： `cml init project`

3. 启动项目： `cml dev`

4. 打包： `cml build`

### 引入 web IM SDK 

下载 SDK : `http(s)://cdn.ronghub.com/RongIMLib-2.4.0.min.js` `https://cdn.ronghub.com/protobuf-2.3.4.min.js`


```js
import RongIMLib from '../../assets/js/RongIMLib.min.js'; //在初始化页面引入sdk
import Protobuf from '../../assets/js/protobuf.min.js';
RongIMLib.RongIMClient.init(appkey, null, {
    protobuf: Protobuf
})
```

### 注意事项

1. mac全局安装权限问题：

> `npm WARN checkPermissions Missing write accessto /usr/loacl/lib/node_modules`

解决：`sudo npm i -g chameleon-tool` 在安装命令前加上sudo,输入用户的登陆密码，提升权限进行安装。

> 

详细解决见： `https://yanyinhong.github.io/2017/11/15/Resolve-npm-missing-write-access-problem/`

