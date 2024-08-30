import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  persist: {
    enabled: true, // 开启数据持久化
    strategies: [
      {
        key: 'app', // 存到localStorage里面去的key
        storage: localStorage, // 实现持久化的方式
        paths: ['messageList'] // 需要数据持久化的key
      }
    ]
  },
  state: () => {
    return {
      elementIcons: [], // element官方图标组件的keys列表
      svgIcons: [], // 项目icon文件夹下面添加的svg图标的keys
      messageList: []
    };
  },
  actions: {
    setElementIcons(list) {
      this.elementIcons = list;
    },
    getElementIcons() {
      return this.elementIcons;
    },
    setSvgIcons(list) {
      this.svgIcons = list;
    },
    getSvgIcons() {
      return this.svgIcons;
    },
    setMessageList(list) {
      this.messageList = list;
    },
    getMessageList() {
      return this.messageList;
    }
  }
});
