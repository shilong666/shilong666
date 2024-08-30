<template>
</template>

<script>
	export default {
		mounted() {
			console.log('页面入参', this.$route.query)
			const {
				url
			} = this.$route.query;
			if (url) {
				window.location.replace(decodeURIComponent(url))
			}
		}
	}
</script>

<style>
</style>