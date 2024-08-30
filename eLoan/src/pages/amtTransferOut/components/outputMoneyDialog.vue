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
      <view class="title">请输入转出金额（元）</view>
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
        最大可转出金额 {{ $utils.parseToMoney(maxMoney) }} 元
      </view>
      <view class="account-swiper-box">
        <swiper :current="current" circular>
          <swiper-item v-for="(item, index) in accountList" :key="index">
            <view class="account-box">
              <view class="label">收款账户：</view>
              <view>{{ item.accountName }}</view>
              <view class="label">
                {{ $utils.addBlankToString(item.accountNum, 4) }}
              </view>
              <view>{{ item.bankName }}</view>
            </view>
          </swiper-item>
        </swiper>
        <view
          class="left-arrow flex-aic flex-jcc"
          v-if="accountList.length > 0"
          @click="handleSwiperChange('less')"
        >
          <view class="arrow-box flex-aic flex-jcc">
            <u-icon name="arrow-left" color="#fff"></u-icon>
          </view>
        </view>
        <view
          class="right-arrow flex-aic flex-jcc"
          v-if="accountList.length > 0"
          @click="handleSwiperChange('more')"
        >
          <view class="arrow-box flex-aic flex-jcc">
            <u-icon name="arrow-right" color="#fff"></u-icon>
          </view>
        </view>
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
      current: 0,
      accountList: [
        {
          accountName: '深圳华强北小店科技有限公司',
          accountNum: '6000000012345678899',
          bankName: '中国建设银行福田华强北支行'
        },
        {
          accountName: '深圳华强北小店科技有限公司',
          accountNum: '6000000012345678891',
          bankName: '中国建设银行福田华强北支行'
        },
        {
          accountName: '深圳华强北小店科技有限公司',
          accountNum: '6000000012345678892',
          bankName: '中国建设银行福田华强北支行'
        }
      ]
    };
  },
  methods: {
    show({ money }) {
      this.visible = true;
      this.maxMoney = money;
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
    },
    handleSwiperChange(type) {
      if (type === 'less') {
        this.current =
          this.current == 0 ? this.accountList.length - 1 : this.current - 1;
      } else {
        this.current =
          this.current == this.accountList.length - 1 ? 0 : this.current + 1;
      }
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
}
/deep/ .u-drawer-bottom {
  border-radius: 20rpx 20rpx 0 0;
}

.account-swiper-box {
  position: relative;
  swiper {
    swiper-item {
      display: flex;
      align-items: center;
      justify-content: center;
      .account-box {
        background: #f4f6fc;
        padding: 20rpx 30rpx;
        border-radius: 20rpx;
        color: #999;
        font-size: 26rpx;
        width: 550rpx;
        .label {
          font-size: 28rpx;
          font-weight: bold;
          color: #212121;
        }
        > view:not(:first-child) {
          margin-top: 10rpx;
        }
      }
    }
  }
  .left-arrow,
  .right-arrow {
    position: absolute;
    top: 0;
    width: 60rpx;
    height: 100%;
    .arrow-box {
      width: 50rpx;
      height: 50rpx;
      border-radius: 30rpx;
      background: var(--primary-color);
    }
  }
  .left-arrow {
    left: 0;
  }
  .right-arrow {
    right: 0;
  }
}
</style>
