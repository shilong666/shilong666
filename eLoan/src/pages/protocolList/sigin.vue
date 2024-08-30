<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="rich-text">
        <u-parse :html="protocolContent"></u-parse>
      </view>
      <cust-fixed>
        <view class="bottom-box">
          <view class="safe-area">
            <view class="protocol-box">
              <u-checkbox
                active-color="var(--primary-color)"
                v-model="acceptProtocol"
                name="acceptProtocol"
              >
                <view class="flex-wrap">
                  <view>我已阅读并同意</view>
                  <view class="protocol">《资金监管协议》</view>
                </view>
              </u-checkbox>
              <view
                class="acceptProtocol"
                @click.stop="showProtocol"
                v-show="!acceptProtocol"
              ></view>
            </view>
            <view class="button" @click="handleClick">立即签署</view>
          </view>
        </view>
      </cust-fixed>
    </view>
    <cust-protocol-pop
      :title="'资金监管协议'"
      :content="'用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议用户协议、隐私协议'"
      :bgColor="'var(--primary-color)'"
      btTitle="我已阅读并同意"
      ref="protocolPop"
      @comfirm="acceptProtocol = true"
    />
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      acceptProtocol: false,
      protocolContent: '<h1>这是一份资金监管协议</h1>'
    };
  },
  methods: {
    showProtocol() {
      this.$refs.protocolPop.show();
    },
    handleClick() {}
  }
};
</script>

<style lang="scss" scoped>
.rich-text {
  width: 100%;
  text-align: justify;
}
.bottom-box {
  width: 100%;
  padding: 30rpx;
  z-index: 9;
  background: #fff;
}
.protocol-box {
  padding-bottom: 30rpx;
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
</style>
