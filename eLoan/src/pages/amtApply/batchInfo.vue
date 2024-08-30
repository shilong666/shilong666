<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card batch-info-card">
        <view class="batch-no flex-dr flex-aic"> 批次号：2024081900001 </view>
        <view class="card-content">
          <view class="amt-info flex-dr">
            <view class="amt-item">
              <view class="amt-label"> 订单合计金额（元） </view>
              <view class="amt">
                {{ $utils.parseToMoney(8292024.92) }}
              </view>
            </view>
            <view class="amt-item">
              <view class="amt-label"> 订单数量 </view>
              <view class="amt">100 </view>
            </view>
          </view>
        </view>
      </view>
      <view class="search-card">
        <u-search
          placeholder="请输入订单号"
          v-model="orderNo"
          bg-color="transparent"
          search-icon-color="#c9c9c9"
          placeholder-color="#c9c9c9"
        ></u-search>
      </view>
      <view class="filter-box flex-jcb">
        <view
          class="item flex-aic flex-jcc"
          :class="{ active: index === current }"
          v-for="(item, index) in orderStatusList"
          :key="index"
          @click="handleStatusChange(index)"
        >
          {{ item.desc }}
        </view>
      </view>

      <view class="order-list-card">
        <view
          class="order-card"
          v-for="index in 5"
          :key="index"
          @click="handleToOrderDetail"
        >
          <view class="order-no-status flex-jcb flex-aic">
            <view class="no">
              <text class="label">订单号：</text>
              <text>23163278243543452</text>
            </view>
            <view class="status" :class="{ active: index != 1 }">{{
              index != 1 ? '已还款' : '未还款'
            }}</view>
          </view>
          <view class="bottom flex-dr flex-aic">
            <view class="amt-box flex-dr">
              <view class="item">
                <view class="label">订单金额</view>
                <view class="amt">100.00</view>
              </view>
              <view class="item">
                <view class="label">结算金额</view>
                <view class="amt">100.00</view>
              </view>
              <view class="item">
                <view class="label">提款金额</view>
                <view class="amt">100.00</view>
              </view>
              <view class="item">
                <view class="label">尾款金额</view>
                <view class="amt">100.00</view>
              </view>
            </view>
            <u-icon name="arrow-right" color="#c9c9c9"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      orderNo: '',
      orderStatusList: [
        {
          code: '1',
          desc: '全部'
        },
        {
          code: '2',
          desc: '未还款'
        },
        {
          code: '3',
          desc: '已还款'
        }
      ],
      current: 0
    };
  },
  onReachBottom() {
    console.log('页面触底了');
  },
  methods: {
    handleStatusChange(index) {
      this.current = index;
    },
    handleToOrderDetail() {
      uni.navigateTo({
        url: '/pages/amtApply/batchOrderDetail'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.batch-info-card {
  border-radius: 20rpx;
  padding: 0;
  background: linear-gradient(
    180deg,
    rgba(43, 86, 246, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  .batch-no {
    padding: 20rpx 30rpx;
    color: #fff;
    font-size: 24rpx;
  }
  .card-content {
    border-radius: 20rpx;
    background: #fff;
    padding: 30rpx;
    .amt-info {
      .amt-item {
        flex: 1;
        .amt-label {
          color: #9a9a9a;
          font-size: 24rpx;
        }
        .amt {
          font-size: 32rpx;
          font-weight: bold;
          margin-top: 40rpx;
        }
      }
    }
  }
}
.search-card {
  background: #fff;
  border-radius: 20rpx;
  margin-top: 20rpx;
  padding: 10rpx 0;
  /deep/ .u-action {
    position: relative;
  }
  /deep/ .u-action::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2rpx;
    background: #c9c9c9;
  }
  /deep/ .u-action-active {
    width: 100rpx;
  }
}
.filter-box {
  padding: 30rpx 0;
  .item {
    width: 160rpx;
    height: 60rpx;
    border-radius: 40rpx;
    background: #fff;
    color: #212121;
    font-size: 24rpx;
    transition: all 0.2s linear;
  }
  .item.active {
    color: #fff;
    background: var(--primary-color);
  }
}
.order-list-card {
  background: #fff;
  padding: 0 20rpx;
  font-size: 24rpx;
  border-radius: 30rpx;
  .order-card {
    padding-bottom: 20rpx;
    .order-no-status {
      padding: 20rpx 0;
      .no {
        .label {
          color: #c9c9c9;
        }
      }
      .status {
        width: 100rpx;
        height: 50rpx;
        color: #9e9e9e;
        background: #f5f5f5;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .status.active {
        color: #48d292;
        background: #ebf9f3;
      }
    }
    .bottom {
      .amt-box {
        flex: 1;
        .item {
          flex: 1;
          .label {
            color: #c9c9c9;
          }
          .amt {
            margin-top: 30rpx;
          }
        }
      }
    }
  }
}
</style>
