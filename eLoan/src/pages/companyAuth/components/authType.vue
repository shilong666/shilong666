<template>
  <view class="auth-type">
    <view class="label">选择认证方式</view>
    <view
      class="card flex-dr flex-aic"
      v-for="item in authTypes"
      :key="item.key"
      @click="handleClick(item.type)"
    >
      <image :src="item.icon" class="icon"></image>
      <view>
        <view class="title">{{ item.title }}</view>
        <view class="sub-title">{{ item.subTitle }}</view>
        <view class="desc">
          <text>
            {{ item.desc }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      authTypes: [
        {
          icon: '/static/images/companyAuth/legalPerson.png',
          title: '法人认证',
          subTitle: '所需资料',
          desc: '企业：营业执照、法人身份证、法人人脸核验',
          type: 'legalPerson'
        },
        {
          icon: '/static/images/companyAuth/operator.png',
          title: '经办人认证',
          subTitle: '所需资料',
          desc: `企业：营业执照、法人身份证、法人人脸核验
                 经办人：身份证、人脸核验`,
          type: 'operator'
        }
      ]
    };
  },
  methods: {
    handleClick(type) {
      this.$emit('confirm', type);
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-type {
  padding: 0 30rpx;
}
.label {
  font-size: 34rpx;
  font-weight: bold;
  padding: 30rpx 0;
}
.card {
  width: 100%;
  padding: 70rpx 20rpx;

  .icon {
    width: 140rpx;
    height: 140rpx;
    flex-shrink: 0;
    margin-right: 20rpx;
  }
  .title {
    font-size: 32rpx;
    font-weight: bold;
  }
  .sub-title {
    font-size: 24rpx;
    color: var(--font-sub-color);
    margin-top: 18rpx;
  }
  .desc {
    margin-top: 18rpx;
    padding: 8rpx 16rpx;
    border-radius: 10rpx;
    background: #f4f6fc;
    font-size: 24rpx;
    color: #9b9b9c;
  }
}
.card:not(:last-child) {
  margin-bottom: 20rpx;
}
</style>
