<template>
  <view>
    <view
      class="cust-fixed"
      :style="`${
        mode === 'top'
          ? 'top:' + distance + 'rpx'
          : 'bottom:' + distance + 'rpx'
      };z-index:${zIndex}`"
    >
      <slot />
    </view>
    <view class="placeholder" :style="{ height: `${height}px` }"></view>
  </view>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'bottom' // bottom 底部 top 顶部
    },
    distance: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: () => 9
    }
  },

  data() {
    return {
      height: 0
    };
  },
  mounted() {
    uni
      .createSelectorQuery()
      .in(this)
      .select('.cust-fixed')
      .fields({ size: true }, (data) => {
        this.height = data.height;
      })
      .exec();
  }
};
</script>

<style scoped lang="scss">
.cust-fixed {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
}
</style>
