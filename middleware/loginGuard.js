const article = require("../route/home/article")
//登录拦截
const loginGuard = async (ctx, next) => {
    // const allowpage = ['/admin/login'] //定义允许直接访问的url
    let url = ctx.originalUrl
    // if (allowpage.indexOf(url) > -1) {
    //     await next()
    // } else {
    const tourist = []
    console.log(url)
    if (!ctx.session.user && url != '/admin/login') {
        ctx.redirect('/admin/login')
    } else {
        if (ctx.session.role == "normal" && url != "/home") {
            return ctx.redirect('/home')
        }
        await next()
    }
}
module.exports = loginGuard