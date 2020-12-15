//登录拦截
const loginGuard = async (ctx, next) => {
    // console.log('router intercept middleware')
    const allowpage = ['/admin/login'] //定义允许直接访问的url
    let url = ctx.originalUrl
    if (allowpage.indexOf(url) > -1) {
        await next()
    } else {
        if (ctx.session.user) {
            await next()
        } else {
            console.log('router intercept')
            await ctx.redirect('/admin/login')
        }
    }
}
module.exports = loginGuard