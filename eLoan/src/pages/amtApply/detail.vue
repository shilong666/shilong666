<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card-box">
        <view class="title">店铺信息</view>
        <view class="card">
          <u-form label-width="180">
            <u-form-item label="平台名称">抖音</u-form-item>
            <u-form-item label="店铺名称">华强北3C专营店</u-form-item>
            <u-form-item label="店铺编号">4756583435</u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card-box">
        <view class="title">收款账户</view>
        <view class="card">
          <u-form label-width="180">
            <u-form-item label="账户名称">
              深圳华强北小店科技有限公司
            </u-form-item>
            <u-form-item label="账户账号">6000 0000 1234 5678 899</u-form-item>
            <u-form-item label="开户行支行">
              中国建设银行福田华强北支行
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card-box">
        <view class="title">提款信息</view>
        <view class="card">
          <u-form label-width="180">
            <u-form-item label="请款金额">
              {{ $utils.parseToMoney(8292024.92) }}
            </u-form-item>
            <u-form-item label="日利率">0.02%</u-form-item>
            <u-form-item label="还款方式"> 随还 </u-form-item>
            <u-form-item label="还款途径">
              订单结算还款自动偿还本息
            </u-form-item>
            <u-form-item label="资金方"> 深圳福田融资担保有限公司 </u-form-item>
            <u-form-item label="申请时间"> 2024-08-19 </u-form-item>
            <u-form-item label="提款状态"> 还款中 </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card-box">
        <view class="title">批次号信息</view>
        <view class="card">
          <u-form label-width="110">
            <u-form-item label="批次号:">
              <view style="width: 100%" class="flex-jcb" @click="handleToBatch">
                <text>2024081900001</text>
                <u-icon name="arrow-right" color="#C9C9C9"></u-icon>
              </view>
            </u-form-item>
          </u-form>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  methods: {
    handleToBatch() {
      uni.navigateTo({
        url: '/pages/amtApply/batchInfo'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.body-content {
  padding-top: 0;
}
.card-box {
  .title {
    font-size: 32rpx;
    font-weight: bold;
    padding: 20rpx 0;
  }
  .card {
    padding: 0 30rpx;
  }
}
</style>
