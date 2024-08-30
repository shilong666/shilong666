<template>
  <Layout :on-refresh="onRefresh">
    <view class="body-content">
      <view class="card result-card error">
        <view class="result flex-jcb">
          <view>认证结果</view>
          <view class="status">审核中</view>
        </view>
        <view class="desc">
          <text
            >失败原因：该公司基础信息不正确，请重新惊醒申请认证。感谢您的关注和使用</text
          >
        </view>
      </view>
      <view class="title">企业信息</view>
      <view class="card info-card">
        <view class="flex-dc flex-aic">
          <image src="/static/images/companyAuth/legalPerson01.png" />
        </view>
        <u-form :model="formData" label-width="260">
          <u-form-item label="企业名称" prop="companyName">
            <u-input
              v-model="formData.companyName"
              placeholder="请输入企业名称"
              disabled
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="统一社会信用代码" prop="companyCode">
            <u-input
              v-model="formData.companyCode"
              placeholder="请输入统一社会信用代码"
              disabled
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="注册地址" prop="companyAddress">
            <u-input
              v-model="formData.companyAddress"
              placeholder="请输入注册地址"
              disabled
              input-align="right"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="title">法人信息</view>
      <view class="card info-card">
        <view class="flex-dc flex-aic">
          <image src="/static/images/companyAuth/legalPerson01.png" />
          <image src="/static/images/companyAuth/legalPerson02.png" />
        </view>
        <u-form :model="formData" label-width="260">
          <u-form-item label="真实姓名" prop="legalPersonName">
            <u-input
              v-model="formData.legalPersonName"
              placeholder="请输入真实姓名"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="身份证号码" prop="legalPersonCode">
            <u-input
              v-model="formData.legalPersonCode"
              placeholder="请输入身份证号码"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="有效期" prop="legalPersonValid">
            <u-input
              v-model="formData.legalPersonValid"
              placeholder="请输入身份证有效期"
              input-align="right"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="title">经办人信息</view>
      <view class="card info-card">
        <view class="flex-dc flex-aic">
          <image src="/static/images/companyAuth/legalPerson01.png" />
          <image src="/static/images/companyAuth/legalPerson02.png" />
        </view>
        <u-form :model="formData" label-width="260">
          <u-form-item label="真实姓名" prop="legalPersonName">
            <u-input
              v-model="formData.legalPersonName"
              placeholder="请输入真实姓名"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="身份证号码" prop="legalPersonCode">
            <u-input
              v-model="formData.legalPersonCode"
              placeholder="请输入身份证号码"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="有效期" prop="legalPersonValid">
            <u-input
              v-model="formData.legalPersonValid"
              placeholder="请输入身份证有效期"
              input-align="right"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="bottom-box bg-filter">
        <view class="safe-area">
          <view class="button" @click="handleClick">重新认证</view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    onRefresh() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    handleClick() {
      uni.redirectTo({
        url: '/pages/companyAuth/index?type=reAuth'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.result-card {
  padding: 0 30rpx;
  .result {
    padding: 30rpx 0;
    border-bottom: 2rpx solid #f5f6fd;
  }
  .desc {
    padding: 30rpx 0;
  }
}
.result-card.error {
  .status,
  .desc {
    color: red;
  }
}
.result-card.process {
  .status {
    color: #f98a03;
  }
}
.result-card.success {
  .status {
    color: #0ccb82;
  }
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  padding: 30rpx 0;
}
.info-card {
  image {
    width: 276rpx;
    height: 190rpx;
    margin-bottom: 34rpx;
  }
  /deep/.u-form-item--left__content__label {
    color: #999;
  }
}
.bottom-box {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30rpx;
}
</style>
