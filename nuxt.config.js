// nuxt 配置文件
module.exports = {
    // 路由
    router: {
        // 导航高亮
        linkActiveClass: 'active',
        // 自定义路由
        extendRoutes(routes, resolve) {
            // console.log(routes)
            // 清空自动生成的路由
            routes.splice(0)

            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layout/'),
                children: [
                    // 首页
                    {
                        path: '', // 默认子路由
                        name: 'home',
                        component: resolve(__dirname, 'pages/home/')
                    },
                    // 登录
                    {
                        path: '/login',
                        name: 'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    // 注册
                    {
                        path: '/register',
                        name: 'register',
                        component: resolve(__dirname, 'pages/login/') // 注册与登录使用同一页面
                    },
                    // 个人中心
                    {
                        path: '/profile/:username',
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    // 设置
                    {
                        path: '/settings',
                        name: 'settings',
                        component: resolve(__dirname, 'pages/settings/')
                    },
                    // 编辑文章
                    {
                        path: '/editor',
                        name: 'editor',
                        component: resolve(__dirname, 'pages/editor/')
                    },
                    // 编辑文章-文章详情
                    {
                        path: '/editor/:slug',
                        name: 'detail',
                        component: resolve(__dirname, 'pages/editor/detail')
                    },
                    // 文章列表
                    {
                        path: '/article/:slug',
                        name: 'article',
                        component: resolve(__dirname, 'pages/article/')
                    },
                ]
            }, ])
        }
    },
    // 插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ],
    // 运行环境相关
    server: {
        host: '0.0.0.0',               // 默认 localhost 本地访问   对外访问 '0.0.0.0'
        // host: 'localhost',
        port: 3000,             // 默认3000
    } 
}