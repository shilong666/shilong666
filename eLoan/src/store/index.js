import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"

const context = require.context('./modules', false, /\.js$/);
const moduleStores = {};

context.keys().forEach(key => {
	// 获取读取到的文件名字并且截取
	const fileName = key.slice(2, -3);
	//通过 context(key)导出文件内容
	const fileModule = context(key).default;
	moduleStores[fileName] = {
		...fileModule,
	};
})

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		...moduleStores
	},
	plugins: [createPersistedState({ // 使用uniapp的storage api实现vuex持久
	      storage: {
			  setItem: (key,value)=>uni.setStorageSync(key,value),
			  getItem: key => uni.getStorageSync(key),
			  removeItem: key=> uni.removeStorageSync(key)
		  }
	  })]
})
