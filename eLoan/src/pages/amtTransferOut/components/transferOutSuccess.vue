<template>
  <u-popup
    v-model="visbile"
    mode="bottom"
    border-radius="20"
    :mask-close-able="false"
  >
    <view class="pop-box flex-dc flex-aic">
      <view class="title"> 尾款转出 </view>
      <image
        src="../../../static/images/amtApply/success.png"
        class="amtApplySuccessImg"
      />
      <view class="success-text">申请成功</view>
      <view class="tips">审批通过后，到账时间以银行处理时间为准</view>
      <view class="button" @click="handleClick">完成</view>
    </view>
  </u-popup>
</template>

<script>
export default {
  data() {
    return {
      visbile: false
    };
  },
  methods: {
    show() {
      this.visbile = true;
    },
    handleClick() {
      this.visbile = false;
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped lang="scss">
.pop-box {
  padding: 30rpx;
  .title {
    font-size: 32rpx;
    font-weight: bold;
    width: 100%;
  }
  .amtApplySuccessImg {
    width: 280rpx;
    height: 280rpx;
    margin-top: 60rpx;
  }
  .success-text {
    font-size: 32rpx;
    font-weight: bold;
    margin-top: -20rpx;
  }
  .tips {
    font-size: 24rpx;
    color: #9a9a9a;
    margin-top: 10rpx;
  }
  .button {
    margin-top: 220rpx;
  }
}
</style>
