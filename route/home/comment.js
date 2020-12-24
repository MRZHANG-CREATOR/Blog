const {
    Comment
} = require('../../model/comment')
module.exports = (ctx, next) => {
    const {
        content,
        uid,
        aid
    } = ctx.request.body
    // console.log(bpdy)
    Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    })
    ctx.redirect('/article?id=' + aid)
}