<template>
  <view class="operate">
    <view class="title"> 操作指南 </view>
    <view class="tabs">
      <view
        class="tab"
        :class="{ active: current === index }"
        v-for="(item, index) in storeTypes"
        :key="index"
        @click="handleTabChange(index)"
      >
        {{ item.name }}
      </view>
    </view>
    <view class="operate-content">
      <u-parse :html="operateContent"></u-parse>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      storeTypes: [
        {
          name: '抖音'
        },
        {
          name: '快手'
        },
        {
          name: '拼多多'
        }
      ],
      operateContent: '<h1>操作指引内容</h1>'
    };
  },
  methods: {
    handleTabChange(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.operate {
  .title {
    padding: 30rpx 0;
    font-weight: bold;
    font-size: 38rpx;
  }
  .tabs {
    width: 100%;
    border-radius: 20rpx;
    background: #fff;
    padding: 6rpx;
    display: flex;
    justify-content: space-between;
    .tab {
      border-radius: 20rpx;
      background: #fff;
      color: #212121;
      width: 200rpx;
      padding: 16rpx;
      display: flex;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .tab.active {
      background: var(--primary-color);
      color: #fff;
    }
  }
  .operate-content {
    margin-top: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    width: 100%;
    padding: 20rpx;
  }
}
</style>
