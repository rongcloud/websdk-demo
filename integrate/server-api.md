## Desktop-Client Server API 接口文档

*   [用户模块](#usermodel)
    *   [发送验证码](#usermodel-sendcode)
    *   [校验验证码](#usermodel-verifycode)
    *   [校验手机号是否可用](#usermodel-check_p_available)
    *   [注册](#usermodel-register)
    *   [登录](#usermodel-login)
    *   [退出](#usermodel-logout)
    *   [重置密码](#usermodel-reset-pwd)
    *   [修改密码](#usermodel-change-pwd)
    *   [设置自己的昵称](#usermodel-set-nickname)
    *   [设置自己的头像](#usermodel-set-portrait-uri)
    *   [获取融云 Token ](#usermodel-get-token)
    *   [同步信息](#usermodel-sync-version)
    *   [获取多个用户信息](#usermodel-batch)
    *   [获取单个用户信息](#usermodel-user-id)
    *   [根据手机号找人](#usermodel-find-by-phone)
*   [好友模块](#block)
    *   [请求加好友](#friendmodel-invite)
    *   [同意加好友](#friendmodel-agree)
    *   [忽略加好友](#friendmodel-ignore)
    *   [删除好友](#friendmodel-delete)
    *   [设置好友备注](#friendmodel-set-displayname)
    *   [获取好友列表](#friendmodel-all)
    *   [获取好友信息](#friendmodel-find-id)
*   [群组模块](#groupmodel)
    *   [创建群](#groupmodel-create)
    *   [添加成员](#groupmodel-add)
    *   [加入群组](#groupmodel-join)
    *   [群组踢人](#groupmodel-kick)
    *   [退出群组](#groupmodel-quit)
    *   [解散群组](#groupmodel-dismiss)
    *   [转让管理员](#groupmodel-transfer)
    *   [群组重命名](#groupmodel-rename)
    *   [发布群公告](#groupmodel-notice)
    *   [设置群头像](#groupmodel-portrait)
    *   [设置自己的群昵称](#groupmodel-nickname)
    *   [获取群列表](#groupmodel-all)
    *   [获取单个群信息](#groupmodel-group-id)
    *   [获取群成员](#groupmodel-member)
*   [星标联系人](#starmodel)
    *   [星标联系人列表](#starmodel-all)
    *   [设置星标联系人](#starmodel-star)
    *   [取消星标联系人](#starmodel-unstar)
*   [黑名单](#blacklist)
    *   [黑名单列表](#blacklist-all)
    *   [加入黑名单](#blacklist-join)
    *   [移除黑名单](#blacklist-remove)
*   [组织机构](#department)
    *   [获取部门列表](#department-all)
    *   [获取部门下人员列表](#department-depart-members)
    *   [获取部门信息](#department-info)

<h3 id="usermodel">用户模块</h3>

<h4 id="usermodel-sendcode">发送验证码</h4>

注册、修改密码发送验证码给用户输入的手机号。

生产环境频率限制为 `1` 分钟 `1` 条，开发测试环境中 `5` 秒 `1` 条。

##### 请求：

```js
POST http://api.sealtalk.im/user/send_code HTTP/1.1
Content-Type:application/json
```
<br/>

|参数   | 必传  |类型   | 说明
|:----- |:----- |:------|:---------
|phone  |  YES  |string | 手机号 e.g. 13269772761
|region |  YES  |string | 区域标识 e.g. 86

##### 响应：

```js
// 成功
{ 
    "code" : 200
}

// 失败
{ 
    "code" : 1001
}
```

##### 错误码：

| 错误码| 说明
|:------|:---------
| 1001  | 手机号、区域标识无效
| 1002  | 发送验证平率超限


<h4 id="usermodel-verifycode">校验验证码</h4>

校验用户输入的验证码是否合法。

```js
POST http://api.sealtalk.im/user/verify_code HTTP/1.1
Content-Type:application/json
```
<br/>

|参数   | 必传  |类型   | 说明
|:----- |:----- |:------|:---------
|phone  |  YES  |string | 手机号 e.g. 13269772761
|region |  YES  |string | 区域标识 e.g. 86
|code   |  YES  |string | 验证码 e.g. 8937

##### 响应：

verification_token 是验证秘钥，调用注册接口传回服务端。

```js
// 成功
{ 
    "code" : 200,
    "result" : {
        "verification_token":"5c633e80-c75e-11e6-b33c-f5d29ae4ef33"
    }
}

// 失败
{ 
    "code" : 1001
}

```

##### 错误码：

|错误码 | 说明
|:------|:---------
| 1001  | 手机号没有找到
| 1002  | 验证码无效
| 1003  | 验证码已过期

<h4 id="usermodel-check_p_available">校验手机号是否可用</h4>

检查用户输入的手机号是否可以用（是否为非法有手机号或者已注册）。

```js
POST http://api.sealtalk.im/user/check_phone_available HTTP/1.1
Content-Type:application/json
```
<br/>

|参数   | 必传  |类型   | 说明
|:----- |:----- |:------|:---------
|phone  |  YES  |string | 手机号 e.g. 13269772761
|region |  YES  |string | 区域标识 e.g. 86

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码  | 说明
|:-------|:---------
| 1001   | 手机号已被注册
| 1002   | 手机号、区域标识无效

<h4 id="usermodel-register">注册</h4>

##### 请求：

```js
POST http://api.sealtalk.im/user/register HTTP/1.1
Content-Type:application/json
```
<br/>

|参数               | 必传  |类型   | 说明
|:----------------- |:----- |:------|:---------
|nickname           |  YES  |string | 用户名称
|password           |  YES  |string | 密码
|verification_token |  YES  |string | 验证码秘钥 [校验验证码](#usermodel-verifycode) 接口返回

##### 响应：

```json
// 成功
{
    "code": 200,
    "result": {
    "id": "SjV8zI76D"
    }
}

// 失败
{
    "code": 1001
}

```

失败：

|错误码  | 说明
|:-------|:---------
| 1001   | 密码中包含空格
| 1002   | 用户名长度无效
| 1003   | 密码长度无效
| 1004   | 验证码秘钥无效
| 1005   | 手机号已存在
| 1006   | 未知的验证码

<h4 id="usermodel-login">登录</h4>

##### 请求：

```js
POST http://api.sealtalk.im/user/login HTTP/1.1
Content-Type:application/json
```
<br/>

|参数     | 必传  |类型   | 说明
|:------- |:----- |:------|:---------
|region   |  YES  |string | 区域标识 e.g. 86
|phone    |  YES  |string | 手机号 e.g. 13269772761
|password |  YES  |string | 密码

##### 响应：

```js
/**
 * 成功
 * 当前用户 userId
 * 融云 token ，调用 WebSDK 连接融云服务器方法使用
 */
{
    "code": 200,
    "result": {
        "id": "AUj8X32w1",
        "token": "vCHlXy3FChNg+Zoroy6R3trk7Uncrwg4vvug=="
    }
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:---------
| 1001  | 手机号无效
| 1002  | 手机号或密码错误

<h4 id="usermodel-logout">退出</h4>

##### 请求：

```js
POST http://api.sealtalk.im/user/logout HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
{
    "code": 200
}
```
<h4 id="usermodel-reset-pwd">重置密码</h4>

未登录通过手机号重置密码。

##### 请求：

```js
POST http://api.sealtalk.im/user/reset_password HTTP/1.1
Content-Type:application/json
```
<br/>

|参数               | 必传  |类型   | 说明
|:----------------- |:----- |:------|:---------
|password           |  YES  |string | 密码
|verification_token |  YES  |string | 验证码秘钥 [校验验证码](#usermodel-verifycode) 接口返回

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码 | 说明
|:------|:---------
| 1001  | 密码不能包含空格
| 1002  | 密码长度不正确
| 1003  | 验证码秘钥不正确

<h4 id="usermodel-change-pwd">修改密码</h4>

已登录通过旧密码修改密码。

##### 请求：

```js
POST http://api.sealtalk.im/user/change_password HTTP/1.1
Content-Type:application/json
```
<br/>

|参数        | 必传  |类型   | 说明
|:-----------|:----- |:------|:---------
|newPassword |  YES  |string | 新密码
|oldPassword |  YES  |string | 旧密码

##### 响应：

```js
// 成功：
{
    "code": 200
}

// 失败：
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:---------
| 1001  | 新密码不能包含空格
| 1002  | 密码长度不正确
| 1003  | 旧密码不正确

<h4 id="usermodel-set-nickname">设置自己的昵称</h4>

##### 请求：

```js
POST http://api.sealtalk.im/user/set_nickname HTTP/1.1
Content-Type:application/json
```
<br/>

|参数     | 必传  |类型   | 说明
|:--------|:----- |:------|:---------
|nickname |  YES  |string | 用户昵称

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码 | 说明
|:------|:---------
| 1001  | 用户昵称长度不正确

<h4 id="usermodel-set-portrait-uri">设置自己的头像</h4>

##### 请求：

```js
POST http://api.sealtalk.im/user/set_portrait_uri HTTP/1.1
Content-Type:application/json
```
<br/>

|参数        | 必传  |类型   | 说明
|:-----------|:----- |:------|:---------
|portraitUri |  YES  |string | 用户头像

##### 响应：

```json
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码:

|错误码 | 说明
|:------|:---------
| 1001  | 头像长度不正确

<h4 id="usermodel-get-token">获取融云 Token</h4>

需要重新获取融云 Token 时使用，用户登录成功后会返回当前用户可用的 Token，无需调用此方法

##### 请求：

```js
GET http://api.sealtalk.im/user/get_token HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": {
        "userId": "Sxsndk10d",
        "token": "pioepssdoecvnfdk\daaa=="
    }
}
```

<h4 id="usermodel-sync-version">同步信息</h4>

同步用户的好友、黑名单、群组、群组成员数据，调用时机：客户端打开时。

##### 请求：

```js
GET http://api.sealtalk.im/user/sync/:version HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|version |  YES  |integer| 同步版本号

##### 响应：

```js
// 成功
//TODO 成功 JOSN

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码 | 说明
|:------|:---------
| 1001  | version 不是数值类型

<h4 id="usermodel-batch">获取多个用户信息</h4>

##### 请求：

```js
GET http://api.sealtalk.im/user/batch HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|ids     |  YES  |arrya  | 用户 id 数组

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": [
        {
            "id": "675NdFjkx",
            "nickname": "Martin",
            "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/675NdFjkx1466733699776768066"
        }
    ]
}

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码 | 说明
|:------|:---------
| 1001  | 批量获取用户失败

<h4 id="usermodel-user-id">获取单个用户信息</h4>

##### 请求：

```js
GET http://api.sealtalk.im/user/:id HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": {
        "id": "OIBbeKlkx",
        "nickname": "Martin",
        "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/u0LUuhzHm1466557920584458984",
        "phone": "13269772769"
    }
}

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码 | 说明
|:------|:---------
| 1001  | 用户不存在

<h4 id="usermodel-find-by-phone">根据手机号找人</h4>

#### 请求：

```js
GET http://api.sealtalk.im/user/find/:region/:phone HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": {
        "id": "u0LUuhzHm",
        "nickname": "Martin",
        "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/u0LUuhzHm1466557920584458984"
    }
}

// 失败
{
    "code": 1001
}
```
##### 错误码：

|错误码 | 说明
|:------|:--------
| 1001  | 用户不存在

<h3 id="friendmodel">好友模块</h3>

<h4 id="friendmodel-invite">请求加好友</h4>

##### 请求：

```js
POST http://api.sealtalk.im/friend/invite HTTP/1.1
Content-Type:application/json
```
<br/>

|参数     | 必传  |类型   | 说明
|:--------|:----- |:------|:---------
|friendId | YES   |string | 好友 Id

##### 响应：

```js
/**
 * 成功
 * action.Added : 添加成功
 * action.Sent : 已经发送
 */
{
    "code": 200,
    "result": {
        "action": "Added"
    }
}

// 失败
{
    "code": 1001
}
```

##### 错误码：

|错误码 | 说明
|:------|:--------
| 1001  |已经是好友

<h4 id="friendmodel-agree">同意加好友</h4>

##### 请求：

```js
POST http://api.sealtalk.im/friend/agree HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|friendId | YES   |string | 好友 Id

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  |没有收到加好友请求

<h4 id="friendmodel-ignore">忽略加好友</h4>

##### 请求：

```js
POST http://api.sealtalk.im/friend/ignore HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|friendId| YES   |string | 好友 Id

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  |没有收到加好友请求

<h4 id="friendmodel-delete">删除好友</h4>

##### 请求：

```js
POST http://api.sealtalk.im/friend/delete HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|friendId| YES   |string | 好友 Id

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  |不是好友关系

<h4 id="friendmodel-set-displayname">设置好友备注</h4>

##### 请求：

```js
POST http://api.sealtalk.im/friend/set_display_name HTTP/1.1
Content-Type:application/json
```
<br/>

|参数       | 必传  |类型   | 说明
|:----------|:----- |:------|:---------
|friendId   | YES   |string | 好友 Id
|displayName| YES   |string | 备注名

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  |不是好友关系

<h4 id="friendmodel-all">获取好友列表</h4>

##### 请求：

```js
GET http://api.sealtalk.im/friend/all HTTP/1.1
Content-Type:application/json
```
##### 响应：

```js
/**
 * status 说明：
 * status == 10 ：正在请求加好友
 * status == 11 ：已经发起过加好友请求
 * status == 20 ：已经是好友
 * status == 21 ：忽略好友请求
 * status == 30 ：好友已删除
 */
{
    "code": 200,
    "result": [
        {
            "displayName": "备注名称",
            "message": "加好友时的描述信息",
            "status": 20,
            "updatedAt": "2016-11-25T06:48:36.000Z",
            "user": {
                "id": "OIBbeKlkx",
                "nickname": "Martin",
                "region": "86",
                "phone": "13269772769",
                "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/u0LUuhzHm1466557920584458984"
            }
        }
    ]
}

```

<h4 id="friendmodel-find-id">获取好友信息</h4>

##### 请求：

```js
GET http://api.sealtalk.im/friend/:friendId/profile HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|friendId| YES   |string | 好友 Id

##### 响应：

```js
/**
 * 成功
 * status 说明：
 * status == 10 ：正在请求加好友
 * status == 11 ：已经发起过加好友请求
 * status == 20 ：已经是好友
 * status == 21 ：忽略好友请求
 * status == 30 ：好友已删除
 */
{
    "code": 200,
    "result": {
        "displayName": "备注名称",
        "message": "加好友时的描述信息",
        "status": 20,
        "updatedAt": "2016-11-25T06:48:36.000Z",
        "user": {
            "id": "OIBbeKlkx",
            "nickname": "Martin",
            "region": "86",
            "phone": "13269772769",
            "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/u0LUuhzHm1466557920584458984"
        }
    }
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  |传入的 friendId 与当前用户不是好友关系

<h3 id="groupmodel">群组模块</h3>

<h4 id="groupmodel-create">创建群</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/create HTTP/1.1
Content-Type:application/json
```
<br/>

|参数     | 必传  |类型   | 说明
|:------- |:----- |:------|:---------
|name     | YES   |string | 群组名称
|memberIds| YES   |array  | 群成员 Id 数组

##### 响应：

```js
// 成功
{
    "code": 200,
    "result":{
        "id":"Ixhfkd2ld"
    }
}

// 失败

{
    "code": 1001
}

```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群名称长度超限制
| 1002  | 群成员人数必须大于 1 人
| 1003  | 群成员人数超过群总人数限制
| 1004  | 当前用户创建群个数超限

<h4 id="groupmodel-add">添加成员</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/add HTTP/1.1
Content-Type:application/json
```
<br/>

|参数     | 必传  |类型   | 说明
|:------- |:----- |:------|:---------
|groupId  | YES   |string | 群 Id
|memberIds| YES   |array  | 群成员 Id 数组

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群组不存在
| 1002  | 群成员人数超过群总人数限制

<h4 id="groupmodel-join">加入群组</h4>

##### 请求：

```js
POST http://api.sealtalk.im/create/join HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId  | YES   |string | 群 Id

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群组不存在
| 1002  | 群成员人数超过群总人数限制

<h4 id="groupmodel-kick">群组踢人</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/kick HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId  | YES   |string | 群 Id
|memberIds| YES   |array  | 群成员 Id 数组

##### 响应：

```js
// 成功
{
    "code": 200
}

// 失败
{
    "code": 1001
}

```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群组不存在
| 1002  | 不能踢出自己
| 1003  | 当前用户不是群主

<h4 id="groupmodel-quit">退出群组</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/quit HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id

##### 响应：

```js
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群组不存在
| 1002  | 当前用户不在群中

<h4 id="groupmodel-dismiss">解散群组</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/dismiss HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id

##### 响应：

```js
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 当前用户不是群主

<h4 id="groupmodel-transfer">转让管理员</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/transfer HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id
|userId  | YES   |string | 新的群主 Id

##### 响应：

```js
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 当前用户不是群主
| 1002  | 新群主不在群中

<h4 id="groupmodel-rename">群组重命名</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/rename HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id
|name    | YES   |string | 群名称

##### 响应：

```js
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群名称长度超限
| 1002  | 当前用户不是群主

<h4 id="groupmodel-notice">发布群公告</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/set_bulletin HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id
|bulletin| YES   |string | 公告内容

##### 响应：

```js
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 公告长度超限
| 1002  | 当前用户不是群主

<h4 id="groupmodel-portrait">设置群头像</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/set_portrait_uri HTTP/1.1
Content-Type:application/json
```
<br/>

|参数       | 必传  |类型   | 说明
|:-------   |:----- |:------|:---------
|groupId    | YES   |string | 群 Id
|portraitUri| YES   |string | 头像地址

##### 响应：

```js
{
    "code": 200
}

// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 头像地址不正确
| 1002  | 头像长度超限
| 1003  | 当前用户不是群主

<h4 id="groupmodel-nickname">设置自己的群昵称</h4>

##### 请求：

```js
POST http://api.sealtalk.im/group/set_display_name HTTP/1.1
Content-Type:application/json
```
<br/>

|参数       | 必传  |类型   | 说明
|:----------|:----- |:------|:---------
|groupId    | YES   |string | 群 Id
|displayName| YES   |string | 自己的群昵称

##### 响应：

```js
// 成功
{
    "code":200
}

// 失败
{
    "code":1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 名字长度超限
| 1002  | 群组不存在

<h4 id="groupmodel-all">获取群列表</h4>

##### 请求：

```js
GET http://api.sealtalk.im/group/groups HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
{
    "code": 200,
    "result": [
        {
            "role": 1,
            "group": {
                "id": "群 Id",
                "name": "群名称",
                "portraitUri": "群头像",
                "creatorId": "群主 Id",
                "memberCount": "已加群人数",
                "maxMemberCount": "群人数上限"
            }
        },
        {
            "role": 1,
            "group": {
                "id": "D6Vh5Iga7W",
                "name": "RongCloud",
                "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/FliXi6zl_U3YJF6K1DkZsY51trWw",
                "creatorId": "Tp9mLyUKX",
                "memberCount": 98,
                "maxMemberCount": 500
            }
        }
    ]
}

```

<h4 id="groupmodel-group-id">获取单个群信息</h4>

##### 请求：

```js
GET http://api.sealtalk.im/group/:id HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id

##### 响应：

```js
// TODO 群公告
{
    "code": 200,
    "result": {
        "id": "群 Id",
        "name": "群名称",
        "portraitUri": "群头像",
        "memberCount": "已加群人数",
        "maxMemberCount": "群人数上限",
        "creatorId": "群主 Id",
        "bulletin": "公告",
        "deletedAt": "解散日期"
    }
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群组不存在

<h4 id="groupmodel-member">获取群成员</h4>

##### 请求：

```js
GET http://api.sealtalk.im/group/:id/members HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|groupId | YES   |string | 群 Id

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": [
        {
            "displayName": "",
            "role": "1 是群成员, 0 群主",
            "createdAt": "2016-12-08T10:14:42.000Z",
            "updatedAt": "2016-12-08T10:14:42.000Z",
            "user": {
                "id": "用户 Id",
                "nickname": "名称",
                "portraitUri": "头像"
            }
        },
        {
            "displayName": "",
            "role": 0,
            "createdAt": "2016-12-08T05:51:57.000Z",
            "updatedAt": "2016-12-08T05:51:57.000Z",
            "user": {
                "id": "u0LUhzdHm",
                "nickname": "Martin",
                "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/FpUeAftgRyYJasAm_Y1HJpmXlM9h"
            }
        }
    ]
}

// 失败
{
    "code":1001
}

```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 群组不存在
| 1002  | 当前用户不在群中

<h3 id="starmodel">星标联系人</h3>

<h4 id="starmodel-all">星标联系人列表</h4>

##### 请求：

```js
GET http://api.sealtalk.im/star/starlist HTTP/1.1
Content-Type:application/json
```
##### 响应：

```js
{
    "code": 200,
    "result": [
        {
            "star": true,
            "user": {
                "id": "OIBbe90kx",
                "nickname": "Martin",
                "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/u0LUuhzHm1466557920584458984",
                "region": "86",
                "phone": "13269772769",
                "email": ""
            }
        }
    ]
}
```

<h4 id="starmodel-star">设置星标联系人</h4>

##### 请求：

```js
POST http://api.sealtalk.im/star/star HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|targetId| YES   |string | 用户 Id

##### 响应：

```js
// 成功
{
    "code":200
}

// 失败
{
    "code":1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | targetId 无效

<h4 id="starmodel-unstar">取消星标联系人</h4>

##### 请求：

```js
POST http://api.sealtalk.im/star/unstar HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|targetId| YES   |string | 用户 Id

##### 响应：

```js
// 成功
{
    "code":200
}

// 失败
{
    "code":1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | targetId 无效

<h3 id="blacklist">黑名单</h3>

<h4 id="blacklist-all">黑名单列表</h4>

##### 请求：

```js
GET http://api.sealtalk.im/blacklist/all HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
{
    "code": 200,
    "result": [
        {
            "user": {
                "id": "675NfFjkx",
                "nickname": "Martin",
                "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/675NdFjkx1466733699776768066",
                "updatedAt": "2016-11-29T06:28:23.000Z"
            }
        }
    ]
}

```

<h4 id="blacklist-join">加入黑名单</h4>

##### 请求：

```js
POST http://api.sealtalk.im/blacklist/add HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|friendId| YES   |string | 好友 Id

##### 响应：

```js
// 成功
{
    "code":200
}

// 失败
{
    "code":1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 好友不存在

<h4 id="blacklist-remove">移除黑名单</h4>

##### 请求：

```js
POST http://api.sealtalk.im/blacklist/remove HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|friendId| YES   |string | 好友 Id

##### 响应：

```js
// 成功
{
    "code":200
}

// 失败
{
    "code":1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 好友不存在

<h3 id="department">组织机构</h3>

<h4 id="department-all">获取部门列表</h4>

##### 请求：

```js
GET http://api.sealtalk.im/dept/all HTTP/1.1
Content-Type:application/json
```

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": [
        {
            "id": "部门 Id",
            "deptName": "部门名称",
            "sort": "排序规则",
            "timestamp": 1477965673928,
            "parentId": 0
        }
    ]
}
// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 当前用户不在组织机构内

<h4 id="department-depart-members">获取部门下人员列表</h4>

##### 请求：

```js
GET http://api.sealtalk.im/dept/:deptId/members HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|deptId  | YES   |string | 部门 Id

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": [
        {
            "deptId": "部门 Id",
            "userId": "成员 Id",
            "displayName": "成员名称",
            "managerId": "上级成员 Id",
            "timestamp": 1478137573919,
            "user": {
                "id": "成员 Id",
                "nickname": "成员名称",
                "portraitUri": "http://7xogjk.com1.z0.glb.clouddn.com/675NdFjkx1466733699776768066",
                "region": "86",
                "phone": "13269772769",
                "email": ""
            },
            "duty": {
                "dutyName": "职位名称"
            }
        }
    ]
}
// 失败
{
    "code": 1001
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 当前用户不在组织机构内

<h4 id="department-info">获取部门信息</h4>

##### 请求：

```js
GET http://api.sealtalk.im/dept/:deptId HTTP/1.1
Content-Type:application/json
```
<br/>

|参数    | 必传  |类型   | 说明
|:-------|:----- |:------|:---------
|deptId  | YES   |string | 部门 Id

##### 响应：

```js
// 成功
{
    "code": 200,
    "result": {
        "id": "部门 Id",
        "deptName": "部门名称",
        "sort": "排序规则",
        "timestamp": 1477965673928,
        "parentId": "上级部门 Id"
    }
}

// 失败
{
    "code": 1001,
}
```

##### 错误码

|错误码 | 说明
|:------|:--------
| 1001  | 当前用户不在组织机构内