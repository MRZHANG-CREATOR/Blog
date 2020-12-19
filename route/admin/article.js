const {
    Article
} = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (ctx, next) => {
    const page = ctx.query.page || 1
    ctx.state.currentPage = 'article'
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec() //多集合联合查询
    // console.log(articles)
    await ctx.render('admin/article', {
        articles: articles
    })
}