import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// vue-router
import router from './router';

// markdown 代码高亮
import 'highlight.js/styles/a11y-dark.css';

// 导入css
import './styles/index.scss';

// pinia(vuex替代)
import { createPinia } from 'pinia';
// pinia数据持久
import piniaPluginPersist from 'pinia-plugin-persist';

app.use(router).use(createPinia().use(piniaPluginPersist)).mount('#app');
