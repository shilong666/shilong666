<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="steps">
        <steps :list="steps" :current="currentStep" :font-size="28"></steps>
      </view>
      <component
        :is="steps[currentStep].component"
        ref="stepComponent"
        v-bind="steps[currentStep].bindData || {}"
      ></component>

      <cust-fixed>
        <view class="bottom-box bg-filter">
          <view class="safe-area flex-dr flex-aic">
            <view
              class="button info"
              v-show="steps[currentStep].before"
              @click="handleBeforeStep"
            >
              上一步
            </view>
            <view
              class="button"
              v-show="steps[currentStep].next"
              @click="handleAfterStep"
            >
              下一步
            </view>
            <view
              class="button"
              v-show="steps[currentStep].face"
              @click="handleFace"
            >
              开始人脸识别
            </view>
          </view>
        </view>
      </cust-fixed>
    </view>
  </Layout>
</template>

<script>
import BusinessLicense from './components/businessLicense.vue';
import PersonInfo from './components/personInfo.vue';
import FaceCheck from './components/faceCheck.vue';
import Steps from './components/steps.vue';
export default {
  components: {
    BusinessLicense,
    PersonInfo,
    FaceCheck,
    Steps
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        {
          name: '营业执照信息',
          component: 'BusinessLicense',
          next: true
        },
        {
          name: '法人信息',
          component: 'PersonInfo',
          next: true,
          before: true,
          bindData: {
            name: '企业法人'
          }
        },
        {
          name: '法人人脸核验',
          component: 'faceCheck',
          before: true,
          face: true
        }
      ]
    };
  },
  methods: {
    handleBeforeStep() {
      this.currentStep--;
      this.handleStepComponentInit();
    },
    handleAfterStep() {
      this.$refs.stepComponent.getData().then(() => {
        this.currentStep++;
        this.handleStepComponentInit();
      });
    },
    handleStepComponentInit() {
      this.$nextTick(() => {
        this.$refs.stepComponent.init();
      });
    },
    handleFace() {}
  }
};
</script>

<style scoped lang="scss">
.body-content {
  padding: 0 30rpx;
}
.steps {
  padding: 60rpx 0;
}
.bottom-box {
  //   position: sticky;
  //   bottom: 0;
  //   left: 0;
  width: 100%;
  padding: 30rpx;
  .button.info {
    width: 300rpx;
    background: #fff;
    color: #212121;
    margin-right: 20rpx;
    box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.3);
  }
}
</style>
