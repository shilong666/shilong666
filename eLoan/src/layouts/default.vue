<template>
  <z-paging
    ref="paging"
    refresher-only
    @onRefresh="handleRefresh"
    v-if="refreshenable"
  >
    <view class="page">
      <slot />
      <view class="sare-area" v-if="safeArea"></view>
    </view>
  </z-paging>
  <view v-else class="page">
    <slot />
    <view class="sare-area" v-if="safeArea"></view>
  </view>
</template>

<script>
export default {
  props: {
    refreshenable: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: () => Promise.resolve()
    },
    safeArea: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleRefresh() {
      const refresh = this.onRefresh();
      if (
        typeof refresh === 'object' &&
        typeof refresh.finally === 'function'
      ) {
        refresh.finally(() => {
          this.$refs.paging.complete();
        });
      } else {
        console.error('onRefresh must return a Promise');
        this.$refs.paging.complete();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .z-paging-content-fixed {
  height: 100vh;
  top: 0 !important;
  bottom: 0 !important;
}
</style>
