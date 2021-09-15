// 个人中心
import {
    request
} from '@/plugins/request'

// 获取个人信息
export const getProfile = username => {
    return request({
        method: 'GET',
        url: `/profiles/${username}`,
    })
}

// 关注
export const followUser = username =>{
    return request({
        method: 'POST',
        url: `/profiles/${username}/follow`
    })
}

// 取消关注
export const unFollowUser = username =>{
    return request({
        method: 'DELETE',
        url: `/profiles/${username}/follow`
    })
}