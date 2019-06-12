var RCConf = {
  navs: {
    id: 'web-navi',
    name: '前端导航',
    icon: '',
    children: [
      {
        id: 'docs-nav',
        name: '文档地址',
        icon: 'icon-yindao',
        children: []
      },
      {
        id: 'sdk-require',
        name: '引入示例',
        icon: 'icon-shilidaima',
        children: []
      },
      {
        id: 'sdk-api',
        name: '接口示例',
        icon: 'icon-shilidaima',
        children: []
      },
      {
        id: 'extensions',
        name: '扩展组件',
        icon: 'icon-kuozhan',
        children: []
      },
      {
        id: 'solution',
        name: '解决方案',
        icon: 'icon-solution',
        children: []
      },
      {
        id: 'integrate',
        name: '项目集成',
        icon: 'icon-integrate',
        children: []
      },
      {
        id: 'open-source',
        name: '开源项目',
        icon: 'icon-open-source',
        children: []
      }
    ],
  },
  navi_items: [
    {
      id: 'docs-nav',
      name: '文档地址',
      children: [
        {
          name: 'IM SDK 集成指南',
          icon: './res/im-sdk.png',
          linkUrl: 'https://www.rongcloud.cn/docs/web.html',
          detail: '包含 Web IM SDK API、兼容性说明及简要集成步骤',
        },
        {
          name: 'RTC SDK 集成指南',
          icon: './res/rtc.png',
          linkUrl: 'https://www.rongcloud.cn/docs/web_rtclib.html',
          detail: '包含 Web RTC SDK API 说明、架构介绍，集成 RTC SDK 必读指南',
        },
        {
          name: 'CallLib 集成指南',
          icon: './res/calllib.png',
          linkUrl: 'https://www.rongcloud.cn/docs/web_calllib.html',
          detail: '包含音视频通话呼叫流程、API 说明，集成 CallLib 必读指南',
        }
      ],
    },
    {
      id: 'sdk-require',
      name: '引入示例',
      children: [{
        name: 'IM + Vue (Normal)',
        icon: './res/vue.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/vue/normal.html',
        detail: 'IM SDK 配合 Vue，以 script 标签引入 vue.js 示例',
      },{
        name: 'IM + Vue (RequireJS)',
        icon: './res/vue.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/vue/require.html',
        detail: '通过 RequireJS 加载 IM SDK、Vue 示例',
      },{
        name: 'IM 示例 (SeaJS)',
        icon: './res/seajs.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/seajs.html',
        detail: '通过 SeaJS 加载 IM SDK 示例',
      },{
        name: 'IM SDK 示例 (RequireJS)',
        icon: './res/requirejs.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/require.html',
        detail: '在浏览器中使用 RequreJS 加载 JavaScript',
      },{
        name: 'IM + React',
        icon: './res/reactjs.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/react/im.html',
        detail: '基于 ReactJS + IM SDK 的示例',
      },{
        name: 'IM SDK Electron Vue',
        icon: './res/electron.png',
        linkUrl: 'https://github.com/rongcloud/websdk-demo/tree/master/electron-vue',
        detail: '在 Electron Vue 中使用 IM SDK 示例',
      },{
        name: 'Normal SDK in Electron',
        icon: './res/electron.png',
        linkUrl: 'https://github.com/rongcloud/websdk-demo/tree/master/electron/normal.html',
        detail: '在 Electron 中使用 script 标签引入 SDK，并连接成功',
      },{
        name: 'Require SDK in Electron',
        icon: './res/electron.png',
        linkUrl: 'https://github.com/rongcloud/websdk-demo/tree/master/electron/requirejs-in-node.html',
        detail: '在 Electron 中使用 RequireJS 加载 IM SDK',
      }]
    },
    {
      id: 'sdk-api',
      name: '接口示例',
      children: [{
        name: 'IM SDK API',
        icon: './res/api.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/api-test.html',
        detail: 'IM SDK 所有暴露 API 示例'
      },        {
        name: '获取历史消息',
        icon: './res/message.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/histroy-messages.html',
        detail: '获取历史消息接口说明及示例',
      },{
        name: '消息监听',
        icon: './res/js.png',
        linkUrl: 'https://github.com/rongcloud/websdk-demo/tree/master/local-sdks',
        detail: '包含从初始化至接收消息示例',
      },{
        name: '消息监听回调队列',
        icon: './res/que.png',
        linkUrl: 'https://rongcloud.github.io/websdk-demo/init-muti.html',
        detail: '消息监听回调队列',
      }]
    },
    // 扩展组件 Component
    {
      id: 'extensions',
      name: '扩展组件',
      children: [
        {
          name: '表情插件',
          icon: './res/emoji.png',
          linkUrl: 'https://rongcloud.github.io/websdk-demo/emoji.html',
          detail: '支持 128 个 Emoji 表情并且支持自定义扩展',
        },
        {
          name: '声音插件',
          icon: './res/voice.png',
          linkUrl: 'https://rongcloud.github.io/websdk-demo/voice.html',
          detail: 'Web 端播放移动端语音消息插件（VoiceMessage）',
        },
        {
          name: '上传插件',
          icon: './res/upload.png',
          linkUrl: 'https://github.com/rongcloud/rongcloud-web-im-upload',
          detail: '支持上传至七牛、阿里、腾讯、融云文件服务器',
        },
      ]
    },
    {
      id: 'solution',
      name: '解决方案',
      children: [{
        name: '小程序解决方案',
        icon: './res/mini.png',
        linkUrl: 'https://www.rongcloud.cn/docs/mini_program.html',
        detail: '面向各厂商小程序（微信、今日头条、支付宝 、百度）的 IM SDK',
      },
      {
        name: '桌面版决方案',
        icon: './res/desktop.png',
        linkUrl: 'https://www.rongcloud.cn/docs/desktop/index.html',
        detail: '基于 Electron 封装了 C++ IMLib、文件管理、截图等丰富功能模块',
      }]
    },
    // 集成项目
    {
      id: 'integrate',
      name: '集成项目',
      children: [
        {
          name: 'Web 聊天室',
          icon: './res/chatroom.png',
          linkUrl: 'https://rongcloud.github.io/websdk-demo/chatroom/chatroom.html',
          detail: '聊天室弹幕示例',
        },
        {
          name: 'Web IM',
          icon: './res/im.png',
          linkUrl: 'https://rongcloud.github.io/websdk-demo/im/im.html',
          detail: '无框架依赖 Web IM 示例',
        },
        {
          name: 'Web IM (Angular)',
          icon: './res/angular.png',
          linkUrl: 'https://github.com/rongcloud/rongcloud-web-im-widget',
          detail: '基于 Angular 的 Web IM 示例',
        },
        {
          name: 'Web IM H5 (Angular)',
          icon: './res/angular.png',
          linkUrl: 'https://github.com/rongcloud/rongcloud-web-im-widget-h5',
          detail: '基于 Angular 的 H5 Web IM 示例',
        },
        {
          name: 'Web 客服（佳信）',
          icon: './res/js.png',
          linkUrl: 'https://rongcloud.github.io/websdk-demo/cs/jx/cs.html',
          detail: 'IM SDK 对接佳信客服，无框架依赖',
        },
        {
          name: 'Web 客服（智齿）',
          icon: './res/js.png',
          linkUrl: 'https://rongcloud.github.io/websdk-demo/cs/sobot/cs.html',
          detail: 'IM SDK 对接智齿客服，无框架依赖',
        }
      ]
    },
    {
      id: 'open-source',
      name: '开源项目',
      children: [
        {
          name: 'SealTalk',
          icon: './res/sealtalk.png',
          linkUrl: 'https://github.com/sealtalk',
          detail: '基于融云各平台 SDK 开发的即时通讯应用',
        },{
          name: 'Web IM SDK V2',
          icon: './res/js.png',
          linkUrl: 'https://github.com/rongcloud/rongcloud-web-im-sdk-v2',
          detail: 'Web (JavaScript) IM SDK of RongCloud Version 2',
        },
        {
          name: 'Web RTC SDK V3',
          icon: './res/js.png',
          linkUrl: 'https://github.com/rongcloud/rongcloud-web-rtc-sdk-v3',
          detail: 'Web (JavaScript) RTC SDK of RongCloud Version 3.',
        }
      ]
    }
  ]
}