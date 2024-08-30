import {
	request
} from '@/utils/request.js';

/**
 * 根据数据字典类型查询数据字典值
 * @param {Object} dictType
 */
export function fetchDictionaryList(dictType) {
	return request({
		url: 'opms-base/fetchDictionaryList',
		data: {
			dictType
		}
	})
}

/**
 * 攻略列表查询接口
 * @param {Object} strategyType 
 * A	奖励规则 
 * B	加盟指引
 * C	新增员工页的规则说明
 */
export function fetchAssistStrategyList(strategyType) {
	return request({
		url: 'opms-base/fetchAssistStrategyList',
		data: {
			strategyType
		}
	})
}


/**
 * 获取会员账户信息
 * @param {Object} data
 */
export function fetchMemberAcctInfo(data) {
	return request({
		url: 'opms-base/fetchMemberAcctInfo',
		data
	})
}

/**
 * 本雾收款信息查询接口
 * @param {Object} data
 */
export function fetchPlatReceiveInfo(data) {
	return request({
		url: 'opms-base/fetchPlatReceiveInfo',
		data
	})
}

/**
 * 生成推广二维码
 * @param {Object} qrCodeType 
 * mCode	会员推广码
 * aCode	经销商渠道码
 * sCode	门店推广码
 * cCode	会员码
 * @param {String} storeId 门店id 生成门店推广码时候必传 
 */
export function genCustQrCode(qrCodeType, storeId) {
	return request({
		url: 'cdms-base/genCustQrCode',
		data: {
			qrCodeType,
			storeId
		}
	})
}


/**
 * 门店保证金支付二维码
 * @param {Object} storeId
 */
export function fetchStoreMarginCode(storeId) {
	return request({
		url: 'opms-base/fetchStoreMarginCode',
		data: {
			storeId
		}
	})
}

/**
 * 根据lat和lng解析当前位置
 * @param {Object} lat
 * @param {Object} lng
 */
export function fetchCoordinateAddr(lat, lng) {
	return request({
		url: 'opms-base/fetchCoordinateAddr',
		data: {
			lat,
			lng
		}
	})
}

/**
 * 查询门店账户余额
 * @param {Object} storeId
 */
export function fetchStoreAcctInfo(data) {
	return request({
		url: 'opms-base/fetchStoreAcctInfo',
		data
	})
}

/**
 * 查询当前页面的图片列表
 * @param {Object} moduleCode
 */
export function fetchMobilePicList(moduleCode){
	return request({
		url: 'opms-base/fetchMobilePicList',
		data: {
			moduleCode
		},
		showLoading: false
	})
}

/**
 * 校验短信验证码是否正确
 * @param {Object} data
 * {
	 phoneNo: 手机号，
	 validType: 短信验证码类型
	 smsValidCode: 短信验证码
 }
 */
export function checkSmsValidCode(data){
	return request({
		url: 'opms-base/checkSmsValidCode',
		data
	})
}