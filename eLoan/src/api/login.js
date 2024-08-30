import request from '@/utils/request.js';

/**
 * 协议雷彪查询
 * @param {Object} protocolType
 */
export function protocolList(protocolType) {
	return request({
		url: 'global-service/system/protocol/list?protocolType=' + protocolType,
		method: 'get'
	})
}

/**
 * 发送短信验证码
 * @param {Object} data
 * {
  "number": "",
  "numType": "email|phone",
  "sceneType": "Login"
}
 */
export function getSmsVaildCode(data) {
	return request({
		url: 'global-service/system/validCode/getSmsVaildCode',
		method: 'post',
		data
	})
}

/**
 * 校验验证码
 * @param {Object} data
 * {
  "number": "string",
  "numType": "mobile",
  "sceneType": "Login",
  "validCode": "string",
  "validCodeType": "SMS"
}
 */
export function checkCode(data) {
	return request({
		url: 'global-service/system/validCode/checkCode',
		method: 'post',
		data
	})
}

/**
 * 用户登录（新用户自动注册）
 * @param {Object} data
 * {
  "loginType": "validCode",
  "userName": "string",
  "sn": "string",
  "validCode": "string"
}
 */
export function userLogin(data) {
	return request({
		url: 'member-service/auth/userLogin',
		method: 'post',
		data
	})
}

/**
 * 刷新token
 * @param {Object} data {sn、mobile}
 */
export function refreshToken(data) {
	return request({
		url: 'member-service/auth/refreshToken',
		method: 'post',
		data
	})
}