const article = require("../route/home/article")

//登录拦截
const loginGuard = async (ctx, next) => {
    // console.log('router intercept middleware')
    // const allowpage = ['/admin/login'] //定义允许直接访问的url
    let url = ctx.originalUrl
    // if (allowpage.indexOf(url) > -1) {
    //     await next()
    // } else {
    if (ctx.session.user) {
        if (url != "/admin/login") {
            if (ctx.session.user.role == "admin") {
                console.log('admin')
                await next()
            } else {
                console.log(url)
                ctx.redirect('/home')
            }
        } else {
            await ctx.redirect('/admin/login')
        }
    } else {
        await next()
    }
}
module.exports = loginGuard