import { createRouter, createWebHashHistory } from 'vue-router';
import systemRoutes from './modules/system';

/**
 * 路由meta选项说明
 * hidden: true, // 是否隐藏 默认false
 * auth: false, // 是否需要登录 默认true
 * addTagView: false // 是否添加tagview 默认true
 * hiddenWhenSingle: true // 当children.length===0时候是否隐藏自己 默认false
 * keepAlive 是否加入缓存 默认加入 false时不会缓存页面内容
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [].concat(systemRoutes);

/**
 * 其它路由
 */
export const notFoundRoutes = [
  {
    path: '/:pathMatch(.*)', // router4全部路由的匹配方法
    redirect: '/',
    meta: {
      hidden: true,
      addTagView: false
    }
  }
];

const initRouter = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior: () => ({
      y: 0
    })
  });
};

const router = initRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = initRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
