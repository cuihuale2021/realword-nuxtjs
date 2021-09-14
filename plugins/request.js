// 基于 axios 封装的请求模块
import axios from 'axios'
// 创建请求对象
export const request = axios.create({
    // baseURL: 'https://conduit.productionready.io/api',
    baseURL: 'http://realworld.api.fed.lagounews.com/api'
})

// 插件导出函数，必须作为默认成员
//通过插件机制获取上下文对象 context (包括 query\params\store\app\req\res...)
export default (context) => {
    // 请求拦截器
    // 任何请求都要经过请求拦截器，可以在这里面做一些公共操作，如设置同一Token
    request.interceptors.request.use(function (config) { // config： request中的参数，method,url 等
        const {
            user
        } = context.store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function (error) {
        return Promise.reject(error)
    })
    // 响应拦截器

}