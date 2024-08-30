let config = {
	baseUrl: '/stage-api/',
	fileUrl: '/stage-api/',
	filePreviewPrefix: '/stage-file-api/',
	productInfo: { // 融资产品信息
		productPricingCode: 'fp01',
		productCode: 'p01'
	}
}


// h5环境直接将config装到window,其它环境采用模块导出（建议统一使用getConfig()函数获取config）
if (window) {
	window.config = config;
} else {
	module.exports = {
		config
	}
}