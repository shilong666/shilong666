<template>
  <view class="amt-apply">
    <view class="card" v-for="(item, index) in 3" :key="item">
      <view class="store-no-type flex-jcb flex-aic">
        <view class="no">华强北3C专营店</view>
        <view class="type">抖音</view>
      </view>
      <view class="card-content">
        <view class="info flex-jcb">
          <view> 最大可请款金额（元） </view>
          <view>更新时间：2024-08-19</view>
        </view>
        <view class="flex-jcb flex-aic">
          <view class="amt">
            {{ $utils.parseToMoney(123123123123) }}
          </view>
          <view
            class="button"
            :class="{ disabled: index != 0 }"
            @click="handleClick(item)"
          >
            立即请款
          </view>
        </view>
        <view class="bottom-info">
          <view>资金方：申福田融资担保有限公司</view>
          <view>批次号：202408190001</view>
        </view>
      </view>
    </view>
    <input-money-dialog ref="inputMoneyDialog" @confirm="handleMoneyApply" />
  </view>
</template>

<script>
import InputMoneyDialog from './inputMoneyDialog.vue';
export default {
  components: {
    InputMoneyDialog
  },
  methods: {
    handleClick(item) {
      this.$refs.inputMoneyDialog.show({
        money: 19999999,
        serviceFeeRate: 0.1
      });
    },
    handleMoneyApply() {
      console.log('处理情况');
      uni.navigateTo({
        url: '/pages/amtApply/serviceFee?serviceFee=1204'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
    .info {
      color: #a3a3a3;
      margin-bottom: 20rpx;
    }

    .amt {
      font-size: 38rpx;
      font-weight: bold;
    }
    .button {
      width: 140rpx;
      height: 60rpx;
    }
    .bottom-info {
      margin-top: 10rpx;
      border-top: 2rpx solid #f7f7f7;
      padding-top: 20rpx;
      color: #a3a3a3;
    }
  }
}
.card:not(:last-child) {
  margin-bottom: 20rpx;
}
</style>
