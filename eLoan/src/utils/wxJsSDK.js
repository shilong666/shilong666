// 获取微信公众号SDK权限
//接口请求方法
import {
	request
} from './request.js';
import {
	getPlatform
} from './index.js';
import {
	PLATFORM
} from '../../config/constants.js';
// #ifdef H5
const jWeixin = require('jweixin-module');
//获取地理位置
export const getLocation = (type) => {
	return new Promise((resolve, reject) => {
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		jWeixin.getLocation({
			type: type || 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: (res) => {
				console.log(res);
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}
/**
 * 打开地图
 * @param {Object} data
 */
export function openLocation(data) {
	return new Promise((resolve, reject) => {
		jWeixin.openLocation({
			latitude: parseFloat(data.latitude), // 纬度，浮点数，范围为90 ~ -90
			longitude: parseFloat(data.longitude), // 经度，浮点数，范围为180 ~ -180。
			name: data.name, // 位置名
			address: data.address, // 地址详情说明
			scale: 14, // 地图缩放级别,整型值,范围从1~28。默认为最大
		})
	})
}

//设置分享信息
export const setShare = (data, callback) => {
	console.log('设置分享时候的data', data)
	//配置校验成功后执行
	jWeixin.ready(function() {
		if (!data.link) {
			data.link = window.location.href;
		}
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		// updateAppMessageShareData
		jWeixin.updateAppMessageShareData({
			title: data.title, // 分享标题
			desc: data.desc, // 分享描述
			link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: data.imgUrl, // 分享图标
			success: function() {
				// 设置成功
				callback && callback();
				// uni.showToast({
				// 	title:'分享成功',
				// 	icon:'none'
				// })
			},
			fail: ()=> {
				// uni.showToast({
				// 	title:'分享失败',
				// 	icon:'none'
				// })
			}
		});
		jWeixin.updateTimelineShareData({
			title: data.title, // 分享标题
			link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: data.imgUrl, // 分享图标
			success: function() {
				// 设置成功
				callback && callback();
				// uni.showToast({
				// 	title:'分享成功',
				// 	icon:'none'
				// })
			},
			fail: ()=> {
				// uni.showToast({
				// 	title:'分享失败',
				// 	icon:'none'
				// })
			}
		});
	});
}
//微信扫一扫
export const scanQRCode = (scanType) => {
	//配置校验成功后执行
	return new Promise((resolve, reject) => {
		// 需要先获取权限
		jWeixin.scanQRCode({
			needResult: 1,
			scanType: scanType?[scanType]:["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有 "qrCode", "barCode"
			success: (res) => {
				resolve({
					result: res.resultStr
				});
			},
			fail: (error) => {
				console.error(error);
				reject(error)
			}
		})
	})
}

/**
 * 选择图片
 */
export function chooseImage(count) {
	return new Promise((resolve, reject) => {
		jWeixin.chooseImage({
			count: count, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: (res) => {
				// var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				console.log('jssdk文件选择结果',res)
				resolve(res.localIds)
			},
			fail: (error) => {
				console.error(error);
				reject(error);
			}
		})
	})
}

/**
 * 获得本地图片base64
 * @param {Object} localId
 */
export async function getLocalImgData(localId) {
	return new Promise((resolve, reject) => {
		jWeixin.getLocalImgData({
			localId,
			success: (res) => {
				resolve(res.localData);
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

/**
 * 微信公众号文件上传接口
 * @param {Object} localId chooseImage返回的本地文id
 */
// export function uploadImage(localId) {
// 	return new Promise((resolve, reject) => {
// 		jWeixin.uploadImage({
// 			localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
// 			isShowProgressTips: 1, // 默认为1，显示进度提示
// 			success: function(res) {
// 				// var serverId = res.serverId; // 返回图片的服务器端ID
// 				resolve(res.serverId)
// 			},
// 			fail: (error) => {
// 				reject(error)
// 			}
// 		});
// 	})
// }

/**
 * 微信公众号页面认证方法
 */
export function WxConfig() {
	let config = window.config;
	// 配置文件里面没有appId将不激活微信SDK功能
	if (!config.appId) {
		return;
	}
	//获取当前页面地址
	let url = window.location.href.split('#')[0];
	//获取微信公众号SDK权限的签名、随机数、时间戳
	request({
		url: 'opms-base/fetchJsSdkSignature',
		data: {
			url
		}
	}).then(res => {
		// 微信SDK配置
		jWeixin.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: config.appId, // 必填，公众号的唯一标识
			timestamp: res.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.nonceStr, // 必填，生成签名的随机串
			signature: res.signature, // 必填，签名
			jsApiList: [
				"getLocation", // 获取当前位置
				"openLocation", // 打开地图
				"scanQRCode", // 扫一到
				"updateAppMessageShareData", // 分享好友
				"updateTimelineShareData", // 分享朋友圈
				"chooseImage", // 选择图片
				"getLocalImgData", // 获得图片本地文件base64格式
			] // 必填，需要使用的JS接口列表
		});
		let link = window.location.origin;
		let state = uni.getStorageSync('state') || 'user';
		const userInfo = uni.getStorageSync('userInfo');
		const entityId = userInfo.entityId || uni.getStorageSync('entityId');
		link += '/#/?state=' + state;
		if (entityId) {
			link += '&entityId=' + entityId;
		}
		let store = uni.getStorageSync('store');
		if (store) {
			link += '&storeId=' + store.storeId;
		}
		setShare({
			title: config.shareTitle, // 分享标题
			desc: config.shareDesc, // 分享描述
			link,
			imgUrl: config.shareImg, // 分享图标
		})
	})
	//配置校验失败后执行
	jWeixin.error(function(res) {
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		console.log(res);
	});
}
// if (getPlatform() == PLATFORM.BrowserWX) {
// 	window.onload = function() {
// 		WxConfig();
// 	}
// }
// #endif
