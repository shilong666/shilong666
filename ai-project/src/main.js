import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// vue-router
import router from './router';

// ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';

// markdown 代码高亮
import 'highlight.js/styles/a11y-dark.css';

// 导入css
import './styles/index.scss';

// pinia(vuex替代)
import { createPinia } from 'pinia';
// pinia数据持久
import piniaPluginPersist from 'pinia-plugin-persist';

// 将elementplus的icon注册为全局组件
// 导入icon组件
import * as ElementPlusIcon from '@element-plus/icons';
/**
 * 将iconName转换成el-icon-形势，例如Aim会被转换成el-icon-aim,AddLocation则为el-icon-add-location
 * @param {String} iconName
 * @returns
 */
function transIconName(iconName) {
  return (
    'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
  );
}
Object.keys(ElementPlusIcon).forEach((key) => {
  app.component(transIconName(key), ElementPlusIcon[key]);
});
// 全局icon组件 名称使用上方的名称
import CustIcon from './components/CustIcon/index.vue';
app.component('cust-icon', CustIcon);

// svgicon注册脚本
import 'virtual:svg-icons-register';

app
  .use(router)
  .use(ElementPlus)
  .use(createPinia().use(piniaPluginPersist))
  // .use(editor)
  .mount('#app');
