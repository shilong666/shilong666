<template>
  <view class="records-box">
    <view class="filter-box flex-jcb">
      <view
        class="item flex-aic flex-jcc"
        :class="{ active: index === current }"
        v-for="(item, index) in statusList"
        :key="index"
        @click="handleStatusChange(index)"
      >
        {{ item.desc }}
      </view>
    </view>
    <view
      class="record-box flex-dr"
      v-for="(item, index) in list"
      :key="index"
      @click="handleToDetail"
    >
      <image :src="item.icon" />
      <view class="info">
        <view class="type">{{ item.type }}</view>
        <view>{{ item.label }}</view>
        <view>{{ item.date }}</view>
      </view>
      <view class="amt-status">
        <view class="amt">{{ item.amt }}</view>
        <view class="status">{{ item.status }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import outPng from '../../../static/images/amtTransferOut/out.png';
import backPng from '../../../static/images/amtTransferOut/back.png';
import inPng from '../../../static/images/amtTransferOut/in.png';
export default {
  data() {
    return {
      current: 0,
      statusList: [
        {
          code: '1',
          desc: '全部'
        },
        {
          code: '2',
          desc: '尾款入账'
        },
        {
          code: '3',
          desc: '提现转出'
        },
        {
          code: '4',
          desc: '偿还用款'
        }
      ],
      list: [
        {
          type: '提现转出',
          label: '提现卡****0268',
          date: '2024-09-10',
          amt: '-1000.00',
          status: '审核中',
          icon: outPng
        },
        {
          type: '偿还用款',
          label: '订单号4623786284332',
          date: '2024-09-10',
          amt: '-1000.00',
          icon: backPng
        },
        {
          type: '尾款入账',
          label: '订单号4623786284332',
          date: '2024-09-10',
          amt: '1000.00',
          icon: inPng
        },
        {
          type: '提现转出',
          label: '提现卡****0268',
          date: '2024-09-10',
          amt: '-1000.00',
          status: '已转出',
          icon: outPng
        },
        {
          type: '提现转出',
          label: '提现卡****0268',
          date: '2024-09-10',
          amt: '-1000.00',
          status: '失败',
          icon: outPng
        }
      ]
    };
  },
  methods: {
    handleDetail() {
      uni.navigateTo({
        url: '/pages/amtApply/detail'
      });
    },
    handleStatusChange(index) {
      this.current = index;
    },
    handleToDetail() {
      uni.navigateTo({
        url: '/pages/amtTransferOut/recordDetail'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.records-box {
  .filter-box {
    padding: 0 0 30rpx 0;
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
  .record-box {
    width: 100%;
    padding: 20rpx;
    background: #fff;
    border-radius: 20rpx;
    image {
      width: 60rpx;
      height: 60rpx;
    }
    .info {
      flex: 1;
      color: #c9c9c9;
      font-size: 24rpx;
      padding-left: 20rpx;
      .type {
        font-size: 28rpx;
        color: #212121;
      }
      > view:not(:first-child) {
        margin-top: 10rpx;
      }
    }
    .amt-status {
      text-align: right;
      .status {
        margin-top: 10rpx;
        color: #f99122;
      }
    }
  }
  .record-box:not(:last-child) {
    margin-bottom: 20rpx;
  }
}
</style>
