<template>
  <loginLayout>
    <view class="login-box">
      <view class="login-title">
        <text>登录</text>
      </view>
      <view class="login-sub-title">
        <text>输入手机号及验证码</text>
      </view>
      <view class="login-form">
        <u-form :model="formData" ref="uForm" label-position="top">
          <u-form-item label="手机号码">
            <u-input
              v-model="formData.mobile"
              placeholder="请输入手机号（新号码自动注册）"
              type="number"
            />
          </u-form-item>
          <u-form-item label="验证码">
            <view class="flex-dr flex-aic w-full">
              <u-input
                v-model="formData.mobile"
                placeholder="请输入验证码"
                type="number"
              />
              <cust-count-down
                @custClick="handleSendSmsCode"
                color="var(--primary-color)"
                ref="countDown"
              />
            </view>
          </u-form-item>
          <view class="protocol-box">
            <u-checkbox
              shape="circle"
              active-color="var(--primary-color)"
              v-model="acceptProtocol"
              name="acceptProtocol"
            >
              <view class="flex-wrap">
                <view>我已阅读并同意</view>
                <view class="protocol">用户协议、隐私协议</view>
              </view>
            </u-checkbox>
            <view
              class="acceptProtocol"
              @click.stop="showProtocol"
              v-show="!acceptProtocol"
            ></view>
          </view>
          <view class="button" @click="handleLogin">登录/注册</view>
        </u-form>
      </view>
    </view>
    <cust-protocol-pop
      :title="'用户协议、隐私协议'"
      :content="'用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议'"
      :bgColor="'var(--primary-color)'"
      btTitle="我已阅读并同意"
      ref="protocolPop"
      @comfirm="acceptProtocol = true"
    />
  </loginLayout>
</template>

<script>
import CustCountDown from '../../components/cust-count-down/cust-count-down.vue';
import CustProtocolPop from '../../components/cust-protocol-pop/cust-protocol-pop.vue';
import loginLayout from './components/loginLayout.vue';
export default {
  components: {
    loginLayout,
    CustCountDown,
    CustProtocolPop
  },
  data() {
    return {
      formData: {},
      acceptProtocol: false // 是否同意协议
    };
  },
  onReady() {
    console.log('onReady');
    uni.onKeyboardHeightChange((e) => {
      console.log('键盘高度变化', e);
    });
  },
  onUnload() {
    uni.offKeyboardHeightChange();
  },
  methods: {
    handleSendSmsCode() {
      console.log('点击发送验证码');
      this.$refs.countDown.start();
    },
    showProtocol() {
      this.$refs.protocolPop.show();
    },
    handleLogin() {
      this.$store.commit('setToken', '123123');
      uni.switchTab({ url: '/pages/index/index' });
    }
  }
};
</script>

<style scoped lang="scss">
.login-box {
  padding: 60rpx;
  color: #363636;
  .login-title {
    font-size: 40rpx;
    font-weight: bold;
  }
  .login-sub-title {
    font-size: 28rpx;
    color: #b1b1b1;
    margin-top: 4rpx;
  }
  .login-form {
    margin-top: 40rpx;
    /deep/ .u-form-item--left {
      margin-bottom: 0 !important;
    }
    /deep/ .u-form-item--left__content__label {
      color: #717171;
    }
    .protocol-box {
      padding: 30rpx 0;
      position: relative;
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
    .button {
      background-image: linear-gradient(to bottom, #6685fe, #4267f7);
    }
  }
}
</style>
