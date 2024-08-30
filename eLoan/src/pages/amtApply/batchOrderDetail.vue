<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card">
        <u-form label-width="180">
          <u-form-item label="订单号"> 327634776342343 </u-form-item>
          <u-form-item label="订单创建时间"> 2024-08-19 12:00:00 </u-form-item>
          <u-form-item label="订单状态"> 已提款 </u-form-item>
          <u-form-item label="订单金额"> 100.00 </u-form-item>
          <u-form-item label="结算金额"> -- </u-form-item>
          <u-form-item label="提款金额"> 72.00 </u-form-item>
          <u-form-item label="已用款时间"> 7天 </u-form-item>
          <u-form-item label="用款利息"> 5.45 </u-form-item>
          <u-form-item label="服务费"> 3.25 </u-form-item>
          <u-form-item label="尾款金额"> -- </u-form-item>
          <u-form-item label="还款状态"> 未还款 </u-form-item>
          <u-form-item label="还款时间"> -- </u-form-item>
        </u-form>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.card {
  padding: 0 30rpx;
}
</style>
