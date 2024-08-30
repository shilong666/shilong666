<template>
  <view class="bussiness-license">
    <view class="label"> 上传{{ name }}身份证 </view>
    <view class="sub-label">仅用于实名认证</view>
    <view class="card flex-jcb flex-aic">
      <view>
        <view class="title">头像页</view>
        <view class="sub-title">上传身份证头像页</view>
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
            <image src="/static/images/companyAuth/legalPerson01.png" />
          </view>
        </template>
      </cust-upload>
    </view>
    <view class="card flex-jcb flex-aic">
      <view>
        <view class="title">国徽页</view>
        <view class="sub-title">上传身份证国徽页</view>
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
            <image src="/static/images/companyAuth/legalPerson02.png" />
          </view>
        </template>
      </cust-upload>
    </view>
    <view class="tips"> *证件需要内容完整，图像清晰，真实且在有效期内 </view>
    <view class="form-box">
      <view class="label">{{ name }}信息</view>
      <view class="form-card">
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
    </view>
  </view>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '企业法人'
    }
  },
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
