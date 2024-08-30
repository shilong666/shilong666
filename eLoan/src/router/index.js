import { RouterMount, createRouter } from 'uni-simple-router';
import store from '@/store/index.js';

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  h5: {
    loading: true,
    resetStyle: () => {
      //对样式进行追加
      return {
        style: `
	                #router-loadding .loadding {
	                    background-color: #f00 !important;
	                    box-shadow: 0 0 15px #f00 !important;
	                }
	                `
      };
    }
  },
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: '/'
    }
  ]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log('to', to);
  let token = store.getters.token;
  console.log('token', token);
  // 判断进入的页面是否需要登录 存在token表示有登录
  if (!token && (!to.meta || to.meta.auth || to.meta.auth == undefined)) {
    store.commit('setToken', null);
    store.commit('setUserInfo', null);
    next({
      path: '/pages/login/index'
    });
  } else {
    next();
  }
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  // console.log('跳转结束')
});

export { router, RouterMount };
