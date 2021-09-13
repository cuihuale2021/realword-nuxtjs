/**
 * 验证是否登录的中间件
 * 路由拦截器，类似 router.beforeEach()
 */
export default function ({
    store,
    redirect
}) {
    if (!store.state.user) {
        return redirect('/login')
    }
}