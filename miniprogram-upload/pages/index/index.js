//index.js
//获取应用实例
const app = getApp()
const { Status, File } = require('../services');

Page({
  data: {
    title: 'IM Upload Demo',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log(Status);
    Status.connect();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  upload: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let { tempFilePaths, tempFiles } = res;
        let tempFilePath = tempFilePaths[0];
        console.log('tempFiles',tempFiles);
        File.upload({
          path: tempFilePath,
          name: 'image.png'
        }, 1).then(res => {
          console.log('可下载地址:', res.downloadUrl);
        });
      }
    });
    
  },
  uploadFile: function() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: function(res) {
        console.log(res);
        let { tempFiles } = res;
        File.upload(tempFiles[0], 4).then(res => {
          console.log('可下载地址:', res.downloadUrl);
        });;
      }
    })
  }
})
