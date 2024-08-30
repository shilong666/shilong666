<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card serviceFeeCard flex-dc flex-aic">
        <view class="amt">￥{{ $utils.parseToMoney(1024) }}</view>
        <view class="label">待缴纳服务费金额（元）</view>
      </view>
      <view class="card plat-card">
        <view class="plat">平台收款账户</view>
        <view class="card-content">
          <view>深圳星融信息科技有限公司</view>
          <view class="num"> 6000 0000 1234 5678 899 </view>
          <view>中国建设银行福田华强北支行</view>
        </view>
      </view>
      <view class="card form-card">
        <u-form label-width="200" :model="formData" :rules="formRules">
          <u-form-item label="打款日期" prop="date" required>
            <view class="date-box flex-dr flex-aic" @click="handleDatePicker">
              <u-input
                placeholder="请选择打款日期"
                v-model="formData.date"
                input-align="right"
              ></u-input>
              <u-icon name="arrow-right" color="#9b9b9b"></u-icon>
            </view>
          </u-form-item>
          <u-form-item label="打款凭据" prop="files" required>
            <cust-upload v-model="formData.files">
              <template slot="icon">
                <view class="flex-dc flex-aic flex-jcc cust-upload-box">
                  <u-icon name="plus" color="#9C9DA0" size="38rpx"></u-icon>
                  <view style="height: 28rpx; line-height: 32rpx">
                    点击上传
                  </view>
                </view>
              </template>
            </cust-upload>
          </u-form-item>
        </u-form>
      </view>
      <view class="tips">
        *线下足额支付服务费到平台对公收款账户，审核通过后，资金方进行放款审核。如遇资金方放款失败，平台将退还全额服务费。
      </view>
      <cust-fixed>
        <view class="bottom-box bg-filter">
          <view class="safe-area">
            <view class="button" @click="handleSubmit">提交</view>
          </view>
        </view>
      </cust-fixed>
    </view>

    <u-picker
      mode="time"
      v-model="showDatePicker"
      :params="datePickerParams"
      @confirm="handleDateConfirm"
    ></u-picker>
    <apply-success ref="applySuccess" @confirm="handleBack" />
  </Layout>
</template>

<script>
import ApplySuccess from './components/applySuccess.vue';
export default {
  components: {
    ApplySuccess
  },
  data() {
    return {
      showDatePicker: false,
      datePickerParams: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      formData: {
        date: '',
        files: []
      },
      formRules: {
        date: [
          {
            required: true,
            message: '请选择打款日期',
            trigger: ['change', 'blur']
          }
        ],
        files: [
          {
            required: true,
            message: '请上传打款凭证',
            trigger: ['change', 'blur']
          }
        ]
      }
    };
  },
  methods: {
    handleDatePicker() {
      this.showDatePicker = true;
    },
    handleDateConfirm(e) {
      this.formData.date = `${e.year}-${e.month}-${e.day}`;
    },
    handleSubmit() {
      this.$refs.applySuccess.show();
    },
    handleBack() {
      uni.navigateBack();
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 20rpx;
}
.serviceFeeCard {
  background-image: linear-gradient(
    180deg,
    rgba(43, 86, 246, 1) 0%,
    rgba(123, 150, 255, 1) 100%
  );

  padding: 30rpx;
  .amt {
    font-size: 52rpx;
    font-weight: bold;
    color: #fff;
  }
  .label {
    font-size: 24rpx;
    margin-top: 10rpx;
    color: rgba(255, 255, 255, 0.5);
  }
}
.plat-card {
  background-image: linear-gradient(
    180deg,
    rgba(43, 86, 246, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  padding: 0;
  .plat {
    padding: 20rpx 20rpx 10rpx 20rpx;
    color: #fff;
    font-size: 28rpx;
  }
  .card-content {
    background: #fff;
    border-radius: 20rpx;
    color: #9b9b9b;
    padding: 30rpx 20rpx;
    .num {
      font-size: 42rpx;
      font-weight: bold;
      margin: 10rpx 0;
      color: #212121;
    }
  }
}
.form-card {
  .date-box {
    position: relative;
    width: 100%;
  }
  .date-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .cust-upload-box {
    width: 100%;
    height: 100%;
    background: #f4f6fc;
    color: #9c9da0;
    font-size: 24rpx;
  }
}
.tips {
  color: #9a9a9a;
  font-size: 24rpx;
}
.bottom-box {
  padding: 20rpx;
}
</style>
