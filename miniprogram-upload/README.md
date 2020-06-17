## 小程序 IM 上传文件 Demo

### 目录说明

upload-miniprogram
├── pages
│   ├── index 
│   │   ├── index.wxml 上传页面
│   │   ├── index.js   上传逻辑
│   ├── lib 依赖库
│   │   ├── RongIMLib-3.0.4-dev.js 融云小程序 SDK
│   └── services.js 服务层，连接IM、上传模块封装


### 上传模块说明

**注意：IM 下 getFileToken、 getFileUrl 必须在连接成功后调用**

融云小程序提供两种上传服务，上传七牛云，若上传七牛云失败降级上传到百度 BOS
1、上传使用小程序 SDK 的 `getFileToken` 方法获取上传认证信息， 使用 `getFileUrl` 获取上传成功后的可访问地址
2、上传接口使用微信官方接口 `wx.uploadFile` 和 `wx.request` 方法

```js
/**
* 上传百度 BOS
*/
const uploadBos = (url, fileInfo, header) => {
  return new Promise((resolve, reject) => {
    const fileData = wx.getFileSystemManager().readFileSync(fileInfo.path);
    wx.request({
      url: url,
      header: header,
      method: 'POST',
      data: fileData,
      success: function(res) {
        console.log(res);
        let data = {
          downloadUrl: url, //上传成功的 url 即为下载 url
          isBosRes: true // 判断是否是百度返回
        }
        resolve(data);
      },
      fail: reject
    });
  });
}

/**
* 上传七牛云
*/
const uploadQiNiu = (fileInfo, token, bosHeaders, bosUrl) => {
  const url = user.qiniuHost;
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: fileInfo.path,
      name: 'file',
      formData: {
        token: token
      },
      success: resolve,
      fail: function(err){
        console.log('upload qiniu failed', err);
        uploadBos(bosUrl, fileInfo, bosHeaders).then(function(res) {
          resolve(res);
        },function(err) {
          reject(err);
        });
      }
    })
  });
};

/**
* 上传
*/
const upload = (fileInfo, uploadType) => {
  let fileType = uploadType || RongIMLib.FILE_TYPE.FILE;
  let fileName = fileInfo.name || '';
  /**
   * 获取 七牛、百度 上传认证信息
  */
  return imInstance.getFileToken(fileType, fileName).then(result => {
    /**
     * token 七牛认证信息
     * bosToken 百度上传认证 authorization 请求头
     * bosDate 百度上传 x-bce-date 请求头
     * bos 百度上传域名
     * path 百度上传l路径
    */
    let { token, bosToken, bosDate, bos, path } = result;
    let bosHeaders = {
      'authorization': bosToken,
      'x-bce-date': bosDate,
      'Content-Type': 'multipart/form-data',
    }
    const bosUploadUrl = bos + path;
    return uploadQiNiu(fileInfo, token, bosHeaders, bosUploadUrl);
  }).then(res => {
    let qiniuHash, qiniuName;
    /**
     * isBosRes: 是否是百度返回结果，不是百度返回结果需传入返回的 hash、name
    */
    if(!res.isBosRes){
      const { data } = res;
      const { hash, name } = JSON.parse(data);
      qiniuHash = hash, qiniuName = name;
    }
    return imInstance.getFileUrl(fileType, qiniuHash, qiniuName, res);
  })
}
```