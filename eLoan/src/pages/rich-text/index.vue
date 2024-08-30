<template>
	<view class="body">
		<u-parse :html="content" selectable :tag-style="tagStyle"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ``,
				tagStyle: {
					img: 'width:100%'
				}
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync();
			this.tagStyle.img = `width:${systemInfo.screenWidth}px`
			// 从缓存中读取协议
			const richText = uni.getStorageSync('richText')
			if (richText) {
				uni.setNavigationBarTitle({
					title: richText.title || '协议'
				})
				this.content = richText.content
			}else{
				uni.navigateBack()
			}
		},
		beforeDestroy() {
			uni.removeStorage({
				key:'richText'
			})
		},
		methods: {

		}
	}
</script>

<style scoped>
	.body{
		height: auto;
		padding: 20rpx;
		text-align: justify;
	}

</style>
