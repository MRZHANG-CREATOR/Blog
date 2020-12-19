module.exports = async ctx => {
    ctx.state.currentPage = 'article'
    await ctx.render('admin/article-edit')
}