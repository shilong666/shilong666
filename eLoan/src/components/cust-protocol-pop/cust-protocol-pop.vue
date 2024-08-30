<template>
  <u-popup v-model="popShow" mode="bottom" closeable border-radius="20">
    <view class="pop-box" :key="popShow">
      <view class="title flex-jcc">{{ title }}</view>
      <view class="content" id="popContentBox">
        <scroll-view
          scroll-y="true"
          style="height: 100%"
          @scrolltolower="buttonDisabled = false"
        >
          <view id="popContent">
            <u-parse :html="content"></u-parse>
          </view>
        </scroll-view>
      </view>
      <view class="primary-button">
        <view class="button" :disabled="buttonDisabled" @click="comfirm">
          {{ btTitle }}
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'user-agreement',
  props: {
    title: {
      type: String,
      default() {
        return '';
      }
    },
    content: {
      type: String,
      default() {
        return '';
      }
    },
    bgColor: {
      type: String,
      default: 'var(--primary-color)'
    },
    btTitle: {
      type: String,
      default: '下一步'
    }
  },
  data() {
    return {
      popShow: false,
      buttonDisabled: true
    };
  },
  methods: {
    show() {
      this.popShow = true;
      // 弹窗显示的时候将按钮按钮禁用状态
      this.buttonDisabled = true;

      // 检查文字内容是否超过滚动显示区域 未超过直接显示非禁用状态
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this);
        query
          .selectAll('#popContentBox,#popContent')
          .boundingClientRect((dataArr) => {
            if (dataArr.length == 2) {
              if (dataArr[0].height - dataArr[1].height >= 0) {
                this.buttonDisabled = false;
              } else {
                this.buttonDisabled = true;
              }
            }
          })
          .exec();
      });
    },
    close() {
      this.popShow = false;
    },
    comfirm() {
      this.close();
      this.$emit('comfirm');
    }
  }
};
</script>

<style lang="scss" scoped>
.pop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.pop-box {
  width: 100%;
  position: relative;
  background: var(--light-color);
  border-radius: 20rpx;

  .title {
    font-size: 32rpx;
    padding: 20rpx 0;
    color: #3a3a3a;
    font-weight: 500;
  }

  .content {
    height: calc(100vh - 580rpx);
    padding: 0 28rpx;
    text-align: justify;
    font-size: 26rpx;
    color: #666666;
  }

  .primary-button {
    padding: 40rpx 68rpx;

    .tips {
      font-size: 20rpx;
      color: gray;
      margin-top: 10rpx;
      text-align: center;
    }
  }

  .close {
    position: absolute;
    bottom: -200rpx;
    width: 100%;
    height: 200rpx;
  }
}
</style>
