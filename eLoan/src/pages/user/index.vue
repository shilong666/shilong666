<template>
  <Layout>
    <view class="body-content">
      <view class="user-box flex-dr flex-aic">
        <image src="../../static/images/user/avatar.png" />
        <view>
          <view class="label">欢迎您</view>
          <view class="mobile">13265730099</view>
        </view>
      </view>
      <view class="card flex-jca menus">
        <view
          class="item flex-dc flex-aic"
          v-for="(item, index) in menus"
          :key="index"
          @click="handleToPage(item.url)"
        >
          <image :src="item.icon" />
          <view class="title">{{ item.title }}</view>
        </view>
      </view>
      <view class="card protocol flex-jcb" @click="handleToProtocol">
        <text>用户服务协议</text>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view class="card protocol flex-jcb" @click="handleToProtocol">
        <text>隐私服务协议</text>
        <u-icon name="arrow-right"></u-icon>
      </view>
    </view>
  </Layout>
</template>

<script>
import Qa from '../../static/images/user/qa.png';
import About from '../../static/images/user/about.png';
import Kf from '../../static/images/user/kf.png';
export default {
  data() {
    return {
      menus: [
        {
          icon: Qa,
          title: '常见问题',
          url: 'pages/question/index'
        },
        {
          icon: About,
          title: '关于我们',
          url: '/pages/about/index'
        },
        {
          icon: Kf,
          title: '联系客服',
          url: '/pages/contact/index'
        }
      ]
    };
  },
  methods: {
    handleToPage(url) {
      uni.navigateTo({
        url
      });
    },
    handleToProtocol() {
      this.$utils.toRichText('用户服务协议', '<h1>协议内容</h1>');
    }
  }
};
</script>

<style scoped lang="scss">
.user-box {
  padding-top: 20rpx;
  image {
    width: 90rpx;
    height: 90rpx;
    margin-right: 20rpx;
  }
  .label {
    color: #999;
    font-size: 24rpx;
  }
  .mobile {
    margin-top: 10rpx;
    font-size: 32rpx;
  }
}
.menus {
  padding: 30rpx 0;
  margin-top: 60rpx;
  .item {
    image {
      width: 80rpx;
      height: 80rpx;
    }
    .title {
      font-size: 32rpx;
      margin-top: 10rpx;
    }
  }
}

.protocol {
  margin-top: 20rpx;
}
</style>
