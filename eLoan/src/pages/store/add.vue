<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card">
        <u-form label-width="200">
          <u-form-item label="平台名称" prop="platName">
            <u-radio-group v-model="formData.platName">
              <u-radio
                v-for="(item, index) in platNameList"
                :key="index"
                :name="item.code"
              >
                {{ item.desc }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="店铺名称" prop="name">
            <u-input
              v-model="formData.name"
              placeholder="请输入店铺名称"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="店铺编号" prop="no">
            <u-input
              v-model="formData.no"
              placeholder="请输入店铺编号"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="店铺主账户ID" prop="id">
            <u-input
              v-model="formData.id"
              placeholder="请输入店铺主账户id"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="店铺配置时间" prop="id">
            <u-input v-model="formData.date" disabled input-align="right" />
          </u-form-item>
        </u-form>
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
      platNameList: [
        { code: 1, desc: '抖音' },
        { code: 2, desc: '快手' },
        { code: 3, desc: '拼多多' }
      ], // 平台名称列表
      formData: {
        // date为当前时间，格式为yyyy-MM-dd
        date: new Date().toLocaleDateString().replace(/\//g, '-')
      }
    };
  },
  onLoad(options) {
    uni.setNavigationBarTitle({
      title: options.id ? '编辑店铺' : '新增店铺'
    });
  },
  methods: {
    onRefresh() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    handleClick() {
      console.log('点击添加店铺');
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
