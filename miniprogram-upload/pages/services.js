const RongIMLib = require('./lib/RongIMLib-3.0.4-dev.js');

const user = {
  appkey: '8luwapkv847cl',
  token: 'he3YikQuzZSLFeN4I19auTEWhHbheoXkUYOiZGgipDk=@aa8f.cn.rongnav.com;aa8f.cn.rongcfg.com',
  qiniuHost: 'https://upload.qiniup1.com'
}

let imInstance = null;

let connect = function(){
  imInstance = RongIMLib.init(user);
  imInstance.watch({
    status: function ({ status }) {
      console.log(status);
    },
    message: function ({ message  }) {
      console.log(message);
    }
  });
  imInstance.connect(user).then(user => {
    console.log(user)
  })
}

let Status = {
  connect: connect
}

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

const upload = (fileInfo, uploadType) => {
  let fileType = uploadType || RongIMLib.FILE_TYPE.FILE;
  let fileName = fileInfo.name || '';
  return imInstance.getFileToken(fileType, fileName).then(result => {
    let { token, bosToken, bosDate, bos, path } = result;
    let bosHeaders = {
      'authorization': bosToken,
      'x-bce-date': bosDate,
      'Content-Type': 'multipart/form-data',
    }
    let bosUploadUrl = bos + path;
    return uploadQiNiu(fileInfo, token, bosHeaders, bosUploadUrl);
  }).then(res => {
    let qiniuHash, qiniuName;
    if(!res.isBosRes){
      const { data } = res;
      const { hash, name } = JSON.parse(data);
      qiniuHash = hash, qiniuName = name;
    }
    return imInstance.getFileUrl(fileType, qiniuHash, qiniuName, res);
  })
}

const File = {
  upload: upload
}

module.exports = {
  Status: Status,
  File: File
}