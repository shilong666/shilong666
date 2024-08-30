<template>
  <view
    class="count-down"
    :style="'color:' + color"
    :disabled="getCount != count"
    @click="custClick"
  >
    {{ getCount != count ? getCount + afterText : label }}
  </view>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    label: {
      type: String,
      default: () => '发送验证码'
    },
    count: {
      type: Number,
      default: () => 60
    },
    afterText: {
      type: String,
      default: () => '秒'
    },
    color: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      currentCount: 0
    };
  },
  computed: {
    getCount() {
      return this.count - this.currentCount;
    }
  },
  methods: {
    custClick() {
      if (this.currentCount != 0) {
        return;
      }
      this.$emit('custClick');
    },
    start() {
      if (this.currentCount != 0) {
        return;
      }
      this.$emit('start');
      this.currentCount++;
      this.countDownInterval = setInterval(() => {
        if (this.currentCount != this.count) {
          this.currentCount++;
        } else {
          this.currentCount = 0;
          clearInterval(this.countDownInterval);
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    if (this.countDownInterval) {
      clearInterval(this.countDownInterval);
    }
  }
};
</script>

<style scoped lang="scss">
.count-down {
  &[disabled] {
    pointer-events: none;
  }
}
</style>
