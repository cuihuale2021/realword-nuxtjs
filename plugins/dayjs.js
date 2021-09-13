// 时间处理插件

// 注册全局过滤器
import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => { // {{ 表达式 | 过滤器 }}
    return dayjs(value).format(format)
})