<template>
  <Layout>
    <view class="body-content">
      <view class="card">
        <view class="protol flex-jcb flex-aic" v-for="index in 5" :key="index">
          <view class="name flex-aic">资金监管协议</view>
          <view class="button" @click="handleToSigin">去签署</view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleToSigin() {
      uni.navigateTo({
        url: '/pages/protocolList/sigin'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0 30rpx;
}
.protol {
  padding: 30rpx 0;
  .name {
    color: var(--primary-color);
    flex: 1;
    height: 70rpx;
  }
  .button {
    width: 200rpx;
    height: 70rpx;
  }
  .button.finish {
    background: #ebf9f3;
    color: #4fd295;
  }
}
.protol:not(:last-child) {
  border-bottom: 2rpx solid #f7f7f7;
}
</style>
