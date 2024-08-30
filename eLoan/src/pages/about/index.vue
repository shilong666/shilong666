<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card">
        <u-parse :html="html"></u-parse>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      html: '<h1>关于我们</h1>'
    };
  }
};
</script>

<style></style>
