const article = require("../route/home/article")
//登录拦截
const loginGuard = async (ctx, next) => {
    let url = ctx.originalUrl
    console.log(url)
    if (ctx.session.user) {
        if (url != "/favicon.ico" && ctx.session.role == "normal" && !url.startsWith('/home') && !url.startsWith('/article') && url != "/admin/loginout" && !url.startsWith('/home/comment')) {
            await ctx.redirect('/home')
        }
        await next()
    } else {
        if (url == "/admin/login" || url.startsWith('/home') || url.startsWith('/article') || url == "/favicon.ico") {
            await next()
        } else {
            await ctx.redirect('/home')
        }
    }
}
module.exports = loginGuard