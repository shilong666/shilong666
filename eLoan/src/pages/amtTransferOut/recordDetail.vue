<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card flex-dc flex-aic">
        <image :src="outPng" />
        <view class="label"> 提现转出 </view>
        <view class="amt"> -1000.00 </view>
        <view class="label status">审核中</view>
        <view class="form-box">
          <u-form label-width="180">
            <u-form-item label="账户名称">
              深圳华强北小店科技有限公司
            </u-form-item>
            <u-form-item label="账户账号">
              {{ $utils.addBlankToString('600000012345678899', 4) }}
            </u-form-item>
            <u-form-item label="开户行支行">
              中国建设银行福田华强北支行
            </u-form-item>
            <u-form-item label="开户行支行"> 2024-08-19 </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card flex-dc flex-aic">
        <image :src="backPng" />
        <view class="label"> 偿还用款 </view>
        <view class="amt"> -1000.00 </view>
        <view class="label">扣款成功</view>
        <view class="form-box">
          <u-form label-width="180">
            <u-form-item label="订单号"> 5349758734988798 </u-form-item>
            <u-form-item label="订单状态"> 已关闭 </u-form-item>
            <u-form-item label="订单提款金额"> 900.00 </u-form-item>
            <u-form-item label="提款利息"> 50.00 </u-form-item>
            <u-form-item label="服务费"> 50.00 </u-form-item>
            <u-form-item label="创建时间"> 2024-08-19 </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card flex-dc flex-aic">
        <image :src="inPng" />
        <view class="label"> 尾款入账 </view>
        <view class="amt"> 1000.00 </view>
        <view class="label">入账成功</view>
        <view class="form-box">
          <u-form label-width="180">
            <u-form-item label="订单号"> 5349758734988798 </u-form-item>
            <u-form-item label="订单状态"> 已完成 </u-form-item>
            <u-form-item label="创建时间"> 2024-08-19 </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="title">店铺信息</view>
      <view class="card">
        <u-form label-width="180">
          <u-form-item label="平台名称"> 抖音 </u-form-item>
          <u-form-item label="店铺名称"> 华强北3C专营店 </u-form-item>
          <u-form-item label="店铺编号"> 4756583435 </u-form-item>
        </u-form>
      </view>
    </view>
  </Layout>
</template>

<script>
import outPng from '../../static/images/amtTransferOut/out.png';
import backPng from '../../static/images/amtTransferOut/back.png';
import inPng from '../../static/images/amtTransferOut/in.png';
export default {
  data() {
    return {
      outPng,
      backPng,
      inPng
    };
  }
};
</script>

<style scoped lang="scss">
.card {
  padding: 0 30rpx;
  image {
    width: 80rpx;
    height: 80rpx;
    margin-top: 30rpx;
  }
  .label {
    font-size: 24rpx;
    margin-top: 10rpx;
  }
  .amt {
    font-size: 38rpx;
    font-weight: bold;
    margin-top: 10rpx;
  }
  .status {
    color: #f99228;
  }
  .form-box {
    width: 100%;
  }
  /deep/ .u-form-item--left__content__label {
    color: #c9c9c9;
  }
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  padding: 30rpx 0;
}
</style>
