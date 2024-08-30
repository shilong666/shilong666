<template>
  <u-keyboard
    ref="uKeyboard"
    mode="number"
    :dot-enabled="true"
    v-model="visible"
    @change="keyboardChange"
    @backspace="keyboardBackspace"
    :tooltip="false"
    :safe-area-inset-bottom="true"
  >
    <view class="pop-box">
      <view class="title">请输入还款金额（元）</view>
      <view class="input flex-dr flex-aie">
        <view class="money">￥{{ $utils.parseToMoney(money) }}</view>
        <view class="close flex-aic flex-jcc" @click="handleCloseMoney">
          <u-icon
            name="close-circle-fill"
            size="40rpx"
            color="#C4C4C4"
          ></u-icon>
        </view>
        <view class="button" @click="handleAllMoney">全部</view>
      </view>
      <view class="sum-amt">
        最大可请款金额 {{ $utils.parseToMoney(maxMoney) }} 元
      </view>
      <view class="sum-amt" v-if="serviceFee">
        服务费金额 {{ $utils.parseToMoney(serviceFee) }} 元
      </view>
      <view class="confirm-button button" @click="handleConfirm">确定</view>
    </view>
  </u-keyboard>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      money: '',
      maxMoney: 8292024.92,
      serviceFeeRate: 0
    };
  },
  computed: {
    serviceFee() {
      return this.serviceFeeRate * Number(this.money || 0);
    }
  },
  methods: {
    show({ money, serviceFeeRate }) {
      this.visible = true;
      this.maxMoney = money;
      this.serviceFeeRate = serviceFeeRate || 0;
    },
    keyboardChange(e) {
      if (e === '.') {
        if (this.money.indexOf('.') === -1) {
          this.money += e;
        }
      } else {
        this.money = String(Number(this.money + e));
        if (Number(this.money) > this.maxMoney) {
          this.money = String(this.maxMoney);
        }
      }
    },
    keyboardBackspace() {
      this.money = this.money.slice(0, -1);
      //   如果字符串最后一个字符也是 . 的话，也删掉
      if (this.money.slice(-1) === '.') {
        this.money = this.money.slice(0, -1);
      }
    },
    handleCloseMoney() {
      this.money = '';
    },
    handleAllMoney() {
      this.money = this.maxMoney;
    },
    handleConfirm() {
      if (this.money == '' || Number(this.money) == 0) {
        uni.showToast({
          title: '金额不能为0',
          icon: 'none'
        });
        return;
      }
      this.$emit('confirm', this.money);
      this.visible = false;
      this.money = '';
    }
  }
};
</script>

<style scoped lang="scss">
.pop-box {
  padding: 30rpx;
  .title {
    font-size: 38rpx;
    font-weight: bold;
  }
  .input {
    padding: 20rpx 0;
    border-bottom: 2rpx solid #f7f7f7;
    .money {
      flex: 1;
      font-weight: bold;
      font-size: 52rpx;
      word-break: break-all;
    }
    .close {
      height: 80rpx;
    }
    .button {
      background: #fff;
      border: none;
      color: var(--primary-color);
      width: 100rpx;
    }
  }
  .sum-amt {
    color: #a3a3a3;
    font-size: 24rpx;
    margin-top: 10rpx;
  }
  .confirm-button {
    margin-top: 40rpx;
  }
}
/deep/ .u-drawer-bottom {
  border-radius: 20rpx 20rpx 0 0;
}
</style>
