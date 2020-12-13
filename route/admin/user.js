module.exports = async (ctx, next) => {
    await ctx.render('user', {
        // username: ctx.session.username //只有当前网页能获得，需要共用的话存在state中,已经转到local了
    })
}