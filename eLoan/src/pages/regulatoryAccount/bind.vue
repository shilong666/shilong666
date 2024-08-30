<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card flex-dr">
        <view class="steps">
          <view class="step flex-dr">
            <view class="sort flex-aic flex-jcc">1</view>
            <view class="content">
              <view class="title">访问抖音/快手/拼多多店铺后台</view>
              <view class="desc"> 操作更换收款卡 </view>
            </view>
          </view>
          <view class="step flex-dr">
            <view class="sort flex-aic flex-jcc">2</view>
            <view class="content">
              <view class="title">收款卡更换为监管账户</view>
              <view class="account-info">
                <view>深圳华强北小店科技有限公司</view>
                <view class="num">6000 0000 1245 5678 899</view>
                <view>中国建设银行福田华强北支行</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <operate-manual />
    </view>
  </Layout>
</template>

<script>
import OperateManual from './components/operateManual.vue';
export default {
  components: {
    OperateManual
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 30rpx;
  .steps {
    .step {
      position: relative;
      .sort {
        width: 40rpx;
        height: 40rpx;
        background: var(--primary-color);
        color: #fff;
        border-radius: 100%;
      }
      .content {
        padding-left: 30rpx;
        .title {
          color: #999;
        }
        .desc {
          font-weight: bold;
          font-size: 38rpx;
          margin-top: 20rpx;
        }
        .account-info {
          margin-top: 20rpx;
          background: #f4f6fc;
          border-radius: 20rpx;
          padding: 30rpx;
          color: #9e9e9e;
          .num {
            font-weight: bold;
            font-size: 38rpx;
            margin: 20rpx 0;
            color: #212121;
          }
        }
      }
    }
    .step:not(:last-child) {
      padding-bottom: 60rpx;
    }
    .step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 40rpx;
      left: 20rpx;
      width: 2rpx;
      height: calc(100% - 40rpx);
      background: var(--primary-color);
    }
  }
}
</style>
