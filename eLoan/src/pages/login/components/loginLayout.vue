<template>
  <view class="page">
    <image
      src="../../../static/images/topBg.png"
      class="topBg"
      mode="widthFix"
    ></image>
    <view class="content">
      <slot />
    </view>
  </view>
</template>

<script></script>

<style scoped lang="scss">
.page {
  position: relative;
  .topBg {
    width: 100vw;
  }
  .content {
    position: absolute;
    top: 380rpx;
    min-height: calc(100vh - 380rpx);
    width: 100%;
    background: #fff;
    z-index: 1;
    border-radius: 20rpx 20rpx 0 0;
  }
}
</style>
