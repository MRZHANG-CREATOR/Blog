module.exports = async ctx => {
    // ctx.clearCookie('zhanghuanhuan')
    await ctx.redirect('/admin/login')
    ctx.session = null
    ctx.state.userInfo = null
}