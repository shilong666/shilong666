<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
// elementplus语言设置
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { useAppStore } from '@/store/app';
import * as ElementPlusIcon from '@element-plus/icons';
// 初始化图标icon key数据
// 导入svg图标keys
import ids from 'virtual:svg-icons-names';
// 初始化appStore
const appStore = useAppStore();
// 将svg icons key添加的appStore
appStore.setSvgIcons(ids);
let elementIcons = [];
Object.keys(ElementPlusIcon).forEach((iconName) => {
  elementIcons.push(
    'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
  );
});
appStore.setElementIcons(elementIcons);
</script>
<style lang="scss"></style>
