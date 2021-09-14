// Vuex 容器
const cookieparser = process.server ? require('cookieparser') : undefined
// state 必须放在函数中，防止数据冲突
export const state = () => {
    return {
        // 当前用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    // nuxtServerInit 会在服务端渲染期间自动调用，初始化容器数据及传入数据给客户端
    nuxtServerInit({
        commit
    }, {
        req
    }) {
        let user = null
        //如果请求头中有Cookie
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (e) {
                // ...
            }
            commit('setUser', user)
        }
    }
}