<template>
  <el-icon :size="props.size" :color="props.color" :class="custClass">
    <component :is="props.icon" v-if="isElementIcon(props.icon)"></component>
    <svg v-else aria-hidden="true" :fill="props.color">
      <use :xlink:href="'#' + props.icon" :fill="props.color" />
    </svg>
  </el-icon>
</template>

<script setup>
import { useAppStore } from '@/store/app';
import { computed } from 'vue-demi';

const props = defineProps({
  icon: {
    type: String,
    default: () => '' // element：el-icon-refresh;svg：svg-icon-refresh
  },
  size: {
    type: String,
    default: () => ''
  },
  color: {
    type: String,
    default: () => ''
  },
  custClass: {
    type: String,
    default: () => ''
  }
})

const getStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
    color: props.color
  }
})

const appStore = useAppStore();

const svgIcons = computed(() => appStore.getSvgIcons())

const isElementIcon = (iconName) => {
  return !svgIcons.value.includes(iconName)
}

</script>

<style scoped lang="scss">
svg {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}
// .svg-icon {
//   position: relative;
//   vertical-align: -2px;
//   flex-shrink: 0;
// }
</style>