# uniapp-template
### 技术栈uniapp+uview2+vuex+uni-simple-router
```bash
uview2 多端编译ui框架
vuex 专为 Vue.js 应用程序开发的状态管理模式 + 库(此项目中已使用vuex-persistedstate插件实现数据持久)
uni-simple-router uniapp中的vue-router（此项目使用此实现路由守卫）
```

### 初始化
```bash
npm install
```
### 启动
```bash
npm run serve 启动项目（等同于npm run dev:h5,更多平台见package.json）
```
### 构建
```bash
npm run build 编译项目（等同于npm run build:h5，更多平台见package.json）
```
### 目录结构
```bash
├── public                              // 静态开放文件
├── src                                 // 源码文件
│   ├── components                      // 公共组件
│   ├── pages                           // 项目页面
│   ├── platforms                       // 项目页面-特定平台的页面
│   │   ├── h5                          // h5平台才会编译进来的页面
│   │   └── mp-weixin                   // 微信小程序平台才会编译进来的页面
│   ├── router                          // 路由守卫
│   ├── static                          // 静态资源文件
│   │   ├── h5                          // h5平台才会编译进来的静态资源
│   │   ├── mp-weixin                   // 微信小程序平台才会编译进来的静态资源
│   │   └── config.js                   // 配置文件
│   ├── store                           // Vuex
│   ├── styles                          // 样式
│   ├── utils                           // 工具函数
│   ├── App.vue                         // 项目主界面
│   ├── main.js                         // 程序入口文件
│   ├── manifest.json                   // uni-app项目类型及环境配置
│   ├── pages.json                      // 项目配置
├── babel.config.js                     // babel-loader 配置
├── package.json                        // npm包描述文件
├── postcss.config.js                   // postcss
├── README.md                           // 项目介绍文件
└── vue.config.js                       // vue项目配置文件
```
### 注意事项
#### 1.uniapp所支持的平台
```bash
APP-PLUS				App
APP-PLUS-NVUE或APP-NVUE	App nvue
H5						H5
MP-WEIXIN				微信小程序
MP-ALIPAY				支付宝小程序
MP-BAIDU				百度小程序
MP-TOUTIAO				字节跳动小程序
MP-LARK					飞书小程序
MP-QQ					QQ小程序
MP-KUAISHOU				快手小程序
MP-360					360小程序
MP						微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/360小程序
QUICKAPP-WEBVIEW		快应用通用(包含联盟、华为)
QUICKAPP-WEBVIEW-UNION	快应用联盟
QUICKAPP-WEBVIEW-HUAWEI	快应用华为

```
#### 2.platforms和static中的平台名称文件夹需要写小写
#### 3.src/static/config.js配置文件已兼容h5和其它平台，建议统一通过src/utils/index.js中的getConfig函数获取
#### 4.vuex已使用uniapp的缓存api实现持久化，如无需请删除src/store/index.js中的plugins
#### 5.src/utils/index.js中均为公共方法，平台独有函数请在platforms/平台/js/utils/index.js中单独添加，如果是重名方法将会覆盖公共方法
#### 6.项目配置了gzip,需要nginx支持，不使用请删除vue.config.js中的compression-webpack-plugin插件相关内容。