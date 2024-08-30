<template>
  <view class="face-check">
    <view class="label">请确认李XX本人操作</view>
    <view class="sub-label">为了保障您的账户安全，请完成人脸识别认证</view>
    <view class="avatar-box">
      <image src="/static/images/companyAuth/faceCheck.png" />
    </view>
    <view class="face-steps flex-dr flex-jca">
      <view
        class="face-step flex-dc flex-aic"
        v-for="(item, index) in faceSteps"
        :key="index"
      >
        <view class="icon-box flex-jcc flex-aic">
          <image :src="item.icon" />
        </view>
        <view class="title">{{ item.title }}</view>
      </view>
    </view>
    <view class="protocol-box flex-jcc">
      <u-checkbox
        active-color="var(--primary-color)"
        v-model="acceptProtocol"
        name="acceptProtocol"
      >
        <view class="flex-wrap check-label">
          <view>我已阅读并同意</view>
          <view class="protocol">《人脸识别个人信息处理规则》</view>
        </view>
      </u-checkbox>
      <view
        class="acceptProtocol"
        @click.stop="showProtocol"
        v-show="!acceptProtocol"
      ></view>
    </view>
    <cust-protocol-pop
      :title="'《人脸识别个人信息处理规则》'"
      :content="'用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议'"
      :bgColor="'var(--primary-color)'"
      btTitle="我已阅读并同意"
      ref="protocolPop"
      @comfirm="acceptProtocol = true"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      faceSteps: [
        {
          icon: '/static/images/companyAuth/faceCheck01.png',
          title: '人脸至于轮廓内'
        },
        {
          icon: '/static/images/companyAuth/faceCheck02.png',
          title: '保证光线充足'
        },
        {
          icon: '/static/images/companyAuth/faceCheck03.png',
          title: '跟随提示做出动作'
        }
      ],
      acceptProtocol: false
    };
  },
  methods: {
    init() {},
    getData() {
      return new Promise((resolve, reject) => {
        resolve(this.formData);
      });
    },
    showProtocol() {
      this.$refs.protocolPop.show();
    }
  }
};
</script>

<style scoped lang="scss">
.face-check {
  .label {
    font-size: 32rpx;
    font-weight: bold;
  }
  .sub-label {
    font-size: 24rpx;
    color: var(--font-sub-color);
  }
  .avatar-box {
    margin: 80rpx auto 110rpx auto;
    width: 336rpx;
    height: 336rpx;
    border-radius: 200rpx;
    overflow: hidden;
    background: #fff;
    image {
      margin: 40rpx auto 0 auto;
      height: 312rpx;
      width: 252rpx;
    }
  }
  .face-steps {
    .face-step {
      .icon-box {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
        background: #fff;
        image {
          width: 48rpx;
          height: 48rpx;
        }
      }
      .title {
        font-size: 24rpx;
        color: var(--font-sub-color);
        margin-top: 16rpx;
      }
    }
  }
  .protocol-box {
    padding: 30rpx 0;
    position: relative;
    margin-top: 160rpx;

    .check-label {
      font-size: 28rpx;
    }
    .protocol {
      color: var(--primary-color);
    }

    .acceptProtocol {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>
