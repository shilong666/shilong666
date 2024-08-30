<template>
  <view class="steps flex-dr">
    <view
      class="steps-item flex-dc flex-aic"
      :class="{ active: current >= index }"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="steps-item-circle flex-aic flex-jcc">
        {{ index + 1 }}
      </view>
      <view class="steps-item-title" :style="{ fontSize: `${fontSize}rpx` }">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0
    },
    list: {
      // 步骤文案 如[{name:'第一步'},{name:'第二步'}]
      type: Array,
      default: []
    },
    fontSize: {
      type: Number,
      default: 20
    }
  }
};
</script>

<style scoped lang="scss">
.steps {
  .steps-item {
    position: relative;
    flex: 1;
    .steps-item-circle {
      width: 40rpx;
      height: 40rpx;
      background: #e2e2e2;
      color: #999999;
      border-radius: 20rpx;
    }
    .steps-item-title {
      color: #999999;
      font-size: 20rpx;
      margin-top: 20rpx;
    }
  }
  .steps-item:not(:first-child)::after {
    content: ' ';
    position: absolute;
    width: calc(100% - 40rpx);
    height: 2rpx;
    background: #e2e2e2;
    right: calc(50% + 20rpx);
    top: 19rpx;
  }
  .steps-item.active {
    .steps-item-circle {
      color: #fff;
      background: var(--primary-color);
    }
    .steps-item-title {
      color: var(--primary-color);
    }
  }
  .steps-item.active:not(:first-child)::after {
    background: var(--primary-color);
  }
}
</style>
