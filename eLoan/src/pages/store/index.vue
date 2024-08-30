<template>
  <Layout :onRefresh="onRefresh">
    <view class="body-content">
      <view class="store-list">
        <view class="card" v-for="item in 5" :key="item">
          <view class="store-no-type flex-jcb flex-aic">
            <view class="no">店铺编号：1234567890</view>
            <view class="type">抖音</view>
          </view>
          <view class="card-content">
            <view class="title">深圳华强北3C专营店</view>
            <view class="desc"> 店铺主账号ID:1241241243124 </view>
            <view class="desc"> 配置时间:2024-08-19 </view>
            <view class="flex-jce">
              <view class="button" @click="handleClick(1)">编辑</view>
            </view>
          </view>
        </view>
      </view>
      <cust-fixed :z-index="9">
        <view class="bottom-box bg-filter">
          <view class="safe-area">
            <view class="button" @click="handleClick()">新增店铺</view>
          </view>
        </view>
      </cust-fixed>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onRefresh() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    handleClick(id) {
      uni.navigateTo({
        url: '/pages/store/add?id=' + (id || '')
      });
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 20rpx;
  padding: 0;
  background: linear-gradient(
    180deg,
    rgba(43, 86, 246, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  .store-no-type {
    padding: 20rpx 30rpx;
    color: #fff;
    .type {
      background: rgba(255, 255, 255, 0.2);
      padding: 4rpx 24rpx;
      border-radius: 14rpx;
    }
  }
  .card-content {
    border-radius: 20rpx;
    background: #fff;
    padding: 30rpx;
    .title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 30rpx;
    }
    .desc {
      color: #999;
    }
    .button {
      width: 120rpx;
      background: #fff;
      color: var(--primary-color);
      border: 2rpx solid var(--primary-color);
      height: 60rpx;
    }
  }
}
.card:not(:last-child) {
  margin-bottom: 20rpx;
}
.bottom-box {
  width: 100%;
  padding: 30rpx;
}
</style>
