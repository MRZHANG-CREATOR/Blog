module.exports = ctx => {
    ctx.state.currentPage = 'article'
    ctx.render('article-edit')
}