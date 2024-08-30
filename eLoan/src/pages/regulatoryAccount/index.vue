<template>
  <Layout :refreshenable="true">
    <view class="body-content">
      <view class="card" v-for="(item, index) in accountList" :key="index">
        <view class="type">{{ item.type }}</view>
        <view class="bank-box flex-dr flex-aic">
          <image :src="item.icon" />
          <view class="title">{{ item.title }}</view>
          <view class="button" :class="{ open: item.isOpen }">{{
            item.isOpen ? '查看账户' : '去开通'
          }}</view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      accountList: [
        {
          icon: '/static/images/regulatoryAccount/wz.png',
          title: '微众银行',
          type: '对公',
          isOpen: true
        },
        {
          icon: '/static/images/regulatoryAccount/pa.png',
          title: '平安银行',
          type: '对公、对私',
          isOpen: false
        },
        {
          icon: '/static/images/regulatoryAccount/ws.png',
          title: '网商银行',
          type: '对公、对私',
          isOpen: false
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 30rpx;
  .type {
    color: #999;
    padding-bottom: 20rpx;
  }
  .bank-box {
    image {
      width: 200rpx;
      height: 118rpx;
      flex-shrink: 0;
    }
    .title {
      flex: 1;
      font-size: 32rpx;
      font-weight: bold;
      padding-left: 30rpx;
    }
    .button {
      width: 160rpx;
      height: 60rpx;
    }
    .button.open {
      color: var(--primary-color);
      background: #fff;
      box-shadow: 0 0 0 2rpx var(--primary-color);
    }
  }
}
</style>
