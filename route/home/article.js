const {
    Article
} = require('../../model/article')
const {
    Comment
} = require('../../model/comment')
module.exports = async (ctx) => {
    const id = ctx.query.id;
    let articleInfo = await Article.findOne({
        _id: id
    }).populate('author')
    let articleComment = await Comment.find({
        aid: id
    }).populate('uid')
    await ctx.render('home/article', {
        articleInfo,
        articleComment
    })
}