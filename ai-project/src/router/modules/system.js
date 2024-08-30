export const systemRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import('@/views/index.vue'),
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'el-icon-home-filled',
      auth: true,
      keepAlive: false,
      hidden: true,
      addTagView: false
    }
  }
];

export default systemRoutes;
