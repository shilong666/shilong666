<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <AuthType @confirm="handleConfirm" />
    </view>
  </Layout>
</template>

<script>
import AuthType from './components/authType.vue';
const typeMap = {
  legalPerson: '/pages/companyAuth/legalPerson',
  operator: '/pages/companyAuth/operator'
};
export default {
  components: {
    AuthType
  },
  data() {
    return {};
  },
  methods: {
    handleConfirm(e) {
      uni.redirectTo({
        url: typeMap[e]
      });
    }
  }
};
</script>

<style></style>
