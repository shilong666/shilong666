<template>
  <Layout :onRefresh="onRefresh">
    <view class="body-content">
      <view class="store-list">
        <view class="card" v-for="item in 5" :key="item">
          <view class="store-no-type flex-jcb flex-aic">
            <view class="no">中国建设银行</view>
            <view class="type">融资收款账户</view>
          </view>
          <view class="card-content">
            <view class="tag">对私</view>
            <view class="desc"> 深圳华强北小店科技有限公司 </view>
            <view class="account">6000 0000 1234 5678 899</view>
            <view class="desc"> 中国建设英航福田华强北支行 </view>
            <view class="flex-jce">
              <view class="button" @click="handleClick(1)">编辑</view>
            </view>
          </view>
        </view>
      </view>
      <cust-fixed>
        <view class="bottom-box bg-filter">
          <view class="safe-area">
            <view class="button" @click="handleClick()">新增账户</view>
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
        url: '/pages/bankAccount/add?id=' + (id || '')
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
    .tag {
      background: #f4f6fc;
      padding: 4rpx 28rpx;
      border-radius: 14rpx;
      display: inline-block;
      margin-bottom: 10rpx;
      color: #a0a0a0;
    }
    .account {
      font-size: 32rpx;
      font-weight: bold;
      margin: 10rpx 0;
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
  z-index: 9;
}
</style>
