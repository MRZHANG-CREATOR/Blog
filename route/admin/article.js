module.exports = async (ctx, next) => {
    ctx.state.currentPage = 'article'
    await ctx.render('article')
}