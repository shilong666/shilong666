import request from '@/utils/request.js';

/**
 * 根据memberCode获取memberInfo
 * @param {Object} memberCode
 */
export function getMemberInfo(memberCode) {
	return request({
		url: 'member-service/member/getMemberInfo',
		method: 'post',
		data: {
			memberCode
		}

	})
}

/**
 * 申请信息提交
 * @param {Object} data
 */
export function preLimitApply(data) {
	return request({
		url: 'member-service/member/preLimitApply',
		method: 'post',
		data
	})
}

/**
 * 授权成功通知
 * @param {Object} applyNo
 */
export function authSuccessNotify(applyNo) {
	return request({
		url: `member-service/member/authSuccessNotify/${applyNo}`,
		method: 'get'
	})
}

/**
 * 获取完善资料地址
 */
export function getCreditUrl(applyNo) {
	return request({
		url: 'ris-service/credit/getCreditUrl',
		method: 'post',
		data: {
			applyNo
		}
	})
}

/**
 * 查询担保签署状态
 * @param {Object} applyNo
 */
export function getSignStatus(applyNo) {
	return request({
		url: 'ris-service/credit/getSignStatus',
		method: 'post',
		data: {
			applyNo
		}
	})
}

/**
 * 获取担保签署地址
 * @param {Object} applyNo
 */
export function getSignContrUrl(applyNo) {
	return request({
		url: 'ris-service/credit/getSignContrUrl',
		method: 'post',
		data: {
			applyNo
		}
	})
}

/**
 * 华润经销贷申请并注册会员
 * @param {Object} data
 */
export function crbcLoanAndRegister(data) {
	return request({
		url: 'member-service/member/crbcLoanAndRegister',
		method: 'post',
		data
	})
}

/**
 * 重新申请链接
 * @param {Object} custCode
 * @param {Object} productCode
 * @param {Object} productPricingCode
 */
export function getReapplyUrl(custCode, productCode, productPricingCode) {
	return request({
		url: `member-service/member/getReapplyUrl?custCode=${custCode}&productCode=${productCode}&productPricingCode=${productPricingCode}`,
		method: 'get'
	})
}