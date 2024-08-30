<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card">
        <u-form label-width="300">
          <u-form-item label="账户标识" prop="accountType">
            <u-radio-group v-model="formData.accountType">
              <u-radio
                v-for="(item, index) in accountTypes"
                :key="index"
                :name="item.code"
              >
                {{ item.desc }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="账户名称" prop="name">
            <u-input
              v-model="formData.name"
              placeholder="请输入账户名称"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="账户账号" prop="account">
            <u-input
              v-model="formData.account"
              placeholder="请输入账户账号"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="开户行支行" prop="id">
            <u-input
              v-model="formData.id"
              placeholder="请输入开户行支行"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="银行名称" prop="bankName">
            <u-input
              v-model="formData.bankName"
              placeholder="请输入银行名称"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="作为融资收款账户" prop="isCollectionAccount">
            <u-radio-group v-model="formData.isCollectionAccount">
              <u-radio
                v-for="(item, index) in indicatorList"
                :key="index"
                :name="item.code"
              >
                {{ item.desc }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
        </u-form>
      </view>
      <view class="tips">
        *仅支持设置1个融资收款账户，个体户店铺绑定对私账户，企业店铺绑定对公账户
      </view>
      <cust-fixed>
        <view class="bottom-box bg-filter">
          <view class="safe-area flex-dr flex-aic">
            <view class="button back" @click="handleBack">返回</view>
            <view class="button" @click="handleClick">确定</view>
          </view>
        </view>
      </cust-fixed>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      indicatorList: [],
      accountTypes: [
        { code: 1, desc: '对公' },
        { code: 2, desc: '对私' }
      ], // 平台名称列表
      formData: {
        // date为当前时间，格式为yyyy-MM-dd
        date: new Date().toLocaleDateString().replace(/\//g, '-')
      }
    };
  },
  onLoad(options) {
    uni.setNavigationBarTitle({
      title: options.id ? '编辑账户' : '新增账户'
    });
    this.$getDict('indicator').then((res) => {
      console.log('字典查询结果', res);
      this.indicatorList = res.indicator;
    });
  },
  methods: {
    onRefresh() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    handleClick() {
      console.log('点击添加账户');
    },
    handleBack() {
      uni.navigateBack();
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 20rpx;
}
.tips {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #cccccd;
}
.card:not(:last-child) {
  margin-bottom: 20rpx;
}
.bottom-box {
  width: 100%;
  padding: 30rpx;
  z-index: 9;
}
.button.back {
  width: 200rpx;
  background: #fff;
  color: #212121;
  box-shadow: 0 0 0 4rpx rgba(0, 0, 0, 0.05);
  margin-right: 30rpx;
}
</style>
