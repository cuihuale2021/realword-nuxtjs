/**
 * 验证是否登录的中间件
 * 已登录就跳转到首页
 */
export default function ({
    store,
    redirect
}) {
    if (store.state.user) {
        return redirect('/')
    }
}