<template>
  <Layout>
    <view class="body-content">
      <view class="card" v-for="(item, index) in list" :key="index">
        <view class="store-no-type flex-jcb flex-aic">
          <view class="no">{{
            item.type === 'amtApply' ? '请款申请' : '尾款转出'
          }}</view>
        </view>
        <view class="card-content">
          <view class="info flex-jcb">
            <view>
              最大可{{ item.type === 'amtApply' ? '请款' : '转出' }}金额（元）
            </view>
            <view>更新时间：{{ item.refreshDate }}</view>
          </view>
          <view class="flex-jcb flex-aic">
            <view class="amt">
              {{ $utils.parseToMoney(item.amt) }}
            </view>
            <view class="button" @click="handleClick(item.type)">
              立即{{ item.type === 'amtApply' ? '请款' : '转出' }}
            </view>
          </view>
        </view>
      </view>
      <view class="tips"> *每日尾款转出操作时间：14:00:00 - 21:30:00 </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          type: 'amtApply',
          refreshDate: '2024-08-19',
          amt: 8292024.92
        },
        {
          type: 'amtBack',
          refreshDate: '2024-08-19',
          amt: 8292024.92
        }
      ]
    };
  },
  methods: {
    handleClick(type) {
      uni.navigateTo({
        url:
          type === 'amtApply'
            ? '/pages/amtApply/index'
            : '/pages/amtTransferOut/index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 20rpx;
  padding: 0;
  margin-bottom: 20rpx;
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
      color: #999;
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
  }
}
.tips {
  font-size: 24rpx;
  color: #999;
}
</style>
