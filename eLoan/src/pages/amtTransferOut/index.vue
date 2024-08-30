<template>
  <Layout>
    <view class="body-content">
      <cust-fixed mode="top">
        <view class="top-box bg-filter">
          <view class="tabs">
            <view
              class="tab"
              :class="{ active: index === current }"
              v-for="(item, index) in tabs"
              :key="index"
              @click="handleTabChange(index)"
            >
              {{ item.title }}
            </view>
          </view>
        </view>
      </cust-fixed>
      <component :is="tabs[current].component" />
    </view>
  </Layout>
</template>

<script>
import AmtTransferOut from './components/amtTransferOut.vue';
import TransferOutRecord from './components/transferOutRecord.vue';
export default {
  components: {
    AmtTransferOut,
    TransferOutRecord
  },
  data() {
    return {
      current: 0,
      tabs: [
        {
          title: '尾款转出',
          component: 'amtTransferOut'
        },
        {
          title: '变动记录',
          component: 'transferOutRecord'
        }
      ]
    };
  },
  methods: {
    handleTabChange(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.body-content {
  padding-top: 0;
}
.top-box {
  padding: 20rpx;
  .tabs {
    background: #fff;
    display: flex;
    justify-content: space-around;
    border-radius: 20rpx;
    padding: 10rpx 0;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    .tab {
      width: 200rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20rpx;
      background: #fff;
      transition: all 0.2s linear;
    }
    .tab.active {
      background: var(--primary-color);
      color: #fff;
    }
  }
}
</style>
