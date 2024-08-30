<template>
  <Layout :refreshenable="false">
    <view class="body-content">
      <view class="card">
        <u-form label-width="180">
          <u-form-item label="客服电话"> 0755-88889999 </u-form-item>
          <u-form-item label="客服工作时间"> 9:00-18:00 </u-form-item>
        </u-form>
      </view>
      <view class="card">
        <u-form label-width="180" label-position="top">
          <u-form-item label="企业客服微信">
            <view class="qr-code">
              <image src="../../static/images/topBg.png"></image>
            </view>
          </u-form-item>
        </u-form>
      </view>
    </view>
  </Layout>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.qr-code {
  width: 100%;
  padding-left: 220rpx;
  image {
    width: 200rpx;
    height: 200rpx;
  }
}
.card {
  margin-bottom: 20rpx;
  padding: 0 30rpx;
}
</style>
