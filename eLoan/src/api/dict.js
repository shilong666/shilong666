import request from '@/utils/request.js';

/**
 * 查询字典项
 * @param {Object} types
 */
export function groupListByType(types) {
	return request({
		url: 'ias-service/dict/groupListByType?dictTypes=' + types,
		method: 'get'
	})
}