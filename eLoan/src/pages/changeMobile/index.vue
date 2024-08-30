<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card flex-dr">
        <view class="steps">
          <view class="step flex-dr">
            <view class="sort flex-aic flex-jcc">1</view>
            <view class="content">
              <view class="title"
                >请用平台手机号码进行换绑店铺主账户手机号</view
              >
              <view class="desc"> 176 8912 0002 </view>
            </view>
          </view>
          <view class="step flex-dr">
            <view class="sort flex-aic flex-jcc">2</view>
            <view class="content">
              <view class="title">扫码添加运营人员微信，获取短信验证码</view>
              <image src="/static/images/topBg.png" class="qrCode"></image>
            </view>
          </view>
        </view>
      </view>
      <operate-manual />
    </view>
  </Layout>
</template>

<script>
import OperateManual from '../regulatoryAccount/components/operateManual.vue';
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
        .qrCode {
          margin-top: 20rpx;
          width: 180rpx;
          height: 180rpx;
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
