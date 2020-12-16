module.exports = async ctx => {
    ctx.state.currentPage = 'article'
    await ctx.render('article-edit')
}