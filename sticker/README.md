### 动态表情

>基本概念

`表情包`: 表情包下包含一组表情，可同时存在多个表情包

`表情`: 具体的动态表情，表情一定归属于一个表情包

**兼容性**: IE6+、Chrome、FireFox、Safari、iOS Safari、Android4.0+ 的浏览器

### 引入

```js
// Noraml
<script src="http[s]://cdn.ronghub.com/rong-sticker-1.0.0[.min].js"></script>

// RequieJS
require.config({
  paths: {
    RongSticker: 'http[s]://cdn.ronghub.com/rong-sticker-1.0.0[.min]'
  }
});

require(['RongSticker'], function(RongSticker) {
  // 用法请参考: https://github.com/rongcloud/websdk-demo/sticker/sticker.html
});
```

### 示例

`动态表情`: https://github.com/rongcloud/websdk-demo/sticker/sticker.html

`IM 收发表情`: https://github.com/rongcloud/websdk-demo/sticker/message.html

### 接口

#### 初始化

**API**: `RongSticker.init(config);`

**config 说明**:

| 属性名   | 类型    | 必传 |说明           | 版本   |
| :-----    | :-----  | :----- |:-------------- | :----- |
| appkey      | String | 是 | 应用的唯一标识，创建应用请移步 [开发者后台](https://developer.rongcloud.cn/) | 1.0.0 |
| url  | String | 否| 表情包获取服务地址 | 1.0.0 |
| extensions  | Array | 否|扩展消息包 | 1.0.0 |

**示例**:

```js
var config = {
  appkey: 'appkey'
};
var rongSticker = RongSticker.init(config);
```

**扩展包示例**:

```js
var extensions = [{
  // 表情包 Id
  id: "c60plBGwk2686yv4vmv4H9", 
  name: "嗨宝宝",  
  desc: "融云自制表情嗨宝宝", 
  icon: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/icon_c60plBGwk2686yv4vmv4H9.png", 
  poster: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/cover_c60plBGwk2686yv4vmv4H9.png", 
  order: 1, 
  author: "rongcloud", 
  copyright: "rongcloud",
  // 表情列表
  stickers: [{
    id: "c60plBGwk2686yv4vmv4H9", 
    name: "嗨宝宝",  
    desc: "融云自制表情嗨宝宝", 
    icon: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/icon_c60plBGwk2686yv4vmv4H9.png", 
    poster: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/cover_c60plBGwk2686yv4vmv4H9.png", 
    order: 1, 
    author: "rongcloud", 
    copyright: "rongcloud"
  }]
}];

var config = {
  appkey: 'appkey',
  extensions: extensions
};
var rongSticker = RongSticker.init(config);
```


#### 获取表情包列表

**API**: `Package.getList(callback);`

**参数说明**:

| 属性名   | 类型     | 必传 |说明           | 版本   |
| :-----   | :-----   | :--- |:-------------- | :----- |
| callback| Function| 是 | 回调函数，用来接收数据| 1.0.0 |

**示例**:

```js
var config = {
  appkey: 'appkey'
};
var rongSticker = RongSticker.init(config);
var Package = rongSticker.Package;
Package.getList(function(result, error){
  // result.packages => 表情包列表
  // error => 错误信息，正常返回时 error 为 null
});
```

**packages 结构**:

```js
[
  {
    id: "c60plBGwk2686yv4vmv4H9", 
    name: "嗨宝宝",  
    desc: "融云自制表情嗨宝宝", 
    icon: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/icon_c60plBGwk2686yv4vmv4H9.png", 
    poster: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/cover_c60plBGwk2686yv4vmv4H9.png", 
    order: 1, 
    author: "rongcloud", 
    copyright: "rongcloud"
  }
]
```

#### 获取表情列表

**API**: `Sticker.getList(package, callback);`

**package**:

| 属性名   | 类型     | 必传 | 说明           | 版本   |
| :-----   | :-----   | :----| :-------------- | :----- |
| id      | String  | 是 |表情包 Id | 1.0.0 |

**callback**:

| 属性名   | 类型     | 必传 |说明           | 版本   |
| :-----   | :-----   | :--- | :-------------- | :----- |
| callback| Function| 是 | 回调函数，用来接收数据| 1.0.0 |

**示例**:

```js
var config = {
  appkey: 'appkey'
};
var rongSticker = RongSticker.init(config);
var Sticker = rongSticker.Sticker;

var package = {
  id: 'c60plBGwk2686yv4vmv4H9'
};
Sticker.getList(function(result, error){
  // result.stickers => 表情列表
  // error => 错误信息，正常返回时 error 为 null
});
```

**stickers 结构**:

```js
[
  {
    packageId: "c60plBGwk2686yv4vmv4H9"
    stickerId: "d1PN1xTZ47p9nfMNWfGpyH", 
    desc: "木问题", 
    url: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/image_d1PN1xTZ47p9nfMNWfGpyH.gif", 
    thumbUrl: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/thumb_d1PN1xTZ47p9nfMNWfGpyH.png", 
    height: 240, 
    width: 240, 
    order: 1
  }
]
```
#### 获取表情

**API**: `Sticker.get(stciker, callback);`

**stciker**:

| 属性名     | 类型     |  必传 | 说明           | 版本   |
| :-----     | :-----   | :----- | :-------------- | :----- |
| packageId | String  | 是 | 表情包 Id | 1.0.0 |
| stickerId | String  | 是 | 表情 Id | 1.0.0 |

**callback**:

| 属性名   | 类型     | 必传 |说明           | 版本   |
| :-----   | :-----   | :--- | :-------------- | :----- |
| callback| Function| 是 | 回调函数，用来接收数据| 1.0.0 |

**示例**:

```js
var config = {
  appkey: 'appkey'
};
var rongSticker = RongSticker.init(config);
var Sticker = rongSticker.Sticker;

var sticker = {
  packageId: 'c60plBGwk2686yv4vmv4H9',
  stickerId: 'd1PN1xTZ47p9nfMNWfGpyH'
};
Sticker.get(function(sticker, error){
  // sticker => 表情
  // error => 错误信息，正常返回时 error 为 null
});
```

**sticker 结构**:

```js
{
  packageId: "c60plBGwk2686yv4vmv4H9"
  stickerId: "d1PN1xTZ47p9nfMNWfGpyH", 
  desc: "木问题", 
  url: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/image_d1PN1xTZ47p9nfMNWfGpyH.gif", 
  thumbUrl: "http://sticker.ronghub.com/c60plBGwk2686yv4vmv4H9/thumb_d1PN1xTZ47p9nfMNWfGpyH.png", 
  height: 240, 
  width: 240, 
  order: 1
}
```
