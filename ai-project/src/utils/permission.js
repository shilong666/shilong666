import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import { usePermissionStore } from '@/store/permission';

/**
 * @param {Array} value 菜单权限或列表
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (!value) {
    return true;
  }

  if (value && value instanceof Array && value.length > 0) {
    const userStore = useUserStore();
    const authorities = userStore.getAuthorities();

    const pAuthorities = value;

    return authorities.some((authority) => {
      return pAuthorities.includes(authority);
    });
  } else {
    console.error(
      `need authorities! Like ['sysmng:menu:add','sysmng:menu:edit']`
    );
    return false;
  }
}

export function getRouteByRouteName(routeName, isErrorAlert) {
  if (routeName && routeName.length > 0) {
    const promisssionStore = usePermissionStore();
    const routeMap = promisssionStore.getRouteMap();
    if (routeMap[routeName]) {
      return routeMap[routeName];
    }
    if (isErrorAlert) {
      ElMessage({
        message: '获取跳转页面异常',
        type: 'error',
        duration: 5 * 1000
      });
      // throw new Error('获取跳转页面异常');
    }
    return null;
  } else {
    if (isErrorAlert) {
      ElMessage({
        message: '获取跳转页面异常',
        type: 'error',
        duration: 5 * 1000
      });
      throw new Error('获取跳转页面异常');
    }
    console.error(`need route name!`);
    return null;
  }
}

export function getRoutePathByRouteName(routeName, isErrorAlert) {
  const route = getRouteByRouteName(routeName, isErrorAlert);
  if (route) {
    return route.path;
  }
  return '';
}
