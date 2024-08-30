<template>
  <view class="amtRecords">
    <view class="card" v-for="(item, index) in 3" :key="item">
      <view class="store-no-type flex-dr flex-aic">
        <view class="type">抖音</view>
        <view class="no">华强北3C专营店</view>
        <view class="status">审核中</view>
      </view>
      <view class="card-content">
        <view class="amt-info flex-dr">
          <view class="amt-item">
            <view class="amt-label"> 请款金额（元） </view>
            <view class="amt">
              {{ $utils.parseToMoney(8292024.92) }}
            </view>
          </view>
          <view class="amt-item">
            <view class="amt-label"> 待还款金额（元） </view>
            <view class="amt"> -- </view>
          </view>
        </view>
        <view class="bottom-info">
          <view>资金方：申福田融资担保有限公司</view>
          <view>批次号：202408190001</view>
          <view>申请时间：2024-08-19</view>
          <view class="flex-jce">
            <view class="button" @click="handleDetail">详情</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleDetail() {
      uni.navigateTo({
        url: '/pages/amtApply/detail'
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
    font-size: 24rpx;
    .type {
      background: rgba(255, 255, 255, 0.2);
      padding: 4rpx 24rpx;
      border-radius: 14rpx;
    }
    .no {
      flex: 1;
      padding-left: 8rpx;
    }
  }
  .card-content {
    border-radius: 20rpx;
    background: #fff;
    padding: 30rpx;
    .amt-info {
      .amt-item {
        flex: 1;
        .amt-label {
          color: #9a9a9a;
          font-size: 24rpx;
        }
        .amt {
          font-size: 32rpx;
          font-weight: bold;
          margin-top: 40rpx;
        }
      }
    }
    .bottom-info {
      margin-top: 10rpx;
      border-top: 2rpx solid #f7f7f7;
      padding-top: 20rpx;
      color: #a3a3a3;
      .button {
        width: 120rpx;
        height: 60rpx;
        background: #fff;
        color: var(--primary-color);
        border: 2rpx solid var(--primary-color);
      }
    }
  }
}
.card:not(:last-child) {
  margin-bottom: 20rpx;
}
</style>
