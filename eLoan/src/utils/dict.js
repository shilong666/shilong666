import {
	groupListByType
} from '@/api/dict.js';

/**
 * 获取数据字典
 * @param {Object} types 字典code
 */
export function getDictByTypes(types) {
	return new Promise((resolve, reject) => {
		groupListByType(types).then(res => {
			if (res) {
				Object.keys(res).forEach(key => {
					if (res[key].length > 0) {
						res[key] = res[key].sort((a, b) => a.sort - b.sort).map(item => {
							return {
								code: item.value,
								desc: item.label
							}
						})
					}
				})
				resolve(res)
			} else {
				reject()
			}

		}).catch(() => {
			reject()
		})
	})
}