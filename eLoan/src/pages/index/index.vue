<template>
  <Layout>
    <view class="index-body">
      <image
        src="../../static/images/index-01.png"
        mode="widthFix"
        class="w-full"
      />

      <view class="label">融资待办</view>
      <view
        class="card flex-jcb flex-aic"
        v-for="item in todoList"
        :key="item.key"
      >
        <view>
          <view class="title">{{ item.title }}</view>
          <view class="desc">{{ item.desc }}</view>
        </view>
        <view
          class="button"
          :class="{ finish: item.finish }"
          @click="handleClick(item.url)"
        >
          {{ item.finish ? '已完成' : '去完成' }}
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      todoList: [
        {
          title: '企业建档认证',
          desc: '完成企业主体资质认证',
          finish: false,
          key: '1',
          url: '/pages/companyAuth/index'
        },
        {
          title: '维护店铺',
          desc: '完善店铺信息',
          finish: false,
          key: '2',
          url: '/pages/store/index'
        },
        {
          title: '绑收款户',
          desc: '准备账户绑定为融资收款户',
          finish: false,
          key: '3',
          url: '/pages/bankAccount/index'
        },
        {
          title: '协议签署',
          desc: '待资金方完成绑定即可签署',
          finish: false,
          key: '4',
          url: '/pages/protocolList/index'
        },
        {
          title: '开通还款监管户',
          desc: '仅支持微众银行（其它银行陆续开通中）',
          finish: false,
          key: '5',
          url: '/pages/regulatoryAccount/index'
        },
        {
          title: '监管户关联店铺',
          desc: '更换店铺提款账户为监管户',
          finish: false,
          key: '6',
          url: '/pages/regulatoryAccount/bind'
        },
        {
          title: '店铺主账户手机号换绑',
          desc: '店铺主账户手机号更换为平台提供手机号',
          finish: true,
          key: '7',
          url: '/pages/changeMobile/index'
        }
      ]
    };
  },
  methods: {
    handleClick(url) {
      url &&
        uni.navigateTo({
          url
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.index-body {
  padding: 20rpx 30rpx;
}
.label {
  font-size: 34rpx;
  font-weight: bold;
  padding: 20rpx 0;
}
.card {
  .title {
    font-size: 28rpx;
  }
  .desc {
    font-size: 24rpx;
    color: var(--font-sub-color);
    margin-top: 4rpx;
  }
  .button {
    width: 120rpx;
    height: 60rpx;
    font-size: 24rpx;
  }
  .button.finish {
    background: #ebf9f3;
    color: #4fd295;
  }
}
.card:not(:last-child) {
  margin-bottom: 20rpx;
}
</style>
