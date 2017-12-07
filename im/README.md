# 开发说明

## 注意事项
- 在线预览地址 https://rongcloud.github.io/websdk-demo/im/im.html
- 本地开发调试必须在 http(s):// 协议下运行

## 目录结构说明
- dist 
    发布-合并压缩后的代码
    
- templates
    HTML模板

- im.css  
    样式表
- im.html  
    开发测试页面
- im.js  
    im核心代码
- emoji.js  
    表情库调用封装
- libs/qiniu-upload.js  
    上传插件
- libs/utils.js  
    工具类

## 合并压缩发布代码
```
安装依赖包
npm install

合并压缩代码
grunt dist
```

## 参考文档
- 用户数据处理 http://support.rongcloud.cn/kb/NjQ5
- 消息状态 http://support.rongcloud.cn/kb/NjMz
- 集成指南 https://rongcloud.github.io/websdk-demo/integrate/guide.html
- 其他 demo https://github.com/rongcloud/websdk-demo