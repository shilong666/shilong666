<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card question" v-for="(item, index) in list" :key="index">
        <view class="q flex-dr">
          <image src="../../static/images/user/msg.png" />
          <text>{{ item.q }}</text>
        </view>
        <view class="a">
          {{ item.a }}
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          q: '每日生成的可请款金额是怎么计算出来的？',
          a: '平台生成的可请款金额是依据商家T-1日新增已发货的订单金额，减去平台分佣、主播佣金、团长费用等各项费用后，乘以放款比例后计算得出。'
        },
        {
          q: '店铺存量未融资订单，直播平台结算至回款账户的资金，商家如何转出提现？ ',
          a: '针对店铺存量未融资订单产生的结算回款金额，商家可随时在【电商中心】-【尾款转出】中申请转出。'
        },
        {
          q: '已融资订单结算至回款账户的资金，清分完本息之后的尾款，商家如何转出提现？ ',
          a: '针对已融资订单，平台会根据每笔订单的结算回款状态自动清分本金和利息，剩余尾款商家可随时在【电商中心】-【尾款转出】中申请转出。 '
        },
        {
          q: '产品是自动清分本金+利息吗？是否需要人工登录网银转账？ ',
          a: '平台每日会启动定时提现任务将店铺回款结算资金提现至监管账户，自动清分本息，无需人工登录网银手工发起转账。'
        },
        {
          q: '请款申请发起之后，资金一般多久到账？',
          a: '请款审批时间统一为上午12点和下午15点。资金到账时间以银行实时入账时间为准。 '
        },
        {
          q: '融资比例及额度是如何确定的？ ',
          a: '平台会根据店铺每日实际发货金额，按准入核额比例进行放款，具体放款比例需要在进件前根据店铺数据综合评估，放款比例一般在50%—80%之间。 '
        },
        {
          q: '若某日店铺退货率很高，导致平台审批资金穿仓，需要如果补回？ ',
          a: '若出现资金穿仓情况，优先采用现金补回方式；其次可采用后续销售发货订单的结算回款资金补回穿仓资金，具体的补救方案，由平台根据个案进行专项处理。 '
        },
        {
          q: '店铺结算回款的账户资金是否存在风险？ ',
          a: '店铺结算回款的账户资金统一流入监管账户中进行监管，无论是店铺用户端（抖音/快手/拼多多）还是平台端，都无权随意进行资金调动，所以店铺账户的资金不存在任何风险。 '
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.question {
  padding: 30rpx;
  .q {
    image {
      width: 52rpx;
      height: 44rpx;
    }
    text {
      color: #999;
      margin-top: 2rpx;
      margin-left: 8rpx;
    }
  }
  .a {
    margin-top: 30rpx;
  }
}
.question:not(:last-child) {
  margin-bottom: 20rpx;
}
</style>
