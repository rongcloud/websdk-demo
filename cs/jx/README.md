# 使用说明
1. 在页面引入以下资源
```
<!-- Web SDK 相关资源 SDK 针对自建客服做出了一些修改 -->
<script src="../RongIMLib-cs.js"></script>
<script src="//cdn.ronghub.com/RongIMVoice-2.2.4.min.js"></script>
<!-- 客服插件样式表和 js 代码 -->
<link rel="stylesheet" href="cs.min.css">
<script src="cs.min.js"></script>

```
2. 初始化客服插件
``` javascript
RCS.init({
    appKey: "x4vkb1qpv6hzk",// 应用 appkey
    token: "xu3bupPl1BfQ6zuh4dt+XgjhgbU7wkXey1sSyxbY7BWzkNfuprj0izKgSClenbiWt6Co1VyMgB0maYIAzQF0S6Ua0Rxnr/45B1H0MUHEn6w=",// 当前游客或登录用户 token
    upload: {
        fileServer: "http://upload.qiniu.com",// 文件服务器地址
        isPrivate: false // 是否是私有云
    },//非必填
    target: document.getElementById("rcs-app"),// 要插入到的页面节点
    customerServiceId: "KEFUxiaoqiaoPrestaShop1"// 通过“客服管理后台 - 坐席管理 - 技能组”，对应为技能组列表中的技能组 ID。
    userIcon: 'http://7xo1cb.com1.z0.glb.clouddn.com/rongcloudkefu2.png',//用户默认头像，在用户没有头像的时候显示
    csIcon: 'http://fsprodrcx.cn.ronghub.com/UQRxDVEHcD6_gHENUQRxDUs9XOZRBH25PGECfjBjFA/base64.png',//客服默认头像，在客服没有头像的时候显示,建议线上地址
    showButton: true,
    //是否需要按钮主动发起，设为false的时候，init()方法直接唤起聊天窗口,需客户自己编写按钮，点击之后调用init(),templates中的button模板不可用;设为true的时候，init()首先唤起客服咨询按钮，点击之后才连接客服，唤起聊天窗口，在进入页面之后就需调用init()方法。此参数是为了方便客户在点击客服按钮后自行获取token，在获取到token之后，执行init()即可。
    connectingCallback: function(){
        console.log('连接中');
    },//连接中的执行的方法，例如显示加载页面,可不传
    connectedCallback: function(){},//连接成功之后的方法，例如关闭加载页面,可不传
    disconnectedCallback: function(){
        alert('连接断开');
    },//断开连接之后的操作,可不传
    extraInfo: {
        "userInfo": {
            "userId": "", 
            "nickName": "", 
            "loginName": "", 
            "name": "", 
            "grade": "", 
            "birthday": "", 
            "age": "", 
            "profession": "", 
            "portraitUrl": "", 
            "province": "", 
            "city": "", 
            "memo": ""
        }, 
        "contactInfo": {
            "mobileNo": "", 
            "email": "", 
            "address": "", 
            "QQ": "", 
            "weibo": "", 
            "weixin": ""
        }, 
        "requestInfo": {
            "page": "", 
            "referrer": "", //为来源渠道号，该值通过“客服后台 - IM 客服管理 - 渠道 - App”渠道号列表中获取。
            "enterUrl": "", 
            "skillId": "", 
            "listUrl": [
            ], 
            "define": "", //自定义信息，如：{carInfo:'宝马车系',userId:'user11',quInfo:'xxx'}
            "productId": ""
        }
    }//客服携带信息
});
```
3.RC:InfoNtf消息里带有user对象，在接通客服坐席后，会收到一条RC:InfoNtf消息，可以进行保存客服信息（头像、名称等）

# 开发说明
## 目录结构说明
- dist 
    发布-合并压缩后的代码
    + cs.html
        示例页面
- templates
    HTML模板

- cs.css  
    样式表
- cs.html  
    开发测试页面
- cs.js  
    客服核心代码
- emoji.js  
    表情库调用封装
- upload.js  
    上传插件
- utils.js  
    工具类

## 合并压缩发布代码
```
安装依赖包
npm install
合并压缩代码
npm run dist
```