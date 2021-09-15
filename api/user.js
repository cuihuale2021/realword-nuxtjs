// 请求接口
import {
    request
} from '@/plugins/request'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/users/login',
        data
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/users',
        data
    })
}

// 获取用户信息
export const getUser = () => {
    return request({
        method: 'GET',
        url: '/user'
    })
}

// 更新用户信息
export const updateUser = data => {
    return request({
        method: 'PUT',
        url: '/user',
        data
    })
}