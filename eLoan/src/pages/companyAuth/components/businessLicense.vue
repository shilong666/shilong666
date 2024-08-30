<template>
  <view class="bussiness-license">
    <view class="label"> 上传营业执照 </view>
    <view class="sub-label">仅用于企业工商信息认证</view>
    <view class="card flex-jcb flex-aic">
      <view>
        <view class="title">营业执照</view>
        <view class="sub-title">上传营业执照照片</view>
      </view>
      <cust-upload
        :count="1"
        :width="318"
        :height="168"
        :border="false"
        :border-radius="20"
      >
        <template slot="icon">
          <u-icon
            name="plus-circle-fill"
            size="50"
            color="var(--primary-color)"
          ></u-icon>
        </template>
        <template slot="upload-bg">
          <view class="upload-bg flex-aic flex-jcc">
            <image src="/static/images/companyAuth/businessLicense.png" />
          </view>
        </template>
      </cust-upload>
    </view>
    <view class="tips"> *证件需要内容完整，图像清晰，真实且在有效期内 </view>
    <view class="form-box">
      <view class="label">企业信息</view>
      <view class="form-card">
        <u-form :model="formData" label-width="260">
          <u-form-item label="企业名称" prop="companyName">
            <u-input
              v-model="formData.companyName"
              placeholder="请输入企业名称"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="统一社会信用代码" prop="companyCode">
            <u-input
              v-model="formData.companyCode"
              placeholder="请输入统一社会信用代码"
              input-align="right"
            />
          </u-form-item>
          <u-form-item label="注册地址" prop="companyAddress">
            <u-input
              v-model="formData.companyAddress"
              placeholder="请输入注册地址"
              input-align="right"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    init() {},
    getData() {
      return new Promise((resolve, reject) => {
        resolve(this.formData);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.bussiness-license {
  .label,
  .title {
    font-size: 32rpx;
    font-weight: bold;
  }
  .sub-label,
  .sub-title,
  .tips {
    font-size: 24rpx;
    color: var(--font-sub-color);
  }
  .card {
    margin: 30rpx 0;
    padding: 60rpx 30rpx;
    .upload-bg {
      width: 100%;
      height: 100%;
      background: #f4f6fc;
      image {
        width: 196rpx;
        height: 130rpx;
      }
    }
  }
  .form-box {
    margin-top: 60rpx;
    .form-card {
      background: #fff;
      border-radius: 20rpx;
      margin-top: 60rpx;
      padding: 20rpx 30rpx;
    }
  }
}
</style>
