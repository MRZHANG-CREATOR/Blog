const {
    Article
} = require('../../model/article')

module.exports = async (ctx) => {
    const id = ctx.query.id;
    let articleInfo = await Article.findOne({
        _id: id
    }).populate('author')
    await ctx.render('home/article', {
        articleInfo: articleInfo
    })
}