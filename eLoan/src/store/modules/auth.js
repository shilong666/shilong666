const auth = {
	state: {
		token: null, // token
		wxCode: null, // 微信公众号登录授权code
		entityId: null, // 分享用户实体id
		userInfo: null, // 用户信息
		channel: null, //channel
	},
	getters: {
		token: (state) => state.token,
		wxCode: (state) => state.wxCode,
		entityId: (state) => state.entityId,
		userInfo: (state) => state.userInfo,
		channel: (state) => state.channel
	},
	mutations: {
		// 通过mutations修改state中的内容
		setToken(state, data) {
			state.token = data
		},
		clearToken(state, data) {
			state.token = ''
		},
		// 设置wxCode
		setWxCode(state, data) {
			state.wxCode = data
		},
		// 设置实体id
		setEntityId(state, data) {
			state.entityId = data
		},
		// 设置用户信息
		setUserInfo(state, data) {
			state.userInfo = data
		},
		//设置身份channel
		setChannel(state, data) {
			state.channel = data
		}
		
	},
	actions: {
		// 登录
		// login({
		// 	commit
		// }, data) {
		// 	// 登录逻辑
		// 	// 更新token
		// 	commit('token', 123)
		// }
	}
}

export default auth;
