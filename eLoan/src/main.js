import Vue from 'vue';
import App from './App';
import store from './store';
import uView from 'uview-ui';
import Layout from './layouts/default.vue';
// dict
import { getDictByTypes } from '@/utils/dict.js';
// router
import { router, RouterMount } from './router';
// utils
import utils from '@/utils';
// 移动端h5调试 开发模式显示
// #ifdef H5
if (process.env.NODE_ENV !== 'production') {
  import('vconsole').then((res) => {
    new res.default();
  });
}
// #endif

const jWeiXin = require('jweixin-module');

Vue.use(uView);
Vue.use(router);
Vue.component('Layout', Layout);

Vue.config.productionTip = false;

// 在 页面 文件中通过this.可获取到此值 如this.$store
Vue.prototype.$store = store;
Vue.prototype.$platform = process.env.VUE_APP_PLATFORM; // 此处获得的平台名称为默认名称，不一定和getPlatform()函数获得的名称一一致
Vue.prototype.$config = utils.getConfig;
Vue.prototype.$utils = utils;
Vue.prototype.$getDict = getDictByTypes;
Vue.prototype.$wx = jWeiXin;
Vue.prototype.$wx.closeWindow = () => {
  jWeiXin.closeWindow();
  jWeiXin.miniProgram.navigateBack();
};

App.mpType = 'app';

const app = new Vue({
  ...App
});

//v1.3.5起 H5端,使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// 非开发环境 取消log打印
if (process.env.NODE_ENV !== 'development') {
  // console.log = () => {}
}
